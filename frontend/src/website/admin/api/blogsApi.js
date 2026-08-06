import { adminFetch } from './adminApiClient';

export const blogsApi = {
  getAll: async () => {
    const res = await adminFetch('/api/admin/blogs/');
    if (res.success && res.data) {
      return Array.isArray(res.data) ? res.data : res.data.blogs || [];
    }
    const publicRes = await adminFetch('/api/public/blogs/');
    return publicRes.success && Array.isArray(publicRes.data) ? publicRes.data : [];
  },

  getCategories: async () => {
    const res = await adminFetch('/api/admin/blog/categories/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  getAuthors: async () => {
    const res = await adminFetch('/api/admin/blog/authors/');
    return res.success && Array.isArray(res.data) ? res.data : [];
  },

  create: async (formData) => {
    const res = await adminFetch('/api/admin/blogs/create/', {
      method: 'POST',
      body: formData
    });
    return res;
  },

  update: async (id, formData) => {
    const res = await adminFetch(`/api/admin/blogs/${id}/update/`, {
      method: 'POST',
      body: formData
    });
    return res;
  },

  delete: async (id) => {
    const res = await adminFetch(`/api/admin/blogs/${id}/delete/`, {
      method: 'POST'
    });
    return res;
  },

  toggleVisibility: async (id) => {
    const res = await adminFetch(`/api/admin/blogs/${id}/toggle-visibility/`, {
      method: 'POST'
    });
    return res;
  },

  toggleFeatured: async (id) => {
    const res = await adminFetch(`/api/admin/blogs/${id}/toggle-featured/`, {
      method: 'POST'
    });
    return res;
  }
};

export default blogsApi;
