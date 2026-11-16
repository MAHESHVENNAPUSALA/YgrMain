with open(r"D:\YgrMain\YgrMain\Backend\hr\models.py", "r", encoding="utf-8") as f:
    text = f.read()

idx2 = text.find("class SalaryStructure")
if idx2 != -1:
    print(text[idx2+1200:idx2+3500])

