import sys

file_path = r"E:\ygrpannel0\Backend\hr\api_views.py"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Replace status='Final Approved' with status__in=['Approved', 'Final Approved']
text = text.replace("status='Final Approved'", "status__in=['Approved', 'Final Approved']")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Replaced successfully")
