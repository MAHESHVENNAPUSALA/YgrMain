import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogList.css';


const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/public/blogs/');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                setBlogs(data);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <>
            <div className="blog-main-container mesh-gradient animated-bg">
                <div className="blog-hero reveal active">
                    <div className="container">
                        <div className="section-head1">
                            <span>Knowledge Hub</span>
                            <h1>Latest Insights</h1>
                            <p>Explore articles on software architecture, digital strategy, and the future of technology.</p>
                        </div>
                    </div>
                </div>

                <div className="blog-grid">
                    {loading ? (
                        <div style={{textAlign: 'center', gridColumn: '1 / -1', padding: '50px'}}>Loading blogs...</div>
                    ) : error ? (
                        <div style={{textAlign: 'center', gridColumn: '1 / -1', padding: '50px', color: 'red'}}>Error: {error}</div>
                    ) : blogs.length === 0 ? (
                        <div className="empty-blog-state reveal active">
                            <i className="far fa-newspaper" style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px', display: 'block' }}></i>
                            <h2>No Articles Found</h2>
                            <p>Our experts are currently drafting new insights. Please check back soon!</p>
                        </div>
                    ) : (
                        blogs.map(blog => (
                            <article key={blog.id} className="blog-card-modern reveal active">
                                <div className="blog-image-wrapper">
                                    <img src={blog.image} alt={blog.title} />
                                </div>
                                
                                <div className="blog-content">
                                    <span className="blog-date">Featured Article</span>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.description ? (blog.description.length > 100 ? blog.description.substring(0, 100) + '...' : blog.description) : ''}</p>

                                    <Link to={`/blog/${blog.id}`} className="blog-link">
                                        Read Full Story <i className="fas fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogList;
