with open(r"D:\YgrMain\YgrMain\Backend\hr\serializers.py", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if "class PayslipSerializer" in l:
        print("PayslipSerializer at line", i+1)
        print("".join(lines[i:i+85]))
        break

