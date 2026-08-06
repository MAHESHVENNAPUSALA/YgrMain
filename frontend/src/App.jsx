import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './shared/context/AuthContext';
import { ROUTES } from './shared/constants/routes';
import './website/premium-theme.css';
import ProtectedRoute from './hrm/components/ProtectedRoute';
import Layout from './hrm/components/Layout';
import Loader from './components/common/Loader';
import { renderWebsiteRoutes } from './routes/websiteRoutes';
import { renderAdminCmsRoutes } from './routes/adminCmsRoutes';
import { AdminAuthProvider } from './website/admin/hooks/useAdminAuth';

// ── Website (Public) ───────────────────────────────────────────────
import PublicLayout from './website/components/PublicLayout';
import Home from './website/pages/Home';
import Aboutus from './website/pages/Aboutus';
import Services from './website/pages/Services';
import Portfolio from './website/pages/Portfolio';
import Careers from './website/pages/Careers';
import BlogList from './website/pages/BlogList';
import BlogDetail from './website/pages/BlogDetail';
import Contact from './website/pages/Contact';
import TeamList from './website/pages/TeamList';
import InternshipList from './website/pages/InternshipList';
import InternshipDetail from './website/pages/InternshipDetail';
import ClientForm from './website/pages/ClientForm';

// ── Internship Portal Modules ───────────────────────────────
import Vacancies from './website/internships/Vacancies';
import JobApplication from './website/internships/JobApplication';
import JobApplicantLogin from './website/internships/JobApplicantLogin';
import RegisterInternship from './website/internships/RegisterInternship';

// ── Website CMS Admin Pages (Lazy Loaded) ─────────────────────────
const AdminLoginPage = lazy(() => import('./website/admin/pages/authentication/AdminLoginPage'));

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

const AdminRedirect = () => {
  const backendHost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? `http://${window.location.hostname}:8000`
      : 'http://13.201.218.175:8000';
  window.location.href = `${backendHost}/admin-login/`;
  return null;
};

// Component to handle default redirect on landing page based on role
const HomeRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to={ROUTES.HRMS_LOGIN} replace />;

  const roleRedirects = {
    Employee: ROUTES.HRMS_EMPLOYEE_DASHBOARD,
    TeamLead: ROUTES.HRMS_TL_DASHBOARD,
    Manager: ROUTES.HRMS_MANAGER_DASHBOARD,
    HR: ROUTES.HRMS_HR_DASHBOARD,
    MD: ROUTES.HRMS_MD_DASHBOARD
  };
  return <Navigate to={roleRedirects[user.role] || ROUTES.HRMS_LOGIN} replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loader message="Loading portal dashboard..." />}>
          <Routes>
            {/* ── PUBLIC COMPANY WEBSITE ── */}
            {renderWebsiteRoutes()}

            {/* ── INTERNSHIP PORTAL ── */}
            <Route element={<PublicLayout hideHeaderFooter={true} />}>
              <Route path={ROUTES.VACANCIES} element={<Vacancies />} />
              <Route path="/legacy/exampages/internship_list" element={<Navigate to={ROUTES.GLOBAL_INTERNSHIPS} replace />} />
              <Route path="/legacy/exampages/job_applicant_login" element={<JobApplicantLogin />} />
            </Route>

            {/* ── DJANGO BACKEND ADMIN REDIRECT ── */}
            <Route path="/admin-base" element={<AdminRedirect />} />
            <Route path="/admin-base/*" element={<AdminRedirect />} />

            {/* ── WEBSITE CMS ADMIN LOGIN & ROUTES ── */}
            <Route
              path="/admin/website/login"
              element={
                <AdminAuthProvider>
                  <AdminLoginPage />
                </AdminAuthProvider>
              }
            />
            {renderAdminCmsRoutes()}

            {/* ── HRMS PROTECTED DASHBOARD ── */}
            <Route path={ROUTES.HRMS_LOGIN} element={<Login />} />

            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Landing redirect */}
              <Route path={ROUTES.HRMS_PORTAL} element={<HomeRedirect />} />

              {/* HRMS Role Dashboards */}
              <Route
                path="employee-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['Employee']}>
                    <EmployeeDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="hr-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['HR']}>
                    <HRDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="manager-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['Manager']}>
                    <ManagerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="tl-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['TeamLead']}>
                    <TLDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="md-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['MD']}>
                    <MDDashboard />
                  </ProtectedRoute>
                }
              />

              {/* HRMS Self-service & Management Pages */}
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

              {/* HRMS Projects & Tasks */}
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
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
