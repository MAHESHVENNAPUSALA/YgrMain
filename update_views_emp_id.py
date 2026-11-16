with open('Backend/hr/views.py', 'r', encoding='utf-8') as f:
    content = f.read()

target = """    context = {
        'payslip': payslip,
        'month_name': month_name,
        'employee_display_name': employee_display_name,
        'designation_display': designation_display,
        'department_display': department_display,
        'joining_date_display': joining_date_display,
        'payment_date_display': payment_date_display,
        'approved_by_display': approved_by_display,
        'generated_on_display': generated_on_display,
        'logo_data_uri': logo_data_uri,
        'amount_in_words': number_to_words(payslip.net_salary),
    }"""

replacement = """    emp_id = emp.emp_id if emp and emp.emp_id else '—'
    context = {
        'payslip': payslip,
        'month_name': month_name,
        'employee_emp_id': emp_id,
        'employee_display_name': employee_display_name,
        'designation_display': designation_display,
        'department_display': department_display,
        'joining_date_display': joining_date_display,
        'payment_date_display': payment_date_display,
        'approved_by_display': approved_by_display,
        'generated_on_display': generated_on_display,
        'logo_data_uri': logo_data_uri,
        'amount_in_words': number_to_words(payslip.net_salary),
    }"""

if target not in content:
    target_crlf = target.replace('\n', '\r\n')
    content = content.replace(target_crlf, replacement.replace('\n', '\r\n'), 1)
else:
    content = content.replace(target, replacement, 1)

with open('Backend/hr/views.py', 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated hr/views.py context')

