import os

models_path = r"D:\YgrMain\YgrMain\Backend\hr\models.py"

with open(models_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add SalaryComponent before SalaryStructure
salary_component_code = '''
class SalaryComponent(models.Model):
    COMPONENT_TYPES = [
        ('EARNING', 'Earning'),
        ('DEDUCTION', 'Employee Deduction'),
        ('EMPLOYER_CONTRIBUTION', 'Employer Contribution'),
    ]
    CALCULATION_TYPES = [
        ('FLAT', 'Flat Amount'),
        ('PERCENTAGE_BASIC', 'Percentage of Basic Salary'),
        ('PERCENTAGE_GROSS', 'Percentage of Gross Salary'),
    ]

    component_name = models.CharField(max_length=100)
    component_code = models.CharField(max_length=50, unique=True)
    component_type = models.CharField(max_length=30, choices=COMPONENT_TYPES)
    calculation_type = models.CharField(max_length=30, choices=CALCULATION_TYPES, default='FLAT')
    default_value = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_taxable = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True, default='')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order', 'component_name']

    def __str__(self):
        return f"{self.component_name} ({self.get_component_type_display()})"


class SalaryStructure(models.Model):
'''

content = content.replace("class SalaryStructure(models.Model):", salary_component_code)

# 2. In SalaryStructure, add new fields
old_struct_start = '''class SalaryStructure(models.Model):
    employee = models.OneToOneField('User', on_delete=models.CASCADE, related_name='salary_structure')
    effective_date = models.DateField(default=timezone.now)
    monthly_gross = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Earnings structure (monthly bases)
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    hra = models.DecimalField(max_digits=10, decimal_places=2, default=0)'''

new_struct_start = '''class SalaryStructure(models.Model):
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

if old_struct_start in content:
    content = content.replace(old_struct_start, new_struct_start)
    print("Updated SalaryStructure fields")
else:
    print("WARNING: old_struct_start not found in content!")

# 3. Update gross_salary in SalaryStructure
old_struct_gross = '''    @property
    def gross_salary(self):
        from decimal import Decimal
        return (
            Decimal(str(self.basic_salary or 0)) +
            Decimal(str(self.hra or 0)) +
            Decimal(str(self.transport_allowance or 0)) +
            Decimal(str(self.medical_allowance or 0)) +
            Decimal(str(self.special_allowance or 0)) +
            Decimal(str(self.bonus or 0))
        )'''

new_struct_gross = '''    @property
    def gross_salary(self):
        from decimal import Decimal
        return (
            Decimal(str(self.basic_salary or 0)) +
            Decimal(str(self.hra or 0)) +
            Decimal(str(self.food_allowance or 0)) +
            Decimal(str(self.travel_allowance or self.transport_allowance or 0)) +
            Decimal(str(self.medical_allowance or 0)) +
            Decimal(str(self.special_allowance or 0)) +
            Decimal(str(self.other_allowances or 0)) +
            Decimal(str(self.bonus or 0))
        )'''

if old_struct_gross in content:
    content = content.replace(old_struct_gross, new_struct_gross)
    print("Updated SalaryStructure gross_salary property")
else:
    print("WARNING: old_struct_gross not found in content!")

# 4. Enhance SalaryHistory
old_hist_start = '''class SalaryHistory(models.Model):
    employee = models.ForeignKey('User', on_delete=models.CASCADE, related_name='salary_history')
    effective_date = models.DateField(default=timezone.now)
    revised_by = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True, related_name='revised_salaries')
    reason = models.CharField(max_length=255, blank=True, default='Salary Revision')
    
    monthly_gross = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    hra = models.DecimalField(max_digits=10, decimal_places=2, default=0)'''

new_hist_start = '''class SalaryHistory(models.Model):
    employee = models.ForeignKey('User', on_delete=models.CASCADE, related_name='salary_history')
    effective_date = models.DateField(default=timezone.now)
    revised_by = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True, related_name='revised_salaries')
    reason = models.CharField(max_length=255, blank=True, default='Salary Revision')
    
    annual_ctc = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    monthly_ctc = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    monthly_gross = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    hra = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    food_allowance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    travel_allowance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    other_allowances = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    employer_pf = models.DecimalField(max_digits=10, decimal_places=2, default=0)'''

if old_hist_start in content:
    content = content.replace(old_hist_start, new_hist_start)
    print("Updated SalaryHistory fields")
else:
    print("WARNING: old_hist_start not found in content!")

# 5. Enhance Payslip
old_payslip_fields = '''    month = models.PositiveSmallIntegerField(choices=MONTH_CHOICES)
    year = models.PositiveIntegerField()

    # Earnings
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    hra = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="HRA")'''

new_payslip_fields = '''    payslip_number = models.CharField(max_length=100, unique=True, null=True, blank=True)
    salary_structure = models.ForeignKey('SalaryStructure', on_delete=models.SET_NULL, null=True, blank=True, related_name='payslips')
    month = models.PositiveSmallIntegerField(choices=MONTH_CHOICES)
    year = models.PositiveIntegerField()
    pay_period_start = models.DateField(null=True, blank=True)
    pay_period_end = models.DateField(null=True, blank=True)

    # Earnings
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    hra = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="HRA")
    food_allowance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    travel_allowance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    other_earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0)'''

if old_payslip_fields in content:
    content = content.replace(old_payslip_fields, new_payslip_fields)
    print("Updated Payslip fields (payslip_number, salary_structure, food_allowance, travel_allowance, etc.)")
else:
    print("WARNING: old_payslip_fields not found in content!")

# Update payment_date area in Payslip
old_pay_date = '''    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft')
    payment_date = models.DateField(null=True, blank=True)
    is_published = models.BooleanField(default=False)'''

new_pay_date = '''    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft')
    payment_date = models.DateField(null=True, blank=True)
    bank_reference = models.CharField(max_length=100, blank=True, null=True)
    is_published = models.BooleanField(default=False)'''

if old_pay_date in content:
    content = content.replace(old_pay_date, new_pay_date)
    print("Updated Payslip bank_reference")
else:
    print("WARNING: old_pay_date not found in content!")

# Update gross_salary & total_deductions in Payslip
old_payslip_gross = '''    @property
    def gross_salary(self):
        from decimal import Decimal
        return (
            self.basic_salary + self.hra + self.transport_allowance +
            self.medical_allowance + self.special_allowance + self.bonus
        )

    @property
    def total_deductions(self):
        return (
            self.pf_deduction + self.esi_deduction + self.professional_tax +
            self.tds + self.loan_deduction + self.other_deductions
        )'''

new_payslip_gross = '''    @property
    def gross_salary(self):
        from decimal import Decimal
        return (
            Decimal(str(self.basic_salary or 0)) +
            Decimal(str(self.hra or 0)) +
            Decimal(str(self.food_allowance or 0)) +
            Decimal(str(self.travel_allowance or self.transport_allowance or 0)) +
            Decimal(str(self.medical_allowance or 0)) +
            Decimal(str(self.special_allowance or 0)) +
            Decimal(str(self.bonus or 0)) +
            Decimal(str(self.other_earnings or 0))
        )

    @property
    def total_deductions(self):
        from decimal import Decimal
        return (
            Decimal(str(self.pf_deduction or 0)) +
            Decimal(str(self.esi_deduction or 0)) +
            Decimal(str(self.professional_tax or 0)) +
            Decimal(str(self.tds or 0)) +
            Decimal(str(self.loan_deduction or 0)) +
            Decimal(str(self.other_deductions or 0)) +
            Decimal(str(self.loss_of_pay or 0))
        )'''

if old_payslip_gross in content:
    content = content.replace(old_payslip_gross, new_payslip_gross)
    print("Updated Payslip gross_salary & total_deductions properties")
else:
    print("WARNING: old_payslip_gross not found in content!")

# Add save() method to Payslip to auto-generate payslip_number
old_payslip_str = '''    def __str__(self):
        return f"{self.employee.get_full_name() or self.employee.username} - {self.month_name} {self.year}"'''

new_payslip_str = '''    def save(self, *args, **kwargs):
        if not self.payslip_number and self.employee_id and self.month and self.year:
            emp_code = getattr(self.employee, 'emp_id', None) or f"EMP{self.employee_id}"
            self.payslip_number = f"PAY/{self.year}/{self.month:02d}/{emp_code}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee.get_full_name() or self.employee.username} - {self.month_name} {self.year} ({self.payslip_number or 'No Number'})"'''

if old_payslip_str in content:
    content = content.replace(old_payslip_str, new_payslip_str)
    print("Updated Payslip save and str methods")
else:
    print("WARNING: old_payslip_str not found in content!")

# 6. Add SalaryComponentBreakdown after PayslipDownloadLog
breakdown_code = '''
class SalaryComponentBreakdown(models.Model):
    payslip = models.ForeignKey(Payslip, on_delete=models.CASCADE, related_name='component_breakdowns')
    component = models.ForeignKey(SalaryComponent, on_delete=models.SET_NULL, null=True, blank=True)
    component_name = models.CharField(max_length=100)
    component_type = models.CharField(max_length=30)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.payslip_id} - {self.component_name}: ₹{self.amount}"
