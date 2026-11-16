import os

for root, dirs, files in os.walk(r"D:\YgrMain\YgrMain\Backend"):
    for f in files:
        if f.endswith('urls.py'):
            print(os.path.join(root, f))

