import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesGetData = () => {
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

    const rawHTML = `<link href="/images/logo.png" rel="icon" type="image/png"/>
<style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #444;
            padding: 8px;
            text-align: center;
        }
        img {
            width: 80px;
        }

        /* Button */
        .btn {
            padding: 6px 12px;
            background: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 4px;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
        }

        .modal-content {
            background: white;
            width: 70%;
            height: 80%;
            margin: 5% auto;
            padding: 10px;
            position: relative;
        }

        .close {
            position: absolute;
            right: 10px;
            top: 5px;
            font-size: 25px;
            cursor: pointer;
        }

        iframe {
            width: 100%;
            height: 95%;
            border: none;
        }
    </style>

<h2>User Data</h2>
<table>
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<!-- <th>Whatsapp</th> -->
<th>College</th>
<!-- <th>Address</th> -->
<th>Roll No</th>
<th>Branch</th>
<!-- <th>Photo</th> -->
<th>Resume</th>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<!-- <td></td> -->
<td></td>
<!-- <td></td> -->
<td></td>
<td></td>
</tr>
</table>
 Modal 
<div class="modal" id="resumeModal">
<div class="modal-content">
<span class="close" onclick="closeResume()">×</span>
<iframe id="resumeFrame"></iframe>
</div>
</div>
<script>
    function openResume(url) {
        document.getElementById("resumeFrame").src = url;
        document.getElementById("resumeModal").style.display = "block";
    }

    function closeResume() {
        document.getElementById("resumeModal").style.display = "none";
        document.getElementById("resumeFrame").src = "";
    }
</script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesGetData;
