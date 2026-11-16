import os

api_views_path = r"D:\YgrMain\YgrMain\Backend\hr\api_views.py"

with open(api_views_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Update imports
target_serializers = "JoiningLetterSerializer, CandidateSummarySerializer"
replacement_serializers = "JoiningLetterSerializer, CandidateSummarySerializer, SalaryComponentSerializer, SalaryComponentBreakdownSerializer, RelievingLetterSerializer, RelievingLetterAuditSerializer"

if target_serializers in text:
    text = text.replace(target_serializers, replacement_serializers)
    print("Updated serializer imports in api_views.py")

target_models = "JoiningLetter, JobApplication"
replacement_models = "JoiningLetter, JobApplication, SalaryComponent, SalaryComponentBreakdown, RelievingLetter, RelievingLetterAudit"

if target_models in text:
    text = text.replace(target_models, replacement_models)
    print("Updated model imports in api_views.py")

# 2. Add actions to PayslipActionAPIView
target_reject = """            return Response({
                "detail": f"Payslip rejected: {reason}",
                "status": payslip.status,
                "is_published": payslip.is_published,
            }, status=status.HTTP_200_OK)

        return Response({"detail": "Invalid action. Choose 'approve' or 'reject'."}, status=status.HTTP_400_BAD_REQUEST)"""

replacement_actions = """            return Response({
                "detail": f"Payslip rejected: {reason}",
                "status": payslip.status,
                "is_published": payslip.is_published,
            }, status=status.HTTP_200_OK)

        elif action in ('record_payment', 'mark_paid'):
            payment_date_str = request.data.get('payment_date')
            from datetime import date
            if payment_date_str:
                try:
                    payslip.payment_date = date.fromisoformat(payment_date_str)
                except ValueError:
                    payslip.payment_date = timezone.localdate()
            else:
                payslip.payment_date = timezone.localdate()
            
            bank_ref = request.data.get('bank_reference', '').strip()
            if bank_ref:
                payslip.bank_reference = bank_ref
            
            payslip.status = 'Paid'
            payslip.is_published = True
            payslip.save(update_fields=['status', 'payment_date', 'bank_reference', 'is_published', 'updated_at'])

            PayrollAuditLog.objects.create(
                payslip=payslip,
                performed_by=user,
                action='PAID',
                ip_address=ip,
                details=f"Payment recorded for {payslip.employee.username}: status Paid, Date {payslip.payment_date}, Bank Ref: {payslip.bank_reference or 'N/A'}"
            )

            return Response({
                "detail": f"Salary payment recorded successfully for {payslip.employee_name or payslip.employee.username}.",
                "status": payslip.status,
                "payment_date": payslip.payment_date,
                "bank_reference": payslip.bank_reference,
            }, status=status.HTTP_200_OK)

        elif action == 'submit_for_approval':
            payslip.status = 'Pending Approval'
            payslip.save(update_fields=['status', 'updated_at'])
            return Response({
                "detail": "Payslip submitted for approval.",
                "status": payslip.status,
            }, status=status.HTTP_200_OK)

        return Response({"detail": "Invalid action. Choose 'approve', 'reject', 'record_payment', or 'submit_for_approval'."}, status=status.HTTP_400_BAD_REQUEST)"""

if target_reject in text:
    text = text.replace(target_reject, replacement_actions)
    print("Added payment and submit actions to PayslipActionAPIView")
else:
    print("WARNING: target_reject not found!")

# 3. Add Relieving Letter & Salary Component Views at the end
new_api_views = '''

# ═══════════════════════════════════════════════════════════════════════════
# SALARY COMPONENTS API VIEWS
# ═══════════════════════════════════════════════════════════════════════════

class SalaryComponentAPIView(APIView):
    """
    GET  /api/salary-components/
    POST /api/salary-components/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        active_only = str(request.query_params.get('active_only', 'false')).lower() in ('true', '1')
        qs = SalaryComponent.objects.all()
        if active_only:
            qs = qs.filter(is_active=True)
        component_type = request.query_params.get('type')
        if component_type:
            qs = qs.filter(component_type=component_type)
        serializer = SalaryComponentSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Only HR or MD can configure salary components.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = SalaryComponentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SalaryComponentDetailAPIView(APIView):
    """
    GET    /api/salary-components/<pk>/
    PUT    /api/salary-components/<pk>/
    DELETE /api/salary-components/<pk>/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        comp = get_object_or_404(SalaryComponent, pk=pk)
        return Response(SalaryComponentSerializer(comp).data)

    def put(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        comp = get_object_or_404(SalaryComponent, pk=pk)
        serializer = SalaryComponentSerializer(comp, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        comp = get_object_or_404(SalaryComponent, pk=pk)
        comp.delete()
        return Response({'detail': 'Salary component deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


# ═══════════════════════════════════════════════════════════════════════════
# EMPLOYEE RELIEVING LETTER API VIEWS
# ═══════════════════════════════════════════════════════════════════════════

class RelievingLetterAPIView(APIView):
    """
    GET  /api/relieving-letters/
    POST /api/relieving-letters/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role in ('HR', 'MD'):
            qs = RelievingLetter.objects.select_related('employee', 'reporting_manager', 'approved_by', 'issued_by').all()
            status_param = request.query_params.get('status')
            if status_param and status_param != 'all':
                qs = qs.filter(status=status_param)
            emp_id = request.query_params.get('employee_id')
            if emp_id:
                qs = qs.filter(employee_id=emp_id)
            search = request.query_params.get('search')
            if search:
                qs = qs.filter(
                    Q(employee_name__icontains=search) |
                    Q(employee_email__icontains=search) |
                    Q(employee_id_number__icontains=search) |
                    Q(designation__icontains=search) |
                    Q(reference_number__icontains=search)
                )
        else:
            # Employee only sees their own Approved or Issued relieving letters
            qs = RelievingLetter.objects.filter(
                employee=user,
                status__in=('Approved', 'Issued')
            ).select_related('employee', 'reporting_manager', 'approved_by', 'issued_by')

        serializer = RelievingLetterSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        if user.role not in ('HR', 'MD'):
            return Response({'detail': 'Only HR or MD can initiate relieving letters.'}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        emp_id = data.get('employee')
        if not emp_id:
            return Response({'detail': 'Employee ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        emp = get_object_or_404(User, pk=emp_id)

        # Duplicate Prevention Rule
        # Prevent duplicate relieving letters for the same employee unless reissue is authorized
        reissue = str(data.get('reissue', 'false')).lower() in ('true', '1')
        existing_active = RelievingLetter.objects.filter(employee=emp).exclude(status='Revoked')
        if existing_active.exists() and not reissue:
            existing_ref = existing_active.first().reference_number
            return Response({
                'detail': f"A relieving letter ({existing_ref}) already exists for this employee. Use authorized reissue if a revised letter is needed.",
                'existing_id': existing_active.first().id,
                'existing_status': existing_active.first().status,
            }, status=status.HTTP_409_CONFLICT)

        # Auto-fill authoritative employee data from database
        from .payslip_utils import clean_employee_name, get_clean_designation
        emp_name = clean_employee_name(emp)
        data['employee_name'] = emp_name
        data['employee_email'] = emp.email or ''
        data['employee_phone'] = emp.phone or ''
        data['employee_address'] = emp.address or ''
        data['employee_id_number'] = emp.emp_id or f"EMP{emp.id}"
        if not data.get('designation'):
            data['designation'] = emp.designation or 'Software Engineer'
        if not data.get('department'):
            data['department'] = emp.department or 'Information Technology'
        if not data.get('date_of_joining'):
            data['date_of_joining'] = emp.date_of_joining or timezone.now().date()
        if not data.get('reporting_manager') and emp.reporting_manager:
            data['reporting_manager'] = emp.reporting_manager.id
            data['reporting_manager_name'] = emp.reporting_manager.get_full_name() or emp.reporting_manager.username

        # Auto-generate reference number if missing
        if not data.get('reference_number'):
            import random
            year = timezone.now().year
            rand_code = random.randint(1000, 9999)
            ref_num = f"YGR/HR/REL/{year}/{rand_code}"
            while RelievingLetter.objects.filter(reference_number=ref_num).exists():
                rand_code = random.randint(1000, 9999)
                ref_num = f"YGR/HR/REL/{year}/{rand_code}"
            data['reference_number'] = ref_num

        data['created_by'] = user.id
        data['status'] = 'Draft'

        serializer = RelievingLetterSerializer(data=data)
        if serializer.is_valid():
            letter = serializer.save(created_by=user)
            RelievingLetterAudit.objects.create(
                letter=letter,
                actor=user,
                action='CREATED',
                details={'created_by': user.username, 'reference_number': letter.reference_number}
            )
            return Response(RelievingLetterSerializer(letter).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RelievingLetterDetailAPIView(APIView):
    """
    GET    /api/relieving-letters/<pk>/
    PUT    /api/relieving-letters/<pk>/
    DELETE /api/relieving-letters/<pk>/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        letter = get_object_or_404(RelievingLetter, pk=pk)
        if request.user.role not in ('HR', 'MD'):
            if letter.employee != request.user or letter.status not in ('Approved', 'Issued'):
                return Response({'detail': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
        return Response(RelievingLetterSerializer(letter).data)

    def put(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)

        letter = get_object_or_404(RelievingLetter, pk=pk)
        if letter.status in ('Issued', 'Revoked') and request.user.role != 'MD':
            return Response({'detail': f'Cannot modify a relieving letter with status {letter.status}.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = RelievingLetterSerializer(letter, data=request.data, partial=True)
        if serializer.is_valid():
            updated_letter = serializer.save()
            RelievingLetterAudit.objects.create(
                letter=updated_letter,
                actor=request.user,
                action='UPDATED',
                details={'updated_by': request.user.username, 'changes': list(request.data.keys())}
            )
            return Response(RelievingLetterSerializer(updated_letter).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)

        letter = get_object_or_404(RelievingLetter, pk=pk)
        if letter.status != 'Draft' and request.user.role != 'MD':
            return Response({'detail': 'Only Draft relieving letters can be deleted.'}, status=status.HTTP_400_BAD_REQUEST)

        letter.delete()
        return Response({'detail': 'Relieving letter deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


class RelievingLetterActionAPIView(APIView):
    """
    POST /api/relieving-letters/<pk>/action/
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)

        letter = get_object_or_404(RelievingLetter, pk=pk)
        action = request.data.get('action')
        from hr.letter_service import generate_relieving_letter_pdf

        if action == 'submit_for_approval':
            if letter.status not in ('Draft',):
                return Response({'detail': f"Cannot submit letter in status '{letter.status}'."}, status=status.HTTP_400_BAD_REQUEST)
            letter.status = 'Pending Approval'
            letter.save(update_fields=['status', 'updated_at'])
            RelievingLetterAudit.objects.create(
                letter=letter,
                actor=request.user,
                action='SUBMITTED',
                details={'submitted_by': request.user.username}
            )
            return Response({
                'detail': 'Relieving letter submitted for HR Manager / MD approval.',
                'letter': RelievingLetterSerializer(letter).data
            })

        elif action == 'approve':
            letter.status = 'Approved'
            letter.approved_by = request.user
            letter.approved_at = timezone.now()
            letter.save(update_fields=['status', 'approved_by', 'approved_at', 'updated_at'])
            generate_relieving_letter_pdf(letter)
            RelievingLetterAudit.objects.create(
                letter=letter,
                actor=request.user,
                action='APPROVED',
                details={'approved_by': request.user.username}
            )
            return Response({
                'detail': 'Relieving letter approved successfully and PDF generated.',
                'letter': RelievingLetterSerializer(letter).data
            })

        elif action == 'issue':
            # Verification Rule: Do not issue this letter before employee's last working day
            # or authorized early release date.
            today = timezone.localdate()
            authorized_early = str(request.data.get('authorized_early_release', 'false')).lower() in ('true', '1')
            if today < letter.last_working_day and not authorized_early:
                return Response({
                    'detail': f"Cannot issue relieving letter before the employee's last working day ({letter.last_working_day}). If an authorized early release was approved, please confirm early release.",
                    'last_working_day': letter.last_working_day,
                    'today': today,
                }, status=status.HTTP_400_BAD_REQUEST)

            letter.status = 'Issued'
            letter.issued_by = request.user
            letter.issued_at = timezone.now()
            letter.issue_date = today
            letter.save(update_fields=['status', 'issued_by', 'issued_at', 'issue_date', 'updated_at'])
            generate_relieving_letter_pdf(letter)

            # Sync to EmployeeDocument table for centralized staff document access
            try:
                EmployeeDocument.objects.update_or_create(
                    reference_number=letter.reference_number,
                    defaults={
                        'employee': letter.employee,
                        'document_type': 'relieving_letter',
                        'title': f"Relieving Letter - {letter.employee_name}",
                        'file': letter.pdf_file,
                        'status': 'Approved',
                        'issue_date': today,
                        'approved_by': letter.approved_by or request.user,
                        'approved_at': letter.approved_at or timezone.now(),
                    }
                )
            except Exception as e:
                pass

            RelievingLetterAudit.objects.create(
                letter=letter,
                actor=request.user,
                action='ISSUED',
                details={'issued_by': request.user.username, 'issue_date': str(today)}
            )
            return Response({
                'detail': 'Relieving letter officially issued. Employee can now download it from their portal.',
                'letter': RelievingLetterSerializer(letter).data
            })

        elif action == 'revoke':
            reason = request.data.get('reason', 'Revoked by authorized management.')
            letter.status = 'Revoked'
            letter.save(update_fields=['status', 'updated_at'])
            RelievingLetterAudit.objects.create(
                letter=letter,
                actor=request.user,
                action='REVOKED',
                details={'revoked_by': request.user.username, 'reason': reason}
            )
            return Response({
                'detail': f'Relieving letter revoked: {reason}',
                'letter': RelievingLetterSerializer(letter).data
            })

        elif action == 'generate_pdf':
            ok, res = generate_relieving_letter_pdf(letter)
            if ok:
                return Response({
                    'detail': 'PDF generated successfully.',
                    'pdf_url': letter.pdf_file.url,
                    'letter': RelievingLetterSerializer(letter).data
                })
            return Response({'detail': f'PDF generation failed: {res}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'detail': f'Unknown action: {action}'}, status=status.HTTP_400_BAD_REQUEST)


class RelievingLetterPreviewAPIView(APIView):
    """
    GET /api/relieving-letters/<pk>/preview/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        letter = get_object_or_404(RelievingLetter, pk=pk)
        from hr.letter_service import render_relieving_letter_html
        html = render_relieving_letter_html(letter)
        from django.http import HttpResponse
        return HttpResponse(html, content_type='text/html')


class RelievingLetterDownloadAPIView(APIView):
    """
    GET /api/relieving-letters/<pk>/download/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        letter = get_object_or_404(RelievingLetter, pk=pk)
        if request.user.role not in ('HR', 'MD'):
            if letter.employee != request.user or letter.status not in ('Approved', 'Issued'):
                return Response({'detail': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)

        if not letter.pdf_file or not letter.pdf_file.storage.exists(letter.pdf_file.name):
            from hr.letter_service import generate_relieving_letter_pdf
            ok, _ = generate_relieving_letter_pdf(letter)
            if not ok or not letter.pdf_file:
                return Response({'detail': 'PDF file generation failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        from django.http import FileResponse
        safe_name = letter.employee_name.replace(' ', '_')
        safe_ref = letter.reference_number.replace('/', '_')
        filename = f"Relieving_Letter_{safe_name}_{safe_ref}.pdf"
        response = FileResponse(letter.pdf_file.open('rb'), content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response


class RelievingLetterSendEmailAPIView(APIView):
    """
    POST /api/relieving-letters/<pk>/send-email/
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Only HR or MD can send relieving letters.'}, status=status.HTTP_403_FORBIDDEN)

        letter = get_object_or_404(RelievingLetter, pk=pk)
        force = str(request.data.get('force', 'false')).lower() in ('true', '1', 'yes')

        if not force and letter.email_status in ('Sending', 'Sent'):
            return Response({
                'detail': f"Relieving letter email is already {letter.email_status}. Pass force=true to resend.",
                'email_status': letter.email_status
            }, status=status.HTTP_400_BAD_REQUEST)

        if letter.status not in ('Approved', 'Issued'):
            return Response({
                'detail': f"Relieving letter status is '{letter.status}'. It must be Approved or Issued before emailing."
            }, status=status.HTTP_400_BAD_REQUEST)

        from main.email_service import HREmailService
        ok, reason = HREmailService.send_relieving_letter(
            relieving_letter_id=letter.id,
            sender_id=request.user.id,
            force=force
        )

        if ok:
            return Response({
                'detail': f"Relieving letter email queued successfully for {letter.employee_email}.",
                'email_status': 'Sending'
            }, status=status.HTTP_200_OK)
        return Response({'detail': reason}, status=status.HTTP_400_BAD_REQUEST)


class RelievingLetterAuditAPIView(APIView):
    """
    GET /api/relieving-letters/<pk>/audit/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        letter = get_object_or_404(RelievingLetter, pk=pk)
        if request.user.role not in ('HR', 'MD') and letter.employee != request.user:
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        audits = letter.audit_events.all()
        return Response(RelievingLetterAuditSerializer(audits, many=True).data)
'''

text += new_api_views
print("Appended new API views to api_views.py")

with open(api_views_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Saved updated api_views.py")

