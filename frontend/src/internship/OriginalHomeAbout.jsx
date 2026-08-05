import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalHomeAbout = () => {
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

    const rawHTML = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

    :root {
        --primary-navy: #091c47;
        --accent-gold: #fbcc27;
        --text-slate: #475569;
        --bg-light: #fcfcfd;
    }

    /* ================= HOME ABOUT: 3D LAYERED IDENTITY ================= */
    .about-section {
        padding: 80px 0 50px;
        background: var(--bg-light);
        position: relative;
        overflow: hidden;
    }

    .about-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 60px;
        display: flex;
        align-items: center;
        gap: 80px;
    }

    /* --- Unique Vertical Architecture --- */
    .about-content-nexus {
        flex: 1;
        position: relative;
    }

    .nexus-eyebrow {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.75rem;
        font-weight: 900;
        color: var(--accent-gold);
        text-transform: uppercase;
        letter-spacing: 5px;
        margin-bottom: 30px;
        display: block;
        transform: rotate(-90deg);
        transform-origin: left;
        position: absolute;
        left: -30px;
        top: 100px;
        white-space: nowrap;
    }

    .about-content-nexus h2 {
        font-size: 2.8rem;
        font-weight: 700;
        color: var(--primary-navy);
        line-height: 1.1;
        margin-bottom: 30px;
        letter-spacing: -1.5px;
        padding-left: 20px;
    }

    .about-content-nexus h2 span {
        display: block;
        font-size: 1.2rem;
        letter-spacing: 10px;
        color: var(--accent-gold);
        text-transform: uppercase;
        margin-top: 15px;
    }

    .about-nexus-desc {
        font-size: 1.25rem;
        color: var(--text-slate);
        line-height: 1.8;
        margin-bottom: 50px;
        padding-left: 20px;
        max-width: 550px;
        position: relative;
    }

    .about-nexus-desc::before {
        content: '';
        position: absolute;
        left: 0;
        top: 10px;
        bottom: 10px;
        width: 1px;
        background: linear-gradient(to bottom, transparent, var(--accent-gold), transparent);
    }

    .nexus-cta {
        margin-left: 20px;
        position: relative;
        display: inline-block;
    }

    .btn-nexus {
        padding: 20px 45px;
        background: var(--primary-navy);
        color: #fff;
        border-radius: 4px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 20px;
        transition: all 0.4s ease;
        text-decoration: none;
        box-shadow: 0 15px 35px rgba(9, 28, 71, 0.15);
    }

    .btn-nexus:hover {
        background: var(--accent-gold);
        color: var(--primary-navy);
        padding-left: 55px;
        box-shadow: 0 20px 40px rgba(251, 204, 39, 0.3);
    }

    /* --- The 3D Identity Stack --- */
    .identity-stack-visual {
        flex: 1.2;
        height: 600px;
        position: relative;
        perspective: 1500px;
    }

    .stack-layer {
        position: absolute;
        width: 320px;
        height: 400px;
        background: #fff;
        border-radius: 24px;
        padding: 40px;
        box-shadow: 0 50px 100px rgba(9, 28, 71, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        border: 1px solid rgba(241, 245, 249, 0.5);
        background-size: cover;
        background-position: center;
        overflow: hidden;
    }

    .layer-1 {
        z-index: 10;
        transform: translateZ(50px) rotateY(-10deg) rotateX(10deg);
        top: 0;
        left: 0;
        background: linear-gradient(rgba(9, 28, 71, 0.7), rgba(9, 28, 71, 0.8)),
        url("/static/dist/images/legacy_bg.png");
        color: #fff;
    }

    .layer-2 {
        z-index: 5;
        transform: translate3d(60px, 60px, 0px) rotateY(-10deg) rotateX(10deg);
        background: linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.85)),
        url("/static/dist/images/projects_bg.png");
    }

    .layer-3 {
        z-index: 3;
        transform: translate3d(120px, 120px, -50px) rotateY(-10deg) rotateX(10deg);
        background: linear-gradient(rgba(248, 250, 252, 0.8), rgba(248, 250, 252, 0.9)),
        url("/static/dist/images/partners_bg.png");
    }

    .layer-4 {
        z-index: 1;
        transform: translate3d(180px, 180px, -100px) rotateY(-10deg) rotateX(10deg);
        background: linear-gradient(rgba(251, 204, 39, 0.75), rgba(251, 204, 39, 0.85)),
        url("/static/dist/images/regions_bg.png");
    }

    .identity-stack-visual:hover .layer-1 {
        transform: translate3d(-30px, -30px, 100px) rotateY(0) rotateX(0) !important;
        transition-delay: 0s !important;
    }

    .identity-stack-visual:hover .layer-2 {
        transform: translate3d(40px, 20px, 50px) rotateY(0) rotateX(0) !important;
        transition-delay: 0s !important;
    }

    .identity-stack-visual:hover .layer-3 {
        transform: translate3d(110px, 70px, 0px) rotateY(0) rotateX(0) !important;
        transition-delay: 0s !important;
    }

    .identity-stack-visual:hover .layer-4 {
        transform: translate3d(180px, 120px, -50px) rotateY(0) rotateX(0) !important;
        transition-delay: 0s !important;
    }

    /* Individual Card Focus: Bring hovered card to the absolute front (Top) */
    .stack-layer:hover {
        z-index: 150 !important;
        transform: translate3d(20px, 20px, 150px) rotateY(0) rotateX(0) scale(1.08) !important;
        box-shadow: 0 100px 200px rgba(9, 28, 71, 0.3);
        border: 2px solid var(--accent-gold);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        /* Spring back */
    }

    .stack-layer:hover .layer-icon {
        opacity: 1;
        color: var(--accent-gold);
        transform: scale(1.3);
    }

    /* Specific hover overrides to ensure every card hits the 'Top' sweet spot */
    .layer-1:hover {
        transform: translate3d(0, 0, 150px) scale(1.08) !important;
    }

    .layer-2:hover {
        transform: translate3d(0, 0, 150px) scale(1.08) !important;
    }

    .layer-3:hover {
        transform: translate3d(0, 0, 150px) scale(1.08) !important;
    }

    .layer-4:hover {
        transform: translate3d(0, 0, 150px) scale(1.08) !important;
    }

    /* Staggered Entrance Animation */
    .reveal .stack-layer {
        opacity: 0;
        transform: translate3d(0, 80px, 0) rotateY(-10deg) rotateX(10deg);
    }

    .reveal.active .stack-layer {
        opacity: 1;
    }

    .reveal.active .layer-1 {
        transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.1s;
        transform: translateZ(50px) rotateY(-10deg) rotateX(10deg);
    }

    .reveal.active .layer-2 {
        transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.25s;
        transform: translate3d(60px, 60px, 0px) rotateY(-10deg) rotateX(10deg);
    }

    .reveal.active .layer-3 {
        transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.4s;
        transform: translate3d(120px, 120px, -50px) rotateY(-10deg) rotateX(10deg);
    }

    .reveal.active .layer-4 {
        transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.55s;
        transform: translate3d(180px, 180px, -100px) rotateY(-10deg) rotateX(10deg);
    }

    .layer-num {
        font-size: 5rem;
        font-weight: 900;
        line-height: 1;
        margin-bottom: 10px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: var(--primary-navy);
    }

    .layer-1 .layer-num {
        color: #fff;
    }

    .layer-label {
        font-size: 0.9rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 2px;
        opacity: 0.8;
        color: var(--primary-navy);
    }

    .layer-1 .layer-label {
        color: #fff;
    }

    .layer-icon {
        position: absolute;
        top: 30px;
        right: 30px;
        font-size: 1.5rem;
        opacity: 0.5;
        color: var(--primary-navy);
    }

    .layer-1 .layer-icon {
        color: #fff;
    }

    /* Floating Particles */
    .floating-particle {
        position: absolute;
        background: var(--accent-gold);
        border-radius: 50%;
        opacity: 0.3;
        z-index: -1;
        animation: float 10s infinite ease-in-out;
    }

    @keyframes float {

        0%,
        100% {
            transform: translate(0, 0);
        }

        50% {
            transform: translate(20px, -20px);
        }
    }

    /* --- SINGLE UNIFIED MOBILE OVERRIDE (991px) --- */
    @media (max-width: 991px) {
        body { overflow-x: hidden !important; }

        .about-section {
            padding: 80px 0 50px !important;
            overflow-x: hidden !important;
        }

        .about-container {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 20px !important;
            text-align: center !important;
        }

        .about-content-nexus {
            margin-bottom: 50px !important;
        }

        .nexus-eyebrow {
            transform: none !important;
            position: static !important;
            display: block !important;
            margin: 0 auto 20px !important;
            text-align: center !important;
            letter-spacing: 3px !important;
        }

        .about-content-nexus h2 {
            font-size: 20px !important;
            padding-left: 0 !important;
            text-align: center !important;
            font-weight: 300 !important;
        }

        .about-content-nexus h2 span {
            font-size: 0.9rem !important;
            letter-spacing: 5px !important;
            font-weight: 300 !important;
        }

        h2 {
            font-weight: 300 !important;
            font-size: 20px !important;
        }

        .about-nexus-desc {
            padding-left: 0 !important;
            margin: 0 auto 30px !important;
            font-size: 1rem !important;
            text-align: center !important;
            border-left: none !important;
        }

        .about-nexus-desc::before { display: none !important; }

        .nexus-cta {
            margin-left: 0 !important;
        }

        .btn-nexus {
            width: 100% !important;
            max-width: 280px !important;
            justify-content: center !important;
            padding: 15px 30px !important;
            font-size: 0.8rem !important;
        }

        /* Identity Stack to Horizontal Scroll */
        .identity-stack-visual {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            height: auto !important;
            padding: 20px 20px 40px !important;
            margin: 0 -20px !important;
            perspective: none !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 20px !important;
        }

        .identity-stack-visual::-webkit-scrollbar {
            display: none !important;
        }

        .stack-layer {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            flex: 0 0 260px !important;
            height: 320px !important;
            transform: none !important;
            scroll-snap-align: center !important;
            margin: 0 !important;
            box-shadow: 0 20px 40px rgba(9, 28, 71, 0.1) !important;
            border-radius: 20px !important;
        }

        .layer-num {
            font-size: 3rem !important;
        }

        .layer-label {
            font-size: 0.8rem !important;
        }
    }
