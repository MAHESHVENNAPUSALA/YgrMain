import requests

reg = requests.post('http://127.0.0.1:8000/api/portal/internships/register/', data={
    'name': 'Test',
    'email': 'maheshvennapusala3@gmail.com',  # using the user's email from the screenshot
    'phone': '1234567890',
    'course': 'Course',
    'plan': 'plan',
    'payment_type': 'full'
}).json()
print('REG:', reg)

registration_id = reg.get('registration_id')
if registration_id:
    pay = requests.post(f'http://127.0.0.1:8000/api/portal/internships/register/{registration_id}/create_payment/', json={
        'payment_type': 'full'
    }).json()
    print('PAY:', pay)
