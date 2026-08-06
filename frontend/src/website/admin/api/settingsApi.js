import { adminFetch } from './adminApiClient';

export const settingsApi = {
  getSettings: async () => {
    const res = await adminFetch('/api/admin/website/settings/');
    return res.success ? res.data : {
      company_name: 'YGR Global IT Services',
      email: 'contact@ygrservices.com',
      phone: '+1 (800) 123-4567',
      address: 'Tech Park, Suite 400, Innovation Way',
      copyright: '© 2026 YGR Global IT Services. All Rights Reserved.',
      google_analytics_id: 'G-XXXXXXXXXX',
      google_maps_url: '',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    };
  },

  updateSettings: async (data) => {
    const res = await adminFetch('/api/admin/website/settings/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res;
  }
};

export default settingsApi;
