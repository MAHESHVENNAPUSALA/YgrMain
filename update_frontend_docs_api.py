with open(r"D:\YgrMain\YgrMain\frontend\src\services\api\documents.js", "r", encoding="utf-8") as f:
    text = f.read()

relieving_api_code = '''

export const relievingLettersApi = {
  getRelievingLetters: (params) => api.get('/api/relieving-letters/', { params }),
  getRelievingLetter: (id) => api.get(`/api/relieving-letters/${id}/`),
  createRelievingLetter: (data) => api.post('/api/relieving-letters/', data),
  updateRelievingLetter: (id, data) => api.put(`/api/relieving-letters/${id}/`, data),
  deleteRelievingLetter: (id) => api.delete(`/api/relieving-letters/${id}/`),

  // Actions
  submitForApproval: (id) => api.post(`/api/relieving-letters/${id}/action/`, { action: 'submit_for_approval' }),
  approveRelievingLetter: (id) => api.post(`/api/relieving-letters/${id}/action/`, { action: 'approve' }),
  issueRelievingLetter: (id, data = {}) => api.post(`/api/relieving-letters/${id}/action/`, { action: 'issue', ...data }),
  revokeRelievingLetter: (id, reason) => api.post(`/api/relieving-letters/${id}/action/`, { action: 'revoke', reason }),
  generatePdf: (id) => api.post(`/api/relieving-letters/${id}/action/`, { action: 'generate_pdf' }),

  // Previews & Downloads
  getPreviewHtml: (id) => api.get(`/api/relieving-letters/${id}/preview/`, { responseType: 'text' }),
  getDownloadUrl: (id) => `/api/relieving-letters/${id}/download/`,
  getAuditHistory: (id) => api.get(`/api/relieving-letters/${id}/audit/`),

  // Send Email
  sendEmail: (id, { force = false } = {}) =>
    api.post(`/api/relieving-letters/${id}/send-email/`, { force }),
};
'''

idx = text.rfind("export default documentsApi;")
if idx != -1:
    text = text[:idx] + relieving_api_code + "\n" + text[idx:]
    with open(r"D:\YgrMain\YgrMain\frontend\src\services\api\documents.js", "w", encoding="utf-8") as f:
        f.write(text)
    print("Successfully added relievingLettersApi to documents.js")
else:
    print("export default documentsApi not found!")

