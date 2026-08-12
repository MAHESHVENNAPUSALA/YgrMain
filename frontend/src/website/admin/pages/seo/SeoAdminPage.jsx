import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import ActionButton from '../../components/ActionButton';
import seoApi from '../../api/seoApi';
import { useToast } from '../../hooks/useToast';

const SeoAdminPage = () => {
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    meta_title: 'YGR Gobal IT Services | Enterprise Solutions',
    meta_description: 'Premier custom software development, cloud engineering, mobile apps, and IT staffing services.',
    keywords: 'IT Services, Web Development, Cloud Engineering, Software Solutions',
    open_graph_title: 'YGR Gobal IT Services',
    open_graph_image: '/images/og-banner.png',
    twitter_card: 'summary_large_image',
    robots: 'index, follow',
    sitemap_enabled: true
  });

  useEffect(() => {
    const loadSEO = async () => {
      setLoading(true);
      const data = await seoApi.getSettings();
      if (data) setFormData((prev) => ({ ...prev, ...data }));
      setLoading(false);
    };
    loadSEO();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await seoApi.updateSettings(formData);
    if (res.success !== false) {
      addToast('Global SEO settings saved!');
    } else {
      addToast('Failed to save SEO settings', 'error');
    }
  };

  return (
    <div>
      <PageHeader
        title="SEO & Indexing Configuration"
        subtitle="Manage meta titles, descriptions, Open Graph social share cards, Robots rules, and XML sitemaps"
        breadcrumbItems={[{ label: 'SEO Settings' }]}
      />

      <form onSubmit={handleSubmit}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid var(--admin-border-color)', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--admin-primary)', fontSize: '18px', fontWeight: 700 }}>Global Search Engine Metadata</h3>
          
          <div className="admin-form-group">
            <label>Default Page Meta Title</label>
            <input
              type="text"
              className="admin-form-control"
              value={formData.meta_title}
              onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Meta Description</label>
            <textarea
              className="admin-form-control"
              rows={3}
              value={formData.meta_description}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Global Focus Keywords (Comma separated)</label>
            <input
              type="text"
              className="admin-form-control"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            />
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid var(--admin-border-color)', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--admin-primary)', fontSize: '18px', fontWeight: 700 }}>Open Graph & Social Media Preview Cards</h3>
          
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Open Graph Title</label>
              <input
                type="text"
                className="admin-form-control"
                value={formData.open_graph_title}
                onChange={(e) => setFormData({ ...formData, open_graph_title: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Twitter Card Type</label>
              <select
                className="admin-form-control"
                value={formData.twitter_card}
                onChange={(e) => setFormData({ ...formData, twitter_card: e.target.value })}
              >
                <option value="summary">Summary</option>
                <option value="summary_large_image">Summary Large Image</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label>Robots Directive</label>
            <input
              type="text"
              className="admin-form-control"
              value={formData.robots}
              onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <ActionButton type="submit" icon="💾">
            Save SEO Settings
          </ActionButton>
        </div>
      </form>
    </div>
  );
};

export default SeoAdminPage;
