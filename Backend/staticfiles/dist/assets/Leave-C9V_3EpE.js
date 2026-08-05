import{d as e,f as t,i as n,l as r,n as i,r as ee,s as a,t as te,u as ne}from"./index-wzsK_a1n.js";var o=t(e(),1),s=n(),c=()=>{let{user:e}=ee(),{showToast:t}=i(),{prompt:n}=te(),c=e?.role,re=r(),l=ne(),u=re.state,d=window.location.pathname,f=d.includes(`leave-status`)||d.includes(`apply-leave`)||!d.includes(`approved-leaves`)&&!d.includes(`leave-requests`)&&!d.includes(`all-leaves`)&&!d.includes(`leave-dashboard`),p=d.includes(`approved-leaves`)||d.includes(`tl-approved-leaves`)||d.includes(`hr-approved-leaves`)||d.includes(`manager-approved-leaves`),m=d.includes(`leave-requests`)||d.includes(`leave-dashboard`),h=d.includes(`all-leaves`),[g,_]=(0,o.useState)(d.includes(`apply-leave`)?`apply`:f?`list`:`approvals`),[v,ie]=(0,o.useState)([]),[ae,oe]=(0,o.useState)(24),[y,se]=(0,o.useState)(0),[b,x]=(0,o.useState)(!0),[ce,le]=(0,o.useState)(null),[S,ue]=(0,o.useState)(null),[de,C]=(0,o.useState)(!1),[w,fe]=(0,o.useState)(`created_at`),[T,E]=(0,o.useState)(`desc`),[D,O]=(0,o.useState)(1),[k,A]=(0,o.useState)(``),[j,M]=(0,o.useState)(``),[N,pe]=(0,o.useState)(`Paid`),[P,F]=(0,o.useState)(``),[I,L]=(0,o.useState)(!1),[R,z]=(0,o.useState)(``),[B,V]=(0,o.useState)(u?.statusFilter||``);(0,o.useEffect)(()=>{u&&u.statusFilter&&V(u.statusFilter)},[u]);let H=async()=>{x(!0);try{let e=`personal`;p?e=`approved-tracking`:h?e=`team-all`:m&&(e=`team-pending`);let t={scope:e};B&&(t.status=B);let n=await a.get(`/api/leaves/`,{params:t});ie(n.data.leaves||[]),oe(n.data.leave_balance??24),se(n.data.approved_count??0),le(n.data),O(1)}catch(e){console.error(`Error loading leaves:`,e)}finally{x(!1)}};(0,o.useEffect)(()=>{V(``),z(``),O(1),H()},[d]),(0,o.useEffect)(()=>{H()},[B]);let me=async e=>{e.preventDefault(),L(!0);try{await a.post(`/api/leaves/`,{from_date:k,to_date:j,leave_type:N,reason:P}),t(`Leave application submitted successfully.`,`success`),A(``),M(``),F(``),d.includes(`apply-leave`)?l(`/leave-status`):(_(`list`),H())}catch(e){t(e.response?.data?.detail||`Failed to submit leave request.`,`error`)}finally{L(!1)}},U=async(e,r)=>{let i=``;if(r===`reject`){if(i=await n(`Please enter comments/reason for rejection:`),i===null)return}else if(r===`return`){if(i=await n(`Please enter comments/remarks for returning this request:`),i===null)return}else if(i=await n(`Enter any comments (optional):`,``),i===null)return;try{await a.post(`/api/leaves/${e}/action/`,{action:r,comments:i}),t(`Leave request successfully updated.`,`success`),H()}catch(e){t(e.response?.data?.detail||`Failed to update leave request.`,`error`)}},W=v.filter(e=>{let t=e.user_full_name||``,n=e.emp_id||``;return t.toLowerCase().includes(R.toLowerCase())||n.toLowerCase().includes(R.toLowerCase())}),G=e=>{w===e?E(T===`asc`?`desc`:`asc`):(fe(e),E(`asc`))},K=[...W].sort((e,t)=>{let n=e[w]||``,r=t[w]||``;return w===`total_days`&&(n=Math.ceil((new Date(e.to_date)-new Date(e.from_date))/(1e3*60*60*24))+1,r=Math.ceil((new Date(t.to_date)-new Date(t.from_date))/(1e3*60*60*24))+1),n<r?T===`asc`?-1:1:n>r?T===`asc`?1:-1:0}),q=Math.ceil(K.length/8),J=D*8,Y=J-8,X=K.slice(Y,J),Z=()=>{let e=`data:text/csv;charset=utf-8,`;e+=`Employee,Employee ID,From Date,To Date,Leave Type,Reason,Status\r
`,W.forEach(t=>{e+=`"${t.user_full_name}","${t.emp_id||``}","${t.from_date}","${t.to_date}","${t.leave_type}","${t.reason}","${t.status}"\r\n`});let t=encodeURI(e),n=document.createElement(`a`);n.setAttribute(`href`,t),n.setAttribute(`download`,`leaves_report_${new Date().toISOString().split(`T`)[0]}.csv`),document.body.appendChild(n),n.click(),document.body.removeChild(n)},he=()=>f?`Personal Leave Portal`:h?`All Leaves`:m?`Employee Leave Approvals`:p?`Approved Leaves Tracking Registry`:`Leaves Portal`,Q=()=>q<=1?null:(0,s.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginTop:`16px`,padding:`0 20px 20px 20px`,flexWrap:`wrap`,gap:`10px`},children:[(0,s.jsxs)(`span`,{style:{fontSize:`13px`,color:`#64748b`,fontWeight:600},children:[`Showing `,Y+1,` to `,Math.min(J,K.length),` of `,K.length,` entries`]}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`6px`},children:[(0,s.jsx)(`button`,{className:`btn`,style:{padding:`6px 12px`,background:D===1?`#cbd5e1`:`#3b82f6`,color:`#fff`,border:`none`,borderRadius:`6px`,cursor:D===1?`not-allowed`:`pointer`,fontSize:`12px`},disabled:D===1,onClick:()=>O(D-1),children:`Previous`}),[...Array(q)].map((e,t)=>(0,s.jsx)(`button`,{className:`btn`,style:{padding:`6px 12px`,background:D===t+1?`#0f172a`:`#f1f5f9`,color:D===t+1?`#fff`:`#475569`,border:`none`,borderRadius:`6px`,cursor:`pointer`,fontWeight:700,fontSize:`12px`},onClick:()=>O(t+1),children:t+1},t)),(0,s.jsx)(`button`,{className:`btn`,style:{padding:`6px 12px`,background:D===q?`#cbd5e1`:`#3b82f6`,color:`#fff`,border:`none`,borderRadius:`6px`,cursor:D===q?`not-allowed`:`pointer`,fontSize:`12px`},disabled:D===q,onClick:()=>O(D+1),children:`Next`})]})]}),$=e=>{ue(e),C(!0)};return(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`style`,{children:`
        .leave-stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        .leave-stat-card {
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
        .leave-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);
          border-color: #cbd5e1;
        }
        .leave-stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .leave-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #ffffff;
        }
        .leave-stat-title {
          font-size: 0.78rem;
          color: var(--muted);
          text-transform: uppercase;
          font-weight: 700;
          margin-top: 4px;
        }
        .leave-stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-top: 4px;
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
        
        /* Modal details window */
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
          max-height: 500px;
          overflow-y: auto;
        }
        
        .clickable-row {
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        .clickable-row:hover {
          background-color: #f8fafc !important;
        }
        
        .sort-header {
          cursor: pointer;
          user-select: none;
        }
        .sort-header:hover {
          color: #0f172a;
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
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
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
          margin-top: 10px;
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
      `}),(0,s.jsx)(`h2`,{style:{color:`var(--primary-color)`,marginBottom:`20px`,fontFamily:`var(--font-display)`,fontWeight:800,textAlign:`left`},children:he()}),(f||p)&&(0,s.jsx)(`div`,{className:`leave-stats-row`,children:f?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(`div`,{className:`leave-stat-card`,children:[(0,s.jsxs)(`div`,{className:`leave-stat-header`,children:[(0,s.jsx)(`div`,{className:`leave-stat-icon`,style:{background:`#3b82f6`},children:(0,s.jsx)(`i`,{className:`fa-solid fa-plane`})}),(0,s.jsx)(`span`,{className:`badge-capsule info`,style:{background:`#eff6ff`,color:`#3b82f6`},children:`Allowance`})]}),(0,s.jsx)(`div`,{className:`leave-stat-value`,children:`24 Days`}),(0,s.jsx)(`div`,{className:`leave-stat-title`,children:`Leave Allowance`})]}),(0,s.jsxs)(`div`,{className:`leave-stat-card`,children:[(0,s.jsxs)(`div`,{className:`leave-stat-header`,children:[(0,s.jsx)(`div`,{className:`leave-stat-icon`,style:{background:`#10b981`},children:(0,s.jsx)(`i`,{className:`fa-solid fa-calendar-check`})}),(0,s.jsx)(`span`,{className:`badge-capsule success`,style:{background:`#ecfdf5`,color:`#10b981`},children:`Consumed`})]}),(0,s.jsxs)(`div`,{className:`leave-stat-value`,children:[y,` Days`]}),(0,s.jsx)(`div`,{className:`leave-stat-title`,children:`Approved Leaves`})]}),(0,s.jsxs)(`div`,{className:`leave-stat-card`,children:[(0,s.jsxs)(`div`,{className:`leave-stat-header`,children:[(0,s.jsx)(`div`,{className:`leave-stat-icon`,style:{background:`#f59e0b`},children:(0,s.jsx)(`i`,{className:`fa-solid fa-hourglass-half`})}),(0,s.jsx)(`span`,{className:`badge-capsule warning`,style:{background:`#fffbeb`,color:`#f59e0b`},children:`Available`})]}),(0,s.jsxs)(`div`,{className:`leave-stat-value`,children:[ae,` Days`]}),(0,s.jsx)(`div`,{className:`leave-stat-title`,children:`Remaining Balance`})]})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(`div`,{className:`leave-stat-card`,children:[(0,s.jsxs)(`div`,{className:`leave-stat-header`,children:[(0,s.jsx)(`div`,{className:`leave-stat-icon`,style:{background:`#10b981`},children:(0,s.jsx)(`i`,{className:`fa-solid fa-clipboard-check`})}),(0,s.jsx)(`span`,{className:`badge-capsule success`,style:{background:`#ecfdf5`,color:`#10b981`},children:`Registry`})]}),(0,s.jsxs)(`div`,{className:`leave-stat-value`,children:[v.length,` Requests`]}),(0,s.jsx)(`div`,{className:`leave-stat-title`,children:`Approved Leave Records`})]}),(0,s.jsxs)(`div`,{className:`leave-stat-card`,children:[(0,s.jsxs)(`div`,{className:`leave-stat-header`,children:[(0,s.jsx)(`div`,{className:`leave-stat-icon`,style:{background:`#3b82f6`},children:(0,s.jsx)(`i`,{className:`fa-solid fa-calendar-days`})}),(0,s.jsx)(`span`,{className:`badge-capsule info`,style:{background:`#eff6ff`,color:`#3b82f6`},children:`Total Days`})]}),(0,s.jsxs)(`div`,{className:`leave-stat-value`,children:[y,` Days`]}),(0,s.jsx)(`div`,{className:`leave-stat-title`,children:`Total Approved Days`})]}),(0,s.jsxs)(`div`,{className:`leave-stat-card`,style:{cursor:m?`default`:`pointer`},onClick:()=>l(`/leave-requests`),children:[(0,s.jsxs)(`div`,{className:`leave-stat-header`,children:[(0,s.jsx)(`div`,{className:`leave-stat-icon`,style:{background:`#ec4899`},children:(0,s.jsx)(`i`,{className:`fa-solid fa-envelope-open-text`})}),(0,s.jsx)(`span`,{className:`badge-capsule warning`,style:{background:`#fdf2f8`,color:`#ec4899`},children:`Approvals`})]}),(0,s.jsxs)(`div`,{className:`leave-stat-value`,children:[ce?.pending_count||0,` Requests`]}),(0,s.jsx)(`div`,{className:`leave-stat-title`,children:`Pending Review Queue`})]})]})}),f&&(0,s.jsxs)(`div`,{className:`leave-tabs`,children:[(0,s.jsx)(`div`,{className:`leave-tab ${g===`list`?`active`:``}`,onClick:()=>_(`list`),children:`📋 My Leaves History`}),(0,s.jsx)(`div`,{className:`leave-tab ${g===`apply`?`active`:``}`,onClick:()=>_(`apply`),children:`✍️ Apply Leave`})]}),f&&g===`list`&&(0,s.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,s.jsxs)(`div`,{className:`panel-header`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,s.jsx)(`h2`,{children:`My Leaves History`}),(0,s.jsxs)(`select`,{value:B,onChange:e=>V(e.target.value),style:{padding:`6px 12px`,borderRadius:`6px`,border:`1px solid var(--border)`,fontSize:`13px`,fontWeight:600},children:[(0,s.jsx)(`option`,{value:``,children:`All Statuses`}),(0,s.jsx)(`option`,{value:`Final Approved`,children:`Final Approved`}),(0,s.jsx)(`option`,{value:`Pending TeamLead Approval`,children:`Pending TeamLead Approval`}),(0,s.jsx)(`option`,{value:`Pending Manager Approval`,children:`Pending Manager Approval`}),(0,s.jsx)(`option`,{value:`Pending HR Approval`,children:`Pending HR Approval`}),(0,s.jsx)(`option`,{value:`Pending MD Approval`,children:`Pending MD Approval`}),(0,s.jsx)(`option`,{value:`Rejected by TeamLead`,children:`Rejected by TeamLead`}),(0,s.jsx)(`option`,{value:`Rejected by Manager`,children:`Rejected by Manager`}),(0,s.jsx)(`option`,{value:`Rejected by HR`,children:`Rejected by HR`}),(0,s.jsx)(`option`,{value:`Rejected by MD`,children:`Rejected by MD`})]})]}),(0,s.jsx)(`div`,{className:`panel-body`,style:{padding:`0`},children:b?(0,s.jsx)(`div`,{style:{padding:`24px`,color:`#64748b`},children:`Loading leave records...`}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`div`,{className:`table-wrap`,children:(0,s.jsxs)(`table`,{children:[(0,s.jsx)(`thead`,{children:(0,s.jsxs)(`tr`,{children:[(0,s.jsxs)(`th`,{className:`sort-header`,onClick:()=>G(`from_date`),children:[`From Date `,w===`from_date`&&(T===`asc`?`▲`:`▼`)]}),(0,s.jsxs)(`th`,{className:`sort-header`,onClick:()=>G(`to_date`),children:[`To Date `,w===`to_date`&&(T===`asc`?`▲`:`▼`)]}),(0,s.jsx)(`th`,{children:`Leave Type`}),(0,s.jsx)(`th`,{children:`Reason`}),(0,s.jsxs)(`th`,{className:`sort-header`,onClick:()=>G(`status`),children:[`Status `,w===`status`&&(T===`asc`?`▲`:`▼`)]})]})}),(0,s.jsx)(`tbody`,{children:X.length>0?X.map(e=>(0,s.jsxs)(`tr`,{className:`clickable-row`,onClick:()=>$(e),children:[(0,s.jsx)(`td`,{children:e.from_date}),(0,s.jsx)(`td`,{children:e.to_date}),(0,s.jsx)(`td`,{children:(0,s.jsxs)(`span`,{className:`badge-capsule info`,children:[e.leave_type,` Leave`]})}),(0,s.jsx)(`td`,{style:{maxWidth:`200px`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:e.reason}),(0,s.jsx)(`td`,{children:(0,s.jsx)(`span`,{className:`badge-capsule ${e.status===`Final Approved`||e.status===`Approved`?`success`:e.status.startsWith(`Rejected`)?`danger`:`warning`}`,children:e.status})})]},e.id)):(0,s.jsx)(`tr`,{children:(0,s.jsx)(`td`,{colSpan:`5`,style:{textAlign:`center`,color:`var(--muted)`,padding:`24px`},children:`No leaves requests submitted.`})})})]})}),Q()]})})]}),f&&g===`apply`&&(0,s.jsxs)(`div`,{className:`dashboard-panel-card leave-form-card`,children:[(0,s.jsx)(`div`,{className:`panel-header`,children:(0,s.jsx)(`h2`,{children:`Apply Leave Request`})}),(0,s.jsx)(`div`,{className:`panel-body`,children:(0,s.jsxs)(`form`,{onSubmit:me,style:{textAlign:`left`},children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`From Date`}),(0,s.jsx)(`input`,{type:`date`,value:k,onChange:e=>A(e.target.value),required:!0})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`To Date`}),(0,s.jsx)(`input`,{type:`date`,value:j,onChange:e=>M(e.target.value),required:!0})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Leave Category`}),(0,s.jsxs)(`select`,{value:N,onChange:e=>pe(e.target.value),children:[(0,s.jsx)(`option`,{value:`Paid`,children:`Paid Leave`}),(0,s.jsx)(`option`,{value:`Unpaid`,children:`Unpaid Leave`})]})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Reason for Leave`}),(0,s.jsx)(`textarea`,{rows:`4`,value:P,onChange:e=>F(e.target.value),required:!0,placeholder:`Provide reason details...`})]}),(0,s.jsx)(`button`,{type:`submit`,className:`btn-submit-premium`,disabled:I,children:I?`Submitting request...`:`Submit Leave Application`})]})})]}),(m||h)&&(0,s.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,s.jsxs)(`div`,{className:`panel-header`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,flexWrap:`wrap`,gap:`10px`},children:[(0,s.jsx)(`h2`,{children:h?`All Leaves`:`Pending Leaves Queue`}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,s.jsx)(`input`,{type:`text`,placeholder:`Search Employee...`,value:R,onChange:e=>z(e.target.value),style:{padding:`6px 12px`,borderRadius:`6px`,border:`1px solid var(--border)`,fontSize:`13px`}}),(0,s.jsxs)(`button`,{className:`download-btn`,onClick:Z,children:[(0,s.jsx)(`i`,{className:`fa-solid fa-file-export`}),` Export`]})]})]}),(0,s.jsx)(`div`,{className:`panel-body`,style:{padding:`0`},children:b?(0,s.jsx)(`div`,{style:{padding:`24px`,color:`#64748b`},children:`Loading approvals...`}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`div`,{className:`table-wrap`,children:(0,s.jsxs)(`table`,{children:[(0,s.jsx)(`thead`,{children:(0,s.jsxs)(`tr`,{children:[(0,s.jsxs)(`th`,{className:`sort-header`,onClick:()=>G(`user_full_name`),children:[`Employee Name `,w===`user_full_name`&&(T===`asc`?`▲`:`▼`)]}),(0,s.jsx)(`th`,{children:`Employee ID`}),(0,s.jsx)(`th`,{children:`Dept & Designation`}),(0,s.jsx)(`th`,{children:`Leave Type`}),(0,s.jsx)(`th`,{children:`Reason`}),(0,s.jsxs)(`th`,{className:`sort-header`,onClick:()=>G(`created_at`),children:[`Applied Date `,w===`created_at`&&(T===`asc`?`▲`:`▼`)]}),(0,s.jsx)(`th`,{children:`From Date`}),(0,s.jsx)(`th`,{children:`To Date`}),(0,s.jsxs)(`th`,{className:`sort-header`,onClick:()=>G(`total_days`),children:[`Total Days `,w===`total_days`&&(T===`asc`?`▲`:`▼`)]}),(0,s.jsx)(`th`,{children:`Current Status`}),!h&&(0,s.jsx)(`th`,{children:`Actions`})]})}),(0,s.jsx)(`tbody`,{children:X.length>0?X.map(e=>{let t=Math.ceil((new Date(e.to_date)-new Date(e.from_date))/(1e3*60*60*24))+1,n=new Date(e.created_at).toLocaleDateString();return(0,s.jsxs)(`tr`,{className:`clickable-row`,onClick:()=>$(e),children:[(0,s.jsx)(`td`,{style:{fontWeight:600},children:e.user_full_name}),(0,s.jsx)(`td`,{children:e.emp_id||`--`}),(0,s.jsxs)(`td`,{children:[e.department||`--`,` / `,e.designation||`--`]}),(0,s.jsx)(`td`,{children:e.leave_type}),(0,s.jsx)(`td`,{style:{maxWidth:`150px`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:e.reason}),(0,s.jsx)(`td`,{children:n}),(0,s.jsx)(`td`,{children:e.from_date}),(0,s.jsx)(`td`,{children:e.to_date}),(0,s.jsx)(`td`,{children:t}),(0,s.jsx)(`td`,{children:(0,s.jsx)(`span`,{className:`badge-capsule warning`,style:{background:`#fffbeb`,color:`#ea580c`},children:e.status})}),!h&&(0,s.jsx)(`td`,{onClick:e=>e.stopPropagation(),children:(0,s.jsx)(`div`,{style:{display:`flex`,gap:`6px`},children:e.can_act?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`button`,{className:`download-btn`,onClick:()=>U(e.id,`approve`),style:{padding:`6px 12px`,fontSize:`11px`},children:`Approve`}),(c===`Manager`||c===`HR`)&&(0,s.jsx)(`button`,{className:`view-btn`,style:{color:`#f59e0b`,background:`rgba(245, 158, 11, 0.1)`,padding:`6px 12px`,fontSize:`11px`},onClick:()=>U(e.id,`return`),children:c===`HR`?`Request Clarification`:`Return to TL`}),(0,s.jsx)(`button`,{className:`view-btn`,style:{color:`#ef4444`,background:`rgba(239, 68, 68, 0.1)`,padding:`6px 12px`,fontSize:`11px`},onClick:()=>U(e.id,`reject`),children:`Reject`})]}):(0,s.jsxs)(`span`,{style:{fontSize:`11px`,color:`#94a3b8`,fontStyle:`italic`},children:[`Pending `,e.current_approver_role]})})})]},e.id)}):(0,s.jsx)(`tr`,{children:(0,s.jsx)(`td`,{colSpan:h?`10`:`11`,style:{textAlign:`center`,color:`var(--muted)`,padding:`24px`},children:`No leave requests pending action.`})})})]})}),Q()]})})]}),p&&(0,s.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,s.jsxs)(`div`,{className:`panel-header`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,flexWrap:`wrap`,gap:`10px`},children:[(0,s.jsx)(`h2`,{children:`Approved Leaves Registry`}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,s.jsx)(`input`,{type:`text`,placeholder:`Search Employee...`,value:R,onChange:e=>z(e.target.value),style:{padding:`6px 12px`,borderRadius:`6px`,border:`1px solid var(--border)`,fontSize:`13px`}}),(0,s.jsxs)(`button`,{className:`download-btn`,onClick:Z,children:[(0,s.jsx)(`i`,{className:`fa-solid fa-file-export`}),` Export`]})]})]}),(0,s.jsx)(`div`,{className:`panel-body`,style:{padding:`0`},children:b?(0,s.jsx)(`div`,{style:{padding:`24px`,color:`#64748b`},children:`Loading approved list...`}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`div`,{className:`table-wrap`,children:(0,s.jsxs)(`table`,{children:[(0,s.jsx)(`thead`,{children:(0,s.jsxs)(`tr`,{children:[(0,s.jsxs)(`th`,{className:`sort-header`,onClick:()=>G(`user_full_name`),children:[`Employee `,w===`user_full_name`&&(T===`asc`?`▲`:`▼`)]}),(0,s.jsx)(`th`,{children:`Leave Type`}),(0,s.jsxs)(`th`,{className:`sort-header`,onClick:()=>G(`from_date`),children:[`Dates `,w===`from_date`&&(T===`asc`?`▲`:`▼`)]}),(0,s.jsx)(`th`,{children:`Reason`}),(0,s.jsx)(`th`,{children:`TL Approved`}),(0,s.jsx)(`th`,{children:`Manager Approved`}),!p&&(0,s.jsx)(`th`,{children:`HR Approved`}),!p&&(0,s.jsx)(`th`,{children:`MD Approved`}),(0,s.jsxs)(`th`,{className:`sort-header`,onClick:()=>G(`status`),children:[`Final Status `,w===`status`&&(T===`asc`?`▲`:`▼`)]})]})}),(0,s.jsx)(`tbody`,{children:X.length>0?X.map(e=>(0,s.jsxs)(`tr`,{className:`clickable-row`,onClick:()=>$(e),children:[(0,s.jsx)(`td`,{style:{fontWeight:600},children:e.user_full_name}),(0,s.jsxs)(`td`,{children:[e.leave_type,` Leave`]}),(0,s.jsxs)(`td`,{children:[e.from_date,` to `,e.to_date]}),(0,s.jsx)(`td`,{style:{maxWidth:`150px`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:e.reason}),(0,s.jsx)(`td`,{children:(0,s.jsx)(`span`,{className:`badge-capsule ${e.approved_tl||e.status===`Final Approved`||e.status===`Approved`?`success`:`warning`}`,children:e.approved_tl||e.status===`Final Approved`||e.status===`Approved`?`Approved`:`Pending`})}),(0,s.jsx)(`td`,{children:(0,s.jsx)(`span`,{className:`badge-capsule ${e.approved_manager||e.status===`Final Approved`||e.status===`Approved`?`success`:`warning`}`,children:e.approved_manager||e.status===`Final Approved`||e.status===`Approved`?`Approved`:`Pending`})}),!p&&(0,s.jsx)(`td`,{children:(0,s.jsx)(`span`,{className:`badge-capsule ${e.approved_hr||e.status===`Final Approved`||e.status===`Approved`?`success`:`warning`}`,children:e.approved_hr||e.status===`Final Approved`||e.status===`Approved`?`Approved`:`Pending`})}),!p&&(0,s.jsx)(`td`,{children:(0,s.jsx)(`span`,{className:`badge-capsule ${e.approved_md||e.status===`Final Approved`||e.status===`Approved`?`success`:`warning`}`,children:e.approved_md||e.status===`Final Approved`||e.status===`Approved`?`Approved`:`Pending`})}),(0,s.jsx)(`td`,{children:(0,s.jsx)(`span`,{className:`badge-capsule ${e.status===`Final Approved`||e.status===`Approved`?`success`:e.status.startsWith(`Rejected`)?`danger`:`warning`}`,children:e.status})})]},e.id)):(0,s.jsx)(`tr`,{children:(0,s.jsx)(`td`,{colSpan:p?`7`:`9`,style:{textAlign:`center`,color:`var(--muted)`,padding:`24px`},children:`No leaves requests tracked here.`})})})]})}),Q()]})})]}),de&&S&&(0,s.jsx)(`div`,{className:`modal-overlay`,onClick:()=>C(!1),children:(0,s.jsxs)(`div`,{className:`modal-container`,onClick:e=>e.stopPropagation(),style:{maxWidth:`600px`},children:[(0,s.jsxs)(`div`,{className:`modal-header`,children:[(0,s.jsx)(`h3`,{children:`Leave Request Audit Log`}),(0,s.jsx)(`button`,{className:`modal-close-btn`,onClick:()=>C(!1),children:`×`})]}),(0,s.jsxs)(`div`,{className:`modal-body`,style:{textAlign:`left`,padding:`24px`,fontSize:`14px`},children:[(0,s.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`16px`,marginBottom:`20px`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`16px`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`label`,{style:{fontWeight:700,color:`#64748b`,fontSize:`11px`,textTransform:`uppercase`},children:`Employee Name`}),(0,s.jsx)(`div`,{style:{fontSize:`15px`,fontWeight:800,color:`#0f172a`,marginTop:`2px`},children:S.user_full_name})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`label`,{style:{fontWeight:700,color:`#64748b`,fontSize:`11px`,textTransform:`uppercase`},children:`Employee ID / Dept`}),(0,s.jsxs)(`div`,{style:{fontSize:`15px`,fontWeight:800,color:`#0f172a`,marginTop:`2px`},children:[S.emp_id||`--`,` • `,S.department||`--`]})]})]}),(0,s.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`16px`,marginBottom:`20px`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`16px`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`label`,{style:{fontWeight:700,color:`#64748b`,fontSize:`11px`,textTransform:`uppercase`},children:`Leave Category`}),(0,s.jsxs)(`div`,{style:{fontSize:`14px`,fontWeight:700,color:`#0ea5e9`,marginTop:`2px`},children:[S.leave_type,` Leave`]})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`label`,{style:{fontWeight:700,color:`#64748b`,fontSize:`11px`,textTransform:`uppercase`},children:`Duration / Dates`}),(0,s.jsxs)(`div`,{style:{fontSize:`14px`,fontWeight:700,color:`#0f172a`,marginTop:`2px`},children:[S.from_date,` to `,S.to_date,(0,s.jsxs)(`span`,{style:{marginLeft:`8px`,color:`#10b981`,fontWeight:800},children:[`(`,Math.ceil((new Date(S.to_date)-new Date(S.from_date))/(1e3*60*60*24))+1,` Days)`]})]})]})]}),(0,s.jsxs)(`div`,{style:{marginBottom:`24px`},children:[(0,s.jsx)(`label`,{style:{fontWeight:700,color:`#64748b`,fontSize:`11px`,textTransform:`uppercase`},children:`Reason for Application`}),(0,s.jsxs)(`div`,{style:{fontSize:`14px`,color:`#334155`,marginTop:`4px`,background:`#f8fafc`,padding:`12px`,borderRadius:`8px`,border:`1px solid #e2e8f0`,fontStyle:`italic`},children:[`"`,S.reason,`"`]})]}),(0,s.jsxs)(`div`,{style:{marginBottom:`8px`},children:[(0,s.jsx)(`label`,{style:{fontWeight:700,color:`#64748b`,fontSize:`11px`,textTransform:`uppercase`},children:`Workflow Approval Audit Trail`}),(0,s.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`,marginTop:`8px`},children:S.approval_steps&&S.approval_steps.length>0?S.approval_steps.map((e,t)=>(0,s.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,padding:`10px 14px`,background:`#f8fafc`,borderRadius:`8px`,border:`1px solid #e2e8f0`},children:[(0,s.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`10px`},children:[(0,s.jsx)(`div`,{style:{width:`28px`,height:`28px`,borderRadius:`50%`,background:e.decision===`Approved`||e.decision===`Submitted`?`#dcfce7`:e.decision===`Rejected`?`#fee2e2`:`#f1f5f9`,color:e.decision===`Approved`||e.decision===`Submitted`?`#16a34a`:e.decision===`Rejected`?`#dc2626`:`#64748b`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`12px`,fontWeight:800},children:e.decision===`Approved`||e.decision===`Submitted`?`✓`:e.decision===`Rejected`?`✗`:`·`}),(0,s.jsxs)(`strong`,{style:{color:`#334155`},children:[`Stage `,t+1,`: `,e.approver_role,` (`,e.approver_name,`)`]})]}),(0,s.jsx)(`span`,{className:`badge-capsule ${e.decision===`Approved`||e.decision===`Submitted`?`success`:e.decision===`Rejected`?`danger`:`warning`}`,children:e.decision})]},e.id)):(0,s.jsx)(`div`,{style:{padding:`10px 14px`,background:`#f8fafc`,borderRadius:`8px`,border:`1px solid #e2e8f0`,color:`#64748b`,fontSize:`13px`},children:`No approval steps recorded yet.`})})]}),S.comments&&(0,s.jsxs)(`div`,{style:{marginTop:`20px`},children:[(0,s.jsx)(`label`,{style:{fontWeight:700,color:`#64748b`,fontSize:`11px`,textTransform:`uppercase`},children:`Remarks & Audit Comments`}),(0,s.jsx)(`div`,{style:{fontSize:`13px`,color:`#475569`,marginTop:`4px`,background:`#fffbeb`,padding:`10px 12px`,borderRadius:`6px`,border:`1px solid #fef3c7`},children:S.comments})]})]}),(0,s.jsx)(`div`,{style:{padding:`18px 24px`,background:`#f8fafc`,borderTop:`1px solid #e2e8f0`,display:`flex`,justifyContent:`flex-end`},children:(0,s.jsx)(`button`,{className:`btn`,style:{background:`#64748b`},onClick:()=>C(!1),children:`Close View`})})]})})]})};export{c as default};