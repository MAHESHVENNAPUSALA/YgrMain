import os, sys, django
import traceback

sys.path.append(r"e:\ygrpannel0\Backend")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

from django.test import Client

client = Client()

try:
    response = client.post('/api/auth/login/', {'username': 'YGREMP1004', 'password': 'Mahesh@123'}, content_type='application/json')
    print(f"Status Code: {response.status_code}")
    print(f"Response Content: {response.content}")
except Exception as e:
    print("Exception occurred:")
    traceback.print_exc()
