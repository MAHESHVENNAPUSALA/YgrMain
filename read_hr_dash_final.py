with open(r"D:\YgrMain\YgrMain\Backend\hr\api_views.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class HRDashboardAPIView")
idx_next_class = text.find("class ", idx + 30)
hr_dash_body = text[idx:idx_next_class]
idx_last_return = hr_dash_body.rfind("return Response(")
print(hr_dash_body[idx_last_return:idx_last_return+1200])

