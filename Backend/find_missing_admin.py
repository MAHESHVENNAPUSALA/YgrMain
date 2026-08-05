import os
import django
import sys

sys.path.append('e:\\ygrpannel0\\Backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

from django.apps import apps
from django.contrib import admin
import hr.admin

hr_models = apps.get_app_config('hr').get_models()
registered_models = admin.site._registry.keys()

missing_models = [m.__name__ for m in hr_models if m not in registered_models]
print("All models in hr:", [m.__name__ for m in hr_models])
print("Missing from admin:", missing_models)
