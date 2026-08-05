import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalTestimonialForm = () => {
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

EditAdd Testimonial
EditAdd Testimonial



<style>
.form-card {
    max-width: 600px;
    margin: 50px auto;
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 25px 45px rgba(0,0,0,0.08);
}

.form-card h4 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 26px;
    font-weight: 600;
    color: #092a49;
}

label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
    color: #444;
}

input[type="text"], textarea {
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    font-size: 14px;
    transition: all 0.3s ease;
}

textarea {
    resize: vertical;
}

input:focus, textarea:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37,99,235,0.15);
}

button.submit-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    border: none;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37,99,235,0.35);
}

.back-link {
    display: inline-block;
    margin-top: 20px;
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
}

.back-link:hover {
    color: #1d4ed8;
    text-decoration: underline;
}

.form-check {
    margin-top: 15px;
}

@media (max-width: 600px) {
    .form-card {
        margin: 30px 15px;
        padding: 25px;
        border-radius: 14px;
    }

    .form-card h4 {
        font-size: 22px;
        margin-bottom: 25px;
    }

    input[type="text"], textarea {
        font-size: 14px;
        padding: 11px 12px;
    }

    button.submit-btn {
        padding: 13px;
        font-size: 14px;
        border-radius: 10px;
    }
}
</style>
<div class="form-card">
<h4>EditAdd Testimonial</h4>
<form method="post">
<div class="form-group">
<label>Client Name</label>
<input name="client_name" type="text" value=""/>
</div>
<div class="form-group">
<label>Company Name</label>
<input name="company_name" type="text" value=""/>
</div>
<div class="form-group">
<label>Country</label>
<input name="country" type="text" value=""/>
</div>
<div class="form-group">
<label>Message</label>
<textarea name="message" rows="4"></textarea>
</div>
<div class="form-check">
<input checked="" id="is_active" name="is_active" type="checkbox"/>
<label for="is_active">Active</label>
</div>
<button class="submit-btn" type="submit">Save</button>
</form>
<a class="back-link" href="">⬅ Back</a>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalTestimonialForm;
