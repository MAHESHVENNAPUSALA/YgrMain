import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesAdminViewApplication = () => {
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

Application Details
Application Details



<style>
/* Container */
.detail-container {
    background: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 25px 45px rgba(0,0,0,0.08);
    max-width: 900px;
    margin: auto;
    font-size: 0.95rem;
}

/* Section Titles */
.detail-container h3 {
    border-left: 6px solid #4f46e5;
    padding-left: 12px;
    color: #092a49;
    margin-top: 25px;
    margin-bottom: 15px;
}

/* Paragraphs */
.detail-container p {
    margin: 6px 0;
    line-height: 1.5;
}

/* Back Button */
.back-btn {
    display: inline-block;
    margin-bottom: 20px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.back-btn:hover {
    background: linear-gradient(135deg, #1d4ed8, #1e40af);
}

/* Document links */
.document-link {
    color: #2563eb;
    text-decoration: none;
}

.document-link:hover {
    color: #1d4ed8;
}

/* Profile image */
.profile-photo {
    border-radius: 8px;
    border: 1px solid #ddd;
    margin-top: 8px;
    max-width: 200px;
}

/* Responsive */
@media (max-width: 720px) {
    .detail-container {
        padding: 20px;
    }
}
</style>
<div class="detail-container">
<a class="back-btn" href="">← Back</a>
<!-- Personal Info -->
<h3>Personal Info</h3>
<p><strong>Name:</strong> </p>
<p><strong>Email:</strong> </p>
<p><strong>Phone:</strong> </p>
<p><strong>DOB:</strong> </p>
<p><strong>Gender:</strong> </p>
<p><strong>Current City:</strong> </p>
<p><strong>Current Address:</strong> </p>
<p><strong>Permanent Address:</strong> </p>
<!-- Job Info -->
<h3>Job Info</h3>
<p><strong>Role:</strong> </p>
<p><strong>Department:</strong> </p>
<p><strong>Employment Type:</strong> </p>
<p><strong>Preferred Work Mode:</strong> </p>
<p><strong>Preferred Job Location:</strong> </p>
<p><strong>Status:</strong> </p>
<p><strong>Submitted At:</strong> </p>
<!-- Education -->
<h3>Education</h3>
<p><strong>Highest Qualification:</strong> </p>
<p><strong>College/University:</strong> </p>
<p><strong>Passout Year:</strong> </p>
<p><strong>Course:</strong> </p>
<p><strong>SSC Marks:</strong> </p>
<p><strong>Intermediate/Diploma Marks:</strong> </p>
<p><strong>Higher Education Marks:</strong> </p>
<p><strong>Backlogs:</strong> </p>
<!-- Skills & Experience -->
<h3>Skills &amp; Experience</h3>
<p><strong>Primary Skills:</strong> </p>
<p><strong>Secondary Skills:</strong> </p>
<p><strong>Technical Skills:</strong> </p>
<p><strong>Certifications:</strong> </p>
<p><strong>Internship Details:</strong> </p>
<p><strong>Candidate Type:</strong> </p>
<p><strong>Total Experience:</strong> </p>
<p><strong>Relevant Experience:</strong> </p>
<p><strong>Current Company:</strong> </p>
<p><strong>Current Designation:</strong> </p>
<p><strong>Current CTC:</strong> </p>
<p><strong>Expected CTC:</strong> </p>
<p><strong>Notice Period:</strong> </p>
<p><strong>Reason for Job Change:</strong> </p>
<!-- Documents -->
<h3>Documents</h3>
<p><strong>Resume:</strong> <a class="document-link" href="">Download</a></p>
<p><strong>Profile Photo:</strong></p>
<img alt="Profile Photo" class="profile-photo" src=""/>
<p><strong>PAN Number:</strong> </p>
<p><strong>PAN Card:</strong>
<a class="document-link" href="">View</a>
</p>
<p><strong>Aadhaar Number:</strong> </p>
<p><strong>Aadhaar Front:</strong>
<a class="document-link" href="">View</a>
</p>
<p><strong>Aadhaar Back:</strong>
<a class="document-link" href="">View</a>
</p>
<!-- Professional Links -->
<h3>Professional Links</h3>
<p><strong>LinkedIn:</strong> <a class="document-link" href="" target="_blank"></a></p>
<p><strong>GitHub/Portfolio:</strong> <a class="document-link" href="" target="_blank"></a></p>
<!-- Test / Interview Details -->
<h3>Test &amp; Interview</h3>
<p><strong>Basic Test Date:</strong> </p>
<p><strong>Test Link:</strong> <a class="document-link" href="" target="_blank"></a></p>
<p><strong>Document Verification Date:</strong> </p>
<p><strong>Interview Date:</strong> </p>
<p><strong>Interview Link:</strong> <a class="document-link" href="" target="_blank"></a></p>
<p><strong>Technical Round Date:</strong> </p>
<p><strong>Technical Round Link:</strong> <a class="document-link" href="" target="_blank"></a></p>
<p><strong>Document Submission Date:</strong> </p>
<p><strong>Joining Date:</strong> </p>
<!-- Notes -->
<h3>Notes &amp; Messages</h3>
<p><strong>Rejection Message:</strong> </p>
<p><strong>Message:</strong> </p>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesAdminViewApplication;
