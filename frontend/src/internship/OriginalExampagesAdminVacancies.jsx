import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesAdminVacancies = () => {
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

Vacancies Dashboard
Vacancies Dashboard



<style>
/* ===== DASHBOARD CONTAINER ===== */
.dashboard-container {
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 25px 45px rgba(0,0,0,0.08);
}

/* Header */
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    flex-wrap: wrap;
}

.dashboard-header h4 {
    font-size: 24px;
    font-weight: 600;
    color: #092a49;
    margin: 0;
}

/* Add button */
.add-btn {
    background: #007bff;
    color: #fff;
    padding: 10px 18px;
    border-radius: 10px;
    font-weight: 600;
    text-decoration: none;
    transition: 0.2s ease;
}

.add-btn:hover {
    background-color: #0056b3;
}

/* Table */
.table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
}

.table th, .table td {
    padding: 14px 16px;
    font-size: 14px;
    vertical-align: middle;
}

.table th {
    background: #092a49;
    color: #fff;
    font-weight: 600;
}

tbody tr:hover {
    background-color: #f5faff;
}

/* Actions */
.actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.action-btn {
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 8px;
    text-decoration: none;
    cursor: pointer;
}

/* Edit */
.edit-btn {
    background-color: #007bff;
    color: #fff;
}

.edit-btn:hover {
    background-color: #0056b3;
}

/* Delete */
.delete-btn {
    background: #dc3545;
    color: #fff;
    border: none;
}

.delete-btn:hover {
    background-color: #a71d2a;
}

/* Empty */
.table tbody tr td[colspan] {
    text-align: center;
    color: #777;
    padding: 20px 0;
}

/* Mobile */
@media (max-width: 768px) {
    .dashboard-container {
        padding: 20px;
    }

    .dashboard-header h4 {
        font-size: 20px;
    }

    .add-btn {
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }
}
</style>
<div class="dashboard-container">
<div class="dashboard-header">
<h4>Vacancies Dashboard</h4>
<a class="add-btn" href="">+ Add Vacancy</a>
</div>
<div class="table-responsive">
<table class="table">
<thead>
<tr>
<th>Title</th>
<th>Location</th>
<th>Role</th>
<th>Package</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td>
<div class="actions">
<a class="action-btn edit-btn" href="">Edit</a>
<form action="" method="post" onsubmit="return confirm('Delete this vacancy?');" style="display:inline;">
<button class="action-btn delete-btn" type="submit">Delete</button>
</form>
</div>
</td>
</tr>
<tr>
<td colspan="5">No vacancies available.</td>
</tr>
</tbody>
</table>
</div>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesAdminVacancies;
