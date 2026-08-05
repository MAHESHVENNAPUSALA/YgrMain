import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesInternshipUsersDashboard = () => {
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

Admin Users
Admin Users



<style>
/* ===== Dashboard Container ===== */
.dashboard-container {
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 25px 45px rgba(0,0,0,0.08);
}

/* Header section */
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.dashboard-header h3 {
    font-weight: 600;
    font-size: 1.5rem;
    color: #092a49;
}

/* Add button (optional) */
.btn-add {
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.btn-add:hover {
    background: linear-gradient(135deg, #1d4ed8, #1e40af);
}

/* Table styles */
table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    font-size: 0.95rem;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

thead {
    background-color: #092a49;
    color: white;
}

th, td {
    text-align: left;
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    vertical-align: middle;
}

th {
    font-weight: 600;
}

tbody tr:hover {
    background-color: #f5faff;
}

/* Action buttons */
.actions {
    display: flex;
    gap: 0.5rem;
}

/* View button */
.actions .view {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff;
    padding: 6px 12px;
    border-radius: 6px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
}

.actions .view:hover {
    background: linear-gradient(135deg, #1d4ed8, #1e40af);
}

/* Delete button */
.actions .delete {
    background: linear-gradient(135deg, #dc2626, #a71d2a);
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.actions .delete:hover {
    background: linear-gradient(135deg, #a71d2a, #7a141f);
}

/* Empty state */
tbody tr td[colspan] {
    text-align: center;
    color: #666;
    padding: 1rem;
}

/* ===== Responsive ===== */
@media (max-width: 720px) {
    table, thead, tbody, th, td, tr {
        display: block;
    }

    thead tr {
        display: none;
    }

    tbody tr {
        margin-bottom: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 0.5rem;
    }

    tbody td {
        padding-left: 50%;
        position: relative;
        border: none;
        border-bottom: 1px solid #eee;
        text-align: right;
        font-size: 0.9rem;
    }

    tbody td:last-child {
        text-align: center;
        padding-left: 0;
        margin-top: 10px;
    }

    tbody td::before {
        position: absolute;
        top: 12px;
        left: 15px;
        width: 45%;
        white-space: nowrap;
        font-weight: 600;
        text-align: left;
        font-size: 0.9rem;
        color: #092a49;
        content: attr(data-label);
    }

    .actions {
        justify-content: center;
    }
}
</style>
<div class="dashboard-container">
<div class="dashboard-header">
<h3>Internship Registrations</h3>
</div>
<table>
<thead>
<tr>
<th>User ID</th>
<th>Username</th>
<th>Phone</th>
<th>College Name</th>
<th>Internship</th>
<th>Exam Attempt</th>
<th>Score</th>
<th>Payment</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
<tr>
<td data-label="User ID"></td>
<td data-label="Username"></td>
<td data-label="Phone"></td>
<td data-label="College Name"></td>
<td data-label="Internship"></td>
<td data-label="Exam"></td>
<td data-label="Score">
                    
                        
                            
                        
                    
                        0
                    
                </td>
<td data-label="Payment"></td>
<td class="actions" data-label="Actions">
<a class="view" href="">View</a>
<form action="" method="post" style="display:inline;">
<button class="delete" onclick="return confirm('Are you sure you want to delete this user?');" type="submit">Delete</button>
</form>
</td>
</tr>
<tr>
<td colspan="9">No internship registrations found.</td>
</tr>
</tbody>
</table>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesInternshipUsersDashboard;
