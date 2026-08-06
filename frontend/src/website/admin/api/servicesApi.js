import { adminFetch } from './adminApiClient';

export const servicesApi = {
  getAll: async () => {
    const res = await adminFetch('/api/public/services/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  create: async (data) => {
    const res = await adminFetch('/api/public/services/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res;
  },

  update: async (id, data) => {
    const res = await adminFetch(`/api/public/services/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res;
  },

  delete: async (id) => {
    const res = await adminFetch(`/api/public/services/${id}/`, {
      method: 'DELETE'
    });
    return res;
  }
};

export default servicesApi;
