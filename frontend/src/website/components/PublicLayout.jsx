import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

const PublicLayout = ({ hideHeaderFooter = false }) => {
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

    // Allow native scrolling for public pages (fixes Lenis and Framer Motion window scroll)
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    
    return () => {
      // Remove Bootstrap when leaving public layout so it doesn't break the HR Dashboard
      const css = document.getElementById('bootstrap-css');
      const icons = document.getElementById('bootstrap-icons');
      const modernUi = document.getElementById('modern-ui-css');
      if (css) css.remove();
      if (icons) icons.remove();
      if (modernUi) modernUi.remove();

      // Restore body styles for the HR dashboard
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '100vh', overflowX: 'hidden', backgroundColor: '#0f172a' }}>
      {!hideHeaderFooter && <PublicHeader />}
      <main>
        <Outlet />
      </main>
      {!hideHeaderFooter && <PublicFooter />}
    </div>
  );
};

export default PublicLayout;
