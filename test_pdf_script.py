import os, sys, django, base64
from io import BytesIO
from xhtml2pdf import pisa
import pypdf

sys.path.insert(0, os.path.abspath('Backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

with open('Backend/main/static/images/logo.png', 'rb') as lf:
    b64_logo = 'data:image/png;base64,' + base64.b64encode(lf.read()).decode('ascii')

test_html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Salary Slip</title>
    <style>
        @page {{
            size: a4 portrait;
            margin: 10mm 12mm 10mm 12mm;
        }}
        * {{ box-sizing: border-box; }}
        body {{
            font-family: Arial, Helvetica, sans-serif;
            font-size: 8pt;
            color: #1e293b;
            line-height: 1.35;
            margin: 0; padding: 0; background: #ffffff;
        }}
        .header-table {{ width: 100%; border-collapse: collapse; margin-bottom: 8px; border-bottom: 2px solid #0f172a; padding-bottom: 6px; }}
        .header-logo {{ width: 80px; vertical-align: middle; }}
        .header-logo img {{ width: 65px; height: auto; }}
        .header-center {{ vertical-align: middle; text-align: center; }}
        .comp-title {{ font-size: 15pt; font-weight: bold; color: #0f172a; letter-spacing: 0.5px; text-transform: uppercase; margin: 0; }}
        .comp-subtitle {{ font-size: 7.5pt; color: #64748b; margin-top: 2px; }}
        .header-right {{ width: 120px; vertical-align: middle; text-align: right; }}
        .badge {{ background: #0f172a; color: #fff; font-size: 7.5pt; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 8px; display: inline-block; }}
        .period-lbl {{ font-size: 7pt; color: #64748b; margin-top: 3px; font-weight: bold; }}
        .period-val {{ font-size: 8.5pt; color: #047857; font-weight: bold; }}

        .sec-title {{ background: #0f172a; color: #ffffff; font-size: 7.5pt; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; padding: 4px 8px; margin-top: 8px; margin-bottom: 0; }}
        
        table.data-table {{ width: 100%; border-collapse: collapse; margin-bottom: 0; }}
        table.data-table td {{ border: 1px solid #cbd5e1; padding: 3.5px 6px; font-size: 7.5pt; }}
        table.data-table td.lbl {{ width: 18%; background: #f8fafc; font-weight: bold; color: #475569; }}
        table.data-table td.val {{ width: 32%; color: #0f172a; font-weight: 600; }}

        table.att-table {{ width: 100%; border-collapse: collapse; text-align: center; }}
        table.att-table th {{ background: #f1f5f9; border: 1px solid #cbd5e1; padding: 4px; font-size: 7pt; font-weight: bold; color: #334155; text-transform: uppercase; }}
        table.att-table td {{ border: 1px solid #cbd5e1; padding: 4px; font-size: 7.5pt; font-weight: 600; color: #0f172a; }}

        .sal-container {{ width: 100%; border-collapse: collapse; }}
        .sal-col-left {{ width: 50%; vertical-align: top; padding-right: 4px; }}
        .sal-col-right {{ width: 50%; vertical-align: top; padding-left: 4px; }}
        
        table.sal-grid {{ width: 100%; border-collapse: collapse; }}
        table.sal-grid th {{ background: #1e3a8a; color: #fff; font-size: 7pt; font-weight: bold; padding: 4px 6px; border: 1px solid #1e3a8a; text-align: left; }}
        table.sal-grid th.amt-th {{ text-align: right; width: 75px; }}
        table.sal-grid td {{ border: 1px solid #cbd5e1; padding: 3px 6px; font-size: 7.5pt; color: #1e293b; }}
        table.sal-grid td.amt {{ text-align: right; font-weight: 600; }}
        table.sal-grid tr.total td {{ background: #f1f5f9; font-weight: bold; border-top: 1.5px solid #94a3b8; }}
        table.sal-grid tr.total td.amt {{ color: #047857; }}

        .net-card {{ border: 1.5px solid #0f172a; background: #f8fafc; padding: 6px 10px; margin-top: 8px; margin-bottom: 6px; }}
        .net-tbl {{ width: 100%; border-collapse: collapse; }}
        .net-title {{ font-size: 8.5pt; font-weight: bold; color: #0f172a; text-transform: uppercase; }}
        .net-words {{ font-size: 7pt; color: #64748b; font-style: italic; margin-top: 1px; }}
        .net-amt {{ font-size: 13pt; font-weight: bold; color: #047857; text-align: right; }}

        .footer-tbl {{ width: 100%; border-collapse: collapse; margin-top: 10px; border-top: 1px solid #cbd5e1; padding-top: 6px; }}
        .footer-meta {{ font-size: 7pt; color: #64748b; vertical-align: bottom; }}
        .footer-sign {{ text-align: right; vertical-align: bottom; }}
        .sign-line {{ display: inline-block; border-top: 1px solid #64748b; width: 140px; padding-top: 3px; font-size: 7pt; font-weight: bold; color: #0f172a; text-align: center; }}

        .disclaimer-box {{ font-size: 6.5pt; color: #94a3b8; text-align: center; border-top: 1px dashed #e2e8f0; padding-top: 4px; margin-top: 8px; }}
    </style>
</head>
<body>
    <table class="header-table">
        <tr>
            <td class="header-logo"><img src="{b64_logo}"></td>
            <td class="header-center">
                <div class="comp-title">YGR Global IT Services</div>
                <div class="comp-subtitle">Human Resources &amp; Payroll Department &nbsp;|&nbsp; Confidential Salary Statement</div>
            </td>
            <td class="header-right">
                <div class="badge">PAYSLIP</div>
                <div class="period-lbl">PAY PERIOD</div>
                <div class="period-val">July 2026</div>
            </td>
        </tr>
    </table>
    <div class="sec-title">Employee Information</div>
    <table class="data-table">
        <tr>
            <td class="lbl">Full Name</td><td class="val">Mahesh Vennapusala</td>
            <td class="lbl">Employee ID</td><td class="val">YGREMP1004</td>
        </tr>
        <tr>
            <td class="lbl">Designation</td><td class="val">Team Lead</td>
            <td class="lbl">Department</td><td class="val">Technology</td>
        </tr>
        <tr>
            <td class="lbl">Date of Joining</td><td class="val">03 Jun 2025</td>
            <td class="lbl">Payment Date</td><td class="val">End of Month</td>
        </tr>
        <tr>
            <td class="lbl">Bank Name</td><td class="val">Axis Bank</td>
            <td class="lbl">Account No.</td><td class="val">501002398403</td>
        </tr>
        <tr>
            <td class="lbl">IFSC Code</td><td class="val">HDFC0000123</td>
            <td class="lbl">PAN / UAN</td><td class="val">ABCDE3043F / 100984728303</td>
        </tr>
    </table>
    
    <div class="sec-title">Attendance &amp; Leave Record</div>
    <table class="att-table">
        <thead>
            <tr>
                <th>Working Days</th><th>Days Present</th><th>Paid Leaves</th><th>Unpaid / LOP</th><th>Half Days</th><th>Week Offs</th><th>Holidays</th><th>Sandwich Days</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>25</td><td>17</td><td>0</td><td>8</td><td>0</td><td>6</td><td>0</td><td>2</td>
            </tr>
        </tbody>
    </table>

    <div class="sec-title">Salary Breakdown</div>
    <table class="sal-container">
        <tr>
            <td class="sal-col-left">
                <table class="sal-grid">
                    <thead><tr><th>Earnings Component</th><th class="amt-th">Amount (INR)</th></tr></thead>
                    <tbody>
                        <tr><td>Basic Salary</td><td class="amt">5,564.52</td></tr>
                        <tr><td>House Rent Allowance (HRA)</td><td class="amt">2,225.81</td></tr>
                        <tr><td>Transport Allowance</td><td class="amt">890.32</td></tr>
                        <tr><td>Medical Allowance</td><td class="amt">445.16</td></tr>
                        <tr><td>Special Allowance</td><td class="amt">2,003.23</td></tr>
                        <tr><td>Bonus / Incentives</td><td class="amt">0.00</td></tr>
                        <tr class="total"><td>GROSS EARNINGS</td><td class="amt">11,129.04</td></tr>
                    </tbody>
                </table>
            </td>
            <td class="sal-col-right">
                <table class="sal-grid">
                    <thead><tr><th>Deductions Component</th><th class="amt-th">Amount (INR)</th></tr></thead>
                    <tbody>
                        <tr><td>Provident Fund (PF)</td><td class="amt">667.74</td></tr>
                        <tr><td>Employee State Insurance (ESI)</td><td class="amt">83.47</td></tr>
                        <tr><td>Professional Tax (PT)</td><td class="amt">200.00</td></tr>
                        <tr><td>Tax Deducted at Source (TDS)</td><td class="amt">750.00</td></tr>
                        <tr><td>Loan / Advance Recovery</td><td class="amt">0.00</td></tr>
                        <tr><td>Other Deductions / LOP</td><td class="amt">0.00</td></tr>
                        <tr class="total"><td>TOTAL DEDUCTIONS</td><td class="amt">1,701.21</td></tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </table>

    <div class="net-card">
        <table class="net-tbl">
            <tr>
                <td>
                    <div class="net-title">Net Salary Payable</div>
                    <div class="net-words">In Words: Nine Thousand Four Hundred Twenty Seven Rupees and Eighty Three Paise Only</div>
                </td>
                <td><div class="net-amt">INR 9,427.83</div></td>
            </tr>
        </table>
    </div>

    <table class="footer-tbl">
        <tr>
            <td class="footer-meta">
                Generated on: 30 Oct 2026, 11:15 AM<br/>
                Payment Status: <strong>Paid</strong> &bull; Mode: Bank Transfer<br/>
                Approved by: <strong>HR Department</strong>
            </td>
            <td class="footer-sign">
                <div class="sign-line">
                    Authorized Signatory<br/>
                    <span style="font-size:6.5pt; font-weight:normal; color:#64748b;">YGR Global IT Services Pvt. Ltd.</span>
                </div>
            </td>
        </tr>
    </table>

    <div class="disclaimer-box">
        This is a system-generated salary statement and does not require a physical signature. &nbsp;|&nbsp;
        Confidential &mdash; For the exclusive use of the named recipient only.
    </div>
</body>
</html>"""

buf = BytesIO()
pisa_status = pisa.CreatePDF(test_html, dest=buf, encoding='UTF-8')
print('Pisa err:', pisa_status.err)
reader = pypdf.PdfReader(buf)
print('Page count of compact layout:', len(reader.pages))
with open('Backend/media/payslips/test_compact.pdf', 'wb') as pf:
    pf.write(buf.getvalue())

