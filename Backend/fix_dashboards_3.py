import sys

file_path = r"E:\ygrpannel0\Backend\hr\api_views.py"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Fix 3: TaskReview status -> review_status
text = text.replace("TaskReview.objects.filter(task__assigned_to=user, status='Finalized')", "TaskReview.objects.filter(task__assigned_to=user, review_status='Finalized')")
text = text.replace("TaskReview.objects.filter(status='Pending MD')", "TaskReview.objects.filter(review_status='Pending MD')")
text = text.replace("TaskReview.objects.filter(status='Finalized')", "TaskReview.objects.filter(review_status='Finalized')")

# Fix 4: TaskReview final_percentage -> final_score
text = text.replace("Avg('final_percentage'))['final_percentage__avg']", "Avg('final_score'))['final_score__avg']")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Fixed TaskReview field errors")
