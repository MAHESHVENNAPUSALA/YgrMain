import { adminFetch } from './adminApiClient';

export const testimonialsApi = {
  getAll: async () => {
    const res = await adminFetch('/api/public/testimonials/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  create: async (formData) => {
    const res = await adminFetch('/dashboard/testimonials/add/', {
      method: 'POST',
      body: formData
    });
    return res;
  },

  update: async (id, formData) => {
    const res = await adminFetch(`/dashboard/testimonials/edit/${id}/`, {
      method: 'POST',
      body: formData
    });
    return res;
  },

  delete: async (id) => {
    const res = await adminFetch(`/dashboard/testimonials/delete/${id}/`, {
      method: 'POST'
    });
    return res;
  }
};

export default testimonialsApi;
