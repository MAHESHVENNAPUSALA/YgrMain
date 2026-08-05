import React from 'react';
import { Link } from 'react-router-dom';

const CarouselDashboard = () => {
    return (
        <>
            {/* Converted from Django Template */}
            


Carousel Dashboard
Carousel Dashboard



<style dangerouslySetInnerHTML={{ __html: `
  /* Container styling */
  .dashboard-container {
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.08);
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

  /* Add button */
  .btn-add {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease;
    font-size: 0.9rem;
  }

  .btn-add:hover {
    background-color: #065086;
  }

  /* Table styles */
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    font-size: 0.95rem;
  }

  thead {
    background-color: #092a49;
    color: white;
  }

  th,
  td {
    text-align: left;
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    vertical-align: middle;
  }

  th {
    font-weight: 600;
    font-size: 1rem;
  }

  tbody tr:hover {
    background-color: #f5faff;
  }

  /* Carousel image */
  .carousel-img {
    width: 100px;
    height: auto;
    border-radius: 6px;
    object-fit: cover;
  }

  /* Action buttons */
  .actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-edit,
  .btn-delete {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  .btn-edit {
    background-color: #007bff;
    color: white;
  }

  .btn-edit:hover {
    background-color: #0056b3;
  }

  .btn-delete {
    background-color: #dc3545;
    color: white;
  }

  .btn-delete:hover {
    background-color: #a71d2a;
  }

  /* Responsive: stack table rows vertically on narrow screens */
  @media (max-width: 720px) {

    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      display: none;
    }

    tbody tr {
      margin-bottom: 1.25rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
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
      border-bottom: none;
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

    .carousel-img {
      width: 80px;
      height: auto;
    }

    .actions {
      justify-content: center;
    }
  }
` }} />

<div className="dashboard-container">
  <div className="dashboard-header">
    <h3>Carousel Images</h3>
    <a href="" className="btn-add">+ Add Carousel</a>
  </div>

  <table>
    <thead>
      <tr>
        <th>Image</th>
        <th>Title</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      
      <tr>
        <td data-label="Image">
          <img src="" alt="Carousel Image" className="carousel-img" />
        </td>
        <td data-label="Title"></td>
        <td data-label="Description"></td>
        <td data-label="Actions">
          <div className="actions">
            <a href="" className="btn-edit">Edit</a>
            <form method="post" action=""
              onsubmit="return confirm('Are you sure you want to delete this carousel image?');"
              
              <button type="submit" className="btn-delete">Delete</button>
            </form>
          </div>
        </td>
      </tr>
      
      <tr>
        <td colspan="4"
          No carousel images found.
        </td>
      </tr>
      
    </tbody>
  </table>
</div>


        </>
    );
};

export default CarouselDashboard;
