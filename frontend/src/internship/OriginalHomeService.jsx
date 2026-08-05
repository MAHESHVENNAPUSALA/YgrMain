import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalHomeService = () => {
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
/* ================= PREMIUM SERVICES SECTION ================= */
:root {
    --srv-navy: #091c47;
    --srv-accent: #fbcc27;
    --srv-bg: #f8fafc;
}

.srv-section {
    padding: 60px 5%;
    background: var(--srv-bg);
    position: relative;
    overflow: hidden;
}

.srv-container {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
}

.srv-header {
    text-align: center;
    margin-bottom: 40px;
}

.srv-eyebrow {
    background: rgba(251, 204, 39, 0.1);
    color: #b48a04;
    padding: 6px 16px;
    border-radius: 50px;
    font-weight: 800;
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 1.5px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 15px;
}

.srv-header h2 {
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--srv-navy);
    line-height: 1.2;
    margin-bottom: 12px;
    letter-spacing: -1px;
}

.srv-header p {
    font-size: 0.95rem;
    color: #64748b;
    max-width: 650px;
    margin: 0 auto;
}

/* Filter Tabs */
.srv-tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 40px;
    flex-wrap: wrap;
}

.srv-tab {
    padding: 10px 24px;
    border-radius: 50px;
    border: 1px solid rgba(0,0,0,0.05);
    background: #fff;
    color: #64748b;
    font-weight: 700;
    font-size: 0.85rem;
    transition: all 0.3s ease;
    cursor: pointer;
}

.srv-tab.active {
    background: var(--srv-navy);
    color: #fff;
    border-color: var(--srv-navy);
}

/* Service Grid */
.srv-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.srv-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 25px;
    border: 1px solid #edf2f7;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    text-decoration: none !important;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.srv-card:hover {
    transform: translateY(-5px);
    border-color: var(--srv-accent);
    box-shadow: 0 20px 40px rgba(9, 28, 71, 0.08);
}

.srv-card-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
}

.srv-icon-box {
    width: 45px;
    height: 45px;
    background: #f8fafc;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: var(--srv-navy);
    transition: all 0.3s ease;
    flex-shrink: 0;
}

.srv-card:hover .srv-icon-box {
    background: var(--srv-navy);
    color: var(--srv-accent);
}

.srv-card h3 {
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--srv-navy);
    margin: 0;
    line-height: 1.2;
}


.srv-card p {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 20px;
    flex: 1;
}

.srv-card-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
    border-top: 1px solid #f1f5f9;
}

.srv-meta {
    font-size: 0.75rem;
    color: #94a3b8;
    font-weight: 700;
    text-transform: uppercase;
}

.srv-meta span {
    color: var(--srv-navy);
}

.srv-link-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #f8fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--srv-navy);
    transition: all 0.3s ease;
    font-size: 0.85rem;
}

.srv-card:hover .srv-link-btn {
    background: var(--srv-accent);
    color: var(--srv-navy);
    transform: translateX(3px);
}

/* CTA Block */
.srv-cta-card {
    margin-top: 50px;
    background: var(--srv-navy);
    padding: 35px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
}

.srv-cta-info h4 {
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 5px;
}

.srv-cta-info p {
    font-size: 0.9rem;
    opacity: 0.8;
    margin: 0;
}

.srv-cta-btn {
    padding: 10px 24px;
    background: var(--srv-accent);
    color: var(--srv-navy);
    border-radius: 50px;
    font-weight: 800;
    font-size: 0.85rem;
    text-decoration: none;
    transition: all 0.3s ease;
}

