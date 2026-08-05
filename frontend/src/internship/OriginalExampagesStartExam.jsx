import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesStartExam = () => {
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
body{
    margin:0;
    font-family:"Segoe UI", Arial, sans-serif;
    background:#f1f5f9;
    color:#092A49;
}
.container{
    max-width:900px;
    margin:60px auto;
    background:#ffffff;
    padding:40px;
    border-radius:12px;
    box-shadow:0 10px 25px rgba(0,0,0,0.12);
}
.profile{
    display:flex;
    align-items:center;
    gap:25px;
    margin-bottom:30px;
}
.profile img{
    width:130px;
    height:130px;
    border-radius:50%;
    border:3px solid #000;
    object-fit:cover;
}
.profile h2{ margin:0; font-size:26px; color:#092A49; }
.profile h4{ margin:6px 0 0; font-weight:500; }
.note-box{
    background:#eff6ff;
    padding:25px;
    border-left:6px solid #092A49;
    border-radius:6px;
}
.note-box h3{
    margin-top:0;
    margin-bottom:15px;
    color:#1e3a8a;
}
.note-box ul{
    margin:0;
    padding-left:20px;
}
.note-box li{
    margin-bottom:10px;
    line-height:1.6;
    font-size:16px;
}
.start-btn-wrapper{
    text-align:center;
    margin-top:40px;
}
.start-btn{
    padding:16px 50px;
    font-size:22px;
    font-weight:600;
    background:#2563eb;
    color:#ffffff;
    border:none;
    border-radius:8px;
    cursor:pointer;
    transition:all 0.3s ease;
}
.start-btn:hover{
    background:#1d4ed8;
    transform:translateY(-2px);
    box-shadow:0 8px 18px rgba(37,99,235,0.4);
}
.start-btn:active{
    transform:translateY(0);
}
</style>

<div class="container">
<!-- USER DETAILS -->
<div class="profile">
<img alt="User Photo" src=""/>
<img alt="Default User Photo" src="/default_user.png"/>
<div>
<h2></h2>
<h4>Roll No: </h4>
</div>
</div>
<!-- IMPORTANT NOTES -->
<div class="note-box">
<h3>Important Instructions</h3>
<ul>
<li>Exam can be written only on <b>Laptop or Desktop</b>.</li>
<li><b>Front camera must be ON</b> throughout the exam.</li>
<li>If the camera is not visible or blocked, the exam will close automatically.</li>
<li>Only <b>one person</b> must be present in front of the camera.</li>
<li>Multiple faces detected → exam will close automatically.</li>
<li>Do <b>not minimize</b>, switch tabs, or change windows.</li>
<li>Tab switching or minimizing will terminate the exam.</li>
<li>The exam runs strictly in <b>fullscreen mode</b>.</li>
<li>Works in Chrome / Edge / Firefox</li>
</ul>
</div>
<!-- START EXAM BUTTON -->
<div class="start-btn-wrapper">
<form action="" method="get">
<button class="start-btn" type="submit">Next</button>
</form>
</div>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesStartExam;
