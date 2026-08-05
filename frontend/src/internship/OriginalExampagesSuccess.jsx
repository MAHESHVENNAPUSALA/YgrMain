import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesSuccess = () => {
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
    }

    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card {
        background: #fff;
        width: 400px;
        padding: 40px 30px;
        border-radius: 20px;
        box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        text-align: center;
        animation: fadeIn 1s ease-in-out;
        position: relative;
    }

    .profile-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #28a745;
        margin-bottom: 20px;
    }

    .card h1 {
        color: #333;
        font-size: 28px;
        margin-bottom: 10px;
    }

    .card p {
        font-size: 18px;
        color: #555;
        margin-bottom: 10px;
    }

    .score {
        font-size: 36px;
        font-weight: bold;
        color: #28a745;
        margin: 20px 0;
    }

    .btn-home {
        display: inline-block;
        text-decoration: none;
        background: #007bff;
        color: white;
        padding: 12px 25px;
        font-size: 16px;
        border-radius: 8px;
        transition: background 0.3s, transform 0.3s;
        margin-top: 15px;
    }

    .btn-home:hover {
        background: #0056b3;
        transform: scale(1.05);
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }

</style>

<div class="card">
<img alt="Profile Photo" class="profile-img" src=""/>
<!-- <h1>Congratulations</h1> -->
<p>NAME: <strong></strong></p>
<p>Roll Number: <strong></strong></p>
<h1>Your score</h1>
<div class="score">/60</div>
<a class="btn-home" href="/">Go to Home</a>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesSuccess;
