with open('Backend/main/email_service.py', 'r', encoding='utf-8') as f:
    c = f.read()

target = """            ctx = HREmailService._build_context()
            full_context = {
                **ctx,
                'employee_name': emp.get_full_name() or emp.username,
                'employee_emp_id': emp.emp_id or '',
                'designation': emp.designation or 'Staff',
                'month_name': month_name,
                'year': payslip.year,
                'gross_salary': str(payslip.gross_salary or '0.00'),
                'total_deductions': str(payslip.total_deductions or '0.00'),
                'net_salary': str(payslip.net_salary or '0.00'),
            }"""

replacement = """            from hr.payslip_utils import clean_employee_name, get_clean_designation
            emp_clean_name = clean_employee_name(emp, payslip.employee_name)
            desig_clean = get_clean_designation(payslip)

            ctx = HREmailService._build_context()
            full_context = {
                **ctx,
                'employee_name': emp_clean_name,
                'employee_emp_id': emp.emp_id or '',
                'designation': desig_clean,
                'month_name': month_name,
                'year': payslip.year,
                'gross_salary': f"{float(payslip.gross_salary or 0):,.2f}",
                'total_deductions': f"{float(payslip.total_deductions or 0):,.2f}",
                'net_salary': f"{float(payslip.net_salary or 0):,.2f}",
            }"""

if target not in c:
    target_crlf = target.replace('\n', '\r\n')
    c = c.replace(target_crlf, replacement.replace('\n', '\r\n'), 1)
else:
    c = c.replace(target, replacement, 1)

target2 = "filename = f\"Payslip_{(emp.get_full_name() or emp.username).replace(' ', '_')}_{month_name}_{payslip.year}.pdf\""
rep2 = "filename = f\"Payslip_{emp_clean_name.replace(' ', '_')}_{month_name}_{payslip.year}.pdf\""
c = c.replace(target2, rep2)

with open('Backend/main/email_service.py', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated email_service.py')

