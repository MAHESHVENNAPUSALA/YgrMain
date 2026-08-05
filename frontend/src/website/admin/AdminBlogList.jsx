import React from 'react';
import { Link } from 'react-router-dom';

const AdminBlogList = () => {
    return (
        <>
            {/* Converted from Django Template */}
            

Manage Blogs
Manage Blogs



<style dangerouslySetInnerHTML={{ __html: `
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
    flex-wrap: wrap;
    gap: 10px;
}

.dashboard-header h3 {
    font-weight: 600;
    font-size: 1.5rem;
    color: #092a49;
}

/* Add button */
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
.table-wrapper {
    overflow-x: auto;
}

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

/* Edit button */
.actions .edit-btn {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
}

.actions .edit-btn:hover {
    background: linear-gradient(135deg, #1d4ed8, #1e40af);
}

/* Delete button */
.actions .delete-btn {
    background: linear-gradient(135deg, #dc2626, #a71d2a);
    color: #fff;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
}

.actions .delete-btn:hover {
    background: linear-gradient(135deg, #a71d2a, #7a141f);
}

/* Empty state */
.no-data {
    text-align: center;
    padding: 1rem;
    color: #666;
}

/* Responsive */
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

    .btn-add {
        width: 100%;
        text-align: center;
    }
}
` }} />

<div className="dashboard-container">
    <div className="dashboard-header">
        <h3>Manage Blogs</h3>
        <a href="" className="btn-add">+ Add Blog</a>
    </div>

    <div className="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                
                <tr>
                    <td data-label="Title"></td>
                    <td data-label="Created Date"></td>
                    <td data-label="Actions" className="actions">
                        <a href="" className="edit-btn">Edit</a>
                        <a href="" className="delete-btn" onclick="return confirm('Are you sure?');">Delete</a>
                    </td>
                </tr>
                
                <tr>
                    <td colspan="3" className="no-data">No blogs found.</td>
                </tr>
                
            </tbody>
        </table>
    </div>
</div>



        </>
    );
};

export default AdminBlogList;
