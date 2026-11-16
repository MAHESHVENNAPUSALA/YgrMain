import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
import django
django.setup()

from hr.models import Payslip
from hr.serializers import PayslipSerializer

print("=" * 60)
print("SERIALIZER NAME/DEPT/DESIG VERIFICATION")
print("=" * 60)
for pid in [131, 132, 105, 11]:
    try:
        p = Payslip.objects.get(id=pid)
        d = PayslipSerializer(p).data
        name = d.get('employee_name','N/A')
        desig = d.get('designation','N/A')
        dept = d.get('department','N/A')
        print(f"\nPayslip {pid} ({p.employee.emp_id}):")
        print(f"  name       = {name!r}")
        print(f"  designation= {desig!r}")
        print(f"  department = {dept!r}")
    except Exception as e:
        print(f"\nPayslip {pid}: ERROR - {e}")

print("\n" + "=" * 60)

