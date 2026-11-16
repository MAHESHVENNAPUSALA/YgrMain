import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
import django
django.setup()

from decimal import Decimal
from hr.models import SalaryComponent, Payslip, SalaryStructure

print("=== 1. SEEDING SALARY COMPONENTS ===")
components_data = [
    # Earnings
    {'name': 'Basic Salary', 'code': 'BASIC', 'type': 'EARNING', 'calc': 'FLAT', 'tax': True, 'order': 1, 'desc': 'Core taxable component of salary'},
    {'name': 'House Rent Allowance', 'code': 'HRA', 'type': 'EARNING', 'calc': 'PERCENTAGE_BASIC', 'tax': True, 'order': 2, 'desc': 'HRA allowance'},
    {'name': 'Food Allowance', 'code': 'FOOD_ALLOW', 'type': 'EARNING', 'calc': 'FLAT', 'tax': False, 'order': 3, 'desc': 'Monthly meal / food subsidy allowance'},
    {'name': 'Travel Allowance', 'code': 'TRAVEL_ALLOW', 'type': 'EARNING', 'calc': 'FLAT', 'tax': False, 'order': 4, 'desc': 'Commute & travel reimbursement allowance'},
    {'name': 'Transport Allowance', 'code': 'TRANSPORT_ALLOW', 'type': 'EARNING', 'calc': 'FLAT', 'tax': False, 'order': 5, 'desc': 'Transport conveyance allowance'},
    {'name': 'Medical Allowance', 'code': 'MED_ALLOW', 'type': 'EARNING', 'calc': 'FLAT', 'tax': False, 'order': 6, 'desc': 'Medical expense allowance'},
    {'name': 'Special Allowance', 'code': 'SPL_ALLOW', 'type': 'EARNING', 'calc': 'FLAT', 'tax': True, 'order': 7, 'desc': 'Balancing / special executive allowance'},
    {'name': 'Performance Bonus', 'code': 'BONUS', 'type': 'EARNING', 'calc': 'FLAT', 'tax': True, 'order': 8, 'desc': 'Incentive or bonus pay'},
    {'name': 'Other Earnings', 'code': 'OTHER_EARN', 'type': 'EARNING', 'calc': 'FLAT', 'tax': True, 'order': 9, 'desc': 'Miscellaneous earnings'},
    # Deductions
    {'name': 'Employee Provident Fund', 'code': 'EPF', 'type': 'DEDUCTION', 'calc': 'PERCENTAGE_BASIC', 'tax': False, 'order': 20, 'desc': 'Employee 12% PF contribution deduction'},
    {'name': 'Professional Tax', 'code': 'PT', 'type': 'DEDUCTION', 'calc': 'FLAT', 'tax': False, 'order': 21, 'desc': 'State professional tax deduction'},
    {'name': 'Employee ESI', 'code': 'ESI', 'type': 'DEDUCTION', 'calc': 'PERCENTAGE_GROSS', 'tax': False, 'order': 22, 'desc': 'Employee 0.75% ESI deduction'},
    {'name': 'Income Tax / TDS', 'code': 'TDS', 'type': 'DEDUCTION', 'calc': 'FLAT', 'tax': False, 'order': 23, 'desc': 'Tax deducted at source'},
    {'name': 'Loss of Pay (LOP)', 'code': 'LOP', 'type': 'DEDUCTION', 'calc': 'FLAT', 'tax': False, 'order': 24, 'desc': 'Unpaid absence / leave without pay deduction'},
    {'name': 'Loan / Advance Deduction', 'code': 'LOAN_DED', 'type': 'DEDUCTION', 'calc': 'FLAT', 'tax': False, 'order': 25, 'desc': 'Company advance repayment'},
    {'name': 'Other Deductions', 'code': 'OTHER_DED', 'type': 'DEDUCTION', 'calc': 'FLAT', 'tax': False, 'order': 26, 'desc': 'Miscellaneous authorized deductions'},
    # Employer Contributions
    {'name': 'Employer Provident Fund', 'code': 'EMPLOYER_PF', 'type': 'EMPLOYER_CONTRIBUTION', 'calc': 'PERCENTAGE_BASIC', 'tax': False, 'order': 30, 'desc': 'Employer matching 12% EPF contribution (part of CTC, not deducted from take-home)'},
    {'name': 'Employer ESI', 'code': 'EMPLOYER_ESI', 'type': 'EMPLOYER_CONTRIBUTION', 'calc': 'PERCENTAGE_GROSS', 'tax': False, 'order': 31, 'desc': 'Employer 3.25% ESI contribution (part of CTC)'},
]

for d in components_data:
    obj, created = SalaryComponent.objects.update_or_create(
        component_code=d['code'],
        defaults={
            'component_name': d['name'],
            'component_type': d['type'],
            'calculation_type': d['calc'],
            'is_taxable': d['tax'],
            'display_order': d['order'],
            'description': d['desc'],
            'is_active': True,
        }
    )
    status = "Created" if created else "Updated"
    print(f"  {status}: {obj.component_code} -> {obj.component_name} ({obj.component_type})")

print("\n=== 2. BACKFILLING PAYSLIP NUMBERS ===")
existing_numbers = set(Payslip.objects.exclude(payslip_number__isnull=True).exclude(payslip_number='').values_list('payslip_number', flat=True))

updated_slips = 0
for p in Payslip.objects.all():
    changed = False
    if not p.payslip_number:
        emp_code = getattr(p.employee, 'emp_id', None) or f"EMP{p.employee_id}"
        base_num = f"PAY/{p.year}/{p.month:02d}/{emp_code}"
        num = base_num
        counter = 1
        while num in existing_numbers:
            num = f"{base_num}-{counter}"
            counter += 1
        p.payslip_number = num
        existing_numbers.add(num)
        changed = True

    # Link salary structure if available and not set
    if not p.salary_structure_id and hasattr(p.employee, 'salary_structure'):
        p.salary_structure = p.employee.salary_structure
        changed = True

    if changed:
        p.save()
        updated_slips += 1

print(f"  Updated {updated_slips} payslips with unique numbers and structures.")

print("\n=== 3. BACKFILLING SALARY STRUCTURE CTC FIELDS ===")
updated_structs = 0
for s in SalaryStructure.objects.all():
    changed = False
    gross = s.gross_salary
    # If monthly_gross is 0 but earnings exist, update
    if (not s.monthly_gross or s.monthly_gross == 0) and gross > 0:
        s.monthly_gross = gross
        changed = True

    # If monthly_ctc is 0
    if not s.monthly_ctc or s.monthly_ctc == 0:
        # CTC = Gross + Employer PF
        emp_pf = s.employer_pf or (s.pf_amount if s.pf_enabled else Decimal('0'))
        s.monthly_ctc = s.monthly_gross + emp_pf
        s.annual_ctc = s.monthly_ctc * 12
        changed = True

    if changed:
        s.save()
        updated_structs += 1

print(f"  Updated {updated_structs} salary structures.")
print("=== DONE SEEDING & BACKFILLING ===")

