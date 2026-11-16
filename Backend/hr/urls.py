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
    path('api/dashboard/client/', api_views.ClientDashboardAPIView.as_view(), name='api_client_dashboard'),
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
    path('api/payslips/calculate/', api_views.PayslipCalculateAPIView.as_view(), name='api_payslip_calculate'),
    path('api/payslips/<int:pk>/', api_views.PayslipDetailAPIView.as_view(), name='api_payslip_detail'),
    path('api/payslips/<int:pk>/download/', api_views.PayslipDownloadAPIView.as_view(), name='api_payslip_download'),
    path('api/payslips/<int:pk>/action/', api_views.PayslipActionAPIView.as_view(), name='api_payslip_action'),
    path('api/payslips/<int:pk>/send-email/', api_views.PayslipEmailAPIView.as_view(), name='api_payslip_send_email'),
    path('api/salary-structures/', api_views.SalaryStructureAPIView.as_view(), name='api_salary_structures'),
    path('api/salary-structures/history/', api_views.SalaryHistoryAPIView.as_view(), name='api_salary_structures_history'),
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
    path('api/tasks/<int:pk>/client-review/', api_views.ClientTaskReviewAPIView.as_view(), name='api_task_client_review'),
    path('api/tasks/<int:pk>/my-client-review/', api_views.EmployeeClientReviewAPIView.as_view(), name='api_task_employee_client_review'),
    path('api/tasks/<int:task_id>/review/', api_views.TaskReviewAPIView.as_view(), name='api_task_review'),
    path('api/tasks/<int:task_id>/extension/', api_views.TaskExtensionRequestAPIView.as_view(), name='api_task_extension'),
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
    path('api/exams/candidate-login/', api_views.CandidateExamLoginAPIView.as_view(), name='api_candidate_exam_login'),
    path('api/exams/candidate-questions/', api_views.CandidateExamQuestionsAPIView.as_view(), name='api_candidate_exam_questions'),
    path('api/exams/candidate-submit/', api_views.CandidateExamSubmitAPIView.as_view(), name='api_candidate_exam_submit'),
    path('api/register/', api_views.RegisterAPIView.as_view(), name='api_register'),
    # Unified Chat REST APIs
    path('api/users/', api_views.AllUsersAPIView.as_view(), name='api_users'),
    path('api/users/<int:pk>/', api_views.UserDetailAPIView.as_view(), name='api_user_detail'),
    path('api/users/<int:pk>/verify-document/', api_views.VerifyUserDocumentAPIView.as_view(), name='api_verify_user_document'),
    path('api/chat-history/', api_views.ChatHistoryAPIView.as_view(), name='api_chat_history'),
    path('api/send-message/', api_views.SendChatMessageAPIView.as_view(), name='api_send_message'),
    path('api/toggle-reaction/', api_views.ToggleReactionAPIView.as_view(), name='api_toggle_reaction'),
    path('api/edit-message/', api_views.EditChatMessageAPIView.as_view(), name='api_edit_message'),
    path('api/delete-message/', api_views.DeleteChatMessageAPIView.as_view(), name='api_delete_message'),
    path('api/presence/', api_views.PresenceAPIView.as_view(), name='api_presence'),
    path('api/create-team/', api_views.CreateTeamGroupAPIView.as_view(), name='api_create_team'),
    path('api/forward-message/', api_views.ForwardMessageAPIView.as_view(), name='api_forward_message'),
    path('api/all-chatrooms/', api_views.AllChatRoomsAPIView.as_view(), name='api_all_chatrooms'),

    # Employee Documents (Offer Letters, Joining Letters, Relieving Letters, etc.)
    path('api/employee-documents/', api_views.EmployeeDocumentAPIView.as_view(), name='api_employee_documents'),
    path('api/employee-documents/<int:pk>/', api_views.EmployeeDocumentDetailAPIView.as_view(), name='api_employee_document_detail'),
    path('api/employee-documents/<int:pk>/send-email/', api_views.EmployeeDocumentEmailAPIView.as_view(), name='api_employee_document_send_email'),
    path('api/email-history/', api_views.DocumentEmailHistoryAPIView.as_view(), name='api_email_history'),

    # Recruitment Candidates
    path('api/candidates/', api_views.RecruitmentCandidatesAPIView.as_view(), name='api_candidates'),

    # Offer Letters Management
    path('api/offer-policy-versions/', api_views.OfferLetterPolicyAPIView.as_view(), name='api_offer_policy_versions'),
    path('api/offer-policy-versions/<int:pk>/', api_views.OfferLetterPolicyDetailAPIView.as_view(), name='api_offer_policy_version_detail'),
    path('api/offer-policy-versions/<int:pk>/publish/', api_views.OfferLetterPolicyPublishAPIView.as_view(), name='api_offer_policy_version_publish'),
    path('api/offer-letters/', api_views.OfferLetterAPIView.as_view(), name='api_offer_letters'),
    path('api/offer-letters/<int:pk>/', api_views.OfferLetterDetailAPIView.as_view(), name='api_offer_letter_detail'),
    path('api/offer-letters/<int:pk>/action/', api_views.OfferLetterActionAPIView.as_view(), name='api_offer_letter_action'),
    path('api/offer-letters/<int:pk>/audit/', api_views.OfferLetterAuditAPIView.as_view(), name='api_offer_letter_audit'),
    path('api/offer-letters/<int:pk>/preview/', api_views.OfferLetterPreviewAPIView.as_view(), name='api_offer_letter_preview'),
    path('api/offer-letters/preview-draft/', api_views.OfferLetterPreviewAPIView.as_view(), name='api_offer_letter_preview_draft'),
    path('api/offer-letters/<int:pk>/download/', api_views.OfferLetterDownloadAPIView.as_view(), name='api_offer_letter_download'),
    path('api/offer-letters/<int:pk>/send-email/', api_views.OfferLetterSendEmailAPIView.as_view(), name='api_offer_letter_send_email'),

    # Joining Letters Management
    path('api/joining-letters/', api_views.JoiningLetterAPIView.as_view(), name='api_joining_letters'),
    path('api/joining-letters/<int:pk>/', api_views.JoiningLetterDetailAPIView.as_view(), name='api_joining_letter_detail'),
    path('api/joining-letters/<int:pk>/action/', api_views.JoiningLetterActionAPIView.as_view(), name='api_joining_letter_action'),
    path('api/joining-letters/<int:pk>/preview/', api_views.JoiningLetterPreviewAPIView.as_view(), name='api_joining_letter_preview'),
    path('api/joining-letters/<int:pk>/download/', api_views.JoiningLetterDownloadAPIView.as_view(), name='api_joining_letter_download'),
    path('api/joining-letters/<int:pk>/send-email/', api_views.JoiningLetterSendEmailAPIView.as_view(), name='api_joining_letter_send_email'),

    # Relieving Letters Management
    path('api/relieving-letters/', api_views.RelievingLetterAPIView.as_view(), name='api_relieving_letters'),
    path('api/relieving-letters/<int:pk>/', api_views.RelievingLetterDetailAPIView.as_view(), name='api_relieving_letter_detail'),
    path('api/relieving-letters/<int:pk>/action/', api_views.RelievingLetterActionAPIView.as_view(), name='api_relieving_letter_action'),
    path('api/relieving-letters/<int:pk>/preview/', api_views.RelievingLetterPreviewAPIView.as_view(), name='api_relieving_letter_preview'),
    path('api/relieving-letters/<int:pk>/download/', api_views.RelievingLetterDownloadAPIView.as_view(), name='api_relieving_letter_download'),
    path('api/relieving-letters/<int:pk>/send-email/', api_views.RelievingLetterSendEmailAPIView.as_view(), name='api_relieving_letter_send_email'),
    path('api/relieving-letters/<int:pk>/audit/', api_views.RelievingLetterAuditAPIView.as_view(), name='api_relieving_letter_audit'),

    # Salary Components Configuration
    path('api/salary-components/', api_views.SalaryComponentAPIView.as_view(), name='api_salary_components'),
    path('api/salary-components/<int:pk>/', api_views.SalaryComponentDetailAPIView.as_view(), name='api_salary_component_detail'),
]




# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from django.urls import path
from . import views





if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)