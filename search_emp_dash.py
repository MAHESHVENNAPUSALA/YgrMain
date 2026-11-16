with open(r"D:\YgrMain\YgrMain\frontend\src\hrm\pages\EmployeeDashboard.jsx", "r", encoding="utf-8") as f:
    text = f.read()
    for word in ['payslip', 'document', 'letter']:
        print(f"=== Occurrences of {word} ===")
        pos = 0
        while True:
            idx = text.lower().find(word, pos)
            if idx == -1: break
            print(text[max(0, idx-50):min(len(text), idx+100)].replace('\n', ' '))
            pos = idx + len(word) + 50

