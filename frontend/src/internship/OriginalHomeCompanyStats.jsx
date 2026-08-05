import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalHomeCompanyStats = () => {
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
/* ================= ULTRA-PREMIUM COMPANY STATS ================= */
:root {
    --stat-navy: #091c47;
    --stat-accent: #fbcc27;
    --stat-font: 'Plus Jakarta Sans', sans-serif;
}

.stats-section {
    font-family: var(--stat-font);
    background: var(--stat-navy);
    padding: 50px 0;
    position: relative;
    overflow: hidden;
}

/* Animated Background Orbs */
.stat-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    z-index: 0;
    animation: stat-pulse 10s infinite alternate ease-in-out;
}
.stat-orb-1 {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(251, 204, 39, 0.15), transparent);
    top: -100px;
    left: -200px;
}
.stat-orb-2 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent);
    bottom: -150px;
    right: -100px;
    animation-delay: -5s;
}

@keyframes stat-pulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.2); opacity: 1; }
}

.stats-container {
    position: relative;
    z-index: 2;
    max-width: 1400px;
    margin: 0 auto;
}

.stats-header-theatre {
    text-align: center;
    margin-bottom: 30px;
}

.stat-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(251, 204, 39, 0.1);
    color: var(--stat-accent);
    padding: 4px 12px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 10px;
    border: 1px solid rgba(251, 204, 39, 0.3);
}

.stats-header-theatre h2 {
    font-size: 1.8rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
}

.stats-header-theatre p {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
}

.stats-theatre-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}

.stat-panel {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 20px 15px;
    border-radius: 8px;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.stat-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 8px;
    padding: 1px;
    background: linear-gradient(135deg, var(--stat-accent), transparent);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
}

.stat-panel:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.stat-panel:hover::before { 
    opacity: 1; 
}

.stat-icon-wrapper {
    width: 35px;
    height: 35px;
    background: rgba(251, 204, 39, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px;
    color: var(--stat-accent);
    font-size: 1rem;
    transition: all 0.4s ease;
    position: relative;
    z-index: 1;
}

.stat-panel:hover .stat-icon-wrapper {
    background: var(--stat-accent);
    color: var(--stat-navy);
}

.stat-num-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2px;
    position: relative;
    z-index: 1;
}

.stat-num {
    font-size: 1.8rem;
    font-weight: 800;
    color: #ffffff;
    line-height: 1;
    letter-spacing: -0.5px;
}

.stat-plus {
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--stat-accent);
    margin-left: 2px;
}

.stat-desc {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    position: relative;
    z-index: 1;
}

.stat-watermark {
    position: absolute;
    bottom: -10px;
    right: -10px;
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.02);
    transform: rotate(-15deg);
    transition: all 0.5s ease;
    z-index: 0;
    pointer-events: none;
}

.stat-panel:hover .stat-watermark {
    color: rgba(251, 204, 39, 0.05);
    transform: rotate(0deg) scale(1.1);
}

/* --- SINGLE UNIFIED MOBILE OVERRIDE (991px) --- */
@media (max-width: 991px) {
    body { overflow-x: hidden !important; }

    .stats-section {
        padding: 30px 0 !important;
    }

    .stats-header-theatre {
        margin-bottom: 25px !important;
        padding: 0 10px !important;
    }

    .stat-badge {
        padding: 4px 10px !important;
        font-size: 0.65rem !important;
        margin-bottom: 8px !important;
    }

    .stats-header-theatre h2 {
        font-size: 1.4rem !important;
        line-height: 1.2 !important;
    }

    .stats-header-theatre p {
        font-size: 0.8rem !important;
        line-height: 1.5 !important;
    }

    .stats-theatre-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 12px !important;
        padding: 0 10px !important;
    }

    .stat-panel {
        padding: 15px 10px !important;
        border-radius: 8px !important;
    }

    .stat-icon-wrapper {
        width: 32px !important;
        height: 32px !important;
        font-size: 0.9rem !important;
        margin-bottom: 8px !important;
    }

    .stat-num {
        font-size: 1.4rem !important;
    }

    .stat-plus {
        font-size: 1rem !important;
    }

    .stat-desc {
        font-size: 0.65rem !important;
    }
}
</style>
<section class="stats-section">
<!-- Animated Orbs -->
<div class="stat-orb stat-orb-1"></div>
<div class="stat-orb stat-orb-2"></div>
<div class="container-fluid px-lg-5 px-3 stats-container">
<div class="stats-header-theatre">
<div class="stat-badge">
<i class="fas fa-chart-line"></i> Our Impact
            </div>
<h2>The Global Footprint</h2>
<p>Our metrics of success reflect our relentless dedication to delivering world-class IT solutions and transformative growth.</p>
</div>
<div class="stats-theatre-grid">
<!-- Stat 1 -->
<div class="stat-panel">
<i class="fas fa-users stat-watermark"></i>
<div class="stat-icon-wrapper">
<i class="fas fa-users"></i>
</div>
<div class="stat-num-wrapper">
<span class="stat-num counter" data-count="97">0</span>
<span class="stat-plus">+</span>
</div>
<span class="stat-desc">Active Clients</span>
</div>
<!-- Stat 2 -->
<div class="stat-panel">
<i class="fas fa-layer-group stat-watermark"></i>
<div class="stat-icon-wrapper">
<i class="fas fa-layer-group"></i>
</div>
<div class="stat-num-wrapper">
<span class="stat-num counter" data-count="98">0</span>
<span class="stat-plus">+</span>
</div>
<span class="stat-desc">Projects Delivered</span>
</div>
<!-- Stat 3 -->
<div class="stat-panel">
<i class="fas fa-medal stat-watermark"></i>
<div class="stat-icon-wrapper">
<i class="fas fa-medal"></i>
</div>
<div class="stat-num-wrapper">
<span class="stat-num counter" data-count="5">0</span>
<span class="stat-plus">+</span>
</div>
<span class="stat-desc">Years Expertise</span>
</div>
<!-- Stat 4 -->
<div class="stat-panel">
<i class="fas fa-earth-americas stat-watermark"></i>
<div class="stat-icon-wrapper">
<i class="fas fa-earth-americas"></i>
</div>
<div class="stat-num-wrapper">
<span class="stat-num counter" data-count="4">0</span>
<span class="stat-plus">+</span>
</div>
<span class="stat-desc">Market Regions</span>
</div>
</div>
</div>
</section>
<script>
document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.counter');
    
    const runStatCounter = (el) => {
        const target = +el.getAttribute('data-count');
        let count = 0;
        const speed = 2000;
        const inc = target / (speed / 16);

        const update = () => {
            count += inc;
            if (count < target) {
                el.innerText = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                el.innerText = target;
            }
        };
        update();
    };

    const statObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runStatCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    panels.forEach(p => statObserver.observe(p));
});
</script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalHomeCompanyStats;
