import api from '../apiClient';

export const payrollApi = {
  getPayslips: (params) => api.get('/api/payslips/', { params }),
  getPayslip: (id) => api.get(`/api/payslips/${id}/`),
  deletePayslip: (id) => api.delete(`/api/payslips/${id}/`),
  createPayslip: (data) => api.post('/api/payslips/', data),
  updatePayslip: (id, data) => api.put(`/api/payslips/${id}/`, data),
  approvePayslip: (id) => api.post(`/api/payslips/${id}/action/`, { action: 'approve' }),
  rejectPayslip: (id, reason) => api.post(`/api/payslips/${id}/action/`, { action: 'reject', reason }),
  sendEmail: (id, { force = false } = {}) => api.post(`/api/payslips/${id}/send-email/`, { force }),
  calculatePayroll: (params) => api.get('/api/payslips/calculate/', { params }),
  downloadPayslipPdf: (id) => api.get(`/api/payslips/${id}/download/`, { responseType: 'blob' }),
  getSalaryStructures: () => api.get('/api/salary-structures/'),
  createSalaryStructure: (data) => api.post('/api/salary-structures/', data)
};

export default payrollApi;
