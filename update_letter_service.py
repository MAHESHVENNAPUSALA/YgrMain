with open(r"D:\YgrMain\YgrMain\Backend\hr\letter_service.py", "r", encoding="utf-8") as f:
    text = f.read()

relieving_service_code = '''

def render_relieving_letter_html(relieving_letter):
    """
    Render relieving letter HTML for live preview or PDF generation.
    """
    _register_pdf_fonts()
    template = get_template('employee/relieving_letter_pdf.html')
    from django.utils import timezone
    context = {
        'letter': relieving_letter,
        'logo_data_uri': get_company_logo_data_uri(),
        'today_date': timezone.now().date(),
    }
    return template.render(context)


def generate_relieving_letter_pdf(relieving_letter):
    """
    Generate A4 PDF for RelievingLetter using xhtml2pdf and save to pdf_file field.
    Returns (True, pdf_url) or (False, error_message).
    """
    try:
        _register_pdf_fonts()
        html = render_relieving_letter_html(relieving_letter)
        pdf_buffer = BytesIO()
        pisa_status = pisa.CreatePDF(html, dest=pdf_buffer, encoding='UTF-8')
        if pisa_status.err:
            return False, f"PDF generation error code {pisa_status.err}"

        safe_ref = relieving_letter.reference_number.replace('/', '_').replace('\\\\', '_')
        safe_name = relieving_letter.employee_name.replace(' ', '_')
        filename = f"relieving_letter_{safe_name}_{safe_ref}.pdf"

        relieving_letter.pdf_file.save(filename, ContentFile(pdf_buffer.getvalue()), save=True)
        return True, relieving_letter.pdf_file.url
    except Exception as exc:
        return False, str(exc)
'''

with open(r"D:\YgrMain\YgrMain\Backend\hr\letter_service.py", "w", encoding="utf-8") as f:
    f.write(text + relieving_service_code)

print("Successfully added relieving letter rendering and PDF generation to letter_service.py")

