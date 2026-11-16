with open(r"D:\YgrMain\YgrMain\Backend\hr\api_views.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class PayslipActionAPIView")
if idx != -1:
    print(text[idx:idx+2500])

