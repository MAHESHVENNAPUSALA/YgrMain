with open(r"D:\YgrMain\YgrMain\Backend\main\email_service.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class HREmailService")
if idx == -1:
    idx = text.find("HREmailService")
print(text[idx-100:idx+2500])

