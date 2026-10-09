import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/apiClient';

const WhatsAppFloatingIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'contact' | 'direct'
  const [unread, setUnread] = useState(1);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Support & Inquiry',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // { type: 'success'|'error', text: '' }

  const chatContainerRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! 👋 Welcome to YGR Gobal IT Services support. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      chips: [
        { label: '💼 All IT Services', query: 'List all software services' },
        { label: '🎓 Internship & Placement', query: 'Tell me about internship programs' },
        { label: '📞 WhatsApp Support', action: 'whatsapp' },
        { label: '✉️ Send Inquiry Form', action: 'open_form' }
      ]
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
    }
  }, [isOpen]);

  // Direct ScrollToBottom Handler
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (activeTab === 'chat' && isOpen) {
      scrollToBottom();
      // Double check after layout paint / typing animation
      const timer = setTimeout(scrollToBottom, 80);
      return () => clearTimeout(timer);
    }
  }, [messages, isTyping, activeTab, isOpen]);

  const toggleWidget = () => {
    setIsOpen(prev => !prev);
  };

  const getBotResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('service') || q.includes('software') || q.includes('offer') || q.includes('all')) {
      return {
        text: "💼 **YGR Gobal IT Services — Comprehensive Service Offerings:**\n\n" +
              "1️⃣ **Web App Development:** Custom React, Next.js, Django, Node.js & PWA solutions.\n" +
              "2️⃣ **Mobile App Development:** Native iOS, Android, React Native & Flutter apps.\n" +
              "3️⃣ **Digital Marketing & SEO:** Data-driven Google Ads, PPC, SEO & Content Strategy.\n" +
              "4️⃣ **UI/UX Design & Prototyping:** Wireframing, Figma design systems & UX research.\n" +
              "5️⃣ **Cloud Infrastructure & DevOps:** AWS/Azure setup, Docker, Kubernetes & CI/CD pipelines.\n" +
              "6️⃣ **AI & Process Automation:** LLM integration, OpenAI agents & automated workflows.\n" +
              "7️⃣ **24/7 SLA Maintenance & IT Support:** Server monitoring, bug fixing & security updates.\n" +
              "8️⃣ **IT Training & Internships:** Corporate project training + 100% placement support.\n\n" +
              "Which service would you like to inquire about?",
        chips: [
          { label: '🌐 Web Development', query: 'Tell me about Web Development' },
          { label: '📱 Mobile Apps', query: 'Tell me about Mobile Apps' },
          { label: '🤖 AI & Automation', query: 'Tell me about AI and Automation' },
          { label: '🎓 Internships', query: 'Tell me about Internship Programs' },
          { label: '✉️ Request Quote on WhatsApp', action: 'open_form' }
        ]
      };
    } else if (q.includes('internship') || q.includes('training') || q.includes('course') || q.includes('student')) {
      return {
        text: "🎓 **YGR Internship & Training Programs:**\n\n" +
              "• **Technologies:** Python Full-Stack, React, Java, Cloud DevOps, AI/ML.\n" +
              "• **Highlights:** Live enterprise projects, code reviews, and industry certifications.\n" +
              "• **Placement Assistance:** 1-on-1 resume building, mock interviews & direct corporate referrals.\n\n" +
              "Ready to launch your IT career?",
        chips: [
          { label: '📝 Submit Application Inquiry', action: 'open_form' },
          { label: '💬 Chat with Counselor on WhatsApp', action: 'whatsapp' }
        ]
      };
    } else if (q.includes('web')) {
      return {
        text: "🌐 **Web Development Services:**\nWe build modern, ultra-fast, and SEO-optimized web applications using React, Next.js, Python/Django, and Node.js. Includes responsive mobile design, API integration, and cloud deployment.",
        chips: [
          { label: '✉️ Send Inquiry Form', action: 'open_form' },
          { label: '💼 All IT Services', query: 'List all software services' }
        ]
      };
    } else if (q.includes('mobile') || q.includes('app')) {
      return {
        text: "📱 **Mobile App Development:**\nHigh-performance iOS and Android applications built using React Native & Flutter for cross-platform efficiency, complete with App Store & Google Play publishing.",
        chips: [
          { label: '✉️ Send Inquiry Form', action: 'open_form' },
          { label: '💼 All IT Services', query: 'List all software services' }
        ]
      };
    } else if (q.includes('ai') || q.includes('automation')) {
      return {
        text: "🤖 **AI & Process Automation:**\nCustom LLM fine-tuning, OpenAI API integrations, smart customer support bots, automated data processing pipelines, and predictive analytics for your business.",
        chips: [
          { label: '✉️ Request AI Demo', action: 'open_form' },
          { label: '💼 All IT Services', query: 'List all software services' }
        ]
      };
    } else if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('reach') || q.includes('address') || q.includes('number')) {
      return {
        text: "📞 **Contact YGR Gobal IT Services:**\n\n" +
              "• 📱 **WhatsApp / Call:** +91 77940 53340\n" +
              "• 📧 **Email:** info@ygrgobalitservices.com / support@ygrgobalitservices.com\n" +
              "• 📍 **Hyderabad Office:** Manjeera Trinity Corporate, Next to Lulu Mall, Kukatpally, Hyderabad 500072\n" +
              "• 🕒 **Support Hours:** Mon - Fri: 9:30 AM - 6:30 PM IST (24/7 SLA IT Support)",
        chips: [
          { label: '💬 Open WhatsApp (+91 77940 53340)', action: 'whatsapp' },
          { label: '✉️ Send Inquiry Message', action: 'open_form' }
        ]
      };
    } else if (q.includes('placement') || q.includes('job') || q.includes('hiring') || q.includes('career')) {
      return {
        text: "🚀 **Job Placement Support:**\nWe offer end-to-end career guidance, technical interview prep, soft skills training, resume polish, and direct placement connections with hiring companies.",
        chips: [
          { label: '🎓 Internship Details', query: 'Tell me about internship programs' },
          { label: '✉️ Send Inquiry Form', action: 'open_form' }
        ]
      };
    } else {
      return {
        text: "Thank you for asking! 😊 Our team is ready to assist you. You can check all our software services, submit a direct inquiry form, or chat directly with us on WhatsApp.",
        chips: [
          { label: '💼 All IT Services', query: 'List all software services' },
          { label: '✉️ Submit Support Inquiry', action: 'open_form' },
          { label: '💬 Chat on WhatsApp', action: 'whatsapp' }
        ]
      };
    }
  };

  const handleSendMessage = (textToSend) => {
    const messageText = textToSend || inputMsg;
    if (!messageText.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMsgObj = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      time: timeStr
    };

    setMessages(prev => [...prev, userMsgObj]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    // Bot Typing Delay
    setTimeout(() => {
      const responseData = getBotResponse(messageText);
      const botMsgObj = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseData.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: responseData.chips
      };

      setMessages(prev => [...prev, botMsgObj]);
      setIsTyping(false);
    }, 700);
  };

  const handleChipClick = (chip) => {
    if (chip.action === 'open_form') {
      setActiveTab('contact');
    } else if (chip.action === 'open_direct') {
      setActiveTab('direct');
    } else if (chip.action === 'whatsapp') {
      window.open('https://wa.me/917794053340?text=Hello%20YGR%20Support,%20I%20have%20an%20inquiry.', '_blank');
    } else if (chip.query) {
      handleSendMessage(chip.query);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: 'error', text: 'Please fill in required fields (Name, Email, Message).' });
      return;
    }

    setFormLoading(true);
    setFormStatus(null);

    // 1. Submit to Backend API
    try {
      await api.post('/api/contact/', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message
      });
    } catch (err) {
      console.warn('API submission notice:', err);
    }

    // 2. Format message for direct WhatsApp dispatch
    const waMessage = `Hello YGR Support!\n\nI am submitting a new inquiry:\n👤 *Name:* ${formData.name}\n📧 *Email:* ${formData.email}\n📱 *Phone:* ${formData.phone || 'N/A'}\n💼 *Service:* ${formData.service}\n💬 *Message:* ${formData.message}`;
    const waUrl = `https://wa.me/917794053340?text=${encodeURIComponent(waMessage)}`;

    setFormStatus({ 
      type: 'success', 
      text: 'Inquiry submitted successfully! Opening WhatsApp to send your message directly...' 
    });

    setFormLoading(false);

    // Open WhatsApp directly after short delay
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'General Support & Inquiry',
        message: ''
      });
    }, 1200);
  };

  return (
    <>
      {/* ── Chat Widget Popup Modal ── */}
      {isOpen && (
        <div className="ygr-support-widget-modal">
          {/* Header */}
          <div className="support-widget-header">
            <div className="header-info">
              <div className="avatar-box">
                <i className="fas fa-robot"></i>
                <span className="online-indicator"></span>
              </div>
              <div>
                <h4 className="header-title">YGR Support & AI Assistant</h4>
                <p className="header-status">● Live Online | WhatsApp: +91 77940 53340</p>
              </div>
            </div>
            <button className="widget-close-btn" onClick={toggleWidget} aria-label="Close Chat">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="support-widget-tabs">
            <button 
              className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <i className="fas fa-comments"></i> AI Chat
            </button>
            <button 
              className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              <i className="fas fa-paper-plane"></i> Send Inquiry
            </button>
            <button 
              className={`tab-btn ${activeTab === 'direct' ? 'active' : ''}`}
              onClick={() => setActiveTab('direct')}
            >
              <i className="fas fa-headset"></i> Direct Support
            </button>
          </div>

          {/* TAB 1: AI Chat Assistant */}
          {activeTab === 'chat' && (
            <div className="support-tab-content chat-tab">
              <div className="chat-messages-container" ref={chatContainerRef}>
                {messages.map(msg => (
                  <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
                    {msg.sender === 'bot' && (
                      <div className="message-avatar">
                        <i className="fas fa-robot"></i>
                      </div>
                    )}
                    <div className="message-bubble-wrapper">
                      <div className="message-bubble">
                        {msg.text.split('\n').map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            {idx < msg.text.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                      <span className="message-time">{msg.time}</span>

                      {/* Quick Action Prompt Chips */}
                      {msg.chips && msg.chips.length > 0 && (
                        <div className="chat-chips-container">
                          {msg.chips.map((chip, cIdx) => (
                            <button
                              key={cIdx}
                              className="chat-chip-btn"
                              onClick={() => handleChipClick(chip)}
                            >
                              {chip.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="chat-message-row bot">
                    <div className="message-avatar">
                      <i className="fas fa-robot"></i>
                    </div>
                    <div className="message-bubble-wrapper">
                      <div className="typing-indicator-bubble">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Footer */}
              <form className="chat-input-form" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                <input
                  type="text"
                  placeholder="Ask about services, internships, contact..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                />
                <button type="submit" className="send-msg-btn" disabled={!inputMsg.trim()}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: Quick Inquiry Contact Form */}
          {activeTab === 'contact' && (
            <div className="support-tab-content contact-tab">
              <div className="contact-form-header">
                <h5>Send Inquiry to WhatsApp & Email</h5>
                <p>Fill out details below — submits to backend and sends directly to our WhatsApp support!</p>
              </div>

              {formStatus && (
                <div className={`form-status-alert ${formStatus.type}`}>
                  <i className={formStatus.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>
                  <span>{formStatus.text}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="support-inquiry-form">
                <div className="form-group-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group-row">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone / WhatsApp Number"
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                  <select name="service" value={formData.service} onChange={handleFormChange}>
                    <option value="General Support & Inquiry">General Support</option>
                    <option value="Web & Mobile App Development">Web & Mobile Development</option>
                    <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                    <option value="UI/UX Design Services">UI/UX Design</option>
                    <option value="Cloud Infrastructure & DevOps">Cloud & DevOps</option>
                    <option value="AI & Process Automation">AI & Process Automation</option>
                    <option value="24/7 SLA IT Support">24/7 SLA Maintenance</option>
                    <option value="Internship & Training Programs">Internship & Training</option>
                  </select>
                </div>

                <textarea
                  name="message"
                  rows="3"
                  placeholder="How can we help you? Describe your question or requirement *"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                ></textarea>

                <button type="submit" className="submit-inquiry-btn" disabled={formLoading}>
                  {formLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Submitting & Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <i className="fab fa-whatsapp"></i> Send to WhatsApp & Submit
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: Direct Support Links */}
          {activeTab === 'direct' && (
            <div className="support-tab-content direct-tab">
              <div className="direct-header">
                <h5>Get In Touch Directly</h5>
                <p>Connect with our engineering and support specialists instantly.</p>
              </div>

              <div className="direct-action-cards">
                <a
                  href="https://wa.me/917794053340?text=Hello%20YGR%20Support,%20I%20need%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-card whatsapp-card"
                >
                  <div className="card-icon">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div className="card-info">
                    <h6>WhatsApp Support</h6>
                    <p>Instant responses from our team</p>
                    <span className="card-action-text">+91 77940 53340 <i className="fas fa-arrow-right"></i></span>
                  </div>
                </a>

                <a
                  href="mailto:support@ygrgobalitservices.com"
                  className="direct-card email-card"
                >
                  <div className="card-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="card-info">
                    <h6>Email Support</h6>
                    <p>Formal inquiries & technical SLAs</p>
                    <span className="card-action-text">info@ygrgobalitservices.com <i className="fas fa-arrow-right"></i></span>
                  </div>
                </a>

                <a
                  href="tel:+917794053340"
                  className="direct-card phone-card"
                >
                  <div className="card-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="card-info">
                    <h6>Direct Phone Call</h6>
                    <p>Mon - Fri: 9:30 AM - 6:30 PM IST</p>
                    <span className="card-action-text">Call +91 77940 53340 <i className="fas fa-arrow-right"></i></span>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Floating Bot Action Button ── */}
      <div className="ultra-premium-chat-widget">
        {unread > 0 && <span className="unread-badge">{unread}</span>}
        <div className="chat-tooltip">{isOpen ? 'Close Support' : 'Chat with YGR Support'}</div>
        <button
          className="chat-button-core"
          aria-label="Contact Support"
          onClick={toggleWidget}
        >
          <div className="pulse-ring pulse-ring-1" style={{ background: '#38BDF8' }}></div>
          <div className="pulse-ring pulse-ring-2" style={{ background: '#38BDF8' }}></div>
          <div className="icon-container" style={{ background: 'linear-gradient(135deg, #1E3A8A, #38BDF8)' }}>
            <i className={isOpen ? "fas fa-times" : "fas fa-robot"} style={{ color: '#ffffff', background: 'none', WebkitTextFillColor: 'initial' }}></i>
          </div>
        </button>
      </div>

      {/* ── Scoped Styling for Support Widget ── */}
      <style>{`
        .ygr-support-widget-modal {
          position: fixed;
          bottom: 110px;
          right: 35px;
          width: 390px;
          max-width: calc(100vw - 30px);
          height: 550px;
          max-height: calc(100vh - 140px);
          background: #FFFFFF;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.08);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: widgetSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        @keyframes widgetSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .support-widget-header {
          background: linear-gradient(135deg, #0F172A, #1E3A8A);
          color: #FFFFFF;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar-box {
          position: relative;
          width: 42px;
          height: 42px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #38BDF8;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .online-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          background: #10B981;
          border: 2px solid #0F172A;
          border-radius: 50%;
        }

        .header-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0;
          color: #FFFFFF;
        }

        .header-status {
          font-size: 0.72rem;
          color: #94A3B8;
          margin: 2px 0 0 0;
        }

        .widget-close-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #94A3B8;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .widget-close-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
        }

        .support-widget-tabs {
          display: flex;
          background: #F8FAFC;
          border-bottom: 1px solid #E2E8F0;
          padding: 6px;
          gap: 4px;
          flex-shrink: 0;
        }

        .tab-btn {
          flex: 1;
          padding: 8px 10px;
          border: none;
          background: transparent;
          font-size: 0.78rem;
          font-weight: 600;
          color: #64748B;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .tab-btn:hover {
          color: #1E3A8A;
          background: #F1F5F9;
        }

        .tab-btn.active {
          background: #FFFFFF;
          color: #2563EB;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }

        .support-tab-content {
          flex: 1 1 0%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-height: 0;
          background: #FFFFFF;
        }

        .chat-tab {
          flex: 1 1 0%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-height: 0;
        }

        /* Chat Tab */
        .chat-messages-container {
          flex: 1 1 0%;
          min-height: 0;
          padding: 16px;
          overflow-y: auto !important;
          overflow-x: hidden;
          display: block;
          background: #F8FAFC;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }

        /* Custom Scrollbar */
        .chat-messages-container::-webkit-scrollbar,
        .contact-tab::-webkit-scrollbar,
        .direct-tab::-webkit-scrollbar {
          width: 6px;
        }
        .chat-messages-container::-webkit-scrollbar-track {
          background: #F1F5F9;
        }
        .chat-messages-container::-webkit-scrollbar-thumb,
        .contact-tab::-webkit-scrollbar-thumb,
        .direct-tab::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 4px;
        }

        .chat-message-row {
          display: flex;
          gap: 10px;
          max-width: 90%;
          margin-bottom: 16px;
        }

        .chat-message-row.user {
          margin-left: auto;
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #1E3A8A;
          color: #38BDF8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .message-bubble-wrapper {
          display: flex;
          flex-direction: column;
        }

        .message-bubble {
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 0.84rem;
          line-height: 1.5;
          word-break: break-word;
        }

        .chat-message-row.bot .message-bubble {
          background: #FFFFFF;
          color: #1E293B;
          border: 1px solid #E2E8F0;
          border-top-left-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .chat-message-row.user .message-bubble {
          background: #2563EB;
          color: #FFFFFF;
          border-top-right-radius: 4px;
        }

        .message-time {
          font-size: 0.68rem;
          color: #94A3B8;
          margin-top: 4px;
          align-self: flex-end;
        }

        .chat-chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }

        .chat-chip-btn {
          background: #EFF6FF;
          color: #2563EB;
          border: 1px solid #BFDBFE;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.74rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .chat-chip-btn:hover {
          background: #2563EB;
          color: #FFFFFF;
          border-color: #2563EB;
        }

        .typing-indicator-bubble {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          padding: 10px 16px;
          border-radius: 14px;
          border-top-left-radius: 4px;
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .typing-indicator-bubble span {
          width: 6px;
          height: 6px;
          background: #94A3B8;
          border-radius: 50%;
          animation: typingDot 1.4s infinite ease-in-out;
        }

        .typing-indicator-bubble span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator-bubble span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingDot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }

        .chat-input-form {
          display: flex;
          padding: 10px;
          background: #FFFFFF;
          border-top: 1px solid #E2E8F0;
          gap: 8px;
          flex-shrink: 0;
        }

        .chat-input-form input {
          flex: 1;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 8px 14px;
          font-size: 0.82rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .chat-input-form input:focus {
          border-color: #2563EB;
        }

        .send-msg-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #2563EB;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .send-msg-btn:disabled {
          background: #CBD5E1;
          cursor: not-allowed;
        }

        /* Contact Tab */
        .contact-tab {
          padding: 16px;
          overflow-y: auto;
          min-height: 0;
        }

        .contact-form-header h5 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .contact-form-header p {
          font-size: 0.78rem;
          color: #64748B;
          margin-bottom: 14px;
        }

        .form-status-alert {
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 0.78rem;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .form-status-alert.success {
          background: #ECFDF5;
          color: #065F46;
          border: 1px solid #A7F3D0;
        }

        .form-status-alert.error {
          background: #FEF2F2;
          color: #991B1B;
          border: 1px solid #FCA5A5;
        }

        .support-inquiry-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-group-row {
          display: flex;
          gap: 10px;
        }

        .support-inquiry-form input,
        .support-inquiry-form select,
        .support-inquiry-form textarea {
          width: 100%;
          padding: 8px 12px;
          font-size: 0.8rem;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.2s;
        }

        .support-inquiry-form input:focus,
        .support-inquiry-form select:focus,
        .support-inquiry-form textarea:focus {
          border-color: #2563EB;
        }

        .submit-inquiry-btn {
          padding: 11px;
          background: linear-gradient(135deg, #059669, #10B981);
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-inquiry-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Direct Tab */
        .direct-tab {
          padding: 16px;
          overflow-y: auto;
          min-height: 0;
        }

        .direct-header h5 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .direct-header p {
          font-size: 0.78rem;
          color: #64748B;
          margin-bottom: 14px;
        }

        .direct-action-cards {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .direct-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          background: #F8FAFC;
          transition: all 0.2s ease;
          text-decoration: none !important;
        }

        .direct-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
          border-color: #2563EB;
        }

        .whatsapp-card .card-icon { background: #10B981; color: #FFF; }
        .email-card .card-icon { background: #2563EB; color: #FFF; }
        .phone-card .card-icon { background: #0F172A; color: #FFF; }

        .card-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .card-info h6 {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }

        .card-info p {
          font-size: 0.72rem;
          color: #64748B;
          margin: 2px 0 4px 0;
        }

        .card-action-text {
          font-size: 0.74rem;
          font-weight: 700;
          color: #2563EB;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .unread-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #EF4444;
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          border: 2px solid #FFFFFF;
        }

        @media (max-width: 768px) {
          .ygr-support-widget-modal {
            right: 15px;
            bottom: 95px;
            width: calc(100vw - 30px);
            height: 490px;
          }
        }
      `}</style>
    </>
  );
};

export default WhatsAppFloatingIcon;
