import os

templates_dir = r"D:\YgrMain\YgrMain\Backend\main\templates\emails"
for f in os.listdir(templates_dir):
    print("Email template:", f)

