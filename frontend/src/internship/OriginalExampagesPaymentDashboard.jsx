import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesPaymentDashboard = () => {
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

    const rawHTML = `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>
<style>
body {
    font-family: 'Poppins', sans-serif;
    background: #f1f5f9;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: auto;
}

/* HEADER */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header h1 {
    margin: 0;
}

/* STATS */
.stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-bottom: 20px;
}

.stat-card {
    background: white;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    text-align: center;
}

.stat-card h3 {
    margin: 5px 0;
}

.stat-paid { color: green; }
.stat-pending { color: orange; }
.stat-failed { color: red; }

/* FILTER BAR */
.top-bar {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

input, select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
}

button {
    padding: 10px 15px;
    border: none;
    background: linear-gradient(135deg, #0d6efd, #0056d2);
    color: white;
    border-radius: 8px;
    cursor: pointer;
}

button:hover {
    opacity: 0.9;
}

/* CARD */
.card {
    background: white;
    padding: 15px;
    border-radius: 12px;
    margin-top: 20px;
    box-shadow: 0 5px 25px rgba(0,0,0,0.05);
}

/* TABLE */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

th, td {
    padding: 12px;
    text-align: center;
}

th {
    background: #0d6efd;
    color: white;
}

tr:nth-child(even) {
    background: #f8fafc;
}

/* STATUS */
.paid { color: green; font-weight: 600; }
.pending { color: orange; font-weight: 600; }
.failed { color: red; font-weight: 600; }

/* ALERT */
.alert {
    background: #fff3cd;
    border-left: 5px solid #ffc107;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 10px;
}

/* MOBILE */
@media(max-width: 768px) {
    .stats {
        grid-template-columns: 1fr 1fr;
    }
}
</style>

<div class="container">
<!-- HEADER -->
<div class="header">
<h1>💰 Payment Dashboard</h1>
</div>
<!-- STATS -->
<div class="stats">
<div class="stat-card">
<span>Total Students</span>
<h3></h3>
</div>
<div class="stat-card">
<span>Paid</span>
<h3 class="stat-paid"></h3>
</div>
<div class="stat-card">
<span>Pending</span>
<h3 class="stat-pending"></h3>
</div>
<div class="stat-card">
<span>Failed</span>
<h3 class="stat-failed"></h3>
</div>
</div>
<!-- FILTER -->
<form class="top-bar" method="GET">
<input name="search" placeholder="Search student..." type="text" value=""/>
<select name="course">
<option value="">All Courses</option>
<option>Python</option>
<option>Java</option>
<option>AWS</option>
</select>
<button type="submit">Filter</button>
<a href="">
<button type="button">⬇ Export</button>
</a>
</form>
<!-- EMI ALERT -->
<div class="alert">
    ⚠  EMI due soon
</div>
<!-- PAID -->
<div class="card">
<h2>✅ Fully Paid</h2>
<table>
<tr>
<th>Name</th>
<th>Email</th>
<th>Course</th>
<th>Paid</th>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td class="paid">₹</td>
</tr>
<tr><td colspan="4">No Data</td></tr>
</table>
</div>
<!-- PENDING -->
<div class="card">
<h2>⏳ EMI Pending</h2>
<table>
<tr>
<th>Name</th>
<th>Total</th>
<th>Paid</th>
<th>Remaining</th>
</tr>
<tr>
<td></td>
<td>₹</td>
<td>₹</td>
<td class="pending">₹</td>
</tr>
<tr><td colspan="4">No Data</td></tr>
</table>
</div>
<!-- FAILED -->
<div class="card">
<h2>❌ Failed Payments</h2>
<table>
<tr>
<th>Name</th>
<th>Amount</th>
<th>EMI</th>
</tr>
<tr>
<td></td>
<td>₹</td>
<td></td>
</tr>
<tr><td colspan="3">No Failed Payments</td></tr>
</table>
</div>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesPaymentDashboard;
