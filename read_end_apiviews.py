with open(r"D:\YgrMain\YgrMain\Backend\hr\api_views.py", "r", encoding="utf-8") as f:
    lines = f.readlines()

print("Total lines:", len(lines))
print("".join(lines[-30:]))

