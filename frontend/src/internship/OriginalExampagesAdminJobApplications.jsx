import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesAdminJobApplications = () => {
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

Job Applications
Job Applications



<style>
* {
    box-sizing: border-box;
}

body {
    font-family: "Segoe UI", Arial, sans-serif;
    background: #f4f6fb;
    color: #1f2937;
}

/* ================= DASHBOARD ================= */

.dashboard-container {
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}

/* ================= TABLE ================= */

.table-wrapper {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
}

thead {
    background: #0f172a;
    color: #ffffff;
}

th, td {
    padding: 14px 16px;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
}

tbody tr:hover {
    background: #f1f5ff;
    transition: 0.2s;
}

/* ================= BUTTONS ================= */

.btn {
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: 0.2s ease;
    display: inline-block;
}

.btn-view {
    background: #2563eb;
    color: #fff;
}

.btn-view:hover {
    background: #1d4ed8;
}

.btn-update {
    background: #16a34a;
    color: #fff;
}

.btn-update:hover {
    background: #15803d;
}

.btn-delete {
    background: #dc2626;
    color: #fff;
}

.btn-delete:hover {
    background: #b91c1c;
}

/* ================= MODAL ================= */

.modal {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    display: none;
    z-index: 9999;
}

.modal-content {
    background: #ffffff;
    max-width: 560px;
    margin: 5% auto;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 40px 80px rgba(0,0,0,0.25);
    max-height: 85vh;
    overflow-y: auto;
    animation: popup 0.25s ease;
}

@keyframes popup {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.modal-content h3 {
    margin-bottom: 20px;
    font-size: 1.4rem;
}

.modal-content .close {
    float: right;
    font-size: 22px;
    cursor: pointer;
    color: #6b7280;
}

/* ================= FORM ================= */

.modal-content label {
    display: block;
    margin-top: 14px;
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 14px;
}

.modal-content input,
.modal-content select,
.modal-content textarea {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: 14px;
}

.modal-content input:focus,
.modal-content select:focus,
.modal-content textarea:focus {
    outline: none;
    border-color: #2563eb;
}

.modal-content textarea {
    min-height: 90px;
    resize: vertical;
}

.modal-content button {
    margin-top: 20px;
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    background: #2563eb;
    color: #fff;
    cursor: pointer;
}

.modal-content button:hover {
    background: #1d4ed8;
}

/* ================= MOBILE ================= */

@media (max-width: 640px) {
    .modal-content {
        margin: 10% 16px;
        padding: 20px;
    }

    table {
        font-size: 0.85rem;
    }
}
</style>
<div class="dashboard-container">
<div class="table-wrapper">
<table>
<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Job Role</th>
<th>Status</th>
<th>Submitted</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td> </td>
<td></td>
<td></td>
<td></td>
<td><strong></strong></td>
<td></td>
<td>
<a class="btn btn-view" href="" target="_blank">
                            View
                        </a>
<button class="btn btn-update action-btn" data-id="" data-interview-date="" data-interview-link="" data-join-date="" data-note="" data-rejection="" data-status="">
                            Update
                        </button>
<form action="" method="POST" onsubmit="return confirm('Are you sure you want to delete this application?');" style="display:inline;">
<button class="btn btn-delete" type="submit">
                                Delete
                            </button>
</form>
</td>
</tr>
<tr>
<td colspan="7" style="text-align:center;">
                        No applications found
                    </td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- ================= POPUP ================= -->
<div class="modal" id="actionModal">
<div class="modal-content">
<span class="close">×</span>
<h3>Update Application Status</h3>
<form id="actionForm">
<input id="app_id" name="app_id" type="hidden"/>
<label>Status</label>
<select id="status" name="status">
<option value="screening">Screening in Progress</option>
<option value="shortlisted">Shortlisted</option>
<option value="assessment">Basic Test</option>
<option value="hr_interview">HR Interview</option>
<option value="technical_interview">Technical Interview</option>
<option value="documentation">Document Verification</option>
<option value="onboarding">Onboarding</option>
<option value="not_selected">Not Selected</option>
</select>
<label>Interview / Test Date</label>
<input id="interview_date" name="interview_date" type="date"/>
<label>Meeting / Test Link</label>
<input id="interview_link" name="interview_link" type="url"/>
<label>Joining Date</label>
<input id="join_date" name="join_date" type="date"/>
<label>Rejection Message</label>
<textarea id="rejection_message" name="rejection_message" placeholder="Rejection message"></textarea>
<label>Note</label>
<textarea id="note" name="note" placeholder="Any additional notes"></textarea>
<button type="submit">Save Changes</button>
</form>
</div>
</div>
<script>
// Open/close modal
const modal = document.getElementById("actionModal");
const closeBtn = modal.querySelector(".close");

document.querySelectorAll(".action-btn").forEach(btn => {
    btn.onclick = () => {
        modal.style.display = "block";

        document.getElementById("app_id").value = btn.dataset.id;
        document.getElementById("status").value = btn.dataset.status;
        document.getElementById("interview_date").value = btn.dataset.interviewDate || "";
        document.getElementById("interview_link").value = btn.dataset.interviewLink || "";
        document.getElementById("join_date").value = btn.dataset.joinDate || "";
        document.getElementById("rejection_message").value = btn.dataset.rejection || "";
        document.getElementById("note").value = btn.dataset.note || "";
    };
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// AJAX submit with validation
document.getElementById("actionForm").addEventListener("submit", function(e){
    e.preventDefault();

    const date = document.getElementById("interview_date").value;
    const link = document.getElementById("interview_link").value;

    // Frontend validation (optional but recommended)
    if(link && !date){
        alert("Please select the date before entering the link.");
        return;
    }

    fetch("", {
        method: "POST",
        headers: { "X-CSRFToken": "" },
        body: new FormData(this)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if(data.success) location.reload();
    });
});
</script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesAdminJobApplications;
