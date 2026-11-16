payroll_api_path = r"D:\YgrMain\YgrMain\frontend\src\services\api\payroll.js"

with open(payroll_api_path, "r", encoding="utf-8") as f:
    text = f.read()

target = "createSalaryStructure: (data) => api.post('/api/salary-structures/', data)\n};"
replacement = """createSalaryStructure: (data) => api.post('/api/salary-structures/', data),
  getSalaryComponents: (params) => api.get('/api/salary-components/', { params }),
  createSalaryComponent: (data) => api.post('/api/salary-components/', data),
  updateSalaryComponent: (id, data) => api.put(`/api/salary-components/${id}/`, data),
  recordPayment: (id, data) => api.post(`/api/payslips/${id}/action/`, { action: 'record_payment', ...data }),
  submitPayslipForApproval: (id) => api.post(`/api/payslips/${id}/action/`, { action: 'submit_for_approval' })
};"""

if target in text:
    text = text.replace(target, replacement)
    with open(payroll_api_path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Successfully updated payroll.js API client!")
else:
    print("Target not found in payroll.js")

