with open(r"D:\YgrMain\YgrMain\Backend\main\email_service.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.rfind("HREmailService = YGREmailService")
print(text[idx-500:idx+100])

