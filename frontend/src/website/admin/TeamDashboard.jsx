import React from 'react';
import { Link } from 'react-router-dom';

const TeamDashboard = () => {
    return (
        <>
            {/* Converted from Django Template */}
            


Team Dashboard
Team Dashboard



<style dangerouslySetInnerHTML={{ __html: `
/* ===== WRAPPER ===== */
.dashboard-wrapper {
    padding: 30px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.08);
    margin-bottom: 30px;
}

/* ===== HEADER ===== */
.dashboard-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    gap: 15px;
}

.dashboard-header h1 {
    font-size: 28px;
    color: #092a49;
}

/* ADD BUTTONS */
.dashboard-header a {
    background: #007bff;
    color: #fff;
    padding: 10px 18px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-header a:hover {
   background-color: #065086;
}

/* ===== TABLE STYLES ===== */
table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
    margin-bottom: 40px;
}

th, td {
    padding: 12px 15px;
    text-align: left;
    font-size: 14px;
}

th {
    background: #092a49;
    color: #ffffff;
    font-weight: 600;
}

tr:nth-child(even) {
    background: #f6f9f9;
}

  tbody tr:hover {
    background-color: #f5faff;
  }
/* TABLE IMAGES */
table img {
    width: 50px;
    height: 50px;
    border-radius: 6px;
    object-fit: cover;
}

/* ACTION BUTTONS */
.action-btn {
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 6px;
    text-decoration: none;
    color: #fff;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

/* Edit Button */
.edit-btn {
    background-color: #007bff;
}

.edit-btn:hover {
 background-color: #0056b3;
   
}

/* Delete Button */
.delete-btn {
    background-color: #dc3545;
}

.delete-btn:hover {
   background-color: #a71d2a;
}

/* EMPTY STATE */
.no-data {
    text-align: center;
    color: #666;
    padding: 20px 0;
    width: 100%;
}

/* MOBILE RESPONSIVE */
@media (max-width: 768px) {
    .dashboard-wrapper {
        padding: 20px;
    }

    .dashboard-header h1 {
        font-size: 24px;
    }

    th, td {
        font-size: 13px;
        padding: 10px 12px;
    }

    table img {
        width: 40px;
        height: 40px;
    }

    .dashboard-header a {
        padding: 8px 12px;
        font-size: 13px;
    }
}
` }} />

<div className="dashboard-wrapper">

    <div className="dashboard-header">
        <h1>Team Dashboard</h1>
        <div>
            <a href="">➕ Add Event</a>
            <a href="">➕ Add Team</a>
            
        </div>
    </div>


    <h2 className="section-title">Last Month Events</h2>
    <table>
        <thead>
            <tr>
                <th>Image</th>
            
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            
            <tr>
                <td>
                    
                    <img src="" alt="" />
                    
                </td>
      
                <td>
                    <a href="" className="action-btn delete-btn" onclick="return confirm('Delete this event?')">Delete</a>
                </td>
            </tr>
            
            <tr>
                <td colspan="3" className="no-data">No events uploaded.</td>
            </tr>
            
        </tbody>
    </table>


    
    <h2 className="section-title">Team Members</h2>
    <table>
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            
            <tr>
                <td>
                    
                    <img src="" alt="" />
                    
                </td>
                <td></td>
                <td></td>
                <td>
                    <a href="" className="action-btn edit-btn">Edit</a>
                    <a href="" className="action-btn delete-btn" onclick="return confirm('Delete this member?')">Delete</a>
                </td>
            </tr>
            
            <tr>
                <td colspan="4" className="no-data">No team members yet.</td>
            </tr>
            
        </tbody>
    </table>

    
</div>



        </>
    );
};

export default TeamDashboard;
