import os
import django
import sys

# Setup django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

from django.test import Client
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()
client = APIClient(SERVER_NAME='127.0.0.1')

user = User.objects.filter(role='Employee').first()
client.force_authenticate(user=user)

endpoints = {
    'Tasks': '/api/tasks/',
    'Daily Reports': '/api/daily-reports/',
    'Project Reports': '/api/projects/reports/'
}

for name, url in endpoints.items():
    try:
        response = client.get(url)
        if response.status_code != 200:
            print(f"{name} Failed: {response.status_code}")
            try:
                print(response.json())
            except:
                pass
        else:
            print(f"{name} Success")
    except Exception as e:
        import traceback
        print(f"Exception on {name}:")
        traceback.print_exc()

# Also test as Manager for Project Reports
mgr = User.objects.filter(role='Manager').first()
client.force_authenticate(user=mgr)
try:
    response = client.get('/api/projects/reports/')
    print(f"Manager Project Reports: {response.status_code}")
except Exception as e:
    import traceback
    traceback.print_exc()
