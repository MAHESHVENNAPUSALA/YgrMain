import sys

file_path = r"E:\ygrpannel0\Backend\hr\api_views.py"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Replace assigned_employee -> assigned_to
text = text.replace("assigned_employee=", "assigned_to=")
text = text.replace("assigned_employee_id=", "assigned_to_id=")
text = text.replace("assigned_employee_id", "assigned_to_id")
text = text.replace("assigned_employee", "assigned_to")

# actual_completion_date -> actual_submission_time
text = text.replace("actual_completion_date", "actual_submission_time")

# Safely replace due_date with end_date for Task occurrences only
# 1. Employee Dashboard (lines around 327-330)
text = text.replace("if t.actual_submission_time and t.due_date:", "if t.actual_submission_time and t.end_date:")
text = text.replace("if completion_local > t.due_date:", "if completion_local > t.end_date:")

# 2. Task API (order_by)
text = text.replace("order_by('-due_date')", "order_by('-end_date')")

# 3. Task Post (lines around 2406, 2432)
# We can just replace request.data.get('due_date') with request.data.get('end_date') inside Task context, but wait, the frontend might send 'end_date' or 'due_date'. The serializer in `serializers.py` expects 'end_date' since we just mapped it to the model which has 'end_date'. Let's replace 'due_date' with 'end_date' here.
text = text.replace("due_date = request.data.get('due_date')", "end_date = request.data.get('end_date')")
text = text.replace("due_date=due_date or timezone.localdate(),", "end_date=end_date or timezone.localdate(),")
text = text.replace("if task.due_date:", "if task.end_date:")
text = text.replace("due_dt = datetime.datetime.combine(task.due_date, t)", "due_dt = datetime.datetime.combine(task.end_date, t)")

# Let's write the modified text
with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Replacements done safely in api_views.py")
