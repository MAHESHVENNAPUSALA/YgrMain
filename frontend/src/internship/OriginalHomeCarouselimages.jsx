import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalHomeCarouselimages = () => {
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
/* ================= PREMIUM CAROUSEL ================= */
.ygr-carousel {
    position: relative;
    z-index: 1;
    overflow: hidden;
}

.ygr-carousel .carousel-item {
    height: 650px; /* Modern compact height for laptop and desktop */
    overflow: hidden;
    background: #000;
}

.ygr-carousel .carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    transition: transform 6s ease;
    filter: brightness(0.6) contrast(1.1); /* Slightly darker for outstanding text legibility */
}

.ygr-carousel .carousel-item.active img {
    transform: scale(1.1);
}

/* Gradient Overlay */
.ygr-carousel .carousel-item::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
    z-index: 1;
}

/* Caption Styling */
.ygr-carousel .carousel-caption {
    top: 50%;
    transform: translateY(-50%);
    bottom: auto;
    z-index: 5;
    text-align: center;
    max-width: 800px;
    left: 50%;
    right: auto;
    transform: translate(-50%, -50%);
}

.ygr-carousel .carousel-caption h1 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 2.8rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: -1px;
    line-height: 1.1;
    margin-bottom: 20px;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s;
}

.ygr-carousel .carousel-item.active .carousel-caption h1 {
    opacity: 1;
    transform: translateY(0);
}

.ygr-carousel .carousel-caption p {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 40px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s;
}

.ygr-carousel .carousel-item.active .carousel-caption p {
    opacity: 1;
    transform: translateY(0);
}

