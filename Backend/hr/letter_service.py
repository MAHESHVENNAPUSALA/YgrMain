import os
import base64
from io import BytesIO
from decimal import Decimal
from django.template.loader import get_template
from django.core.files.base import ContentFile
from django.contrib.staticfiles import finders
from django.conf import settings
from xhtml2pdf import pisa
from .views import _register_pdf_fonts


def get_company_logo_data_uri():
    """
    Resolve company logo and return as base64 data URI for reliable embedding
    in xhtml2pdf and HTML preview across all platforms.
    """
    candidates = [
        finders.find('dist/logo.png'),
        os.path.join(settings.BASE_DIR.parent, 'frontend', 'public', 'logo.png'),
    ]
    for found in candidates:
        if found and os.path.isfile(found):
            try:
                with open(found, 'rb') as f:
                    raw = f.read()
                return 'data:image/png;base64,' + base64.b64encode(raw).decode('ascii')
            except Exception:
                pass
    return ''


def render_offer_letter_html(offer_letter):
    """
    Render offer letter HTML for live preview or PDF generation.
    """
    _register_pdf_fonts()
    if offer_letter.status in ('Approved', 'Issued', 'Sent', 'Accepted', 'Rejected', 'Expired') and not offer_letter.policy_snapshot and not offer_letter.policy_version_id:
        legacy_template = get_template('employee/offer_letter_pdf.html')
        return legacy_template.render({
            'offer': offer_letter,
            'logo_data_uri': get_company_logo_data_uri(),
        })
    template = get_template('employee/offer_letter_enterprise_pdf.html')
    policy_snapshot = offer_letter.policy_snapshot or {}
    policy = offer_letter.policy_version
    sections = policy_snapshot.get('sections') or (policy.sections if policy else {})
    company_details = policy_snapshot.get('company_details') or (policy.company_details if policy else {})
    configured_annexures = policy_snapshot.get('annexures') or (policy.annexures if policy else [])
    selected_codes = set(offer_letter.annexures or [])
    annexures = [
        item for item in configured_annexures
        if isinstance(item, dict) and item.get('enabled', True)
        and (not selected_codes or item.get('code') in selected_codes)
    ]
    undertaking_titles = (
        ('confidential_information', 'Confidential information and permitted use'),
        ('data_handling', 'Company, client and personal data handling'),
        ('confidentiality_obligations', 'Confidentiality obligations and permitted disclosures'),
        ('intellectual_property', 'Intellectual property and pre-existing materials'),
        ('return_deletion', 'Return or deletion of information and materials'),
        ('employee_acknowledgement', 'Employee acknowledgement and applicable-law qualification'),
    )
    benefit_titles = (
        ('medical_insurance', 'Medical insurance'),
        ('leave_entitlements', 'Leave entitlements'),
        ('paid_holidays', 'Paid holidays'),
        ('training_development', 'Training and development'),
        ('performance_incentives', 'Performance incentives'),
        ('other_benefits', 'Other company-approved benefits'),
    )
    normalized_annexures = []
    for item in annexures:
        normalized = dict(item)
        if normalized.get('code') == 'B':
            section_data = normalized.get('benefit_sections', {})
            if not isinstance(section_data, dict):
                section_data = {}
            normalized['benefit_sections'] = [
                {'title': title, 'content': section_data.get(key, '')}
                for key, title in benefit_titles
            ]
        if normalized.get('code') == 'C':
            section_data = normalized.get('sections', {})
            if not isinstance(section_data, dict):
                section_data = {}
            normalized['undertaking_sections'] = [
                {'title': title, 'content': section_data.get(key, '')}
                for key, title in undertaking_titles
            ]
        if normalized.get('code') == 'D':
            normalized['items'] = [str(value).strip() for value in normalized.get('items', []) if str(value).strip()]
        normalized_annexures.append(normalized)
    annexures = normalized_annexures
    section_titles = (
        ('appointment', 'Appointment and nature of employment'),
        ('position_responsibilities', 'Position, responsibilities and reporting structure'),
        ('joining_workplace', 'Date of joining and place of work'),
        ('compensation', 'Compensation and salary payment'),
        ('probation', 'Probation period'),
        ('confirmation', 'Confirmation of employment'),
        ('working_hours', 'Working days and working hours'),
        ('attendance_leave', 'Attendance and leave policies'),
        ('holidays_weekly_off', 'Holidays and weekly offs'),
        ('transfer_relocation', 'Transfers and relocation'),
        ('business_travel', 'Business travel and expenses'),
        ('performance_evaluation', 'Performance evaluation'),
        ('conduct', 'Code of conduct and professional behaviour'),
        ('confidentiality', 'Confidentiality and non-disclosure'),
        ('intellectual_property', 'Intellectual property and ownership of work'),
        ('information_security', 'Information security and data protection'),
        ('company_assets', 'Use of company assets and IT systems'),
        ('conflict_outside_employment', 'Conflict of interest and outside employment'),
        ('background_verification', 'Background and document verification'),
        ('employee_representations', 'Employee representations and declarations'),
        ('notice_termination', 'Notice period and termination'),
        ('return_property', 'Return of company property'),
        ('company_policies', 'Applicable company policies'),
        ('general_terms', 'General terms and governing law'),
        ('acceptance', 'Acceptance and execution'),
    )
    policy_sections = []
    for number, (key, title) in enumerate(section_titles, start=1):
        value = sections.get(key, '') if isinstance(sections, dict) else ''
        if isinstance(value, dict):
            if not value.get('enabled', True):
                continue
            content = value.get('content', '')
            subclauses = value.get('subclauses', [])
        else:
            content = value
            subclauses = []
        policy_sections.append({
            'number': number,
            'title': title,
            'content': content,
            'subclauses': [item for item in subclauses if str(item).strip()],
        })
    optional_clauses = [
        clause for clause in (sections.get('optional_clauses', []) if isinstance(sections, dict) else [])
        if isinstance(clause, dict) and clause.get('enabled', True)
    ]

    cash_components = []
    for label, field in (
        ('Basic salary', 'basic_salary'),
        ('House rent allowance', 'hra'),
        ('Conveyance allowance', 'transport_allowance'),
        ('Medical allowance', 'medical_allowance'),
        ('Special allowance', 'special_allowance'),
        ('Other allowances', 'other_allowances'),
    ):
        monthly = Decimal(getattr(offer_letter, field) or 0)
        if monthly > 0:
            cash_components.append({'label': label, 'monthly': monthly, 'annual': monthly * 12})
    gross_monthly = sum((row['monthly'] for row in cash_components), Decimal('0.00'))
    salary_rows = list(cash_components)
    salary_rows.append({'label': 'Gross salary', 'monthly': gross_monthly, 'annual': gross_monthly * 12, 'total': True})
    for label, field in (
        ('Employer provident fund contribution', 'provident_fund'),
        ('Employer ESI contribution', 'employer_esi'),
        ('Gratuity provision', 'gratuity'),
    ):
        monthly = Decimal(getattr(offer_letter, field) or 0)
        if monthly > 0:
            salary_rows.append({'label': label, 'monthly': monthly, 'annual': monthly * 12})
    variable_pay_annual = Decimal(offer_letter.variable_pay or 0)
    if variable_pay_annual > 0:
        salary_rows.append({'label': 'Variable pay / performance bonus', 'monthly': variable_pay_annual / 12, 'annual': variable_pay_annual})
    employer_contributions = sum((
        Decimal(offer_letter.provident_fund or 0),
        Decimal(offer_letter.employer_esi or 0),
        Decimal(offer_letter.gratuity or 0),
    ), Decimal('0.00'))
    ctc_annual = (gross_monthly + employer_contributions) * 12 + variable_pay_annual
    ctc_monthly = ctc_annual / 12
    deductions_monthly = sum((
        Decimal(offer_letter.employee_pf_deduction or 0),
        Decimal(offer_letter.employee_esi or 0),
        Decimal(offer_letter.professional_tax or 0),
        Decimal(offer_letter.other_deductions or 0),
    ), Decimal('0.00'))
    estimated_net_monthly = gross_monthly - deductions_monthly
    estimated_net_annual = estimated_net_monthly * 12
    deduction_rows = [
        {'label': 'Employee PF deduction', 'monthly': Decimal(offer_letter.employee_pf_deduction or 0)},
        {'label': 'Employee ESI deduction', 'monthly': Decimal(offer_letter.employee_esi or 0)},
        {'label': 'Professional tax', 'monthly': Decimal(offer_letter.professional_tax or 0)},
        {'label': 'Other stated deductions', 'monthly': Decimal(offer_letter.other_deductions or 0)},
    ]
    deduction_rows = [row for row in deduction_rows if row['monthly'] > 0]
    for row in deduction_rows:
        row['annual'] = row['monthly'] * 12
    offered_ctc = Decimal(offer_letter.offered_ctc or 0)
    salary_configured = offered_ctc > 0 and gross_monthly > 0
    if not salary_configured:
        salary_rows = [
            {'label': label, 'configured': False}
            for label in (
                'Basic salary', 'House rent allowance', 'Conveyance allowance',
                'Medical allowance', 'Special allowance', 'Other allowances',
                'Gross salary', 'Employer provident fund contribution',
                'Employer ESI contribution', 'Gratuity provision',
                'Variable pay / performance bonus',
            )
        ]
        salary_rows[-5]['total'] = True
        deduction_rows = [
            {'label': label, 'configured': False}
            for label in (
                'Employee PF deduction', 'Employee ESI deduction',
                'Professional tax', 'Other stated deductions',
            )
        ]
    context = {
        'offer': offer_letter,
        'logo_data_uri': get_company_logo_data_uri(),
        'company_details': company_details if isinstance(company_details, dict) else {},
        'policy_name': policy_snapshot.get('name') or (policy.name if policy else ''),
        'policy_version': policy_snapshot.get('version') or (policy.version if policy else ''),
        'policy_sections_configured': bool(sections),
        'policy_sections': policy_sections,
        'optional_clauses': optional_clauses,
        'policy_snapshot': policy_snapshot,
        'salary_rows': salary_rows,
        'gross_monthly': gross_monthly,
        'employer_contributions': employer_contributions,
        'variable_pay_annual': variable_pay_annual,
        'deduction_rows': deduction_rows,
        'deductions_monthly': deductions_monthly,
        'deductions_annual': deductions_monthly * 12,
        'estimated_net_monthly': estimated_net_monthly,
        'estimated_net_annual': estimated_net_annual,
        'ctc_annual': ctc_annual,
        'ctc_monthly': ctc_monthly,
        'offered_ctc': offered_ctc,
        'ctc_reconciled': abs(ctc_annual - offered_ctc) <= Decimal('0.01'),
        'salary_configured': salary_configured,
        'annexures': annexures,
    }
    return template.render(context)


