with open(r"D:\YgrMain\YgrMain\Backend\hr\urls.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("joining-letters")
print(text[idx-200:idx+1500])