/* --- SINGLE UNIFIED MOBILE OVERRIDE (991px) --- */
@media (max-width: 991px) {
    body { overflow-x: hidden !important; }

    .srv-section {
        padding: 40px 0 !important;
    }

    .srv-container {
        padding: 0 20px !important;
    }

    .srv-header h2 {
        font-size: 1.6rem !important;
        line-height: 1.2 !important;
    }

    .srv-tabs {
        gap: 8px !important;
        margin-bottom: 30px !important;
    }

    .srv-tab {
        padding: 8px 18px !important;
        font-size: 0.75rem !important;
    }

    .srv-grid {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
    }

    .srv-card {
        padding: 20px !important;
        border-radius: 12px !important;
    }

    .srv-card h3 {
        font-size: 1.1rem !important;
    }

    .srv-card p {
        font-size: 0.85rem !important;
        margin-bottom: 15px !important;
    }

    .srv-cta-card {
        flex-direction: column !important;
        text-align: center !important;
        gap: 25px !important;
        padding: 30px 20px !important;
        margin-top: 40px !important;
    }

    .srv-cta-info h4 {
        font-size: 1.3rem !important;
        margin-bottom: 10px !important;
    }

    .srv-cta-btn {
        width: 100% !important;
        max-width: 280px !important;
        text-align: center !important;
        padding: 15px !important;
    }
}
</style>
<section class="srv-section">
<div class="srv-container">
<!-- Header -->
<div class="srv-header">
<div class="srv-eyebrow">Expert Solutions</div>
<h2>Empowering Your Digital Ecosystem</h2>
<p>We deliver cutting-edge IT services tailored for growth, performance, and unmatched user experiences.</p>
</div>
<!-- Filter Tabs -->
<div class="srv-tabs">
<button class="srv-tab active" onclick="filterServices(this,'all')">Gobal Services</button>
<button class="srv-tab" onclick="filterServices(this,'dev')">Engineering</button>
<button class="srv-tab" onclick="filterServices(this,'design')">Creative Design</button>
<button class="srv-tab" onclick="filterServices(this,'growth')">Business Growth</button>
</div>
<!-- Cards Grid -->
<div class="srv-grid" id="service-grid">
<!-- 01 Website Development -->
<a class="srv-card reveal-right" data-cat="dev" href="/services?type=web" style="transition-delay: 0.1s;">
<div class="srv-card-header">
<div class="srv-icon-box"><i class="fa-solid fa-code"></i></div>
<h3>Website Architecture</h3>
</div>
<p>High-speed, SEO-optimized digital platforms designed for maximum conversion and brand visibility.</p>
<div class="srv-card-action">
<p class="srv-meta">Delivery: <span>4 Weeks</span></p>
<div class="srv-link-btn"><i class="fa-solid fa-arrow-right"></i></div>
</div>
</a>
<!-- 02 Web Applications -->
<a class="srv-card reveal-right" data-cat="dev" href="/services?type=webapp" style="transition-delay: 0.2s;">
<div class="srv-card-header">
<div class="srv-icon-box"><i class="fa-solid fa-layer-group"></i></div>
<h3>Enterprise Web Apps</h3>
</div>
<p>Robust, scalable cloud applications built with React, Node.js, and high-security architectures.</p>
<div class="srv-card-action">
<p class="srv-meta">Delivery: <span>8 Weeks</span></p>
<div class="srv-link-btn"><i class="fa-solid fa-arrow-right"></i></div>
</div>
</a>
<!-- 03 Mobile App Development -->
<a class="srv-card reveal-right" data-cat="dev" href="/services?type=mobile" style="transition-delay: 0.3s;">
<div class="srv-card-header">
<div class="srv-icon-box"><i class="fa-solid fa-mobile-screen-button"></i></div>
<h3>Mobile Experiences</h3>
</div>
<p>Native-grade iOS and Android apps that blend fluid performance with intuitive user interactions.</p>
<div class="srv-card-action">
<p class="srv-meta">Delivery: <span>10 Weeks</span></p>
<div class="srv-link-btn"><i class="fa-solid fa-arrow-right"></i></div>
</div>
</a>
<!-- 04 Digital Marketing -->
<a class="srv-card reveal-right" data-cat="growth" href="/services?type=dm" style="transition-delay: 0.4s;">
<div class="srv-card-header">
<div class="srv-icon-box"><i class="fa-solid fa-chart-line"></i></div>
<h3>Growth Marketing</h3>
</div>
<p>Data-driven SEO, PPC, and lead generation strategies focused on measurable ROI and brand growth.</p>
<div class="srv-card-action">
<p class="srv-meta">ROI Focus: <span>High Impact</span></p>
<div class="srv-link-btn"><i class="fa-solid fa-arrow-right"></i></div>
</div>
</a>
<!-- 05 UI / UX Design -->
<a class="srv-card reveal-right" data-cat="design" href="/services?type=uiux" style="transition-delay: 0.5s;">
<div class="srv-card-header">
<div class="srv-icon-box"><i class="fa-solid fa-pen-ruler"></i></div>
<h3>Experience Design</h3>
</div>
<p>Human-centric UI/UX research and prototyping that drives engagement and user loyalty.</p>
<div class="srv-card-action">
<p class="srv-meta">Cycle: <span>3 Weeks</span></p>
<div class="srv-link-btn"><i class="fa-solid fa-arrow-right"></i></div>
</div>
</a>
<!-- 06 Software Testing -->
<a class="srv-card reveal-right" data-cat="dev" href="/services?type=testing" style="transition-delay: 0.6s;">
<div class="srv-card-header">
<div class="srv-icon-box"><i class="fa-solid fa-bug-slash"></i></div>
<h3>Quality Engineering</h3>
</div>
<p>Comprehensive manual and automated testing cycles ensuring zero-defect product launches.</p>
<div class="srv-card-action">
<p class="srv-meta">Coverage: <span>99.9%</span></p>
<div class="srv-link-btn"><i class="fa-solid fa-arrow-right"></i></div>
</div>
</a>
</div>
<!-- CTA Block -->
<div class="srv-cta-card">
<div class="srv-cta-info">
<h4 style="color: #edf2f7;">Ready to scale your business?</h4>
<p>Consult with our architects and get a tailored roadmap.</p>
</div>
<a class="srv-cta-btn" href="/contact">Start Your Project</a>
</div>
</div>
</section>
<script>
function filterServices(btn, cat) {
    document.querySelectorAll('.srv-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    
    document.querySelectorAll('.srv-card').forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}
</script>`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalHomeService;
