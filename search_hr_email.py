with open(r"D:\YgrMain\YgrMain\Backend\main\email_service.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class HREmailService")
if idx != -1:
    print(text[idx:idx+3500])
else:
    print("HREmailService not found as class")
    idx2 = text.find("send_payslip")
    if idx2 != -1:
        print(text[idx2-200:idx2+2000])

