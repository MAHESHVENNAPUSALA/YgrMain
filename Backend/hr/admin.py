from django.contrib import admin
from .models import User,  Project,   ChatMessage, Question,ProjectWorkUpdate
from .models import TeamLead,Team,Task,EmpUpdate,DailyReport




@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'username', 'email', 'role', 'emp_id', 'phone',
        'department', 'date_joined', 'status'
    )
    list_filter = ('role', 'status', 'department', 'gender')
    search_fields = ('username', 'email', 'emp_id')
    readonly_fields = ('emp_id', 'date_joined')


    admin.site.register(Project)

   

    admin.site.register(ChatMessage)
  # hr/admin.py


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("id", "language", "question_text", "correct_option")





from django.contrib import admin
from .models import Client, Service, Invoice, Leave, HRSettings

admin.site.register(Client)

admin.site.register(Service)
admin.site.register(Invoice)
admin.site.register(Leave)


@admin.register(HRSettings)
class HRSettingsAdmin(admin.ModelAdmin):
    """
    Singleton admin: HR can change the settings but not add or delete rows.
    """
    list_display = ('sandwich_leave_enabled',)
    readonly_fields = ()

    def has_add_permission(self, request):
        # Only one settings row is allowed
        return not HRSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False



# ==========================
# TEAM LEAD
# ==========================
@admin.register(TeamLead)
class TeamLeadAdmin(admin.ModelAdmin):
    list_display = ('employee', 'team_name', 'department', 'email', 'phone', 'promotion_date')
    search_fields = ('employee__fullname', 'team_name', 'email')


# ==========================
# PROJECT WORK UPDATE
# ==========================
@admin.register(ProjectWorkUpdate)
class ProjectWorkUpdateAdmin(admin.ModelAdmin):
    list_display = (
        'project',
        'team_lead',
        'short_work_details',
        'created_at'
    )
    list_filter = ('project', 'team_lead', 'created_at')
    search_fields = (
        'project__project_id',
        'team_lead__fullname',
        'work_details'
    )
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    def short_work_details(self, obj):
        return obj.work_details[:50] + ('...' if len(obj.work_details) > 50 else '')
    short_work_details.short_description = 'Work Details'


from django.contrib import admin
from .models import ManagerProjectSubmission

@admin.register(ManagerProjectSubmission)
class ManagerProjectSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        'manager',
        'project',
        'short_details',
        'created_at',
    )
    list_filter = ('manager', 'project', 'created_at')
    search_fields = (
        'manager__username',
        'project__name',
        'details',
    )
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    def short_details(self, obj):
        """
        Shows first 50 chars of submission details for better readability.
        """
        return obj.details[:50] + ('...' if len(obj.details) > 50 else '')
    short_details.short_description = 'Submission Details'






# ==========================
# EMPLOYEE
# ==========================
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin

User = get_user_model()

# 🔥 UNREGISTER DEFAULT USER ADMIN
admin.site.unregister(User)

# ✅ REGISTER CUSTOM USER ADMIN
@admin.register(User)
class UserAdmin(DefaultUserAdmin):
    list_display = (
        'username',
        'email',
        'role',
        'department',
        'phone',
        'is_active',
    )
    list_filter = ('role', 'department', 'is_active')
    search_fields = ('username', 'email')




# ==========================
# TEAM
# ========================== 
@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'lead', 'is_active', 'team_members')   
    search_fields = ('name', 'lead__fullname')
    filter_horizontal = ('members',)  

    def team_members(self, obj):
        """
        Returns all members in the team as a comma-separated string with IDs.
        Format: ID - Name
        """
        return ", ".join([f"{emp.emp_id} - {emp.fullname}" for emp in obj.members.all()]) if obj.members.exists() else "-"
    
    team_members.short_description = 'Team Members'



# ================= TASK =================
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("task_name", "project", "start_date", "end_date", "assigned_to")
    list_filter = ("project", "assigned_to", "status")
    search_fields = ("task_name", "assigned_to__username")



# ================= EMPLOYEE UPDATE =================
@admin.register(EmpUpdate)
class EmpUpdateAdmin(admin.ModelAdmin):
    list_display = ("employee", "team_lead", "date", "time")
    list_filter = ("date", "team_lead")
    search_fields = ("employee__username", "team_lead__username")


# ================= DAILY REPORT =================
from django.contrib import admin
from .models import DailyReport

