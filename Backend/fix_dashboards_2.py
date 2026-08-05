import sys

file_path = r"E:\ygrpannel0\Backend\hr\api_views.py"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Fix 1: Team project field -> projects
text = text.replace("Team.objects.filter(project__in=", "Team.objects.filter(projects__in=")

# Fix 2: Import TaskReview in MDDashboardAPIView (or just at the top of the file)
# The easiest way is to add it to the top imports. Let's find the main from .models import ...
models_import_old = "from .models import Attendance, Team, Task, Payslip, DailyReport, Holiday, Project, Leave, AttendanceCorrection, SalaryStructure, HRSettings, ChatMessage, ChatRoom, GroupMessage, CallSession, Client, Service, Invoice, InvoiceItem, Question, Examuser, ExamSession, Result, UserAnswer, ProjectDocument, ProjectComment, ProjectAuditLog, Notification"
models_import_new = models_import_old + ", TaskReview"
text = text.replace(models_import_old, models_import_new)

# Let's also check if there's any other project__in usage that should be projects__in
# Wait, project__in is also used for Task.objects.filter(project__in=...), which is correct.
# The only one that broke was Team.objects.filter(project__in...) which we just fixed.

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Fixed remaining Dashboard API View bugs")
