import os

for path in [
    r"D:\YgrMain\YgrMain\Backend\hr\urls.py",
    r"D:\YgrMain\YgrMain\Backend\hrpanel\urls.py",
]:
    with open(path, "r", encoding="utf-8") as f:
        print(f"=== {os.path.basename(path)} ===")
        lines = f.readlines()
        for l in lines:
            if any(k in l for k in ['joining', 'offer', 'payslip', 'salary', 'document', 'relieving', 'dashboard']):
                print("  ", l.strip())

