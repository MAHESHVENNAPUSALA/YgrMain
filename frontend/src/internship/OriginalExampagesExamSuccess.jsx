import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesExamSuccess = () => {
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
    body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        background: white;
        padding: 50px 80px;
        border-radius: 15px;
        box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        text-align: center;
        max-width: 500px;
        width: 90%;
        animation: fadeIn 1s ease-in-out;
    }

    h1 {
        color: #28a745;
        font-size: 36px;
        margin-bottom: 20px;
    }

    p {
        font-size: 22px;
        margin-bottom: 40px;
        color: #333;
    }

    a {
        display: inline-block;
        text-decoration: none;
        background: #007bff;
        color: white;
        padding: 12px 30px;
        font-size: 18px;
        border-radius: 8px;
        transition: background 0.3s, transform 0.3s;
    }

    a:hover {
        background: #0056b3;
        transform: scale(1.05);
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>

<div class="container">
<h1>Exam Submitted Successfully!</h1>
<p>Your Score: <strong>/60</strong></p>
<a href="/">Go to Home</a>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesExamSuccess;
