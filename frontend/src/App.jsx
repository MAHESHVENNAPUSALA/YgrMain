import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './shared/context/AuthContext';
import './website/premium-theme.css';
import ProtectedRoute from './hrm/components/ProtectedRoute';
import Layout from './hrm/components/Layout';
import Loader from './components/common/Loader';

// ── Website (Public) ───────────────────────────────────────────────
import PublicLayout from './website/components/PublicLayout';
import Home from './website/pages/Home';
import Aboutus from './website/pages/Aboutus';
import Services from './website/pages/Services';
import Portfolio from './website/admin/ProjectList';
import Careers from './website/pages/Careers';
import BlogList from './website/pages/BlogList';
import BlogDetail from './website/pages/BlogDetail';
import Contact from './website/pages/Contact';
import TeamList from './website/pages/TeamList';
import InternshipList from './website/pages/InternshipList';
import ClientForm from './website/pages/ClientForm';

// ── Internship Portal (Legacy pages) ───────────────────────────────
import OriginalVacancies from './internship/OriginalVacancies';
import OriginalExampagesJobApplication from './internship/OriginalExampagesJobApplication';
import OriginalExampagesJobApplicantLogin from './internship/OriginalExampagesJobApplicantLogin';
import OriginalExampagesRegister from './internship/OriginalExampagesRegister';

const AdminRedirect = () => {
    window.location.href = 'http://13.201.218.175:8000/admin';
    return null;
};

// ── HRM Dashboard Pages (Lazy Loaded) ─────────────────────────────
const Login = lazy(() => import('./hrm/pages/Login'));
const EmployeeDashboard = lazy(() => import('./hrm/pages/EmployeeDashboard'));
const HRDashboard = lazy(() => import('./hrm/pages/HRDashboard'));
const Employees = lazy(() => import('./hrm/pages/Employees'));
const ManagerDashboard = lazy(() => import('./hrm/pages/ManagerDashboard'));
const TLDashboard = lazy(() => import('./hrm/pages/TLDashboard'));
const MDDashboard = lazy(() => import('./hrm/pages/MDDashboard'));
const Profile = lazy(() => import('./hrm/pages/Profile'));
const Attendance = lazy(() => import('./hrm/pages/Attendance'));
const Payslips = lazy(() => import('./hrm/pages/Payslips'));
const Payroll = lazy(() => import('./hrm/pages/Payroll'));
const HolidayCalendar = lazy(() => import('./hrm/pages/HolidayCalendar'));
const Leave = lazy(() => import('./hrm/pages/Leave'));
const Messages = lazy(() => import('./hrm/pages/Messages'));
const Tasks = lazy(() => import('./hrm/pages/Tasks'));
const Projects = lazy(() => import('./hrm/pages/Projects'));
const Settings = lazy(() => import('./hrm/pages/Settings'));
const Calls = lazy(() => import('./hrm/pages/Calls'));
const Invoices = lazy(() => import('./hrm/pages/Invoices'));
const Exams = lazy(() => import('./hrm/pages/Exams'));
const Register = lazy(() => import('./hrm/pages/Register'));
const ClientCreate = lazy(() => import('./hrm/pages/ClientCreate'));
const ServiceCreate = lazy(() => import('./hrm/pages/ServiceCreate'));
const InvoiceCreate = lazy(() => import('./hrm/pages/InvoiceCreate'));
const SalaryStructures = lazy(() => import('./hrm/pages/SalaryStructures'));

