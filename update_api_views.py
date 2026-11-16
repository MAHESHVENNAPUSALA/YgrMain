with open('Backend/hr/api_views.py', 'r', encoding='utf-8') as f:
    c = f.read()

target = """        if payslip.payslip_pdf and payslip.payslip_pdf.storage.exists(payslip.payslip_pdf.name):
            response = FileResponse(payslip.payslip_pdf.open('rb'), content_type='application/pdf')
            emp_name = (payslip.employee_name or payslip.employee.get_full_name() or payslip.employee.username).replace(' ', '_')
            fname = f"Payslip_{emp_name}_{payslip.month_name}_{payslip.year}.pdf"
            response['Content-Disposition'] = f'attachment; filename="{fname}"'
            return response"""

replacement = """        if payslip.payslip_pdf and payslip.payslip_pdf.storage.exists(payslip.payslip_pdf.name):
            response = FileResponse(payslip.payslip_pdf.open('rb'), content_type='application/pdf')
            from .payslip_utils import clean_employee_name
            emp_name = clean_employee_name(payslip.employee, payslip.employee_name).replace(' ', '_')
            fname = f"Payslip_{emp_name}_{payslip.month_name}_{payslip.year}.pdf"
            response['Content-Disposition'] = f'attachment; filename="{fname}"'
            return response"""

if target not in c:
    target_crlf = target.replace('\n', '\r\n')
    c = c.replace(target_crlf, replacement.replace('\n', '\r\n'), 1)
else:
    c = c.replace(target, replacement, 1)

with open('Backend/hr/api_views.py', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated hr/api_views.py download filename')

