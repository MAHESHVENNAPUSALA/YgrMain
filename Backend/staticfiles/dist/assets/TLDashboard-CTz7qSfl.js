import{c as e,d as t,f as n,i as r,n as i,r as a,s as o,t as s,u as c}from"./index-ONXcB8P3.js";var l=n(t(),1),u=r(),d=()=>{let{user:t}=a(),n=c(),{showToast:r}=i(),{prompt:d}=s(),[f,p]=(0,l.useState)(null),[m,h]=(0,l.useState)([]),[g,_]=(0,l.useState)([]),[v,y]=(0,l.useState)([]),[b,x]=(0,l.useState)(!0),[S,C]=(0,l.useState)(``),[w,T]=(0,l.useState)(``),[E,D]=(0,l.useState)(``),[O,k]=(0,l.useState)(!1),A=async()=>{try{let[e,t,n,r]=await Promise.all([o.get(`/api/dashboard/teamlead/`),o.get(`/api/leaves/`,{params:{scope:`team-all`}}),o.get(`/api/tasks/`),o.get(`/api/holidays/`)]);p(e.data),h(t.data.leaves||[]),_(n.data||[]),y(r.data||[])}catch(e){console.error(`Error fetching dashboard data:`,e)}finally{x(!1)}};(0,l.useEffect)(()=>{A();let e=setInterval(()=>{C(new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}))},1e3);return()=>clearInterval(e)},[]);let j=async(e,t)=>{let n=``;if(t===`reject`){if(n=await d(`Please enter comments/reason for rejection:`),n===null)return}else if(n=await d(`Enter any comments (optional):`,``),n===null)return;try{await o.post(`/api/leaves/${e}/action/`,{action:t,comments:n}),r(`Leave request successfully updated.`,`success`),A()}catch(e){r(e.response?.data?.detail||`Failed to update leave request.`,`error`)}};if(b)return(0,u.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,minHeight:`400px`,color:`var(--muted)`},children:[(0,u.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:`2rem`,marginRight:`10px`}}),` Loading Premium Workspace...`]});let M=f?.member_status_list||[],N=M.filter(e=>e.attendance_status&&e.attendance_status.includes(`Present`)).length,P=m.filter(e=>{let t=new Date().toISOString().split(`T`)[0];return e.status===`Final Approved`&&e.from_date<=t&&e.to_date>=t}).length,F=m.filter(e=>e.status===`Pending Team Leader Approval`).length,I=g.filter(e=>e.status===`Submitted`).length,L=f?.projects_count||0,R=f?.members_count||0,z=M.filter(e=>{let t=e.name||``,n=e.emp_id||``,r=t.toLowerCase().includes(w.toLowerCase())||n.toLowerCase().includes(w.toLowerCase()),i=E===``||e.attendance_status===E;return r&&i}),B=()=>{let e=`data:text/csv;charset=utf-8,`;e+=`Employee,Employee ID,Check In,Status,Active Task,Task Status\r
`,z.forEach(t=>{e+=`"${t.name}","${t.emp_id}","${t.check_in}","${t.attendance_status}","${t.current_task}","${t.task_status}"\r\n`});let t=encodeURI(e),n=document.createElement(`a`);n.setAttribute(`href`,t),n.setAttribute(`download`,`team_attendance_${new Date().toISOString().split(`T`)[0]}.csv`),document.body.appendChild(n),n.click(),document.body.removeChild(n)},V=()=>{let e=new Date().getHours();return e<12?`Good Morning`:e<17?`Good Afternoon`:`Good Evening`},H={pending:g.filter(e=>e.status===`Pending`).length,inProgress:g.filter(e=>e.status===`In Progress`).length,completed:g.filter(e=>e.status===`Completed`).length,overdue:g.filter(e=>{let t=new Date().toISOString().split(`T`)[0];return e.status!==`Completed`&&e.end_date<t}).length,blocked:g.filter(e=>e.status===`Blocked`).length},U=g.length||1,W=M.length>0?Math.round(M.reduce((e,t)=>e+(t.attendance_pct||100),0)/M.length):94,G=M.length>0?Math.round(M.reduce((e,t)=>e+(t.productivity_pct||100),0)/M.length):85,K=U>0?Math.round(H.completed/U*100):0,q=R>0?Math.round(N/R*100):0,J=m.filter(e=>e.leave_type===`Paid`&&e.status===`Final Approved`).length,Y=m.filter(e=>e.leave_type===`Unpaid`&&e.status===`Final Approved`).length,X=m.filter(e=>e.status===`Pending Team Leader Approval`&&e.user!==t?.id);return(0,u.jsxs)(`div`,{className:`premium-tl-dashboard`,children:[(0,u.jsx)(`style`,{children:`
        /* --- Styles --- */
        .premium-tl-dashboard {
          color: #1e293b;
          font-family: var(--font-sans, 'Inter', sans-serif);
        }
        
        /* Banner Card */
        .tl-welcome-banner {
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
          color: #ffffff;
          border-radius: 16px;
          padding: 24px 32px;
          box-shadow: 0 10px 25px -5px rgba(30, 27, 75, 0.4);
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
        }
        .grid-50-50 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
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
      `}),(0,u.jsxs)(`div`,{className:`tl-welcome-banner`,children:[(0,u.jsxs)(`div`,{className:`banner-left`,children:[(0,u.jsxs)(`div`,{className:`banner-greeting`,children:[V(),`, Team Leader`]}),(0,u.jsxs)(`div`,{className:`banner-name`,children:[t?.first_name||`TL`,` `,t?.last_name||`Workspace`]}),(0,u.jsxs)(`div`,{className:`banner-details-grid`,children:[(0,u.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-id-card`}),` `,(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`strong`,{children:`ID:`}),` `,t?.emp_id||`YGRTL001`]})]}),(0,u.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-sitemap`}),` `,(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`strong`,{children:`Dept:`}),` `,t?.department||`Software Dev`]})]}),(0,u.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-users-viewfinder`}),` `,(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`strong`,{children:`Team:`}),` `,t?.team_name||`Core Dev Team`]})]}),(0,u.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-user-tie`}),` `,(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`strong`,{children:`Manager:`}),` `,t?.reporting_manager_name||`Managing Director`]})]}),(0,u.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-calendar-day`}),` `,(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`strong`,{children:`Date:`}),` `,new Date().toLocaleDateString([],{weekday:`short`,month:`short`,day:`numeric`})]})]}),(0,u.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-clock`}),` `,(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`strong`,{children:`Live:`}),` `,S||`04:26 PM`]})]}),(0,u.jsxs)(`div`,{className:`banner-detail-item`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-business-time`}),` `,(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`strong`,{children:`Shift:`}),` General (09:30 AM - 06:30 PM)`]})]})]})]}),(0,u.jsxs)(`div`,{className:`banner-right`,children:[(0,u.jsxs)(`div`,{className:`banner-metric-card`,children:[(0,u.jsxs)(`div`,{className:`banner-metric-value`,children:[G,`%`]}),(0,u.jsx)(`div`,{className:`banner-metric-label`,children:`Team Performance`})]}),(0,u.jsxs)(`div`,{className:`banner-metric-card`,children:[(0,u.jsxs)(`div`,{className:`banner-metric-value`,children:[W,`%`]}),(0,u.jsx)(`div`,{className:`banner-metric-label`,children:`Attendance Rate`})]}),(0,u.jsxs)(`div`,{className:`banner-metric-card`,style:{gridColumn:`span 2`,borderTop:`1px solid rgba(255,255,255,0.1)`,paddingTop:`10px`},children:[(0,u.jsx)(`div`,{className:`banner-metric-value`,style:{fontSize:`1rem`,color:`#cbd5e1`},children:f?.projects?.[0]?.project_name||`YGR CRM System`}),(0,u.jsx)(`div`,{className:`banner-metric-label`,children:`Active Sprint / Project`})]})]})]}),(0,u.jsxs)(`div`,{className:`tl-kpi-grid`,children:[(0,u.jsxs)(`div`,{className:`kpi-card`,onClick:()=>n(`/tasks`,{state:{activeTab:`board`,projectFilter:`active`}}),children:[(0,u.jsxs)(`div`,{className:`kpi-header`,children:[(0,u.jsx)(`div`,{className:`kpi-icon-wrap`,style:{background:`#4f46e5`},children:(0,u.jsx)(`i`,{className:`fa-solid fa-diagram-project`})}),(0,u.jsx)(`span`,{className:`kpi-trend`,style:{background:`#d1fae5`,color:`#065f46`},children:`+2 New`})]}),(0,u.jsx)(`div`,{className:`kpi-value`,children:L}),(0,u.jsx)(`div`,{className:`kpi-label`,children:`Active Projects`})]}),(0,u.jsxs)(`div`,{className:`kpi-card`,onClick:()=>n(`/attendance-list`),children:[(0,u.jsxs)(`div`,{className:`kpi-header`,children:[(0,u.jsx)(`div`,{className:`kpi-icon-wrap`,style:{background:`#10b981`},children:(0,u.jsx)(`i`,{className:`fa-solid fa-users`})}),(0,u.jsx)(`span`,{className:`kpi-trend`,style:{background:`#fef3c7`,color:`#92400e`},children:`Active`})]}),(0,u.jsx)(`div`,{className:`kpi-value`,children:R}),(0,u.jsx)(`div`,{className:`kpi-label`,children:`Assigned Developers`})]}),(0,u.jsxs)(`div`,{className:`kpi-card`,onClick:()=>n(`/attendance-list`,{state:{statusFilter:`Present`}}),children:[(0,u.jsxs)(`div`,{className:`kpi-header`,children:[(0,u.jsx)(`div`,{className:`kpi-icon-wrap`,style:{background:`#3b82f6`},children:(0,u.jsx)(`i`,{className:`fa-solid fa-user-check`})}),(0,u.jsxs)(`span`,{className:`kpi-trend`,style:{background:`#d1fae5`,color:`#065f46`},children:[q,`% Present`]})]}),(0,u.jsx)(`div`,{className:`kpi-value`,children:N}),(0,u.jsx)(`div`,{className:`kpi-label`,children:`Present Today`})]}),(0,u.jsxs)(`div`,{className:`kpi-card`,onClick:()=>n(`/tl-approved-leaves`,{state:{statusFilter:`Final Approved`}}),children:[(0,u.jsxs)(`div`,{className:`kpi-header`,children:[(0,u.jsx)(`div`,{className:`kpi-icon-wrap`,style:{background:`#ef4444`},children:(0,u.jsx)(`i`,{className:`fa-solid fa-house-laptop`})}),(0,u.jsx)(`span`,{className:`kpi-trend`,style:{background:`#f1f5f9`,color:`#475569`},children:`Today`})]}),(0,u.jsx)(`div`,{className:`kpi-value`,children:P}),(0,u.jsx)(`div`,{className:`kpi-label`,children:`Employees on Leave`})]}),(0,u.jsxs)(`div`,{className:`kpi-card`,onClick:()=>n(`/tasks`,{state:{activeTab:`board`,statusFilter:`Submitted`}}),children:[(0,u.jsxs)(`div`,{className:`kpi-header`,children:[(0,u.jsx)(`div`,{className:`kpi-icon-wrap`,style:{background:`#f59e0b`},children:(0,u.jsx)(`i`,{className:`fa-solid fa-code-pull-request`})}),(0,u.jsx)(`span`,{className:`kpi-trend`,style:{background:`#fee2e2`,color:`#991b1b`},children:`High`})]}),(0,u.jsx)(`div`,{className:`kpi-value`,children:I}),(0,u.jsx)(`div`,{className:`kpi-label`,children:`Pending Task Reviews`})]}),(0,u.jsxs)(`div`,{className:`kpi-card`,onClick:()=>n(`/leave-requests`,{state:{statusFilter:`Pending Team Leader Approval`}}),children:[(0,u.jsxs)(`div`,{className:`kpi-header`,children:[(0,u.jsx)(`div`,{className:`kpi-icon-wrap`,style:{background:`#ec4899`},children:(0,u.jsx)(`i`,{className:`fa-solid fa-envelope-open-text`})}),(0,u.jsx)(`span`,{className:`kpi-trend`,style:{background:`#e0e7ff`,color:`#3730a3`},children:`TL Action`})]}),(0,u.jsx)(`div`,{className:`kpi-value`,children:F}),(0,u.jsx)(`div`,{className:`kpi-label`,children:`Pending Leave Approvals`})]})]}),(0,u.jsxs)(`div`,{className:`grid-70-30`,children:[(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsxs)(`div`,{className:`card-header-action`,children:[(0,u.jsxs)(`h3`,{children:[(0,u.jsx)(`i`,{className:`fa-solid fa-users-line`}),` Today's Team Attendance`]}),(0,u.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,u.jsx)(`input`,{type:`text`,placeholder:`Search Developer...`,value:w,onChange:e=>T(e.target.value),style:{padding:`6px 12px`,border:`1px solid #cbd5e1`,borderRadius:`6px`,fontSize:`0.8rem`}}),(0,u.jsxs)(`select`,{value:E,onChange:e=>D(e.target.value),style:{padding:`6px 12px`,border:`1px solid #cbd5e1`,borderRadius:`6px`,fontSize:`0.8rem`,fontWeight:600},children:[(0,u.jsx)(`option`,{value:``,children:`All Statuses`}),(0,u.jsx)(`option`,{value:`Present`,children:`Present`}),(0,u.jsx)(`option`,{value:`Absent`,children:`Absent`}),(0,u.jsx)(`option`,{value:`On Leave`,children:`Leave`})]}),(0,u.jsxs)(`button`,{className:`download-btn`,onClick:B,style:{padding:`6px 12px`,fontSize:`0.8rem`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,u.jsx)(`i`,{className:`fa-solid fa-file-export`}),` Export`]})]})]}),(0,u.jsx)(`div`,{className:`card-body-padding`,style:{padding:`0px`},children:(0,u.jsx)(`div`,{className:`table-wrap`,children:(0,u.jsxs)(`table`,{className:`dense-table`,style:{margin:`0px`},children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{style:{background:`#f8fafc`},children:[(0,u.jsx)(`th`,{children:`Employee`}),(0,u.jsx)(`th`,{children:`Check In`}),(0,u.jsx)(`th`,{children:`Check Out`}),(0,u.jsx)(`th`,{children:`Working Hours`}),(0,u.jsx)(`th`,{children:`Status`}),(0,u.jsx)(`th`,{children:`Active Task`}),(0,u.jsx)(`th`,{children:`Task Status`})]})}),(0,u.jsx)(`tbody`,{children:z.length>0?z.map(e=>(0,u.jsxs)(`tr`,{children:[(0,u.jsxs)(`td`,{style:{fontWeight:600},children:[e.name,` (`,e.emp_id,`)`]}),(0,u.jsx)(`td`,{children:e.check_in}),(0,u.jsx)(`td`,{children:e.check_out||`—`}),(0,u.jsxs)(`td`,{children:[e.working_hours||`8.0`,` Hrs`]}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`badge-capsule ${e.attendance_status===`Present`?`success`:e.attendance_status===`Absent`?`danger`:`warning`}`,children:e.attendance_status})}),(0,u.jsx)(`td`,{children:e.current_task}),(0,u.jsx)(`td`,{children:e.task_status===`—`?`—`:(0,u.jsx)(`span`,{className:`badge-capsule ${e.task_status===`Completed`?`success`:e.task_status===`Submitted`?`info`:`warning`}`,children:e.task_status})})]},e.id)):(0,u.jsx)(`tr`,{children:(0,u.jsx)(`td`,{colSpan:`7`,style:{textAlign:`center`,color:`#64748b`,padding:`24px`},children:`No matches found.`})})})]})})})]}),(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{children:[(0,u.jsx)(`i`,{className:`fa-solid fa-bolt`}),` Quick Actions`]})}),(0,u.jsx)(`div`,{className:`card-body-padding`,children:(0,u.jsxs)(`div`,{className:`quick-actions-list`,children:[(0,u.jsxs)(e,{to:`/tasks`,className:`quick-btn`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-plus-circle`}),`Assign Task`]}),(0,u.jsxs)(e,{to:`/leaves`,className:`quick-btn`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-calendar-check`}),`Approve Leave`]}),(0,u.jsxs)(e,{to:`/tasks`,className:`quick-btn`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-folder-plus`}),`Create Project`]}),(0,u.jsxs)(e,{to:`/attendance`,className:`quick-btn`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-user-clock`}),`Team Attendance`]}),(0,u.jsxs)(e,{to:`/payroll`,className:`quick-btn`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-chart-line`}),`Reports`]}),(0,u.jsxs)(e,{to:`/messages`,className:`quick-btn`,children:[(0,u.jsx)(`i`,{className:`fa-solid fa-comments`}),`Messages`]}),(0,u.jsxs)(e,{to:`/profile`,className:`quick-btn`,style:{gridColumn:`span 2`},children:[(0,u.jsx)(`i`,{className:`fa-solid fa-bullhorn`}),`Announcements`]})]})})]})]}),(0,u.jsxs)(`div`,{className:`grid-50-50`,children:[(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{children:[(0,u.jsx)(`i`,{className:`fa-solid fa-list-check`}),` Task Progress`]})}),(0,u.jsxs)(`div`,{className:`card-body-padding`,children:[(0,u.jsxs)(`div`,{className:`progress-widget-row`,children:[(0,u.jsxs)(`div`,{className:`progress-widget-label`,children:[(0,u.jsx)(`span`,{children:`Completed Tasks`}),(0,u.jsxs)(`span`,{children:[H.completed,` / `,U,` (`,Math.round(H.completed/U*100),`%)`]})]}),(0,u.jsx)(`div`,{className:`progress-bar-bg`,children:(0,u.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${H.completed/U*100}%`,background:`var(--success)`}})})]}),(0,u.jsxs)(`div`,{className:`progress-widget-row`,children:[(0,u.jsxs)(`div`,{className:`progress-widget-label`,children:[(0,u.jsx)(`span`,{children:`In Progress`}),(0,u.jsxs)(`span`,{children:[H.inProgress,` / `,U,` (`,Math.round(H.inProgress/U*100),`%)`]})]}),(0,u.jsx)(`div`,{className:`progress-bar-bg`,children:(0,u.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${H.inProgress/U*100}%`,background:`var(--accent-blue)`}})})]}),(0,u.jsxs)(`div`,{className:`progress-widget-row`,children:[(0,u.jsxs)(`div`,{className:`progress-widget-label`,children:[(0,u.jsx)(`span`,{children:`Pending Review`}),(0,u.jsxs)(`span`,{children:[H.pending,` / `,U,` (`,Math.round(H.pending/U*100),`%)`]})]}),(0,u.jsx)(`div`,{className:`progress-bar-bg`,children:(0,u.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${H.pending/U*100}%`,background:`var(--warning)`}})})]}),(0,u.jsxs)(`div`,{className:`progress-widget-row`,children:[(0,u.jsxs)(`div`,{className:`progress-widget-label`,children:[(0,u.jsx)(`span`,{children:`Overdue Tasks`}),(0,u.jsxs)(`span`,{children:[H.overdue,` / `,U,` (`,Math.round(H.overdue/U*100),`%)`]})]}),(0,u.jsx)(`div`,{className:`progress-bar-bg`,children:(0,u.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${H.overdue/U*100}%`,background:`#ef4444`}})})]}),(0,u.jsxs)(`div`,{className:`progress-widget-row`,style:{marginBottom:`0px`},children:[(0,u.jsxs)(`div`,{className:`progress-widget-label`,children:[(0,u.jsx)(`span`,{children:`Blocked Tasks`}),(0,u.jsxs)(`span`,{children:[H.blocked,` / `,U,` (`,Math.round(H.blocked/U*100),`%)`]})]}),(0,u.jsx)(`div`,{className:`progress-bar-bg`,children:(0,u.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${H.blocked/U*100}%`,background:`#64748b`}})})]})]})]}),(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{children:[(0,u.jsx)(`i`,{className:`fa-solid fa-folder-tree`}),` Project Overview`]})}),(0,u.jsx)(`div`,{className:`card-body-padding`,style:{padding:`0px`},children:(0,u.jsx)(`div`,{className:`table-wrap`,children:(0,u.jsxs)(`table`,{className:`dense-table`,style:{margin:`0px`},children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{style:{background:`#f8fafc`},children:[(0,u.jsx)(`th`,{children:`Project Name`}),(0,u.jsx)(`th`,{children:`Progress`}),(0,u.jsx)(`th`,{children:`Deadline`}),(0,u.jsx)(`th`,{children:`Risk Level`})]})}),(0,u.jsx)(`tbody`,{children:f?.projects&&f.projects.length>0?f.projects.map(e=>(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{style:{fontWeight:600},children:e.project_name}),(0,u.jsx)(`td`,{children:(0,u.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,u.jsx)(`div`,{className:`progress-bar-bg`,style:{width:`60px`,height:`6px`},children:(0,u.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${e.progress||0}%`,background:`#4f46e5`}})}),(0,u.jsxs)(`span`,{style:{fontSize:`0.78rem`,fontWeight:700},children:[e.progress||0,`%`]})]})}),(0,u.jsx)(`td`,{children:e.deadline||`—`}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`badge-capsule ${e.risk_level===`High`?`danger`:e.risk_level===`Medium`?`warning`:`success`}`,children:e.risk_level||`Low Risk`})})]},e.id)):(0,u.jsx)(`tr`,{children:(0,u.jsx)(`td`,{colSpan:`4`,style:{textAlign:`center`,color:`#64748b`,padding:`24px`},children:`No active projects.`})})})]})})})]})]}),(0,u.jsxs)(`div`,{className:`grid-50-50`,children:[(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{children:[(0,u.jsx)(`i`,{className:`fa-solid fa-envelope-open-text`}),` Pending Leave Requests`]})}),(0,u.jsx)(`div`,{className:`card-body-padding`,style:{padding:`0px`},children:(0,u.jsx)(`div`,{className:`table-wrap`,children:(0,u.jsxs)(`table`,{className:`dense-table`,style:{margin:`0px`},children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{style:{background:`#f8fafc`},children:[(0,u.jsx)(`th`,{children:`Employee`}),(0,u.jsx)(`th`,{children:`Leave Type`}),(0,u.jsx)(`th`,{children:`Dates`}),(0,u.jsx)(`th`,{children:`Actions`})]})}),(0,u.jsx)(`tbody`,{children:X.length>0?X.map(e=>(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{style:{fontWeight:600},children:e.user_full_name}),(0,u.jsxs)(`td`,{children:[e.leave_type,` Leave`]}),(0,u.jsxs)(`td`,{children:[e.from_date,` to `,e.to_date]}),(0,u.jsx)(`td`,{children:(0,u.jsxs)(`div`,{style:{display:`flex`,gap:`4px`},children:[(0,u.jsx)(`button`,{className:`download-btn`,onClick:()=>j(e.id,`approve`),style:{padding:`4px 8px`,fontSize:`0.74rem`},children:`Approve`}),(0,u.jsx)(`button`,{className:`view-btn`,onClick:()=>j(e.id,`reject`),style:{padding:`4px 8px`,fontSize:`0.74rem`,color:`#ef4444`,background:`rgba(239,68,68,0.1)`},children:`Reject`})]})})]},e.id)):(0,u.jsx)(`tr`,{children:(0,u.jsx)(`td`,{colSpan:`4`,style:{textAlign:`center`,color:`#64748b`,padding:`24px`},children:`No pending leave approvals.`})})})]})})})]}),(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{children:[(0,u.jsx)(`i`,{className:`fa-solid fa-list-ul`}),` Recent Team Activities`]})}),(0,u.jsx)(`div`,{className:`card-body-padding`,children:(0,u.jsx)(`div`,{className:`activity-feed`,children:f?.team_activities&&f.team_activities.length>0?f.team_activities.map((e,t)=>(0,u.jsxs)(`div`,{className:`activity-item`,children:[(0,u.jsx)(`div`,{className:`activity-icon`,style:{background:e.color||`var(--success)`},children:(0,u.jsx)(`i`,{className:e.icon||`fa-solid fa-file-invoice`})}),(0,u.jsxs)(`div`,{className:`activity-details`,children:[(0,u.jsx)(`div`,{className:`activity-text`,children:e.details}),(0,u.jsx)(`div`,{className:`activity-time`,children:e.time_display})]})]},t)):(0,u.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No recent activities logged.`})})})]})]}),(0,u.jsxs)(`div`,{className:`grid-50-50`,children:[(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{children:[(0,u.jsx)(`i`,{className:`fa-solid fa-chart-line`}),` Developer Performance`]})}),(0,u.jsx)(`div`,{className:`card-body-padding`,style:{padding:`0px`},children:(0,u.jsx)(`div`,{className:`table-wrap`,children:(0,u.jsxs)(`table`,{className:`dense-table`,style:{margin:`0px`},children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{style:{background:`#f8fafc`},children:[(0,u.jsx)(`th`,{children:`Employee`}),(0,u.jsx)(`th`,{children:`Tasks Completed`}),(0,u.jsx)(`th`,{children:`Attendance %`}),(0,u.jsx)(`th`,{children:`Productivity`})]})}),(0,u.jsx)(`tbody`,{children:M.slice(0,5).map(e=>(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{style:{fontWeight:600},children:e.name}),(0,u.jsxs)(`td`,{children:[e.tasks_completed||0,` Tasks`]}),(0,u.jsxs)(`td`,{children:[e.attendance_pct||100,`%`]}),(0,u.jsx)(`td`,{children:(0,u.jsxs)(`span`,{className:`badge-capsule success`,style:{background:(e.productivity_pct||100)>=75?`rgba(16,185,129,0.1)`:`rgba(59,130,246,0.1)`,color:(e.productivity_pct||100)>=75?`#10b981`:`#3b82f6`},children:[e.productivity_pct||100,`%`]})})]},e.id))})]})})})]}),(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{children:[(0,u.jsx)(`i`,{className:`fa-solid fa-calendar-times`}),` Upcoming Deadlines`]})}),(0,u.jsx)(`div`,{className:`card-body-padding`,style:{padding:`0px`},children:(0,u.jsx)(`div`,{className:`table-wrap`,children:(0,u.jsxs)(`table`,{className:`dense-table`,style:{margin:`0px`},children:[(0,u.jsx)(`thead`,{children:(0,u.jsxs)(`tr`,{style:{background:`#f8fafc`},children:[(0,u.jsx)(`th`,{children:`Task / Project`}),(0,u.jsx)(`th`,{children:`Due Date`}),(0,u.jsx)(`th`,{children:`Priority`})]})}),(0,u.jsx)(`tbody`,{children:f?.upcoming_tasks&&f.upcoming_tasks.length>0?f.upcoming_tasks.slice(0,4).map(e=>(0,u.jsxs)(`tr`,{children:[(0,u.jsx)(`td`,{style:{fontWeight:600},children:e.task_name}),(0,u.jsx)(`td`,{children:e.end_date}),(0,u.jsx)(`td`,{children:(0,u.jsx)(`span`,{className:`badge-capsule danger`,style:{background:`rgba(239,68,68,0.1)`,color:`#ef4444`},children:`High`})})]},e.id)):(0,u.jsx)(`tr`,{children:(0,u.jsx)(`td`,{colSpan:`3`,style:{textAlign:`center`,color:`#64748b`,padding:`24px`},children:`No upcoming deadlines.`})})})]})})})]})]}),(0,u.jsxs)(`div`,{className:`charts-section-grid`,children:[(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{style:{fontSize:`0.88rem`},children:[(0,u.jsx)(`i`,{className:`fa-solid fa-chart-area`}),` Attendance Trend`]})}),(0,u.jsxs)(`div`,{className:`card-body-padding`,style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`},children:[(0,u.jsxs)(`svg`,{width:`100%`,height:`80`,viewBox:`0 0 200 80`,children:[(0,u.jsx)(`path`,{d:`M 0 60 Q 40 40 80 50 T 160 20 T 200 10`,fill:`none`,stroke:`var(--accent-blue)`,strokeWidth:`3`}),(0,u.jsx)(`path`,{d:`M 0 60 Q 40 40 80 50 T 160 20 T 200 10 L 200 80 L 0 80 Z`,fill:`rgba(59,130,246,0.1)`})]}),(0,u.jsxs)(`div`,{style:{fontSize:`0.78rem`,color:`#64748b`,fontWeight:700,marginTop:`8px`},children:[W,`% Avg Attendance Rate`]})]})]}),(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{style:{fontSize:`0.88rem`},children:[(0,u.jsx)(`i`,{className:`fa-solid fa-chart-bar`}),` Weekly Productivity`]})}),(0,u.jsxs)(`div`,{className:`card-body-padding`,style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`},children:[(0,u.jsxs)(`svg`,{width:`100%`,height:`80`,viewBox:`0 0 200 80`,children:[(0,u.jsx)(`rect`,{x:`10`,y:`20`,width:`16`,height:`60`,rx:`4`,fill:`var(--accent-blue)`}),(0,u.jsx)(`rect`,{x:`40`,y:`10`,width:`16`,height:`70`,rx:`4`,fill:`var(--accent-blue)`}),(0,u.jsx)(`rect`,{x:`70`,y:`30`,width:`16`,height:`50`,rx:`4`,fill:`var(--accent-blue)`}),(0,u.jsx)(`rect`,{x:`100`,y:`25`,width:`16`,height:`55`,rx:`4`,fill:`var(--accent-blue)`}),(0,u.jsx)(`rect`,{x:`130`,y:`15`,width:`16`,height:`65`,rx:`4`,fill:`var(--accent-blue)`}),(0,u.jsx)(`rect`,{x:`160`,y:`5`,width:`16`,height:`75`,rx:`4`,fill:`var(--success)`})]}),(0,u.jsxs)(`div`,{style:{fontSize:`0.78rem`,color:`#64748b`,fontWeight:700,marginTop:`8px`},children:[G,`% Avg Productivity`]})]})]}),(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{style:{fontSize:`0.88rem`},children:[(0,u.jsx)(`i`,{className:`fa-solid fa-chart-pie`}),` Task Completion`]})}),(0,u.jsxs)(`div`,{className:`card-body-padding`,style:{display:`flex`,alignItems:`center`,justifyContent:`space-around`},children:[(0,u.jsxs)(`svg`,{width:`80`,height:`80`,viewBox:`0 0 36 36`,children:[(0,u.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.91`,fill:`none`,stroke:`#e2e8f0`,strokeWidth:`3`}),(0,u.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.91`,fill:`none`,stroke:`var(--success)`,strokeWidth:`3`,strokeDasharray:`${K} ${100-K}`,strokeDashoffset:`25`})]}),(0,u.jsxs)(`div`,{style:{textAlign:`left`},children:[(0,u.jsxs)(`div`,{style:{fontSize:`1.25rem`,fontWeight:800},children:[K,`%`]}),(0,u.jsx)(`div`,{style:{fontSize:`0.7rem`,color:`#64748b`,fontWeight:700},children:`Completed Tasks`})]})]})]}),(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{style:{fontSize:`0.88rem`},children:[(0,u.jsx)(`i`,{className:`fa-solid fa-calendar-minus`}),` Leave Statistics`]})}),(0,u.jsxs)(`div`,{className:`card-body-padding`,style:{display:`flex`,alignItems:`center`,justifyContent:`space-around`},children:[J===0&&Y===0?(0,u.jsx)(`svg`,{width:`80`,height:`80`,viewBox:`0 0 36 36`,children:(0,u.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.91`,fill:`none`,stroke:`#e2e8f0`,strokeWidth:`4`})}):(0,u.jsxs)(`svg`,{width:`80`,height:`80`,viewBox:`0 0 36 36`,children:[(0,u.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.91`,fill:`none`,stroke:`#e2e8f0`,strokeWidth:`4`}),(0,u.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.91`,fill:`none`,stroke:`var(--success)`,strokeWidth:`4`,strokeDasharray:`${J*10} ${100-J*10}`,strokeDashoffset:`25`}),(0,u.jsx)(`circle`,{cx:`18`,cy:`18`,r:`15.91`,fill:`none`,stroke:`var(--warning)`,strokeWidth:`4`,strokeDasharray:`${Y*10} ${100-Y*10}`,strokeDashoffset:`${25-J*10}`})]}),(0,u.jsxs)(`div`,{style:{textAlign:`left`,fontSize:`0.74rem`,fontWeight:600,color:`#475569`},children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{style:{color:`var(--success)`},children:`●`}),` `,J,` Paid`]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{style:{color:`var(--warning)`},children:`●`}),` `,Y,` Unpaid`]})]})]})]}),(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{style:{fontSize:`0.88rem`},children:[(0,u.jsx)(`i`,{className:`fa-solid fa-tasks`}),` Project Progress`]})}),(0,u.jsx)(`div`,{className:`card-body-padding`,style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:f?.projects&&f.projects.length>0?f.projects.slice(0,3).map(e=>(0,u.jsxs)(`div`,{style:{marginBottom:`8px`},children:[(0,u.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,fontSize:`0.74rem`,fontWeight:700},children:[(0,u.jsx)(`span`,{children:e.project_name}),(0,u.jsxs)(`span`,{children:[e.progress||0,`%`]})]}),(0,u.jsx)(`div`,{className:`progress-bar-bg`,style:{height:`6px`,marginTop:`4px`},children:(0,u.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${e.progress||0}%`,background:e.project_color||`var(--accent-blue)`}})})]},e.id)):(0,u.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`10px 0`},children:`No projects in scope.`})})]})]}),(0,u.jsxs)(`div`,{className:`bottom-dashboard-grid`,style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,gap:`20px`},children:[(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsxs)(`div`,{className:`card-header-action`,children:[(0,u.jsxs)(`h3`,{children:[(0,u.jsx)(`i`,{className:`fa-solid fa-comments`}),` Recent Messages`]}),(0,u.jsx)(e,{to:`/messages`,className:`card-link`,style:{fontSize:`0.8rem`,fontWeight:700,color:`#4f46e5`},children:`Chat`})]}),(0,u.jsx)(`div`,{className:`card-body-padding`,style:{padding:`10px 20px`},children:(0,u.jsx)(`div`,{className:`bottom-list-container`,children:f?.recent_messages&&f.recent_messages.length>0?f.recent_messages.map((e,t)=>(0,u.jsxs)(`div`,{className:`bottom-list-item`,style:{borderBottom:t===f.recent_messages.length-1?`none`:`1px solid #f1f5f9`,padding:`10px 0`},children:[(0,u.jsx)(`div`,{className:`bottom-list-item-avatar`,style:{background:`#3b82f6`},children:e.sender_name.substring(0,2).toUpperCase()}),(0,u.jsxs)(`div`,{className:`bottom-list-item-content`,children:[(0,u.jsx)(`h5`,{className:`bottom-list-item-title`,children:e.sender_name}),(0,u.jsx)(`p`,{className:`bottom-list-item-sub`,children:e.text})]})]},t)):(0,u.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No recent messages`})})})]}),(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{children:[(0,u.jsx)(`i`,{className:`fa-solid fa-bell`}),` Notifications`]})}),(0,u.jsx)(`div`,{className:`card-body-padding`,style:{padding:`10px 20px`},children:(0,u.jsx)(`div`,{className:`bottom-list-container`,children:f?.notifications&&f.notifications.length>0?f.notifications.map((e,t)=>(0,u.jsxs)(`div`,{className:`bottom-list-item`,style:{borderBottom:t===f.notifications.length-1?`none`:`1px solid #f1f5f9`,padding:`10px 0`},children:[(0,u.jsx)(`div`,{className:`bottom-list-item-avatar`,style:{background:`#f59e0b`,fontSize:`10px`},children:(0,u.jsx)(`i`,{className:`fa-solid fa-bell`})}),(0,u.jsxs)(`div`,{className:`bottom-list-item-content`,children:[(0,u.jsx)(`h5`,{className:`bottom-list-item-title`,children:e.title}),(0,u.jsx)(`p`,{className:`bottom-list-item-sub`,children:e.message})]})]},t)):(0,u.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No new notifications`})})})]}),(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsxs)(`div`,{className:`card-header-action`,children:[(0,u.jsxs)(`h3`,{children:[(0,u.jsx)(`i`,{className:`fa-solid fa-umbrella-beach`}),` Upcoming Holidays`]}),(0,u.jsx)(e,{to:`/holidays`,className:`card-link`,style:{fontSize:`0.8rem`,fontWeight:700,color:`#4f46e5`},children:`Calendar`})]}),(0,u.jsx)(`div`,{className:`card-body-padding`,style:{padding:`10px 20px`},children:(0,u.jsx)(`div`,{className:`bottom-list-container`,children:v&&v.length>0?v.slice(0,2).map((e,t)=>(0,u.jsxs)(`div`,{className:`bottom-list-item`,style:{borderBottom:t===0?`1px solid #f1f5f9`:`none`,padding:`10px 0`},children:[(0,u.jsx)(`div`,{className:`bottom-list-item-avatar`,style:{background:`#10b981`,fontSize:`10px`},children:(0,u.jsx)(`i`,{className:`fa-solid fa-umbrella-beach`})}),(0,u.jsxs)(`div`,{className:`bottom-list-item-content`,children:[(0,u.jsx)(`h5`,{className:`bottom-list-item-title`,children:e.name}),(0,u.jsx)(`p`,{className:`bottom-list-item-sub`,children:e.date})]})]},e.id)):(0,u.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No upcoming holidays`})})})]}),(0,u.jsxs)(`div`,{className:`premium-card`,children:[(0,u.jsx)(`div`,{className:`card-header-action`,children:(0,u.jsxs)(`h3`,{children:[(0,u.jsx)(`i`,{className:`fa-solid fa-bullhorn`}),` Announcements`]})}),(0,u.jsx)(`div`,{className:`card-body-padding`,style:{padding:`10px 20px`},children:(0,u.jsx)(`div`,{className:`bottom-list-container`,children:f?.announcements&&f.announcements.length>0?f.announcements.map((e,t)=>(0,u.jsx)(`div`,{className:`bottom-list-item`,style:{borderBottom:t===f.announcements.length-1?`none`:`1px solid #f1f5f9`,padding:`10px 0`},children:(0,u.jsxs)(`div`,{className:`bottom-list-content`,children:[(0,u.jsx)(`h5`,{className:`bottom-list-item-title`,style:{fontSize:`0.8rem`,color:`#4f46e5`},children:e.title}),(0,u.jsx)(`p`,{className:`bottom-list-item-sub`,style:{fontSize:`0.7rem`},children:e.message})]})},t)):(0,u.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.8rem`,textAlign:`center`,padding:`20px 0`},children:`No announcements`})})})]})]}),O&&(0,u.jsx)(`div`,{className:`modal-overlay`,onClick:()=>k(!1),children:(0,u.jsxs)(`div`,{className:`modal-container`,onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(`div`,{className:`modal-header`,children:[(0,u.jsxs)(`h3`,{children:[`Assigned Developers (`,M.length,`)`]}),(0,u.jsx)(`button`,{className:`modal-close-btn`,onClick:()=>k(!1),children:`×`})]}),(0,u.jsx)(`div`,{className:`modal-body`,children:M.length>0?M.map(e=>(0,u.jsxs)(`div`,{className:`dev-list-item`,children:[(0,u.jsxs)(`div`,{className:`dev-info`,children:[(0,u.jsx)(`div`,{className:`dev-avatar`,children:e.name?e.name.substring(0,2).toUpperCase():`DV`}),(0,u.jsxs)(`div`,{className:`dev-name-id`,children:[(0,u.jsx)(`div`,{className:`dev-name`,children:e.name}),(0,u.jsxs)(`div`,{className:`dev-id`,children:[`ID: `,e.emp_id]})]})]}),(0,u.jsx)(`span`,{className:`badge-capsule ${e.attendance_status===`Present`?`success`:e.attendance_status===`Absent`?`danger`:`warning`}`,children:e.attendance_status})]},e.id)):(0,u.jsx)(`div`,{style:{color:`#64748b`,textAlign:`center`,padding:`20px 0`},children:`No developers assigned in this team.`})})]})})]})};export{d as default};