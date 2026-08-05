import sys

file_path = r"E:\ygrpannel0\Backend\hr\api_views.py"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Fix tl_reviewer bug
text = text.replace("TaskReview.objects.filter(tl_reviewer=user).count()", "TaskReview.objects.filter(tl_reviewed_by=user).count()")

# Fix teams field bug
text = text.replace("_Q(assigned_teams=team) | _Q(teams=team)", "_Q(assigned_teams=team)")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Fixed TLDashboardAPIView bugs")
