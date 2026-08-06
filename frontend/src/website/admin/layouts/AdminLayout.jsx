import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import Toast from '../components/Toast';
import { ToastProvider } from '../hooks/useToast';
import { AdminAuthProvider, useAdminAuth } from '../hooks/useAdminAuth';

import '../styles/adminTheme.css';
import '../styles/adminLayout.css';
import '../styles/components.css';

const AdminLayoutContent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/website/login" replace />;
  }

  return (
    <div className={`admin-cms-wrapper admin-cms-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="admin-main-wrapper">
        <AdminHeader setMobileOpen={setMobileOpen} />
        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
      <Toast />
    </div>
  );
};

const AdminLayout = () => {
  return (
    <AdminAuthProvider>
      <ToastProvider>
        <AdminLayoutContent />
      </ToastProvider>
    </AdminAuthProvider>
  );
};

export default AdminLayout;
