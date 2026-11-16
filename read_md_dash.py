with open(r"D:\YgrMain\YgrMain\Backend\hr\api_views.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class MDDashboardAPIView")
print(text[idx+1500:idx+3500])

