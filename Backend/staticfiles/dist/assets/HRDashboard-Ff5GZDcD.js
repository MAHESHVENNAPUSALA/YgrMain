import{d as e,f as t,i as n,n as r,r as i,s as a,t as o,u as s}from"./index-DqFqRayx.js";var c=t(e(),1),l=n(),u=()=>{let{user:e}=i(),t=s(),{showToast:n}=r(),{prompt:u}=o(),[f,p]=(0,c.useState)(null),[m,h]=(0,c.useState)(!0),[g,_]=(0,c.useState)(``),[v,y]=(0,c.useState)([]);(0,c.useEffect)(()=>{(async()=>{try{p((await a.get(`/api/dashboard/hr/`)).data),y((await a.get(`/api/leaves/`,{params:{scope:`team-pending`}})).data.leaves||[])}catch(e){console.error(`Error fetching HR dashboard metrics:`,e)}finally{h(!1)}})();let e=setInterval(()=>{_(new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}))},1e3);return()=>clearInterval(e)},[]);let b=async(e,t)=>{let r=await u(`Enter remarks for ${t}ing this leave request:`)||``;if(r!==null)try{await a.post(`/api/leaves/${e}/action/`,{action:t,comments:r}),n(`Leave request has been successfully ${t}ed.`,`success`),y((await a.get(`/api/leaves/`,{params:{scope:`team-pending`}})).data.leaves||[])}catch(e){n(e.response?.data?.detail||`Failed to update leave request.`,`error`)}};if(m)return(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,minHeight:`400px`,color:`var(--muted)`},children:[(0,l.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:`2rem`,marginRight:`10px`}}),` Loading HR Portal Deck...`]});let x=f?.total_users||0,S=Math.round(x*.93),C=Math.round(x*.05);return x-S-C>0&&x-S-C,(0,l.jsxs)(`div`,{className:`hr-workspace-container`,children:[(0,l.jsx)(`style`,{children:`
        /* HR premium dashboard styles */
        .hr-workspace-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 8px 0;
          font-family: var(--font-base);
        }

        /* Banner styling */
        .hr-banner {
          background: linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%);
          border-radius: 20px;
          padding: 30px;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.15);
          text-align: left;
        }
        .hr-banner-left {
          z-index: 2;
        }
        .hr-greeting {
          font-size: 0.9rem;
          color: #ccfbf1;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .hr-name-title {
          font-size: 2.1rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin: 0 0 6px 0;
          font-family: var(--font-display);
        }
        .hr-subtitle {
          font-size: 0.95rem;
          color: #99f6e4;
          margin-bottom: 20px;
        }
        .hr-meta-row {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
        }
        .hr-meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hr-meta-label {
          font-size: 0.72rem;
          color: #99f6e4;
          text-transform: uppercase;
          font-weight: 700;
        }
        .hr-meta-value {
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
        }
        .hr-banner-right {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          min-width: 280px;
          backdrop-filter: blur(8px);
          z-index: 2;
          text-align: left;
        }
        .hr-banner-right-title {
          font-size: 0.8rem;
          color: #ccfbf1;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        /* 8 Cards grid */
        .hr-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .hr-kpi-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          text-align: left;
          cursor: pointer;
          transition: all 0.25s ease-in-out;
          position: relative;
        }
        .hr-kpi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);
          border-color: #cbd5e1;
        }
        .hr-kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .hr-kpi-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #ffffff;
        }
        .hr-kpi-trend {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 20px;
        }
        .hr-kpi-val {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .hr-kpi-lbl {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 600;
        }

        /* Blocks */
        .hr-panel-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .hr-panel-row {
            grid-template-columns: 1fr;
          }
        }

        .hr-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .hr-card-header {
          padding: 20px 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .hr-card-header h3 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .hr-card-body {
          padding: 24px;
          text-align: left;
        }

        /* Lists */
        .hr-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .hr-list-item:last-child {
          border-bottom: none;
        }
        .hr-list-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }
        .hr-list-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.9rem;
        }
        .hr-list-sub {
          font-size: 0.76rem;
          color: #64748b;
        }
        .hr-list-actions {
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

        /* Shortcuts */
        .hr-shortcuts {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        .hr-shortcut-btn {
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
        .hr-shortcut-btn:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
          border-color: #cbd5e1;
          color: #0d9488;
        }
        .hr-shortcut-btn i {
          font-size: 1.3rem;
        }

        /* Feeds */
        .hr-feed-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .hr-feed-item {
          display: flex;
          gap: 12px;
          font-size: 0.85rem;
        }
        .hr-feed-icon {
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
        .hr-feed-desc {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }
        .hr-feed-text {
          color: #1e293b;
          font-weight: 600;
        }
        .hr-feed-time {
          font-size: 0.72rem;
          color: #94a3b8;
        }

      `}),(0,l.jsxs)(`div`,{className:`hr-banner`,children:[(0,l.jsxs)(`div`,{className:`hr-banner-left`,children:[(0,l.jsx)(`div`,{className:`hr-greeting`,children:d()}),(0,l.jsx)(`h1`,{className:`hr-name-title`,children:e?.name||`HR Specialist`}),(0,l.jsx)(`div`,{className:`hr-subtitle`,children:`YGR Gobal IT Services • Human Resources Portal`}),(0,l.jsxs)(`div`,{className:`hr-meta-row`,children:[(0,l.jsxs)(`div`,{className:`hr-meta-item`,children:[(0,l.jsx)(`span`,{className:`hr-meta-label`,children:`Employee ID`}),(0,l.jsx)(`span`,{className:`hr-meta-value`,children:e?.emp_id||`YGRHR001`})]}),(0,l.jsxs)(`div`,{className:`hr-meta-item`,children:[(0,l.jsx)(`span`,{className:`hr-meta-label`,children:`Live Clock`}),(0,l.jsx)(`span`,{className:`hr-meta-value`,children:g||`09:00:00 AM`})]}),(0,l.jsxs)(`div`,{className:`hr-meta-item`,children:[(0,l.jsx)(`span`,{className:`hr-meta-label`,children:`Verification Queue`}),(0,l.jsxs)(`span`,{className:`hr-meta-value`,children:[f?.pending_documents?.length||0,` Pending`]})]}),(0,l.jsxs)(`div`,{className:`hr-meta-item`,children:[(0,l.jsx)(`span`,{className:`hr-meta-label`,children:`Dept Scope`}),(0,l.jsx)(`span`,{className:`hr-meta-value`,children:`Human Resources`})]})]})]}),(0,l.jsxs)(`div`,{className:`hr-banner-right`,children:[(0,l.jsx)(`div`,{className:`hr-banner-right-title`,children:`Today's Summary`}),(0,l.jsxs)(`div`,{className:`hr-list-item`,style:{padding:`4px 0`,borderBottom:`1px solid rgba(255,255,255,0.05)`},children:[(0,l.jsx)(`span`,{style:{color:`#ccfbf1`,fontSize:`0.82rem`},children:`Staff Present`}),(0,l.jsx)(`span`,{style:{fontWeight:700,color:`#ffffff`},children:f?.present_count||0})]}),(0,l.jsxs)(`div`,{className:`hr-list-item`,style:{padding:`4px 0`,borderBottom:`1px solid rgba(255,255,255,0.05)`},children:[(0,l.jsx)(`span`,{style:{color:`#ccfbf1`,fontSize:`0.82rem`},children:`Pending Leave Approvals`}),(0,l.jsx)(`span`,{style:{fontWeight:700,color:`#ffffff`},children:v.length})]}),(0,l.jsxs)(`div`,{className:`hr-list-item`,style:{padding:`4px 0`,borderBottom:`none`},children:[(0,l.jsx)(`span`,{style:{color:`#ccfbf1`,fontSize:`0.82rem`},children:`Active Tasks`}),(0,l.jsx)(`span`,{style:{fontWeight:700,color:`#ffffff`},children:f?.today_reports_count||0})]})]})]}),(0,l.jsxs)(`div`,{className:`hr-kpi-grid`,children:[(0,l.jsxs)(`div`,{className:`hr-kpi-card`,onClick:()=>t(`/employees`),children:[(0,l.jsxs)(`div`,{className:`hr-kpi-header`,children:[(0,l.jsx)(`div`,{className:`hr-kpi-icon`,style:{background:`#3b82f6`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-users`})}),(0,l.jsx)(`span`,{className:`hr-kpi-trend`,style:{background:`#eff6ff`,color:`#3b82f6`},children:`Operational`})]}),(0,l.jsx)(`div`,{className:`hr-kpi-val`,children:x}),(0,l.jsx)(`div`,{className:`hr-kpi-lbl`,children:`Total Headcount`})]}),(0,l.jsxs)(`div`,{className:`hr-kpi-card`,onClick:()=>t(`/attendance-list`,{state:{statusFilter:`Present`}}),children:[(0,l.jsxs)(`div`,{className:`hr-kpi-header`,children:[(0,l.jsx)(`div`,{className:`hr-kpi-icon`,style:{background:`#10b981`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-user-check`})}),(0,l.jsx)(`span`,{className:`hr-kpi-trend`,style:{background:`#ecfdf5`,color:`#10b981`},children:`Active`})]}),(0,l.jsx)(`div`,{className:`hr-kpi-val`,children:f?.present_count||0}),(0,l.jsx)(`div`,{className:`hr-kpi-lbl`,children:`Present Today`})]}),(0,l.jsxs)(`div`,{className:`hr-kpi-card`,onClick:()=>t(`/tl-approved-leaves`,{state:{statusFilter:`Final Approved`}}),children:[(0,l.jsxs)(`div`,{className:`hr-kpi-header`,children:[(0,l.jsx)(`div`,{className:`hr-kpi-icon`,style:{background:`#ef4444`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-plane-departure`})}),(0,l.jsx)(`span`,{className:`hr-kpi-trend`,style:{background:`#fef2f2`,color:`#ef4444`},children:`Leave Log`})]}),(0,l.jsx)(`div`,{className:`hr-kpi-val`,children:f?.on_leave_count||0}),(0,l.jsx)(`div`,{className:`hr-kpi-lbl`,children:`Employees on Leave`})]}),(0,l.jsxs)(`div`,{className:`hr-kpi-card`,onClick:()=>t(`/leave-requests`,{state:{statusFilter:`Pending HR Approval`}}),children:[(0,l.jsxs)(`div`,{className:`hr-kpi-header`,children:[(0,l.jsx)(`div`,{className:`hr-kpi-icon`,style:{background:`#ec4899`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-envelope-open-text`})}),(0,l.jsx)(`span`,{className:`hr-kpi-trend`,style:{background:`#fdf2f8`,color:`#ec4899`},children:`Action Queue`})]}),(0,l.jsx)(`div`,{className:`hr-kpi-val`,children:v.length}),(0,l.jsx)(`div`,{className:`hr-kpi-lbl`,children:`Pending Approvals`})]}),(0,l.jsxs)(`div`,{className:`hr-kpi-card`,onClick:()=>t(`/attendance-list`),children:[(0,l.jsxs)(`div`,{className:`hr-kpi-header`,children:[(0,l.jsx)(`div`,{className:`hr-kpi-icon`,style:{background:`#f59e0b`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-calendar-minus`})}),(0,l.jsx)(`span`,{className:`hr-kpi-trend`,style:{background:`#fffbeb`,color:`#f59e0b`},children:`Correction`})]}),(0,l.jsx)(`div`,{className:`hr-kpi-val`,children:f?.holiday_stats?.pending||0}),(0,l.jsx)(`div`,{className:`hr-kpi-lbl`,children:`Pending Holidays`})]}),(0,l.jsxs)(`div`,{className:`hr-kpi-card`,onClick:()=>t(`/payroll`),children:[(0,l.jsxs)(`div`,{className:`hr-kpi-header`,children:[(0,l.jsx)(`div`,{className:`hr-kpi-icon`,style:{background:`#06b6d4`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`})}),(0,l.jsx)(`span`,{className:`hr-kpi-trend`,style:{background:`#ecfeff`,color:`#06b6d4`},children:`Month-end`})]}),(0,l.jsx)(`div`,{className:`hr-kpi-val`,children:f?.payroll_stats?.pending_runs||0}),(0,l.jsx)(`div`,{className:`hr-kpi-lbl`,children:`Payroll Pending`})]}),(0,l.jsxs)(`div`,{className:`hr-kpi-card`,onClick:()=>t(`/employees`),children:[(0,l.jsxs)(`div`,{className:`hr-kpi-header`,children:[(0,l.jsx)(`div`,{className:`hr-kpi-icon`,style:{background:`#8b5cf6`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-user-plus`})}),(0,l.jsx)(`span`,{className:`hr-kpi-trend`,style:{background:`#f5f3ff`,color:`#8b5cf6`},children:`Joining Today`})]}),(0,l.jsx)(`div`,{className:`hr-kpi-val`,children:f?.recruitment_stats?.new_joiners||0}),(0,l.jsx)(`div`,{className:`hr-kpi-lbl`,children:`New Joiners`})]}),(0,l.jsxs)(`div`,{className:`hr-kpi-card`,onClick:()=>t(`/employees`),children:[(0,l.jsxs)(`div`,{className:`hr-kpi-header`,children:[(0,l.jsx)(`div`,{className:`hr-kpi-icon`,style:{background:`#64748b`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-file-shield`})}),(0,l.jsx)(`span`,{className:`hr-kpi-trend`,style:{background:`#f8fafc`,color:`#64748b`},children:`Audit Verify`})]}),(0,l.jsx)(`div`,{className:`hr-kpi-val`,children:f?.pending_documents?.length||0}),(0,l.jsx)(`div`,{className:`hr-kpi-lbl`,children:`Docs Pending`})]})]}),(0,l.jsxs)(`div`,{className:`hr-panel-row`,children:[(0,l.jsxs)(`div`,{className:`hr-card`,children:[(0,l.jsx)(`div`,{className:`hr-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#ec4899`}}),` Leaves Pending Review`]})}),(0,l.jsx)(`div`,{className:`hr-card-body`,children:v.length>0?(0,l.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`},children:v.slice(0,4).map(e=>(0,l.jsxs)(`div`,{className:`hr-list-item`,children:[(0,l.jsxs)(`div`,{className:`hr-list-meta`,children:[(0,l.jsx)(`span`,{className:`hr-list-name`,children:e.employee_name||`Staff Employee`}),(0,l.jsxs)(`span`,{className:`hr-list-sub`,children:[e.from_date,` to `,e.to_date,` • `,e.leave_type]})]}),(0,l.jsxs)(`div`,{className:`hr-list-actions`,children:[(0,l.jsx)(`button`,{className:`btn-action-pill approve`,onClick:()=>b(e.id,`approve`),children:`Approve`}),(0,l.jsx)(`button`,{className:`btn-action-pill reject`,onClick:()=>b(e.id,`reject`),children:`Reject`})]})]},e.id))}):(0,l.jsx)(`div`,{style:{color:`#64748b`,padding:`30px 0`,textAlign:`center`},children:`No pending leave requests.`})})]}),(0,l.jsxs)(`div`,{className:`hr-card`,children:[(0,l.jsx)(`div`,{className:`hr-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-receipt`,style:{color:`#0d9488`}}),` Monthly Payroll Overview`]})}),(0,l.jsxs)(`div`,{className:`hr-card-body`,style:{textAlign:`left`,fontSize:`13.5px`,lineHeight:`1.8`},children:[(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`8px`,marginBottom:`8px`},children:[(0,l.jsx)(`span`,{children:`Monthly Salary Budget:`}),(0,l.jsxs)(`strong`,{style:{marginLeft:`auto`},children:[`$`,Number(f?.payroll_stats?.salary_budget||0).toLocaleString()]})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`8px`,marginBottom:`8px`},children:[(0,l.jsx)(`span`,{children:`Provident Fund Contributions:`}),(0,l.jsxs)(`strong`,{style:{marginLeft:`auto`,color:`#10b981`},children:[`$`,Number(f?.payroll_stats?.pf_contributions||0).toLocaleString()]})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`8px`,marginBottom:`8px`},children:[(0,l.jsx)(`span`,{children:`TDS Taxes Withheld:`}),(0,l.jsxs)(`strong`,{style:{marginLeft:`auto`,color:`#3b82f6`},children:[`$`,Number(f?.payroll_stats?.tds_withheld||0).toLocaleString()]})]}),(0,l.jsxs)(`button`,{className:`btn`,style:{width:`100%`,marginTop:`14px`,background:`#0d9488`},onClick:()=>t(`/payroll`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-cloud-arrow-down`}),` Manage Payslips portal`]})]})]})]}),(0,l.jsxs)(`div`,{className:`hr-panel-row`,children:[(0,l.jsxs)(`div`,{className:`hr-card`,children:[(0,l.jsx)(`div`,{className:`hr-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-user-graduate`,style:{color:`#8b5cf6`}}),` Recruitment Pipeline`]})}),(0,l.jsxs)(`div`,{className:`hr-card-body`,style:{textAlign:`left`,fontSize:`13.5px`,lineHeight:`1.8`},children:[(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`8px`,marginBottom:`8px`},children:[(0,l.jsx)(`span`,{children:`Active Job Openings:`}),(0,l.jsxs)(`strong`,{style:{color:`#8b5cf6`},children:[f?.recruitment_stats?.active_job_openings||0,` Positions`]})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`8px`,marginBottom:`8px`},children:[(0,l.jsx)(`span`,{children:`Interviews Scheduled Today:`}),(0,l.jsxs)(`strong`,{style:{color:`#10b981`},children:[f?.recruitment_stats?.interviews_scheduled||0,` Candidates`]})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`none`},children:[(0,l.jsx)(`span`,{children:`Offer Letters Released:`}),(0,l.jsxs)(`strong`,{style:{color:`#f59e0b`},children:[f?.recruitment_stats?.pending_offers||0,` Pending Join`]})]})]})]}),(0,l.jsxs)(`div`,{className:`hr-card`,children:[(0,l.jsx)(`div`,{className:`hr-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-file-circle-check`,style:{color:`#4b5563`}}),` Document Verification Queue`]})}),(0,l.jsx)(`div`,{className:`hr-card-body`,children:f?.pending_documents&&f.pending_documents.length>0?f.pending_documents.slice(0,3).map((e,t)=>(0,l.jsxs)(`div`,{className:`hr-list-item`,children:[(0,l.jsxs)(`div`,{className:`hr-list-meta`,children:[(0,l.jsx)(`span`,{className:`hr-list-name`,children:e.doc_name||`Verification Document`}),(0,l.jsxs)(`span`,{className:`hr-list-sub`,children:[`Pending verification for `,e.name]})]}),e.document_url?(0,l.jsx)(`a`,{href:e.document_url,target:`_blank`,rel:`noreferrer`,className:`btn-action-pill approve`,style:{textDecoration:`none`,textAlign:`center`},children:`View & Verify`}):(0,l.jsx)(`button`,{className:`btn-action-pill approve`,onClick:()=>alert(`Document verified.`),children:`Verify`})]},e.id||t)):(0,l.jsx)(`div`,{style:{color:`#64748b`,padding:`20px 0`,textAlign:`center`},children:`No pending documents to verify.`})})]})]}),(0,l.jsxs)(`div`,{className:`hr-panel-row`,children:[(0,l.jsxs)(`div`,{className:`hr-card`,children:[(0,l.jsx)(`div`,{className:`hr-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-bullhorn`,style:{color:`#f59e0b`}}),` Corporate Announcements`]})}),(0,l.jsx)(`div`,{className:`hr-card-body`,style:{padding:`0px`},children:f?.corporate_announcements&&f.corporate_announcements.length>0?f.corporate_announcements.slice(0,3).map((e,t)=>(0,l.jsxs)(`div`,{style:{padding:`20px 24px`,borderBottom:t===2?`none`:`1px solid #f1f5f9`},children:[(0,l.jsx)(`h5`,{style:{margin:`0 0 6px 0`,fontSize:`0.85rem`,color:`#334155`,fontWeight:800},children:e.title}),(0,l.jsx)(`p`,{style:{margin:0,fontSize:`0.72rem`,color:`#64748b`},children:e.message})]},t)):(0,l.jsx)(`div`,{style:{color:`#64748b`,padding:`20px 0`,textAlign:`center`},children:`No announcements.`})})]}),(0,l.jsxs)(`div`,{className:`hr-card`,children:[(0,l.jsx)(`div`,{className:`hr-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-clock-rotate-left`,style:{color:`#64748b`}}),` Operational Audit Logs`]})}),(0,l.jsx)(`div`,{className:`hr-card-body`,children:(0,l.jsx)(`div`,{className:`hr-feed-list`,children:f?.recent_activities&&f.recent_activities.length>0?f.recent_activities.slice(0,3).map((e,t)=>(0,l.jsxs)(`div`,{className:`hr-feed-item`,children:[(0,l.jsx)(`div`,{className:`hr-feed-icon`,children:(0,l.jsx)(`i`,{className:e.icon||`fa-solid fa-file-invoice`})}),(0,l.jsxs)(`div`,{className:`hr-feed-desc`,children:[(0,l.jsx)(`span`,{className:`feed-text`,children:e.details}),(0,l.jsx)(`span`,{className:`feed-time`,children:e.time_display})]})]},t)):(0,l.jsx)(`div`,{style:{color:`#64748b`,padding:`20px 0`,textAlign:`center`},children:`No activities logged.`})})})]})]}),(0,l.jsxs)(`div`,{className:`hr-card`,children:[(0,l.jsx)(`div`,{className:`hr-card-header`,children:(0,l.jsxs)(`h3`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-bolt`,style:{color:`#f59e0b`}}),` HR Quick Actions Panel`]})}),(0,l.jsx)(`div`,{className:`hr-card-body`,children:(0,l.jsxs)(`div`,{className:`hr-shortcuts`,children:[(0,l.jsxs)(`button`,{className:`hr-shortcut-btn`,onClick:()=>t(`/register`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-user-plus`,style:{color:`#3b82f6`}}),(0,l.jsx)(`span`,{children:`Register Employee`})]}),(0,l.jsxs)(`button`,{className:`hr-shortcut-btn`,onClick:()=>t(`/attendance-list`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-chart-line`,style:{color:`#10b981`}}),(0,l.jsx)(`span`,{children:`Attendance`})]}),(0,l.jsxs)(`button`,{className:`hr-shortcut-btn`,onClick:()=>t(`/payroll`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-wallet`,style:{color:`#0d9488`}}),(0,l.jsx)(`span`,{children:`Payroll`})]}),(0,l.jsxs)(`button`,{className:`hr-shortcut-btn`,onClick:()=>t(`/payroll`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`,style:{color:`#ec4899`}}),(0,l.jsx)(`span`,{children:`Generate Payslips`})]}),(0,l.jsxs)(`button`,{className:`hr-shortcut-btn`,onClick:()=>t(`/holidays`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-calendar-days`,style:{color:`#8b5cf6`}}),(0,l.jsx)(`span`,{children:`Holiday Calendar`})]}),(0,l.jsxs)(`button`,{className:`hr-shortcut-btn`,onClick:()=>t(`/tasks`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-briefcase`,style:{color:`#f59e0b`}}),(0,l.jsx)(`span`,{children:`Recruitment`})]}),(0,l.jsxs)(`button`,{className:`hr-shortcut-btn`,onClick:()=>t(`/employees`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-file-shield`,style:{color:`#64748b`}}),(0,l.jsx)(`span`,{children:`Documents`})]}),(0,l.jsxs)(`button`,{className:`hr-shortcut-btn`,onClick:()=>t(`/employees`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-chart-bar`,style:{color:`#6366f1`}}),(0,l.jsx)(`span`,{children:`Reports`})]}),(0,l.jsxs)(`button`,{className:`hr-shortcut-btn`,onClick:()=>t(`/holidays`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-bullhorn`,style:{color:`#e11d48`}}),(0,l.jsx)(`span`,{children:`Announcements`})]}),(0,l.jsxs)(`button`,{className:`hr-shortcut-btn`,onClick:()=>t(`/settings`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-gears`,style:{color:`#475569`}}),(0,l.jsx)(`span`,{children:`Settings`})]})]})})]})]})},d=()=>{let e=new Date().getHours();return e<12?`Good Morning`:e<17?`Good Afternoon`:`Good Evening`};export{u as default};