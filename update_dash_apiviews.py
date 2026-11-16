api_views_path = r"D:\YgrMain\YgrMain\Backend\hr\api_views.py"

with open(api_views_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. In HRDashboardAPIView, add relieving_stats and payroll_workflow_stats
target_hr_return = '''            "payroll_stats": {
                "salary_budget": salary_budget,
                "pf_contributions": pf_total,
                "tds_withheld": tds_total,
                "pending_runs": 0,
            },'''

replacement_hr_return = '''            "payroll_stats": {
                "salary_budget": salary_budget,
                "pf_contributions": pf_total,
                "tds_withheld": tds_total,
                "pending_runs": Payslip.objects.filter(status='Pending Approval').count(),
            },
            "relieving_stats": {
                "pending_approval": RelievingLetter.objects.filter(status='Pending Approval').count(),
                "approved": RelievingLetter.objects.filter(status='Approved').count(),
                "issued": RelievingLetter.objects.filter(status='Issued').count(),
                "total": RelievingLetter.objects.exclude(status='Revoked').count(),
            },
            "payroll_workflow_stats": {
                "draft": Payslip.objects.filter(status='Draft').count(),
                "pending_approval": Payslip.objects.filter(status='Pending Approval').count(),
                "approved": Payslip.objects.filter(status='Approved').count(),
                "paid": Payslip.objects.filter(status='Paid').count(),
            },'''

if target_hr_return in text:
    text = text.replace(target_hr_return, replacement_hr_return)
    print("Updated HRDashboardAPIView response")
else:
    print("WARNING: target_hr_return not found!")

# 2. In MDDashboardAPIView, calculate payroll summary and pending relieving letters
target_md_calc = """        # Payroll stats
        salary_budget = 0
        pf_total = 0
        tds_total = 0"""

replacement_md_calc = """        # Monthly Payroll Summary for MD
        current_month_slips = Payslip.objects.filter(month=current_month, year=current_year)
        payroll_gross_total = sum(p.gross_salary for p in current_month_slips)
        payroll_deductions_total = sum(p.total_deductions for p in current_month_slips)
        payroll_net_total = sum(p.net_salary for p in current_month_slips)
        payroll_pending_approval_count = Payslip.objects.filter(status='Pending Approval').count()

        # Relieving Letters Pending MD Approval
        pending_relieving_qs = RelievingLetter.objects.filter(status='Pending Approval').select_related('employee')
        pending_relieving_list = [{
            'id': rl.id,
            'employee_name': rl.employee_name,
            'employee_id': rl.employee_id_number,
            'designation': rl.designation,
            'department': rl.department,
            'last_working_day': str(rl.last_working_day),
            'reference_number': rl.reference_number,
            'created_at': rl.created_at.strftime('%d %b %Y') if rl.created_at else '',
        } for rl in pending_relieving_qs]

        # Payroll stats
        salary_budget = 0
        pf_total = 0
        tds_total = 0"""

if target_md_calc in text:
    text = text.replace(target_md_calc, replacement_md_calc)
    print("Updated MDDashboardAPIView calculations")
else:
    print("WARNING: target_md_calc not found!")

target_md_return = '''            "payroll_stats": {
                "salary_budget": salary_budget,
                "pf_contributions": pf_total,
                "tds_withheld": tds_total,
            },'''

replacement_md_return = '''            "payroll_stats": {
                "salary_budget": salary_budget,
                "pf_contributions": pf_total,
                "tds_withheld": tds_total,
            },
            "monthly_payroll_summary": {
                "gross_total": float(payroll_gross_total),
                "deductions_total": float(payroll_deductions_total),
                "net_total": float(payroll_net_total),
                "pending_approval_count": payroll_pending_approval_count,
            },
            "relieving_letters_pending": pending_relieving_list,
            "relieving_letters_pending_count": len(pending_relieving_list),'''

if target_md_return in text:
    text = text.replace(target_md_return, replacement_md_return)
    print("Updated MDDashboardAPIView response")
else:
    print("WARNING: target_md_return not found!")

with open(api_views_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Saved dashboard updates to api_views.py")

