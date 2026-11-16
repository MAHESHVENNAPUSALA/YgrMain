import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
import django
django.setup()

from hr.models import User, JobApplication, OfferLetter

for u in User.objects.filter(first_name__icontains='Purnima') | User.objects.filter(last_name__icontains='Purnima') | User.objects.filter(username__icontains='purnima'):
    print(f"Found User: id={u.id}, name={u.get_full_name()}, emp_id={u.emp_id}, desig={u.designation}")

for c in JobApplication.objects.filter(first_name__icontains='Purnima') | JobApplication.objects.filter(last_name__icontains='Purnima'):
    print(f"Found Candidate: id={c.id}, name={c.first_name} {c.last_name}, role={c.job_role}")

for o in OfferLetter.objects.filter(candidate_name__icontains='Purnima'):
    print(f"Found OfferLetter: id={o.id}, name={o.candidate_name}, ctc={o.offered_ctc}")

