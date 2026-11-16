from django.utils import timezone
from decimal import Decimal
from django.contrib.auth import login, logout, get_user_model
from django.db.models import Q
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, AttendanceSerializer, TaskSerializer, PayslipSerializer, AttendanceCorrectionSerializer, LeaveSerializer, HolidaySerializer, SalaryStructureSerializer, SalaryHistorySerializer, ProjectSerializer, DailyReportSerializer, HRSettingsSerializer, ChatMessageSerializer, ChatRoomSerializer, GroupMessageSerializer, CallSessionSerializer, ClientSerializer, ServiceSerializer, InvoiceItemSerializer, InvoiceSerializer, QuestionSerializer, ExamuserSerializer, ExamSessionSerializer, ResultSerializer, TeamSerializer, ProjectDocumentSerializer, ProjectCommentSerializer, ProjectAuditLogSerializer, NotificationSerializer, ProjectDetailSerializer, OfferLetterSerializer, JoiningLetterSerializer, CandidateSummarySerializer, SalaryComponentSerializer, SalaryComponentBreakdownSerializer, RelievingLetterSerializer, RelievingLetterAuditSerializer
from .models import Attendance, Team, Task, Payslip, DailyReport, Holiday, Project, Leave, AttendanceCorrection, SalaryStructure, SalaryHistory, HRSettings, ChatMessage, ChatRoom, GroupMessage, CallSession, Client, Service, Invoice, InvoiceItem, Question, Examuser, ExamSession, Result, UserAnswer, ProjectDocument, ProjectComment, ProjectAuditLog, Notification, TaskReview, ClientTaskReview, PayrollAuditLog, PayslipDownloadLog, EmployeeDocument, DocumentEmailLog, OfferLetter, OfferLetterPolicyVersion, OfferLetterAudit, JoiningLetter, JobApplication, SalaryComponent, SalaryComponentBreakdown, RelievingLetter, RelievingLetterAudit

User = get_user_model()

