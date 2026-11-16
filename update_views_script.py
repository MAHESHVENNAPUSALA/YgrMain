with open('Backend/hr/views.py', 'r', encoding='utf-8') as f:
    content = f.read()

target = """def generate_payslip_pdf_file(payslip):
    _register_pdf_fonts()
    from io import BytesIO
    import os as _os
    import base64 as _b64
    template_path = 'employee/payslip_pdf.html'

    # Build a base64 data URI so xhtml2pdf can embed the logo on any OS
    logo_data_uri = ''
    for candidate in ('images/Logo.png', 'images/logo1.png', 'images/logo.png'):
        found = finders.find(candidate)
        if found and _os.path.isfile(found):
            with open(found, 'rb') as _f:
                _raw = _f.read()
            logo_data_uri = 'data:image/png;base64,' + _b64.b64encode(_raw).decode('ascii')
            break

    context = {
        'payslip': payslip,
        'logo_data_uri': logo_data_uri,
        'amount_in_words': number_to_words(payslip.net_salary),
    }

    template = get_template(template_path)
    html = template.render(context)

    pdf_buffer = BytesIO()
    pisa_status = pisa.CreatePDF(html, dest=pdf_buffer, encoding='UTF-8')
    if not pisa_status.err:
        pdf_name = f"payslip_{payslip.employee.emp_id}_{payslip.month}_{payslip.year}.pdf"
        payslip.payslip_pdf.save(pdf_name, ContentFile(pdf_buffer.getvalue()), save=False)
        return True
    return False"""

replacement = """def generate_payslip_pdf_file(payslip):
    _register_pdf_fonts()
    from io import BytesIO
    import os as _os
    import base64 as _b64
    from django.utils import timezone
    from .payslip_utils import clean_employee_name, get_clean_department, get_clean_designation
    template_path = 'employee/payslip_pdf.html'

    # Build a base64 data URI for genuine transparent logo
    logo_data_uri = ''
    found_logo = None
    for candidate in ('images/logo.png', 'images/logo1-removebg-preview.png'):
        f = finders.find(candidate)
        if f and _os.path.isfile(f):
            found_logo = f
            break

    if not found_logo:
        base_dir = _os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))
        for p in (
            _os.path.join(base_dir, 'main', 'static', 'images', 'logo.png'),
            _os.path.join(base_dir, 'hr', 'static', 'images', 'logo.png'),
        ):
            if _os.path.isfile(p):
                found_logo = p
                break

    if found_logo and _os.path.isfile(found_logo):
        with open(found_logo, 'rb') as _f:
            _raw = _f.read()
        logo_data_uri = 'data:image/png;base64,' + _b64.b64encode(_raw).decode('ascii')

    MONTHS = ['January','February','March','April','May','June',
              'July','August','September','October','November','December']
    month_name = MONTHS[payslip.month - 1] if 1 <= payslip.month <= 12 else str(payslip.month)

    emp = payslip.employee
    employee_display_name = clean_employee_name(emp, payslip.employee_name)
    designation_display = get_clean_designation(payslip)
    department_display = get_clean_department(payslip)

    joining_date_display = emp.date_of_joining.strftime('%d %b %Y') if emp and emp.date_of_joining else '—'
    payment_date_display = payslip.payment_date.strftime('%d %b %Y') if payslip.payment_date else 'End of Month'
    
    approved_by_display = ''
    if payslip.approved_by:
        approved_by_display = clean_employee_name(payslip.approved_by)

    generated_on_display = timezone.now().strftime('%d %b %Y, %I:%M %p')

    context = {
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
    }

    template = get_template(template_path)
    html = template.render(context)

    pdf_buffer = BytesIO()
    pisa_status = pisa.CreatePDF(html, dest=pdf_buffer, encoding='UTF-8')
    if not pisa_status.err:
        emp_id = emp.emp_id if emp and emp.emp_id else 'EMP'
        pdf_name = f"payslip_{emp_id}_{payslip.month}_{payslip.year}.pdf"
        payslip.payslip_pdf.save(pdf_name, ContentFile(pdf_buffer.getvalue()), save=False)
        return True
    return False"""

# Handle CRLF / LF
if target not in content:
    target_crlf = target.replace('\n', '\r\n')
    if target_crlf in content:
        content = content.replace(target_crlf, replacement.replace('\n', '\r\n'), 1)
    else:
        print('Error: Target not found!')
else:
    content = content.replace(target, replacement, 1)

with open('Backend/hr/views.py', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')

