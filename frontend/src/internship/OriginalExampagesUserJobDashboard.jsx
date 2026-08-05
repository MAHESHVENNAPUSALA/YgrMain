import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesUserJobDashboard = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    
    useEffect(() => {
        // Intercept link clicks for React Router
        const handleLinkClick = (e) => {
            const target = e.target.closest('a');
            if (target && target.getAttribute('href') && target.getAttribute('href').startsWith('/')) {
                e.preventDefault();
                navigate(target.getAttribute('href'));
            }
        };
        document.addEventListener('click', handleLinkClick);
        
        // Re-run scripts
        if (containerRef.current) {
            const scripts = containerRef.current.querySelectorAll('script');
            scripts.forEach(oldScript => {
                if (oldScript.dataset.executed) return;
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                if (oldScript.innerHTML) newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
                newScript.dataset.executed = "true";
            });
        }

        return () => document.removeEventListener('click', handleLinkClick);
    }, [navigate]);

    const rawHTML = `<link href="/images/logo.png" rel="icon" type="image/png"/>
<style>
/* ---------------- Reset & Base ---------------- */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: "Segoe UI", Arial, sans-serif;
    background: #f4f6fb;
    color: #1f2937;
    overflow-x: hidden;
    max-width: 100%;
}

/* ---------------- Top Bar ---------------- */
.top-bar {
    background: #092a49;
    padding: 14px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.top-bar img {
    height: 42px;
}

.logout-btn {
    background: #dc2626;
    border: none;
    color: #fff;
    padding: 8px 18px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s ease;
}

.logout-btn:hover {
    background: #b91c1c;
}

/* ---------------- Page Container ---------------- */
.page {
    max-width: 1100px;
    margin: 35px auto;
    padding: 0 18px;
}

.page h2 {
    margin-bottom: 24px;
    font-weight: 600;
}

/* ---------------- Application Card ---------------- */
.application-card {
    background: #ffffff;
    border-radius: 14px;
    padding: 22px;
    margin-bottom: 18px;
    box-shadow: 0 10px 28px rgba(0,0,0,0.06);
    display: flex;
    justify-content: space-between;
    gap: 20px;
    border-left: 5px solid #2563eb;
}

.app-left p {
    margin: 5px 0;
}

.app-right {
    text-align: right;
    min-width: 240px;
}
.app-right p{
    padding-top: 10px;
    padding-bottom: 5px;
}

/* ---------------- Status Badge ---------------- */
.status-badge {
    display: inline-block;
    padding: 6px 16px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 30px;
    text-transform: capitalize;
    transition: all 0.3s ease;
}

/* Status colors */
.status-screening {
    background-color: #e0f2fe;
    color: #0369a1;
}

.status-shortlisted {
    background-color: #dcfce7;
    color: #166534;
}

.status-assessment {
    background-color: #fff7ed;
    color: #c2410c;
}

.status-hr_interview {
    background-color: #ede9fe;
    color: #5b21b6;
}

.status-technical_interview {
    background-color: #fef3c7;
    color: #78350f;
}

.status-documentation {
    background-color: #f0f9ff;
    color: #0c4a6e;
}

.status-onboarding {
    background-color: #ecfdf5;
    color: #065f46;
}

.status-not_selected {
    background-color: #fee2e2;
    color: #b91c1c;
}

/* Hover effect */
.status-badge:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* ---------------- Action Buttons ---------------- */
.action-btn {
    display: inline-block;
    margin-top: 10px;
    padding: 9px 18px;
    border-radius: 6px;
    font-size: 14px;
    color: #ffffff;
    text-decoration: none;
    transition: all 0.3s ease;
}

.btn-test {
    background: linear-gradient(135deg, #0d3b6c, #095191);
}

.btn-test:hover {
    opacity: 0.95;
}

.btn-link {
    background: linear-gradient(135deg, #0d3b6c, #095191);
}

.btn-link:hover {
    opacity: 0.95;
}

/* ---------------- Note Message ---------------- */
.app-note {
    margin-top: 10px;
    padding: 12px 16px;
    background: #f0f4ff;
    border-left: 4px solid #2563eb;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.5;
}

/* ---------------- Empty State ---------------- */
.empty {
    background: #ffffff;
    padding: 40px;
    text-align: center;
    border-radius: 12px;
    color: #6b7280;
    font-size: 16px;
}

/* ---------------- Responsive ---------------- */
@media (max-width: 650px) {
    .application-card {
        flex-direction: column;
    }
    .app-right {
        text-align: left;
        margin-top: 15px;
        border-top: 1px solid #e5e7eb;
        padding-top: 12px;
    }
    .status-badge {
        font-size: 12px;
        padding: 5px 12px;
    }
}
</style>

<div class="top-bar">
<img alt="Logo" src="/images/logo.png"/>
<form action="" method="post">
<button class="logout-btn" type="submit">Logout</button>
</form>
</div>
<div class="page">
<h2>My Job Applications</h2>
<div class="application-card">
<div class="app-left">
<h4></h4>
<p><b>Department:</b> </p>
<p><b>Employment:</b> </p>
<p><b>Applied On:</b> </p>
</div>
<div class="app-right">
<span class="status-badge status-"></span>
<p>Your application is under review. Kindly check your email for HR updates.</p>
<p>Congratulations! You are shortlisted. HR will reach out via email shortly.</p>
<p>Online assessment details sent via email. Scheduled on .</p>
<a class="action-btn btn-test" href="" target="_blank">Start Assessment</a>
<p>HR interview instructions sent via email. Scheduled on .</p>
<a class="action-btn btn-link" href="" target="_blank">Join HR Interview</a>
<p>Technical interview info sent via email. Scheduled on .</p>
<a class="action-btn btn-link" href="" target="_blank">Join Technical Interview</a>
<p>Document verification instructions sent via email. Scheduled on .</p>
<p>Onboarding details sent via email. Joining on .</p>
<p>We regret to inform you that your application was not selected. You may reapply after 90 days.</p>
<p>Check your email for updates regarding this application.</p>
<div class="app-note">
<strong>Message:</strong>
</div>
</div>
</div>
<div class="empty">No job applications found.</div>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesUserJobDashboard;
