import{d as e,f as t,i as n,l as r,r as i,s as a,u as o}from"./index-D6tlMiRG.js";import{t as s}from"./OnLeaveTodayWidget-kFye6MgA.js";var c=t(e(),1),l=n(),u=()=>{let{user:e}=i(),t=o(),n=r(),[u,d]=(0,c.useState)(null),[f,p]=(0,c.useState)(!0),[m,h]=(0,c.useState)(n.state?.tab||`overview`),[g,_]=(0,c.useState)(``),[v,y]=(0,c.useState)(``),[b,x]=(0,c.useState)([]),[S,C]=(0,c.useState)([]),[w,T]=(0,c.useState)(null);(0,c.useEffect)(()=>{(async()=>{try{d((await a.get(`/api/dashboard/manager/`)).data),C((await a.get(`/api/teams/`)).data||[])}catch(e){console.error(`Error fetching Manager dashboard metrics:`,e)}finally{p(!1)}})()},[]);let E=async()=>{try{C((await a.get(`/api/teams/`)).data||[])}catch(e){console.error(`Error fetching teams`,e)}};if((0,c.useEffect)(()=>{h(n.state?.tab||`overview`)},[n.state?.tab]),f)return(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,minHeight:`300px`,color:`var(--muted)`},children:[(0,l.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:`2rem`,marginRight:`10px`}}),` Loading console...`]});let D=(u?.developers_list||[]).filter(e=>e.name?.toLowerCase().includes(g.toLowerCase())||e.email?.toLowerCase().includes(g.toLowerCase())||(e.emp_id||``).toLowerCase().includes(g.toLowerCase())),O=(u?.team_leads_list||[]).filter(e=>e.name?.toLowerCase().includes(v.toLowerCase())||e.email?.toLowerCase().includes(v.toLowerCase())||(e.emp_id||``).toLowerCase().includes(v.toLowerCase())),k=(e,t,n)=>(0,l.jsx)(`div`,{style:{width:`40px`,height:`40px`,borderRadius:`50%`,flexShrink:0,background:t,color:n,display:`flex`,alignItems:`center`,justifyContent:`center`,fontWeight:800,fontSize:`1rem`},children:e?e.charAt(0).toUpperCase():`?`});return(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`style`,{children:`
        .m-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        .m-stat-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 20px;
          box-shadow: var(--card-shadow);
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .m-stat-card:hover, .m-stat-card.active {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -3px rgba(59,130,246,0.15);
          border-color: #3b82f6;
        }
        .m-stat-card.active .m-stat-label {
          color: #3b82f6;
        }
        .m-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          color: #ffffff;
        }
        .m-stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary-color);
          line-height: 1.2;
        }
        .m-stat-label {
          font-size: 0.8rem;
          color: var(--muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .m-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .m-grid { grid-template-columns: 1fr; }
        }
        .m-member-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          transition: background 0.15s;
        }
        .m-member-row:hover {
          background: #f1f5f9;
        }
        .m-member-info { flex: 1; min-width: 0; }
        .m-member-name {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.92rem;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .m-member-sub {
          font-size: 0.76rem;
          color: #64748b;
          margin-top: 1px;
        }
        .m-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.84rem;
          cursor: pointer;
          border: none;
          transition: all 0.15s;
        }
        .m-add-btn-green {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff;
          box-shadow: 0 2px 8px rgba(34,197,94,0.25);
        }
        .m-add-btn-green:hover { background: linear-gradient(135deg, #16a34a, #15803d); transform: translateY(-1px); }
        .m-add-btn-amber {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #fff;
          box-shadow: 0 2px 8px rgba(245,158,11,0.25);
        }
        .m-add-btn-amber:hover { background: linear-gradient(135deg, #d97706, #b45309); transform: translateY(-1px); }
        .m-search-input {
          padding: 8px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #0f172a;
          outline: none;
          width: 220px;
          transition: border-color 0.15s;
        }
        .m-search-input:focus { border-color: #3b82f6; }
        .m-empty {
          text-align: center;
          color: #94a3b8;
          padding: 40px 20px;
          font-size: 0.9rem;
        }
      `}),(0,l.jsx)(`h2`,{style:{color:`var(--primary-color)`,marginBottom:`20px`,fontFamily:`var(--font-display)`,fontWeight:800},children:`Manager Console`}),(0,l.jsxs)(`div`,{className:`m-stats-grid`,children:[(0,l.jsxs)(`div`,{className:`m-stat-card`,onClick:()=>t(`/projects`),children:[(0,l.jsx)(`div`,{className:`m-stat-icon`,style:{background:`linear-gradient(135deg, var(--accent-blue), #1e40af)`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-folder-open`})}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`m-stat-value`,children:(u?.projects_received||0)+(u?.projects_assigned||0)}),(0,l.jsx)(`div`,{className:`m-stat-label`,children:`Total Projects`})]})]}),(0,l.jsxs)(`div`,{className:`m-stat-card ${m===`developers`?`active`:``}`,onClick:()=>h(`developers`),children:[(0,l.jsx)(`div`,{className:`m-stat-icon`,style:{background:`linear-gradient(135deg, #22c55e, #047857)`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-users`})}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`m-stat-value`,children:u?.employees_count||0}),(0,l.jsx)(`div`,{className:`m-stat-label`,children:`Total Developers`})]})]}),(0,l.jsxs)(`div`,{className:`m-stat-card ${m===`teamleads`?`active`:``}`,onClick:()=>h(`teamleads`),children:[(0,l.jsx)(`div`,{className:`m-stat-icon`,style:{background:`linear-gradient(135deg, #f59e0b, #b45309)`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-users-gear`})}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`m-stat-value`,children:u?.team_leads_count||0}),(0,l.jsx)(`div`,{className:`m-stat-label`,children:`Team Leads`})]})]}),(0,l.jsxs)(`div`,{className:`m-stat-card ${m===`teams`?`active`:``}`,onClick:()=>h(`teams`),children:[(0,l.jsx)(`div`,{className:`m-stat-icon`,style:{background:`linear-gradient(135deg, #8b5cf6, #6d28d9)`},children:(0,l.jsx)(`i`,{className:`fa-solid fa-network-wired`})}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`m-stat-value`,children:`Manage`}),(0,l.jsx)(`div`,{className:`m-stat-label`,children:`Teams`})]})]})]}),m===`overview`&&(0,l.jsxs)(`div`,{className:`m-grid`,children:[(0,l.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,l.jsx)(`div`,{className:`panel-header`,children:(0,l.jsxs)(`h2`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-file-invoice`,style:{color:`var(--accent-blue)`,marginRight:`8px`}}),` Developer Activity Reports (Recent)`]})}),(0,l.jsx)(`div`,{className:`panel-body`,children:(0,l.jsx)(`div`,{className:`table-wrap`,children:(0,l.jsxs)(`table`,{className:`dense-table`,children:[(0,l.jsx)(`thead`,{children:(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`th`,{children:`Developer`}),(0,l.jsx)(`th`,{children:`Project`}),(0,l.jsx)(`th`,{children:`Date`}),(0,l.jsx)(`th`,{children:`Tasks Completed`})]})}),(0,l.jsx)(`tbody`,{children:u?.daily_reports&&u.daily_reports.length>0?u.daily_reports.map(e=>(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`td`,{style:{fontWeight:600},children:e.user_name}),(0,l.jsx)(`td`,{children:e.project_name}),(0,l.jsx)(`td`,{children:e.report_date}),(0,l.jsx)(`td`,{children:e.tasks_completed})]},e.id)):(0,l.jsx)(`tr`,{children:(0,l.jsx)(`td`,{colSpan:`4`,style:{textAlign:`center`,color:`var(--muted)`},children:`No reports received recently.`})})})]})})})]}),(0,l.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,l.jsx)(`div`,{className:`panel-header`,children:(0,l.jsxs)(`h2`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-clipboard-check`,style:{color:`var(--accent-blue)`,marginRight:`8px`}}),` Leaves Pending Approval`]})}),(0,l.jsxs)(`div`,{className:`panel-body`,style:{textAlign:`left`,fontSize:`13.5px`,lineHeight:`1.8`},children:[(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`8px`,marginBottom:`8px`},children:[(0,l.jsx)(`span`,{children:`Developer Leaves Pending:`}),(0,l.jsx)(`strong`,{style:{color:`var(--danger)`},children:u?.employee_leave_count||0})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`8px`,marginBottom:`16px`},children:[(0,l.jsx)(`span`,{children:`Team Lead Leaves Pending:`}),(0,l.jsx)(`strong`,{style:{color:`var(--danger)`},children:u?.teamlead_leave_count||0})]}),(0,l.jsxs)(`button`,{className:`m-add-btn m-add-btn-green`,style:{width:`100%`,justifyContent:`center`},onClick:()=>t(`/leave-requests`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-arrow-right`}),` View & Approve Leave Requests`]}),(0,l.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`12px`,marginTop:`12px`},children:`* Managers must approve or reject pending leave requests before they proceed to HR.`})]})]}),(0,l.jsx)(`div`,{className:`dashboard-panel-card`,style:{gridColumn:`span 2`},children:(0,l.jsx)(s,{onLeaveList:u?.on_leave_today||[]})})]}),m===`developers`&&(0,l.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,l.jsxs)(`div`,{className:`panel-header`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,flexWrap:`wrap`,gap:`12px`},children:[(0,l.jsxs)(`h2`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-users`,style:{color:`#22c55e`,marginRight:`8px`}}),`Total Developers`,(0,l.jsxs)(`span`,{style:{marginLeft:`10px`,fontSize:`0.85rem`,fontWeight:600,color:`#64748b`},children:[`(`,D.length,`)`]})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,gap:`10px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,l.jsx)(`input`,{className:`m-search-input`,type:`text`,placeholder:`🔍 Search by name / email / ID...`,value:g,onChange:e=>_(e.target.value)}),(0,l.jsxs)(`button`,{className:`m-add-btn m-add-btn-green`,onClick:()=>t(`/register`,{state:{defaultRole:`Employee`}}),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-user-plus`}),` Add New Developer`]})]})]}),(0,l.jsx)(`div`,{className:`panel-body`,children:D.length>0?(0,l.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`10px`},children:D.map((e,t)=>(0,l.jsxs)(`div`,{className:`m-member-row`,children:[(0,l.jsx)(`div`,{style:{width:`32px`,textAlign:`center`,fontWeight:700,color:`#94a3b8`,fontSize:`0.8rem`},children:t+1}),k(e.name,`#dcfce7`,`#16a34a`),(0,l.jsxs)(`div`,{className:`m-member-info`,children:[(0,l.jsx)(`div`,{className:`m-member-name`,children:e.name}),(0,l.jsxs)(`div`,{className:`m-member-sub`,children:[e.emp_id&&(0,l.jsx)(`span`,{style:{background:`#f0fdf4`,color:`#15803d`,padding:`1px 7px`,borderRadius:`20px`,fontWeight:700,marginRight:`8px`},children:e.emp_id}),e.email]})]}),(0,l.jsx)(`span`,{style:{background:`#dcfce7`,color:`#15803d`,padding:`3px 12px`,borderRadius:`20px`,fontSize:`0.75rem`,fontWeight:700,flexShrink:0},children:`Developer`})]},e.id))}):(0,l.jsxs)(`div`,{className:`m-empty`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-users`,style:{fontSize:`2rem`,marginBottom:`10px`,display:`block`,color:`#cbd5e1`}}),g?`No developers match your search.`:`No developers added yet.`,(0,l.jsx)(`br`,{}),(0,l.jsxs)(`button`,{className:`m-add-btn m-add-btn-green`,style:{marginTop:`16px`},onClick:()=>t(`/register`,{state:{defaultRole:`Employee`}}),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-user-plus`}),` Add First Developer`]})]})})]}),m===`teamleads`&&(0,l.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,l.jsxs)(`div`,{className:`panel-header`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,flexWrap:`wrap`,gap:`12px`},children:[(0,l.jsxs)(`h2`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-users-gear`,style:{color:`#f59e0b`,marginRight:`8px`}}),`Team Leads`,(0,l.jsxs)(`span`,{style:{marginLeft:`10px`,fontSize:`0.85rem`,fontWeight:600,color:`#64748b`},children:[`(`,O.length,`)`]})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,gap:`10px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,l.jsx)(`input`,{className:`m-search-input`,type:`text`,placeholder:`🔍 Search by name / email / ID...`,value:v,onChange:e=>y(e.target.value)}),(0,l.jsxs)(`button`,{className:`m-add-btn m-add-btn-amber`,onClick:()=>t(`/register`,{state:{defaultRole:`TeamLead`}}),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-user-plus`}),` Add New Team Lead`]})]})]}),(0,l.jsx)(`div`,{className:`panel-body`,children:O.length>0?(0,l.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`10px`},children:O.map((e,t)=>(0,l.jsxs)(`div`,{className:`m-member-row`,children:[(0,l.jsx)(`div`,{style:{width:`32px`,textAlign:`center`,fontWeight:700,color:`#94a3b8`,fontSize:`0.8rem`},children:t+1}),k(e.name,`#fef3c7`,`#d97706`),(0,l.jsxs)(`div`,{className:`m-member-info`,children:[(0,l.jsx)(`div`,{className:`m-member-name`,children:e.name}),(0,l.jsxs)(`div`,{className:`m-member-sub`,children:[e.emp_id&&(0,l.jsx)(`span`,{style:{background:`#fffbeb`,color:`#b45309`,padding:`1px 7px`,borderRadius:`20px`,fontWeight:700,marginRight:`8px`},children:e.emp_id}),e.email]})]}),(0,l.jsx)(`span`,{style:{background:`#fef3c7`,color:`#b45309`,padding:`3px 12px`,borderRadius:`20px`,fontSize:`0.75rem`,fontWeight:700,flexShrink:0},children:`Team Lead`})]},e.id))}):(0,l.jsxs)(`div`,{className:`m-empty`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-users-gear`,style:{fontSize:`2rem`,marginBottom:`10px`,display:`block`,color:`#cbd5e1`}}),v?`No team leads match your search.`:`No team leads added yet.`,(0,l.jsx)(`br`,{}),(0,l.jsxs)(`button`,{className:`m-add-btn m-add-btn-amber`,style:{marginTop:`16px`},onClick:()=>t(`/register`,{state:{defaultRole:`TeamLead`}}),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-user-plus`}),` Add First Team Lead`]})]})})]}),m===`teams`&&(0,l.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,l.jsx)(`div`,{className:`panel-header`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,flexWrap:`wrap`,gap:`12px`},children:(0,l.jsxs)(`h2`,{children:[(0,l.jsx)(`i`,{className:`fa-solid fa-network-wired`,style:{color:`#8b5cf6`,marginRight:`8px`}}),`Manage Teams`]})}),(0,l.jsxs)(`div`,{className:`panel-body`,children:[(0,l.jsxs)(`div`,{className:`assign-task-card`,style:{boxShadow:`none`,border:`1px solid #e2e8f0`},children:[(0,l.jsx)(`div`,{className:`panel-header`,style:{background:`#f8fafc`},children:(0,l.jsx)(`h3`,{style:{fontSize:`1.1rem`,margin:0,fontWeight:700},children:`Create New Team`})}),(0,l.jsx)(`div`,{className:`panel-body`,children:(0,l.jsxs)(`form`,{onSubmit:async e=>{e.preventDefault();let t=new FormData(e.target),n=Object.fromEntries(t);n.members=b;try{await a.post(`/api/teams/`,n),alert(`Team created successfully!`),e.target.reset(),x([]),E()}catch(e){alert(e.response?.data?.detail||`Failed to create team.`)}},style:{textAlign:`left`},children:[(0,l.jsxs)(`div`,{className:`form-group`,style:{marginBottom:`16px`},children:[(0,l.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`#475569`,marginBottom:`6px`,display:`block`},children:`Team Name`}),(0,l.jsx)(`input`,{name:`name`,required:!0,style:{width:`100%`,padding:`10px 14px`,borderRadius:`8px`,border:`1px solid #cbd5e1`}})]}),(0,l.jsxs)(`div`,{className:`form-group`,style:{marginBottom:`16px`},children:[(0,l.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`#475569`,marginBottom:`6px`,display:`block`},children:`Select Team Lead`}),(0,l.jsxs)(`select`,{name:`lead`,required:!0,style:{width:`100%`,padding:`10px 14px`,borderRadius:`8px`,border:`1px solid #cbd5e1`},children:[(0,l.jsx)(`option`,{value:``,children:`-- Choose a Team Lead --`}),O.map(e=>(0,l.jsxs)(`option`,{value:e.id,children:[e.name,` (`,e.email,`)`]},e.id))]})]}),(0,l.jsxs)(`div`,{className:`form-group`,style:{marginBottom:`16px`},children:[(0,l.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`#475569`,marginBottom:`6px`,display:`block`},children:`Select Employees (Members)`}),(0,l.jsx)(`div`,{style:{maxHeight:`180px`,overflowY:`auto`,border:`1px solid #cbd5e1`,borderRadius:`8px`,padding:`12px`,backgroundColor:`#f8fafc`,display:`flex`,flexDirection:`column`,gap:`10px`},children:D.filter(e=>!e.is_assigned).length>0?D.filter(e=>!e.is_assigned).map(e=>(0,l.jsxs)(`label`,{style:{display:`flex`,alignItems:`center`,gap:`10px`,cursor:`pointer`,fontSize:`0.85rem`,fontWeight:600,color:`#334155`,margin:0},children:[(0,l.jsx)(`input`,{type:`checkbox`,checked:b.includes(e.id),onChange:t=>{t.target.checked?x([...b,e.id]):x(b.filter(t=>t!==e.id))},style:{width:`16px`,height:`16px`,cursor:`pointer`,accentColor:`#3b82f6`}}),(0,l.jsxs)(`span`,{children:[e.name,` (`,e.email,`)`]})]},e.id)):(0,l.jsx)(`div`,{style:{color:`#94a3b8`,fontSize:`0.85rem`},children:`No employees available.`})})]}),(0,l.jsxs)(`div`,{className:`form-group`,style:{marginBottom:`16px`},children:[(0,l.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`#475569`,marginBottom:`6px`,display:`block`},children:`Department`}),(0,l.jsx)(`input`,{name:`department`,defaultValue:`python_dev`,style:{width:`100%`,padding:`10px 14px`,borderRadius:`8px`,border:`1px solid #cbd5e1`}})]}),(0,l.jsx)(`button`,{type:`submit`,className:`m-add-btn m-add-btn-green`,style:{width:`100%`,justifyContent:`center`,padding:`12px`,fontSize:`0.95rem`},children:`Create Team & Assign Lead`})]})})]}),(0,l.jsxs)(`div`,{className:`assign-task-card`,style:{boxShadow:`none`,border:`1px solid #e2e8f0`,marginTop:`24px`},children:[(0,l.jsx)(`div`,{className:`panel-header`,style:{background:`#f8fafc`},children:(0,l.jsx)(`h3`,{style:{fontSize:`1.1rem`,margin:0,fontWeight:700},children:`Manage Existing Teams`})}),(0,l.jsx)(`div`,{className:`panel-body`,children:S.length>0?(0,l.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:S.map(e=>(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,padding:`16px`,border:`1px solid #e2e8f0`,borderRadius:`8px`,background:`#fff`},children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`h4`,{style:{margin:`0 0 4px 0`,color:`#1e293b`,fontSize:`1.05rem`},children:e.name}),(0,l.jsxs)(`p`,{style:{margin:0,fontSize:`0.85rem`,color:`#64748b`},children:[`Lead: `,e.lead_detail?(e.lead_detail.first_name+` `+e.lead_detail.last_name).trim()||e.lead_detail.username:e.lead_name||`Unassigned`,` | Dept: `,e.department_display||e.department]}),e.members_detail&&e.members_detail.length>0&&(0,l.jsxs)(`div`,{style:{marginTop:`8px`,fontSize:`0.85rem`,color:`#475569`},children:[(0,l.jsx)(`strong`,{children:`Members: `}),e.members_detail.map(e=>(e.first_name+` `+e.last_name).trim()||e.username).join(`, `)]})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,l.jsxs)(`button`,{onClick:()=>T(e),style:{padding:`6px 12px`,background:`#3b82f6`,color:`#fff`,border:`none`,borderRadius:`4px`,cursor:`pointer`,fontSize:`0.85rem`},children:[(0,l.jsx)(`i`,{className:`fa-solid fa-pen-to-square`}),` Edit`]}),(0,l.jsxs)(`button`,{onClick:async()=>{if(window.confirm(`Are you sure you want to delete team ${e.name}?`))try{await a.delete(`/api/teams/${e.id}/`),alert(`Team deleted successfully!`),E()}catch(e){alert(e.response?.data?.detail||`Failed to delete team.`)}},style:{padding:`6px 12px`,background:`#ef4444`,color:`#fff`,border:`none`,borderRadius:`4px`,cursor:`pointer`,fontSize:`0.85rem`},children:[(0,l.jsx)(`i`,{className:`fa-solid fa-trash`}),` Delete`]})]})]},e.id))}):(0,l.jsx)(`div`,{style:{padding:`20px`,textAlign:`center`,color:`#94a3b8`},children:`No teams found. Create a new team above.`})})]}),(0,l.jsx)(`div`,{style:{marginTop:`30px`},children:(0,l.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`0.9rem`},children:`Teams you create will be available to assign to Projects in the Projects workspace.`})})]})]}),w&&(0,l.jsx)(`div`,{className:`modal-overlay`,onClick:()=>T(null),children:(0,l.jsxs)(`div`,{className:`modal-container`,onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(`div`,{className:`modal-header`,children:[(0,l.jsxs)(`h3`,{children:[`Edit Team: `,w.name]}),(0,l.jsx)(`button`,{className:`modal-close-btn`,onClick:()=>T(null),children:`×`})]}),(0,l.jsx)(`div`,{className:`modal-body`,children:(0,l.jsxs)(`form`,{onSubmit:async e=>{e.preventDefault();let t=new FormData(e.target),n=Object.fromEntries(t);try{await a.put(`/api/teams/${w.id}/`,n),alert(`Team updated successfully!`),T(null),E()}catch(e){alert(e.response?.data?.detail||`Failed to update team.`)}},style:{textAlign:`left`},children:[(0,l.jsxs)(`div`,{className:`form-group`,style:{marginBottom:`16px`},children:[(0,l.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`#475569`,marginBottom:`6px`,display:`block`},children:`Team Name`}),(0,l.jsx)(`input`,{name:`name`,defaultValue:w.name,required:!0,style:{width:`100%`,padding:`10px 14px`,borderRadius:`8px`,border:`1px solid #cbd5e1`}})]}),(0,l.jsxs)(`div`,{className:`form-group`,style:{marginBottom:`16px`},children:[(0,l.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`#475569`,marginBottom:`6px`,display:`block`},children:`Department`}),(0,l.jsx)(`input`,{name:`department`,defaultValue:w.department,style:{width:`100%`,padding:`10px 14px`,borderRadius:`8px`,border:`1px solid #cbd5e1`}})]}),(0,l.jsxs)(`div`,{className:`form-group`,style:{marginBottom:`16px`},children:[(0,l.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`#475569`,marginBottom:`6px`,display:`block`},children:`Select Team Lead`}),(0,l.jsxs)(`select`,{name:`lead`,defaultValue:w.lead||``,required:!0,style:{width:`100%`,padding:`10px 14px`,borderRadius:`8px`,border:`1px solid #cbd5e1`},children:[(0,l.jsx)(`option`,{value:``,children:`-- Choose a Team Lead --`}),O.map(e=>(0,l.jsxs)(`option`,{value:e.id,children:[e.name,` (`,e.email,`)`]},e.id))]})]}),(0,l.jsx)(`button`,{type:`submit`,className:`m-add-btn m-add-btn-green`,style:{width:`100%`,justifyContent:`center`,padding:`12px`,fontSize:`0.95rem`},children:`Save Changes`})]})})]})})]})};export{u as default};