.ygr-carousel .carousel-caption .btn-premium {
    padding: 16px 40px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 50px;
    background: linear-gradient(135deg, #fbcc27, #f39c12);
    color: #091c47;
    border: none;
    box-shadow: 0 10px 25px rgba(251, 204, 39, 0.4);
    transition: all 0.3s ease;
    display: inline-block;
}

.ygr-carousel .carousel-item.active .carousel-caption .btn-premium,
.ygr-carousel .carousel-item.active .carousel-caption .btn-outline-light {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.7s;
}

.ygr-carousel .carousel-caption .btn-premium:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(251, 204, 39, 0.5);
    background: linear-gradient(135deg, #f39c12, #fbcc27);
}

/* Glassmorphism Controls */
.ygr-carousel .carousel-control-prev,
.ygr-carousel .carousel-control-next {
    width: 65px;
    height: 65px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    border-radius: 50%;
    opacity: 0;
    margin: 0 40px;
    transition: all 0.4s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.ygr-carousel:hover .carousel-control-prev,
.ygr-carousel:hover .carousel-control-next {
    opacity: 1;
}

.ygr-carousel .carousel-control-prev:hover,
.ygr-carousel .carousel-control-next:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #fbcc27;
    color: #fbcc27;
}

/* Indicators */
.ygr-carousel .carousel-indicators {
    bottom: 50px;
    z-index: 10;
}

.ygr-carousel .carousel-indicators [data-bs-target] {
    width: 40px;
    height: 4px;
    border-radius: 2px;
    margin: 0 6px;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    transition: all 0.4s ease;
}

.ygr-carousel .carousel-indicators .active {
    background-color: #fbcc27;
    width: 60px;
}

/* Unified Mobile Overrides (991px) */
@media (max-width: 991px) {
    .ygr-carousel .carousel-item { 
        height: 550px !important; 
        min-height: auto !important; 
    }

    .ygr-carousel .carousel-caption {
        width: 90% !important;
        padding: 0 !important;
    }

    .ygr-carousel .carousel-caption h1 {
        font-size: 20px;
        line-height: 1.2 !important;
        margin-bottom: 15px !important;
        letter-spacing: 0 !important;
    }

    .ygr-carousel .carousel-caption p {
        font-size: 0.95rem !important;
        line-height: 1.6 !important;
        margin-bottom: 30px !important;
        color: rgba(255,255,255,0.9) !important;
    }

    .ygr-carousel .carousel-btns {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        gap: 15px !important;
    }

    .ygr-carousel .carousel-caption .btn-premium {
        padding: 14px 30px !important;
        font-size: 0.85rem !important;
        width: 100% !important;
        max-width: 280px !important;
    }

    .ygr-carousel .carousel-caption .btn-outline-light {
        margin-left: 0 !important;
        width: 100% !important;
        max-width: 280px !important;
        padding: 12px 30px !important;
        font-size: 0.85rem !important;
    }

    .ygr-carousel .carousel-control-prev,
    .ygr-carousel .carousel-control-next {
        display: none !important;
    }

    .ygr-carousel .carousel-indicators {
        bottom: 30px !important;
    }

    .ygr-carousel .carousel-indicators [data-bs-target] {
        width: 30px !important;
    }
}
</style>
<div class="carousel slide carousel-fade ygr-carousel" data-bs-interval="6000" data-bs-ride="carousel" id="ygrCarousel">
<div class="carousel-indicators">
<button aria-current="true" aria-label="Slide 1" class="active" data-bs-slide-to="0" data-bs-target="#ygrCarousel" type="button"></button>
<button aria-label="Slide 2" data-bs-slide-to="1" data-bs-target="#ygrCarousel" type="button"></button>
<button aria-label="Slide 3" data-bs-slide-to="2" data-bs-target="#ygrCarousel" type="button"></button>
<button aria-label="Slide 4" data-bs-slide-to="3" data-bs-target="#ygrCarousel" type="button"></button>
<button aria-label="Slide 5" data-bs-slide-to="4" data-bs-target="#ygrCarousel" type="button"></button>
<button aria-label="Slide 6" data-bs-slide-to="5" data-bs-target="#ygrCarousel" type="button"></button>
<button aria-label="Slide 7" data-bs-slide-to="6" data-bs-target="#ygrCarousel" type="button"></button>
</div>
<div class="carousel-inner">
<!-- PREMIUM SLIDE 1: Web Design -->
<div class="carousel-item active">
<img alt="Web Design Services" class="d-block w-100" src="/images/web_design_carousel.png"/>
<div class="carousel-caption">
<h1>Premium <br/> Web Design</h1>
<p>Craft stunning, user-centric, and award-winning corporate websites that redefine your brand's digital identity.</p>
<div class="carousel-btns">
<a class="btn btn-premium" href="/services?type=web">Web Design</a>
<a class="btn btn-outline-light ms-3 rounded-pill px-4 py-2 fw-bold" href="/contact">Get In Touch</a>
</div>
</div>
</div>
<!-- PREMIUM SLIDE 2: Web Apps -->
<div class="carousel-item">
<img alt="Web Application Development" class="d-block w-100" src="/images/web_apps_carousel.png"/>
<div class="carousel-caption">
<h1>Enterprise <br/> Web Applications</h1>
<p>Develop custom, high-performance web applications, robust APIs, and scalable full-stack software solutions.</p>
<div class="carousel-btns">
<a class="btn btn-premium" href="/services?type=webapp">Web Apps</a>
<a class="btn btn-outline-light ms-3 rounded-pill px-4 py-2 fw-bold" href="/contact">Get In Touch</a>
</div>
</div>
</div>
<!-- PREMIUM SLIDE 3: Mobile Apps -->
<div class="carousel-item">
<img alt="Mobile App Development" class="d-block w-100" src="/images/mobile_apps_carousel.png"/>
<div class="carousel-caption">
<h1>Next-Gen <br/> Mobile Apps</h1>
<p>Deliver immersive, native-grade Android and iOS application experiences with high-speed performance.</p>
<div class="carousel-btns">
<a class="btn btn-premium" href="/services?type=mobile">Mobile Apps</a>
<a class="btn btn-outline-light ms-3 rounded-pill px-4 py-2 fw-bold" href="/contact">Get In Touch</a>
</div>
</div>
</div>
<!-- PREMIUM SLIDE 4: Marketing -->
<div class="carousel-item">
<img alt="Digital Marketing" class="d-block w-100" src="/images/marketing_carousel.png"/>
<div class="carousel-caption">
<h1>Digital Marketing <br/> &amp; Growth</h1>
<p>Boost organic search visibility, execute highly-targeted campaigns, and maximize branding ROI.</p>
<div class="carousel-btns">
<a class="btn btn-premium" href="/services?type=dm">Marketing</a>
<a class="btn btn-outline-light ms-3 rounded-pill px-4 py-2 fw-bold" href="/contact">Get In Touch</a>
</div>
</div>
</div>
<!-- PREMIUM SLIDE 5: UI / UX -->
<div class="carousel-item">
<img alt="UI / UX Creative Design" class="d-block w-100" src="/images/uiux_carousel.png"/>
<div class="carousel-caption">
<h1>UI / UX <br/> Creative Design</h1>
<p>Architect user-friendly journeys, modern layouts, interactive prototypes, and beautiful digital wireframes.</p>
<div class="carousel-btns">
<a class="btn btn-premium" href="/services?type=uiux">UI / UX</a>
<a class="btn btn-outline-light ms-3 rounded-pill px-4 py-2 fw-bold" href="/contact">Get In Touch</a>
</div>
</div>
</div>
<!-- PREMIUM SLIDE 6: Testing -->
<div class="carousel-item">
<img alt="Software Testing &amp; Automation" class="d-block w-100" src="/images/testing_carousel.png"/>
<div class="carousel-caption">
<h1>Software Testing <br/> &amp; Automation</h1>
<p>Ensure zero flaws and ultra-high reliability with QA testing, automated test suites, and bug detection.</p>
<div class="carousel-btns">
<a class="btn btn-premium" href="/services?type=testing">Testing</a>
<a class="btn btn-outline-light ms-3 rounded-pill px-4 py-2 fw-bold" href="/contact">Get In Touch</a>
</div>
</div>
</div>
<!-- PREMIUM SLIDE 7: Support -->
<div class="carousel-item">
<img alt="Technical Support &amp; Maintenance" class="d-block w-100" src="/images/support_carousel.png"/>
<div class="carousel-caption">
<h1>24/7 IT Support <br/> &amp; Maintenance</h1>
<p>Maximize server uptime, protect data backups, and keep your software environment fast and secure.</p>
<div class="carousel-btns">
<a class="btn btn-premium" href="/services?type=support">Support</a>
<a class="btn btn-outline-light ms-3 rounded-pill px-4 py-2 fw-bold" href="/contact">Get In Touch</a>
</div>
</div>
</div>
</div>
<button class="carousel-control-prev" data-bs-slide="prev" data-bs-target="#ygrCarousel" type="button">
<span aria-hidden="true" class="carousel-control-prev-icon"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" data-bs-slide="next" data-bs-target="#ygrCarousel" type="button">
<span aria-hidden="true" class="carousel-control-next-icon"></span>
<span class="visually-hidden">Next</span>
</button>
</div>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalHomeCarouselimages;
