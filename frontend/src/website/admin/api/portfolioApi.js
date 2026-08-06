import { adminFetch } from './adminApiClient';

export const portfolioApi = {
  getAll: async () => {
    const res = await adminFetch('/api/public/projects/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  getById: async (id) => {
    const res = await adminFetch(`/api/public/projects/${id}/`);
    return res.success ? res.data : null;
  },

  create: async (formData) => {
    const res = await adminFetch('/projects/add/', {
      method: 'POST',
      body: formData
    });
    return res;
  },

  update: async (id, formData) => {
    const res = await adminFetch(`/projects/${id}/edit/`, {
      method: 'POST',
      body: formData
    });
    return res;
  },

  delete: async (id) => {
    const res = await adminFetch(`/projects/${id}/delete/`, {
      method: 'POST'
    });
    return res;
  }
};

export default portfolioApi;
