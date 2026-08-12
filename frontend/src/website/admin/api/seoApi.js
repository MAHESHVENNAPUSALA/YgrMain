import { adminFetch } from './adminApiClient';

export const seoApi = {
  getSettings: async () => {
    const res = await adminFetch('/api/admin/website/seo/');
    return res.success ? res.data : {
      meta_title: 'YGR Gobal IT Services',
      meta_description: 'Leading IT Solutions, Software Development & Enterprise Services.',
      keywords: 'IT Services, Web Development, Cloud Solutions, Software Engineering',
      open_graph_title: 'YGR Gobal IT Services',
      twitter_card: 'summary_large_image',
      robots: 'index, follow',
      sitemap_enabled: true
    };
  },

  updateSettings: async (data) => {
    const res = await adminFetch('/api/admin/website/seo/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res;
  }
};

export default seoApi;
