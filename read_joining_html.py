with open(r"D:\YgrMain\YgrMain\Backend\main\templates\employee\joining_letter_pdf.html", "r", encoding="utf-8") as f:
    text = f.read()
    print("Length joining_letter_pdf.html:", len(text))
    print(text[:2500])

