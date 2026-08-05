import re

file_path = r'e:\ygrpannel0\Backend\hr\api_views.py'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('"project_name": p.project_name,', '"project_name": p.name,')
text = text.replace('"project_name": t.project.project_name if t.project else "General",', '"project_name": t.project.name if t.project else "General",')
text = text.replace('"project_name": r.project.project_name if r.project else "General",', '"project_name": r.project.name if r.project else "General",')
text = text.replace('f"{log.action}: {log.project.project_name} (by', 'f"{log.action}: {log.project.name} (by')
text = text.replace("'name': p.project_name,", "'name': p.name,")

# Also fix the upcoming_tasks query to filter by assigned_to instead of project
# Since I reverted to the last git state, the upcoming_tasks uses project__in=projects
upcoming_tasks_orig = """            # Upcoming tasks
            upcoming_tasks = Task.objects.filter(
                project__in=projects,
                status__in=['Pending', 'Submitted']
            ).select_related("project").order_by("end_date")[:5]"""

upcoming_tasks_new = """            # Upcoming tasks
            upcoming_tasks = Task.objects.filter(
                assigned_to__in=members,
                status__in=['Pending', 'Submitted']
            ).select_related("project").order_by("end_date")[:5]"""

text = text.replace(upcoming_tasks_orig, upcoming_tasks_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Patched api_views.py")
