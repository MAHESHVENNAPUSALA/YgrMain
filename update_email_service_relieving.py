with open(r"D:\YgrMain\YgrMain\Backend\main\email_service.py", "r", encoding="utf-8") as f:
    text = f.read()

relieving_email_code = '''
    # -------------------------------------------------------------------
    # RELIEVING LETTER EMAIL
    # -------------------------------------------------------------------
    @staticmethod
    def send_relieving_letter(relieving_letter_id, sender_id=None, force=False):
        """
        Dispatch RelievingLetter PDF email in a background thread.
        Guards: approved/issued check, duplicate check unless force=True.
        """
        from hr.models import RelievingLetter
        from hr.letter_service import generate_relieving_letter_pdf
        from django.db import transaction

        try:
            with transaction.atomic():
                qs = RelievingLetter.objects.select_for_update().filter(id=relieving_letter_id)
                if not force:
                    qs = qs.exclude(email_status__in=['Sending', 'Sent'])
                letter = qs.first()
                if not letter:
                    return False, "Relieving letter email already queued or sent. Use force=True to resend."
                if letter.status not in ('Approved', 'Issued'):
                    return False, f"Relieving letter status is '{letter.status}'. Must be Approved or Issued before sending."
                if not letter.employee_email:
                    return False, "Employee has no registered email address."

                # Ensure PDF is generated
                if not letter.pdf_file:
                    ok, err = generate_relieving_letter_pdf(letter)
                    if not ok:
                        return False, f"Failed to generate relieving letter PDF: {err}"

                letter.email_status = 'Sending'
                letter.save(update_fields=['email_status'])

            thread = threading.Thread(
                target=YGREmailService._relieving_letter_worker,
                args=(relieving_letter_id, sender_id),
                daemon=True
            )
            thread.start()
            return True, "queued"
        except Exception as exc:
            logger.error(f"[HREmailService] Could not queue relieving letter {relieving_letter_id}: {exc}")
            return False, str(exc)

    @staticmethod
    def _relieving_letter_worker(relieving_letter_id, sender_id=None):
        from django.db import connection as db_conn
        try:
            from hr.models import RelievingLetter, DocumentEmailLog, User
            from django.utils import timezone as tz

            letter = RelievingLetter.objects.get(id=relieving_letter_id)
            ctx = YGREmailService._build_context()
            full_context = {
                **ctx,
                'employee_name': letter.employee_name,
                'designation': letter.designation,
                'department': letter.department,
                'date_of_joining': str(letter.date_of_joining),
                'last_working_day': str(letter.last_working_day),
                'employee_id_number': letter.employee_id_number or '',
                'notice_period_status': letter.get_notice_period_status_display() if hasattr(letter, 'get_notice_period_status_display') else letter.notice_period_status,
                'clearance_status': letter.get_clearance_status_display() if hasattr(letter, 'get_clearance_status_display') else letter.clearance_status,
                'reference_number': letter.reference_number,
            }

            html_body = render_to_string('emails/relieving_letter_delivery_email.html', full_context)
            text_body = strip_tags(html_body)
            subject = f"Official Relieving Letter & Service Certificate – {letter.employee_name} | YGR Global IT Services"

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
                    filename = f"Relieving_Letter_{letter.employee_name.replace(' ', '_')}.pdf"
                    msg.attach(filename, pdf_bytes, 'application/pdf')
                except Exception as e:
                    logger.warning(f"[HREmailService] Could not attach relieving letter PDF: {e}")

            msg.send(fail_silently=False)

            sender = User.objects.filter(id=sender_id).first() if sender_id else None
            RelievingLetter.objects.filter(id=relieving_letter_id).update(
                email_status='Sent',
                email_sent_at=tz.now(),
                email_error=None,
            )
            DocumentEmailLog.objects.create(
                document_type='relieving_letter',
                document_id=str(relieving_letter_id),
                recipient_email=letter.employee_email,
                employee=letter.employee,
                sender=sender,
                subject=subject,
                status='Sent',
            )
            logger.info(f"[HREmailService] Relieving letter {relieving_letter_id} sent to {letter.employee_email}")
        except Exception as exc:
            error_msg = str(exc)
            logger.error(f"[HREmailService] Relieving letter {relieving_letter_id} sending failed: {error_msg}")
            try:
                from hr.models import RelievingLetter, DocumentEmailLog, User
                RelievingLetter.objects.filter(id=relieving_letter_id).update(
                    email_status='Failed',
                    email_error=error_msg,
                )
                letter = RelievingLetter.objects.filter(id=relieving_letter_id).first()
                emp_email = letter.employee_email if letter else "unknown"
                sender = User.objects.filter(id=sender_id).first() if sender_id else None
                DocumentEmailLog.objects.create(
                    document_type='relieving_letter',
                    document_id=str(relieving_letter_id),
                    recipient_email=emp_email,
                    employee=letter.employee if letter else None,
                    sender=sender,
                    subject="Relieving letter delivery (failed)",
                    status='Failed',
                    error_details=error_msg,
                )
            except Exception:
                pass
        finally:
            db_conn.close()

'''

target = "# Backward compatibility alias\nHREmailService = YGREmailService"
if target in text:
    text = text.replace(target, relieving_email_code + "\n" + target)
    with open(r"D:\YgrMain\YgrMain\Backend\main\email_service.py", "w", encoding="utf-8") as f:
        f.write(text)
    print("Successfully added send_relieving_letter to email_service.py")
else:
    print("Target not found in email_service.py!")

