import{a as e,c as t,f as n,i as r,m as i,p as a,u as ee}from"./index-ctn_Gl-w.js";var o=i(n(),1),s=a(),c=()=>{let{user:n}=e(),{showToast:i}=r(),a=n?.role,c=ee().state,[l,u]=(0,o.useState)(c?.activeTab||`board`),[te,ne]=(0,o.useState)([]),[d,re]=(0,o.useState)([]),[f,ie]=(0,o.useState)([]),[ae,p]=(0,o.useState)(!0),[m,oe]=(0,o.useState)(c?.statusFilter||``),[se,ce]=(0,o.useState)(c?.projectFilter||``);(0,o.useEffect)(()=>{c&&(c.activeTab&&u(c.activeTab),c.statusFilter&&oe(c.statusFilter),c.projectFilter&&ce(c.projectFilter))},[c]);let[h,g]=(0,o.useState)(``),[_,v]=(0,o.useState)(``),[y,b]=(0,o.useState)(``),[x,S]=(0,o.useState)(``),[C,w]=(0,o.useState)(``),[T,E]=(0,o.useState)([]),[D,le]=(0,o.useState)([]),[O,k]=(0,o.useState)(!1),[A,j]=(0,o.useState)(``),[M,N]=(0,o.useState)(``),[P,F]=(0,o.useState)(``),[I,ue]=(0,o.useState)(``),[L,R]=(0,o.useState)(``),[z,B]=(0,o.useState)(!1),[V,H]=(0,o.useState)(null),[U,W]=(0,o.useState)(null),[G,de]=(0,o.useState)(``),[K,fe]=(0,o.useState)(null),[q,J]=(0,o.useState)(null),[Y,X]=(0,o.useState)(``),[Z,pe]=(0,o.useState)(``),Q=async()=>{p(!0);try{if(ne((await t.get(`/api/tasks/`)).data),re((await t.get(`/api/projects/`)).data),ie((await t.get(`/api/daily-reports/`)).data),[`TeamLead`,`Manager`,`HR`,`MD`].includes(a)){let e={};[`TeamLead`,`Manager`].includes(a)&&(e.scope=`team`),le((await t.get(`/api/users/`,{params:e})).data||[])}}catch(e){console.error(`Error loading task management data:`,e)}finally{p(!1)}};(0,o.useEffect)(()=>{Q()},[]);let me=async e=>{e.preventDefault(),k(!0);try{await t.post(`/api/tasks/`,{task_name:h,description:_,project:y,start_date:x,end_date:C,members:T}),i(`Task assigned successfully.`,`success`),g(``),v(``),b(``),S(``),w(``),E([]),u(`board`),Q()}catch(e){i(e.response?.data?.detail||`Failed to assign task.`,`error`)}finally{k(!1)}},he=async e=>{e.preventDefault(),B(!0);try{await t.post(`/api/daily-reports/`,{project:A,tasks_completed:M,tasks_in_progress:P,issues:I,plan_for_tomorrow:L}),i(`Daily report submitted.`,`success`),j(``),N(``),F(``),ue(``),R(``),Q()}catch(e){i(e.response?.data?.detail||`Failed to submit report.`,`error`)}finally{B(!1)}},ge=async e=>{e.preventDefault();try{let e=new FormData;e.append(`status`,`Submitted`),e.append(`remarks`,G),K&&e.append(`file`,K),await t.put(`/api/tasks/${V.id}/`,e,{headers:{"Content-Type":`multipart/form-data`}}),i(`Task submitted successfully.`,`success`),H(null),Q()}catch(e){i(e.response?.data?.detail||`Failed to submit task.`,`error`)}},_e=async(e,n)=>{try{await t.put(`/api/tasks/${e}/`,{status:n}),i(`Task status updated to ${n}.`,`success`),Q()}catch(e){i(e.response?.data?.detail||`Failed to update task status.`,`error`)}},ve=async(e,n)=>{try{await t.post(`/api/tasks/${e}/review/`,{action:n,score:100,remarks:`Reviewed from task board.`}),i(`Task ${n===`submit_to_manager`?`approved`:`returned`}.`,`success`),Q()}catch(e){i(e.response?.data?.detail||`Failed to process task review.`,`error`)}},ye=async e=>{if(e.preventDefault(),q)try{await t.post(`/api/tasks/${q.id}/extension/`,{reason:Y,requested_hours:Z}),i(`Extension requested successfully.`,`success`),J(null),X(``),pe(``),Q()}catch(e){i(e.response?.data?.detail||`Failed to request extension.`,`error`)}},$=te.filter(e=>!(se===`active`&&e.project&&e.project.status!==`Active`||m&&e.status!==m));return(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`style`,{children:`
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

        .task-cards-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .task-square-card {
          width: calc(33.333% - 14px);
          min-width: 280px;
          min-height: 250px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        @media (max-width: 1024px) {
          .task-square-card {
            width: calc(50% - 10px);
          }
        }
        @media (max-width: 640px) {
          .task-square-card {
            width: 100%;
          }
        }
        .task-square-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .task-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .task-card-title {
          font-weight: 700;
          font-size: 1.15rem;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .task-card-project {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 600;
        }
        .task-card-dates {
          background: #f8fafc;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 0.85rem;
          color: #475569;
          border: 1px solid #f1f5f9;
        }
        .task-card-dates div {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .task-card-dates div:last-child {
          margin-bottom: 0;
        }
        .task-card-actions {
          margin-top: auto;
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid #f1f5f9;
          padding-top: 15px;
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
      `}),(0,s.jsx)(`h2`,{style:{color:`var(--primary-color)`,marginBottom:`20px`,fontFamily:`var(--font-display)`,fontWeight:800},children:`Workspace Tasks & Reports`}),(0,s.jsxs)(`div`,{className:`task-tabs`,children:[(0,s.jsx)(`div`,{className:`task-tab ${l===`board`?`active`:``}`,onClick:()=>u(`board`),children:`📋 Tasks Board`}),(0,s.jsx)(`div`,{className:`task-tab ${l===`daily-reports`?`active`:``}`,onClick:()=>u(`daily-reports`),children:`✍️ Daily Progress Reports`}),[`TeamLead`,`Manager`,`HR`,`MD`].includes(a)&&(0,s.jsx)(`div`,{className:`task-tab ${l===`assign`?`active`:``}`,onClick:()=>u(`assign`),children:`Assign Tasks`})]}),ae?(0,s.jsx)(`div`,{children:`Loading workspace registry...`}):(0,s.jsxs)(`div`,{children:[l===`board`&&(0,s.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,s.jsx)(`div`,{className:`panel-header`,children:(0,s.jsx)(`h2`,{children:`Assigned Workspace Tasks`})}),(0,s.jsx)(`div`,{className:`panel-body`,children:(0,s.jsxs)(`div`,{style:{padding:`10px 0`},children:[(0,s.jsx)(`h3`,{style:{marginBottom:`20px`,color:`#334155`,borderBottom:`2px solid #e2e8f0`,paddingBottom:`10px`,fontSize:`1.2rem`,fontWeight:700},children:`Pending & Assigned Tasks`}),(0,s.jsx)(`div`,{className:`task-cards-row`,children:$.filter(e=>e.status!==`Completed`).length>0?$.filter(e=>e.status!==`Completed`).map(e=>{let t=new Date().toISOString().split(`T`)[0],r=!e.start_date||t>=e.start_date;return(0,s.jsxs)(`div`,{className:`task-square-card`,onClick:()=>W(e),style:{cursor:`pointer`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`div`,{className:`task-card-header`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`task-card-title`,children:e.task_name}),(0,s.jsxs)(`div`,{className:`task-card-project`,children:[`📂 `,e.project?.project_name||`General`]})]}),(0,s.jsx)(`span`,{className:`badge-capsule ${e.status===`Submitted`?`info`:`warning`}`,children:e.status})]}),(0,s.jsxs)(`div`,{className:`task-card-dates`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`span`,{children:`Start Date:`}),` `,(0,s.jsx)(`strong`,{children:e.start_date||`N/A`})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`span`,{children:`End Date:`}),` `,(0,s.jsx)(`strong`,{children:e.end_date||`N/A`})]})]}),e.description&&(0,s.jsx)(`div`,{style:{fontSize:`0.85rem`,color:`#64748b`,marginBottom:`15px`,display:`-webkit-box`,WebkitLineClamp:3,WebkitBoxOrient:`vertical`,overflow:`hidden`},children:e.description})]}),(0,s.jsx)(`div`,{className:`task-card-actions`,children:e.status===`Pending`?e.members?.some(e=>e.id===n.id)||[`TeamLead`,`Manager`,`HR`,`MD`].includes(a)?r?(0,s.jsx)(`button`,{className:`view-btn`,style:{width:`100%`,textAlign:`center`,background:`#3b82f6`,color:`#fff`,borderColor:`#3b82f6`},onClick:t=>{t.stopPropagation(),_e(e.id,`In Progress`)},children:`Start Task`}):(0,s.jsxs)(`span`,{style:{fontSize:`12px`,color:`var(--muted)`,background:`#f8fafc`,padding:`8px`,borderRadius:`6px`,width:`100%`,textAlign:`center`,display:`block`},children:[`Starts on `,e.start_date]}):(0,s.jsx)(`span`,{style:{fontSize:`12px`,color:`var(--muted)`},children:`Pending`}):e.status===`In Progress`?e.members?.some(e=>e.id===n.id)||[`TeamLead`,`Manager`,`HR`,`MD`].includes(a)?(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,width:`100%`},children:[(0,s.jsx)(`button`,{className:`view-btn`,style:{flex:1,textAlign:`center`,background:`#f59e0b`,color:`#fff`,borderColor:`#f59e0b`,padding:`8px`,fontSize:`12px`,borderRadius:`6px`},onClick:t=>{t.stopPropagation(),J(e)},children:`Extend`}),(0,s.jsx)(`button`,{className:`view-btn`,style:{flex:1,textAlign:`center`,background:`#10b981`,color:`#fff`,borderColor:`#10b981`,padding:`8px`,fontSize:`12px`,borderRadius:`6px`},onClick:t=>{t.stopPropagation(),H(e)},children:`Submit`})]}):(0,s.jsx)(`span`,{style:{fontSize:`12px`,color:`#f59e0b`,fontWeight:600},children:`In Progress`}):e.status===`Submitted`?[`TeamLead`,`Manager`,`HR`,`MD`].includes(a)?(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,width:`100%`},children:[(0,s.jsx)(`button`,{className:`view-btn`,style:{flex:1,background:`#10b981`,borderColor:`#10b981`,color:`#fff`,padding:`8px 10px`,fontSize:`12px`,borderRadius:`6px`},onClick:t=>{t.stopPropagation(),ve(e.id,`submit_to_manager`)},children:`Approve`}),(0,s.jsx)(`button`,{className:`view-btn`,style:{flex:1,background:`#ef4444`,borderColor:`#ef4444`,color:`#fff`,padding:`8px 10px`,fontSize:`12px`,borderRadius:`6px`},onClick:t=>{t.stopPropagation(),ve(e.id,`return_to_employee`)},children:`Return`})]}):(0,s.jsx)(`span`,{style:{fontSize:`12px`,color:`#3b82f6`,fontWeight:600},children:`Awaiting Approval`}):null})]},e.id)}):(0,s.jsx)(`p`,{style:{color:`var(--muted)`,width:`100%`,padding:`20px 0`},children:`No pending tasks assigned in this scope.`})}),(0,s.jsx)(`h3`,{style:{marginTop:`40px`,marginBottom:`20px`,color:`#10b981`,borderBottom:`2px solid #e2e8f0`,paddingBottom:`10px`,fontSize:`1.2rem`,fontWeight:700},children:`Completed Tasks`}),(0,s.jsx)(`div`,{className:`task-cards-row`,children:$.filter(e=>e.status===`Completed`).length>0?$.filter(e=>e.status===`Completed`).map(e=>(0,s.jsxs)(`div`,{className:`task-square-card`,style:{opacity:.85,borderLeft:`4px solid #10b981`,cursor:`pointer`},onClick:()=>W(e),children:[(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`div`,{className:`task-card-header`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`task-card-title`,style:{textDecoration:`line-through`,color:`#64748b`},children:e.task_name}),(0,s.jsxs)(`div`,{className:`task-card-project`,children:[`📂 `,e.project?.project_name||`General`]})]}),(0,s.jsx)(`span`,{className:`badge-capsule success`,children:`Completed`})]}),(0,s.jsxs)(`div`,{className:`task-card-dates`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`span`,{children:`Start Date:`}),` `,(0,s.jsx)(`strong`,{children:e.start_date||`N/A`})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`span`,{children:`End Date:`}),` `,(0,s.jsx)(`strong`,{children:e.end_date||`N/A`})]})]})]}),(0,s.jsx)(`div`,{className:`task-card-actions`,children:(0,s.jsx)(`span`,{style:{fontSize:`13px`,color:`#10b981`,fontWeight:700,width:`100%`,textAlign:`center`,background:`#d1fae5`,padding:`8px`,borderRadius:`6px`},children:`✓ Task Completed`})})]},e.id)):(0,s.jsx)(`p`,{style:{color:`var(--muted)`,width:`100%`,padding:`20px 0`},children:`No completed tasks.`})})]})})]}),l===`daily-reports`&&(0,s.jsxs)(`div`,{className:`task-grid-panel`,children:[(0,s.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,s.jsx)(`div`,{className:`panel-header`,children:(0,s.jsx)(`h2`,{children:`Recent Reports List`})}),(0,s.jsx)(`div`,{className:`panel-body`,children:f.length>0?f.map(e=>(0,s.jsxs)(`div`,{className:`report-item`,children:[(0,s.jsxs)(`div`,{className:`report-meta`,children:[(0,s.jsxs)(`span`,{children:[`👤 `,e.user_full_name,` (`,e.user_name,`)`]}),(0,s.jsxs)(`span`,{children:[`📅 `,e.report_date]})]}),(0,s.jsxs)(`div`,{style:{fontSize:`13px`,lineHeight:`1.6`},children:[(0,s.jsxs)(`p`,{children:[(0,s.jsx)(`b`,{children:`Project Scope:`}),` `,e.project_name||`General`]}),(0,s.jsxs)(`p`,{children:[(0,s.jsx)(`b`,{children:`Tasks Completed:`}),` `,e.tasks_completed]}),e.tasks_in_progress&&(0,s.jsxs)(`p`,{children:[(0,s.jsx)(`b`,{children:`Tasks in Progress:`}),` `,e.tasks_in_progress]}),e.issues&&(0,s.jsxs)(`p`,{style:{color:`var(--danger)`},children:[(0,s.jsx)(`b`,{children:`Issues / Bottlenecks:`}),` `,e.issues]}),e.plan_for_tomorrow&&(0,s.jsxs)(`p`,{children:[(0,s.jsx)(`b`,{children:`Tomorrow's Alignment:`}),` `,e.plan_for_tomorrow]})]})]},e.id)):(0,s.jsx)(`p`,{style:{color:`var(--muted)`},children:`No daily status reports submitted.`})})]}),(0,s.jsxs)(`div`,{className:`dashboard-panel-card`,style:{height:`fit-content`},children:[(0,s.jsx)(`div`,{className:`panel-header`,children:(0,s.jsx)(`h2`,{children:`Submit Daily report status`})}),(0,s.jsx)(`div`,{className:`panel-body`,children:(0,s.jsxs)(`form`,{onSubmit:he,style:{textAlign:`left`},children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Project Scope`}),(0,s.jsxs)(`select`,{value:A,onChange:e=>j(e.target.value),style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`},children:[(0,s.jsx)(`option`,{value:``,children:`General / None`}),d.map(e=>(0,s.jsx)(`option`,{value:e.id,children:e.project_name},e.id))]})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Tasks Completed Details`}),(0,s.jsx)(`textarea`,{rows:`3`,value:M,onChange:e=>N(e.target.value),required:!0,placeholder:`Description of completed tasks...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Tasks in Progress`}),(0,s.jsx)(`textarea`,{rows:`2`,value:P,onChange:e=>F(e.target.value),placeholder:`Pending modules description...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Issues / Blockers`}),(0,s.jsx)(`textarea`,{rows:`2`,value:I,onChange:e=>ue(e.target.value),placeholder:`State blockers if any...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Plan for Tomorrow`}),(0,s.jsx)(`textarea`,{rows:`2`,value:L,onChange:e=>R(e.target.value),placeholder:`Next steps alignment...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsx)(`button`,{type:`submit`,className:`btn`,disabled:z,style:{width:`100%`},children:z?`Uploading report...`:`Submit Daily Status`})]})})]})]}),l===`assign`&&(0,s.jsxs)(`div`,{className:`assign-task-card`,children:[(0,s.jsx)(`div`,{className:`panel-header`,children:(0,s.jsx)(`h2`,{children:`Assign a new Task`})}),(0,s.jsx)(`div`,{className:`panel-body`,children:(0,s.jsxs)(`form`,{onSubmit:me,style:{textAlign:`left`},children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Task Description Name`}),(0,s.jsx)(`input`,{type:`text`,value:h,onChange:e=>g(e.target.value),required:!0,placeholder:`e.g. Design Dashboard Login layout`})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Description Details`}),(0,s.jsx)(`textarea`,{rows:`3`,value:_,onChange:e=>v(e.target.value),placeholder:`Detailed parameters...`})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Project Alignment`}),(0,s.jsxs)(`select`,{value:y,onChange:e=>b(e.target.value),required:!0,children:[(0,s.jsx)(`option`,{value:``,children:`Select Project...`}),d.map(e=>(0,s.jsx)(`option`,{value:e.id,children:e.project_name},e.id))]})]}),(0,s.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`15px`},children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Start Date`}),(0,s.jsx)(`input`,{type:`date`,value:x,onChange:e=>S(e.target.value)})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`End Date`}),(0,s.jsx)(`input`,{type:`date`,value:C,onChange:e=>w(e.target.value)})]})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{style:{marginBottom:`10px`,display:`block`},children:`Select Team Members`}),(0,s.jsx)(`div`,{style:{maxHeight:`180px`,overflowY:`auto`,border:`1.5px solid #e2e8f0`,borderRadius:`10px`,padding:`12px`,backgroundColor:`#f8fafc`,display:`flex`,flexDirection:`column`,gap:`10px`},children:D.filter(e=>{if(a===`HR`)return e.role===`Manager`;if(a===`Manager`)return e.role===`TeamLead`;if(a===`TeamLead`){if(e.role!==`Employee`)return!1;if(y){let t=d.find(e=>String(e.id)===String(y));if(t&&t.assigned_team_member_ids&&t.assigned_team_member_ids.length>0)return t.assigned_team_member_ids.includes(e.id)}return!0}return!0}).length>0?D.filter(e=>{if(a===`HR`)return e.role===`Manager`;if(a===`Manager`)return e.role===`TeamLead`;if(a===`TeamLead`){if(e.role!==`Employee`)return!1;if(y){let t=d.find(e=>String(e.id)===String(y));if(t&&t.assigned_team_member_ids&&t.assigned_team_member_ids.length>0)return t.assigned_team_member_ids.includes(e.id)}return!0}return!0}).map(e=>(0,s.jsxs)(`label`,{style:{display:`flex`,alignItems:`center`,gap:`10px`,cursor:`pointer`,fontSize:`13.5px`,fontWeight:600,color:`#334155`,margin:0},children:[(0,s.jsx)(`input`,{type:`checkbox`,checked:T.includes(e.id)||T.includes(String(e.id)),onChange:t=>{t.target.checked?E([...T,e.id]):E(T.filter(t=>t!==e.id&&String(t)!==String(e.id)))},style:{width:`18px`,height:`18px`,cursor:`pointer`,accentColor:`#3b82f6`}}),(0,s.jsxs)(`span`,{children:[e.name,` (`,e.role,`)`]})]},e.id)):(0,s.jsx)(`div`,{style:{color:`#94a3b8`,fontSize:`13px`},children:`No team members available.`})})]}),(0,s.jsx)(`button`,{type:`submit`,className:`btn-submit-premium`,disabled:O,children:O?`Assigning tasks...`:`Assign Task`})]})})]})]}),V&&(0,s.jsx)(`div`,{className:`modal-overlay`,children:(0,s.jsxs)(`div`,{className:`modal-container`,children:[(0,s.jsxs)(`div`,{className:`modal-header`,children:[(0,s.jsx)(`h3`,{children:`Submit Task Completion`}),(0,s.jsx)(`button`,{className:`modal-close`,onClick:()=>H(null),children:`×`})]}),(0,s.jsxs)(`form`,{onSubmit:ge,style:{textAlign:`left`},children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Task`}),(0,s.jsx)(`input`,{type:`text`,value:V.task_name,disabled:!0,style:{background:`#f1f5f9`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Remarks`}),(0,s.jsx)(`textarea`,{rows:`3`,value:G,onChange:e=>de(e.target.value),required:!0,placeholder:`Provide status completion remarks details...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Upload Document Proof (Optional)`}),(0,s.jsx)(`input`,{type:`file`,onChange:e=>fe(e.target.files[0]),style:{padding:`6px 0`}})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,gap:`10px`,marginTop:`20px`},children:[(0,s.jsx)(`button`,{type:`button`,className:`btn`,style:{background:`#64748b`,marginTop:0},onClick:()=>H(null),children:`Cancel`}),(0,s.jsx)(`button`,{type:`submit`,className:`btn`,style:{marginTop:0},children:`Submit Task`})]})]})]})}),U&&(0,s.jsx)(`div`,{className:`modal-overlay`,onClick:()=>W(null),children:(0,s.jsxs)(`div`,{className:`modal-container`,onClick:e=>e.stopPropagation(),style:{maxWidth:`600px`,animation:`slideUp 0.3s ease`},children:[(0,s.jsxs)(`div`,{className:`modal-header`,children:[(0,s.jsx)(`h3`,{children:`Task Overview`}),(0,s.jsx)(`button`,{className:`modal-close`,onClick:()=>W(null),children:`×`})]}),(0,s.jsxs)(`div`,{className:`modal-body`,style:{textAlign:`left`,padding:`24px`},children:[(0,s.jsx)(`h4`,{style:{fontSize:`1.25rem`,color:`#0f172a`,marginBottom:`10px`},children:U.task_name}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`10px`,marginBottom:`20px`},children:[(0,s.jsx)(`span`,{className:`badge-capsule ${U.status===`Completed`?`success`:U.status===`Submitted`?`info`:`warning`}`,children:U.status}),(0,s.jsxs)(`span`,{className:`badge-capsule`,style:{background:`#e0e7ff`,color:`#4338ca`},children:[`📂 `,U.project?.project_name||`General`]})]}),(0,s.jsxs)(`div`,{style:{background:`#f8fafc`,padding:`16px`,borderRadius:`8px`,border:`1px solid #e2e8f0`,marginBottom:`20px`},children:[(0,s.jsx)(`h5`,{style:{fontSize:`0.85rem`,color:`#64748b`,textTransform:`uppercase`,marginBottom:`8px`},children:`Description`}),(0,s.jsx)(`p`,{style:{fontSize:`0.95rem`,color:`#334155`,lineHeight:`1.5`,whiteSpace:`pre-wrap`},children:U.description||`No description provided.`})]}),(0,s.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`20px`,background:`#ffffff`,border:`1px solid #e2e8f0`,borderRadius:`8px`,padding:`20px`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`#94a3b8`,textTransform:`uppercase`,fontWeight:700,display:`block`,marginBottom:`6px`},children:`Start Date`}),(0,s.jsx)(`span`,{style:{fontSize:`0.95rem`,color:`#1e293b`,fontWeight:600},children:U.start_date||`N/A`})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`#94a3b8`,textTransform:`uppercase`,fontWeight:700,display:`block`,marginBottom:`6px`},children:`Deadline`}),(0,s.jsx)(`span`,{style:{fontSize:`0.95rem`,color:`#ef4444`,fontWeight:600},children:U.end_date||`N/A`})]}),U.members&&U.members.length>0&&(0,s.jsxs)(`div`,{style:{gridColumn:`span 2`},children:[(0,s.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`#94a3b8`,textTransform:`uppercase`,fontWeight:700,display:`block`,marginBottom:`10px`},children:`Assigned Members`}),(0,s.jsx)(`div`,{style:{display:`flex`,gap:`8px`,flexWrap:`wrap`},children:U.members.map(e=>(0,s.jsxs)(`span`,{style:{background:`#f1f5f9`,color:`#334155`,padding:`6px 12px`,borderRadius:`6px`,fontSize:`0.85rem`,fontWeight:600,border:`1px solid #e2e8f0`},children:[`👤 `,e.name||e.username||`Member`]},e.id))})]}),U.file_url&&(0,s.jsxs)(`div`,{style:{gridColumn:`span 2`,marginTop:`4px`},children:[(0,s.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`#94a3b8`,textTransform:`uppercase`,fontWeight:700,display:`block`,marginBottom:`8px`},children:`Submitted Document`}),(0,s.jsx)(`a`,{href:U.file_url,target:`_blank`,rel:`noopener noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`8px`,background:`#eff6ff`,color:`#3b82f6`,padding:`8px 14px`,borderRadius:`8px`,fontSize:`0.85rem`,fontWeight:600,border:`1px solid #bfdbfe`,textDecoration:`none`},children:`📄 View / Download Document`})]})]})]})]})}),q&&(0,s.jsx)(`div`,{className:`modal-overlay`,children:(0,s.jsxs)(`div`,{className:`modal-container`,children:[(0,s.jsxs)(`div`,{className:`modal-header`,children:[(0,s.jsx)(`h3`,{children:`Request Deadline Extension`}),(0,s.jsx)(`button`,{className:`modal-close`,onClick:()=>J(null),children:`×`})]}),(0,s.jsxs)(`form`,{onSubmit:ye,style:{textAlign:`left`,padding:`20px`},children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Task`}),(0,s.jsx)(`input`,{type:`text`,value:q.task_name,disabled:!0,style:{background:`#f1f5f9`,width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Reason for Extension`}),(0,s.jsx)(`textarea`,{rows:`3`,value:Y,onChange:e=>X(e.target.value),required:!0,placeholder:`State why you need more time...`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Requested Additional Time (in hours)`}),(0,s.jsx)(`input`,{type:`number`,value:Z,onChange:e=>pe(e.target.value),required:!0,placeholder:`e.g. 24`,min:`1`,style:{width:`100%`,padding:`10px`,borderRadius:`6px`,border:`1px solid var(--border)`}})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,gap:`10px`,marginTop:`20px`},children:[(0,s.jsx)(`button`,{type:`button`,className:`btn`,style:{background:`#64748b`,marginTop:0},onClick:()=>J(null),children:`Cancel`}),(0,s.jsx)(`button`,{type:`submit`,className:`btn`,style:{marginTop:0},children:`Submit Request`})]})]})]})})]})};export{c as default};