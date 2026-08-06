import React, { lazy } from 'react';
import { Route, Navigate } from 'react-router-dom';

import AdminLayout from '../layouts/AdminLayout';

// Lazy Loaded Admin CMS Pages
const CmsDashboardPage = lazy(() => import('../pages/dashboard/CmsDashboardPage'));
const CarouselAdminPage = lazy(() => import('../pages/carousel/CarouselAdminPage'));
const ServicesAdminPage = lazy(() => import('../pages/services/ServicesAdminPage'));
const PortfolioAdminPage = lazy(() => import('../pages/portfolio/PortfolioAdminPage'));
const BlogsAdminPage = lazy(() => import('../pages/blogs/BlogsAdminPage'));
const TeamAdminPage = lazy(() => import('../pages/team/TeamAdminPage'));
const TestimonialsAdminPage = lazy(() => import('../pages/testimonials/TestimonialsAdminPage'));
const ClientsAdminPage = lazy(() => import('../pages/clients/ClientsAdminPage'));
const CareersAdminPage = lazy(() => import('../pages/careers/CareersAdminPage'));
const InternshipsAdminPage = lazy(() => import('../pages/internships/InternshipsAdminPage'));
const ContactAdminPage = lazy(() => import('../pages/contact/ContactAdminPage'));
const SeoAdminPage = lazy(() => import('../pages/seo/SeoAdminPage'));
const SettingsAdminPage = lazy(() => import('../pages/settings/SettingsAdminPage'));
const AdminProfilePage = lazy(() => import('../pages/authentication/AdminProfilePage'));

export const renderAdminCmsRoutes = () => (
  <>
    <Route path="/admin" element={<Navigate to="/admin/website/dashboard" replace />} />
    <Route path="/admin/website" element={<Navigate to="/admin/website/dashboard" replace />} />
    <Route path="/website/admin" element={<Navigate to="/admin/website/dashboard" replace />} />

    <Route element={<AdminLayout />}>
      <Route path="/admin/website/dashboard" element={<CmsDashboardPage />} />
      <Route path="/admin/dashboard" element={<CmsDashboardPage />} />
      
      <Route path="/admin/website/carousel" element={<CarouselAdminPage />} />
      <Route path="/admin/website/services" element={<ServicesAdminPage />} />
      
      <Route path="/admin/website/portfolio" element={<PortfolioAdminPage />} />
      <Route path="/admin/website/projects" element={<PortfolioAdminPage />} />
      <Route path="/admin/projects" element={<PortfolioAdminPage />} />
      <Route path="/projects/admin" element={<PortfolioAdminPage />} />

      <Route path="/admin/website/blogs" element={<BlogsAdminPage />} />
      <Route path="/admin/website/team" element={<TeamAdminPage />} />
      <Route path="/admin/website/testimonials" element={<TestimonialsAdminPage />} />
      <Route path="/admin/website/clients" element={<ClientsAdminPage />} />
      <Route path="/admin/website/careers" element={<CareersAdminPage />} />
      <Route path="/admin/website/internships" element={<InternshipsAdminPage />} />
      <Route path="/admin/website/contact-enquiries" element={<ContactAdminPage />} />
      <Route path="/admin/website/seo" element={<SeoAdminPage />} />
      <Route path="/admin/website/settings" element={<SettingsAdminPage />} />
      <Route path="/admin/website/profile" element={<AdminProfilePage />} />
    </Route>
  </>
);

export default renderAdminCmsRoutes;
