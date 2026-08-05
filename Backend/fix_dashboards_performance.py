import re

file_path = r"E:\ygrpannel0\Backend\hr\api_views.py"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

classes_to_fix = [
    ("EmployeeDashboardAPIView", "performance_data", "performance_data"),
    ("HRDashboardAPIView", "hr_performance_data", "performance_data"),
    ("TLDashboardAPIView", "team_performance_data", "performance_data"),
    ("ManagerDashboardAPIView", "mgr_performance_data", "performance_data"),
    ("MDDashboardAPIView", "md_performance_data", "performance_data")
]

for class_name, var_name, key_name in classes_to_fix:
    # Find the class block
    class_start = text.find(f"class {class_name}")
    if class_start == -1:
        print(f"Could not find class {class_name}")
        continue
    
    # Find the next class to bound our search
    next_class = re.search(r"^class ", text[class_start+1:], re.MULTILINE)
    class_end = class_start + 1 + next_class.start() if next_class else len(text)
    
    class_text = text[class_start:class_end]
    
    # Find the return Response({ ... }) block
    # We look for the last return Response in this class block
    matches = list(re.finditer(r"return Response\(\{", class_text))
    if not matches:
        print(f"Could not find return Response in {class_name}")
        continue
    
    last_match = matches[-1]
    idx = class_start + last_match.start()
    
    # Now find the closing '}' of the Response dict
    # We can scan forward for '}, status=status.HTTP_200_OK)' or similar
    resp_match = re.search(r"\}\s*,\s*status\s*=\s*status\.HTTP_200_OK\)", text[idx:])
    if not resp_match:
        print(f"Could not find closing Response pattern in {class_name}")
        continue
    
    close_idx = idx + resp_match.start()
    
    # Check if key is already there
    sub_text = text[idx:close_idx]
    if f'"{key_name}":' in sub_text or f"'{key_name}':" in sub_text:
        print(f"{key_name} already exists in {class_name}")
        continue
    
    # Insert before the closing brace
    # Let's determine indentation
    indent_match = re.search(r"\n(\s+)[^\n]+$", text[idx:close_idx])
    indent = indent_match.group(1) if indent_match else "            "
    
    # If the last item doesn't have a trailing comma, add one
    insert_str = ""
    last_line = text[idx:close_idx].rstrip()
    if not last_line.endswith(","):
        insert_str += ",\n" + indent
    else:
        insert_str += "\n" + indent
        
    insert_str += f'"{key_name}": {var_name},'
    
    text = text[:close_idx] + insert_str + text[close_idx:]
    print(f"Successfully injected {key_name} into {class_name}")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)
