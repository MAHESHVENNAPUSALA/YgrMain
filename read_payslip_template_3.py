with open(r"D:\YgrMain\YgrMain\Backend\main\templates\employee\payslip_pdf.html", "r", encoding="utf-8") as f:
    lines = f.readlines()
    print("".join(lines[250:400]))

