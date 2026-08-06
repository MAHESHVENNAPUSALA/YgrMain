import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './blog-premium.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trending, setTrending] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  // Fetch blogs, categories, and trending posts from Django REST API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [blogsRes, catRes, trendingRes] = await Promise.all([
          fetch('/api/blogs'),
          fetch('/api/blog/categories'),
          fetch('/api/blog/trending')
        ]);

        if (blogsRes.ok) {
          const blogsData = await blogsRes.json();
          setBlogs(blogsData);
        }
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData);
        }
        if (trendingRes.ok) {
          const trendingData = await trendingRes.json();
          setTrending(trendingData);
        }
      } catch (err) {
        console.error('Error fetching blog data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered blogs logic for Live Search & Category Pills
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        (blog.category && blog.category.toLowerCase() === selectedCategory.toLowerCase());

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        (blog.short_description && blog.short_description.toLowerCase().includes(query)) ||
        (blog.tags && blog.tags.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  // Featured blog (first featured blog or first item in list)
  const featuredBlog = useMemo(() => {
    return blogs.find((b) => b.is_featured) || blogs[0] || null;
  }, [blogs]);

  // Handle Newsletter Submission
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    try {
      const res = await fetch('/api/blog/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletterStatus({ type: 'success', message: data.message || 'Subscribed successfully!' });
        setNewsletterEmail('');
      } else {
        setNewsletterStatus({ type: 'error', message: data.error || 'Failed to subscribe.' });
      }
    } catch (err) {
      setNewsletterStatus({ type: 'error', message: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="blog-master-wrapper">
      <div className="container">
        
        {/* ================= 1. HERO MODULE ================= */}
        <section className="blog-hero-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="blog-hero-badge">
              <span className="pulse-dot"></span>
              YGR Tech Insights & Engineering Blueprint
            </div>
            <h1 className="blog-hero-title">
              Engineering <span className="highlight-blue">Excellence</span> & <br />
              Digital <span className="highlight-green">Innovation Hub</span>
            </h1>
            <p className="blog-hero-subtitle">
              Explore deep technical whitepapers, architectural blueprints, and industry insights written by YGR Global enterprise architects and software leaders.
            </p>
          </motion.div>

          {/* ================= 3. SEARCH MODULE ================= */}
          <motion.div
            className="blog-search-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="blog-search-box">
              <i className="fas fa-search" style={{ color: '#2563EB', marginRight: '12px' }}></i>
              <input
                type="text"
                placeholder="Search articles by topic, Java, AI, Cloud, React..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" className="search-btn">
                Live Search
              </button>
            </div>
          </motion.div>

          {/* ================= 4. CATEGORIES MODULE ================= */}
          <motion.div
            className="categories-shelf mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              className={`category-pill ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              <i className="fas fa-layer-group"></i> All Articles
              <span className="count-badge">{blogs.length}</span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-pill ${selectedCategory === cat.name ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <i className={`fas ${cat.icon || 'fa-code'}`}></i> {cat.name}
                <span className="count-badge">{cat.post_count}</span>
              </button>
            ))}
          </motion.div>
        </section>

        {/* ================= 2. FEATURED BLOG MODULE ================= */}
        {featuredBlog && selectedCategory === 'All' && !searchQuery && (
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="featured-blog-card">
              <div className="row g-0 align-items-center">
                <div className="col-lg-6">
                  <div className="featured-image-wrapper">
                    <img
                      src={featuredBlog.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                      alt={featuredBlog.title}
                    />
                    <div className="featured-badge">
                      <i className="fas fa-star me-1"></i> Spotlight Blueprint
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="featured-content-padding">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="badge bg-primary rounded-pill px-3 py-2">
                        {featuredBlog.category}
                      </span>
                      <span className="text-muted small">
                        <i className="far fa-clock me-1"></i> {featuredBlog.reading_time}
                      </span>
                    </div>

                    <h2 className="fw-extrabold mb-3 text-dark" style={{ fontSize: '1.8rem', lineHeight: '1.3' }}>
                      {featuredBlog.title}
                    </h2>

                    <p className="text-secondary mb-4" style={{ fontSize: '1.02rem', lineHeight: '1.6' }}>
                      {featuredBlog.short_description}
                    </p>

                    <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                      <div className="d-flex align-items-center gap-2">
                        <div className="author-initials">
                          {featuredBlog.author?.name ? featuredBlog.author.name.charAt(0) : 'Y'}
                        </div>
                        <div>
                          <div className="fw-bold text-dark small">{featuredBlog.author?.name || 'YGR Architect'}</div>
                          <div className="text-muted extra-small" style={{ fontSize: '0.78rem' }}>
                            {featuredBlog.created_at}
                          </div>
                        </div>
                      </div>

                      <Link to={`/blog/${featuredBlog.slug}`} className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm">
                        Read Story <i className="fas fa-arrow-right ms-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* MAIN BODY GRID WITH SIDEBAR */}
        <div className="row g-4 mt-2">
          {/* LEFT: 5. LATEST BLOGS GRID */}
          <div className="col-lg-8">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h3 className="fw-bold m-0 text-dark" style={{ fontSize: '1.5rem' }}>
                {selectedCategory === 'All' ? 'Latest Architecture & Engineering Articles' : `${selectedCategory} Articles`}
              </h3>
              <span className="text-muted small fw-semibold">
                Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
              </span>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                <p className="mt-3 text-muted">Loading insights from backend...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-5 bg-white rounded-4 border p-5">
                <i className="fas fa-search-minus text-muted display-4 mb-3"></i>
                <h4 className="fw-bold text-dark">No Articles Found</h4>
                <p className="text-muted">No articles matched your criteria. Try adjusting your search query or selecting a different category.</p>
                <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="row g-4">
                <AnimatePresence>
                  {filteredBlogs.map((blog, idx) => (
                    <motion.div
                      key={blog.id}
                      className="col-md-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      <article className="blog-card-24">
                        <div className="card-img-top-wrapper">
                          <img
                            src={blog.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                            alt={blog.title}
                          />
                          <span className="card-category-badge">{blog.category}</span>
                          <span className="card-reading-time">
                            <i className="far fa-clock me-1"></i> {blog.reading_time}
                          </span>
                        </div>

                        <div className="card-body-custom">
                          <div className="card-meta-line">
                            <span className="author-initials">{blog.author?.name ? blog.author.name.charAt(0) : 'Y'}</span>
                            <span className="fw-semibold text-dark">{blog.author?.name || 'YGR Tech Team'}</span>
                            <span className="ms-auto text-muted">{blog.created_at}</span>
                          </div>

                          <h4 className="blog-card-title">{blog.title}</h4>
                          <p className="blog-card-excerpt">{blog.short_description}</p>

                          <Link to={`/blog/${blog.slug}`} className="read-more-btn">
                            Read Blueprint Article <i className="fas fa-chevron-right"></i>
                          </Link>
                        </div>
                      </article>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* RIGHT: 6. TRENDING ARTICLES SIDEBAR */}
          <div className="col-lg-4">
            <aside className="trending-container sticky-top" style={{ top: '100px', zIndex: 10 }}>
              <div className="trending-header">
                <i className="fas fa-fire-alt"></i> Trending Articles
              </div>

              {trending.length === 0 ? (
                <p className="text-muted small">No trending posts yet.</p>
              ) : (
                trending.map((item, index) => (
                  <Link key={item.id} to={`/blog/${item.slug}`} className="trending-item">
                    <div className="trending-number">0{index + 1}</div>
                    <div>
                      <div className="trending-title">{item.title}</div>
                      <div className="trending-meta">
                        <span><i className="far fa-eye me-1"></i> {item.views_count} views</span>
                        <span>•</span>
                        <span>{item.category}</span>
                      </div>
                    </div>
                  </Link>
                ))
              )}

              {/* CATEGORY EXPLORER QUICK CARD */}
              <div className="p-4 rounded-4 bg-light border mt-4">
                <h5 className="fw-bold text-dark mb-2">Need Custom Enterprise Solutions?</h5>
                <p className="text-muted small mb-3">Consult our senior software architects for AI, Cloud & Fullstack modernization.</p>
                <Link to="/contact" className="btn btn-dark w-100 rounded-pill fw-bold btn-sm py-2">
                  Talk to an Architect
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* ================= 7. NEWSLETTER MODULE ================= */}
        <section>
          <div className="newsletter-card text-center">
            <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <span className="badge bg-success rounded-pill px-3 py-2 mb-3 fw-bold" style={{ letterSpacing: '0.05em' }}>
                <i className="fas fa-envelope-open-text me-1"></i> STAY AHEAD OF THE CURVE
              </span>
              <h2 className="fw-extrabold text-white mb-3" style={{ fontSize: '2.2rem' }}>
                Subscribe to YGR Engineering Pulse
              </h2>
              <p className="text-light opacity-75">
                Join 15,000+ technology leaders and developers receiving our bi-weekly architecture insights, AI benchmarks, and cloud tutorials.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="newsletter-box">
                <input
                  type="email"
                  placeholder="Enter your corporate email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit">
                  Subscribe Free <i className="fas fa-paper-plane ms-1"></i>
                </button>
              </form>

              {newsletterStatus && (
                <motion.div
                  className={`alert mt-3 py-2 px-3 rounded-pill small ${newsletterStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {newsletterStatus.message}
                </motion.div>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default BlogList;
