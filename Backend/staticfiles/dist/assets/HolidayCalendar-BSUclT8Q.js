import{d as e,f as t,i as n,l as r,n as i,r as a,s as o,t as s}from"./index-Bk-nlAhU.js";var c=t(e(),1),l=n(),u=()=>{let{user:e}=a(),{showToast:t}=i(),{confirm:n}=s(),u=r(),d=e?.role,[f,p]=(0,c.useState)(d===`MD`&&u.pathname===`/holiday-approvals`?`approvals`:`calendar`),[m,h]=(0,c.useState)([]),[g,_]=(0,c.useState)([]),[v,y]=(0,c.useState)(!0),[b,x]=(0,c.useState)(``),[S,C]=(0,c.useState)(``),[w,T]=(0,c.useState)(``),[E,D]=(0,c.useState)(!1),[O,k]=(0,c.useState)(null),A=async()=>{y(!0);try{let e=(await o.get(`/api/holidays/`)).data;h(e.filter(e=>e.status===`Approved`)),_(e.filter(e=>e.status===`Pending`))}catch(e){console.error(`Error loading holidays:`,e)}finally{y(!1)}};(0,c.useEffect)(()=>{A()},[]);let j=async e=>{e.preventDefault(),D(!0);try{await o.post(`/api/holidays/`,{name:b,date:S,department:w}),t(`Holiday created successfully.`,`success`),x(``),C(``),T(``),A()}catch(e){t(e.response?.data?.detail||`Failed to create holiday.`,`error`)}finally{D(!1)}},M=async e=>{if(await n(`Are you sure you want to delete this holiday?`))try{await o.delete(`/api/holidays/${e}/`),t(`Holiday deleted.`,`success`),A()}catch(e){t(e.response?.data?.detail||`Failed to delete holiday.`,`error`)}},N=async(e,n)=>{k(e+n);try{t((await o.post(`/api/holidays/${e}/action/`,{action:n})).data.detail,n===`approve`?`success`:`info`),A()}catch(e){t(e.response?.data?.detail||`Failed to ${n} holiday.`,`error`)}finally{k(null)}},P=e=>({Approved:{background:`#d1fae5`,color:`#065f46`},Pending:{background:`#fef3c7`,color:`#92400e`},Rejected:{background:`#fee2e2`,color:`#991b1b`},Draft:{background:`#e0e7ff`,color:`#3730a3`}})[e]||{background:`#f1f5f9`,color:`#475569`};return(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`style`,{children:`
        .holiday-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          border-bottom: 2px solid var(--border);
          padding-bottom: 0;
        }
        .holiday-tab-btn {
          padding: 10px 22px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: var(--muted);
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: all 0.2s;
          font-family: var(--font-base);
        }
        .holiday-tab-btn.active {
          color: var(--primary-color);
          border-bottom-color: var(--primary-color);
        }
        .holiday-tab-btn:hover:not(.active) {
          color: var(--text-main);
        }
        .holiday-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
        }
        @media (max-width: 768px) {
          .holiday-grid {
            grid-template-columns: 1fr;
          }
        }
        .holiday-list-card {
          text-align: left;
        }
        .holiday-item {
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .holiday-details {
          display: flex;
          flex-direction: column;
        }
        .holiday-title {
          font-weight: 700;
          color: var(--primary-color);
          font-size: 14px;
        }
        .holiday-date {
          font-size: 12.5px;
          color: var(--muted);
          margin-top: 2px;
        }
        .holiday-dept-badge {
          display: inline-block;
          font-size: 10px;
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          padding: 2px 6px;
          border-radius: 4px;
          margin-top: 4px;
          font-weight: 600;
        }
        .holiday-status-badge {
          display: inline-block;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 700;
          margin-top: 4px;
        }
        .approval-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .btn-approve {
          background: #10b981;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-approve:hover { background: #059669; }
        .btn-approve:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-reject {
          background: #ef4444;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-reject:hover { background: #dc2626; }
        .btn-reject:disabled { opacity: 0.6; cursor: not-allowed; }
        .pending-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #f59e0b;
          color: #fff;
          border-radius: 10px;
          min-width: 20px;
          height: 20px;
          font-size: 11px;
          font-weight: 700;
          padding: 0 6px;
          margin-left: 8px;
        }
      `}),(0,l.jsx)(`h2`,{style:{color:`var(--primary-color)`,marginBottom:`20px`,fontFamily:`var(--font-display)`,fontWeight:800},children:`Holiday Registry`}),(0,l.jsxs)(`div`,{className:`holiday-tabs`,children:[(0,l.jsxs)(`button`,{className:`holiday-tab-btn${f===`calendar`?` active`:``}`,onClick:()=>p(`calendar`),children:[(0,l.jsx)(`i`,{className:`fa-regular fa-calendar`,style:{marginRight:`6px`}}),`Corporate Holidays`]}),d===`MD`&&(0,l.jsxs)(`button`,{className:`holiday-tab-btn${f===`approvals`?` active`:``}`,onClick:()=>p(`approvals`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-clock`,style:{marginRight:`6px`,color:`#f59e0b`}}),`Pending Approvals`,g.length>0&&(0,l.jsx)(`span`,{className:`pending-badge`,children:g.length})]}),[`HR`,`MD`].includes(d)&&(0,l.jsxs)(`button`,{className:`holiday-tab-btn${f===`create`?` active`:``}`,onClick:()=>p(`create`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-plus`,style:{marginRight:`6px`}}),`Schedule Holiday`]})]}),f===`calendar`&&(0,l.jsxs)(`div`,{className:`dashboard-panel-card holiday-list-card`,children:[(0,l.jsx)(`div`,{className:`panel-header`,children:(0,l.jsx)(`h2`,{children:`📅 Corporate Holidays`})}),(0,l.jsx)(`div`,{className:`panel-body`,children:v?(0,l.jsx)(`div`,{children:`Loading holidays...`}):m.length>0?m.map(e=>(0,l.jsxs)(`div`,{className:`holiday-item`,children:[(0,l.jsxs)(`div`,{className:`holiday-details`,children:[(0,l.jsx)(`span`,{className:`holiday-title`,children:e.name}),(0,l.jsxs)(`span`,{className:`holiday-date`,children:[(0,l.jsx)(`i`,{className:`fa-regular fa-calendar`,style:{marginRight:`6px`}}),new Date(e.date).toLocaleDateString(`en-US`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`})]}),e.department&&(0,l.jsx)(`div`,{children:(0,l.jsx)(`span`,{className:`holiday-dept-badge`,children:e.department.replace(`_`,` `)})}),(0,l.jsx)(`span`,{className:`holiday-status-badge`,style:P(e.status),children:e.status})]}),[`HR`,`MD`].includes(d)&&(0,l.jsx)(`button`,{className:`view-btn`,style:{color:`#ef4444`,background:`rgba(239, 68, 68, 0.1)`,border:`none`,cursor:`pointer`},onClick:()=>M(e.id),children:`Delete`})]},e.id)):(0,l.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`13px`},children:`No corporate holidays scheduled.`})})]}),f===`approvals`&&d===`MD`&&(0,l.jsxs)(`div`,{className:`dashboard-panel-card holiday-list-card`,children:[(0,l.jsx)(`div`,{className:`panel-header`,children:(0,l.jsx)(`h2`,{children:`⏳ Pending Holiday Requests`})}),(0,l.jsx)(`div`,{className:`panel-body`,children:v?(0,l.jsx)(`div`,{children:`Loading pending holidays...`}):g.length>0?g.map(e=>(0,l.jsxs)(`div`,{className:`holiday-item`,style:{background:`#fffbeb`,borderColor:`#fcd34d`},children:[(0,l.jsxs)(`div`,{className:`holiday-details`,style:{flex:1},children:[(0,l.jsx)(`span`,{className:`holiday-title`,children:e.name}),(0,l.jsxs)(`span`,{className:`holiday-date`,children:[(0,l.jsx)(`i`,{className:`fa-regular fa-calendar`,style:{marginRight:`6px`}}),new Date(e.date).toLocaleDateString(`en-US`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`})]}),e.department&&(0,l.jsx)(`div`,{children:(0,l.jsx)(`span`,{className:`holiday-dept-badge`,children:e.department.replace(`_`,` `)})}),e.submitted_by_name&&(0,l.jsxs)(`span`,{style:{fontSize:`11px`,color:`#64748b`,marginTop:`4px`,display:`block`},children:[`Submitted by: `,e.submitted_by_name]}),e.description&&(0,l.jsx)(`span`,{style:{fontSize:`11px`,color:`#64748b`,fontStyle:`italic`,marginTop:`2px`,display:`block`},children:e.description})]}),(0,l.jsxs)(`div`,{className:`approval-actions`,children:[(0,l.jsx)(`button`,{className:`btn-approve`,disabled:O===e.id+`approve`,onClick:()=>N(e.id,`approve`),children:O===e.id+`approve`?(0,l.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`}):`Approve`}),(0,l.jsx)(`button`,{className:`btn-reject`,disabled:O===e.id+`reject`,onClick:()=>N(e.id,`reject`),children:O===e.id+`reject`?(0,l.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`}):`Reject`})]})]},e.id)):(0,l.jsxs)(`div`,{style:{color:`#64748b`,textAlign:`center`,padding:`40px 0`,fontSize:`14px`},children:[(0,l.jsx)(`i`,{className:`fa-solid fa-circle-check`,style:{fontSize:`2rem`,color:`#10b981`,display:`block`,marginBottom:`10px`}}),`No pending holiday requests — all caught up!`]})})]}),f===`create`&&[`HR`,`MD`].includes(d)&&(0,l.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,l.jsx)(`div`,{className:`panel-header`,children:(0,l.jsx)(`h2`,{children:`✍️ Schedule Holiday`})}),(0,l.jsx)(`div`,{className:`panel-body`,children:(0,l.jsxs)(`form`,{onSubmit:j,style:{textAlign:`left`,maxWidth:`480px`},children:[(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Holiday Description / Name`}),(0,l.jsx)(`input`,{type:`text`,value:b,onChange:e=>x(e.target.value),required:!0,placeholder:`e.g. Independence Day`})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Holiday Date`}),(0,l.jsx)(`input`,{type:`date`,value:S,onChange:e=>C(e.target.value),required:!0})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Department Scope (Optional)`}),(0,l.jsx)(`input`,{type:`text`,value:w,onChange:e=>T(e.target.value),placeholder:`e.g. technology (leave blank for all)`})]}),(0,l.jsx)(`button`,{type:`submit`,className:`btn`,disabled:E,style:{width:`100%`},children:E?`Scheduling holiday...`:`Add to Holiday Calendar`})]})})]})]})};export{u as default};