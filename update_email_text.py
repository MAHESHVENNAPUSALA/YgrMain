with open('Backend/main/email_service.py', 'r', encoding='utf-8') as f:
    c = f.read()

target = """            html_body = render_to_string('emails/payslip_delivery_email.html', full_context)
            text_body = strip_tags(html_body)
            subject = f"Salary Slip - {month_name} {payslip.year} | YGR Global IT Services\""""

replacement = """            html_body = render_to_string('emails/payslip_delivery_email.html', full_context)
            try:
                from bs4 import BeautifulSoup
                _soup = BeautifulSoup(html_body, 'html.parser')
                for _s in _soup(['style', 'script']):
                    _s.decompose()
                _text = _soup.get_text(separator='\\n')
                text_body = '\\n'.join([line.strip() for line in _text.splitlines() if line.strip()])
            except Exception:
                text_body = strip_tags(html_body)
            subject = f"Salary Slip - {month_name} {payslip.year} | YGR Global IT Services\""""

if target not in c:
    target_crlf = target.replace('\n', '\r\n')
    c = c.replace(target_crlf, replacement.replace('\n', '\r\n'), 1)
else:
    c = c.replace(target, replacement, 1)

with open('Backend/main/email_service.py', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated text_body in email_service.py')

