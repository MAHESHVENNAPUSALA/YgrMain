import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
django.setup()

from rest_framework.test import APIRequestFactory, force_authenticate
from django.utils import timezone
from io import BytesIO
from pypdf import PdfReader
from hr.models import User, OfferLetter, JoiningLetter, JobApplication, OfferLetterPolicyVersion
from hr.api_views import (
    OFFER_POLICY_SECTION_KEYS,
    OfferLetterAPIView, OfferLetterDetailAPIView, OfferLetterActionAPIView,
    OfferLetterPreviewAPIView, JoiningLetterAPIView, JoiningLetterDetailAPIView,
    JoiningLetterActionAPIView, JoiningLetterPreviewAPIView
)

def run_letter_tests():
    factory = APIRequestFactory()
    print("=" * 70)
    print("RUNNING AUTOMATED VERIFICATION FOR OFFER & JOINING LETTERS")
    print("=" * 70)

    # 1. Setup HR User
    hr_user, _ = User.objects.get_or_create(
        username='test_hr_letters@ygr.com',
        defaults={'email': 'test_hr_letters@ygr.com', 'role': 'HR', 'first_name': 'HRLetterTester'}
    )
    hr_user.set_password('Password@123')
    hr_user.role = 'HR'
    hr_user.save()
    md_user, _ = User.objects.get_or_create(
        username='test_md_letters@ygr.com',
        defaults={'email': 'test_md_letters@ygr.com', 'role': 'MD', 'first_name': 'MDLetterTester'}
    )

    offer_policy = OfferLetterPolicyVersion.objects.create(
        name='Automated Test Offer Policy',
        version=f'test-{timezone.now().strftime("%Y%m%d%H%M%S")}',
        employment_category='All',
        employment_type='All',
        effective_date=timezone.localdate(),
        company_details={
            'legal_name': 'YGR Global IT Services Pvt. Ltd.',
            'registered_office_address': 'Test registered office address',
            'cin': 'TEST-CIN-0001',
            'official_email': 'hr@example.test',
            'website': 'https://example.test',
            'authorized_signatory_name': 'Authorized Test Signatory',
            'authorized_signatory_title': 'Managing Director',
        },
        sections={key: f'Approved test wording for {key}. ' * 8 for key in OFFER_POLICY_SECTION_KEYS},
        annexures=[
            {'code': 'B', 'title': 'Approved benefits', 'benefit_sections': {
                key: f'Approved benefits wording for {key}. ' * 8
                for key in ('medical_insurance', 'leave_entitlements', 'paid_holidays', 'training_development', 'performance_incentives', 'other_benefits')
            }, 'enabled': True},
            {'code': 'C', 'title': 'Confidentiality and IP undertaking', 'sections': {
                key: f'Approved undertaking terms for {key}. ' * 8 for key in (
                    'confidential_information', 'data_handling', 'confidentiality_obligations',
                    'intellectual_property', 'return_deletion', 'employee_acknowledgement'
                )
            }, 'enabled': True},
            {'code': 'D', 'title': 'Joining documentation checklist', 'items': ['PAN', 'Identity proof', 'Address proof', 'Education certificates', 'Bank details'], 'enabled': True},
        ],
        status='Published',
        legal_approved=True,
        legal_reviewer_name='Automated Test Reviewer',
        legal_approval_note='Test fixture only.',
        created_by=hr_user,
    )

    # 2. Setup Candidate / Candidate User
    cand_user, _ = User.objects.get_or_create(
        username='test_candidate@ygr.com',
        defaults={'email': 'test_candidate@ygr.com', 'role': 'Employee', 'first_name': 'Alice', 'last_name': 'Candidate'}
    )

    # Test 1: HR creates an Offer Letter draft
    print("\n--- Test 1: Create Offer Letter Draft ---")
    offer_payload = {
        'candidate_name': 'Alice Candidate',
        'candidate_email': 'test_candidate@ygr.com',
        'candidate_phone': '9876543210',
        'candidate_address': '12 Test Street, Hyderabad, Telangana',
        'job_title': 'Senior Full Stack Engineer',
        'department': 'python_dev',
        'joining_date': '2026-11-30',
        'offer_validity_date': '2026-11-06',
        'offered_ctc': '1200000.00',
        'monthly_gross': '100000.00',
        'basic_salary': '50000.00',
        'hra': '25000.00',
        'special_allowance': '15000.00',
        'transport_allowance': '5000.00',
        'medical_allowance': '5000.00',
        'employment_category': 'Experienced',
        'policy_version': offer_policy.id,
        'annexures': ['B', 'C', 'D'],
        'probation_period_months': 3,
        'notice_period_days': 30,
        'work_location': 'Hyderabad Office',
        'reporting_manager_name': 'Engineering Manager',
        'status': 'Draft',
    }
    req = factory.post('/api/offer-letters/', data=offer_payload, format='json')
    force_authenticate(req, user=hr_user)
    res = OfferLetterAPIView.as_view()(req)
    assert res.status_code == 201, f"Expected 201, got {res.status_code}: {res.data}"
    offer_id = res.data['id']
    ref_num = res.data['reference_number']
    print(f"✓ Passed: Offer Letter created with Ref #{ref_num} (ID: {offer_id})")

    # Test 2: Generate PDF and Approve Offer Letter
    print("\n--- Test 2: Approve & Generate PDF for Offer Letter ---")
    action_req = factory.post(f'/api/offer-letters/{offer_id}/action/', data={'action': 'submit_for_approval'}, format='json')
    force_authenticate(action_req, user=hr_user)
    submit_res = OfferLetterActionAPIView.as_view()(action_req, pk=offer_id)
    assert submit_res.status_code == 200, f"Expected 200, got {submit_res.status_code}: {submit_res.data}"
    action_req = factory.post(f'/api/offer-letters/{offer_id}/action/', data={'action': 'approve'}, format='json')
    force_authenticate(action_req, user=md_user)
    action_res = OfferLetterActionAPIView.as_view()(action_req, pk=offer_id)
    assert action_res.status_code == 200, f"Expected 200, got {action_res.status_code}: {action_res.data}"
    
    offer_obj = OfferLetter.objects.get(id=offer_id)
    assert offer_obj.status == 'Approved', f"Expected Approved, got {offer_obj.status}"
    assert bool(offer_obj.pdf_file), "PDF file was not generated for approved offer letter!"
    print(f"✓ Passed: Offer Letter approved and PDF generated: {offer_obj.pdf_file.name}")

    # Test 3: Preview the generated PDF
    print("\n--- Test 3: Preview Offer Letter PDF ---")
    prev_req = factory.get(f'/api/offer-letters/{offer_id}/preview/')
    force_authenticate(prev_req, user=hr_user)
    prev_res = OfferLetterPreviewAPIView.as_view()(prev_req, pk=offer_id)
    assert prev_res.status_code == 200, f"Expected 200, got {prev_res.status_code}"
    assert prev_res['Content-Type'] == 'application/pdf'
    preview_text = '\n'.join(page.extract_text() or '' for page in PdfReader(BytesIO(prev_res.content)).pages)
    assert 'Senior Full Stack Engineer' in preview_text
    print("✓ Passed: Offer Letter PDF preview contains the saved offer details.")

    # Test 4: HR creates a Joining Letter linked to Offer Letter
    print("\n--- Test 4: Create Joining Letter ---")
    joining_payload = {
        'offer_letter': offer_id,
        'candidate_name': 'Alice Candidate',
        'candidate_email': 'test_candidate@ygr.com',
        'designation': 'Senior Full Stack Engineer',
        'department': 'python_dev',
        'official_joining_date': '2026-11-30',
        'reporting_time': '09:30:00',
        'reporting_venue': 'Main Development Center, Tower B',
        'status': 'Draft',
    }
    j_req = factory.post('/api/joining-letters/', data=joining_payload, format='json')
    force_authenticate(j_req, user=hr_user)
    j_res = JoiningLetterAPIView.as_view()(j_req)
    assert j_res.status_code == 201, f"Expected 201, got {j_res.status_code}: {j_res.data}"
    joining_id = j_res.data['id']
    j_ref = j_res.data['reference_number']
    print(f"✓ Passed: Joining Letter created with Ref #{j_ref} (ID: {joining_id})")

    # Test 5: Approve & Generate PDF for Joining Letter
    print("\n--- Test 5: Approve & Generate PDF for Joining Letter ---")
    j_action_req = factory.post(f'/api/joining-letters/{joining_id}/action/', data={'action': 'approve'}, format='json')
    force_authenticate(j_action_req, user=hr_user)
    j_action_res = JoiningLetterActionAPIView.as_view()(j_action_req, pk=joining_id)
    assert j_action_res.status_code == 200, f"Expected 200, got {j_action_res.status_code}: {j_action_res.data}"
    
    joining_obj = JoiningLetter.objects.get(id=joining_id)
    assert joining_obj.status == 'Approved', f"Expected Approved, got {joining_obj.status}"
    assert bool(joining_obj.pdf_file), "PDF file was not generated for approved joining letter!"
    print(f"✓ Passed: Joining Letter approved and PDF generated: {joining_obj.pdf_file.name}")

    # Test 6: Preview Joining Letter HTML
    print("\n--- Test 6: Preview Joining Letter HTML ---")
    j_prev_req = factory.get(f'/api/joining-letters/{joining_id}/preview/')
    force_authenticate(j_prev_req, user=hr_user)
    j_prev_res = JoiningLetterPreviewAPIView.as_view()(j_prev_req, pk=joining_id)
    assert j_prev_res.status_code == 200, f"Expected 200, got {j_prev_res.status_code}"
    assert 'Alice Candidate' in j_prev_res.content.decode('utf-8')
    print("✓ Passed: Joining Letter HTML preview rendered successfully.")

    # Test 7: Unauthorized Access Blocked
    print("\n--- Test 7: Security & Unauthorized Role Block ---")
    unauth_req = factory.post('/api/offer-letters/', data=offer_payload, format='json')
    force_authenticate(unauth_req, user=cand_user)
    unauth_res = OfferLetterAPIView.as_view()(unauth_req)
    assert unauth_res.status_code == 403, f"Expected 403 Forbidden, got {unauth_res.status_code}"
    print("✓ Passed: Candidate user blocked from creating offer letters (403 Forbidden).")

    print("\n" + "=" * 70)
    print("ALL 7 OFFER & JOINING LETTER WORKFLOWS PASSED WITH 100% SUCCESS!")
    print("=" * 70)

if __name__ == '__main__':
    run_letter_tests()
