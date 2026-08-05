import sys
import re

file_path = r"E:\ygrpannel0\Backend\hr\api_views.py"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Fix UnboundLocalError by removing local import of timezone and using top-level import
# The top-level import "from django.utils import timezone" already exists in api_views.py!
# We just need to remove the local import inside the loop.
text = text.replace("                from django.utils import timezone\n", "")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Fixed UnboundLocalError")
