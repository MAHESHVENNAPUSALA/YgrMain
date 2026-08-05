import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesProfile = () => {
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
  background: #f0f2f5;
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

.header img {
height:60px;width:auto;display:block;padding-bottom:10px;
}

.header a,
.header button {
  color: white;
  text-decoration: none;
  margin-left: 15px;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
}

/* MAIN */
.main {
  display: flex;
  max-width: 1200px;
  margin: 30px auto;
  gap: 30px;
}

/* PROFILE CARD */
.profile-card {
  width: 300px;
  background: #fff;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.profile-card img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-card h3 {
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
}

.profile-card p {
  text-align: left;
  font-size: 14px;
}

/* RIGHT SIDE */
.cards-container {
  flex: 1;
}

/* CARD */
.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  border-left: 6px solid transparent;
}

.card.active {
  border-left: 6px solid #092A49;
}

.card h2 {
  margin: 0;
  color: #092A49;
}

.card .content {
  margin-top: 15px;
  display: none;
}

.card.active .content {
  display: block;
}

/* INTERNSHIP ROW */
.syllabus-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e6ffed;
  border: 1px solid #4CAF50;
  padding: 12px 15px;
  border-radius: 6px;
  font-weight: 600;
}

.topic-title {
  font-size: 16px;
  color: #222;
}

/* BUTTON */
.download-btn {
  padding: 8px 18px;
  background: #28a745;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.download-btn.disabled {
  background: #6c757d;
  cursor: not-allowed;
}

/* ERROR */
.error-msg {
  color: #d9534f;
  font-weight: bold;
  margin-top: 10px;
  display: none;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .main {
    flex-direction: column;
    align-items: center;
  }
  .profile-card {
    width: 90%;
  }
}
 
 
 /* ===== BACK LINK ===== */
.back-link {
  display: inline-block;
  margin: 20px;
  color: #092A49;
  font-weight: bold;
  text-decoration: none;
  font-size: 16px;
}

.back-link:hover {
  text-decoration: none;
  color: #fff;
}
</style>

 HEADER 
<div class="header">
<img src="/images/logo.png"/>
<div>
<a class="back-link" href="javascript:history.back()">  Back</a>
<form action="" method="post" style="display:inline;">
<button type="submit">Logout</button>
</form>
<a href="">Login</a>
</div>
</div>
 MAIN 
<div class="main">
<!-- PROFILE -->
<div class="profile-card">
<img src=""/>
<img src="/images/default.png"/>
<h3>
<a href="">✎</a>
</h3>
<p><b>Email:</b> </p>
<p><b>Phone:</b> </p>
<p><b>College:</b> </p>
<p><b>Roll No:</b> </p>
</div>
<!-- INTERNSHIP -->
<div class="cards-container">
<div class="card" onclick="toggleCard(this)">
<h2>My Internship</h2>
<div class="content">
<div class="syllabus-item">
<span class="topic-title"></span>
<!-- <a href="" class="download-btn">
              Download Certificate
            </a> -->
<button class="download-btn disabled" onclick="showError(event)">
              Download Certificate
            </button>
</div>
<p class="error-msg" id="exam-error">
          ❌ Please complete the exam to download your certificate.
        </p>
<p>No internship assigned</p>
</div>
</div>
</div>
</div>
<script>
function toggleCard(card) {
  card.classList.toggle("active");
}

function showError(event) {
  event.preventDefault();
  document.getElementById("exam-error").style.display = "block";
}
</script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesProfile;
