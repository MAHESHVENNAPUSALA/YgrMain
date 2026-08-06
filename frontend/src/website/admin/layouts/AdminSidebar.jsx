import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';

const navItems = [
  { label: 'Dashboard', icon: '📊', path: '/admin/website/dashboard' },
  { label: 'Website (Public)', icon: '🌐', path: '/', isExternal: true },
  { label: 'Carousel', icon: '🎠', path: '/admin/website/carousel' },
  { label: 'Services', icon: '⚡', path: '/admin/website/services' },
  { label: 'Portfolio', icon: '🚀', path: '/admin/website/portfolio' },
  { label: 'Blogs', icon: '📝', path: '/admin/website/blogs' },
  { label: 'Team', icon: '👥', path: '/admin/website/team' },
  { label: 'Testimonials', icon: '⭐', path: '/admin/website/testimonials' },
  { label: 'Clients', icon: '🏢', path: '/admin/website/clients' },
  { label: 'Careers', icon: '💼', path: '/admin/website/careers' },
  { label: 'Internships', icon: '🎓', path: '/admin/website/internships' },
  { label: 'Contact Enquiries', icon: '📬', path: '/admin/website/contact-enquiries' },
  { label: 'SEO Settings', icon: '🔍', path: '/admin/website/seo' },
  { label: 'Website Settings', icon: '⚙️', path: '/admin/website/settings' },
  { label: 'Profile', icon: '👤', path: '/admin/website/profile' }
];

const AdminSidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/website/login');
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="admin-sidebar-brand">
        <NavLink to="/admin/website/dashboard" className="admin-sidebar-logo-group">
          <div className="admin-sidebar-logo-icon">Y</div>
          {!collapsed && (
            <div>
              <div className="admin-sidebar-brand-name">YGR Global</div>
              <span className="admin-sidebar-brand-sub">Website Admin CMS</span>
            </div>
          )}
        </NavLink>
        <button
          className="admin-sidebar-toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="admin-sidebar-nav">
        {!collapsed && <div className="admin-sidebar-section-title">Navigation Menu</div>}
        {navItems.map((item, idx) => {
          if (item.isExternal) {
            return (
              <a
                key={idx}
                href={item.path}
                target="_blank"
                rel="noreferrer"
                className="admin-sidebar-link"
                title={collapsed ? item.label : ''}
              >
                <span className="admin-sidebar-link-icon">{item.icon}</span>
                {!collapsed && <span className="admin-sidebar-link-text">{item.label} ↗</span>}
              </a>
            );
          }

          return (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : ''}
              onClick={() => setMobileOpen(false)}
            >
              <span className="admin-sidebar-link-icon">{item.icon}</span>
              {!collapsed && <span className="admin-sidebar-link-text">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <button className="admin-sidebar-logout-btn" onClick={handleLogout} title={collapsed ? 'Logout' : ''}>
          <span>🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
