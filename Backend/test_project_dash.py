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

# Test as MD (admin)
user = User.objects.filter(role='MD').first()
client.force_authenticate(user=user)
url = '/api/projects/dashboard/'

try:
    response = client.get(url)
    if response.status_code != 200:
        print(f"ProjectDashboard Failed: {response.status_code}")
        try:
            print(response.json())
        except:
            print("HTML content")
    else:
        print(f"ProjectDashboard Success")
except Exception as e:
    import traceback
    print(f"Exception on ProjectDashboard:")
    traceback.print_exc()
