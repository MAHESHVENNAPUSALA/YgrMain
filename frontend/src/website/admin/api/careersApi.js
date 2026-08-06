import { adminFetch } from './adminApiClient';

export const careersApi = {
  getVacancies: async () => {
    const res = await adminFetch('/api/public/jobs/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  createVacancy: async (formData) => {
    const res = await adminFetch('/dashboard/vacancy/add/', {
      method: 'POST',
      body: formData
    });
    return res;
  },

  updateVacancy: async (id, formData) => {
    const res = await adminFetch(`/dashboard/vacancy/edit/${id}/`, {
      method: 'POST',
      body: formData
    });
    return res;
  },

  deleteVacancy: async (id) => {
    const res = await adminFetch(`/dashboard/vacancy/delete/${id}/`, {
      method: 'POST'
    });
    return res;
  },

  getApplications: async () => {
    const res = await adminFetch('/dashboard/job_applications/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  updateApplicationStatus: async (id, status) => {
    const res = await adminFetch('/dashboard/job_application/update-status/', {
      method: 'POST',
      body: JSON.stringify({ id, status })
    });
    return res;
  },

  deleteApplication: async (id) => {
    const res = await adminFetch(`/applications/delete/${id}/`, {
      method: 'POST'
    });
    return res;
  }
};

export default careersApi;
