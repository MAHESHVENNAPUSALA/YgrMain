import os
import sys

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

import django
from decimal import Decimal

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
django.setup()

from rest_framework.test import APIRequestFactory, force_authenticate
from django.utils import timezone
from hr.models import (
    User, SalaryStructure, SalaryHistory, PayrollAuditLog,
    Attendance, AttendanceCorrection, Payslip, Leave
)
from hr.api_views import (
    AllUsersAPIView, UserDetailAPIView,
    SalaryStructureAPIView, SalaryHistoryAPIView,
    CorrectionSingleAPIView, PayslipAPIView, PayslipCalculateAPIView
)

def run_tests():
    factory = APIRequestFactory()
    print("=" * 70)
    print("RUNNING AUTOMATED VERIFICATION FOR YGRMAIN HRMS MODULES")
    print("=" * 70)

    # 1. Setup Test Users
    hr_user, _ = User.objects.get_or_create(
        username='test_hr_user@ygr.com',
        defaults={'email': 'test_hr_user@ygr.com', 'role': 'HR', 'first_name': 'TestHR'}
    )
    hr_user.set_password('Password@123')
    hr_user.role = 'HR'
    hr_user.save()

    emp_user, _ = User.objects.get_or_create(
        username='test_staff_user@ygr.com',
        defaults={'email': 'test_staff_user@ygr.com', 'role': 'Employee', 'first_name': 'TestStaff', 'emp_id': 'YGREMP9999'}
    )
    emp_user.set_password('Password@123')
    emp_user.role = 'Employee'
    emp_user.is_active = True
    emp_user.save()

    print("[SETUP] HR User and Employee User initialized.")

    # -------------------------------------------------------------
    # Test 1: HR edits employee details and verifies persistence
    # -------------------------------------------------------------
    print("\n--- Test 1: HR Edits Employee Details & Persistence ---")
    update_data = {
        'fullname': 'Updated Staff Name',
        'phone': '9876543210',
        'designation': 'Senior Lead Engineer',
        'department': 'python_dev',
        'is_active': True,
        'salary': 75000,
    }
    request = factory.put(f'/api/users/{emp_user.id}/', data=update_data, format='json')
    force_authenticate(request, user=hr_user)
    response = UserDetailAPIView.as_view()(request, pk=emp_user.id)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.data}"

    # Verify persistence from DB
    emp_user.refresh_from_db()
    assert emp_user.first_name == 'Updated', f"Expected 'Updated', got {emp_user.first_name}"
    assert emp_user.last_name == 'Staff Name', f"Expected 'Staff Name', got {emp_user.last_name}"
    assert emp_user.designation == 'Senior Lead Engineer', f"Designation not updated: {emp_user.designation}"
    assert emp_user.phone == '9876543210', f"Phone not updated: {emp_user.phone}"
    print("✓ Passed: Employee details updated and verified in database.")

    # Test Deactivation & Activation
    deactivate_req = factory.put(f'/api/users/{emp_user.id}/', data={'is_active': False}, format='json')
    force_authenticate(deactivate_req, user=hr_user)
    deactivate_res = UserDetailAPIView.as_view()(deactivate_req, pk=emp_user.id)
    assert deactivate_res.status_code == 200
    emp_user.refresh_from_db()
    assert emp_user.is_active is False, "Expected is_active=False"
    print("✓ Passed: Employee deactivation persisted.")

    # Reactivate
    reactivate_req = factory.put(f'/api/users/{emp_user.id}/', data={'is_active': True}, format='json')
    force_authenticate(reactivate_req, user=hr_user)
    UserDetailAPIView.as_view()(reactivate_req, pk=emp_user.id)
    emp_user.refresh_from_db()
    assert emp_user.is_active is True, "Expected is_active=True"
    print("✓ Passed: Employee reactivation persisted.")

    # -------------------------------------------------------------
    # Test 2: HR updates salary components and verifies stored salary history
    # -------------------------------------------------------------
    print("\n--- Test 2: HR Updates Salary & Stored Salary History ---")
    Payslip.objects.filter(employee=emp_user, month=5, year=2026).delete()
    SalaryHistory.objects.filter(employee=emp_user, reason='Annual Merit Hike 2026').delete()
    salary_payload = {
        'employee': emp_user.id,
        'effective_date': '2026-05-01',
        'reason': 'Annual Merit Hike 2026',
        'monthly_gross': '80000.00',
        'basic_salary': '40000.00',
        'hra': '24000.00',
        'transport_allowance': '4000.00',
        'medical_allowance': '2000.00',
        'special_allowance': '10000.00',
        'bonus': '0.00',
        'pf_enabled': True,
        'pf_amount': '4800.00',
        'esi_enabled': True,
        'esi_amount': '600.00',
        'pt_enabled': True,
        'pt_amount': '200.00',
        'tds_amount': '2500.00',
        'other_deductions': '0.00',
    }
    sal_req = factory.post('/api/salary-structures/', data=salary_payload, format='json')
    force_authenticate(sal_req, user=hr_user)
    sal_res = SalaryStructureAPIView.as_view()(sal_req)
    assert sal_res.status_code == 200, f"Expected 200, got {sal_res.status_code}: {sal_res.data}"

    # Verify SalaryHistory record created
    history_record = SalaryHistory.objects.filter(employee=emp_user, reason='Annual Merit Hike 2026').first()
    assert history_record is not None, "SalaryHistory record was not created!"
    assert history_record.gross_salary == Decimal('80000.00'), f"Expected gross 80000, got {history_record.gross_salary}"
    assert history_record.net_salary == Decimal('71900.00'), f"Expected net 71900 (80000 - 8100), got {history_record.net_salary}"
    print(f"✓ Passed: Salary updated. Net Salary ₹{history_record.net_salary} correctly computed and preserved in SalaryHistory.")

    # Verify PayrollAuditLog
    audit = PayrollAuditLog.objects.filter(action='SALARY_REVISION', performed_by=hr_user).first()
    assert audit is not None, "PayrollAuditLog for SALARY_REVISION was not created!"
    print(f"✓ Passed: PayrollAuditLog verified: {audit.details}")

    # -------------------------------------------------------------
    # Test 3: HR marks and corrects attendance and verifies monthly summaries
    # -------------------------------------------------------------
    print("\n--- Test 3: HR Marks and Corrects Attendance ---")
    att_date = '2026-05-10'
    att_payload = {
        'user_id': emp_user.id,
        'date': att_date,
        'status': 'Present',
        'check_in_time': '09:15',
        'check_out_time': '18:45',
        'reason': 'Onboarding training session check-in adjustment',
        'remarks': 'Approved by HR',
    }
    att_req = factory.post('/api/attendance/correction/', data=att_payload, format='json')
    force_authenticate(att_req, user=hr_user)
    att_res = CorrectionSingleAPIView.as_view()(att_req)
    assert att_res.status_code == 200, f"Expected 200, got {att_res.status_code}: {att_res.data}"

    # Verify Attendance record and correction audit
    att_rec = Attendance.objects.filter(user=emp_user, date=att_date).first()
    assert att_rec is not None, "Attendance record not found!"
    assert att_rec.status == 'Present', f"Expected Present, got {att_rec.status}"
    assert att_rec.total_hours == 9.5, f"Expected 9.5 hours, got {att_rec.total_hours}"

    corr_audit = AttendanceCorrection.objects.filter(attendance=att_rec, reason=att_payload['reason']).first()
    assert corr_audit is not None, "AttendanceCorrection audit not found!"
    print(f"✓ Passed: Attendance marked ({att_rec.total_hours} hrs) and audit log captured: {corr_audit.reason}")

    # Test Leave Conflict Validation
    leave_date = '2026-05-15'
    Leave.objects.filter(user=emp_user, from_date=leave_date).delete()
    approved_leave = Leave.objects.create(
        user=emp_user,
        leave_type='Casual',
        from_date=leave_date,
        to_date=leave_date,
        status='Approved',
        reason='Family event'
    )
    conflict_payload = {
        'user_id': emp_user.id,
        'date': leave_date,
        'status': 'Present',
        'check_in_time': '09:30',
        'check_out_time': '18:30',
        'reason': 'Employee reported to work despite leave',
    }
    conflict_req = factory.post('/api/attendance/correction/', data=conflict_payload, format='json')
    force_authenticate(conflict_req, user=hr_user)
    conflict_res = CorrectionSingleAPIView.as_view()(conflict_req)
    assert conflict_res.status_code == 409, f"Expected 409 Conflict, got {conflict_res.status_code}"
    assert conflict_res.data.get('has_leave_conflict') is True, "Expected has_leave_conflict=True"
    print("✓ Passed: Leave conflict detected and 409 Conflict returned as expected.")

    # -------------------------------------------------------------
    # Test 4: Payroll uses the correct approved salary and attendance data
    # -------------------------------------------------------------
    print("\n--- Test 4: Payroll Data Calculation ---")
    calc_req = factory.get(f'/api/payslips/calculate/?employee_id={emp_user.id}&month=5&year=2026')
    force_authenticate(calc_req, user=hr_user)
    calc_res = PayslipCalculateAPIView.as_view()(calc_req)
    assert calc_res.status_code == 200, f"Expected 200, got {calc_res.status_code}: {calc_res.data}"
    calc_data = calc_res.data

    expected_prorate = Decimal(str(calc_data['paid_days'])) / Decimal(str(calc_data['days_in_month']))
    expected_basic = round(Decimal('40000.00') * expected_prorate, 2)
    assert Decimal(str(calc_data['basic_salary'])) == expected_basic, f"Expected basic {expected_basic}, got {calc_data['basic_salary']}"
    assert Decimal(str(calc_data['loss_of_pay'])) > Decimal('0.00'), "Expected loss of pay for absent days in month"
    print(f"✓ Passed: Payroll calculation verified with attendance: Paid Days {calc_data['paid_days']}/{calc_data['days_in_month']}, Prorated Basic ₹{calc_data['basic_salary']}, Loss of Pay ₹{calc_data['loss_of_pay']}")

    # -------------------------------------------------------------
    # Test 5: Payslip Generation Displays Correct Earnings, Deductions & Net Salary
    # -------------------------------------------------------------
    print("\n--- Test 5: Payslip Generation & Net Salary Integrity ---")
    Payslip.objects.filter(employee=emp_user, month=5, year=2026).delete()
    payslip_payload = {
        'employee': emp_user.id,
        'month': 5,
        'year': 2026,
        'basic_salary': '40000.00',
        'hra': '24000.00',
        'transport_allowance': '4000.00',
        'medical_allowance': '2000.00',
        'special_allowance': '10000.00',
        'bonus': '0.00',
        'pf_deduction': '4800.00',
        'esi_deduction': '600.00',
        'professional_tax': '200.00',
        'tds': '2500.00',
        'loan_deduction': '0.00',
        'other_deductions': '0.00',
        'working_days': 26,
        'days_present': 26,
        'days_absent': 0,
        'leaves_taken': 0,
        'status': 'Approved',
        'is_published': True,
    }
    slip_req = factory.post('/api/payslips/', data=payslip_payload, format='json')
    force_authenticate(slip_req, user=hr_user)
    slip_res = PayslipAPIView.as_view()(slip_req)
    assert slip_res.status_code == 201, f"Expected 201, got {slip_res.status_code}: {slip_res.data}"

    slip_id = slip_res.data['id']
    payslip_obj = Payslip.objects.get(id=slip_id)
    assert payslip_obj.gross_salary == Decimal('80000.00'), f"Gross mismatch: {payslip_obj.gross_salary}"
    assert payslip_obj.total_deductions == Decimal('8100.00'), f"Deduction mismatch: {payslip_obj.total_deductions}"
    assert payslip_obj.net_salary == Decimal('71900.00'), f"Net mismatch: {payslip_obj.net_salary}"
    print(f"✓ Passed: Generated payslip verified: Gross ₹{payslip_obj.gross_salary}, Deductions ₹{payslip_obj.total_deductions}, Net ₹{payslip_obj.net_salary}")

    # Verify Historical Payslip Protection
    # Trying to modify salary structure for May 2026 when May 2026 payslip is already Approved
    mod_sal_req = factory.post('/api/salary-structures/', data={
        'employee': emp_user.id,
        'effective_date': '2026-05-15',
        'monthly_gross': '90000.00',
        'basic_salary': '45000.00',
        'hra': '27000.00',
        'force_revision': False,
    }, format='json')
    force_authenticate(mod_sal_req, user=hr_user)
    mod_sal_res = SalaryStructureAPIView.as_view()(mod_sal_req)
    assert mod_sal_res.status_code == 409, f"Expected 409 Conflict due to approved payslip, got {mod_sal_res.status_code}"
    print("✓ Passed: Historical payslip protection enforced: Modifying structure for approved period returned 409 Conflict.")

    # -------------------------------------------------------------
    # Test 6: Unauthorized Users Cannot Edit Salary or Attendance
    # -------------------------------------------------------------
    print("\n--- Test 6: Backend Permission Enforcement ---")
    # Employee tries to edit their own salary structure
    unauth_sal_req = factory.post('/api/salary-structures/', data={'employee': emp_user.id, 'monthly_gross': '150000.00'}, format='json')
    force_authenticate(unauth_sal_req, user=emp_user)
    unauth_sal_res = SalaryStructureAPIView.as_view()(unauth_sal_req)
    assert unauth_sal_res.status_code == 403, f"Expected 403 Forbidden, got {unauth_sal_res.status_code}"
    print("✓ Passed: Employee blocked from modifying salary structure (403 Forbidden).")

    # Employee tries to mark/correct attendance
    unauth_att_req = factory.post('/api/attendance/correction/', data={'user_id': emp_user.id, 'status': 'Present', 'reason': 'Hack'}, format='json')
    force_authenticate(unauth_att_req, user=emp_user)
    unauth_att_res = CorrectionSingleAPIView.as_view()(unauth_att_req)
    assert unauth_att_res.status_code == 403, f"Expected 403 Forbidden, got {unauth_att_res.status_code}"
    print("✓ Passed: Employee blocked from marking/correcting attendance (403 Forbidden).")

    # Employee tries to edit another user's profile
    unauth_user_req = factory.put(f'/api/users/{hr_user.id}/', data={'first_name': 'Hacked'}, format='json')
    force_authenticate(unauth_user_req, user=emp_user)
    unauth_user_res = UserDetailAPIView.as_view()(unauth_user_req, pk=hr_user.id)
    assert unauth_user_res.status_code == 403, f"Expected 403 Forbidden, got {unauth_user_res.status_code}"
    print("✓ Passed: Employee blocked from updating employee records (403 Forbidden).")

    print("\n" + "=" * 70)
    print("ALL 6 CORE MODULE WORKFLOWS PASSED AUTOMATED VERIFICATION WITH 100% SUCCESS!")
    print("=" * 70)

if __name__ == '__main__':
    run_tests()
