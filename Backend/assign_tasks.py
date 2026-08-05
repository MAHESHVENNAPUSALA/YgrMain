import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

from hr.models import Task, User

emp = User.objects.filter(role='Employee').first()
tl = User.objects.filter(role='TeamLead').first()
count = 0

for t in Task.objects.filter(assigned_to__isnull=True):
    if count % 2 == 0:
        t.assigned_to = emp
    else:
        t.assigned_to = tl
    t.save()
    count += 1

print(f"Assigned {count} tasks to test users.")
