import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesServicesstudent = () => {
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
body { font-family: Arial; background:#f5f7fa; }
.box {
    max-width:400px;
    margin:100px auto;
    background:#fff;
    padding:25px;
    border-radius:10px;
}
input,button {
    width:100%;
    padding:10px;
    margin-top:10px;
}
button { background:#0d6efd; color:white; border:none; }
</style>

<div class="box">
<h2>Student Login</h2>
<form method="POST">
<input name="email" placeholder="Email" required="" type="email"/>
<input name="phone" placeholder="Phone" required="" type="text"/>
<button type="submit">Login</button>
<p style="color:red;"></p>
</form>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesServicesstudent;
