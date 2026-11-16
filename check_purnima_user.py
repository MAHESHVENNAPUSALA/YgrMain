import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
import django
django.setup()

from hr.models import User, SalaryStructure

u = User.objects.get(id=72)
print("User 72:")
print(f"  username: {u.username}")
print(f"  name: {u.first_name} {u.last_name}")
print(f"  emp_id: {u.emp_id}")
print(f"  email: {u.email}")
print(f"  phone: {u.phone}")
print(f"  role: {u.role}")
print(f"  designation: {u.designation}")
print(f"  department: {u.department}")
print(f"  date_of_joining: {u.date_of_joining}")
print(f"  reporting_manager: {u.reporting_manager}")
print(f"  status: {u.status}")
has_struct = hasattr(u, 'salary_structure')
print(f"  has salary_structure: {has_struct}")
if has_struct:
    s = u.salary_structure
    print(f"    gross: {s.monthly_gross}, basic: {s.basic_salary}, hra: {s.hra}")

