with open(r"D:\YgrMain\YgrMain\Backend\hr\models.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class JoiningLetter")
if idx != -1:
    print("=== JOINING LETTER MODEL ===")
    print(text[idx:idx+2500])

idx2 = text.find("class SalaryStructure")
if idx2 != -1:
    print("\n=== SALARY STRUCTURE MODEL ===")
    print(text[idx2:idx2+2500])

