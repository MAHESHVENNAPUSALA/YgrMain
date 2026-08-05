import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesInternships = () => {
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

Edit InternshipAdd Internship
Edit InternshipAdd Internship


<style>
/* ===== CONTAINER ===== */
.form-wrapper {
    max-width: 500px;
    margin: 40px auto;
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 25px 50px rgba(0,0,0,0.08);
}

/* Heading */
.form-wrapper h2 {
    text-align: center;
    margin-bottom: 25px;
    color: #092a49;
}

/* Labels & Inputs */
label {
    font-weight: 600;
    margin-top: 12px;
    display: block;
    color: #444;
}

input, textarea {
    width: 100%;
    padding: 12px 14px;
    margin-top: 6px;
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    font-size: 14px;
    transition: all 0.3s ease;
}

textarea {
    resize: vertical;
    min-height: 100px;
}

input:focus, textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 4px rgba(0,123,255,0.15);
}

/* Image preview */
.preview {
    margin-top: 12px;
    text-align: center;
}

.preview img {
    width: 140px;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: 0 6px 15px rgba(0,0,0,0.1);
}

/* Buttons */
button {
    width: 100%;
    margin-top: 20px;
    padding: 14px;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(135deg, #007bff, #0056b3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0,123,255,0.35);
}

/* Back link */
.back-link {
    display: block;
    margin-top: 20px;
    text-align: center;
    color: #007bff;
    font-weight: 500;
    text-decoration: none;
}

.back-link:hover {
    color: #0056b3;
}

/* Mobile */
@media (max-width: 500px) {
    .form-wrapper {
        margin: 20px 15px;
        padding: 25px;
    }
}
</style>
<div class="form-wrapper">
<h2>
        ✏️ Edit Internship➕ Add Internship
    </h2>
<form enctype="multipart/form-data" method="POST">
<label>Title</label>
<input name="title" required="" type="text" value=""/>
<label>Description</label>
<textarea name="description" required=""></textarea>
<label>Duration</label>
<input name="duration" required="" type="text" value=""/>
<label>Syllabus</label>
<input name="syllabus" required="" type="text" value=""/>
<label>Upload Image</label>
<input name="image" type="file"/>
<div class="preview">
<img src=""/>
</div>
<button type="submit">
            Update InternshipSubmit Internship
        </button>
</form>
<a class="back-link" href="">⬅ Back  </a>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesInternships;
