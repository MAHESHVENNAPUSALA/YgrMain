with open(r"D:\YgrMain\YgrMain\Backend\hr\serializers.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class PayslipSerializer")
if idx != -1:
    print(text[idx:idx+2000])

