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

endpoints = {
    'Employee': '/api/dashboard/employee/',
    'HR': '/api/dashboard/hr/',
    'TeamLead': '/api/dashboard/teamlead/',
    'Manager': '/api/dashboard/manager/',
    'MD': '/api/dashboard/md/'
}

for role, url in endpoints.items():
    user = User.objects.filter(role=role).first()
    if not user:
        print(f"No user found for role {role}")
        continue
    client.force_authenticate(user=user)
    try:
        response = client.get(url)
        if response.status_code != 200:
            print(f"{role} Dashboard Failed: {response.status_code}")
            try:
                print(response.json())
            except:
                print("No json. HTML follows:")
                print(response.content[:500])
        else:
            print(f"{role} Dashboard Success")
    except Exception as e:
        import traceback
        print(f"Exception on {role} Dashboard:")
        traceback.print_exc()

