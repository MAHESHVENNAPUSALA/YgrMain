import os
import django
import sys
from datetime import date

sys.path.append('e:\\ygrpannel0\\Backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

from hr.models import Holiday, User
from django.utils import timezone

hr_user = User.objects.filter(role='HR').first()
print(f"Using HR user: {hr_user}")

try:
    holiday = Holiday.objects.create(
        name="Test Holiday Obj",
        date=date(2024, 7, 26),
        department="",
        status="Pending",
        created_by=hr_user,
    )
    print(f"Created holiday: {holiday.id} with status: {holiday.status}")
except Exception as e:
    print(f"Error: {e}")
