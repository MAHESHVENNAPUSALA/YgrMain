with open(r"D:\YgrMain\YgrMain\Backend\hr\models.py", "r", encoding="utf-8") as f:
    lines = f.readlines()
    for i, l in enumerate(lines):
        if "class Payslip(" in l:
            print("Payslip starts at line:", i+1)
        if "class PayslipDownloadLog" in l:
            print("Payslip ends before PayslipDownloadLog at line:", i+1)
            break

