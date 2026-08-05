import sys

file_path = r"E:\ygrpannel0\Backend\hr\api_views.py"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Fix assigned_team in UserProfileAPIView
text = text.replace("_Q(assigned_team__assigned_to=user) | _Q(assigned_teams__lead=user)", "_Q(assigned_teams__members=user) | _Q(assigned_teams__lead=user)")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Fixed api_views.py profile bug")
