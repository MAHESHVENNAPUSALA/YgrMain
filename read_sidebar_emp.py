with open(r"D:\YgrMain\YgrMain\frontend\src\hrm\components\Sidebar.jsx", "r", encoding="utf-8") as f:
    text = f.read()
    idx = text.find("user.role === 'Employee'")
    print(text[idx-50:idx+2000])

