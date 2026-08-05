import{d as e,f as t,i as n,l as r,n as i,r as ee,s as a}from"./index-DvAsNOwO.js";var o=t(e(),1),s=n(),c=()=>{let{user:e}=ee(),{showToast:t}=i(),n=e?.role,c=r().state,[l,u]=(0,o.useState)(c?.activeTab||`board`),[te,ne]=(0,o.useState)([]),[d,f]=(0,o.useState)([]),[p,m]=(0,o.useState)([]),[h,g]=(0,o.useState)(!0),[_,v]=(0,o.useState)(c?.statusFilter||``),[y,b]=(0,o.useState)(c?.projectFilter||``);(0,o.useEffect)(()=>{c&&(c.activeTab&&u(c.activeTab),c.statusFilter&&v(c.statusFilter),c.projectFilter&&b(c.projectFilter))},[c]);let[x,S]=(0,o.useState)(``),[C,w]=(0,o.useState)(``),[T,E]=(0,o.useState)(``),[D,O]=(0,o.useState)(``),[k,A]=(0,o.useState)(``),[j,M]=(0,o.useState)([]),[re,N]=(0,o.useState)([]),[P,F]=(0,o.useState)(!1),[I,L]=(0,o.useState)(``),[R,z]=(0,o.useState)(``),[B,V]=(0,o.useState)(``),[H,U]=(0,o.useState)(``),[W,G]=(0,o.useState)(``),[K,q]=(0,o.useState)(!1),[J,Y]=(0,o.useState)(null),[X,ie]=(0,o.useState)(``),[Z,ae]=(0,o.useState)(null),Q=async()=>{g(!0);try{ne((await a.get(`/api/tasks/`)).data),f((await a.get(`/api/projects/`)).data),m((await a.get(`/api/daily-reports/`)).data),[`TeamLead`,`Manager`,`HR`,`MD`].includes(n)&&N((await a.get(`/api/users/`)).data||[])}catch(e){console.error(`Error loading task management data:`,e)}finally{g(!1)}};(0,o.useEffect)(()=>{Q()},[]);let oe=async e=>{e.preventDefault(),F(!0);try{await a.post(`/api/tasks/`,{task_name:x,description:C,project:T,start_date:D,end_date:k,members:j}),t(`Task assigned successfully.`,`success`),S(``),w(``),E(``),O(``),A(``),M([]),u(`board`),Q()}catch(e){t(e.response?.data?.detail||`Failed to assign task.`,`error`)}finally{F(!1)}},se=async e=>{e.preventDefault(),q(!0);try{await a.post(`/api/daily-reports/`,{project:I,tasks_completed:R,tasks_in_progress:B,issues:H,plan_for_tomorrow:W}),t(`Daily report submitted.`,`success`),L(``),z(``),V(``),U(``),G(``),Q()}catch(e){t(e.response?.data?.detail||`Failed to submit report.`,`error`)}finally{q(!1)}},ce=async e=>{e.preventDefault();try{let e=new FormData;e.append(`status`,`Submitted`),e.append(`remarks`,X),Z&&e.append(`file`,Z),await a.put(`/api/tasks/${J.id}/`,e,{headers:{"Content-Type":`multipart/form-data`}}),t(`Task submitted successfully.`,`success`),Y(null),Q()}catch(e){t(e.response?.data?.detail||`Failed to submit task.`,`error`)}},le=e=>{M(Array.from(e.target.selectedOptions,e=>e.value))},$=te.filter(e=>!(y===`active`&&e.project&&e.project.status!==`Active`||_&&e.status!==_));return(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`style`,{children:`
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
      `}),(0,s.jsx)(`h2`,{style:{color:`var(--primary-color)`,marginBottom:`20px`,fontFamily:`var(--font-display)`,fontWeight:800},children:`Workspace Tasks & Reports`}),(0,s.jsxs)(`div`,{className:`task-tabs`,children:[(0,s.jsx)(`div`,{className:`task-tab ${l===`board`?`active`:``}`,onClick:()=>u(`board`),children:`📋 Tasks Board`}),(0,s.jsx)(`div`,{className:`task-tab ${l===`daily-reports`?`active`:``}`,onClick:()=>u(`daily-reports`),children:`✍️ Daily Progress Reports`}),[`TeamLead`,`Manager`,`HR`,`MD`].includes(n)&&(0,s.jsx)(`div`,{className:`task-tab ${l===`assign`?`active`:``}`,onClick:()=>u(`assign`),children:`Assign Tasks`})]}),h?(0,s.jsx)(`div`,{children:`Loading workspace registry...`}):(0,s.jsxs)(`div`,{children:[l===`board`&&(0,s.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,s.jsx)(`div`,{className:`panel-header`,children:(0,s.jsx)(`h2`,{children:`Assigned Workspace Tasks`})}),(0,s.jsx)(`div`,{className:`panel-body`,children:(0,s.jsx)(`div`,{className:`table-wrap`,children:(0,s.jsxs)(`table`,{children:[(0,s.jsx)(`thead`,{children:(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`th`,{children:`Task Name`}),(0,s.jsx)(`th`,{children:`Project`}),(0,s.jsx)(`th`,{children:`Start Date`}),(0,s.jsx)(`th`,{children:`End Date`}),(0,s.jsx)(`th`,{children:`Status`}),(0,s.jsx)(`th`,{children:`Actions`})]})}),(0,s.jsx)(`tbody`,{children:$.length>0?$.map(e=>(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`td`,{style:{fontWeight:600},children:e.task_name}),(0,s.jsx)(`td`,{children:e.project?.project_name||`General`}),(0,s.jsx)(`td`,{children:e.start_date}),(0,s.jsx)(`td`,{children:e.end_date}),(0,s.jsx)(`td`,{children:(0,s.jsx)(`span`,{className:`badge-capsule ${e.status===`Completed`?`success`:e.status===`Submitted`?`info`:`warning`}`,children:e.status})}),(0,s.jsx)(`td`,{children:e.status===`Pending`?(0,s.jsx)(`button`,{className:`view-btn`,onClick:()=>Y(e),children:`Submit completion`}):(0,s.jsx)(`span`,{style:{fontSize:`12px`,color:`var(--muted)`},children:`Finalized`})})]},e.id)):(0,s.jsx)(`tr`,{children:(0,s.jsx)(`td`,{colSpan:`6`,style:{textAlign:`center`,color:`var(--muted)`},children:`No tasks assigned in this scope.`})})})]})})})]}),l===`daily-reports`&&(0,s.jsxs)(`div`,{className:`task-grid-panel`,children:[(0,s.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,s.jsx)(`div`,{className:`panel-header`,children:(0,s.jsx)(`h2`,{children:`Recent Reports List`})}),(0,s.jsx)(`div`,{className:`panel-body`,children:p.length>0?p.map(e=>(0,s.jsxs)(`div`,{className:`report-item`,children:[(0,s.jsxs)(`div`,{className:`report-meta`,children:[(0,s.jsxs)(`span`,{children:[`👤 `,e.user_full_name,` (`,e.user_name,`)`]}),(0,s.jsxs)(`span`,{children:[`📅 `,e.report_date]})]}),(0,s.jsxs)(`div`,{style:{fontSize:`13px`,lineHeight:`1.6`},children:[(0,s.jsxs)(`p`,{children:[(0,s.jsx)(`b`,{children:`Project Scope:`}),` `,e.project_name||`General`]}),(0,s.jsxs)(`p`,{children:[(0,s.jsx)(`b`,{children:`Tasks Completed:`}),` `,e.tasks_completed]}),e.tasks_in_progress&&(0,s.jsxs)(`p`,{children:[(0,s.jsx)(`b`,{children:`Tasks in Progress:`}),` `,e.tasks_in_progress]}),e.issues&&(0,s.jsxs)(`p`,{style:{color:`var(--danger)`},children:[(0,s.jsx)(`b`,{children:`Issues / Bottlenecks:`}),` `,e.issues]}),e.plan_for_tomorrow&&(0,s.jsxs)(`p`,{children:[(0,s.jsx)(`b`,{children:`Tomorrow's Alignment:`}),` `,e.plan_for_tomorrow]})]})]},e.id)):(0,s.jsx)(`p`,{style:{color:`var(--muted)`},children:`No daily status reports submitted.`})})]}),(0,s.jsxs)(`div`,{className:`dashboard-panel-card`,style:{height:`fit-content`},children:[(0,s.jsx)(`div`,{className:`panel-header`,children:(0,s.jsx)(`h2`,{children:`Submit Daily report status`})}),(0,s.jsx)(`div`,{className:`panel-body`,children:(0,s.jsxs)(`form`,{onSubmit:se,style:{textAlign:`left`},children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Project Scope`}),(0,s.jsxs)(`select`,{value:I,onChange:e=>L(e.target.value),style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`},children:[(0,s.jsx)(`option`,{value:``,children:`General / None`}),d.map(e=>(0,s.jsx)(`option`,{value:e.id,children:e.project_name},e.id))]})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Tasks Completed Details`}),(0,s.jsx)(`textarea`,{rows:`3`,value:R,onChange:e=>z(e.target.value),required:!0,placeholder:`Description of completed tasks...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Tasks in Progress`}),(0,s.jsx)(`textarea`,{rows:`2`,value:B,onChange:e=>V(e.target.value),placeholder:`Pending modules description...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Issues / Blockers`}),(0,s.jsx)(`textarea`,{rows:`2`,value:H,onChange:e=>U(e.target.value),placeholder:`State blockers if any...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Plan for Tomorrow`}),(0,s.jsx)(`textarea`,{rows:`2`,value:W,onChange:e=>G(e.target.value),placeholder:`Next steps alignment...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsx)(`button`,{type:`submit`,className:`btn`,disabled:K,style:{width:`100%`},children:K?`Uploading report...`:`Submit Daily Status`})]})})]})]}),l===`assign`&&(0,s.jsxs)(`div`,{className:`assign-task-card`,children:[(0,s.jsx)(`div`,{className:`panel-header`,children:(0,s.jsx)(`h2`,{children:`Assign a new Task`})}),(0,s.jsx)(`div`,{className:`panel-body`,children:(0,s.jsxs)(`form`,{onSubmit:oe,style:{textAlign:`left`},children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Task Description Name`}),(0,s.jsx)(`input`,{type:`text`,value:x,onChange:e=>S(e.target.value),required:!0,placeholder:`e.g. Design Dashboard Login layout`})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Description Details`}),(0,s.jsx)(`textarea`,{rows:`3`,value:C,onChange:e=>w(e.target.value),placeholder:`Detailed parameters...`})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Project Alignment`}),(0,s.jsxs)(`select`,{value:T,onChange:e=>E(e.target.value),required:!0,children:[(0,s.jsx)(`option`,{value:``,children:`Select Project...`}),d.map(e=>(0,s.jsx)(`option`,{value:e.id,children:e.project_name},e.id))]})]}),(0,s.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`15px`},children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Start Date`}),(0,s.jsx)(`input`,{type:`date`,value:D,onChange:e=>O(e.target.value)})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`End Date`}),(0,s.jsx)(`input`,{type:`date`,value:k,onChange:e=>A(e.target.value)})]})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Select Team Members (Hold Ctrl to choose multiple)`}),(0,s.jsx)(`select`,{multiple:!0,value:j,onChange:le,style:{height:`140px`},children:re.filter(e=>e.role===`Employee`||e.role===`TeamLead`).map(e=>(0,s.jsxs)(`option`,{value:e.id,children:[e.name,` (`,e.role,`)`]},e.id))})]}),(0,s.jsx)(`button`,{type:`submit`,className:`btn-submit-premium`,disabled:P,children:P?`Assigning tasks...`:`Assign Task`})]})})]})]}),J&&(0,s.jsx)(`div`,{className:`modal-overlay`,children:(0,s.jsxs)(`div`,{className:`modal-container`,children:[(0,s.jsxs)(`div`,{className:`modal-header`,children:[(0,s.jsx)(`h3`,{children:`Submit Task Completion`}),(0,s.jsx)(`button`,{className:`modal-close`,onClick:()=>Y(null),children:`×`})]}),(0,s.jsxs)(`form`,{onSubmit:ce,style:{textAlign:`left`},children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Task`}),(0,s.jsx)(`input`,{type:`text`,value:J.task_name,disabled:!0,style:{background:`#f1f5f9`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Remarks`}),(0,s.jsx)(`textarea`,{rows:`3`,value:X,onChange:e=>ie(e.target.value),required:!0,placeholder:`Provide status completion remarks details...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Upload Document Proof (Optional)`}),(0,s.jsx)(`input`,{type:`file`,onChange:e=>ae(e.target.files[0]),style:{padding:`6px 0`}})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,gap:`10px`,marginTop:`20px`},children:[(0,s.jsx)(`button`,{type:`button`,className:`btn`,style:{background:`#64748b`,marginTop:0},onClick:()=>Y(null),children:`Cancel`}),(0,s.jsx)(`button`,{type:`submit`,className:`btn`,style:{marginTop:0},children:`Submit Task`})]})]})]})})]})};export{c as default};