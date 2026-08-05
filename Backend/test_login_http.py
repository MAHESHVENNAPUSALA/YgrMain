import requests
import json

url = "http://localhost:8000/api/auth/login/"
payload = {
    "username": "YGREMP1004",
    "password": "Mahesh@123"
}
headers = {
    "Content-Type": "application/json"
}

try:
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Request failed: {e}")
