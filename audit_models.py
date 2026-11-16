import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
import django
django.setup()

from django.apps import apps

print("=== INSTALLED APPS ===")
for app in apps.get_app_configs():
    if 'YgrMain' in app.path or 'Backend' in app.path:
        print(f"App: {app.name} -> {app.path}")
        for model in app.get_models():
            print(f"  Model: {model.__name__} (table: {model._meta.db_table})")

print("\n=== PAYSLIP & SALARY RELATED MODELS IN HR & MAIN ===")
for app_label in ['hr', 'main', 'employee']:
    try:
        app = apps.get_app_config(app_label)
        for model in app.get_models():
            print(f"\nModel: {model.__name__} in {app_label}")
            for field in model._meta.get_fields():
                print(f"   {field.name} ({field.get_internal_type() if hasattr(field, 'get_internal_type') else type(field).__name__})")
    except Exception as e:
        print(f"App {app_label} error: {e}")

