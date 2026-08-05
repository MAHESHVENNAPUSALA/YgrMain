import re

file_path = r"E:\ygrpannel0\Backend\hr\project_views.py"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Fix Team creation in TeamListCreateAPIView
old_team_create = """        team = Team.objects.create(
            name=name,
            project=project,
            lead=lead,
            department=department,
            description=description,
            max_size=max_size
        )"""

new_team_create = """        team = Team.objects.create(
            name=name,
            lead=lead,
            department=department,
            description=description,
            max_size=max_size
        )
        project.assigned_teams.add(team)"""
text = text.replace(old_team_create, new_team_create)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Fixed Team creation logic")
