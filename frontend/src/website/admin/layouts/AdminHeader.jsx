import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';

const pageTitles = {
  '/admin/website/dashboard': { title: 'Dashboard Overview', subtitle: 'Manage company website modules, analytics, and content' },
  '/admin/website/carousel': { title: 'Hero Carousel', subtitle: 'Manage website home page hero sliders and banner images' },
  '/admin/website/services': { title: 'Services & Offerings', subtitle: 'Manage company core services, categories, and icons' },
  '/admin/website/portfolio': { title: 'Portfolio Management', subtitle: 'Showcase projects, case studies, technologies, and live demos' },
  '/admin/website/blogs': { title: 'Blog Articles & News', subtitle: 'Create, edit, and publish news and technical articles' },
  '/admin/website/team': { title: 'Team Members', subtitle: 'Manage leadership, engineering staff, and designations' },
  '/admin/website/testimonials': { title: 'Client Testimonials', subtitle: 'Manage client reviews, feedback, and active testimonials' },
  '/admin/website/clients': { title: 'Clients & Partners', subtitle: 'Manage client logos, priority placement, and links' },
  '/admin/website/careers': { title: 'Careers & Job Openings', subtitle: 'Manage job vacancies, specifications, and applicant pipeline' },
  '/admin/website/internships': { title: 'Internship Programs', subtitle: 'Manage training programs, syllabi, fee, and enrollments' },
  '/admin/website/contact-enquiries': { title: 'Contact Enquiries', subtitle: 'View customer messages, respond, archive, or export data' },
  '/admin/website/seo': { title: 'SEO Settings', subtitle: 'Configure global site metadata, Open Graph tags, and sitemaps' },
  '/admin/website/settings': { title: 'Website Settings', subtitle: 'Configure contact info, social links, footer, and branding' },
  '/admin/website/profile': { title: 'Admin Profile', subtitle: 'Update account credentials and administration settings' }
};

const AdminHeader = ({ setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminUser, logoutAdmin } = useAdminAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentInfo = pageTitles[location.pathname] || { title: 'Website Admin CMS', subtitle: 'YGR Gobal IT Services' };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('blog')) navigate('/admin/website/blogs');
    else if (q.includes('port') || q.includes('proj')) navigate('/admin/website/portfolio');
    else if (q.includes('serv')) navigate('/admin/website/services');
    else if (q.includes('team')) navigate('/admin/website/team');
    else if (q.includes('job') || q.includes('care')) navigate('/admin/website/careers');
    else if (q.includes('intern')) navigate('/admin/website/internships');
    else if (q.includes('contact') || q.includes('enq')) navigate('/admin/website/contact-enquiries');
    else if (q.includes('setting')) navigate('/admin/website/settings');
    else navigate('/admin/website/dashboard');
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/website/login');
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button className="admin-mobile-toggle" onClick={() => setMobileOpen(true)}>
          ☰
        </button>
        <div className="admin-header-title-group">
          <h1>{currentInfo.title}</h1>
          <p>{currentInfo.subtitle}</p>
        </div>
      </div>

      <div className="admin-header-right">
        <form className="admin-header-search" onSubmit={handleSearchSubmit}>
          <span className="admin-header-search-icon">🔍</span>
          <input
            type="text"
            className="admin-header-search-input"
            placeholder="Search CMS modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="admin-header-notifications">
          <button
            className="admin-header-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            🔔
            <span className="admin-notification-badge" />
          </button>

          {showNotifications && (
            <div className="admin-notifications-dropdown">
              <div className="admin-notifications-header">
                <h4>System Notifications</h4>
                <span style={{ fontSize: '11px', color: 'var(--admin-secondary)', fontWeight: 600 }}>Mark all read</span>
              </div>
              <div className="admin-notifications-list">
                <div className="admin-notification-item">
                  <span>📬</span>
                  <div>
                    <strong>New Contact Enquiry</strong>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '11px' }}>2 minutes ago</div>
                  </div>
                </div>
                <div className="admin-notification-item">
                  <span>🎓</span>
                  <div>
                    <strong>New Internship Application</strong>
                    <div style={{ color: 'var(--admin-text-muted)', fontSize: '11px' }}>1 hour ago</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="admin-header-user-menu">
          <button className="admin-user-profile-btn" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <div className="admin-user-avatar">
              {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
            </div>
            <div className="admin-user-info">
              <span className="admin-user-name">{adminUser?.name || 'Administrator'}</span>
              <span className="admin-user-role">{adminUser?.role || 'Super Admin'}</span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="admin-user-dropdown">
              <Link to="/admin/website/profile" className="admin-dropdown-item" onClick={() => setShowProfileMenu(false)}>
                <span>👤</span> Admin Profile
              </Link>
              <Link to="/admin/website/settings" className="admin-dropdown-item" onClick={() => setShowProfileMenu(false)}>
                <span>⚙️</span> CMS Settings
              </Link>
              <button className="admin-dropdown-item danger" onClick={handleLogout}>
                <span>🚪</span> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
