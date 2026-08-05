import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TeamList.css';


const TeamList = () => {

    const [activeTeam, setActiveTeam] = useState('mgmt');
    const [teamMembers, setTeamMembers] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/api/public/team/')
            .then(r => r.json())
            .then(data => setTeamMembers(data))
            .catch(err => console.error('Team API error:', err));

        fetch('/api/public/events/')
            .then(r => r.json())
            .then(data => {
                let paddedEvents = [...data];
                let count = 0;
                while (paddedEvents.length > 0 && paddedEvents.length < 3) {
                    paddedEvents.push({ ...data[count % data.length], id: 'padded-' + count });
                    count++;
                }
                setEvents(paddedEvents);
            })
            .catch(err => console.error('Events API error:', err));
    }, []);

    useEffect(() => {
        // Cinerama Logic
        const items = document.querySelectorAll('.cinerama-item');
        if (items.length === 0) return;
        
        let centerIndex = 0;
        let cineramaInterval;

        function updateCinerama() {
            const isMobile = window.innerWidth <= 991;
            const offset = isMobile ? 300 : 500;

            items.forEach((item, i) => {
                let diff = i - centerIndex;
                if (diff > items.length / 2) diff -= items.length;
                if (diff < -items.length / 2) diff += items.length;

                let x = diff * offset;
                let z = diff === 0 ? (isMobile ? 150 : 300) : -250;
                let r = diff * -20;
                let scale = diff === 0 ? 1.1 : 0.85;
                let opacity = Math.abs(diff) > 1 && isMobile ? 0 : (Math.abs(diff) > 2 ? 0 : 1);

                item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${r}deg) scale(${scale})`;
                item.style.opacity = opacity;
                item.style.zIndex = 100 - Math.abs(diff);
                item.classList.toggle('active', diff === 0);
            });
        }

        let userPaused = false;
        function stopCineramaTimer() { clearInterval(cineramaInterval); userPaused = true; }
        window.stopCineramaTimer = stopCineramaTimer;
        
        window.prevCinerama = function() {
            stopCineramaTimer();
            if (items.length > 0) {
                centerIndex = (centerIndex - 1 + items.length) % items.length;
                updateCinerama();
            }
        };

        window.nextCinerama = function() {
            stopCineramaTimer();
            if (items.length > 0) {
                centerIndex = (centerIndex + 1) % items.length;
                updateCinerama();
            }
        };

        window.selectCinerama = function(idx) {
            stopCineramaTimer();
            if (idx === centerIndex) {
                const imgSrc = items[idx].querySelector('img').src;
                // openZoomModal(imgSrc); // If you have a modal
            } else {
                centerIndex = idx;
                updateCinerama();
            }
        };

        function startCineramaTimer() {
            cineramaInterval = setInterval(() => {
                if (items.length > 0) {
                    centerIndex = (centerIndex + 1) % items.length;
                    updateCinerama();
                }
            }, 5000);
        }

        const stage = document.querySelector('.cinerama-stage');
        if (stage) {
            stage.addEventListener('mouseenter', () => clearInterval(cineramaInterval));
            stage.addEventListener('mouseleave', () => {
                if (!userPaused) startCineramaTimer();
            });
        }

        updateCinerama();
        startCineramaTimer();

        return () => clearInterval(cineramaInterval);
    }, [events]);

    useEffect(() => {
        // Counter Logic
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
        
        return () => {
            panels.forEach(p => statObserver.unobserve(p));
        };
    }, []);


    return (
        <>
            {/* Converted from Django Template */}
            

    

    
    <section className="team-hero">

        <div className="cinerama-stage">
            
            <button type="button" className="cinerama-control prev-btn" onClick={() => window.prevCinerama && window.prevCinerama()} aria-label="Previous">
                <i className="fas fa-chevron-left"></i>
            </button>

            <div className="cinerama-track" id="cinerama-track">
                
                {events.length > 0 ? events.map((ev, index) => (
                    <div className="cinerama-item" key={ev.id} onClick={() => window.selectCinerama && window.selectCinerama(index)}>
                        <img src={ev.image || "/images/placeholder.jpg"} alt="Team Scene" />
                    </div>
                )) : (
                    <>
                        <div className="cinerama-item" onClick={() => window.selectCinerama && window.selectCinerama(0)}>
                            <img src="/images/placeholder.jpg" alt="Team Scene" />
                        </div>
                        <div className="cinerama-item" onClick={() => window.selectCinerama && window.selectCinerama(1)}>
                            <img src="/images/placeholder.jpg" alt="Team Scene" />
                        </div>
                        <div className="cinerama-item" onClick={() => window.selectCinerama && window.selectCinerama(2)}>
                            <img src="/images/placeholder.jpg" alt="Team Scene" />
                        </div>
                    </>
                )}
                
            </div>

            <button type="button" className="cinerama-control next-btn" onClick={() => window.nextCinerama && window.nextCinerama()} aria-label="Next">
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    </section>


    <section className="stats-section">
        
        <div className="stat-orb stat-orb-1"></div>
        <div className="stat-orb stat-orb-2"></div>

        <div className="container-fluid px-lg-5 px-3 stats-container">
            <div className="stats-header-theatre">
                <div className="stat-badge">
                    <i className="fas fa-chart-line"></i> Our Impact
                </div>
                <h2>The Global Footprint</h2>
                <p>Our metrics of success reflect our relentless dedication to delivering world-class IT solutions and
                    transformative growth.</p>
            </div>

            <div className="stats-theatre-grid">
                
                <div className="stat-panel">
                    <i className="fas fa-users stat-watermark"></i>
                    <div className="stat-icon-wrapper">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-num-wrapper">
                        <span className="stat-num counter" data-count="97">0</span>
                        <span className="stat-plus">+</span>
                    </div>
                    <span className="stat-desc">Active Clients</span>
                </div>

                
                <div className="stat-panel">
                    <i className="fas fa-layer-group stat-watermark"></i>
                    <div className="stat-icon-wrapper">
                        <i className="fas fa-layer-group"></i>
                    </div>
                    <div className="stat-num-wrapper">
                        <span className="stat-num counter" data-count="98">0</span>
                        <span className="stat-plus">+</span>
                    </div>
                    <span className="stat-desc">Projects Delivered</span>
                </div>

                
                <div className="stat-panel">
                    <i className="fas fa-medal stat-watermark"></i>
                    <div className="stat-icon-wrapper">
                        <i className="fas fa-medal"></i>
                    </div>
                    <div className="stat-num-wrapper">
                        <span className="stat-num counter" data-count="5">0</span>
                        <span className="stat-plus">+</span>
                    </div>
                    <span className="stat-desc">Years Expertise</span>
                </div>

                
                <div className="stat-panel">
                    <i className="fas fa-earth-americas stat-watermark"></i>
                    <div className="stat-icon-wrapper">
                        <i className="fas fa-earth-americas"></i>
                    </div>
                    <div className="stat-num-wrapper">
                        <span className="stat-num counter" data-count="4">0</span>
                        <span className="stat-plus">+</span>
                    </div>
                    <span className="stat-desc">Market Regions</span>
                </div>
            </div>
        </div>
    </section>



    

    <section className="director-kinetic-sec reverse-layout reveal">
        <div className="kinetic-container">
            <div className="kinetic-content">
                <h1>Chairman
                </h1>
                <h2>Driving Excellence & Growth</h2>
                

                <div className="executive-summary">
                    <p>We provide professional IT services including Website Development, Web
                        Applications, Mobile Applications, and Digital Marketing solutions. Our goal is to deliver
                        quality services that help businesses grow and succeed in the digital world.

                        We are committed to innovation, customer satisfaction, and building long-term relationships with
                        our clients. Thank you for your trust and support.</p>
                    <div className="signature-box">

                        <div className="sig-line"></div>
                        <div className="sig-name">Y.Varalakshmi</div>
                    </div>
                </div>
            </div>

            <div className="kinetic-stack">
                <div className="outline-bg-text">OPERATIONS</div>

                
                <div className="stack-card card-main">
                    <img src="/images/yg.jpeg" alt="Y.Vara Lakshmi" />
                </div>
            </div>
        </div>
    </section>


    <section className="director-kinetic-sec reveal">
        <div className="kinetic-container">
            <div className="kinetic-stack">
                <div className="outline-bg-text">LEADERSHIP</div>

                
                <div className="stack-card card-main">
                    <img src="/images/rr.jpeg" alt="Y. Ravindra Reddy" />
                </div>
            </div>

            <div className="kinetic-content">
                <h4>Director's Message</h4>
                <h2>Architect of Innovation</h2>

                <div className="executive-summary">
                    <p>We started our journey with a vision to empower individuals and businesses
                        through technology,
                        innovation, and quality services. With dedication, hard work, and continuous growth,

                        we have built a platform that provides professional IT training and reliable technology
                        solutions. <br />Our commitment is to deliver excellence, create opportunities, and support our
                        students and clients in achieving success. We thank everyone who has been part of our journey
                        and trusted us throughout our growth. <br />Together, let us build a smarter future with
                        technology.</p>

                    <div className="signature-box">

                        <div className="sig-line"></div>
                        <div className="sig-name">Y. Ravindra Reddy</div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section className="director-kinetic-sec reverse-layout reveal">
        <div className="kinetic-container">
            <div className="kinetic-content">
                <h4>General Manager Message</h4>
                <h2>Driving Operational Excellence</h2>

                <div className="executive-summary">
                    <p>As the General Manager of our organization, I am proud to lead a dedicated
                        team committed to excellence, innovation, and customer satisfaction. Our mission is to provide
                        high-quality services while building strong relationships with our clients and community. We
                        continuously strive to create new opportunities, maintain professional standards, and deliver
                        the best possible experience to everyone associated with our company.</p>
                    <div className="signature-box">

                        <div className="sig-line"></div>
                        <div className="sig-name">Y.Suneetha Reddy</div>
                    </div>
                </div>
            </div>

            <div className="kinetic-stack">
                <div className="outline-bg-text">OPERATIONS</div>

                
                <div className="stack-card card-main">
                    <img src="/images/su.jpeg" alt="Suneetha Reddy" />
                </div>
            </div>
        </div>
    </section>


    
    <div className="team-nav-outer">
        <div className="team-toggle">
            <button className={`toggle-btn ${activeTeam === 'mgmt' ? 'active' : ''}`} onClick={() => setActiveTeam('mgmt')}>Executive Board</button>
            <button className={`toggle-btn ${activeTeam === 'team' ? 'active' : ''}`} onClick={() => setActiveTeam('team')}>Creative Core</button>
        </div>
    </div>

    
    <section className="team-section">
        <div className={`team-grid ${activeTeam === 'mgmt' ? 'active' : ''}`} id="grid-mgmt">
            <div className="member-card">
                <div className="member-img-wrap">
                    <img src="/images/yg.jpeg" alt="Y.Vara Lakshmi" />
                </div>
                <div className="member-info">
                    <h3>Y.Vara Lakshmi</h3>
                    <p>Chairman</p>

                </div>
            </div> 
                 <div className="member-card">
                <div className="member-img-wrap">
                    <img src="/images/rr1.jpeg" alt="Y. Ravindra Reddy" />

                </div>
                <div className="member-info">
                    <h3>Y. Ravindra Reddy</h3>
                    <p>Director & CEO</p>

                </div>
            </div>

            <div className="member-card">
                <div className="member-img-wrap">
                    <img src="/images/su1.jpeg" alt="Suneetha Reddy" />
                </div>
                <div className="member-info">
                    <h3>Suneetha Reddy</h3>
                    <p>General Manager</p>

                </div>
            </div>
            
        </div>



        <div className={`team-grid ${activeTeam === 'team' ? 'active' : ''}`} id="grid-team">
            {teamMembers.length > 0 ? (
                teamMembers.map(member => (
                    <div className="member-card" key={member.id}>
                        <div className="member-img-wrap">
                            <img src={member.image || '/images/placeholder.jpg'} alt={member.name} />
                        </div>
                        <div className="member-info">
                            <h3>{member.name}</h3>
                            <p>{member.role}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div style={{textAlign: 'center', width: '100%', gridColumn: '1/-1', padding: '50px'}}>
                    <p style={{color: 'var(--text-slate)', fontWeight: 600}}>The creative ensemble is growing. Stay tuned.</p>
                </div>
            )}
        </div>
    </section>

    

    


    

        </>
    );
};

export default TeamList;