def render_offer_letter_pdf_bytes(offer_letter):
    """Render the official offer PDF bytes used by preview, storage, and email."""
    html = render_offer_letter_html(offer_letter)
    pdf_buffer = BytesIO()
    pisa_status = pisa.CreatePDF(html, dest=pdf_buffer, encoding='UTF-8')
    if pisa_status.err:
        raise ValueError(f'PDF generation error code {pisa_status.err}')
    return pdf_buffer.getvalue()


def generate_offer_letter_pdf(offer_letter):
    """
    Generate A4 PDF for OfferLetter using xhtml2pdf and save to pdf_file field.
    Returns (True, pdf_url) or (False, error_message).
    """
    try:
        pdf_bytes = render_offer_letter_pdf_bytes(offer_letter)

        safe_ref = offer_letter.reference_number.replace('/', '_').replace('\\', '_')
        safe_name = offer_letter.candidate_name.replace(' ', '_')
        filename = f"offer_letter_{safe_name}_{safe_ref}.pdf"

        offer_letter.pdf_file.save(filename, ContentFile(pdf_bytes), save=True)
        return True, offer_letter.pdf_file.url
    except Exception as exc:
        return False, str(exc)


def render_joining_letter_html(joining_letter):
    """
    Render joining letter HTML for live preview or PDF generation.
    """
    _register_pdf_fonts()
    template = get_template('employee/joining_letter_pdf.html')
    context = {
        'letter': joining_letter,
        'logo_data_uri': get_company_logo_data_uri(),
    }
    return template.render(context)


def generate_joining_letter_pdf(joining_letter):
    """
    Generate A4 PDF for JoiningLetter using xhtml2pdf and save to pdf_file field.
    Returns (True, pdf_url) or (False, error_message).
    """
    try:
        _register_pdf_fonts()
        html = render_joining_letter_html(joining_letter)
        pdf_buffer = BytesIO()
        pisa_status = pisa.CreatePDF(html, dest=pdf_buffer, encoding='UTF-8')
        if pisa_status.err:
            return False, f"PDF generation error code {pisa_status.err}"

        safe_ref = joining_letter.reference_number.replace('/', '_').replace('\\', '_')
        safe_name = joining_letter.employee_name.replace(' ', '_')
        filename = f"joining_letter_{safe_name}_{safe_ref}.pdf"

        joining_letter.pdf_file.save(filename, ContentFile(pdf_buffer.getvalue()), save=True)
        return True, joining_letter.pdf_file.url
    except Exception as exc:
        return False, str(exc)
