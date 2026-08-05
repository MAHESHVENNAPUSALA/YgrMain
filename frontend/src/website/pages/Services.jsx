import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Services.css';


const Services = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type') || 'web';

    React.useEffect(() => {
        const containers = document.querySelectorAll('.service-main-container');
        const typeMap = {
            'web': 0,
            'webapp': 1,
            'mobile': 2,
            'dm': 3,
            'uiux': 4,
            'testing': 5,
            'support': 6,
            'intern': 7
        };
        
        let index = typeMap[type];
        if (index === undefined) index = 0;
        
        containers.forEach((container, idx) => {
            if (idx === index) {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });
        
        const desktopLinks = document.querySelectorAll('.desktop-nav-links .service-nav-link');
        desktopLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').includes('?type=' + type)) {
                link.classList.add('active');
            }
        });
        
        const mobileLinks = document.querySelectorAll('.custom-select-options a');
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').includes('?type=' + type)) {
                link.classList.add('active');
            }
        });
        
        window.scrollTo(0, 0);
    }, [type]);

    return (
        <>
            {/* Converted from Django Template */}
            
    

    <nav className="service-nav-bar">
        <div className="container desktop-nav-links">
            <Link to="?type=web" className="service-nav-link active">Web Design</Link>
            <Link to="?type=webapp" className="service-nav-link active">Web Apps</Link>
            <Link to="?type=mobile" className="service-nav-link active">Mobile Apps</Link>
            <Link to="?type=dm" className="service-nav-link active">Marketing</Link>
            <Link to="?type=uiux" className="service-nav-link active">UI / UX</Link>
            <Link to="?type=testing" className="service-nav-link active">Testing</Link>
            <Link to="?type=support" className="service-nav-link active">Support</Link>
            <Link to="?type=intern" className="service-nav-link active">Internships</Link>
        </div>
        <div className="container mobile-nav-dropdown">
            <div className="custom-service-select">
                <button type="button" className="custom-select-trigger">
                    <span>
                        Web Design
                        Web Apps
                        Mobile Apps
                        Marketing
                        UI / UX
                        Testing
                        Support
                        Internships
                        Services
                        
                    </span>
                    <i className="fas fa-chevron-down"></i>
                </button>
                <div className="custom-select-options">
                    <Link to="?type=web" className="active">Web Design</Link>
                    <Link to="?type=webapp" className="active">Web Apps</Link>
                    <Link to="?type=mobile" className="active">Mobile Apps</Link>
                    <Link to="?type=dm" className="active">Marketing</Link>
                    <Link to="?type=uiux" className="active">UI / UX</Link>
                    <Link to="?type=testing" className="active">Testing</Link>
                    <Link to="?type=support" className="active">Support</Link>
                    <Link to="?type=intern" className="active">Internships</Link>
                </div>
            </div>
        </div>
    </nav>

    
    <div className="service-main-container mesh-gradient animated-bg">

        
        <section className="hero-glass-container reveal">
            <div className="hero-glass-content">
                <span className="reveal">Development Excellence</span>
                <h1>Modern Website Architecture</h1>
                <p>We blend aesthetic excellence with technical precision to build websites that are fast, secure, and
                    conversion-optimized.</p>
                <div className="hero-actions">
                    <a href="/contact" className="gold-btn">Start Your Project</a>
                </div>
            </div>
            <div className="hero-abstract-art d-none d-lg-block">
                <img src="/images/web.png" style={{maxWidth: "500px", borderRadius: "30px", transform: "perspective(1000px) rotateY(-15deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"}}

                    />
            </div>
        </section>

        
        <section className="execution-model-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>The Blueprint</span>
                    <h2>Strategic Delivery Model</h2>
                    <p>A structured approach to engineering digital excellence for your brand.</p>
                </div>

                <div className="model-grid">
                    <div className="model-card reveal">
                        <div className="step-number">01</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-search-dollar"></i>
                        </div>
                        <h4>Discovery</h4>
                        <p>In-depth analysis of your market, competitors, and core business objectives to define a
                            winning strategy.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">02</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-drafting-compass"></i>
                        </div>
                        <h4>Architecture</h4>
                        <p>Defining the technical stack and UI/UX wireframes to ensure scalability and user-centric
                            navigation.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">03</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-layer-group"></i>
                        </div>
                        <h4>Development</h4>
                        <p>Agile engineering with clean code practices, transforming designs into a high-performance
                            digital asset.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">04</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-rocket"></i>
                        </div>
                        <h4>Optimization</h4>
                        <p>Rigorous testing, SEO fine-tuning, and deployment followed by continuous performance
                            monitoring.</p>
                    </div>
                </div>
            </div>
        </section>


        
        <section className="pricing-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Flexible Plans</span>
                    <h2>Choose Your Digital Scale</h2>
                </div>

                <div className="row g-4 pricing-scroll-track">
                    
                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Startup</h4>
                                <div className="price-amount">₹16,999</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> 5 Custom Pages</li>
                                <li><i className="fas fa-check-circle"></i> Basic Logo Design</li>
                                <li><i className="fas fa-check-circle"></i> Free Hosting (1st Year)</li>
                                <li><i className="fas fa-check-circle"></i> SSL Certificate</li>
                                <li><i className="fas fa-check-circle"></i> Social Integration</li>
                            </ul>
                            
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
    Get Started
</a>
                        </div>
                    </div>

                    
                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="badge-popular">MOST POPULAR</div>
                            <div className="price-header">
                                <h4>Business</h4>
                                <div className="price-amount">₹27,999</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> 10 Professional Pages</li>
                                <li><i className="fas fa-check-circle"></i> Premium Logo Design</li>
                                <li><i className="fas fa-check-circle"></i> 2 Business Emails</li>
                                <li><i className="fas fa-check-circle"></i> Advanced SEO</li>
                                <li><i className="fas fa-check-circle"></i> Priority Support</li>
                            </ul>
                            
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
    Get Started
</a>
                        </div>
                    </div>

                    
                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>E-Commerce</h4>
                                <div className="price-amount">₹39,999</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> 30+ Products</li>
                                <li><i className="fas fa-check-circle"></i> Inventory Management</li>
                                <li><i className="fas fa-check-circle"></i> Payment Gateway</li>
                                <li><i className="fas fa-check-circle"></i> Order Tracking</li>
                                <li><i className="fas fa-check-circle"></i> Secure Checkout</li>
                            </ul>
                    
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
    Get Started
</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="advantage-section py-5">
            <div className="section-head reveal">
                <span>The YGR Advantage</span>
                <h2>Why Businesses Trust Us</h2>
            </div>
            <div className="advantage-grid">
                <div className="advantage-card reveal">
                    <i className="fas fa-code"></i>
                    <h4>Clean Architecture</h4>
                    <p>We write scalable, maintainable code using the latest industry standards.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-shield-alt"></i>
                    <h4>Ironclad Security</h4>
                    <p>Advanced encryption and security protocols protect your data 24/7.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-bolt"></i>
                    <h4>Lightning Speed</h4>
                    <p>Optimized assets and server-side performance for instant load times.</p>
                </div>
            </div>
        </section>

    </div>

    
    <div className="service-main-container mesh-gradient animated-bg">

        
        <section className="hero-glass-container reveal">
            <div className="hero-glass-content">
                <span className="reveal">Enterprise Solutions</span>
                <h1>Scalable Web Applications</h1>
                <p>We build robust, multi-tenant web applications with seamless integrations and cloud-native
                    architectures.</p>
                <div className="hero-actions">
                    <a href="/contact" className="gold-btn">Consult Our Experts</a>
                </div>
            </div>
            <div className="hero-abstract-art d-none d-lg-block">
                <img src="/images/wds.jpg" style={{maxWidth: "500px", borderRadius: "30px", transform: "perspective(1000px) rotateY(-15deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"}}

                    />
            </div>
        </section>

        
        <section className="execution-model-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Engineering Core</span>
                    <h2>Scalability Framework</h2>
                    <p>How we build robust applications that grow with your enterprise.</p>
                </div>

                <div className="model-grid">
                    <div className="model-card reveal">
                        <div className="step-number">01</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-microchip"></i>
                        </div>
                        <h4>System Design</h4>
                        <p>Architecting database schemas and server logic for maximum efficiency and data integrity.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">02</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-network-wired"></i>
                        </div>
                        <h4>API Integration</h4>
                        <p>Building secure, RESTful endpoints and integrating third-party services seamlessly.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">03</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-shield-virus"></i>
                        </div>
                        <h4>Security Layer</h4>
                        <p>Implementing JWT, OAuth, and multi-factor authentication to protect enterprise data.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">04</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-cloud-upload-alt"></i>
                        </div>
                        <h4>CI/CD Pipeline</h4>
                        <p>Automated deployment workflows ensuring zero downtime and rapid feature releases.</p>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="pricing-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Tailored Engineering</span>
                    <h2>Scalable Pricing Models</h2>
                </div>

                <div className="row g-4 pricing-scroll-track">
                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>MVP</h4>
                                <div className="price-amount">₹49,999</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Core Logic Dev</li>
                                <li><i className="fas fa-check-circle"></i> User Auth System</li>
                                <li><i className="fas fa-check-circle"></i> Basic Database</li>
                                <li><i className="fas fa-check-circle"></i> API Integration</li>
                                <li><i className="fas fa-check-circle"></i> Deployment Setup</li>
                            </ul>
                           

                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                                Start MVP
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="badge-popular">BEST FOR SCALING</div>
                            <div className="price-header">
                                <h4>Business</h4>
                                <div className="price-amount">₹99,999</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Advanced Dashboard</li>
                                <li><i className="fas fa-check-circle"></i> Payment Gateways</li>
                                <li><i className="fas fa-check-circle"></i> Role Based Access</li>
                                <li><i className="fas fa-check-circle"></i> Data Analytics</li>
                                <li><i className="fas fa-check-circle"></i> 3 Months Maintenance</li>
                            </ul>
                           
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                                Start Projectr
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Enterprise</h4>
                                <div className="price-amount">Custom</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Microservices Arch</li>
                                <li><i className="fas fa-check-circle"></i> Multi-region Cloud</li>
                                <li><i className="fas fa-check-circle"></i> AI/ML Integration</li>
                                <li><i className="fas fa-check-circle"></i> Dedicated DevOps</li>
                                <li><i className="fas fa-check-circle"></i> 24/7 SLA Support</li>
                            </ul>
                            
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Contact Sales
                           </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="advantage-section py-5">
            <div className="section-head reveal">
                <span>The YGR Advantage</span>
                <h2>Why Businesses Trust Us</h2>
            </div>
            <div className="advantage-grid">
                <div className="advantage-card reveal">
                    <i className="fas fa-code"></i>
                    <h4>Clean Architecture</h4>
                    <p>We write scalable, maintainable code using the latest industry standards.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-shield-alt"></i>
                    <h4>Ironclad Security</h4>
                    <p>Advanced encryption and security protocols protect your data 24/7.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-bolt"></i>
                    <h4>Lightning Speed</h4>
                    <p>Optimized assets and server-side performance for instant load times.</p>
                </div>
            </div>
        </section>
    </div>

    

    
    <div className="service-main-container mesh-gradient animated-bg">

        
        <section className="hero-glass-container reveal">
            <div className="hero-glass-content">
                <span className="reveal">Mobility Innovation</span>
                <h1>Next-Gen Mobile Experiences</h1>
                <p>Native performance with cross-platform efficiency. We build apps that users love to keep on their
                    home screens.</p>
                <div className="hero-actions">
                    <a href="/contact" className="gold-btn">Get a Quote</a>
                </div>
            </div>
            <div className="hero-abstract-art d-none d-lg-block">
                <img src="/images/mp.png" style={{maxWidth: "500px", borderRadius: "30px", transform: "perspective(1000px) rotateY(-15deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"}}

                    />
            </div>
        </section>

        
        <section className="execution-model-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Mobility Focus</span>
                    <h2>App Engineering Lifecycle</h2>
                    <p>Optimized for performance, battery life, and superior user engagement.</p>
                </div>

                <div className="model-grid">
                    <div className="model-card reveal">
                        <div className="step-number">01</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                        <h4>Native Optimization</h4>
                        <p>Ensuring smooth 60FPS animations and responsive touch interactions across all devices.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">02</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-sync-alt"></i>
                        </div>
                        <h4>Offline-First</h4>
                        <p>Implementing robust local caching to keep your app functional even without connectivity.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">03</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-bell"></i>
                        </div>
                        <h4>Push Strategy</h4>
                        <p>Intelligent notification systems to drive user retention without being intrusive.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">04</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-store"></i>
                        </div>
                        <h4>App Store Ready</h4>
                        <p>Full compliance with Apple and Google guidelines for a seamless approval process.</p>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="pricing-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>App Store Success</span>
                    <h2>Mobile Development Packages</h2>
                </div>

                <div className="row g-4 pricing-scroll-track">
                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Basic App</h4>
                                <div className="price-amount">₹29,999</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Single Platform (Android)</li>
                                <li><i className="fas fa-check-circle"></i> 5 Screen Design</li>
                                <li><i className="fas fa-check-circle"></i> Firebase Auth</li>
                                <li><i className="fas fa-check-circle"></i> Basic Analytics</li>
                                <li><i className="fas fa-check-circle"></i> Play Store Upload</li>
                            </ul>
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Select Plan
                           </a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="badge-popular">RECOMMENDED</div>
                            <div className="price-header">
                                <h4>Cross-Platform</h4>
                                <div className="price-amount">₹59,999</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Flutter / React Native</li>
                                <li><i className="fas fa-check-circle"></i> iOS + Android</li>
                                <li><i className="fas fa-check-circle"></i> Custom UI / UX</li>
                                <li><i className="fas fa-check-circle"></i> Push Notifications</li>
                                <li><i className="fas fa-check-circle"></i> API Integration</li>
                            </ul>
                             <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Select Plan
                           </a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Premium App</h4>
                                <div className="price-amount">₹99,999+</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Complex Logic / AI</li>
                                <li><i className="fas fa-check-circle"></i> Real-time Features</li>
                                <li><i className="fas fa-check-circle"></i> Payment Wallet</li>
                                <li><i className="fas fa-check-circle"></i> Offline Mode</li>
                                <li><i className="fas fa-check-circle"></i> 6 Months Support</li>
                            </ul>
                            
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Select Plan
                           </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="advantage-section py-5">
            <div className="section-head reveal">
                <span>The YGR Advantage</span>
                <h2>Why Businesses Trust Us</h2>
            </div>
            <div className="advantage-grid">
                <div className="advantage-card reveal">
                    <i className="fas fa-code"></i>
                    <h4>Clean Architecture</h4>
                    <p>We write scalable, maintainable code using the latest industry standards.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-shield-alt"></i>
                    <h4>Ironclad Security</h4>
                    <p>Advanced encryption and security protocols protect your data 24/7.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-bolt"></i>
                    <h4>Lightning Speed</h4>
                    <p>Optimized assets and server-side performance for instant load times.</p>
                </div>
            </div>
        </section>
    </div>
    

    
    <div className="service-main-container mesh-gradient animated-bg">

        
        <section className="hero-glass-container reveal">
            <div className="hero-glass-content">
                <span className="reveal">Market Dominance</span>
                <h1>Data-Driven Growth</h1>
                <p>We combine analytics with creativity to drive meaningful engagement and ROI-focused marketing
                    campaigns.</p>
                <div className="hero-actions">
                    <a href="/contact" className="gold-btn">Scale My Brand</a>
                </div>
            </div>
            <div className="hero-abstract-art d-none d-lg-block">
                <img src="/images/dmmm.jpeg" style={{maxWidth: "500px", borderRadius: "30px", transform: "perspective(1000px) rotateY(-15deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"}}

                    />
            </div>
        </section>

        
        <section className="execution-model-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Growth Engine</span>
                    <h2>ROI-First Strategy</h2>
                    <p>A data-driven approach to acquiring and retaining high-value customers.</p>
                </div>

                <div className="model-grid">
                    <div className="model-card reveal">
                        <div className="step-number">01</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-bullseye"></i>
                        </div>
                        <h4>Precision Targeting</h4>
                        <p>Using demographic and behavioral data to reach the exact audience likely to convert.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">02</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-funnel-dollar"></i>
                        </div>
                        <h4>Funnel Mastery</h4>
                        <p>Optimizing every touchpoint from awareness to final purchase for maximum conversion.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">03</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <h4>Real-time Analytics</h4>
                        <p>Constant A/B testing and performance tracking to pivot strategies for better results.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">04</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-users-cog"></i>
                        </div>
                        <h4>Retention Loop</h4>
                        <p>Implementing loyalty programs and remarketing to increase customer lifetime value.</p>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="pricing-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Strategic Performance</span>
                    <h2>Marketing Growth Plans</h2>
                </div>

                <div className="row g-4 pricing-scroll-track">
                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Starter</h4>
                                <div className="price-amount">₹9,999<span>/mo</span></div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Basic SEO Optimization</li>
                                <li><i className="fas fa-check-circle"></i> Social Media (2 Plat.)</li>
                                <li><i className="fas fa-check-circle"></i> 8 Custom Posts</li>
                                <li><i className="fas fa-check-circle"></i> Google My Business</li>
                                <li><i className="fas fa-check-circle"></i> Monthly Report</li>
                            </ul>
                            
                            
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Select Plan
                           </a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="badge-popular">BEST ROI</div>
                            <div className="price-header">
                                <h4>Growth</h4>
                                <div className="price-amount">₹19,999<span>/mo</span></div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Advanced SEO (On/Off)</li>
                                <li><i className="fas fa-check-circle"></i> Social Media (3 Plat.)</li>
                                <li><i className="fas fa-check-circle"></i> 16 Custom Posts</li>
                                <li><i className="fas fa-check-circle"></i> Google Ads Setup</li>
                                <li><i className="fas fa-check-circle"></i> Bi-weekly Analytics</li>
                            </ul>
                            
                             <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Select Plan
                           </a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Scale</h4>
                                <div className="price-amount">₹39,999<span>/mo</span></div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Full Funnel Strategy</li>
                                <li><i className="fas fa-check-circle"></i> Ads (Google & Meta)</li>
                                <li><i className="fas fa-check-circle"></i> Content Marketing</li>
                                <li><i className="fas fa-check-circle"></i> Lead Gen Focus</li>
                                <li><i className="fas fa-check-circle"></i> Weekly Deep Dive</li>
                            </ul>
                            
                            
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Select Plan
                           </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="advantage-section py-5">
            <div className="section-head reveal">
                <span>The YGR Advantage</span>
                <h2>Why Businesses Trust Us</h2>
            </div>
            <div className="advantage-grid">
                <div className="advantage-card reveal">
                    <i className="fas fa-code"></i>
                    <h4>Clean Architecture</h4>
                    <p>We write scalable, maintainable code using the latest industry standards.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-shield-alt"></i>
                    <h4>Ironclad Security</h4>
                    <p>Advanced encryption and security protocols protect your data 24/7.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-bolt"></i>
                    <h4>Lightning Speed</h4>
                    <p>Optimized assets and server-side performance for instant load times.</p>
                </div>
            </div>
        </section>
    </div>



    

    
    <div className="service-main-container mesh-gradient animated-bg">

        
        <section className="hero-glass-container reveal">
            <div className="hero-glass-content">
                <span className="reveal">Visual Mastery</span>
                <h1>Intuitive Product Design</h1>
                <p>We create digital experiences that feel as good as they look. User-centric design that converts
                    curiosity into loyalty.</p>
                <div className="hero-actions">
                    <a href="/contact" className="gold-btn">Discuss Design</a>
                </div>
            </div>
            <div className="hero-abstract-art d-none d-lg-block">
                <img src="/images/ui.png" style={{maxWidth: "500px", borderRadius: "30px", transform: "perspective(1000px) rotateY(-15deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"}}

                    />
            </div>
        </section>

        
        <section className="execution-model-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Aesthetic Logic</span>
                    <h2>User-Centric Design Model</h2>
                    <p>Where behavioral psychology meets pixel-perfect digital craftsmanship.</p>
                </div>

                <div className="model-grid">
                    <div className="model-card reveal">
                        <div className="step-number">01</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-user-friends"></i>
                        </div>
                        <h4>Persona Research</h4>
                        <p>Deep diving into user behaviors to understand their pain points and expectations.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">02</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-stream"></i>
                        </div>
                        <h4>User Journeys</h4>
                        <p>Mapping every possible interaction to ensure the path to goal is frictionless.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">03</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-palette"></i>
                        </div>
                        <h4>Visual Identity</h4>
                        <p>Crafting a unique design system that reflects your brand's soul across all screens.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">04</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-vial"></i>
                        </div>
                        <h4>Usability Testing</h4>
                        <p>Validating designs with real users to refine interactions before development starts.</p>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="pricing-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Pixel Perfection</span>
                    <h2>Creative Design Packages</h2>
                </div>

                <div className="row g-4 pricing-scroll-track">
                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Essential</h4>
                                <div className="price-amount">₹14,999</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Up to 5 Key Screens</li>
                                <li><i className="fas fa-check-circle"></i> Basic Wireframing</li>
                                <li><i className="fas fa-check-circle"></i> Brand Style Guide</li>
                                <li><i className="fas fa-check-circle"></i> Clickable Prototype</li>
                                <li><i className="fas fa-check-circle"></i> Figma Source Files</li>
                            </ul>
                            
                             <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Order Design
                           </a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="badge-popular">BEST SELLER</div>
                            <div className="price-header">
                                <h4>Professional</h4>
                                <div className="price-amount">₹29,999</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Up to 15 Screens</li>
                                <li><i className="fas fa-check-circle"></i> UX Research / Audits</li>
                                <li><i className="fas fa-check-circle"></i> Micro-animations</li>
                                <li><i className="fas fa-check-circle"></i> Design System</li>
                                <li><i className="fas fa-check-circle"></i> Dev Handoff Support</li>
                            </ul>
                        
                            
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Order Design
                           </a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Premium Suite</h4>
                                <div className="price-amount">₹49,999+</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Unlimited Screens</li>
                                <li><i className="fas fa-check-circle"></i> Product Discovery</li>
                                <li><i className="fas fa-check-circle"></i> High-end Prototyping</li>
                                <li><i className="fas fa-check-circle"></i> User Testing Sessions</li>
                                <li><i className="fas fa-check-circle"></i> Icon & Asset Library</li>
                            </ul>
                        
                            
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Order Design
                           </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="advantage-section py-5">
            <div className="section-head reveal">
                <span>The YGR Advantage</span>
                <h2>Why Businesses Trust Us</h2>
            </div>
            <div className="advantage-grid">
                <div className="advantage-card reveal">
                    <i className="fas fa-code"></i>
                    <h4>Clean Architecture</h4>
                    <p>We write scalable, maintainable code using the latest industry standards.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-shield-alt"></i>
                    <h4>Ironclad Security</h4>
                    <p>Advanced encryption and security protocols protect your data 24/7.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-bolt"></i>
                    <h4>Lightning Speed</h4>
                    <p>Optimized assets and server-side performance for instant load times.</p>
                </div>
            </div>
        </section>
    </div>

    

    
    <div className="service-main-container mesh-gradient animated-bg">

        
        <section className="hero-glass-container reveal">
            <div className="hero-glass-content">
                <span className="reveal">Quality Assurance</span>
                <h1>Flawless Software Delivery</h1>
                <p>We eliminate technical debt and security risks through rigorous manual and automated testing
                    protocols.</p>
                <div className="hero-actions">
                    <a href="/contact" className="gold-btn">Secure My App</a>
                </div>
            </div>
            <div className="hero-abstract-art d-none d-lg-block">
                <img src="/images/st.webp" style={{maxWidth: "500px", borderRadius: "30px", transform: "perspective(1000px) rotateY(-15deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"}}

                    />
            </div>
        </section>

        
        <section className="execution-model-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Zero Bug Policy</span>
                    <h2>Quality Assurance Protocol</h2>
                    <p>Rigorous testing frameworks to ensure your software is bulletproof before launch.</p>
                </div>

                <div className="model-grid">
                    <div className="model-card reveal">
                        <div className="step-number">01</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-vials"></i>
                        </div>
                        <h4>Manual Audit</h4>
                        <p>Human-led testing to verify UI consistency, usability, and edge-case behavior.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">02</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-robot"></i>
                        </div>
                        <h4>Automation</h4>
                        <p>Scripted regression tests that run on every build to prevent technical debt.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">03</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-tachometer-alt"></i>
                        </div>
                        <h4>Load Testing</h4>
                        <p>Simulating high-traffic scenarios to ensure your infrastructure scales under pressure.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">04</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-user-check"></i>
                        </div>
                        <h4>UAT Phase</h4>
                        <p>User Acceptance Testing to ensure the final product meets all business requirements.</p>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="pricing-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Zero Bug Policy</span>
                    <h2>QA & Testing Packages</h2>
                </div>

                <div className="row g-4 pricing-scroll-track">
                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Basic QA</h4>
                                <div className="price-amount">₹14,999</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Manual Testing</li>
                                <li><i className="fas fa-check-circle"></i> Bug Tracking</li>
                                <li><i className="fas fa-check-circle"></i> UI / UX Validation</li>
                                <li><i className="fas fa-check-circle"></i> Cross-browser Test</li>
                                <li><i className="fas fa-check-circle"></i> Final QA Report</li>
                            </ul>
                        
                            
                            <a href="/client-create" className="gold-btn w-100 d-inline-block text-center">
                            Start Testing
                           </a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="badge-popular">HIGH DEMAND</div>
                            <div className="price-header">
                                <h4>Standard</h4>
                                <div className="price-amount">₹29,999</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Manual + Automation</li>
                                <li><i className="fas fa-check-circle"></i> API Testing</li>
                                <li><i className="fas fa-check-circle"></i> Performance Testing</li>
                                <li><i className="fas fa-check-circle"></i> Regression Cycles</li>
                                <li><i className="fas fa-check-circle"></i> Weekly Status</li>
                            </ul>
                        
                            
                            <a href="/client-create" className="gold-btn w-100 d-inline-block text-center">
                            Start Testing
                           </a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Full Suite</h4>
                                <div className="price-amount">₹49,999+</div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Security Pen-Testing</li>
                                <li><i className="fas fa-check-circle"></i> Load & Stress Test</li>
                                <li><i className="fas fa-check-circle"></i> Continuous CI/CD QA</li>
                                <li><i className="fas fa-check-circle"></i> Database Validation</li>
                                <li><i className="fas fa-check-circle"></i> Dedicated Lead</li>
                            </ul>
                         
                             <a href="/client-create" className="gold-btn w-100 d-inline-block text-center">
                            Start Testing
                           </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="advantage-section py-5">
            <div className="section-head reveal">
                <span>The YGR Advantage</span>
                <h2>Why Businesses Trust Us</h2>
            </div>
            <div className="advantage-grid">
                <div className="advantage-card reveal">
                    <i className="fas fa-code"></i>
                    <h4>Clean Architecture</h4>
                    <p>We write scalable, maintainable code using the latest industry standards.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-shield-alt"></i>
                    <h4>Ironclad Security</h4>
                    <p>Advanced encryption and security protocols protect your data 24/7.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-bolt"></i>
                    <h4>Lightning Speed</h4>
                    <p>Optimized assets and server-side performance for instant load times.</p>
                </div>
            </div>
        </section>
    </div>



    

    
    <div className="service-main-container mesh-gradient animated-bg">

        
        <section className="hero-glass-container reveal">
            <div className="hero-glass-content">
                <span className="reveal">Technical Stability</span>
                <h1>24/7 Managed Infrastructure</h1>
                <p>We provide proactive monitoring and maintenance to ensure your digital ecosystem is always
                    operational, secure, and fast.</p>
                <div className="hero-actions">
                    <a href="/contact" className="gold-btn">Secure Support</a>
                </div>
            </div>
            <div className="hero-abstract-art d-none d-lg-block">
                <img src="/images/im.webp" style={{maxWidth: "500px", borderRadius: "30px", transform: "perspective(1000px) rotateY(-15deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"}}

                    />
            </div>
        </section>

        
        <section className="execution-model-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Uptime Priority</span>
                    <h2>Proactive Support Model</h2>
                    <p>Managed infrastructure designed for zero downtime and maximum security.</p>
                </div>

                <div className="model-grid">
                    <div className="model-card reveal">
                        <div className="step-number">01</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-heartbeat"></i>
                        </div>
                        <h4>Real-time Mon.</h4>
                        <p>Continuous health checks on servers and databases to identify issues before they occur.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">02</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-user-shield"></i>
                        </div>
                        <h4>Hardening</h4>
                        <p>Regular security patches and firewall optimizations to protect against evolving threats.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">03</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-database"></i>
                        </div>
                        <h4>Data Safety</h4>
                        <p>Automated multi-region backups and disaster recovery drills to ensure data persistence.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">04</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-headset"></i>
                        </div>
                        <h4>SLA Guarantee</h4>
                        <p>Dedicated response times and technical support to keep your business running smoothly.</p>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="pricing-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Reliable Care</span>
                    <h2>Maintenance & Support</h2>
                </div>

                <div className="row g-4 pricing-scroll-track">
                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Essential</h4>
                                <div className="price-amount">₹7,999<span>/mo</span></div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Weekly Backups</li>
                                <li><i className="fas fa-check-circle"></i> Security Updates</li>
                                <li><i className="fas fa-check-circle"></i> Bug Fixes (Standard)</li>
                                <li><i className="fas fa-check-circle"></i> Email Support</li>
                                <li><i className="fas fa-check-circle"></i> Performance Check</li>
                            </ul>
                          
                            
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Select Plan
                           </a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="badge-popular">PROACTIVE</div>
                            <div className="price-header">
                                <h4>Business</h4>
                                <div className="price-amount">₹14,999<span>/mo</span></div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Daily Backups</li>
                                <li><i className="fas fa-check-circle"></i> Priority Bug Fixes</li>
                                <li><i className="fas fa-check-circle"></i> 24/7 Monitoring</li>
                                <li><i className="fas fa-check-circle"></i> Chat Support</li>
                                <li><i className="fas fa-check-circle"></i> Monthly Health Audit</li>
                            </ul>
                    
                            
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Select Plan
                           </a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Enterprise</h4>
                                <div className="price-amount">₹29,999<span>/mo</span></div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Real-time Monitoring</li>
                                <li><i className="fas fa-check-circle"></i> Dedicated Engineer</li>
                                <li><i className="fas fa-check-circle"></i> Cloud Management</li>
                                <li><i className="fas fa-check-circle"></i> Phone Support</li>
                                <li><i className="fas fa-check-circle"></i> Disaster Recovery</li>
                            </ul>
                            
                            
                            <a href="/client-registration" className="gold-btn w-100 d-inline-block text-center">
                            Select Plan
                           </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="advantage-section py-5">
            <div className="section-head reveal">
                <span>The YGR Advantage</span>
                <h2>Why Businesses Trust Us</h2>
            </div>
            <div className="advantage-grid">
                <div className="advantage-card reveal">
                    <i className="fas fa-code"></i>
                    <h4>Clean Architecture</h4>
                    <p>We write scalable, maintainable code using the latest industry standards.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-shield-alt"></i>
                    <h4>Ironclad Security</h4>
                    <p>Advanced encryption and security protocols protect your data 24/7.</p>
                </div>
                <div className="advantage-card reveal">
                    <i className="fas fa-bolt"></i>
                    <h4>Lightning Speed</h4>
                    <p>Optimized assets and server-side performance for instant load times.</p>
                </div>
            </div>
        </section>
    </div>



    

    
    <div className="service-main-container mesh-gradient animated-bg">

        
        <section className="hero-glass-container reveal">
            <div className="hero-glass-content">
                <span className="reveal">Future Ready</span>
                <h1>Industry-Led Training</h1>
                <p>Bridge the gap between academia and industry with real-world projects, expert mentorship, and
                    career-launching certifications.</p>
                <div className="hero-actions">
                    <a href="/contact" className="gold-btn">Join Program</a>
                </div>
            </div>
            <div className="hero-abstract-art d-none d-lg-block">
                <img src="/images/internship.png" style={{maxWidth: "500px", borderRadius: "30px", transform: "perspective(1000px) rotateY(-15deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"}}

                    />
            </div>
        </section>

        
        <section className="execution-model-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>The Career Path</span>
                    <h2>Learning & Development Model</h2>
                    <p>A comprehensive roadmap designed to transform students into industry-ready professionals.</p>
                </div>

                <div className="model-grid">
                    <div className="model-card reveal">
                        <div className="step-number">01</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-book-reader"></i>
                        </div>
                        <h4>Core Theory</h4>
                        <p>Deep dive into the fundamental principles of your chosen technology stack with expert
                            guidance.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">02</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-laptop-code"></i>
                        </div>
                        <h4>Practical Labs</h4>
                        <p>Intensive hands-on coding sessions to apply theoretical knowledge in a controlled
                            environment.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">03</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-project-diagram"></i>
                        </div>
                        <h4>Live Projects</h4>
                        <p>Working on real-world industry requirements under the mentorship of senior developers.</p>
                    </div>

                    <div className="model-card reveal">
                        <div className="step-number">04</div>
                        <div className="model-icon-wrapper">
                            <i className="fas fa-user-tie"></i>
                        </div>
                        <h4>Career Readiness</h4>
                        <p>Resume building, mock interviews, and certification to bridge the gap to your dream job.</p>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="py-5 bg-white">
            <div className="section-head reveal">
                <span>Wall of Fame</span>
                <h2>Our Success Stories</h2>
            </div>
            <div className="container">
                <div className="row g-4 justify-content-center">
                    <div className="col-lg-2 col-md-4 col-6 reveal">
                        <div className="student-card-modern">
                            <img src="/media/team/tharun.jpeg" alt="Tharun" />
                            <h5>Tharun</h5>
                            <p>JAVA Intern</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 reveal">
                        <div className="student-card-modern">
                            <img src="/media/team/reddy_odFoq3p.jpeg" alt="Himesh" />
                            <h5>Himesh</h5>
                            <p>JAVA Intern</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 reveal">
                        <div className="student-card-modern">
                            <img src="/media/team/pavan.jpeg" alt="Pavan" />
                            <h5>Pavan</h5>
                            <p>JAVA Intern</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 reveal">
                        <div className="student-card-modern">
                            <img src="/media/team/vamsi.jpeg" alt="Vamsi" />
                            <h5>Vamsi</h5>
                            <p>JAVA Intern</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 reveal">
                        <div className="student-card-modern">
                            <img src="/media/team/sai.nikilesh.jpg.jpeg" alt="Nikilesh" />
                            <h5>Nikilesh</h5>
                            <p>PYTHON Intern</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="pricing-section">
            <div className="container">
                <div className="section-head reveal">
                    <span>Invest in Yourself</span>
                    <h2>Certification Programs</h2>
                </div>

                <div className="row g-4 pricing-scroll-track">
                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Starter</h4>
                                <div className="price-amount">₹5,899<span>(incl. GST)</span></div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Basics & Fundamentals</li>
                                <li><i className="fas fa-check-circle"></i> Recorded Sessions</li>
                                <li><i className="fas fa-check-circle"></i> Weekly Assignments</li>
                                <li><i className="fas fa-check-circle"></i> Basic Certification</li>
                                <li><i className="fas fa-check-circle"></i> Community Access</li>
                            </ul>
                            <a href="?plan=starter&amount=4999" className="gold-btn w-100">Enroll
                                Now</a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="badge-popular">CAREER TRACK</div>
                            <div className="price-header">
                                <h4>Professional</h4>
                                <div className="price-amount">₹17,699<span>(incl. GST)</span></div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Live Training Sessions</li>
                                <li><i className="fas fa-check-circle"></i> Hands-on Projects</li>
                                <li><i className="fas fa-check-circle"></i> Industry Certification</li>
                                <li><i className="fas fa-check-circle"></i> Code Reviews</li>
                                <li><i className="fas fa-check-circle"></i> Resume Building</li>
                            </ul>
                            <a href="?plan=pro&amount=14999" className="gold-btn w-100">Enroll Now</a>
                        </div>
                    </div>

                    <div className="col-lg-4 reveal">
                        <div className="pricing-card-modern">
                            <div className="price-header">
                                <h4>Advanced Plus</h4>
                                <div className="price-amount">₹29,499<span>(incl. GST)</span></div>
                            </div>
                            <ul className="feature-list">
                                <li><i className="fas fa-check-circle"></i> Live Industry Projects</li>
                                <li><i className="fas fa-check-circle"></i> 1-on-1 Mentorship</li>
                                <li><i className="fas fa-check-circle"></i> Interview Preparation</li>
                                <li><i className="fas fa-check-circle"></i> Placement Assistance</li>
                                <li><i className="fas fa-check-circle"></i> Portfolio Showcase</li>
                            </ul>
                            <a href="?plan=advanced&amount=24999" className="gold-btn w-100">Enroll
                                Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>



    
    

    <script dangerouslySetInnerHTML={{ __html: `
        /* ================= REVEAL ANIMATION JS ================= */
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        /* ================= PRICING AUTO-SCROLL (MOBILE) ================= */
        if (window.innerWidth < 991) {
            const tracks = document.querySelectorAll('.pricing-scroll-track');
            tracks.forEach(track => {
                let isMoving = true;

                const autoScroll = () => {
                    if (!isMoving) return;
                    const cardWidth = track.offsetWidth * 0.85;
                    if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 10) {
                        track.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    }
                };

                let scrollInterval = setInterval(autoScroll, 4000);

                track.addEventListener('touchstart', () => {
                    isMoving = false;
                    clearInterval(scrollInterval);
                }, { passive: true });
            });
        }

        /* ================= CUSTOM DROPDOWN MOBILE TOGGLE ================= */
        const dropdownTrigger = document.querySelector('.custom-select-trigger');
        const dropdownContainer = document.querySelector('.custom-service-select');
        
        if (dropdownTrigger && dropdownContainer) {
            dropdownTrigger.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdownContainer.classList.toggle('open');
            });
            
            document.addEventListener('click', function(e) {
                if (!dropdownContainer.contains(e.target)) {
                    dropdownContainer.classList.remove('open');
                }
            });
        }
    ` }} />

        </>
    );
};

export default Services;
