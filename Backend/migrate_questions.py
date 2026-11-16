import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

from hr.models import Question as hrQ
from main.models import Question as mainQ

for q in hrQ.objects.all():
    mainQ.objects.update_or_create(
        id=q.id,
        defaults={
            'language': q.language,
            'question_text': q.question_text,
            'option_a': q.option_a,
            'option_b': q.option_b,
            'option_c': q.option_c,
            'option_d': q.option_d,
            'correct_option': q.correct_option
        }
    )
print("Migration completed.")
