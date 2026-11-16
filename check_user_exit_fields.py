import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
import django
django.setup()

from hr.models import User

exit_fields = [f.name for f in User._meta.get_fields() if any(k in f.name for k in ['exit', 'resign', 'last_working', 'notice', 'join'])]
print("User fields matching exit/resign/join/notice:", exit_fields)

