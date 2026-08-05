import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FALLBACK_PROJECTS = [
  { title:'Customer Care Portal', category:'Web', tech:['Django','React','PostgreSQL'], desc:'A full-featured customer support system with ticketing, live chat, and reporting dashboards.', color:'#0796fe', img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
  { title:'Trip Booking Platform', category:'Web', tech:['React','Node.js','MongoDB'], desc:'End-to-end travel booking platform with real-time availability, payments, and itinerary management.', color:'#27ae60', img:'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80' },
  { title:'CodeLabs UI/UX Portal', category:'Design', tech:['Figma','React','TailwindCSS'], desc:'Interactive learning portal for UI/UX training with course management and project showcases.', color:'#9b59b6', img:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80' },
  { title:'HR Management System', category:'Web', tech:['Django','React','SQLite'], desc:'Enterprise HRMS with attendance, leave, payroll, tasks, projects, and real-time communication.', color:'#e74c3c', img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80' },
  { title:'E-Commerce Mobile App', category:'Mobile', tech:['React Native','Firebase','Stripe'], desc:'Cross-platform shopping app with product catalogue, cart, secure payments, and order tracking.', color:'#fbcc27', img:'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
  { title:'Digital Marketing Dashboard', category:'Marketing', tech:['React','Python','Google Analytics API'], desc:'Unified marketing analytics dashboard aggregating SEO, social media, and ad performance.', color:'#1abc9c', img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
];

const CATS = ['All', 'Web', 'Mobile', 'Design', 'Marketing'];

const Portfolio = () => {
  const [active, setActive] = useState('All');
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/public/portfolio/')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <>
      <style>{`
        .port-hero { background:linear-gradient(135deg,#092a49 0%,#1e3c72 100%); padding:80px 30px; text-align:center; }
        .port-hero h1 { font-family:'Oswald','Outfit',sans-serif; font-size:clamp(2rem,5vw,3rem); color:#fff; font-weight:700; margin-bottom:14px; }
        .port-hero p { color:rgba(255,255,255,0.8); font-size:17px; max-width:580px; margin:0 auto 14px; }
        .port-breadcrumb { color:rgba(255,255,255,0.6); font-size:14px; }
        .port-breadcrumb a { color:#fbcc27; text-decoration:none; }

        .port-filter { background:#fff; padding:20px 30px; border-bottom:1px solid #eee; position:sticky; top:70px; z-index:90; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
        .port-filter-inner { max-width:1200px; margin:0 auto; display:flex; gap:10px; flex-wrap:wrap; }
        .port-filter-btn { padding:8px 22px; border-radius:50px; border:2px solid #dde6f5; background:#fff; color:#555; font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s; font-family:inherit; }
        .port-filter-btn.active,.port-filter-btn:hover { background:#092a49; color:#fff; border-color:#092a49; }

        .port-body { padding:60px 30px; background:#f8fafc; }
        .port-inner { max-width:1200px; margin:0 auto; }
        .port-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:28px; }
        .port-card { background:#fff; border-radius:18px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.07); transition:transform 0.3s,box-shadow 0.3s; }
        .port-card:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(0,0,0,0.13); }
        .port-card-img { position:relative; height:200px; overflow:hidden; }
        .port-card-img img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s; }
        .port-card:hover .port-card-img img { transform:scale(1.08); }
        .port-card-cat { position:absolute; top:12px; right:12px; background:rgba(9,42,73,0.85); color:#fff; font-size:11px; font-weight:700; padding:4px 10px; border-radius:20px; letter-spacing:1px; text-transform:uppercase; }
        .port-card-body { padding:24px 26px; }
        .port-card-body h3 { font-family:'Oswald','Outfit',sans-serif; color:#092a49; font-size:1.15rem; font-weight:700; margin-bottom:10px; }
        .port-card-body p { color:#666; font-size:13px; line-height:1.7; margin-bottom:16px; }
        .port-tech-tags { display:flex; gap:6px; flex-wrap:wrap; }
        .port-tag { background:#f0f4ff; color:#0796fe; font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px; }

        .port-cta { text-align:center; margin-top:60px; padding:60px 30px; background:#fff; border-radius:20px; box-shadow:0 4px 20px rgba(0,0,0,0.06); }
        .port-cta h2 { font-family:'Oswald','Outfit',sans-serif; color:#092a49; font-size:2rem; font-weight:700; margin-bottom:14px; }
        .port-cta p { color:#666; margin-bottom:28px; }
        .port-cta-btn { padding:14px 36px; border-radius:50px; background:linear-gradient(135deg,#092a49,#1e3c72); color:#fff; border:none; cursor:pointer; font-size:15px; font-weight:700; transition:all 0.3s; font-family:inherit; }
        .port-cta-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(9,42,73,0.3); }

        @media (max-width:600px) { .port-grid { grid-template-columns:1fr; } }
      `}</style>

      <div className="port-hero">
        <h1>Our Portfolio</h1>
        <p>Explore our diverse range of projects delivered for clients across industries.</p>
        <div className="port-breadcrumb"><a href="/">Home</a> › Portfolio</div>
      </div>

      <div className="port-filter">
        <div className="port-filter-inner">
          {CATS.map(c => (
            <button key={c} className={`port-filter-btn${active === c ? ' active' : ''}`} onClick={() => setActive(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div className="port-body">
        <div className="port-inner">
          <div className="port-grid">
            {filtered.map((p, i) => (
              <div key={i} className="port-card">
                <div className="port-card-img">
                  {p.img && <img src={p.img} alt={p.title} />}
                  <span className="port-card-cat">{p.category}</span>
                </div>
                <div className="port-card-body">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="port-tech-tags">{(p.tech || []).map((t, j) => <span key={j} className="port-tag">{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="port-cta">
            <h2>Have a Project in Mind?</h2>
            <p>Let's build something great together. Share your requirements and get a free quote.</p>
            <button className="port-cta-btn" onClick={() => navigate('/contact')}>Start Your Project →</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
