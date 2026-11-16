with open(r"D:\YgrMain\YgrMain\Backend\hr\api_views.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class JoiningLetterActionAPIView")
if idx != -1:
    print(text[idx:idx+3000])

