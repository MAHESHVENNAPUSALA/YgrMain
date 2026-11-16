import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
import django
django.setup()

from django.db import connection

with connection.cursor() as cursor:
    cursor.execute("SELECT app, name, applied FROM django_migrations ORDER BY applied DESC")
    rows = cursor.fetchall()[:20]
    for r in rows:
        print(f"{r[0]} -> {r[1]} (applied: {r[2]})")

