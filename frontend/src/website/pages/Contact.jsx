import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';


const Contact = () => {

    useEffect(() => {
        const form = document.getElementById("contactForm");
        const handleSubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;
            const service = document.getElementById("service").value;
            const message = document.getElementById("message").value;
            const waMessage = `Hello! I have a project inquiry.\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`;
            const waNumber = "917794053340";
            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`, "_blank");
        };
        if (form) {
            form.addEventListener("submit", handleSubmit);
        }

        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        
        return () => {
            if (form) form.removeEventListener("submit", handleSubmit);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            {/* Converted from Django Template */}
            

    

    <div className="page-content-offset mesh-gradient">
        <div className="container-fluid px-md-5 px-3">
            
            <div className="split-contact-container">
                
                <div className="contact-info-side reveal-left">
                    <div className="info-header">
                        <span>Direct Connection</span>
                        <h2>Let's build<br />something great</h2>
                        <p>Our team is dedicated to providing enterprise-grade IT solutions and personalized support for your vision.</p>
                    </div>

                    <div className="contact-method-list">
                        
                        <div className="method-item">
                            <div className="method-icon"><i className="fas fa-building"></i></div>
                            <div className="method-text">
                                <h5>Gobal Headquarters</h5>
                                <p>KPHB, Hyderabad, Telangana</p>
                                <p>HQ & OPERATIONS CENTER</p>
                            </div>
                        </div>

                        
                        <div className="method-item">
                            <div className="method-icon"><i className="fas fa-map-marker-alt"></i></div>
                            <div className="method-text">
                                <h5>Guntur Branch</h5>
                                <p>Guntur, Andhra Pradesh</p>
                                <p>TRAINING & DEVELOPMENT</p>
                            </div>
                        </div>

                        
                        <div className="method-item">
                            <div className="method-icon"><i className="fas fa-rocket"></i></div>
                            <div className="method-text">
                                <h5>Vinukonda Branch</h5>
                                <p>Vinukonda, Andhra Pradesh</p>
                                <p>Coming Soon</p>
                            </div>
                        </div>

                        
                        <div className="method-item mt-5">
                            <div className="method-icon"><i className="fas fa-phone-alt"></i></div>
                            <div className="method-text">
                                <h5>24/7 Support</h5>
                                <p>+91 7794053340</p>
                            </div>
                        </div>
                    </div>

                    
                    <div className="social-links mt-5">
                        <a href="#"><i className="fab fa-linkedin"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>

                
                <div className="contact-form-side reveal-right">
                    <div className="form-header">
                        <h3>Send a message</h3>
                        <p>Fill out the form below and an expert will reach out within 24 hours.</p>
                    </div>

                    <form id="contactForm">
                        <div className="modern-input-group">
                            <label>Full Name</label>
                            <input type="text" className="modern-input" id="fullName" placeholder="e.g. John Doe" required />
                        </div>

                        <div className="modern-input-group">
                            <label>Business Email</label>
                            <input type="email" className="modern-input" id="email" placeholder="e.g. john@company.com" required />
                        </div>

                        <div className="modern-input-group">
                            <label>Service Category</label>
                            <select className="modern-input" id="service" required defaultValue="Select an option">
                                <option disabled value="Select an option">Select an option</option>
                                <option>Web Applications</option>
                                <option>Mobile Development</option>
                                <option>Digital Strategy</option>
                                <option>Cloud Infrastructure</option>
                            </select>
                        </div>

                        <div className="modern-input-group">
                            <label>Message</label>
                            <textarea className="modern-input" id="message" placeholder="Tell us about your goals..." required></textarea>
                        </div>

                        <button type="submit" className="submit-gold-btn">Initialize Connection</button>
                    </form>
                </div>
            </div>

            
            <div className="map-section reveal mt-5 mb-5">
                <div className="split-contact-container">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8205.3507874237!2d78.392665!3d17.489361!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2aa1a33d59440f77%3A0x595e01da47d1657b!2sYGR%20GOBAL%20IT%20SERVICES%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1767593924604!5m2!1sen!2sin" 
                        width="100%" height="450" allowFullScreen loading="lazy">
                    </iframe>
                </div>
            </div>

        </div>
    </div>

    

    
    

        </>
    );
};

export default Contact;
