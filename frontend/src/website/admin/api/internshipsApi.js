import { adminFetch } from './adminApiClient';

export const internshipsApi = {
  getAllPrograms: async () => {
    const res = await adminFetch('/api/public/internships/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  updateProgram: async (id, formData) => {
    const res = await adminFetch(`/internship-edit/${id}/`, {
      method: 'POST',
      body: formData
    });
    return res;
  },

  deleteProgram: async (id) => {
    const res = await adminFetch(`/internship-delete/${id}/`, {
      method: 'POST'
    });
    return res;
  },

  getRegistrations: async () => {
    const res = await adminFetch('/internship_users_dashboard/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  deleteUser: async (id) => {
    const res = await adminFetch(`/delete-user/${id}/`, {
      method: 'POST'
    });
    return res;
  }
};

export default internshipsApi;
