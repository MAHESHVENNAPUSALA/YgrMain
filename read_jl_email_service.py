with open(r"D:\YgrMain\YgrMain\Backend\main\email_service.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("def send_joining_letter")
print(text[idx:idx+2500])

