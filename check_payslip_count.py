import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
import django
django.setup()

from hr.models import Payslip

total = Payslip.objects.count()
print(f"Total payslips in DB: {total}")
for p in Payslip.objects.all()[:5]:
    print(f"ID={p.id}, Emp={p.employee.emp_id}, Month={p.month}, Year={p.year}")

