import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
import django
django.setup()

from hr.models import Payslip
from hr.payslip_utils import clean_employee_name, get_clean_designation, get_clean_department

# Check payslip create/edit flows - what names get stored
print("=" * 60)
print("CHECKING PAYSLIP NAME STORAGE & CLEAN DISPLAY")
print("=" * 60)
for pid in [131, 132, 105, 11]:
    try:
        p = Payslip.objects.get(id=pid)
        emp = p.employee
        stored_name = p.employee_name
        clean_name = clean_employee_name(emp, stored_name)
        desig = get_clean_designation(p)
        dept = get_clean_department(p)
        print(f"\nPayslip {pid} ({emp.emp_id}):")
        print(f"  stored employee_name = {stored_name!r}")
        print(f"  clean_employee_name  = {clean_name!r}")
        print(f"  first_name={emp.first_name!r}, last_name={emp.last_name!r}")
        print(f"  designation_clean    = {desig!r}")
        print(f"  department_clean     = {dept!r}")
    except Exception as e:
        print(f"\nPayslip {pid}: ERROR - {e}")

print("\n" + "=" * 60)

