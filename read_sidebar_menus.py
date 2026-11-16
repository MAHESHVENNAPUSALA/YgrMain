with open(r"D:\YgrMain\YgrMain\frontend\src\hrm\components\Sidebar.jsx", "r", encoding="utf-8") as f:
    text = f.read()
    idx = text.find("hrMenu")
    if idx != -1:
        print(text[idx-200:idx+2500])

