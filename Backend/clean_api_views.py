import re

file_path = r"E:\ygrpannel0\Backend\hr\api_views.py"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if 'return Response({"performance_data":' in line and 'status=status.HTTP_403_FORBIDDEN' in line:
        print(f"Removing line {i+1}: {line.strip()}")
        continue
    
    # Fix final_percentage -> final_score
    if 'r.final_percentage' in line:
        line = line.replace('r.final_percentage', 'r.final_score')
        print(f"Fixed r.final_percentage on line {i+1}")
        
    new_lines.append(line)

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Fixed api_views.py")
