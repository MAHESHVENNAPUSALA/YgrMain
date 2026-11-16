import logging
import threading
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from django.db import connection
from .models import InternshipEmailLog

logger = logging.getLogger(__name__)

class YGREmailService:
    @staticmethod
    def _send_worker(reg_id, recipient_email, email_type, subject, template_name, full_context):
        """
        Background worker that renders the template and sends email via SMTP
        without blocking the web request/response cycle.
        """
        from django.db import connection
        try:
            from .models import InternshipRegistration, InternshipEmailLog
            
            # Render HTML content
            html_content = render_to_string(f"emails/{template_name}", full_context)
            
            # Create plaintext alternative
            text_content = strip_tags(html_content)
            
            # Create email message
            msg = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=full_context.get('contact_email', settings.DEFAULT_FROM_EMAIL),
                to=[recipient_email]
            )
            msg.attach_alternative(html_content, "text/html")
            
            # Send email
            msg.send(fail_silently=False)
            
            # Log success
            reg_obj = InternshipRegistration.objects.filter(id=reg_id).first() if reg_id else None
            InternshipEmailLog.objects.create(
                registration=reg_obj,
                email_type=email_type,
                subject=subject,
                recipient=recipient_email,
                status='Sent'
            )
            logger.info(f"Email '{email_type}' sent successfully to {recipient_email}")
        except Exception as e:
            logger.error(f"Failed to send email '{email_type}' to {recipient_email}: {str(e)}")
            try:
                from .models import InternshipRegistration, InternshipEmailLog
                reg_obj = InternshipRegistration.objects.filter(id=reg_id).first() if reg_id else None
                InternshipEmailLog.objects.create(
                    registration=reg_obj,
                    email_type=email_type,
                    subject=subject,
                    recipient=recipient_email,
                    status='Failed',
                    error_message=str(e)
                )
            except Exception:
                pass
        finally:
            connection.close()

    @staticmethod
    def _send_and_log(registration, email_type, subject, template_name, context, async_send=True):
        try:
            site_url = getattr(settings, 'SITE_URL', 'https://ygrgobalitservices.com').rstrip('/')
            display_domain = site_url.replace('https://', '').replace('http://', '')
            contact_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'info@ygrgobalitservices.com')

            # Populate global template variables
            full_context = {
                'site_url': site_url,
                'display_domain': display_domain,
                'contact_email': contact_email,
                **context
            }

            reg_id = getattr(registration, 'id', None)
            recipient_email = getattr(registration, 'email', '')

            if async_send:
                # Dispatch in background daemon thread for 0ms response time
                thread = threading.Thread(
                    target=YGREmailService._send_worker,
                    args=(reg_id, recipient_email, email_type, subject, template_name, full_context),
                    daemon=True
                )
                thread.start()
                return True
            else:
                YGREmailService._send_worker(reg_id, recipient_email, email_type, subject, template_name, full_context)
                return True
        except Exception as e:
            logger.error(f"Could not queue email {email_type} for {getattr(registration, 'email', '')}: {str(e)}")
            return False

    @staticmethod
    def send_registration_confirmation(registration, async_send=True):
        context = {
            'candidate_name': registration.name,
            'registration_id': registration.registration_id,
            'password': registration.password,
            'course': registration.course,
            'payment_status': registration.status,
            'amount_paid': getattr(registration, 'amount_paid', 0),
            'total_amount': getattr(registration, 'total_amount', 0),
        }
        return YGREmailService._send_and_log(
            registration, 
            'Registration Confirmation', 
            'Registration Confirmed | YGR Global IT Services Internship Program', 
            'registration_confirmation.html', 
            context,
            async_send=async_send
        )

    @staticmethod
    def send_exam_invitation(registration, exam_token, duration, async_send=True):
        context = {
            'candidate_name': registration.name,
            'registration_id': registration.registration_id,
            'password': registration.password,
            'course': registration.course,
            'duration': duration,
            'exam_token': exam_token
        }
        return YGREmailService._send_and_log(
            registration, 
            'Exam Invitation', 
            f'Examination Invitation | {registration.course} | YGR Global IT Services', 
            'exam_invitation.html', 
            context,
            async_send=async_send
        )

    @staticmethod
    def send_exam_submission_confirmation(registration, exam_session, async_send=True):
        context = {
            'candidate_name': registration.name,
            'registration_id': registration.registration_id,
            'course': registration.course,
            'exam_session': exam_session
        }
        return YGREmailService._send_and_log(
            registration,
            'Assessment Submission Confirmed',
            f'Assessment Submitted Successfully | {registration.course} | YGR Global IT Services',
            'exam_submission_confirmation.html',
            context,
            async_send=async_send
        )

    @staticmethod
    def send_interview_invitation(registration, interview, async_send=True):
        meeting_link = (interview.meeting_url_or_venue or '').strip()
        if interview.mode != 'Offline' and meeting_link and not meeting_link.startswith(('http://', 'https://')):
            meeting_link = f'https://{meeting_link}'

        context = {
            'candidate_name': registration.name,
            'registration_id': registration.registration_id,
            'course': registration.course,
            'interview': interview,
            'meeting_link': meeting_link
        }
        return YGREmailService._send_and_log(
            registration, 
            'Interview Invitation', 
            f'Interview Invitation | Round {interview.round_number} | YGR Global IT Services', 
            'interview_invitation.html', 
            context,
            async_send=async_send
        )

    @staticmethod
    def send_offer_letter(registration, offer, async_send=True):
        context = {
            'candidate_name': registration.name,
            'registration_id': registration.registration_id,
            'course': registration.course,
            'offer': offer
        }
        return YGREmailService._send_and_log(
            registration, 
            'Offer Letter', 
            'Official Internship Offer | YGR Global IT Services Pvt. Ltd.', 
            'offer_letter.html', 
            context,
            async_send=async_send
        )

    @staticmethod
    def send_payment_reminder(registration, async_send=True):
        context = {
            'candidate_name': registration.name,
            'registration_id': registration.registration_id,
            'course': registration.course,
            'total_amount': registration.total_amount
        }
        return YGREmailService._send_and_log(
            registration, 
            'Payment Pending', 
            'Payment Pending | Complete Your YGR Internship Registration', 
            'payment_pending.html', 
            context,
            async_send=async_send
        )

    @staticmethod
    def send_selection_decision(registration, async_send=True):
        context = {
            'candidate_name': registration.name,
            'registration_id': registration.registration_id,
            'course': registration.course,
        }
        return YGREmailService._send_and_log(
            registration, 
            'Selection Decision', 
            'Internship Selection Decision | YGR Global IT Services', 
            'selection_notification.html', 
            context,
            async_send=async_send
        )

    @staticmethod
    def send_regret_email(registration, stage_name, async_send=True):
        context = {
            'candidate_name': registration.name,
            'registration_id': registration.registration_id,
            'course': registration.course,
            'stage_name': stage_name
        }
        return YGREmailService._send_and_log(
            registration, 
            'Regret Notification', 
            'Selection Process Update | YGR Global IT Services Internship Program', 
            'regret_email.html', 
            context,
            async_send=async_send
        )

    # -------------------------------------------------------------------
    # HR Document Email Sending (Payslips, Offer Letters, Appointment Letters, Relieving Letters)
    # Reusing the existing company email configuration (SMTP & DEFAULT_FROM_EMAIL)
    # -------------------------------------------------------------------
    @staticmethod
    def _build_context(site_url=None):
        resolved_url = site_url or getattr(settings, 'SITE_URL', 'https://ygrgobalitservices.com').rstrip('/')
        return {
            'site_url': resolved_url,
            'display_domain': resolved_url.replace('https://', '').replace('http://', ''),
            'contact_email': getattr(settings, 'DEFAULT_FROM_EMAIL', 'info@ygrgobalitservices.com'),
        }

    # -------------------------------------------------------------------
    # PAYSLIP EMAIL
    # -------------------------------------------------------------------
    @staticmethod
    def send_payslip(payslip_id, sender_id=None, force=False):
        """
        Dispatch a payslip PDF email in a background thread.
        Returns (True, 'queued') or (False, reason).
        """
        from hr.models import Payslip, DocumentEmailLog, User
        from django.db import transaction

        try:
            with transaction.atomic():
                # Lock the row; reject if already sent/sending unless forced
                qs = Payslip.objects.select_for_update().filter(id=payslip_id)
                if not force:
                    qs = qs.exclude(email_status__in=['Sending', 'Sent'])
                payslip = qs.first()
                if not payslip:
                    return False, "Already sending or sent. Use force=True to resend."
                if payslip.status not in ('Approved', 'Paid'):
                    return False, "Payslip must be Approved or Paid before emailing."
                emp = payslip.employee
                if not emp.email:
                    return False, "Employee has no registered email address."
                payslip.email_status = 'Sending'
                payslip.save(update_fields=['email_status'])

            sender = None
            if sender_id:
                from hr.models import User as HRUser
                sender = HRUser.objects.filter(id=sender_id).first()

            thread = threading.Thread(
                target=HREmailService._payslip_worker,
                args=(payslip_id, sender_id),
                daemon=True
            )
            thread.start()
            return True, "queued"
        except Exception as exc:
            logger.error(f"[HREmailService] Could not queue payslip {payslip_id}: {exc}")
            return False, str(exc)

    @staticmethod
    def _payslip_worker(payslip_id, sender_id=None):
        from django.db import connection as db_conn
        try:
            from hr.models import Payslip, DocumentEmailLog, User
            from hr.views import generate_payslip_pdf_file
            from django.utils import timezone as tz

            payslip = Payslip.objects.select_related('employee', 'approved_by').get(id=payslip_id)
            emp = payslip.employee
            MONTHS = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December']
            month_name = MONTHS[payslip.month - 1] if 1 <= payslip.month <= 12 else str(payslip.month)

            from hr.payslip_utils import clean_employee_name, get_clean_designation
            emp_clean_name = clean_employee_name(emp, payslip.employee_name)
            desig_clean = get_clean_designation(payslip)

            ctx = HREmailService._build_context()
            full_context = {
                **ctx,
                'employee_name': emp_clean_name,
                'employee_emp_id': emp.emp_id or '',
                'designation': desig_clean,
                'month_name': month_name,
                'year': payslip.year,
                'gross_salary': f"{float(payslip.gross_salary or 0):,.2f}",
                'total_deductions': f"{float(payslip.total_deductions or 0):,.2f}",
                'net_salary': f"{float(payslip.net_salary or 0):,.2f}",
            }

            html_body = render_to_string('emails/payslip_delivery_email.html', full_context)
            try:
                from bs4 import BeautifulSoup
                _soup = BeautifulSoup(html_body, 'html.parser')
                for _s in _soup(['style', 'script']):
                    _s.decompose()
                _text = _soup.get_text(separator='\n')
                text_body = '\n'.join([line.strip() for line in _text.splitlines() if line.strip()])
            except Exception:
                text_body = strip_tags(html_body)
            subject = f"Salary Slip - {month_name} {payslip.year} | YGR Global IT Services"

            msg = EmailMultiAlternatives(
                subject=subject,
                body=text_body,
                from_email=ctx['contact_email'],
                to=[emp.email],
            )
            msg.attach_alternative(html_body, 'text/html')

            # Ensure PDF exists and attach it
            if not payslip.payslip_pdf or not payslip.payslip_pdf.storage.exists(payslip.payslip_pdf.name):
                generate_payslip_pdf_file(payslip)
                payslip.save()

            if payslip.payslip_pdf and payslip.payslip_pdf.storage.exists(payslip.payslip_pdf.name):
                try:
                    msg.attach_file(payslip.payslip_pdf.path)
                except Exception:
                    payslip.payslip_pdf.open('rb')
                    filename = f"Payslip_{emp_clean_name.replace(' ', '_')}_{month_name}_{payslip.year}.pdf"
                    msg.attach(filename, payslip.payslip_pdf.read(), 'application/pdf')

            msg.send(fail_silently=False)

            # Record success
            Payslip.objects.filter(id=payslip_id).update(
                email_status='Sent',
                email_sent_at=tz.now(),
                email_error=None,
            )
            sender = None
            if sender_id:
                sender = User.objects.filter(id=sender_id).first()
            DocumentEmailLog.objects.create(
                document_type='payslip',
                document_id=str(payslip_id),
                recipient_email=emp.email,
                employee=emp,
                sender=sender,
                subject=subject,
                status='Sent',
            )
            logger.info(f"[HREmailService] Payslip {payslip_id} sent to {emp.email}")
        except Exception as exc:
            error_msg = str(exc)
            logger.error(f"[HREmailService] Payslip {payslip_id} failed: {error_msg}")
            try:
                from hr.models import Payslip, DocumentEmailLog, User
                payslip = Payslip.objects.filter(id=payslip_id).first()
                emp_email = payslip.employee.email if payslip else ''
                Payslip.objects.filter(id=payslip_id).update(
                    email_status='Failed',
                    email_error=error_msg,
                )
                sender = User.objects.filter(id=sender_id).first() if sender_id else None
                DocumentEmailLog.objects.create(
                    document_type='payslip',
                    document_id=str(payslip_id),
                    recipient_email=emp_email,
                    employee=payslip.employee if payslip else None,
                    sender=sender,
                    subject=f"Payslip delivery (failed)",
                    status='Failed',
                    error_details=error_msg,
                )
            except Exception:
                pass
        finally:
            db_conn.close()

    # -------------------------------------------------------------------
    # EMPLOYEE DOCUMENT EMAIL (Offer / Joining / Relieving / Other)
    # -------------------------------------------------------------------
    @staticmethod
    def send_employee_document(document_id, sender_id=None, force=False):
        """
        Dispatch an EmployeeDocument email with PDF attachment in a background thread.
        Returns (True, 'queued') or (False, reason).
        """
        from hr.models import EmployeeDocument
        from django.db import transaction

        try:
            with transaction.atomic():
                qs = EmployeeDocument.objects.select_for_update().filter(id=document_id)
                if not force:
                    qs = qs.exclude(email_status__in=['Sending', 'Sent'])
                doc = qs.first()
                if not doc:
                    return False, "Already sending or sent. Use force=True to resend."
                if doc.status not in ('Approved', 'Issued'):
                    return False, "Document must be Approved or Issued before emailing."
                emp = doc.employee
                if not emp.email:
                    return False, "Employee has no registered email address."
                doc.email_status = 'Sending'
                doc.save(update_fields=['email_status'])

            thread = threading.Thread(
                target=HREmailService._document_worker,
                args=(document_id, sender_id),
                daemon=True
            )
            thread.start()
            return True, "queued"
        except Exception as exc:
            logger.error(f"[HREmailService] Could not queue document {document_id}: {exc}")
            return False, str(exc)

    @staticmethod
    def _document_worker(document_id, sender_id=None):
        from django.db import connection as db_conn
        try:
            from hr.models import EmployeeDocument, DocumentEmailLog, User
            from django.utils import timezone as tz

            doc = EmployeeDocument.objects.select_related('employee').get(id=document_id)
            emp = doc.employee

            ctx = HREmailService._build_context()
            full_context = {
                **ctx,
                'employee_name': emp.get_full_name() or emp.username,
                'employee_emp_id': emp.emp_id or '',
                'designation': emp.designation or 'Staff',
                'document_title': doc.title,
                'reference_number': doc.reference_number or '',
                'issue_date': str(doc.issue_date) if doc.issue_date else '',
                'document_type': doc.get_document_type_display(),
                'custom_message': '',
            }

            html_body = render_to_string('emails/employee_document_email.html', full_context)
            text_body = strip_tags(html_body)
            subject = f"{doc.title} | YGR Global IT Services Pvt. Ltd."

            msg = EmailMultiAlternatives(
                subject=subject,
                body=text_body,
                from_email=ctx['contact_email'],
                to=[emp.email],
            )
            msg.attach_alternative(html_body, 'text/html')

            # Attach stored PDF file if present
            if doc.file:
                try:
                    doc.file.seek(0)
                    pdf_bytes = doc.file.read()
                    filename = f"{doc.title.replace(' ', '_')}_{emp.emp_id or emp.username}.pdf"
                    msg.attach(filename, pdf_bytes, 'application/pdf')
                except Exception as e:
                    logger.warning(f"[HREmailService] Could not attach PDF for doc {document_id}: {e}")

            msg.send(fail_silently=False)

            sender = None
            if sender_id:
                sender = User.objects.filter(id=sender_id).first()

            EmployeeDocument.objects.filter(id=document_id).update(
                email_status='Sent',
                email_sent_at=tz.now(),
                email_error=None,
            )
            DocumentEmailLog.objects.create(
                document_type=doc.document_type,
                document_id=str(document_id),
                recipient_email=emp.email,
                employee=emp,
                sender=sender,
                subject=subject,
                status='Sent',
            )
            logger.info(f"[HREmailService] Document {document_id} sent to {emp.email}")
        except Exception as exc:
            error_msg = str(exc)
            logger.error(f"[HREmailService] Document {document_id} failed: {error_msg}")
            try:
                from hr.models import EmployeeDocument, DocumentEmailLog, User
                doc = EmployeeDocument.objects.filter(id=document_id).first()
                emp_email = doc.employee.email if doc else ''
                EmployeeDocument.objects.filter(id=document_id).update(
                    email_status='Failed',
                    email_error=error_msg,
                )
                sender = User.objects.filter(id=sender_id).first() if sender_id else None
                DocumentEmailLog.objects.create(
                    document_type=doc.document_type if doc else 'unknown',
                    document_id=str(document_id),
                    recipient_email=emp_email,
                    employee=doc.employee if doc else None,
                    sender=sender,
                    subject=f"Document delivery (failed)",
                    status='Failed',
                    error_details=error_msg,
                )
            except Exception:
                pass
        finally:
            db_conn.close()

    # -------------------------------------------------------------------
    # OFFER LETTER EMAIL WITH PDF ATTACHMENT
    # -------------------------------------------------------------------
    @staticmethod
    def send_offer_letter_document(offer_letter_id, sender_id=None, force=False):
        """
        Dispatch OfferLetter PDF email in a background thread.
        Guards: approved/issued check, duplicate check unless force=True.
        """
        from hr.models import OfferLetter
        from hr.letter_service import generate_offer_letter_pdf
        from django.db import transaction

        try:
            with transaction.atomic():
                qs = OfferLetter.objects.select_for_update().filter(id=offer_letter_id)
                if not force:
                    qs = qs.exclude(email_status__in=['Sending', 'Sent'])
                offer = qs.first()
                if not offer:
                    return False, "Offer letter email already queued or sent. Use force=True to resend."
                if offer.status not in ('Approved', 'Issued', 'Sent', 'Accepted'):
                    return False, f"Offer letter status is '{offer.status}'. Must be Approved or Issued before sending."
                if not offer.candidate_email:
                    return False, "Candidate has no registered email address."

                # Ensure PDF is generated
                if not offer.pdf_file:
                    ok, _ = generate_offer_letter_pdf(offer)
                    if not ok:
                        return False, "Failed to generate offer letter PDF prior to email dispatch."

                offer.email_status = 'Sending'
                offer.save(update_fields=['email_status'])

            thread = threading.Thread(
                target=YGREmailService._offer_letter_worker,
                args=(offer_letter_id, sender_id),
                daemon=True
            )
            thread.start()
            return True, "queued"
        except Exception as exc:
            logger.error(f"[HREmailService] Could not queue offer letter {offer_letter_id}: {exc}")
            return False, str(exc)

    @staticmethod
    def _offer_letter_worker(offer_letter_id, sender_id=None):
        from django.db import connection as db_conn
        try:
            from hr.models import OfferLetter, DocumentEmailLog, User
            from django.utils import timezone as tz

            offer = OfferLetter.objects.get(id=offer_letter_id)
            ctx = YGREmailService._build_context()
            company_details = (offer.policy_snapshot or {}).get('company_details') or {}
            company_name = company_details.get('legal_name') or 'YGR Global IT Services Pvt. Ltd.'
            full_context = {
                **ctx,
                'company_name': company_name,
                'contact_email': company_details.get('official_email') or ctx['contact_email'],
                'candidate_name': offer.candidate_name,
                'job_title': offer.job_title,
                'department': offer.department,
                'offered_ctc': offer.offered_ctc,
                'work_location': offer.work_location,
                'joining_date': str(offer.joining_date),
                'offer_validity_date': str(offer.offer_validity_date) if offer.offer_validity_date else '',
                'reference_number': offer.reference_number,
            }

            html_body = render_to_string('emails/offer_letter_notification.html', full_context)
            text_body = strip_tags(html_body)
            subject = f"Official Offer of Employment – {offer.job_title} | {company_name}"

            msg = EmailMultiAlternatives(
                subject=subject,
                body=text_body,
                from_email=ctx['contact_email'],
                to=[offer.candidate_email],
            )
            msg.attach_alternative(html_body, 'text/html')

            if offer.pdf_file:
                try:
                    offer.pdf_file.seek(0)
                    pdf_bytes = offer.pdf_file.read()
                    filename = f"Offer_Letter_{offer.candidate_name.replace(' ', '_')}.pdf"
                    msg.attach(filename, pdf_bytes, 'application/pdf')
                except Exception as e:
                    logger.warning(f"[HREmailService] Could not attach offer letter PDF: {e}")

            msg.send(fail_silently=False)

            sender = User.objects.filter(id=sender_id).first() if sender_id else None
            new_status = 'Sent' if offer.status in ('Approved', 'Issued') else offer.status
            OfferLetter.objects.filter(id=offer_letter_id).update(
                email_status='Sent',
                email_sent_at=tz.now(),
                email_error=None,
                status=new_status,
            )
            DocumentEmailLog.objects.create(
                document_type='offer_letter',
                document_id=str(offer_letter_id),
                recipient_email=offer.candidate_email,
                employee=offer.employee,
                sender=sender,
                subject=subject,
                status='Sent',
            )
            logger.info(f"[HREmailService] Offer letter {offer_letter_id} sent to {offer.candidate_email}")
        except Exception as exc:
            error_msg = str(exc)
            logger.error(f"[HREmailService] Offer letter {offer_letter_id} sending failed: {error_msg}")
            try:
                from hr.models import OfferLetter, DocumentEmailLog, User
                offer = OfferLetter.objects.filter(id=offer_letter_id).first()
                cand_email = offer.candidate_email if offer else ''
                OfferLetter.objects.filter(id=offer_letter_id).update(
                    email_status='Failed',
                    email_error=error_msg,
                )
                sender = User.objects.filter(id=sender_id).first() if sender_id else None
                DocumentEmailLog.objects.create(
                    document_type='offer_letter',
                    document_id=str(offer_letter_id),
                    recipient_email=cand_email,
                    employee=offer.employee if offer else None,
                    sender=sender,
                    subject="Offer letter delivery (failed)",
                    status='Failed',
                    error_details=error_msg,
                )
            except Exception:
                pass
        finally:
            db_conn.close()

    # -------------------------------------------------------------------
    # JOINING LETTER EMAIL WITH PDF ATTACHMENT
    # -------------------------------------------------------------------
    @staticmethod
    def send_joining_letter_document(joining_letter_id, sender_id=None, force=False):
        """
        Dispatch JoiningLetter PDF email in a background thread.
        Guards: approved/issued check, duplicate check unless force=True.
        """
        from hr.models import JoiningLetter
        from hr.letter_service import generate_joining_letter_pdf
        from django.db import transaction

        try:
            with transaction.atomic():
                qs = JoiningLetter.objects.select_for_update().filter(id=joining_letter_id)
                if not force:
                    qs = qs.exclude(email_status__in=['Sending', 'Sent'])
                letter = qs.first()
                if not letter:
                    return False, "Joining letter email already queued or sent. Use force=True to resend."
                if letter.status not in ('Approved', 'Issued', 'Sent'):
                    return False, f"Joining letter status is '{letter.status}'. Must be Approved or Issued before sending."
                if not letter.employee_email:
                    return False, "Employee has no registered email address."

                # Ensure PDF is generated
                if not letter.pdf_file:
                    ok, _ = generate_joining_letter_pdf(letter)
                    if not ok:
                        return False, "Failed to generate joining letter PDF prior to email dispatch."

                letter.email_status = 'Sending'
                letter.save(update_fields=['email_status'])

            thread = threading.Thread(
                target=YGREmailService._joining_letter_worker,
                args=(joining_letter_id, sender_id),
                daemon=True
            )
            thread.start()
            return True, "queued"
        except Exception as exc:
            logger.error(f"[HREmailService] Could not queue joining letter {joining_letter_id}: {exc}")
            return False, str(exc)

    @staticmethod
    def _joining_letter_worker(joining_letter_id, sender_id=None):
        from django.db import connection as db_conn
        try:
            from hr.models import JoiningLetter, DocumentEmailLog, User
            from django.utils import timezone as tz

            letter = JoiningLetter.objects.get(id=joining_letter_id)
            ctx = YGREmailService._build_context()
            full_context = {
                **ctx,
                'employee_name': letter.employee_name,
                'designation': letter.designation,
                'department': letter.department,
                'actual_joining_date': str(letter.actual_joining_date),
                'employee_id_number': letter.employee_id_number or '',
                'work_location': letter.work_location,
                'reference_number': letter.reference_number,
            }

            html_body = render_to_string('emails/joining_letter_notification.html', full_context)
            text_body = strip_tags(html_body)
            subject = f"Official Joining Letter – {letter.designation} | YGR Gobal IT Services"

            msg = EmailMultiAlternatives(
                subject=subject,
                body=text_body,
                from_email=ctx['contact_email'],
                to=[letter.employee_email],
            )
            msg.attach_alternative(html_body, 'text/html')

            if letter.pdf_file:
                try:
                    letter.pdf_file.seek(0)
                    pdf_bytes = letter.pdf_file.read()
                    filename = f"Joining_Letter_{letter.employee_name.replace(' ', '_')}.pdf"
                    msg.attach(filename, pdf_bytes, 'application/pdf')
                except Exception as e:
                    logger.warning(f"[HREmailService] Could not attach joining letter PDF: {e}")

            msg.send(fail_silently=False)

            sender = User.objects.filter(id=sender_id).first() if sender_id else None
            new_status = 'Sent' if letter.status in ('Approved', 'Issued') else letter.status
            JoiningLetter.objects.filter(id=joining_letter_id).update(
                email_status='Sent',
                email_sent_at=tz.now(),
                email_error=None,
                status=new_status,
            )
            DocumentEmailLog.objects.create(
                document_type='joining_letter',
                document_id=str(joining_letter_id),
                recipient_email=letter.employee_email,
                employee=letter.employee,
                sender=sender,
                subject=subject,
                status='Sent',
            )
            logger.info(f"[HREmailService] Joining letter {joining_letter_id} sent to {letter.employee_email}")
        except Exception as exc:
            error_msg = str(exc)
            logger.error(f"[HREmailService] Joining letter {joining_letter_id} sending failed: {error_msg}")
            try:
                from hr.models import JoiningLetter, DocumentEmailLog, User
                letter = JoiningLetter.objects.filter(id=joining_letter_id).first()
                emp_email = letter.employee_email if letter else ''
                JoiningLetter.objects.filter(id=joining_letter_id).update(
                    email_status='Failed',
                    email_error=error_msg,
                )
                sender = User.objects.filter(id=sender_id).first() if sender_id else None
                DocumentEmailLog.objects.create(
                    document_type='joining_letter',
                    document_id=str(joining_letter_id),
                    recipient_email=emp_email,
                    employee=letter.employee if letter else None,
                    sender=sender,
                    subject="Joining letter delivery (failed)",
                    status='Failed',
                    error_details=error_msg,
                )
            except Exception:
                pass
        finally:
            db_conn.close()


# Backward compatibility alias
HREmailService = YGREmailService

