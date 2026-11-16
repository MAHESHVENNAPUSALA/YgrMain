from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from main.models import InternshipRegistration, InternshipEmailLog
from main.email_service import YGREmailService

class Command(BaseCommand):
    help = 'Sends payment reminder emails to candidates who have registered but not paid'

    def handle(self, *args, **kwargs):
        # We target candidates who registered more than 24 hours ago, but less than 7 days ago
        now = timezone.now()
        yesterday = now - timedelta(days=1)
        seven_days_ago = now - timedelta(days=7)
        
        pending_candidates = InternshipRegistration.objects.filter(
            status='Registered',
            created_at__lte=yesterday,
            created_at__gte=seven_days_ago
        )
        
        count = 0
        for candidate in pending_candidates:
            # Check if we already sent a reminder in the last 3 days
            three_days_ago = now - timedelta(days=3)
            recent_reminder = InternshipEmailLog.objects.filter(
                registration=candidate,
                email_type='Payment Pending',
                sent_at__gte=three_days_ago
            ).exists()
            
            if not recent_reminder:
                success = YGREmailService.send_payment_reminder(candidate)
                if success:
                    count += 1
                    
        self.stdout.write(self.style.SUCCESS(f'Successfully sent {count} payment reminder emails.'))
