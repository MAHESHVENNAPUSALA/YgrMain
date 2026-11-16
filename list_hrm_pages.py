import os

hrm_pages = r"D:\YgrMain\YgrMain\frontend\src\hrm\pages"
files = sorted(os.listdir(hrm_pages))
for f in files:
    print(f)

