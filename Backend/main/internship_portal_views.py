import uuid
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.conf import settings
import razorpay
from .models import (
    InternshipRegistration, Payment, InternshipInterview,
    InternshipOffer, OnboardingTask, InternshipExamSession
)
from .internship_portal_serializers import (
    InternshipRegistrationSerializer,
    InternshipInterviewSerializer,
    InternshipOfferSerializer,
    OnboardingTaskSerializer,
    InternshipExamSessionSerializer
)

class PublicInternshipRegistrationViewSet(viewsets.ModelViewSet):
    """
    Public API for candidate registration.
    Allows creation and retrieval via registration_id (or email/phone logic if needed).
    """
    queryset = InternshipRegistration.objects.all()
    serializer_class = InternshipRegistrationSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'registration_id'

    def create(self, request, *args, **kwargs):
        # Generate a unique registration ID
        registration_id = f"YGR-INT-{uuid.uuid4().hex[:8].upper()}"
        data = request.data.copy()
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        payment_type = 'full'
        base_amount = 250.0  # ₹250
        gst = round(base_amount * 0.18, 2)
        total = base_amount + gst
        
        emi_part = None
        amount_to_pay = total
        
        raw_password = uuid.uuid4().hex[:8]
        reg = serializer.save(
            registration_id=registration_id,
            password=raw_password,
            status='Registered',
            amount_paid=0.0,
            base_amount=base_amount,
            gst_amount=gst,
            total_amount=amount_to_pay,
            payment_type=payment_type,
            emi_part=emi_part,
            razorpay_order_id=''
        )
        
        return Response({
            'message': 'Registration successful',
            'registration_id': reg.registration_id,
            'id': reg.id,
            'data': self.get_serializer(reg).data
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def candidate_login(self, request):
        registration_id = request.data.get('registration_id')
        password = request.data.get('password')
        
        try:
            reg = InternshipRegistration.objects.get(registration_id=registration_id, password=password)
            return Response({'success': True, 'registration_id': reg.registration_id})
        except InternshipRegistration.DoesNotExist:
            return Response({'error': 'Invalid Registration ID or Password'}, status=status.HTTP_401_UNAUTHORIZED)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        
        # Check for exam sessions
        exam_session = instance.exam_sessions.first()
        if exam_session:
            data['exam_token'] = exam_session.token
            data['exam_status'] = exam_session.status
            data['exam_score'] = exam_session.score
            data['is_qualified'] = exam_session.is_qualified
            
        # Check for interview
        interview = instance.interviews.first()
        if interview:
            data['interview_scheduled_date'] = interview.scheduled_date
            data['interview_status'] = interview.status
            data['interview_mode'] = interview.mode
            data['interview_link'] = interview.meeting_url_or_venue
            
        # Check for offer
        offer = instance.offers.first()
        if offer:
            data['offer_status'] = offer.status
            data['offer_start_date'] = offer.start_date
            data['offer_deadline'] = offer.acceptance_deadline
            
        return Response({'data': data})

    @action(detail=True, methods=['post'])
    def create_payment(self, request, registration_id=None):
        reg = self.get_object()
        
        if reg.amount_paid >= reg.total_amount and reg.total_amount > 0:
            return Response({'error': 'Payment already completed'}, status=status.HTTP_400_BAD_REQUEST)
            
        if reg.total_amount == 0:
            reg.status = 'Paid'
            reg.save()
            
            email_status = "sent"
            # Send Email Notification
            try:
                from django.core.mail import send_mail
                subject = f"Registration Successful - YGR Global IT Services Internship ({reg.registration_id})"
                login_url = request.build_absolute_uri('/internships/candidate-login')
                message = f"Dear {reg.name},\n\nWe have successfully received your registration for the {reg.course} internship.\n\nYour Login Credentials for the Candidate Dashboard:\nRegistration ID: {reg.registration_id}\nPassword: {reg.password}\nLogin URL: {login_url}\n\nYou can now log in to your Candidate Dashboard to track your selection progress. Our team will notify you regarding the next steps, including your examination and interview schedule.\n\nBest Regards,\nYGR Global IT Services Team"
                send_mail(
                    subject,
                    message,
                    settings.EMAIL_HOST_USER,
                    [reg.email],
                    fail_silently=False,
                )
            except Exception as e:
                email_status = str(e)
                print(f"Failed to send email to {reg.email}: {e}")
                
            return Response({'payment_bypassed': True, 'message': 'Registration complete (No fee).', 'email_status': email_status})
        
        try:
            client = razorpay.Client(
                auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
            )
            order = client.order.create({
                "amount": int(reg.total_amount * 100),
                "currency": "INR",
                "payment_capture": 1
            })
            
            payment = Payment.objects.create(
                registration=reg,
                amount=reg.total_amount,
                razorpay_order_id=order['id']
            )
            
            reg.status = 'Payment Initiated'
            reg.save()
            
            return Response({
                'order_id': order['id'],
                'amount': int(reg.total_amount * 100),
                'key': settings.RAZORPAY_KEY_ID
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'])
    def verify_payment(self, request, registration_id=None):
        reg = self.get_object()
        razorpay_payment_id = request.data.get('razorpay_payment_id')
        razorpay_order_id = request.data.get('razorpay_order_id')
        razorpay_signature = request.data.get('razorpay_signature')
        
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        
        try:
            payment = Payment.objects.get(razorpay_order_id=razorpay_order_id)
            params_dict = {
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            }
            client.utility.verify_payment_signature(params_dict)
            
            payment.razorpay_payment_id = razorpay_payment_id
            payment.razorpay_signature = razorpay_signature
            payment.is_paid = True
            payment.save()
            
            reg.amount_paid += payment.amount
            if reg.amount_paid >= reg.total_amount:
                reg.status = 'Paid'
            reg.save()
            
            # Send Email Notification
            try:
                from django.core.mail import send_mail
                subject = f"Registration Successful - YGR Global IT Services Internship ({reg.registration_id})"
                login_url = request.build_absolute_uri('/internships/candidate-login')
                message = f"Dear {reg.name},\n\nWe have successfully received your registration and payment of ₹{payment.amount} for the {reg.course} internship.\n\nYour Login Credentials for the Candidate Dashboard:\nRegistration ID: {reg.registration_id}\nPassword: {reg.password}\nLogin URL: {login_url}\n\nYou can now log in to your Candidate Dashboard to track your selection progress. Our team will notify you regarding the next steps, including your examination and interview schedule.\n\nBest Regards,\nYGR Global IT Services Team"
                send_mail(
                    subject,
                    message,
                    settings.EMAIL_HOST_USER,
                    [reg.email],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Failed to send email to {reg.email}: {e}")
                
            # Send Purchase Event to Facebook Conversions API
            try:
                import requests
                import os
                import time
                import hashlib
                from dotenv import load_dotenv
                
                # Load environment variables from Backend/.env
                load_dotenv(os.path.join(settings.BASE_DIR, '.env'))
                
                PIXEL_ID = os.environ.get("META_PIXEL_ID", "1404880358483446")
                ACCESS_TOKEN = os.environ.get("META_ACCESS_TOKEN", "")
                
                if ACCESS_TOKEN:
                    url = f"https://graph.facebook.com/v19.0/{PIXEL_ID}/events"
                    
                    # Hash email for user_data
                    hashed_email = hashlib.sha256(reg.email.lower().strip().encode('utf-8')).hexdigest()
                    
                    payload = {
                        "data": [
                            {
                                "event_name": "Purchase",
                                "event_time": int(time.time()),
                                "action_source": "website",
                                "event_source_url": request.build_absolute_uri(),
                                "user_data": {
                                    "em": [hashed_email],
                                    "ph": [hashlib.sha256(reg.phone.strip().encode('utf-8')).hexdigest()] if reg.phone else []
                                },
                                "custom_data": {
                                    "currency": "INR",
                                    "value": float(payment.amount)
                                }
                            }
                        ]
                    }
                    
                    response = requests.post(
                        url,
                        params={"access_token": ACCESS_TOKEN},
                        json=payload,
                        timeout=10
                    )
                    print(f"Meta Pixel API Response: {response.status_code} {response.text}")
            except Exception as e:
                print(f"Failed to send Meta Conversions API event: {e}")
            
            return Response({'message': 'Payment verified successfully'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AdminInternshipRegistrationViewSet(viewsets.ModelViewSet):
    """
    Admin API for managing all internship candidates
    """
    queryset = InternshipRegistration.objects.all().order_by('-created_at')
    serializer_class = InternshipRegistrationSerializer
    # permission_classes = [permissions.IsAuthenticated] # Uncomment when auth is required
    
    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        reg = self.get_object()
        new_status = request.data.get('status')
        if new_status in dict(InternshipRegistration.STATUS_CHOICES):
            reg.status = new_status
            reg.save()
            
            # Auto-create Exam Session
            if new_status == 'Exam Scheduled':
                token = uuid.uuid4().hex
                exam_session, created = InternshipExamSession.objects.get_or_create(
                    registration=reg,
                    defaults={'token': token, 'status': 'Scheduled'}
                )
                return Response({'status': 'status updated', 'exam_token': exam_session.token})
                
            # Auto-create Interview Session
            if new_status == 'Interview Scheduled':
                from django.utils import timezone
                from datetime import timedelta
                interview, created = InternshipInterview.objects.get_or_create(
                    registration=reg,
                    round_number=1,
                    defaults={
                        'scheduled_date': timezone.now() + timedelta(days=2),
                        'status': 'Scheduled',
                        'mode': 'Online'
                    }
                )
            
            # Auto-create Offer
            if new_status == 'Selected':
                from django.utils import timezone
                from datetime import timedelta
                offer_ref = f"OFR-{uuid.uuid4().hex[:6].upper()}"
                offer, created = InternshipOffer.objects.get_or_create(
                    registration=reg,
                    defaults={
                        'offer_reference_number': offer_ref,
                        'start_date': (timezone.now() + timedelta(days=14)).date(),
                        'duration': '3 Months',
                        'work_mode': 'Remote',
                        'mentor_name': 'Assigned later',
                        'stipend_terms': 'Unpaid/Performance based',
                        'acceptance_deadline': timezone.now() + timedelta(days=7),
                        'status': 'Issued'
                    }
                )
                
            return Response({'status': 'status updated'})
        return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

class InternshipInterviewViewSet(viewsets.ModelViewSet):
    queryset = InternshipInterview.objects.all()
    serializer_class = InternshipInterviewSerializer

class InternshipOfferViewSet(viewsets.ModelViewSet):
    queryset = InternshipOffer.objects.all()
    serializer_class = InternshipOfferSerializer

class InternshipExamSessionViewSet(viewsets.ModelViewSet):
    queryset = InternshipExamSession.objects.all()
    serializer_class = InternshipExamSessionSerializer
    lookup_field = 'token'

    @action(detail=True, methods=['get'])
    def details(self, request, token=None):
        session = self.get_object()
        from .models import Question
        # Fetch questions based on the candidate's registered course
        course_name = session.registration.course.lower().replace(" ", "_")
        questions = Question.objects.filter(language__iexact=course_name).order_by('?')[:30]
        
        # Fallback to base_test if no specific course questions are found
        if not questions.exists():
            questions = Question.objects.filter(language__iexact=session.registration.course).order_by('?')[:30]
        
        if not questions.exists():
            questions = Question.objects.filter(language='technical').order_by('?')[:30]
            
        if not questions.exists():
            questions = Question.objects.filter(language='base_test').order_by('?')[:30]
            
        if not questions.exists():
            questions = Question.objects.all().order_by('?')[:30]
        q_data = [{
            'id': q.id, 
            'question_text': q.question_text, 
            'option_a': q.option_a, 
            'option_b': q.option_b, 
            'option_c': q.option_c, 
            'option_d': q.option_d
        } for q in questions]
        
        return Response({
            'session_id': session.id,
            'registration_id': session.registration.registration_id,
            'duration_minutes': session.duration_minutes,
            'status': session.status,
            'questions': q_data
        })

    @action(detail=True, methods=['post'])
    def submit(self, request, token=None):
        session = self.get_object()
        if session.status == 'Completed':
            return Response({'error': 'Exam already submitted'}, status=status.HTTP_400_BAD_REQUEST)
            
        answers = request.data.get('answers', {})
        from .models import Question, InternshipExamAnswer
        from django.utils import timezone
        
        score = 0
        for q_id, selected in answers.items():
            try:
                q = Question.objects.get(id=q_id)
                is_correct = (selected == q.correct_option)
                if is_correct:
                    score += 1
                InternshipExamAnswer.objects.create(
                    exam_session=session,
                    question=q,
                    selected_option=selected,
                    is_correct=is_correct
                )
            except Question.DoesNotExist:
                continue
                
        session.score = score
        session.status = 'Completed'
        session.submitted_at = timezone.now()
        session.is_qualified = score >= session.passing_score
        session.save()
        
        # Optionally auto-update Registration Status
        if session.is_qualified:
            session.registration.status = 'Exam Cleared'
        else:
            session.registration.status = 'Exam Failed'
        session.registration.save()
        
        return Response({'score': score, 'is_qualified': session.is_qualified})
