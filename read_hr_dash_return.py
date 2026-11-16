with open(r"D:\YgrMain\YgrMain\Backend\hr\api_views.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class HRDashboardAPIView")
idx_end = text.find("return Response({", idx)
print(text[idx_end:idx_end+1500])

