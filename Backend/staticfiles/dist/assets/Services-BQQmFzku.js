import{d as e,f as t,i as n,u as r}from"./index-DMZ4DY2y.js";var i=t(e(),1),a=n(),o=[{category:`Development`,icon:`fa-code`,color:`#0796fe`,title:`Web Development`,desc:`Custom websites and web applications built with React, Vue, Angular, Django, Node.js, and more. Responsive, fast, and SEO-optimized.`,features:[`Custom Web Apps`,`E-Commerce Solutions`,`CMS Development`,`API Integration`,`PWA Development`]},{category:`Development`,icon:`fa-mobile-alt`,color:`#9b59b6`,title:`Mobile App Development`,desc:`Native Android & iOS apps, cross-platform solutions using React Native and Flutter. From concept to App Store launch.`,features:[`Android Apps`,`iOS Apps`,`React Native`,`Flutter`,`App Store Publishing`]},{category:`Marketing`,icon:`fa-chart-line`,color:`#27ae60`,title:`Digital Marketing`,desc:`Data-driven strategies to grow your online presence. SEO, PPC, social media, content marketing, and email campaigns.`,features:[`SEO Optimization`,`Google Ads / PPC`,`Social Media Marketing`,`Content Marketing`,`Email Campaigns`]},{category:`Design`,icon:`fa-paint-brush`,color:`#e74c3c`,title:`UI/UX Design`,desc:`Beautiful, intuitive interfaces designed with a user-first approach. Wireframing, prototyping, and pixel-perfect design delivery.`,features:[`UI Design`,`UX Research`,`Prototyping`,`Figma / Adobe XD`,`Design Systems`]},{category:`Training`,icon:`fa-graduation-cap`,color:`#fbcc27`,title:`IT Training & Internships`,desc:`Industry-focused training in Python, Java, React, Data Science, DevOps, and more. Live projects + placement support.`,features:[`Python / Django`,`React / Node.js`,`Java Full Stack`,`Data Science & ML`,`Placement Support`]},{category:`Cloud`,icon:`fa-cloud`,color:`#1abc9c`,title:`Cloud & DevOps`,desc:`Scalable cloud infrastructure setup, CI/CD pipelines, Docker, Kubernetes, and AWS/Azure/GCP deployment support.`,features:[`AWS / Azure`,`CI/CD Pipelines`,`Docker & Kubernetes`,`Server Management`,`Cloud Migration`]},{category:`Support`,icon:`fa-headset`,color:`#e67e22`,title:`IT Support & Maintenance`,desc:`Dedicated post-launch support, bug fixes, performance optimization, and regular updates to keep your digital products running smoothly.`,features:[`24/7 Support`,`Bug Fixing`,`Performance Tuning`,`Security Updates`,`Monthly Maintenance`]},{category:`Development`,icon:`fa-robot`,color:`#2c3e50`,title:`AI & Automation`,desc:`Integrate AI/ML capabilities, chatbots, process automation, and data analytics into your business workflows.`,features:[`AI Chatbots`,`Process Automation`,`Data Analytics`,`ML Integration`,`RPA Solutions`]}],s=[`All`,`Development`,`Marketing`,`Design`,`Training`,`Cloud`,`Support`],c=()=>{let[e,t]=(0,i.useState)(`All`),n=r(),c=e===`All`?o:o.filter(t=>t.category===e);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`style`,{children:`
        .svc-hero { background: linear-gradient(135deg, #092a49 0%, #1e3c72 100%); padding: 80px 30px; text-align: center; }
        .svc-hero h1 { font-family:'Oswald','Outfit',sans-serif; font-size:clamp(2rem,5vw,3rem); color:#fff; font-weight:700; margin-bottom:16px; }
        .svc-hero p { color:rgba(255,255,255,0.8); font-size:17px; max-width:600px; margin:0 auto 16px; }
        .svc-breadcrumb { color:rgba(255,255,255,0.6); font-size:14px; }
        .svc-breadcrumb a { color:#fbcc27; text-decoration:none; }

        .svc-filter-bar { background:#fff; padding:24px 30px; border-bottom:1px solid #eee; position:sticky; top:70px; z-index:90; box-shadow:0 2px 10px rgba(0,0,0,0.06); }
        .svc-filter-inner { max-width:1200px; margin:0 auto; display:flex; gap:10px; flex-wrap:wrap; }
        .svc-filter-btn {
          padding:8px 20px; border-radius:50px; border:2px solid #dde6f5;
          background:#fff; color:#555; font-size:14px; font-weight:600;
          cursor:pointer; transition:all 0.2s; font-family:inherit;
        }
        .svc-filter-btn.active, .svc-filter-btn:hover { background:#092a49; color:#fff; border-color:#092a49; }

        .svc-body { padding: 60px 30px; background: #f8fafc; }
        .svc-inner { max-width:1200px; margin:0 auto; }
        .svc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:28px; }
        .svc-card {
          background:#fff; border-radius:18px; padding:36px 30px;
          box-shadow:0 4px 20px rgba(0,0,0,0.07); transition:transform 0.3s, box-shadow 0.3s;
          border:1px solid #f0f0f0;
        }
        .svc-card:hover { transform:translateY(-6px); box-shadow:0 16px 40px rgba(0,0,0,0.12); }
        .svc-card-header { display:flex; align-items:center; gap:16px; margin-bottom:20px; }
        .svc-card-icon { width:60px; height:60px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:26px; flex-shrink:0; }
        .svc-card-header h3 { font-family:'Oswald','Outfit',sans-serif; color:#092a49; font-size:1.25rem; font-weight:700; margin:0; }
        .svc-card p { color:#666; font-size:14px; line-height:1.7; margin-bottom:20px; }
        .svc-features { list-style:none; padding:0; margin:0 0 24px; display:flex; flex-direction:column; gap:8px; }
        .svc-features li { display:flex; align-items:center; gap:8px; font-size:13px; color:#555; }
        .svc-features li::before { content:'✓'; color:#0796fe; font-weight:700; }
        .svc-card-btn {
          padding:10px 22px; border-radius:50px; background:linear-gradient(135deg,#0796fe,#0765fe);
          color:#fff; border:none; cursor:pointer; font-size:13px; font-weight:700;
          transition:all 0.3s; font-family:inherit;
        }
        .svc-card-btn:hover { transform:translateY(-2px); box-shadow:0 6px 18px rgba(7,150,254,0.35); }

        .svc-cta { background:linear-gradient(135deg,#092a49 0%,#1e3c72 100%); padding:70px 30px; text-align:center; margin-top:60px; border-radius:20px; }
        .svc-cta h2 { font-family:'Oswald','Outfit',sans-serif; color:#fff; font-size:2rem; font-weight:700; margin-bottom:14px; }
        .svc-cta p { color:rgba(255,255,255,0.8); margin-bottom:30px; }
        .svc-cta-btn { padding:14px 36px; border-radius:50px; background:linear-gradient(135deg,#fbcc27,#f39c12); color:#092a49; border:none; cursor:pointer; font-size:15px; font-weight:700; transition:all 0.3s; font-family:inherit; }
        .svc-cta-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(251,204,39,0.4); }

        @media (max-width:600px) { .svc-grid { grid-template-columns:1fr; } .svc-filter-bar { top:60px; } }
      `}),(0,a.jsxs)(`div`,{className:`svc-hero`,children:[(0,a.jsx)(`h1`,{children:`Our Services`}),(0,a.jsx)(`p`,{children:`Comprehensive IT solutions designed to accelerate your business growth.`}),(0,a.jsxs)(`div`,{className:`svc-breadcrumb`,children:[(0,a.jsx)(`a`,{href:`/`,children:`Home`}),` › Services`]})]}),(0,a.jsx)(`div`,{className:`svc-filter-bar`,children:(0,a.jsx)(`div`,{className:`svc-filter-inner`,children:s.map(n=>(0,a.jsx)(`button`,{className:`svc-filter-btn${e===n?` active`:``}`,onClick:()=>t(n),children:n},n))})}),(0,a.jsx)(`div`,{className:`svc-body`,children:(0,a.jsxs)(`div`,{className:`svc-inner`,children:[(0,a.jsx)(`div`,{className:`svc-grid`,children:c.map((e,t)=>(0,a.jsxs)(`div`,{className:`svc-card`,children:[(0,a.jsxs)(`div`,{className:`svc-card-header`,children:[(0,a.jsx)(`div`,{className:`svc-card-icon`,style:{background:`${e.color}18`},children:(0,a.jsx)(`i`,{className:`fas ${e.icon}`,style:{color:e.color}})}),(0,a.jsx)(`h3`,{children:e.title})]}),(0,a.jsx)(`p`,{children:e.desc}),(0,a.jsx)(`ul`,{className:`svc-features`,children:e.features.map((e,t)=>(0,a.jsx)(`li`,{children:e},t))}),(0,a.jsx)(`button`,{className:`svc-card-btn`,onClick:()=>n(`/contact`),children:`Get a Quote →`})]},t))}),(0,a.jsxs)(`div`,{className:`svc-cta`,children:[(0,a.jsx)(`h2`,{children:`Not Sure Which Service You Need?`}),(0,a.jsx)(`p`,{children:`Talk to our experts and we'll help you find the perfect solution for your business.`}),(0,a.jsx)(`button`,{className:`svc-cta-btn`,onClick:()=>n(`/contact`),children:`Book a Free Consultation`})]})]})})]})};export{c as default};