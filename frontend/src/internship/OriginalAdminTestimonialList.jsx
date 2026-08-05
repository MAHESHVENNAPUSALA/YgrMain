import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalAdminTestimonialList = () => {
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

Testimonials
Testimonials



<style>
/* ===== Testimonials Admin Page ===== */
.testimonial-container {
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 25px 45px rgba(0,0,0,0.08);
}

/* Header */
.testimonial-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    flex-wrap: wrap;
}

.testimonial-header h4 {
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
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.add-btn:hover {
   background-color: #0056b3;
}
 tbody tr:hover {
    background-color: #f5faff;
  }
/* Table */
.testimonial-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
}

.testimonial-table th,
.testimonial-table td {
    padding: 14px 16px;
    font-size: 14px;
    vertical-align: middle;
}

.testimonial-table th {
    background: #092a49;
    color: #fff;
    font-weight: 600;
}

.testimonial-table tbody tr {
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

 

/* Status badge */
.status-badge {
    padding: 4px 12px;
    font-size: 12px;
    border-radius: 20px;
    font-weight: 600;
}

.status-active {
    background: rgba(40,167,69,0.15);
    color: #28a745;
}

.status-inactive {
    background: rgba(108,117,125,0.15);
    color: #6c757d;
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
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
}

/* Edit */
.edit-btn {
    background: #007bff;
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

/* Empty state */
.testimonial-table tbody tr td[colspan] {
    text-align: center;
    color: #777;
    padding: 20px 0;
}

/* Mobile */
@media (max-width: 768px) {
    .testimonial-container {
        padding: 20px;
    }

    .testimonial-header h4 {
        font-size: 20px;
    }

    .testimonial-table th, .testimonial-table td {
        font-size: 13px;
        padding: 10px 12px;
    }

    .add-btn {
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }
}
</style>
<div class="testimonial-container">
<div class="testimonial-header">
<h4>Testimonials</h4>
<a class="add-btn" href="">
            + Add Testimonial
        </a>
</div>
<div class="table-responsive">
<table class="testimonial-table">
<thead>
<tr>
<th>Client</th>
<th>Company</th>
<th>Country</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
<td></td>
<td>
<span class="status-badge status-active">Active</span>
<span class="status-badge status-inactive">Inactive</span>
</td>
<td>
<div class="actions">
<a class="action-btn edit-btn" href="">
                                Edit
                            </a>
<form action="" method="post" onsubmit="return confirm('Are you sure you want to delete this testimonial?');">
<button class="action-btn delete-btn" type="submit">
                                    Delete
                                </button>
</form>
</div>
</td>
</tr>
<tr>
<td colspan="5">No testimonials found</td>
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

export default OriginalAdminTestimonialList;
