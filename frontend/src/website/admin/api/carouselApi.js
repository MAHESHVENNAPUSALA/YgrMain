import { adminFetch } from './adminApiClient';

export const carouselApi = {
  getAll: async () => {
    const res = await adminFetch('/api/public/carousel/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  create: async (formData) => {
    const res = await adminFetch('/dashboard/carousel/add/', {
      method: 'POST',
      body: formData
    });
    return res;
  },

  update: async (id, formData) => {
    const res = await adminFetch(`/dashboard/carousel/edit/${id}/`, {
      method: 'POST',
      body: formData
    });
    return res;
  },

  delete: async (id) => {
    const res = await adminFetch(`/dashboard/carousel/delete/${id}/`, {
      method: 'POST'
    });
    return res;
  }
};

export default carouselApi;
