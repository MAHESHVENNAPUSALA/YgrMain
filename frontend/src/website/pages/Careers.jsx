import React from 'react';
import { Link } from 'react-router-dom';
import './Careers.css';


const Careers = () => {
    return (
        <>
            {/* Converted from Django Template */}
            



<div className="careers-main-container mesh-gradient animated-bg">
    
    
    <div className="careers-hero reveal">
        <div className="container">
            <div className="section-head1">
                <span>Join Our Force</span>
                <h1>Shape the Future of Tech</h1>
                <p>We are looking for visionaries, creators, and problem solvers to build the next generation of digital solutions.</p>
            </div>
        </div>
    </div>

    <div className="layout-wrapper">
        
        <div className="scroll-column reveal">
            <div className="scrolling-wrapper-up">
                <div className="scrolling-content">
                    <div className="student-card-mini">
                        <img src="/media/team/tharun.jpeg" alt="Tharun" />
                        <h4>Tharun</h4>
                        <span>JAVA INTERN</span>
                    </div>
                    <div className="student-card-mini">
                        <img src="/media/team/reddy_odFoq3p.jpeg" alt="Himesh" />
                        <h4>Himesh Reddy</h4>
                        <span>JAVA INTERN</span>
                    </div>
                    <div className="student-card-mini">
                        <img src="/media/team/pavan.jpeg" alt="Pavan" />
                        <h4>Pavan</h4>
                        <span>JAVA INTERN</span>
                    </div>
                    
                    <div className="student-card-mini">
                        <img src="/media/team/tharun.jpeg" alt="Tharun" />
                        <h4>Tharun</h4>
                        <span>JAVA INTERN</span>
                    </div>
                    <div className="student-card-mini">
                        <img src="/media/team/reddy_odFoq3p.jpeg" alt="Himesh" />
                        <h4>Himesh Reddy</h4>
                        <span>JAVA INTERN</span>
                    </div>
                    <div className="student-card-mini">
                        <img src="/media/team/pavan.jpeg" alt="Pavan" />
                        <h4>Pavan</h4>
                        <span>JAVA INTERN</span>
                    </div>
                </div>
            </div>
        </div>

        
        <div className="center-column">
            
            <div className="career-card reveal">
                <i className="fas fa-briefcase"></i>
                <h2>Professional Careers</h2>
                <p>Join a fast-paced, innovative environment where your skills are valued and your growth is prioritized. Explore openings for developers, designers, and managers.</p>
                <a href="/vacancies" className="gold-btn">Explore Jobs</a>
                <div className="already-registered">
                    Already registered? <a href="/legacy/exampages/job_applicant_login">Sign In</a>
                </div>
            </div>

            
            <div className="career-card reveal">
                <i className="fas fa-graduation-cap"></i>
                <h2>Gobal Internships</h2>
                <p>Kickstart your journey with real-world experience. Our internship program offers mentorship, live projects, and a pathway to a full-time career.</p>
                <a href="/global-internships" className="gold-btn">View Internships</a>
                <div className="already-registered">
                    Already registered? <a href="/login">Student Login</a>
                </div>
            </div>
        </div>

        
        <div className="scroll-column reveal">
            <div className="scrolling-wrapper-down">
                <div className="scrolling-content">
                    <div className="student-card-mini">
                        <img src="/media/team/vamsi.jpeg" alt="Vamsi" />
                        <h4>Vamsi</h4>
                        <span>JAVA INTERN</span>
                    </div>
                    <div className="student-card-mini">
                        <img src="/media/team/sai.nikilesh.jpg.jpeg" alt="Nikilesh" />
                        <h4>Nikilesh</h4>
                        <span>PYTHON INTERN</span>
                    </div>
                    <div className="student-card-mini">
                        <img src="/media/team/anil.kumar.jpg.jpeg" alt="Anil" />
                        <h4>Anil Kumar</h4>
                        <span>JAVA INTERN</span>
                    </div>
                    
                    <div className="student-card-mini">
                        <img src="/media/team/vamsi.jpeg" alt="Vamsi" />
                        <h4>Vamsi</h4>
                        <span>JAVA INTERN</span>
                    </div>
                    <div className="student-card-mini">
                        <img src="/media/team/sai.nikilesh.jpg.jpeg" alt="Nikilesh" />
                        <h4>Nikilesh</h4>
                        <span>PYTHON INTERN</span>
                    </div>
                    <div className="student-card-mini">
                        <img src="/media/team/anil.kumar.jpg.jpeg" alt="Anil" />
                        <h4>Anil Kumar</h4>
                        <span>JAVA INTERN</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
` }} />


        </>
    );
};

export default Careers;
