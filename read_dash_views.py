with open(r"D:\YgrMain\YgrMain\Backend\hr\api_views.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class HRDashboardAPIView")
print("HRDashboardAPIView:")
print(text[idx:idx+1500])

idx2 = text.find("class MDDashboardAPIView")
print("\nMDDashboardAPIView:")
print(text[idx2:idx2+1500])

