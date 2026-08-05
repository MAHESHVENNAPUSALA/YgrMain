import React, { useState, useEffect } from 'react';
import './InternshipList.css';

const InternshipList = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await fetch('/api/public/internships/');
                if (!response.ok) throw new Error('Failed to fetch internships');
                const data = await response.json();
                setInternships(data);
            } catch (error) {
                console.error("Error fetching internships:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInternships();
    }, []);

    const openModal = (internship) => {
        setModalData(internship);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalData(null);
        document.body.style.overflow = 'auto';
    };

    const formatSyllabus = (syllabus) => {
        if (!syllabus) return { __html: "" };
        let formatted = syllabus.replace(/Module\s?\d+:/gi, (match) => {
            return `<b>${match}</b>`;
        });
        return { __html: formatted };
    };

    return (
        <div className="internship-main-container mesh-gradient animated-bg">
            <div className="internship-hero">
                <div className="container">
                    <div className="section-head">
                        <span>Kickstart Your Career</span>
                        <h1>Gobal Internship Program</h1>
                        <p>Master industry-standard technologies with hands-on projects and expert mentorship.</p>
                    </div>
                </div>
            </div>

            <div className="internship-grid">
                {loading ? (
                    <div className="text-center w-100"><p>Loading internships...</p></div>
                ) : internships.length === 0 ? (
                    <div className="text-center w-100"><p>No internships available at the moment.</p></div>
                ) : (
                    internships.map(intern => (
                        <div key={intern.id} className="intern-card-modern reveal active" onClick={() => openModal(intern)}>
                            <div className="intern-image-wrapper">
                                <img alt={intern.title} src={intern.image || "/images/internship_placeholder.jpg"} />
                            </div>
                            <div className="intern-content">
                                <h3>{intern.title}</h3>
                                <div className="intern-duration">
                                    <i className="far fa-clock"></i>
                                    <span>Duration: {intern.duration}</span>
                                </div>
                                <a className="gold-btn w-100" href={`/register-internship?course_id=${intern.id}`} onClick={(e) => e.stopPropagation()}>
                                    Register Now
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {modalData && (
                <div className="intern-modal-overlay active" onClick={closeModal}>
                    <div className="intern-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-close-btn" onClick={closeModal}><i className="fas fa-times"></i></div>
                        <h2>{modalData.title} Syllabus</h2>
                        <div 
                            className="syllabus-content" 
                            dangerouslySetInnerHTML={formatSyllabus(modalData.syllabus)} 
                        />
                        <div className="mt-5 text-center">
                            <p className="text-muted small mb-4">Ready to begin your journey?</p>
                            <a className="gold-btn" href={`/register-internship?course_id=${modalData.id}`}>Secure Your Spot</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InternshipList;
