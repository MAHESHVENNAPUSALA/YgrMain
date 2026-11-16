with open(r"D:\YgrMain\YgrMain\Backend\hr\serializers.py", "r", encoding="utf-8") as f:
    text = f.read()

lines = text.splitlines()
print("Total lines:", len(lines))
print("\n".join(lines[-40:]))

