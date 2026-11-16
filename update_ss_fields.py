models_path = r"D:\YgrMain\YgrMain\Backend\hr\models.py"

with open(models_path, "r", encoding="utf-8") as f:
    content = f.read()

target = '''class SalaryStructure(models.Model):

    employee = models.OneToOneField('User', on_delete=models.CASCADE, related_name='salary_structure')
    effective_date = models.DateField(default=timezone.now)
    monthly_gross = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Earnings structure (monthly bases)
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    hra = models.DecimalField(max_digits=10, decimal_places=2, default=0)'''

replacement = '''class SalaryStructure(models.Model):

    employee = models.OneToOneField('User', on_delete=models.CASCADE, related_name='salary_structure')
    effective_date = models.DateField(default=timezone.now)
    effective_from = models.DateField(default=timezone.now)
    effective_to = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True, related_name='created_salary_structures')
    
    annual_ctc = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    monthly_ctc = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    monthly_gross = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Earnings structure (monthly bases)
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    hra = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    food_allowance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    travel_allowance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    other_allowances = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    employer_pf = models.DecimalField(max_digits=10, decimal_places=2, default=0)'''

if target in content:
    content = content.replace(target, replacement)
    with open(models_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully updated SalaryStructure fields!")
else:
    print("Target not found!")

