import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalAdminLogin = () => {
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

    const rawHTML = `<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f6f8;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    margin: 0;
  }

  .lf-container {
    background-color: #fff;
    padding: 40px 30px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 400px;
  }

  .lf-title {
    text-align: center;
    margin-bottom: 25px;
    color: #333;
  }

  .lf-input {
    width: 100%;
    padding: 12px 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
    transition: border-color 0.3s;
  }

  .lf-input:focus {
    outline: none;
    border-color: #007bff;
  }

  .lf-button {
    width: 100%;
    padding: 12px;
     background: linear-gradient(135deg, #0D3B6C, #095191);
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .lf-button:hover {
    opacity: 0.95;
  }

  .lf-error {
    color: red;
    text-align: center;
    margin-bottom: 15px;
  }
</style>
<div class="lf-container">
<h2 class="lf-title">Login</h2>
<div class="lf-error"></div>
<form method="post">
<input class="lf-input" name="email" placeholder="Email" required="" type="email"/>
<input class="lf-input" name="password" placeholder="Password" required="" type="password"/>
<button class="lf-button" type="submit">Login</button>
</form>
</div>`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalAdminLogin;
