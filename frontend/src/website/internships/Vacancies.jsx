import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Vacancies.css';

const OriginalVacancies = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('/api/public/jobs/')
            .then(res => res.json())
            .then(jobs => { setData(Array.isArray(jobs) ? jobs : []); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    return (
        <div className="vacancies-main-container mesh-gradient animated-bg">
            {/* Hero Section */}
            <div className="vacancies-hero reveal active">
                <div className="container">
                    <div className="section-head">
                        <span>Opportunities</span>
                        <h1>Current Openings</h1>
                        <p>Join a culture of innovation and excellence. Find the role that empowers your ambition.</p>
                    </div>
                </div>
            </div>

            <div className="jobs-grid">
                {loading ? (
                    <div style={{textAlign: 'center', width: '100%', padding: '60px'}}>
                        <h3 style={{color: '#092a49'}}>Loading openings...</h3>
                    </div>
                ) : data.length > 0 ? data.map(item => (
                    
                    <div key={item.id} className="job-card-modern reveal active">
                        <div className="job-header-modern">
                            <div>
                                <h3 className="job-title-modern">{item.title}</h3>
                                <div className="job-meta-modern">
                                    <span><i className="fas fa-briefcase"></i> {item.experience || item.role}</span>
                                    <span><i className="fas fa-map-marker-alt"></i> {item.location}</span>
                                </div>
                            </div>
                            <span className="job-type-badge">{item.job_type || item.package}</span>
                        </div>
                        <p className="job-desc-modern">{item.description ? item.description.substring(0, 150) + '...' : ''}</p>
                        <div className="job-footer-modern">
                            <a href={`/legacy/exampages/job_application?id=${item.id}`} className="btn-apply-modern">Apply Now <i className="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
        
                )) : (
                    <div className="empty-state">
                        <i className="fas fa-briefcase" style={{fontSize: '48px', color: '#ccc', marginBottom: '20px'}}></i>
                        <h3 style={{color: '#092a49'}}>No Openings Currently Available</h3>
                        <p style={{color: '#64748b'}}>Please check back later for new opportunities.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OriginalVacancies;
