import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Testimonials.css';

const DEFAULT_TESTIMONIALS = [
  {
    id: '1',
    client_name: 'David Miller',
    role: 'Chief Technology Officer',
    company_name: 'FinTech Dynamics',
    country: 'USA',
    message: 'YGR Gobal delivered our core cloud payment engine 3 weeks ahead of schedule. Their zero-trust security architecture gave us complete peace of mind.',
    rating: 5
  },
  {
    id: '2',
    client_name: 'Sarah Jenkins',
    role: 'VP of Engineering',
    company_name: 'CloudScale Logistics',
    country: 'Canada',
    message: 'The speed and execution quality of YGR senior engineers are outstanding. They seamlessly integrated with our team and scaled our mobile app to 1M+ users.',
    rating: 5
  },
  {
    id: '3',
    client_name: 'Vikram Malhotra',
    role: 'Managing Director',
    company_name: 'Apex Health Systems',
    country: 'UK',
    message: 'Working with YGR transformed our digital presence. Their data-driven marketing and custom web portal delivered a 300% surge in qualified client leads.',
    rating: 5
  }
];

const getInitials = (name) => {
  if (!name) return 'YG';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const AVATAR_COLORS = ['#2563EB', '#7C3AED', '#14B8A6', '#F59E0B', '#0B1220'];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    fetch('/api/public/testimonials/')
      .then((res) => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch((err) => {
        console.warn('Falling back to default testimonials:', err);
      });
  }, []);

  return (
    <section className="premium-testi-section" ref={ref}>
      <div className="corp-container">
        
        {/* Section Header */}
        <motion.div 
          className="section-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow-badge">
            <i className="fas fa-quote-left"></i>
            <span>Client Trust & Impact</span>
          </div>
          <h2 className="section-heading">
            What Enterprise Leaders <br/>
            <span className="text-gradient">Say About YGR</span>
          </h2>
          <p className="section-subtext">
            Read dynamic testimonials from CTOs, product leaders, and enterprise partners connected to our live backend.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="pt-grid">
          {testimonials.map((item, idx) => {
            const initials = getInitials(item.client_name);
            const avatarBg = AVATAR_COLORS[idx % AVATAR_COLORS.length];
            const starCount = item.rating || 5;

            return (
              <motion.div 
                key={item.id || idx} 
                className="pt-card glass-panel"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
              >
                <div className="pt-quote-icon">
                  <i className="fas fa-quote-right"></i>
                </div>
                
                <div className="pt-stars">
                  {[...Array(starCount)].map((_, i) => (
                    <i key={i} className="fas fa-star text-gold"></i>
                  ))}
                </div>

                <p className="pt-quote-text">
                  "{item.message}"
                </p>

                <div className="pt-author-row">
                  <div className="pt-avatar" style={{ backgroundColor: avatarBg }}>
                    {initials}
                  </div>
                  <div className="pt-author-info">
                    <h4>{item.client_name}</h4>
                    <p>
                      {item.role ? `${item.role} • ` : ''}
                      <span>{item.company_name || 'Enterprise Client'}</span>
                      {item.country ? ` (${item.country})` : ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
