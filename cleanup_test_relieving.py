import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
import django
django.setup()

from hr.models import RelievingLetter
deleted, _ = RelievingLetter.objects.filter(reference_number__startswith='TEST/').delete()
print(f"Deleted {deleted} test relieving letters.")

