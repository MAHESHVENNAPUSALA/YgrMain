import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import WhatsAppFloatingIcon from './WhatsAppFloatingIcon';

const PublicLayout = ({ hideHeaderFooter = false }) => {
  const location = useLocation();

  useEffect(() => {
    // Inject Bootstrap globally for Public Pages
    const bootstrapCss = document.createElement('link');
    bootstrapCss.rel = 'stylesheet';
    bootstrapCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    bootstrapCss.id = 'bootstrap-css';
    
    const bootstrapIcons = document.createElement('link');
    bootstrapIcons.rel = 'stylesheet';
    bootstrapIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
    bootstrapIcons.id = 'bootstrap-icons';
    
    if (!document.getElementById('bootstrap-css')) document.head.appendChild(bootstrapCss);
    if (!document.getElementById('bootstrap-icons')) document.head.appendChild(bootstrapIcons);
    
    const modernUiCss = document.createElement('link');
    modernUiCss.rel = 'stylesheet';
    modernUiCss.href = '/css/modern_ui.css';
    modernUiCss.id = 'modern-ui-css';
    if (!document.getElementById('modern-ui-css')) document.head.appendChild(modernUiCss);

    // Allow native scrolling for public pages
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    
    return () => {
      const css = document.getElementById('bootstrap-css');
      const icons = document.getElementById('bootstrap-icons');
      const modernUi = document.getElementById('modern-ui-css');
      if (css) css.remove();
      if (icons) icons.remove();
      if (modernUi) modernUi.remove();

      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, []);

  // ── Dynamic SEO Page Titles ──
  useEffect(() => {
    const path = location.pathname.toLowerCase();

    if (path === '/' || path === '/home') {
      document.title = 'Best IT Services in Hyderabad - YGR Gobal IT Services';
    } else if (path.startsWith('/about')) {
      document.title = 'Best Digital Marketing in Hyderabad - YGR Gobal IT Services';
    } else if (
      path.startsWith('/careers') ||
      path.startsWith('/global-internships') ||
      path.startsWith('/vacancies') ||
      path.startsWith('/register-internship') ||
      path.startsWith('/internships')
    ) {
      document.title = 'Best Internship in Hyderabad - YGR Gobal IT Services';
    } else if (path.startsWith('/team')) {
      document.title = 'Best Website Design in Hyderabad - YGR Gobal IT Services';
    } else if (path.startsWith('/services')) {
      document.title = 'Best Mobile App Services in Hyderabad - YGR Gobal IT Services';
    } else if (path.startsWith('/portfolio')) {
      document.title = 'End to End IT Services in Hyderabad - YGR Gobal IT Services';
    } else if (path.startsWith('/blog')) {
      document.title = 'Best Web Application Service in Hyderabad - YGR Gobal IT Services';
    } else if (path.startsWith('/contact') || path.startsWith('/client-registration')) {
      document.title = 'Best IT Services in Hyderabad - YGR Gobal IT Services';
    } else {
      document.title = 'Best IT Services in Hyderabad - YGR Gobal IT Services';
    }
  }, [location.pathname]);

  // ── Global Scroll Reveal Engine (Site-wide Desktop Scroll Reveal Transitions) ──
  useEffect(() => {
    if (window.innerWidth < 1024) return; // Keep mobile instant & minimal

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const initScrollReveals = () => {
      const targetSelectors = [
        'section',
        '.reveal-up',
        '.reveal-left',
        '.reveal-right',
        '.reveal-scale',
        '.bento-card',
        '.process-step-card',
        '.project-showcase-card',
        '.industry-bento-card',
        '.pp-hub-card',
        '.editorial-hero'
      ];

      const elements = document.querySelectorAll(targetSelectors.join(','));
      elements.forEach((el) => {
        if (
          !el.classList.contains('reveal-up') &&
          !el.classList.contains('reveal-left') &&
          !el.classList.contains('reveal-right') &&
          !el.classList.contains('reveal-scale')
        ) {
          el.classList.add('reveal-up');
        }

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('active');
        } else {
          revealObserver.observe(el);
        }
      });
    };

    initScrollReveals();
    const timer1 = setTimeout(initScrollReveals, 200);
    const timer2 = setTimeout(initScrollReveals, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      revealObserver.disconnect();
    };
  }, [location.pathname]);

  return (
    <>
      <div style={{ width: '100%', minHeight: '100vh', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {!hideHeaderFooter && <PublicHeader />}
        <main style={{ flex: 1, width: '100%' }}>
          <Outlet />
        </main>
        {!hideHeaderFooter && <PublicFooter />}
      </div>
      <WhatsAppFloatingIcon />
    </>
  );
};

export default PublicLayout;
