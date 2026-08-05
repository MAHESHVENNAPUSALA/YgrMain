import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalProjectForm = () => {
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

EditAdd Project
EditAdd Project



<style>
/* ===== FORM CONTAINER ===== */
.form-container {
    max-width: 700px;
    margin: 50px auto;
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 25px 45px rgba(0,0,0,0.08);
}

/* ===== FORM TITLE ===== */
.form-container h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 26px;
    color: #092a49;
}

/* ===== FORM GROUP ===== */
.form-container form p {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    color: #444;
}

/* ===== INPUTS ===== */
input[type="text"],
input[type="url"],
input[type="number"],
input[type="file"],
textarea {
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    font-size: 14px;
    transition: all 0.3s ease;
}

textarea {
    min-height: 150px;
    resize: vertical;
}

input:focus,
textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.15);
}

/* ===== SUBMIT BUTTON ===== */
button {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
}

button:hover {
    background: linear-gradient(135deg, #1d4ed8, #1e40af);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37,99,235,0.35);
}

/* ===== BACK LINK ===== */
.back-link {
    display: block;
    text-align: center;
    margin-top: 15px;
    text-decoration: none;
    color: #2563eb;
    font-weight: 600;
}

.back-link:hover {
    color: #1d4ed8;
    text-decoration: underline;
}

/* ===== ERROR MESSAGES ===== */
.errorlist {
    color: #dc2626;
    font-size: 13px;
    margin-top: 5px;
    padding-left: 0;
    list-style: none;
}

/* ===== MOBILE ===== */
@media (max-width: 600px) {
    .form-container {
        margin: 30px 15px;
        padding: 25px;
        border-radius: 14px;
    }

    .form-container h1 {
        font-size: 22px;
        margin-bottom: 25px;
    }

    input[type="text"],
    input[type="url"],
    input[type="number"],
    input[type="file"],
    textarea {
        padding: 11px 12px;
        font-size: 14px;
    }

    button {
        padding: 11px;
        font-size: 14px;
    }
}
</style>
<div class="form-container">
<h1>EditAdd Project</h1>
<form enctype="multipart/form-data" method="post">
<button type="submit">Save</button>
</form>
<a class="back-link" href="">
        ⬅ Back
    </a>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalProjectForm;
