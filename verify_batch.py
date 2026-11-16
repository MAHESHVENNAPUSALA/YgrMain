import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
import django
django.setup()

import pypdf
from hr.models import Payslip
from hr.views import generate_payslip_pdf_file

test_ids = [131, 132, 105, 11]
print("=" * 60)
print("BATCH PDF VERIFICATION")
print("=" * 60)
for pid in test_ids:
    try:
        p = Payslip.objects.get(id=pid)
        ok = generate_payslip_pdf_file(p)
        p.save()
        if p.payslip_pdf and p.payslip_pdf.path and os.path.exists(p.payslip_pdf.path):
            reader = pypdf.PdfReader(p.payslip_pdf.path)
            txt = reader.pages[0].extract_text() or ''
            has_raw = '{{' in txt or '}}' in txt
            pages = len(reader.pages)
            excerpt = txt[:300].encode('ascii', errors='replace').decode('ascii')
            print(f"\nPayslip {pid} ({p.employee.emp_id}): ok={ok}, pages={pages}, raw_tags={has_raw}")
            print(f"  Excerpt: {excerpt}")
        else:
            print(f"\nPayslip {pid}: ok={ok}, PDF file not found at {getattr(p.payslip_pdf, 'path', 'N/A')}")
    except Exception as e:
        print(f"\nPayslip {pid}: ERROR - {e}")

print("\n" + "=" * 60)
print("DONE")

