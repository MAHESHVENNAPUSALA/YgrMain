serializers_path = r"D:\YgrMain\YgrMain\Backend\hr\serializers.py"

with open(serializers_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Update imports
import_target = "OfferLetter, JoiningLetter, JobApplication"
import_replacement = "OfferLetter, JoiningLetter, JobApplication, SalaryComponent, SalaryComponentBreakdown, RelievingLetter, RelievingLetterAudit"

if import_target in text:
    text = text.replace(import_target, import_replacement)
    print("Updated imports in serializers.py")
else:
    print("WARNING: import_target not found!")

# 2. Update PayslipSerializer fields
target_ps_fields = "'month',\n            'year',"
replacement_ps_fields = "'payslip_number',\n            'salary_structure',\n            'month',\n            'year',\n            'pay_period_start',\n            'pay_period_end',\n            'food_allowance',\n            'travel_allowance',\n            'other_earnings',"

if target_ps_fields in text:
    text = text.replace(target_ps_fields, replacement_ps_fields)
    print("Added payslip_number and new earnings fields to PayslipSerializer")
else:
    print("WARNING: target_ps_fields not found!")

target_pay_date = "'payment_date',"
replacement_pay_date = "'payment_date',\n            'bank_reference',"

if target_pay_date in text:
    text = text.replace(target_pay_date, replacement_pay_date, 1)
    print("Added bank_reference to PayslipSerializer")
else:
    print("WARNING: target_pay_date not found!")

# 3. Add SalaryComponentSerializer, SalaryComponentBreakdownSerializer, RelievingLetterSerializer, RelievingLetterAuditSerializer
new_serializers_code = '''

class SalaryComponentSerializer(serializers.ModelSerializer):
    component_type_display = serializers.CharField(source='get_component_type_display', read_only=True)
    calculation_type_display = serializers.CharField(source='get_calculation_type_display', read_only=True)

    class Meta:
        model = SalaryComponent
        fields = '__all__'


class SalaryComponentBreakdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalaryComponentBreakdown
        fields = '__all__'


class RelievingLetterAuditSerializer(serializers.ModelSerializer):
    actor_name = serializers.SerializerMethodField()

    class Meta:
        model = RelievingLetterAudit
        fields = '__all__'

    def get_actor_name(self, obj):
        if obj.actor:
            return obj.actor.get_full_name() or obj.actor.username
        return 'System'


class RelievingLetterSerializer(serializers.ModelSerializer):
    approved_by_name = serializers.SerializerMethodField()
    issued_by_name = serializers.SerializerMethodField()
    created_by_name = serializers.SerializerMethodField()
    reporting_manager_display = serializers.SerializerMethodField()
    pdf_url = serializers.SerializerMethodField()
    audit_events = RelievingLetterAuditSerializer(many=True, read_only=True)
    can_issue = serializers.SerializerMethodField()

    class Meta:
        model = RelievingLetter
        fields = '__all__'

    def get_approved_by_name(self, obj):
        if obj.approved_by:
            return obj.approved_by.get_full_name() or obj.approved_by.username
        return None

    def get_issued_by_name(self, obj):
        if obj.issued_by:
            return obj.issued_by.get_full_name() or obj.issued_by.username
        return None

    def get_created_by_name(self, obj):
        if obj.created_by:
            return obj.created_by.get_full_name() or obj.created_by.username
        return None

    def get_reporting_manager_display(self, obj):
        if obj.reporting_manager:
            return obj.reporting_manager.get_full_name() or obj.reporting_manager.username
        return obj.reporting_manager_name or 'Department Head'

    def get_pdf_url(self, obj):
        if obj.pdf_file:
            return obj.pdf_file.url
        return None

    def get_can_issue(self, obj):
        from django.utils import timezone
        today = timezone.now().date()
        # Can issue if status is Approved and today >= last_working_day
        return obj.status == 'Approved' and (today >= obj.last_working_day)
'''

text += new_serializers_code
print("Added new serializers to serializers.py")

with open(serializers_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Saved updated serializers.py")

