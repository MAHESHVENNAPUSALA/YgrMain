import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesAdminAddVacancy = () => {
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

    const rawHTML = `

EditAdd Job Vacancy
EditAdd Job Vacancy



<style>
/* ===== FORM CONTAINER ===== */
.form-container {
    max-width: 600px;
    margin: 50px auto;
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 25px 45px rgba(0,0,0,0.08);
}

/* Heading */
.form-container h2 {
    text-align: center;
    color: #2563eb;
    margin-bottom: 25px;
}

/* Inputs */
.form-container input,
.form-container textarea {
    width: 100%;
    padding: 12px 14px;
    margin: 10px 0;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    font-size: 14px;
    transition: 0.2s ease;
}

.form-container input:focus,
.form-container textarea:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37,99,235,0.2);
}

/* Textarea */
.form-container textarea {
    resize: vertical;
    min-height: 100px;
}

/* Button */
.form-container button {
    width: 100%;
    background: #2563eb;
    color: #fff;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
    transition: 0.2s ease;
}

.form-container button:hover {
    background: #1d4ed8;
}

/* Mobile */
@media (max-width: 768px) {
    .form-container {
        margin: 30px 15px;
        padding: 20px;
    }
}
</style>
<div class="form-container">
<form method="POST">
<h2>EditAdd Job</h2>
<input name="title" placeholder="Job Title" required="" value=""/>
<input name="location" placeholder="Location" required="" value=""/>
<input name="role" placeholder="Role (Full Time / Internship)" required="" value=""/>
<input name="package" placeholder="Package (₹3-6 LPA)" required="" value=""/>
<input name="vacancies" placeholder="vacancies 0 - 10" required="" value=""/>
<textarea name="description" placeholder="Job Description"></textarea>
<textarea name="requirements" placeholder="Requirements"></textarea>
<button type="submit">Update JobPost Job</button>
</form>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesAdminAddVacancy;
