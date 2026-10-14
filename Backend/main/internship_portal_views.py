import uuid
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from django.shortcuts import get_object_or_404
from django.conf import settings
import razorpay
from .models import (
    InternshipRegistration, Payment, InternshipInterview,
    InternshipOffer, OnboardingTask, InternshipExamSession,
    InternshipExamAnswer, InternshipExamViolation
)
from .internship_portal_serializers import (
    InternshipRegistrationSerializer,
    InternshipInterviewSerializer,
    InternshipOfferSerializer,
    OnboardingTaskSerializer,
    InternshipExamSessionSerializer,
    InternshipExamViolationSerializer
)

class CsrfExemptSessionAuthentication(SessionAuthentication):
    """
    SessionAuthentication subclass that bypasses CSRF checks for
    token/credential-based candidate and portal API actions.
    """
    def enforce_csrf(self, request):
        return  # Bypass CSRF validation

class PublicInternshipRegistrationViewSet(viewsets.ModelViewSet):
    """
    Public API for candidate registration.
    Allows creation and retrieval via registration_id (or email/phone logic if needed).
    """
    queryset = InternshipRegistration.objects.all()
    serializer_class = InternshipRegistrationSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [permissions.AllowAny]
    lookup_field = 'registration_id'

    def get_object(self):
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        lookup_value = str(self.kwargs.get(lookup_url_kwarg, '')).strip()

        from django.db.models import Q
        from rest_framework.exceptions import NotFound

        reg = self.get_queryset().filter(
            Q(registration_id__iexact=lookup_value) | Q(email__iexact=lookup_value)
        ).order_by('-id').first()

        if not reg:
            clean_token = lookup_value.replace('-', '').replace(' ', '').upper()
            for r in self.get_queryset().filter(registration_id__isnull=False):
                if (r.registration_id or '').replace('-', '').replace(' ', '').upper() == clean_token:
                    reg = r
                    break

        if not reg:
            raise NotFound(f"Candidate registration '{lookup_value}' not found.")

        self.check_object_permissions(self.request, reg)
        return reg

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        email = data.get('email')
        phone = data.get('phone')
        
        from django.db.models import Q
        if email or phone:
            if self.get_queryset().filter(Q(email=email) | Q(phone=phone)).exists():
                return Response(
                    {'error': 'A candidate with this Email or Phone Number is already registered. Please login.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Generate a unique registration ID
        registration_id = f"YGR-INT-{uuid.uuid4().hex[:8].upper()}"

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        payment_type = 'full'
        base_amount = 1.0  # ₹1
        gst = 0.0  # ₹0 GST
        total = base_amount + gst  # ₹1 total
        
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

        # Pre-create Razorpay order in the same request so Razorpay opens immediately on frontend
        order_data = None
        if amount_to_pay > 0:
            try:
                client = razorpay.Client(
                    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
                )
                order = client.order.create({
                    "amount": int(amount_to_pay * 100),
                    "currency": "INR",
                    "payment_capture": 1
                })
                Payment.objects.create(
                    registration=reg,
                    amount=amount_to_pay,
                    razorpay_order_id=order['id']
                )
                reg.status = 'Payment Initiated'
                reg.razorpay_order_id = order['id']
                reg.save(update_fields=['status', 'razorpay_order_id'])
                order_data = {
                    'order_id': order['id'],
                    'amount': int(amount_to_pay * 100),
                    'key': settings.RAZORPAY_KEY_ID
                }
            except Exception as rz_err:
                import logging
                logging.getLogger(__name__).error(f"Auto Razorpay order failed for {reg.registration_id}: {rz_err}")
        
        try:
            from .email_service import YGREmailService
            YGREmailService.send_registration_confirmation(reg)
        except Exception as email_err:
            import logging
            logging.getLogger(__name__).error(
                f"Registration confirmation email failed for {reg.registration_id}: {email_err}"
            )
        
        return Response({
            'message': 'Registration successful',
            'registration_id': reg.registration_id,
            'id': reg.id,
            'order': order_data,
            'data': self.get_serializer(reg).data
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def candidate_login(self, request):
        raw_reg_id = request.data.get('registration_id') or request.data.get('email') or ''
        raw_password = request.data.get('password') or ''

        reg_id = str(raw_reg_id).strip()
        pwd = str(raw_password).strip()

        if not reg_id or not pwd:
            return Response(
                {'error': 'Please enter both your Registration ID (or Email) and Password.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        from django.db.models import Q

        # Match by registration_id or email (case-insensitive)
        candidates = InternshipRegistration.objects.filter(
            Q(registration_id__iexact=reg_id) | Q(email__iexact=reg_id)
        )

        # Fallback: support stripped dashes/spaces e.g. "YGRINT..." or "YGR INT..."
        if not candidates.exists():
            clean_token = reg_id.replace('-', '').replace(' ', '').upper()
            all_matching = []
            for r in InternshipRegistration.objects.filter(registration_id__isnull=False):
                if (r.registration_id or '').replace('-', '').replace(' ', '').upper() == clean_token:
                    all_matching.append(r.id)
            if all_matching:
                candidates = InternshipRegistration.objects.filter(id__in=all_matching)

        if not candidates.exists():
            return Response(
                {'error': 'No candidate found with this Registration ID or Email. Please check your credentials.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        matched_reg = None
        for reg in candidates:
            stored_pwd = (reg.password or '').strip()
            # Match exact or case-insensitive (hex passwords can be affected by mobile capitalization)
            if stored_pwd == pwd or stored_pwd.lower() == pwd.lower():
                matched_reg = reg
                break

        if not matched_reg:
            return Response(
                {'error': 'Invalid Password. Please verify the password code sent to your registered email.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        return Response({
            'success': True,
            'registration_id': matched_reg.registration_id,
            'candidate_name': matched_reg.name,
            'course': matched_reg.course
        })

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        
        # Check for existing exam session (Do NOT auto-create session; only HR send_exam_link creates it)
        exam_session = instance.exam_sessions.order_by('-id').first()

        # Assessment has been sent by HR ONLY IF status has advanced to Exam Scheduled or beyond
        hr_link_sent = bool(
            instance.status in [
                'Exam Scheduled', 'Exam Completed', 'Qualified', 'Not Qualified',
                'Interview 1 Scheduled', 'Interview 1 Completed', 'Interview 2 Scheduled',
                'Selected', 'Not Selected', 'Offer Issued'
            ] and exam_session is not None
        )

        is_exam_completed = bool(
            (exam_session and exam_session.status == 'Completed') or
            instance.status in [
                'Exam Completed', 'Qualified', 'Not Qualified',
                'Interview 1 Scheduled', 'Interview 1 Completed',
                'Interview 2 Scheduled', 'Selected', 'Not Selected', 'Offer Issued'
            ]
        )

        # Single attempt rule: Candidate can take exam ONLY if HR sent link AND candidate has NOT completed it
        can_take_exam = bool(
            hr_link_sent and
            instance.status == 'Exam Scheduled' and
            exam_session and
            exam_session.status != 'Completed' and
            not is_exam_completed
        )

        data['hr_link_sent'] = hr_link_sent
        data['can_take_exam'] = can_take_exam
        data['exam_completed'] = is_exam_completed

        if exam_session:
            # Provide active exam token only when candidate is actually permitted to take the exam
            data['exam_token'] = exam_session.token if can_take_exam else None
            data['exam_status'] = 'Completed' if is_exam_completed else exam_session.status

            # Only reveal exam_score and is_qualified if HR has explicitly updated status
            if instance.status in ['Qualified', 'Not Qualified', 'Interview 1 Scheduled', 'Interview 1 Completed', 'Interview 2 Scheduled', 'Selected', 'Not Selected', 'Offer Issued']:
                data['exam_score'] = exam_session.score
                data['is_qualified'] = (instance.status != 'Not Qualified')
            else:
                data['exam_score'] = None
                data['is_qualified'] = None
        else:
            data['exam_token'] = None
            data['exam_status'] = 'Not Scheduled'
            data['exam_score'] = None
            data['is_qualified'] = None
            
        # Check for interview
        interview = instance.interviews.first()
        if interview:
            data['interview_id'] = interview.id
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
    def confirm_interview(self, request, registration_id=None):
        instance = self.get_object()
        interview = instance.interviews.first()
        if not interview:
            return Response({'error': 'No interview scheduled.'}, status=status.HTTP_400_BAD_REQUEST)
            
        action_type = request.data.get('action') # 'confirm' or 'reschedule'
        
        if action_type == 'confirm':
            interview.status = 'Confirmed'
            interview.save()
            return Response({'message': 'Interview attendance confirmed.'})
        elif action_type == 'reschedule':
            interview.status = 'Rescheduling Requested'
            interview.save()
            return Response({'message': 'Rescheduling request submitted to HR.'})
            
        return Response({'error': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def create_payment(self, request, registration_id=None):
        reg = self.get_object()
        
        if reg.amount_paid >= reg.total_amount and reg.total_amount > 0:
            return Response({'error': 'Payment already completed'}, status=status.HTTP_400_BAD_REQUEST)
            
        if reg.total_amount == 0:
            reg.status = 'Paid'
            reg.amount_paid = 0
            reg.save()
            return Response({'free_registration': True, 'message': 'Registration complete.'})
        
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
            error_str = str(e)
            key_id_used = settings.RAZORPAY_KEY_ID
            print(f"[Razorpay create_payment Error]: {error_str}")
            print(f"[Razorpay Debug] KEY_ID used: {key_id_used!r} (len={len(key_id_used)})")
            if 'Authentication failed' in error_str or 'authentication' in error_str.lower():
                error_msg = f"Payment Gateway Authentication Failed. Key used: {key_id_used!r}. Raw error: {error_str}"
            else:
                error_msg = f"Payment Gateway Error: {error_str}"
            return Response({'error': error_msg}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
                from .email_service import YGREmailService
                YGREmailService.send_registration_confirmation(reg)
            except Exception as e:
                print(f"Failed to send email to {reg.email}: {e}")
                
            # Send Purchase Event to Facebook Conversions API asynchronously
            def _async_meta_conversion(email_val, phone_val, amount_val, current_uri):
                try:
                    import requests
                    import os
                    import time
                    import hashlib
                    pixel_id = getattr(settings, 'META_PIXEL_ID', os.environ.get("META_PIXEL_ID", "1404880358483446"))
                    access_token = getattr(settings, 'META_ACCESS_TOKEN', os.environ.get("META_ACCESS_TOKEN", ""))
                    if not access_token:
                        return
                    url = f"https://graph.facebook.com/v19.0/{pixel_id}/events"
                    hashed_email = hashlib.sha256(email_val.lower().strip().encode('utf-8')).hexdigest()
                    payload = {
                        "data": [
                            {
                                "event_name": "Purchase",
                                "event_time": int(time.time()),
                                "action_source": "website",
                                "event_source_url": current_uri,
                                "user_data": {
                                    "em": [hashed_email],
                                    "ph": [hashlib.sha256(phone_val.strip().encode('utf-8')).hexdigest()] if phone_val else []
                                },
                                "custom_data": {
                                    "currency": "INR",
                                    "value": float(amount_val)
                                }
                            }
                        ]
                    }
                    requests.post(url, params={"access_token": access_token}, json=payload, timeout=10)
                except Exception as meta_e:
                    import logging
                    logging.getLogger(__name__).error(f"Failed to send Meta Conversions API event: {meta_e}")

            import threading
            threading.Thread(
                target=_async_meta_conversion,
                args=(reg.email, reg.phone, payment.amount, request.build_absolute_uri()),
                daemon=True
            ).start()
            
            return Response({'message': 'Payment verified successfully'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AdminInternshipRegistrationViewSet(viewsets.ModelViewSet):
    """
    Admin API for managing all internship candidates
    """
    queryset = InternshipRegistration.objects.all().order_by('-created_at')
    serializer_class = InternshipRegistrationSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [permissions.AllowAny]
    
    def list(self, request, *args, **kwargs):
        from django.utils import timezone
        from datetime import timedelta
        
        # Cleanup candidates who missed the 48-hour exam window
        expired_limit = timezone.now() - timedelta(hours=48)
        expired_sessions = InternshipExamSession.objects.filter(
            status='Scheduled',
            exam_date__lt=expired_limit
        )
        for session in expired_sessions:
            if session.registration:
                session.registration.delete()

        return super().list(request, *args, **kwargs)

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        reg = self.get_object()
        new_status = request.data.get('status')
        if new_status in dict(InternshipRegistration.STATUS_CHOICES):
            # Single attempt rule: Do not allow setting to 'Exam Scheduled' if candidate already completed
            if new_status == 'Exam Scheduled':
                if reg.exam_sessions.filter(status='Completed').exists() or reg.status in [
                    'Exam Completed', 'Qualified', 'Not Qualified',
                    'Interview 1 Scheduled', 'Interview 1 Completed',
                    'Interview 2 Scheduled', 'Selected', 'Not Selected', 'Offer Issued'
                ]:
                    return Response({'error': 'Candidate has already completed their assessment attempt. Multiple attempts are not permitted.'}, status=status.HTTP_400_BAD_REQUEST)

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
            if new_status == 'Interview 1 Scheduled':
                from django.utils import timezone
                from datetime import timedelta
                interview, created = InternshipInterview.objects.get_or_create(
                    registration=reg,
                    round_number=1,
                    defaults={
                        'scheduled_date': timezone.now() + timedelta(days=2),
                        'status': 'Scheduled',
                        'mode': 'Online',
                        'meeting_url_or_venue': f"https://zoom.us/j/9{uuid.uuid4().int % 1000000000}?pwd={uuid.uuid4().hex[:8]}"
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
                
                
        if new_status == 'Qualified':
            # HR explicitly qualified the candidate
            session = reg.exam_sessions.first()
            score_text = f"Your Score: {session.score} Marks\n\n" if (session and session.score is not None) else ""
            from django.conf import settings
            site_url = getattr(settings, 'SITE_URL', 'https://ygrgobalitservices.com').rstrip('/')
            dashboard_url = f"{site_url}/internships/candidate-dashboard/{reg.registration_id}"
            email_subject = 'Congratulations! You Have Passed the Assessment'
            email_message = f"""Dear {reg.name},

Congratulations! You have been Qualified in the Technical Assessment for the {reg.course} Internship program.

{score_text}Our HR team will review your profile and contact you shortly with details regarding the next round (Technical Interview).

You can track your selection progress on your Candidate Dashboard:
{dashboard_url}

Best Regards,
YGR Global IT Services
"""
            try:
                from django.core.mail import send_mail
                send_mail(email_subject, email_message, settings.DEFAULT_FROM_EMAIL, [reg.email], fail_silently=True)
            except Exception:
                pass

        elif new_status == 'Not Qualified':
            # HR explicitly marked candidate as Not Qualified
            from .email_service import YGREmailService
            YGREmailService.send_regret_email(reg, 'Technical Assessment')

        elif new_status == 'Interview 1 Scheduled':
            interview = reg.interviews.first()
            if interview:
                from .email_service import YGREmailService
                YGREmailService.send_interview_invitation(reg, interview)

        return Response({'status': 'status updated', 'new_status': reg.status})
        return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def schedule_interview(self, request, pk=None):
        from django.core.mail import send_mail
        from django.conf import settings
        from datetime import datetime
        
        reg = self.get_object()
        data = request.data
        
        date_str = data.get('date')
        interview_time = data.get('interview_time')
        reporting_time = data.get('reporting_time')
        mode = data.get('mode')
        venue_or_link = data.get('venue_name')
        office_address = data.get('office_address', '')
        
        # Combine date and time
        if date_str and interview_time:
            scheduled_date = datetime.strptime(f"{date_str} {interview_time}", "%Y-%m-%d %H:%M")
        else:
            from django.utils import timezone
            from datetime import timedelta
            scheduled_date = timezone.now() + timedelta(days=2)
            
        # Update or Create Interview record
        interview, created = InternshipInterview.objects.update_or_create(
            registration=reg,
            round_number=1,
            defaults={
                'scheduled_date': scheduled_date,
                'status': 'Scheduled',
                'mode': mode,
                'meeting_url_or_venue': venue_or_link
            }
        )
        
        # Update registration status
        reg.status = 'Interview 1 Scheduled'
        reg.save()
        
        # Send customized email
        from .email_service import YGREmailService
        YGREmailService.send_interview_invitation(reg, interview)
            
        return Response({'message': 'Interview scheduled successfully'})

    @action(detail=True, methods=['post'])
    def submit_interview_evaluation(self, request, pk=None):
        reg = self.get_object()
        interview = reg.interviews.first()
        if not interview:
            return Response({'error': 'No interview found for this candidate'}, status=status.HTTP_400_BAD_REQUEST)
            
        data = request.data
        scorecard = data.get('scorecard', {})
        overall_score = data.get('overall_score', 0)
        recommendation = data.get('recommendation', 'Pending') # e.g. Selected, Not Selected, Round 2
        feedback = data.get('feedback', '')
        
        interview.scorecard = scorecard
        interview.score = overall_score
        interview.feedback = feedback
        interview.status = 'Completed'
        interview.save()
        
        if recommendation == 'Selected':
            reg.status = 'Selected'
            from .email_service import YGREmailService
            YGREmailService.send_selection_decision(reg)
        elif recommendation == 'Not Selected':
            reg.status = 'Not Selected'
            from .email_service import YGREmailService
            YGREmailService.send_regret_email(reg, 'Round 1 Interview')
        # If 'Round 2', you'd set it to something like 'Interview 2 Scheduled' or similar based on further logic.
        
        reg.save()
        return Response({'message': 'Evaluation saved successfully', 'new_status': reg.status})

    @action(detail=True, methods=['post'])
    def generate_offer(self, request, pk=None):
        from django.core.mail import send_mail
        from django.conf import settings
        import uuid
        
        reg = self.get_object()
        data = request.data
        
        # Create offer record
        offer = InternshipOffer.objects.create(
            registration=reg,
            offer_reference_number=f"YGR-OFF-{uuid.uuid4().hex[:8].upper()}",
            start_date=data.get('start_date'),
            duration=data.get('duration'),
            work_mode=data.get('work_mode'),
            mentor_name=data.get('mentor_name', 'TBD'),
            stipend_terms=data.get('stipend_terms'),
            acceptance_deadline=data.get('acceptance_deadline'),
            status='Issued'
        )
        
        # Update candidate status
        reg.status = 'Offer Issued'
        reg.save()
        
        # Send offer email
        from .email_service import YGREmailService
        YGREmailService.send_offer_letter(reg, offer)
            
        return Response({'message': 'Offer generated and email sent.'})

    @action(detail=True, methods=['post'])
    def send_exam_link(self, request, pk=None):
        reg = self.get_object()
        
        # Single attempt rule: Do not allow sending link if candidate already completed the exam
        if reg.exam_sessions.filter(status='Completed').exists() or reg.status in ['Exam Completed', 'Qualified', 'Not Qualified']:
            return Response({'error': 'Candidate has already completed their assessment attempt. Multiple attempts are not permitted.'}, status=status.HTTP_400_BAD_REQUEST)

        if reg.status not in ['Paid', 'Exam Scheduled']:
            return Response({'error': f'Candidate payment is not verified (current status is "{reg.status}").'}, status=status.HTTP_400_BAD_REQUEST)
            
        import uuid
        if not reg.password:
            reg.password = uuid.uuid4().hex[:8]
            
        reg.status = 'Exam Scheduled'
        reg.save()
        
        from django.utils import timezone
        token = uuid.uuid4().hex
        exam_session, created = InternshipExamSession.objects.get_or_create(
            registration=reg,
            defaults={'token': token, 'status': 'Scheduled', 'exam_date': timezone.now()}
        )
        
        # Always update exam_date if re-sending link
        if not created:
            exam_session.exam_date = timezone.now()
            exam_session.save()
        
        from .email_service import YGREmailService
        email_sent = YGREmailService.send_exam_invitation(reg, exam_session.token, exam_session.duration_minutes)
            
        return Response({
            'message': 'Exam link sent successfully',
            'exam_token': exam_session.token,
            'email_sent': email_sent
        })

    @action(detail=True, methods=['get'])
    def email_history(self, request, pk=None):
        reg = self.get_object()
        logs = reg.email_logs.all().order_by('-sent_at')
        
        data = [{
            'id': log.id,
            'email_type': log.email_type,
            'subject': log.subject,
            'recipient': log.recipient,
            'sent_at': log.sent_at,
            'status': log.status,
            'error_message': log.error_message
        } for log in logs]
        
        return Response({'logs': data})

    @action(detail=True, methods=['get'])
    def proctoring_report(self, request, pk=None):
        reg = self.get_object()
        session = reg.exam_sessions.order_by('-id').first()
        if not session:
            return Response({'error': 'No exam session found for this candidate.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = InternshipExamSessionSerializer(session)
        return Response(serializer.data)

class InternshipInterviewViewSet(viewsets.ModelViewSet):
    queryset = InternshipInterview.objects.all()
    serializer_class = InternshipInterviewSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [permissions.AllowAny]

class InternshipOfferViewSet(viewsets.ModelViewSet):
    queryset = InternshipOffer.objects.all()
    serializer_class = InternshipOfferSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [permissions.AllowAny]

class InternshipExamSessionViewSet(viewsets.ModelViewSet):
    queryset = InternshipExamSession.objects.all()
    serializer_class = InternshipExamSessionSerializer
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [permissions.AllowAny]
    lookup_field = 'token'

    def get_object(self):
        raw_token_or_id = self.kwargs.get(self.lookup_field, '')
        token_or_id = str(raw_token_or_id).strip()
        from rest_framework.exceptions import NotFound, PermissionDenied
        from .models import InternshipRegistration

        # 1. Match directly by exam session token (case-insensitive)
        session = InternshipExamSession.objects.filter(token__iexact=token_or_id).first()
        if session:
            reg = session.registration
            if reg and reg.status in ['Registered', 'Payment Initiated', 'Paid']:
                raise PermissionDenied('Assessment has not yet been scheduled or sent by HR. Please check your email for the HR invitation.')
            return session

        # 2. Match by candidate registration_id (case-insensitive)
        session = InternshipExamSession.objects.filter(registration__registration_id__iexact=token_or_id).order_by('-id').first()
        if session:
            reg = session.registration
            if reg and reg.status in ['Registered', 'Payment Initiated', 'Paid']:
                raise PermissionDenied('Assessment has not yet been scheduled or sent by HR. Please check your email for the HR invitation.')
            return session

        # 3. Match by candidate email (case-insensitive)
        session = InternshipExamSession.objects.filter(registration__email__iexact=token_or_id).order_by('-id').first()
        if session:
            reg = session.registration
            if reg and reg.status in ['Registered', 'Payment Initiated', 'Paid']:
                raise PermissionDenied('Assessment has not yet been scheduled or sent by HR. Please check your email for the HR invitation.')
            return session

        # 4. If token_or_id is a valid registration_id but no session exists yet or HR hasn't scheduled
        reg = InternshipRegistration.objects.filter(registration_id__iexact=token_or_id).first()
        if reg:
            if reg.status in ['Registered', 'Payment Initiated', 'Paid']:
                raise PermissionDenied('Assessment has not yet been scheduled or sent by HR. Please check your email for the HR invitation.')
            raise NotFound('No exam session found for this candidate.')

        # 5. Fallback to default
        return super().get_object()

    @action(detail=True, methods=['get'])
    def details(self, request, token=None):
        session = self.get_object()
        from hr.models import Question
        from django.utils import timezone
        reg = session.registration

        # Single attempt rule: If exam is already completed or candidate is in subsequent stage
        is_completed = bool(
            session.status == 'Completed' or
            reg.status in [
                'Exam Completed', 'Qualified', 'Not Qualified',
                'Interview 1 Scheduled', 'Interview 1 Completed',
                'Interview 2 Scheduled', 'Selected', 'Not Selected', 'Offer Issued'
            ]
        )

        if is_completed:
            return Response({
                'session_id': session.id,
                'token': session.token,
                'registration_id': reg.registration_id,
                'candidate_name': reg.name,
                'candidate_email': reg.email,
                'course': reg.course,
                'duration_minutes': session.duration_minutes,
                'status': 'Completed',
                'already_attempted': True,
                'warning_count': session.warning_count,
                'max_warnings': session.max_warnings,
                'total_tab_switches': session.total_tab_switches,
                'total_fullscreen_exits': session.total_fullscreen_exits,
                'total_blur_events': session.total_blur_events,
                'webcam_violations': session.webcam_violations,
                'proctoring_status': session.proctoring_status,
                'submission_reason': session.submission_reason,
                'started_at': session.started_at,
                'submitted_at': session.submitted_at,
                'remaining_seconds': 0,
                'saved_answers': {},
                'questions': []
            })

        # Existing saved answers for this attempt
        existing_answers = {
            str(ans.question_id): ans.selected_option
            for ans in session.answers.all()
        }

        # Consistent question fetch per candidate registration course
        course_name = (reg.course or '').strip().lower().replace(" ", "_")
        questions = Question.objects.filter(language__iexact=course_name).order_by('id')[:30]
        if not questions.exists():
            questions = Question.objects.filter(language__iexact=reg.course).order_by('id')[:30]
        if not questions.exists():
            questions = Question.objects.filter(language='technical').order_by('id')[:30]
        if not questions.exists():
            questions = Question.objects.filter(language='base_test').order_by('id')[:30]
        if not questions.exists():
            questions = Question.objects.all().order_by('id')[:30]

        q_data = [{
            'id': q.id,
            'question_text': q.question_text,
            'option_a': q.option_a,
            'option_b': q.option_b,
            'option_c': q.option_c,
            'option_d': q.option_d
        } for q in questions]

        # Calculate remaining duration
        remaining_seconds = session.duration_minutes * 60
        if session.started_at:
            elapsed = (timezone.now() - session.started_at).total_seconds()
            remaining_seconds = max(0, int((session.duration_minutes * 60) - elapsed))

        return Response({
            'session_id': session.id,
            'token': session.token,
            'registration_id': reg.registration_id,
            'candidate_name': reg.name,
            'candidate_email': reg.email,
            'course': reg.course,
            'duration_minutes': session.duration_minutes,
            'status': session.status,
            'warning_count': session.warning_count,
            'max_warnings': session.max_warnings,
            'total_tab_switches': session.total_tab_switches,
            'total_fullscreen_exits': session.total_fullscreen_exits,
            'total_blur_events': session.total_blur_events,
            'webcam_violations': session.webcam_violations,
            'proctoring_status': session.proctoring_status,
            'submission_reason': session.submission_reason,
            'started_at': session.started_at,
            'submitted_at': session.submitted_at,
            'remaining_seconds': remaining_seconds,
            'saved_answers': existing_answers,
            'questions': q_data
        })

    @action(detail=True, methods=['post'])
    def start_exam(self, request, token=None):
        session = self.get_object()
        from django.utils import timezone

        if session.status == 'Completed' or session.registration.status in [
            'Exam Completed', 'Qualified', 'Not Qualified',
            'Interview 1 Scheduled', 'Interview 1 Completed',
            'Interview 2 Scheduled', 'Selected', 'Not Selected', 'Offer Issued'
        ]:
            return Response({'error': 'Exam session has already been completed. Only one attempt is permitted.'}, status=status.HTTP_400_BAD_REQUEST)

        if not session.started_at:
            session.started_at = timezone.now()
        session.status = 'Started'
        session.save()

        return Response({
            'message': 'Exam started successfully.',
            'status': session.status,
            'started_at': session.started_at,
            'duration_minutes': session.duration_minutes,
            'warning_count': session.warning_count,
            'max_warnings': session.max_warnings
        })

    @action(detail=True, methods=['post'])
    def save_answer(self, request, token=None):
        session = self.get_object()
        if session.status == 'Completed' or session.registration.status in [
            'Exam Completed', 'Qualified', 'Not Qualified',
            'Interview 1 Scheduled', 'Interview 1 Completed',
            'Interview 2 Scheduled', 'Selected', 'Not Selected', 'Offer Issued'
        ]:
            return Response({'error': 'Exam has been completed. Answers cannot be updated.'}, status=status.HTTP_400_BAD_REQUEST)

        question_id = request.data.get('question_id')
        selected_option = str(request.data.get('selected_option', '')).strip().upper()

        if not question_id:
            return Response({'error': 'question_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        from hr.models import Question
        try:
            q = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return Response({'error': 'Question not found.'}, status=status.HTTP_404_NOT_FOUND)

        is_correct = (selected_option == q.correct_option.strip().upper()) if (selected_option and q.correct_option) else False

        InternshipExamAnswer.objects.update_or_create(
            exam_session=session,
            question=q,
            defaults={
                'selected_option': selected_option,
                'is_correct': is_correct
            }
        )

        return Response({
            'status': 'saved',
            'question_id': question_id,
            'selected_option': selected_option
        })

    @action(detail=True, methods=['post'])
    def log_violation(self, request, token=None):
        session = self.get_object()
        if session.status == 'Completed':
            return Response({
                'message': 'Exam already completed',
                'terminated': True,
                'status': session.status,
                'proctoring_status': session.proctoring_status,
                'warning_count': session.warning_count
            })

        violation_type = request.data.get('violation_type', 'unknown')
        details = request.data.get('details', '')
        snapshot = request.data.get('snapshot')

        # Update specific violation counters
        if violation_type == 'tab_switch':
            session.total_tab_switches += 1
        elif violation_type == 'fullscreen_exit':
            session.total_fullscreen_exits += 1
        elif violation_type == 'window_blur':
            session.total_blur_events += 1
        elif violation_type in ['webcam_lost', 'multiple_faces', 'camera_disabled']:
            session.webcam_violations += 1

        # Increment overall warning count
        session.warning_count += 1
        current_warning_num = session.warning_count

        # Save snapshot if provided
        if snapshot:
            session.proctoring_snapshot = snapshot

        # Record violation in audit log
        InternshipExamViolation.objects.create(
            exam_session=session,
            violation_type=violation_type,
            warning_number=current_warning_num,
            details=details,
            snapshot=snapshot
        )

        from django.utils import timezone

        # Strike 3 or reached max warnings: Automatic Disqualification!
        if session.warning_count >= session.max_warnings:
            session.status = 'Completed'
            session.proctoring_status = 'Disqualified'
            session.submission_reason = f"Automatic Submission: Reached maximum proctoring warnings ({session.warning_count}/{session.max_warnings}) due to {violation_type.replace('_', ' ')}."
            session.submitted_at = timezone.now()
            session.is_qualified = False

            # Calculate score from saved answers
            score = 0
            for ans in session.answers.all():
                if ans.selected_option and ans.question.correct_option:
                    if ans.selected_option.strip().upper() == ans.question.correct_option.strip().upper():
                        score += 1
                        ans.is_correct = True
                        ans.save()
            session.score = score
            session.save()

            # Mark registration status
            session.registration.status = 'Exam Completed'
            session.registration.save()

            return Response({
                'terminated': True,
                'warning_count': session.warning_count,
                'max_warnings': session.max_warnings,
                'proctoring_status': 'Disqualified',
                'submission_reason': session.submission_reason,
                'message': 'Exam automatically submitted and disqualified due to proctoring policy violation.'
            })

        # Under threshold: Warnings Issued
        session.proctoring_status = 'Warnings Issued'
        session.save()

        return Response({
            'terminated': False,
            'warning_count': session.warning_count,
            'max_warnings': session.max_warnings,
            'proctoring_status': session.proctoring_status,
            'remaining_warnings': max(0, session.max_warnings - session.warning_count),
            'message': f"Warning {session.warning_count} recorded. You have {max(0, session.max_warnings - session.warning_count)} warning(s) remaining."
        })

    @action(detail=True, methods=['post'])
    def submit(self, request, token=None):
        session = self.get_object()
        if session.status == 'Completed':
            return Response({
                'success': True,
                'message': 'Assessment already submitted successfully.',
                'status': 'Completed',
                'score': session.score,
                'is_qualified': session.is_qualified,
                'proctoring_status': session.proctoring_status,
                'submission_reason': session.submission_reason
            })

        if session.registration.status in [
            'Exam Completed', 'Qualified', 'Not Qualified',
            'Interview 1 Scheduled', 'Interview 1 Completed',
            'Interview 2 Scheduled', 'Selected', 'Not Selected', 'Offer Issued'
        ]:
            return Response({'error': 'Exam session has already been submitted. Only one attempt is permitted.'}, status=status.HTTP_400_BAD_REQUEST)

        from hr.models import Question
        from django.utils import timezone

        answers = request.data.get('answers', {})
        submission_reason = request.data.get('submission_reason', 'Normal Candidate Submission')
        snapshot = request.data.get('snapshot')
        if snapshot:
            session.proctoring_snapshot = snapshot

        # Ingest any final answers from the submission payload
        for q_id, selected in answers.items():
            if not selected:
                continue
            try:
                q = Question.objects.get(id=q_id)
                sel = str(selected).strip().upper()
                is_correct = (sel == q.correct_option.strip().upper()) if q.correct_option else False
                InternshipExamAnswer.objects.update_or_create(
                    exam_session=session,
                    question=q,
                    defaults={'selected_option': sel, 'is_correct': is_correct}
                )
            except Question.DoesNotExist:
                continue

        # Score calculation from database
        score = 0
        for ans in session.answers.all():
            if ans.selected_option and ans.question.correct_option:
                if ans.selected_option.strip().upper() == ans.question.correct_option.strip().upper():
                    score += 1
                    ans.is_correct = True
                    ans.save()

        session.score = score
        session.status = 'Completed'
        session.submitted_at = timezone.now()
        session.submission_reason = submission_reason

        # Proctoring status check
        if session.warning_count >= session.max_warnings:
            session.proctoring_status = 'Disqualified'
            session.is_qualified = False
        else:
            session.is_qualified = score >= session.passing_score
            if session.warning_count > 0:
                session.proctoring_status = 'Warnings Issued'
            else:
                session.proctoring_status = 'Clean'

        session.save()

        # Update candidate status
        session.registration.status = 'Exam Completed'
        session.registration.save()

        # Send confirmation receipt email to candidate in background
        try:
            from .email_service import YGREmailService
            YGREmailService.send_exam_submission_confirmation(session.registration, session)
        except Exception:
            pass

        return Response({
            'success': True,
            'message': 'Assessment submitted successfully. Your score has been updated in the HR evaluation system.',
            'status': 'Completed',
            'score': session.score,
            'is_qualified': session.is_qualified,
            'proctoring_status': session.proctoring_status,
            'submission_reason': session.submission_reason
        })
