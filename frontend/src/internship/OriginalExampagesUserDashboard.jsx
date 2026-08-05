import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesUserDashboard = () => {
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
body {
  margin: 0;
  font-family: Arial, sans-serif;
    max-width: 100%;
  overflow-x: hidden;
}

/* HEADER (UNCHANGED) */
.header {
  background-color: #092A49;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  color: white;
  height: 70px;
  flex-wrap: wrap;
}

.left img {
height:60px;width:auto;display:block;padding-bottom:10px;
}

.right {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.right a,
.right button {
  color: white;
  text-decoration: none;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
}

/* MAIN */
.main {
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
}

/* WELCOME */
.welcome-card {
  background:#f9f9f9;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.welcome-card h2 {
  margin-top: 0;
  color: #092A49;
}

.welcome-card p {
  font-size: 16px;
}
.welcome-card a
{
  color:#092A49;

}

/* EXAM CARD */
.card {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  padding: 30px;
  text-align: center;
}

.card h2 {
  color: #092A49;
}

.card button {
  background-color: #092A49;
  margin-top: 20px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.card button:hover {
  background-color: #06426b;
}

.info {
  margin-top: 15px;
  font-size: 15px;
}
</style>

 HEADER 
<div class="header">
<div class="left">
<img alt="logo" src="/images/logo.png"/>
</div>
<h2>user Dashboard</h2>
<div class="right">
<a href="">Profile</a>
<form action="" method="post">
<button type="submit">Logout</button>
</form>
</div>
</div>
 MAIN 
<div class="main">
<!-- WELCOME MESSAGE -->
<div class="welcome-card">
<h2>Welcome,  </h2>
<p>
        You have selected the internship:
        <b></b>
</p>
<p>
        Complete the exam to get your certificate.
        After completion, go to the
        <a href=""><b>Profile Page</b></a>
        to download your certificate.
      </p>
<p>You have not selected any internship yet.</p>
</div>
<!-- EXAM CARD -->
<div class="card">
<h2>Test Your Skills</h2>
<div class="info">
<p>You need to pay to take the exam.</p>
<a href="#"><button>Pay</button></a>
</div>
<div class="info">
<p>You have already attempted the exam.</p>
</div>
<a href="">
<button>Take Test</button>
</a>
</div>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesUserDashboard;
