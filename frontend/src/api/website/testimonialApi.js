/**
 * Website Testimonials API Service
 * Handles fetching client reviews and testimonials.
 */

export const testimonialApi = {
  getAll: async () => {
    try {
      const res = await fetch('/api/testimonials/');
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      return await res.json();
    } catch (err) {
      console.error('testimonialApi.getAll error:', err);
      return [];
    }
  }
};

export default testimonialApi;
