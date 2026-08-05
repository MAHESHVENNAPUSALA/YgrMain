import os

missing_models = ['ChatRoom', 'GroupMessage', 'UserPresence', 'CompanyAnnouncement', 'InvoiceItem', 'ProjectDocument', 'ProjectComment', 'ProjectAuditLog', 'Notification', 'TaskExtension', 'TaskReview', 'TaskAuditLog', 'LeaveApprovalStep', 'Attendance', 'ExamSession', 'UserAnswer', 'Result', 'Payslip', 'PayslipDownloadLog', 'SalaryStructure', 'PayrollAuditLog', 'AttendanceFinalization', 'CallSession', 'ScheduledMeeting', 'AttendanceCorrection']

append_str = "\n# Automatically added missing models\nfrom .models import " + ", ".join(missing_models) + "\n\n"

for model in missing_models:
    append_str += f"@admin.register({model})\nclass {model}Admin(admin.ModelAdmin):\n    pass\n\n"

with open("e:\\ygrpannel0\\Backend\\hr\\admin.py", "a") as f:
    f.write(append_str)

print("Done appending missing models.")
