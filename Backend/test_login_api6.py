import os, sys, django
import traceback

sys.path.append(r"e:\ygrpannel0\Backend")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

from django.test import Client

client = Client()
try:
    response = client.get('/api/auth/csrf/')
    print(f"CSRF Status Code: {response.status_code}")
except Exception as e:
    print(f"Error: {e}")

try:
    response = client.post('/api/auth/login/', {'username': 'YGREMP1004', 'password': 'Mahesh@123'}, content_type='application/json')
    if response.status_code == 500:
        import re
        html = response.content.decode('utf-8')
        match = re.search(r'<pre class="exception_value">(.*?)</pre>', html, re.DOTALL)
        if match:
            print("Exception Value:", match.group(1).strip())
        
        match = re.search(r'Exception Value:(.*?)<', html, re.DOTALL)
        if match:
            print("Exception Value alt:", match.group(1).strip())
            
        print("Raw trace lines:")
        for line in html.split('\n'):
            if 'AttributeError' in line or 'Exception' in line or 'session' in line:
                if len(line) < 200 and '<table' not in line:
                    print(line.strip())
    else:
        print(f"Status Code: {response.status_code}")
        print(f"Response Content: {response.content}")
except Exception as e:
    print(f"Error: {e}")
