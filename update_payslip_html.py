with open(r"D:\YgrMain\YgrMain\Backend\main\templates\employee\payslip_pdf.html", "r", encoding="utf-8") as f:
    text = f.read()

# 1. Add Payslip No to header right cell
target_header = '''                <div class="payslip-badge">Payslip</div>
                <span class="period-label">Pay Period</span>
                <span class="period-value">{{ month_name }} {{ payslip.year }}</span>'''

replacement_header = '''                <div class="payslip-badge">Payslip</div>
                <span class="period-label">Pay Period</span>
                <span class="period-value">{{ month_name }} {{ payslip.year }}</span>
                {% if payslip.payslip_number %}
                <span class="period-label" style="font-size: 6.5pt; color: #0f172a; margin-top: 1px;">{{ payslip.payslip_number }}</span>
                {% endif %}'''

if target_header in text:
    text = text.replace(target_header, replacement_header)
    print("Updated header with payslip_number")

# 2. Add Food Allowance & Travel Allowance in Earnings table
target_earnings = '''                        <tr>
                            <td>House Rent Allowance (HRA)</td>
                            <td class="amt">{{ payslip.hra|floatformat:2 }}</td>
                        </tr>
                        <tr>
                            <td>Transport Allowance</td>
                            <td class="amt">{{ payslip.transport_allowance|floatformat:2 }}</td>
                        </tr>'''

replacement_earnings = '''                        <tr>
                            <td>House Rent Allowance (HRA)</td>
                            <td class="amt">{{ payslip.hra|floatformat:2 }}</td>
                        </tr>
                        {% if payslip.food_allowance %}
                        <tr>
                            <td>Food Allowance</td>
                            <td class="amt">{{ payslip.food_allowance|floatformat:2 }}</td>
                        </tr>
                        {% endif %}
                        <tr>
                            <td>{% if payslip.travel_allowance and not payslip.transport_allowance %}Travel Allowance{% else %}Transport / Travel Allowance{% endif %}</td>
                            <td class="amt">{% if payslip.travel_allowance and not payslip.transport_allowance %}{{ payslip.travel_allowance|floatformat:2 }}{% else %}{{ payslip.transport_allowance|floatformat:2 }}{% endif %}</td>
                        </tr>'''

if target_earnings in text:
    text = text.replace(target_earnings, replacement_earnings)
    print("Updated earnings with food & travel allowance")

# 3. Add LOP line in Deductions if > 0
target_deductions = '''                        <tr>
                            <td>Other Deductions / LOP</td>
                            <td class="amt">{{ payslip.other_deductions|floatformat:2 }}</td>
                        </tr>'''

replacement_deductions = '''                        {% if payslip.loss_of_pay %}
                        <tr>
                            <td>Loss of Pay (LOP)</td>
                            <td class="amt">{{ payslip.loss_of_pay|floatformat:2 }}</td>
                        </tr>
                        {% endif %}
                        <tr>
                            <td>Other Authorized Deductions</td>
                            <td class="amt">{{ payslip.other_deductions|floatformat:2 }}</td>
                        </tr>'''

if target_deductions in text:
    text = text.replace(target_deductions, replacement_deductions)
    print("Updated deductions with LOP and other deductions")

with open(r"D:\YgrMain\YgrMain\Backend\main\templates\employee\payslip_pdf.html", "w", encoding="utf-8") as f:
    f.write(text)

print("Saved updated payslip_pdf.html")

