import api from '../apiClient';

export const attendanceApi = {
  getStatus: () => api.get('/api/attendance/status/'),
  checkIn: (data) => api.post('/api/attendance/check-in/', data),
  checkOut: (data) => api.post('/api/attendance/check-out/', data),
  getList: (params) => api.get('/api/attendance/', { params }),
  getCorrections: () => api.get('/api/attendance/corrections/'),
  submitCorrection: (data) => api.post('/api/attendance/corrections/', data),
  approveCorrection: (id, action) => api.post(`/api/attendance/corrections/${id}/action/`, { action })
};

export default attendanceApi;
