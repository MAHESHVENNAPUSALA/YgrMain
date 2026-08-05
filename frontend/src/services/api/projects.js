import api from '../apiClient';

export const projectsApi = {
  getProjects: (params) => api.get('/api/projects/', { params }),
  createProject: (data, config = {}) => api.post('/api/projects/', data, config),
  getProjectDetail: (id) => api.get(`/api/projects/${id}/`),
  updateProject: (id, data, config = {}) => api.put(`/api/projects/${id}/`, data, config),
  deleteProject: (id) => api.delete(`/api/projects/${id}/`),
  archiveProject: (id, archive) => api.post(`/api/projects/${id}/archive/`, { archive }),
  transferProject: (id, managerId) => api.post(`/api/projects/${id}/transfer/`, { manager_id: managerId }),
  
  getTeams: (projectId) => api.get(`/api/projects/${projectId}/teams/`),
  createTeam: (projectId, data) => api.post(`/api/projects/${projectId}/teams/`, data),
  updateTeam: (id, data) => api.put(`/api/teams/${id}/`, data),
  deleteTeam: (id) => api.delete(`/api/teams/${id}/`),
  
  addTeamMember: (teamId, employeeId) => api.post(`/api/teams/${teamId}/members/`, { employee_id: employeeId }),
  removeTeamMember: (teamId, employeeId) => api.delete(`/api/teams/${teamId}/members/`, { 
    data: { employee_id: employeeId },
    params: { employee_id: employeeId }
  }),
  
  getComments: (id) => api.get(`/api/projects/${id}/comments/`),
  addComment: (id, content) => api.post(`/api/projects/${id}/comments/`, { content }),
  
  getDocuments: (id) => api.get(`/api/projects/${id}/documents/`),
  uploadDocument: (id, data, config = {}) => api.post(`/api/projects/${id}/documents/`, data, config),
  
  getDashboard: () => api.get('/api/projects/dashboard/'),
  getReports: (params) => api.get('/api/projects/reports/', { params }),
  
  getNotifications: () => api.get('/api/notifications/'),
  markNotificationRead: (data) => api.post('/api/notifications/', data)
};

export default projectsApi;
