import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesUserProfile = () => {
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

User Profile
User Profile



<style>
.dashboard-container {
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 25px 45px rgba(0,0,0,0.08);
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
}

thead {
    background-color: #092a49;
    color: white;
}

th, td {
    text-align: center;
    padding: 12px 15px;
    border: 1px solid #ddd;
}

tbody tr:hover {
    background-color: #f5faff;
}

.view-btn {
    text-decoration: none;
    background: #2563eb;
    color: #fff;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
}

.view-btn:hover {
    background: #1d4ed8;
}

.btn-add {
    padding: 8px 16px;
    background: #2563eb;
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    display: inline-block;
    margin-top: 20px;
}
</style>
<div class="dashboard-container">
<h3>User Profile</h3>
<table>
<thead>
<tr>
<th>User ID</th>
<th>Name</th>
<th>Phone</th>
<th>Email</th>
<th>WhatsApp</th>
<th>College Name</th>
<th>College Address</th>
<th>Branch</th>
<th>Roll No</th>
<th>Photo</th>
<th>Resume</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>
<a class="view-btn" href="" target="_blank">View</a>
                    
                        N/A
                    
                </td>
<td>
<a class="view-btn" href="" target="_blank">View</a>
                    
                        N/A
                    
                </td>
</tr>
</tbody>
</table>
<a class="btn-add" href="">⬅ Back</a>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesUserProfile;