@admin.register(DailyReport)
class DailyReportAdmin(admin.ModelAdmin):
    list_display = ('user', 'project', 'deadline', 'report_date')  # removed 'status'
    list_filter = ('project', 'deadline', 'report_date')           # removed 'status'
    search_fields = ('user__username', 'project__name', 'tasks_completed')
    ordering = ('-report_date',)
    readonly_fields = ('report_date',)



from .models import Examuser


@admin.register(Examuser)
class ExamuserAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "username",
        "email",
        "phone_no",
        "role",
    )

    list_filter = (
        "role",
    )

    search_fields = (
        "username",
        "email",
        "phone_no",
    )

    ordering = ("id",)

    readonly_fields = ("id",)



from .models import Holiday, HolidayNotification

@admin.register(Holiday)
class HolidayAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'holiday_type', 'branch', 'department', 'status', 'year')
    list_filter = ('holiday_type', 'status', 'branch', 'department', 'year')
    search_fields = ('name', 'description')
    ordering = ('date',)

@admin.register(HolidayNotification)
class HolidayNotificationAdmin(admin.ModelAdmin):
    list_display = ('recipient', 'holiday', 'notif_type', 'is_read', 'created_at')
    list_filter = ('notif_type', 'is_read', 'created_at')
    search_fields = ('recipient__username', 'message')
    ordering = ('-created_at',)

# Automatically added missing models
from .models import ChatRoom, GroupMessage, UserPresence, CompanyAnnouncement, InvoiceItem, ProjectDocument, ProjectComment, ProjectAuditLog, Notification, TaskExtension, TaskReview, TaskAuditLog, LeaveApprovalStep, Attendance, ExamSession, UserAnswer, Result, Payslip, PayslipDownloadLog, SalaryStructure, PayrollAuditLog, AttendanceFinalization, CallSession, ScheduledMeeting, AttendanceCorrection

@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    pass

@admin.register(GroupMessage)
class GroupMessageAdmin(admin.ModelAdmin):
    pass

@admin.register(UserPresence)
class UserPresenceAdmin(admin.ModelAdmin):
    pass

@admin.register(CompanyAnnouncement)
class CompanyAnnouncementAdmin(admin.ModelAdmin):
    pass

@admin.register(InvoiceItem)
class InvoiceItemAdmin(admin.ModelAdmin):
    pass

@admin.register(ProjectDocument)
class ProjectDocumentAdmin(admin.ModelAdmin):
    pass

@admin.register(ProjectComment)
class ProjectCommentAdmin(admin.ModelAdmin):
    pass

@admin.register(ProjectAuditLog)
class ProjectAuditLogAdmin(admin.ModelAdmin):
    pass

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    pass

@admin.register(TaskExtension)
class TaskExtensionAdmin(admin.ModelAdmin):
    pass

@admin.register(TaskReview)
class TaskReviewAdmin(admin.ModelAdmin):
    pass

@admin.register(TaskAuditLog)
class TaskAuditLogAdmin(admin.ModelAdmin):
    pass

@admin.register(LeaveApprovalStep)
class LeaveApprovalStepAdmin(admin.ModelAdmin):
    pass

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'status', 'check_in_time', 'check_out_time', 'total_hours')
    list_filter = ('date', 'status')
    search_fields = ('user__username', 'user__first_name', 'user__last_name', 'user__emp_id')

@admin.register(ExamSession)
class ExamSessionAdmin(admin.ModelAdmin):
    pass

@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    pass

@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    pass

@admin.register(Payslip)
class PayslipAdmin(admin.ModelAdmin):
    pass

@admin.register(PayslipDownloadLog)
class PayslipDownloadLogAdmin(admin.ModelAdmin):
    pass

@admin.register(SalaryStructure)
class SalaryStructureAdmin(admin.ModelAdmin):
    pass

@admin.register(PayrollAuditLog)
class PayrollAuditLogAdmin(admin.ModelAdmin):
    pass

@admin.register(AttendanceFinalization)
class AttendanceFinalizationAdmin(admin.ModelAdmin):
    pass

@admin.register(CallSession)
class CallSessionAdmin(admin.ModelAdmin):
    pass

@admin.register(ScheduledMeeting)
class ScheduledMeetingAdmin(admin.ModelAdmin):
    pass

@admin.register(AttendanceCorrection)
class AttendanceCorrectionAdmin(admin.ModelAdmin):
    pass


# ==========================
# CLIENT LEAD
# ==========================
from .models import ClientLead

@admin.register(ClientLead)
class ClientLeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'service', 'created_at')
    list_filter = ('service', 'created_at')
    search_fields = ('name', 'email', 'phone')
