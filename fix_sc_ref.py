models_path = r"D:\YgrMain\YgrMain\Backend\hr\models.py"

with open(models_path, "r", encoding="utf-8") as f:
    content = f.read()

target = "component = models.ForeignKey(SalaryComponent, on_delete=models.SET_NULL, null=True, blank=True)"
replacement = "component = models.ForeignKey('SalaryComponent', on_delete=models.SET_NULL, null=True, blank=True)"

content = content.replace(target, replacement)
with open(models_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated SalaryComponentBreakdown to use string 'SalaryComponent'")

