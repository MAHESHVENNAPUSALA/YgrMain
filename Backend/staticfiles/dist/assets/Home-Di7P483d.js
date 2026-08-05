import{d as e,f as t,i as n,u as r}from"./index-flnEmda_.js";var i=t(e(),1),a=n(),o=[{img:`https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80`,title:`Innovative Software Solutions`,subtitle:`Building digital products that drive your business forward`},{img:`https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80`,title:`Web & Mobile Development`,subtitle:`Cutting-edge apps tailored to your vision`},{img:`https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80`,title:`Digital Marketing & Growth`,subtitle:`Reach more customers with data-driven strategies`},{img:`https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&q=80`,title:`IT Training & Internships`,subtitle:`Launch your tech career with industry-ready skills`}],s=[{icon:`fa-globe`,title:`Web Development`,desc:`Responsive, fast, and modern websites & web applications built with the latest technologies.`,color:`#0796fe`},{icon:`fa-mobile-alt`,title:`Mobile Apps`,desc:`Native & cross-platform mobile apps for Android & iOS that delight your users.`,color:`#fbcc27`},{icon:`fa-chart-line`,title:`Digital Marketing`,desc:`SEO, social media, PPC campaigns, and content marketing to grow your online presence.`,color:`#27ae60`},{icon:`fa-paint-brush`,title:`UI/UX Design`,desc:`Beautiful, intuitive interfaces designed with your users at the center.`,color:`#e74c3c`},{icon:`fa-graduation-cap`,title:`IT Training`,desc:`Industry-focused training programs in Python, Java, React, Data Science and more.`,color:`#9b59b6`},{icon:`fa-cloud`,title:`Cloud Solutions`,desc:`Scalable cloud infrastructure, DevOps, and AWS/Azure deployment support.`,color:`#1abc9c`}],c=[{icon:`fa-project-diagram`,value:`150+`,label:`Projects Delivered`},{icon:`fa-users`,value:`200+`,label:`Happy Clients`},{icon:`fa-user-graduate`,value:`1000+`,label:`Students Trained`},{icon:`fa-award`,value:`5+`,label:`Years Experience`}],l=[{icon:`fa-lightbulb`,title:`Innovative Approach`,desc:`We stay ahead of tech trends to deliver future-ready solutions.`},{icon:`fa-handshake`,title:`Client-First Culture`,desc:`Your success is our success. We prioritize your goals at every step.`},{icon:`fa-shield-alt`,title:`Quality Assured`,desc:`Rigorous testing and QA processes ensure every product is bug-free.`},{icon:`fa-clock`,title:`On-Time Delivery`,desc:`We respect deadlines and deliver on schedule, every time.`},{icon:`fa-headset`,title:`24/7 Support`,desc:`Our dedicated team is always available to assist you post-launch.`},{icon:`fa-rupee-sign`,title:`Cost Effective`,desc:`Premium quality solutions at competitive pricing for all business sizes.`}],u=(e,t=2e3,n=!1)=>{let[r,a]=(0,i.useState)(0);return(0,i.useEffect)(()=>{if(!n)return;let r=parseInt(e.replace(/\D/g,``)),i=Math.ceil(r/(t/16)),o=0,s=setInterval(()=>{o=Math.min(o+i,r),a(o),o>=r&&clearInterval(s)},16);return()=>clearInterval(s)},[e,t,n]),r},d=({icon:e,value:t,label:n,visible:r})=>{let i=u(t,1800,r),o=t.replace(/\d/g,``);return(0,a.jsxs)(`div`,{className:`home-stat-item`,children:[(0,a.jsx)(`div`,{className:`home-stat-icon`,children:(0,a.jsx)(`i`,{className:`fas ${e}`})}),(0,a.jsxs)(`div`,{className:`home-stat-value`,children:[i,o]}),(0,a.jsx)(`div`,{className:`home-stat-label`,children:n})]})},f=()=>{let e=r(),[t,n]=(0,i.useState)(0),[u,f]=(0,i.useState)(!1),p=(0,i.useRef)(null),m=o.length;return(0,i.useEffect)(()=>{let e=setInterval(()=>n(e=>(e+1)%m),5e3);return()=>clearInterval(e)},[m]),(0,i.useEffect)(()=>{let e=new IntersectionObserver(([e])=>{e.isIntersecting&&f(!0)},{threshold:.3});return p.current&&e.observe(p.current),()=>e.disconnect()},[]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`style`,{children:`
        /* ===== HERO CAROUSEL ===== */
        .home-carousel { position: relative; height: 620px; overflow: hidden; background: #000; }
        .home-carousel-slide {
          position: absolute; inset: 0;
          opacity: 0; transition: opacity 0.9s ease;
        }
        .home-carousel-slide.active { opacity: 1; }
        .home-carousel-slide img {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(0.5) contrast(1.1);
        }
        .home-carousel-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%);
          display: flex; align-items: center; justify-content: center;
          z-index: 2; text-align: center; padding: 20px;
        }
        .home-carousel-caption { max-width: 800px; }
        .home-carousel-caption h1 {
          font-family: 'Oswald', 'Outfit', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700; color: #fff;
          text-transform: uppercase; letter-spacing: -1px;
          margin-bottom: 18px; line-height: 1.1;
          text-shadow: 0 2px 15px rgba(0,0,0,0.4);
        }
        .home-carousel-caption p {
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: rgba(255,255,255,0.9); margin-bottom: 36px;
        }
        .home-carousel-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .home-btn-primary {
          padding: 14px 36px; border-radius: 50px; font-weight: 700;
          background: linear-gradient(135deg, #fbcc27, #f39c12);
          color: #092a49; border: none; cursor: pointer; font-size: 15px;
          box-shadow: 0 8px 24px rgba(251,204,39,0.4); transition: all 0.3s;
          text-transform: uppercase; letter-spacing: 0.5px; font-family: inherit;
        }
        .home-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(251,204,39,0.55); }
        .home-btn-outline {
          padding: 14px 36px; border-radius: 50px; font-weight: 700;
          background: transparent; color: #fff;
          border: 2px solid rgba(255,255,255,0.7); cursor: pointer; font-size: 15px;
          transition: all 0.3s; text-transform: uppercase; letter-spacing: 0.5px; font-family: inherit;
        }
        .home-btn-outline:hover { background: rgba(255,255,255,0.15); border-color: #fff; }

        /* Carousel indicators */
        .home-carousel-dots {
          position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 8px; z-index: 5;
        }
        .home-carousel-dot {
          width: 36px; height: 4px; border-radius: 2px;
          background: rgba(255,255,255,0.35); border: none; cursor: pointer;
          transition: all 0.35s; padding: 0;
        }
        .home-carousel-dot.active { background: #fbcc27; width: 54px; }

        /* Carousel arrows */
        .home-carousel-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 50px; height: 50px; border-radius: 50%;
          background: rgba(255,255,255,0.12); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2); color: #fff;
          font-size: 18px; cursor: pointer; z-index: 5;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s; opacity: 0;
        }
        .home-carousel:hover .home-carousel-arrow { opacity: 1; }
        .home-carousel-arrow:hover { background: rgba(255,255,255,0.25); border-color: #fbcc27; }
        .home-carousel-arrow.prev { left: 20px; }
        .home-carousel-arrow.next { right: 20px; }

        /* ===== SECTION WRAPPER ===== */
        .home-section { padding: 80px 0; }
        .home-section-inner { max-width: 1200px; margin: 0 auto; padding: 0 30px; }
        .home-section-title {
          text-align: center; margin-bottom: 55px;
        }
        .home-section-title span {
          display: inline-block; background: #0796fe;
          color: #fff; font-size: 13px; font-weight: 700;
          padding: 4px 14px; border-radius: 20px; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 14px;
        }
        .home-section-title h2 {
          font-family: 'Oswald', 'Outfit', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: #092a49; font-weight: 700; margin: 0 0 14px;
        }
        .home-section-title p { color: #666; font-size: 16px; max-width: 580px; margin: 0 auto; }

        /* ===== ABOUT SECTION ===== */
        .home-about { background: #fff; }
        .home-about-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
        }
        .home-about-img { border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.12); }
        .home-about-img img { width: 100%; height: 400px; object-fit: cover; display: block; }
        .home-about-content h2 {
          font-family: 'Oswald', 'Outfit', sans-serif;
          font-size: 2.2rem; color: #092a49; font-weight: 700; margin-bottom: 16px;
        }
        .home-about-content p { color: #666; line-height: 1.8; margin-bottom: 18px; font-size: 15px; }
        .home-about-badges { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
        .home-badge {
          background: #f0f7ff; border: 1px solid #c3dff8;
          color: #0796fe; font-size: 13px; font-weight: 600;
          padding: 6px 14px; border-radius: 20px; display: flex; align-items: center; gap: 6px;
        }

        /* ===== SERVICES ===== */
        .home-services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;
        }
        .home-service-card {
          background: #fff; border-radius: 16px; padding: 34px 28px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid #f0f0f0;
          text-align: center;
        }
        .home-service-card:hover {
          transform: translateY(-8px); box-shadow: 0 16px 40px rgba(0,0,0,0.12);
        }
        .home-service-icon {
          width: 70px; height: 70px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; margin: 0 auto 20px;
        }
        .home-service-card h3 {
          font-family: 'Oswald', 'Outfit', sans-serif;
          color: #092a49; font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;
        }
        .home-service-card p { color: #666; font-size: 14px; line-height: 1.7; margin: 0; }

        /* ===== STATS ===== */
        .home-stats { background: linear-gradient(135deg, #092a49 0%, #1e3c72 100%); }
        .home-stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;
        }
        .home-stat-item { text-align: center; padding: 10px; }
        .home-stat-icon {
          width: 60px; height: 60px; background: rgba(7,150,254,0.2);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 24px; color: #0796fe; margin: 0 auto 16px;
        }
        .home-stat-value {
          font-family: 'Oswald', 'Outfit', sans-serif;
          font-size: 2.8rem; color: #fbcc27; font-weight: 700; line-height: 1;
        }
        .home-stat-label { color: rgba(255,255,255,0.75); font-size: 14px; margin-top: 8px; font-weight: 500; }

        /* ===== WHY CHOOSE US ===== */
        .home-why { background: #f8fafc; }
        .home-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .home-why-card {
          background: #fff; padding: 30px 24px; border-radius: 14px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          border-left: 4px solid #0796fe; transition: transform 0.3s;
        }
        .home-why-card:hover { transform: translateX(4px); }
        .home-why-card i {
          font-size: 28px; color: #0796fe; margin-bottom: 14px; display: block;
        }
        .home-why-card h4 {
          font-family: 'Oswald', 'Outfit', sans-serif;
          font-size: 1.1rem; color: #092a49; font-weight: 700; margin-bottom: 10px;
        }
        .home-why-card p { color: #666; font-size: 14px; line-height: 1.7; margin: 0; }

        /* ===== CTA ===== */
        .home-cta { background: #0796fe; padding: 70px 0; text-align: center; }
        .home-cta h2 {
          font-family: 'Oswald', 'Outfit', sans-serif;
          color: #fff; font-size: 2.2rem; font-weight: 700; margin-bottom: 16px;
        }
        .home-cta p { color: rgba(255,255,255,0.85); font-size: 16px; margin-bottom: 36px; }
        .home-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .home-cta-btn-white {
          padding: 14px 36px; border-radius: 50px; font-weight: 700;
          background: #fff; color: #0796fe; border: none; cursor: pointer;
          font-size: 15px; transition: all 0.3s; font-family: inherit;
        }
        .home-cta-btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
        .home-cta-btn-outline2 {
          padding: 14px 36px; border-radius: 50px; font-weight: 700;
          background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.7);
          cursor: pointer; font-size: 15px; transition: all 0.3s; font-family: inherit;
        }
        .home-cta-btn-outline2:hover { background: rgba(255,255,255,0.15); }

        @media (max-width: 900px) {
          .home-carousel { height: 460px; }
          .home-about-grid { grid-template-columns: 1fr; gap: 30px; }
          .home-services-grid { grid-template-columns: 1fr 1fr; }
          .home-stats-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
          .home-why-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .home-carousel { height: 360px; }
          .home-services-grid { grid-template-columns: 1fr; }
          .home-stats-grid { grid-template-columns: 1fr 1fr; }
          .home-why-grid { grid-template-columns: 1fr; }
          .home-section { padding: 50px 0; }
        }
      `}),(0,a.jsxs)(`section`,{className:`home-carousel`,children:[o.map((n,r)=>(0,a.jsxs)(`div`,{className:`home-carousel-slide${r===t?` active`:``}`,children:[(0,a.jsx)(`img`,{src:n.img,alt:n.title}),(0,a.jsx)(`div`,{className:`home-carousel-overlay`,children:(0,a.jsxs)(`div`,{className:`home-carousel-caption`,children:[(0,a.jsx)(`h1`,{children:n.title}),(0,a.jsx)(`p`,{children:n.subtitle}),(0,a.jsxs)(`div`,{className:`home-carousel-btns`,children:[(0,a.jsx)(`button`,{className:`home-btn-primary`,onClick:()=>e(`/services`),children:`Our Services`}),(0,a.jsx)(`button`,{className:`home-btn-outline`,onClick:()=>e(`/contact`),children:`Contact Us`})]})]})})]},r)),(0,a.jsx)(`button`,{className:`home-carousel-arrow prev`,onClick:()=>n(e=>(e-1+m)%m),children:(0,a.jsx)(`i`,{className:`fas fa-chevron-left`})}),(0,a.jsx)(`button`,{className:`home-carousel-arrow next`,onClick:()=>n(e=>(e+1)%m),children:(0,a.jsx)(`i`,{className:`fas fa-chevron-right`})}),(0,a.jsx)(`div`,{className:`home-carousel-dots`,children:o.map((e,r)=>(0,a.jsx)(`button`,{className:`home-carousel-dot${r===t?` active`:``}`,onClick:()=>n(r)},r))})]}),(0,a.jsx)(`section`,{className:`home-section home-about`,children:(0,a.jsx)(`div`,{className:`home-section-inner`,children:(0,a.jsxs)(`div`,{className:`home-about-grid`,children:[(0,a.jsx)(`div`,{className:`home-about-img`,children:(0,a.jsx)(`img`,{src:`https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80`,alt:`YGR Gobal IT Services Office`})}),(0,a.jsxs)(`div`,{className:`home-about-content`,children:[(0,a.jsx)(`span`,{style:{background:`#e8f4ff`,color:`#0796fe`,padding:`4px 14px`,borderRadius:`20px`,fontSize:`13px`,fontWeight:700,letterSpacing:`1.5px`,textTransform:`uppercase`},children:`About Us`}),(0,a.jsx)(`h2`,{style:{marginTop:14},children:`Your Trusted IT Partner in Hyderabad`}),(0,a.jsx)(`p`,{children:`YGR Gobal IT Services is a dynamic IT company based in KPHB Colony, Hyderabad, offering end-to-end technology solutions to businesses of all sizes. Founded with a passion for innovation, we specialize in creating digital experiences that drive growth and efficiency.`}),(0,a.jsx)(`p`,{children:`From web and mobile development to digital marketing and IT training, our team of skilled professionals is dedicated to delivering quality solutions on time and within budget.`}),(0,a.jsxs)(`div`,{className:`home-about-badges`,children:[(0,a.jsxs)(`span`,{className:`home-badge`,children:[(0,a.jsx)(`i`,{className:`fas fa-check-circle`}),` ISO Certified`]}),(0,a.jsxs)(`span`,{className:`home-badge`,children:[(0,a.jsx)(`i`,{className:`fas fa-award`}),` 5+ Years`]}),(0,a.jsxs)(`span`,{className:`home-badge`,children:[(0,a.jsx)(`i`,{className:`fas fa-users`}),` 50+ Team`]})]}),(0,a.jsx)(`button`,{className:`home-btn-primary`,onClick:()=>e(`/about`),children:`Learn More About Us`})]})]})})}),(0,a.jsx)(`section`,{className:`home-section`,style:{background:`#f8fafc`},children:(0,a.jsxs)(`div`,{className:`home-section-inner`,children:[(0,a.jsxs)(`div`,{className:`home-section-title`,children:[(0,a.jsx)(`span`,{children:`What We Do`}),(0,a.jsx)(`h2`,{children:`Our Core Services`}),(0,a.jsx)(`p`,{children:`We offer comprehensive IT solutions to help your business thrive in the digital age.`})]}),(0,a.jsx)(`div`,{className:`home-services-grid`,children:s.map((t,n)=>(0,a.jsxs)(`div`,{className:`home-service-card`,onClick:()=>e(`/services`),style:{cursor:`pointer`},children:[(0,a.jsx)(`div`,{className:`home-service-icon`,style:{background:`${t.color}18`},children:(0,a.jsx)(`i`,{className:`fas ${t.icon}`,style:{color:t.color}})}),(0,a.jsx)(`h3`,{children:t.title}),(0,a.jsx)(`p`,{children:t.desc})]},n))})]})}),(0,a.jsx)(`section`,{className:`home-section home-stats`,ref:p,children:(0,a.jsxs)(`div`,{className:`home-section-inner`,children:[(0,a.jsxs)(`div`,{className:`home-section-title`,style:{marginBottom:50},children:[(0,a.jsx)(`span`,{style:{background:`rgba(7,150,254,0.2)`},children:`Our Numbers`}),(0,a.jsx)(`h2`,{style:{color:`#fff`},children:`Proven Track Record`})]}),(0,a.jsx)(`div`,{className:`home-stats-grid`,children:c.map((e,t)=>(0,a.jsx)(d,{...e,visible:u},t))})]})}),(0,a.jsx)(`section`,{className:`home-section home-why`,children:(0,a.jsxs)(`div`,{className:`home-section-inner`,children:[(0,a.jsxs)(`div`,{className:`home-section-title`,children:[(0,a.jsx)(`span`,{children:`Why YGR`}),(0,a.jsx)(`h2`,{children:`Why Choose Us?`}),(0,a.jsx)(`p`,{children:`We combine technical expertise with a client-first mindset to deliver exceptional results.`})]}),(0,a.jsx)(`div`,{className:`home-why-grid`,children:l.map((e,t)=>(0,a.jsxs)(`div`,{className:`home-why-card`,children:[(0,a.jsx)(`i`,{className:`fas ${e.icon}`}),(0,a.jsx)(`h4`,{children:e.title}),(0,a.jsx)(`p`,{children:e.desc})]},t))})]})}),(0,a.jsx)(`section`,{className:`home-cta`,children:(0,a.jsxs)(`div`,{className:`home-section-inner`,children:[(0,a.jsx)(`h2`,{children:`Ready to Build Something Amazing?`}),(0,a.jsx)(`p`,{children:`Let's turn your ideas into powerful digital solutions. Get in touch with us today.`}),(0,a.jsxs)(`div`,{className:`home-cta-btns`,children:[(0,a.jsx)(`button`,{className:`home-cta-btn-white`,onClick:()=>e(`/contact`),children:`Get a Free Quote`}),(0,a.jsx)(`button`,{className:`home-cta-btn-outline2`,onClick:()=>e(`/services`),children:`View Our Services`})]})]})})]})};export{f as default};