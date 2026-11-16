with open(r"D:\YgrMain\YgrMain\Backend\hr\models.py", "r", encoding="utf-8") as f:
    lines = f.readlines()
    for i, l in enumerate(lines):
        if "class SalaryStructure" in l:
            print("SalaryStructure starts at line:", i+1)
            print("".join(lines[i:i+80]))
            break