class GetCSRFToken(APIView):
    permission_classes = [AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        return Response({"detail": "CSRF cookie set"}, status=status.HTTP_200_OK)


class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        identifier = request.data.get("username")
        password = request.data.get("password")
        remember_me = request.data.get("remember_me", False)

        if not identifier or not password:
            return Response(
                {"detail": "Please provide both Username/Email/Employee ID and Password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user_obj = User.objects.filter(
            Q(emp_id__iexact=identifier) |
            Q(email__iexact=identifier) |
            Q(username__iexact=identifier)
        ).first()

        if user_obj and user_obj.check_password(password):
            if not user_obj.is_active:
                return Response(
                    {"detail": "User account is disabled."},
                    status=status.HTTP_403_FORBIDDEN
                )

            login(request, user_obj)
            
            if not remember_me:
                request.session.set_expiry(0)
            else:
                request.session.set_expiry(1209600)  # 2 weeks

            serializer = UserSerializer(user_obj)
            return Response({
                "user": serializer.data,
                "detail": "Successfully logged in."
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                {"detail": "Invalid credentials. Please check your username/password."},
                status=status.HTTP_401_UNAUTHORIZED
            )


from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication

class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # Bypass CSRF check in DRF SessionAuthentication

@method_decorator(csrf_exempt, name='dispatch')
class LogoutAPIView(APIView):
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)


class CurrentUserAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if not request.user or not request.user.is_authenticated:
            return JsonResponse(None, safe=False)
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AttendanceStatusAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.localdate()
        from hr.models import Leave
        on_leave_today = Leave.objects.filter(
            user=request.user,
            status__in=['Approved', 'Final Approved'],
            from_date__lte=today,
            to_date__gte=today
        ).exists()

        attendance = Attendance.objects.filter(user=request.user, date=today).first()
        att_data = None
        if attendance:
            att_data = AttendanceSerializer(attendance, context={'request': request}).data
            
        return Response({
            "attendance_record": att_data,
            "on_leave_today": on_leave_today,
            "leave_message": "You are on approved leave today." if on_leave_today else None
        }, status=status.HTTP_200_OK)


def _get_client_ip(request):
    """Extract real client IP from request."""
    x_forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded:
        return x_forwarded.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR', '')


def _parse_user_agent(ua_string):
    """Return (browser_str, device_str) from User-Agent header."""
    ua = ua_string or ''
    # Browser detection
    browser = 'Unknown'
    if 'Edg/' in ua or 'Edge/' in ua:
        browser = 'Microsoft Edge'
    elif 'OPR/' in ua or 'Opera' in ua:
        browser = 'Opera'
    elif 'Chrome/' in ua and 'Safari/' in ua:
        browser = 'Chrome'
    elif 'Firefox/' in ua:
        browser = 'Firefox'
    elif 'Safari/' in ua:
        browser = 'Safari'
    # Device type
    device = 'Desktop'
    ua_lower = ua.lower()
    if any(m in ua_lower for m in ['iphone', 'android', 'mobile', 'blackberry', 'windows phone']):
        device = 'Mobile'
    elif any(t in ua_lower for t in ['ipad', 'tablet']):
        device = 'Tablet'
    return browser, device


def _save_base64_image(b64_data, subfolder, prefix):
    """Decode a base64 data URI and save as an ImageField-compatible file."""
    import base64, uuid
    from django.core.files.base import ContentFile
    if not b64_data:
        return None
    try:
        if ',' in b64_data:
            header, data = b64_data.split(',', 1)
        else:
            data = b64_data
        ext = 'jpg'
        if 'png' in (header if ',' in b64_data else ''):
            ext = 'png'
        decoded = base64.b64decode(data)
        filename = f"{prefix}_{uuid.uuid4().hex[:8]}.{ext}"
        return ContentFile(decoded, name=filename)
    except Exception:
        return None


class CheckInAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        today = timezone.localdate()
        from hr.models import Leave
        on_leave_today = Leave.objects.filter(
            user=request.user,
            status__in=['Approved', 'Final Approved'],
            from_date__lte=today,
            to_date__gte=today
        ).exists()
        if on_leave_today:
            return Response({"detail": "You are on approved leave today. Cannot check in."}, status=status.HTTP_403_FORBIDDEN)
            
        attendance, created = Attendance.objects.get_or_create(
            user=request.user,
            date=today
        )
        if attendance.check_in_time:
            return Response(
                {"detail": "You have already checked in today."},
                status=status.HTTP_400_BAD_REQUEST
            )

        attendance.check_in_time = timezone.now()

        # ── Selfie (base64) ──
        selfie_b64 = request.data.get('selfie') or request.data.get('photo')
        if selfie_b64:
            img_file = _save_base64_image(selfie_b64, 'attendance/checkin', 'checkin')
            if img_file:
                attendance.check_in_image.save(img_file.name, img_file, save=False)
                attendance.check_in_photo.save(img_file.name, img_file, save=False)

        # ── GPS ──
        try:
            lat = float(request.data.get('latitude', 0) or 0)
            lng = float(request.data.get('longitude', 0) or 0)
        except (ValueError, TypeError):
            lat, lng = None, None
        if lat and lng:
            attendance.check_in_latitude = lat
            attendance.check_in_longitude = lng
            attendance.check_in_map_url = f"https://maps.google.com/?q={lat},{lng}"

        # ── Address & location string ──
        address = request.data.get('address', '')
        location = request.data.get('location', '')
        if address:
            attendance.check_in_address = address
        if location:
            attendance.check_in_location = location
        elif address:
            attendance.check_in_location = address

        # ── IP + Device ──
        attendance.check_in_ip = _get_client_ip(request) or None
        ua = request.META.get('HTTP_USER_AGENT', '') or request.data.get('user_agent', '')
        browser, device = _parse_user_agent(ua)
        attendance.check_in_browser = browser
        attendance.check_in_device = device

        attendance.save()
        serializer = AttendanceSerializer(attendance, context={'request': request})
        return Response({
            "detail": "Checked in successfully.",
            "attendance": serializer.data
        }, status=status.HTTP_200_OK)


class CheckOutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        today = timezone.localdate()
        attendance = Attendance.objects.filter(user=request.user, date=today).first()
        if not attendance:
            return Response(
                {"detail": "No attendance record found for today. Check in first."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if attendance.check_out_time:
            return Response(
                {"detail": "You have already checked out today."},
                status=status.HTTP_400_BAD_REQUEST
            )

        attendance.check_out_time = timezone.now()

        # ── Selfie (base64) ──
        selfie_b64 = request.data.get('selfie') or request.data.get('photo')
        if selfie_b64:
            img_file = _save_base64_image(selfie_b64, 'attendance/checkout', 'checkout')
            if img_file:
                attendance.check_out_image.save(img_file.name, img_file, save=False)
                attendance.check_out_photo.save(img_file.name, img_file, save=False)

        # ── GPS ──
        try:
            lat = float(request.data.get('latitude', 0) or 0)
            lng = float(request.data.get('longitude', 0) or 0)
        except (ValueError, TypeError):
            lat, lng = None, None
        if lat and lng:
            attendance.check_out_latitude = lat
            attendance.check_out_longitude = lng
            attendance.check_out_map_url = f"https://maps.google.com/?q={lat},{lng}"

        # ── Address & location string ──
        address = request.data.get('address', '')
        location = request.data.get('location', '')
        if address:
            attendance.check_out_address = address
        if location:
            attendance.check_out_location = location
        elif address:
            attendance.check_out_location = address

        # ── IP + Device ──
        attendance.check_out_ip = _get_client_ip(request) or None
        ua = request.META.get('HTTP_USER_AGENT', '') or request.data.get('user_agent', '')
        browser, device = _parse_user_agent(ua)
        attendance.check_out_browser = browser
        attendance.check_out_device = device

        attendance.calculate_status()
        attendance.save()
        serializer = AttendanceSerializer(attendance, context={'request': request})
        return Response({
            "detail": "Checked out successfully.",
            "attendance": serializer.data
        }, status=status.HTTP_200_OK)


class EmployeeDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != "Employee":
            return Response({"detail": "Access Denied: Not an Employee."}, status=status.HTTP_403_FORBIDDEN)
        # --- Performance Metrics Injection ---
        from django.db.models import Avg, F
        completed_tasks = Task.objects.filter(assigned_to=user, status='Completed')
        
        assigned_tasks_count = Task.objects.filter(assigned_to=user).count()
        completed_tasks_count = completed_tasks.count()
        pending_tasks_count = Task.objects.filter(assigned_to=user, status__in=['Pending', 'In Progress', 'Need Changes']).count()
        
        late_tasks_count = 0
        for t in completed_tasks:
            if t.actual_submission_time and t.end_date:
                completion_local = timezone.localtime(t.actual_submission_time).date()
                if completion_local > t.end_date:
                    late_tasks_count += 1
        
        perf_reviews = TaskReview.objects.filter(task__assigned_to=user, review_status='Finalized')
        avg_perf = perf_reviews.aggregate(Avg('final_score'))['final_score__avg'] or 0
        
        recent_reviews = perf_reviews.order_by('-task__actual_submission_time')[:5]
        recent_reviews_data = []
        for r in recent_reviews:
            recent_reviews_data.append({
                "task_name": r.task.task_name,
                "score": r.final_score,
                "date": r.md_reviewed_at.isoformat() if r.md_reviewed_at else None
            })
        
        performance_data = {
            "assigned_tasks": assigned_tasks_count,
            "completed_tasks": completed_tasks_count,
            "pending_tasks": pending_tasks_count,
            "late_tasks": late_tasks_count,
            "performance_percentage": round(avg_perf, 2),
            "recent_reviews": recent_reviews_data
        }
        # -----------------------------------

            
        today_date = timezone.localdate()
        on_leave_qs = Leave.objects.filter(status__in=['Approved', 'Final Approved'], from_date__lte=today_date, to_date__gte=today_date)
        on_leave_today = [{"name": l.user.get_full_name() or l.user.username, "emp_id": l.user.emp_id, "role": l.user.role} for l in on_leave_qs]
        on_leave_count = on_leave_qs.count()
            
        # Get team lead and members
        team = Team.objects.filter(members=user).select_related("lead").prefetch_related("members").first()
        team_lead_data = None
        team_members_data = []
        
        if team:
            if team.lead:
                team_lead_data = {
                    "id": team.lead.id,
                    "name": team.lead.get_full_name() or team.lead.username,
                    "emp_id": team.lead.emp_id,
                }
            for member in team.members.exclude(id=user.id):
                team_members_data.append({
                    "id": member.id,
                    "name": member.get_full_name() or member.username,
                    "emp_id": member.emp_id,
                })
                
        # Tasks
        tasks = Task.objects.filter(assigned_to=user)
        tasks_serializer = TaskSerializer(tasks, many=True)
        
        # Latest Payslip (Approved or Paid only)
        latest_payslip = Payslip.objects.filter(employee=user, is_published=True, status__in=['Approved', 'Paid']).order_by('-year', '-month').first()
        payslip_data = PayslipSerializer(latest_payslip).data if latest_payslip else None

        # Recent DMs
        from django.db.models import Q as _Q
        recent_messages = ChatMessage.objects.filter(_Q(sender=user) | _Q(receiver=user)).order_by('-created_at')[:5]
        recent_messages_data = [{
            "sender_name": m.sender.get_full_name() or m.sender.username,
            "text": m.text or '',
            "created_at": m.created_at.isoformat()
        } for m in recent_messages]

        # Auto-populate some sample notifications if there are absolutely none for this user
        if not Notification.objects.filter(recipient=user).exists():
            Notification.objects.create(recipient=user, title="Shift Reminder", message="Daily check-in window starts at 09:30 AM.")
            Notification.objects.create(recipient=user, title="Payslip Published", message="May 2026 payslips are now available.")
            Notification.objects.create(recipient=user, title="Announcement: Q2 Townhall Scheduled", message="Townhall meeting this Friday at 4:00 PM via Teams link.")
            Notification.objects.create(recipient=user, title="Announcement: Device Geolocation Policy", message="Attendance now tracks coordinates during check-in/out.")
            Notification.objects.create(recipient=user, title="Announcement: FY26 Annual General Meet", message="Scheduled on July 25, 2026. Board deck preparation in alignment.")

        all_notifs = Notification.objects.filter(recipient=user).order_by('-created_at')
        notifications_list = all_notifs.filter(~_Q(title__icontains="Announcement"))[:5]
        announcements_list = all_notifs.filter(title__icontains="Announcement")[:5]

        notifications_data = [{
            "title": n.title,
            "message": n.message,
            "created_at": n.created_at.isoformat()
        } for n in notifications_list]

        announcements_data = [{
            "title": a.title.replace("Announcement: ", ""),
            "message": a.message,
            "created_at": a.created_at.isoformat()
        } for a in announcements_list]
        
        return Response({
            "team_lead": team_lead_data,
            "team_members": team_members_data,
            "tasks": tasks_serializer.data,
            "active_tasks_count": tasks.filter(status__in=["Pending", "In Progress"]).count(),
            "latest_payslip": payslip_data,
            "recent_messages": recent_messages_data,
            "notifications": notifications_data,
            "announcements": announcements_data,
            "performance_data": performance_data,
        }, status=status.HTTP_200_OK)


class HRDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != "HR":
            return Response({"detail": "Access Denied: Not an HR."}, status=status.HTTP_403_FORBIDDEN)
        # --- HR Performance Metrics Injection ---
        pending_hr_reviews = TaskReview.objects.filter(review_status='Pending HR').count()
        from django.db.models import Avg, F
        avg_company_perf = TaskReview.objects.filter(review_status='Finalized').aggregate(Avg('final_score'))['final_score__avg'] or 0
        
        hr_performance_data = {
            "pending_reviews": pending_hr_reviews,
            "average_performance": round(avg_company_perf, 2)
        }
        # -----------------------------------

            
        today_date = timezone.localdate()
        on_leave_qs = Leave.objects.filter(status__in=['Approved', 'Final Approved'], from_date__lte=today_date, to_date__gte=today_date)
        on_leave_today = [{"name": l.user.get_full_name() or l.user.username, "emp_id": l.user.emp_id, "role": l.user.role} for l in on_leave_qs]
        on_leave_count = on_leave_qs.count()
            
        from datetime import date, timedelta
        hr_count = User.objects.filter(role="HR").count()
        manager_count = User.objects.filter(role="Manager").count()
        teamlead_count = User.objects.filter(role="TeamLead").count()
        employee_count = User.objects.filter(role="Employee").count()
        # Include all roles in headcount: HR + Manager + TeamLead + Employee
        total_users = hr_count + manager_count + teamlead_count + employee_count
        
        today = date.today()
        today_reports_count = DailyReport.objects.filter(report_date=today).count()
        
        holiday_stats = {
            "all": Holiday.objects.count(),
            "pending": Holiday.objects.filter(status='Pending').count(),
            "approved": Holiday.objects.filter(status='Approved').count(),
        }
        
        # Attendance stats
        present_count = Attendance.objects.filter(date=today, status__icontains='Present').count()
        on_leave_count = Leave.objects.filter(from_date__lte=today, to_date__gte=today, status__in=['Approved', 'Final Approved']).count()
        absent_count = max(0, total_users - present_count - on_leave_count)

        # Monthly Payroll Summary for MD
        current_month_slips = Payslip.objects.filter(month=current_month, year=current_year)
        payroll_gross_total = sum(p.gross_salary for p in current_month_slips)
        payroll_deductions_total = sum(p.total_deductions for p in current_month_slips)
        payroll_net_total = sum(p.net_salary for p in current_month_slips)
        payroll_pending_approval_count = Payslip.objects.filter(status='Pending Approval').count()

        # Relieving Letters Pending MD Approval
        pending_relieving_qs = RelievingLetter.objects.filter(status='Pending Approval').select_related('employee')
        pending_relieving_list = [{
            'id': rl.id,
            'employee_name': rl.employee_name,
            'employee_id': rl.employee_id_number,
            'designation': rl.designation,
            'department': rl.department,
            'last_working_day': str(rl.last_working_day),
            'reference_number': rl.reference_number,
            'created_at': rl.created_at.strftime('%d %b %Y') if rl.created_at else '',
        } for rl in pending_relieving_qs]

        # Payroll stats
        salary_budget = 0
        pf_total = 0
        tds_total = 0
        for s in SalaryStructure.objects.all():
            salary_budget += float(s.monthly_gross)
            if s.pf_amount > 0:
                pf_total += float(s.pf_amount)
            else:
                pf_total += float(s.basic_salary) * (float(s.pf_rate) / 100)
            tds_total += float(s.tds_amount)

        # Recruitment stats - use actual DB counts without fake fallbacks
        thirty_days_ago = today - timedelta(days=30)
        new_joiners = User.objects.filter(date_of_joining__gte=thirty_days_ago).count()
        active_job_openings = User.objects.filter(is_active=False).count()
        interviews_scheduled = User.objects.filter(status='Probation').count()
        pending_offers = User.objects.filter(status='Fresher').count()

        # Document Verification
        pending_docs_users = User.objects.exclude(document='').exclude(document__isnull=True).filter(is_document_verified=False).order_by('-id')[:5]
        pending_docs_data = []
        for u in pending_docs_users:
            pending_docs_data.append({
                "id": u.id,
                "name": u.get_full_name() or u.username,
                "emp_id": u.emp_id,
                "document_url": request.build_absolute_uri(u.document.url) if u.document else None,
                "doc_name": u.document.name.split('/')[-1] if u.document else 'Document'
            })

        # Corporate Announcements (Using Notifications designated as announcements)
        # Ensure default announcements exist
        if not Notification.objects.filter(recipient=user).exists():
            Notification.objects.create(recipient=user, title="Announcement: Q2 Townhall Scheduled", message="Townhall meeting this Friday at 4:00 PM via Teams link.")
            Notification.objects.create(recipient=user, title="Announcement: Device Geolocation Policy", message="Attendance now tracks coordinates during check-in/out.")
            Notification.objects.create(recipient=user, title="Announcement: FY26 Annual General Meet", message="Scheduled on July 25, 2026. Board deck preparation in alignment.")

        announcements = Notification.objects.filter(recipient=user, title__icontains="Announcement").order_by('-created_at')[:5]
        announcements_data = [{
            "title": a.title.replace("Announcement: ", ""),
            "message": a.message,
            "created_at": a.created_at.isoformat()
        } for a in announcements]

        # Recent activities (Operational Audit Logs from ProjectAuditLog)
        recent_logs = ProjectAuditLog.objects.select_related('user', 'project').order_by('-timestamp')[:5]
        recent_activities = []
        for log in recent_logs:
            recent_activities.append({
                "details": f"{log.action}: {log.project.name} (by {log.user.username if log.user else 'System'})",
                "time_display": timezone.localtime(log.timestamp).strftime("%Y-%m-%d %H:%M"),
                "icon": "fa-solid fa-file-invoice" if "Created" in log.action else "fa-solid fa-user-plus" if "Assign" in log.action else "fa-solid fa-shield"
            })
            
        return Response({
            "total_users": total_users,
            "hr_count": hr_count,
            "manager_count": manager_count,
            "teamlead_count": teamlead_count,
            "employee_count": employee_count,
            "today_reports_count": today_reports_count,
            "holiday_stats": holiday_stats,
            "present_count": present_count,
            "on_leave_count": on_leave_count,
            "absent_count": absent_count,
            "payroll_stats": {
                "salary_budget": salary_budget,
                "pf_contributions": pf_total,
                "tds_withheld": tds_total,
                "pending_runs": Payslip.objects.filter(status='Pending Approval').count(),
            },
            "relieving_stats": {
                "pending_approval": RelievingLetter.objects.filter(status='Pending Approval').count(),
                "approved": RelievingLetter.objects.filter(status='Approved').count(),
                "issued": RelievingLetter.objects.filter(status='Issued').count(),
                "total": RelievingLetter.objects.exclude(status='Revoked').count(),
            },
            "payroll_workflow_stats": {
                "draft": Payslip.objects.filter(status='Draft').count(),
                "pending_approval": Payslip.objects.filter(status='Pending Approval').count(),
                "approved": Payslip.objects.filter(status='Approved').count(),
                "paid": Payslip.objects.filter(status='Paid').count(),
            },
            "recruitment_stats": {
                "active_job_openings": active_job_openings,
                "interviews_scheduled": interviews_scheduled,
                "pending_offers": pending_offers,
                "new_joiners": new_joiners,
            },
            "pending_documents": pending_docs_data,
            "corporate_announcements": announcements_data,
            "recent_activities": recent_activities,
        
       "performance_data": hr_performance_data,}, status=status.HTTP_200_OK)


class TLDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != "TeamLead":
            return Response({"detail": "Access Denied: Not a Team Lead."}, status=status.HTTP_403_FORBIDDEN)
        # --- TL Performance Metrics Injection ---
        tl_teams = Team.objects.filter(lead=user)
        team_members = User.objects.filter(teams__in=tl_teams).distinct()
        
        pending_reviews = TaskReview.objects.filter(task__assigned_to__in=team_members, review_status='Pending HR', task__created_by=user).count() # Wait, TL needs to review if task is Completed and no review exists.
        
        # Tasks completed by team members, waiting for TL review
        tasks_waiting_tl_review = Task.objects.filter(
            assigned_to__in=team_members, 
            status='Completed'
        ).exclude(review__isnull=False).count()
        
        completed_reviews = TaskReview.objects.filter(tl_reviewed_by=user).count()
        
        team_performance_data = {
            "pending_reviews": tasks_waiting_tl_review,
            "completed_reviews": completed_reviews,
            "team_size": team_members.count()
        }
        # -----------------------------------

            
        today_date = timezone.localdate()
        on_leave_qs = Leave.objects.filter(status__in=['Approved', 'Final Approved'], from_date__lte=today_date, to_date__gte=today_date)
        on_leave_today = [{"name": l.user.get_full_name() or l.user.username, "emp_id": l.user.emp_id, "role": l.user.role} for l in on_leave_qs]
        on_leave_count = on_leave_qs.count()
            
        teams = Team.objects.filter(lead=user)
        
        projects_count = 0
        members_count = 0
        projects_list = []
        upcoming_tasks_data = []
        member_status_list = []
        team_activities = []
        
        # Get team members
        members = User.objects.filter(teams__in=teams).distinct()
        members_count = members.count()
        
        # Get projects assigned to teams OR projects where the Team Lead has tasks
        projects = Project.objects.filter(
            Q(assigned_teams__in=teams) | Q(tasks__assigned_to=user)
        ).distinct()
        projects_count = projects.count()
        
        if True:
            
            for p in projects:
                total_t = Task.objects.filter(project=p).count()
                comp_t = Task.objects.filter(project=p, status='Completed').count()
                progress = int(comp_t / total_t * 100) if total_t > 0 else 0
                
                projects_list.append({
                    "id": p.id,
                    "project_name": p.name,
                    "description": p.description,
                    "progress": progress,
                    "deadline": str(p.deadline) if p.deadline else 'No deadline',
                    "risk_level": "High" if p.priority in ["Critical", "High"] else "Medium" if p.priority == "Medium" else "Low"
                })
            
            # Upcoming tasks
            upcoming_tasks = Task.objects.filter(
                assigned_to__in=members,
                status__in=['Pending', 'In Progress', 'Submitted']
            ).select_related("project").order_by("end_date")[:5]
            
            for t in upcoming_tasks:
                upcoming_tasks_data.append({
                    "id": t.id,
                    "task_name": t.task_name,
                    "project_name": t.project.name if t.project else "General",
                    "end_date": str(t.end_date),
                    "status": t.status,
                    "priority": 'Medium'
                })
                
            # Member status
            today = timezone.localdate()
            today_attendances = {
                att.user_id: att for att in Attendance.objects.filter(user__in=members, date=today)
            }
            
            for m in members:
                att = today_attendances.get(m.id)
                check_in = timezone.localtime(att.check_in_time).strftime("%I:%M %p") if att and att.check_in_time else "—"
                check_out = timezone.localtime(att.check_out_time).strftime("%I:%M %p") if att and att.check_out_time else "—"
                att_status = att.status if att else "Absent"
                working_hours = str(att.total_hours) if att and att.total_hours else "—"
                
                curr_task = Task.objects.filter(assigned_to=m, status__in=["Pending", "In Progress", "Submitted"]).order_by("end_date").first()
                task_name = curr_task.task_name if curr_task else "No Active Task"
                task_status = curr_task.status if curr_task else "—"
                
                # Dynamic performance metrics
                t_total = Task.objects.filter(assigned_to=m).count()
                t_comp = Task.objects.filter(assigned_to=m, status='Completed').count()
                
                att_total_days = Attendance.objects.filter(user=m).count()
                att_present_days = Attendance.objects.filter(user=m, status__icontains='Present').count()
                att_pct = int(att_present_days / att_total_days * 100) if att_total_days > 0 else 0
                prod_pct = int(t_comp / t_total * 100) if t_total > 0 else 0
                
                member_status_list.append({
                    "id": m.id,
                    "name": m.get_full_name() or m.username,
                    "emp_id": m.emp_id,
                    "check_in": check_in,
                    "check_out": check_out,
                    "working_hours": working_hours,
                    "attendance_status": att_status,
                    "current_task": task_name,
                    "task_status": task_status,
                    "tasks_completed": t_comp,
                    "attendance_pct": att_pct,
                    "productivity_pct": prod_pct
                })
                
            # Team activities
            recent_completed_tasks = Task.objects.filter(project__in=projects).select_related('project').order_by('-id')[:3]
            for task in recent_completed_tasks:
                team_activities.append({
                    "details": f"Task '{task.task_name}' in project '{task.project.name}' is {task.status.lower()}.",
                    "time_display": task.end_date.strftime("%Y-%m-%d"),
                    "icon": "fa-solid fa-check-double" if task.status == 'Completed' else "fa-solid fa-code-pull-request",
                    "color": "var(--success)" if task.status == 'Completed' else "var(--accent-blue)"
                })
            
            # Attendance checked in today
            recent_attendance = Attendance.objects.filter(user__in=members, date=today).select_related('user').order_by('-check_in_time')[:3]
            for att in recent_attendance:
                if att.check_in_time:
                    team_activities.append({
                        "details": f"{att.user.get_full_name() or att.user.username} checked in.",
                        "time_display": timezone.localtime(att.check_in_time).strftime("%I:%M %p"),
                        "icon": "fa-solid fa-right-to-bracket",
                        "color": "var(--success)"
                    })

        # ── Pre-compute aggregate summary metrics ──
        if member_status_list:
            team_performance = round(
                sum(m['productivity_pct'] for m in member_status_list) / len(member_status_list)
            )
            attendance_rate = round(
                sum(m['attendance_pct'] for m in member_status_list) / len(member_status_list)
            )
            present_count = sum(1 for m in member_status_list if 'Present' in (m['attendance_status'] or ''))
            present_pct = round(present_count / len(member_status_list) * 100)
        else:
            team_performance = 0
            attendance_rate = 0
            present_pct = 0

        # ── 7-day trend data for charts ──
        import datetime as _dt
        members_qs = members if teams.exists() else User.objects.none()
        members_count_trend = members_qs.count() or 1

        attendance_trend = []   # % present per day (last 7 days, oldest→newest)
        productivity_trend = [] # % tasks completed per day (cumulative)
        day_labels = []

        for i in range(6, -1, -1):
            day = timezone.localdate() - _dt.timedelta(days=i)
            day_labels.append(day.strftime('%a'))  # Mon, Tue, ...
            # Attendance: count members with Present status that day
            present_day = Attendance.objects.filter(
                user__in=members_qs, date=day, status__icontains='Present'
            ).count()
            attendance_trend.append(round(present_day / members_count_trend * 100))

            # Productivity: cumulative completed tasks up to this day / total tasks assigned
            total_tasks = Task.objects.filter(assigned_to__in=members_qs).distinct().count()
            completed_tasks = Task.objects.filter(
                assigned_to__in=members_qs, status='Completed'
            ).distinct().count()
            prod_pct = round(completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
            productivity_trend.append(prod_pct)

                    
        # Recent DMs
        recent_messages = ChatMessage.objects.filter(Q(sender=user) | Q(receiver=user)).order_by('-created_at')[:5]
        recent_messages_data = [{
            "sender_name": m.sender.get_full_name() or m.sender.username,
            "text": m.text or '',
            "created_at": m.created_at.isoformat()
        } for m in recent_messages]

        # Auto-populate some sample notifications if there are absolutely none for this user
        if not Notification.objects.filter(recipient=user).exists():
            Notification.objects.create(recipient=user, title="Weekly Timesheets", message="Timesheet approvals due by tomorrow noon.")
            Notification.objects.create(recipient=user, title="Leave Request", message="Casual Leave request submitted by team member.")
            Notification.objects.create(recipient=user, title="Announcement: Annual Townhall Meet", message="Scheduled on July 10, 2026 at 3:00 PM in meeting hall.")
            Notification.objects.create(recipient=user, title="Announcement: New Attendance Policy", message="Coordinates mapping enabled for geolocation verification.")

        all_notifs = Notification.objects.filter(recipient=user).order_by('-created_at')
        notifications_list = all_notifs.filter(~Q(title__icontains="Announcement"))[:5]
        announcements_list = all_notifs.filter(title__icontains="Announcement")[:5]

        notifications_data = [{
            "title": n.title,
            "message": n.message,
            "created_at": n.created_at.isoformat()
        } for n in notifications_list]

        announcements_data = [{
            "title": a.title.replace("Announcement: ", ""),
            "message": a.message,
            "created_at": a.created_at.isoformat()
        } for a in announcements_list]
        
        return Response({
            "projects_count": projects_count,
            "members_count": members_count,
            "projects": projects_list,
            "upcoming_tasks": upcoming_tasks_data,
            "member_status_list": member_status_list,
            "team_activities": team_activities,
            "recent_messages": recent_messages_data,
            "notifications": notifications_data,
            "announcements": announcements_data,
            # ── Aggregate summary metrics ──
            "team_performance": team_performance,
            "attendance_rate": attendance_rate,
            "present_pct": present_pct,
            # ── 7-day chart trend data ──
            "attendance_trend": attendance_trend,
            "productivity_trend": productivity_trend,
            "day_labels": day_labels,
            "performance_data": team_performance_data,
        }, status=status.HTTP_200_OK)


class ManagerDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != "Manager":
            return Response({"detail": "Access Denied: Not a Manager."}, status=status.HTTP_403_FORBIDDEN)
        # --- Manager Performance Metrics Injection ---
        managed_projects = Project.objects.filter(assigned_manager=user)
        managed_teams = Team.objects.filter(projects__in=managed_projects)
        
        mgr_performance_data = {
            "total_projects": managed_projects.count(),
            "total_teams": managed_teams.count(),
            "completed_tasks": Task.objects.filter(project__in=managed_projects, status='Completed').count(),
            "pending_tasks": Task.objects.filter(project__in=managed_projects, status__in=['Pending', 'In Progress']).count()
        }
        # -----------------------------------

            
        today_date = timezone.localdate()
        on_leave_qs = Leave.objects.filter(status__in=['Approved', 'Final Approved'], from_date__lte=today_date, to_date__gte=today_date)
        on_leave_today = [{"name": l.user.get_full_name() or l.user.username, "emp_id": l.user.emp_id, "role": l.user.role} for l in on_leave_qs]
        on_leave_count = on_leave_qs.count()
            
        manager_projects = Project.objects.filter(assigned_manager=user)
        projects_received = manager_projects.filter(assigned_teams__isnull=True).distinct().count()
        projects_assigned = manager_projects.filter(assigned_teams__isnull=False).distinct().count()
        projects_completed = manager_projects.filter(status="Completed").count()
        
        employees_count = User.objects.filter(role='Employee').count()
        team_leads_count = User.objects.filter(role='TeamLead').count()
        teams_count = Team.objects.count()
        
        employee_leave_count = Leave.objects.filter(user__role='Employee', status="Pending Manager Approval").count()
        teamlead_leave_count = Leave.objects.filter(user__role='TeamLead', status="Pending Manager Approval").count()
        
        # Recent reports
        daily_reports = DailyReport.objects.filter(
            Q(project__in=manager_projects) | Q(user__reporting_manager=user)
        ).select_related("user", "project").order_by("-report_date")[:6]
        
        reports_data = []
        for r in daily_reports:
            reports_data.append({
                "id": r.id,
                "user_name": r.user.get_full_name() or r.user.username,
                "project_name": r.project.name if r.project else "General",
                "report_date": str(r.report_date),
                "tasks_completed": r.tasks_completed,
            })
            
        employees = User.objects.filter(role='Employee')
        developers_list = []
        for u in employees:
            is_assigned = Team.objects.filter(members=u).exists()
            developers_list.append({
                "id": u.id, 
                "name": u.get_full_name() or u.username, 
                "email": u.email, 
                "emp_id": getattr(u, 'emp_id', ''),
                "is_assigned": is_assigned
            })

        team_leads = User.objects.filter(role='TeamLead')
        team_leads_list = [{"id": u.id, "name": u.get_full_name() or u.username, "email": u.email, "emp_id": getattr(u, 'emp_id', '')} for u in team_leads]

        return Response({
            "projects_received": projects_received,
            "projects_assigned": projects_assigned,
            "projects_completed": projects_completed,
            "employees_count": employees.count(),
            "team_leads_count": team_leads.count(),
            "teams_count": teams_count,
            "employee_leave_count": employee_leave_count,
            "teamlead_leave_count": teamlead_leave_count,
            "daily_reports": reports_data,
            "developers_list": developers_list,
            "team_leads_list": team_leads_list,
            "performance_data": mgr_performance_data,
        }, status=status.HTTP_200_OK)


class MDDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != "MD":
            return Response({"detail": "Access Denied: Not an MD."}, status=status.HTTP_403_FORBIDDEN)
        # --- MD Performance Metrics Injection ---
        pending_md_reviews = TaskReview.objects.filter(review_status='Pending MD').count()
        from django.db.models import Avg, F
        avg_company_perf = TaskReview.objects.filter(review_status='Finalized').aggregate(Avg('final_score'))['final_score__avg'] or 0
        
        current_month = timezone.localdate().month
        current_year = timezone.localdate().year
        
        total_employees_count = User.objects.filter(is_active=True).exclude(role='MD').count()
        payslips_generated = Payslip.objects.filter(month=current_month, year=current_year).count()
        payroll_percentage = int((payslips_generated / total_employees_count) * 100) if total_employees_count > 0 else 0
        
        total_revenue = sum(inv.grand_total for inv in Invoice.objects.all())
        
        md_performance_data = {
            "pending_reviews": pending_md_reviews,
            "average_performance": round(avg_company_perf, 2),
            "payroll_percentage": payroll_percentage,
            "total_revenue": float(total_revenue)
        }
        # -----------------------------------

            
        today_date = timezone.localdate()
        on_leave_qs = Leave.objects.filter(status__in=['Approved', 'Final Approved'], from_date__lte=today_date, to_date__gte=today_date)
        on_leave_today = [{"name": l.user.get_full_name() or l.user.username, "emp_id": l.user.emp_id, "role": l.user.role} for l in on_leave_qs]
        on_leave_count = on_leave_qs.count()
            
        total_hr = User.objects.filter(role='HR').count()
        total_mr = User.objects.filter(role='Manager').count()
        total_tl = User.objects.filter(role='TeamLead').count()
        total_emp = User.objects.filter(role='Employee').count()
        total_project = Project.objects.count()
        total_cmp = total_hr + total_mr + total_tl + total_emp
        
        from datetime import date
        today = date.today()
        
        # Live attendance stats
        present_count = Attendance.objects.filter(date=today, status__icontains='Present').count()
        on_leave_count = Leave.objects.filter(from_date__lte=today, to_date__gte=today, status__in=['Approved', 'Final Approved']).count()
        late_count = Attendance.objects.filter(date=today, is_late=True).count()

        # Departments Mapping
        development_depts = ['python_dev', 'java_dev', 'frontend_dev', 'backend_dev', 'fullstack_dev', 'devops', 'mobile_dev', 'ai_ml', 'data_scientist']
        development_count = User.objects.filter(department__in=development_depts).count()
        design_count = User.objects.filter(department='ui_ux').count()
        hr_count = total_hr
        marketing_count = User.objects.filter(department='digital_marketing').count()
        sales_count = User.objects.filter(department='sales').count() or User.objects.filter(department='data_analyst').count()

        dept_counts = {
            "development": development_count,
            "design": design_count,
            "hr": hr_count,
            "marketing": marketing_count,
            "sales": sales_count
        }
        
        current_month = timezone.localdate().month
        current_year = timezone.localdate().year
        
        def get_dept_attendance(department_query_kwargs):
            total_records = Attendance.objects.filter(date__year=current_year, date__month=current_month, **department_query_kwargs).count()
            present_records = Attendance.objects.filter(date__year=current_year, date__month=current_month, status__icontains='Present', **department_query_kwargs).count()
            return int((present_records / total_records) * 100) if total_records > 0 else 0
            
        dept_attendance = {
            "development": get_dept_attendance({"user__department__in": development_depts}),
            "design": get_dept_attendance({"user__department": "ui_ux"}),
            "hr": get_dept_attendance({"user__role": "HR"}),
            "marketing": get_dept_attendance({"user__department": "digital_marketing"}),
            "sales": get_dept_attendance({"user__department__in": ["sales", "data_analyst"]}),
        }

        # Monthly Payroll Summary for MD
        current_month_slips = Payslip.objects.filter(month=current_month, year=current_year)
        payroll_gross_total = sum(p.gross_salary for p in current_month_slips)
        payroll_deductions_total = sum(p.total_deductions for p in current_month_slips)
        payroll_net_total = sum(p.net_salary for p in current_month_slips)
        payroll_pending_approval_count = Payslip.objects.filter(status='Pending Approval').count()

        # Relieving Letters Pending MD Approval
        pending_relieving_qs = RelievingLetter.objects.filter(status='Pending Approval').select_related('employee')
        pending_relieving_list = [{
            'id': rl.id,
            'employee_name': rl.employee_name,
            'employee_id': rl.employee_id_number,
            'designation': rl.designation,
            'department': rl.department,
            'last_working_day': str(rl.last_working_day),
            'reference_number': rl.reference_number,
            'created_at': rl.created_at.strftime('%d %b %Y') if rl.created_at else '',
        } for rl in pending_relieving_qs]

        # Payroll stats
        salary_budget = 0
        pf_total = 0
        tds_total = 0
        for s in SalaryStructure.objects.all():
            salary_budget += float(s.monthly_gross)
            if s.pf_amount > 0:
                pf_total += float(s.pf_amount)
            else:
                pf_total += float(s.basic_salary) * (float(s.pf_rate) / 100)
            tds_total += float(s.tds_amount)

        # Corporate Announcements
        if not Notification.objects.filter(recipient=user).exists():
            Notification.objects.create(recipient=user, title="Announcement: Q2 Townhall Scheduled", message="Townhall meeting this Friday at 4:00 PM via Teams link.")
            Notification.objects.create(recipient=user, title="Announcement: Device Geolocation Policy", message="Attendance now tracks coordinates during check-in/out.")
            Notification.objects.create(recipient=user, title="Announcement: FY26 Annual General Meet", message="Scheduled on July 25, 2026. Board deck preparation in alignment.")

        announcements = Notification.objects.filter(recipient=user, title__icontains="Announcement").order_by('-created_at')[:5]
        announcements_data = [{
            "title": a.title.replace("Announcement: ", ""),
            "message": a.message,
            "created_at": a.created_at.isoformat()
        } for a in announcements]

        # Recent activities (Operational Audit Logs from ProjectAuditLog)
        recent_logs = ProjectAuditLog.objects.select_related('user', 'project').order_by('-timestamp')[:5]
        recent_activities = []
        for log in recent_logs:
            recent_activities.append({
                "details": f"{log.action}: {log.project.name} (by {log.user.username if log.user else 'System'})",
                "time_display": timezone.localtime(log.timestamp).strftime("%Y-%m-%d %H:%M"),
                "icon": "fa-solid fa-file-invoice" if "Created" in log.action else "fa-solid fa-user-plus" if "Assign" in log.action else "fa-solid fa-shield"
            })

        holiday_stats = {
            "all": Holiday.objects.count(),
            "pending": Holiday.objects.filter(status='Pending').count(),
            "approved": Holiday.objects.filter(status='Approved').count(),
            "draft": Holiday.objects.filter(status='Draft').count(),
        }
        
        # Pending leave requests
        pending_leaves_qs = Leave.objects.filter(status__icontains='Pending')
        pending_leaves_count = pending_leaves_qs.count()
        pending_leaves = pending_leaves_qs.order_by('-created_at')[:4]
        pending_leaves_data = []
        for l in pending_leaves:
            pending_leaves_data.append({
                "id": l.id,
                "employee_name": l.user.get_full_name() or l.user.username,
                "emp_id": l.user.emp_id or 'N/A',
                "from_date": str(l.from_date),
                "to_date": str(l.to_date),
                "leave_type": l.leave_type,
                "reason": l.reason,
            })
        
        pending_corrections_count = AttendanceCorrection.objects.filter(status='Pending').count()
        pending_corrections = AttendanceCorrection.objects.filter(status='Pending').select_related('attendance__user', 'edited_by')
        corrections_data = []
        for c in pending_corrections:
            corrections_data.append({
                "id": c.id,
                "batch_id": c.batch_id,
                "employee_name": f"{c.attendance.user.first_name} {c.attendance.user.last_name}",
                "employee_id": c.attendance.user.emp_id,
                "department": c.attendance.user.department,
                "requested_by": c.edited_by.username if c.edited_by else "System",
                "date": str(c.attendance.date),
                "original_status": c.original_status,
                "original_check_in": str(c.original_check_in) if c.original_check_in else None,
                "original_check_out": str(c.original_check_out) if c.original_check_out else None,
                "new_status": c.new_status,
                "new_check_in": str(c.new_check_in) if c.new_check_in else None,
                "new_check_out": str(c.new_check_out) if c.new_check_out else None,
                "reason": c.reason,
                "attachment_url": c.attachment.url if c.attachment else None,
                "submitted_date": str(c.created_at.date())
            })
        
        # Active users list for directory panel
        all_users = User.objects.filter(is_active=True).order_by('role', 'username')
        users_data = []
        for u in all_users:
            users_data.append({
                "id": u.id,
                "username": u.username,
                "name": u.get_full_name() or u.username,
                "role": u.role,
                "emp_id": u.emp_id,
                "department": u.department,
            })
            
        return Response({
            "total_hr": total_hr,
            "total_mr": total_mr,
            "total_tl": total_tl,
            "total_emp": total_emp,
            "total_project": total_project,
            "total_cmp": total_cmp,
            "holiday_stats": holiday_stats,
            "pending_corrections_count": pending_corrections_count,
            "pending_corrections_list": corrections_data,
            "pending_leaves": pending_leaves_data,
            "pending_leaves_count": pending_leaves_count,
            "all_users": users_data,
            "present_count": present_count,
            "on_leave_count": on_leave_count,
            "late_count": late_count,
            "dept_counts": dept_counts,
            "dept_attendance": dept_attendance,
            "payroll_stats": {
                "salary_budget": salary_budget,
                "pf_contributions": pf_total,
                "tds_withheld": tds_total,
            },
            "monthly_payroll_summary": {
                "gross_total": float(payroll_gross_total),
                "deductions_total": float(payroll_deductions_total),
                "net_total": float(payroll_net_total),
                "pending_approval_count": payroll_pending_approval_count,
            },
            "relieving_letters_pending": pending_relieving_list,
            "relieving_letters_pending_count": len(pending_relieving_list),
            "corporate_announcements": announcements_data,
            "recent_activities": recent_activities,
        
       "performance_data": md_performance_data,}, status=status.HTTP_200_OK)


from .views import get_monthly_calendar_data
import datetime
from django.shortcuts import get_object_or_404

class AttendanceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        scope = request.query_params.get('scope', 'personal')
        target_user_id = request.query_params.get('user_id')
        
        # If looking at a single user calendar (Personal or clicking on employee)
        if target_user_id or scope == 'personal':
            if target_user_id == 'me' or not target_user_id:
                target_user = user
            else:
                # Security check: Make sure TL/Manager can only see their subordinates' details
                target_user = get_object_or_404(User, id=target_user_id)
                if role == 'TeamLead' and target_user.reporting_manager != user and not User.objects.filter(id=target_user.id, teams__lead=user).exists() and target_user != user:
                    return Response({"detail": "Access Denied: Not authorized to view this employee's logs."}, status=status.HTTP_403_FORBIDDEN)
                elif role == 'Manager':
                    managed_teams = Team.objects.filter(projects__assigned_manager=user)
                    is_authorized = (
                        target_user == user or
                        target_user.reporting_manager == user or
                        (target_user.reporting_manager and target_user.reporting_manager.reporting_manager == user) or
                        Team.objects.filter(id__in=managed_teams, lead=target_user).exists() or
                        Team.objects.filter(id__in=managed_teams, members=target_user).exists()
                    )
                    if not is_authorized:
                        return Response({"detail": "Access Denied: Not authorized to view this employee's logs."}, status=status.HTTP_403_FORBIDDEN)
            
            today = timezone.localdate()
            year = request.query_params.get('year', today.year)
            month = request.query_params.get('month', today.month)
            try:
                year = int(year)
                month = int(month)
            except ValueError:
                year = today.year
                month = today.month
                
            days_data, padding, stats = get_monthly_calendar_data(target_user, year, month)
            
            formatted_days = []
            for day in days_data:
                d_dict = day.copy()
                if 'date' in d_dict and d_dict['date']:
                    d_dict['date'] = str(d_dict['date'])
                formatted_days.append(d_dict)
                
            history_records = Attendance.objects.filter(user=target_user, date__lte=today).order_by('-date')
            q_month = request.query_params.get('q_month')
            q_year = request.query_params.get('q_year')
            if q_month:
                history_records = history_records.filter(date__month=q_month)
            if q_year:
                history_records = history_records.filter(date__year=q_year)
                
            history_serializer = AttendanceSerializer(history_records[:31], many=True)
            
            return Response({
                "days_data": formatted_days,
                "padding": padding,
                "stats": stats,
                "history": history_serializer.data,
            }, status=status.HTTP_200_OK)
            
        else:
            # scope == 'team-attendance' or general log registry
            query = request.query_params.get('q', '')
            selected_date = request.query_params.get('date', '')
            if not selected_date:
                from datetime import date
                selected_date = str(date.today())
            
            # Fetch users based on role scope
            if role == 'TeamLead':
                team_member_ids = Team.objects.filter(lead=user).values_list('members__id', flat=True).distinct()
                users = User.objects.filter(id__in=team_member_ids).distinct()
            elif role == 'Manager':
                managed_teams = Team.objects.filter(projects__assigned_manager=user)
                users = User.objects.filter(
                    Q(reporting_manager=user) |
                    Q(reporting_manager__reporting_manager=user) |
                    Q(leading_teams__in=managed_teams) |
                    Q(teams__in=managed_teams)
                ).distinct()
            elif role in ['HR', 'MD']:
                users = User.objects.all()
            else:
                users = User.objects.none()

            # Apply query filters
            if query:
                users = users.filter(
                    Q(username__icontains=query) |
                    Q(first_name__icontains=query) |
                    Q(last_name__icontains=query) |
                    Q(emp_id__icontains=query)
                )

            users = users.distinct().order_by('emp_id')
            
            # Load actual attendance records
            attendance_records = Attendance.objects.filter(date=selected_date, user__in=users).select_related('user')
            attendance_map = {record.user_id: record for record in attendance_records}
            
            data_list = []
            for emp in users:
                # Do not list Managing Director unless required, but let's list everyone to be safe
                if emp.id in attendance_map:
                    rec = attendance_map[emp.id]
                    data_list.append(AttendanceSerializer(rec).data)
                else:
                    user_data = UserSerializer(emp).data
                    data_list.append({
                        "id": f"virtual_{emp.id}",
                        "date": selected_date,
                        "check_in_time": None,
                        "check_out_time": None,
                        "total_hours": 0.0,
                        "status": "Not Marked",
                        "is_late": False,
                        "left_early": False,
                        "remarks": "No record",
                        "user": user_data,
                        "check_in_photo": None,
                        "check_out_photo": None
                    })
            
            return Response(data_list, status=status.HTTP_200_OK)


class DailyRegistryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        query = request.query_params.get('q', '')
        selected_date = request.query_params.get('date', '')
        if not selected_date:
            from datetime import date
            selected_date = str(date.today())
        
        if role == 'TeamLead':
            team_member_ids = Team.objects.filter(lead=user).values_list('members__id', flat=True).distinct()
            users = User.objects.filter(id__in=team_member_ids).distinct()
        elif role == 'Manager':
            managed_teams = Team.objects.filter(projects__assigned_manager=user)
            users = User.objects.filter(
                Q(reporting_manager=user) |
                Q(reporting_manager__reporting_manager=user) |
                Q(leading_teams__in=managed_teams) |
                Q(teams__in=managed_teams)
            ).distinct()
        elif role in ['HR', 'MD']:
            users = User.objects.all()
        else:
            users = User.objects.none()

        if query:
            users = users.filter(
                Q(username__icontains=query) |
                Q(first_name__icontains=query) |
                Q(last_name__icontains=query) |
                Q(emp_id__icontains=query)
            )

        users = users.distinct().order_by('emp_id')
        date_from = request.query_params.get('date_from', '')
        date_to = request.query_params.get('date_to', '')
        
        if date_from and date_to:
            import datetime
            try:
                d_from = datetime.datetime.strptime(date_from, "%Y-%m-%d").date()
                d_to = datetime.datetime.strptime(date_to, "%Y-%m-%d").date()
                delta = d_to - d_from
                all_dates = [str(d_from + datetime.timedelta(days=i)) for i in range(delta.days + 1)]
            except ValueError:
                all_dates = [selected_date]
        else:
            all_dates = [selected_date]

        users = users.distinct().order_by('emp_id')
        
        if date_from and date_to:
            attendance_records = Attendance.objects.filter(date__range=[date_from, date_to], user__in=users).select_related('user')
        else:
            attendance_records = Attendance.objects.filter(date=selected_date, user__in=users).select_related('user')
            
        attendance_map = {(record.user_id, str(record.date)): record for record in attendance_records}
        
        data_list = []
        for emp in users:
            for d in all_dates:
                key = (emp.id, d)
                if key in attendance_map:
                    rec = attendance_map[key]
                    data_list.append(AttendanceSerializer(rec, context={'request': request}).data)
                else:
                    user_data = UserSerializer(emp).data
                    data_list.append({
                        "id": f"virtual_{emp.id}_{d}",
                        "date": d,
                        "check_in_time": None,
                        "check_out_time": None,
                        "total_hours": 0.0,
                        "status": "Not Marked",
                        "is_late": False,
                        "left_early": False,
                        "remarks": "No record",
                        "user": user_data,
                        "check_in_photo": None, "check_out_photo": None,
                        "check_in_image": None, "check_out_image": None,
                        "check_in_image_url": None, "check_out_image_url": None,
                        "check_in_photo_url": None, "check_out_photo_url": None,
                        "check_in_latitude": None, "check_in_longitude": None,
                        "check_out_latitude": None, "check_out_longitude": None,
                        "check_in_address": None, "check_out_address": None,
                        "check_in_map_url": None, "check_out_map_url": None,
                        "check_in_location": None, "check_out_location": None,
                        "check_in_ip": None, "check_out_ip": None,
                        "check_in_browser": None, "check_out_browser": None,
                        "check_in_device": None, "check_out_device": None,
                        "is_weekoff": False, "is_holiday": False,
                        "is_sandwich_leave": False, "payroll_count_flag": True,
                        "original_status": None, "calculated_status": None,
                    })
        return Response(data_list, status=status.HTTP_200_OK)


class AttendanceDetailAPIView(APIView):
    """GET /api/attendance/<pk>/ — Full detail for HR detail modal."""
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            att = Attendance.objects.select_related('user').get(pk=pk)
        except Attendance.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        # Employees can only see their own
        if request.user.role == 'Employee' and att.user != request.user:
            return Response({'detail': 'Forbidden.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = AttendanceSerializer(att, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class AttendanceExportAPIView(APIView):
    """GET /api/attendance/export/?date=YYYY-MM-DD&fmt=csv"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        import csv, io
        from django.http import HttpResponse

        if request.user.role not in ['MD', 'HR', 'Manager', 'TeamLead']:
            return Response({'detail': 'Forbidden.'}, status=status.HTTP_403_FORBIDDEN)

        selected_date = request.query_params.get('date', str(timezone.localdate()))
        fmt = request.query_params.get('fmt', 'csv').lower()

        records = Attendance.objects.filter(date=selected_date).select_related('user').order_by('user__emp_id')

        rows = []
        for r in records:
            rows.append([
                r.user.emp_id or '',
                r.user.get_full_name() or r.user.username,
                r.user.department or '',
                r.user.designation or '',
                str(r.date),
                timezone.localtime(r.check_in_time).strftime('%H:%M') if r.check_in_time else '',
                timezone.localtime(r.check_out_time).strftime('%H:%M') if r.check_out_time else '',
                str(r.total_hours or ''),
                r.status or '',
                'Yes' if r.is_late else 'No',
                r.check_in_address or r.check_in_location or '',
                r.check_out_address or r.check_out_location or '',
                r.check_in_map_url or '',
                r.check_out_map_url or '',
                str(r.check_in_ip or ''),
                r.check_in_browser or '',
                r.check_in_device or '',
                r.remarks or '',
            ])

        headers = [
            'Emp ID', 'Name', 'Department', 'Designation', 'Date',
            'Check In', 'Check Out', 'Working Hours', 'Status', 'Late',
            'Check-In Address', 'Check-Out Address',
            'Check-In Map', 'Check-Out Map',
            'IP Address', 'Browser', 'Device', 'Remarks'
        ]

        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(headers)
        writer.writerows(rows)

        response = HttpResponse(output.getvalue(), content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="attendance_{selected_date}.csv"'
        return response


class MonthlySummaryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        year = request.query_params.get('year')
        month = request.query_params.get('month')
        
        from datetime import date
        today = date.today()
        try:
            year = int(year) if year else today.year
            month = int(month) if month else today.month
        except ValueError:
            year = today.year
            month = today.month

        if role == 'TeamLead':
            team_member_ids = Team.objects.filter(lead=user).values_list('members__id', flat=True).distinct()
            users = User.objects.filter(id__in=team_member_ids).distinct()
        elif role == 'Manager':
            managed_teams = Team.objects.filter(projects__assigned_manager=user)
            users = User.objects.filter(
                Q(reporting_manager=user) |
                Q(reporting_manager__reporting_manager=user) |
                Q(leading_teams__in=managed_teams) |
                Q(teams__in=managed_teams)
            ).distinct()
        elif role in ['HR', 'MD']:
            users = User.objects.all()
        else:
            users = User.objects.none()

        users = users.distinct().order_by('emp_id')
        
        data_list = []
        for emp in users:
            from hr.models import recalculate_attendance_for_user_month
            recalculate_attendance_for_user_month(emp, year, month)
            
            records = Attendance.objects.filter(user=emp, date__year=year, date__month=month)
            present = records.filter(calculated_status__icontains='Present').count()
            absent = records.filter(calculated_status__icontains='Absent').count()
            half_day = records.filter(calculated_status__icontains='Half Day').count()
            paid_leave = records.filter(calculated_status__in=['Paid Leave', 'Leave']).count()
            unpaid_leave = records.filter(calculated_status='Unpaid Leave').count()
            sandwich_leave = records.filter(calculated_status='Sandwich Leave').count()
            late_count = records.filter(is_late=True).count()
            early_out = records.filter(left_early=True).count()
            wfh_count = records.filter(calculated_status='Work From Home').count()
            on_duty_count = records.filter(calculated_status='On Duty').count()
            
            working_days = records.filter(is_weekoff=False, is_holiday=False).count()
            total_hours = sum(r.total_hours for r in records if r.total_hours)
            
            actual_present = present + wfh_count + on_duty_count + (half_day * 0.5)
            attendance_pct = (actual_present / working_days * 100) if working_days > 0 else 0
            
            data_list.append({
                "user": UserSerializer(emp).data,
                "present": present + wfh_count + on_duty_count,
                "absent": absent,
                "half_day": half_day,
                "paid_leave": paid_leave,
                "unpaid_leave": unpaid_leave,
                "sandwich_leave": sandwich_leave,
                "late_count": late_count,
                "early_out": early_out,
                "working_days": working_days,
                "attendance_percentage": round(attendance_pct, 1),
                "working_hours": round(total_hours, 1),
                "overtime": 0.0
            })
            
        return Response(data_list, status=status.HTTP_200_OK)


class CorrectionSingleAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can mark or correct attendance."}, status=status.HTTP_403_FORBIDDEN)
            
        attendance_id = request.data.get('attendance_id')
        user_id = request.data.get('user_id')
        date_str = request.data.get('date')
        new_status = request.data.get('status')
        check_in_str = request.data.get('check_in_time')
        check_out_str = request.data.get('check_out_time')
        remarks = request.data.get('remarks', '')
        reason = (request.data.get('reason') or '').strip()
        override_leave = request.data.get('override_leave', False)

        if not reason:
            return Response({"detail": "Attendance correction reason is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Resolve employee and date
        import datetime as dt
        from django.utils import timezone
        target_date = None
        emp = None

        if attendance_id and str(attendance_id).startswith('virtual_'):
            parts = str(attendance_id).split('_')
            if len(parts) == 3:
                _, emp_id, target_date_str = parts
            elif len(parts) == 2:
                _, emp_id = parts
                target_date_str = date_str
            else:
                return Response({"detail": "Invalid virtual attendance_id format."}, status=status.HTTP_400_BAD_REQUEST)

            try:
                target_date = dt.date.fromisoformat(str(target_date_str))
            except Exception:
                return Response({"detail": f"Invalid date format: {target_date_str}. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

            emp = get_object_or_404(User, id=emp_id)
            record, _ = Attendance.objects.get_or_create(
                user=emp,
                date=target_date,
                defaults={"status": "Absent"}
            )
        elif attendance_id:
            record = get_object_or_404(Attendance, id=attendance_id)
            emp = record.user
            target_date = record.date
        elif user_id and date_str:
            try:
                target_date = dt.date.fromisoformat(str(date_str))
            except Exception:
                return Response({"detail": f"Invalid date format: {date_str}. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
            emp = get_object_or_404(User, id=user_id)
            record, _ = Attendance.objects.get_or_create(
                user=emp,
                date=target_date,
                defaults={"status": "Absent"}
            )
        else:
            return Response({"detail": "attendance_id or (user_id and date) is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate conflicting leave/holiday
        from .models import Leave, Holiday
        from django.db.models import Q
        approved_leave = Leave.objects.filter(
            user=emp,
            status__in=['Approved', 'Final Approved'],
            from_date__lte=target_date,
            to_date__gte=target_date
        ).first()

        if approved_leave and new_status in ['Present', 'Half Day'] and not override_leave:
            return Response({
                "detail": (
                    f"Conflict: {emp.get_full_name()} has an approved {approved_leave.leave_type} leave from "
                    f"{approved_leave.from_date} to {approved_leave.to_date}. "
                    "Marking Present requires overriding the leave record."
                ),
                "has_leave_conflict": True,
                "leave_id": approved_leave.id
            }, status=status.HTTP_409_CONFLICT)

        # Snapshot original values for audit
        orig_status = record.status
        orig_in = record.check_in_time
        orig_out = record.check_out_time
        orig_hours = record.total_hours

        # Parse check-in and check-out
        in_dt = None
        out_dt = None
        if check_in_str:
            if 'T' in str(check_in_str):
                in_dt = timezone.datetime.fromisoformat(str(check_in_str).replace('Z', '+00:00'))
            else:
                time_part = str(check_in_str).strip()
                if len(time_part.split(':')) == 2:
                    time_part += ":00"
                in_dt = timezone.make_aware(dt.datetime.strptime(f"{target_date} {time_part}", "%Y-%m-%d %H:%M:%S"))

        if check_out_str:
            if 'T' in str(check_out_str):
                out_dt = timezone.datetime.fromisoformat(str(check_out_str).replace('Z', '+00:00'))
            else:
                time_part = str(check_out_str).strip()
                if len(time_part.split(':')) == 2:
                    time_part += ":00"
                out_dt = timezone.make_aware(dt.datetime.strptime(f"{target_date} {time_part}", "%Y-%m-%d %H:%M:%S"))

        if new_status:
            record.status = new_status
            record.calculated_status = new_status
            record.original_status = new_status

        if in_dt is not None:
            record.check_in_time = in_dt
        if out_dt is not None:
            record.check_out_time = out_dt

        # Recalculate working hours if in and out exist
        if record.check_in_time and record.check_out_time:
            hours = (record.check_out_time - record.check_in_time).total_seconds() / 3600.0
            record.total_hours = max(round(hours, 2), 0.0)
        elif new_status == 'Present' and not record.total_hours:
            record.total_hours = 9.0
        elif new_status == 'Half Day' and not record.total_hours:
            record.total_hours = 4.5
        elif new_status in ['Absent', 'Unpaid Leave', 'Leave', 'Holiday']:
            record.total_hours = 0.0

        if remarks:
            record.remarks = remarks

        record._no_recalc = True
        record.save()

        # Create AttendanceCorrection audit record
        AttendanceCorrection.objects.create(
            attendance=record,
            original_check_in=orig_in,
            original_check_out=orig_out,
            original_status=orig_status,
            original_total_hours=orig_hours,
            original_remarks=record.remarks,
            new_check_in=record.check_in_time,
            new_check_out=record.check_out_time,
            new_status=record.status,
            new_remarks=remarks or record.remarks,
            reason=reason,
            edited_by=user,
            approved_by=user,
            status="Approved",
            approved_at=timezone.now(),
        )

        # Audit log in PayrollAuditLog
        PayrollAuditLog.objects.create(
            performed_by=request.user,
            action='ATTENDANCE_CORRECTION',
            details=f"Corrected attendance for {emp.username} on {target_date}: {orig_status} -> {record.status}. Reason: {reason}",
            ip_address=request.META.get('REMOTE_ADDR')
        )

        # Recalculate attendance metrics for user's month
        try:
            from hr.models import recalculate_attendance_for_user_month
            recalculate_attendance_for_user_month(emp, target_date.year, target_date.month)
        except Exception as e:
            logger.warning(f"Recalculate attendance warning: {e}")

        return Response(AttendanceSerializer(record, context={'request': request}).data, status=status.HTTP_200_OK)


class CorrectionBulkAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can request corrections."}, status=status.HTTP_403_FORBIDDEN)
            
        selections = request.data.get('selections', [])
        reason = request.data.get('reason')
        if not reason:
            return Response({"detail": "Reason for Correction is mandatory."}, status=status.HTTP_400_BAD_REQUEST)
            
        import uuid
        batch_id = str(uuid.uuid4())
        
        created_count = 0
        for item in selections:
            att_id = item.get('attendance_id')
            if not att_id:
                continue
                
            if str(att_id).startswith('virtual_'):
                import datetime as dt
                parts = att_id.split('_')
                # Expected formats: virtual_<emp_id>_<date> or virtual_<emp_id>
                if len(parts) == 3:
                    _, emp_id, target_date_str = parts
                elif len(parts) == 2:
                    _, emp_id = parts
                    target_date_str = item.get('date')
                    if not target_date_str:
                        return Response({"detail": "Date is required for virtual attendance creation."}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"detail": "Invalid virtual attendance_id format."}, status=status.HTTP_400_BAD_REQUEST)
                try:
                    target_date = dt.date.fromisoformat(str(target_date_str))
                except ValueError:
                    return Response({"detail": f"Invalid date format: {target_date_str}. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
                emp = get_object_or_404(User, id=emp_id)
                attendance, created = Attendance.objects.get_or_create(
                    user=emp,
                    date=target_date,
                    defaults={"status": "Absent"},
                )
            else:
                attendance = get_object_or_404(Attendance, id=att_id)
                target_date = attendance.date
                
            new_status = item.get('status', 'Present')
            new_in = item.get('check_in_time')
            new_out = item.get('check_out_time')
            remarks = item.get('remarks', '')
            
            import datetime
            check_in_dt = None
            check_out_dt = None
            if new_in:
                if len(new_in.split(':')) == 2:
                    new_in += ":00"
                check_in_dt = timezone.make_aware(datetime.datetime.strptime(f"{target_date} {new_in}", "%Y-%m-%d %H:%M:%S"))
            if new_out:
                if len(new_out.split(':')) == 2:
                    new_out += ":00"
                check_out_dt = timezone.make_aware(datetime.datetime.strptime(f"{target_date} {new_out}", "%Y-%m-%d %H:%M:%S"))
                
            AttendanceCorrection.objects.create(
                attendance=attendance,
                original_check_in=attendance.check_in_time,
                original_check_out=attendance.check_out_time,
                original_status=attendance.status,
                original_total_hours=attendance.total_hours,
                original_remarks=attendance.remarks,
                new_check_in=check_in_dt,
                new_check_out=check_out_dt,
                new_status=new_status,
                new_remarks=remarks,
                reason=reason,
                batch_id=batch_id,
                edited_by=user,
                status="Pending",
            )
            created_count += 1
            
        return Response({"detail": f"Bulk correction request submitted with {created_count} items.", "batch_id": batch_id}, status=status.HTTP_201_CREATED)


class MyAttendanceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        today = timezone.localdate()
        year = request.query_params.get('year', today.year)
        month = request.query_params.get('month', today.month)
        
        try:
            year = int(year)
            month = int(month)
        except ValueError:
            year = today.year
            month = today.month
            
        days_data, padding, stats = get_monthly_calendar_data(user, year, month)
        formatted_days = []
        for day in days_data:
            d_dict = day.copy()
            if 'date' in d_dict and d_dict['date']:
                d_dict['date'] = str(d_dict['date'])
            formatted_days.append(d_dict)
            
        history_records = Attendance.objects.filter(user=user, date__year=year, date__month=month, date__lte=today).order_by('-date')
        history_serializer = AttendanceSerializer(history_records, many=True)
        
        return Response({
            "days_data": formatted_days,
            "padding": padding,
            "stats": stats,
            "history": history_serializer.data,
        }, status=status.HTTP_200_OK)


class AttendanceCorrectionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        
        if role in ['HR', 'MD']:
            corrections = AttendanceCorrection.objects.all().order_by('-created_at')
        else:
            corrections = AttendanceCorrection.objects.filter(attendance__user=user).order_by('-created_at')
            
        serializer = AttendanceCorrectionSerializer(corrections, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        attendance_id = request.data.get('attendance_id')
        attendance = get_object_or_404(Attendance, id=attendance_id)
        
        if attendance.user != user and user.role not in ['HR', 'MD']:
            return Response({"detail": "Not authorized to correct this attendance."}, status=status.HTTP_403_FORBIDDEN)
            
        new_check_in_str = request.data.get('new_check_in')
        new_check_out_str = request.data.get('new_check_out')
        reason = request.data.get('reason', '')
        
        if not new_check_in_str or not new_check_out_str or not reason:
            return Response({"detail": "Missing fields: new_check_in, new_check_out, and reason are required."}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            if len(new_check_in_str.split(':')) == 2:
                new_check_in_str += ":00"
            if len(new_check_out_str.split(':')) == 2:
                new_check_out_str += ":00"
                
            check_in_time = datetime.datetime.strptime(f"{attendance.date} {new_check_in_str}", "%Y-%m-%d %H:%M:%S")
            check_out_time = datetime.datetime.strptime(f"{attendance.date} {new_check_out_str}", "%Y-%m-%d %H:%M:%S")
            
            check_in_time = timezone.make_aware(check_in_time)
            check_out_time = timezone.make_aware(check_out_time)
        except ValueError:
            return Response({"detail": "Invalid time format. Use HH:MM or HH:MM:SS."}, status=status.HTTP_400_BAD_REQUEST)
            
        correction = AttendanceCorrection.objects.create(
            attendance=attendance,
            original_check_in=attendance.check_in_time,
            original_check_out=attendance.check_out_time,
            original_status=attendance.status,
            original_total_hours=attendance.total_hours,
            original_remarks=attendance.remarks,
            new_check_in=check_in_time,
            new_check_out=check_out_time,
            new_status="Present",
            reason=reason,
            edited_by=user,
            status="Pending",
        )
        
        serializer = AttendanceCorrectionSerializer(correction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AttendanceCorrectionActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can perform this action."}, status=status.HTTP_403_FORBIDDEN)
            
        correction = get_object_or_404(AttendanceCorrection, id=pk)
        action = request.data.get('action')
        md_remarks = request.data.get('md_remarks', '')
        
        if action == 'approve':
            attendance = correction.attendance
            attendance.check_in_time = correction.new_check_in
            attendance.check_out_time = correction.new_check_out
            attendance.status = "Present"
            
            if attendance.check_in_time and attendance.check_out_time:
                delta = attendance.check_out_time - attendance.check_in_time
                attendance.total_hours = round(delta.total_seconds() / 3600.0, 2)
            else:
                attendance.total_hours = 0
                
            attendance.remarks = f"Corrected and approved by {user.username}."
            attendance.save()
            
            correction.status = 'Approved'
            correction.approved_by = user
            correction.approved_at = timezone.now()
            correction.md_remarks = md_remarks
            correction.save()
            
            return Response({"detail": "Attendance correction approved successfully."}, status=status.HTTP_200_OK)
            
        elif action == 'reject':
            correction.status = 'Rejected'
            correction.approved_by = user
            correction.approved_at = timezone.now()
            correction.md_remarks = md_remarks
            correction.save()
            return Response({"detail": "Attendance correction rejected."}, status=status.HTTP_200_OK)
            
        else:
            return Response({"detail": "Invalid action. Must be 'approve' or 'reject'."}, status=status.HTTP_400_BAD_REQUEST)


class BulkCorrectionActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can perform approvals."}, status=status.HTTP_403_FORBIDDEN)
            
        action = request.data.get('action') # 'approve', 'reject'
        correction_ids = request.data.get('correction_ids', [])
        md_remarks = request.data.get('md_remarks', '')
        
        corrections = AttendanceCorrection.objects.filter(id__in=correction_ids)
        updated_count = 0
        
        for c in corrections:
            if action == 'approve':
                attendance = c.attendance
                attendance.check_in_time = c.new_check_in
                attendance.check_out_time = c.new_check_out
                attendance.status = c.new_status or "Present"
                attendance.remarks = f"Corrected & Approved. Batch: {c.batch_id}"
                
                if attendance.check_in_time and attendance.check_out_time:
                    delta = attendance.check_out_time - attendance.check_in_time
                    attendance.total_hours = round(delta.total_seconds() / 3600.0, 2)
                else:
                    attendance.total_hours = 0.0
                
                attendance.save()
                
                c.status = 'Approved'
                c.approved_by = user
                c.approved_at = timezone.now()
                c.md_remarks = md_remarks
                c.save()
                updated_count += 1
                
            elif action == 'reject':
                c.status = 'Rejected'
                c.approved_by = user
                c.approved_at = timezone.now()
                c.md_remarks = md_remarks
                c.save()
                updated_count += 1
                
        return Response({"detail": f"Successfully processed {updated_count} corrections with action '{action}'."}, status=status.HTTP_200_OK)


def send_leave_notification(leave):
    from hr.models import HolidayNotification
    try:
        HolidayNotification.objects.create(
            recipient=leave.user,
            holiday=None,
            notif_type='general',
            message=f"Your leave request status has been updated to: {leave.status}."
        )
        # Notify next approver based on current_approver_role
        if leave.current_approver_role:
            if leave.current_approver_role == 'TeamLead':
                tl = leave.user.reporting_manager
                if tl and tl.role == 'TeamLead':
                    HolidayNotification.objects.create(
                        recipient=tl, holiday=None, notif_type='general',
                        message=f"New leave request pending your approval from {leave.user.get_full_name()}."
                    )
            elif leave.current_approver_role == 'Manager':
                tl = leave.user.reporting_manager
                manager = tl.reporting_manager if (tl and tl.role == 'TeamLead') else tl
                if manager and manager.role == 'Manager':
                    HolidayNotification.objects.create(
                        recipient=manager, holiday=None, notif_type='general',
                        message=f"New leave request pending your approval from {leave.user.get_full_name()}."
                    )
            elif leave.current_approver_role == 'HR':
                hr_users = User.objects.filter(role="HR")
                for hr in hr_users:
                    HolidayNotification.objects.create(
                        recipient=hr, holiday=None, notif_type='general',
                        message=f"New leave request pending your approval from {leave.user.get_full_name()}."
                    )
            elif leave.current_approver_role == 'MD':
                md_users = User.objects.filter(role="MD")
                for md in md_users:
                    HolidayNotification.objects.create(
                        recipient=md, holiday=None, notif_type='general',
                        message=f"New leave request pending your approval from {leave.user.get_full_name()}."
                    )
    except Exception as e:
        print(f"Error creating notification: {e}")



LEAVE_WORKFLOWS = {
    'Employee':  ['TeamLead', 'Manager'],
    'TeamLead':  ['Manager', 'HR'],
    'Manager':   ['HR', 'MD'],
    'HR':        ['MD'],
    'MD':        [],
}

def get_next_approver_role(workflow, current_role):
    if not current_role:
        return workflow[0] if workflow else None
    try:
        idx = workflow.index(current_role)
        if idx + 1 < len(workflow):
            return workflow[idx + 1]
    except ValueError:
        pass
    return None

class LeaveAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        scope = request.query_params.get('scope', 'personal')
        q_status = request.query_params.get('status', '')
        
        if scope == 'team-pending':
            if role == 'MD':
                leaves = Leave.objects.filter(status__icontains='Pending')
            else:
                leaves = Leave.objects.filter(current_approver_role=role)
            if role == 'TeamLead':
                team_member_ids = Team.objects.filter(lead=user).values_list('members__id', flat=True).distinct()
                leaves = leaves.filter(user__id__in=team_member_ids).distinct()
            elif role == 'Manager':
                managed_teams = Team.objects.filter(projects__assigned_manager=user)
                leaves = leaves.filter(
                    Q(user__reporting_manager=user) |
                    Q(user__reporting_manager__reporting_manager=user) |
                    Q(user__leading_teams__in=managed_teams) |
                    Q(user__teams__in=managed_teams)
                ).distinct()
            elif role in ['HR', 'MD']:
                pass
            else:
                leaves = Leave.objects.none()
        elif scope == 'approved-tracking':
            leaves = Leave.objects.filter(approval_steps__approver=user, approval_steps__decision='Approved').distinct()
        elif scope == 'team-all':
            if role == 'TeamLead':
                team_member_ids = Team.objects.filter(lead=user).values_list('members__id', flat=True).distinct()
                leaves = Leave.objects.filter(user__id__in=team_member_ids).distinct()
            elif role == 'Manager':
                managed_teams = Team.objects.filter(projects__assigned_manager=user)
                leaves = Leave.objects.filter(
                    Q(user__reporting_manager=user) |
                    Q(user__reporting_manager__reporting_manager=user) |
                    Q(user__leading_teams__in=managed_teams) |
                    Q(user__teams__in=managed_teams)
                ).distinct()
            elif role in ['HR', 'MD']:
                leaves = Leave.objects.all()
            else:
                leaves = Leave.objects.none()
        else:
            leaves = Leave.objects.filter(user=user)
            
        if q_status:
            leaves = leaves.filter(status=q_status)
            
        leaves = leaves.order_by('-created_at')
        
        pending_count = 0
        if scope == 'team-pending':
            pending_count = leaves.count()
        else:
            if role == 'TeamLead':
                team_member_ids = Team.objects.filter(lead=user).values_list('members__id', flat=True).distinct()
                pending_count = Leave.objects.filter(current_approver_role=role, user__id__in=team_member_ids).distinct().count()
            elif role == 'Manager':
                managed_teams = Team.objects.filter(projects__assigned_manager=user)
                pending_count = Leave.objects.filter(current_approver_role=role).filter(
                    Q(user__reporting_manager=user) |
                    Q(user__reporting_manager__reporting_manager=user) |
                    Q(user__leading_teams__in=managed_teams) |
                    Q(user__teams__in=managed_teams)
                ).distinct().count()
            elif role in ['HR', 'MD']:
                if role == 'MD':
                    pending_count = Leave.objects.filter(status__icontains='Pending').count()
                else:
                    pending_count = Leave.objects.filter(current_approver_role=role).count()

        personal_approved = Leave.objects.filter(user=user, status__in=['Approved', 'Final Approved'])
        personal_approved_days = sum([(l.to_date - l.from_date).days + 1 for l in personal_approved])
        personal_leave_balance = 24 - personal_approved_days

        tracking_approved_days = 0
        if scope == 'approved-tracking':
            for l in leaves:
                if l.status in ['Approved', 'Final Approved']:
                    tracking_approved_days += (l.to_date - l.from_date).days + 1
            approved_count = tracking_approved_days
            leave_balance = 0
        else:
            approved_count = personal_approved_days
            leave_balance = personal_leave_balance
        
        serializer = LeaveSerializer(leaves, many=True, context={'request': request})
        return Response({
            "leaves": serializer.data,
            "leave_balance": leave_balance,
            "approved_count": approved_count,
            "pending_count": pending_count,
        }, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        from_date = request.data.get('from_date')
        to_date = request.data.get('to_date')
        reason = request.data.get('reason')
        leave_type = request.data.get('leave_type', 'Paid')
        
        if not from_date or not to_date or not reason:
            return Response({"detail": "Missing fields: from_date, to_date, and reason are required."}, status=status.HTTP_400_BAD_REQUEST)
            
        role = user.role
        workflow = LEAVE_WORKFLOWS.get(role, [])
        first_approver_role = get_next_approver_role(workflow, None)
        
        initial_status = f"Pending {first_approver_role} Approval" if first_approver_role else "Final Approved"

        leave = Leave.objects.create(
            user=user,
            from_date=from_date,
            to_date=to_date,
            reason=reason,
            leave_type=leave_type,
            status=initial_status,
            current_approver_role=first_approver_role,
            user_role_at_submission=role,
        )
        
        from hr.models import LeaveApprovalStep
        LeaveApprovalStep.objects.create(
            leave=leave,
            approver=user,
            approver_role=role,
            decision='Submitted',
            remarks=reason
        )
        
        if initial_status == "Final Approved":
            from datetime import timedelta, datetime
            if isinstance(from_date, str):
                from datetime import datetime as dt
                fd = dt.strptime(from_date, "%Y-%m-%d").date()
                td = dt.strptime(to_date, "%Y-%m-%d").date()
            else:
                fd = from_date
                td = to_date
            curr_date = fd
            while curr_date <= td:
                if curr_date.weekday() != 6:
                    att, _ = Attendance.objects.get_or_create(user=user, date=curr_date)
                    att.status = "Leave"
                    att.total_hours = 8.0
                    att.save()
                curr_date += timedelta(days=1)
        
        send_leave_notification(leave)
        
        serializer = LeaveSerializer(leave, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LeaveActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        role = user.role
        leave = get_object_or_404(Leave, id=pk)
        action = request.data.get('action')
        comments = request.data.get('comments', '')
        
        if leave.user == user:
            return Response({"detail": "You cannot approve your own leave request."}, status=status.HTTP_403_FORBIDDEN)
            
        if leave.status in ["Rejected", "Final Approved", "Approved"] or "Rejected" in leave.status:
            return Response({"detail": "Leave request has already been finalized."}, status=status.HTTP_400_BAD_REQUEST)
            
        if leave.current_approver_role != role:
            return Response({"detail": f"Not authorized. Waiting for {leave.current_approver_role}."}, status=status.HTTP_403_FORBIDDEN)

        if comments:
            leave.comments = comments
            
        from hr.models import LeaveApprovalStep

        if action == 'reject':
            leave.status = f"Rejected by {role}"
            leave.current_approver_role = None
            leave.save()
            LeaveApprovalStep.objects.create(leave=leave, approver=user, approver_role=role, decision='Rejected', remarks=comments)
            send_leave_notification(leave)
            return Response({"detail": "Leave request rejected successfully."}, status=status.HTTP_200_OK)
            
        elif action == 'approve':
            LeaveApprovalStep.objects.create(leave=leave, approver=user, approver_role=role, decision='Approved', remarks=comments)
            
            if role == 'TeamLead':
                leave.approved_tl = True
            elif role == 'Manager':
                leave.approved_manager = True
            elif role == 'HR':
                leave.approved_hr = True
            elif role == 'MD':
                leave.approved_md = True

            workflow = LEAVE_WORKFLOWS.get(leave.user_role_at_submission, [])
            next_role = get_next_approver_role(workflow, role)
            
            leave.current_approver_role = next_role
            if next_role:
                leave.status = f"Pending {next_role} Approval"
            else:
                leave.status = "Final Approved"
                from datetime import timedelta
                curr_date = leave.from_date
                while curr_date <= leave.to_date:
                    if curr_date.weekday() != 6:
                        att, _ = Attendance.objects.get_or_create(user=leave.user, date=curr_date)
                        att.status = "Leave"
                        att.total_hours = 8.0
                        att.save()
                    curr_date += timedelta(days=1)
                    
            leave.save()
            send_leave_notification(leave)
            return Response({"detail": f"Leave request approved. Current status: {leave.status}."}, status=status.HTTP_200_OK)
            
        else:
            return Response({"detail": "Invalid action. Use 'approve' or 'reject'."}, status=status.HTTP_400_BAD_REQUEST)


class HolidayAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        holidays = Holiday.objects.all().order_by('date')
        serializer = HolidaySerializer(holidays, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can create holidays."}, status=status.HTTP_403_FORBIDDEN)
            
        name = request.data.get('name')
        date_str = request.data.get('date')
        department = request.data.get('department', '')
        
        if not name or not date_str:
            return Response({"detail": "Name and date are required."}, status=status.HTTP_400_BAD_REQUEST)
            
        from datetime import datetime
        from django.utils import timezone
        
        try:
            date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return Response({"detail": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
            
        is_md = (user.role == 'MD')
        status_val = "Approved" if is_md else "Pending"
            
        holiday = Holiday.objects.create(
            name=name,
            date=date_obj,
            department=department,
            status=status_val,
            created_by=user,
            submitted_by=user if not is_md else None,
            submitted_at=timezone.now() if not is_md else None,
            approved_by=user if is_md else None,
            approved_at=timezone.now() if is_md else None,
        )
        
        if not is_md:
            from .views import notify_md_holiday_pending
            notify_md_holiday_pending(holiday)
        else:
            from .views import notify_holiday_approved
            notify_holiday_approved(holiday)
            
        serializer = HolidaySerializer(holiday)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can delete holidays."}, status=status.HTTP_403_FORBIDDEN)
            
        holiday = get_object_or_404(Holiday, id=pk)
        holiday.delete()
        return Response({"detail": "Holiday deleted successfully."}, status=status.HTTP_200_OK)


class HolidayActionAPIView(APIView):
    """Allows MD to approve or reject a pending holiday request."""
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        if user.role != 'MD':
            return Response({"detail": "Access Denied: Only MD can approve/reject holidays."}, status=status.HTTP_403_FORBIDDEN)

        action = request.data.get('action')
        remarks = request.data.get('remarks', '')
        if action not in ['approve', 'reject']:
            return Response({"detail": "Invalid action. Use 'approve' or 'reject'."}, status=status.HTTP_400_BAD_REQUEST)

        holiday = get_object_or_404(Holiday, id=pk)
        from django.utils.timezone import now
        timestamp = now()

        if action == 'approve':
            holiday.status = 'Approved'
            holiday.approved_by = user
            holiday.approved_at = timestamp
            holiday.remarks = remarks
        else:
            holiday.status = 'Rejected'
            holiday.rejected_by = user
            holiday.rejected_at = timestamp
            holiday.remarks = remarks

        holiday.last_modified_by = user
        holiday.last_modified_at = timestamp
        holiday.save()

        return Response({
            "detail": f"Holiday has been {holiday.status.lower()} successfully.",
            "id": holiday.id,
            "status": holiday.status
        }, status=status.HTTP_200_OK)


from .views import generate_payslip_pdf_file, calculate_payroll_data
from decimal import Decimal
import threading
from django.core.mail import EmailMessage
from django.conf import settings
from django.http import FileResponse


def send_payslip_email_async(payslip_id, performed_by_id=None, ip_address=None, force=False):
    """
    Dispatches payslip email asynchronously in a background thread
    using the verified company YGREmailService.
    Preserves approval status even if email fails.
    Prevents duplicate concurrent deliveries.
    """
    from main.email_service import YGREmailService
    ok, _ = YGREmailService.send_payslip(payslip_id, sender_id=performed_by_id, force=force)
    return ok


class PayslipAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        
        search = request.query_params.get('search', '')
        filter_month = request.query_params.get('month', '')
        filter_year = request.query_params.get('year', '')
        filter_status = request.query_params.get('status', '')
        target_user_id = request.query_params.get('user_id', '')
        
        if role in ['Employee', 'TeamLead']:
            # Employees only see published and approved/paid slips
            payslips = Payslip.objects.filter(employee=user, is_published=True, status__in=['Approved', 'Paid'])
        elif role in ['HR', 'MD']:
            payslips = Payslip.objects.all().select_related('employee')
        elif role == 'Manager':
            managed_teams = Team.objects.filter(projects__assigned_manager=user)
            managed_user_ids = User.objects.filter(
                Q(reporting_manager=user) |
                Q(reporting_manager__reporting_manager=user) |
                Q(leading_teams__in=managed_teams) |
                Q(teams__in=managed_teams)
            ).values_list('id', flat=True).distinct()
            payslips = Payslip.objects.filter(Q(employee_id__in=managed_user_ids) | Q(employee=user)).select_related('employee')
        else:
            payslips = Payslip.objects.none()
            
        if target_user_id:
            payslips = payslips.filter(employee_id=target_user_id)
        if search:
            payslips = payslips.filter(
                Q(employee_name__icontains=search) |
                Q(employee__first_name__icontains=search) |
                Q(employee__last_name__icontains=search) |
                Q(employee__username__icontains=search) |
                Q(employee__emp_id__icontains=search)
            )
        if filter_month:
            payslips = payslips.filter(month=filter_month)
        if filter_year:
            payslips = payslips.filter(year=filter_year)
        if filter_status:
            payslips = payslips.filter(status=filter_status)
            
        payslips = payslips.order_by('-year', '-month')
        
        serializer = PayslipSerializer(payslips, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can generate payslips."}, status=status.HTTP_403_FORBIDDEN)
            
        emp_id = request.data.get('employee')
        month = request.data.get('month')
        year = request.data.get('year')
        employee = get_object_or_404(User, id=emp_id)
        
        if Payslip.objects.filter(employee=employee, month=month, year=year).exists():
            return Response({"detail": f"Payslip for this employee for {month}/{year} already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        incoming_status = request.data.get('status', 'Pending Approval')
        if incoming_status not in ['Draft', 'Generated', 'Pending Approval', 'Approved', 'Paid']:
            incoming_status = 'Pending Approval'

        # Only allow portal publication if status is Approved or Paid
        requested_publish = request.data.get('is_published') is True or request.data.get('is_published') == 'true'
        is_published = requested_publish and (incoming_status in ['Approved', 'Paid'])

        payslip = Payslip(
            employee=employee,
            month=int(month),
            year=int(year),
            basic_salary=Decimal(str(request.data.get('basic_salary') or 0)),
            hra=Decimal(str(request.data.get('hra') or 0)),
            transport_allowance=Decimal(str(request.data.get('transport_allowance') or 0)),
            medical_allowance=Decimal(str(request.data.get('medical_allowance') or 0)),
            special_allowance=Decimal(str(request.data.get('special_allowance') or 0)),
            bonus=Decimal(str(request.data.get('bonus') or 0)),
            pf_deduction=Decimal(str(request.data.get('pf_deduction') or 0)),
            esi_deduction=Decimal(str(request.data.get('esi_deduction') or 0)),
            professional_tax=Decimal(str(request.data.get('professional_tax') or 0)),
            tds=Decimal(str(request.data.get('tds') or 0)),
            loan_deduction=Decimal(str(request.data.get('loan_deduction') or 0)),
            other_deductions=Decimal(str(request.data.get('other_deductions') or 0)),
            loss_of_pay=Decimal(str(request.data.get('loss_of_pay') or 0)),
            working_days=int(request.data.get('working_days') or 26),
            days_present=int(request.data.get('days_present') or 26),
            days_absent=int(request.data.get('days_absent') or 0),
            leaves_taken=int(request.data.get('leaves_taken') or 0),
            unpaid_leave_days=int(request.data.get('unpaid_leave_days') or 0),
            half_days=int(request.data.get('half_days') or 0),
            holidays=int(request.data.get('holidays') or 0),
            week_offs=int(request.data.get('week_offs') or 0),
            sandwich_leave_days=int(request.data.get('sandwich_leave_days') or 0),
            status=incoming_status,
            payment_date=request.data.get('payment_date') or None,
            is_published=is_published,
            notes=request.data.get('notes', ''),
            created_by=user,
            generated_by=user,
            generated_at=timezone.now(),
        )

        if incoming_status == 'Approved':
            payslip.approved_by = user
            payslip.approved_at = timezone.now()
        
        payslip.employee_name = employee.get_full_name() or employee.username
        payslip.designation = employee.role
        payslip.department = employee.get_department_display() or employee.department
        
        try:
            struct = employee.salary_structure
            payslip.bank_name = struct.bank_name or getattr(employee, 'bank_name', '')
            payslip.account_number = struct.account_number or getattr(employee, 'account_number', '')
            payslip.ifsc_code = struct.ifsc_code or getattr(employee, 'ifsc_code', '')
            payslip.pan = struct.pan or getattr(employee, 'pan', '')
            payslip.uan = struct.uan or getattr(employee, 'uan', '')
            payslip.aadhaar = struct.aadhaar or getattr(employee, 'aadhaar', '')
        except SalaryStructure.DoesNotExist:
            payslip.bank_name = getattr(employee, 'bank_name', '')
            payslip.account_number = getattr(employee, 'account_number', '')
            payslip.ifsc_code = getattr(employee, 'ifsc_code', '')
            payslip.pan = getattr(employee, 'pan', '')
            payslip.uan = getattr(employee, 'uan', '')
            payslip.aadhaar = getattr(employee, 'aadhaar', '')
            
        payslip.save()
        generate_payslip_pdf_file(payslip)
        payslip.save()

        # Audit log
        ip = request.META.get('REMOTE_ADDR')
        PayrollAuditLog.objects.create(
            payslip=payslip,
            performed_by=user,
            action='GENERATE',
            ip_address=ip,
            details=f"Created payslip for {employee.username} ({payslip.month_name} {payslip.year})"
        )
        
        serializer = PayslipSerializer(payslip)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PayslipDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        payslip = get_object_or_404(Payslip, pk=pk)
        user = request.user
        role = user.role

        if role in ('HR', 'MD'):
            pass
        elif role == 'Manager':
            managed_teams = Team.objects.filter(projects__assigned_manager=user)
            managed_user_ids = User.objects.filter(
                Q(reporting_manager=user) |
                Q(reporting_manager__reporting_manager=user) |
                Q(leading_teams__in=managed_teams) |
                Q(teams__in=managed_teams)
            ).values_list('id', flat=True).distinct()
            if payslip.employee != user and payslip.employee_id not in managed_user_ids:
                return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)
        elif payslip.employee == user:
            if not payslip.is_published or payslip.status not in ('Approved', 'Paid'):
                return Response({"detail": "This payslip is not published yet."}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)
            
        serializer = PayslipSerializer(payslip)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can edit payslips."}, status=status.HTTP_403_FORBIDDEN)

        payslip = get_object_or_404(Payslip, pk=pk)
        if payslip.is_locked:
            return Response({"detail": "Locked payslips cannot be edited."}, status=status.HTTP_400_BAD_REQUEST)
        if payslip.status == 'Paid':
            return Response({"detail": "Paid payslips cannot be edited."}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        # Update earnings & deductions
        payslip.basic_salary = Decimal(str(data.get('basic_salary', payslip.basic_salary) or 0))
        payslip.hra = Decimal(str(data.get('hra', payslip.hra) or 0))
        payslip.transport_allowance = Decimal(str(data.get('transport_allowance', payslip.transport_allowance) or 0))
        payslip.medical_allowance = Decimal(str(data.get('medical_allowance', payslip.medical_allowance) or 0))
        payslip.special_allowance = Decimal(str(data.get('special_allowance', payslip.special_allowance) or 0))
        payslip.bonus = Decimal(str(data.get('bonus', payslip.bonus) or 0))

        payslip.pf_deduction = Decimal(str(data.get('pf_deduction', payslip.pf_deduction) or 0))
        payslip.esi_deduction = Decimal(str(data.get('esi_deduction', payslip.esi_deduction) or 0))
        payslip.professional_tax = Decimal(str(data.get('professional_tax', payslip.professional_tax) or 0))
        payslip.tds = Decimal(str(data.get('tds', payslip.tds) or 0))
        payslip.loan_deduction = Decimal(str(data.get('loan_deduction', payslip.loan_deduction) or 0))
        payslip.other_deductions = Decimal(str(data.get('other_deductions', payslip.other_deductions) or 0))
        payslip.loss_of_pay = Decimal(str(data.get('loss_of_pay', payslip.loss_of_pay) or 0))

        # Attendance
        payslip.working_days = int(data.get('working_days', payslip.working_days) or 26)
        payslip.days_present = int(data.get('days_present', payslip.days_present) or 26)
        payslip.days_absent = int(data.get('days_absent', payslip.days_absent) or 0)
        payslip.leaves_taken = int(data.get('leaves_taken', payslip.leaves_taken) or 0)
        payslip.unpaid_leave_days = int(data.get('unpaid_leave_days', payslip.unpaid_leave_days) or 0)
        payslip.half_days = int(data.get('half_days', payslip.half_days) or 0)
        payslip.holidays = int(data.get('holidays', payslip.holidays) or 0)
        payslip.week_offs = int(data.get('week_offs', payslip.week_offs) or 0)
        payslip.sandwich_leave_days = int(data.get('sandwich_leave_days', payslip.sandwich_leave_days) or 0)

        # Status & Notes
        new_status = data.get('status')
        if new_status in ['Draft', 'Generated', 'Pending Approval', 'Approved', 'Rejected', 'Paid']:
            payslip.status = new_status
        elif payslip.status == 'Rejected':
            # Reset to Pending Approval when correcting a rejected slip
            payslip.status = 'Pending Approval'

        if 'is_published' in data:
            if payslip.status in ['Approved', 'Paid']:
                payslip.is_published = data.get('is_published') is True or data.get('is_published') == 'true'
            else:
                payslip.is_published = False

        if 'payment_date' in data:
            payslip.payment_date = data.get('payment_date') or None
        if 'notes' in data:
            payslip.notes = data.get('notes', payslip.notes)

        payslip.recalculated_by = request.user
        payslip.recalculated_at = timezone.now()
        payslip.needs_recalculation = False
        payslip.save()

        # Regenerate PDF with updated values
        generate_payslip_pdf_file(payslip)
        payslip.save()

        # Audit log for revision
        ip = request.META.get('REMOTE_ADDR')
        PayrollAuditLog.objects.create(
            payslip=payslip,
            performed_by=request.user,
            action='REGENERATE',
            ip_address=ip,
            details=f"Updated/corrected payslip for {payslip.employee.username} ({payslip.month_name} {payslip.year}). Net Salary: ₹{payslip.net_salary:,.2f}"
        )

        serializer = PayslipSerializer(payslip)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can delete payslips."}, status=status.HTTP_403_FORBIDDEN)
            
        payslip = get_object_or_404(Payslip, pk=pk)
        if payslip.is_locked:
            return Response({"detail": "Locked payslips cannot be deleted."}, status=status.HTTP_400_BAD_REQUEST)
        payslip.delete()
        return Response({"detail": "Payslip deleted successfully."}, status=status.HTTP_200_OK)


class PayslipDownloadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        payslip = get_object_or_404(Payslip, pk=pk)
        user = request.user
        role = user.role

        # Check authorization
        if role in ('HR', 'MD'):
            pass
        elif role == 'Manager':
            managed_teams = Team.objects.filter(projects__assigned_manager=user)
            managed_user_ids = User.objects.filter(
                Q(reporting_manager=user) |
                Q(reporting_manager__reporting_manager=user) |
                Q(leading_teams__in=managed_teams) |
                Q(teams__in=managed_teams)
            ).values_list('id', flat=True).distinct()
            if payslip.employee != user and payslip.employee_id not in managed_user_ids:
                return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)
        elif payslip.employee == user:
            if not payslip.is_published or payslip.status not in ('Approved', 'Paid'):
                return Response({"detail": "This payslip is not published yet."}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)

        # Dynamic PDF generation if missing
        if not payslip.payslip_pdf or not payslip.payslip_pdf.storage.exists(payslip.payslip_pdf.name):
            generate_payslip_pdf_file(payslip)
            payslip.save()

        # Log audit
        ip = request.META.get('REMOTE_ADDR')
        PayslipDownloadLog.objects.create(payslip=payslip, downloaded_by=user, ip_address=ip)
        PayrollAuditLog.objects.create(
            payslip=payslip,
            performed_by=user,
            action='DOWNLOAD',
            ip_address=ip,
            details=f"Downloaded payslip of {payslip.employee.username} for {payslip.month_name} {payslip.year}"
        )

        if payslip.payslip_pdf and payslip.payslip_pdf.storage.exists(payslip.payslip_pdf.name):
            response = FileResponse(payslip.payslip_pdf.open('rb'), content_type='application/pdf')
            from .payslip_utils import clean_employee_name
            emp_name = clean_employee_name(payslip.employee, payslip.employee_name).replace(' ', '_')
            fname = f"Payslip_{emp_name}_{payslip.month_name}_{payslip.year}.pdf"
            response['Content-Disposition'] = f'attachment; filename="{fname}"'
            return response
        else:
            return Response({"detail": "Failed to generate payslip PDF."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PayslipActionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can review and approve payslips."}, status=status.HTTP_403_FORBIDDEN)

        payslip = get_object_or_404(Payslip, pk=pk)
        action = request.data.get('action')
        ip = request.META.get('REMOTE_ADDR')

        if action == 'approve':
            if payslip.status in ['Approved', 'Paid'] and payslip.email_status == 'Sent':
                return Response({
                    "detail": f"Payslip for {payslip.employee_name or payslip.employee.username} is already approved and emailed.",
                    "status": payslip.status,
                    "is_published": payslip.is_published,
                    "email_status": payslip.email_status,
                }, status=status.HTTP_200_OK)

            payslip.status = 'Approved'
            payslip.is_published = True
            payslip.approved_by = user
            payslip.approved_at = timezone.now()
            payslip.rejection_reason = None
            payslip.save()

            # Ensure PDF is generated
            if not payslip.payslip_pdf or not payslip.payslip_pdf.storage.exists(payslip.payslip_pdf.name):
                generate_payslip_pdf_file(payslip)
                payslip.save()

            # Audit log
            PayrollAuditLog.objects.create(
                payslip=payslip,
                performed_by=user,
                action='APPROVE',
                ip_address=ip,
                details=f"Approved payslip of {payslip.employee.username} for {payslip.month_name} {payslip.year}"
            )

            # Asynchronously send email to employee if not already sent
            if payslip.email_status != 'Sent':
                send_payslip_email_async(payslip.id, user.id, ip)

            return Response({
                "detail": f"Payslip for {payslip.employee_name or payslip.employee.username} approved successfully. PDF queued for email delivery.",
                "status": payslip.status,
                "is_published": payslip.is_published,
                "email_status": payslip.email_status,
            }, status=status.HTTP_200_OK)

        elif action == 'reject':
            reason = request.data.get('reason', 'Rejected by HR during review.')
            payslip.status = 'Rejected'
            payslip.is_published = False
            payslip.rejected_by = user
            payslip.rejected_at = timezone.now()
            payslip.rejection_reason = reason
            payslip.save()

            PayrollAuditLog.objects.create(
                payslip=payslip,
                performed_by=user,
                action='REJECT',
                ip_address=ip,
                details=f"Rejected payslip of {payslip.employee.username} for {payslip.month_name} {payslip.year}: {reason}"
            )

            return Response({
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

        return Response({"detail": "Invalid action. Choose 'approve', 'reject', 'record_payment', or 'submit_for_approval'."}, status=status.HTTP_400_BAD_REQUEST)


class PayslipEmailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can email payslips."}, status=status.HTTP_403_FORBIDDEN)

        payslip = get_object_or_404(Payslip, pk=pk)
        ip = request.META.get('REMOTE_ADDR')

        if payslip.email_status == 'Sending':
            return Response({"detail": "Email delivery is already in progress for this payslip."}, status=status.HTTP_400_BAD_REQUEST)

        force = bool(request.data.get('force', False))
        if payslip.email_status == 'Sent' and not force:
            return Response({"detail": "Payslip has already been successfully delivered to employee email."}, status=status.HTTP_400_BAD_REQUEST)

        sent = send_payslip_email_async(payslip.id, user.id, ip, force=force)
        if not sent:
            return Response({"detail": "Email delivery could not be queued."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "detail": f"Email delivery initiated to {payslip.employee.email}.",
            "email_status": "Sending"
        }, status=status.HTTP_200_OK)


class PayslipCalculateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can calculate payroll."}, status=status.HTTP_403_FORBIDDEN)

        emp_id = request.query_params.get('employee_id')
        month = request.query_params.get('month')
        year = request.query_params.get('year')

        if not all([emp_id, month, year]):
            return Response({"detail": "Missing employee_id, month, or year parameter."}, status=status.HTTP_400_BAD_REQUEST)

        employee = get_object_or_404(User, id=emp_id)
        try:
            data = calculate_payroll_data(employee, year, month)
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": f"Calculation error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SalaryStructureAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        
        if role in ['HR', 'MD']:
            structures = SalaryStructure.objects.all().select_related('employee')
        else:
            structures = SalaryStructure.objects.filter(employee=user)
            
        emp_id = request.query_params.get('employee_id') or request.query_params.get('employee')
        if emp_id:
            structures = structures.filter(employee_id=emp_id)
            
        serializer = SalaryStructureSerializer(structures, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can edit salary structures."}, status=status.HTTP_403_FORBIDDEN)
            
        emp_id = request.data.get('employee')
        employee = get_object_or_404(User, id=emp_id)
        effective_date_str = request.data.get('effective_date')
        reason = (request.data.get('reason') or 'Salary Revision').strip()
        force_revision = request.data.get('force_revision', False)

        import datetime
        from django.utils import timezone
        try:
            effective_date = datetime.date.fromisoformat(str(effective_date_str)) if effective_date_str else timezone.localdate()
        except Exception:
            effective_date = timezone.localdate()

        # Check if payslips for the month/year of effective_date are already Approved or Paid
        approved_payslips = Payslip.objects.filter(
            employee=employee,
            year=effective_date.year,
            month=effective_date.month,
            status__in=['Approved', 'Paid']
        )
        if approved_payslips.exists() and not force_revision:
            status_names = ", ".join([p.status for p in approved_payslips])
            return Response({
                "detail": (
                    f"Notice: A payslip for {effective_date.strftime('%B %Y')} is already marked as {status_names}. "
                    "Updating this salary structure preserves historical payslips without silently modifying approved records. "
                    "Confirm revision to record this as an authorized adjustment."
                ),
                "requires_confirmation": True
            }, status=status.HTTP_409_CONFLICT)

        structure, created = SalaryStructure.objects.get_or_create(employee=employee)
        structure.effective_date = effective_date
        
        for field in ['monthly_gross', 'basic_salary', 'hra', 'transport_allowance', 'medical_allowance', 
                      'special_allowance', 'bonus', 'pf_enabled', 'pf_rate', 'pf_amount', 'esi_enabled', 
                      'esi_rate', 'esi_amount', 'pt_enabled', 'pt_amount', 'tds_amount', 'other_deductions',
                      'bank_name', 'account_number', 'ifsc_code', 'pan', 'uan', 'aadhaar']:
            if field in request.data:
                val = request.data[field]
                if field in ['pf_enabled', 'esi_enabled', 'pt_enabled']:
                    val = (val is True or val == 'true' or val == 1 or val == '1')
                setattr(structure, field, val)
                
        structure.save()

        # Sync user.salary field
        from decimal import Decimal
        try:
            gross_val = Decimal(str(structure.monthly_gross or 0))
            if gross_val > 0:
                employee.salary = gross_val
                employee.save(update_fields=['salary'])
        except Exception:
            pass

        # Create historical snapshot
        gross = structure.gross_salary
        deductions = structure.total_deductions
        net = structure.net_salary

        SalaryHistory.objects.create(
            employee=employee,
            effective_date=effective_date,
            revised_by=request.user,
            reason=reason,
            monthly_gross=structure.monthly_gross,
            basic_salary=structure.basic_salary,
            hra=structure.hra,
            transport_allowance=structure.transport_allowance,
            medical_allowance=structure.medical_allowance,
            special_allowance=structure.special_allowance,
            bonus=structure.bonus,
            pf_deduction=structure.pf_amount,
            esi_deduction=structure.esi_amount,
            professional_tax=structure.pt_amount,
            tds=structure.tds_amount,
            other_deductions=structure.other_deductions,
            gross_salary=gross,
            total_deductions=deductions,
            net_salary=net,
        )

        # Audit log
        PayrollAuditLog.objects.create(
            performed_by=request.user,
            action='SALARY_REVISION',
            details=f"Salary revised for {employee.username} ({employee.emp_id}): Gross ₹{gross}, Net ₹{net}. Effective: {effective_date}. Reason: {reason}",
            ip_address=request.META.get('REMOTE_ADDR')
        )

        serializer = SalaryStructureSerializer(structure)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SalaryHistoryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can view salary revision history."}, status=status.HTTP_403_FORBIDDEN)
            
        emp_id = request.query_params.get('employee_id') or request.query_params.get('employee')
        if not emp_id:
            history = SalaryHistory.objects.all().select_related('employee', 'revised_by').order_by('-effective_date', '-created_at')[:50]
        else:
            history = SalaryHistory.objects.filter(employee_id=emp_id).select_related('employee', 'revised_by').order_by('-effective_date', '-created_at')
            
        serializer = SalaryHistorySerializer(history, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProjectAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        
        if role == 'Employee':
            projects = Project.objects.filter(assigned_team__assigned_to=user)
        elif role == 'TeamLead':
            projects = Project.objects.filter(assigned_teams__lead=user)
        elif role == 'Manager':
            projects = Project.objects.filter(assigned_manager=user)
        elif role in ['HR', 'MD']:
            projects = Project.objects.all()
        else:
            projects = Project.objects.none()
            
        projects = projects.distinct().order_by('project_name')
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if user.role not in ['Manager', 'HR', 'MD']:
            return Response({"detail": "Access Denied: Only Manager, HR, or MD can create projects."}, status=status.HTTP_403_FORBIDDEN)
            
        name = request.data.get('project_name')
        description = request.data.get('description', '')
        
        if not name:
            return Response({"detail": "Project name is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        project = Project.objects.create(
            project_name=name,
            description=description,
            assigned_manager=user if user.role == 'Manager' else None
        )
        
        serializer = ProjectSerializer(project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TaskAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        
        status_filter = request.query_params.get('status', '')
        project_id = request.query_params.get('project_id', '')
        
        if role == 'Employee':
            tasks = Task.objects.filter(assigned_to=user)
        elif role == 'TeamLead':
            tasks = Task.objects.filter(
                Q(project__assigned_teams__lead=user) |
                Q(assigned_to__teams__lead=user) |
                Q(assigned_to=user)
            ).distinct()
        elif role == 'Manager':
            tasks = Task.objects.filter(
                Q(project__assigned_manager=user) |
                Q(assigned_to=user)
            ).distinct()
        elif role in ['HR', 'MD']:
            tasks = Task.objects.all()
        else:
            tasks = Task.objects.none()
            
        if status_filter:
            tasks = tasks.filter(status=status_filter)
        if project_id:
            tasks = tasks.filter(project_id=project_id)
            
        tasks = tasks.distinct().order_by('-end_date')
        
        from .serializers import TaskSerializer
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if user.role not in ['TeamLead', 'Manager', 'HR', 'MD']:
            return Response({"detail": "Access Denied: You do not have permissions to assign tasks."}, status=status.HTTP_403_FORBIDDEN)
            
        task_name = request.data.get('task_name')
        description = request.data.get('description', '')
        project_id = request.data.get('project')
        priority = request.data.get('priority', 'Medium')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        due_time = request.data.get('due_time')
        estimated_hours = request.data.get('estimated_hours')
        
        member_ids = request.data.get('members', [])
        if not member_ids and request.data.get('assigned_to'):
            member_ids = [request.data.get('assigned_to')]
            
        if not task_name or not project_id or not member_ids:
            return Response({"detail": "Task name, Project, and Assigned Employee(s) are required."}, status=status.HTTP_400_BAD_REQUEST)
            
        project = get_object_or_404(Project, id=project_id)
        
        # Verify permissions per role
        if user.role == 'TeamLead':
            if not project.assigned_teams.filter(lead=user).exists() and not project.tasks.filter(assigned_to=user).exists():
                return Response({"detail": "You do not lead a team on this project and have no tasks assigned to you."}, status=status.HTTP_403_FORBIDDEN)
        elif user.role == 'Manager':
            if project.assigned_manager != user:
                return Response({"detail": "You are not the manager of this project."}, status=status.HTTP_403_FORBIDDEN)
                
        last_task = None
        for assigned_to_id in member_ids:
            assigned_to = get_object_or_404(User, id=assigned_to_id)
            
            # Hierarchical validation
            if user.role == 'HR' and assigned_to.role != 'Manager':
                return Response({"detail": f"HR can only assign tasks to Managers, but selected {assigned_to.role}."}, status=status.HTTP_400_BAD_REQUEST)
            elif user.role == 'Manager' and assigned_to.role != 'TeamLead':
                return Response({"detail": f"Managers can only assign tasks to Team Leads, but selected {assigned_to.role}."}, status=status.HTTP_400_BAD_REQUEST)
            elif user.role == 'TeamLead' and assigned_to.role != 'Employee':
                return Response({"detail": f"Team Leads can only assign tasks to Employees, but selected {assigned_to.role}."}, status=status.HTTP_400_BAD_REQUEST)
                
            # Verify employee is in TL's team if creator is TL
            if user.role == 'TeamLead':
                if not Team.objects.filter(lead=user, members=assigned_to).exists() and assigned_to != user:
                    return Response({"detail": f"Can only assign tasks to employees in your team: {assigned_to.username} is not in your team."}, status=status.HTTP_400_BAD_REQUEST)
            
            task = Task.objects.create(
                task_name=task_name,
                description=description,
                project=project,
                priority=priority,
                start_date=start_date or timezone.localdate(),
                end_date=end_date or timezone.localdate(),
                due_time=due_time or None,
                estimated_hours=estimated_hours or None,
                assigned_to=assigned_to,
                created_by=user,
                status='Pending'
            )
            
            if 'file' in request.FILES:
                task.file = request.FILES['file']
                task.save()
                
            # Notification
            Notification.objects.create(
                recipient=assigned_to,
                title="New Task Assigned",
                message=f"You have been assigned a new task: {task_name}."
            )
            last_task = task
            
        if not last_task:
            return Response({"detail": "No valid employees selected to assign task."}, status=status.HTTP_400_BAD_REQUEST)
            
        from .serializers import TaskSerializer
        serializer = TaskSerializer(last_task)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class TaskDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        task = get_object_or_404(Task, id=pk)
        user = request.user
        
        if user.role == 'Employee' and task.assigned_to != user:
            return Response({"detail": "Not authorized to view this task."}, status=status.HTTP_403_FORBIDDEN)
            
        from .serializers import TaskSerializer
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        user = request.user
        task = get_object_or_404(Task, id=pk)
        
        is_assigned = (task.assigned_to == user)
        is_lead = (task.created_by == user) or user.role in ['HR', 'MD']
        
        if not is_assigned and not is_lead:
            return Response({"detail": "Not authorized to edit this task."}, status=status.HTTP_403_FORBIDDEN)
            
        new_status = request.data.get('status')
        if new_status:
            if new_status == 'Completed' and task.status != 'Completed':
                task.actual_submission_time = timezone.now()
                penalty = 0
                import datetime
                
                completion_datetime = timezone.localtime(task.actual_submission_time)
                
                if task.end_date:
                    from datetime import time
                    t = task.due_time if task.due_time else time(23, 59)
                    due_dt = datetime.datetime.combine(task.end_date, t)
                    due_dt = timezone.make_aware(due_dt)
                    if completion_datetime > due_dt:
                        penalty += 10
                        
                        if task.extension_status == 'Approved' and hasattr(task, 'extension_request'):
                            extended_hours = float(task.extension_request.requested_hours)
                            extended_dt = due_dt + datetime.timedelta(hours=extended_hours)
                            if completion_datetime > extended_dt:
                                penalty += 10
                
                task.base_performance_score = max(0, 100 - penalty)
                
                Notification.objects.create(
                    recipient=task.created_by,
                    title="Task Submitted",
                    message=f"Task '{task.task_name}' has been submitted by {user.username}."
                )

            task.status = new_status
            
        if 'file' in request.FILES:
            task.file = request.FILES['file']
            
        if request.data.get('notes'):
            task.notes = request.data.get('notes')
            
        task.save()
        from .serializers import TaskSerializer
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TaskExtensionRequestAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, task_id):
        user = request.user
        task = get_object_or_404(Task, id=task_id)
        
        if task.assigned_to != user:
            return Response({"detail": "Only assigned employee can request extension."}, status=status.HTTP_403_FORBIDDEN)
            
        if hasattr(task, 'extension_request') or task.extension_status != 'None':
            return Response({"detail": "You have already requested an extension for this task."}, status=status.HTTP_400_BAD_REQUEST)
            
        reason = request.data.get('reason')
        requested_hours = request.data.get('requested_hours')
        
        if not reason or not requested_hours:
            return Response({"detail": "Reason and requested hours are required."}, status=status.HTTP_400_BAD_REQUEST)
            
        from .models import TaskExtensionRequest
        ext = TaskExtensionRequest.objects.create(
            task=task,
            requested_by=user,
            reason=reason,
            requested_hours=requested_hours,
            status='Pending'
        )
        task.extension_status = 'Pending'
        task.save()
        
        if task.created_by:
            Notification.objects.create(
                recipient=task.created_by,
                title="Task Extension Requested",
                message=f"Employee {user.username} requested an extension for task '{task.task_name}'."
            )
            
        return Response({"detail": "Extension requested successfully."}, status=status.HTTP_201_CREATED)

    def put(self, request, task_id):
        user = request.user
        task = get_object_or_404(Task, id=task_id)
        
        if task.created_by != user and user.role not in ['HR', 'MD']:
            return Response({"detail": "Not authorized to approve extension."}, status=status.HTTP_403_FORBIDDEN)
            
        if not hasattr(task, 'extension_request'):
            return Response({"detail": "No extension request found."}, status=status.HTTP_404_NOT_FOUND)
            
        ext = task.extension_request
        if ext.status != 'Pending':
            return Response({"detail": f"Extension already {ext.status}."}, status=status.HTTP_400_BAD_REQUEST)
            
        decision = request.data.get('status')
        if decision not in ['Approved', 'Rejected']:
            return Response({"detail": "Status must be Approved or Rejected."}, status=status.HTTP_400_BAD_REQUEST)
            
        ext.status = decision
        ext.approved_by = user
        ext.save()
        
        task.extension_status = decision
        task.save()
        
        Notification.objects.create(
            recipient=task.assigned_to,
            title=f"Task Extension {decision}",
            message=f"Your extension request for task '{task.task_name}' was {decision.lower()}."
        )
        
        return Response({"detail": f"Extension {decision.lower()} successfully."}, status=status.HTTP_200_OK)

class TaskReviewAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        task = get_object_or_404(Task, id=task_id)
        if not hasattr(task, 'review'):
            return Response({"detail": "No review found."}, status=status.HTTP_404_NOT_FOUND)
        from .serializers import TaskReviewSerializer
        return Response(TaskReviewSerializer(task.review).data, status=status.HTTP_200_OK)

    def post(self, request, task_id):
        user = request.user
        task = get_object_or_404(Task, id=task_id)
        
        if task.status not in ['Completed', 'Submitted']:
            return Response({"detail": "Task must be submitted before review."}, status=status.HTTP_400_BAD_REQUEST)
            
        action = request.data.get('action')
        if not action:
            return Response({"detail": "Action is required ('return_to_employee' or 'submit_to_manager')."}, status=status.HTTP_400_BAD_REQUEST)

        from .models import TaskReview
        
        if user.role == 'TeamLead':
            if task.created_by != user:
                # Check if the user is the TL of the task's assigned employee
                from .models import Team
                tl_team = Team.objects.filter(lead=user, members=task.assigned_to).exists()
                if not tl_team and task.created_by != user:
                    return Response({"detail": "Only the assigned TL can review."}, status=status.HTTP_403_FORBIDDEN)
            
            review, created = TaskReview.objects.get_or_create(task=task)
            if review.review_status != 'Pending TL':
                return Response({"detail": "Task is not pending TL review."}, status=status.HTTP_400_BAD_REQUEST)
                
            if action == 'return_to_employee':
                task.status = 'Need Changes'
                task.save()
                review.delete()
                
                Notification.objects.create(
                    recipient=task.assigned_to,
                    title="Task Returned",
                    message=f"Your task '{task.task_name}' has been returned by TL {user.username} for changes."
                )
                return Response({"detail": "Task returned to employee."}, status=status.HTTP_200_OK)
                
            elif action == 'submit_to_manager':
                review.tl_score = int(request.data.get('score', 0))
                review.tl_remarks = request.data.get('remarks', '')
                review.tl_reviewed_by = user
                review.tl_reviewed_at = timezone.now()
                
                # We skip task-level Manager/HR/MD review as per the project-wise workflow.
                # So we mark the task review as 'Finalized' at the task level, but the Project goes to the Manager.
                review.review_status = 'Finalized'
                review.final_score = review.tl_score
                review.save()
                
                task.status = 'Completed'
                task.save()
                
                Notification.objects.create(
                    recipient=task.assigned_to,
                    title="Task Approved by TL",
                    message=f"Your task '{task.task_name}' has been approved by TL {user.username} with a score of {review.tl_score}."
                )
                return Response({"detail": "Task approved and finalized."}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)
                
        else:
            return Response({"detail": "Role not authorized to review tasks."}, status=status.HTTP_403_FORBIDDEN)

class DailyReportAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        
        if role == 'Employee':
            reports = DailyReport.objects.filter(user=user)
        elif role == 'TeamLead':
            team_member_ids = Team.objects.filter(lead=user).values_list('members__id', flat=True).distinct()
            members = User.objects.filter(id__in=team_member_ids).distinct()
            reports = DailyReport.objects.filter(Q(user=user) | Q(user__in=members))
        elif role == 'Manager':
            projects = Project.objects.filter(assigned_manager=user)
            reports = DailyReport.objects.filter(Q(project__in=projects) | Q(user__reporting_manager=user))
        elif role in ['HR', 'MD']:
            reports = DailyReport.objects.all()
        else:
            reports = DailyReport.objects.none()
            
        reports = reports.select_related('user', 'project').order_by('-report_date', '-id')[:50]
        
        serializer = DailyReportSerializer(reports, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        project_id = request.data.get('project')
        tasks_completed = request.data.get('tasks_completed')
        tasks_in_progress = request.data.get('tasks_in_progress', '')
        issues = request.data.get('issues', '')
        plan_for_tomorrow = request.data.get('plan_for_tomorrow', '')
        
        if not tasks_completed:
            return Response({"detail": "Tasks completed description is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        project = None
        if project_id:
            project = get_object_or_404(Project, id=project_id)
            
        report = DailyReport.objects.create(
            user=user,
            project=project,
            tasks_completed=tasks_completed,
            tasks_in_progress=tasks_in_progress,
            issues=issues,
            plan_for_tomorrow=plan_for_tomorrow,
            report_date=timezone.localdate()
        )
        
        serializer = DailyReportSerializer(report)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from django.utils import timezone
        import calendar

        user = request.user
        user_data = UserSerializer(user, context={'request': request}).data

        # ── Attendance summary (current month by default, or ?month=YYYY-MM) ──
        month_param = request.GET.get('month')
        if month_param:
            try:
                year, month = map(int, month_param.split('-'))
            except (ValueError, AttributeError):
                year, month = timezone.now().year, timezone.now().month
        else:
            year, month = timezone.now().year, timezone.now().month

        total_days = calendar.monthrange(year, month)[1]
        month_attendances = Attendance.objects.filter(
            user=user,
            date__year=year,
            date__month=month,
        )
        present_days = month_attendances.filter(status__icontains='Present').count()
        absent_days = month_attendances.filter(status__icontains='Absent').count()
        pct = round((present_days / total_days) * 100) if total_days > 0 else 0

        attendance_summary = {
            'total_days': total_days,
            'present_days': present_days,
            'absent_days': absent_days,
            'percentage': pct,
        }

        # ── Leave summary (this year) ──
        this_year = timezone.now().year
        leaves_qs = Leave.objects.filter(user=user, from_date__year=this_year)
        leave_summary = {
            'approved': leaves_qs.filter(status__icontains='Approved').count(),
            'pending': leaves_qs.filter(status__icontains='Pending').count(),
            'rejected': leaves_qs.filter(status__icontains='Rejected').count(),
        }

        # ── Projects ── (member OR team lead)
        from django.db.models import Q as _Q
        projects_qs = Project.objects.filter(
            _Q(assigned_teams__members=user) | _Q(assigned_teams__lead=user)
        ).distinct()
        projects = []
        for p in projects_qs:
            lead_name = '—'
            first_team = p.assigned_teams.first()
            if first_team and first_team.lead:
                lead = first_team.lead
                lead_name = f"{lead.first_name} {lead.last_name}".strip() or lead.username
            projects.append({
                'name': p.name,
                'status': p.status,
                'team_lead': lead_name,
            })

        # ── Salary structure secure fields ──
        salary_structure = {}
        try:
            ss = user.salary_structure
            salary_structure = {
                'has_pan': bool(ss.pan),
                'has_uan': bool(ss.uan),
                'bank_name': ss.bank_name or '—',
                'has_account_number': bool(ss.account_number),
                'ifsc_code': ss.ifsc_code or '—',
                'has_aadhaar': bool(ss.aadhaar),
                'monthly_gross': float(ss.monthly_gross) if ss.monthly_gross else None,
                'basic_salary': float(ss.basic_salary) if ss.basic_salary else None,
            }
        except Exception:
            salary_structure = {
                'has_pan': False,
                'has_uan': False,
                'bank_name': '—',
                'has_account_number': False,
                'ifsc_code': '—',
                'has_aadhaar': False,
                'monthly_gross': None,
                'basic_salary': None,
            }

        return Response({
            'user': user_data,
            'attendance': attendance_summary,
            'leave_summary': leave_summary,
            'projects': projects,
            'salary_structure': salary_structure,
        }, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user
        
        if request.data.get('remove_profile_pic') == 'true':
            if user.profile_pic:
                user.profile_pic.delete(save=False)
                user.profile_pic = None
        elif 'profile_pic' in request.FILES:
            user.profile_pic = request.FILES['profile_pic']
            
        for field in ['first_name', 'email', 'phone', 'address', 'date_of_birth', 'gender']:
            if field in request.data:
                setattr(user, field, request.data[field])
                
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HRSettingsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        settings = HRSettings.get_settings()
        serializer = HRSettingsSerializer(settings)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can update settings."}, status=status.HTTP_403_FORBIDDEN)
            
        settings = HRSettings.get_settings()
        if 'sandwich_leave_enabled' in request.data:
            settings.sandwich_leave_enabled = request.data['sandwich_leave_enabled'] == True
        if 'md_approval_required' in request.data:
            settings.md_approval_required = request.data['md_approval_required'] == True
        if 'weekly_off_days' in request.data:
            settings.weekly_off_days = str(request.data['weekly_off_days'])
        if 'half_day_working_hours' in request.data:
            settings.half_day_working_hours = float(request.data['half_day_working_hours'])
        if 'grace_time' in request.data:
            settings.grace_time = int(request.data['grace_time'])
        if 'office_start_time' in request.data:
            settings.office_start_time = request.data['office_start_time']
        if 'office_end_time' in request.data:
            settings.office_end_time = request.data['office_end_time']
        if 'late_mark_rules_enabled' in request.data:
            settings.late_mark_rules_enabled = request.data['late_mark_rules_enabled'] == True
            
        settings.save()
        serializer = HRSettingsSerializer(settings)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChatRoomAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rooms = ChatRoom.objects.filter(users=request.user)
        serializer = ChatRoomSerializer(rooms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        name = request.data.get('name')
        room_type = request.data.get('room_type', 'channel')
        description = request.data.get('description', '')
        user_ids = request.data.get('users', [])
        
        if not name:
            return Response({"detail": "Room name is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        existing_room = ChatRoom.objects.filter(name=name, room_type=room_type, users=request.user).first()
        if existing_room:
            if user_ids:
                existing_room.users.add(*User.objects.filter(id__in=user_ids))
            serializer = ChatRoomSerializer(existing_room)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        room = ChatRoom.objects.create(
            name=name,
            room_type=room_type,
            description=description,
            created_by=request.user
        )
        room.users.add(request.user)
        if user_ids:
            room.users.add(*User.objects.filter(id__in=user_ids))
            
        room.save()
        serializer = ChatRoomSerializer(room)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ChatMessageAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        peer_id = request.query_params.get('peer_id')
        
        if not peer_id:
            return Response({"detail": "peer_id query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        peer = get_object_or_404(User, id=peer_id)
        
        messages = ChatMessage.objects.filter(
            (Q(sender=user) & Q(receiver=peer)) |
            (Q(sender=peer) & Q(receiver=user))
        ).exclude(deleted_for=user).order_by('created_at')
        
        messages.filter(receiver=user).update(is_read=True)
        
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        receiver_id = request.data.get('receiver')
        text = request.data.get('text', '')
        
        if not receiver_id:
            return Response({"detail": "receiver field is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        receiver = get_object_or_404(User, id=receiver_id)
        
        msg = ChatMessage.objects.create(
            sender=user,
            receiver=receiver,
            text=text
        )
        if 'file' in request.FILES:
            msg.file = request.FILES['file']
            msg.save()
            
        serializer = ChatMessageSerializer(msg)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GroupMessageAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        room_id = request.query_params.get('room_id')
        if not room_id:
            return Response({"detail": "room_id query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        room = get_object_or_404(ChatRoom, id=room_id)
        if not room.users.filter(id=request.user.id).exists():
            return Response({"detail": "Access Denied: Not a member of this chatroom."}, status=status.HTTP_403_FORBIDDEN)
            
        messages = GroupMessage.objects.filter(room=room).order_by('created_at')
        serializer = GroupMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        room_id = request.data.get('room_id')
        text = request.data.get('text', '')
        
        if not room_id:
            return Response({"detail": "room_id field is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        room = get_object_or_404(ChatRoom, id=room_id)
        if not room.users.filter(id=request.user.id).exists():
            return Response({"detail": "Access Denied: Not a member of this chatroom."}, status=status.HTTP_403_FORBIDDEN)
            
        msg = GroupMessage.objects.create(
            room=room,
            sender=request.user,
            text=text
        )
        if 'file' in request.FILES:
            msg.file = request.FILES['file']
            msg.save()
            
        serializer = GroupMessageSerializer(msg)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name='dispatch')
class CallSessionAPIView(APIView):
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        calls = CallSession.objects.filter(
            Q(caller=request.user) | Q(receiver=request.user)
        ).order_by('-created_at')[:30]
        
        serializer = CallSessionSerializer(calls, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        caller = request.user
        receiver_id = request.data.get('receiver')
        call_type = request.data.get('call_type', 'video')
        
        if not receiver_id:
            return Response({"detail": "receiver field is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        receiver = get_object_or_404(User, id=receiver_id)
        
        CallSession.objects.filter(caller=caller, status__in=['ringing', 'active']).update(status='ended', ended_at=timezone.now())
        
        session = CallSession.objects.create(
            caller=caller,
            receiver=receiver,
            call_type=call_type,
            status='ringing'
        )
        
        serializer = CallSessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name='dispatch')
class CallSessionActionAPIView(APIView):
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        session = get_object_or_404(CallSession, id=pk)
        action = request.data.get('action')
        
        if action == 'accept':
            session.status = 'active'
            session.started_at = timezone.now()
        elif action == 'reject':
            session.status = 'rejected'
            session.ended_at = timezone.now()
        elif action == 'end':
            session.status = 'ended'
            session.ended_at = timezone.now()
        else:
            return Response({"detail": "Invalid action. Use accept, reject, or end."}, status=status.HTTP_400_BAD_REQUEST)
            
        session.save()
        serializer = CallSessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_200_OK)


class InvoiceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        invoices = Invoice.objects.all().prefetch_related('items__service', 'client').order_by('-created_at')
        serializer = InvoiceSerializer(invoices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can create invoices."}, status=status.HTTP_403_FORBIDDEN)
            
        client_id = request.data.get('client')
        gst_percent = request.data.get('gst_percent', 18)
        discount_percent = request.data.get('discount_percent', 0)
        note = request.data.get('note', '')
        items_data = request.data.get('items', [])
        
        if not client_id or not items_data:
            return Response({"detail": "Client and items are required."}, status=status.HTTP_400_BAD_REQUEST)
            
        client = get_object_or_404(Client, id=client_id)
        
        project = request.data.get('project', '')
        status_val = request.data.get('status', 'Pending')
        end_date = request.data.get('end_date')
        paid_date = request.data.get('paid_date')
        
        invoice = Invoice.objects.create(
            client=client,
            project=project,
            gst_percent=float(gst_percent),
            discount_percent=float(discount_percent),
            note=note,
            status=status_val,
            due_date=due_date if due_date else None,
            paid_date=paid_date if paid_date else None
        )
        
        for item in items_data:
            service_id = item.get('service')
            amount = item.get('amount')
            disc = item.get('discount_percent', 0)
            
            service = get_object_or_404(Service, id=service_id)
            InvoiceItem.objects.create(
                invoice=invoice,
                service=service,
                amount=Decimal(amount) if amount else service.amount,
                discount_percent=float(disc) if disc else 0
            )
            
        serializer = InvoiceSerializer(invoice)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class InvoiceDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        invoice = get_object_or_404(Invoice, id=pk)
        serializer = InvoiceSerializer(invoice)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can delete invoices."}, status=status.HTTP_403_FORBIDDEN)
            
        invoice = get_object_or_404(Invoice, id=pk)
        invoice.delete()
        return Response({"detail": "Invoice deleted successfully."}, status=status.HTTP_200_OK)


class ClientServiceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        clients = Client.objects.all().order_by('name')
        services = Service.objects.all().order_by('name')
        
        return Response({
            "clients": ClientSerializer(clients, many=True).data,
            "services": ServiceSerializer(services, many=True).data
        }, status=status.HTTP_200_OK)


class ClientAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        clients = Client.objects.all().order_by('name')
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can create clients."}, status=status.HTTP_403_FORBIDDEN)
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServiceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        services = Service.objects.all().order_by('name')
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can manage services."}, status=status.HTTP_403_FORBIDDEN)
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServiceDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied."}, status=status.HTTP_403_FORBIDDEN)
        service = get_object_or_404(Service, id=pk)
        serializer = ServiceSerializer(service, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied."}, status=status.HTTP_403_FORBIDDEN)
        service = get_object_or_404(Service, id=pk)
        service.delete()
        return Response({"detail": "Service deleted successfully."}, status=status.HTTP_200_OK)


class QuestionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        language = request.query_params.get('language')
        if language:
            questions = Question.objects.filter(language=language)
        else:
            questions = Question.objects.all()
            
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can manage questions."}, status=status.HTTP_403_FORBIDDEN)
            
        language = request.data.get('language')
        question_text = request.data.get('question_text')
        option_a = request.data.get('option_a')
        option_b = request.data.get('option_b')
        option_c = request.data.get('option_c')
        option_d = request.data.get('option_d')
        correct_option = request.data.get('correct_option')
        
        if not language or not question_text or not correct_option:
            return Response({"detail": "Language, question_text, and correct_option are required."}, status=status.HTTP_400_BAD_REQUEST)
            
        q = Question.objects.create(
            language=language,
            question_text=question_text,
            option_a=option_a,
            option_b=option_b,
            option_c=option_c,
            option_d=option_d,
            correct_option=correct_option
        )
        serializer = QuestionSerializer(q)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class QuestionDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can update questions."}, status=status.HTTP_403_FORBIDDEN)
            
        q = get_object_or_404(Question, id=pk)
        
        for field in ['language', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_option']:
            if field in request.data:
                setattr(q, field, request.data[field])
                
        q.save()
        serializer = QuestionSerializer(q)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can delete questions."}, status=status.HTTP_403_FORBIDDEN)
            
        q = get_object_or_404(Question, id=pk)
        q.delete()
        return Response({"detail": "Question deleted successfully."}, status=status.HTTP_200_OK)


class ExamAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        results = Result.objects.all().select_related('exam__user').order_by('-id')
        serializer = ResultSerializer(results, many=True)
        data = list(serializer.data)

        try:
            from main.models import InternshipExamSession
            internship_sessions = InternshipExamSession.objects.filter(
                score__isnull=False
            ).select_related('registration').order_by('-submitted_at')

            for s in internship_sessions:
                cand = s.registration
                total_q = s.answers.count()
                if total_q == 0:
                    total_q = 30
                pct = round((s.score / total_q) * 100, 1) if total_q > 0 else s.score
                data.append({
                    'id': f"internship_{s.id}",
                    'exam_user_name': f"{cand.name} ({cand.registration_id})",
                    'exam_language': cand.course or 'Technical',
                    'score': pct,
                    'score_percentage': pct,
                    'correct_answers': s.score,
                    'total_questions': total_q,
                    'status': 'Passed' if (s.is_qualified or pct >= 50) else 'Failed',
                    'created_at': s.submitted_at or s.started_at
                })
        except Exception:
            pass

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        candidate_email = request.data.get('email')
        candidate_pwd = request.data.get('password')
        answers = request.data.get('answers', {})
        
        candidate = Examuser.objects.filter(email=candidate_email, password=candidate_pwd).first()
        if not candidate:
            return Response({"detail": "Invalid candidate credentials."}, status=status.HTTP_401_UNAUTHORIZED)
            
        if ExamSession.objects.filter(user=candidate, is_completed=True).exists():
            last_exam = ExamSession.objects.filter(user=candidate, is_completed=True).last()
            result = Result.objects.filter(exam=last_exam).first()
            return Response({
                "detail": "Exam already completed.",
                "score": result.score_percentage if result else 0
            }, status=status.HTTP_400_BAD_REQUEST)
            
        questions = Question.objects.filter(language=candidate.role)
        if questions.count() < 1:
            return Response({"detail": "No questions configured for this language."}, status=status.HTTP_400_BAD_REQUEST)
            
        exam = ExamSession.objects.create(
            user=candidate,
            language=candidate.role,
            is_completed=True
        )
        
        correct_count = 0
        total_questions = questions.count()
        
        for q in questions:
            selected = answers.get(str(q.id))
            if selected:
                is_correct = selected == q.correct_option
                if is_correct:
                    correct_count += 1
                UserAnswer.objects.create(
                    exam=exam,
                    question=q,
                    selected_option=selected,
                    is_correct=is_correct
                )
                
        score_percent = (correct_count / total_questions) * 100 if total_questions > 0 else 0
        
        result = Result.objects.create(
            exam=exam,
            total_questions=total_questions,
            correct_answers=correct_count,
            score_percentage=score_percent
        )
        
        return Response({
            "detail": "Exam submitted successfully.",
            "correct_answers": correct_count,
            "total_questions": total_questions,
            "score": score_percent
        }, status=status.HTTP_201_CREATED)


class CandidateExamLoginAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '').strip()

        if not email or not password:
            return Response({"detail": "Email and Access Passcode are required."}, status=status.HTTP_400_BAD_REQUEST)

        candidate = Examuser.objects.filter(email__iexact=email).first()
        if not candidate or (candidate.password and candidate.password.strip() != password):
            return Response({"detail": "Invalid candidate email or access passcode."}, status=status.HTTP_401_UNAUTHORIZED)

        # Check if candidate has already completed an exam
        last_exam = ExamSession.objects.filter(user=candidate, is_completed=True).order_by('-id').first()
        if last_exam:
            result = Result.objects.filter(exam=last_exam).first()
            score = result.score_percentage if result else 0
            return Response({
                "id": candidate.id,
                "username": candidate.username,
                "email": candidate.email,
                "role": candidate.role,
                "completed": True,
                "score": score,
                "detail": "Exam already completed for this candidate account."
            }, status=status.HTTP_200_OK)

        return Response({
            "id": candidate.id,
            "username": candidate.username,
            "email": candidate.email,
            "role": candidate.role,
            "completed": False
        }, status=status.HTTP_200_OK)


class CandidateExamQuestionsAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '').strip()

        if not email or not password:
            return Response({"detail": "Email and Access Passcode are required."}, status=status.HTTP_400_BAD_REQUEST)

        candidate = Examuser.objects.filter(email__iexact=email).first()
        if not candidate or (candidate.password and candidate.password.strip() != password):
            return Response({"detail": "Invalid candidate email or access passcode."}, status=status.HTTP_401_UNAUTHORIZED)

        questions = Question.objects.filter(language__iexact=candidate.role)
        if questions.count() == 0:
            questions = Question.objects.filter(language__icontains=candidate.role.split('_')[0])
        if questions.count() == 0:
            questions = Question.objects.all()

        questions_list = list(questions)
        if len(questions_list) == 0:
            return Response({"detail": "No questions configured in database for this subject."}, status=status.HTTP_400_BAD_REQUEST)

        import random
        seed = f"{candidate.id}_{candidate.email.lower()}"
        rnd = random.Random(seed)
        limit = min(30, len(questions_list))
        selected_questions = rnd.sample(questions_list, limit)

        data = [{
            "id": q.id,
            "question_text": q.question_text,
            "option_a": q.option_a,
            "option_b": q.option_b,
            "option_c": q.option_c,
            "option_d": q.option_d
        } for q in selected_questions]

        return Response({
            "candidate_name": candidate.username,
            "language": candidate.role,
            "total_questions": len(data),
            "questions": data
        }, status=status.HTTP_200_OK)


class CandidateExamSubmitAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '').strip()
        answers = request.data.get('answers', {})

        if not email or not password:
            return Response({"detail": "Email and Access Passcode are required."}, status=status.HTTP_400_BAD_REQUEST)

        candidate = Examuser.objects.filter(email__iexact=email).first()
        if not candidate or (candidate.password and candidate.password.strip() != password):
            return Response({"detail": "Invalid candidate email or access passcode."}, status=status.HTTP_401_UNAUTHORIZED)

        if ExamSession.objects.filter(user=candidate, is_completed=True).exists():
            last_exam = ExamSession.objects.filter(user=candidate, is_completed=True).order_by('-id').first()
            result = Result.objects.filter(exam=last_exam).first()
            return Response({
                "detail": "Exam already completed.",
                "score": result.score_percentage if result else 0
            }, status=status.HTTP_400_BAD_REQUEST)

        questions = Question.objects.filter(language__iexact=candidate.role)
        if questions.count() == 0:
            questions = Question.objects.filter(language__icontains=candidate.role.split('_')[0])
        if questions.count() == 0:
            questions = Question.objects.all()
        if questions.count() < 1:
            return Response({"detail": "No questions configured for this language."}, status=status.HTTP_400_BAD_REQUEST)

        exam = ExamSession.objects.create(
            user=candidate,
            language=candidate.role,
            is_completed=True
        )

        import random
        questions_list = list(questions)
        seed = f"{candidate.id}_{candidate.email.lower()}"
        rnd = random.Random(seed)
        limit = min(30, len(questions_list))
        assigned_questions = rnd.sample(questions_list, limit)

        correct_count = 0
        total_questions = len(assigned_questions)

        for q in assigned_questions:
            selected = answers.get(str(q.id))
            if selected:
                is_correct = (selected == q.correct_option)
                if is_correct:
                    correct_count += 1
                UserAnswer.objects.create(
                    exam=exam,
                    question=q,
                    selected_option=selected,
                    is_correct=is_correct
                )

        score_percent = (correct_count / total_questions) * 100 if total_questions > 0 else 0

        result = Result.objects.create(
            exam=exam,
            total_questions=total_questions,
            correct_answers=correct_count,
            score_percentage=score_percent
        )

        return Response({
            "detail": "Exam submitted successfully.",
            "candidate_name": candidate.username,
            "correct_answers": correct_count,
            "total_questions": total_questions,
            "score": score_percent
        }, status=status.HTTP_201_CREATED)


class RegisterAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.role not in ['HR', 'MD', 'Manager']:
            return Response({"detail": "Access Denied: Only HR, MD or Manager can create accounts."}, status=status.HTTP_403_FORBIDDEN)
            
        role = request.data.get('role')
        if role not in ['Manager', 'TeamLead', 'Employee']:
            return Response({"detail": "Invalid role type."}, status=status.HTTP_400_BAD_REQUEST)
            
        username = request.data.get('fullname')
        email = request.data.get('email')
        phone = request.data.get('phone', '')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')
        gender = request.data.get('gender', 'Male')
        date_of_birth = request.data.get('date_of_birth') or None
        date_of_joining = request.data.get('date_of_joining') or None
        emp_status = request.data.get('status', 'Fresher')
        address = request.data.get('address', '')
        salary = request.data.get('salary')
        if salary == '' or salary is None:
            salary = 0
            
        department = request.data.get('department', '')
        team_name = request.data.get('team_name', '')
        
        experience_years = request.data.get('experience_years')
        if experience_years == '' or experience_years is None:
            experience_years = 0
            
        previous_company = request.data.get('previous_company') or None
        
        if password != confirm_password:
            return Response({"detail": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)
            
        if User.objects.filter(email=email).exists():
            return Response({"detail": "Email already registered."}, status=status.HTTP_400_BAD_REQUEST)
            
        new_user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=username,
            phone=phone,
            gender=gender,
            date_of_birth=date_of_birth,
            date_of_joining=date_of_joining,
            status=emp_status,
            experience_years=experience_years,
            previous_company=previous_company,
            address=address,
            salary=salary,
            department=department,
            team_name=team_name,
            role=role
        )
        
        if 'profile_pic' in request.FILES:
            new_user.profile_pic = request.FILES['profile_pic']
        if 'document' in request.FILES:
            new_user.document = request.FILES['document']
            
        new_user.save()
        serializer = UserSerializer(new_user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# ==================== UNIFIED CHAT REST API VIEWS ====================

import json as _json
from datetime import timedelta as _td


class AllUsersAPIView(APIView):
    """GET /api/users/ — returns all active users (excluding self) for DM list."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from django.utils import timezone as _tz
        from .models import UserPresence, ChatMessage
        from django.db.models import Q as _Q

        now = _tz.now()
        all_presences = {p.user_id: p for p in UserPresence.objects.select_related('user').all()}

        def get_status(u):
            p = all_presences.get(u.id)
            if not p:
                return 'Offline'
            if now - p.last_activity > _td(minutes=5):
                return 'Offline'
            return p.status

        users = User.objects.filter(is_active=True).exclude(id=request.user.id).order_by('first_name', 'username')

        result = []
        for u in users:
            unread = ChatMessage.objects.filter(
                sender=u, receiver=request.user, is_read=False
            ).exclude(deleted_for=request.user).count()

            last_msg = ChatMessage.objects.filter(
                _Q(sender=request.user, receiver=u) | _Q(sender=u, receiver=request.user)
            ).order_by('-id').first()

            # Build profile pic URL: use serializer with request context for absolute URL
            u_data = UserSerializer(u, context={'request': request}).data
            profile_pic_url = u_data.get('profile_pic_url')

            result.append({
                'id': u.id,
                'name': u.get_full_name() or u.username,
                'username': u.username,
                'role': u.role,
                'emp_id': u.emp_id,
                'department': u.department,
                'department_display': u_data.get('department_display'),
                'profile_pic': profile_pic_url,
                'status': get_status(u),
                'unread': unread,
                'last_msg_text': last_msg.text if last_msg else '',
                'last_msg_time': last_msg.created_at.isoformat() if last_msg else None,
            })

        # Sort by last message time descending, then alphabetically
        result.sort(key=lambda x: (x['last_msg_time'] or '0000'), reverse=True)
        return Response(result, status=status.HTTP_200_OK)



class ChatHistoryAPIView(APIView):
    """GET /api/chat-history/?user_id=X or ?room_id=X&last_id=N"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from django.utils.timezone import localtime
        from .models import ChatRoom, GroupMessage, ChatMessage, UserPresence
        from django.db.models import Q as _Q

        room_id = request.query_params.get('room_id')
        user_id = request.query_params.get('user_id')
        last_id = request.query_params.get('last_id', 0)
        try:
            last_id = int(last_id)
        except (TypeError, ValueError):
            last_id = 0

        now_ts = request.build_absolute_uri('/').rstrip('/')
        base_url = now_ts

        def make_avatar(u):
            if u.profile_pic and u.profile_pic.name:
                try:
                    return base_url + u.profile_pic.url
                except Exception:
                    return None
            return None

        messages_data = []

        if room_id:
            room = get_object_or_404(ChatRoom, id=room_id)
            if room.room_type == 'team' and not room.users.filter(id=request.user.id).exists():
                return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)

            qs = GroupMessage.objects.filter(room=room).select_related('sender', 'reply_to', 'reply_to__sender')
            if last_id:
                qs = qs.filter(id__gt=last_id)
            qs = qs.order_by('id')

            for msg in qs:
                reactions_dict = msg.reactions or {}
                reactions_out = {}
                for emoji, uids in reactions_dict.items():
                    if isinstance(uids, list):
                        names = list(User.objects.filter(id__in=uids).values_list('username', flat=True))
                        reactions_out[emoji] = {'users': uids, 'usernames': names}

                reply_info = None
                if msg.reply_to:
                    reply_info = {
                        'id': msg.reply_to.id,
                        'sender_name': msg.reply_to.sender.get_full_name() or msg.reply_to.sender.username,
                        'text_preview': msg.reply_to.text[:60] if msg.reply_to.text else ('Attachment' if msg.reply_to.file else 'Message'),
                    }

                file_url = None
                file_name = None
                if msg.file and msg.file.name:
                    try:
                        file_url = base_url + msg.file.url
                        file_name = msg.file.name.split('/')[-1]
                    except Exception:
                        pass

                messages_data.append({
                    'id': msg.id,
                    'is_group': True,
                    'sender_id': msg.sender.id,
                    'sender_name': msg.sender.get_full_name() or msg.sender.username,
                    'sender_avatar': make_avatar(msg.sender),
                    'sender_role': msg.sender.role,
                    'text': msg.text,
                    'file_url': file_url,
                    'file_name': file_name,
                    'created_at': localtime(msg.created_at).strftime('%d %b %H:%M'),
                    'created_at_iso': msg.created_at.isoformat(),
                    'edited': msg.edited,
                    'reactions': reactions_out,
                    'is_deleted': msg.is_deleted,
                    'reply_to': reply_info,
                })

        elif user_id:
            target = get_object_or_404(User, id=user_id)

            # Mark as read
            ChatMessage.objects.filter(
                sender=target, receiver=request.user, is_read=False
            ).update(is_read=True, is_delivered=True)

            qs = ChatMessage.objects.filter(
                _Q(sender=request.user, receiver=target) | _Q(sender=target, receiver=request.user)
            ).select_related('sender', 'reply_to', 'reply_to__sender')
            if last_id:
                qs = qs.filter(id__gt=last_id)
            qs = qs.order_by('id')

            for msg in qs:
                if request.user in msg.deleted_for.all():
                    continue

                reactions_dict = msg.reactions or {}
                reactions_out = {}
                for emoji, uids in reactions_dict.items():
                    if isinstance(uids, list):
                        names = list(User.objects.filter(id__in=uids).values_list('username', flat=True))
                        reactions_out[emoji] = {'users': uids, 'usernames': names}

                reply_info = None
                if msg.reply_to:
                    reply_info = {
                        'id': msg.reply_to.id,
                        'sender_name': msg.reply_to.sender.get_full_name() or msg.reply_to.sender.username,
                        'text_preview': msg.reply_to.text[:60] if msg.reply_to.text else ('Attachment' if msg.reply_to.file else 'Message'),
                    }

                file_url = None
                file_name = None
                if msg.file and msg.file.name:
                    try:
                        file_url = base_url + msg.file.url
                        file_name = msg.file.name.split('/')[-1]
                    except Exception:
                        pass

                messages_data.append({
                    'id': msg.id,
                    'is_group': False,
                    'sender_id': msg.sender.id,
                    'sender_name': msg.sender.get_full_name() or msg.sender.username,
                    'sender_avatar': make_avatar(msg.sender),
                    'sender_role': msg.sender.role,
                    'text': msg.text,
                    'file_url': file_url,
                    'file_name': file_name,
                    'created_at': localtime(msg.created_at).strftime('%d %b %H:%M'),
                    'created_at_iso': msg.created_at.isoformat(),
                    'edited': msg.edited,
                    'reactions': reactions_out,
                    'is_deleted': msg.deleted_for_everyone,
                    'reply_to': reply_info,
                    'is_read': msg.is_read,
                    'is_delivered': msg.is_delivered,
                })

        else:
            return Response({'detail': 'Provide user_id or room_id.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'messages': messages_data}, status=status.HTTP_200_OK)


class SendChatMessageAPIView(APIView):
    """POST /api/send-message/ — send DM or group message with optional file/reply."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from django.utils.timezone import localtime
        from .models import ChatRoom, GroupMessage, ChatMessage

        room_id = request.data.get('room_id')
        receiver_id = request.data.get('receiver_id')
        text = request.data.get('text', '')
        reply_to_id = request.data.get('reply_to_id')
        file = request.FILES.get('file')
        base_url = request.build_absolute_uri('/').rstrip('/')

        reply_to = None
        if reply_to_id:
            try:
                if room_id:
                    reply_to = GroupMessage.objects.get(id=reply_to_id)
                else:
                    reply_to = ChatMessage.objects.get(id=reply_to_id)
            except Exception:
                pass

        if room_id:
            room = get_object_or_404(ChatRoom, id=room_id)
            if room.is_announcement_only and request.user.role not in ['MD', 'HR']:
                return Response({'detail': 'Only MD and HR can post in announcements.'}, status=status.HTTP_403_FORBIDDEN)

            msg = GroupMessage.objects.create(
                room=room, sender=request.user, text=text, reply_to=reply_to
            )
            if file:
                msg.file = file
                msg.save()

            file_url = (base_url + msg.file.url) if (msg.file and msg.file.name) else None
            file_name = msg.file.name.split('/')[-1] if (msg.file and msg.file.name) else None

            return Response({
                'id': msg.id,
                'is_group': True,
                'sender_id': msg.sender.id,
                'sender_name': msg.sender.get_full_name() or msg.sender.username,
                'text': msg.text,
                'file_url': file_url,
                'file_name': file_name,
                'created_at': localtime(msg.created_at).strftime('%d %b %H:%M'),
                'created_at_iso': msg.created_at.isoformat(),
                'edited': False,
                'reactions': {},
                'is_deleted': False,
            }, status=status.HTTP_201_CREATED)

        elif receiver_id:
            receiver = get_object_or_404(User, id=receiver_id)
            msg = ChatMessage.objects.create(
                sender=request.user, receiver=receiver, text=text, reply_to=reply_to
            )
            if file:
                msg.file = file
                msg.save()

            file_url = (base_url + msg.file.url) if (msg.file and msg.file.name) else None
            file_name = msg.file.name.split('/')[-1] if (msg.file and msg.file.name) else None

            return Response({
                'id': msg.id,
                'is_group': False,
                'sender_id': msg.sender.id,
                'sender_name': msg.sender.get_full_name() or msg.sender.username,
                'text': msg.text,
                'file_url': file_url,
                'file_name': file_name,
                'created_at': localtime(msg.created_at).strftime('%d %b %H:%M'),
                'created_at_iso': msg.created_at.isoformat(),
                'edited': False,
                'reactions': {},
                'is_deleted': False,
                'is_read': False,
                'is_delivered': False,
            }, status=status.HTTP_201_CREATED)

        return Response({'detail': 'Provide receiver_id or room_id.'}, status=status.HTTP_400_BAD_REQUEST)


class ToggleReactionAPIView(APIView):
    """POST /api/toggle-reaction/ — add or remove an emoji reaction."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from .models import ChatRoom, GroupMessage, ChatMessage

        message_id = request.data.get('message_id')
        is_group = str(request.data.get('is_group', 'false')).lower() == 'true'
        emoji = request.data.get('emoji')

        if not message_id or not emoji:
            return Response({'detail': 'message_id and emoji required.'}, status=status.HTTP_400_BAD_REQUEST)

        if is_group:
            msg = get_object_or_404(GroupMessage, id=message_id)
        else:
            msg = get_object_or_404(ChatMessage, id=message_id)

        reactions = msg.reactions or {}
        user_id = request.user.id

        if emoji in reactions:
            uids = reactions[emoji] if isinstance(reactions[emoji], list) else []
            if user_id in uids:
                uids.remove(user_id)
                if not uids:
                    del reactions[emoji]
                else:
                    reactions[emoji] = uids
            else:
                uids.append(user_id)
                reactions[emoji] = uids
        else:
            reactions[emoji] = [user_id]

        msg.reactions = reactions
        msg.save()

        reactions_out = {}
        for emo, uids in reactions.items():
            if isinstance(uids, list):
                names = list(User.objects.filter(id__in=uids).values_list('username', flat=True))
                reactions_out[emo] = {'users': uids, 'usernames': names}

        return Response({'reactions': reactions_out}, status=status.HTTP_200_OK)


class EditChatMessageAPIView(APIView):
    """POST /api/edit-message/ — edit own message within 10 minutes."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from django.utils import timezone as _tz
        from .models import GroupMessage, ChatMessage

        message_id = request.data.get('message_id')
        is_group = str(request.data.get('is_group', 'false')).lower() == 'true'
        new_text = str(request.data.get('text', '')).strip()

        if not message_id or not new_text:
            return Response({'detail': 'message_id and text required.'}, status=status.HTTP_400_BAD_REQUEST)

        if is_group:
            msg = get_object_or_404(GroupMessage, id=message_id)
        else:
            msg = get_object_or_404(ChatMessage, id=message_id)

        if msg.sender != request.user:
            return Response({'detail': 'Forbidden: not the sender.'}, status=status.HTTP_403_FORBIDDEN)

        if (_tz.now() - msg.created_at).total_seconds() > 600:
            return Response({'detail': 'Cannot edit: 10-minute limit exceeded.'}, status=status.HTTP_400_BAD_REQUEST)

        msg.text = new_text
        msg.edited = True
        msg.save()

        return Response({'text': msg.text, 'edited': True}, status=status.HTTP_200_OK)


class DeleteChatMessageAPIView(APIView):
    """POST /api/delete-message/ — delete for me or for everyone."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from .models import GroupMessage, ChatMessage

        message_id = request.data.get('message_id')
        is_group = str(request.data.get('is_group', 'false')).lower() == 'true'
        mode = request.data.get('mode', 'everyone')  # 'everyone' or 'me'

        if not message_id:
            return Response({'detail': 'message_id required.'}, status=status.HTTP_400_BAD_REQUEST)

        if is_group:
            msg = get_object_or_404(GroupMessage, id=message_id)
            if msg.sender != request.user:
                return Response({'detail': 'Forbidden.'}, status=status.HTTP_403_FORBIDDEN)
            msg.is_deleted = True
            msg.deleted_by = request.user
            msg.text = ''
            msg.file = None
            msg.save()
        else:
            msg = get_object_or_404(ChatMessage, id=message_id)
            if mode == 'everyone':
                if msg.sender != request.user:
                    return Response({'detail': 'Forbidden.'}, status=status.HTTP_403_FORBIDDEN)
                msg.deleted_for_everyone = True
                msg.deleted_by_user = request.user
                msg.text = ''
                msg.file = None
                msg.save()
            else:
                msg.deleted_for.add(request.user)

        return Response({'status': 'deleted'}, status=status.HTTP_200_OK)


class PresenceAPIView(APIView):
    """POST /api/presence/ — update online status and typing indicator."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from .models import UserPresence

        pstatus = request.data.get('status', 'Online')
        valid = ['Online', 'Offline', 'Away', 'Busy', 'In Meeting', 'Working From Home']
        if pstatus not in valid:
            pstatus = 'Online'

        presence, _ = UserPresence.objects.get_or_create(user=request.user)
        presence.status = pstatus
        presence.save()

        return Response({'status': 'ok'}, status=status.HTTP_200_OK)

    def get(self, request):
        """GET /api/presence/?user_ids=1,2,3 — get presence for multiple users."""
        from django.utils import timezone as _tz
        from .models import UserPresence

        user_ids_str = request.query_params.get('user_ids', '')
        try:
            user_ids = [int(x) for x in user_ids_str.split(',') if x.strip()]
        except ValueError:
            user_ids = []

        now = _tz.now()
        result = {}
        presences = UserPresence.objects.filter(user_id__in=user_ids)
        presence_map = {p.user_id: p for p in presences}

        for uid in user_ids:
            p = presence_map.get(uid)
            if not p or (now - p.last_activity) > _td(minutes=5):
                result[str(uid)] = 'Offline'
            else:
                result[str(uid)] = p.status

        return Response(result, status=status.HTTP_200_OK)


class CreateTeamGroupAPIView(APIView):
    """POST /api/create-team/ — create a team group chat room."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from .models import ChatRoom

        if request.user.role not in ['MD', 'HR', 'Manager', 'TeamLead']:
            return Response({'detail': 'Forbidden: not authorized.'}, status=status.HTTP_403_FORBIDDEN)

        name = str(request.data.get('name', '')).strip()
        description = str(request.data.get('description', '')).strip()
        user_ids = request.data.get('users', [])

        if not name:
            return Response({'detail': 'Room name is required.'}, status=status.HTTP_400_BAD_REQUEST)

        room = ChatRoom.objects.create(
            name=name,
            room_type='team',
            description=description,
            created_by=request.user
        )
        room.users.add(request.user)
        room.admins.add(request.user)

        for uid in user_ids:
            try:
                u = User.objects.get(id=int(uid))
                room.users.add(u)
            except Exception:
                continue

        return Response({'id': room.id, 'name': room.name, 'description': room.description}, status=status.HTTP_201_CREATED)


class ForwardMessageAPIView(APIView):
    """POST /api/forward-message/ — forward messages to selected users."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from .models import ChatMessage

        msg_ids = request.data.get('msg_ids', [])
        receiver_ids = request.data.get('receiver_ids', [])

        if not msg_ids or not receiver_ids:
            return Response({'detail': 'msg_ids and receiver_ids required.'}, status=status.HTTP_400_BAD_REQUEST)

        count = 0
        for receiver_id in receiver_ids:
            try:
                receiver = User.objects.get(id=int(receiver_id))
            except (User.DoesNotExist, ValueError):
                continue
            for msg_id in msg_ids:
                try:
                    original = ChatMessage.objects.get(id=int(msg_id))
                    ChatMessage.objects.create(
                        sender=request.user,
                        receiver=receiver,
                        text=original.text,
                    )
                    count += 1
                except ChatMessage.DoesNotExist:
                    continue

        return Response({'forwarded': count}, status=status.HTTP_200_OK)


class AllChatRoomsAPIView(APIView):
    """GET /api/all-chatrooms/ — returns channels and team rooms with metadata."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from .models import ChatRoom, GroupMessage
        from django.utils.timezone import localtime

        if request.user.role == 'Client':
            channels = ChatRoom.objects.none()
        else:
            channels = ChatRoom.objects.filter(room_type='channel')

        teams = ChatRoom.objects.filter(room_type='team', users=request.user)

        # Parse last_read_ids param: "roomId:msgId,roomId:msgId"
        last_read_ids = {}
        raw_lri = request.query_params.get('last_read_ids', '')
        for part in raw_lri.split(','):
            part = part.strip()
            if ':' in part:
                rid, mid = part.split(':', 1)
                try:
                    last_read_ids[int(rid)] = int(mid)
                except ValueError:
                    pass

        def room_data(room):
            last_msg = GroupMessage.objects.filter(room=room, is_deleted=False).order_by('-id').first()
            last_read_msg_id = last_read_ids.get(room.id, 0)
            unread = GroupMessage.objects.filter(
                room=room, is_deleted=False, id__gt=last_read_msg_id
            ).exclude(sender=request.user).count()
            return {
                'id': room.id,
                'name': room.name,
                'room_type': room.room_type,
                'description': room.description or '',
                'is_announcement_only': room.is_announcement_only,
                'last_msg_text': last_msg.text[:60] if last_msg else '',
                'last_msg_time': last_msg.created_at.isoformat() if last_msg else None,
                'last_msg_id': last_msg.id if last_msg else 0,
                'unread': unread,
            }

        return Response({
            'channels': [room_data(r) for r in channels],
            'teams': [room_data(r) for r in teams],
        }, status=status.HTTP_200_OK)


class AllUsersAPIView(APIView):
    """GET /api/users/ — returns all users with presence, unread DM count, avatar.
    Optional ?scope=directory allows HR/MD/Managers to view employees with ?status=all|active|inactive.
    POST /api/users/ — allows HR/MD to onboard new employees with duplicate validation.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from django.utils import timezone as _tz
        from .models import UserPresence, ChatMessage, Team
        from django.db.models import Q as _Q

        now = _tz.now()
        base_url = request.build_absolute_uri('/').rstrip('/')

        scope = request.query_params.get('scope', '')
        if scope in ['directory', 'all']:
            if request.user.role not in ['HR', 'MD', 'Manager', 'TeamLead', 'Employee']:
                return Response({"detail": "Access Denied: Unauthorized to view user directory."}, status=status.HTTP_403_FORBIDDEN)
            
            status_filter = request.query_params.get('status', 'active')
            if request.user.role in ['HR', 'MD']:
                if status_filter == 'all':
                    users = User.objects.all().order_by('emp_id')
                elif status_filter == 'inactive':
                    users = User.objects.filter(is_active=False).order_by('emp_id')
                else:
                    users = User.objects.filter(is_active=True).order_by('emp_id')
            else:
                users = User.objects.filter(is_active=True).order_by('emp_id')
            
            if request.user.role == 'TeamLead' and scope != 'all':
                from .models import Team
                member_ids = Team.objects.filter(lead=request.user, is_active=True).values_list('members__id', flat=True).distinct()
                users = users.filter(id__in=member_ids)
                
            serializer = UserSerializer(users, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)

        users_qs = User.objects.filter(is_active=True).exclude(id=request.user.id).order_by('first_name', 'username')

        if request.user.role == 'Client':
            from .models import Project
            try:
                client_record = request.user.client_profile
                projects = Project.objects.filter(client=client_record)
                allowed_user_ids = set()
                for project in projects:
                    if project.assigned_manager:
                        allowed_user_ids.add(project.assigned_manager.id)
                    for team in project.assigned_teams.all():
                        if team.lead:
                            allowed_user_ids.add(team.lead.id)
                        allowed_user_ids.update(team.members.values_list('id', flat=True))
                users_qs = users_qs.filter(id__in=allowed_user_ids)
            except Exception:
                users_qs = users_qs.none()

        if scope == 'team':
            if request.user.role == 'TeamLead':
                member_ids = Team.objects.filter(lead=request.user, is_active=True).values_list('members__id', flat=True).distinct()
                users_qs = users_qs.filter(id__in=member_ids)
            elif request.user.role == 'Manager':
                users_qs = users_qs.filter(role='TeamLead')

        presence_map = {p.user_id: p for p in UserPresence.objects.all()}

        def get_status(u):
            p = presence_map.get(u.id)
            if not p:
                return 'Offline'
            if (now - p.last_activity).total_seconds() > 300:
                return 'Offline'
            return p.status

        result = []
        for u in users_qs:
            avatar = None
            if u.profile_pic and u.profile_pic.name:
                try:
                    avatar = base_url + u.profile_pic.url
                except Exception:
                    pass

            unread = 0
            last_msg_text = ''
            last_msg_time = None
            if scope != 'team':
                unread = ChatMessage.objects.filter(
                    sender=u, receiver=request.user, is_read=False
                ).exclude(deleted_for=request.user).count()

                last_msg = ChatMessage.objects.filter(
                    _Q(sender=request.user, receiver=u) | _Q(sender=u, receiver=request.user)
                ).order_by('-id').first()
                if last_msg:
                    last_msg_text = last_msg.text or ''
                    last_msg_time = last_msg.created_at.isoformat()

            dept_display = ''
            if u.department:
                dept_display = dict(u.DEPARTMENT).get(u.department, u.department)

            result.append({
                'id': u.id,
                'username': u.username,
                'name': u.get_full_name() or u.username,
                'first_name': u.first_name,
                'last_name': u.last_name,
                'role': u.role,
                'department': dept_display,
                'profile_pic': avatar,
                'status': get_status(u),
                'emp_id': u.emp_id or '',
                'unread': unread,
                'last_msg_text': last_msg_text,
                'last_msg_time': last_msg_time,
            })

        if scope != 'team':
            result.sort(key=lambda x: (x['last_msg_time'] or '0000'), reverse=True)

        return Response(result, status=status.HTTP_200_OK)

    def post(self, request):
        """HR/MD onboarding endpoint for new employees with validation against duplicate records."""
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can add employees."}, status=status.HTTP_403_FORBIDDEN)

        fullname = (request.data.get('fullname') or '').strip()
        email = (request.data.get('email') or '').strip().lower()
        emp_id = (request.data.get('emp_id') or '').strip()
        phone = (request.data.get('phone') or '').strip()
        role = request.data.get('role', 'Employee')
        department = request.data.get('department', '')
        designation = (request.data.get('designation') or '').strip()
        date_of_joining = request.data.get('date_of_joining') or None
        date_of_birth = request.data.get('date_of_birth') or None
        gender = request.data.get('gender', 'Male')
        emp_status = request.data.get('status', 'Fresher')
        salary = request.data.get('salary') or 0
        address = (request.data.get('address') or '').strip()
        reporting_manager_id = request.data.get('reporting_manager') or None
        password = request.data.get('password') or 'Welcome@123'

        if not email:
            return Response({"detail": "Email address is required."}, status=status.HTTP_400_BAD_REQUEST)
        if not fullname:
            return Response({"detail": "Full name is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Duplicate email check
        if User.objects.filter(email=email).exists() or User.objects.filter(username=email).exists():
            return Response({"detail": f"An employee with email '{email}' already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Duplicate emp_id check if provided
        if emp_id and User.objects.filter(emp_id=emp_id).exists():
            return Response({"detail": f"Employee ID '{emp_id}' is already assigned to another employee."}, status=status.HTTP_400_BAD_REQUEST)

        # Duplicate phone check if provided
        if phone and User.objects.filter(phone=phone).exists():
            return Response({"detail": f"Phone number '{phone}' is already registered with another account."}, status=status.HTTP_400_BAD_REQUEST)

        # Reporting manager validation
        reporting_manager = None
        if reporting_manager_id:
            try:
                reporting_manager = User.objects.get(id=reporting_manager_id)
            except User.DoesNotExist:
                pass

        name_parts = fullname.split(' ', 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ''

        new_user = User(
            username=email,
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=role,
            department=department,
            designation=designation,
            date_of_joining=date_of_joining,
            date_of_birth=date_of_birth,
            gender=gender,
            status=emp_status,
            salary=salary,
            address=address,
            phone=phone,
            reporting_manager=reporting_manager,
            is_active=True,
        )
        if emp_id:
            new_user.emp_id = emp_id
        new_user.set_password(password)
        new_user.save()

        # Initialize salary structure
        try:
            from decimal import Decimal
            num_salary = Decimal(str(salary or 0))
            if num_salary > 0:
                basic = round(num_salary * Decimal('0.50'), 2)
                hra = round(num_salary * Decimal('0.30'), 2)
                special = max(num_salary - basic - hra, Decimal('0.00'))
                SalaryStructure.objects.create(
                    employee=new_user,
                    monthly_gross=num_salary,
                    basic_salary=basic,
                    hra=hra,
                    special_allowance=special,
                    pf_enabled=True,
                    pf_rate=Decimal('12.00'),
                    pf_amount=round(basic * Decimal('0.12'), 2),
                    esi_enabled=True,
                    esi_rate=Decimal('0.75'),
                    esi_amount=round(num_salary * Decimal('0.0075'), 2),
                    pt_enabled=True,
                    pt_amount=Decimal('200.00'),
                )
        except Exception as e:
            logger.warning(f"Failed to auto-create salary structure for {new_user.username}: {e}")

        # Audit log
        PayrollAuditLog.objects.create(
            performed_by=request.user,
            action='EMPLOYEE_UPDATE',
            details=f"Onboarded new employee {new_user.get_full_name()} ({new_user.emp_id}, {new_user.email}) as {new_user.role}",
            ip_address=request.META.get('REMOTE_ADDR')
        )

        serializer = UserSerializer(new_user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        """GET /api/users/<pk>/ — returns employee profile details."""
        user_obj = get_object_or_404(User, pk=pk)
        if request.user.role not in ['HR', 'MD', 'Manager', 'TeamLead'] and request.user.id != user_obj.id:
            return Response({"detail": "Access Denied: Unauthorized to view employee profile."}, status=status.HTTP_403_FORBIDDEN)
        serializer = UserSerializer(user_obj, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can update employee details."}, status=status.HTTP_403_FORBIDDEN)
            
        user_to_edit = get_object_or_404(User, pk=pk)
        
        fullname = request.data.get('fullname')
        email = request.data.get('email')
        phone = request.data.get('phone')
        gender = request.data.get('gender')
        date_of_birth = request.data.get('date_of_birth') or None
        date_of_joining = request.data.get('date_of_joining') or None
        emp_status = request.data.get('status')
        address = request.data.get('address')
        salary = request.data.get('salary')
        department = request.data.get('department')
        team_name = request.data.get('team_name')
        experience_years = request.data.get('experience_years') or None
        role = request.data.get('role')
        designation = request.data.get('designation')
        emp_id = request.data.get('emp_id')
        reporting_manager_id = request.data.get('reporting_manager')
        is_active = request.data.get('is_active')
        
        if fullname:
            parts = fullname.strip().split(' ', 1)
            user_to_edit.first_name = parts[0]
            user_to_edit.last_name = parts[1] if len(parts) > 1 else ''
        if email:
            email_clean = email.strip().lower()
            if User.objects.filter(email=email_clean).exclude(id=pk).exists():
                return Response({"detail": "Email already in use by another user."}, status=status.HTTP_400_BAD_REQUEST)
            user_to_edit.username = email_clean
            user_to_edit.email = email_clean
        if emp_id:
            emp_id_clean = emp_id.strip()
            if User.objects.filter(emp_id=emp_id_clean).exclude(id=pk).exists():
                return Response({"detail": f"Employee ID '{emp_id_clean}' already assigned to another employee."}, status=status.HTTP_400_BAD_REQUEST)
            user_to_edit.emp_id = emp_id_clean
        if phone is not None:
            user_to_edit.phone = phone
        if gender:
            user_to_edit.gender = gender
        if date_of_birth:
            user_to_edit.date_of_birth = date_of_birth
        if date_of_joining:
            user_to_edit.date_of_joining = date_of_joining
        if emp_status:
            user_to_edit.status = emp_status
        if address is not None:
            user_to_edit.address = address
        if salary is not None:
            user_to_edit.salary = salary
        if department is not None:
            user_to_edit.department = department
        if team_name is not None:
            user_to_edit.team_name = team_name
        if experience_years:
            user_to_edit.experience_years = experience_years
        if role:
            user_to_edit.role = role
        if designation is not None:
            user_to_edit.designation = designation
        if is_active is not None:
            user_to_edit.is_active = (is_active is True or is_active == 'true' or is_active == 1 or is_active == '1')
        if reporting_manager_id is not None:
            if reporting_manager_id == '' or reporting_manager_id == 0 or reporting_manager_id == '0':
                user_to_edit.reporting_manager = None
            else:
                try:
                    user_to_edit.reporting_manager = User.objects.get(id=reporting_manager_id)
                except User.DoesNotExist:
                    pass
            
        user_to_edit.save()

        # Audit log
        PayrollAuditLog.objects.create(
            performed_by=request.user,
            action='EMPLOYEE_UPDATE',
            details=f"Updated employee record: {user_to_edit.get_full_name()} ({user_to_edit.emp_id}), Active: {user_to_edit.is_active}",
            ip_address=request.META.get('REMOTE_ADDR')
        )

        serializer = UserSerializer(user_to_edit, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can delete employees."}, status=status.HTTP_403_FORBIDDEN)
            
        user_to_delete = get_object_or_404(User, pk=pk)
        if user_to_delete.id == request.user.id:
            return Response({"detail": "You cannot delete your own account."}, status=status.HTTP_400_BAD_REQUEST)
            
        username = user_to_delete.username
        emp_id = user_to_delete.emp_id
        user_to_delete.delete()

        PayrollAuditLog.objects.create(
            performed_by=request.user,
            action='EMPLOYEE_UPDATE',
            details=f"Deleted employee account: {username} ({emp_id})",
            ip_address=request.META.get('REMOTE_ADDR')
        )
        return Response({"detail": "Employee deleted successfully."}, status=status.HTTP_200_OK)


class ExamLanguagesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from .models import SELECT_TYPE
        data = [{"value": key, "label": val} for key, val in SELECT_TYPE]
        return Response(data, status=status.HTTP_200_OK)


class ExamUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can view candidate users."}, status=status.HTTP_403_FORBIDDEN)
        candidates = Examuser.objects.all().order_by('-id')
        data = [{
            "id": c.id,
            "username": c.username,
            "email": c.email,
            "phone_no": c.phone_no,
            "role": c.role,
            "password": c.password
        } for c in candidates]
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can create candidate users."}, status=status.HTTP_403_FORBIDDEN)
        username = request.data.get('username')
        email = request.data.get('email')
        phone_no = request.data.get('phone_no', '')
        language = request.data.get('language')
        password = request.data.get('password')

        if not username or not email or not language or not password:
            return Response({"detail": "Username, email, language, and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        if Examuser.objects.filter(email=email).exists():
            return Response({"detail": "Candidate with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        cand = Examuser.objects.create(
            username=username,
            email=email,
            phone_no=phone_no,
            role=language,
            password=password
        )
        return Response({
            "id": cand.id,
            "username": cand.username,
            "email": cand.email,
            "role": cand.role
        }, status=status.HTTP_201_CREATED)




class ClientDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != 'Client':
            return Response({'detail': 'Access Denied: Not a Client.'}, status=status.HTTP_403_FORBIDDEN)
            
        try:
            client_record = user.client_profile
        except Exception:
            return Response({'detail': 'Client profile not found.'}, status=status.HTTP_404_NOT_FOUND)
            
        projects_qs = Project.objects.filter(client=client_record)
        projects_data = []
        
        for project in projects_qs:
            total_tasks = project.tasks.count()
            completed_tasks = project.tasks.filter(status='Completed').count()
            progress = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
            
            teams = []
            for team in project.assigned_teams.all():
                team_data = {
                    'name': team.name,
                    'lead': team.lead.get_full_name() or team.lead.username if team.lead else None,
                    'lead_id': team.lead.id if team.lead else None,
                    'members': [{'id': m.id, 'name': m.get_full_name() or m.username} for m in team.members.all()]
                }
                teams.append(team_data)

            # Build per-employee work breakdown for this project
            employee_ids_with_tasks = (
                project.tasks.filter(assigned_to__isnull=False)
                .values_list('assigned_to', flat=True)
                .distinct()
            )
            
            employee_work = []
            for emp_id in employee_ids_with_tasks:
                try:
                    emp = User.objects.get(id=emp_id)
                except User.DoesNotExist:
                    continue
                
                emp_tasks = project.tasks.filter(assigned_to=emp)
                total_emp = emp_tasks.count()
                completed_emp = emp_tasks.filter(status='Completed').count()
                in_progress_emp = emp_tasks.filter(status='In Progress').count()
                submitted_emp = emp_tasks.filter(status='Submitted').count()
                pending_emp = emp_tasks.filter(status='Pending').count()
                completion_pct = round(completed_emp / total_emp * 100) if total_emp > 0 else 0

                # Per-task detail for client review panel
                task_list = []
                for t in emp_tasks.order_by('-end_date'):
                    file_url = None
                    if t.file and t.file.name:
                        try:
                            file_url = request.build_absolute_uri(t.file.url)
                        except Exception:
                            pass

                    client_review_data = {'status': None, 'feedback': None, 'client_document_url': None}
                    try:
                        cr = t.client_review
                        cr_doc_url = None
                        if cr.client_document and cr.client_document.name:
                            try:
                                cr_doc_url = request.build_absolute_uri(cr.client_document.url)
                            except Exception:
                                pass
                        client_review_data = {
                            'status': cr.status,
                            'feedback': cr.feedback,
                            'client_document_url': cr_doc_url,
                            'reviewed_at': str(cr.reviewed_at) if cr.reviewed_at else None,
                        }
                    except ClientTaskReview.DoesNotExist:
                        pass

                    task_list.append({
                        'id': t.id,
                        'task_name': t.task_name,
                        'status': t.status,
                        'priority': t.priority,
                        'start_date': str(t.start_date) if t.start_date else None,
                        'end_date': str(t.end_date) if t.end_date else None,
                        'file_url': file_url,
                        'client_review': client_review_data,
                    })
                
                employee_work.append({
                    'id': emp.id,
                    'name': emp.get_full_name() or emp.username,
                    'role': emp.role,
                    'emp_id': emp.emp_id or '',
                    'total_tasks': total_emp,
                    'completed': completed_emp,
                    'in_progress': in_progress_emp,
                    'submitted': submitted_emp,
                    'pending': pending_emp,
                    'completion_pct': completion_pct,
                    'tasks': task_list,
                })
                
            projects_data.append({
                'id': project.id,
                'project_code': project.project_code,
                'name': project.name,
                'status': project.status,
                'progress': round(progress),
                'total_tasks': total_tasks,
                'completed_tasks': completed_tasks,
                'pending_tasks': total_tasks - completed_tasks,
                'manager': project.assigned_manager.get_full_name() or project.assigned_manager.username if project.assigned_manager else None,
                'manager_id': project.assigned_manager.id if project.assigned_manager else None,
                'teams': teams,
                'startdate': str(project.startdate) if project.startdate else None,
                'deadline': str(project.deadline) if project.deadline else None,
                'employee_work': employee_work,
            })
            
        return Response({
            'client': {
                'name': client_record.name,
                'business_name': client_record.business_name,
            },
            'projects': projects_data
        }, status=status.HTTP_200_OK)


class VerifyUserDocumentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access denied. Only HR and MD can verify documents."}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            target_user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        target_user.is_document_verified = True
        target_user.save(update_fields=['is_document_verified'])

        return Response({
            "detail": f"Document for {target_user.get_full_name() or target_user.username} verified successfully.",
            "user_id": target_user.id,
            "is_document_verified": True
        }, status=status.HTTP_200_OK)


class ClientTaskReviewAPIView(APIView):
    """
    GET  /api/tasks/<pk>/client-review/  — fetch existing review
    POST /api/tasks/<pk>/client-review/  — client submits / updates review
    """
    permission_classes = [IsAuthenticated]

    def _get_task_for_client(self, request, pk):
        """Return task only if the requesting user is the Client linked to the task's project."""
        task = get_object_or_404(Task, pk=pk)
        if request.user.role != 'Client':
            return None, Response({'detail': 'Only clients can review tasks.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            client_record = request.user.client_profile
        except Exception:
            return None, Response({'detail': 'Client profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        if task.project.client_id != client_record.id:
            return None, Response({'detail': 'This task does not belong to your project.'}, status=status.HTTP_403_FORBIDDEN)
        return task, None

    def get(self, request, pk):
        task, err = self._get_task_for_client(request, pk)
        if err:
            return err
        try:
            review = task.client_review
            doc_url = None
            if review.client_document and review.client_document.name:
                try:
                    doc_url = request.build_absolute_uri(review.client_document.url)
                except Exception:
                    pass
            return Response({
                'id': review.id,
                'status': review.status,
                'feedback': review.feedback,
                'client_document_url': doc_url,
                'reviewed_at': review.reviewed_at,
            })
        except ClientTaskReview.DoesNotExist:
            return Response({'status': None, 'feedback': None, 'client_document_url': None})

    def post(self, request, pk):
        task, err = self._get_task_for_client(request, pk)
        if err:
            return err

        # Task must have an employee-submitted file before client reviews
        if not (task.file and task.file.name):
            return Response({'detail': 'Employee has not submitted a document yet.'}, status=status.HTTP_400_BAD_REQUEST)

        review_status = request.data.get('status', 'Pending')
        feedback      = request.data.get('feedback', '')
        client_doc    = request.FILES.get('client_document')

        if review_status not in ['Approved', 'Needs Revision']:
            return Response({'detail': 'status must be Approved or Needs Revision.'}, status=status.HTTP_400_BAD_REQUEST)

        review, created = ClientTaskReview.objects.get_or_create(
            task=task,
            defaults={'reviewed_by': request.user}
        )
        review.reviewed_by = request.user
        review.status      = review_status
        review.feedback    = feedback
        if client_doc:
            review.client_document = client_doc
        review.save()

        # If Needs Revision — send task back to Pending and notify employee
        if review_status == 'Needs Revision':
            task.status = 'Pending'
            task.file   = None          # clear old submission so employee re-submits
            task.save(update_fields=['status', 'file'])
            # Create notification for employee
            if task.assigned_to:
                Notification.objects.create(
                    user=task.assigned_to,
                    message=f"Client returned task '{task.task_name}' for revision. Feedback: {feedback or 'No feedback provided.'}",
                    notification_type='task',
                )
        elif review_status == 'Approved':
            task.status = 'Completed'
            task.save(update_fields=['status'])
            if task.assigned_to:
                Notification.objects.create(
                    user=task.assigned_to,
                    message=f"Client approved your task '{task.task_name}'! Great work.",
                    notification_type='task',
                )

        doc_url = None
        if review.client_document and review.client_document.name:
            try:
                doc_url = request.build_absolute_uri(review.client_document.url)
            except Exception:
                pass

        return Response({
            'id': review.id,
            'status': review.status,
            'feedback': review.feedback,
            'client_document_url': doc_url,
            'reviewed_at': review.reviewed_at,
            'task_status': task.status,
        }, status=status.HTTP_200_OK)


class EmployeeClientReviewAPIView(APIView):
    """
    GET /api/tasks/<pk>/my-client-review/
    Employee fetches the client review for their own task.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        if task.assigned_to != request.user:
            return Response({'detail': 'This is not your task.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            review = task.client_review
            doc_url = None
            if review.client_document and review.client_document.name:
                try:
                    doc_url = request.build_absolute_uri(review.client_document.url)
                except Exception:
                    pass
            return Response({
                'status': review.status,
                'feedback': review.feedback,
                'client_document_url': doc_url,
                'reviewed_at': str(review.reviewed_at),
            })
        except ClientTaskReview.DoesNotExist:
            return Response({'status': None, 'feedback': None, 'client_document_url': None})


# -----------------------------------------------------------------------
# Employee Documents (Offer / Joining / Relieving / Other)
# -----------------------------------------------------------------------
class EmployeeDocumentAPIView(APIView):
    """
    GET  /api/employee-documents/?employee=<id>   — list documents (HR/MD see all; employee sees own)
    POST /api/employee-documents/                 — create a new document record (HR/MD only)
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        employee_id = request.query_params.get('employee')

        if user.role in ('HR', 'MD'):
            qs = EmployeeDocument.objects.select_related('employee', 'approved_by').all()
            if employee_id:
                qs = qs.filter(employee_id=employee_id)
        else:
            # Employees can only see their own approved/issued docs
            qs = EmployeeDocument.objects.filter(
                employee=user,
                status__in=('Approved', 'Issued')
            ).select_related('employee', 'approved_by')

        data = []
        for doc in qs:
            data.append({
                'id': doc.id,
                'document_type': doc.document_type,
                'document_type_display': doc.get_document_type_display(),
                'title': doc.title,
                'reference_number': doc.reference_number,
                'status': doc.status,
                'issue_date': str(doc.issue_date) if doc.issue_date else None,
                'email_status': doc.email_status,
                'email_sent_at': doc.email_sent_at.isoformat() if doc.email_sent_at else None,
                'email_error': doc.email_error,
                'file_url': request.build_absolute_uri(doc.file.url) if doc.file and doc.file.name else None,
                'employee_id': doc.employee_id,
                'employee_name': doc.employee.get_full_name() or doc.employee.username,
                'employee_email': doc.employee.email,
                'employee_emp_id': doc.employee.emp_id,
                'approved_by_name': doc.approved_by.get_full_name() if doc.approved_by else None,
                'approved_at': doc.approved_at.isoformat() if doc.approved_at else None,
                'created_at': doc.created_at.isoformat(),
            })
        return Response(data)

    def post(self, request):
        user = request.user
        if user.role not in ('HR', 'MD'):
            return Response({'detail': 'Only HR or MD can create employee documents.'}, status=status.HTTP_403_FORBIDDEN)

        employee_id = request.data.get('employee')
        if not employee_id:
            return Response({'detail': 'employee field is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            employee = User.objects.get(id=employee_id)
        except User.DoesNotExist:
            return Response({'detail': 'Employee not found.'}, status=status.HTTP_404_NOT_FOUND)

        doc_type = request.data.get('document_type', 'other')
        title = request.data.get('title', '')
        if not title:
            type_labels = dict(EmployeeDocument.DOCUMENT_TYPES)
            title = f"{type_labels.get(doc_type, 'Document')} — {employee.get_full_name() or employee.username}"

        doc = EmployeeDocument(
            employee=employee,
            document_type=doc_type,
            title=title,
            reference_number=request.data.get('reference_number', ''),
            status=request.data.get('status', 'Approved'),
            issue_date=request.data.get('issue_date') or timezone.now().date(),
            approved_by=user,
            approved_at=timezone.now(),
        )

        # Handle file upload
        if 'file' in request.FILES:
            doc.file = request.FILES['file']

        doc.save()

        return Response({
            'id': doc.id,
            'title': doc.title,
            'document_type': doc.document_type,
            'detail': 'Document record created successfully.'
        }, status=status.HTTP_201_CREATED)


class EmployeeDocumentDetailAPIView(APIView):
    """
    GET    /api/employee-documents/<pk>/  — get a single document
    PUT    /api/employee-documents/<pk>/  — update title/status/file (HR/MD only)
    DELETE /api/employee-documents/<pk>/  — delete (HR/MD only)
    """
    permission_classes = [IsAuthenticated]

    def _get_document(self, pk, user):
        doc = get_object_or_404(EmployeeDocument, pk=pk)
        if user.role in ('HR', 'MD'):
            return doc
        # Employees can only see their own approved/issued docs
        if doc.employee == user and doc.status in ('Approved', 'Issued'):
            return doc
        return None

    def get(self, request, pk):
        doc = self._get_document(pk, request.user)
        if doc is None:
            return Response({'detail': 'Not found or access denied.'}, status=status.HTTP_403_FORBIDDEN)
        return Response({
            'id': doc.id,
            'document_type': doc.document_type,
            'document_type_display': doc.get_document_type_display(),
            'title': doc.title,
            'reference_number': doc.reference_number,
            'status': doc.status,
            'issue_date': str(doc.issue_date) if doc.issue_date else None,
            'email_status': doc.email_status,
            'email_sent_at': doc.email_sent_at.isoformat() if doc.email_sent_at else None,
            'email_error': doc.email_error,
            'file_url': request.build_absolute_uri(doc.file.url) if doc.file and doc.file.name else None,
            'employee_id': doc.employee_id,
            'employee_name': doc.employee.get_full_name() or doc.employee.username,
            'employee_email': doc.employee.email,
            'employee_emp_id': doc.employee.emp_id,
        })

    def put(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Only HR or MD can edit documents.'}, status=status.HTTP_403_FORBIDDEN)
        doc = get_object_or_404(EmployeeDocument, pk=pk)
        updatable = ['title', 'reference_number', 'status', 'issue_date', 'document_type']
        for field in updatable:
            if field in request.data:
                setattr(doc, field, request.data[field])
        if 'file' in request.FILES:
            doc.file = request.FILES['file']
            # Reset email status when file is replaced
            doc.email_status = 'Not Sent'
            doc.email_error = None
        doc.save()
        return Response({'detail': 'Document updated successfully.'})

    def delete(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Only HR or MD can delete documents.'}, status=status.HTTP_403_FORBIDDEN)
        doc = get_object_or_404(EmployeeDocument, pk=pk)
        doc.delete()
        return Response({'detail': 'Document deleted.'}, status=status.HTTP_204_NO_CONTENT)


class EmployeeDocumentEmailAPIView(APIView):
    """
    POST /api/employee-documents/<pk>/send-email/
    Body: { "force": true }  — optional; forces resend even if already Sent
    Validates ownership, email existence, approval status, and duplicate guards.
    Records result in DocumentEmailLog.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Only HR or MD can send employee documents.'}, status=status.HTTP_403_FORBIDDEN)

        doc = get_object_or_404(EmployeeDocument, pk=pk)
        force = str(request.data.get('force', 'false')).lower() in ('true', '1', 'yes')

        # Duplicate-send guard
        if not force and doc.email_status in ('Sending', 'Sent'):
            return Response({
                'detail': f"Document email already {doc.email_status}. Pass force=true to resend.",
                'email_status': doc.email_status,
            }, status=status.HTTP_400_BAD_REQUEST)

        if doc.status not in ('Approved', 'Issued'):
            return Response({
                'detail': 'Document must be in Approved or Issued status before sending.'
            }, status=status.HTTP_400_BAD_REQUEST)

        emp = doc.employee
        if not emp.email:
            return Response({'detail': 'Employee has no registered email address.'}, status=status.HTTP_400_BAD_REQUEST)

        from main.email_service import YGREmailService
        ok, reason = YGREmailService.send_employee_document(
            document_id=doc.id,
            sender_id=request.user.id,
            force=force,
        )

        if ok:
            return Response({
                'detail': f"Email queued for delivery to {emp.email}.",
                'recipient': emp.email,
                'document': doc.title,
                'email_status': 'Sending',
            })
        else:
            return Response({'detail': reason}, status=status.HTTP_400_BAD_REQUEST)


class DocumentEmailHistoryAPIView(APIView):
    """
    GET /api/email-history/?document_type=payslip&document_id=<id>
    GET /api/email-history/?employee=<id>
    Returns DocumentEmailLog entries for HR auditing.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)

        qs = DocumentEmailLog.objects.select_related('employee', 'sender').all()
        doc_type = request.query_params.get('document_type')
        doc_id = request.query_params.get('document_id')
        employee_id = request.query_params.get('employee')

        if doc_type:
            qs = qs.filter(document_type=doc_type)
        if doc_id:
            qs = qs.filter(document_id=str(doc_id))
        if employee_id:
            qs = qs.filter(employee_id=employee_id)

        data = [{
            'id': log.id,
            'document_type': log.document_type,
            'document_id': log.document_id,
            'recipient_email': log.recipient_email,
            'employee_name': log.employee.get_full_name() if log.employee else '',
            'sender_name': log.sender.get_full_name() if log.sender else 'System',
            'subject': log.subject,
            'status': log.status,
            'error_details': log.error_details,
            'timestamp': log.timestamp.isoformat(),
        } for log in qs[:100]]
        return Response(data)


# -----------------------------------------------------------------------
# Recruitment Candidates (for selection in Offer Letters)
# -----------------------------------------------------------------------
class RecruitmentCandidatesAPIView(APIView):
    """
    GET /api/candidates/
    Returns list of job applications for HR selection.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        candidates = JobApplication.objects.all().order_by('-submitted_at')
        serializer = CandidateSummarySerializer(candidates, many=True)
        return Response(serializer.data)


# -----------------------------------------------------------------------
# Offer Letters Management
# -----------------------------------------------------------------------
OFFER_POLICY_SECTION_KEYS = (
    'appointment', 'position_responsibilities', 'joining_workplace', 'compensation',
    'probation', 'confirmation', 'working_hours', 'attendance_leave',
    'holidays_weekly_off', 'transfer_relocation', 'business_travel',
    'performance_evaluation', 'conduct', 'confidentiality', 'intellectual_property',
    'information_security', 'company_assets', 'conflict_outside_employment',
    'background_verification', 'employee_representations', 'notice_termination',
    'return_property', 'company_policies', 'general_terms', 'acceptance',
)

OFFER_POLICY_SECTION_TITLES = (
    ('appointment', 'Appointment and nature of employment'),
    ('position_responsibilities', 'Position, responsibilities and reporting structure'),
    ('joining_workplace', 'Date of joining and place of work'),
    ('compensation', 'Compensation and salary payment'),
    ('probation', 'Probation period'),
    ('confirmation', 'Confirmation of employment'),
    ('working_hours', 'Working days and working hours'),
    ('attendance_leave', 'Attendance and leave policies'),
    ('holidays_weekly_off', 'Holidays and weekly offs'),
    ('transfer_relocation', 'Transfers and relocation'),
    ('business_travel', 'Business travel and expenses'),
    ('performance_evaluation', 'Performance evaluation'),
    ('conduct', 'Code of conduct and professional behaviour'),
    ('confidentiality', 'Confidentiality and non-disclosure'),
    ('intellectual_property', 'Intellectual property and ownership of work'),
    ('information_security', 'Information security and data protection'),
    ('company_assets', 'Use of company assets and IT systems'),
    ('conflict_outside_employment', 'Conflict of interest and outside employment'),
    ('background_verification', 'Background and document verification'),
    ('employee_representations', 'Employee representations and declarations'),
    ('notice_termination', 'Notice period and termination'),
    ('return_property', 'Return of company property'),
    ('company_policies', 'Applicable company policies'),
    ('general_terms', 'General terms and governing law'),
    ('acceptance', 'Acceptance and execution'),
)

REQUIRED_OFFER_ANNEXURES = {'B', 'C', 'D'}


def _offer_policy_content(value):
    if isinstance(value, dict):
        if not value.get('enabled', True):
            return ''
        parts = [str(value.get('content', '') or '')]
        parts.extend(str(item) for item in value.get('subclauses', []) if str(item).strip())
        return '\n'.join(parts)
    return value if isinstance(value, str) else ''


def _has_unresolved_placeholder(value):
    if isinstance(value, dict):
        return any(_has_unresolved_placeholder(item) for item in value.values())
    if isinstance(value, (list, tuple)):
        return any(_has_unresolved_placeholder(item) for item in value)
    text = str(value or '')
    return any(token in text for token in ('{{', '}}', '[[', ']]', '[HR CONFIGURATION REQUIRED', '[LEGAL REVIEW REQUIRED'))


def _offer_policy_data(policy):
    return {
        'id': policy.id,
        'name': policy.name,
        'version': policy.version,
        'employment_category': policy.employment_category,
        'employment_type': policy.employment_type,
        'effective_date': policy.effective_date,
        'company_details': policy.company_details,
        'sections': policy.sections,
        'annexures': policy.annexures,
        'requires_md_approval': policy.requires_md_approval,
        'status': policy.status,
        'legal_approved': policy.legal_approved,
        'legal_reviewer_name': policy.legal_reviewer_name,
        'legal_approval_note': policy.legal_approval_note,
        'created_at': policy.created_at,
        'updated_at': policy.updated_at,
    }


def _snapshot_offer_policy(offer, policy):
    if policy.status != 'Published':
        return 'Select a published policy version before approving this offer.'
    if policy.employment_category not in ('All', offer.employment_category):
        return 'The selected policy version does not match this employment category.'
    if policy.employment_type not in ('All', offer.employment_type):
        return 'The selected policy version does not match this employment type.'
    if not policy.effective_date or policy.effective_date > timezone.localdate():
        return 'The selected policy version is not yet effective.'
    if not offer.candidate_address.strip():
        return 'Enter the candidate postal address before approval.'
    if not offer.reporting_manager_name.strip():
        return 'Set the reporting manager before approval.'
    if not offer.offer_validity_date:
        return 'Set the offer acceptance deadline before approval.'
    if offer.joining_date < timezone.localdate():
        return 'The proposed joining date cannot be in the past.'
    if offer.offer_validity_date < timezone.localdate() or offer.offer_validity_date > offer.joining_date:
        return 'The acceptance deadline must be current and no later than the joining date.'
    if not policy.legal_approved or not policy.legal_reviewer_name or not policy.legal_approval_note:
        return 'The selected policy version does not contain a complete legal-review record.'
    company_details = policy.company_details if isinstance(policy.company_details, dict) else {}
    required_company_fields = (
        'legal_name', 'registered_office_address', 'cin', 'authorized_signatory_name',
        'authorized_signatory_title', 'official_email', 'website',
    )
    if any(not str(company_details.get(key, '')).strip() for key in required_company_fields):
        return 'Complete registered company and authorized signatory details before approval.'
    for key in OFFER_POLICY_SECTION_KEYS:
        content = _offer_policy_content(policy.sections.get(key, ''))
        if len(content.strip()) < 120 or _has_unresolved_placeholder(content):
            return f'Policy section "{key}" is incomplete or contains unresolved placeholders.'

    monthly_gross = sum((
        offer.basic_salary,
        offer.hra,
        offer.special_allowance,
        offer.transport_allowance,
        offer.medical_allowance,
        offer.other_allowances,
    ), Decimal('0.00'))
    salary_values = (
        offer.offered_ctc,
        offer.monthly_gross,
        offer.basic_salary,
        offer.hra,
        offer.special_allowance,
        offer.transport_allowance,
        offer.medical_allowance,
        offer.other_allowances,
        offer.provident_fund,
        offer.employer_esi,
        offer.gratuity,
        offer.variable_pay,
        offer.employee_pf_deduction,
        offer.employee_esi,
        offer.professional_tax,
        offer.other_deductions,
    )
    if any(value < 0 for value in salary_values):
        return 'Compensation and deduction values cannot be negative.'
    if offer.offered_ctc <= 0 or monthly_gross <= 0:
        return 'Complete the approved gross salary and annual CTC before approval.'
    monthly_ctc = monthly_gross + offer.provident_fund + offer.employer_esi + offer.gratuity + (offer.variable_pay / 12)
    if abs(monthly_gross - offer.monthly_gross) > Decimal('0.01'):
        return 'Monthly gross must equal basic salary and all monthly cash allowances.'
    if abs(monthly_ctc * 12 - offer.offered_ctc) > Decimal('0.01'):
        return 'Annual CTC must equal annual gross salary plus employer contributions and variable pay.'
    total_deductions = offer.employee_pf_deduction + offer.employee_esi + offer.professional_tax + offer.other_deductions
    if total_deductions > monthly_gross:
        return 'Stated monthly deductions cannot exceed monthly gross salary.'

    enabled_annexures = [item for item in policy.annexures if isinstance(item, dict) and item.get('enabled', True)]
    selected_codes = offer.annexures
    if not isinstance(selected_codes, list):
        return 'Selected annexures must be provided as a list.'
    annexure_map = {item.get('code'): item for item in enabled_annexures}
    if any(code not in annexure_map for code in selected_codes):
        return 'One or more selected annexures are not enabled in the policy version.'
    if not REQUIRED_OFFER_ANNEXURES.issubset(selected_codes):
        return 'Annexures B, C, and D must be included in an issued offer pack.'
    benefits = annexure_map.get('B', {})
    benefit_sections = benefits.get('benefit_sections', {})
    benefit_keys = (
        'medical_insurance', 'leave_entitlements', 'paid_holidays',
        'training_development', 'performance_incentives', 'other_benefits',
    )
    if not isinstance(benefit_sections, dict) or any(
        len(str(benefit_sections.get(key, '')).strip()) < 40 or _has_unresolved_placeholder(benefit_sections.get(key, ''))
        for key in benefit_keys
    ):
        return 'Annexure B must contain approved wording for each benefit category or state that it does not apply.'
    undertaking = annexure_map.get('C', {}).get('sections', {})
    undertaking_keys = (
        'confidential_information', 'data_handling', 'confidentiality_obligations',
        'intellectual_property', 'return_deletion', 'employee_acknowledgement',
    )
    if not isinstance(undertaking, dict) or any(
        len(str(undertaking.get(key, '')).strip()) < 80 or _has_unresolved_placeholder(undertaking.get(key, ''))
        for key in undertaking_keys
    ):
        return 'Annexure C must contain complete approved confidentiality and IP undertaking clauses.'
    checklist = annexure_map.get('D', {}).get('items', [])
    if not isinstance(checklist, list) or len([item for item in checklist if str(item).strip()]) < 5:
        return 'Annexure D must contain the employment-specific joining checklist.'

    offer.policy_snapshot = {
        'name': policy.name,
        'version': policy.version,
        'effective_date': policy.effective_date.isoformat(),
        'employment_category': policy.employment_category,
        'employment_type': policy.employment_type,
        'company_details': policy.company_details,
        'requires_md_approval': policy.requires_md_approval,
        'sections': policy.sections,
        'annexures': [annexure_map[code] for code in selected_codes],
        'legal_reviewer_name': policy.legal_reviewer_name,
    }
    offer.annexures = selected_codes
    return None


class OfferLetterPolicyAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        policies = OfferLetterPolicyVersion.objects.all()
        if request.query_params.get('published') == 'true':
            policies = policies.filter(status='Published')
        return Response([_offer_policy_data(policy) for policy in policies])

    def post(self, request):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        data = request.data
        if not isinstance(data.get('sections', {}), dict) or not isinstance(data.get('annexures', []), list):
            return Response({'detail': 'Sections must be an object and annexures must be a list.'}, status=status.HTTP_400_BAD_REQUEST)
        if not isinstance(data.get('company_details', {}), dict):
            return Response({'detail': 'Company details must be an object.'}, status=status.HTTP_400_BAD_REQUEST)
        name = str(data.get('name') or '').strip()
        version = str(data.get('version') or '').strip()
        if not name or not version:
            return Response({'detail': 'Policy name and version are required.'}, status=status.HTTP_400_BAD_REQUEST)
        if OfferLetterPolicyVersion.objects.filter(name=name, version=version).exists():
            return Response({'detail': 'This policy version already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        legal_approved = bool(data.get('legal_approved', False))
        requires_md_approval = bool(data.get('requires_md_approval', True))
        if legal_approved and request.user.role != 'MD':
            return Response({'detail': 'Only an MD can record legal review approval.'}, status=status.HTTP_403_FORBIDDEN)
        if not requires_md_approval and request.user.role != 'MD':
            return Response({'detail': 'Only an MD can configure a template without MD approval.'}, status=status.HTTP_403_FORBIDDEN)
        policy = OfferLetterPolicyVersion.objects.create(
            name=name,
            version=version,
            employment_category=data.get('employment_category', 'All'),
            employment_type=data.get('employment_type', 'All'),
            effective_date=data.get('effective_date') or None,
            company_details=data.get('company_details', {}),
            sections=data.get('sections', {}),
            annexures=data.get('annexures', []),
            requires_md_approval=requires_md_approval,
            legal_approved=legal_approved,
            legal_reviewer_name=data.get('legal_reviewer_name', '').strip() if legal_approved else '',
            legal_approval_note=data.get('legal_approval_note', '').strip() if legal_approved else '',
            created_by=request.user,
        )
        return Response(_offer_policy_data(policy), status=status.HTTP_201_CREATED)


class OfferLetterPolicyDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        policy = get_object_or_404(OfferLetterPolicyVersion, pk=pk)
        return Response(_offer_policy_data(policy))

    def put(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        policy = get_object_or_404(OfferLetterPolicyVersion, pk=pk)
        if request.data.get('action') == 'retire':
            if policy.status != 'Published':
                return Response({'detail': 'Only published policy versions can be retired.'}, status=status.HTTP_400_BAD_REQUEST)
            policy.status = 'Retired'
            policy.save(update_fields=['status', 'updated_at'])
            return Response(_offer_policy_data(policy))
        if policy.status != 'Draft':
            return Response({'detail': 'Published or retired policy versions are immutable. Create a new version.'}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data
        legal_approved = bool(data.get('legal_approved', policy.legal_approved))
        requires_md_approval = bool(data.get('requires_md_approval', policy.requires_md_approval))
        company_details = data.get('company_details', policy.company_details)
        if not isinstance(company_details, dict):
            return Response({'detail': 'Company details must be an object.'}, status=status.HTTP_400_BAD_REQUEST)
        if legal_approved and request.user.role != 'MD':
            return Response({'detail': 'Only an MD can record legal review approval.'}, status=status.HTTP_403_FORBIDDEN)
        if not requires_md_approval and request.user.role != 'MD':
            return Response({'detail': 'Only an MD can configure a template without MD approval.'}, status=status.HTTP_403_FORBIDDEN)
        policy.name = data.get('name', policy.name).strip()
        policy.version = data.get('version', policy.version).strip()
        if OfferLetterPolicyVersion.objects.filter(name=policy.name, version=policy.version).exclude(pk=policy.pk).exists():
            return Response({'detail': 'This policy version already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        policy.employment_category = data.get('employment_category', policy.employment_category)
        policy.employment_type = data.get('employment_type', policy.employment_type)
        policy.effective_date = data.get('effective_date') or None
        policy.company_details = company_details
        policy.sections = data.get('sections', policy.sections)
        policy.annexures = data.get('annexures', policy.annexures)
        policy.requires_md_approval = requires_md_approval
        policy.legal_approved = legal_approved
        policy.legal_reviewer_name = data.get('legal_reviewer_name', policy.legal_reviewer_name).strip() if legal_approved else ''
        policy.legal_approval_note = data.get('legal_approval_note', policy.legal_approval_note).strip() if legal_approved else ''
        if not isinstance(policy.sections, dict) or not isinstance(policy.annexures, list):
            return Response({'detail': 'Sections must be an object and annexures must be a list.'}, status=status.HTTP_400_BAD_REQUEST)
        policy.save()
        return Response(_offer_policy_data(policy))


class OfferLetterPolicyPublishAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        policy = get_object_or_404(OfferLetterPolicyVersion, pk=pk)
        if request.data.get('action') == 'retire':
            if policy.status != 'Published':
                return Response({'detail': 'Only published policy versions can be retired.'}, status=status.HTTP_400_BAD_REQUEST)
            policy.status = 'Retired'
            policy.save(update_fields=['status', 'updated_at'])
            return Response(_offer_policy_data(policy))
        if policy.status != 'Draft':
            return Response({'detail': 'Only draft policy versions can be published.'}, status=status.HTTP_400_BAD_REQUEST)
        missing = [
            key for key in OFFER_POLICY_SECTION_KEYS
            if not isinstance(_offer_policy_content(policy.sections.get(key, '')), str)
            or not _offer_policy_content(policy.sections.get(key, '')).strip()
        ]
        if missing:
            return Response({'detail': 'Complete all required policy sections before publication.', 'missing_sections': missing}, status=status.HTTP_400_BAD_REQUEST)
        short_sections = [
            key for key in OFFER_POLICY_SECTION_KEYS
            if len(_offer_policy_content(policy.sections.get(key, '')).strip()) < 120
        ]
        if short_sections:
            return Response({'detail': 'Each employment clause must contain complete approved wording (at least 120 characters).', 'sections': short_sections}, status=status.HTTP_400_BAD_REQUEST)
        placeholder_sections = [key for key, value in policy.sections.items() if _has_unresolved_placeholder(value)]
        if placeholder_sections:
            return Response({'detail': 'Replace unresolved placeholders before publication.', 'sections': placeholder_sections}, status=status.HTTP_400_BAD_REQUEST)
        company_details = policy.company_details if isinstance(policy.company_details, dict) else {}
        required_company_fields = (
            'legal_name', 'registered_office_address', 'cin', 'authorized_signatory_name',
            'authorized_signatory_title', 'official_email', 'website',
        )
        missing_company_details = [key for key in required_company_fields if not str(company_details.get(key, '')).strip()]
        if missing_company_details:
            return Response({'detail': 'Complete registered company and authorized signatory details before publication.', 'missing_company_details': missing_company_details}, status=status.HTTP_400_BAD_REQUEST)
        if _has_unresolved_placeholder(company_details):
            return Response({'detail': 'Replace unresolved company detail placeholders before publication.'}, status=status.HTTP_400_BAD_REQUEST)
        missing_annexures = []
        for item in policy.annexures:
            if not isinstance(item, dict) or not item.get('enabled', True):
                continue
            code = item.get('code') or 'unnamed'
            has_content = bool(str(item.get('content', '')).strip())
            has_checklist = code == 'D' and isinstance(item.get('items'), list) and bool(item['items'])
            undertaking_sections = item.get('sections', {}) if isinstance(item.get('sections'), dict) else {}
            benefit_sections = item.get('benefit_sections', {}) if isinstance(item.get('benefit_sections'), dict) else {}
            required_undertaking_keys = (
                'confidential_information', 'data_handling', 'confidentiality_obligations',
                'intellectual_property', 'return_deletion', 'employee_acknowledgement',
            )
            has_undertaking = code == 'C' and all(
                len(str(undertaking_sections.get(key, '')).strip()) >= 80
                for key in required_undertaking_keys
            )
            benefit_keys = (
                'medical_insurance', 'leave_entitlements', 'paid_holidays',
                'training_development', 'performance_incentives', 'other_benefits',
            )
            has_benefits = code == 'B' and all(
                len(str(benefit_sections.get(key, '')).strip()) >= 40 for key in benefit_keys
            )
            if not str(item.get('title', '')).strip() or not (has_content or has_checklist or has_undertaking or has_benefits):
                missing_annexures.append(code)
            if code == 'B' and (not has_benefits or _has_unresolved_placeholder(benefit_sections)):
                missing_annexures.append(code)
            if code == 'C' and (not has_undertaking or _has_unresolved_placeholder(undertaking_sections)):
                missing_annexures.append(code)
        if missing_annexures:
            return Response({'detail': 'Complete or disable selected annexures before publication.', 'missing_annexures': missing_annexures}, status=status.HTTP_400_BAD_REQUEST)
        enabled_annexure_codes = {item.get('code') for item in policy.annexures if isinstance(item, dict) and item.get('enabled', True)}
        if not REQUIRED_OFFER_ANNEXURES.issubset(enabled_annexure_codes):
            return Response({'detail': 'Annexures B, C, and D must be enabled in the offer template.'}, status=status.HTTP_400_BAD_REQUEST)
        if any(_has_unresolved_placeholder(item) for item in policy.annexures if isinstance(item, dict) and item.get('enabled', True)):
            return Response({'detail': 'Replace unresolved annexure placeholders before publication.'}, status=status.HTTP_400_BAD_REQUEST)
        checklist = next((item.get('items', []) for item in policy.annexures if isinstance(item, dict) and item.get('code') == 'D' and item.get('enabled', True)), [])
        if len([item for item in checklist if str(item).strip()]) < 5:
            return Response({'detail': 'The employment-specific joining checklist must contain at least five required documents.'}, status=status.HTTP_400_BAD_REQUEST)
        invalid_optional_clauses = [
            index for index, clause in enumerate(policy.sections.get('optional_clauses', []))
            if isinstance(clause, dict) and clause.get('enabled', True)
            and (not str(clause.get('title', '')).strip() or not str(clause.get('content', '')).strip())
        ]
        if invalid_optional_clauses:
            return Response({'detail': 'Complete or disable optional clauses before publication.'}, status=status.HTTP_400_BAD_REQUEST)
        if not policy.effective_date:
            return Response({'detail': 'Set an effective date before publication.'}, status=status.HTTP_400_BAD_REQUEST)
        if not policy.legal_approved or not policy.legal_reviewer_name or not policy.legal_approval_note:
            return Response({'detail': 'A named legal reviewer and review note are required before publication.'}, status=status.HTTP_400_BAD_REQUEST)
        policy.status = 'Published'
        policy.save(update_fields=['status', 'updated_at'])
        return Response(_offer_policy_data(policy))


class OfferLetterAPIView(APIView):
    """
    GET  /api/offer-letters/   - list offer letters (HR/MD: all; Employee: own)
    POST /api/offer-letters/   - create new offer letter (HR/MD only)
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role in ('HR', 'MD'):
            qs = OfferLetter.objects.select_related('candidate', 'employee', 'approved_by', 'reporting_manager').all()
            status_param = request.query_params.get('status')
            if status_param and status_param != 'all':
                qs = qs.filter(status=status_param)
            search = request.query_params.get('search')
            if search:
                qs = qs.filter(
                    Q(candidate_name__icontains=search) |
                    Q(candidate_email__icontains=search) |
                    Q(job_title__icontains=search) |
                    Q(reference_number__icontains=search)
                )
        else:
            qs = OfferLetter.objects.filter(
                employee=user,
                status__in=('Approved', 'Issued', 'Sent', 'Accepted')
            ).select_related('candidate', 'employee', 'approved_by', 'reporting_manager')

        serializer = OfferLetterSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        if user.role not in ('HR', 'MD'):
            return Response({'detail': 'Only HR or MD can create offer letters.'}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        requested_status = data.get('status', 'Draft')
        if requested_status not in ('Draft', 'Pending Approval', 'Approved'):
            return Response({'detail': 'New offer letters must be saved as Draft, Pending Approval, or Approved.'}, status=status.HTTP_400_BAD_REQUEST)
        policy = None
        if requested_status == 'Approved':
            policy = OfferLetterPolicyVersion.objects.filter(pk=data.get('policy_version'), status='Published').first()
            if not policy:
                return Response({'detail': 'Select a published, legally reviewed policy version before approval.'}, status=status.HTTP_400_BAD_REQUEST)
            if policy.requires_md_approval and user.role != 'MD':
                return Response({'detail': 'This template requires MD approval. Save the draft and submit it for approval.'}, status=status.HTTP_403_FORBIDDEN)
        for field in ('approved_by', 'approved_at', 'created_by', 'policy_snapshot', 'pdf_file', 'email_status', 'email_sent_at', 'candidate_response', 'response_date'):
            data.pop(field, None)

        # Auto-generate reference number if missing
        if not data.get('reference_number'):
            import random
            year = timezone.now().year
            rand_code = random.randint(1000, 9999)
            ref_num = f"YGR/HR/OL/{year}/{rand_code}"
            while OfferLetter.objects.filter(reference_number=ref_num).exists():
                rand_code = random.randint(1000, 9999)
                ref_num = f"YGR/HR/OL/{year}/{rand_code}"
            data['reference_number'] = ref_num

        data['status'] = 'Draft'

        # Check candidate linking
        candidate_id = data.get('candidate')
        if candidate_id:
            cand = JobApplication.objects.filter(id=candidate_id).first()
            if cand:
                if not data.get('candidate_name'):
                    data['candidate_name'] = f"{cand.first_name} {cand.last_name}".strip()
                if not data.get('candidate_email'):
                    data['candidate_email'] = cand.email
                if not data.get('candidate_phone'):
                    data['candidate_phone'] = cand.phone
                if not data.get('candidate_address'):
                    data['candidate_address'] = cand.current_address or cand.permanent_address or cand.current_city or ''

        employee_id = data.get('employee')
        if employee_id:
            emp = User.objects.filter(id=employee_id).first()
            if emp:
                if not data.get('candidate_name'):
                    data['candidate_name'] = emp.get_full_name() or emp.username
                if not data.get('candidate_email'):
                    data['candidate_email'] = emp.email
                if not data.get('candidate_address'):
                    data['candidate_address'] = emp.address or ''

        serializer = OfferLetterSerializer(data=data)
        if serializer.is_valid():
            offer = serializer.save(created_by=user)
            if requested_status == 'Approved':
                policy_error = _snapshot_offer_policy(offer, policy)
                if policy_error:
                    offer.delete()
                    return Response({'detail': policy_error}, status=status.HTTP_400_BAD_REQUEST)
                offer.status = requested_status
                if requested_status == 'Approved':
                    offer.approved_by = user
                    offer.approved_at = timezone.now()
                offer.save(update_fields=['policy_snapshot', 'annexures', 'status', 'approved_by', 'approved_at', 'updated_at'])
            elif requested_status != 'Draft':
                offer.status = requested_status
                offer.save(update_fields=['status', 'updated_at'])
            if offer.status == 'Approved':
                from hr.letter_service import generate_offer_letter_pdf
                ok, result = generate_offer_letter_pdf(offer)
                if not ok:
                    offer.status = 'Draft'
                    offer.approved_by = None
                    offer.approved_at = None
                    offer.policy_snapshot = {}
                    offer.save(update_fields=['status', 'approved_by', 'approved_at', 'policy_snapshot', 'updated_at'])
                    return Response({'detail': f'PDF generation failed: {result}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            OfferLetterAudit.objects.create(
                offer=offer,
                actor=user,
                action='created' if requested_status == 'Draft' else requested_status.lower(),
                details={'status': offer.status, 'policy_version': offer.policy_snapshot.get('version')},
            )
            return Response(OfferLetterSerializer(offer).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OfferLetterDetailAPIView(APIView):
    """
    GET    /api/offer-letters/<pk>/  - retrieve offer details
    PUT    /api/offer-letters/<pk>/  - update offer letter (HR/MD only)
    DELETE /api/offer-letters/<pk>/  - delete offer letter (HR/MD only)
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        offer = get_object_or_404(OfferLetter, pk=pk)
        if user.role in ('HR', 'MD'):
            return offer
        if offer.employee == user and offer.status in ('Approved', 'Issued', 'Sent', 'Accepted'):
            return offer
        return None

    def get(self, request, pk):
        offer = self.get_object(pk, request.user)
        if not offer:
            return Response({'detail': 'Not found or permission denied.'}, status=status.HTTP_403_FORBIDDEN)
        return Response(OfferLetterSerializer(offer).data)

    def put(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        offer = get_object_or_404(OfferLetter, pk=pk)
        if offer.status != 'Draft':
            return Response({'detail': 'Approved or issued offers are immutable. Create a new offer revision instead.'}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        if data.get('status') not in (None, 'Draft'):
            return Response({'detail': 'Use the approval action to change offer status.'}, status=status.HTTP_400_BAD_REQUEST)
        for field in ('approved_by', 'approved_at', 'created_by', 'policy_snapshot', 'pdf_file', 'email_status', 'email_sent_at', 'candidate_response', 'response_date', 'reference_number'):
            data.pop(field, None)
        selected_policy_id = data.get('policy_version')
        if selected_policy_id and not OfferLetterPolicyVersion.objects.filter(pk=selected_policy_id, status='Published').exists():
            return Response({'detail': 'Select a published policy version.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = OfferLetterSerializer(offer, data=data, partial=True)
        if serializer.is_valid():
            changed_fields = sorted(serializer.validated_data.keys())
            updated_offer = serializer.save()
            OfferLetterAudit.objects.create(offer=updated_offer, actor=request.user, action='updated', details={'fields': changed_fields})
            return Response(OfferLetterSerializer(updated_offer).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        offer = get_object_or_404(OfferLetter, pk=pk)
        if offer.status != 'Draft':
            return Response({'detail': 'Only draft offer letters can be deleted. Approved and issued documents are retained for audit.'}, status=status.HTTP_400_BAD_REQUEST)
        offer.delete()
        return Response({'detail': 'Offer letter deleted.'}, status=status.HTTP_204_NO_CONTENT)


class OfferLetterActionAPIView(APIView):
    """
    POST /api/offer-letters/<pk>/action/
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)

        offer = get_object_or_404(OfferLetter, pk=pk)
        action = request.data.get('action')

        from hr.letter_service import generate_offer_letter_pdf

        if action == 'submit_for_approval':
            if offer.status != 'Draft':
                return Response({'detail': 'Only draft offers can be submitted for approval.'}, status=status.HTTP_400_BAD_REQUEST)
            offer.status = 'Pending Approval'
            offer.save(update_fields=['status', 'updated_at'])
            OfferLetterAudit.objects.create(offer=offer, actor=request.user, action='submitted_for_approval')
            return Response({'detail': 'Offer submitted for approval.', 'offer': OfferLetterSerializer(offer).data})

        if action == 'approve':
            if offer.status not in ('Draft', 'Pending Approval'):
                return Response({'detail': 'Only draft or pending offers can be approved.'}, status=status.HTTP_400_BAD_REQUEST)
            if not offer.policy_version:
                return Response({'detail': 'Select a published policy version before approving this offer.'}, status=status.HTTP_400_BAD_REQUEST)
            if offer.policy_version.requires_md_approval and request.user.role != 'MD':
                return Response({'detail': 'This template requires MD approval.'}, status=status.HTTP_403_FORBIDDEN)
            policy_error = _snapshot_offer_policy(offer, offer.policy_version)
            if policy_error:
                return Response({'detail': policy_error}, status=status.HTTP_400_BAD_REQUEST)
            offer.status = 'Approved'
            offer.approved_by = request.user
            offer.approved_at = timezone.now()
            offer.save(update_fields=['policy_snapshot', 'annexures', 'status', 'approved_by', 'approved_at', 'updated_at'])
            ok, result = generate_offer_letter_pdf(offer)
            if not ok:
                offer.status = 'Draft'
                offer.approved_by = None
                offer.approved_at = None
                offer.policy_snapshot = {}
                offer.save(update_fields=['status', 'approved_by', 'approved_at', 'policy_snapshot', 'updated_at'])
                return Response({'detail': f'PDF generation failed: {result}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            OfferLetterAudit.objects.create(offer=offer, actor=request.user, action='approved', details={'policy_version': offer.policy_snapshot.get('version')})
            return Response({
                'detail': 'Offer letter approved and PDF generated successfully.',
                'offer': OfferLetterSerializer(offer).data
            })

        elif action == 'issue':
            if offer.status != 'Approved' or not offer.policy_snapshot:
                return Response({'detail': 'Only an approved offer with a policy snapshot can be issued.'}, status=status.HTTP_400_BAD_REQUEST)
            if offer.policy_snapshot.get('requires_md_approval') and request.user.role != 'MD':
                return Response({'detail': 'Only the configured MD signatory may issue this offer.'}, status=status.HTTP_403_FORBIDDEN)
            offer.status = 'Issued'
            offer.save(update_fields=['status', 'updated_at'])
            ok, result = generate_offer_letter_pdf(offer)
            if not ok:
                offer.status = 'Approved'
                offer.save(update_fields=['status', 'updated_at'])
                return Response({'detail': f'PDF generation failed: {result}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            OfferLetterAudit.objects.create(offer=offer, actor=request.user, action='issued')
            return Response({
                'detail': 'Offer letter issued successfully.',
                'offer': OfferLetterSerializer(offer).data
            })

        elif action == 'generate_pdf':
            ok, res = generate_offer_letter_pdf(offer)
            if ok:
                OfferLetterAudit.objects.create(offer=offer, actor=request.user, action='pdf_generated')
                return Response({
                    'detail': 'PDF generated successfully.',
                    'pdf_url': offer.pdf_file.url,
                    'offer': OfferLetterSerializer(offer).data
                })
            return Response({'detail': f'PDF generation failed: {res}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        elif action == 'record_response':
            if offer.status not in ('Issued', 'Sent'):
                return Response({'detail': 'Candidate responses can only be recorded for issued or sent offers.'}, status=status.HTTP_400_BAD_REQUEST)
            resp = request.data.get('response')
            if resp not in ('Accepted', 'Rejected'):
                return Response({'detail': "Response must be 'Accepted' or 'Rejected'."}, status=status.HTTP_400_BAD_REQUEST)
            notes = request.data.get('notes', '')
            offer.status = resp
            offer.candidate_response = resp
            offer.candidate_response_notes = notes
            offer.response_date = timezone.now()
            offer.save(update_fields=['status', 'candidate_response', 'candidate_response_notes', 'response_date', 'updated_at'])
            OfferLetterAudit.objects.create(offer=offer, actor=request.user, action='candidate_response', details={'response': resp, 'notes': notes})

            if offer.candidate:
                if resp == 'Accepted':
                    offer.candidate.status = 'onboarding'
                    offer.candidate.save(update_fields=['status'])
                elif resp == 'Rejected':
                    offer.candidate.status = 'not_selected'
                    offer.candidate.save(update_fields=['status'])

            return Response({
                'detail': f'Candidate response recorded as {resp}.',
                'offer': OfferLetterSerializer(offer).data
            })

        return Response({'detail': f'Unknown action: {action}'}, status=status.HTTP_400_BAD_REQUEST)


class OfferLetterAuditAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        offer = get_object_or_404(OfferLetter, pk=pk)
        if request.user.role not in ('HR', 'MD') and offer.employee != request.user:
            return Response({'detail': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
        events = offer.audit_events.select_related('actor').all()
        return Response([
            {
                'action': event.action,
                'details': event.details,
                'actor': (event.actor.get_full_name() or event.actor.username) if event.actor else None,
                'created_at': event.created_at,
            }
            for event in events
        ])


class OfferLetterPreviewAPIView(APIView):
    """
    GET  /api/offer-letters/<pk>/preview/
    POST /api/offer-letters/preview-draft/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        offer = get_object_or_404(OfferLetter, pk=pk)
        if request.user.role not in ('HR', 'MD') and (offer.employee != request.user or offer.status not in ('Approved', 'Issued', 'Sent', 'Accepted')):
            return Response({'detail': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
        if offer.pdf_file and offer.status != 'Draft':
            try:
                offer.pdf_file.open('rb')
                pdf_bytes = offer.pdf_file.read()
            finally:
                offer.pdf_file.close()
        else:
            from hr.letter_service import render_offer_letter_pdf_bytes
            try:
                pdf_bytes = render_offer_letter_pdf_bytes(offer)
            except Exception as exc:
                return Response({'detail': f'PDF preview generation failed: {exc}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        from django.http import HttpResponse
        return HttpResponse(pdf_bytes, content_type='application/pdf')

    def post(self, request):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        data = request.data
        offer = OfferLetter(
            candidate_name=data.get('candidate_name', 'Candidate Name'),
            candidate_email=data.get('candidate_email', 'candidate@example.com'),
            candidate_phone=data.get('candidate_phone', ''),
            candidate_address=data.get('candidate_address', ''),
            job_title=data.get('job_title', 'Software Engineer'),
            department=data.get('department', 'Information Technology'),
            employment_type=data.get('employment_type', 'Full-time'),
            employment_category=data.get('employment_category', 'General'),
            policy_version=OfferLetterPolicyVersion.objects.filter(pk=data.get('policy_version'), status='Published').first() if data.get('policy_version') else None,
            annexures=data.get('annexures', []),
            work_location=data.get('work_location', 'Hyderabad, Telangana'),
            reporting_manager_name=data.get('reporting_manager_name', 'HR Manager'),
            offered_ctc=data.get('offered_ctc') or 0.00,
            monthly_gross=data.get('monthly_gross') or 0.00,
            basic_salary=data.get('basic_salary') or 0.00,
            hra=data.get('hra') or 0.00,
            special_allowance=data.get('special_allowance') or 0.00,
            provident_fund=data.get('provident_fund') or 0.00,
            transport_allowance=data.get('transport_allowance') or 0.00,
            medical_allowance=data.get('medical_allowance') or 0.00,
            other_allowances=data.get('other_allowances') or 0.00,
            gratuity=data.get('gratuity') or 0.00,
            variable_pay=data.get('variable_pay') or 0.00,
            employee_pf_deduction=data.get('employee_pf_deduction') or 0.00,
            employer_esi=data.get('employer_esi') or 0.00,
            employee_esi=data.get('employee_esi') or 0.00,
            professional_tax=data.get('professional_tax') or 0.00,
            other_deductions=data.get('other_deductions') or 0.00,
            joining_date=data.get('joining_date') or timezone.now().date(),
            offer_validity_date=data.get('offer_validity_date') or None,
            probation_period_months=data.get('probation_period_months') or 0,
            notice_period_days=data.get('notice_period_days') or 0,
            reference_number=data.get('reference_number', 'YGR/HR/OL/2026/DRAFT'),
            terms_and_conditions=data.get('terms_and_conditions', ''),
            created_at=timezone.now(),
        )
        from hr.letter_service import render_offer_letter_pdf_bytes
        try:
            pdf_bytes = render_offer_letter_pdf_bytes(offer)
        except Exception as exc:
            return Response({'detail': f'PDF preview generation failed: {exc}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        from django.http import HttpResponse
        return HttpResponse(pdf_bytes, content_type='application/pdf')


class OfferLetterDownloadAPIView(APIView):
    """
    GET /api/offer-letters/<pk>/download/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        offer = get_object_or_404(OfferLetter, pk=pk)
        if request.user.role not in ('HR', 'MD'):
            if offer.employee != request.user or offer.status not in ('Approved', 'Issued', 'Sent', 'Accepted'):
                return Response({'detail': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)

        if not offer.pdf_file:
            from hr.letter_service import generate_offer_letter_pdf
            ok, _ = generate_offer_letter_pdf(offer)
            if not ok:
                return Response({'detail': 'Could not generate PDF for download.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        from django.http import FileResponse
        try:
            return FileResponse(
                offer.pdf_file.open('rb'),
                as_attachment=True,
                filename=f"Offer_Letter_{offer.candidate_name.replace(' ', '_')}.pdf"
            )
        except Exception as e:
            return Response({'detail': f'File read error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class OfferLetterSendEmailAPIView(APIView):
    """
    POST /api/offer-letters/<pk>/send-email/
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Only HR or MD can send offer letters.'}, status=status.HTTP_403_FORBIDDEN)

        offer = get_object_or_404(OfferLetter, pk=pk)
        force = str(request.data.get('force', 'false')).lower() in ('true', '1', 'yes')

        if not force and offer.email_status in ('Sending', 'Sent'):
            return Response({
                'detail': f"Offer letter email is already {offer.email_status}. Pass force=true to resend.",
                'email_status': offer.email_status
            }, status=status.HTTP_400_BAD_REQUEST)

        if offer.status not in ('Approved', 'Issued', 'Sent', 'Accepted'):
            return Response({
                'detail': f"Offer letter status is '{offer.status}'. It must be Approved or Issued before emailing."
            }, status=status.HTTP_400_BAD_REQUEST)

        from main.email_service import HREmailService
        ok, reason = HREmailService.send_offer_letter_document(
            offer_letter_id=offer.id,
            sender_id=request.user.id,
            force=force
        )

        if ok:
            OfferLetterAudit.objects.create(offer=offer, actor=request.user, action='email_queued', details={'recipient': offer.candidate_email})
            return Response({
                'detail': f"Offer letter email queued successfully for {offer.candidate_email}.",
                'email_status': 'Sending'
            }, status=status.HTTP_200_OK)
        return Response({'detail': reason}, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------------------------------------------------
# Joining Letters Management
# -----------------------------------------------------------------------
class JoiningLetterAPIView(APIView):
    """
    GET  /api/joining-letters/
    POST /api/joining-letters/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role in ('HR', 'MD'):
            qs = JoiningLetter.objects.select_related('offer_letter', 'candidate', 'employee', 'approved_by', 'reporting_manager').all()
            status_param = request.query_params.get('status')
            if status_param and status_param != 'all':
                qs = qs.filter(status=status_param)
            search = request.query_params.get('search')
            if search:
                qs = qs.filter(
                    Q(employee_name__icontains=search) |
                    Q(employee_email__icontains=search) |
                    Q(designation__icontains=search) |
                    Q(reference_number__icontains=search)
                )
        else:
            qs = JoiningLetter.objects.filter(
                employee=user,
                status__in=('Approved', 'Issued', 'Sent')
            ).select_related('offer_letter', 'candidate', 'employee', 'approved_by', 'reporting_manager')

        serializer = JoiningLetterSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        if user.role not in ('HR', 'MD'):
            return Response({'detail': 'Only HR or MD can create joining letters.'}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()

        # Auto-generate reference number if missing
        if not data.get('reference_number'):
            import random
            year = timezone.now().year
            rand_code = random.randint(1000, 9999)
            ref_num = f"YGR/HR/JL/{year}/{rand_code}"
            while JoiningLetter.objects.filter(reference_number=ref_num).exists():
                rand_code = random.randint(1000, 9999)
                ref_num = f"YGR/HR/JL/{year}/{rand_code}"
            data['reference_number'] = ref_num

        # Auto-fill from offer_letter if provided
        offer_id = data.get('offer_letter')
        if offer_id:
            offer = OfferLetter.objects.filter(id=offer_id).first()
            if offer:
                if not data.get('employee_name'):
                    data['employee_name'] = offer.candidate_name
                if not data.get('employee_email'):
                    data['employee_email'] = offer.candidate_email
                if not data.get('employee_phone'):
                    data['employee_phone'] = offer.candidate_phone
                if not data.get('employee_address'):
                    data['employee_address'] = offer.candidate_address
                if not data.get('designation'):
                    data['designation'] = offer.job_title
                if not data.get('department'):
                    data['department'] = offer.department
                if not data.get('employment_type'):
                    data['employment_type'] = offer.employment_type
                if not data.get('work_location'):
                    data['work_location'] = offer.work_location
                if not data.get('reporting_manager') and offer.reporting_manager:
                    data['reporting_manager'] = offer.reporting_manager.id
                if not data.get('reporting_manager_name'):
                    data['reporting_manager_name'] = offer.reporting_manager_name
                if not data.get('actual_joining_date'):
                    data['actual_joining_date'] = str(offer.joining_date)
                if not data.get('candidate') and offer.candidate:
                    data['candidate'] = offer.candidate.id
                if not data.get('employee') and offer.employee:
                    data['employee'] = offer.employee.id

        employee_id = data.get('employee')
        if employee_id:
            emp = User.objects.filter(id=employee_id).first()
            if emp:
                if not data.get('employee_name'):
                    data['employee_name'] = emp.get_full_name() or emp.username
                if not data.get('employee_email'):
                    data['employee_email'] = emp.email
                if not data.get('employee_id_number'):
                    data['employee_id_number'] = emp.emp_id

        serializer = JoiningLetterSerializer(data=data)
        if serializer.is_valid():
            letter = serializer.save(created_by=user)
            if letter.status in ('Approved', 'Issued'):
                from hr.letter_service import generate_joining_letter_pdf
                generate_joining_letter_pdf(letter)
            return Response(JoiningLetterSerializer(letter).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JoiningLetterDetailAPIView(APIView):
    """
    GET    /api/joining-letters/<pk>/
    PUT    /api/joining-letters/<pk>/
    DELETE /api/joining-letters/<pk>/
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        letter = get_object_or_404(JoiningLetter, pk=pk)
        if user.role in ('HR', 'MD'):
            return letter
        if letter.employee == user and letter.status in ('Approved', 'Issued', 'Sent'):
            return letter
        return None

    def get(self, request, pk):
        letter = self.get_object(pk, request.user)
        if not letter:
            return Response({'detail': 'Not found or permission denied.'}, status=status.HTTP_403_FORBIDDEN)
        return Response(JoiningLetterSerializer(letter).data)

    def put(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        letter = get_object_or_404(JoiningLetter, pk=pk)
        serializer = JoiningLetterSerializer(letter, data=request.data, partial=True)
        if serializer.is_valid():
            updated_letter = serializer.save()
            if updated_letter.status in ('Approved', 'Issued', 'Sent'):
                from hr.letter_service import generate_joining_letter_pdf
                generate_joining_letter_pdf(updated_letter)
            return Response(JoiningLetterSerializer(updated_letter).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)
        letter = get_object_or_404(JoiningLetter, pk=pk)
        letter.delete()
        return Response({'detail': 'Joining letter deleted.'}, status=status.HTTP_204_NO_CONTENT)


class JoiningLetterActionAPIView(APIView):
    """
    POST /api/joining-letters/<pk>/action/
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)

        letter = get_object_or_404(JoiningLetter, pk=pk)
        action = request.data.get('action')

        from hr.letter_service import generate_joining_letter_pdf

        if action == 'approve':
            letter.status = 'Approved'
            letter.approved_by = request.user
            letter.approved_at = timezone.now()
            letter.save(update_fields=['status', 'approved_by', 'approved_at', 'updated_at'])
            generate_joining_letter_pdf(letter)
            return Response({
                'detail': 'Joining letter approved and PDF generated successfully.',
                'letter': JoiningLetterSerializer(letter).data
            })

        elif action == 'issue':
            letter.status = 'Issued'
            letter.save(update_fields=['status', 'updated_at'])
            generate_joining_letter_pdf(letter)
            return Response({
                'detail': 'Joining letter issued successfully.',
                'letter': JoiningLetterSerializer(letter).data
            })

        elif action == 'generate_pdf':
            ok, res = generate_joining_letter_pdf(letter)
            if ok:
                return Response({
                    'detail': 'PDF generated successfully.',
                    'pdf_url': letter.pdf_file.url,
                    'letter': JoiningLetterSerializer(letter).data
                })
            return Response({'detail': f'PDF generation failed: {res}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'detail': f'Unknown action: {action}'}, status=status.HTTP_400_BAD_REQUEST)


class JoiningLetterPreviewAPIView(APIView):
    """
    GET /api/joining-letters/<pk>/preview/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        letter = get_object_or_404(JoiningLetter, pk=pk)
        from hr.letter_service import render_joining_letter_html
        html = render_joining_letter_html(letter)
        from django.http import HttpResponse
        return HttpResponse(html, content_type='text/html')


class JoiningLetterDownloadAPIView(APIView):
    """
    GET /api/joining-letters/<pk>/download/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        letter = get_object_or_404(JoiningLetter, pk=pk)
        if request.user.role not in ('HR', 'MD'):
            if letter.employee != request.user or letter.status not in ('Approved', 'Issued', 'Sent'):
                return Response({'detail': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)

        if not letter.pdf_file:
            from hr.letter_service import generate_joining_letter_pdf
            ok, _ = generate_joining_letter_pdf(letter)
            if not ok:
                return Response({'detail': 'Could not generate PDF for download.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        from django.http import FileResponse
        try:
            return FileResponse(
                letter.pdf_file.open('rb'),
                as_attachment=True,
                filename=f"Joining_Letter_{letter.employee_name.replace(' ', '_')}.pdf"
            )
        except Exception as e:
            return Response({'detail': f'File read error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class JoiningLetterSendEmailAPIView(APIView):
    """
    POST /api/joining-letters/<pk>/send-email/
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if request.user.role not in ('HR', 'MD'):
            return Response({'detail': 'Only HR or MD can send joining letters.'}, status=status.HTTP_403_FORBIDDEN)

        letter = get_object_or_404(JoiningLetter, pk=pk)
        force = str(request.data.get('force', 'false')).lower() in ('true', '1', 'yes')

        if not force and letter.email_status in ('Sending', 'Sent'):
            return Response({
                'detail': f"Joining letter email is already {letter.email_status}. Pass force=true to resend.",
                'email_status': letter.email_status
            }, status=status.HTTP_400_BAD_REQUEST)

        if letter.status not in ('Approved', 'Issued', 'Sent'):
            return Response({
                'detail': f"Joining letter status is '{letter.status}'. It must be Approved or Issued before emailing."
            }, status=status.HTTP_400_BAD_REQUEST)

        from main.email_service import HREmailService
        ok, reason = HREmailService.send_joining_letter_document(
            joining_letter_id=letter.id,
            sender_id=request.user.id,
            force=force
        )

        if ok:
            return Response({
                'detail': f"Joining letter email queued successfully for {letter.employee_email}.",
                'email_status': 'Sending'
            }, status=status.HTTP_200_OK)
        return Response({'detail': reason}, status=status.HTTP_400_BAD_REQUEST)



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
