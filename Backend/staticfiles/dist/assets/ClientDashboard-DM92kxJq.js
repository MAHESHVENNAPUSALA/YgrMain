import{a as e,c as t,d as n,f as r,m as i,p as a}from"./index-DhX1kTxg.js";var o=i(r(),1),s=a(),c=()=>{let{user:r}=e(),i=n(),[a,c]=(0,o.useState)({client:{},projects:[]}),[l,u]=(0,o.useState)(!0);(0,o.useEffect)(()=>{(async()=>{try{c((await t.get(`/api/dashboard/client/`)).data)}catch(e){console.error(`Failed to load client dashboard`,e)}finally{u(!1)}})()},[]);let d=async e=>{let n=[];e.manager_id&&n.push(e.manager_id),e.teams.forEach(e=>{e.lead_id&&n.push(e.lead_id),e.members.forEach(e=>n.push(e.id))});let r=[...new Set(n)];try{let n=await t.post(`/api/chatrooms/`,{name:`Project: ${e.name}`,room_type:`team`,description:`Chat room for ${e.name}`,users:r});i(`/messages`,{state:{openChatId:n.data.id,chatType:`team`,chatName:n.data.name}})}catch(e){console.error(`Failed to start chat`,e),alert(`Failed to start chat. Maybe it already exists? Check Messages.`),i(`/messages`)}};return l?(0,s.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,minHeight:`300px`,color:`var(--muted)`},children:[(0,s.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:`2rem`,marginRight:`10px`}}),` Loading dashboard...`]}):(0,s.jsxs)(`div`,{className:`employee-dashboard-content`,style:{padding:`24px`},children:[(0,s.jsx)(`style`,{children:`
        /* HERO GREETING BANNER */
        .dashboard-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            border-radius: 12px;
            padding: 24px 32px;
            color: #ffffff;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03);
            margin-bottom: 24px;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.08);
            min-height: 120px;
        }
        .dashboard-hero::before {
            content: '';
            position: absolute;
            top: -40px;
            right: -40px;
            width: 180px;
            height: 180px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%);
            border-radius: 50%;
            pointer-events: none;
            filter: blur(10px);
        }
        .hero-left {
            position: relative;
            z-index: 2;
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
        }
        .greeting-prefix {
            font-size: 0.65rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: #818cf8;
            margin-bottom: 2px;
            display: block;
        }
        .welcome-title {
            font-size: 1.6rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            line-height: 1.2;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            margin: 0;
            color: #ffffff !important;
        }
        .wave-emoji {
            display: inline-block;
            animation: wave-animation 2.5s infinite;
            transform-origin: 70% 70%;
        }
        @keyframes wave-animation {
            0% { transform: rotate( 0.0deg) }
            10% { transform: rotate(14.0deg) }
            20% { transform: rotate(-8.0deg) }
            30% { transform: rotate(14.0deg) }
            40% { transform: rotate(-4.0deg) }
            50% { transform: rotate(10.0deg) }
            60% { transform: rotate( 0.0deg) }
            100% { transform: rotate( 0.0deg) }
        }
        .hero-subtext {
            font-size: 0.88rem;
            color: #94a3b8;
            margin: 4px 0 0 0;
            font-weight: 400;
            line-height: 1.4;
            display: flex;
            align-items: center;
        }
        .client-projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .project-card {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          padding: 20px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .project-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .project-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0;
          color: #1e293b;
        }
        .status-badge {
          font-size: 0.75rem;
          padding: 4px 8px;
          border-radius: 999px;
          font-weight: 600;
        }
        .status-completed { background: #dcfce7; color: #166534; }
        .status-pending { background: #e0e7ff; color: #3730a3; }
        .project-meta {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 16px;
        }
        .progress-container {
          margin-bottom: 16px;
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          margin-bottom: 4px;
          font-weight: 600;
        }
        .progress-bar-bg {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: #4f46e5;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .section-subtitle {
          font-size: 0.85rem;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #334155;
        }
        .team-box {
          font-size: 0.8rem;
          color: #475569;
          margin-bottom: 16px;
          padding: 10px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #f1f5f9;
        }
        .team-box.compact {
          margin-bottom: 8px;
        }
        .message-btn {
          width: 100%;
          padding: 10px;
          background: #4f46e5;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .message-btn:hover {
          background: #4338ca;
        }
      `}),(0,s.jsx)(`section`,{className:`dashboard-hero`,children:(0,s.jsxs)(`div`,{className:`hero-left`,children:[(0,s.jsx)(`span`,{className:`greeting-prefix`,children:`Client Portal`}),(0,s.jsxs)(`h1`,{className:`welcome-title`,children:[`Welcome back, `,a.client?.name||r?.first_name,` `,(0,s.jsx)(`span`,{className:`wave-emoji`,children:`👋`})]}),a.client?.business_name&&(0,s.jsxs)(`p`,{className:`hero-subtext`,children:[`Representing `,a.client.business_name]})]})}),(0,s.jsx)(`h2`,{style:{fontSize:`1.2rem`,fontWeight:700,marginBottom:`16px`,color:`#1e293b`},children:`Your Projects`}),(0,s.jsx)(`div`,{className:`client-projects-grid`,children:a.projects.length===0?(0,s.jsx)(`p`,{children:`No projects assigned to you yet.`}):a.projects.map(e=>(0,s.jsxs)(`div`,{className:`project-card`,children:[(0,s.jsxs)(`div`,{className:`project-header`,children:[(0,s.jsx)(`h3`,{className:`project-title`,children:e.name}),(0,s.jsx)(`span`,{className:`status-badge ${e.status===`Completed`?`status-completed`:`status-pending`}`,children:e.status})]}),(0,s.jsxs)(`p`,{className:`project-meta`,children:[`Code: `,e.project_code,` `,(0,s.jsx)(`br`,{}),`Deadline: `,e.deadline||`Not set`]}),(0,s.jsxs)(`div`,{className:`progress-container`,children:[(0,s.jsxs)(`div`,{className:`progress-header`,children:[(0,s.jsx)(`span`,{children:`Progress`}),(0,s.jsxs)(`span`,{children:[e.progress,`%`]})]}),(0,s.jsx)(`div`,{className:`progress-bar-bg`,children:(0,s.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${e.progress}%`}})})]}),(0,s.jsxs)(`div`,{style:{marginBottom:`20px`},children:[(0,s.jsx)(`h4`,{className:`section-subtitle`,children:`Assigned Manager`}),(0,s.jsx)(`div`,{className:`team-box`,children:e.manager||`Not Assigned`}),(0,s.jsx)(`h4`,{className:`section-subtitle`,children:`Assigned Teams`}),e.teams.length===0?(0,s.jsx)(`p`,{style:{fontSize:`0.8rem`},children:`No teams assigned.`}):e.teams.map((e,t)=>(0,s.jsxs)(`div`,{className:`team-box compact`,children:[(0,s.jsx)(`strong`,{children:e.name}),` (Lead: `,e.lead||`N/A`,`)`,(0,s.jsxs)(`div`,{style:{marginTop:`4px`},children:[`Members: `,e.members.length>0?e.members.map(e=>e.name).join(`, `):`None`]})]},t))]}),(0,s.jsxs)(`button`,{onClick:()=>d(e),className:`message-btn`,children:[(0,s.jsx)(`i`,{className:`fa-solid fa-comments`,style:{marginRight:`8px`}}),`Message Team`]})]},e.id))})]})};export{c as default};