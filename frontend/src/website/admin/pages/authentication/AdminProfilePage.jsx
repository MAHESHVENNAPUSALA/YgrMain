import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import ActionButton from '../../components/ActionButton';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useToast } from '../../hooks/useToast';

const AdminProfilePage = () => {
  const { adminUser, loginAdmin } = useAdminAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: adminUser?.name || 'Administrator',
    email: adminUser?.email || 'admin@ygr.com',
    role: adminUser?.role || 'Super Admin',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    loginAdmin({ ...adminUser, name: formData.name, email: formData.email });
    addToast('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      addToast('New passwords do not match', 'error');
      return;
    }
    addToast('Password updated successfully!');
    setFormData((prev) => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  return (
    <div>
      <PageHeader
        title="Admin Account Profile"
        subtitle="Manage administrator account credentials and personal preferences"
        breadcrumbItems={[{ label: 'Profile' }]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid var(--admin-border-color)' }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--admin-primary)', fontSize: '18px', fontWeight: 700 }}>Personal Information</h3>
          <form onSubmit={handleSubmitProfile}>
            <div className="admin-form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="admin-form-control"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="admin-form-control"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label>Administrative Role</label>
              <input
                type="text"
                className="admin-form-control"
                disabled
                value={formData.role}
              />
            </div>

            <ActionButton type="submit" icon="💾">
              Update Profile
            </ActionButton>
          </form>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid var(--admin-border-color)' }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--admin-primary)', fontSize: '18px', fontWeight: 700 }}>Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <div className="admin-form-group">
              <label>Current Password</label>
              <input
                type="password"
                className="admin-form-control"
                required
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label>New Password</label>
              <input
                type="password"
                className="admin-form-control"
                required
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                className="admin-form-control"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <ActionButton type="submit" variant="secondary" icon="🔑">
              Update Password
            </ActionButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
