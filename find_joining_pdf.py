import os

for root, dirs, files in os.walk(r"D:\YgrMain\YgrMain\Backend"):
    for f in files:
        if f.endswith('.py'):
            p = os.path.join(root, f)
            try:
                with open(p, 'r', encoding='utf-8') as fh:
                    content = fh.read()
                    if 'joining_letter' in content and 'pdf' in content.lower():
                        print(f"Found in {p}")
            except Exception:
                pass

