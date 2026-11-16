routes_path = r"D:\YgrMain\YgrMain\frontend\src\shared\constants\routes.js"

with open(routes_path, "r", encoding="utf-8") as f:
    text = f.read()

target = "HRMS_JOINING_LETTERS: '/joining-letters'," if "HRMS_JOINING_LETTERS" in text else "HRMS_PAYSLIPS: '/payslips',"
if "HRMS_RELIEVING_LETTERS" not in text:
    text = text.replace("HRMS_PAYSLIPS: '/payslips',", "HRMS_PAYSLIPS: '/payslips',\n  HRMS_RELIEVING_LETTERS: '/relieving-letters',")
    with open(routes_path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Added HRMS_RELIEVING_LETTERS to routes.js")
else:
    print("HRMS_RELIEVING_LETTERS already in routes.js")

