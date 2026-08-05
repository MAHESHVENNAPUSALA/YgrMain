import re

with open('hr/api_views.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace send_leave_notification
new_notification = '''def send_leave_notification(leave):
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
'''
content = re.sub(r'def send_leave_notification\(leave\):.*?except Exception as e:\n\s*print\(f"Error creating notification: \{e\}"\)\n', new_notification, content, flags=re.DOTALL)

# Replace LeaveAPIView body up to LeaveActionAPIView
leave_api_view = '''class LeaveAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role
        scope = request.query_params.get('scope', 'personal')
        q_status = request.query_params.get('status', '')
        
        if scope == 'team-pending':
            leaves = Leave.objects.filter(current_approver_role=role)
            if role == 'TeamLead':
                leaves = leaves.filter(Q(user__reporting_manager=user) | Q(user__teams__lead=user)).distinct()
            elif role == 'Manager':
                managed_teams = Team.objects.filter(Q(project__assigned_manager=user) | Q(projects__assigned_manager=user))
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
                managed_teams = Team.objects.filter(Q(project__assigned_manager=user) | Q(projects__assigned_manager=user))
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
                managed_teams = Team.objects.filter(Q(project__assigned_manager=user) | Q(projects__assigned_manager=user))
                pending_count = Leave.objects.filter(current_approver_role=role).filter(
                    Q(user__reporting_manager=user) |
                    Q(user__reporting_manager__reporting_manager=user) |
                    Q(user__leading_teams__in=managed_teams) |
                    Q(user__teams__in=managed_teams)
                ).distinct().count()
            elif role in ['HR', 'MD']:
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
'''

content = re.sub(r'class LeaveAPIView\(APIView\):.*?class LeaveActionAPIView\(APIView\):', leave_api_view + '\n\nclass LeaveActionAPIView(APIView):', content, flags=re.DOTALL)

# Replace LeaveActionAPIView
leave_action_api = '''class LeaveActionAPIView(APIView):
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
'''
content = re.sub(r'class LeaveActionAPIView\(APIView\):.*?class HolidayAPIView\(APIView\):', leave_action_api + '\n\nclass HolidayAPIView(APIView):', content, flags=re.DOTALL)


# Update AttendanceStatusAPIView
new_attendance_status = '''class AttendanceStatusAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.localdate()
        from hr.models import Leave
        on_leave_today = Leave.objects.filter(
            user=request.user,
            status='Final Approved',
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
        }, status=status.HTTP_200_OK)'''
content = re.sub(r'class AttendanceStatusAPIView\(APIView\):.*?return Response\(None, status=status.HTTP_200_OK\)', new_attendance_status, content, flags=re.DOTALL)

# Update CheckInAPIView
checkin = '''class CheckInAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        today = timezone.localdate()
        from hr.models import Leave
        on_leave_today = Leave.objects.filter(
            user=request.user,
            status='Final Approved',
            from_date__lte=today,
            to_date__gte=today
        ).exists()
        if on_leave_today:
            return Response({"detail": "You are on approved leave today. Cannot check in."}, status=status.HTTP_403_FORBIDDEN)
            
        attendance, created = Attendance.objects.get_or_create(
            user=request.user,
            date=today
        )'''
content = re.sub(r'class CheckInAPIView\(APIView\):.*?date=today\n\s*\)', checkin, content, flags=re.DOTALL)

with open('hr/api_views.py', 'w', encoding='utf-8') as f:
    f.write(content)
