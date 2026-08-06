/**
 * Website Blog API Service
 * Handles fetching blog articles, categories, and authors.
 */

export const blogApi = {
  getAll: async () => {
    try {
      const res = await fetch('/api/public/blogs/');
      if (!res.ok) throw new Error('Failed to fetch blogs');
      return await res.json();
    } catch (err) {
      console.error('blogApi.getAll error:', err);
      return [];
    }
  },

  getById: async (id) => {
    try {
      const res = await fetch(`/api/public/blogs/${id}/`);
      if (!res.ok) throw new Error(`Failed to fetch blog #${id}`);
      return await res.json();
    } catch (err) {
      console.error('blogApi.getById error:', err);
      return null;
    }
  }
};

export default blogApi;
