import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './blog-premium.css';

const BlogDetail = () => {
  const { id } = useParams(); // Can be slug or numeric id
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();
        setBlog(data.blog);
        setRelated(data.related || []);
      } catch (err) {
        console.error('Error fetching blog detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogDetail();
      window.scrollTo(0, 0);
    }
  }, [id]);

  const handleCopyCode = (codeText, index) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIdx(index);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const handleShareCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="blog-master-wrapper d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3.5rem', height: '3.5rem' }}></div>
          <p className="mt-3 text-muted fw-semibold">Loading blueprint article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-master-wrapper py-5">
        <div className="container text-center py-5">
          <i className="fas fa-exclamation-triangle display-1 text-warning mb-3"></i>
          <h2 className="fw-bold">Article Not Found</h2>
          <p className="text-muted">The requested technical article could not be located or may have been archived.</p>
          <Link to="/blog" className="btn btn-primary rounded-pill px-4 mt-3">
            <i className="fas fa-arrow-left me-2"></i> Back to Blog Hub
          </Link>
        </div>
      </div>
    );
  }

  // Parse rich content blocks if JSON or render string fallback
  let blocks = [];
  if (blog.content) {
    try {
      const parsed = JSON.parse(blog.content);
      if (Array.isArray(parsed)) {
        blocks = parsed;
      } else {
        blocks = [{ type: 'paragraph', value: blog.content }];
      }
    } catch (e) {
      // String content
      blocks = [{ type: 'paragraph', value: blog.content }];
    }
  }

  return (
    <div className="blog-master-wrapper">
      <div className="container">
        
        {/* BREADCRUMB & HERO */}
        <section className="detail-hero-banner">
          <nav className="breadcrumb-custom">
            <Link to="/"><i className="fas fa-home me-1"></i> Home</Link>
            <i className="fas fa-chevron-right extra-small"></i>
            <Link to="/blog">Blog</Link>
            <i className="fas fa-chevron-right extra-small"></i>
            <span className="text-muted text-truncate" style={{ maxWidth: '200px' }}>{blog.category}</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge bg-primary rounded-pill px-3 py-2 fw-bold mb-3">
              <i className={`fas ${blog.category_icon || 'fa-tag'} me-1`}></i> {blog.category}
            </span>

            <h1 className="detail-main-title">{blog.title}</h1>

            <div className="author-detail-bar">
              <div className="d-flex align-items-center gap-3">
                {blog.author?.avatar ? (
                  <img src={blog.author.avatar} alt={blog.author.name} className="author-avatar-lg" />
                ) : (
                  <div className="author-initials" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
                    {blog.author?.name ? blog.author.name.charAt(0) : 'Y'}
                  </div>
                )}
                <div>
                  <div className="fw-bold text-dark">{blog.author?.name || 'YGR Tech Team'}</div>
                  <div className="text-muted small">{blog.author?.role || 'Senior Solutions Architect'}</div>
                </div>
              </div>

              <div className="ms-auto d-flex align-items-center gap-4 text-muted small">
                <span><i className="far fa-calendar-alt me-1"></i> {blog.created_at}</span>
                <span><i className="far fa-clock me-1"></i> {blog.reading_time}</span>
                <span><i className="far fa-eye me-1"></i> {blog.views_count} views</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURED BANNER IMAGE */}
        {blog.image && (
          <div className="detail-featured-img-frame">
            <img src={blog.image} alt={blog.title} />
          </div>
        )}

        {/* MAIN BODY LAYOUT */}
        <div className="row g-5">
          <div className="col-lg-8">
            {/* RICH CONTENT VIEWER */}
            <article className="rich-content-viewer">
              {/* Short summary introductory lead */}
              {blog.short_description && (
                <p className="lead fw-medium text-dark" style={{ fontSize: '1.25rem', lineHeight: '1.7', borderLeft: '4px solid #2563EB', paddingLeft: '20px' }}>
                  {blog.short_description}
                </p>
              )}

              {/* Render dynamic blocks */}
              {blocks.map((block, idx) => {
                if (block.type === 'heading') {
                  return <h2 key={idx}>{block.value}</h2>;
                }
                if (block.type === 'paragraph') {
                  return <p key={idx}>{block.value}</p>;
                }
                if (block.type === 'code') {
                  return (
                    <div key={idx} className="code-block-wrapper">
                      <div className="code-header">
                        <span><i className="fas fa-code me-2 text-primary"></i>{block.language || 'Code Snippet'}</span>
                        <button
                          type="button"
                          className="code-copy-btn"
                          onClick={() => handleCopyCode(block.code, idx)}
                        >
                          {copiedCodeIdx === idx ? <><i className="fas fa-check me-1"></i> Copied!</> : <><i className="far fa-copy me-1"></i> Copy Code</>}
                        </button>
                      </div>
                      <pre className="code-body"><code>{block.code}</code></pre>
                    </div>
                  );
                }
                if (block.type === 'quote') {
                  return (
                    <div key={idx} className="quote-block-wrapper">
                      <div className="quote-block-text">"{block.value}"</div>
                      {block.author && <div className="quote-block-author">— {block.author}</div>}
                    </div>
                  );
                }
                if (block.type === 'table') {
                  return (
                    <div key={idx} className="rich-table-wrapper">
                      <table className="rich-table">
                        <thead>
                          <tr>
                            {block.headers.map((h, hIdx) => <th key={hIdx}>{h}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((r, rIdx) => (
                            <tr key={rIdx}>
                              {r.map((c, cIdx) => <td key={cIdx}>{c}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return null;
              })}

              {/* YOUTUBE EMBED PLAYER */}
              {blog.youtube_url && (
                <div className="embed-responsive-wrapper">
                  <iframe
                    src={blog.youtube_url.includes('watch?v=') ? blog.youtube_url.replace('watch?v=', 'embed/') : blog.youtube_url}
                    title="YouTube Video Embed"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* PDF EMBED PLAYER */}
              {blog.pdf_url && (
                <div className="my-4 p-4 bg-white border rounded-4 shadow-sm">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="fw-bold m-0"><i className="far fa-file-pdf text-danger me-2"></i> Document Viewer</h5>
                    <a href={blog.pdf_url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary rounded-pill">
                      Open PDF in New Tab
                    </a>
                  </div>
                  <iframe src={blog.pdf_url} style={{ width: '100%', height: '400px', borderRadius: '12px', border: '1px solid #CBD5E1' }} title="PDF Document"></iframe>
                </div>
              )}

              {/* DOWNLOADABLE ATTACHMENTS */}
              {blog.attachments && blog.attachments.length > 0 && (
                <div className="attachments-card">
                  <h5 className="fw-bold text-dark mb-2"><i className="fas fa-paperclip text-primary me-2"></i> Downloadable Attachments</h5>
                  <p className="text-muted small mb-3">Download starter kits, whitepapers, and source code associated with this blueprint.</p>
                  {blog.attachments.map((att, attIdx) => (
                    <a key={attIdx} href={att.url} download className="attachment-pill">
                      <span><i className="far fa-file-alt text-primary me-2"></i> {att.name}</span>
                      <span className="badge bg-secondary rounded-pill">{att.size}</span>
                    </a>
                  ))}
                </div>
              )}
            </article>

            {/* SHARE BUTTONS */}
            <div className="share-bar">
              <span className="fw-bold text-dark me-2">Share Article:</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="share-btn"
                title="Share on LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noreferrer"
                className="share-btn"
                title="Share on Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="share-btn"
                title="Share on WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <button type="button" className="share-btn border-0 cursor-pointer" onClick={handleShareCopy} title="Copy Link">
                <i className="fas fa-link"></i>
              </button>
              {shareCopied && <span className="badge bg-success rounded-pill px-3">Link Copied!</span>}
            </div>
          </div>

          {/* RIGHT SIDEBAR: AUTHOR CARD & QUICK LINKS */}
          <div className="col-lg-4">
            <aside className="sticky-top" style={{ top: '100px' }}>
              <div className="p-4 bg-white border rounded-4 shadow-sm mb-4">
                <h5 className="fw-bold text-dark mb-3">About the Author</h5>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="author-initials" style={{ width: '56px', height: '56px', fontSize: '1.4rem' }}>
                    {blog.author?.name ? blog.author.name.charAt(0) : 'Y'}
                  </div>
                  <div>
                    <h6 className="fw-bold m-0">{blog.author?.name || 'YGR Tech Team'}</h6>
                    <span className="text-muted small">{blog.author?.role || 'Engineering Lead'}</span>
                  </div>
                </div>
                <p className="text-secondary small mb-0">
                  {blog.author?.bio || 'Leading technology innovations, distributed microservices, and enterprise AI blueprints at YGR Global.'}
                </p>
              </div>

              {/* BACK BUTTON */}
              <Link to="/blog" className="btn btn-outline-dark w-100 rounded-pill fw-bold py-2">
                <i className="fas fa-arrow-left me-2"></i> Explore All Insights
              </Link>
            </aside>
          </div>
        </div>

        {/* RELATED ARTICLES */}
        {related.length > 0 && (
          <section className="mt-5 pt-5 border-top">
            <h3 className="fw-bold text-dark mb-4">Related Engineering Articles</h3>
            <div className="row g-4">
              {related.map((rel) => (
                <div key={rel.id} className="col-md-4">
                  <article className="blog-card-24">
                    <div className="card-img-top-wrapper">
                      <img src={rel.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'} alt={rel.title} />
                      <span className="card-category-badge">{rel.category}</span>
                    </div>
                    <div className="card-body-custom">
                      <h5 className="blog-card-title">{rel.title}</h5>
                      <Link to={`/blog/${rel.slug}`} className="read-more-btn">
                        Read Story <i className="fas fa-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default BlogDetail;
