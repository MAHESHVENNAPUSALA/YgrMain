import{d as e,f as t,i as n,n as r,r as i,s as a,t as o,u as s}from"./index-DvAsNOwO.js";var c=t(e(),1),l=n(),u=()=>{let{user:e}=i(),t=s(),{showToast:n}=r(),{prompt:u}=o(),[f,p]=(0,c.useState)(null),[m,h]=(0,c.useState)(!0),[g,_]=(0,c.useState)(``),[v,y]=(0,c.useState)(null),[b,x]=(0,c.useState)(``),[S,C]=(0,c.useState)(``);(0,c.useEffect)(()=>{(async()=>{try{p((await a.get(`/api/dashboard/md/`)).data)}catch(e){console.error(`Error fetching MD dashboard metrics:`,e)}finally{h(!1)}})();let e=setInterval(()=>{_(new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}))},1e3);return()=>clearInterval(e)},[]);let[w,T]=(0,c.useState)([]),E=async(e,t)=>{let r=await u(`Enter remarks for ${t}ing this attendance correction request:`)||``;if(r!==null)try{await a.post(`/api/attendance/corrections/bulk-action/`,{action:t,correction_ids:[e],md_remarks:r}),n(`Attendance correction has been ${t}ed.`,`success`),p((await a.get(`/api/dashboard/md/`)).data)}catch(e){n(e.response?.data?.detail||`Failed to update correction request.`,`error`)}},D=async e=>{if(w.length===0){n(`Please select at least one correction request.`,`warning`);return}let t=await u(`Enter remarks for ${e}ing the selected correction requests:`)||``;if(t!==null)try{await a.post(`/api/attendance/corrections/bulk-action/`,{action:e,correction_ids:w,md_remarks:t}),n(`Selected corrections have been ${e}ed.`,`success`),T([]),p((await a.get(`/api/dashboard/md/`)).data)}catch(e){n(e.response?.data?.detail||`Failed to update correction requests.`,`error`)}};if(m)return(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,minHeight:`450px`,color:`var(--muted)`},children:[(0,l.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:`2rem`,marginRight:`10px`}}),` Loading Executive Dashboard...`]});let O=f?.total_cmp||0,k=f?.total_project||0;f?.total_mr,f?.total_tl,f?.total_emp;let A=f?.present_count||0,j=f?.on_leave_count||0;f?.late_count;let M={development:f?.dept_counts?.development||0,design:f?.dept_counts?.design||0,hr:f?.dept_counts?.hr||0,marketing:f?.dept_counts?.marketing||0,sales:f?.dept_counts?.sales||0};return(0,l.jsxs)(`div`,{className:`executive-dashboard-container`,children:[(0,l.jsx)(`style`,{children:`
        /* Executive Dashboard Premium Styling CSS System */
        .executive-dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 8px 0;
          font-family: var(--font-base);
        }

        /* Hero Welcome Banner */
        .exec-banner {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: 20px;
          padding: 30px;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.15);
          position: relative;
          overflow: hidden;
          text-align: left;
        }
        .exec-banner::before {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%);
          top: -100px;
          right: -50px;
          z-index: 1;
        }
        .exec-banner-left {
          z-index: 2;
        }
        .exec-greeting {
          font-size: 0.9rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .exec-name {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin: 0 0 6px 0;
          font-family: var(--font-display);
          background: linear-gradient(to right, #ffffff, #cbd5e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .exec-subtitle {
          font-size: 0.95rem;
          color: #94a3b8;
          margin-bottom: 20px;
        }
        .exec-stats-bar {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
        }
        .exec-banner-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .exec-banner-stat-label {
          font-size: 0.72rem;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 700;
        }
        .exec-banner-stat-value {
          font-size: 1.1rem;
          font-weight: 800;
          color: #f8fafc;
        }
        .exec-banner-right {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          min-width: 280px;
          backdrop-filter: blur(10px);
          z-index: 2;
          text-align: left;
        }
        .exec-summary-title {
          font-size: 0.8rem;
          color: #3b82f6;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }
        .exec-summary-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.85rem;
        }
        .exec-summary-item:last-child {
          border-bottom: none;
        }

        /* KPI Cards Grid */
        .exec-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .exec-kpi-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          text-align: left;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .exec-kpi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.03);
          border-color: #cbd5e1;
        }
        .exec-kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .exec-kpi-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #ffffff;
        }
        .exec-kpi-trend {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 20px;
        }
        .exec-kpi-val {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
          line-height: 1.2;
        }
        .exec-kpi-lbl {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 600;
        }

        /* Layout Grid Blocks */
        .exec-panel-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .exec-panel-row {
            grid-template-columns: 1fr;
          }
        }

        .exec-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .exec-card-header {
          padding: 20px 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .exec-card-header h3 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .exec-card-body {
          padding: 24px;
          text-align: left;
        }

        /* Department Stats List */
        .dept-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .dept-bar-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .dept-bar-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 700;
          color: #334155;
        }
        .dept-bar-track {
          height: 8px;
          background: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
        }
        .dept-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.8s ease-out;
        }

        /* SVG Charts Layout */
        .svg-chart-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 15px;
        }

        /* Leave approvals list styling */
        .pending-leave-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .pending-leave-row:last-child {
          border-bottom: none;
        }
        .pending-leave-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pending-leave-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.9rem;
        }
        .pending-leave-dates {
          font-size: 0.76rem;
          color: #64748b;
        }
        .pending-leave-actions {
          display: flex;
          gap: 8px;
        }
        .btn-action-pill {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: background 0.2s;
        }
        .btn-action-pill.approve {
          background: #d1fae5;
          color: #065f46;
        }
        .btn-action-pill.approve:hover {
          background: #a7f3d0;
        }
        .btn-action-pill.reject {
          background: #fee2e2;
          color: #991b1b;
        }
        .btn-action-pill.reject:hover {
          background: #fecaca;
        }

        /* Quick Action Shortcut Panels */
        .quick-actions-panel {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        .quick-action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 18px;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: #ffffff;
          font-size: 0.8rem;
          font-weight: 700;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s;
        }
        .quick-action-btn:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
          border-color: #cbd5e1;
          color: #3b82f6;
        }
        .quick-action-btn i {
          font-size: 1.3rem;
        }

        /* Feed list */
        .feed-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .feed-item {
          display: flex;
          gap: 12px;
          font-size: 0.85rem;
        }
        .feed-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f1f5f9;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
        }
        .feed-desc {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }
        .feed-text {
          color: #1e293b;
          font-weight: 600;
        }
        .feed-time {
          font-size: 0.72rem;
          color: #94a3b8;
        }

      `}),(0,l.jsxs)(`div`,{className:`exec-banner`,children:[(0,l.jsxs)(`div`,{className:`exec-banner-left`,children:[(0,l.jsx)(`div`,{className:`exec-greeting`,children:d()}),(0,l.jsxs)(`h1`,{className:`exec-name`,children:[`MD. `,e?.name||`Managing Director`]}),(0,l.jsx)(`div`,{className:`exec-subtitle`,children:`YGR Global IT Services • Executive Command Center`}),(0,l.jsxs)(`div`,{className:`exec-stats-bar`,children:[(0,l.jsxs)(`div`,{className:`exec-banner-stat`,children:[(0,l.jsx)(`span`,{className:`exec-banner-stat-label`,children:`Headcount`}),(0,l.jsxs)(`span`,{className:`exec-banner-stat-value`,children:[O,` Members`]})]}),(0,l.jsxs)(`div`,{className:`exec-banner-stat`,children:[(0,l.jsx)(`span`,{className:`exec-banner-stat-label`,children:`Live Clock`}),(0,l.jsx)(`span`,{className:`exec-banner-stat-value`,children:g||`09:00:00 AM`})]}),(0,l.jsxs)(`div`,{className:`exec-banner-stat`,children:[(0,l.jsx)(`span`,{className:`exec-banner-stat-label`,children:`Active Projects`}),(0,l.jsxs)(`span`,{className:`exec-banner-stat-value`,children:[k,` Units`]})]}),(0,l.jsxs)(`div`,{className:`exec-banner-stat`,children:[(0,l.jsx)(`span`,{className:`exec-banner-stat-label`,children:`FY Cycle`}),(0,l.jsx)(`span`,{className:`exec-banner-stat-value`,children:`2026 - 2027`})]})]})]}),(0,l.jsxs)(`div`,{className:`exec-banner-right`,children:[(0,l.jsx)(`div`,{className:`exec-summary-title`,children:`Today's Summary`}),(0,l.jsxs)(`div`,{className:`exec-summary-item`,children:[(0,l.jsx)(`span`,{style:{color:`#94a3b8`},children:`Present Today`}),(0,l.jsx)(`span`,{style:{fontWeight:700,color:`#10b981`},children:A})]}),(0,l.jsxs)(`div`,{className:`exec-summary-item`,children:[(0,l.jsx)(`span`,{style:{color:`#94a3b8`},children:`Pending Leave Approvals`}),(0,l.jsx)(`span`,{style:{fontWeight:700,color:`#ef4444`},children:f?.holiday_stats?.pending||0})]}),(0,l.jsxs)(`div`,{className:`exec-summary-item`,children:[(0,l.jsx)(`span`,{style:{color:`#94a3b8`},children:`Corrections Waiting`}),(0,l.jsx)(`span`,{style:{fontWeight:700,color:`#f59e0b`},children:f?.pending_corrections_count||0})]})]})]}),(0,l.jsxs)(`div`,{className:`exec-kpi-grid`,children:[(0,l.jsxs)(`div`,{className:`exec-kpi-card`,onClick:()=>t(`/employees`),children:[(0,l.jsxs)(`div`,{className:`exec-kpi-header`,children:[(0,l.jsx)(`div`,{className:`exec-kpi-icon`,style:{background:`#4f46e5`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-users`})}),(0,l.jsx)(`span`,{className:`exec-kpi-trend`,style:{background:`#e0e7ff`,color:`#4f46e5`},children:`+12% MoM`})]}),(0,l.jsx)(`div`,{className:`exec-kpi-val`,children:O}),(0,l.jsx)(`div`,{className:`exec-kpi-lbl`,children:`Total Headcount`})]}),(0,l.jsxs)(`div`,{className:`exec-kpi-card`,onClick:()=>t(`/attendance-list`,{state:{statusFilter:`Present`}}),children:[(0,l.jsxs)(`div`,{className:`exec-kpi-header`,children:[(0,l.jsx)(`div`,{className:`exec-kpi-icon`,style:{background:`#10b981`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-user-check`})}),(0,l.jsx)(`span`,{className:`exec-kpi-trend`,style:{background:`#d1fae5`,color:`#065f46`},children:`94.2% Rate`})]}),(0,l.jsx)(`div`,{className:`exec-kpi-val`,children:A}),(0,l.jsx)(`div`,{className:`exec-kpi-lbl`,children:`Present Today`})]}),(0,l.jsxs)(`div`,{className:`exec-kpi-card`,onClick:()=>t(`/tl-approved-leaves`,{state:{statusFilter:`Final Approved`}}),children:[(0,l.jsxs)(`div`,{className:`exec-kpi-header`,children:[(0,l.jsx)(`div`,{className:`exec-kpi-icon`,style:{background:`#ef4444`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-plane-departure`})}),(0,l.jsx)(`span`,{className:`exec-kpi-trend`,style:{background:`#fee2e2`,color:`#991b1b`},children:`4 Out Today`})]}),(0,l.jsx)(`div`,{className:`exec-kpi-val`,children:j}),(0,l.jsx)(`div`,{className:`exec-kpi-lbl`,children:`Employees on Leave`})]}),(0,l.jsxs)(`div`,{className:`exec-kpi-card`,onClick:()=>t(`/tasks`,{state:{activeTab:`board`,projectFilter:`active`}}),children:[(0,l.jsxs)(`div`,{className:`exec-kpi-header`,children:[(0,l.jsx)(`div`,{className:`exec-kpi-icon`,style:{background:`#3b82f6`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-diagram-project`})}),(0,l.jsx)(`span`,{className:`exec-kpi-trend`,style:{background:`#d1fae5`,color:`#065f46`},children:`3 Active`})]}),(0,l.jsx)(`div`,{className:`exec-kpi-val`,children:k}),(0,l.jsx)(`div`,{className:`exec-kpi-lbl`,children:`Active Projects`})]}),(0,l.jsxs)(`div`,{className:`exec-kpi-card`,onClick:()=>t(`/leave-requests`,{state:{statusFilter:`Pending HR Approval`}}),children:[(0,l.jsxs)(`div`,{className:`exec-kpi-header`,children:[(0,l.jsx)(`div`,{className:`exec-kpi-icon`,style:{background:`#f59e0b`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-circle-exclamation`})}),(0,l.jsx)(`span`,{className:`exec-kpi-trend`,style:{background:`#fef3c7`,color:`#92400e`},children:`High Action`})]}),(0,l.jsx)(`div`,{className:`exec-kpi-val`,children:(f?.holiday_stats?.pending||0)+(f?.pending_corrections_count||0)}),(0,l.jsx)(`div`,{className:`exec-kpi-lbl`,children:`Pending Approvals`})]}),(0,l.jsxs)(`div`,{className:`exec-kpi-card`,onClick:()=>t(`/payroll`),children:[(0,l.jsxs)(`div`,{className:`exec-kpi-header`,children:[(0,l.jsx)(`div`,{className:`exec-kpi-icon`,style:{background:`#0ea5e9`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`})}),(0,l.jsx)(`span`,{className:`exec-kpi-trend`,style:{background:`#e0f2fe`,color:`#0369a1`},children:`Processed`})]}),(0,l.jsx)(`div`,{className:`exec-kpi-val`,children:`100%`}),(0,l.jsx)(`div`,{className:`exec-kpi-lbl`,children:`Monthly Payroll Status`})]}),(0,l.jsxs)(`div`,{className:`exec-kpi-card`,onClick:()=>t(`/payroll`),children:[(0,l.jsxs)(`div`,{className:`exec-kpi-header`,children:[(0,l.jsx)(`div`,{className:`exec-kpi-icon`,style:{background:`#8b5cf6`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-sack-dollar`})}),(0,l.jsx)(`span`,{className:`exec-kpi-trend`,style:{background:`#ede9fe`,color:`#5b21b6`},children:`+8.4% YoY`})]}),(0,l.jsx)(`div`,{className:`exec-kpi-val`,children:`$240K`}),(0,l.jsx)(`div`,{className:`exec-kpi-lbl`,children:`Company Revenue`})]}),(0,l.jsxs)(`div`,{className:`exec-kpi-card`,onClick:()=>t(`/tasks`),children:[(0,l.jsxs)(`div`,{className:`exec-kpi-header`,children:[(0,l.jsx)(`div`,{className:`exec-kpi-icon`,style:{background:`#ec4899`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-chart-line`})}),(0,l.jsx)(`span`,{className:`exec-kpi-trend`,style:{background:`#fce7f3`,color:`#9d174d`},children:`96.8% Efficiency`})]}),(0,l.jsx)(`div`,{className:`exec-kpi-val`,children:`Excellent`}),(0,l.jsx)(`div`,{className:`exec-kpi-lbl`,children:`Performance Score`})]})]}),(0,l.jsxs)(`div`,{className:`exec-panel-row`,children:[(0,l.jsxs)(`div`,{className:`exec-card`,children:[(0,l.jsx)(`div`,{className:`exec-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-building`,style:{color:`#4f46e5`}}),` Department Overview`]})}),(0,l.jsx)(`div`,{className:`exec-card-body`,children:(0,l.jsxs)(`div`,{className:`dept-list`,children:[(0,l.jsxs)(`div`,{className:`dept-bar-item`,children:[(0,l.jsxs)(`div`,{className:`dept-bar-meta`,children:[(0,l.jsx)(`span`,{children:`Development`}),(0,l.jsxs)(`span`,{children:[M.development,` Developers`]})]}),(0,l.jsx)(`div`,{className:`dept-bar-track`,children:(0,l.jsx)(`div`,{className:`dept-bar-fill`,style:{width:`60%`,background:`#4f46e5`}})})]}),(0,l.jsxs)(`div`,{className:`dept-bar-item`,children:[(0,l.jsxs)(`div`,{className:`dept-bar-meta`,children:[(0,l.jsx)(`span`,{children:`Design & UI`}),(0,l.jsxs)(`span`,{children:[M.design,` Designers`]})]}),(0,l.jsx)(`div`,{className:`dept-bar-track`,children:(0,l.jsx)(`div`,{className:`dept-bar-fill`,style:{width:`20%`,background:`#3b82f6`}})})]}),(0,l.jsxs)(`div`,{className:`dept-bar-item`,children:[(0,l.jsxs)(`div`,{className:`dept-bar-meta`,children:[(0,l.jsx)(`span`,{children:`HR Administration`}),(0,l.jsxs)(`span`,{children:[M.hr,` Staff`]})]}),(0,l.jsx)(`div`,{className:`dept-bar-track`,children:(0,l.jsx)(`div`,{className:`dept-bar-fill`,style:{width:`10%`,background:`#10b981`}})})]}),(0,l.jsxs)(`div`,{className:`dept-bar-item`,children:[(0,l.jsxs)(`div`,{className:`dept-bar-meta`,children:[(0,l.jsx)(`span`,{children:`Sales & Account Strategy`}),(0,l.jsxs)(`span`,{children:[M.sales,` Executive`]})]}),(0,l.jsx)(`div`,{className:`dept-bar-track`,children:(0,l.jsx)(`div`,{className:`dept-bar-fill`,style:{width:`10%`,background:`#f59e0b`}})})]})]})})]}),(0,l.jsxs)(`div`,{className:`exec-card`,children:[(0,l.jsx)(`div`,{className:`exec-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-chart-bar`,style:{color:`#10b981`}}),` Monthly Attendance Overview`]})}),(0,l.jsx)(`div`,{className:`exec-card-body`,children:(0,l.jsx)(`div`,{className:`svg-chart-container`,children:(0,l.jsxs)(`svg`,{width:`420`,height:`150`,viewBox:`0 0 420 150`,children:[(0,l.jsx)(`line`,{x1:`40`,y1:`20`,x2:`380`,y2:`20`,stroke:`#f1f5f9`,strokeWidth:`1`}),(0,l.jsx)(`line`,{x1:`40`,y1:`70`,x2:`380`,y2:`70`,stroke:`#f1f5f9`,strokeWidth:`1`}),(0,l.jsx)(`line`,{x1:`40`,y1:`120`,x2:`380`,y2:`120`,stroke:`#e2e8f0`,strokeWidth:`1.5`}),(0,l.jsx)(`text`,{x:`15`,y:`25`,fill:`#94a3b8`,fontSize:`10`,fontWeight:`700`,children:`100%`}),(0,l.jsx)(`text`,{x:`15`,y:`75`,fill:`#94a3b8`,fontSize:`10`,fontWeight:`700`,children:`50%`}),(0,l.jsx)(`text`,{x:`20`,y:`125`,fill:`#94a3b8`,fontSize:`10`,fontWeight:`700`,children:`0%`}),(0,l.jsx)(`rect`,{x:`70`,y:`30`,width:`30`,height:`90`,rx:`4`,fill:`#3b82f6`}),(0,l.jsx)(`text`,{x:`85`,y:`138`,fill:`#64748b`,fontSize:`10`,fontWeight:`700`,textAnchor:`middle`,children:`Dev`}),(0,l.jsx)(`rect`,{x:`140`,y:`45`,width:`30`,height:`75`,rx:`4`,fill:`#10b981`}),(0,l.jsx)(`text`,{x:`155`,y:`138`,fill:`#64748b`,fontSize:`10`,fontWeight:`700`,textAnchor:`middle`,children:`UI/UX`}),(0,l.jsx)(`rect`,{x:`210`,y:`55`,width:`30`,height:`65`,rx:`4`,fill:`#f59e0b`}),(0,l.jsx)(`text`,{x:`225`,y:`138`,fill:`#64748b`,fontSize:`10`,fontWeight:`700`,textAnchor:`middle`,children:`Sales`}),(0,l.jsx)(`rect`,{x:`280`,y:`40`,width:`30`,height:`80`,rx:`4`,fill:`#8b5cf6`}),(0,l.jsx)(`text`,{x:`295`,y:`138`,fill:`#64748b`,fontSize:`10`,fontWeight:`700`,textAnchor:`middle`,children:`Mktg`}),(0,l.jsx)(`rect`,{x:`350`,y:`35`,width:`30`,height:`85`,rx:`4`,fill:`#ec4899`}),(0,l.jsx)(`text`,{x:`365`,y:`138`,fill:`#64748b`,fontSize:`10`,fontWeight:`700`,textAnchor:`middle`,children:`HR`})]})})})]})]}),(0,l.jsxs)(`div`,{className:`exec-panel-row`,children:[(0,l.jsxs)(`div`,{className:`exec-card`,children:[(0,l.jsx)(`div`,{className:`exec-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#ef4444`}}),` Pending Leave Approvals Center`]})}),(0,l.jsx)(`div`,{className:`exec-card-body`,children:f?.all_users?(0,l.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`},children:f.all_users.slice(0,4).map(e=>(0,l.jsxs)(`div`,{className:`pending-leave-row`,children:[(0,l.jsxs)(`div`,{className:`pending-leave-meta`,children:[(0,l.jsx)(`span`,{className:`pending-leave-name`,children:e.name}),(0,l.jsxs)(`span`,{className:`pending-leave-dates`,children:[e.role,` • `,e.emp_id||`N/A`]})]}),(0,l.jsx)(`div`,{className:`pending-leave-actions`,children:(0,l.jsx)(`button`,{className:`btn-action-pill approve`,onClick:()=>t(`/leave-requests`),children:`Review Action`})})]},e.id))}):(0,l.jsx)(`div`,{style:{color:`#64748b`,padding:`20px 0`},children:`No pending leave approvals found.`})})]}),(0,l.jsxs)(`div`,{className:`exec-card`,children:[(0,l.jsx)(`div`,{className:`exec-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`,style:{color:`#8b5cf6`}}),` Payroll & Expense Statistics`]})}),(0,l.jsxs)(`div`,{className:`exec-card-body`,style:{textAlign:`left`,fontSize:`13.5px`,lineHeight:`1.8`},children:[(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`8px`,marginBottom:`8px`},children:[(0,l.jsx)(`span`,{children:`Monthly Salary Budget:`}),(0,l.jsxs)(`strong`,{style:{color:`#0f172a`},children:[`$`,Number(f?.payroll_stats?.salary_budget||0).toLocaleString()]})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`8px`,marginBottom:`8px`},children:[(0,l.jsx)(`span`,{children:`PF & Contributions Total:`}),(0,l.jsxs)(`strong`,{style:{color:`#10b981`},children:[`$`,Number(f?.payroll_stats?.pf_contributions||0).toLocaleString()]})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`8px`,marginBottom:`8px`},children:[(0,l.jsx)(`span`,{children:`Taxes Withheld (TDS):`}),(0,l.jsxs)(`strong`,{style:{color:`#3b82f6`},children:[`$`,Number(f?.payroll_stats?.tds_withheld||0).toLocaleString()]})]}),(0,l.jsxs)(`button`,{className:`btn`,style:{width:`100%`,marginTop:`14px`,background:`#4f46e5`},onClick:()=>t(`/payroll`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-cloud-arrow-down`}),` Manage Payroll portal`]})]})]})]}),(0,l.jsx)(`div`,{className:`exec-panel-row`,style:{marginTop:`24px`},children:(0,l.jsxs)(`div`,{className:`exec-card`,style:{flex:1},children:[(0,l.jsxs)(`div`,{className:`exec-card-header`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-clock-rotate-left`,style:{color:`#3b82f6`}}),` Attendance Correction Approvals Center`]}),(0,l.jsxs)(`div`,{style:{display:`flex`,gap:`10px`},children:[(0,l.jsx)(`button`,{className:`btn-action-pill approve`,style:{background:`#10b981`,color:`#fff`,border:`none`,borderRadius:`6px`,padding:`6px 12px`,fontSize:`12px`,cursor:`pointer`},onClick:()=>D(`approve`),children:`Bulk Approve`}),(0,l.jsx)(`button`,{className:`btn-action-pill reject`,style:{background:`#ef4444`,color:`#fff`,border:`none`,borderRadius:`6px`,padding:`6px 12px`,fontSize:`12px`,cursor:`pointer`},onClick:()=>D(`reject`),children:`Bulk Reject`})]})]}),(0,l.jsx)(`div`,{className:`exec-card-body`,children:f?.pending_corrections_list&&f.pending_corrections_list.length>0?(0,l.jsx)(`div`,{className:`table-wrap`,children:(0,l.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,textAlign:`left`},children:[(0,l.jsx)(`thead`,{children:(0,l.jsxs)(`tr`,{style:{borderBottom:`2px solid #e2e8f0`,color:`#475569`,fontSize:`12px`,textTransform:`uppercase`},children:[(0,l.jsx)(`th`,{style:{padding:`12px 8px`,width:`30px`},children:(0,l.jsx)(`input`,{type:`checkbox`,checked:w.length===f.pending_corrections_list.length,onChange:e=>{e.target.checked?T(f.pending_corrections_list.map(e=>e.id)):T([])}})}),(0,l.jsx)(`th`,{style:{padding:`12px 8px`},children:`Request ID`}),(0,l.jsx)(`th`,{style:{padding:`12px 8px`},children:`Employee`}),(0,l.jsx)(`th`,{style:{padding:`12px 8px`},children:`Requested By`}),(0,l.jsx)(`th`,{style:{padding:`12px 8px`},children:`Date`}),(0,l.jsx)(`th`,{style:{padding:`12px 8px`},children:`Old Log`}),(0,l.jsx)(`th`,{style:{padding:`12px 8px`},children:`New Log`}),(0,l.jsx)(`th`,{style:{padding:`12px 8px`},children:`Reason`}),(0,l.jsx)(`th`,{style:{padding:`12px 8px`},children:`Action`})]})}),(0,l.jsx)(`tbody`,{children:f.pending_corrections_list.map(e=>(0,l.jsxs)(`tr`,{style:{borderBottom:`1px solid #f1f5f9`,fontSize:`13px`},children:[(0,l.jsx)(`td`,{style:{padding:`12px 8px`},children:(0,l.jsx)(`input`,{type:`checkbox`,checked:w.includes(e.id),onChange:()=>{w.includes(e.id)?T(w.filter(t=>t!==e.id)):T([...w,e.id])}})}),(0,l.jsx)(`td`,{children:(0,l.jsxs)(`strong`,{children:[`#`,e.id]})}),(0,l.jsxs)(`td`,{children:[(0,l.jsx)(`div`,{style:{fontWeight:600},children:e.employee_name}),(0,l.jsxs)(`div`,{style:{fontSize:`11px`,color:`#64748b`},children:[e.employee_id,` • `,e.department]})]}),(0,l.jsx)(`td`,{children:e.requested_by}),(0,l.jsx)(`td`,{children:e.date}),(0,l.jsxs)(`td`,{children:[(0,l.jsx)(`div`,{style:{color:`#ef4444`,fontWeight:600},children:e.original_status}),(0,l.jsxs)(`div`,{style:{fontSize:`11px`,color:`#64748b`},children:[e.original_check_in?e.original_check_in.substring(11,16):`--:--`,` - `,e.original_check_out?e.original_check_out.substring(11,16):`--:--`]})]}),(0,l.jsxs)(`td`,{children:[(0,l.jsx)(`div`,{style:{color:`#10b981`,fontWeight:600},children:e.new_status}),(0,l.jsxs)(`div`,{style:{fontSize:`11px`,color:`#64748b`},children:[e.new_check_in?e.new_check_in.substring(11,16):`--:--`,` - `,e.new_check_out?e.new_check_out.substring(11,16):`--:--`]})]}),(0,l.jsx)(`td`,{style:{color:`#475569`,fontStyle:`italic`,maxWidth:`150px`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},title:e.reason,children:e.reason}),(0,l.jsx)(`td`,{style:{padding:`12px 8px`},children:(0,l.jsxs)(`div`,{style:{display:`flex`,gap:`6px`},children:[(0,l.jsx)(`button`,{className:`btn-action-pill approve`,style:{background:`#10b981`,color:`#fff`,border:`none`,borderRadius:`4px`,padding:`4px 8px`,fontSize:`11px`,cursor:`pointer`},onClick:()=>E(e.id,`approve`),children:`Approve`}),(0,l.jsx)(`button`,{className:`btn-action-pill reject`,style:{background:`#ef4444`,color:`#fff`,border:`none`,borderRadius:`4px`,padding:`4px 8px`,fontSize:`11px`,cursor:`pointer`},onClick:()=>E(e.id,`reject`),children:`Reject`})]})})]},e.id))})]})}):(0,l.jsx)(`div`,{style:{color:`#64748b`,padding:`20px 0`,textAlign:`center`},children:`No pending attendance correction requests found.`})})]})}),(0,l.jsxs)(`div`,{className:`exec-panel-row`,children:[(0,l.jsxs)(`div`,{className:`exec-card`,children:[(0,l.jsx)(`div`,{className:`exec-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-bullhorn`,style:{color:`#f59e0b`}}),` Corporate Announcements`]})}),(0,l.jsx)(`div`,{className:`exec-card-body`,style:{padding:`0px`},children:f?.corporate_announcements&&f.corporate_announcements.length>0?f.corporate_announcements.slice(0,3).map((e,t)=>(0,l.jsxs)(`div`,{style:{padding:`20px 24px`,borderBottom:t===2?`none`:`1px solid #f1f5f9`},children:[(0,l.jsx)(`h5`,{style:{margin:`0 0 6px 0`,fontSize:`0.85rem`,color:`#334155`,fontWeight:800},children:e.title}),(0,l.jsx)(`p`,{style:{margin:0,fontSize:`0.72rem`,color:`#64748b`},children:e.message})]},t)):(0,l.jsx)(`div`,{style:{color:`#64748b`,padding:`20px 0`,textAlign:`center`},children:`No corporate announcements found.`})})]}),(0,l.jsxs)(`div`,{className:`exec-card`,children:[(0,l.jsx)(`div`,{className:`exec-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-clock-rotate-left`,style:{color:`#64748b`}}),` Executive Log Audit`]})}),(0,l.jsx)(`div`,{className:`exec-card-body`,children:(0,l.jsx)(`div`,{className:`feed-list`,children:f?.recent_activities&&f.recent_activities.length>0?f.recent_activities.slice(0,3).map((e,t)=>(0,l.jsxs)(`div`,{className:`feed-item`,children:[(0,l.jsx)(`div`,{className:`feed-icon`,children:(0,l.jsx)(`i`,{className:e.icon||`fa-solid fa-file-invoice`})}),(0,l.jsxs)(`div`,{className:`feed-desc`,children:[(0,l.jsx)(`span`,{className:`feed-text`,children:e.details}),(0,l.jsx)(`span`,{className:`feed-time`,children:e.time_display})]})]},t)):(0,l.jsx)(`div`,{style:{color:`#64748b`,padding:`20px 0`,textAlign:`center`},children:`No audit logs recorded.`})})})]})]}),(0,l.jsxs)(`div`,{className:`exec-card`,children:[(0,l.jsx)(`div`,{className:`exec-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-bolt`,style:{color:`#f59e0b`}}),` Executive Workspace Shortcuts`]})}),(0,l.jsx)(`div`,{className:`exec-card-body`,children:(0,l.jsxs)(`div`,{className:`quick-actions-panel`,children:[(0,l.jsxs)(`button`,{className:`quick-action-btn`,onClick:()=>t(`/employees`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-user-plus`,style:{color:`#3b82f6`}}),(0,l.jsx)(`span`,{children:`Staff Registry`})]}),(0,l.jsxs)(`button`,{className:`quick-action-btn`,onClick:()=>t(`/payroll`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`,style:{color:`#10b981`}}),(0,l.jsx)(`span`,{children:`Generate Payroll`})]}),(0,l.jsxs)(`button`,{className:`quick-action-btn`,onClick:()=>t(`/leave-requests`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#ef4444`}}),(0,l.jsx)(`span`,{children:`Approve Leaves`})]}),(0,l.jsxs)(`button`,{className:`quick-action-btn`,onClick:()=>t(`/attendance-list`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-chart-line`,style:{color:`#f59e0b`}}),(0,l.jsx)(`span`,{children:`Attendance Sheet`})]}),(0,l.jsxs)(`button`,{className:`quick-action-btn`,onClick:()=>t(`/holidays`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-calendar-days`,style:{color:`#8b5cf6`}}),(0,l.jsx)(`span`,{children:`Holiday Calendar`})]}),(0,l.jsxs)(`button`,{className:`quick-action-btn`,onClick:()=>t(`/settings`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-gears`,style:{color:`#64748b`}}),(0,l.jsx)(`span`,{children:`Portal Settings`})]})]})})]})]})},d=()=>{let e=new Date().getHours();return e<12?`Good Morning`:e<17?`Good Afternoon`:`Good Evening`};export{u as default};