// Component to handle default redirect on landing page based on role
const HomeRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  
  const roleRedirects = {
    Employee: '/employee-dashboard',
    TeamLead: '/tl-dashboard',
    Manager: '/manager-dashboard',
    HR: '/hr-dashboard',
    MD: '/md-dashboard',
  };
  return <Navigate to={roleRedirects[user.role] || '/login'} replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loader message="Loading portal dashboard..." />}>
          <Routes>
          {/* ── PUBLIC COMPANY WEBSITE ── */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/client-registration" element={<ClientForm />} />
            <Route path="/team" element={<TeamList />} />
            <Route path="/global-internships" element={<InternshipList />} />
            <Route path="/internships" element={<Navigate to="/global-internships" replace />} />
          </Route>

          {/* ── INTERNSHIP PORTAL (no header/footer) ── */}
          <Route element={<PublicLayout hideHeaderFooter={true} />}>
            <Route path="/vacancies" element={<OriginalVacancies />} />
            <Route path="/legacy/exampages/internship_list" element={<Navigate to="/global-internships" replace />} />
            <Route path="/legacy/exampages/job_application" element={<OriginalExampagesJobApplication />} />
            <Route path="/legacy/exampages/job_applicant_login" element={<OriginalExampagesJobApplicantLogin />} />
            <Route path="/register-internship" element={<OriginalExampagesRegister />} />
            <Route path="/legacy/exampages/register" element={<Navigate to="/register-internship" replace />} />
          </Route>

          <Route path="/admin/*" element={<AdminRedirect />} />
          <Route path="/admin" element={<AdminRedirect />} />

          {/* ── HRM DASHBOARD ── */}
          <Route path="/login" element={<Login />} />

          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            {/* Landing redirect */}
            <Route path="/portal" element={<HomeRedirect />} />

            {/* Dashboards */}
            <Route path="employee-dashboard" element={
              <ProtectedRoute allowedRoles={['Employee']}>
                <EmployeeDashboard />
              </ProtectedRoute>
            } />
            <Route path="hr-dashboard" element={
              <ProtectedRoute allowedRoles={['HR']}>
                <HRDashboard />
              </ProtectedRoute>
            } />
            <Route path="manager-dashboard" element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <ManagerDashboard />
              </ProtectedRoute>
            } />
            <Route path="tl-dashboard" element={
              <ProtectedRoute allowedRoles={['TeamLead']}>
                <TLDashboard />
              </ProtectedRoute>
            } />
            <Route path="md-dashboard" element={
              <ProtectedRoute allowedRoles={['MD']}>
                <MDDashboard />
              </ProtectedRoute>
            } />

            {/* Self-service Pages */}
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit" element={<Profile />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="payslips" element={<Payslips />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="holidays" element={<HolidayCalendar />} />
            <Route path="holiday-approvals" element={<HolidayCalendar />} />
            <Route path="leaves" element={<Leave />} />
            <Route path="messages" element={<Messages />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="settings" element={<Settings />} />
            <Route path="calls" element={<Calls />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="exams" element={<Exams />} />

            {/* Account Registration */}
            <Route path="register" element={<Register />} />

            {/* Employee list mappings */}
            <Route path="hr-list" element={<Employees />} />
            <Route path="manager-list" element={<Employees />} />
            <Route path="tl-list" element={<Employees />} />
            <Route path="employee-list" element={<Employees />} />
            <Route path="employees" element={<Employees />} />
            <Route path="all-member" element={<MDDashboard />} />

            {/* Leave mappings */}
            <Route path="leave-dashboard" element={<Leave />} />
            <Route path="apply-leave" element={<Leave />} />
            <Route path="leave-status" element={<Leave />} />
            <Route path="all-leaves" element={<Leave />} />
            <Route path="hr-approved-leaves" element={<Leave />} />
            <Route path="manager-approved-leaves" element={<Leave />} />
            <Route path="tl-approved-leaves" element={<Leave />} />
            <Route path="leave-requests" element={<Leave />} />

            {/* Projects / Tasks mappings */}
            <Route path="project-dashboard" element={<Projects />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<Projects />} />
            <Route path="assign-task" element={<Tasks />} />
            <Route path="assign-project" element={<Projects />} />
            <Route path="reports-submit" element={<Tasks />} />
            <Route path="reports-list" element={<Tasks />} />

            {/* Attendance mappings */}
            <Route path="attendance-list" element={<Attendance />} />
            <Route path="monthly-attendance" element={<Attendance />} />
            <Route path="attendance-approvals" element={<Attendance />} />
            <Route path="attendance-correct" element={<Attendance />} />
            <Route path="attendance-correct-bulk" element={<Attendance />} />

            {/* Finance & Invoicing */}
            <Route path="finance/invoices" element={<Invoices />} />
            <Route path="finance/clients/new" element={<ClientCreate />} />
            <Route path="finance/services/new" element={<ServiceCreate />} />
            <Route path="finance/invoices/create" element={<InvoiceCreate />} />
            <Route path="finance/salary-structures" element={<SalaryStructures />} />
            <Route path="finance/payroll" element={<Payslips />} />

            {/* Legacy mappings */}
            <Route path="client-create" element={<ClientCreate />} />
            <Route path="service-create" element={<ServiceCreate />} />
            <Route path="invoice-create" element={<InvoiceCreate />} />
            <Route path="salary-structures" element={<SalaryStructures />} />
            <Route path="payslips-list" element={<Payslips />} />
            <Route path="questions" element={<Exams />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
