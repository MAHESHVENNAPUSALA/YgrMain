import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesApplicationSuccess = () => {
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
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f8fafc;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 40px 20px;
            color: #333;
            max-width: 100%;
            overflow-x: hidden;
        }

        .success-section {
            max-width: 700px;
            text-align: center;
        }

        .success-icon {
            font-size: 60px;
            color: #0D3B6C;
            margin-bottom: 25px;
        }

        h1 {
            font-size: 32px;
            font-weight: 600;
            color: #0D3B6C;
            margin-bottom: 15px;
        }

        p {
            font-size: 18px;
            line-height: 1.7;
            color: #555;
            margin-bottom: 30px;
        }

        .button-group {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
        }

        .button-group a {
            text-decoration: none;
            padding: 12px 28px;
            font-size: 16px;
            font-weight: 500;
            border-radius: 6px;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .btn-home {
            background-color: #e5e7eb;
            color: #111;
        }

        .btn-login {
            background-color: #0D3B6C;
            color: #fff;
        }

        .btn-home:hover {
            background-color: #d1d5db;
        }

        .btn-login:hover {
            background-color: #0a2a57;
        }

        /* Optional: subtle underline decoration */
        .success-section::before {
            content: '';
            display: block;
            width: 80px;
            height: 3px;
            background-color: #0D3B6C;
            margin: 0 auto 30px;
            border-radius: 2px;
        }
        /* ===== Mobile Adjustments ===== */
@media (max-width: 480px) {
    body {
        padding: 20px 15px;
    }

    .success-section {
        max-width: 100%;
        padding: 20px 10px;
    }

    .success-icon {
        font-size: 50px;
        margin-bottom: 20px;
    }

    h1 {
        font-size: 24px;
        margin-bottom: 12px;
    }

    p {
        font-size: 15px;
        line-height: 1.5;
        margin-bottom: 25px;
    }

    .button-group {
        flex-direction: column;
        gap: 12px;
    }

    .button-group a {
        width: 100%;
        text-align: center;
        padding: 12px 0;
        font-size: 16px;
    }

    .success-section::before {
        width: 60px;
        margin-bottom: 20px;
    }
}

    </style>

<section class="success-section">
<div class="success-icon">✔</div>
<h1>Application Submitted</h1>
<p>Thank you for applying. Your job application has been successfully submitted. <br/>  
        Our HR team will review your profile and get back to you if shortlisted.</p>
<div class="button-group">
<a class="btn-home" href="/">Back to Home</a>
<a class="btn-login" href="">Login</a>
</div>
</section>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesApplicationSuccess;
