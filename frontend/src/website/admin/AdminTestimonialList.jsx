import React from 'react';
import { Link } from 'react-router-dom';

const AdminTestimonialList = () => {
    return (
        <>
            {/* Converted from Django Template */}
            

Testimonials
Testimonials



<style dangerouslySetInnerHTML={{ __html: `
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
` }} />

<div className="testimonial-container">

    <div className="testimonial-header">
        <h4>Testimonials</h4>
        <a href="" className="add-btn">
            + Add Testimonial
        </a>
    </div>

    <div className="table-responsive">
        <table className="testimonial-table">
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
                        
                            <span className="status-badge status-active">Active</span>
                        
                            <span className="status-badge status-inactive">Inactive</span>
                        
                    </td>
                    <td>
                        <div className="actions">
                            <a href="" className="action-btn edit-btn">
                                Edit
                            </a>

                            <form method="post"
                                  action=""
                                  onsubmit="return confirm('Are you sure you want to delete this testimonial?');">
                                
                                <button type="submit" className="action-btn delete-btn">
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



        </>
    );
};

export default AdminTestimonialList;
