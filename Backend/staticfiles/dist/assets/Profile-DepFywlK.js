import{c as e,d as t,f as n,i as r,l as i,n as a,s as o,u as s}from"./index-wzsK_a1n.js";var c=n(t(),1),l=r(),u=()=>{let{showToast:t}=a(),[n,r]=(0,c.useState)(null),[u,d]=(0,c.useState)(!0),[f,p]=(0,c.useState)(()=>{let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}`}),m=(0,c.useRef)(null),h=i(),g=s(),_=h.pathname===`/profile/edit`,[v,y]=(0,c.useState)(!1),b=v||_,[x,S]=(0,c.useState)(``),[C,w]=(0,c.useState)(``),[T,E]=(0,c.useState)(``),[D,O]=(0,c.useState)(``),[k,A]=(0,c.useState)(``),[j,M]=(0,c.useState)(`Male`),[N,P]=(0,c.useState)(null),[F,I]=(0,c.useState)(!1),[L,R]=(0,c.useState)(!1);(0,c.useEffect)(()=>{if(n&&n.user){let e=n.user;S(e.first_name||``),w(e.email||``),E(e.phone||``),O(e.address||``),A(e.date_of_birth||``),M(e.gender||`Male`)}},[n]);let z=async e=>{e.preventDefault(),R(!0);try{let e=new FormData;e.append(`first_name`,x),e.append(`email`,C),e.append(`phone`,T),e.append(`address`,D),e.append(`date_of_birth`,k),e.append(`gender`,j),N&&e.append(`profile_pic`,N),F&&e.append(`remove_profile_pic`,`true`),await o.put(`/api/profile/`,e,{headers:{"Content-Type":`multipart/form-data`}}),t(`Profile updated successfully!`,`success`),y(!1),_&&g(`/profile`),B(f)}catch(e){t(e.response?.data?.detail||`Failed to update profile.`,`error`)}finally{R(!1)}},B=async e=>{d(!0);try{let t=e?{month:e}:{},n=await o.get(`/api/profile/`,{params:t});console.log(`Profile API Complete Response:`,{url:`/api/profile/`,method:`GET`,headers:n.config?.headers||{},status:n.status,payload:n.data}),r(n.data)}catch(e){console.error(`Failed to load profile:`,e)}finally{d(!1)}};(0,c.useEffect)(()=>{B(f)},[]),(0,c.useEffect)(()=>{n&&m.current&&setTimeout(()=>{m.current&&(m.current.style.width=`${n.attendance?.percentage||0}%`)},300)},[n]);let V=e=>{e.preventDefault(),B(f)},H=e=>{if(!e||e===`None`)return`—`;let t=new Date(e),n=((new Date-t)/(1e3*60*60*24*365.25)).toFixed(1);return isNaN(n)?`—`:n},U=e=>e?new Date(e).toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`}):`—`,W=e=>e===`Completed`?`completed`:e===`In Progress`?`inprogress`:`pending`;if(u)return(0,l.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,height:`60vh`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:32,color:`#3b82f6`}})});let{user:G,attendance:K,leave_summary:q,projects:J,salary_structure:Y}=n||{},X=(o.defaults.baseURL||`http://127.0.0.1:8000`).replace(/\/$/,``),Z=G?.profile_pic_url||(G?.profile_pic?G.profile_pic.startsWith(`http`)?G.profile_pic:`${X}${G.profile_pic}`:null),Q=G?.first_name&&(G.first_name+` `+(G.last_name||``)).trim()||G?.username||`—`,$=G?.department_display||G?.department||`—`;return(0,l.jsxs)(`div`,{className:`profile-page`,children:[(0,l.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .profile-page {
          font-family: 'Inter', sans-serif;
          background: #f1f5f9;
          min-height: 100vh;
          padding: 0 0 60px;
        }

        .profile-hero {
          background: linear-gradient(135deg, #0d2f5c 0%, #1a4a8a 45%, #2563eb 100%);
          padding: 40px 32px 100px;
          position: relative;
          overflow: hidden;
        }
        .profile-hero::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
        }
        .profile-hero::after {
          content: '';
          position: absolute;
          bottom: -40px; left: 20%;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }

        .hero-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0;
          position: relative; z-index: 2;
        }

        .hero-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.65);
        }
        .hero-breadcrumb span { color: rgba(255,255,255,0.4); }
        .hero-breadcrumb strong { color: rgba(255,255,255,0.9); }

        .btn-edit-profile {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.15);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 10px;
          padding: 9px 18px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.22s ease, border-color 0.22s ease;
          backdrop-filter: blur(8px);
          cursor: pointer;
        }
        .btn-edit-profile:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.5);
          color: #fff;
        }

        .profile-identity-card {
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          padding: 24px 28px;
          margin: -70px 24px 0;
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .identity-avatar { position: relative; flex-shrink: 0; }
        .identity-avatar img {
          width: 100px; height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #dbeafe;
          box-shadow: 0 4px 16px rgba(59,130,246,0.3);
        }
        .identity-avatar-initials {
          width: 100px; height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0d2f5c, #3b82f6);
          display: flex; align-items: center; justify-content: center;
          font-size: 36px; font-weight: 800; color: #fff;
          border: 4px solid #dbeafe;
          box-shadow: 0 4px 16px rgba(59,130,246,0.3);
        }
        .online-badge {
          position: absolute;
          bottom: 5px; right: 5px;
          width: 16px; height: 16px;
          background: #10b981;
          border: 3px solid #fff;
          border-radius: 50%;
        }

        .identity-info { flex: 1; min-width: 200px; }
        .identity-name { font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .identity-designation { font-size: 13px; font-weight: 600; color: #3b82f6; margin-bottom: 8px; }

        .identity-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .id-tag {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 600;
          padding: 4px 12px; border-radius: 20px;
        }
        .id-tag.dept   { background: #eff6ff; color: #3b82f6; }
        .id-tag.status { background: #dcfce7; color: #065f46; }
        .id-tag.role   { background: #f5f3ff; color: #8b5cf6; }
        .id-tag.emp-id { background: #f1f5f9; color: #475569; }

        .identity-stats { display: flex; gap: 24px; margin-left: auto; flex-shrink: 0; }
        .istat { text-align: center; }
        .istat-val { font-size: 22px; font-weight: 800; color: #0d2f5c; line-height: 1; }
        .istat-label { font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px; }
        .istat-divider { width: 1px; background: #e2e8f0; align-self: stretch; }

        .profile-body {
          padding: 28px 24px 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .info-card {
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          overflow: hidden;
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
        .info-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.12); transform: translateY(-2px); }
        .info-card.full-width { grid-column: 1 / -1; }

        .card-header {
          display: flex; align-items: center; gap: 10px;
          padding: 18px 24px;
          border-bottom: 1px solid #e2e8f0;
          background: linear-gradient(to right, #fafcff, #f0f7ff);
        }
        .card-header-icon {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; flex-shrink: 0;
        }
        .icon-blue   { background: #eff6ff; color: #3b82f6; }
        .icon-green  { background: #dcfce7; color: #10b981; }
        .icon-orange { background: #fef3c7; color: #f59e0b; }
        .icon-purple { background: #f5f3ff; color: #8b5cf6; }
        .icon-red    { background: #fee2e2; color: #ef4444; }
        .icon-brand  { background: #e8edf5; color: #0d2f5c; }

        .card-header-title { font-size: 14px; font-weight: 700; color: #0f172a; }
        .card-header-sub { font-size: 11px; color: #94a3b8; font-weight: 500; }

        .card-body { padding: 20px 24px; }

        .info-row {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 12px; padding: 11px 0; border-bottom: 1px solid #f1f5f9;
        }
        .info-row:last-child { border-bottom: none; padding-bottom: 0; }
        .info-row:first-child { padding-top: 0; }

        .info-label {
          font-size: 12px; font-weight: 600; color: #94a3b8;
          text-transform: uppercase; letter-spacing: 0.04em;
          flex-shrink: 0; min-width: 110px;
        }
        .info-value {
          font-size: 13px; font-weight: 600; color: #0f172a;
          text-align: right; word-break: break-word;
        }
        .info-value.muted { color: #94a3b8; font-weight: 500; }

        .attendance-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
        }
        .att-stat {
          text-align: center; padding: 16px 10px; border-radius: 12px;
          transition: transform 0.22s ease;
        }
        .att-stat:hover { transform: scale(1.04); }
        .att-stat.blue   { background: #eff6ff; }
        .att-stat.green  { background: #dcfce7; }
        .att-stat.red    { background: #fee2e2; }
        .att-stat.orange { background: #fef3c7; }
        .att-stat-val { font-size: 26px; font-weight: 800; line-height: 1; margin-bottom: 5px; }
        .att-stat.blue   .att-stat-val { color: #3b82f6; }
        .att-stat.green  .att-stat-val { color: #10b981; }
        .att-stat.red    .att-stat-val { color: #ef4444; }
        .att-stat.orange .att-stat-val { color: #f59e0b; }
        .att-stat-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; }

        .att-bar-wrapper { margin-top: 18px; }
        .att-bar-labels { display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 6px; }
        .att-bar-track { height: 10px; background: #e2e8f0; border-radius: 999px; overflow: hidden; }
        .att-bar-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #10b981, #34d399); transition: width 1s cubic-bezier(0.4, 0, 0.2, 1); width: 0%; }

        .leave-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .leave-stat {
          text-align: center; padding: 16px 8px; border-radius: 12px;
          border: 1.5px solid transparent;
          transition: transform 0.22s ease, border-color 0.22s ease;
        }
        .leave-stat:hover { transform: scale(1.04); border-color: currentColor; }
        .leave-stat.approved { background: #dcfce7; color: #065f46; }
        .leave-stat.pending  { background: #fef3c7; color: #92400e; }
        .leave-stat.rejected { background: #fee2e2; color: #991b1b; }
        .leave-stat-val { font-size: 28px; font-weight: 800; line-height: 1; }
        .leave-stat-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 5px; }

        .project-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 0; border-bottom: 1px solid #f1f5f9; gap: 12px;
        }
        .project-item:last-child { border-bottom: none; padding-bottom: 0; }
        .project-item:first-child { padding-top: 0; }
        .project-name { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .project-team { font-size: 11px; color: #94a3b8; font-weight: 500; }
        .proj-badge { font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; white-space: nowrap; }
        .proj-badge.completed  { background: #dcfce7; color: #065f46; }
        .proj-badge.inprogress { background: #fef3c7; color: #92400e; }
        .proj-badge.pending    { background: #f1f5f9; color: #475569; }

        .quick-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 8px 0; }
        .qa-btn {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 18px 10px; border-radius: 12px; border: 1.5px solid #e2e8f0;
          text-decoration: none;
          transition: background 0.22s ease, border-color 0.22s ease, transform 0.15s;
          cursor: pointer; background: #fff;
        }
        .qa-btn:hover { background: #eff6ff; border-color: #3b82f6; transform: translateY(-2px); }
        .qa-btn i { font-size: 20px; color: #3b82f6; }
        .qa-btn span { font-size: 11px; font-weight: 700; color: #475569; text-align: center; line-height: 1.3; }

        .secure-badge {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 10px; font-weight: 700; background: #f1f5f9; color: #94a3b8;
          padding: 2px 8px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.06em;
        }

        .empty-state { text-align: center; padding: 30px 20px; color: #94a3b8; }
        .empty-state i { font-size: 36px; margin-bottom: 10px; display: block; opacity: 0.4; }
        .empty-state p { font-size: 13px; font-weight: 500; }

        @media (max-width: 900px) {
          .profile-body { grid-template-columns: 1fr; }
          .info-card.full-width { grid-column: 1; }
          .identity-stats { display: none; }
          .attendance-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .profile-identity-card { flex-direction: column; margin: -70px 12px 0; }
          .profile-hero { padding-bottom: 110px; }
          .leave-grid { grid-template-columns: repeat(2, 1fr); }
          .quick-actions { grid-template-columns: repeat(2, 1fr); }
          .profile-body { padding: 16px 12px 0; }
          .hero-top { flex-direction: column; align-items: flex-start; gap: 12px; }
          .attendance-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}),(0,l.jsx)(`div`,{className:`profile-hero`,children:(0,l.jsxs)(`div`,{className:`hero-top`,children:[(0,l.jsxs)(`div`,{className:`hero-breadcrumb`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-house`,style:{color:`rgba(255,255,255,0.5)`}}),(0,l.jsx)(`span`,{children:`›`}),(0,l.jsx)(`strong`,{children:`My Profile`})]}),(0,l.jsxs)(`button`,{onClick:()=>y(!0),className:`btn-edit-profile`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-pen-to-square`}),` Edit Profile`]})]})}),(0,l.jsxs)(`div`,{className:`profile-identity-card`,children:[(0,l.jsxs)(`div`,{className:`identity-avatar`,children:[Z?(0,l.jsx)(`img`,{src:Z,alt:Q}):(0,l.jsx)(`div`,{className:`identity-avatar-initials`,children:(()=>{let e=G?.first_name||``,t=G?.last_name||``;return e||t?((e[0]||``)+(t[0]||``)).toUpperCase():(G?.username?.[0]||`?`).toUpperCase()})()}),(0,l.jsx)(`div`,{className:`online-badge`,title:`Online`})]}),(0,l.jsxs)(`div`,{className:`identity-info`,children:[(0,l.jsx)(`div`,{className:`identity-name`,children:Q}),(0,l.jsx)(`div`,{className:`identity-designation`,children:G?.designation||`—`}),(0,l.jsxs)(`div`,{className:`identity-tags`,children:[(0,l.jsxs)(`span`,{className:`id-tag emp-id`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-hashtag`}),` `,G?.emp_id||`—`]}),(0,l.jsxs)(`span`,{className:`id-tag dept`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-building`}),` `,$]}),(0,l.jsxs)(`span`,{className:`id-tag role`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-user-shield`}),` `,G?.role]}),(0,l.jsxs)(`span`,{className:`id-tag status`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-circle-check`}),` Active`]})]})]}),(0,l.jsxs)(`div`,{className:`identity-stats`,children:[(0,l.jsxs)(`div`,{className:`istat`,children:[(0,l.jsx)(`div`,{className:`istat-val`,children:H(G?.date_of_joining)}),(0,l.jsx)(`div`,{className:`istat-label`,children:`Years`})]}),(0,l.jsx)(`div`,{className:`istat-divider`}),(0,l.jsxs)(`div`,{className:`istat`,children:[(0,l.jsx)(`div`,{className:`istat-val`,children:K?.present_days??0}),(0,l.jsx)(`div`,{className:`istat-label`,children:`Present`})]}),(0,l.jsx)(`div`,{className:`istat-divider`}),(0,l.jsxs)(`div`,{className:`istat`,children:[(0,l.jsx)(`div`,{className:`istat-val`,children:J?.length??0}),(0,l.jsx)(`div`,{className:`istat-label`,children:`Projects`})]})]})]}),(0,l.jsxs)(`div`,{className:`profile-body`,children:[(0,l.jsxs)(`div`,{className:`info-card`,children:[(0,l.jsxs)(`div`,{className:`card-header`,children:[(0,l.jsx)(`div`,{className:`card-header-icon icon-blue`,children:(0,l.jsx)(`i`,{className:`fa-solid fa-user`})}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`card-header-title`,children:`Personal Information`}),(0,l.jsx)(`div`,{className:`card-header-sub`,children:`Your personal and contact details`})]})]}),(0,l.jsxs)(`div`,{className:`card-body`,children:[(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Full Name`}),(0,l.jsx)(`span`,{className:`info-value`,children:Q})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Email`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.email||`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Phone`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.phone||`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Gender`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.gender||`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Date of Birth`}),(0,l.jsx)(`span`,{className:`info-value`,children:U(G?.date_of_birth)})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Address`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.address||`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Aadhaar`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.aadhaar||Y?.has_aadhaar?(0,l.jsxs)(`span`,{className:`secure-badge`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-lock`}),` Secured`]}):`—`})]})]})]}),(0,l.jsxs)(`div`,{className:`info-card`,children:[(0,l.jsxs)(`div`,{className:`card-header`,children:[(0,l.jsx)(`div`,{className:`card-header-icon icon-brand`,children:(0,l.jsx)(`i`,{className:`fa-solid fa-briefcase`})}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`card-header-title`,children:`Employment Information`}),(0,l.jsx)(`div`,{className:`card-header-sub`,children:`Job role and organisational details`})]})]}),(0,l.jsxs)(`div`,{className:`card-body`,children:[(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Employee ID`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.emp_id||`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Employee Code`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.emp_id||`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Designation`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.designation||`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Department`}),(0,l.jsx)(`span`,{className:`info-value`,children:$})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Role`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.role})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Status`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.status||`Active`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Join Date`}),(0,l.jsx)(`span`,{className:`info-value`,children:U(G?.date_of_joining)})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Reports To`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.reporting_manager_name||`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Team Leader`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.team_leader_name||`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Experience`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.experience_years?`${G.experience_years} yrs`:`—`})]})]})]}),(0,l.jsxs)(`div`,{className:`info-card`,children:[(0,l.jsxs)(`div`,{className:`card-header`,children:[(0,l.jsx)(`div`,{className:`card-header-icon icon-green`,children:(0,l.jsx)(`i`,{className:`fa-solid fa-coins`})}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`card-header-title`,children:`Payroll & Bank Details`}),(0,l.jsx)(`div`,{className:`card-header-sub`,children:`Salary, tax and banking information`})]})]}),(0,l.jsxs)(`div`,{className:`card-body`,children:[(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Monthly CTC`}),(0,l.jsxs)(`span`,{className:`info-value`,children:[`₹`,G?.salary||`—`]})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`PAN`}),(0,l.jsx)(`span`,{className:`info-value`,children:Y?.has_pan?(0,l.jsxs)(`span`,{className:`secure-badge`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-lock`}),` Secured`]}):`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`UAN`}),(0,l.jsx)(`span`,{className:`info-value`,children:Y?.has_uan?(0,l.jsxs)(`span`,{className:`secure-badge`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-lock`}),` Secured`]}):`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Bank Name`}),(0,l.jsx)(`span`,{className:`info-value`,children:Y?.bank_name||`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Account No.`}),(0,l.jsx)(`span`,{className:`info-value`,children:Y?.has_account_number?(0,l.jsxs)(`span`,{className:`secure-badge`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-lock`}),` Secured`]}):`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`IFSC Code`}),(0,l.jsx)(`span`,{className:`info-value`,children:Y?.ifsc_code||`—`})]})]})]}),(0,l.jsxs)(`div`,{className:`info-card`,children:[(0,l.jsxs)(`div`,{className:`card-header`,children:[(0,l.jsx)(`div`,{className:`card-header-icon icon-purple`,children:(0,l.jsx)(`i`,{className:`fa-solid fa-bolt`})}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`card-header-title`,children:`Quick Actions`}),(0,l.jsx)(`div`,{className:`card-header-sub`,children:`Shortcuts to common tasks`})]})]}),(0,l.jsx)(`div`,{className:`card-body`,children:(0,l.jsxs)(`div`,{className:`quick-actions`,children:[(0,l.jsxs)(e,{to:`/profile/edit`,className:`qa-btn`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-user-pen`}),(0,l.jsx)(`span`,{children:`Edit Profile`})]}),(0,l.jsxs)(e,{to:`/payslips`,className:`qa-btn`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`}),(0,l.jsx)(`span`,{children:`My Payslips`})]}),(0,l.jsxs)(e,{to:`/leave`,className:`qa-btn`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-calendar-xmark`}),(0,l.jsx)(`span`,{children:`Apply Leave`})]}),(0,l.jsxs)(e,{to:`/attendance`,className:`qa-btn`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-clock`}),(0,l.jsx)(`span`,{children:`Attendance`})]}),(0,l.jsxs)(e,{to:`/leave`,className:`qa-btn`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-list-check`}),(0,l.jsx)(`span`,{children:`Leave Status`})]}),(0,l.jsxs)(e,{to:`/messages`,className:`qa-btn`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-comment-dots`}),(0,l.jsx)(`span`,{children:`Messages`})]})]})})]}),(0,l.jsxs)(`div`,{className:`info-card full-width`,children:[(0,l.jsxs)(`div`,{className:`card-header`,children:[(0,l.jsx)(`div`,{className:`card-header-icon icon-orange`,children:(0,l.jsx)(`i`,{className:`fa-solid fa-calendar-days`})}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`card-header-title`,children:`Attendance Overview`}),(0,l.jsx)(`div`,{className:`card-header-sub`,children:`Current month attendance summary`})]}),(0,l.jsxs)(`form`,{onSubmit:V,style:{marginLeft:`auto`,display:`flex`,alignItems:`center`,gap:8},children:[(0,l.jsx)(`input`,{type:`month`,value:f,onChange:e=>p(e.target.value),style:{border:`1.5px solid #e2e8f0`,borderRadius:8,padding:`5px 10px`,fontSize:12,fontFamily:`inherit`,background:`#fff`,color:`#0f172a`,outline:`none`}}),(0,l.jsx)(`button`,{type:`submit`,style:{background:`#0d2f5c`,color:`#fff`,border:`none`,borderRadius:8,padding:`6px 14px`,fontSize:12,fontWeight:700,cursor:`pointer`,fontFamily:`inherit`},children:`Filter`})]})]}),(0,l.jsxs)(`div`,{className:`card-body`,children:[(0,l.jsxs)(`div`,{className:`attendance-grid`,children:[(0,l.jsxs)(`div`,{className:`att-stat blue`,children:[(0,l.jsx)(`div`,{className:`att-stat-val`,children:K?.total_days??0}),(0,l.jsx)(`div`,{className:`att-stat-label`,children:`Total Days`})]}),(0,l.jsxs)(`div`,{className:`att-stat green`,children:[(0,l.jsx)(`div`,{className:`att-stat-val`,children:K?.present_days??0}),(0,l.jsx)(`div`,{className:`att-stat-label`,children:`Present`})]}),(0,l.jsxs)(`div`,{className:`att-stat red`,children:[(0,l.jsx)(`div`,{className:`att-stat-val`,children:K?.absent_days??0}),(0,l.jsx)(`div`,{className:`att-stat-label`,children:`Absent`})]}),(0,l.jsxs)(`div`,{className:`att-stat orange`,children:[(0,l.jsxs)(`div`,{className:`att-stat-val`,children:[K?.percentage??0,`%`]}),(0,l.jsx)(`div`,{className:`att-stat-label`,children:`Attendance`})]})]}),(0,l.jsxs)(`div`,{className:`att-bar-wrapper`,children:[(0,l.jsxs)(`div`,{className:`att-bar-labels`,children:[(0,l.jsx)(`span`,{children:`Attendance Rate`}),(0,l.jsxs)(`span`,{children:[K?.percentage??0,`%`]})]}),(0,l.jsx)(`div`,{className:`att-bar-track`,children:(0,l.jsx)(`div`,{className:`att-bar-fill`,ref:m})})]})]})]}),(0,l.jsxs)(`div`,{className:`info-card`,children:[(0,l.jsxs)(`div`,{className:`card-header`,children:[(0,l.jsx)(`div`,{className:`card-header-icon icon-red`,children:(0,l.jsx)(`i`,{className:`fa-solid fa-umbrella-beach`})}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`card-header-title`,children:`Leave Summary`}),(0,l.jsx)(`div`,{className:`card-header-sub`,children:`This year's leave record`})]})]}),(0,l.jsx)(`div`,{className:`card-body`,children:(0,l.jsxs)(`div`,{className:`leave-grid`,children:[(0,l.jsxs)(`div`,{className:`leave-stat approved`,children:[(0,l.jsx)(`div`,{className:`leave-stat-val`,children:q?.approved??0}),(0,l.jsx)(`div`,{className:`leave-stat-label`,children:`Approved`})]}),(0,l.jsxs)(`div`,{className:`leave-stat pending`,children:[(0,l.jsx)(`div`,{className:`leave-stat-val`,children:q?.pending??0}),(0,l.jsx)(`div`,{className:`leave-stat-label`,children:`Pending`})]}),(0,l.jsxs)(`div`,{className:`leave-stat rejected`,children:[(0,l.jsx)(`div`,{className:`leave-stat-val`,children:q?.rejected??0}),(0,l.jsx)(`div`,{className:`leave-stat-label`,children:`Rejected`})]})]})})]}),(0,l.jsxs)(`div`,{className:`info-card`,children:[(0,l.jsxs)(`div`,{className:`card-header`,children:[(0,l.jsx)(`div`,{className:`card-header-icon icon-purple`,children:(0,l.jsx)(`i`,{className:`fa-solid fa-building-columns`})}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`card-header-title`,children:`Work Background`}),(0,l.jsx)(`div`,{className:`card-header-sub`,children:`Previous employment details`})]})]}),(0,l.jsxs)(`div`,{className:`card-body`,children:[(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Prev. Company`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.previous_company||`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Exp. Years`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.experience_years?`${G.experience_years} yrs`:`—`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Emp. Status`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.status||`Fresher`})]}),(0,l.jsxs)(`div`,{className:`info-row`,children:[(0,l.jsx)(`span`,{className:`info-label`,children:`Team Name`}),(0,l.jsx)(`span`,{className:`info-value`,children:G?.team_name||`—`})]})]})]}),(0,l.jsxs)(`div`,{className:`info-card full-width`,children:[(0,l.jsxs)(`div`,{className:`card-header`,children:[(0,l.jsx)(`div`,{className:`card-header-icon icon-brand`,children:(0,l.jsx)(`i`,{className:`fa-solid fa-diagram-project`})}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`card-header-title`,children:`Assigned Projects`}),(0,l.jsx)(`div`,{className:`card-header-sub`,children:`Projects you are currently working on`})]})]}),(0,l.jsx)(`div`,{className:`card-body`,children:J&&J.length>0?J.map((e,t)=>(0,l.jsxs)(`div`,{className:`project-item`,children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`project-name`,children:e.name}),(0,l.jsxs)(`div`,{className:`project-team`,children:[`Team Lead: `,e.team_lead]})]}),(0,l.jsx)(`span`,{className:`proj-badge ${W(e.status)}`,children:e.status})]},t)):(0,l.jsxs)(`div`,{className:`empty-state`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-folder-open`}),(0,l.jsx)(`p`,{children:`No projects assigned yet.`})]})})]})]}),b&&(0,l.jsx)(`div`,{className:`modal-overlay`,onClick:()=>{y(!1),_&&g(`/profile`)},children:(0,l.jsxs)(`div`,{className:`modal-container`,style:{maxWidth:`500px`},onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(`div`,{className:`modal-header`,children:[(0,l.jsx)(`h3`,{children:`Edit Profile Information`}),(0,l.jsx)(`button`,{className:`modal-close`,onClick:()=>{y(!1),_&&g(`/profile`)},children:`×`})]}),(0,l.jsxs)(`form`,{onSubmit:z,style:{textAlign:`left`},children:[(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`First Name`}),(0,l.jsx)(`input`,{type:`text`,value:x,onChange:e=>S(e.target.value),required:!0})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Email Address`}),(0,l.jsx)(`input`,{type:`email`,value:C,onChange:e=>w(e.target.value),required:!0})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Phone Number`}),(0,l.jsx)(`input`,{type:`text`,value:T,onChange:e=>E(e.target.value)})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Address`}),(0,l.jsx)(`textarea`,{value:D,onChange:e=>O(e.target.value),rows:`3`,style:{width:`100%`,padding:`10px`,borderRadius:`8px`,border:`1px solid var(--border)`}})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Date of Birth`}),(0,l.jsx)(`input`,{type:`date`,value:k,onChange:e=>A(e.target.value)})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Gender`}),(0,l.jsxs)(`select`,{value:j,onChange:e=>M(e.target.value),style:{width:`100%`,padding:`10px`,borderRadius:`8px`,border:`1px solid var(--border)`},children:[(0,l.jsx)(`option`,{value:`Male`,children:`Male`}),(0,l.jsx)(`option`,{value:`Female`,children:`Female`}),(0,l.jsx)(`option`,{value:`Other`,children:`Other`})]})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Profile Picture`}),(0,l.jsx)(`input`,{type:`file`,accept:`image/*`,onChange:e=>P(e.target.files[0])})]}),(0,l.jsxs)(`div`,{className:`form-group`,style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,l.jsx)(`input`,{type:`checkbox`,checked:F,onChange:e=>I(e.target.checked),style:{width:`auto`}}),(0,l.jsx)(`label`,{style:{marginBottom:0},children:`Remove current profile picture`})]}),(0,l.jsx)(`button`,{type:`submit`,className:`btn`,disabled:L,style:{width:`100%`,marginTop:`10px`},children:L?`Updating profile...`:`Save Changes`})]})]})})]})};export{u as default};