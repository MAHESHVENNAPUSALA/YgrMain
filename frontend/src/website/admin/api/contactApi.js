import { adminFetch } from './adminApiClient';

export const contactApi = {
  getAll: async () => {
    const res = await adminFetch('/api/contact/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  submit: async (data) => {
    const res = await adminFetch('/api/contact/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res;
  },

  reply: async (id, message) => {
    const res = await adminFetch(`/api/contact/${id}/reply/`, {
      method: 'POST',
      body: JSON.stringify({ message })
    });
    return res;
  },

  delete: async (id) => {
    const res = await adminFetch(`/api/contact/${id}/delete/`, {
      method: 'POST'
    });
    return res;
  }
};

export default contactApi;
