with open(r"D:\YgrMain\YgrMain\Backend\hr\serializers.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class SalaryStructureSerializer")
if idx != -1:
    print(text[idx:idx+1500])

