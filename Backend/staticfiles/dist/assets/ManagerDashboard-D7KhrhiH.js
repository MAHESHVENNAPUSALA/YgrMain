import{d as e,f as t,i as n,r,s as i,u as a}from"./index-QBd8kfkV.js";var o=t(e(),1),s=n(),c=()=>{let{user:e}=r(),t=a(),[n,c]=(0,o.useState)(null),[l,u]=(0,o.useState)(!0);return(0,o.useEffect)(()=>{(async()=>{try{c((await i.get(`/api/dashboard/manager/`)).data)}catch(e){console.error(`Error fetching Manager dashboard metrics:`,e)}finally{u(!1)}})()},[]),l?(0,s.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,minHeight:`300px`,color:`var(--muted)`},children:[(0,s.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:`2rem`,marginRight:`10px`}}),` Loading console...`]}):(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`style`,{children:`
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
        .m-stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
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
          .m-grid {
            grid-template-columns: 1fr;
          }
        }
      `}),(0,s.jsx)(`h2`,{style:{color:`var(--primary-color)`,marginBottom:`20px`,fontFamily:`var(--font-display)`,fontWeight:800},children:`Manager Console`}),(0,s.jsxs)(`div`,{className:`m-stats-grid`,children:[(0,s.jsxs)(`div`,{className:`m-stat-card`,onClick:()=>t(`/tasks`,{state:{activeTab:`board`}}),children:[(0,s.jsx)(`div`,{className:`m-stat-icon`,style:{background:`linear-gradient(135deg, var(--accent-blue), #1e40af)`},children:(0,s.jsx)(`i`,{className:`fa-solid fa-folder-open`})}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`m-stat-value`,children:(n?.projects_received||0)+(n?.projects_assigned||0)}),(0,s.jsx)(`div`,{className:`m-stat-label`,children:`Total Projects`})]})]}),(0,s.jsxs)(`div`,{className:`m-stat-card`,onClick:()=>t(`/attendance-list`),children:[(0,s.jsx)(`div`,{className:`m-stat-icon`,style:{background:`linear-gradient(135deg, var(--success), #047857)`},children:(0,s.jsx)(`i`,{className:`fa-solid fa-users`})}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`m-stat-value`,children:n?.employees_count||0}),(0,s.jsx)(`div`,{className:`m-stat-label`,children:`Developers`})]})]}),(0,s.jsxs)(`div`,{className:`m-stat-card`,onClick:()=>t(`/attendance-list`),children:[(0,s.jsx)(`div`,{className:`m-stat-icon`,style:{background:`linear-gradient(135deg, var(--warning), #b45309)`},children:(0,s.jsx)(`i`,{className:`fa-solid fa-users-gear`})}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`m-stat-value`,children:n?.teams_count||0}),(0,s.jsx)(`div`,{className:`m-stat-label`,children:`Teams Aligned`})]})]}),(0,s.jsxs)(`div`,{className:`m-stat-card`,onClick:()=>t(`/leave-requests`,{state:{statusFilter:`Pending Manager Approval`}}),children:[(0,s.jsx)(`div`,{className:`m-stat-icon`,style:{background:`linear-gradient(135deg, var(--danger), #be123c)`},children:(0,s.jsx)(`i`,{className:`fa-solid fa-calendar-minus`})}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`m-stat-value`,children:(n?.employee_leave_count||0)+(n?.teamlead_leave_count||0)}),(0,s.jsx)(`div`,{className:`m-stat-label`,children:`Pending Leaves`})]})]})]}),(0,s.jsxs)(`div`,{className:`m-grid`,children:[(0,s.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,s.jsx)(`div`,{className:`panel-header`,children:(0,s.jsxs)(`h2`,{children:[(0,s.jsx)(`i`,{className:`fa-solid fa-file-invoice`,style:{color:`var(--accent-blue)`,marginRight:`8px`}}),` Developer Activity Reports (Recent)`]})}),(0,s.jsx)(`div`,{className:`panel-body`,children:(0,s.jsx)(`div`,{className:`table-wrap`,children:(0,s.jsxs)(`table`,{className:`dense-table`,children:[(0,s.jsx)(`thead`,{children:(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`th`,{children:`Developer`}),(0,s.jsx)(`th`,{children:`Project`}),(0,s.jsx)(`th`,{children:`Date`}),(0,s.jsx)(`th`,{children:`Tasks Completed Details`})]})}),(0,s.jsx)(`tbody`,{children:n?.daily_reports&&n.daily_reports.length>0?n.daily_reports.map(e=>(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`td`,{style:{fontWeight:600},children:e.user_name}),(0,s.jsx)(`td`,{children:e.project_name}),(0,s.jsx)(`td`,{children:e.report_date}),(0,s.jsx)(`td`,{children:e.tasks_completed})]},e.id)):(0,s.jsx)(`tr`,{children:(0,s.jsx)(`td`,{colSpan:`4`,style:{textAlign:`center`,color:`var(--muted)`},children:`No reports received recently.`})})})]})})})]}),(0,s.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,s.jsx)(`div`,{className:`panel-header`,children:(0,s.jsxs)(`h2`,{children:[(0,s.jsx)(`i`,{className:`fa-solid fa-clipboard-check`,style:{color:`var(--accent-blue)`,marginRight:`8px`}}),` Leaves Pending Manager Approval`]})}),(0,s.jsxs)(`div`,{className:`panel-body`,style:{textAlign:`left`,fontSize:`13.5px`,lineHeight:`1.8`},children:[(0,s.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`8px`,marginBottom:`8px`},children:[(0,s.jsx)(`span`,{children:`Developer Leaves Pending:`}),(0,s.jsx)(`strong`,{style:{color:`var(--danger)`},children:n?.employee_leave_count||0})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`8px`,marginBottom:`8px`},children:[(0,s.jsx)(`span`,{children:`Team Lead Leaves Pending:`}),(0,s.jsx)(`strong`,{style:{color:`var(--danger)`},children:n?.teamlead_leave_count||0})]}),(0,s.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`12px`,marginTop:`10px`},children:`* Managers must approve or reject pending leave requests before they proceed to HR.`})]})]})]})]})};export{c as default};