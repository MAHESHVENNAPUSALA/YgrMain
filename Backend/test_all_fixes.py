import os
import django
import sys

# Setup django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

from django.test import Client
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from hr.models import Team, Project, Task, DailyReport

User = get_user_model()
client = APIClient(SERVER_NAME='127.0.0.1')

# 1. Test GET projects as Employee
emp = User.objects.filter(role='Employee').first()
if not emp:
    print("No employee found in db!")
    sys.exit(1)

client.force_authenticate(user=emp)
res = client.get('/api/projects/')
print("Employee projects GET status:", res.status_code)
# Ensure we got projects (if user is in a team) or at least 200 OK
if res.status_code == 200:
    print("Employee projects count:", len(res.json()))
else:
    print(res.json())

# Find a project and Team for the TL to test task assignment
tl = User.objects.filter(role='TeamLead').first()
if not tl:
    print("No TeamLead found in db!")
    sys.exit(1)

# Find team led by TL
team = Team.objects.filter(lead=tl).first()
if not team:
    print("No Team found led by TL, creating one...")
    team = Team.objects.create(name="Test Team", lead=tl)
    team.members.add(emp)

# Find project assigned to this team
project = Project.objects.filter(assigned_teams=team).first()
if not project:
    print("No Project assigned to team, creating one...")
    project = Project.objects.create(project_id="TESTPRJ", name="Test Project")
    project.assigned_teams.add(team)

# 2. Test POST /api/tasks/ as TeamLead
client.force_authenticate(user=tl)
task_data = {
    "task_name": "Test Assigned Task",
    "description": "Test description details",
    "project": project.id,
    "start_date": "2026-07-10",
    "end_date": "2026-07-15",
    "members": [emp.id]
}
res = client.post('/api/tasks/', task_data, format='json')
print("TeamLead task assignment POST status:", res.status_code)
if res.status_code == 201:
    print("Task assigned successfully:", res.json())
else:
    print(res.json())

# 3. Test GET /api/tasks/ as Employee
client.force_authenticate(user=emp)
res = client.get('/api/tasks/')
print("Employee tasks GET status:", res.status_code)
if res.status_code == 200:
    tasks_list = res.json()
    print("Employee tasks count:", len(tasks_list))
    if tasks_list:
        print("First task members:", tasks_list[0].get('members'))
else:
    print(res.json())

# 4. Test Manager GET daily reports
mgr = User.objects.filter(role='Manager').first()
if not mgr:
    print("No Manager found in db!")
else:
    client.force_authenticate(user=mgr)
    res = client.get('/api/daily-reports/')
    print("Manager daily reports GET status:", res.status_code)
    if res.status_code == 200:
        print("Manager daily reports count:", len(res.json()))
    else:
        print(res.json())
