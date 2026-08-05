import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalHomeInternshipTraining = () => {
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

    const rawHTML = `<!--<style>-->
<!--    .it-section {-->
<!--        padding: 50px 0;-->
<!--        background: #fff;-->
<!--        position: relative;-->
<!--        overflow: hidden;-->
<!--    }-->
<!--    .it-container {-->
<!--        max-width: 1400px;-->
<!--        margin: 0 auto;-->
<!--        padding: 0 40px;-->
<!--    }-->
<!--    .it-header {-->
<!--        text-align: center;-->
<!--        margin-bottom: 80px;-->
<!--    }-->
<!--    .it-eyebrow {-->
<!--        color: #fbcc27;-->
<!--        font-weight: 700;-->
<!--        text-transform: uppercase;-->
<!--        letter-spacing: 5px;-->
<!--        font-size: 0.9rem;-->
<!--        display: block;-->
<!--        margin-bottom: 20px;-->
<!--    }-->
<!--    .it-header h2 {-->
<!--        font-size: 2.8rem;-->
<!--        font-weight: 800;-->
<!--        color: #091c47;-->
<!--        letter-spacing: -1px;-->
<!--        margin-bottom: 20px;-->
<!--        line-height: 1.2;-->
<!--    }-->
<!--    .it-header h2 span {-->
<!--        display: block;-->
<!--        color: var(--primary-navy);-->
<!--        opacity: 0.8;-->
<!--        font-size: 0.9em;-->
<!--    }-->
<!--    .it-header p {-->
<!--        font-size: 1.1rem;-->
<!--        color: #64748b;-->
<!--        max-width: 700px;-->
<!--        margin: 0 auto;-->
<!--        line-height: 1.6;-->
<!--    }-->
<!--    .it-grid {-->
<!--        display: grid;-->
<!--        grid-template-columns: repeat(4, 1fr);-->
<!--        gap: 30px;-->
<!--    }-->
<!--    .it-card {-->
<!--        background: #f8fafc;-->
<!--        border-radius: 30px;-->
<!--        padding: 50px 35px;-->
<!--        transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);-->
<!--        position: relative;-->
<!--        border: 1px solid #f1f5f9;-->
<!--        display: flex;-->
<!--        flex-direction: column;-->
<!--        align-items: center;-->
<!--        text-align: center;-->
<!--        overflow: hidden;-->
<!--    }-->
<!--    .it-card::before {-->
<!--        content: '';-->
<!--        position: absolute;-->
<!--        top: 0; left: 0; width: 100%; height: 5px;-->
<!--        background: #fbcc27;-->
<!--        transform: scaleX(0);-->
<!--        transition: transform 0.5s ease;-->
<!--        transform-origin: left;-->
<!--    }-->
<!--    .it-card:hover {-->
<!--        background: #fff;-->
<!--        transform: translateY(-15px);-->
<!--        box-shadow: 0 40px 100px rgba(9, 28, 71, 0.1);-->
<!--        border-color: #fbcc27;-->
<!--    }-->
<!--    .it-card:hover::before {-->
<!--        transform: scaleX(1);-->
<!--    }-->
<!--    .it-icon-box {-->
<!--        width: 100px;-->
<!--        height: 100px;-->
<!--        background: #fff;-->
<!--        border-radius: 25px;-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        justify-content: center;-->
<!--        margin-bottom: 35px;-->
<!--        font-size: 2.5rem;-->
<!--        color: #091c47;-->
<!--        box-shadow: 0 15px 35px rgba(9, 28, 71, 0.05);-->
<!--        transition: all 0.5s ease;-->
<!--    }-->
<!--    .it-card:hover .it-icon-box {-->
<!--        background: #091c47;-->
<!--        color: #fbcc27;-->
<!--        transform: rotateY(180deg);-->
<!--    }-->
<!--    .it-card h3 {-->
<!--        font-size: 1.6rem;-->
<!--        font-weight: 800;-->
<!--        color: #091c47;-->
<!--        margin-bottom: 20px;-->
<!--    }-->
<!--    .it-card p {-->
<!--        color: #64748b;-->
<!--        line-height: 1.7;-->
<!--        margin-bottom: 30px;-->
<!--        flex-grow: 1;-->
<!--    }-->
<!--    .it-badge {-->
<!--        background: rgba(251, 204, 39, 0.1);-->
<!--        color: #b48a04;-->
<!--        padding: 6px 16px;-->
<!--        border-radius: 50px;-->
<!--        font-size: 0.75rem;-->
<!--        font-weight: 800;-->
<!--        text-transform: uppercase;-->
<!--        letter-spacing: 1px;-->
<!--        margin-bottom: 20px;-->
<!--    }-->
<!--    .it-cta {-->
<!--        margin-top: auto;-->
<!--        color: #091c47;-->
<!--        font-weight: 800;-->
<!--        text-decoration: none;-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        gap: 10px;-->
<!--        transition: 0.3s;-->
<!--        cursor: pointer;-->
<!--        background: none;-->
<!--        border: none;-->
<!--        padding: 0;-->
<!--    }-->
<!--    .it-cta:hover {-->
<!--        gap: 15px;-->
<!--        color: #fbcc27;-->
<!--    }-->
<!--    .curr-modal {-->
<!--        position: fixed;-->
<!--        top: 0; left: 0; width: 100%; height: 100%;-->
<!--        background: rgba(9, 28, 71, 0.95);-->
<!--        backdrop-filter: blur(20px);-->
<!--        z-index: 10000;-->
<!--        display: none;-->
<!--        align-items: center;-->
<!--        justify-content: center;-->
<!--        opacity: 0;-->
<!--        transition: opacity 0.5s ease;-->
<!--    }-->
<!--    .curr-modal.active {-->
<!--        display: flex;-->
<!--        opacity: 1;-->
<!--    }-->
<!--    .curr-box {-->
<!--        background: #fff;-->
<!--        width: 90%;-->
<!--        max-width: 800px;-->
<!--        border-radius: 40px;-->
<!--        padding: 60px;-->
<!--        position: relative;-->
<!--        transform: scale(0.9) translateY(40px);-->
<!--        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);-->
<!--        max-height: 90vh;-->
<!--        overflow-y: auto;-->
<!--    }-->
<!--    .curr-modal.active .curr-box {-->
<!--        transform: scale(1) translateY(0);-->
<!--    }-->
<!--    .curr-close {-->
<!--        position: absolute;-->
<!--        top: 30px; right: 30px;-->
<!--        width: 50px; height: 50px;-->
<!--        background: #f1f5f9;-->
<!--        border-radius: 50%;-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        justify-content: center;-->
<!--        font-size: 1.2rem;-->
<!--        cursor: pointer;-->
<!--        transition: 0.3s;-->
<!--    }-->
<!--    .curr-close:hover {-->
<!--        background: #fbcc27;-->
<!--        transform: rotate(90deg);-->
<!--    }-->
<!--    .curr-title {-->
<!--        font-size: 2.5rem;-->
<!--        font-weight: 900;-->
<!--        color: #091c47;-->
<!--        margin-bottom: 10px;-->
<!--    }-->
<!--    .curr-subtitle {-->
<!--        color: #fbcc27;-->
<!--        font-weight: 800;-->
<!--        letter-spacing: 3px;-->
<!--        text-transform: uppercase;-->
<!--        margin-bottom: 40px;-->
<!--        display: block;-->
<!--    }-->
<!--    .curr-list {-->
<!--        list-style: none;-->
<!--        padding: 0;-->
<!--        display: grid;-->
<!--        grid-template-columns: repeat(2, 1fr);-->
<!--        gap: 20px;-->
<!--    }-->
<!--    .curr-list li {-->
<!--        padding: 15px 20px;-->
<!--        background: #f8fafc;-->
<!--        border-radius: 15px;-->
<!--        color: #091c47;-->
<!--        font-weight: 700;-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        gap: 15px;-->
<!--    }-->
<!--    .curr-list li i { color: #fbcc27; }-->
<!--    .it-blob {-->
<!--        position: absolute;-->
<!--        width: 500px;-->
<!--        height: 500px;-->
<!--        background: radial-gradient(circle, rgba(251, 204, 39, 0.05) 0%, transparent 70%);-->
<!--        z-index: -1;-->
<!--        border-radius: 50%;-->
<!--    }-->
<!--    @media (max-width: 1200px) {-->
<!--        .it-grid { grid-template-columns: repeat(2, 1fr); }-->
<!--    }-->
<!--    @media (max-width: 768px) {-->
<!--        .it-header h2 { -->
<!--            font-size: 1.6rem; -->
<!--            font-weight: 600;-->
<!--            letter-spacing: 0;-->
<!--        }-->
<!--        .it-header p {-->
<!--            font-size: 0.95rem;-->
<!--        }-->
<!--        .it-grid { -->
<!--            display: flex;-->
<!--            overflow-x: auto;-->
<!--            scroll-snap-type: x mandatory;-->
<!--            gap: 15px;-->
<!--            padding: 10px 0 30px;-->
<!--            scrollbar-width: none;-->
<!--            -ms-overflow-style: none;-->
<!--        }-->
<!--        .it-grid::-webkit-scrollbar {-->
<!--            display: none;-->
<!--        }-->
<!--        .it-card {-->
<!--            flex: 0 0 80%;-->
<!--            scroll-snap-align: center;-->
<!--            padding: 25px 20px;-->
<!--            border-radius: 20px;-->
<!--        }-->
<!--        .it-icon-box {-->
<!--            width: 60px;-->
<!--            height: 60px;-->
<!--            font-size: 1.5rem;-->
<!--            margin-bottom: 20px;-->
<!--            border-radius: 15px;-->
<!--        }-->
<!--        .it-card h3 {-->
<!--            font-size: 1.2rem;-->
<!--            margin-bottom: 10px;-->
<!--        }-->
<!--        .it-card p {-->
<!--            font-size: 0.85rem;-->
<!--            margin-bottom: 20px;-->
<!--        }-->
<!--        .it-badge {-->
<!--            padding: 4px 12px;-->
<!--            font-size: 0.65rem;-->
<!--            margin-bottom: 15px;-->
<!--        }-->
<!--        .it-section { padding: 40px 0; }-->
<!--        .curr-box { padding: 30px 20px; }-->
<!--        .curr-list { grid-template-columns: 1fr; }-->
<!--    }-->
<!--</style>-->
<!--<section class="it-section">-->
<!--    <div class="it-blob" style="top: -10%; right: -10%;"></div>-->
<!--    <div class="it-blob" style="bottom: -10%; left: -10%;"></div>-->
<!--    <div class="it-container">-->
<!--        <div class="it-header reveal">-->
<!--            <span class="it-eyebrow">YGR Gobal Academy</span>-->
<!--            <h2>Master Your Future <span>With Our Programs</span></h2>-->
<!--            <p>Elevate your technical prowess through our industry-aligned internships and professional training modules.</p>-->
<!--        </div>-->
<!--        <div class="it-grid">-->
<!-- Java Full Stack -->
<!--            <div class="it-card reveal-left" style="transition-delay: 0.1s;">-->
<!--                <span class="it-badge">Elite Track</span>-->
<!--                <div class="it-icon-box">-->
<!--                    <i class="fab fa-java"></i>-->
<!--                </div>-->
<!--                <h3>Java Full Stack</h3>-->
<!--                <p>Architect robust enterprise systems using Spring Boot, Hibernate, and modern React/Angular frontends.</p>-->
<!--                <button onclick="openCurriculum('java')" class="it-cta">View Curriculum <i class="fas fa-arrow-right"></i></button>-->
<!--            </div>-->
<!-- Python Full Stack -->
<!--            <div class="it-card reveal-right" style="transition-delay: 0.2s;">-->
<!--                <span class="it-badge">Innovation Track</span>-->
<!--                <div class="it-icon-box">-->
<!--                    <i class="fab fa-python"></i>-->
<!--                </div>-->
<!--                <h3>Python Full Stack</h3>-->
<!--                <p>Build scalable AI-driven web apps using Django, Flask, and dynamic data visualization frameworks.</p>-->
<!--                <button onclick="openCurriculum('python')" class="it-cta">View Curriculum <i class="fas fa-arrow-right"></i></button>-->
<!--            </div>-->
<!-- Frontend Development -->
<!--            <div class="it-card reveal-left" style="transition-delay: 0.3s;">-->
<!--                <span class="it-badge">Creative Track</span>-->
<!--                <div class="it-icon-box">-->
<!--                    <i class="fas fa-code"></i>-->
<!--                </div>-->
<!--                <h3>Frontend Mastery</h3>-->
<!--                <p>Master the art of pixel-perfect UI with React.js, Next.js, and sophisticated CSS architectures.</p>-->
<!--                <button onclick="openCurriculum('frontend')" class="it-cta">View Curriculum <i class="fas fa-arrow-right"></i></button>-->
<!--            </div>-->
<!-- UI/UX Design -->
<!--            <div class="it-card reveal-right" style="transition-delay: 0.4s;">-->
<!--                <span class="it-badge">Design Track</span>-->
<!--                <div class="it-icon-box">-->
<!--                    <i class="fas fa-pencil-ruler"></i>-->
<!--                </div>-->
<!--                <h3>UI/UX Design</h3>-->
<!--                <p>Understand user psychology and design thinking to create world-class digital experiences in Figma.</p>-->
<!--                <button onclick="openCurriculum('uiux')" class="it-cta">View Curriculum <i class="fas fa-arrow-right"></i></button>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</section>-->
<!-- CURRICULUM MODAL -->
<!--<div class="curr-modal" id="currModal">-->
<!--    <div class="curr-box">-->
<!--        <div class="curr-close" onclick="closeCurriculum()"><i class="fas fa-times"></i></div>-->
<!--        <span class="curr-subtitle" id="modalSubtitle">Advanced Syllabus</span>-->
<!--        <h2 class="curr-title" id="modalTitle">Course Curriculum</h2>-->
<!--        <p id="modalDesc" style="color: #64748b; margin-bottom: 30px;">Detailed roadmap for your professional journey.</p>-->
<!--        <ul class="curr-list" id="modalList">-->
<!-- Dynamic Content -->
<!--        </ul>-->
<!--        <div style="margin-top: 40px; text-align: center;">-->
<!--            <a href="/contact/" class="btn-nexus" style="display: inline-flex;">Enroll Now <i class="fas fa-paper-plane"></i></a>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
<!--<script>-->
<!--    const curriculums = {-->
<!--        java: {-->
<!--            title: "Java Full Stack",-->
<!--            subtitle: "Enterprise Engineering",-->
<!--            desc: "Become a professional Java architect capable of building high-performance, secure enterprise applications.",-->
<!--            items: [-->
<!--                "Core Java (OOPS, Collections)",-->
<!--                "Spring Boot Microservices",-->
<!--                "Hibernate & Spring Data JPA",-->
<!--                "RESTful API Development",-->
<!--                "React / Angular Integration",-->
<!--                "MySQL & Database Design",-->
<!--                "JUnit & Mockito Testing",-->
<!--                "Docker & Jenkins CI/CD"-->
<!--            ]-->
<!--        },-->
<!--        python: {-->
<!--            title: "Python Full Stack",-->
<!--            subtitle: "Innovation & Data",-->
<!--            desc: "Master the most versatile language to build dynamic web applications and data-driven solutions.",-->
<!--            items: [-->
<!--                "Python Fundamentals & OOPs",-->
<!--                "Django & Flask Frameworks",-->
<!--                "PostgreSQL & MongoDB",-->
<!--                "Frontend (HTML, CSS, JS)",-->
<!--                "FastAPI for High Performance",-->
<!--                "Asynchronous Programming",-->
<!--                "Data Analysis with Pandas",-->
<!--                "AWS Deployment Basics"-->
<!--            ]-->
<!--        },-->
<!--        frontend: {-->
<!--            title: "Frontend Mastery",-->
<!--            subtitle: "Creative Engineering",-->
<!--            desc: "Focus on creating pixel-perfect, highly interactive, and responsive digital interfaces.",-->
<!--            items: [-->
<!--                "Advanced HTML5 & Semantic Web",-->
<!--                "CSS Mastery (Grid, Flexbox)",-->
<!--                "JavaScript (ES6+ Mastery)",-->
<!--                "React.js & State Management",-->
<!--                "Next.js (SSR, ISR, Static)",-->
<!--                "Tailwind CSS & Animations",-->
<!--                "Vite & Performance Tuning",-->
<!--                "Version Control with Git"-->
<!--            ]-->
<!--        },-->
<!--        uiux: {-->
<!--            title: "UI/UX Design",-->
<!--            subtitle: "Experience Strategy",-->
<!--            desc: "Bridge the gap between technology and human psychology through world-class design.",-->
<!--            items: [-->
<!--                "Visual Design Principles",-->
<!--                "Typography & Color Theory",-->
<!--                "User Research & Personas",-->
<!--                "Wireframing & Information Arch",-->
<!--                "Figma Advanced Prototyping",-->
<!--                "Usability Testing Methods",-->
<!--                "Design Systems Engineering",-->
<!--                "Case Study Development"-->
<!--            ]-->
<!--        }-->
<!--    };-->
<!--    function openCurriculum(key) {-->
<!--        const data = curriculums[key];-->
<!--        document.getElementById('modalTitle').innerText = data.title;-->
<!--        document.getElementById('modalSubtitle').innerText = data.subtitle;-->
<!--        document.getElementById('modalDesc').innerText = data.desc;-->
<!--        const list = document.getElementById('modalList');-->
<!--        list.innerHTML = '';-->
<!--        data.items.forEach(item => {-->
<!--            const li = document.createElement('li');-->
<!--            li.innerHTML = \`<i class="fas fa-check-circle"></i> \${item}\`;-->
<!--            list.appendChild(li);-->
<!--        });-->
<!--        document.getElementById('currModal').classList.add('active');-->
<!--document.body.style.overflow = 'hidden'; -->
<!--    }-->
<!--    function closeCurriculum() {-->
<!--        document.getElementById('currModal').classList.remove('active');-->
<!--        document.body.style.overflow = 'auto';-->
<!--    }-->
<!--    window.onclick = function(event) {-->
<!--        const modal = document.getElementById('currModal');-->
<!--        if (event.target == modal) {-->
<!--            closeCurriculum();-->
<!--        }-->
<!--    }-->
<!--</script>-->
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalHomeInternshipTraining;
