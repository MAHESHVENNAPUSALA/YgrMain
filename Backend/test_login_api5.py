import os, sys, django
from bs4 import BeautifulSoup

sys.path.append(r"e:\ygrpannel0\Backend")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

from django.test import Client

client = Client()

try:
    response = client.post('/api/auth/login/', {'username': 'YGREMP1004', 'password': 'Mahesh@123'}, content_type='application/json')
    if response.status_code == 500:
        soup = BeautifulSoup(response.content, 'html.parser')
        print(soup.select_one('.exception_value').text.strip())
        print("Traceback:")
        for li in soup.select('.traceback li.frame'):
            print(li.text.strip().replace('\n', ' '))
    else:
        print(f"Status Code: {response.status_code}")
        print(f"Response Content: {response.content}")
except Exception as e:
    print(f"Error: {e}")
