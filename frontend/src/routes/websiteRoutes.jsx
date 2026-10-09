import React from 'react';
import { Route } from 'react-router-dom';
import { ROUTES } from '../shared/constants/routes';

import PublicLayout from '../website/components/PublicLayout';
import Home from '../website/pages/Home';
import Aboutus from '../website/pages/Aboutus';
import Services from '../website/pages/Services';
import Portfolio from '../website/pages/Portfolio';
import Careers from '../website/pages/Careers';
import BlogList from '../website/pages/BlogList';
import BlogDetail from '../website/pages/BlogDetail';
import Contact from '../website/pages/Contact';
import TeamList from '../website/pages/TeamList';
import InternshipList from '../website/pages/InternshipList';
import InternshipDetail from '../website/pages/InternshipDetail';
import ClientForm from '../website/pages/ClientForm';
import JobApplication from '../website/internships/JobApplication';
import RegisterInternship from '../website/internships/RegisterInternship';
import CandidateExamGateway from '../website/pages/CandidateExamGateway';

export const renderWebsiteRoutes = () => (
  <>
    <Route element={<PublicLayout />}>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.ABOUT} element={<Aboutus />} />
      <Route path={ROUTES.SERVICES} element={<Services />} />
      <Route path={ROUTES.PORTFOLIO} element={<Portfolio />} />
      <Route path={ROUTES.CAREERS} element={<Careers />} />
      <Route path={ROUTES.BLOG} element={<BlogList />} />
      <Route path={ROUTES.BLOG_DETAIL} element={<BlogDetail />} />
      <Route path={ROUTES.CONTACT} element={<Contact />} />
      <Route path={ROUTES.CLIENT_REGISTRATION} element={<ClientForm />} />
      <Route path={ROUTES.TEAM} element={<TeamList />} />
      <Route path={ROUTES.GLOBAL_INTERNSHIPS} element={<InternshipList />} />
      <Route path={ROUTES.INTERNSHIP_DETAIL} element={<InternshipDetail />} />
      <Route path="/legacy/exampages/job_application" element={<JobApplication />} />
      <Route path={ROUTES.REGISTER_INTERNSHIP} element={<RegisterInternship />} />
    </Route>
    {/* Standalone Candidate Exam Page (No Header / No Footer) */}
    <Route path={ROUTES.CANDIDATE_EXAM} element={<CandidateExamGateway />} />
  </>
);

export default renderWebsiteRoutes;
