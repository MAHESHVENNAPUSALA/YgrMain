/**
 * Website Contact API Service
 * Handles submitting user contact inquiries.
 */

export const contactApi = {
  submit: async (formData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      return await res.json();
    } catch (err) {
      console.error('contactApi.submit error:', err);
      return { success: false };
    }
  }
};

export default contactApi;
