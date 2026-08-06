import { adminFetch } from './adminApiClient';

export const teamApi = {
  getAll: async () => {
    const res = await adminFetch('/api/public/team/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  create: async (formData) => {
    const res = await adminFetch('/dashboard/team/add/', {
      method: 'POST',
      body: formData
    });
    return res;
  },

  update: async (id, formData) => {
    const res = await adminFetch(`/dashboard/team/edit/${id}/`, {
      method: 'POST',
      body: formData
    });
    return res;
  },

  delete: async (id) => {
    const res = await adminFetch(`/dashboard/team/delete/${id}/`, {
      method: 'POST'
    });
    return res;
  }
};

export default teamApi;
