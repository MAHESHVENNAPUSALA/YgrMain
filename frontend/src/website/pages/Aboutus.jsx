import React from 'react';
import { Link } from 'react-router-dom';
import './Aboutus.css';

const Aboutus = () => {
    return (
        <div className="corporate-about-page">
            
            {/* --- HERO SECTION --- */}
            <section className="corp-hero">
                <div className="corp-hero-bg">
                    <div className="bg-pattern-dots"></div>
                </div>
                <div className="corp-container hero-flex">
                    <div className="hero-text-side animate-fade-in-up">
                        <div className="corp-badge">
                            <span className="corp-badge-dot"></span>
                            <span className="highlight-keyword">Top IT Consulting Firm in Hyderabad</span>
                        </div>
                        <h1 className="hero-title">
                            Empowering Enterprise Growth Through <br/>
                            <span className="text-primary-gradient">Digital Transformation.</span>
                        </h1>
                        <p className="hero-desc">
                            YGR Gobal IT Services Pvt. Ltd. is an industry-leading <span className="highlight-keyword">software development</span> and <span className="highlight-keyword">technology consulting company</span> based in Hyderabad, India. We specialize in delivering cutting-edge, <span className="highlight-keyword">scalable software engineering</span>, <span className="highlight-keyword">cloud computing infrastructure</span>, <span className="highlight-keyword">AI/ML integrations</span>, and custom <span className="highlight-keyword">enterprise IT solutions</span> for modern businesses gobally.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/contact" className="corp-btn corp-btn-primary">Consult With Our Experts <i className="fas fa-arrow-right"></i></Link>
                            <Link to="/services" className="corp-btn corp-btn-outline">Explore IT Services</Link>
                        </div>
                    </div>
                    
                    <div className="hero-visual-side animate-fade-in-left">
                        <div className="corp-hero-image-wrapper">
                            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80" alt="Corporate Software Development Team Hyderabad" className="hero-main-img" />
                            
                            <div className="hero-floating-card top-right float-anim-1">
                                <div className="card-icon"><i className="fas fa-certificate"></i></div>
                                <div className="card-content">
                                    <h4>ISO 9001</h4>
                                    <p>Certified IT Quality</p>
                                </div>
                            </div>

                            <div className="hero-floating-card bottom-left float-anim-2">
                                <div className="card-icon"><i className="fas fa-users"></i></div>
                                <div className="card-content">
                                    <h4>100+</h4>
                                    <p>Expert Full Stack Developers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- IMPACT STATS --- */}
            <section className="corp-stats">
                <div className="corp-container">
                    <div className="stats-grid animate-fade-in-up delay-1">
                        <div className="stat-card">
                            <h3>144<span>+</span></h3>
                            <p>Custom Software Projects Delivered</p>
                        </div>
                        <div className="stat-card">
                            <h3>10<span>+</span></h3>
                            <p>Years IT Industry Experience</p>
                        </div>
                        <div className="stat-card">
                            <h3>4<span>+</span></h3>
                            <p>Gobal Markets (USA, UK, CA, IN)</p>
                        </div>
                        <div className="stat-card">
                            <h3>100<span>%</span></h3>
                            <p>Client Satisfaction & Retention</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- WHO WE ARE --- */}
            <section className="corp-section corp-about-story bg-white">
                <div className="corp-container story-layout">
                    
                    <div className="story-visual animate-fade-in-up">
                        <div className="ygr-service-visual">
                            {/* Top Logo */}
                            <div className="ygr-visual-logo">
                                <img src="/images/corporate_office.jpeg" alt="YGR Group of Companies" />
                            </div>
                            
                            {/* Subtitle */}
                            <h3 className="ygr-visual-subtitle">YOUR GROWTH RESOURCE</h3>

                            {/* Service Grid */}
                            <div className="ygr-visual-grid">
                                <div className="ygr-v-card">
                                    <div className="v-card-icon"><i className="fas fa-code"></i></div>
                                    <h4>SOFTWARE<br/>DEVELOPMENT</h4>
                                    <p>Custom solutions built for your business</p>
                                </div>
                                <div className="ygr-v-card">
                                    <div className="v-card-icon"><i className="fas fa-globe"></i></div>
                                    <h4>WEB<br/>DEVELOPMENT</h4>
                                    <p>Responsive, SEO-friendly websites that grow your brand</p>
                                </div>
                                <div className="ygr-v-card">
                                    <div className="v-card-icon"><i className="fas fa-mobile-alt"></i></div>
                                    <h4>MOBILE APP<br/>DEVELOPMENT</h4>
                                    <p>Intuitive mobile apps for Android & iOS</p>
                                </div>
                                <div className="ygr-v-card">
                                    <div className="v-card-icon"><i className="fas fa-cloud"></i></div>
                                    <h4>CLOUD<br/>SOLUTIONS</h4>
                                    <p>Scalable and secure cloud services</p>
                                </div>
                                <div className="ygr-v-card">
                                    <div className="v-card-icon"><i className="fas fa-chart-line"></i></div>
                                    <h4>DIGITAL<br/>MARKETING</h4>
                                    <p>Strategic marketing to increase visibility and reach</p>
                                </div>
                                <div className="ygr-v-card">
                                    <div className="v-card-icon"><i className="fas fa-graduation-cap"></i></div>
                                    <h4>INTERNSHIPS<br/>& TRAINING</h4>
                                    <p>Industry-oriented training for a successful career</p>
                                </div>
                            </div>
                            
                            {/* Dark Blue Footer Banner */}
                            <div className="ygr-visual-footer">
                                <i className="fas fa-users"></i> Empowering Businesses. Enriching Careers. Building the Future.
                            </div>
                        </div>
                    </div>

                    <div className="story-content animate-fade-in-left delay-1">
                        <h4 className="corp-eyebrow">Who We Are</h4>
                        <h2 className="corp-section-title">DRIVING GOBAL DIGITAL TRANSFORMATION</h2>
                        
                        <div className="story-text-blocks">
                            <p className="lead-p">
                                <strong>YGR Gobal IT Services Pvt. Ltd.</strong>, is a leading Best IT company in Hyderabad providing software development, web development, mobile app development, cloud solutions, DevOps services, AWS solutions, corporate training, internships, and professional IT courses. We offer industry-focused training in <strong>Java Full Stack, Python Full Stack, MERN Stack, MEAN Stack, Data Science, Software Testing, UI/UX Design, Artificial Intelligence, and Machine Learning</strong>.
                            </p>
                            
                            <p>
                                YGR Gobal IT Services Pvt. Ltd. – Empowering Your Growth Through Technology. The name YGR stands for Your Growth Resource, reflecting our commitment to helping businesses and professionals achieve success through innovative technology solutions. We specialize in software development, AI automation, cloud services, digital transformation, and IT consulting.
                            </p>
                            
                            <p>
                                With a strong focus on quality, innovation, and customer satisfaction, we deliver reliable and scalable solutions that drive business growth. Whether you are a business seeking technology expertise or a student looking to build a successful IT career, YGR Gobal IT Services Pvt. Ltd. is your trusted technology and training partner.
                            </p>
                        </div>

                        {/* Inline Mini Stats Row */}
                        <div className="story-mini-stats">
                            <div className="mini-stat-pill">
                                <div className="m-icon blue"><i className="fas fa-users"></i></div>
                                <div className="m-text">
                                    <strong>1007+</strong>
                                    <span>Students Trained</span>
                                </div>
                            </div>
                            <div className="mini-stat-pill">
                                <div className="m-icon green"><i className="fas fa-briefcase"></i></div>
                                <div className="m-text">
                                    <strong>41+</strong>
                                    <span>Students Placed</span>
                                </div>
                            </div>
                            <div className="mini-stat-pill">
                                <div className="m-icon orange"><i className="fas fa-handshake"></i></div>
                                <div className="m-text">
                                    <strong>63+</strong>
                                    <span>Corporate Clients</span>
                                </div>
                            </div>
                            <div className="mini-stat-pill">
                                <div className="m-icon blue"><i className="fas fa-medal"></i></div>
                                <div className="m-text">
                                    <strong>99%</strong>
                                    <span>Quality Commitment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- WHAT YGR MEANS (ULTRA-PREMIUM EDITORIAL) --- */}
            <section className="corp-section ygr-editorial-meaning bg-white">
                <div className="corp-container">
                    <div className="corp-section-header center animate-fade-in-up">
                        <h4 className="corp-eyebrow">The Core of Our Identity</h4>
                        <h2 className="corp-section-title">What YGR Stands For</h2>
                        <p className="corp-section-subtitle">
                            Every letter in our name reflects our purpose — to discover and deliver unique, creative solutions that empower the next generation of enterprises.
                        </p>
                    </div>

                    <div className="editorial-cards-container">
                        {/* Y - YOUR */}
                        <div className="editorial-card card-y animate-fade-in-up delay-1">
                            <div className="ec-bg-letter">Y</div>
                            <div className="ec-content">
                                <div className="ec-icon"><i className="fas fa-user-tie"></i></div>
                                <h3>YOUR</h3>
                                <p>We focus intensely on your specific business requirements, crafting bespoke digital experiences and empowering your business to stay ahead of the curve.</p>
                            </div>
                        </div>

                        {/* G - GROWTH */}
                        <div className="editorial-card card-g animate-fade-in-up delay-2">
                            <div className="ec-bg-letter">G</div>
                            <div className="ec-content">
                                <div className="ec-icon"><i className="fas fa-chart-line"></i></div>
                                <h3>GROWTH</h3>
                                <p>Driving sustainable business evolution. By implementing highly scalable architectures and AI automation, we ensure impactful and measurable investments.</p>
                            </div>
                        </div>

                        {/* R - RIGHT DIRECTION */}
                        <div className="editorial-card card-r animate-fade-in-up delay-3">
                            <div className="ec-bg-letter">R</div>
                            <div className="ec-content">
                                <div className="ec-icon"><i className="fas fa-compass"></i></div>
                                <h3>RIGHT DIRECTION</h3>
                                <p>We act as your technical compass. From initial strategy to final deployment, we guide your enterprise with precision to ensure long-term digital success.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- ISO CERTIFIED EXCELLENCE --- */}
            <section className="corp-section corp-iso-section bg-light-gray">
                <div className="corp-container">
                    <div className="iso-layout">
                        
                        {/* Left Side: Badge & Stats */}
                        <div className="iso-visual animate-fade-in-up">
                            <div className="iso-badge-wrapper">
                                <img src="/images/iso1.jpeg" alt="ISO 9001:2015 Certified Company" className="iso-badge-img" />
                            </div>
                            
                            <div className="iso-stats">
                                <div className="iso-stat-item">
                                    <h3>145+</h3>
                                    <span>SUCCESSFUL PROJECTS</span>
                                </div>
                                <div className="iso-stat-item">
                                    <h3>48+</h3>
                                    <span>EXPERT ENGINEERS</span>
                                </div>
                                <div className="iso-stat-item">
                                    <h3>4+</h3>
                                    <span>GOBAL MARKETS</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Text Content */}
                        <div className="iso-content animate-fade-in-up delay-1">
                            <h4 className="corp-eyebrow text-gold">CERTIFIED EXCELLENCE</h4>
                            <h2 className="corp-section-title">YGR GOBAL IT SERVICES<br />ISO CERTIFIED EXCELLENCE</h2>
                            
                            <div className="iso-text-blocks">
                                <p>
                                    <strong>YGR Gobal IT Services Pvt. Ltd.</strong> is committed to quality, trust, and customer. Our <strong>ISO Certification</strong> reflects our dedication to maintaining international standards in service quality, business operations, and customer excellence.
                                </p>
                                <p>
                                    Recognized for delivering the <strong>best IT services in Hyderabad</strong>, we provide innovative, reliable, and customized technology solutions that help businesses achieve digital transformation and sustainable growth.
                                </p>
                                <p>
                                    As a <strong>top IT company in Hyderabad</strong>, we specialize in software development, web and mobile application development, digital marketing, cloud solutions, IT consulting, UI/UX design, and enterprise software solutions. Our ISO-certified processes ensure consistent, secure, and high-quality service delivery.
                                </p>
                                <p>
                                    Through continuous innovation, operational excellence, and a customer-first approach, <strong>YGR Gobal IT Services</strong> has become a trusted technology partner for organizations seeking the best IT services in Hyderabad and scalable digital solutions.
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>


            {/* --- MISSION & VISION --- */}
            <section className="corp-section corp-blueprint bg-white">
                <div className="corp-container">
                    <div className="corp-section-header center animate-fade-in-up">
                        <h4 className="corp-eyebrow">The Corporate Blueprint</h4>
                        <h2 className="corp-section-title">Vision & Mission</h2>
                    </div>

                    <div className="vision-mission-grid animate-fade-in-up delay-1">
                        <div className="vm-card">
                            <div className="vm-card-bg vision-bg"></div>
                            <div className="vm-content">
                                <div className="vm-icon"><i className="fas fa-eye"></i></div>
                                <h3>Our IT Vision</h3>
                                <p>To be the most trusted <span className="highlight-keyword-light">gobal technology partner</span>, providing innovative, <span className="highlight-keyword-light">future-proof IT solutions</span> and software engineering that foster a culture of technical excellence and sustainable digital growth for enterprises worldwide.</p>
                            </div>
                        </div>

                        <div className="vm-card">
                            <div className="vm-card-bg mission-bg"></div>
                            <div className="vm-content">
                                <div className="vm-icon"><i className="fas fa-rocket"></i></div>
                                <h3>Our IT Mission</h3>
                                <p>To design and deploy <span className="highlight-keyword-light">high-quality, secure digital ecosystems</span>, while concurrently delivering <span className="highlight-keyword-light">world-class IT training</span> that empowers modern enterprises and cultivates the next generation of top-tier software developers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- CORPORATE VALUES --- */}
            <section className="corp-section corp-values bg-light-gray">
                <div className="corp-container">
                    <div className="corp-section-header center animate-fade-in-up">
                        <h4 className="corp-eyebrow">Our Software Engineering DNA</h4>
                        <h2 className="corp-section-title">Core IT Values</h2>
                    </div>

                    <div className="values-grid animate-fade-in-up delay-1">
                        <div className="value-item">
                            <div className="v-icon-wrap"><i className="fas fa-shield-alt"></i></div>
                            <h4>Data Security & Integrity</h4>
                            <p>Uncompromising compliance, <span className="highlight-keyword">cyber-security</span>, and code transparency in every deployment.</p>
                        </div>
                        <div className="value-item">
                            <div className="v-icon-wrap"><i className="fas fa-gem"></i></div>
                            <h4>Software Quality</h4>
                            <p>Delivering bug-free, optimized code and flawless <span className="highlight-keyword">UX/UI design</span> without exception.</p>
                        </div>
                        <div className="value-item">
                            <div className="v-icon-wrap"><i className="fas fa-hands-helping"></i></div>
                            <h4>Gobal Collaboration</h4>
                            <p>Building strong, long-term B2B partnerships through dedicated offshore and <span className="highlight-keyword">onshore IT teams</span>.</p>
                        </div>
                        <div className="value-item">
                            <div className="v-icon-wrap"><i className="fas fa-bolt"></i></div>
                            <h4>Agile Development</h4>
                            <p>Adapting swiftly to technological shifts using Scrum and <span className="highlight-keyword">Agile project management</span> methodologies.</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- THE JOURNEY --- */}
            <section className="corp-section corp-journey bg-white">
                <div className="corp-container">
                    <div className="corp-section-header center animate-fade-in-up">
                        <h4 className="corp-eyebrow">Company History</h4>
                        <h2 className="corp-section-title">Our Evolution as an IT Hub</h2>
                    </div>

                    <div className="journey-timeline animate-fade-in-up delay-1">
                        <div className="journey-track"></div>
                        
                        <div className="journey-node">
                            <div className="j-year">2023</div>
                            <div className="j-content">
                                <h4>Foundation & Consultancy</h4>
                                <p>Started as a premier overseas consultancy, laying the crucial groundwork for our gobal vision and establishing strong international relationships.</p>
                            </div>
                        </div>

                        <div className="journey-node">
                            <div className="j-year">2024</div>
                            <div className="j-content">
                                <h4>The Tech Pivot</h4>
                                <p>Expanded aggressively into comprehensive IT services, providing <span className="highlight-keyword">web development</span>, mobile apps, and digital marketing to startups and Fortune 500 enterprises gobally.</p>
                            </div>
                        </div>

                        <div className="journey-node">
                            <div className="j-year">2025</div>
                            <div className="j-content">
                                <h4>Ecosystem Expansion & Training</h4>
                                <p>Launched specialized <span className="highlight-keyword">IT training programs</span>, advanced tech bootcamps, and modern co-working innovation spaces in KPHB, Hyderabad to bridge the industry skill gap.</p>
                            </div>
                        </div>

                        <div className="journey-node active">
                            <div className="j-year">2026+</div>
                            <div className="j-content">
                                <h4>Gobal Future & AI Integration</h4>
                                <p>Preparing for advanced Artificial Intelligence (<span className="highlight-keyword">AI</span>) integrations, <span className="highlight-keyword">Blockchain development</span>, and launching proprietary <span className="highlight-keyword">enterprise SaaS solutions</span>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Aboutus;
