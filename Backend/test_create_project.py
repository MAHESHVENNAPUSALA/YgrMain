import os
import django
import sys

# Setup django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()
client = APIClient(SERVER_NAME='127.0.0.1')

# Force authenticate as MD/HR so we can create project
user = User.objects.filter(role__in=['MD', 'HR']).first()
if not user:
    print("No MD or HR user found.")
    sys.exit(1)

client.force_authenticate(user=user)
url = '/api/projects/'

payload = {
    'name': 'Test Project',
    'description': '',
    'client_name': '',
    'client_contact': '',
    'client': '',
    'project_category': '',
    'priority': 'Medium',
    'start_date': '',
    'end_date': '',
    'estimated_budget': '',
    'technology_stack': '',
    'project_color': '#3b82f6',
    'assigned_manager': ''
}

try:
    response = client.post(url, data=payload, format='multipart')
    print(f"Status: {response.status_code}")
    print(response.json())
except Exception as e:
    import traceback
    traceback.print_exc()
