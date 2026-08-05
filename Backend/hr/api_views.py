from django.utils import timezone
from django.contrib.auth import login, logout, get_user_model
from django.db.models import Q
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, AttendanceSerializer, TaskSerializer, PayslipSerializer, AttendanceCorrectionSerializer, LeaveSerializer, HolidaySerializer, SalaryStructureSerializer, ProjectSerializer, DailyReportSerializer, HRSettingsSerializer, ChatMessageSerializer, ChatRoomSerializer, GroupMessageSerializer, CallSessionSerializer, ClientSerializer, ServiceSerializer, InvoiceItemSerializer, InvoiceSerializer, QuestionSerializer, ExamuserSerializer, ExamSessionSerializer, ResultSerializer, TeamSerializer, ProjectDocumentSerializer, ProjectCommentSerializer, ProjectAuditLogSerializer, NotificationSerializer, ProjectDetailSerializer
from .models import Attendance, Team, Task, Payslip, DailyReport, Holiday, Project, Leave, AttendanceCorrection, SalaryStructure, HRSettings, ChatMessage, ChatRoom, GroupMessage, CallSession, Client, Service, Invoice, InvoiceItem, Question, Examuser, ExamSession, Result, UserAnswer, ProjectDocument, ProjectComment, ProjectAuditLog, Notification, TaskReview

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
    permission_classes = [IsAuthenticated]

    def get(self, request):
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
        
        # Latest Payslip
        latest_payslip = Payslip.objects.filter(employee=user, is_published=True).order_by('-year', '-month').first()
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
            "active_tasks_count": tasks.filter(status="Pending").count(),
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
        pending_docs_users = User.objects.exclude(document='').exclude(document__isnull=True).order_by('-id')[:5]
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
                "pending_runs": 0,
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
        
        if teams.exists():
            members = User.objects.filter(teams__in=teams).distinct()
            members_count = members.count()
            
            projects = Project.objects.filter(assigned_teams__in=teams).distinct()
            projects_count = projects.count()
            
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
                status__in=['Pending', 'Submitted']
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
                
                curr_task = Task.objects.filter(assigned_to=m, status__in=["Pending", "Submitted"]).order_by("end_date").first()
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
                users = User.objects.filter(
                    Q(reporting_manager=user) |
                    Q(teams__lead=user)
                ).distinct()
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
            users = User.objects.filter(
                Q(reporting_manager=user) |
                Q(teams__lead=user)
            ).distinct()
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
            users = User.objects.filter(
                Q(reporting_manager=user) |
                Q(teams__lead=user)
            ).distinct()
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
            return Response({"detail": "Access Denied: HR/MD permissions required."}, status=status.HTTP_403_FORBIDDEN)
            
        attendance_id = request.data.get('attendance_id')
        new_status = request.data.get('status')
        check_in = request.data.get('check_in_time')
        check_out = request.data.get('check_out_time')
        remarks = request.data.get('remarks', '')

        # Handle virtual attendance IDs or missing records
        if attendance_id and str(attendance_id).startswith('virtual_'):
            import datetime as dt
            parts = attendance_id.split('_')
            # Expected formats: virtual_<emp_id>_<date> or virtual_<emp_id>
            if len(parts) == 3:
                _, emp_id, target_date_str = parts
            elif len(parts) == 2:
                _, emp_id = parts
                target_date_str = request.data.get('date')
                if not target_date_str:
                    return Response({"detail": "Date is required for virtual attendance creation."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"detail": "Invalid virtual attendance_id format."}, status=status.HTTP_400_BAD_REQUEST)

            try:
                target_date = dt.date.fromisoformat(str(target_date_str))
            except ValueError:
                return Response({"detail": f"Invalid date format: {target_date_str}. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

            emp = get_object_or_404(User, id=emp_id)
            record, _ = Attendance.objects.get_or_create(
                user=emp,
                date=target_date,
                defaults={"status": "Absent"},
            )
        elif not attendance_id:
            # No attendance_id provided – cannot proceed
            return Response({"detail": "attendance_id is required."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            record = get_object_or_404(Attendance, id=attendance_id)

        if new_status:
            record.status = new_status
        if check_in:
            record.check_in_time = check_in
        if check_out:
            record.check_out_time = check_out
        record.remarks = remarks
        record.save()
        
        return Response(AttendanceSerializer(record).data, status=status.HTTP_200_OK)


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
                leaves = leaves.filter(Q(user__reporting_manager=user) | Q(user__teams__lead=user)).distinct()
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
                leaves = Leave.objects.filter(Q(user__reporting_manager=user) | Q(user__teams__lead=user)).distinct()
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
                pending_count = Leave.objects.filter(current_approver_role=role).filter(Q(user__reporting_manager=user) | Q(user__teams__lead=user)).distinct().count()
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


from .views import generate_payslip_pdf_file
from decimal import Decimal

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
            payslips = Payslip.objects.filter(employee=user, is_published=True)
        elif role in ['HR', 'MD', 'Manager']:
            payslips = Payslip.objects.all().select_related('employee')
            if role == 'Manager':
                managed_teams = Team.objects.filter(projects__assigned_manager=user)
                managed_user_ids = User.objects.filter(
                    Q(reporting_manager=user) |
                    Q(reporting_manager__reporting_manager=user) |
                    Q(leading_teams__in=managed_teams) |
                    Q(teams__in=managed_teams)
                ).values_list('id', flat=True).distinct()
                payslips = payslips.filter(Q(employee_id__in=managed_user_ids) | Q(employee=user))
        else:
            payslips = Payslip.objects.none()
            
        if target_user_id:
            payslips = payslips.filter(employee_id=target_user_id)
        if search:
            payslips = payslips.filter(
                Q(employee_name__icontains=search) |
                Q(employee__first_name__icontains=search) |
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
            
        payslip = Payslip(
            employee=employee,
            month=int(month),
            year=int(year),
            basic_salary=Decimal(request.data.get('basic_salary') or 0),
            hra=Decimal(request.data.get('hra') or 0),
            transport_allowance=Decimal(request.data.get('transport_allowance') or 0),
            medical_allowance=Decimal(request.data.get('medical_allowance') or 0),
            special_allowance=Decimal(request.data.get('special_allowance') or 0),
            bonus=Decimal(request.data.get('bonus') or 0),
            pf_deduction=Decimal(request.data.get('pf_deduction') or 0),
            esi_deduction=Decimal(request.data.get('esi_deduction') or 0),
            professional_tax=Decimal(request.data.get('professional_tax') or 0),
            tds=Decimal(request.data.get('tds') or 0),
            loan_deduction=Decimal(request.data.get('loan_deduction') or 0),
            other_deductions=Decimal(request.data.get('other_deductions') or 0),
            working_days=int(request.data.get('working_days') or 26),
            days_present=int(request.data.get('days_present') or 26),
            days_absent=int(request.data.get('days_absent') or 0),
            leaves_taken=int(request.data.get('leaves_taken') or 0),
            status=request.data.get('status', 'Pending'),
            payment_date=request.data.get('payment_date') or None,
            is_published=request.data.get('is_published') == True,
            notes=request.data.get('notes', ''),
            created_by=user,
        )
        
        payslip.employee_name = employee.get_full_name() or employee.username
        payslip.designation = employee.role
        payslip.department = employee.get_department_display() or employee.department
        
        try:
            struct = employee.salary_structure
            payslip.bank_name = struct.bank_name
            payslip.account_number = struct.account_number
            payslip.ifsc_code = struct.ifsc_code
            payslip.pan = struct.pan
            payslip.uan = struct.uan
            payslip.aadhaar = struct.aadhaar
        except SalaryStructure.DoesNotExist:
            pass
            
        payslip.save()
        generate_payslip_pdf_file(payslip)
        payslip.save()
        
        serializer = PayslipSerializer(payslip)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PayslipDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        payslip = get_object_or_404(Payslip, pk=pk)
        if request.user.role not in ('HR', 'MD') and payslip.employee != request.user:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)
            
        serializer = PayslipSerializer(payslip)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can delete payslips."}, status=status.HTTP_403_FORBIDDEN)
            
        payslip = get_object_or_404(Payslip, pk=pk)
        payslip.delete()
        return Response({"detail": "Payslip deleted successfully."}, status=status.HTTP_200_OK)


class SalaryStructureAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        
        if role in ['HR', 'MD']:
            structures = SalaryStructure.objects.all().select_related('employee')
        else:
            structures = SalaryStructure.objects.filter(employee=user)
            
        serializer = SalaryStructureSerializer(structures, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can edit salary structures."}, status=status.HTTP_403_FORBIDDEN)
            
        emp_id = request.data.get('employee')
        employee = get_object_or_404(User, id=emp_id)
        
        structure, created = SalaryStructure.objects.get_or_create(employee=employee)
        
        for field in ['monthly_gross', 'basic_salary', 'hra', 'transport_allowance', 'medical_allowance', 
                      'special_allowance', 'bonus', 'pf_enabled', 'pf_rate', 'pf_amount', 'esi_enabled', 
                      'esi_rate', 'esi_amount', 'pt_enabled', 'pt_amount', 'tds_amount', 'other_deductions',
                      'bank_name', 'account_number', 'ifsc_code', 'pan', 'uan', 'aadhaar']:
            if field in request.data:
                val = request.data[field]
                if field in ['pf_enabled', 'esi_enabled', 'pt_enabled']:
                    val = val == True
                setattr(structure, field, val)
                
        structure.save()
        serializer = SalaryStructureSerializer(structure)
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
                Q(assigned_to__teams__lead=user)
            ).distinct()
        elif role == 'Manager':
            tasks = Task.objects.filter(project__assigned_manager=user)
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
            if not project.assigned_teams.filter(lead=user).exists():
                return Response({"detail": "You do not lead a team on this project."}, status=status.HTTP_403_FORBIDDEN)
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
            members = User.objects.filter(
                Q(reporting_manager=user) | Q(teams__lead=user)
            ).distinct()
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
        return Response(serializer.data, status=status.HTTP_200_OK)

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
    """GET /api/users/ — returns all users (excluding self) with presence, unread DM count, avatar.
    Optional ?scope=team filters to only team members (for TeamLead/Manager task assignment).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from django.utils import timezone as _tz
        from .models import UserPresence, ChatMessage, Team
        from django.db.models import Q as _Q

        now = _tz.now()
        base_url = request.build_absolute_uri('/').rstrip('/')

        scope = request.query_params.get('scope', '')
        if scope == 'directory':
            if request.user.role not in ['HR', 'MD', 'Manager', 'TeamLead']:
                return Response({"detail": "Access Denied: Unauthorized to view user directory."}, status=status.HTTP_403_FORBIDDEN)
            users = User.objects.all().order_by('emp_id')
            serializer = UserSerializer(users, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)

        users_qs = User.objects.filter(is_active=True).exclude(id=request.user.id).order_by('first_name', 'username')

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
            # Build avatar URL
            avatar = None
            if u.profile_pic and u.profile_pic.name:
                try:
                    avatar = base_url + u.profile_pic.url
                except Exception:
                    pass

            # DM unread count (only meaningful when scope is not 'team')
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

        # Sort by last message time descending when fetching for chat
        if scope != 'team':
            result.sort(key=lambda x: (x['last_msg_time'] or '0000'), reverse=True)

        return Response(result, status=status.HTTP_200_OK)


class UserDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can update employee details."}, status=status.HTTP_403_FORBIDDEN)
            
        user_to_edit = get_object_or_404(User, pk=pk)
        
        fullname = request.data.get('fullname')
        email = request.data.get('email')
        phone = request.data.get('phone', '')
        gender = request.data.get('gender', 'Male')
        date_of_birth = request.data.get('date_of_birth') or None
        date_of_joining = request.data.get('date_of_joining') or None
        emp_status = request.data.get('status', 'Fresher')
        address = request.data.get('address', '')
        salary = request.data.get('salary')
        department = request.data.get('department', '')
        team_name = request.data.get('team_name', '')
        experience_years = request.data.get('experience_years') or None
        role = request.data.get('role')
        designation = request.data.get('designation', '')
        
        if fullname:
            user_to_edit.first_name = fullname
        if email:
            if User.objects.filter(email=email).exclude(id=pk).exists():
                return Response({"detail": "Email already in use."}, status=status.HTTP_400_BAD_REQUEST)
            user_to_edit.username = email
            user_to_edit.email = email
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
        if department:
            user_to_edit.department = department
        if team_name is not None:
            user_to_edit.team_name = team_name
        if experience_years:
            user_to_edit.experience_years = experience_years
        if role:
            user_to_edit.role = role
        if designation is not None:
            user_to_edit.designation = designation
            
        user_to_edit.save()
        serializer = UserSerializer(user_to_edit, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        if request.user.role not in ['HR', 'MD']:
            return Response({"detail": "Access Denied: Only HR or MD can delete employees."}, status=status.HTTP_403_FORBIDDEN)
            
        user_to_delete = get_object_or_404(User, pk=pk)
        if user_to_delete.id == request.user.id:
            return Response({"detail": "You cannot delete your own account."}, status=status.HTTP_400_BAD_REQUEST)
            
        user_to_delete.delete()
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



