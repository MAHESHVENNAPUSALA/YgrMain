import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalTeamForm = () => {
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


    Add Last Month EventEditAdd Team Member



    Add Last Month EventEditAdd Team Member




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

input[type="text"], input[type="file"] {
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    font-size: 14px;
    transition: all 0.3s ease;
}

input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37,99,235,0.15);
}

.image-preview {
    margin-bottom: 10px;
}

.image-preview img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid #ccc;
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

    input[type="text"], input[type="file"] {
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
<h4>
        Add Last Month EventEditAdd Team Member
    </h4>
<form enctype="multipart/form-data" method="POST">
<div class="form-group">
<label>Name</label>
<input name="name" type="text" value=""/>
</div>
<div class="form-group">
<label>Role</label>
<input name="role" type="text" value=""/>
</div>
<div class="form-group">
<label>Image</label>
<div class="image-preview">
<img alt="" src=""/>
</div>
<input name="image" required="" type="file"/>
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

export default OriginalTeamForm;
