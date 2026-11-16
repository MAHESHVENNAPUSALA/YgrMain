with open(r"D:\YgrMain\YgrMain\frontend\src\hrm\components\Sidebar.jsx", "r", encoding="utf-8") as f:
    text = f.read()
    idx = text.find("user.role === 'HR'")
    if idx == -1:
        idx = text.find("user.role === 'Employee'")
    print(text[idx-100:idx+3500])

