with open(r"D:\YgrMain\YgrMain\Backend\hr\models.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class SalaryStructure")
print(text[idx:idx+1500])

