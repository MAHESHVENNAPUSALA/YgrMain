import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalHomeClients = () => {
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
        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
            font-family:Arial, sans-serif;
        }

        body{
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            background: linear-gradient(135deg, #f8fafc, #edf2f7);
        }

        .form-container{
            width:350px;
            background:#fff;
            padding:30px;
            border-radius:15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.06);
            border: 1px solid #e2e8f0;
        }

        .form-container h2{
            text-align:center;
            margin-bottom:20px;
            color:#091c47;
            font-family: 'Oswald', sans-serif;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        form input, form select{
            width:100%;
            padding:12px;
            margin-bottom:15px;
            border:1px solid #ccc;
            border-radius:8px;
            outline:none;
            font-size:16px;
            background: #fff;
            color: #334155;
        }

        form input:focus, form select:focus{
            border-color: #091c47;
            box-shadow: 0 0 5px rgba(9,28,71,0.2);
        }

        button{
            width:100%;
            padding:12px;
            border:none;
            border-radius:8px;
            background: linear-gradient(135deg, #fbcc27, #eab308);
            color: #091c47;
            font-weight: 800;
            font-size:16px;
            cursor:pointer;
            transition:0.3s;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        button:hover{
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(251, 204, 39, 0.4);
            background: linear-gradient(135deg, #eab308, #ca8a04);
        }
    </style>

<div class="form-container">
<h2>Client Form</h2>
<div style="background-color: #d4edda; color: #155724; padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-size: 14px; border: 1px solid #c3e6cb;">
</div>
<form method="POST">
<input name="name" placeholder="Name" required="" type="text"/>
<input name="phone" placeholder="Phone Number" required="" type="text"/>
<input name="email" placeholder="Email" required="" type="email"/>
<select name="service" required="">
<option disabled="" selected="" value="">Select Service</option>
<option value="Web Design">Web Design</option>
<option value="Web Apps">Web Apps</option>
<option value="Mobile Apps">Mobile Apps</option>
<option value="Marketing">Marketing</option>
<option value="UI / UX">UI / UX</option>
<option value="Testing">Testing</option>
<option value="Support">Support</option>
<option value="Internships">Internships</option>
</select>
<button type="submit">Submit</button>
</form>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalHomeClients;
