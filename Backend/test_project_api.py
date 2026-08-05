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

# Test for Employee
user = User.objects.filter(role='Employee').first()
client.force_authenticate(user=user)
url = '/api/projects/'

try:
    response = client.get(url)
    print(f"Employee GET projects status: {response.status_code}")
    print(response.json())
except Exception as e:
    import traceback
    traceback.print_exc()

# Test for Manager
mgr = User.objects.filter(role='Manager').first()
client.force_authenticate(user=mgr)
try:
    response = client.get(url)
    print(f"Manager GET projects status: {response.status_code}")
    print(response.json())
except Exception as e:
    import traceback
    traceback.print_exc()
