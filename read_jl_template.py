with open(r"D:\YgrMain\YgrMain\Backend\main\templates\employee\joining_letter_pdf.html", "r", encoding="utf-8") as f:
    text = f.read()

lines = text.splitlines()
print("Total lines:", len(lines))
print("\n".join(lines[:120]))

