import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalHomeTestimonials = () => {
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

        // Fetch dynamic testimonials
        fetch('/api/public/testimonials/')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0 && containerRef.current) {
                    const tracks = containerRef.current.querySelectorAll('.tst-marquee-track');
                    if (tracks.length > 0) {
                        tracks.forEach(track => {
                            track.innerHTML = ''; // clear hardcoded
                            data.forEach(t => {
                                const card = document.createElement('div');
                                card.className = 'tst-card';
                                card.innerHTML = `
                                    <div class="tst-quote-icon">"</div>
                                    <div class="tst-top">
                                        <div class="tst-stars">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                        </div>
                                        <div class="tst-content">
                                            "${t.message}"
                                        </div>
                                    </div>
                                    <div class="tst-client">
                                        <div class="tst-avatar">
                                            ${t.client_name ? t.client_name.charAt(0) : ''}
                                        </div>
                                        <div class="tst-info">
                                            <h6>${t.client_name}</h6>
                                            <p>${t.company_name} &bull; ${t.country}</p>
                                        </div>
                                    </div>
                                `;
                                track.appendChild(card);
                                
                                // Re-attach click listeners for new cards
                                card.addEventListener('click', (e) => {
                                    e.stopPropagation();
                                    const marqueeWrapper = containerRef.current.querySelector('.tst-marquee-wrapper');
                                    const allCards = containerRef.current.querySelectorAll('.tst-card');
                                    const isAlreadyPaused = card.classList.contains('tst-card-paused');
                                    
                                    allCards.forEach(c => c.classList.remove('tst-card-paused'));
                                    if(marqueeWrapper) marqueeWrapper.classList.remove('tst-paused');
                                    
                                    if (!isAlreadyPaused) {
                                        card.classList.add('tst-card-paused');
                                        if(marqueeWrapper) marqueeWrapper.classList.add('tst-paused');
                                    }
                                });
                            });
                        });
                    }
                }
            })
            .catch(err => console.error('Testimonials fetch error:', err));

        return () => document.removeEventListener('click', handleLinkClick);
    }, [navigate]);

    const rawHTML = `<style>
  /* ===================================================
     ULTRA-PREMIUM TESTIMONIALS
  =================================================== */
  :root {
    --tst-bg: #ffffff;
    --tst-navy: #091c47;
    --tst-accent: #fbcc27;
    --tst-text-muted: #64748b;
    --tst-font: 'Plus Jakarta Sans', sans-serif;
    --tst-glass: rgba(255, 255, 255, 0.7);
    --tst-gap: 35px;
  }

  .tst-section {
    font-family: var(--tst-font);
    background: var(--tst-bg);
    padding: 70px 0;
    position: relative;
    overflow: hidden;
}

  /* Animated Background Elements */
  .tst-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    z-index: 0;
    animation: tst-float 15s infinite alternate ease-in-out;
  }
  .tst-orb-1 {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(251, 204, 39, 0.15), transparent);
    top: -200px;
    left: -200px;
  }
  .tst-orb-2 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(9, 28, 71, 0.08), transparent);
    bottom: -150px;
    right: -100px;
    animation-delay: -5s;
  }

  @keyframes tst-float {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(50px, 30px) scale(1.1); }
  }

  .tst-container {
    position: relative;
    z-index: 2;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 5%;
  }

  /* Header Section */
  .tst-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .tst-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(251, 204, 39, 0.15);
    color: #b48a04;
    padding: 6px 16px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 15px;
    border: 1px solid rgba(251, 204, 39, 0.3);
  }

  .tst-header h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--tst-navy);
    line-height: 1.2;
    margin-bottom: 15px;
    letter-spacing: -1px;
  }

  .tst-header p {
    font-size: 1.05rem;
    color: var(--tst-text-muted);
    max-width: 650px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* Marquee Layout */
  .tst-marquee-wrapper {
    display: flex;
    overflow: hidden;
    gap: var(--tst-gap);
    padding: 20px 0;
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  }

  .tst-marquee-track {
    display: flex;
    gap: var(--tst-gap);
    animation: tst-scroll 35s linear infinite;
    flex-shrink: 0;
  }

  @media (hover: hover) {
    .tst-marquee-wrapper:hover .tst-marquee-track {
      animation-play-state: paused;
    }
  }

  @keyframes tst-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(calc(-100% - var(--tst-gap))); }
  }

  /* Premium Card Design */
  .tst-card {
    width: 320px;
    background: var(--tst-glass);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: 20px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }

  /* Hover Gradient Border Effect */
  .tst-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 30px;
    padding: 2px; /* Border thickness */
    background: linear-gradient(135deg, var(--tst-accent), var(--tst-navy));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .tst-card:hover {
    transform: translateY(-15px);
    box-shadow: 0 40px 80px rgba(9, 28, 71, 0.1);
    background: #ffffff;
  }

  .tst-card:hover::before {
    opacity: 1;
  }

  .tst-quote-icon {
    position: absolute;
    top: -10px;
    right: 20px;
    font-size: 6rem;
    color: rgba(9, 28, 71, 0.03);
    pointer-events: none;
    font-family: serif;
    line-height: 1;
    z-index: 0;
  }

  .tst-stars {
    display: flex;
    gap: 4px;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
  }

  .tst-stars i {
    color: var(--tst-accent);
    font-size: 1.1rem;
    filter: drop-shadow(0 2px 4px rgba(251, 204, 39, 0.4));
  }

  .tst-content {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #1e293b;
    margin-bottom: 20px;
    font-weight: 500;
    position: relative;
    z-index: 1;
    font-style: italic;
  }

  .tst-client {
    display: flex;
    align-items: center;
    gap: 15px;
    position: relative;
    z-index: 1;
    border-top: 1px solid rgba(0,0,0,0.05);
    padding-top: 20px;
  }

  .tst-avatar {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--tst-navy) 0%, #1e293b 100%);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1rem;
    box-shadow: 0 5px 15px rgba(9, 28, 71, 0.15);
    flex-shrink: 0;
  }

  .tst-info h6 {
    margin: 0 0 2px 0;
    font-size: 1rem;
    font-weight: 800;
    color: var(--tst-navy);
    letter-spacing: -0.5px;
  }

  .tst-info p {
    margin: 0;
    font-size: 0.75rem;
    color: var(--tst-text-muted);
    font-weight: 600;
  }

  /* --- SINGLE UNIFIED MOBILE OVERRIDE (991px) --- */
  @media (max-width: 991px) {
    body { overflow-x: hidden !important; }

    .tst-section {
        padding: 40px 0 !important;
    }

    .tst-header {
        margin-bottom: 30px !important;
        padding: 0 10px !important;
    }

    .tst-header h2 {
        font-size: 1.6rem !important;
        line-height: 1.2 !important;
    }

    .tst-header p {
        font-size: 0.95rem !important;
        line-height: 1.5 !important;
    }

    :root {
        --tst-gap: 15px !important;
    }

    .tst-marquee-wrapper {
        padding: 10px 0 !important;
    }

    .tst-card {
        width: 260px !important;
        padding: 20px !important;
        border-radius: 16px !important;
    }

    .tst-content {
        font-size: 0.85rem !important;
        margin-bottom: 15px !important;
    }

    .tst-client {
        padding-top: 15px !important;
    }

    .tst-avatar {
        width: 32px !important;
        height: 32px !important;
        font-size: 0.85rem !important;
    }

    .tst-info h6 {
        font-size: 0.9rem !important;
    }

    .tst-info p {
        font-size: 0.65rem !important;
    }
  }

  .tst-marquee-wrapper.tst-paused .tst-marquee-track {
    animation-play-state: paused !important;
  }

  .tst-card.tst-card-paused {
    transform: translateY(-10px) !important;
    background: #ffffff !important;
    box-shadow: 0 30px 60px rgba(9, 28, 71, 0.15) !important;
    border: 1px solid var(--tst-accent) !important;
  }
</style>
<section class="tst-section">
<!-- Background Orbs -->
<div class="tst-orb tst-orb-1"></div>
<div class="tst-orb tst-orb-2"></div>
<div class="tst-container">
<!-- Header -->
<div class="tst-header">
<div class="tst-badge">
<i class="fas fa-star"></i> Client Success Stories
      </div>
<h2>Trusted by Visionary Leaders</h2>
<p>Discover how our cutting-edge IT solutions and dedicated partnership have transformed businesses and driven exceptional growth across industries.</p>
</div>
<!-- Marquee -->
<div class="tst-marquee-wrapper">
<!-- Original Set -->
<div class="tst-marquee-track">
<div class="tst-card">
<div class="tst-quote-icon">"</div>
<div class="tst-top">
<div class="tst-stars">
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
</div>
<div class="tst-content">
              ""
            </div>
</div>
<div class="tst-client">
<div class="tst-avatar">
</div>
<div class="tst-info">
<h6></h6>
<p> • </p>
</div>
</div>
</div>
<div class="tst-card">
<div class="tst-quote-icon">"</div>
<div class="tst-top">
<div class="tst-stars">
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
</div>
<div class="tst-content">
              ""
            </div>
</div>
<div class="tst-client">
<div class="tst-avatar">
</div>
<div class="tst-info">
<h6></h6>
<p> • </p>
</div>
</div>
</div>
</div>
<!-- Duplicate for Infinite Loop -->
<div aria-hidden="true" class="tst-marquee-track">
<div class="tst-card">
<div class="tst-quote-icon">"</div>
<div class="tst-top">
<div class="tst-stars">
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
</div>
<div class="tst-content">
              ""
            </div>
</div>
<div class="tst-client">
<div class="tst-avatar">
</div>
<div class="tst-info">
<h6></h6>
<p> • </p>
</div>
</div>
</div>
<div class="tst-card">
<div class="tst-quote-icon">"</div>
<div class="tst-top">
<div class="tst-stars">
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
</div>
<div class="tst-content">
              ""
            </div>
</div>
<div class="tst-client">
<div class="tst-avatar">
</div>
<div class="tst-info">
<h6></h6>
<p> • </p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const marqueeWrapper = document.querySelector('.tst-marquee-wrapper');
    const cards = document.querySelectorAll('.tst-card');

    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate body click trigger
        const isAlreadyPaused = card.classList.contains('tst-card-paused');
        
        // Remove paused state from all cards
        cards.forEach(c => c.classList.remove('tst-card-paused'));
        marqueeWrapper.classList.remove('tst-paused');

        // Toggle pause for the clicked card
        if (!isAlreadyPaused) {
          card.classList.add('tst-card-paused');
          marqueeWrapper.classList.add('tst-paused');
        }
      });
    });

    // Resume when mouse leaves the marquee wrapper (Desktop)
    marqueeWrapper.addEventListener('mouseleave', () => {
      cards.forEach(c => c.classList.remove('tst-card-paused'));
      marqueeWrapper.classList.remove('tst-paused');
    });

    // Resume when clicking/tapping anywhere outside the testimonials (Mobile & Desktop)
    document.addEventListener('click', (e) => {
      if (!marqueeWrapper.contains(e.target)) {
        cards.forEach(c => c.classList.remove('tst-card-paused'));
        marqueeWrapper.classList.remove('tst-paused');
      }
    });
  });
</script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalHomeTestimonials;
