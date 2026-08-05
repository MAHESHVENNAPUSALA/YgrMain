import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalHomeWhyChooseUs = () => {
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
/* ================= BENTO GRID WHY CHOOSE US ================= */
:root {
    --bento-navy: #091c47;
    --bento-accent: #fbcc27;
    --bento-bg: #f4f7f6;
    --bento-text: #475569;
    --bento-font: 'Plus Jakarta Sans', sans-serif;
}

.why-bento-section {
    font-family: var(--bento-font);
    padding: 80px 0;
    background: var(--bento-bg);
    position: relative;
    overflow: hidden;
}

.bento-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.why-header {
    text-align: center;
    margin-bottom: 50px;
}

.why-header h2 {
    font-size: 2.4rem;
    font-weight: 800;
    color: var(--bento-navy);
    margin-bottom: 12px;
    letter-spacing: -1px;
}

.why-header p {
    font-size: 1rem;
    color: var(--bento-text);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
}

/* Bento Grid System */
.bento-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto;
    gap: 20px;
}

.bento-card {
    background: #ffffff;
    border-radius: 24px;
    padding: 35px 30px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    border: 1px solid rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
}

.bento-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(9, 28, 71, 0.08);
}

/* Specific Card Layouts */
.bento-main {
    grid-column: 1 / 3;
    grid-row: 1;
    background: var(--bento-navy);
    color: #ffffff;
    justify-content: center;
}

.bento-main::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(251, 204, 39, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}

.bento-main h3 {
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 15px;
    letter-spacing: -1px;
    color: #ffffff;
}

.bento-main p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 30px;
    max-width: 90%;
}

.bento-tags {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 35px;
}

.bento-tag {
    background: rgba(255, 255, 255, 0.1);
    padding: 6px 16px;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
    backdrop-filter: blur(5px);
}

.bento-cta {
    align-self: flex-start;
    padding: 12px 28px;
    background: var(--bento-accent);
    color: var(--bento-navy);
    border-radius: 12px;
    font-weight: 800;
    font-size: 0.9rem;
    text-transform: uppercase;
    text-decoration: none !important;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.bento-cta:hover {
    background: #ffffff;
    transform: translateY(-2px);
}

.bento-icon {
    width: 50px;
    height: 50px;
    background: rgba(9, 28, 71, 0.04);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: var(--bento-navy);
    margin-bottom: 20px;
    transition: all 0.3s ease;
}

.bento-card:hover .bento-icon {
    background: var(--bento-accent);
    color: var(--bento-navy);
    transform: scale(1.05) rotate(-5deg);
}

.bento-card h5 {
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--bento-navy);
    margin-bottom: 10px;
}

.bento-card p {
    font-size: 0.9rem;
    color: var(--bento-text);
    line-height: 1.6;
    margin: 0;
}

/* Background watermark for small cards */
.bento-watermark {
    position: absolute;
    bottom: -15px;
    right: -15px;
    font-size: 6rem;
    color: rgba(9, 28, 71, 0.02);
    pointer-events: none;
    transition: all 0.5s ease;
}

.bento-card:hover .bento-watermark {
    color: rgba(251, 204, 39, 0.05);
    transform: scale(1.1) rotate(5deg);
}

/* --- SINGLE UNIFIED MOBILE OVERRIDE (991px) --- */
@media (max-width: 991px) {
    body { overflow-x: hidden !important; }

    .why-bento-section {
        padding: 40px 0 !important;
    }

    .why-header {
        margin-bottom: 30px !important;
        padding: 0 10px !important;
    }

    .why-header h2 {
        font-size: 1.6rem !important;
        line-height: 1.2 !important;
    }

    .why-header p {
        font-size: 0.95rem !important;
        line-height: 1.5 !important;
    }

    .bento-grid {
        grid-template-columns: 1fr !important;
        gap: 15px !important;
    }

    .bento-main {
        grid-column: 1 / 2 !important;
        padding: 30px 20px !important;
    }

    .bento-card {
        padding: 25px 20px !important;
        border-radius: 16px !important;
    }

    .bento-main h3 {
        font-size: 1.5rem !important;
        margin-bottom: 15px !important;
    }

    .bento-main p {
        font-size: 0.9rem !important;
        margin-bottom: 25px !important;
        max-width: 100% !important;
    }

    .bento-tags {
        gap: 8px !important;
        margin-bottom: 25px !important;
    }

    .bento-tag {
        padding: 5px 12px !important;
        font-size: 0.75rem !important;
    }

    .bento-cta {
        width: 100% !important;
        justify-content: center !important;
        padding: 15px !important;
    }
}
</style>
<section class="why-bento-section">
<div class="bento-container">
<!-- Section Header -->
<div class="why-header reveal">
<h2>Why Organizations Trust YGR</h2>
<p>Beyond code, we build partnerships that prioritize scalability, security, and measurable ROI.</p>
</div>
<!-- Bento Grid Layout -->
<div class="bento-grid">
<!-- Large Hero Card -->
<div class="bento-card bento-main reveal-left">
<h3>Your Global Strategic Partner</h3>
<p style="color: #f4f7f6;">Orchestrating digital excellence across the USA, UK, Canada, and India with a unified delivery model.</p>
<div class="bento-tags">
<span class="bento-tag"><i class="fas fa-check-circle text-warning"></i> 24/7 Precision</span>
<span class="bento-tag"><i class="fas fa-check-circle text-warning"></i> Cost Efficiency</span>
<span class="bento-tag"><i class="fas fa-check-circle text-warning"></i> Scalable Tech</span>
</div>
<a class="bento-cta" href="/contact/">
                    Start Consultation <i class="fas fa-arrow-right"></i>
</a>
</div>
<!-- Card 2 -->
<div class="bento-card reveal-right" style="transition-delay: 0.1s;">
<i class="fas fa-shield-halved bento-watermark"></i>
<div class="bento-icon"><i class="fas fa-shield-halved"></i></div>
<h5>Bank-Grade Security</h5>
<p>We implement multi-layered security protocols to protect your most valuable digital assets seamlessly.</p>
</div>
<!-- Card 3 -->
<div class="bento-card reveal-right" style="transition-delay: 0.2s;">
<i class="fas fa-users-gear bento-watermark"></i>
<div class="bento-icon"><i class="fas fa-users-gear"></i></div>
<h5>Elite Talent Pool</h5>
<p>Direct access to cross-functional engineers and creative strategists with extensive gobal experience.</p>
</div>
<!-- Card 4 -->
<div class="bento-card reveal-right" style="transition-delay: 0.3s;">
<i class="fas fa-clock-rotate-left bento-watermark"></i>
<div class="bento-icon"><i class="fas fa-clock-rotate-left"></i></div>
<h5>Agile Precision</h5>
<p>Iterative delivery models that ensure absolute speed-to-market without sacrificing architectural integrity.</p>
</div>
<!-- Card 5 -->
<div class="bento-card reveal-right" style="transition-delay: 0.4s;">
<i class="fas fa-chart-line bento-watermark"></i>
<div class="bento-icon"><i class="fas fa-chart-line"></i></div>
<h5>Growth Oriented</h5>
<p>Our solutions aren't just technical; they are strategic assets designed to actively drive expansion.</p>
</div>
</div>
</div>
</section>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalHomeWhyChooseUs;
