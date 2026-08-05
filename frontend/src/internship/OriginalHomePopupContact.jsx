import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalHomePopupContact = () => {
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
    /* ================= KINETIC SPLIT CONTACT MODAL ================= */
    .contact-popup-overlay {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(9, 28, 71, 0.9);
        backdrop-filter: blur(20px);
        z-index: 10001;
        display: none;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.6s ease-in-out;
    }

    .contact-popup-overlay.active {
        display: flex;
        opacity: 1;
    }

    .contact-popup-nexus {
        width: 95%;
        max-width: 1100px;
        background: #fff;
        border-radius: 40px;
        overflow: hidden;
        display: flex;
        box-shadow: 0 60px 120px rgba(0, 0, 0, 0.6);
        transition: all 0.8s ease-in-out;
        position: relative;
    }

    /* Left Side: Visual Branding - Sliding from Left */
    .popup-visual-pane {
        flex: 1;
        background: linear-gradient(rgba(9, 28, 71, 0.8), rgba(9, 28, 71, 0.9)),
                    url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80');
        background-size: cover;
        background-position: center;
        padding: 60px;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transform: translateX(-100%);
        transition: transform 1s ease-in-out;
    }

    .contact-popup-overlay.active .popup-visual-pane {
        transform: translateX(0);
    }

    .popup-visual-pane h3 {
        font-size: 3rem;
        font-weight: 900;
        line-height: 1.1;
        margin-bottom: 25px;
        letter-spacing: -2px;
        color:#ffff;
    }

    .popup-visual-pane p {
        font-size: 1.15rem;
        opacity: 0.85;
        line-height: 1.7;
        margin-bottom: 45px;
    }

    .consultant-tag {
        display: flex;
        align-items: center;
        gap: 15px;
        background: rgba(255, 255, 255, 0.1);
        padding: 15px 25px;
        border-radius: 50px;
        width: fit-content;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .consultant-status {
        width: 10px; height: 10px;
        background: #10b981;
        border-radius: 50%;
        box-shadow: 0 0 15px #10b981;
    }

    /* Right Side: Elegant Form - Sliding from Right */
    .popup-form-pane {
        flex: 1.2;
        padding: 60px 80px;
        background: #fff;
        position: relative;
        transform: translateX(100%);
        transition: transform 1s ease-in-out;
    }

    .contact-popup-overlay.active .popup-form-pane {
        transform: translateX(0);
    }

    .popup-close-nexus {
        position: absolute;
        top: 30px; right: 30px;
        width: 50px; height: 50px;
        background: #f8fafc;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.4s ease-in-out;
        color: #091c47;
        font-size: 1.2rem;
        z-index: 10;
    }

    .popup-close-nexus:hover {
        background: #fbcc27;
        transform: rotate(90deg);
        box-shadow: 0 10px 20px rgba(251, 204, 39, 0.3);
    }

    .form-header-premium {
        margin-bottom: 45px;
    }

    .form-header-premium span {
        color: #fbcc27;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 5px;
        font-size: 0.8rem;
        display: block;
        margin-bottom: 12px;
    }

    .form-header-premium h2 {
        font-size: 2.5rem;
        color: #091c47;
        font-weight: 900;
        letter-spacing: -1.5px;
    }

    .premium-field {
        margin-bottom: 30px;
    }

    .premium-field label {
        display: block;
        font-weight: 800;
        color: #091c47;
        font-size: 0.85rem;
        text-transform: uppercase;
        margin-bottom: 12px;
        letter-spacing: 1.5px;
    }

    .premium-field input, .premium-field textarea {
        width: 100%;
        padding: 18px 25px;
        border: 2px solid #f1f5f9;
        border-radius: 16px;
        background: #fcfdfe;
        transition: 0.3s ease-in-out;
        font-size: 1rem;
    }

    .premium-field input:focus, .premium-field textarea:focus {
        border-color: #fbcc27;
        background: #fff;
        box-shadow: 0 15px 40px rgba(9, 28, 71, 0.08);
        outline: none;
    }

    .btn-submit-premium {
        width: 100%;
        padding: 20px;
        background: #091c47;
        color: #fff;
        border: none;
        border-radius: 16px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 2.5px;
        cursor: pointer;
        transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
    }

    .btn-submit-premium:hover {
        background: #fbcc27;
        color: #091c47;
        transform: translateY(-5px);
        box-shadow: 0 25px 50px rgba(251, 204, 39, 0.4);
    }

    @media (max-width: 1440px) and (min-width: 992px), (max-height: 850px) and (min-width: 992px) {
        .contact-popup-nexus {
            max-width: 900px;
            border-radius: 30px;
        }
        .popup-visual-pane {
            padding: 40px;
        }
        .popup-visual-pane h3 {
            font-size: 20px;
            margin-bottom: 15px;
            color:#ffffff;
        }
        .popup-visual-pane p {
            font-size: 1rem;
            margin-bottom: 30px;
        }
        .popup-form-pane {
            padding: 40px 50px;
        }
        .form-header-premium {
            margin-bottom: 25px;
        }
        .form-header-premium h2 {
            font-size: 2rem;
        }
        .premium-field {
            margin-bottom: 18px;
        }
        .premium-field label {
            font-size: 0.8rem;
            margin-bottom: 8px;
        }
        .premium-field input, .premium-field textarea {
            padding: 12px 20px;
            font-size: 0.95rem;
            border-radius: 12px;
        }
        .btn-submit-premium {
            padding: 15px;
            font-size: 0.95rem;
            border-radius: 12px;
        }
        .popup-close-nexus {
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            font-size: 1rem;
        }
    }

    @media (max-height: 700px) and (min-width: 992px) {
        .contact-popup-nexus {
            max-height: 90vh;
        }
        .popup-form-pane {
            overflow-y: auto;
            max-height: 90vh;
        }
    }

    @media (max-width: 991px) {
        .contact-popup-nexus { flex-direction: column; height: 95vh; overflow-y: auto; border-radius: 30px; }
        .popup-visual-pane, .popup-form-pane { transform: translateY(100%); transition: transform 0.8s ease-in-out; }
        .contact-popup-overlay.active .popup-visual-pane, 
        .contact-popup-overlay.active .popup-form-pane { transform: translateY(0); }
        .popup-visual-pane { padding: 40px; min-height: 300px; }
        .popup-visual-pane h3 { font-size: 2.2rem; }
        .popup-form-pane { padding: 50px 30px; }
    }
</style>
<div class="contact-popup-overlay" id="popupOverlay">
<div class="contact-popup-nexus">
<!-- Visual Branding Pane (Slides from Left) -->
<div class="popup-visual-pane">
<h3 style="#ffffff">Scale Your <br/> Gobal Digital Presence</h3>
<p>Join elite enterprises who trust YGR Gobal for architecting high-performance digital ecosystems.</p>
<div class="consultant-tag">
<div class="consultant-status"></div>
<span style="font-weight: 700; font-size: 0.9rem;">Expert Consultants Active</span>
</div>
</div>
<!-- Form Pane (Slides from Right) -->
<div class="popup-form-pane">
<div class="popup-close-nexus" id="closePopup"><i class="fas fa-times"></i></div>
<div class="form-header-premium">
<span>Direct Inquiry</span>
<h2>Request a Roadmap</h2>
</div>
<form action="/contact/" method="POST">
<div class="premium-field">
<label>Full Name</label>
<input name="name" placeholder="Johnathan Doe" required="" type="text"/>
</div>
<div class="premium-field">
<label>Corporate Email</label>
<input name="email" placeholder="john@enterprise.com" required="" type="email"/>
</div>
<div class="premium-field">
<label>Service Vertical</label>
<input name="subject" placeholder="E.g. Full Stack Engineering" required="" type="text"/>
</div>
<button class="btn-submit-premium" type="submit">
                    Get Free Strategy <i class="fas fa-bolt"></i>
</button>
</form>
</div>
</div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const overlay = document.getElementById('popupOverlay');
        const closeBtn = document.getElementById('closePopup');

        const hasSeenPopup = sessionStorage.getItem('ygr_home_popup_seen');

        if (!hasSeenPopup) {
            setTimeout(() => {
                overlay.style.display = 'flex';
                setTimeout(() => {
                    overlay.classList.add('active');
                }, 50);
                sessionStorage.setItem('ygr_home_popup_seen', 'true');
            }, 5000); 
        }

        const closePopup = () => {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 1000);
        };

        closeBtn.addEventListener('click', closePopup);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('active')) closePopup(); });
    });
</script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalHomePopupContact;
