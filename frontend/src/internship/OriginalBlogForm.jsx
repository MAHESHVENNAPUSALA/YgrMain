import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalBlogForm = () => {
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
<style>
/* ===== FORM CONTAINER ===== */
.form-container {
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 25px 45px rgba(0,0,0,0.08);
    max-width: 700px;
    margin: auto;
}

/* ===== FORM TITLE ===== */
.form-container h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 26px;
    color: #092a49;
}

/* ===== FORM GROUP ===== */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #444;
}

/* ===== INPUTS ===== */
.form-group input[type="text"],
.form-group input[type="file"],
.form-group textarea {
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    font-size: 14px;
    transition: all 0.3s ease;
}

.form-group textarea {
    min-height: 150px;
    resize: vertical;
}

/* ===== FOCUS ===== */
.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.15);
}

/* ===== SUBMIT BUTTON ===== */
.submit-btn {
    width: 100%;
    padding: 12px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.submit-btn:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0,123,255,0.35);
}

/* ===== BACK LINK ===== */
.back-link {
    display: inline-block;
    margin-top: 12px;
    color: #007bff;
    font-weight: 600;
    text-decoration: none;
}

.back-link:hover {
    color: #0056b3;
}

/* ===== MOBILE ===== */
@media (max-width: 600px) {
    .form-container {
        padding: 20px;
    }

    .form-container h2 {
        font-size: 22px;
    }

    .form-group input[type="text"],
    .form-group input[type="file"],
    .form-group textarea {
        font-size: 14px;
        padding: 10px;
    }

    .submit-btn {
        padding: 11px;
        font-size: 14px;
    }
}
</style>
<div class="form-container">
<h2></h2>
<form enctype="multipart/form-data" method="POST">
<div class="form-group">
<label>Blog Title</label>
</div>
<div class="form-group">
<label>Featured Image</label>
</div>
<div class="form-group">
<label>Blog Description</label>
</div>
<button class="submit-btn" type="submit">
            Save Blog
        </button>
<a class="back-link" href="">
            ⬅ Back
        </a>
</form>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalBlogForm;