'''

idx_pdl = content.find("class PayslipDownloadLog")
if idx_pdl != -1:
    end_pdl = content.find("\nclass ", idx_pdl + 10)
    if end_pdl != -1:
        content = content[:end_pdl] + breakdown_code + content[end_pdl:]
        print("Added SalaryComponentBreakdown")
    else:
        content += breakdown_code
        print("Added SalaryComponentBreakdown at end")
else:
    print("WARNING: PayslipDownloadLog not found!")

# 7. Add RelievingLetter and RelievingLetterAudit at the very end of models.py
relieving_models_code = '''

class RelievingLetter(models.Model):
    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Pending Approval', 'Pending Approval'),
        ('Approved', 'Approved'),
        ('Issued', 'Issued'),
        ('Revoked', 'Revoked'),
    ]
    EMAIL_STATUS_CHOICES = [
        ('Not Sent', 'Not Sent'),
        ('Sending', 'Sending'),
        ('Sent', 'Sent'),
        ('Failed', 'Failed'),
    ]
    NOTICE_STATUS_CHOICES = [
        ('Served', 'Notice Period Served'),
        ('Waived', 'Notice Period Waived'),
        ('Shortfall', 'Notice Period Shortfall'),
    ]
    CLEARANCE_STATUS_CHOICES = [
        ('Completed', 'All Clearances Completed'),
        ('Pending', 'Clearances Pending'),
        ('Waived', 'Clearances Waived'),
    ]

    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='relieving_letters')
    employee_name = models.CharField(max_length=150)
    employee_email = models.EmailField()
    employee_phone = models.CharField(max_length=20, blank=True, default='')
    employee_address = models.TextField(blank=True, default='')
    employee_id_number = models.CharField(max_length=50, blank=True, default='')

    designation = models.CharField(max_length=150)
    department = models.CharField(max_length=100)
    employment_type = models.CharField(max_length=50, default='Full-time')
    reporting_manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='subordinate_relieving')
    reporting_manager_name = models.CharField(max_length=150, blank=True, default='')

    date_of_joining = models.DateField()
    last_working_day = models.DateField()
    resignation_submitted_date = models.DateField(null=True, blank=True)
    resignation_accepted_date = models.DateField(null=True, blank=True)

    notice_period_months = models.PositiveIntegerField(default=3)
    notice_period_days = models.PositiveIntegerField(default=90)
    notice_period_status = models.CharField(max_length=50, choices=NOTICE_STATUS_CHOICES, default='Served')
    clearance_status = models.CharField(max_length=50, choices=CLEARANCE_STATUS_CHOICES, default='Completed')
    reason_for_leaving = models.TextField(blank=True, default='')

    reference_number = models.CharField(max_length=100, unique=True)
    issue_date = models.DateField(null=True, blank=True)
    letter_content = models.TextField(blank=True, default='')

    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Draft')
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_relieving_letters')
    approved_at = models.DateTimeField(null=True, blank=True)
    issued_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='issued_relieving_letters')
    issued_at = models.DateTimeField(null=True, blank=True)

    pdf_file = models.FileField(upload_to='relieving_letters/', blank=True, null=True)

    email_status = models.CharField(max_length=20, choices=EMAIL_STATUS_CHOICES, default='Not Sent')
    email_sent_at = models.DateTimeField(null=True, blank=True)
    email_error = models.TextField(blank=True, null=True)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_relieving_letters')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Relieving: {self.employee_name} ({self.reference_number}) - {self.status}"


class RelievingLetterAudit(models.Model):
    letter = models.ForeignKey(RelievingLetter, on_delete=models.CASCADE, related_name='audit_events')
    actor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=50)
    details = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Audit {self.action} on {self.letter.reference_number}"
'''

content += relieving_models_code
print("Added RelievingLetter and RelievingLetterAudit models")

# Write updated file
with open(models_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully written models.py")

