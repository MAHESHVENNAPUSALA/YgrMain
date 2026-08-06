import{a as e,c as t,d as n,f as r,i,l as a,m as o,p as s,t as c}from"./index-E7nG5Fmr.js";import{t as l}from"./OnLeaveTodayWidget-FhKmrP2I.js";var u=o(r(),1),d=s(),f=()=>{let{user:r}=e(),o=n(),{showToast:s}=i(),{prompt:f}=c(),[p,m]=(0,u.useState)(null),[h,g]=(0,u.useState)([]),[_,v]=(0,u.useState)([]),[y,b]=(0,u.useState)([]),[x,S]=(0,u.useState)(!0),[C,w]=(0,u.useState)(``),[T,E]=(0,u.useState)(``),[D,O]=(0,u.useState)(``),[k,A]=(0,u.useState)(!1),[j,M]=(0,u.useState)(!1),N=async()=>{try{let[e,n,r,i]=await Promise.all([t.get(`/api/dashboard/teamlead/`),t.get(`/api/leaves/`,{params:{scope:`team-all`}}),t.get(`/api/tasks/`),t.get(`/api/holidays/`)]);m(e.data),g(n.data.leaves||[]),v(r.data||[]),b(i.data||[])}catch(e){console.error(`Error fetching dashboard data:`,e)}finally{S(!1)}};(0,u.useEffect)(()=>{let e=document.querySelector(`.main`);return e&&e.style.setProperty(`padding`,`0`,`important`),()=>{e&&e.style.setProperty(`padding`,`24px`,`important`)}},[]),(0,u.useEffect)(()=>{N();let e=setInterval(()=>{w(new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}))},1e3);return()=>clearInterval(e)},[]);let P=async(e,n)=>{let r=``;if(n===`reject`){if(r=await f(`Please enter comments/reason for rejection:`),r===null)return}else if(r=await f(`Enter any comments (optional):`,``),r===null)return;try{await t.post(`/api/leaves/${e}/action/`,{action:n,comments:r}),s(`Leave request successfully updated.`,`success`),N()}catch(e){s(e.response?.data?.detail||`Failed to update leave request.`,`error`)}};if(x)return(0,d.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,minHeight:`400px`,color:`var(--muted)`},children:[(0,d.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:`2rem`,marginRight:`10px`}}),` Loading Premium Workspace...`]});let F=p?.member_status_list||[],I=F.filter(e=>e.attendance_status&&e.attendance_status.includes(`Present`)).length,L=h.filter(e=>{let t=new Date().toISOString().split(`T`)[0];return e.status===`Final Approved`&&e.from_date<=t&&e.to_date>=t}).length,R=h.filter(e=>e.status===`Pending Team Leader Approval`).length,z=_.filter(e=>e.status===`Submitted`).length,B=p?.projects_count||0,V=p?.members_count||0,H=F.filter(e=>{let t=e.name||``,n=e.emp_id||``,r=t.toLowerCase().includes(T.toLowerCase())||n.toLowerCase().includes(T.toLowerCase()),i=D===``||e.attendance_status===D;return r&&i}),U=()=>{let e=`data:text/csv;charset=utf-8,`;e+=`Employee,Employee ID,Check In,Status,Active Task,Task Status\r
`,H.forEach(t=>{e+=`"${t.name}","${t.emp_id}","${t.check_in}","${t.attendance_status}","${t.current_task}","${t.task_status}"\r\n`});let t=encodeURI(e),n=document.createElement(`a`);n.setAttribute(`href`,t),n.setAttribute(`download`,`team_attendance_${new Date().toISOString().split(`T`)[0]}.csv`),document.body.appendChild(n),n.click(),document.body.removeChild(n)},W=()=>{let e=new Date().getHours();return e<12?`Good Morning`:e<17?`Good Afternoon`:`Good Evening`},G={pending:_.filter(e=>e.status===`Pending`).length,inProgress:_.filter(e=>e.status===`In Progress`).length,completed:_.filter(e=>e.status===`Completed`).length,overdue:_.filter(e=>{let t=new Date().toISOString().split(`T`)[0];return e.status!==`Completed`&&e.end_date<t}).length,blocked:_.filter(e=>e.status===`Blocked`).length},K=_.length||1,q=p?.attendance_rate??(F.length>0?Math.round(F.reduce((e,t)=>e+(t.attendance_pct||0),0)/F.length):0),J=p?.team_performance??(F.length>0?Math.round(F.reduce((e,t)=>e+(t.productivity_pct||0),0)/F.length):0),Y=K>0?Math.round(G.completed/K*100):0,X=V>0?Math.round(I/V*100):0,Z=h.filter(e=>e.leave_type===`Paid`&&e.status===`Final Approved`).length,Q=h.filter(e=>e.leave_type===`Unpaid`&&e.status===`Final Approved`).length,$=h.filter(e=>e.status===`Pending Team Leader Approval`&&e.user!==r?.id);return(0,d.jsxs)(`div`,{className:`premium-tl-dashboard`,children:[(0,d.jsx)(`style`,{children:`
        /* Override .main padding to allow full-width banner */
        .main {
          padding: 0 !important;
        }

        /* --- Styles --- */
        .premium-tl-dashboard {
          color: #1e293b;
          font-family: var(--font-sans, 'Inter', sans-serif);
        }
        
        /* Banner Card */
        .tl-welcome-banner {
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
          color: #ffffff;
          border-radius: 0 !important;
          padding: 32px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 24px;
          text-align: left;
        }
        .banner-left {
          flex: 1;
          min-width: 280px;
        }
        .banner-greeting {
          font-size: 1.4rem;
          font-weight: 500;
          color: #a5f3fc;
          margin-bottom: 4px;
        }
        .banner-name {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 12px;
        }
        .banner-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          font-size: 0.88rem;
          color: #cbd5e1;
        }
        .banner-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .banner-detail-item i {
          color: #22d3ee;
          margin-top: 3px;
          flex-shrink: 0;
        }
        .banner-right {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          min-width: 320px;
        }
        .banner-metric-card {
          text-align: center;
        }
        .banner-metric-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: #22d3ee;
        }
        .banner-metric-label {
          font-size: 0.72rem;
          color: #94a3b8;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-top: 2px;
        }

        /* Stats Row */
        .tl-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
          padding: 0 24px;
        }
        .kpi-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          text-align: left;
        }
        .kpi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .kpi-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #fff;
        }
        .kpi-trend {
          font-size: 0.74rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .kpi-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .kpi-label {
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 600;
        }

        /* Grid Layouts */
        .grid-70-30 {
          display: grid;
          grid-template-columns: 2.2fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
          padding: 0 24px;
        }
        .grid-50-50 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
          padding: 0 24px;
        }
        @media (max-width: 1024px) {
          .grid-70-30, .grid-50-50 {
            grid-template-columns: 1fr;
          }
        }

        /* Cards & Panels */
        .premium-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .card-header-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .card-header-action h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .card-header-action h3 i {
          color: #4f46e5;
        }
        .card-body-padding {
          padding: 20px;
        }

        /* Quick Action Buttons */
        .quick-actions-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .quick-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.8rem;
          color: #475569;
          transition: all 0.2s;
          cursor: pointer;
        }
        .quick-btn i {
          font-size: 1.4rem;
          margin-bottom: 8px;
          color: #4f46e5;
        }
        .quick-btn:hover {
          background: #e0e7ff;
          border-color: #c7d2fe;
          color: #4f46e5;
          transform: translateY(-2px);
        }

        /* Progress Widgets */
        .progress-widget-row {
          margin-bottom: 14px;
          text-align: left;
        }
        .progress-widget-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 4px;
        }
        .progress-bar-bg {
          height: 8px;
          background: #cbd5e1;
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 4px;
        }

        /* Recent Activity Feed */
        .activity-feed {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }
        .activity-item {
          display: flex;
          gap: 12px;
        }
        .activity-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.88rem;
          color: #fff;
          flex-shrink: 0;
        }
        .activity-details {
          flex: 1;
        }
        .activity-text {
          font-size: 0.84rem;
          font-weight: 600;
          color: #334155;
        }
        .activity-time {
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 2px;
        }

        /* Charts Row Grid */
        .charts-section-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
          padding: 0 24px;
        }

        /* Modal overlay and animations */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-in-out;
        }
        .modal-container {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          width: 90%;
          max-width: 550px;
          overflow: hidden;
          animation: slideUp 0.3s ease-in-out;
          border: 1px solid #e2e8f0;
        }
        .modal-header {
          padding: 18px 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-header h3 {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
        }
        .modal-close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #64748b;
          transition: color 0.2s;
        }
        .modal-close-btn:hover {
          color: #ef4444;
        }
        .modal-body {
          padding: 24px;
          max-height: 400px;
          overflow-y: auto;
        }
        .dev-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .dev-list-item:last-child {
          border-bottom: none;
        }
        .dev-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .dev-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e0e7ff;
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .dev-name-id {
          text-align: left;
        }
        .dev-name {
          font-weight: 700;
          color: #1e293b;
          font-size: 0.9rem;
        }
        .dev-id {
          font-size: 0.76rem;
          color: #64748b;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* ===== BOTTOM LIST ITEMS ===== */
        .bottom-list-container {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }
        .bottom-list-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .bottom-list-item:last-child {
          border-bottom: none;
        }
        .bottom-list-item-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .bottom-list-item-content, .bottom-list-content {
          flex: 1;
          min-width: 0;
        }
        .bottom-list-item-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bottom-list-item-sub {
          font-size: 0.75rem;
          color: #64748b;
          margin: 3px 0 0 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}),(0,d.jsxs)(`div`,{className:`tl-welcome-banner`,children:[(0,d.jsxs)(`div`,{className:`banner-left`,children:[(0,d.jsxs)(`div`,{className:`banner-greeting`,children:[W(),`, Team Leader`]}),(0,d.jsxs)(`div`,{className:`banner-name`,children:[r?.first_name||`TL`,` `,r?.last_name||`Workspace`]}),(0,d.jsxs)(`div`,{className:`banner-details-grid`,children:[(0,d.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,d.jsx)(`i`,{className:`fa-solid fa-id-card`}),` `,(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`strong`,{children:`ID:`}),` `,r?.emp_id||`YGRTL001`]})]}),(0,d.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,d.jsx)(`i`,{className:`fa-solid fa-sitemap`}),` `,(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`strong`,{children:`Dept:`}),` `,r?.department||`Software Dev`]})]}),(0,d.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,d.jsx)(`i`,{className:`fa-solid fa-users-viewfinder`}),` `,(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`strong`,{children:`Team:`}),` `,r?.team_name||`Core Dev Team`]})]}),(0,d.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,d.jsx)(`i`,{className:`fa-solid fa-user-tie`}),` `,(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`strong`,{children:`Manager:`}),` `,r?.reporting_manager_name||`Managing Director`]})]}),(0,d.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,d.jsx)(`i`,{className:`fa-solid fa-calendar-day`}),` `,(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`strong`,{children:`Date:`}),` `,new Date().toLocaleDateString([],{weekday:`short`,month:`short`,day:`numeric`})]})]}),(0,d.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,d.jsx)(`i`,{className:`fa-solid fa-clock`}),` `,(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`strong`,{children:`Live:`}),` `,C||`04:26 PM`]})]}),(0,d.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,d.jsx)(`i`,{className:`fa-solid fa-business-time`}),` `,(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`strong`,{children:`Shift:`}),` General (09:30 AM - 06:30 PM)`]})]})]})]}),(0,d.jsxs)(`div`,{className:`banner-right`,children:[(0,d.jsxs)(`div`,{className:`banner-metric-card`,children:[(0,d.jsxs)(`div`,{className:`banner-metric-value`,children:[J,`%`]}),(0,d.jsx)(`div`,{className:`banner-metric-label`,children:`Team Performance`})]}),(0,d.jsxs)(`div`,{className:`banner-metric-card`,children:[(0,d.jsxs)(`div`,{className:`banner-metric-value`,children:[q,`%`]}),(0,d.jsx)(`div`,{className:`banner-metric-label`,children:`Attendance Rate`})]}),(0,d.jsxs)(`div`,{className:`banner-metric-card`,style:{gridColumn:`span 2`,borderTop:`1px solid rgba(255,255,255,0.1)`,paddingTop:`10px`},children:[(0,d.jsx)(`div`,{className:`banner-metric-value`,style:{fontSize:`1rem`,color:`#cbd5e1`},children:p?.projects?.[0]?.project_name||`YGR CRM System`}),(0,d.jsx)(`div`,{className:`banner-metric-label`,children:`Active Sprint / Project`})]})]})]}),(0,d.jsxs)(`div`,{className:`dashboard-content-wrapper`,style:{padding:`0 24px`},children:[(0,d.jsxs)(`div`,{className:`tl-kpi-grid`,style:{padding:`0`},children:[(0,d.jsxs)(`div`,{className:`kpi-card`,onClick:()=>o(`/tasks`,{state:{activeTab:`board`,projectFilter:`active`}}),children:[(0,d.jsxs)(`div`,{className:`kpi-header`,children:[(0,d.jsx)(`div`,{className:`kpi-icon-wrap`,style:{background:`#4f46e5`},children:(0,d.jsx)(`i`,{className:`fa-solid fa-diagram-project`})}),(0,d.jsx)(`span`,{className:`kpi-trend`,style:{background:`#d1fae5`,color:`#065f46`},children:`+2 New`})]}),(0,d.jsx)(`div`,{className:`kpi-value`,children:B}),(0,d.jsx)(`div`,{className:`kpi-label`,children:`Active Projects`})]}),(0,d.jsxs)(`div`,{className:`kpi-card`,onClick:()=>o(`/attendance-list`),children:[(0,d.jsxs)(`div`,{className:`kpi-header`,children:[(0,d.jsx)(`div`,{className:`kpi-icon-wrap`,style:{background:`#10b981`},children:(0,d.jsx)(`i`,{className:`fa-solid fa-users`})}),(0,d.jsx)(`span`,{className:`kpi-trend`,style:{background:`#fef3c7`,color:`#92400e`},children:`Active`})]}),(0,d.jsx)(`div`,{className:`kpi-value`,children:V}),(0,d.jsx)(`div`,{className:`kpi-label`,children:`Assigned Developers`})]}),(0,d.jsxs)(`div`,{className:`kpi-card`,onClick:()=>o(`/attendance-list`,{state:{statusFilter:`Present`}}),children:[(0,d.jsxs)(`div`,{className:`kpi-header`,children:[(0,d.jsx)(`div`,{className:`kpi-icon-wrap`,style:{background:`#3b82f6`},children:(0,d.jsx)(`i`,{className:`fa-solid fa-user-check`})}),(0,d.jsxs)(`span`,{className:`kpi-trend`,style:{background:`#d1fae5`,color:`#065f46`},children:[X,`% Present`]})]}),(0,d.jsx)(`div`,{className:`kpi-value`,children:I}),(0,d.jsx)(`div`,{className:`kpi-label`,children:`Present Today`})]}),(0,d.jsxs)(`div`,{className:`kpi-card`,onClick:()=>o(`/tl-approved-leaves`,{state:{statusFilter:`Final Approved`}}),children:[(0,d.jsxs)(`div`,{className:`kpi-header`,children:[(0,d.jsx)(`div`,{className:`kpi-icon-wrap`,style:{background:`#ef4444`},children:(0,d.jsx)(`i`,{className:`fa-solid fa-house-laptop`})}),(0,d.jsx)(`span`,{className:`kpi-trend`,style:{background:`#f1f5f9`,color:`#475569`},children:`Today`})]}),(0,d.jsx)(`div`,{className:`kpi-value`,children:L}),(0,d.jsx)(`div`,{className:`kpi-label`,children:`Employees on Leave`})]}),(0,d.jsxs)(`div`,{className:`kpi-card`,onClick:()=>o(`/tasks`,{state:{activeTab:`board`,statusFilter:`Submitted`}}),children:[(0,d.jsxs)(`div`,{className:`kpi-header`,children:[(0,d.jsx)(`div`,{className:`kpi-icon-wrap`,style:{background:`#f59e0b`},children:(0,d.jsx)(`i`,{className:`fa-solid fa-code-pull-request`})}),(0,d.jsx)(`span`,{className:`kpi-trend`,style:{background:`#fee2e2`,color:`#991b1b`},children:`High`})]}),(0,d.jsx)(`div`,{className:`kpi-value`,children:z}),(0,d.jsx)(`div`,{className:`kpi-label`,children:`Pending Task Reviews`})]}),(0,d.jsxs)(`div`,{className:`kpi-card`,onClick:()=>o(`/leave-requests`,{state:{statusFilter:`Pending Team Leader Approval`}}),children:[(0,d.jsxs)(`div`,{className:`kpi-header`,children:[(0,d.jsx)(`div`,{className:`kpi-icon-wrap`,style:{background:`#ec4899`},children:(0,d.jsx)(`i`,{className:`fa-solid fa-envelope-open-text`})}),(0,d.jsx)(`span`,{className:`kpi-trend`,style:{background:`#e0e7ff`,color:`#3730a3`},children:`TL Action`})]}),(0,d.jsx)(`div`,{className:`kpi-value`,children:R}),(0,d.jsx)(`div`,{className:`kpi-label`,children:`Pending Leave Approvals`})]})]}),(0,d.jsxs)(`div`,{className:`grid-70-30`,children:[(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsxs)(`div`,{className:`card-header-action`,children:[(0,d.jsxs)(`h3`,{children:[(0,d.jsx)(`i`,{className:`fa-solid fa-users-line`}),` Today's Team Attendance`]}),(0,d.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,d.jsx)(`input`,{type:`text`,placeholder:`Search Developer...`,value:T,onChange:e=>E(e.target.value),style:{padding:`6px 12px`,border:`1px solid #cbd5e1`,borderRadius:`6px`,fontSize:`0.8rem`}}),(0,d.jsxs)(`select`,{value:D,onChange:e=>O(e.target.value),style:{padding:`6px 12px`,border:`1px solid #cbd5e1`,borderRadius:`6px`,fontSize:`0.8rem`,fontWeight:600},children:[(0,d.jsx)(`option`,{value:``,children:`All Statuses`}),(0,d.jsx)(`option`,{value:`Present`,children:`Present`}),(0,d.jsx)(`option`,{value:`Absent`,children:`Absent`}),(0,d.jsx)(`option`,{value:`On Leave`,children:`Leave`})]}),(0,d.jsxs)(`button`,{className:`download-btn`,onClick:U,style:{padding:`6px 12px`,fontSize:`0.8rem`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,d.jsx)(`i`,{className:`fa-solid fa-file-export`}),` Export`]})]})]}),(0,d.jsx)(`div`,{className:`card-body-padding`,style:{padding:`0px`},children:(0,d.jsx)(`div`,{className:`table-wrap`,children:(0,d.jsxs)(`table`,{className:`dense-table`,style:{margin:`0px`},children:[(0,d.jsx)(`thead`,{children:(0,d.jsxs)(`tr`,{style:{background:`#f8fafc`},children:[(0,d.jsx)(`th`,{children:`Employee`}),(0,d.jsx)(`th`,{children:`Check In`}),(0,d.jsx)(`th`,{children:`Check Out`}),(0,d.jsx)(`th`,{children:`Working Hours`}),(0,d.jsx)(`th`,{children:`Status`}),(0,d.jsx)(`th`,{children:`Active Task`}),(0,d.jsx)(`th`,{children:`Task Status`})]})}),(0,d.jsx)(`tbody`,{children:H.length>0?H.map(e=>(0,d.jsxs)(`tr`,{children:[(0,d.jsxs)(`td`,{style:{fontWeight:600},children:[e.name,` (`,e.emp_id,`)`]}),(0,d.jsx)(`td`,{children:e.check_in}),(0,d.jsx)(`td`,{children:e.check_out||`—`}),(0,d.jsxs)(`td`,{children:[e.working_hours||`8.0`,` Hrs`]}),(0,d.jsx)(`td`,{children:(0,d.jsx)(`span`,{className:`badge-capsule ${e.attendance_status===`Present`?`success`:e.attendance_status===`Absent`?`danger`:`warning`}`,children:e.attendance_status})}),(0,d.jsx)(`td`,{children:e.current_task}),(0,d.jsx)(`td`,{children:e.task_status===`—`?`—`:(0,d.jsx)(`span`,{className:`badge-capsule ${e.task_status===`Completed`?`success`:e.task_status===`Submitted`?`info`:`warning`}`,children:e.task_status})})]},e.id)):(0,d.jsx)(`tr`,{children:(0,d.jsx)(`td`,{colSpan:`7`,style:{textAlign:`center`,color:`#64748b`,padding:`24px`},children:`No matches found.`})})})]})})})]}),(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsx)(`div`,{className:`card-header-action`,children:(0,d.jsxs)(`h3`,{children:[(0,d.jsx)(`i`,{className:`fa-solid fa-bolt`}),` Quick Actions`]})}),(0,d.jsx)(`div`,{className:`card-body-padding`,children:(0,d.jsxs)(`div`,{className:`quick-actions-list`,children:[(0,d.jsxs)(a,{to:`/tasks`,className:`quick-btn`,children:[(0,d.jsx)(`i`,{className:`fa-solid fa-plus-circle`}),`Assign Task`]}),(0,d.jsxs)(a,{to:`/leave-requests`,className:`quick-btn`,children:[(0,d.jsx)(`i`,{className:`fa-solid fa-calendar-check`}),`Approve Leave`]}),(0,d.jsxs)(a,{to:`/projects`,className:`quick-btn`,children:[(0,d.jsx)(`i`,{className:`fa-solid fa-folder-plus`}),`Create Project`]}),(0,d.jsxs)(a,{to:`/attendance-list`,className:`quick-btn`,children:[(0,d.jsx)(`i`,{className:`fa-solid fa-user-clock`}),`Team Attendance`]}),(0,d.jsxs)(a,{to:`/tasks`,className:`quick-btn`,children:[(0,d.jsx)(`i`,{className:`fa-solid fa-chart-line`}),`Reports`]}),(0,d.jsxs)(`button`,{className:`quick-btn`,onClick:()=>M(!0),children:[(0,d.jsx)(`i`,{className:`fa-solid fa-network-wired`}),`Create Team`]}),(0,d.jsxs)(a,{to:`/messages`,className:`quick-btn`,style:{gridColumn:`span 2`},children:[(0,d.jsx)(`i`,{className:`fa-solid fa-bullhorn`}),`Announcements`]})]})})]})]}),(0,d.jsxs)(`div`,{className:`grid-50-50`,children:[(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsx)(`div`,{className:`card-header-action`,children:(0,d.jsxs)(`h3`,{children:[(0,d.jsx)(`i`,{className:`fa-solid fa-list-check`}),` Task Progress`]})}),(0,d.jsxs)(`div`,{className:`card-body-padding`,children:[(0,d.jsxs)(`div`,{className:`progress-widget-row`,children:[(0,d.jsxs)(`div`,{className:`progress-widget-label`,children:[(0,d.jsx)(`span`,{children:`Completed Tasks`}),(0,d.jsxs)(`span`,{children:[G.completed,` / `,K,` (`,Math.round(G.completed/K*100),`%)`]})]}),(0,d.jsx)(`div`,{className:`progress-bar-bg`,children:(0,d.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${G.completed/K*100}%`,background:`var(--success)`}})})]}),(0,d.jsxs)(`div`,{className:`progress-widget-row`,children:[(0,d.jsxs)(`div`,{className:`progress-widget-label`,children:[(0,d.jsx)(`span`,{children:`In Progress`}),(0,d.jsxs)(`span`,{children:[G.inProgress,` / `,K,` (`,Math.round(G.inProgress/K*100),`%)`]})]}),(0,d.jsx)(`div`,{className:`progress-bar-bg`,children:(0,d.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${G.inProgress/K*100}%`,background:`var(--accent-blue)`}})})]}),(0,d.jsxs)(`div`,{className:`progress-widget-row`,children:[(0,d.jsxs)(`div`,{className:`progress-widget-label`,children:[(0,d.jsx)(`span`,{children:`Pending Review`}),(0,d.jsxs)(`span`,{children:[G.pending,` / `,K,` (`,Math.round(G.pending/K*100),`%)`]})]}),(0,d.jsx)(`div`,{className:`progress-bar-bg`,children:(0,d.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${G.pending/K*100}%`,background:`var(--warning)`}})})]}),(0,d.jsxs)(`div`,{className:`progress-widget-row`,children:[(0,d.jsxs)(`div`,{className:`progress-widget-label`,children:[(0,d.jsx)(`span`,{children:`Overdue Tasks`}),(0,d.jsxs)(`span`,{children:[G.overdue,` / `,K,` (`,Math.round(G.overdue/K*100),`%)`]})]}),(0,d.jsx)(`div`,{className:`progress-bar-bg`,children:(0,d.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${G.overdue/K*100}%`,background:`#ef4444`}})})]}),(0,d.jsxs)(`div`,{className:`progress-widget-row`,style:{marginBottom:`0px`},children:[(0,d.jsxs)(`div`,{className:`progress-widget-label`,children:[(0,d.jsx)(`span`,{children:`Blocked Tasks`}),(0,d.jsxs)(`span`,{children:[G.blocked,` / `,K,` (`,Math.round(G.blocked/K*100),`%)`]})]}),(0,d.jsx)(`div`,{className:`progress-bar-bg`,children:(0,d.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${G.blocked/K*100}%`,background:`#64748b`}})})]})]})]}),(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsx)(`div`,{className:`card-header-action`,children:(0,d.jsxs)(`h3`,{children:[(0,d.jsx)(`i`,{className:`fa-solid fa-folder-tree`}),` Project Overview`]})}),(0,d.jsx)(`div`,{className:`card-body-padding`,style:{padding:`0px`},children:(0,d.jsx)(`div`,{className:`table-wrap`,children:(0,d.jsxs)(`table`,{className:`dense-table`,style:{margin:`0px`},children:[(0,d.jsx)(`thead`,{children:(0,d.jsxs)(`tr`,{style:{background:`#f8fafc`},children:[(0,d.jsx)(`th`,{children:`Project Name`}),(0,d.jsx)(`th`,{children:`Progress`}),(0,d.jsx)(`th`,{children:`Deadline`}),(0,d.jsx)(`th`,{children:`Risk Level`})]})}),(0,d.jsx)(`tbody`,{children:p?.projects&&p.projects.length>0?p.projects.map(e=>(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`td`,{style:{fontWeight:600},children:e.project_name}),(0,d.jsx)(`td`,{children:(0,d.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,d.jsx)(`div`,{className:`progress-bar-bg`,style:{width:`60px`,height:`6px`},children:(0,d.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${e.progress||0}%`,background:`#4f46e5`}})}),(0,d.jsxs)(`span`,{style:{fontSize:`0.78rem`,fontWeight:700},children:[e.progress||0,`%`]})]})}),(0,d.jsx)(`td`,{children:e.deadline||`—`}),(0,d.jsx)(`td`,{children:(0,d.jsx)(`span`,{className:`badge-capsule ${e.risk_level===`High`?`danger`:e.risk_level===`Medium`?`warning`:`success`}`,children:e.risk_level||`Low Risk`})})]},e.id)):(0,d.jsx)(`tr`,{children:(0,d.jsx)(`td`,{colSpan:`4`,style:{textAlign:`center`,color:`#64748b`,padding:`24px`},children:`No active projects.`})})})]})})})]})]}),(0,d.jsxs)(`div`,{className:`grid-50-50`,children:[(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsx)(`div`,{className:`card-header-action`,children:(0,d.jsxs)(`h3`,{children:[(0,d.jsx)(`i`,{className:`fa-solid fa-envelope-open-text`}),` Pending Leave Requests`]})}),(0,d.jsx)(`div`,{className:`card-body-padding`,style:{padding:`0px`},children:(0,d.jsx)(`div`,{className:`table-wrap`,children:(0,d.jsxs)(`table`,{className:`dense-table`,style:{margin:`0px`},children:[(0,d.jsx)(`thead`,{children:(0,d.jsxs)(`tr`,{style:{background:`#f8fafc`},children:[(0,d.jsx)(`th`,{children:`Employee`}),(0,d.jsx)(`th`,{children:`Leave Type`}),(0,d.jsx)(`th`,{children:`Dates`}),(0,d.jsx)(`th`,{children:`Actions`})]})}),(0,d.jsx)(`tbody`,{children:$.length>0?$.map(e=>(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`td`,{style:{fontWeight:600},children:e.user_full_name}),(0,d.jsxs)(`td`,{children:[e.leave_type,` Leave`]}),(0,d.jsxs)(`td`,{children:[e.from_date,` to `,e.to_date]}),(0,d.jsx)(`td`,{children:(0,d.jsxs)(`div`,{style:{display:`flex`,gap:`4px`},children:[(0,d.jsx)(`button`,{className:`download-btn`,onClick:()=>P(e.id,`approve`),style:{padding:`4px 8px`,fontSize:`0.74rem`},children:`Approve`}),(0,d.jsx)(`button`,{className:`view-btn`,onClick:()=>P(e.id,`reject`),style:{padding:`4px 8px`,fontSize:`0.74rem`,color:`#ef4444`,background:`rgba(239,68,68,0.1)`},children:`Reject`})]})})]},e.id)):(0,d.jsx)(`tr`,{children:(0,d.jsx)(`td`,{colSpan:`4`,style:{textAlign:`center`,color:`#64748b`,padding:`24px`},children:`No pending leave approvals.`})})})]})})})]}),(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsx)(`div`,{className:`card-header-action`,children:(0,d.jsxs)(`h3`,{children:[(0,d.jsx)(`i`,{className:`fa-solid fa-list-ul`}),` Recent Team Activities`]})}),(0,d.jsx)(`div`,{className:`card-body-padding`,children:(0,d.jsx)(`div`,{className:`activity-feed`,children:p?.team_activities&&p.team_activities.length>0?p.team_activities.map((e,t)=>(0,d.jsxs)(`div`,{className:`activity-item`,children:[(0,d.jsx)(`div`,{className:`activity-icon`,style:{background:e.color||`var(--success)`},children:(0,d.jsx)(`i`,{className:e.icon||`fa-solid fa-file-invoice`})}),(0,d.jsxs)(`div`,{className:`activity-details`,children:[(0,d.jsx)(`div`,{className:`activity-text`,children:e.details}),(0,d.jsx)(`div`,{className:`activity-time`,children:e.time_display})]})]},t)):(0,d.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No recent activities logged.`})})})]})]}),(0,d.jsx)(`div`,{className:`grid-100`,style:{marginTop:`24px`,marginBottom:`24px`},children:(0,d.jsx)(l,{onLeaveList:p?.on_leave_today||[]})}),(0,d.jsxs)(`div`,{className:`grid-50-50`,children:[(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsx)(`div`,{className:`card-header-action`,children:(0,d.jsxs)(`h3`,{children:[(0,d.jsx)(`i`,{className:`fa-solid fa-chart-line`}),` Developer Performance`]})}),(0,d.jsx)(`div`,{className:`card-body-padding`,style:{padding:`0px`},children:(0,d.jsx)(`div`,{className:`table-wrap`,children:(0,d.jsxs)(`table`,{className:`dense-table`,style:{margin:`0px`},children:[(0,d.jsx)(`thead`,{children:(0,d.jsxs)(`tr`,{style:{background:`#f8fafc`},children:[(0,d.jsx)(`th`,{children:`Employee`}),(0,d.jsx)(`th`,{children:`Tasks Completed`}),(0,d.jsx)(`th`,{children:`Attendance %`}),(0,d.jsx)(`th`,{children:`Productivity`})]})}),(0,d.jsx)(`tbody`,{children:F.slice(0,5).map(e=>{let t=e.attendance_pct??0,n=e.productivity_pct??0;return(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`td`,{style:{fontWeight:600},children:e.name}),(0,d.jsxs)(`td`,{children:[e.tasks_completed||0,` Tasks`]}),(0,d.jsxs)(`td`,{children:[t,`%`]}),(0,d.jsx)(`td`,{children:(0,d.jsxs)(`span`,{className:`badge-capsule success`,style:{background:n>=75?`rgba(16,185,129,0.1)`:`rgba(59,130,246,0.1)`,color:n>=75?`#10b981`:`#3b82f6`},children:[n,`%`]})})]},e.id)})})]})})})]}),(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsx)(`div`,{className:`card-header-action`,children:(0,d.jsxs)(`h3`,{children:[(0,d.jsx)(`i`,{className:`fa-solid fa-calendar-times`}),` Upcoming Deadlines`]})}),(0,d.jsx)(`div`,{className:`card-body-padding`,style:{padding:`0px`},children:(0,d.jsx)(`div`,{className:`table-wrap`,children:(0,d.jsxs)(`table`,{className:`dense-table`,style:{margin:`0px`},children:[(0,d.jsx)(`thead`,{children:(0,d.jsxs)(`tr`,{style:{background:`#f8fafc`},children:[(0,d.jsx)(`th`,{children:`Task / Project`}),(0,d.jsx)(`th`,{children:`Due Date`}),(0,d.jsx)(`th`,{children:`Priority`})]})}),(0,d.jsx)(`tbody`,{children:p?.upcoming_tasks&&p.upcoming_tasks.length>0?p.upcoming_tasks.slice(0,4).map(e=>(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`td`,{style:{fontWeight:600},children:e.task_name}),(0,d.jsx)(`td`,{children:e.end_date}),(0,d.jsx)(`td`,{children:(0,d.jsx)(`span`,{className:`badge-capsule danger`,style:{background:`rgba(239,68,68,0.1)`,color:`#ef4444`},children:`High`})})]},e.id)):(0,d.jsx)(`tr`,{children:(0,d.jsx)(`td`,{colSpan:`3`,style:{textAlign:`center`,color:`#64748b`,padding:`24px`},children:`No upcoming deadlines.`})})})]})})})]})]}),(0,d.jsxs)(`div`,{className:`charts-section-grid`,children:[(()=>{let e=p?.attendance_trend||[0,0,0,0,0,0,0],t=p?.day_labels||[``,``,``,``,``,``,``];Math.max(...e,1);let n=e.map((e,t)=>`${8+t/6*204},${72-e/100*64}`).join(` `),r=`8,72 ${n} 212,72`;return(0,d.jsxs)(`div`,{className:`premium-card`,style:{overflow:`hidden`},children:[(0,d.jsxs)(`div`,{className:`card-header-action`,children:[(0,d.jsxs)(`h3`,{style:{fontSize:`0.85rem`},children:[(0,d.jsx)(`i`,{className:`fa-solid fa-chart-area`}),` Attendance Trend`]}),(0,d.jsxs)(`span`,{style:{fontSize:`0.72rem`,fontWeight:700,color:`#3b82f6`,background:`rgba(59,130,246,0.08)`,padding:`2px 8px`,borderRadius:`999px`},children:[q,`%`]})]}),(0,d.jsxs)(`div`,{style:{padding:`4px 12px 0`},children:[(0,d.jsxs)(`svg`,{width:`100%`,height:`80`,viewBox:`0 0 220 80`,style:{overflow:`visible`},children:[(0,d.jsx)(`defs`,{children:(0,d.jsxs)(`linearGradient`,{id:`attGrad`,x1:`0`,y1:`0`,x2:`0`,y2:`1`,children:[(0,d.jsx)(`stop`,{offset:`0%`,stopColor:`#3b82f6`,stopOpacity:`0.18`}),(0,d.jsx)(`stop`,{offset:`100%`,stopColor:`#3b82f6`,stopOpacity:`0`})]})}),[25,50,75,100].map(e=>{let t=72-e/100*64;return(0,d.jsx)(`line`,{x1:8,y1:t,x2:212,y2:t,stroke:`#e2e8f0`,strokeWidth:`0.5`,strokeDasharray:`3,3`},e)}),(0,d.jsx)(`polygon`,{points:r,fill:`url(#attGrad)`}),(0,d.jsx)(`polyline`,{points:n,fill:`none`,stroke:`#3b82f6`,strokeWidth:`2.5`,strokeLinejoin:`round`,strokeLinecap:`round`}),e.map((e,t)=>(0,d.jsx)(`circle`,{cx:8+t/6*204,cy:72-e/100*64,r:`3`,fill:`#fff`,stroke:`#3b82f6`,strokeWidth:`2`},t))]}),(0,d.jsx)(`div`,{style:{display:`flex`,justifyContent:`space-between`,marginTop:`2px`,padding:`0 4px 8px`},children:t.map((e,t)=>(0,d.jsx)(`span`,{style:{fontSize:`0.6rem`,color:`#94a3b8`,fontWeight:600},children:e},t))})]})]})})(),(()=>{let e=p?.productivity_trend||[0,0,0,0,0,0,0],t=p?.day_labels||[``,``,``,``,``,``,``];return Math.max(...e,1),(0,d.jsxs)(`div`,{className:`premium-card`,style:{overflow:`hidden`},children:[(0,d.jsxs)(`div`,{className:`card-header-action`,children:[(0,d.jsxs)(`h3`,{style:{fontSize:`0.85rem`},children:[(0,d.jsx)(`i`,{className:`fa-solid fa-chart-bar`}),` Weekly Productivity`]}),(0,d.jsxs)(`span`,{style:{fontSize:`0.72rem`,fontWeight:700,color:`#10b981`,background:`rgba(16,185,129,0.08)`,padding:`2px 8px`,borderRadius:`999px`},children:[J,`%`]})]}),(0,d.jsxs)(`div`,{style:{padding:`4px 12px 0`},children:[(0,d.jsxs)(`svg`,{width:`100%`,height:`72`,viewBox:`0 0 220 72`,children:[(0,d.jsxs)(`defs`,{children:[(0,d.jsxs)(`linearGradient`,{id:`barGrad`,x1:`0`,y1:`0`,x2:`0`,y2:`1`,children:[(0,d.jsx)(`stop`,{offset:`0%`,stopColor:`#3b82f6`}),(0,d.jsx)(`stop`,{offset:`100%`,stopColor:`#60a5fa`})]}),(0,d.jsxs)(`linearGradient`,{id:`barGradGreen`,x1:`0`,y1:`0`,x2:`0`,y2:`1`,children:[(0,d.jsx)(`stop`,{offset:`0%`,stopColor:`#10b981`}),(0,d.jsx)(`stop`,{offset:`100%`,stopColor:`#34d399`})]})]}),(0,d.jsx)(`line`,{x1:6,y1:66,x2:214,y2:66,stroke:`#e2e8f0`,strokeWidth:`1`}),e.map((t,n)=>{let r=Math.max(t/100*60,2),i=6+n*31,a=66-r,o=n===e.length-1;return(0,d.jsxs)(`g`,{children:[(0,d.jsx)(`rect`,{x:i,y:6,width:22,height:60,rx:`4`,fill:`#f1f5f9`}),(0,d.jsx)(`rect`,{x:i,y:a,width:22,height:r,rx:`4`,fill:o?`url(#barGradGreen)`:`url(#barGrad)`,opacity:t===0?.3:1}),t>0&&(0,d.jsxs)(`text`,{x:i+22/2,y:a-3,textAnchor:`middle`,fontSize:`6`,fontWeight:`700`,fill:o?`#10b981`:`#3b82f6`,children:[t,`%`]})]},n)})]}),(0,d.jsx)(`div`,{style:{display:`flex`,justifyContent:`space-between`,marginTop:`2px`,padding:`0 4px 8px`},children:t.map((e,t)=>(0,d.jsx)(`span`,{style:{fontSize:`0.6rem`,color:`#94a3b8`,fontWeight:600,width:`22px`,textAlign:`center`},children:e},t))})]})]})})(),(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsx)(`div`,{className:`card-header-action`,children:(0,d.jsxs)(`h3`,{style:{fontSize:`0.85rem`},children:[(0,d.jsx)(`i`,{className:`fa-solid fa-chart-pie`}),` Task Completion`]})}),(0,d.jsxs)(`div`,{className:`card-body-padding`,style:{display:`flex`,alignItems:`center`,justifyContent:`space-around`},children:[(0,d.jsxs)(`div`,{style:{position:`relative`,width:72,height:72},children:[(0,d.jsxs)(`svg`,{width:`72`,height:`72`,viewBox:`0 0 36 36`,children:[(0,d.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.91`,fill:`none`,stroke:`#e2e8f0`,strokeWidth:`3.5`}),(0,d.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.91`,fill:`none`,stroke:Y>0?`#10b981`:`#e2e8f0`,strokeWidth:`3.5`,strokeDasharray:`${Y} ${100-Y}`,strokeDashoffset:`25`,style:{transition:`stroke-dasharray 0.6s ease`}})]}),(0,d.jsxs)(`div`,{style:{position:`absolute`,inset:0,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`0.72rem`,fontWeight:800,color:Y>0?`#10b981`:`#94a3b8`},children:[Y,`%`]})]}),(0,d.jsxs)(`div`,{style:{textAlign:`left`},children:[(0,d.jsx)(`div`,{style:{fontSize:`1.3rem`,fontWeight:800,color:Y>0?`#0f172a`:`#94a3b8`},children:G.completed}),(0,d.jsx)(`div`,{style:{fontSize:`0.68rem`,color:`#64748b`,fontWeight:700},children:`Completed`}),(0,d.jsxs)(`div`,{style:{fontSize:`0.68rem`,color:`#f59e0b`,fontWeight:700,marginTop:3},children:[G.inProgress,` In Progress`]}),(0,d.jsxs)(`div`,{style:{fontSize:`0.68rem`,color:`#ef4444`,fontWeight:700},children:[G.overdue,` Overdue`]})]})]})]}),(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsx)(`div`,{className:`card-header-action`,children:(0,d.jsxs)(`h3`,{style:{fontSize:`0.85rem`},children:[(0,d.jsx)(`i`,{className:`fa-solid fa-calendar-minus`}),` Leave Statistics`]})}),(0,d.jsxs)(`div`,{className:`card-body-padding`,style:{display:`flex`,alignItems:`center`,justifyContent:`space-around`},children:[Z===0&&Q===0?(0,d.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:4},children:[(0,d.jsxs)(`svg`,{width:`72`,height:`72`,viewBox:`0 0 36 36`,children:[(0,d.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.91`,fill:`none`,stroke:`#e2e8f0`,strokeWidth:`4`}),(0,d.jsx)(`text`,{x:`18`,y:`22`,textAnchor:`middle`,fontSize:`9`,fill:`#94a3b8`,fontWeight:`700`,children:`0`})]}),(0,d.jsx)(`span`,{style:{fontSize:`0.68rem`,color:`#94a3b8`,fontWeight:600},children:`No leaves`})]}):(0,d.jsxs)(`svg`,{width:`72`,height:`72`,viewBox:`0 0 36 36`,children:[(0,d.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.91`,fill:`none`,stroke:`#e2e8f0`,strokeWidth:`4`}),(0,d.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.91`,fill:`none`,stroke:`#10b981`,strokeWidth:`4`,strokeDasharray:`${Math.min(Z*10,100)} ${Math.max(100-Z*10,0)}`,strokeDashoffset:`25`}),(0,d.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.91`,fill:`none`,stroke:`#f59e0b`,strokeWidth:`4`,strokeDasharray:`${Math.min(Q*10,100)} ${Math.max(100-Q*10,0)}`,strokeDashoffset:`${25-Z*10}`})]}),(0,d.jsxs)(`div`,{style:{textAlign:`left`,fontSize:`0.74rem`,fontWeight:600,color:`#475569`,display:`flex`,flexDirection:`column`,gap:6},children:[(0,d.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6},children:[(0,d.jsx)(`span`,{style:{width:10,height:10,borderRadius:`50%`,background:`#10b981`,display:`inline-block`}}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`b`,{children:Z}),` Paid`]})]}),(0,d.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6},children:[(0,d.jsx)(`span`,{style:{width:10,height:10,borderRadius:`50%`,background:`#f59e0b`,display:`inline-block`}}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`b`,{children:Q}),` Unpaid`]})]}),(0,d.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6},children:[(0,d.jsx)(`span`,{style:{width:10,height:10,borderRadius:`50%`,background:`#ef4444`,display:`inline-block`}}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`b`,{children:L}),` On Leave Today`]})]})]})]})]}),(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsx)(`div`,{className:`card-header-action`,children:(0,d.jsxs)(`h3`,{style:{fontSize:`0.85rem`},children:[(0,d.jsx)(`i`,{className:`fa-solid fa-tasks`}),` Project Progress`]})}),(0,d.jsx)(`div`,{className:`card-body-padding`,style:{display:`flex`,flexDirection:`column`,gap:`10px`},children:p?.projects&&p.projects.length>0?p.projects.slice(0,3).map((e,t)=>{let n=[`#3b82f6`,`#10b981`,`#f59e0b`],r=e.progress||0;return(0,d.jsxs)(`div`,{children:[(0,d.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,fontSize:`0.72rem`,fontWeight:700,marginBottom:5},children:[(0,d.jsx)(`span`,{style:{color:`#334155`,maxWidth:`70%`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:e.project_name}),(0,d.jsxs)(`span`,{style:{color:n[t%n.length]},children:[r,`%`]})]}),(0,d.jsx)(`div`,{style:{background:`#f1f5f9`,borderRadius:999,height:7,overflow:`hidden`},children:(0,d.jsx)(`div`,{style:{width:`${r}%`,height:`100%`,background:`linear-gradient(90deg, ${n[t%n.length]}, ${n[t%n.length]}cc)`,borderRadius:999,transition:`width 0.6s ease`,minWidth:r>0?`8px`:`0`}})})]},e.id)}):(0,d.jsxs)(`div`,{style:{color:`#94a3b8`,fontSize:`0.8rem`,textAlign:`center`,padding:`16px 0`},children:[(0,d.jsx)(`i`,{className:`fa-solid fa-folder-open`,style:{fontSize:`1.5rem`,marginBottom:6}}),(0,d.jsx)(`br`,{}),`No projects in scope.`]})})]})]}),(0,d.jsxs)(`div`,{className:`bottom-dashboard-grid`,style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,gap:`20px`},children:[(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsxs)(`div`,{className:`card-header-action`,children:[(0,d.jsxs)(`h3`,{children:[(0,d.jsx)(`i`,{className:`fa-solid fa-comments`}),` Recent Messages`]}),(0,d.jsx)(a,{to:`/messages`,className:`card-link`,style:{fontSize:`0.8rem`,fontWeight:700,color:`#4f46e5`},children:`Chat`})]}),(0,d.jsx)(`div`,{className:`card-body-padding`,style:{padding:`10px 20px`},children:(0,d.jsx)(`div`,{className:`bottom-list-container`,children:p?.recent_messages&&p.recent_messages.length>0?p.recent_messages.map((e,t)=>(0,d.jsxs)(`div`,{className:`bottom-list-item`,style:{borderBottom:t===p.recent_messages.length-1?`none`:`1px solid #f1f5f9`,padding:`10px 0`},children:[(0,d.jsx)(`div`,{className:`bottom-list-item-avatar`,style:{background:`#3b82f6`},children:e.sender_name.substring(0,2).toUpperCase()}),(0,d.jsxs)(`div`,{className:`bottom-list-item-content`,children:[(0,d.jsx)(`h5`,{className:`bottom-list-item-title`,children:e.sender_name}),(0,d.jsx)(`p`,{className:`bottom-list-item-sub`,children:e.text})]})]},t)):(0,d.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No recent messages`})})})]}),(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsx)(`div`,{className:`card-header-action`,children:(0,d.jsxs)(`h3`,{children:[(0,d.jsx)(`i`,{className:`fa-solid fa-bell`}),` Notifications`]})}),(0,d.jsx)(`div`,{className:`card-body-padding`,style:{padding:`10px 20px`},children:(0,d.jsx)(`div`,{className:`bottom-list-container`,children:p?.notifications&&p.notifications.length>0?p.notifications.map((e,t)=>(0,d.jsxs)(`div`,{className:`bottom-list-item`,style:{borderBottom:t===p.notifications.length-1?`none`:`1px solid #f1f5f9`,padding:`10px 0`},children:[(0,d.jsx)(`div`,{className:`bottom-list-item-avatar`,style:{background:`#f59e0b`,fontSize:`10px`},children:(0,d.jsx)(`i`,{className:`fa-solid fa-bell`})}),(0,d.jsxs)(`div`,{className:`bottom-list-item-content`,children:[(0,d.jsx)(`h5`,{className:`bottom-list-item-title`,children:e.title}),(0,d.jsx)(`p`,{className:`bottom-list-item-sub`,children:e.message})]})]},t)):(0,d.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No new notifications`})})})]}),(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsxs)(`div`,{className:`card-header-action`,children:[(0,d.jsxs)(`h3`,{children:[(0,d.jsx)(`i`,{className:`fa-solid fa-umbrella-beach`}),` Upcoming Holidays`]}),(0,d.jsx)(a,{to:`/holidays`,className:`card-link`,style:{fontSize:`0.8rem`,fontWeight:700,color:`#4f46e5`},children:`Calendar`})]}),(0,d.jsx)(`div`,{className:`card-body-padding`,style:{padding:`10px 20px`},children:(0,d.jsx)(`div`,{className:`bottom-list-container`,children:y&&y.length>0?y.slice(0,2).map((e,t)=>(0,d.jsxs)(`div`,{className:`bottom-list-item`,style:{borderBottom:t===0?`1px solid #f1f5f9`:`none`,padding:`10px 0`},children:[(0,d.jsx)(`div`,{className:`bottom-list-item-avatar`,style:{background:`#10b981`,fontSize:`10px`},children:(0,d.jsx)(`i`,{className:`fa-solid fa-umbrella-beach`})}),(0,d.jsxs)(`div`,{className:`bottom-list-item-content`,children:[(0,d.jsx)(`h5`,{className:`bottom-list-item-title`,children:e.name}),(0,d.jsx)(`p`,{className:`bottom-list-item-sub`,children:e.date})]})]},e.id)):(0,d.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No upcoming holidays`})})})]}),(0,d.jsxs)(`div`,{className:`premium-card`,children:[(0,d.jsx)(`div`,{className:`card-header-action`,children:(0,d.jsxs)(`h3`,{children:[(0,d.jsx)(`i`,{className:`fa-solid fa-bullhorn`}),` Announcements`]})}),(0,d.jsx)(`div`,{className:`card-body-padding`,style:{padding:`10px 20px`},children:(0,d.jsx)(`div`,{className:`bottom-list-container`,children:p?.announcements&&p.announcements.length>0?p.announcements.map((e,t)=>(0,d.jsx)(`div`,{className:`bottom-list-item`,style:{borderBottom:t===p.announcements.length-1?`none`:`1px solid #f1f5f9`,padding:`10px 0`},children:(0,d.jsxs)(`div`,{className:`bottom-list-content`,children:[(0,d.jsx)(`h5`,{className:`bottom-list-item-title`,style:{fontSize:`0.8rem`,color:`#4f46e5`},children:e.title}),(0,d.jsx)(`p`,{className:`bottom-list-item-sub`,style:{fontSize:`0.7rem`},children:e.message})]})},t)):(0,d.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No announcements`})})})]})]}),k&&(0,d.jsx)(`div`,{className:`modal-overlay`,onClick:()=>A(!1),children:(0,d.jsxs)(`div`,{className:`modal-container`,onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(`div`,{className:`modal-header`,children:[(0,d.jsxs)(`h3`,{children:[`Assigned Developers (`,F.length,`)`]}),(0,d.jsx)(`button`,{className:`modal-close-btn`,onClick:()=>A(!1),children:`×`})]}),(0,d.jsx)(`div`,{className:`modal-body`,children:F.length>0?F.map(e=>(0,d.jsxs)(`div`,{className:`dev-list-item`,children:[(0,d.jsxs)(`div`,{className:`dev-info`,children:[(0,d.jsx)(`div`,{className:`dev-avatar`,children:e.name?e.name.substring(0,2).toUpperCase():`DV`}),(0,d.jsxs)(`div`,{className:`dev-name-id`,children:[(0,d.jsx)(`div`,{className:`dev-name`,children:e.name}),(0,d.jsxs)(`div`,{className:`dev-id`,children:[`ID: `,e.emp_id]})]})]}),(0,d.jsx)(`span`,{className:`badge-capsule ${e.attendance_status===`Present`?`success`:e.attendance_status===`Absent`?`danger`:`warning`}`,children:e.attendance_status})]},e.id)):(0,d.jsx)(`div`,{style:{color:`#64748b`,textAlign:`center`,padding:`20px 0`},children:`No developers assigned in this team.`})})]})}),j&&(0,d.jsx)(`div`,{className:`modal-overlay`,onClick:()=>M(!1),children:(0,d.jsxs)(`div`,{className:`modal-container`,onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(`div`,{className:`modal-header`,children:[(0,d.jsx)(`h3`,{children:`Create New Team`}),(0,d.jsx)(`button`,{className:`modal-close-btn`,onClick:()=>M(!1),children:`×`})]}),(0,d.jsx)(`div`,{className:`modal-body`,style:{textAlign:`left`},children:(0,d.jsxs)(`form`,{onSubmit:async e=>{e.preventDefault();let n=new FormData(e.target),r=Object.fromEntries(n);try{await t.post(`/api/teams/`,r),s(`Team created successfully!`,`success`),M(!1)}catch(e){s(e.response?.data?.detail||`Failed to create team.`,`error`)}},children:[(0,d.jsxs)(`div`,{className:`form-group`,style:{marginBottom:`16px`},children:[(0,d.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`#475569`,marginBottom:`6px`,display:`block`},children:`Team Name`}),(0,d.jsx)(`input`,{name:`name`,required:!0,style:{width:`100%`,padding:`10px 14px`,borderRadius:`8px`,border:`1px solid #cbd5e1`}})]}),(0,d.jsxs)(`div`,{className:`form-group`,style:{marginBottom:`16px`},children:[(0,d.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`#475569`,marginBottom:`6px`,display:`block`},children:`Department`}),(0,d.jsx)(`input`,{name:`department`,defaultValue:`python_dev`,style:{width:`100%`,padding:`10px 14px`,borderRadius:`8px`,border:`1px solid #cbd5e1`}})]}),(0,d.jsx)(`button`,{type:`submit`,className:`download-btn`,style:{width:`100%`,padding:`12px`,fontSize:`0.95rem`,borderRadius:`8px`,background:`#10b981`,color:`white`,border:`none`,fontWeight:`bold`},children:`Create Team`})]})})]})})]}),` `]})};export{f as default};