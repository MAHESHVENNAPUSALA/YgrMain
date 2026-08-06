import { adminFetch } from './adminApiClient';

export const clientsApi = {
  getAll: async () => {
    const res = await adminFetch('/clients/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  create: async (formData) => {
    const res = await adminFetch('/client_form/', {
      method: 'POST',
      body: formData
    });
    return res;
  },

  update: async (id, formData) => {
    const res = await adminFetch(`/clients/${id}/edit/`, {
      method: 'POST',
      body: formData
    });
    return res;
  },

  delete: async (id) => {
    const res = await adminFetch(`/clients/${id}/delete/`, {
      method: 'POST'
    });
    return res;
  }
};

export default clientsApi;
