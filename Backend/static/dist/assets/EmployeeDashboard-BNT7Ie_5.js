import{a as e,c as t,f as n,l as r,m as i,p as a}from"./index-DGWqTciu.js";var o=i(n(),1),s=a(),c=()=>{let{user:n}=e(),[i,a]=(0,o.useState)(null),[c,l]=(0,o.useState)(null),[u,d]=(0,o.useState)(null),[f,p]=(0,o.useState)([]),[m,h]=(0,o.useState)(!0),[g,_]=(0,o.useState)(`Good day`),[v,y]=(0,o.useState)(``),[b,x]=(0,o.useState)(!1),[S,C]=(0,o.useState)({});(0,o.useEffect)(()=>{(async()=>{try{let e=new Date,n=e.getMonth()+1,r=e.getFullYear(),i=async e=>{try{return await t.get(e)}catch(t){return console.warn(`Failed to fetch ${e}:`,t),{data:null}}},[o,s,c,u]=await Promise.all([i(`/api/dashboard/employee/`),i(`/api/attendance/monthly/?month=${n}&year=${r}`),i(`/api/leaves/`),i(`/api/holidays/`)]);o.data&&a(o.data),s.data&&l(s.data),c.data&&d(c.data),u.data&&p(u.data)}catch(e){console.error(`Error loading employee dashboard metrics:`,e)}finally{h(!1)}})()},[]),(0,o.useEffect)(()=>{let e=()=>{let e=new Date;y(e.toLocaleTimeString(`en-US`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!0}));let t=e.getHours();_(t>=5&&t<12?`Good morning`:t>=12&&t<17?`Good afternoon`:`Good evening`)};e();let t=setInterval(e,1e3);return()=>clearInterval(t)},[]);let w=e=>{C(t=>({...t,[e]:!t[e]}))},T=e=>{if(!e)return`??`;let t=e.trim().split(/\s+/);return t.length>=2?(t[0][0]+t[t.length-1][0]).toUpperCase():t[0].substring(0,2).toUpperCase()},E=e=>{let t=[`linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)`,`linear-gradient(135deg, #10b981 0%, #047857 100%)`,`linear-gradient(135deg, #6366f1 0%, #4338ca 100%)`,`linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)`,`linear-gradient(135deg, #ec4899 0%, #be185d 100%)`,`linear-gradient(135deg, #f59e0b 0%, #b45309 100%)`,`linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)`],n=0;if(e)for(let t=0;t<e.length;t++)n=e.charCodeAt(t)+((n<<5)-n);return t[Math.abs(n)%t.length]};if(m)return(0,s.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,minHeight:`300px`,color:`var(--muted)`},children:[(0,s.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:`2rem`,marginRight:`10px`}}),` Loading dashboard...`]});let D=i?.tasks?.length||0,O=i?.tasks?.filter(e=>e.status===`Pending`).length||0,k=i?.tasks?.filter(e=>e.status===`In Progress`).length||0,A=i?.tasks?.filter(e=>e.status===`Completed`).length||0,j=i?.tasks?.filter(e=>e.status===`Completed`?!1:new Date(e.end_date)<new Date).length||0,M=i?.tasks?.filter(e=>e.priority===`High`).length||0,N=new Date().toISOString().split(`T`)[0];c?.days_data?.find(e=>e.date===N);let P=c?.stats?.percentage||100,F=D>0?Math.round(A/D*100):100,I=new Date;I.setHours(0,0,0,0);let L=u?.leaves?.some(e=>{if(e.status!==`Final Approved`)return!1;let t=new Date(e.from_date);t.setHours(0,0,0,0);let n=new Date(e.to_date);return n.setHours(0,0,0,0),I>=t&&I<=n});return(0,s.jsxs)(`div`,{className:`employee-dashboard-content`,children:[(0,s.jsx)(`style`,{children:`
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
            color: #ffffff;
        }
        .hero-role-badge {
            font-size: 0.65rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 3px 8px;
            border-radius: 4px;
            background: rgba(99, 102, 241, 0.15);
            color: #a5b4fc;
            border: 1px solid rgba(99, 102, 241, 0.2);
            margin-left: 6px;
            display: inline-flex;
            align-items: center;
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
        .hero-task-highlight {
            color: #818cf8;
            font-weight: 700;
            background: rgba(99, 102, 241, 0.1);
            padding: 2px 8px;
            border-radius: 4px;
            margin: 0 5px;
            font-size: 0.83rem;
        }
        .hero-date-widget {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 8px 16px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
            position: relative;
            z-index: 2;
        }
        .hero-date-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.82rem;
            font-weight: 500;
            color: #94a3b8;
        }
        .hero-date-item i {
            color: #818cf8;
        }
        .hero-date-divider {
            width: 1px;
            height: 12px;
            background: rgba(255, 255, 255, 0.15);
        }
        .hero-time-val {
            font-weight: 700;
            color: #ffffff;
            font-family: monospace;
        }

        /* ===== SECTION TITLE ===== */
        .section-header-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
          text-align: left;
          margin: 24px 0 16px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-header-title i {
          color: #4f46e5;
        }

        /* ===== CARDS & GRID ===== */
        .card {
            background: #ffffff;
            padding: 0;
            margin-bottom: 0;
            border-radius: 12px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03);
            border: 1px solid #e8edf2;
            text-align: left;
            overflow: hidden;
            transition: box-shadow 0.25s ease, transform 0.2s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .card:hover {
            box-shadow: 0 4px 20px rgba(0,0,0,0.07);
            transform: translateY(-2px);
        }
        .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            border-bottom: 1px solid #f1f5f9;
        }
        .card-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: #0f172a;
            display: flex;
            align-items: center;
            gap: 9px;
            margin: 0;
        }
        .card-title-icon {
            width: 30px;
            height: 30px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
        }
        .card-title-icon.blue { background: #eff6ff; color: #2563eb; }
        .card-title-icon.indigo { background: #eef2ff; color: #4f46e5; }
        .card-title-icon.emerald { background: #ecfdf5; color: #10b981; }
        .card-title-icon.amber { background: #fffbeb; color: #f59e0b; }
        .card-title-icon.rose { background: #fff1f2; color: #f43f5e; }
        .card-title-icon.purple { background: #faf5ff; color: #a855f7; }

        .card-link {
            font-size: 0.82rem;
            color: #4f46e5;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 5px 10px;
            border-radius: 6px;
            transition: background 0.2s ease;
        }
        .card-link:hover {
            background: #eef2ff;
        }
        .card-body {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 12px;
        }

        /* ===== GRIDS ===== */
        .todays-work-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }
        .bottom-dashboard-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }

        /* ===== WORK CARD DETAILS ===== */
        .work-details-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }
        .work-detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          padding-bottom: 6px;
          border-bottom: 1px solid #f1f5f9;
        }
        .work-detail-row:last-child {
          border-bottom: none;
        }
        .work-detail-label {
          color: #64748b;
          font-weight: 500;
        }
        .work-detail-val {
          color: #1e293b;
          font-weight: 700;
        }

        /* ===== QUICK ACTION BUTTONS ===== */
        .action-buttons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
        }
        .action-btn-shortcut {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 0.82rem;
          font-weight: 700;
          color: #475569;
          text-decoration: none;
          background: #f8fafc;
          transition: all 0.2s;
        }
        .action-btn-shortcut:hover {
          background: #eff6ff;
          border-color: #3b82f6;
          color: #2563eb;
        }
        .action-btn-shortcut.checkin {
          background: #2563eb;
          color: #ffffff;
          border-color: transparent;
        }
        .action-btn-shortcut.checkin:hover {
          background: #1d4ed8;
          color: #ffffff;
        }

        /* ===== PAYSLIP STATS ===== */
        .payslip-stats-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
            border: 1px solid #eef0f4;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 16px;
            background: #fafbfc;
        }
        .payslip-stat-cell {
            padding: 12px 14px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            text-align: center;
        }
        .payslip-stat-cell + .payslip-stat-cell {
            border-left: 1px solid #eef0f4;
        }
        .payslip-stat-label {
            font-size: 0.65rem;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 700;
        }
        .payslip-stat-value {
            font-size: 0.95rem;
            color: #0f172a;
            font-weight: 700;
        }
        .payslip-stat-value.emerald {
            color: #059669;
        }
        .payslip-status-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 20px;
        }
        .payslip-status-pill.paid { background: #d1fae5; color: #065f46; }
        .payslip-status-pill.pending { background: #fef3c7; color: #92400e; }
        .payslip-status-pill.other { background: #e0f2fe; color: #075985; }

        .btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 0.83rem;
            font-weight: 600;
            text-decoration: none;
            border: none;
            cursor: pointer;
            background: #4f46e5;
            color: #ffffff;
            transition: all 0.2s ease;
        }
        .btn-primary:hover {
            background: #4338ca;
        }
        .btn-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 0.83rem;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            background: #ffffff;
            color: #374151;
            border: 1px solid #d1d5db;
            transition: all 0.2s ease;
        }
        .btn-secondary:hover {
            background: #f9fafb;
            border-color: #9ca3af;
        }

        /* ===== TEAM CARD ===== */
        .team-lead-strip {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 12px 20px;
            background: #fafbfc;
            border-bottom: 1px solid #eef0f6;
            text-align: left;
        }
        .team-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            color: #fff;
            font-weight: 700;
            font-size: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .team-lead-meta {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
        }
        .team-lead-role-tag {
            font-size: 0.6rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #4f46e5;
            background: #eef2ff;
            padding: 2px 6px;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .team-lead-fullname {
            font-size: 0.85rem;
            font-weight: 700;
            color: #1e293b;
        }
        .team-emp-id {
            font-size: 0.75rem;
            color: #94a3b8;
            font-weight: 600;
        }
        .team-members-toggle {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background: #fafbfc;
            border: none;
            border-top: 1px solid #eef0f6;
            border-bottom: 1px solid #eef0f6;
            cursor: pointer;
            font-weight: 700;
            font-size: 0.82rem;
            color: #475569;
        }
        .members-badge {
            background: #3b82f6;
            color: #fff;
            font-size: 0.7rem;
            padding: 2px 6px;
            border-radius: 10px;
            margin-left: 6px;
        }
        .member-list {
            display: flex;
            flex-direction: column;
            padding: 8px 20px;
            background: #ffffff;
            max-height: 200px;
            overflow-y: auto;
        }
        .member-item {
            border-bottom: 1px solid #f1f5f9;
            padding: 6px 0;
        }
        .member-item:last-child {
            border-bottom: none;
        }
        .member-item-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
        }
        .member-summary {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .member-small-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            color: #fff;
            font-size: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        .member-item-name {
            font-size: 0.8rem;
            font-weight: 600;
            color: #334155;
        }
        .member-expand-chevron {
            font-size: 0.7rem;
            color: #94a3b8;
            transition: transform 0.2s;
        }
        .member-expand-chevron.open {
            transform: rotate(90deg);
        }
        .member-item-details {
            padding: 4px 0 4px 32px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            font-size: 0.75rem;
            text-align: left;
        }
        .member-detail-row {
            display: flex;
            gap: 6px;
        }
        .chevron-icon {
            transition: transform 0.2s;
        }
        .chevron-icon.open {
            transform: rotate(180deg);
        }

        /* ===== BOTTOM LIST ITEMS ===== */
        .bottom-list-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: left;
        }
        .bottom-list-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .bottom-list-item:last-child {
          border-bottom: none;
        }
        .bottom-list-item-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 0.75rem;
        }
        .bottom-list-item-content {
          flex: 1;
        }
        .bottom-list-item-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .bottom-list-item-sub {
          font-size: 0.72rem;
          color: #64748b;
          margin: 2px 0 0 0;
        }

        /* ===== RESPONSIVENESS ===== */
        @media (max-width: 1200px) {
          .todays-work-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bottom-dashboard-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .dashboard-hero {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }
          .hero-left {
            align-items: center;
          }
          .todays-work-grid {
            grid-template-columns: 1fr;
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          .bottom-dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}),(0,s.jsxs)(`section`,{className:`dashboard-hero`,children:[(0,s.jsxs)(`div`,{className:`hero-left`,children:[(0,s.jsx)(`span`,{className:`greeting-prefix`,children:g}),(0,s.jsxs)(`h1`,{className:`welcome-title`,children:[`Welcome back, `,n?.first_name?`${n.first_name} ${n.last_name||``}`:n?.username,(0,s.jsx)(`span`,{className:`hero-role-badge`,children:n?.role}),(0,s.jsx)(`span`,{className:`wave-emoji`,children:`👋`})]}),(0,s.jsxs)(`p`,{className:`hero-subtext`,children:[`You have `,(0,s.jsx)(`span`,{className:`hero-task-highlight`,children:i?.active_tasks_count||0}),` active tasks assigned to you today.`]})]}),(0,s.jsxs)(`div`,{className:`hero-date-widget`,children:[(0,s.jsxs)(`div`,{className:`hero-date-item`,children:[(0,s.jsx)(`i`,{className:`fa-regular fa-calendar-days`}),(0,s.jsx)(`span`,{children:new Date().toLocaleDateString(`en-US`,{day:`numeric`,month:`short`,year:`numeric`})})]}),(0,s.jsx)(`div`,{className:`hero-date-divider`}),(0,s.jsxs)(`div`,{className:`hero-date-item`,children:[(0,s.jsx)(`i`,{className:`fa-regular fa-clock`}),(0,s.jsx)(`span`,{className:`hero-time-val`,children:v||`Loading...`})]})]})]}),(0,s.jsxs)(`div`,{className:`section-header-title`,children:[(0,s.jsx)(`i`,{className:`fa-solid fa-briefcase`}),` Today's Work`]}),(0,s.jsxs)(`div`,{className:`todays-work-grid`,children:[(0,s.jsxs)(`div`,{className:`card`,children:[(0,s.jsx)(`div`,{className:`card-header`,children:(0,s.jsxs)(`h3`,{className:`card-title`,children:[(0,s.jsx)(`span`,{className:`card-title-icon blue`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-list-check`})}),`My Tasks`]})}),(0,s.jsxs)(`div`,{className:`card-body`,children:[(0,s.jsxs)(`div`,{className:`work-details-list`,children:[(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Total Tasks`}),(0,s.jsx)(`span`,{className:`work-detail-val`,children:D})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Pending`}),(0,s.jsx)(`span`,{className:`work-detail-val`,children:O})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`In Progress`}),(0,s.jsx)(`span`,{className:`work-detail-val`,children:k})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Completed`}),(0,s.jsx)(`span`,{className:`work-detail-val`,children:A})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Overdue`}),(0,s.jsx)(`span`,{className:`work-detail-val`,style:{color:j>0?`#ef4444`:`#1e293b`},children:j})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`High Priority`}),(0,s.jsx)(`span`,{className:`work-detail-val`,style:{color:M>0?`#f43f5e`:`#1e293b`},children:M})]})]}),(0,s.jsxs)(r,{to:`/tasks`,className:`card-link`,style:{marginTop:`auto`,alignSelf:`center`},children:[`View All Tasks `,(0,s.jsx)(`i`,{className:`fa-solid fa-arrow-right`,style:{fontSize:`0.7rem`}})]})]})]}),(0,s.jsxs)(`div`,{className:`card`,children:[(0,s.jsx)(`div`,{className:`card-header`,children:(0,s.jsxs)(`h3`,{className:`card-title`,children:[(0,s.jsx)(`span`,{className:`card-title-icon rose`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-hourglass-half`})}),`Deadlines & Events`]})}),(0,s.jsxs)(`div`,{className:`card-body`,children:[(0,s.jsxs)(`div`,{className:`work-details-list`,children:[(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Due Today`}),(0,s.jsx)(`span`,{className:`work-detail-val`,children:j})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Upcoming Deadlines`}),(0,s.jsx)(`span`,{className:`work-detail-val`,children:O})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Upcoming Meetings`}),(0,s.jsx)(`span`,{className:`work-detail-val`,children:`1 Scheduled`})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Training Sessions`}),(0,s.jsx)(`span`,{className:`work-detail-val`,children:`0 Assigned`})]})]}),(0,s.jsx)(`div`,{style:{fontSize:`0.75rem`,color:`#64748b`,textAlign:`center`,marginTop:`10px`},children:`No critical issues detected for today.`})]})]}),(0,s.jsxs)(`div`,{className:`card`,children:[(0,s.jsx)(`div`,{className:`card-header`,children:(0,s.jsxs)(`h3`,{className:`card-title`,children:[(0,s.jsx)(`span`,{className:`card-title-icon amber`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-bolt`})}),`Quick Actions`]})}),(0,s.jsx)(`div`,{className:`card-body`,style:{justifyContent:`center`},children:(0,s.jsxs)(`div`,{className:`action-buttons-grid`,children:[L?(0,s.jsxs)(`div`,{style:{gridColumn:`span 2`,padding:`10px`,background:`rgba(239, 68, 68, 0.1)`,color:`#ef4444`,borderRadius:`8px`,fontSize:`0.85rem`,fontWeight:600,textAlign:`center`},children:[(0,s.jsx)(`i`,{className:`fa-solid fa-umbrella-beach`}),` You are on approved leave today.`]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r,{to:`/attendance`,className:`action-btn-shortcut checkin`,children:`Check In`}),(0,s.jsx)(r,{to:`/attendance`,className:`action-btn-shortcut`,children:`Check Out`})]}),(0,s.jsx)(r,{to:`/leaves`,className:`action-btn-shortcut`,children:`Apply Leave`}),(0,s.jsx)(r,{to:`/tasks`,className:`action-btn-shortcut`,children:`Update Work`}),(0,s.jsx)(r,{to:`/messages`,className:`action-btn-shortcut`,children:`Messages`}),(0,s.jsx)(r,{to:`/attendance`,className:`action-btn-shortcut`,children:`My Reports`})]})})]}),(0,s.jsxs)(`div`,{className:`card`,children:[(0,s.jsx)(`div`,{className:`card-header`,children:(0,s.jsxs)(`h3`,{className:`card-title`,children:[(0,s.jsx)(`span`,{className:`card-title-icon emerald`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-chart-line`})}),`Productivity`]})}),(0,s.jsx)(`div`,{className:`card-body`,children:(0,s.jsxs)(`div`,{className:`work-details-list`,children:[(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Task Completion`}),(0,s.jsxs)(`span`,{className:`work-detail-val`,children:[F,`%`]})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Attendance Rate`}),(0,s.jsxs)(`span`,{className:`work-detail-val`,children:[P,`%`]})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Working Days (Month)`}),(0,s.jsxs)(`span`,{className:`work-detail-val`,children:[c?.stats?.present||0,` Days`]})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Sandwich Leaves`}),(0,s.jsx)(`span`,{className:`work-detail-val`,children:c?.stats?.sandwich_leave||0})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Weekly Offs`}),(0,s.jsx)(`span`,{className:`work-detail-val`,children:c?.stats?.weekly_off||0})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Current Project`}),(0,s.jsx)(`span`,{className:`work-detail-val`,style:{maxWidth:`110px`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},title:`Enterprise CRM System`,children:`Enterprise CRM`})]}),(0,s.jsxs)(`div`,{className:`work-detail-row`,children:[(0,s.jsx)(`span`,{className:`work-detail-label`,children:`Manager`}),(0,s.jsx)(`span`,{className:`work-detail-val`,style:{maxWidth:`110px`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:n?.reporting_manager_name||`Karan Johar`})]})]})})]})]}),(0,s.jsxs)(`div`,{className:`dashboard-grid`,children:[(0,s.jsxs)(`div`,{className:`card`,children:[(0,s.jsxs)(`div`,{className:`card-header`,children:[(0,s.jsxs)(`h3`,{className:`card-title`,children:[(0,s.jsx)(`span`,{className:`card-title-icon blue`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`})}),`Latest Payslip`]}),(0,s.jsxs)(r,{to:`/payslips`,className:`card-link`,children:[`View All `,(0,s.jsx)(`i`,{className:`fa-solid fa-arrow-right`,style:{fontSize:`0.7rem`}})]})]}),i?.latest_payslip?(0,s.jsxs)(`div`,{className:`card-body`,children:[(0,s.jsxs)(`div`,{className:`payslip-stats-row`,children:[(0,s.jsxs)(`div`,{className:`payslip-stat-cell`,children:[(0,s.jsx)(`span`,{className:`payslip-stat-label`,children:`Period`}),(0,s.jsxs)(`span`,{className:`payslip-stat-value`,children:[i.latest_payslip.month_name,` `,i.latest_payslip.year]})]}),(0,s.jsxs)(`div`,{className:`payslip-stat-cell`,children:[(0,s.jsx)(`span`,{className:`payslip-stat-label`,children:`Net Salary`}),(0,s.jsxs)(`span`,{className:`payslip-stat-value emerald`,children:[`₹`,i.latest_payslip.net_salary]})]}),(0,s.jsxs)(`div`,{className:`payslip-stat-cell`,children:[(0,s.jsx)(`span`,{className:`payslip-stat-label`,children:`Status`}),(0,s.jsxs)(`span`,{className:`payslip-status-pill ${i.latest_payslip.status===`Paid`?`paid`:i.latest_payslip.status===`Pending Approval`?`pending`:`other`}`,children:[(0,s.jsx)(`span`,{className:`status-dot`}),i.latest_payslip.status]})]})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`10px`},children:[(0,s.jsxs)(r,{to:`/payslips/${i.latest_payslip.id}`,className:`btn-primary`,children:[(0,s.jsx)(`i`,{className:`fa-solid fa-eye`}),` View Slip`]}),i.latest_payslip.payslip_pdf&&(0,s.jsxs)(`a`,{href:i.latest_payslip.payslip_pdf.startsWith(`http`)?i.latest_payslip.payslip_pdf:`${(t.defaults.baseURL||`http://127.0.0.1:8000`).replace(/\/$/,``)}${i.latest_payslip.payslip_pdf}`,download:!0,className:`btn-secondary`,children:[(0,s.jsx)(`i`,{className:`fa-solid fa-download`}),` Download PDF`]})]})]}):(0,s.jsx)(`div`,{className:`card-body`,children:(0,s.jsx)(`p`,{style:{color:`#94a3b8`,margin:0,fontSize:`0.9rem`},children:`No payslips published yet.`})})]}),(0,s.jsxs)(`div`,{className:`card`,children:[(0,s.jsx)(`div`,{className:`card-header`,children:(0,s.jsxs)(`h3`,{className:`card-title`,children:[(0,s.jsx)(`span`,{className:`card-title-icon indigo`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-people-group`})}),`Team Alignment`]})}),i?.team_lead?(0,s.jsxs)(`div`,{className:`team-lead-strip`,children:[(0,s.jsx)(`div`,{className:`team-avatar`,style:{background:E(i.team_lead.name)},children:T(i.team_lead.name)}),(0,s.jsxs)(`div`,{className:`team-lead-meta`,children:[(0,s.jsxs)(`span`,{className:`team-lead-role-tag`,children:[(0,s.jsx)(`i`,{className:`fa-solid fa-star`,style:{color:`#f59e0b`,fontSize:`0.6rem`}}),`Team Lead`]}),(0,s.jsx)(`span`,{className:`team-lead-fullname`,children:i.team_lead.name})]}),(0,s.jsx)(`span`,{className:`team-emp-id`,children:i.team_lead.emp_id})]}):(0,s.jsxs)(`div`,{className:`team-lead-strip`,style:{justifyContent:`center`,color:`#94a3b8`},children:[(0,s.jsx)(`i`,{className:`fa-solid fa-user-slash`,style:{marginRight:`8px`}}),(0,s.jsx)(`span`,{style:{fontSize:`0.88rem`,fontWeight:600},children:`No Team Assigned`})]}),i?.team_members&&i.team_members.length>0?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(`button`,{className:`team-members-toggle`,onClick:()=>x(!b),children:[(0,s.jsxs)(`span`,{className:`toggle-label`,children:[(0,s.jsx)(`i`,{className:`fa-solid fa-users`,style:{color:`#a5b4fc`,fontSize:`0.85rem`}}),`Team Members`,(0,s.jsx)(`span`,{className:`members-badge`,children:i.team_members.length})]}),(0,s.jsx)(`i`,{className:`fa-solid fa-chevron-down chevron-icon ${b?`open`:``}`})]}),b&&(0,s.jsx)(`div`,{className:`member-list`,children:i.team_members.map(e=>{let t=!!S[e.id];return(0,s.jsxs)(`div`,{className:`member-item`,children:[(0,s.jsxs)(`button`,{className:`member-item-header`,onClick:()=>w(e.id),children:[(0,s.jsxs)(`div`,{className:`member-summary`,children:[(0,s.jsx)(`div`,{className:`member-small-avatar`,style:{background:E(e.name)},children:T(e.name)}),(0,s.jsx)(`span`,{className:`member-item-name`,children:e.name})]}),(0,s.jsx)(`i`,{className:`fa-solid fa-chevron-right member-expand-chevron ${t?`open`:``}`})]}),t&&(0,s.jsxs)(`div`,{className:`member-item-details`,children:[(0,s.jsxs)(`div`,{className:`member-detail-row`,children:[(0,s.jsx)(`i`,{className:`fa-solid fa-id-badge`}),(0,s.jsx)(`span`,{style:{color:`#94a3b8`,fontWeight:600,fontSize:`0.75rem`,textTransform:`uppercase`,letterSpacing:`0.04em`},children:`ID`}),(0,s.jsx)(`span`,{style:{fontWeight:600,color:`#374151`},children:e.emp_id||`N/A`})]}),(0,s.jsxs)(`div`,{className:`member-detail-row`,children:[(0,s.jsx)(`i`,{className:`fa-solid fa-envelope`}),(0,s.jsx)(`span`,{style:{color:`#94a3b8`,fontWeight:600,fontSize:`0.75rem`,textTransform:`uppercase`,letterSpacing:`0.04em`},children:`Email`}),(0,s.jsx)(`a`,{href:`mailto:${e.email}`,children:e.email||`N/A`})]})]})]},e.id)})})]}):(0,s.jsx)(`div`,{style:{padding:`16px 24px`,color:`#94a3b8`,fontSize:`0.88rem`},children:`No other team members assigned.`})]})]}),(0,s.jsxs)(`div`,{className:`card`,style:{marginTop:`0`,marginBottom:`24px`},children:[(0,s.jsxs)(`div`,{className:`card-header`,children:[(0,s.jsxs)(`h3`,{className:`card-title`,children:[(0,s.jsx)(`span`,{className:`card-title-icon blue`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-list-check`})}),`Your Tasks (Latest)`]}),(0,s.jsxs)(r,{to:`/tasks`,className:`card-link`,children:[`View All Tasks `,(0,s.jsx)(`i`,{className:`fa-solid fa-arrow-right`,style:{fontSize:`0.7rem`}})]})]}),(0,s.jsx)(`div`,{className:`card-body`,style:{padding:`0 20px 20px 20px`},children:(0,s.jsx)(`div`,{className:`table-wrap`,children:(0,s.jsxs)(`table`,{style:{margin:0},children:[(0,s.jsx)(`thead`,{children:(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`th`,{children:`Task`}),(0,s.jsx)(`th`,{children:`Project`}),(0,s.jsx)(`th`,{children:`Start Date`}),(0,s.jsx)(`th`,{children:`End Date`}),(0,s.jsx)(`th`,{children:`Status`})]})}),(0,s.jsx)(`tbody`,{children:i?.tasks&&i.tasks.length>0?i.tasks.slice(0,4).map(e=>(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`td`,{style:{fontWeight:`600`},children:e.task_name}),(0,s.jsx)(`td`,{children:e.project?.project_name||`General`}),(0,s.jsx)(`td`,{children:e.start_date}),(0,s.jsx)(`td`,{children:e.end_date}),(0,s.jsx)(`td`,{children:(0,s.jsx)(`span`,{className:`badge-capsule ${e.status===`Completed`?`success`:e.status===`Submitted`?`info`:`warning`}`,children:e.status})})]},e.id)):(0,s.jsx)(`tr`,{children:(0,s.jsx)(`td`,{colSpan:`5`,style:{textAlign:`center`,color:`#64748b`},children:`No tasks assigned`})})})]})})})]}),(0,s.jsxs)(`div`,{className:`bottom-dashboard-grid`,children:[(0,s.jsxs)(`div`,{className:`card`,children:[(0,s.jsxs)(`div`,{className:`card-header`,children:[(0,s.jsxs)(`h3`,{className:`card-title`,children:[(0,s.jsx)(`span`,{className:`card-title-icon purple`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-comments`})}),`Recent Messages`]}),(0,s.jsx)(r,{to:`/messages`,className:`card-link`,children:`Chat`})]}),(0,s.jsx)(`div`,{className:`card-body`,children:(0,s.jsx)(`div`,{className:`bottom-list-container`,children:i?.recent_messages&&i.recent_messages.length>0?i.recent_messages.map((e,t)=>(0,s.jsxs)(`div`,{className:`bottom-list-item`,children:[(0,s.jsx)(`div`,{className:`bottom-list-item-avatar`,style:{background:E(e.sender_name)},children:T(e.sender_name)}),(0,s.jsxs)(`div`,{className:`bottom-list-item-content`,children:[(0,s.jsx)(`h5`,{className:`bottom-list-item-title`,children:e.sender_name}),(0,s.jsx)(`p`,{className:`bottom-list-item-sub`,children:e.text})]})]},t)):(0,s.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No recent messages`})})})]}),(0,s.jsxs)(`div`,{className:`card`,children:[(0,s.jsx)(`div`,{className:`card-header`,children:(0,s.jsxs)(`h3`,{className:`card-title`,children:[(0,s.jsx)(`span`,{className:`card-title-icon rose`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-bell`})}),`Notifications`]})}),(0,s.jsx)(`div`,{className:`card-body`,children:(0,s.jsx)(`div`,{className:`bottom-list-container`,children:i?.notifications&&i.notifications.length>0?i.notifications.map((e,t)=>(0,s.jsxs)(`div`,{className:`bottom-list-item`,children:[(0,s.jsx)(`div`,{className:`bottom-list-item-avatar`,style:{background:`#f59e0b`,fontSize:`10px`},children:(0,s.jsx)(`i`,{className:`fa-solid fa-bell`})}),(0,s.jsxs)(`div`,{className:`bottom-list-item-content`,children:[(0,s.jsx)(`h5`,{className:`bottom-list-item-title`,children:e.title}),(0,s.jsx)(`p`,{className:`bottom-list-item-sub`,children:e.message})]})]},t)):(0,s.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No new notifications`})})})]}),(0,s.jsxs)(`div`,{className:`card`,children:[(0,s.jsxs)(`div`,{className:`card-header`,children:[(0,s.jsxs)(`h3`,{className:`card-title`,children:[(0,s.jsx)(`span`,{className:`card-title-icon emerald`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-umbrella-beach`})}),`Upcoming Holidays`]}),(0,s.jsx)(r,{to:`/attendance`,className:`card-link`,children:`All`})]}),(0,s.jsx)(`div`,{className:`card-body`,children:(0,s.jsx)(`div`,{className:`bottom-list-container`,children:f&&f.length>0?f.slice(0,2).map(e=>(0,s.jsxs)(`div`,{className:`bottom-list-item`,children:[(0,s.jsx)(`div`,{className:`bottom-list-item-avatar`,style:{background:`#f59e0b`,fontSize:`10px`},children:(0,s.jsx)(`i`,{className:`fa-solid fa-calendar`})}),(0,s.jsxs)(`div`,{className:`bottom-list-item-content`,children:[(0,s.jsx)(`h5`,{className:`bottom-list-item-title`,children:e.name}),(0,s.jsx)(`p`,{className:`bottom-list-item-sub`,children:e.date})]})]},e.id)):(0,s.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No upcoming holidays`})})})]}),(0,s.jsxs)(`div`,{className:`card`,children:[(0,s.jsx)(`div`,{className:`card-header`,children:(0,s.jsxs)(`h3`,{className:`card-title`,children:[(0,s.jsx)(`span`,{className:`card-title-icon amber`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-bullhorn`})}),`Announcements`]})}),(0,s.jsx)(`div`,{className:`card-body`,children:(0,s.jsx)(`div`,{className:`bottom-list-container`,children:i?.announcements&&i.announcements.length>0?i.announcements.map((e,t)=>(0,s.jsx)(`div`,{className:`bottom-list-item`,style:{alignItems:`flex-start`},children:(0,s.jsxs)(`div`,{className:`bottom-list-item-content`,children:[(0,s.jsx)(`h5`,{className:`bottom-list-item-title`,style:{fontSize:`0.8rem`,color:`#4f46e5`},children:e.title}),(0,s.jsx)(`p`,{className:`bottom-list-item-sub`,style:{fontSize:`0.7rem`},children:e.message})]})},t)):(0,s.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No announcements`})})})]})]})]})};export{c as default};