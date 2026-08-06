import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';

const CmsDashboard = () => {
  const [stats, setStats] = useState({
    projects: 250,
    services: 8,
    blogs: 12,
    team: 15,
    careers: 6,
    jobApps: 45,
    internships: 8,
    internApps: 82,
    clients: 120,
    enquiries: 34
  });

  const [recentBlogs, setRecentBlogs] = useState([
    { id: 1, title: 'Building Microservices With Python & FastAPI', category: 'Backend Architecture', date: '2026-08-04', author: 'Mahesh V.' },
    { id: 2, title: '10 Essential AI Features Every SaaS App Needs', category: 'Artificial Intelligence', date: '2026-08-02', author: 'Priya S.' },
    { id: 3, title: 'AWS Cloud Cost Optimization Strategies for 2026', category: 'Cloud DevOps', date: '2026-07-29', author: 'Rahul V.' }
  ]);

  const [recentPortfolios, setRecentPortfolios] = useState([
    { id: 1, name: 'AMMA ORGANICS (Web Application)', category: 'Web Application', industry: 'Agriculture', duration: '1 Month' },
    { id: 2, name: 'Enterprise Healthcare Telehealth Platform', category: 'Enterprise Software', industry: 'Healthcare', duration: '6 Months' },
    { id: 3, name: 'Global Logistics & Fleet Telemetry System', category: 'Cloud Platform', industry: 'Logistics', duration: '8 Months' }
  ]);

  const [recentJobApps, setRecentJobApps] = useState([
    { id: 101, name: 'Karthik Rao', role: 'Senior Full Stack Engineer', appliedDate: '2026-08-05', status: 'Pending Review' },
    { id: 102, name: 'Ananya Sharma', role: 'UI/UX Product Designer', appliedDate: '2026-08-04', status: 'Shortlisted' },
    { id: 103, name: 'Suresh Reddy', role: 'DevOps & AWS Specialist', appliedDate: '2026-08-03', status: 'Under Interview' }
  ]);

  const [recentEnquiries, setRecentEnquiries] = useState([
    { id: 201, name: 'David Miller', email: 'david@fintechglobal.com', subject: 'Enterprise SaaS Development Inquiry', date: '2026-08-05' },
    { id: 202, name: 'Dr. Sunita Patel', email: 'sunita@healthplus.org', subject: 'HIPAA Telemedicine Portal Customization', date: '2026-08-04' }
  ]);

  return (
    <div className="container-fluid py-4">
      {/* ── 1. WELCOME HERO BANNER ── */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#FFF' }}>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <span className="badge bg-success text-white rounded-pill px-3 py-1 fw-bold mb-2">WEBSITE CMS ADMINISTRATION</span>
            <h2 className="fw-bold mb-1">YGR Global Website Content Management</h2>
            <p className="text-muted-light mb-0" style={{ color: '#94A3B8' }}>
              Manage website content, portfolio case studies, technology blogs, services, career openings, internship portals, and client enquiries.
            </p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/admin/website/projects" className="btn btn-primary rounded-pill px-4 fw-bold">
              <i className="fas fa-plus me-1"></i> Add Portfolio
            </Link>
            <Link to="/admin/website/blogs" className="btn btn-outline-light rounded-pill px-4 fw-bold">
              <i className="fas fa-newspaper me-1"></i> Write Blog
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. STATS CARDS GRID (10 CMS CARDS) ── */}
      <div className="row g-3 mb-4">
        <div className="col-lg-2 col-md-4 col-6">
          <div className="p-3 bg-white border rounded-4 shadow-sm h-100">
            <div className="text-primary fs-4 mb-1"><i className="fas fa-layer-group"></i></div>
            <div className="h3 fw-bold mb-0 text-dark">{stats.projects}</div>
            <div className="small text-muted fw-semibold">Portfolio Items</div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="p-3 bg-white border rounded-4 shadow-sm h-100">
            <div className="text-info fs-4 mb-1"><i className="fas fa-cubes"></i></div>
            <div className="h3 fw-bold mb-0 text-dark">{stats.services}</div>
            <div className="small text-muted fw-semibold">Core Services</div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="p-3 bg-white border rounded-4 shadow-sm h-100">
            <div className="text-success fs-4 mb-1"><i className="fas fa-newspaper"></i></div>
            <div className="h3 fw-bold mb-0 text-dark">{stats.blogs}</div>
            <div className="small text-muted fw-semibold">Blog Articles</div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="p-3 bg-white border rounded-4 shadow-sm h-100">
            <div className="text-warning fs-4 mb-1"><i className="fas fa-users"></i></div>
            <div className="h3 fw-bold mb-0 text-dark">{stats.team}</div>
            <div className="small text-muted fw-semibold">Team Members</div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="p-3 bg-white border rounded-4 shadow-sm h-100">
            <div className="text-danger fs-4 mb-1"><i className="fas fa-briefcase"></i></div>
            <div className="h3 fw-bold mb-0 text-dark">{stats.careers}</div>
            <div className="small text-muted fw-semibold">Career Openings</div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="p-3 bg-white border rounded-4 shadow-sm h-100">
            <div className="text-secondary fs-4 mb-1"><i className="fas fa-file-signature"></i></div>
            <div className="h3 fw-bold mb-0 text-dark">{stats.jobApps}</div>
            <div className="small text-muted fw-semibold">Job Applications</div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="p-3 bg-white border rounded-4 shadow-sm h-100">
            <div className="text-primary fs-4 mb-1"><i className="fas fa-graduation-cap"></i></div>
            <div className="h3 fw-bold mb-0 text-dark">{stats.internships}</div>
            <div className="small text-muted fw-semibold">Intern Programs</div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="p-3 bg-white border rounded-4 shadow-sm h-100">
            <div className="text-success fs-4 mb-1"><i className="fas fa-user-graduate"></i></div>
            <div className="h3 fw-bold mb-0 text-dark">{stats.internApps}</div>
            <div className="small text-muted fw-semibold">Intern Applications</div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="p-3 bg-white border rounded-4 shadow-sm h-100">
            <div className="text-info fs-4 mb-1"><i className="fas fa-building"></i></div>
            <div className="h3 fw-bold mb-0 text-dark">{stats.clients}</div>
            <div className="small text-muted fw-semibold">Clients</div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col-6">
          <div className="p-3 bg-white border rounded-4 shadow-sm h-100">
            <div className="text-warning fs-4 mb-1"><i className="fas fa-envelope-open-text"></i></div>
            <div className="h3 fw-bold mb-0 text-dark">{stats.enquiries}</div>
            <div className="small text-muted fw-semibold">Enquiries</div>
          </div>
        </div>
      </div>

      {/* ── 3. RECENT ACTIVITY GRIDS (2 COLUMNS) ── */}
      <div className="row g-4 mb-4">
        {/* Recent Portfolios */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-dark mb-0"><i className="fas fa-layer-group text-primary me-2"></i>Recent Portfolio Items</h5>
              <Link to="/admin/website/projects" className="small fw-bold text-primary text-decoration-none">View All →</Link>
            </div>
            <div className="list-group list-group-flush">
              {recentPortfolios.map((item) => (
                <div key={item.id} className="list-group-item px-0 py-3 border-bottom">
                  <div className="fw-bold text-dark">{item.name}</div>
                  <div className="small text-muted">{item.category} • <span className="text-success fw-semibold">{item.industry}</span> • {item.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-dark mb-0"><i className="fas fa-newspaper text-success me-2"></i>Recent Blog Articles</h5>
              <Link to="/admin/website/blogs" className="small fw-bold text-primary text-decoration-none">View All →</Link>
            </div>
            <div className="list-group list-group-flush">
              {recentBlogs.map((b) => (
                <div key={b.id} className="list-group-item px-0 py-3 border-bottom">
                  <div className="fw-bold text-dark">{b.title}</div>
                  <div className="small text-muted">{b.category} • By {b.author} on {b.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. APPLICATIONS & ENQUIRIES ── */}
      <div className="row g-4">
        {/* Recent Job Applications */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-dark mb-0"><i className="fas fa-file-signature text-warning me-2"></i>Recent Job Applications</h5>
              <span className="badge bg-warning-subtle text-warning border px-3 py-1 rounded-pill">45 Applications</span>
            </div>
            <div className="table-responsive">
              <table className="table align-middle small mb-0">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Applied Position</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentJobApps.map((app) => (
                    <tr key={app.id}>
                      <td className="fw-bold text-dark">{app.name}</td>
                      <td className="text-secondary">{app.role}</td>
                      <td><span className="badge bg-info-subtle text-info border px-2 py-1 rounded-pill">{app.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Contact Messages */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-dark mb-0"><i className="fas fa-envelope-open-text text-danger me-2"></i>Recent Contact Messages</h5>
              <span className="badge bg-danger-subtle text-danger border px-3 py-1 rounded-pill">34 Messages</span>
            </div>
            <div className="list-group list-group-flush">
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="list-group-item px-0 py-2 border-bottom">
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold text-dark">{enq.name}</span>
                    <span className="small text-muted">{enq.date}</span>
                  </div>
                  <div className="small text-primary font-monospace">{enq.email}</div>
                  <div className="small text-secondary fw-semibold">{enq.subject}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmsDashboard;
