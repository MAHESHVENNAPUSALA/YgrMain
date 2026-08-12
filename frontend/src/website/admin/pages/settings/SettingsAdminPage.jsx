import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import ActionButton from '../../components/ActionButton';
import ImageUploader from '../../components/ImageUploader';
import settingsApi from '../../api/settingsApi';
import { useToast } from '../../hooks/useToast';

const SettingsAdminPage = () => {
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    company_name: 'YGR Gobal IT Services',
    email: 'contact@ygrservices.com',
    phone: '+1 (800) 123-4567',
    address: 'Tech Park, Suite 400, Innovation Way',
    copyright: '© 2026 YGR Gobal IT Services. All Rights Reserved.',
    google_analytics_id: 'G-XXXXXXXXXX',
    google_maps_url: '',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    logo: null,
    favicon: null
  });

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const data = await settingsApi.getSettings();
      if (data) setFormData((prev) => ({ ...prev, ...data }));
      setLoading(false);
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await settingsApi.updateSettings(formData);
    if (res.success !== false) {
      addToast('Website settings saved successfully!');
    } else {
      addToast('Failed to save website settings', 'error');
    }
  };

  return (
    <div>
      <PageHeader
        title="Website Settings"
        subtitle="Manage company business information, contact details, social profiles, branding, and analytics"
        breadcrumbItems={[{ label: 'Website Settings' }]}
      />

      <form onSubmit={handleSubmit}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid var(--admin-border-color)', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--admin-primary)', fontSize: '18px', fontWeight: 700 }}>Company Contact & Address</h3>
          
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Company Legal Name</label>
              <input
                type="text"
                className="admin-form-control"
                required
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Support Email Address</label>
              <input
                type="email"
                className="admin-form-control"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Contact Phone Number</label>
              <input
                type="text"
                className="admin-form-control"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Google Analytics ID</label>
              <input
                type="text"
                className="admin-form-control"
                placeholder="G-XXXXXXXXXX"
                value={formData.google_analytics_id}
                onChange={(e) => setFormData({ ...formData, google_analytics_id: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Physical HQ Address</label>
            <textarea
              className="admin-form-control"
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid var(--admin-border-color)', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--admin-primary)', fontSize: '18px', fontWeight: 700 }}>Social Links & Footer Copyright</h3>
          
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>LinkedIn URL</label>
              <input
                type="text"
                className="admin-form-control"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Twitter / X URL</label>
              <input
                type="text"
                className="admin-form-control"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Facebook URL</label>
              <input
                type="text"
                className="admin-form-control"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Footer Copyright Statement</label>
            <input
              type="text"
              className="admin-form-control"
              value={formData.copyright}
              onChange={(e) => setFormData({ ...formData, copyright: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <ActionButton type="submit" icon="💾">
            Save Company Settings
          </ActionButton>
        </div>
      </form>
    </div>
  );
};

export default SettingsAdminPage;
