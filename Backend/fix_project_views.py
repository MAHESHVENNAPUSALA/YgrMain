import sys
import re

file_path = r"E:\ygrpannel0\Backend\hr\project_views.py"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Project filtering by role
text = text.replace("Q(assigned_team__lead=user) | Q(teams__lead=user)", "Q(assigned_teams__lead=user)")
text = text.replace("Q(assigned_team__members=user) | Q(teams__members=user)", "Q(assigned_teams__members=user)")

# 2. ProjectDetailAPIView
text = text.replace("if role == 'TeamLead' and ((project.assigned_team and project.assigned_team.lead == user) or project.teams.filter(lead=user).exists()):", "if role == 'TeamLead' and project.assigned_teams.filter(lead=user).exists():")
text = text.replace("if role == 'Employee' and ((project.assigned_team and project.assigned_team.members.filter(id=user.id).exists()) or project.teams.filter(members=user).exists()):", "if role == 'Employee' and project.assigned_teams.filter(members=user).exists():")

# 3. ProjectDashboardAPIView
# Wait, let's fix assigned_team in assigned_team_ids logic
text = text.replace("assigned_team_ids = projects.exclude(assigned_team=None).values_list('assigned_team_id', flat=True)", "assigned_team_ids = []")
text = text.replace("reverse_team_ids = Team.objects.filter(project__in=projects).values_list('id', flat=True)", "reverse_team_ids = Team.objects.filter(projects__in=projects).values_list('id', flat=True)")
text = text.replace("team_project = t.project or Project.objects.filter(assigned_team=t).first()", "team_project = t.projects.first()")
text = text.replace("team_tasks = Task.objects.filter(project=team_project, members__in=t.members.all()).distinct()", "team_tasks = Task.objects.filter(project=team_project, assigned_to__in=t.members.all()).distinct()")

# 4. project.teams.all() -> project.assigned_teams.all()
text = text.replace("project.teams.all()", "project.assigned_teams.all()")
text = text.replace("project.teams.filter(", "project.assigned_teams.filter(")

# 5. TeamDetail and TeamMember views
text = text.replace("project = team.project", "project = team.projects.first()")
text = text.replace("team.project =", "team.projects.set([") # wait, team.project = project in TeamListCreateAPIView

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Partially fixed project_views.py")