</style>
<section class="about-section reveal">
<!-- Floating Particles -->
<div class="floating-particle" style="width: 100px; height: 100px; top: 10%; left: 5%;"></div>
<div class="floating-particle" style="width: 150px; height: 150px; bottom: 10%; right: 5%; animation-delay: -2s;">
</div>
<div class="container about-container">
<!-- LEFTcontent NEXUS -->
<div class="about-content-nexus reveal-left">
<span class="nexus-eyebrow">Digital Architects</span>
<h2>YGR Gobal <span>Excellence Hub</span></h2>
<p class="about-nexus-desc">
                We don't just build software; we engineer the future of digital identity. YGR Gobal is where technical
                precision meets creative vision to define the next era of enterprise solutions.
            </p>
<div class="nexus-cta">
<a class="btn-nexus" href="/aboutus/">
                    Our Full Story <i class="fas fa-long-arrow-alt-right"></i>
</a>
</div>
</div>
<!-- RIGHT IDENTITY STACK -->
<div class="identity-stack-visual reveal-right">
<!-- Layer 1: Core Legacy -->
<div class="stack-layer layer-1">
<i class="fas fa-award layer-icon"></i>
<span class="layer-num counter" data-count="5">0</span>
<span class="layer-label">Years of <br/> Industry Legacy</span>
</div>
<!-- Layer 2: Projects -->
<div class="stack-layer layer-2">
<i class="fas fa-rocket layer-icon" style="color: #091c47;"></i>
<span class="layer-num counter" data-count="98" style="color: #091c47;">0</span>
<span class="layer-label">Mission Critical <br/> Projects</span>
</div>
<!-- Layer 3: Partners -->
<div class="stack-layer layer-3">
<i class="fas fa-handshake layer-icon" style="color: #091c47;"></i>
<span class="layer-num counter" data-count="97" style="color: #091c47;">0</span>
<span class="layer-label">Global Strategic <br/> Partners</span>
</div>
<!-- Layer 4: Regions -->
<div class="stack-layer layer-4">
<i class="fas fa-globe-americas layer-icon" style="color: #091c47;"></i>
<span class="layer-num counter" data-count="4" style="color: #091c47;">0</span>
<span class="layer-label">Intercontinental <br/> Market Regions</span>
</div>
</div>
</div>
</section>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const nexusCounters = document.querySelectorAll('.counter');

        const animateNexusCount = (counter) => {
            const target = +counter.getAttribute('data-count');
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        };

        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('counter')) {
                        animateNexusCount(entry.target);
                    }
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        nexusCounters.forEach(counter => counterObserver.observe(counter));
    });
</script>`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalHomeAbout;
