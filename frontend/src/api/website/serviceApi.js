/**
 * Website Services API Service
 * Handles fetching dynamic company services.
 */

export const serviceApi = {
  getAll: async () => {
    try {
      const res = await fetch('/api/public/services/');
      if (!res.ok) throw new Error('Failed to fetch services');
      return await res.json();
    } catch (err) {
      console.error('serviceApi.getAll error:', err);
      return [];
    }
  }
};

export default serviceApi;
