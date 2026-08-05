from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views
from . import api_views
from . import project_views
from . import public_views

urlpatterns = [




    path('api/auth/csrf/', api_views.GetCSRFToken.as_view(), name='api_csrf_token'),

    path('api/auth/login/', api_views.LoginAPIView.as_view(), name='api_login'),
    path('api/auth/logout/', api_views.LogoutAPIView.as_view(), name='api_logout'),
    path('api/auth/user/', api_views.CurrentUserAPIView.as_view(), name='api_user'),
    path('api/attendance/status/', api_views.AttendanceStatusAPIView.as_view(), name='api_attendance_status'),
    path('api/attendance/check-in/', api_views.CheckInAPIView.as_view(), name='api_attendance_checkin'),
    path('api/attendance/check-out/', api_views.CheckOutAPIView.as_view(), name='api_attendance_checkout'),
    path('api/attendance/daily/', api_views.DailyRegistryAPIView.as_view(), name='api_attendance_daily'),
    path('api/attendance/monthly/', api_views.MonthlySummaryAPIView.as_view(), name='api_attendance_monthly'),
    path('api/attendance/correction/', api_views.CorrectionSingleAPIView.as_view(), name='api_attendance_correction'),
    path('api/attendance/bulk/', api_views.CorrectionBulkAPIView.as_view(), name='api_attendance_bulk'),
    path('api/attendance/export/', api_views.AttendanceExportAPIView.as_view(), name='api_attendance_export'),
    path('api/attendance/<int:pk>/', api_views.AttendanceDetailAPIView.as_view(), name='api_attendance_detail'),
    path('api/dashboard/employee/', api_views.EmployeeDashboardAPIView.as_view(), name='api_employee_dashboard'),
    path('api/dashboard/hr/', api_views.HRDashboardAPIView.as_view(), name='api_hr_dashboard'),
    path('api/dashboard/teamlead/', api_views.TLDashboardAPIView.as_view(), name='api_tl_dashboard'),
    path('api/dashboard/manager/', api_views.ManagerDashboardAPIView.as_view(), name='api_manager_dashboard'),
    path('api/dashboard/md/', api_views.MDDashboardAPIView.as_view(), name='api_md_dashboard'),
    path('api/my-attendance/', api_views.MyAttendanceAPIView.as_view(), name='api_my_attendance'),
    path('api/attendance/corrections/', api_views.AttendanceCorrectionAPIView.as_view(), name='api_attendance_corrections'),
    path('api/attendance/corrections/<int:pk>/action/', api_views.AttendanceCorrectionActionAPIView.as_view(), name='api_attendance_corrections_action'),
    path('api/attendance/corrections/bulk-action/', api_views.BulkCorrectionActionAPIView.as_view(), name='api_attendance_corrections_bulk_action'),
    path('api/leaves/', api_views.LeaveAPIView.as_view(), name='api_leaves'),
    path('api/leaves/<int:pk>/action/', api_views.LeaveActionAPIView.as_view(), name='api_leaves_action'),
    path('api/holidays/', api_views.HolidayAPIView.as_view(), name='api_holidays'),
    path('api/holidays/<int:pk>/', api_views.HolidayAPIView.as_view(), name='api_holiday_detail'),
    path('api/holidays/<int:pk>/action/', api_views.HolidayActionAPIView.as_view(), name='api_holiday_action'),
    path('api/payslips/', api_views.PayslipAPIView.as_view(), name='api_payslips'),
    path('api/payslips/<int:pk>/', api_views.PayslipDetailAPIView.as_view(), name='api_payslip_detail'),
    path('api/salary-structures/', api_views.SalaryStructureAPIView.as_view(), name='api_salary_structures'),
    path('api/projects/', project_views.ProjectAPIView.as_view(), name='api_projects'),
    path('api/projects/<int:pk>/', project_views.ProjectDetailAPIView.as_view(), name='api_project_detail'),
    path('api/projects/<int:pk>/archive/', project_views.ProjectArchiveAPIView.as_view(), name='api_project_archive'),
    path('api/projects/<int:pk>/transfer/', project_views.ProjectTransferAPIView.as_view(), name='api_project_transfer'),
    path('api/projects/<int:project_id>/teams/', project_views.TeamListCreateAPIView.as_view(), name='api_project_teams'),
    path('api/teams/', project_views.StandaloneTeamListCreateAPIView.as_view(), name='api_standalone_teams'),
    path('api/teams/<int:pk>/', project_views.TeamDetailAPIView.as_view(), name='api_team_detail'),
    path('api/teams/<int:pk>/members/', project_views.TeamMemberAPIView.as_view(), name='api_team_members'),
    path('api/projects/<int:pk>/comments/', project_views.ProjectCommentAPIView.as_view(), name='api_project_comments'),
    path('api/projects/<int:pk>/documents/', project_views.ProjectDocumentAPIView.as_view(), name='api_project_documents'),
    path('api/projects/<int:project_id>/review/', project_views.ProjectReviewAPIView.as_view(), name='api_project_review'),
    path('api/projects/dashboard/', project_views.ProjectDashboardAPIView.as_view(), name='api_project_dashboard'),
    path('api/projects/reports/', project_views.ProjectReportAPIView.as_view(), name='api_project_reports'),
    path('api/notifications/', project_views.NotificationAPIView.as_view(), name='api_notifications'),
    path('api/tasks/', api_views.TaskAPIView.as_view(), name='api_tasks'),
    path('api/tasks/<int:pk>/', api_views.TaskDetailAPIView.as_view(), name='api_task_detail'),
    path('api/tasks/<int:task_id>/review/', api_views.TaskReviewAPIView.as_view(), name='api_task_review'),
    path('api/daily-reports/', api_views.DailyReportAPIView.as_view(), name='api_daily_reports'),
    path('api/profile/', api_views.UserProfileAPIView.as_view(), name='api_user_profile'),
    path('api/hr-settings/', api_views.HRSettingsAPIView.as_view(), name='api_hr_settings'),
    path('api/chatrooms/', api_views.ChatRoomAPIView.as_view(), name='api_chatrooms'),
    path('api/chat-messages/', api_views.ChatMessageAPIView.as_view(), name='api_chat_messages'),
    path('api/group-messages/', api_views.GroupMessageAPIView.as_view(), name='api_group_messages'),
    path('api/calls/', api_views.CallSessionAPIView.as_view(), name='api_calls'),
    path('api/calls/<int:pk>/action/', api_views.CallSessionActionAPIView.as_view(), name='api_call_action'),
    path('api/invoices/', api_views.InvoiceAPIView.as_view(), name='api_invoices'),
    path('api/invoices/<int:pk>/', api_views.InvoiceDetailAPIView.as_view(), name='api_invoice_detail'),
    path('api/invoicing-resources/', api_views.ClientServiceAPIView.as_view(), name='api_invoicing_resources'),
    path('api/clients/', api_views.ClientAPIView.as_view(), name='api_clients'),
    path('api/services/', api_views.ServiceAPIView.as_view(), name='api_services'),
    path('api/services/<int:pk>/', api_views.ServiceDetailAPIView.as_view(), name='api_service_detail'),
    path('api/questions/', api_views.QuestionAPIView.as_view(), name='api_questions'),
    path('api/questions/<int:pk>/', api_views.QuestionDetailAPIView.as_view(), name='api_question_detail'),
    path('api/exams/', api_views.ExamAPIView.as_view(), name='api_exams'),
    path('api/exams/languages/', api_views.ExamLanguagesAPIView.as_view(), name='api_exam_languages'),
    path('api/exams/users/', api_views.ExamUserAPIView.as_view(), name='api_exam_users'),
    path('api/register/', api_views.RegisterAPIView.as_view(), name='api_register'),
    # Unified Chat REST APIs
    path('api/users/', api_views.AllUsersAPIView.as_view(), name='api_users'),
    path('api/users/<int:pk>/', api_views.UserDetailAPIView.as_view(), name='api_user_detail'),
    path('api/chat-history/', api_views.ChatHistoryAPIView.as_view(), name='api_chat_history'),
    path('api/send-message/', api_views.SendChatMessageAPIView.as_view(), name='api_send_message'),
    path('api/toggle-reaction/', api_views.ToggleReactionAPIView.as_view(), name='api_toggle_reaction'),
    path('api/edit-message/', api_views.EditChatMessageAPIView.as_view(), name='api_edit_message'),
    path('api/delete-message/', api_views.DeleteChatMessageAPIView.as_view(), name='api_delete_message'),
    path('api/presence/', api_views.PresenceAPIView.as_view(), name='api_presence'),
    path('api/create-team/', api_views.CreateTeamGroupAPIView.as_view(), name='api_create_team'),
    path('api/forward-message/', api_views.ForwardMessageAPIView.as_view(), name='api_forward_message'),
    path('api/all-chatrooms/', api_views.AllChatRoomsAPIView.as_view(), name='api_all_chatrooms'),
]



# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from django.urls import path
from . import views





if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)