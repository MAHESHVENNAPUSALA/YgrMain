with open('Backend/hr/serializers.py', 'r', encoding='utf-8') as f:
    c = f.read()

target = """class PayslipSerializer(serializers.ModelSerializer):
    net_salary = serializers.ReadOnlyField()
    gross_salary = serializers.ReadOnlyField()
    total_deductions = serializers.ReadOnlyField()
    month_name = serializers.ReadOnlyField()
    employee_emp_id = serializers.ReadOnlyField(source='employee.emp_id')
    employee_email = serializers.ReadOnlyField(source='employee.email')
    approved_by_name = serializers.SerializerMethodField()
    rejected_by_name = serializers.SerializerMethodField()
    audit_logs = PayrollAuditLogSerializer(many=True, read_only=True)"""

replacement = """class PayslipSerializer(serializers.ModelSerializer):
    net_salary = serializers.ReadOnlyField()
    gross_salary = serializers.ReadOnlyField()
    total_deductions = serializers.ReadOnlyField()
    month_name = serializers.ReadOnlyField()
    employee_emp_id = serializers.ReadOnlyField(source='employee.emp_id')
    employee_email = serializers.ReadOnlyField(source='employee.email')
    employee_name = serializers.SerializerMethodField()
    designation = serializers.SerializerMethodField()
    department = serializers.SerializerMethodField()
    approved_by_name = serializers.SerializerMethodField()
    rejected_by_name = serializers.SerializerMethodField()
    audit_logs = PayrollAuditLogSerializer(many=True, read_only=True)

    def get_employee_name(self, obj):
        from .payslip_utils import clean_employee_name
        return clean_employee_name(obj.employee, obj.employee_name)

    def get_designation(self, obj):
        from .payslip_utils import get_clean_designation
        return get_clean_designation(obj)

    def get_department(self, obj):
        from .payslip_utils import get_clean_department
        return get_clean_department(obj)"""

if target not in c:
    target_crlf = target.replace('\n', '\r\n')
    c = c.replace(target_crlf, replacement.replace('\n', '\r\n'), 1)
else:
    c = c.replace(target, replacement, 1)

with open('Backend/hr/serializers.py', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated hr/serializers.py')

