from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Attendance, Payslip, Task, Project, AttendanceCorrection, Leave, Holiday, SalaryStructure, DailyReport, HRSettings, ChatMessage, ChatRoom, GroupMessage, CallSession, Client, Service, Invoice, InvoiceItem, Question, Examuser, ExamSession, Result, Team, ProjectDocument, ProjectComment, ProjectAuditLog, Notification, LeaveApprovalStep, ProjectReview

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    reporting_manager_name = serializers.SerializerMethodField()
    department_display = serializers.SerializerMethodField()
    profile_pic_url = serializers.SerializerMethodField()
    team_leader_name = serializers.SerializerMethodField()
    project = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'role',
            'profile_pic',
            'profile_pic_url',
            'emp_id',
            'phone',
            'designation',
            'department',
            'department_display',
            'team_name',
            'address',
            'date_of_birth',
            'gender',
            'salary',
            'date_of_joining',
            'status',
            'experience_years',
            'previous_company',
            'aadhaar',
            'document',
            'reporting_manager_name',
            'team_leader_name',
            'project',
        ]

    def get_reporting_manager_name(self, obj):
        if obj.reporting_manager:
            full = f"{obj.reporting_manager.first_name} {obj.reporting_manager.last_name}".strip()
            return full or obj.reporting_manager.username
        return None

    def get_team_leader_name(self, obj):
        from .models import Team
        team = Team.objects.filter(members=obj).first()
        if team and team.lead:
            full = f"{team.lead.first_name} {team.lead.last_name}".strip()
            return full or team.lead.username
        return None

    def get_department_display(self, obj):
        """Return the human-readable label for the department code."""
        return obj.get_department_display() if obj.department else None

    def get_profile_pic_url(self, obj):
        """Return an absolute URL for the profile picture, or None."""
        if not (obj.profile_pic and obj.profile_pic.name):
            return None
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.profile_pic.url)
        # Fallback: return relative URL
        return obj.profile_pic.url

    def get_project(self, obj):
        from .models import Team, Project
        from django.db.models import Q
        # If user is a Manager, check if they manage a project
        if obj.role == 'Manager':
            proj = Project.objects.filter(assigned_manager=obj).first()
            if proj:
                return proj.name
        # Otherwise check if user is a member/lead of a team associated with a project
        team = Team.objects.filter(Q(members=obj) | Q(lead=obj)).first()
        if team and team.projects.exists():
            return team.projects.first().name
        # Fallback: check if they are in the project's assigned team
        proj = Project.objects.filter(Q(assigned_teams__members=obj) | Q(assigned_teams__lead=obj)).first()
        if proj:
            return proj.name
        return None

class AttendanceSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    check_in_image_url = serializers.SerializerMethodField()
    check_out_image_url = serializers.SerializerMethodField()
    check_in_photo_url = serializers.SerializerMethodField()
    check_out_photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Attendance
        fields = [
            'id', 'date',
            'check_in_time', 'check_out_time',
            'total_hours', 'status',
            'is_late', 'left_early', 'remarks',
            'user',
            # Photos (legacy + new)
            'check_in_photo', 'check_out_photo',
            'check_in_photo_url', 'check_out_photo_url',
            'check_in_image', 'check_out_image',
            'check_in_image_url', 'check_out_image_url',
            # Location
            'check_in_location', 'check_out_location',
            'check_in_latitude', 'check_in_longitude',
            'check_out_latitude', 'check_out_longitude',
            'check_in_address', 'check_out_address',
            'check_in_map_url', 'check_out_map_url',
            # Device & network
            'check_in_ip', 'check_out_ip',
            'check_in_browser', 'check_out_browser',
            'check_in_device', 'check_out_device',
            # Policy
            'original_status', 'calculated_status',
            'is_sandwich_leave', 'payroll_count_flag',
            'is_weekoff', 'is_holiday',
        ]

    def _build_url(self, obj, field_name):
        val = getattr(obj, field_name, None)
        if not val or not val.name:
            return None
        request = self.context.get('request')
        try:
            if request:
                return request.build_absolute_uri(val.url)
            return val.url
        except Exception:
            return None

    def get_check_in_image_url(self, obj):
        return self._build_url(obj, 'check_in_image') or self._build_url(obj, 'check_in_photo')

    def get_check_out_image_url(self, obj):
        return self._build_url(obj, 'check_out_image') or self._build_url(obj, 'check_out_photo')

    def get_check_in_photo_url(self, obj):
        return self._build_url(obj, 'check_in_photo')

    def get_check_out_photo_url(self, obj):
        return self._build_url(obj, 'check_out_photo')


class ProjectSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source='name')
    assigned_manager_name = serializers.SerializerMethodField()
    teams_count = serializers.SerializerMethodField()
    assigned_team_member_ids = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'project_id', 'project_code', 'name', 'project_name', 
            'description', 'startdate', 'deadline', 'client_name', 
            'client_contact', 'client', 'project_category', 'priority', 
            'estimated_budget', 'technology_stack', 'project_logo', 
            'project_color', 'assigned_manager', 'assigned_manager_name', 
            'created_by', 'created_at', 'updated_at', 'status', 'is_archived', 'teams_count', 'assigned_team_member_ids'
        ]

    def get_assigned_manager_name(self, obj):
        if obj.assigned_manager:
            return obj.assigned_manager.get_full_name() or obj.assigned_manager.username
        return None
        
    def get_teams_count(self, obj):
        return obj.assigned_teams.count()
        
    def get_assigned_team_member_ids(self, obj):
        # Return all member IDs from all teams assigned to this project
        from django.contrib.auth import get_user_model
        User = get_user_model()
        return list(User.objects.filter(teams__projects=obj).values_list('id', flat=True).distinct())


class TeamSerializer(serializers.ModelSerializer):
    lead_detail = UserSerializer(source='lead', read_only=True)
    members_detail = UserSerializer(source='members', many=True, read_only=True)
    department_display = serializers.CharField(source='get_department_display', read_only=True)
    project = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = [
            'id', 'name', 'project', 'team_code', 'department', 'department_display',
            'description', 'max_size', 'lead', 'lead_detail', 'members', 'members_detail', 'is_active'
        ]

    def get_project(self, obj):
        proj = obj.projects.first()
        return proj.id if proj else None


class ProjectDocumentSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.SerializerMethodField()

    class Meta:
        model = ProjectDocument
        fields = ['id', 'project', 'name', 'file', 'uploaded_by', 'uploaded_by_name', 'uploaded_at']

    def get_uploaded_by_name(self, obj):
        if obj.uploaded_by:
            return f"{obj.uploaded_by.first_name} {obj.uploaded_by.last_name}".strip() or obj.uploaded_by.username
        return None


class ProjectCommentSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_pic = serializers.SerializerMethodField()

    class Meta:
        model = ProjectComment
        fields = ['id', 'project', 'author', 'author_name', 'author_pic', 'content', 'created_at']

    def get_author_name(self, obj):
        return f"{obj.author.first_name} {obj.author.last_name}".strip() or obj.author.username

    def get_author_pic(self, obj):
        if obj.author.profile_pic:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.author.profile_pic.url)
            return obj.author.profile_pic.url
        return None


class ProjectAuditLogSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = ProjectAuditLog
        fields = ['id', 'project', 'action', 'user', 'user_name', 'details', 'timestamp']

    def get_user_name(self, obj):
        if obj.user:
            return f"{obj.user.first_name} {obj.user.last_name}".strip() or obj.user.username
        return "System"


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'recipient', 'title', 'message', 'is_read', 'created_at']

class ProjectReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectReview
        fields = '__all__'



class ProjectDetailSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source='name')
    assigned_manager_detail = UserSerializer(source='assigned_manager', read_only=True)
    created_by_detail = UserSerializer(source='created_by', read_only=True)
    teams = TeamSerializer(source='assigned_teams', many=True, read_only=True)
    project_documents = ProjectDocumentSerializer(many=True, read_only=True)
    project_comments = ProjectCommentSerializer(many=True, read_only=True)
    project_audit_logs = ProjectAuditLogSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'project_id', 'project_code', 'name', 'project_name', 'description', 
            'startdate', 'deadline', 'client_name', 'client_contact', 'client',
            'project_category', 'priority', 'estimated_budget', 'technology_stack', 
            'project_logo', 'project_color', 'assigned_manager', 'assigned_manager_detail',
            'created_by', 'created_by_detail', 'created_at', 'updated_at', 'status', 
            'is_archived', 'teams', 'project_documents', 'project_comments', 'project_audit_logs'
        ]

class TaskSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    members = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            'id',
            'task_name',
            'description',
            'start_date',
            'end_date',
            'status',
            'project',
            'members',
        ]

    def get_members(self, obj):
        if obj.assigned_to:
            return [{
                "id": obj.assigned_to.id,
                "name": obj.assigned_to.get_full_name() or obj.assigned_to.username,
                "role": obj.assigned_to.role
            }]
        return []

class PayslipSerializer(serializers.ModelSerializer):
    net_salary = serializers.ReadOnlyField()
    month_name = serializers.ReadOnlyField()

    class Meta:
        model = Payslip
        fields = [
            'id',
            'employee',
            'month',
            'year',
            'basic_salary',
            'hra',
            'transport_allowance',
            'medical_allowance',
            'special_allowance',
            'bonus',
            'pf_deduction',
            'esi_deduction',
            'professional_tax',
            'tds',
            'loan_deduction',
            'other_deductions',
            'working_days',
            'days_present',
            'days_absent',
            'leaves_taken',
            'status',
            'payment_date',
            'is_published',
            'payslip_pdf',
            'employee_name',
            'designation',
            'department',
            'bank_name',
            'account_number',
            'ifsc_code',
            'pan',
            'uan',
            'aadhaar',
            'is_locked',
            'loss_of_pay',
            'needs_recalculation',
            'generated_at',
            'net_salary',
            'month_name',
        ]


class AttendanceCorrectionSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='attendance.user.username')
    date = serializers.ReadOnlyField(source='attendance.date')
    attendance = serializers.SerializerMethodField()
    edited_by = serializers.SerializerMethodField()

    class Meta:
        model = AttendanceCorrection
        fields = '__all__'

    def get_attendance(self, obj):
        att = obj.attendance
        if not att:
            return None
        return {
            'id': att.id,
            'date': str(att.date),
            'status': att.status,
            'user': {
                'id': att.user.id,
                'username': att.user.username,
                'first_name': att.user.first_name,
                'last_name': att.user.last_name,
                'emp_id': att.user.emp_id,
                'department': att.user.department,
                'role': att.user.role,
            }
        }

    def get_edited_by(self, obj):
        u = obj.edited_by
        if not u:
            return None
        return {
            'id': u.id,
            'username': u.username,
            'first_name': u.first_name,
            'last_name': u.last_name,
        }


class LeaveApprovalStepSerializer(serializers.ModelSerializer):
    approver_name = serializers.SerializerMethodField()

    class Meta:
        model = LeaveApprovalStep
        fields = '__all__'

    def get_approver_name(self, obj):
        if obj.approver:
            return obj.approver.get_full_name() or obj.approver.username
        return "System"


class LeaveSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    user_full_name = serializers.SerializerMethodField()
    emp_id = serializers.ReadOnlyField(source='user.emp_id')
    department = serializers.ReadOnlyField(source='user.department')
    designation = serializers.ReadOnlyField(source='user.designation')
    leave_balance = serializers.SerializerMethodField()
    approval_steps = LeaveApprovalStepSerializer(many=True, read_only=True)
    can_act = serializers.SerializerMethodField()

    class Meta:
        model = Leave
        fields = '__all__'

    def get_user_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

    def get_leave_balance(self, obj):
        approved = Leave.objects.filter(user=obj.user, status__in=['Approved', 'Final Approved']).count()
        return 24 - approved

    def get_can_act(self, obj):
        request = self.context.get('request')
        if not request or not request.user:
            return False
        return obj.current_approver_role == request.user.role


class HolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = '__all__'


class SalaryStructureSerializer(serializers.ModelSerializer):
    employee_name = serializers.ReadOnlyField(source='employee.username')
    employee_full_name = serializers.SerializerMethodField()
    employee_details = serializers.SerializerMethodField()

    class Meta:
        model = SalaryStructure
        fields = '__all__'

    def get_employee_full_name(self, obj):
        return obj.employee.get_full_name() or obj.employee.username

    def get_employee_details(self, obj):
        if obj.employee:
            return {
                "id": obj.employee.id,
                "name": obj.employee.get_full_name() or obj.employee.username,
                "emp_id": obj.employee.emp_id,
                "department": obj.employee.department,
            }
        return None


class DailyReportSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    user_full_name = serializers.SerializerMethodField()
    project_name = serializers.ReadOnlyField(source='project.name')

    class Meta:
        model = DailyReport
        fields = '__all__'

    def get_user_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username


class HRSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HRSettings
        fields = '__all__'


class ChatRoomSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)
    created_by_name = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = ChatRoom
        fields = '__all__'


class ChatMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.ReadOnlyField(source='sender.username')
    sender_full_name = serializers.SerializerMethodField()
    receiver_name = serializers.ReadOnlyField(source='receiver.username')
    receiver_full_name = serializers.SerializerMethodField()

    class Meta:
        model = ChatMessage
        fields = '__all__'

    def get_sender_full_name(self, obj):
        return obj.sender.get_full_name() or obj.sender.username

    def get_receiver_full_name(self, obj):
        return obj.receiver.get_full_name() or obj.receiver.username


class GroupMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.ReadOnlyField(source='sender.username')
    sender_full_name = serializers.SerializerMethodField()

    class Meta:
        model = GroupMessage
        fields = '__all__'

    def get_sender_full_name(self, obj):
        return obj.sender.get_full_name() or obj.sender.username


class CallSessionSerializer(serializers.ModelSerializer):
    caller_name = serializers.ReadOnlyField(source='caller.username')
    caller_full_name = serializers.SerializerMethodField()
    receiver_name = serializers.ReadOnlyField(source='receiver.username')
    receiver_full_name = serializers.SerializerMethodField()

    class Meta:
        model = CallSession
        fields = '__all__'

    def get_caller_full_name(self, obj):
        return obj.caller.get_full_name() or obj.caller.username

    def get_receiver_full_name(self, obj):
        return obj.receiver.get_full_name() or obj.receiver.username


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class InvoiceItemSerializer(serializers.ModelSerializer):
    service_name = serializers.ReadOnlyField(source='service.name')
    service_amount = serializers.ReadOnlyField(source='service.amount')

    class Meta:
        model = InvoiceItem
        fields = '__all__'


class InvoiceSerializer(serializers.ModelSerializer):
    client_name = serializers.ReadOnlyField(source='client.name')
    client_business_name = serializers.ReadOnlyField(source='client.business_name')
    items = InvoiceItemSerializer(many=True, read_only=True)
    subtotal = serializers.ReadOnlyField()
    discount_amount = serializers.ReadOnlyField()
    gst = serializers.ReadOnlyField()
    grand_total = serializers.ReadOnlyField()

    class Meta:
        model = Invoice
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class ExamuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examuser
        fields = '__all__'


class ExamSessionSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    user_email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = ExamSession
        fields = '__all__'


class ResultSerializer(serializers.ModelSerializer):
    exam_language = serializers.ReadOnlyField(source='exam.language')
    exam_user_name = serializers.ReadOnlyField(source='exam.user.username')
    score = serializers.ReadOnlyField(source='score_percentage')

    class Meta:
        model = Result
        fields = '__all__'












