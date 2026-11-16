with open(r"D:\YgrMain\YgrMain\Backend\hr\models.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class Payslip(")
if idx != -1:
    print(text[idx:idx+3500])

