import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.css';


const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // The API URL might be /api/public/projects/ depending on how Vite proxy is set up.
                // Assuming it works with the backend running on the same host or via proxy
                const response = await fetch('/api/public/projects/');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const openLightbox = (src) => {
        const lb = document.getElementById('lightbox');
        const lbImg = document.getElementById('lightboxImg');
        if(lb && lbImg) {
            lbImg.src = src;
            lb.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeLightbox = () => {
        const lb = document.getElementById('lightbox');
        if(lb) {
            lb.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    const updateProjectView = (e, src, id) => {
        const mainImg = document.getElementById('mainImage' + id);
        if(mainImg) {
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = src;
                mainImg.style.opacity = '1';
            }, 200);
        }

        const gallery = e.target.parentElement;
        gallery.querySelectorAll('.thumb-item').forEach(img => img.classList.remove('active'));
        e.target.classList.add('active');
    };

    return (
        <>
            <div className="portfolio-main-container mesh-gradient animated-bg">
                <div className="portfolio-hero reveal active">
                    <div className="container">
                        <div className="section-head1">
                            <span>Showcase</span>
                            <h1>Engineering Excellence</h1>
                            <p>A curated collection of digital products and enterprise solutions delivered globally.</p>
                        </div>
                    </div>
                </div>

                <div className="projects-grid">
                    {loading ? (
                        <div style={{textAlign: 'center', gridColumn: '1 / -1', padding: '50px'}}>Loading projects...</div>
                    ) : error ? (
                        <div style={{textAlign: 'center', gridColumn: '1 / -1', padding: '50px', color: 'red'}}>Error: {error}</div>
                    ) : projects.length === 0 ? (
                        <div style={{textAlign: 'center', gridColumn: '1 / -1', padding: '50px'}}>No projects found.</div>
                    ) : (
                        projects.map(project => (
                            <div key={project.id} className="project-card-modern reveal active">
                                <div className="project-badge">SUCCESSFUL DELIVERY</div>
                                
                                <div className="project-image-wrapper img-zoom-container" 
                                     onClick={() => openLightbox(document.getElementById('mainImage' + project.id)?.src)}>
                                    <div id={"lens" + project.id} className="zoom-lens"></div>
                                    <img id={"mainImage" + project.id} 
                                         className="project-main-img" 
                                         src={project.image1} 
                                         alt={project.name}
                                         style={{ cursor: 'zoom-in', transition: 'opacity 0.3s' }}
                                    />
                                </div>

                                <div className="thumbnail-gallery">
                                    {project.image1 && (
                                        <img src={project.image1} className="thumb-item active" onClick={(e) => updateProjectView(e, project.image1, project.id)} alt="thumb1" />
                                    )}
                                    {project.image2 && (
                                        <img src={project.image2} className="thumb-item" onClick={(e) => updateProjectView(e, project.image2, project.id)} alt="thumb2" />
                                    )}
                                    {project.image3 && (
                                        <img src={project.image3} className="thumb-item" onClick={(e) => updateProjectView(e, project.image3, project.id)} alt="thumb3" />
                                    )}
                                    {project.image4 && (
                                        <img src={project.image4} className="thumb-item" onClick={(e) => updateProjectView(e, project.image4, project.id)} alt="thumb4" />
                                    )}
                                </div>

                                <div className="project-content">
                                    <h3>{project.name}</h3>
                                    <div className="project-meta">
                                        <div className="meta-item">
                                            <i className="far fa-calendar-alt"></i>
                                            <span>{project.time_taken}</span>
                                        </div>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="visit-link">
                                                Live Demo <i className="fas fa-external-link-alt"></i>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div id="zoomPreview" className="zoom-preview-container"></div>

            <div id="lightbox" className="lightbox-overlay" onClick={closeLightbox}>
                <div className="lightbox-close"><i className="fas fa-times"></i></div>
                <img id="lightboxImg" className="lightbox-content" src="" alt="Preview" />
            </div>
        </>
    );
};

export default ProjectList;
