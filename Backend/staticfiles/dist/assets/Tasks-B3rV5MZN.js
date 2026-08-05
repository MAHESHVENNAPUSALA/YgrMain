import{d as e,f as t,i as n,l as r,n as i,r as a,s as o}from"./index-Ct8HV-kW.js";var s=t(e(),1),c=n(),l=()=>{let{user:e}=a(),{showToast:t}=i(),n=e?.role,l=r().state,[u,d]=(0,s.useState)(l?.activeTab||`board`),[f,ee]=(0,s.useState)([]),[p,te]=(0,s.useState)([]),[m,ne]=(0,s.useState)([]),[re,h]=(0,s.useState)(!0),[g,ie]=(0,s.useState)(l?.statusFilter||``),[_,v]=(0,s.useState)(l?.projectFilter||``);(0,s.useEffect)(()=>{l&&(l.activeTab&&d(l.activeTab),l.statusFilter&&ie(l.statusFilter),l.projectFilter&&v(l.projectFilter))},[l]);let[y,b]=(0,s.useState)(``),[x,S]=(0,s.useState)(``),[C,w]=(0,s.useState)(``),[T,E]=(0,s.useState)(``),[D,O]=(0,s.useState)(``),[k,A]=(0,s.useState)([]),[j,ae]=(0,s.useState)([]),[M,N]=(0,s.useState)(!1),[P,F]=(0,s.useState)(``),[I,L]=(0,s.useState)(``),[R,z]=(0,s.useState)(``),[B,V]=(0,s.useState)(``),[H,U]=(0,s.useState)(``),[W,G]=(0,s.useState)(!1),[K,q]=(0,s.useState)(null),[J,oe]=(0,s.useState)(``),[Y,X]=(0,s.useState)(null),Z=async()=>{h(!0);try{if(ee((await o.get(`/api/tasks/`)).data),te((await o.get(`/api/projects/`)).data),ne((await o.get(`/api/daily-reports/`)).data),[`TeamLead`,`Manager`,`HR`,`MD`].includes(n)){let e={};[`TeamLead`,`Manager`].includes(n)&&(e.scope=`team`),ae((await o.get(`/api/users/`,{params:e})).data||[])}}catch(e){console.error(`Error loading task management data:`,e)}finally{h(!1)}};(0,s.useEffect)(()=>{Z()},[]);let se=async e=>{e.preventDefault(),N(!0);try{await o.post(`/api/tasks/`,{task_name:y,description:x,project:C,start_date:T,end_date:D,members:k}),t(`Task assigned successfully.`,`success`),b(``),S(``),w(``),E(``),O(``),A([]),d(`board`),Z()}catch(e){t(e.response?.data?.detail||`Failed to assign task.`,`error`)}finally{N(!1)}},ce=async e=>{e.preventDefault(),G(!0);try{await o.post(`/api/daily-reports/`,{project:P,tasks_completed:I,tasks_in_progress:R,issues:B,plan_for_tomorrow:H}),t(`Daily report submitted.`,`success`),F(``),L(``),z(``),V(``),U(``),Z()}catch(e){t(e.response?.data?.detail||`Failed to submit report.`,`error`)}finally{G(!1)}},le=async e=>{e.preventDefault();try{let e=new FormData;e.append(`status`,`Submitted`),e.append(`remarks`,J),Y&&e.append(`file`,Y),await o.put(`/api/tasks/${K.id}/`,e,{headers:{"Content-Type":`multipart/form-data`}}),t(`Task submitted successfully.`,`success`),q(null),Z()}catch(e){t(e.response?.data?.detail||`Failed to submit task.`,`error`)}},Q=async(e,n)=>{try{await o.put(`/api/tasks/${e}/`,{status:n}),t(`Task status updated to ${n}.`,`success`),Z()}catch(e){t(e.response?.data?.detail||`Failed to update task status.`,`error`)}},$=f.filter(e=>!(_===`active`&&e.project&&e.project.status!==`Active`||g&&e.status!==g));return(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`style`,{children:`
        .task-tabs {
          display: flex;
          gap: 10px;
          border-bottom: 2px solid var(--border);
          margin-bottom: 20px;
        }
        .task-tab {
          padding: 10px 20px;
          cursor: pointer;
          font-weight: 700;
          color: var(--muted);
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: var(--transition-base);
        }
        .task-tab.active {
          color: var(--accent-blue);
          border-bottom-color: var(--accent-blue);
        }
        .task-grid-panel {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .task-grid-panel {
            grid-template-columns: 1fr;
          }
        }
        .report-item {
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 15px;
          text-align: left;
        }
        .report-meta {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 6px;
          margin-bottom: 8px;
          font-size: 12px;
          color: var(--muted);
          font-weight: 600;
        }

        .assign-task-card {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .assign-task-card .panel-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          padding: 20px 24px;
        }
        .assign-task-card .panel-header h2 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .assign-task-card .panel-body {
          padding: 28px;
        }
        .assign-task-card .form-group {
          margin-bottom: 20px;
        }
        .assign-task-card .form-group label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          display: block;
        }
        .assign-task-card .form-group input, 
        .assign-task-card .form-group select, 
        .assign-task-card .form-group textarea {
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
        .assign-task-card .form-group input:focus, 
        .assign-task-card .form-group select:focus, 
        .assign-task-card .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .assign-task-card .btn-submit-premium {
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
        .assign-task-card .btn-submit-premium:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }
        .assign-task-card .btn-submit-premium:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
      `}),(0,c.jsx)(`h2`,{style:{color:`var(--primary-color)`,marginBottom:`20px`,fontFamily:`var(--font-display)`,fontWeight:800},children:`Workspace Tasks & Reports`}),(0,c.jsxs)(`div`,{className:`task-tabs`,children:[(0,c.jsx)(`div`,{className:`task-tab ${u===`board`?`active`:``}`,onClick:()=>d(`board`),children:`📋 Tasks Board`}),(0,c.jsx)(`div`,{className:`task-tab ${u===`daily-reports`?`active`:``}`,onClick:()=>d(`daily-reports`),children:`✍️ Daily Progress Reports`}),[`TeamLead`,`Manager`,`HR`,`MD`].includes(n)&&(0,c.jsx)(`div`,{className:`task-tab ${u===`assign`?`active`:``}`,onClick:()=>d(`assign`),children:`Assign Tasks`})]}),re?(0,c.jsx)(`div`,{children:`Loading workspace registry...`}):(0,c.jsxs)(`div`,{children:[u===`board`&&(0,c.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,c.jsx)(`div`,{className:`panel-header`,children:(0,c.jsx)(`h2`,{children:`Assigned Workspace Tasks`})}),(0,c.jsx)(`div`,{className:`panel-body`,children:(0,c.jsx)(`div`,{className:`table-wrap`,children:(0,c.jsxs)(`table`,{children:[(0,c.jsx)(`thead`,{children:(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`th`,{children:`Task Name`}),(0,c.jsx)(`th`,{children:`Project`}),(0,c.jsx)(`th`,{children:`Start Date`}),(0,c.jsx)(`th`,{children:`End Date`}),(0,c.jsx)(`th`,{children:`Status`}),(0,c.jsx)(`th`,{children:`Actions`})]})}),(0,c.jsx)(`tbody`,{children:$.length>0?$.map(t=>(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{style:{fontWeight:600},children:t.task_name}),(0,c.jsx)(`td`,{children:t.project?.project_name||`General`}),(0,c.jsx)(`td`,{children:t.start_date}),(0,c.jsx)(`td`,{children:t.end_date}),(0,c.jsx)(`td`,{children:(0,c.jsx)(`span`,{className:`badge-capsule ${t.status===`Completed`?`success`:t.status===`Submitted`?`info`:`warning`}`,children:t.status})}),(0,c.jsx)(`td`,{children:t.status===`Pending`?t.members?.some(t=>t.id===e.id)||[`TeamLead`,`Manager`,`HR`,`MD`].includes(n)?(0,c.jsx)(`button`,{className:`view-btn`,onClick:()=>q(t),children:`Submit completion`}):(0,c.jsx)(`span`,{style:{fontSize:`12px`,color:`var(--muted)`},children:`Pending`}):t.status===`Submitted`?[`TeamLead`,`Manager`,`HR`,`MD`].includes(n)?(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,c.jsx)(`button`,{className:`view-btn`,style:{background:`#10b981`,borderColor:`#10b981`,color:`#fff`,padding:`4px 10px`,fontSize:`11px`,borderRadius:`4px`},onClick:()=>Q(t.id,`Completed`),children:`Approve`}),(0,c.jsx)(`button`,{className:`view-btn`,style:{background:`#ef4444`,borderColor:`#ef4444`,color:`#fff`,padding:`4px 10px`,fontSize:`11px`,borderRadius:`4px`},onClick:()=>Q(t.id,`Pending`),children:`Reject`})]}):(0,c.jsx)(`span`,{style:{fontSize:`12px`,color:`#3b82f6`,fontWeight:600},children:`Awaiting Approval`}):(0,c.jsx)(`span`,{style:{fontSize:`12px`,color:`#10b981`,fontWeight:600},children:`Completed`})})]},t.id)):(0,c.jsx)(`tr`,{children:(0,c.jsx)(`td`,{colSpan:`6`,style:{textAlign:`center`,color:`var(--muted)`},children:`No tasks assigned in this scope.`})})})]})})})]}),u===`daily-reports`&&(0,c.jsxs)(`div`,{className:`task-grid-panel`,children:[(0,c.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,c.jsx)(`div`,{className:`panel-header`,children:(0,c.jsx)(`h2`,{children:`Recent Reports List`})}),(0,c.jsx)(`div`,{className:`panel-body`,children:m.length>0?m.map(e=>(0,c.jsxs)(`div`,{className:`report-item`,children:[(0,c.jsxs)(`div`,{className:`report-meta`,children:[(0,c.jsxs)(`span`,{children:[`👤 `,e.user_full_name,` (`,e.user_name,`)`]}),(0,c.jsxs)(`span`,{children:[`📅 `,e.report_date]})]}),(0,c.jsxs)(`div`,{style:{fontSize:`13px`,lineHeight:`1.6`},children:[(0,c.jsxs)(`p`,{children:[(0,c.jsx)(`b`,{children:`Project Scope:`}),` `,e.project_name||`General`]}),(0,c.jsxs)(`p`,{children:[(0,c.jsx)(`b`,{children:`Tasks Completed:`}),` `,e.tasks_completed]}),e.tasks_in_progress&&(0,c.jsxs)(`p`,{children:[(0,c.jsx)(`b`,{children:`Tasks in Progress:`}),` `,e.tasks_in_progress]}),e.issues&&(0,c.jsxs)(`p`,{style:{color:`var(--danger)`},children:[(0,c.jsx)(`b`,{children:`Issues / Bottlenecks:`}),` `,e.issues]}),e.plan_for_tomorrow&&(0,c.jsxs)(`p`,{children:[(0,c.jsx)(`b`,{children:`Tomorrow's Alignment:`}),` `,e.plan_for_tomorrow]})]})]},e.id)):(0,c.jsx)(`p`,{style:{color:`var(--muted)`},children:`No daily status reports submitted.`})})]}),(0,c.jsxs)(`div`,{className:`dashboard-panel-card`,style:{height:`fit-content`},children:[(0,c.jsx)(`div`,{className:`panel-header`,children:(0,c.jsx)(`h2`,{children:`Submit Daily report status`})}),(0,c.jsx)(`div`,{className:`panel-body`,children:(0,c.jsxs)(`form`,{onSubmit:ce,style:{textAlign:`left`},children:[(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Project Scope`}),(0,c.jsxs)(`select`,{value:P,onChange:e=>F(e.target.value),style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`},children:[(0,c.jsx)(`option`,{value:``,children:`General / None`}),p.map(e=>(0,c.jsx)(`option`,{value:e.id,children:e.project_name},e.id))]})]}),(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Tasks Completed Details`}),(0,c.jsx)(`textarea`,{rows:`3`,value:I,onChange:e=>L(e.target.value),required:!0,placeholder:`Description of completed tasks...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Tasks in Progress`}),(0,c.jsx)(`textarea`,{rows:`2`,value:R,onChange:e=>z(e.target.value),placeholder:`Pending modules description...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Issues / Blockers`}),(0,c.jsx)(`textarea`,{rows:`2`,value:B,onChange:e=>V(e.target.value),placeholder:`State blockers if any...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Plan for Tomorrow`}),(0,c.jsx)(`textarea`,{rows:`2`,value:H,onChange:e=>U(e.target.value),placeholder:`Next steps alignment...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,c.jsx)(`button`,{type:`submit`,className:`btn`,disabled:W,style:{width:`100%`},children:W?`Uploading report...`:`Submit Daily Status`})]})})]})]}),u===`assign`&&(0,c.jsxs)(`div`,{className:`assign-task-card`,children:[(0,c.jsx)(`div`,{className:`panel-header`,children:(0,c.jsx)(`h2`,{children:`Assign a new Task`})}),(0,c.jsx)(`div`,{className:`panel-body`,children:(0,c.jsxs)(`form`,{onSubmit:se,style:{textAlign:`left`},children:[(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Task Description Name`}),(0,c.jsx)(`input`,{type:`text`,value:y,onChange:e=>b(e.target.value),required:!0,placeholder:`e.g. Design Dashboard Login layout`})]}),(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Description Details`}),(0,c.jsx)(`textarea`,{rows:`3`,value:x,onChange:e=>S(e.target.value),placeholder:`Detailed parameters...`})]}),(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Project Alignment`}),(0,c.jsxs)(`select`,{value:C,onChange:e=>w(e.target.value),required:!0,children:[(0,c.jsx)(`option`,{value:``,children:`Select Project...`}),p.map(e=>(0,c.jsx)(`option`,{value:e.id,children:e.project_name},e.id))]})]}),(0,c.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`15px`},children:[(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Start Date`}),(0,c.jsx)(`input`,{type:`date`,value:T,onChange:e=>E(e.target.value)})]}),(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`End Date`}),(0,c.jsx)(`input`,{type:`date`,value:D,onChange:e=>O(e.target.value)})]})]}),(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{style:{marginBottom:`10px`,display:`block`},children:`Select Team Members`}),(0,c.jsx)(`div`,{style:{maxHeight:`180px`,overflowY:`auto`,border:`1.5px solid #e2e8f0`,borderRadius:`10px`,padding:`12px`,backgroundColor:`#f8fafc`,display:`flex`,flexDirection:`column`,gap:`10px`},children:j.filter(e=>e.role===`Employee`||e.role===`TeamLead`).length>0?j.filter(e=>e.role===`Employee`||e.role===`TeamLead`).map(e=>(0,c.jsxs)(`label`,{style:{display:`flex`,alignItems:`center`,gap:`10px`,cursor:`pointer`,fontSize:`13.5px`,fontWeight:600,color:`#334155`,margin:0},children:[(0,c.jsx)(`input`,{type:`checkbox`,checked:k.includes(e.id)||k.includes(String(e.id)),onChange:t=>{t.target.checked?A([...k,e.id]):A(k.filter(t=>t!==e.id&&String(t)!==String(e.id)))},style:{width:`18px`,height:`18px`,cursor:`pointer`,accentColor:`#3b82f6`}}),(0,c.jsxs)(`span`,{children:[e.name,` (`,e.role,`)`]})]},e.id)):(0,c.jsx)(`div`,{style:{color:`#94a3b8`,fontSize:`13px`},children:`No team members available.`})})]}),(0,c.jsx)(`button`,{type:`submit`,className:`btn-submit-premium`,disabled:M,children:M?`Assigning tasks...`:`Assign Task`})]})})]})]}),K&&(0,c.jsx)(`div`,{className:`modal-overlay`,children:(0,c.jsxs)(`div`,{className:`modal-container`,children:[(0,c.jsxs)(`div`,{className:`modal-header`,children:[(0,c.jsx)(`h3`,{children:`Submit Task Completion`}),(0,c.jsx)(`button`,{className:`modal-close`,onClick:()=>q(null),children:`×`})]}),(0,c.jsxs)(`form`,{onSubmit:le,style:{textAlign:`left`},children:[(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Task`}),(0,c.jsx)(`input`,{type:`text`,value:K.task_name,disabled:!0,style:{background:`#f1f5f9`}})]}),(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Remarks`}),(0,c.jsx)(`textarea`,{rows:`3`,value:J,onChange:e=>oe(e.target.value),required:!0,placeholder:`Provide status completion remarks details...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Upload Document Proof (Optional)`}),(0,c.jsx)(`input`,{type:`file`,onChange:e=>X(e.target.files[0]),style:{padding:`6px 0`}})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,gap:`10px`,marginTop:`20px`},children:[(0,c.jsx)(`button`,{type:`button`,className:`btn`,style:{background:`#64748b`,marginTop:0},onClick:()=>q(null),children:`Cancel`}),(0,c.jsx)(`button`,{type:`submit`,className:`btn`,style:{marginTop:0},children:`Submit Task`})]})]})]})})]})};export{l as default};