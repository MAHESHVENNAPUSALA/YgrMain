with open(r"D:\YgrMain\YgrMain\frontend\src\hrm\components\Sidebar.jsx", "r", encoding="utf-8") as f:
    text = f.read()
    idx = text.find("<nav")
    if idx == -1:
        idx = text.find("<aside")
    if idx == -1:
        idx = text.find("sidebar")
    print(text[idx:idx+3500])

