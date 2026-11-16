import api from '../apiClient';

export const documentsApi = {
  // Employee Documents (Offer / Joining / Relieving / Other)
  getDocuments: (params) => api.get('/api/employee-documents/', { params }),
  getDocument: (id) => api.get(`/api/employee-documents/${id}/`),
  createDocument: (formData) => api.post('/api/employee-documents/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateDocument: (id, formData) => api.put(`/api/employee-documents/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteDocument: (id) => api.delete(`/api/employee-documents/${id}/`),

  // Send employee document via email
  sendDocumentEmail: (id, { force = false } = {}) =>
    api.post(`/api/employee-documents/${id}/send-email/`, { force }),

  // Email audit history
  getEmailHistory: (params) => api.get('/api/email-history/', { params }),
};

export const offerLettersApi = {
  getOfferLetters: (params) => api.get('/api/offer-letters/', { params }),
  getOfferLetter: (id) => api.get(`/api/offer-letters/${id}/`),
  createOfferLetter: (data) => api.post('/api/offer-letters/', data),
  updateOfferLetter: (id, data) => api.put(`/api/offer-letters/${id}/`, data),
  deleteOfferLetter: (id) => api.delete(`/api/offer-letters/${id}/`),

  // Actions
  approveOfferLetter: (id) => api.post(`/api/offer-letters/${id}/action/`, { action: 'approve' }),
  submitOfferForApproval: (id) => api.post(`/api/offer-letters/${id}/action/`, { action: 'submit_for_approval' }),
  issueOfferLetter: (id) => api.post(`/api/offer-letters/${id}/action/`, { action: 'issue' }),
  generatePdf: (id) => api.post(`/api/offer-letters/${id}/action/`, { action: 'generate_pdf' }),
  recordResponse: (id, { response, notes }) =>
    api.post(`/api/offer-letters/${id}/action/`, { action: 'record_response', response, notes }),

  // Previews & Downloads
  getPreviewPdf: (id) => api.get(`/api/offer-letters/${id}/preview/`, { responseType: 'blob' }),
  previewDraftPdf: (data) => api.post('/api/offer-letters/preview-draft/', data, { responseType: 'blob' }),
  getDownloadUrl: (id) => `/api/offer-letters/${id}/download/`,
  getAuditHistory: (id) => api.get(`/api/offer-letters/${id}/audit/`),

  // Send Email
  sendEmail: (id, { force = false } = {}) =>
    api.post(`/api/offer-letters/${id}/send-email/`, { force }),
};

export const offerPoliciesApi = {
  getVersions: (params) => api.get('/api/offer-policy-versions/', { params }),
  getVersion: (id) => api.get(`/api/offer-policy-versions/${id}/`),
  createVersion: (data) => api.post('/api/offer-policy-versions/', data),
  updateVersion: (id, data) => api.put(`/api/offer-policy-versions/${id}/`, data),
  publishVersion: (id) => api.post(`/api/offer-policy-versions/${id}/publish/`),
  retireVersion: (id) => api.post(`/api/offer-policy-versions/${id}/publish/`, { action: 'retire' }),
};

export const joiningLettersApi = {
  getJoiningLetters: (params) => api.get('/api/joining-letters/', { params }),
  getJoiningLetter: (id) => api.get(`/api/joining-letters/${id}/`),
  createJoiningLetter: (data) => api.post('/api/joining-letters/', data),
  updateJoiningLetter: (id, data) => api.put(`/api/joining-letters/${id}/`, data),
  deleteJoiningLetter: (id) => api.delete(`/api/joining-letters/${id}/`),

  // Actions
  approveJoiningLetter: (id) => api.post(`/api/joining-letters/${id}/action/`, { action: 'approve' }),
  issueJoiningLetter: (id) => api.post(`/api/joining-letters/${id}/action/`, { action: 'issue' }),
  generatePdf: (id) => api.post(`/api/joining-letters/${id}/action/`, { action: 'generate_pdf' }),

  // Previews & Downloads
  getPreviewHtml: (id) => api.get(`/api/joining-letters/${id}/preview/`, { responseType: 'text' }),
  getDownloadUrl: (id) => `/api/joining-letters/${id}/download/`,

  // Send Email
  sendEmail: (id, { force = false } = {}) =>
    api.post(`/api/joining-letters/${id}/send-email/`, { force }),
};

export const candidatesApi = {
  getCandidates: () => api.get('/api/candidates/'),
};



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

export default documentsApi;
