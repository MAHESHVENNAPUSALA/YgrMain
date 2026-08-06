/**
 * Website Portfolio API Service
 * Handles fetching, creating, updating, and deleting public portfolio items.
 */

export const portfolioApi = {
  getAll: async () => {
    try {
      const res = await fetch('/api/public/projects/');
      if (!res.ok) throw new Error('Failed to fetch portfolio projects');
      return await res.json();
    } catch (err) {
      console.error('portfolioApi.getAll error:', err);
      return [];
    }
  },

  getById: async (id) => {
    try {
      const res = await fetch(`/api/public/projects/${id}/`);
      if (!res.ok) throw new Error(`Failed to fetch portfolio #${id}`);
      return await res.json();
    } catch (err) {
      console.error('portfolioApi.getById error:', err);
      return null;
    }
  },

  create: async (data) => {
    try {
      const res = await fetch('/api/admin/website/projects/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err) {
      console.error('portfolioApi.create error:', err);
      return { success: false };
    }
  },

  update: async (id, data) => {
    try {
      const res = await fetch(`/api/admin/website/projects/${id}/update/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err) {
      console.error('portfolioApi.update error:', err);
      return { success: false };
    }
  },

  delete: async (id) => {
    try {
      const res = await fetch(`/api/admin/website/projects/${id}/delete/`, {
        method: 'DELETE'
      });
      return res.ok;
    } catch (err) {
      console.error('portfolioApi.delete error:', err);
      return false;
    }
  }
};

export default portfolioApi;
