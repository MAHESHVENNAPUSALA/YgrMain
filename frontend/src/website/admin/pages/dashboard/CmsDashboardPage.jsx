import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import portfolioApi from '../../api/portfolioApi';
import blogsApi from '../../api/blogsApi';
import contactApi from '../../api/contactApi';
import careersApi from '../../api/careersApi';

const CmsDashboardPage = () => {
  const [stats, setStats] = useState({
    portfolioCount: 0,
    blogsCount: 0,
    enquiriesCount: 0,
    vacanciesCount: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [portfolios, blogs, enquiries, vacancies] = await Promise.all([
          portfolioApi.getAll(),
          blogsApi.getAll(),
          contactApi.getAll(),
          careersApi.getVacancies()
        ]);

        setStats({
          portfolioCount: portfolios.length,
          blogsCount: blogs.length,
          enquiriesCount: enquiries.length,
          vacanciesCount: vacancies.length
        });

        setRecentEnquiries(enquiries.slice(0, 5));
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const columns = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Service', key: 'service' },
    {
      label: 'Status',
      key: 'status',
      render: (row) => (
        <span className={`admin-status-pill ${row.status === 'New' ? 'warning' : 'success'}`}>
          <span className="admin-status-dot" />
          {row.status || 'New'}
        </span>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="CMS Overview Dashboard"
        subtitle="Manage all dynamic content, portfolio items, blog articles, and lead enquiries."
        breadcrumbItems={[{ label: 'Dashboard' }]}
      />

      <div className="admin-stats-grid">
        <StatCard
          label="Total Portfolio Items"
          value={stats.portfolioCount}
          trend={{ type: 'positive', text: 'Live showcase items' }}
          icon="🚀"
        />
        <StatCard
          label="Published Blogs"
          value={stats.blogsCount}
          trend={{ type: 'positive', text: 'Active news articles' }}
          icon="📝"
        />
        <StatCard
          label="Contact Enquiries"
          value={stats.enquiriesCount}
          trend={{ type: 'neutral', text: 'Total leads received' }}
          icon="📬"
        />
        <StatCard
          label="Job Vacancies"
          value={stats.vacanciesCount}
          trend={{ type: 'positive', text: 'Active openings' }}
          icon="💼"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '24px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid var(--admin-border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: 'var(--admin-primary)', fontSize: '18px', fontWeight: 700 }}>Quick Actions</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Link to="/admin/website/portfolio" className="admin-btn admin-btn-outline" style={{ justifyContent: 'flex-start' }}>
              <span>🚀</span> Portfolio Manager
            </Link>
            <Link to="/admin/website/blogs" className="admin-btn admin-btn-outline" style={{ justifyContent: 'flex-start' }}>
              <span>📝</span> Create New Blog
            </Link>
            <Link to="/admin/website/services" className="admin-btn admin-btn-outline" style={{ justifyContent: 'flex-start' }}>
              <span>⚡</span> Services Manager
            </Link>
            <Link to="/admin/website/careers" className="admin-btn admin-btn-outline" style={{ justifyContent: 'flex-start' }}>
              <span>💼</span> Job Vacancies
            </Link>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid var(--admin-border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: 'var(--admin-primary)', fontSize: '18px', fontWeight: 700 }}>Recent Contact Enquiries</h3>
            <Link to="/admin/website/contact-enquiries" style={{ fontSize: '13px', color: 'var(--admin-secondary)', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
          </div>
          <DataTable columns={columns} data={recentEnquiries} loading={loading} emptyMessage="No recent contact enquiries" />
        </div>
      </div>
    </div>
  );
};

export default CmsDashboardPage;
