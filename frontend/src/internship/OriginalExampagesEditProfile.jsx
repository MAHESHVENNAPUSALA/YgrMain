import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesEditProfile = () => {
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

    const rawHTML = `<style>
    body {
      font-family: Arial, sans-serif;
      background: #f0f2f5;
      margin: 0;
      padding: 0;
    }

    /* Back icon */
    .back-icon {
      display: inline-block;
      margin: 20px;
      font-size: 18px;
      font-weight: 600;
      color: #092A49;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .back-icon:hover {
      color: #06426b;
      transform: translateX(-4px);
    }

    /* Container */
    .container {
      max-width: 600px;
      margin: 20px auto 50px;
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }

    h2 {
      color: #092A49;
      text-align: center;
      margin-bottom: 25px;
    }

    label {
      display: block;
      font-weight: bold;
      margin-top: 15px;
      color: #333;
    }

    input[type="text"],
    input[type="email"],
    input[type="file"] {
      width: 100%;
      padding: 8px 10px;
      margin-top: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    button, .edit-img-btn {
      background-color: #092A49;
      color: white;
      border: none;
      padding: 15px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 10px;
      transition: background 0.3s;
    }

    button:hover, .edit-img-btn:hover {
      background-color: #06426b;
    }

    /* Centered profile image */
    .profile-img-container-centered {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }

    .profile-img-container-centered img {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid #ccc;
      margin-bottom: 10px;
    }

    .profile-img-container-centered .edit-img-btn {
      width: 120px;
      text-align: center;
      padding: 8px 0;
    }

    /* Messages */
    .success-msg {
      color: green;
      text-align: center;
      margin-bottom: 15px;
    }

    .error-msg {
      color: red;
      text-align: center;
      margin-bottom: 15px;
    }

    /* Responsive */
    @media screen and (max-width: 600px) {
      .container {
        padding: 20px;
        margin: 10px auto;
      }

      .profile-img-container-centered img {
        width: 100px;
        height: 100px;
      }

      .profile-img-container-centered .edit-img-btn {
        width: 100px;
      }
    }
  </style>

 BACK ICON 
<span class="back-icon" onclick="history.back()" title="Back">← Back</span>
<div class="container">
<h2>Edit Profile</h2>
<!-- Django messages -->
<div class="-msg">
</div>
<!-- FORM -->
<form action="" enctype="multipart/form-data" method="POST">
<!-- Profile Image -->
<label>Profile Image</label>
<div class="profile-img-container-centered">
<img alt="Profile Image" src=""/>
<img alt="No Image" src="/image/default-profile.png"/>
<button class="edit-img-btn" onclick="document.getElementById('photoInput').click()" type="button">Edit Image</button>
</div>
<input accept="image/*" id="photoInput" name="photo" style="display:none;" type="file"/>
<!-- Email -->
<label>Email</label>
<input name="email" required="" type="email" value=""/>
<!-- Phone -->
<label>Phone</label>
<input name="phone" required="" type="text" value=""/>
<!-- College Name -->
<label>College Name</label>
<input name="clg_name" required="" type="text" value=""/>
<!-- College Address -->
<label>College Address</label>
<input name="clg_address" type="text" value=""/>
<!-- Resume -->
<label>Resume</label>
<div style="margin-bottom: 10px;">
<a href="" target="_blank">View current resume</a>
</div>
<input accept=".pdf,.doc,.docx" name="resume" type="file"/>
<!-- Save button -->
<button type="submit">Save Changes</button>
</form>
</div>
<script>
  const photoInput = document.getElementById('photoInput');
  const editBtn = document.querySelector('.edit-img-btn');
  const profileImg = document.querySelector('.profile-img-container-centered img');

  photoInput.addEventListener('change', function(){
    if(this.files.length > 0){
      editBtn.textContent = "Image Selected";

      const file = this.files[0];
      const reader = new FileReader();

      reader.onload = function(e){
        profileImg.src = e.target.result;
      }
      reader.readAsDataURL(file);
    } else {
      editBtn.textContent = "Edit Image";
    }
  });
</script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesEditProfile;
