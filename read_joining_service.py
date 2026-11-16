with open(r"D:\YgrMain\YgrMain\Backend\hr\letter_service.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("def render_joining_letter_html")
if idx != -1:
    print(text[idx:idx+3000])

