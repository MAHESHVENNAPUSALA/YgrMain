from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import ChatRoom, ChatMessage, GroupMessage, UserPresence, CompanyAnnouncement
from django.utils import timezone
from datetime import timedelta
import json
from datetime import date
from io import BytesIO
from unittest.mock import patch
from rest_framework.test import APIRequestFactory, force_authenticate
from xhtml2pdf import pisa
from pypdf import PdfReader
from .models import OfferLetter, OfferLetterAudit, OfferLetterPolicyVersion
from .api_views import (
    OFFER_POLICY_SECTION_KEYS,
    OfferLetterAPIView,
    OfferLetterActionAPIView,
    OfferLetterPolicyAPIView,
    OfferLetterPolicyDetailAPIView,
    OfferLetterPolicyPublishAPIView,
    OfferLetterAuditAPIView,
    OfferLetterPreviewAPIView,
)

User = get_user_model()

class CollaborationChatTests(TestCase):
    def setUp(self):
        # Create users with different roles
        self.md_user = User.objects.create_user(
            username='md_user',
            password='testpassword',
            role='MD',
            email='md@test.com'
        )
        self.hr_user = User.objects.create_user(
            username='hr_user',
            password='testpassword',
            role='HR',
            email='hr@test.com'
        )
        self.emp_user1 = User.objects.create_user(
            username='emp_user1',
            password='testpassword',
            role='Employee',
            email='emp1@test.com'
        )
        self.emp_user2 = User.objects.create_user(
            username='emp_user2',
            password='testpassword',
            role='Employee',
            email='emp2@test.com'
        )

        # Clients for each user
        self.md_client = Client()
        self.md_client.login(username='md_user', password='testpassword')
        
        self.hr_client = Client()
        self.hr_client.login(username='hr_user', password='testpassword')
        
        self.emp1_client = Client()
        self.emp1_client.login(username='emp_user1', password='testpassword')

        self.emp2_client = Client()
        self.emp2_client.login(username='emp_user2', password='testpassword')

    def test_communication_page_self_seeds_channels(self):
        # Check that opening the communication page self-seeds standard channels
        self.assertEqual(ChatRoom.objects.filter(room_type='channel').count(), 0)
        
        response = self.emp1_client.get(reverse('communication'))
        self.assertEqual(response.status_code, 200)
        
        # Verify that channels like 'General' and 'Announcements' were created
        self.assertTrue(ChatRoom.objects.filter(room_type='channel', name='General').exists())
        self.assertTrue(ChatRoom.objects.filter(room_type='channel', name='Announcements').exists())
        self.assertEqual(ChatRoom.objects.filter(room_type='channel').count(), 8)

    def test_direct_message_flow(self):
        # Send direct message from emp1 to emp2
        response = self.emp1_client.post(reverse('send_chat_message'), {
            'receiver_id': self.emp_user2.id,
            'text': 'Hello emp2!'
        })
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['status'], 'success')
        self.assertEqual(data['message']['text'], 'Hello emp2!')
        
        # Fetch history from emp2 perspective and verify message is retrieved
        response = self.emp2_client.get(reverse('get_chat_history'), {
            'user_id': self.emp_user1.id
        })
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data['messages']), 1)
        self.assertEqual(data['messages'][0]['text'], 'Hello emp2!')
        self.assertFalse(data['messages'][0]['is_group'])

    def test_announcements_channel_read_only_for_employees(self):
        # Ensure Announcements channel is seeded
        self.emp1_client.get(reverse('communication'))
        ann_room = ChatRoom.objects.get(room_type='channel', name='Announcements')
        
        # Employee tries to post to announcements channel and should be denied
        response = self.emp1_client.post(reverse('send_chat_message'), {
            'room_id': ann_room.id,
            'text': 'Breaking news!'
        })
        self.assertEqual(response.status_code, 403)
        
        # MD posts to announcements channel and should succeed
        response = self.md_client.post(reverse('send_chat_message'), {
            'room_id': ann_room.id,
            'text': 'Welcome to YGR Team!'
        })
        self.assertEqual(response.status_code, 200)

    def test_team_group_creation_and_access(self):
        # HR creates a team group with emp1
        response = self.hr_client.post(reverse('create_team_group'), {
            'name': 'Dev Python Team',
            'description': 'Working on Python',
            'users': [self.emp_user1.id]
        })
        self.assertEqual(response.status_code, 200)
        data = response.json()
        room_id = data['room']['id']

        # emp1 (member) fetches history and succeeds
        response = self.emp1_client.get(reverse('get_chat_history'), {'room_id': room_id})
        self.assertEqual(response.status_code, 200)

        # emp2 (non-member) fetches history and is denied (403)
        response = self.emp2_client.get(reverse('get_chat_history'), {'room_id': room_id})
        self.assertEqual(response.status_code, 403)

    def test_message_editing_time_limit(self):
        # Create private message
        msg = ChatMessage.objects.create(
            sender=self.emp_user1,
            receiver=self.emp_user2,
            text='Original Text'
        )

        # Edit text succeeds within 10 minutes
        response = self.emp1_client.post(reverse('edit_chat_message'), json.dumps({
            'message_id': msg.id,
            'is_group': False,
            'text': 'Edited Text'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        msg.refresh_from_db()
        self.assertEqual(msg.text, 'Edited Text')
        self.assertTrue(msg.edited)

        # Change created_at to 15 minutes ago
        msg.created_at = timezone.now() - timedelta(minutes=15)
        msg.save()

        # Edit text fails after 10 minutes
        response = self.emp1_client.post(reverse('edit_chat_message'), json.dumps({
            'message_id': msg.id,
            'is_group': False,
            'text': 'New Edited Text'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        msg.refresh_from_db()
        self.assertEqual(msg.text, 'Edited Text')

    def test_reactions(self):
        msg = ChatMessage.objects.create(
            sender=self.emp_user1,
            receiver=self.emp_user2,
            text='A reactive post!'
        )

        # emp2 reacts with thumbs up
        response = self.emp2_client.post(reverse('toggle_reaction'), json.dumps({
            'message_id': msg.id,
            'is_group': False,
            'emoji': '👍'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('👍', data['reactions'])
        self.assertIn(self.emp_user2.id, data['reactions']['👍']['users'])

        # emp2 toggles reaction (removes thumbs up)
        response = self.emp2_client.post(reverse('toggle_reaction'), json.dumps({
            'message_id': msg.id,
            'is_group': False,
            'emoji': '👍'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertNotIn('👍', data['reactions'])

    def test_presence_update(self):
        # Verify initial offline or empty status
        presence = UserPresence.objects.filter(user=self.emp_user1).first()
        self.assertTrue(presence is None or presence.status == 'Offline')

        # emp1 updates presence to Away
        response = self.emp1_client.post(reverse('update_presence'), json.dumps({
            'status': 'Away'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        presence = UserPresence.objects.get(user=self.emp_user1)
        self.assertEqual(presence.status, 'Away')

    def test_call_signal_initiate_accept_reject_end(self):
        # 1. Initiate call from HR to Employee (allowed)
        response = self.hr_client.post(reverse('call_signal'), json.dumps({
            'action': 'initiate',
            'receiver_id': self.emp_user1.id,
            'call_type': 'video',
            'sdp': '{"type":"offer","sdp":"..."}'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['status'], 'success')
        session_id = data['session_id']

        # 2. Employee polls and finds incoming call
        response = self.emp1_client.post(reverse('call_signal'), json.dumps({
            'action': 'poll'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('incoming_call', data)
        self.assertEqual(data['incoming_call']['session_id'], session_id)

        # 3. Employee accepts call
        response = self.emp1_client.post(reverse('call_signal'), json.dumps({
            'action': 'accept',
            'session_id': session_id,
            'sdp': '{"type":"answer","sdp":"..."}'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # 4. Employee ends call
        response = self.emp1_client.post(reverse('call_signal'), json.dumps({
            'action': 'end',
            'session_id': session_id
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_call_signal_employee_cannot_call_md(self):
        # Employee tries to call MD directly and should be rejected with 403 Forbidden
        response = self.emp1_client.post(reverse('call_signal'), json.dumps({
            'action': 'initiate',
            'receiver_id': self.md_user.id,
            'call_type': 'voice',
            'sdp': '{"type":"offer","sdp":"..."}'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 403)

    def test_schedule_meeting(self):
        # Schedule meeting from HR user
        response = self.hr_client.post(reverse('schedule_meeting'), {
            'title': 'Sprint Planning',
            'description': 'Sprint 2 planning session',
            'scheduled_time': (timezone.now() + timedelta(days=1)).isoformat(),
            'duration_minutes': '45',
            'users': [self.emp_user1.id, self.emp_user2.id],
            'recurrence': 'none',
            'waiting_room': 'true'
        })
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['status'], 'success')
        self.assertEqual(data['meeting']['title'], 'Sprint Planning')
        
        # Verify a DM notification was sent to invited users
        from .models import ChatMessage
        notifications = ChatMessage.objects.filter(sender=self.hr_user, receiver=self.emp_user1)
        self.assertTrue(notifications.exists())
        self.assertIn("Sprint Planning", notifications.first().text)

        # Retrieve scheduled meetings list for Employee 1
        response = self.emp1_client.get(reverse('schedule_meeting'))
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['status'], 'success')
        self.assertTrue(len(data['meetings']) > 0)
        self.assertEqual(data['meetings'][0]['title'], 'Sprint Planning')


class OfferDocumentPipelineTests(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.hr_user = User.objects.create_user(username='offer_hr', password='pass', role='HR', email='hr-offer@test.com')
        self.md_user = User.objects.create_user(username='offer_md', password='pass', role='MD', email='md-offer@test.com')

    def _published_policy(self):
        sections = {
            key: f'Approved company policy wording for {key}. ' * 8
            for key in OFFER_POLICY_SECTION_KEYS
        }
        policy = OfferLetterPolicyVersion.objects.create(
            name='Employment Terms',
            version='test-1',
            employment_category='All',
            employment_type='All',
            effective_date=date.today() - timedelta(days=1),
            company_details=self._company_details(),
            sections=sections,
            annexures=self._approved_annexures(),
            status='Published',
            legal_approved=True,
            legal_reviewer_name='Qualified Reviewer',
            legal_approval_note='Reviewed for test coverage.',
            created_by=self.md_user,
        )
        return policy

    def _company_details(self):
        return {
            'legal_name': 'YGR Global IT Services Pvt. Ltd.',
            'registered_office_address': 'Registered office address used by test fixtures.',
            'cin': 'TEST-CIN-0001',
            'gstin': '',
            'official_email': 'hr@example.test',
            'website': 'https://example.test',
            'authorized_signatory_name': 'Authorized Test Signatory',
            'authorized_signatory_title': 'Managing Director',
        }

    def _approved_annexures(self):
        undertaking_sections = {
            key: f'Approved undertaking language for {key}. ' * 8
            for key in (
                'confidential_information', 'data_handling', 'confidentiality_obligations',
                'intellectual_property', 'return_deletion', 'employee_acknowledgement',
            )
        }
        return [
            {'code': 'B', 'title': 'Approved benefits', 'benefit_sections': {
                key: f'Approved benefits wording for {key}. ' * 8
                for key in ('medical_insurance', 'leave_entitlements', 'paid_holidays', 'training_development', 'performance_incentives', 'other_benefits')
            }, 'enabled': True},
            {'code': 'C', 'title': 'Confidentiality and IP undertaking', 'sections': undertaking_sections, 'enabled': True},
            {'code': 'D', 'title': 'Joining documentation checklist', 'items': ['PAN', 'Identity proof', 'Address proof', 'Education certificates', 'Bank details'], 'enabled': True},
        ]

    def test_policy_requires_review_and_published_versions_are_locked(self):
        sections = {key: f'Approved company policy wording for {key}. ' * 8 for key in OFFER_POLICY_SECTION_KEYS}
        payload = {
            'name': 'Employment Terms',
            'version': '2026-test',
            'employment_category': 'All',
            'employment_type': 'All',
            'effective_date': date.today().isoformat(),
            'company_details': {},
            'sections': sections,
            'annexures': [],
        }
        request = self.factory.post('/api/offer-policy-versions/', payload, format='json')
        force_authenticate(request, user=self.hr_user)
        created = OfferLetterPolicyAPIView.as_view()(request)
        self.assertEqual(created.status_code, 201)
        policy_id = created.data['id']

        request = self.factory.post(f'/api/offer-policy-versions/{policy_id}/publish/', {}, format='json')
        force_authenticate(request, user=self.hr_user)
        blocked = OfferLetterPolicyPublishAPIView.as_view()(request, pk=policy_id)
        self.assertEqual(blocked.status_code, 400)

        payload.update({
            'legal_approved': True,
            'legal_reviewer_name': 'Qualified Reviewer',
            'legal_approval_note': 'Reviewed for test coverage.',
            'company_details': self._company_details(),
            'annexures': self._approved_annexures(),
        })
        request = self.factory.put(f'/api/offer-policy-versions/{policy_id}/', payload, format='json')
        force_authenticate(request, user=self.md_user)
        updated = OfferLetterPolicyDetailAPIView.as_view()(request, pk=policy_id)
        self.assertEqual(updated.status_code, 200)

        request = self.factory.post(f'/api/offer-policy-versions/{policy_id}/publish/', {}, format='json')
        force_authenticate(request, user=self.md_user)
        published = OfferLetterPolicyPublishAPIView.as_view()(request, pk=policy_id)
        self.assertEqual(published.status_code, 200)
        self.assertEqual(published.data['status'], 'Published')

        request = self.factory.put(f'/api/offer-policy-versions/{policy_id}/', payload, format='json')
        force_authenticate(request, user=self.md_user)
        immutable = OfferLetterPolicyDetailAPIView.as_view()(request, pk=policy_id)
        self.assertEqual(immutable.status_code, 400)

    def test_approval_snapshots_policy_and_preview_uses_snapshot(self):
        policy = self._published_policy()
        offer_payload = {
            'candidate_name': 'Fresher Sample',
            'candidate_email': 'fresher@test.com',
            'candidate_address': '12 Test Street, Hyderabad, Telangana',
            'job_title': 'Software Engineer',
            'department': 'Engineering',
            'employment_type': 'Full-time',
            'employment_category': 'Fresher',
            'work_location': 'Hyderabad',
            'reporting_manager_name': 'Engineering Manager',
            'offered_ctc': '1200000.00',
            'monthly_gross': '90000.00',
            'basic_salary': '50000.00',
            'hra': '25000.00',
            'special_allowance': '15000.00',
            'provident_fund': '10000.00',
            'joining_date': (date.today() + timedelta(days=30)).isoformat(),
            'offer_validity_date': (date.today() + timedelta(days=7)).isoformat(),
            'policy_version': policy.id,
            'annexures': ['B', 'C', 'D'],
            'status': 'Draft',
        }
        request = self.factory.post('/api/offer-letters/', offer_payload, format='json')
        force_authenticate(request, user=self.hr_user)
        created = OfferLetterAPIView.as_view()(request)
        self.assertEqual(created.status_code, 201, created.data)
        offer_id = created.data['id']

        offer = OfferLetter.objects.get(pk=offer_id)
        offer.offered_ctc = 1100000
        offer.save(update_fields=['offered_ctc'])
        request = self.factory.post(f'/api/offer-letters/{offer_id}/action/', {'action': 'approve'}, format='json')
        force_authenticate(request, user=self.md_user)
        mismatch = OfferLetterActionAPIView.as_view()(request, pk=offer_id)
        self.assertEqual(mismatch.status_code, 400)
        offer.offered_ctc = 1200000
        offer.save(update_fields=['offered_ctc'])

        with patch('hr.letter_service.generate_offer_letter_pdf', return_value=(False, 'mock failure')):
            request = self.factory.post(f'/api/offer-letters/{offer_id}/action/', {'action': 'approve'}, format='json')
            force_authenticate(request, user=self.md_user)
            failed_pdf = OfferLetterActionAPIView.as_view()(request, pk=offer_id)
        self.assertEqual(failed_pdf.status_code, 500)
        offer.refresh_from_db()
        self.assertEqual(offer.status, 'Draft')
        self.assertEqual(offer.policy_snapshot, {})

        with patch('hr.letter_service.generate_offer_letter_pdf', return_value=(True, '/mock.pdf')):
            request = self.factory.post(f'/api/offer-letters/{offer_id}/action/', {'action': 'approve'}, format='json')
            force_authenticate(request, user=self.md_user)
            approved = OfferLetterActionAPIView.as_view()(request, pk=offer_id)
        self.assertEqual(approved.status_code, 200, approved.data)
        offer = OfferLetter.objects.get(pk=offer_id)
        self.assertEqual(offer.policy_snapshot['version'], 'test-1')
        self.assertTrue(OfferLetterAudit.objects.filter(offer=offer, action='approved').exists())
        request = self.factory.get(f'/api/offer-letters/{offer_id}/audit/')
        force_authenticate(request, user=self.hr_user)
        audit = OfferLetterAuditAPIView.as_view()(request, pk=offer_id)
        self.assertEqual(audit.status_code, 200)
        self.assertTrue(any(event['action'] == 'approved' for event in audit.data))

        policy.sections = {key: 'Changed future wording.' for key in OFFER_POLICY_SECTION_KEYS}
        policy.save(update_fields=['sections'])
        request = self.factory.get(f'/api/offer-letters/{offer_id}/preview/')
        force_authenticate(request, user=self.hr_user)
        preview = OfferLetterPreviewAPIView.as_view()(request, pk=offer_id)
        self.assertEqual(preview['Content-Type'], 'application/pdf')
        pdf_text = '\n'.join(page.extract_text() or '' for page in PdfReader(BytesIO(preview.content)).pages)
        self.assertIn('Approved company policy wording for appointment.', pdf_text)
        self.assertNotIn('Changed future wording.', pdf_text)

    def test_employee_categories_generate_multipage_pdfs(self):
        from hr.letter_service import render_offer_letter_html

        long_text = 'Approved policy content for document pagination. ' * 35
        sections = {key: long_text for key in OFFER_POLICY_SECTION_KEYS}
        for category in ('Fresher', 'Experienced', 'Senior', 'Contract'):
            offer = OfferLetter(
                candidate_name=f'{category} Candidate',
                candidate_email='candidate@test.com',
                job_title='Software Engineer',
                department='Engineering',
                employment_type='Contract' if category == 'Contract' else 'Full-time',
                employment_category=category,
                work_location='Hyderabad',
                offered_ctc=1200000,
                monthly_gross=90000,
                basic_salary=50000,
                hra=25000,
                special_allowance=15000,
                provident_fund=10000,
                joining_date=date.today() + timedelta(days=30),
                reference_number=f'YGR/TEST/{category}',
                created_at=timezone.now(),
                policy_snapshot={
                    'name': 'Employment Terms',
                    'version': 'test-1',
                    'sections': sections,
                    'company_details': self._company_details(),
                    'annexures': self._approved_annexures() + [{'code': 'E', 'title': 'Role conditions', 'content': 'Role conditions fixture.', 'enabled': True}],
                },
            )
            html = render_offer_letter_html(offer)
            output = BytesIO()
            result = pisa.CreatePDF(html, dest=output, encoding='UTF-8')
            self.assertFalse(result.err)
            reader = PdfReader(BytesIO(output.getvalue()))
            self.assertGreaterEqual(len(reader.pages), 4, category)
            page_text = [page.extract_text() or '' for page in reader.pages]
            extracted = '\n'.join(page_text)
            for page_number, text in enumerate(page_text, start=1):
                self.assertTrue(text.strip(), f'Unexpected blank page {page_number} for {category}')
                self.assertIn(f'Page {page_number} of {len(reader.pages)}', text)
            self.assertIn(category, extracted)
            self.assertIn('Candidate declaration', extracted)
            for code in ('Annexure A', 'Annexure B', 'Annexure C', 'Annexure D', 'Annexure E'):
                self.assertIn(code, extracted)

    def test_non_hr_cannot_manage_policy_or_create_offer(self):
        employee = User.objects.create_user(username='offer_employee', password='pass', role='Employee', email='employee@test.com')
        request = self.factory.get('/api/offer-policy-versions/')
        force_authenticate(request, user=employee)
        policies = OfferLetterPolicyAPIView.as_view()(request)
        self.assertEqual(policies.status_code, 403)

        request = self.factory.post('/api/offer-letters/', {'candidate_name': 'Unauthorized'}, format='json')
        force_authenticate(request, user=employee)
        created = OfferLetterAPIView.as_view()(request)
        self.assertEqual(created.status_code, 403)

