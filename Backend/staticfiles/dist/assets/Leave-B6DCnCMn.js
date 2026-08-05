import{d as e,f as t,i as n,l as r,n as i,r as a,s as o,t as s}from"./index-Ckz_Yi3d.js";var c=t(e(),1),l=n(),u=()=>{let{user:e}=a(),{showToast:t}=i(),{prompt:n}=s(),u=e?.role,d=r().state,f=window.location.pathname,p=f.includes(`leave-status`)||f.includes(`apply-leave`)||!f.includes(`approved-leaves`)&&!f.includes(`leave-requests`)&&!f.includes(`all-leaves`)&&!f.includes(`leave-dashboard`),m=f.includes(`approved-leaves`)||f.includes(`tl-approved-leaves`),h=f.includes(`leave-requests`)||f.includes(`all-leaves`)||f.includes(`leave-dashboard`),[g,_]=(0,c.useState)(p?`list`:`approvals`),[v,y]=(0,c.useState)([]),[b,x]=(0,c.useState)(24),[S,C]=(0,c.useState)(0),[w,T]=(0,c.useState)(!0),[E,D]=(0,c.useState)(``),[O,k]=(0,c.useState)(``),[A,j]=(0,c.useState)(`Paid`),[M,N]=(0,c.useState)(``),[P,F]=(0,c.useState)(!1),[I,L]=(0,c.useState)(``),[R,z]=(0,c.useState)(d?.statusFilter||``);(0,c.useEffect)(()=>{d&&d.statusFilter&&z(d.statusFilter)},[d]);let B=async()=>{T(!0);try{let e=`personal`;m?e=`approved-tracking`:h&&(e=`team-pending`);let t={scope:e};R&&(t.status=R);let n=await o.get(`/api/leaves/`,{params:t});y(n.data.leaves||[]),x(n.data.leave_balance??24),C(n.data.approved_count??0)}catch(e){console.error(`Error loading leaves:`,e)}finally{T(!1)}};(0,c.useEffect)(()=>{B()},[R,f]);let V=async e=>{e.preventDefault(),F(!0);try{await o.post(`/api/leaves/`,{from_date:E,to_date:O,leave_type:A,reason:M}),t(`Leave application submitted successfully.`,`success`),D(``),k(``),N(``),_(`list`),B()}catch(e){t(e.response?.data?.detail||`Failed to submit leave request.`,`error`)}finally{F(!1)}},H=async(e,r)=>{let i=``;if(r===`reject`){if(i=await n(`Please enter comments/reason for rejection:`),i===null)return}else if(r===`return`){if(i=await n(`Please enter comments/remarks for returning this request:`),i===null)return}else if(i=await n(`Enter any comments (optional):`,``),i===null)return;try{await o.post(`/api/leaves/${e}/action/`,{action:r,comments:i}),t(`Leave request successfully updated.`,`success`),B()}catch(e){t(e.response?.data?.detail||`Failed to update leave request.`,`error`)}},U=v.filter(e=>{let t=e.user_full_name||``,n=e.emp_id||``;return t.toLowerCase().includes(I.toLowerCase())||n.toLowerCase().includes(I.toLowerCase())}),W=()=>{let e=`data:text/csv;charset=utf-8,`;e+=`Employee,Employee ID,From Date,To Date,Leave Type,Reason,Status\r
`,U.forEach(t=>{e+=`"${t.user_full_name}","${t.emp_id||``}","${t.from_date}","${t.to_date}","${t.leave_type}","${t.reason}","${t.status}"\r\n`});let t=encodeURI(e),n=document.createElement(`a`);n.setAttribute(`href`,t),n.setAttribute(`download`,`leaves_report_${new Date().toISOString().split(`T`)[0]}.csv`),document.body.appendChild(n),n.click(),document.body.removeChild(n)};return(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`style`,{children:`
        .leave-stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        .leave-stat-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 20px;
          text-align: left;
          box-shadow: var(--card-shadow);
        }
        .leave-stat-title {
          font-size: 0.76rem;
          color: var(--muted);
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .leave-stat-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--primary-color);
        }

        .leave-tabs {
          display: flex;
          gap: 10px;
          border-bottom: 2px solid var(--border);
          margin-bottom: 20px;
        }
        .leave-tab {
          padding: 10px 20px;
          cursor: pointer;
          font-weight: 700;
          color: var(--muted);
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: var(--transition-base);
        }
        .leave-tab.active {
          color: var(--accent-blue);
          border-bottom-color: var(--accent-blue);
        }
        
        .leave-form-card {
          max-width: 550px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .leave-form-card .panel-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          padding: 20px 24px;
        }
        .leave-form-card .panel-header h2 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .leave-form-card .panel-body {
          padding: 28px;
        }
        .leave-form-card .form-group {
          margin-bottom: 20px;
        }
        .leave-form-card .form-group label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          display: block;
        }
        .leave-form-card .form-group input, 
        .leave-form-card .form-group select, 
        .leave-form-card .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 0.9rem;
          color: #0f172a;
          transition: all 0.2s ease-in-out;
          font-family: inherit;
        }
        .leave-form-card .form-group input:focus, 
        .leave-form-card .form-group select:focus, 
        .leave-form-card .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .leave-form-card .btn-submit-premium {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
        }
        .leave-form-card .btn-submit-premium:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }
        .leave-form-card .btn-submit-premium:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
      `}),(0,l.jsx)(`h2`,{style:{color:`var(--primary-color)`,marginBottom:`20px`,fontFamily:`var(--font-display)`,fontWeight:800},children:p?`Personal Leave Portal`:h?`Employee Leave Approvals`:m?`TL Approved Leaves Tracking`:`Leaves Portal`}),p&&(0,l.jsxs)(`div`,{className:`leave-stats-row`,children:[(0,l.jsxs)(`div`,{className:`leave-stat-card`,style:{borderLeft:`3px solid var(--accent-blue)`},children:[(0,l.jsx)(`div`,{className:`leave-stat-title`,children:`Leave Allowance`}),(0,l.jsx)(`div`,{className:`leave-stat-value`,children:`24 Days`})]}),(0,l.jsxs)(`div`,{className:`leave-stat-card`,style:{borderLeft:`3px solid var(--success)`},children:[(0,l.jsx)(`div`,{className:`leave-stat-title`,children:`Approved Leaves`}),(0,l.jsxs)(`div`,{className:`leave-stat-value`,children:[S,` Days`]})]}),(0,l.jsxs)(`div`,{className:`leave-stat-card`,style:{borderLeft:`3px solid var(--warning)`},children:[(0,l.jsx)(`div`,{className:`leave-stat-title`,children:`Remaining Balance`}),(0,l.jsxs)(`div`,{className:`leave-stat-value`,children:[b,` Days`]})]})]}),p&&(0,l.jsxs)(`div`,{className:`leave-tabs`,children:[(0,l.jsx)(`div`,{className:`leave-tab ${g===`list`?`active`:``}`,onClick:()=>_(`list`),children:`📋 My Leaves History`}),(0,l.jsx)(`div`,{className:`leave-tab ${g===`apply`?`active`:``}`,onClick:()=>_(`apply`),children:`✍️ Apply Leave`})]}),p&&g===`list`&&(0,l.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,l.jsxs)(`div`,{className:`panel-header`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,l.jsx)(`h2`,{children:`My Leaves History`}),(0,l.jsxs)(`select`,{value:R,onChange:e=>z(e.target.value),style:{padding:`6px 12px`,borderRadius:`6px`,border:`1px solid var(--border)`,fontSize:`13px`,fontWeight:600},children:[(0,l.jsx)(`option`,{value:``,children:`All Statuses`}),(0,l.jsx)(`option`,{value:`Final Approved`,children:`Final Approved`}),(0,l.jsx)(`option`,{value:`Pending Team Leader Approval`,children:`Pending TL Approval`}),(0,l.jsx)(`option`,{value:`Pending Manager Approval`,children:`Pending Manager Approval`}),(0,l.jsx)(`option`,{value:`Pending HR Approval`,children:`Pending HR Approval`}),(0,l.jsx)(`option`,{value:`Pending MD Approval`,children:`Pending MD Approval`}),(0,l.jsx)(`option`,{value:`Rejected by TL`,children:`Rejected by TL`}),(0,l.jsx)(`option`,{value:`Rejected by Manager`,children:`Rejected by Manager`}),(0,l.jsx)(`option`,{value:`Rejected by HR`,children:`Rejected by HR`}),(0,l.jsx)(`option`,{value:`Rejected by MD`,children:`Rejected by MD`})]})]}),(0,l.jsx)(`div`,{className:`panel-body`,children:w?(0,l.jsx)(`div`,{children:`Loading leave records...`}):(0,l.jsx)(`div`,{className:`table-wrap`,children:(0,l.jsxs)(`table`,{children:[(0,l.jsx)(`thead`,{children:(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`th`,{children:`From Date`}),(0,l.jsx)(`th`,{children:`To Date`}),(0,l.jsx)(`th`,{children:`Leave Type`}),(0,l.jsx)(`th`,{children:`Reason`}),(0,l.jsx)(`th`,{children:`Status`})]})}),(0,l.jsx)(`tbody`,{children:v.length>0?v.map(e=>(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`td`,{children:e.from_date}),(0,l.jsx)(`td`,{children:e.to_date}),(0,l.jsx)(`td`,{children:(0,l.jsxs)(`span`,{className:`badge-capsule info`,children:[e.leave_type,` Leave`]})}),(0,l.jsx)(`td`,{children:e.reason}),(0,l.jsx)(`td`,{children:(0,l.jsx)(`span`,{className:`badge-capsule ${e.status===`Final Approved`||e.status===`Approved`?`success`:e.status.startsWith(`Rejected`)?`danger`:`warning`}`,children:e.status})})]},e.id)):(0,l.jsx)(`tr`,{children:(0,l.jsx)(`td`,{colSpan:`5`,style:{textAlign:`center`,color:`var(--muted)`},children:`No leaves requests submitted.`})})})]})})})]}),p&&g===`apply`&&(0,l.jsxs)(`div`,{className:`dashboard-panel-card leave-form-card`,children:[(0,l.jsx)(`div`,{className:`panel-header`,children:(0,l.jsx)(`h2`,{children:`Apply Leave Request`})}),(0,l.jsx)(`div`,{className:`panel-body`,children:(0,l.jsxs)(`form`,{onSubmit:V,style:{textAlign:`left`},children:[(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`From Date`}),(0,l.jsx)(`input`,{type:`date`,value:E,onChange:e=>D(e.target.value),required:!0})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`To Date`}),(0,l.jsx)(`input`,{type:`date`,value:O,onChange:e=>k(e.target.value),required:!0})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Leave Category`}),(0,l.jsxs)(`select`,{value:A,onChange:e=>j(e.target.value),children:[(0,l.jsx)(`option`,{value:`Paid`,children:`Paid Leave`}),(0,l.jsx)(`option`,{value:`Unpaid`,children:`Unpaid Leave`})]})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Reason for Leave`}),(0,l.jsx)(`textarea`,{rows:`4`,value:M,onChange:e=>N(e.target.value),required:!0,placeholder:`Provide reason details...`})]}),(0,l.jsx)(`button`,{type:`submit`,className:`btn-submit-premium`,disabled:P,children:P?`Submitting request...`:`Submit Leave Application`})]})})]}),h&&(0,l.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,l.jsxs)(`div`,{className:`panel-header`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,l.jsx)(`h2`,{children:`Pending Leaves Queue`}),(0,l.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,l.jsx)(`input`,{type:`text`,placeholder:`Search Employee...`,value:I,onChange:e=>L(e.target.value),style:{padding:`6px 12px`,borderRadius:`6px`,border:`1px solid var(--border)`,fontSize:`13px`}}),(0,l.jsxs)(`button`,{className:`download-btn`,onClick:W,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-file-export`}),` Export`]})]})]}),(0,l.jsx)(`div`,{className:`panel-body`,children:w?(0,l.jsx)(`div`,{children:`Loading approvals...`}):(0,l.jsx)(`div`,{className:`table-wrap`,children:(0,l.jsxs)(`table`,{children:[(0,l.jsx)(`thead`,{children:(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`th`,{children:`Employee Name`}),(0,l.jsx)(`th`,{children:`Employee ID`}),(0,l.jsx)(`th`,{children:`Dept & Designation`}),(0,l.jsx)(`th`,{children:`Leave Type`}),(0,l.jsx)(`th`,{children:`Reason`}),(0,l.jsx)(`th`,{children:`Applied Date`}),(0,l.jsx)(`th`,{children:`From Date`}),(0,l.jsx)(`th`,{children:`To Date`}),(0,l.jsx)(`th`,{children:`Total Days`}),(0,l.jsx)(`th`,{children:`Current Status`}),(0,l.jsx)(`th`,{children:`Actions`})]})}),(0,l.jsx)(`tbody`,{children:U.length>0?U.map(e=>{let t=Math.ceil((new Date(e.to_date)-new Date(e.from_date))/(1e3*60*60*24))+1,n=new Date(e.created_at).toLocaleDateString();return(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`td`,{style:{fontWeight:600},children:e.user_full_name}),(0,l.jsx)(`td`,{children:e.emp_id||`--`}),(0,l.jsxs)(`td`,{children:[e.department||`--`,` / `,e.designation||`--`]}),(0,l.jsx)(`td`,{children:e.leave_type}),(0,l.jsx)(`td`,{children:e.reason}),(0,l.jsx)(`td`,{children:n}),(0,l.jsx)(`td`,{children:e.from_date}),(0,l.jsx)(`td`,{children:e.to_date}),(0,l.jsx)(`td`,{children:t}),(0,l.jsx)(`td`,{children:(0,l.jsx)(`span`,{className:`badge-capsule warning`,children:e.status})}),(0,l.jsx)(`td`,{children:(0,l.jsxs)(`div`,{style:{display:`flex`,gap:`6px`},children:[(0,l.jsx)(`button`,{className:`download-btn`,onClick:()=>H(e.id,`approve`),children:`Approve`}),(u===`Manager`||u===`HR`)&&(0,l.jsx)(`button`,{className:`view-btn`,style:{color:`#f59e0b`,background:`rgba(245, 158, 11, 0.1)`},onClick:()=>H(e.id,`return`),children:u===`HR`?`Request Clarification`:`Return to TL`}),(0,l.jsx)(`button`,{className:`view-btn`,style:{color:`#ef4444`,background:`rgba(239, 68, 68, 0.1)`},onClick:()=>H(e.id,`reject`),children:`Reject`})]})})]},e.id)}):(0,l.jsx)(`tr`,{children:(0,l.jsx)(`td`,{colSpan:`11`,style:{textAlign:`center`,color:`var(--muted)`},children:`No leave requests pending action.`})})})]})})})]}),m&&(0,l.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,l.jsxs)(`div`,{className:`panel-header`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,l.jsx)(`h2`,{children:`Approved Leaves Registry`}),(0,l.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,l.jsx)(`input`,{type:`text`,placeholder:`Search Employee...`,value:I,onChange:e=>L(e.target.value),style:{padding:`6px 12px`,borderRadius:`6px`,border:`1px solid var(--border)`,fontSize:`13px`}}),(0,l.jsxs)(`button`,{className:`download-btn`,onClick:W,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-file-export`}),` Export`]})]})]}),(0,l.jsx)(`div`,{className:`panel-body`,children:w?(0,l.jsx)(`div`,{children:`Loading approved list...`}):(0,l.jsx)(`div`,{className:`table-wrap`,children:(0,l.jsxs)(`table`,{children:[(0,l.jsx)(`thead`,{children:(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`th`,{children:`Employee`}),(0,l.jsx)(`th`,{children:`Leave Type`}),(0,l.jsx)(`th`,{children:`Dates`}),(0,l.jsx)(`th`,{children:`Reason`}),(0,l.jsx)(`th`,{children:`TL Approved`}),(0,l.jsx)(`th`,{children:`Manager Approved`}),(0,l.jsx)(`th`,{children:`HR Approved`}),(0,l.jsx)(`th`,{children:`MD Approved`}),(0,l.jsx)(`th`,{children:`Final Status`})]})}),(0,l.jsx)(`tbody`,{children:U.length>0?U.map(e=>(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`td`,{style:{fontWeight:600},children:e.user_full_name}),(0,l.jsxs)(`td`,{children:[e.leave_type,` Leave`]}),(0,l.jsxs)(`td`,{children:[e.from_date,` to `,e.to_date]}),(0,l.jsx)(`td`,{children:e.reason}),(0,l.jsx)(`td`,{children:(0,l.jsx)(`span`,{className:`badge-capsule ${e.approved_tl?`success`:`warning`}`,children:e.approved_tl?`Approved`:`Pending`})}),(0,l.jsx)(`td`,{children:(0,l.jsx)(`span`,{className:`badge-capsule ${e.approved_manager?`success`:`warning`}`,children:e.approved_manager?`Approved`:`Pending`})}),(0,l.jsx)(`td`,{children:(0,l.jsx)(`span`,{className:`badge-capsule ${e.approved_hr?`success`:`warning`}`,children:e.approved_hr?`Approved`:`Pending`})}),(0,l.jsx)(`td`,{children:(0,l.jsx)(`span`,{className:`badge-capsule ${e.approved_md?`success`:`warning`}`,children:e.approved_md?`Approved`:`Pending`})}),(0,l.jsx)(`td`,{children:(0,l.jsx)(`span`,{className:`badge-capsule ${e.status===`Final Approved`||e.status===`Approved`?`success`:e.status.startsWith(`Rejected`)?`danger`:`warning`}`,children:e.status})})]},e.id)):(0,l.jsx)(`tr`,{children:(0,l.jsx)(`td`,{colSpan:`9`,style:{textAlign:`center`,color:`var(--muted)`},children:`No leaves requests tracked here.`})})})]})})})]})]})};export{u as default};