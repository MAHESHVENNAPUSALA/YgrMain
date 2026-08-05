import{a as e,d as t,f as n,i as r,n as i,r as a,s as o,t as ee}from"./index-Bvz4ZykM.js";var s=n(t(),1),c=r(),l=()=>{let{user:t}=a(),{showToast:n}=i(),{confirm:r,prompt:l}=ee(),u=t?.role,[d,f]=(0,s.useState)(`dashboard`),[te,p]=(0,s.useState)(!0),[m,ne]=(0,s.useState)([]),[h,g]=(0,s.useState)(null),[_,re]=(0,s.useState)(null),[v,ie]=(0,s.useState)(null),[y,ae]=(0,s.useState)([]),[b,oe]=(0,s.useState)([]),[se,ce]=(0,s.useState)([]),[x,S]=(0,s.useState)(`info`),[C,le]=(0,s.useState)(``),[w,ue]=(0,s.useState)(``),[T,de]=(0,s.useState)(``),[E,fe]=(0,s.useState)(``),[D,pe]=(0,s.useState)(``),[O,me]=(0,s.useState)(``),[he,k]=(0,s.useState)(!1),[ge,A]=(0,s.useState)(!1),[_e,j]=(0,s.useState)(!1),[ve,M]=(0,s.useState)(!1),[N,P]=(0,s.useState)(null),[F,I]=(0,s.useState)({name:``,description:``,client_name:``,client_contact:``,client:``,project_category:``,priority:`Medium`,start_date:``,end_date:``,estimated_budget:``,technology_stack:``,project_color:`#3b82f6`,assigned_manager:``}),[L,R]=(0,s.useState)(null),[z,B]=(0,s.useState)({name:``,lead:``,department:`python_dev`,description:``,max_size:10}),[V,H]=(0,s.useState)(``),[U,W]=(0,s.useState)(null),[G,K]=(0,s.useState)(``),q=async()=>{try{re((await e.getDashboard()).data)}catch(e){console.error(`Error fetching dashboard data:`,e)}},J=async()=>{try{let t={search:C,status:w,priority:T,manager_id:E,client_name:D,category:O};ne((await e.getProjects(t)).data||[])}catch(e){console.error(`Error fetching projects:`,e),n(`Failed to load projects list.`,`error`)}},Y=async()=>{try{ae((await e.getNotifications()).data||[])}catch(e){console.error(`Error fetching notifications:`,e)}},ye=async()=>{try{oe((await o.get(`/api/users/`)).data||[]),ce((await o.get(`/api/invoicing-resources/`)).data?.clients||[])}catch(e){console.error(`Error fetching users and clients:`,e)}},be=async()=>{if([`HR`,`MD`,`Manager`].includes(u))try{ie((await e.getReports()).data)}catch(e){console.error(`Error fetching reports:`,e)}},X=async()=>{p(!0),await Promise.all([q(),J(),Y(),ye(),be()]),p(!1)};(0,s.useEffect)(()=>{X()},[C,w,T,E,D,O]);let xe=async t=>{try{p(!0),g((await e.getProjectDetail(t.id)).data),S(`info`)}catch(e){console.error(`Error loading project details:`,e),n(`Failed to load project details.`,`error`)}finally{p(!1)}},Z=async()=>{if(h)try{g((await e.getProjectDetail(h.id)).data)}catch(e){console.error(`Error refreshing project details:`,e)}},Q=(0,s.useMemo)(()=>b.filter(e=>e.role===`Manager`),[b]),Se=(0,s.useMemo)(()=>b.filter(e=>e.role===`TeamLead`),[b]),Ce=(0,s.useMemo)(()=>b.filter(e=>e.role===`Employee`),[b]),we=async t=>{if(t.preventDefault(),!F.name){n(`Project Name is required.`,`warning`);return}let r=new FormData;Object.keys(F).forEach(e=>{r.append(e,F[e])}),L&&r.append(`project_logo`,L);try{await e.createProject(r,{headers:{"Content-Type":`multipart/form-data`}}),n(`Project created successfully!`,`success`),k(!1),I({name:``,description:``,client_name:``,client_contact:``,client:``,project_category:``,priority:`Medium`,start_date:``,end_date:``,estimated_budget:``,technology_stack:``,project_color:`#3b82f6`,assigned_manager:``}),R(null),X()}catch(e){n(e.response?.data?.detail||`Failed to create project.`,`error`)}},Te=async t=>{if(t.preventDefault(),!F.name){n(`Project Name is required.`,`warning`);return}let r=new FormData;Object.keys(F).forEach(e=>{r.append(e,F[e])}),L&&r.append(`project_logo`,L);try{await e.updateProject(h.id,r,{headers:{"Content-Type":`multipart/form-data`}}),n(`Project details updated successfully!`,`success`),A(!1),R(null),await Z(),await J(),await q()}catch(e){n(e.response?.data?.detail||`Failed to update project.`,`error`)}},Ee=()=>{h&&(I({name:h.name,description:h.description||``,client_name:h.client_name||``,client_contact:h.client_contact||``,client:h.client||``,project_category:h.project_category||``,priority:h.priority||`Medium`,start_date:h.startdate||``,end_date:h.deadline||``,estimated_budget:h.estimated_budget||``,technology_stack:h.technology_stack||``,project_color:h.project_color||`#3b82f6`,assigned_manager:h.assigned_manager||``,status:h.status||`Pending`}),A(!0))},De=async()=>{if(!h)return;let t=h.is_archived?`unarchive`:`archive`;if(await r(`Are you sure you want to ${t} this project?`))try{let r=await e.archiveProject(h.id,!h.is_archived);n(`Project has been ${t}d successfully.`,`success`),g(e=>e?{...e,is_archived:r.data.is_archived,status:r.data.is_archived?`Archived`:`Active`}:null),J(),q()}catch(e){n(e.response?.data?.detail||`Failed to toggle archive status.`,`error`)}},Oe=async()=>{if(!h)return;let t=allUsers.filter(e=>e.role===`Manager`);if(t.length===0){n(`No managers available in the system.`,`warning`);return}let r=await l(`Transfer project to a new Manager. Available Managers:\n${t.map(e=>`ID: ${e.id} - ${e.name}`).join(`
`)}\n\nEnter the Manager's ID:`);if(r===null||r.trim()===``)return;let i=parseInt(r.trim());if(isNaN(i)){n(`Please enter a valid numeric ID.`,`warning`);return}try{await e.transferProject(h.id,i),n(`Project transferred successfully.`,`success`),await Z(),await J()}catch(e){n(e.response?.data?.detail||`Failed to transfer project.`,`error`)}},$=async e=>{try{await o.post(`/api/projects/${h.id}/review/`,{action:e,remarks:`Reviewed from workspace`}),n(`Project review processed successfully.`,`success`),loadData(),g(null)}catch(e){n(e.response?.data?.detail||`Failed to process project review.`,`error`)}},ke=async()=>{if(h&&await r(`WARNING: Are you sure you want to permanently delete this project? This will remove all teams, members, comments, and files!`))try{await e.deleteProject(h.id),n(`Project deleted successfully.`,`success`),g(null),X()}catch{n(`Failed to delete project.`,`error`)}},Ae=async t=>{if(t.preventDefault(),!z.name){n(`Team Name is required.`,`warning`);return}try{await e.createTeam(h.id,z),n(`Team created successfully!`,`success`),j(!1),B({name:``,lead:``,department:`python_dev`,description:``,max_size:10}),await Z(),await q()}catch(e){n(e.response?.data?.detail||`Failed to create team.`,`error`)}},je=async t=>{if(await r(`Are you sure you want to delete this team?`))try{await e.deleteTeam(t),n(`Team deleted successfully.`,`success`),await Z(),await q()}catch{n(`Failed to delete team.`,`error`)}},Me=async t=>{let r=Se.map(e=>`${e.id}: ${e.name||e.username}`).join(`
`),i=await l(`Assign Team Leader to '${t.name}'. Available Leads:\n${r}\n\nEnter Lead User ID (or leave blank to remove):`);if(i===null)return;let a=i.trim()===``?null:parseInt(i.trim());if(a!==null&&isNaN(a)){n(`Please enter a valid numeric ID.`,`warning`);return}try{await e.updateTeam(t.id,{lead:a}),n(`Team Leader updated successfully.`,`success`),await Z()}catch(e){n(e.response?.data?.detail||`Failed to update Team Leader.`,`error`)}},Ne=async t=>{if(N)try{await e.addTeamMember(N.id,t),n(`Employee assigned to team successfully.`,`success`),M(!1),P(null),await Z(),await q()}catch(e){n(e.response?.data?.detail||`Failed to assign employee.`,`error`)}},Pe=async(t,i,a)=>{if(await r(`Are you sure you want to remove ${a} from this team?`))try{await e.removeTeamMember(t,i),n(`Employee removed from team.`,`success`),await Z(),await q()}catch{n(`Failed to remove employee.`,`error`)}},Fe=async t=>{if(t.preventDefault(),V.trim())try{await e.addComment(h.id,V),H(``),await Z()}catch{n(`Failed to post comment.`,`error`)}},Ie=async t=>{if(t.preventDefault(),!U){n(`Please select a file to upload.`,`warning`);return}let r=new FormData;r.append(`file`,U),r.append(`name`,G||U.name);try{await e.uploadDocument(h.id,r,{headers:{"Content-Type":`multipart/form-data`}}),n(`Document uploaded successfully.`,`success`),W(null),K(``),await Z()}catch(e){n(e.response?.data?.detail||`Failed to upload document.`,`error`)}},Le=async e=>{try{n(`Generating ${e.toUpperCase()} report...`,`info`);let t=await o.get(`/api/projects/reports/`,{params:{export:e},responseType:`blob`}),r=new Blob([t.data],{type:e===`pdf`?`application/pdf`:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.setAttribute(`download`,`Enterprise_Project_Management_Report.${e===`pdf`?`pdf`:`xlsx`}`),document.body.appendChild(a),a.click(),a.parentNode.removeChild(a),n(`Report downloaded successfully.`,`success`)}catch(e){console.error(e),n(`Failed to export report.`,`error`)}},Re=async(t,r=!1)=>{try{let i=r?{mark_all:!0}:{id:t};await e.markNotificationRead(i),await Y(),r&&n(`All notifications marked as read.`,`success`)}catch(e){console.error(e)}};return te&&!h&&m.length===0?(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,minHeight:`400px`,color:`var(--muted)`},children:[(0,c.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:`2rem`,marginRight:`10px`}}),` Loading Enterprise Projects Module...`]}):(0,c.jsxs)(`div`,{className:`projects-workspace-container`,children:[(0,c.jsx)(`style`,{children:`
        .projects-workspace-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 8px 0;
        }
        .projects-tab-nav {
          display: flex;
          gap: 12px;
          border-bottom: 2px solid var(--border);
          padding-bottom: 8px;
        }
        .projects-tab-nav button {
          background: none;
          border: none;
          padding: 10px 20px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 15px;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 8px;
          transition: var(--transition-base);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .projects-tab-nav button:hover {
          background: var(--bg-surface);
          color: var(--text-primary);
        }
        .projects-tab-nav button.active {
          background: var(--primary-color);
          color: #ffffff;
        }
        .notifications-badge {
          background: var(--danger);
          color: #ffffff;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 800;
        }

        /* Dashboard view elements */
        .projects-dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .stat-project-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--card-shadow);
        }
        .stat-project-card .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #ffffff;
        }
        .stat-project-card .stat-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .stat-project-card .stat-count {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }
        .stat-project-card .stat-label {
          font-size: 13px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        /* Dashboard row 2 */
        .dashboard-row-two {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .dashboard-row-two {
            grid-template-columns: 1fr;
          }
        }

        /* Filter block */
        .workspace-filter-bar {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 16px 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
        }
        .workspace-filter-bar .search-wrapper {
          flex: 1;
          min-width: 200px;
          position: relative;
        }
        .workspace-filter-bar .search-wrapper input {
          width: 100%;
          padding: 10px 16px 10px 38px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-base);
          color: var(--text-primary);
        }
        .workspace-filter-bar .search-wrapper i {
          position: absolute;
          left: 14px;
          top: 14px;
          color: var(--muted);
        }
        .workspace-filter-bar select {
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-base);
          color: var(--text-primary);
          min-width: 130px;
        }

        /* Projects List Workspace */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .project-grid-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--card-shadow);
          transition: var(--transition-base);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          text-align: left;
          position: relative;
        }
        .project-grid-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        }
        .project-card-header {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
        }
        .project-logo-badge {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: #ffffff;
          font-size: 16px;
        }
        .project-card-body {
          padding: 18px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .project-card-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          color: var(--text-primary);
        }
        .project-card-desc {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .project-card-meta {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--muted);
          border-top: 1px solid var(--border);
          padding-top: 10px;
        }

        /* Detail split layout */
        .project-details-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .project-details-layout {
            grid-template-columns: 1fr;
          }
        }
        .project-details-sidebar {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }
        .project-details-body {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Modals and Overlays */
        .projects-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(4px);
        }
        .projects-modal {
          background: var(--bg-surface);
          border-radius: var(--border-radius);
          width: 90%;
          max-width: 600px;
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
        }
        .projects-modal-header {
          padding: 16px 24px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .projects-modal-header h3 {
          font-family: var(--font-display);
          font-weight: 700;
          margin: 0;
        }
        .projects-modal-close {
          background: none;
          border: none;
          font-size: 18px;
          color: var(--muted);
          cursor: pointer;
        }
        .projects-modal-body {
          padding: 24px;
          text-align: left;
        }
        .project-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 600px) {
          .project-form-grid {
            grid-template-columns: 1fr;
          }
        }
        .form-group-full {
          grid-column: 1 / -1;
        }
        .projects-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }
        .projects-form-group label {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .projects-form-group input, .projects-form-group select, .projects-form-group textarea {
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-base);
          color: var(--text-primary);
        }
        .projects-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        .projects-btn {
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          border: none;
          transition: var(--transition-base);
        }
        .projects-btn-primary {
          background: var(--primary-color);
          color: #ffffff;
        }
        .projects-btn-primary:hover {
          background: var(--primary-light);
        }
        .projects-btn-secondary {
          background: var(--bg-base);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }
        .projects-btn-secondary:hover {
          background: var(--border);
        }
        .projects-btn-danger {
          background: var(--danger);
          color: #ffffff;
        }
        .projects-btn-danger:hover {
          background: #b91c1c;
        }

        /* Detail view subtabs */
        .detail-tabs {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 16px;
        }
        .detail-tabs button {
          background: none;
          border: none;
          padding: 8px 16px;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 13.5px;
          border-bottom: 2px solid transparent;
        }
        .detail-tabs button.active {
          color: var(--accent-blue);
          border-bottom-color: var(--accent-blue);
        }

        /* Comment block */
        .comments-feed {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 16px;
          padding-right: 8px;
        }
        .comment-item {
          display: flex;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
          text-align: left;
        }
        .comment-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent-blue);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          flex-shrink: 0;
        }
        .comment-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .comment-header {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .comment-author {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .comment-time {
          font-size: 11px;
          color: var(--muted);
        }
        .comment-text {
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.4;
        }

        /* Activity Log List */
        .activity-log-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 300px;
          overflow-y: auto;
        }
        .activity-log-item {
          display: flex;
          gap: 12px;
          font-size: 13px;
          text-align: left;
          padding: 8px;
          border-radius: 6px;
          background: var(--bg-base);
          align-items: center;
        }
        .activity-log-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: var(--text-secondary);
        }

        /* Notifications list */
        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .notification-item {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          position: relative;
        }
        .notification-item.unread {
          border-left: 4px solid var(--accent-blue);
          background: rgba(59, 130, 246, 0.02);
        }
        .notification-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .notification-title {
          font-weight: 700;
          color: var(--text-primary);
          font-size: 14px;
        }
        .notification-desc {
          color: var(--text-secondary);
          font-size: 13px;
        }
        .notification-time {
          font-size: 11px;
          color: var(--muted);
        }
      `}),(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,c.jsx)(`h2`,{style:{color:`var(--primary-color)`,fontFamily:`var(--font-display)`,fontWeight:800,textTransform:`uppercase`,margin:0},children:`Enterprise Project Management`}),u===`HR`&&(0,c.jsxs)(`button`,{className:`projects-btn projects-btn-primary`,onClick:()=>k(!0),id:`btnCreateProject`,children:[(0,c.jsx)(`i`,{className:`fa-solid fa-plus`,style:{marginRight:`6px`}}),` Create Project`]})]}),(0,c.jsxs)(`div`,{className:`projects-tab-nav`,children:[(0,c.jsxs)(`button`,{className:d===`dashboard`?`active`:``,onClick:()=>{f(`dashboard`),g(null)},children:[(0,c.jsx)(`i`,{className:`fa-solid fa-chart-line`}),` Dashboard`]}),(0,c.jsxs)(`button`,{className:d===`projects`?`active`:``,onClick:()=>J().then(()=>f(`projects`)),id:`tabProjectsWorkspace`,children:[(0,c.jsx)(`i`,{className:`fa-solid fa-folder-tree`}),` Project Workspace`]}),[`HR`,`MD`,`Manager`].includes(u)&&(0,c.jsxs)(`button`,{className:d===`reports`?`active`:``,onClick:()=>{f(`reports`),g(null)},children:[(0,c.jsx)(`i`,{className:`fa-solid fa-file-invoice`}),` Reports Center`]}),(0,c.jsxs)(`button`,{className:d===`notifications`?`active`:``,onClick:()=>{f(`notifications`),g(null)},children:[(0,c.jsx)(`i`,{className:`fa-solid fa-bell`}),` Notifications `,y.filter(e=>!e.is_read).length>0&&(0,c.jsx)(`span`,{className:`notifications-badge`,children:y.filter(e=>!e.is_read).length})]})]}),d===`dashboard`&&_&&(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,c.jsxs)(`div`,{className:`projects-dashboard-grid`,children:[(0,c.jsxs)(`div`,{className:`stat-project-card`,children:[(0,c.jsx)(`div`,{className:`stat-icon`,style:{background:`linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)`},children:(0,c.jsx)(`i`,{className:`fa-solid fa-folder`})}),(0,c.jsxs)(`div`,{className:`stat-info`,children:[(0,c.jsx)(`span`,{className:`stat-count`,children:_.total_projects}),(0,c.jsx)(`span`,{className:`stat-label`,children:`Total Projects`})]})]}),(0,c.jsxs)(`div`,{className:`stat-project-card`,children:[(0,c.jsx)(`div`,{className:`stat-icon`,style:{background:`linear-gradient(135deg, #10b981 0%, #047857 100%)`},children:(0,c.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`})}),(0,c.jsxs)(`div`,{className:`stat-info`,children:[(0,c.jsx)(`span`,{className:`stat-count`,children:_.active_projects}),(0,c.jsx)(`span`,{className:`stat-label`,children:`Active Projects`})]})]}),(0,c.jsxs)(`div`,{className:`stat-project-card`,children:[(0,c.jsx)(`div`,{className:`stat-icon`,style:{background:`linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)`},children:(0,c.jsx)(`i`,{className:`fa-solid fa-users-gear`})}),(0,c.jsxs)(`div`,{className:`stat-info`,children:[(0,c.jsx)(`span`,{className:`stat-count`,children:_.total_teams}),(0,c.jsx)(`span`,{className:`stat-label`,children:`Total Teams`})]})]}),(0,c.jsxs)(`div`,{className:`stat-project-card`,children:[(0,c.jsx)(`div`,{className:`stat-icon`,style:{background:`linear-gradient(135deg, #f59e0b 0%, #b45309 100%)`},children:(0,c.jsx)(`i`,{className:`fa-solid fa-users`})}),(0,c.jsxs)(`div`,{className:`stat-info`,children:[(0,c.jsx)(`span`,{className:`stat-count`,children:_.total_employees}),(0,c.jsx)(`span`,{className:`stat-label`,children:`Allocated Employees`})]})]})]}),(0,c.jsxs)(`div`,{className:`dashboard-row-two`,children:[(0,c.jsxs)(`div`,{className:`dashboard-panel-card`,style:{margin:0},children:[(0,c.jsx)(`div`,{className:`panel-header`,children:(0,c.jsxs)(`h2`,{children:[(0,c.jsx)(`i`,{className:`fa-solid fa-chart-bar`,style:{color:`var(--accent-blue)`}}),` Project Progress Tracker`]})}),(0,c.jsx)(`div`,{className:`panel-body`,style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:_.project_progress?.length===0?(0,c.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`14px`},children:`No active projects found.`}):_.project_progress?.map(e=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`6px`},children:[(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,fontSize:`13px`},children:[(0,c.jsxs)(`span`,{style:{fontWeight:700},children:[e.project_code,` - `,e.name]}),(0,c.jsxs)(`span`,{style:{color:`var(--muted)`,fontWeight:800},children:[e.progress,`%`]})]}),(0,c.jsx)(`div`,{style:{background:`var(--bg-base)`,borderRadius:`10px`,height:`10px`,overflow:`hidden`},children:(0,c.jsx)(`div`,{style:{background:e.color||`var(--accent-blue)`,height:`100%`,width:`${e.progress}%`,transition:`width 0.4s ease`}})})]},e.id))})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,c.jsxs)(`div`,{className:`dashboard-panel-card`,style:{margin:0},children:[(0,c.jsx)(`div`,{className:`panel-header`,children:(0,c.jsxs)(`h2`,{children:[(0,c.jsx)(`i`,{className:`fa-solid fa-clock-rotate-left`,style:{color:`var(--warning)`}}),` Upcoming Deadlines`]})}),(0,c.jsx)(`div`,{className:`panel-body`,style:{display:`flex`,flexDirection:`column`,gap:`12px`},children:_.upcoming_deadlines?.length===0?(0,c.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`13px`},children:`No upcoming deadlines in 30 days.`}):_.upcoming_deadlines?.map(e=>(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid var(--border)`,paddingBottom:`8px`,fontSize:`13px`,textAlign:`left`},children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`div`,{style:{fontWeight:700},children:e.project_name}),(0,c.jsxs)(`div`,{style:{fontSize:`11px`,color:`var(--muted)`},children:[`Code: `,e.project_code]})]}),(0,c.jsx)(`span`,{style:{color:`var(--danger)`,fontWeight:700},children:e.deadline})]},e.id))})]}),(0,c.jsxs)(`div`,{className:`dashboard-panel-card`,style:{margin:0},children:[(0,c.jsx)(`div`,{className:`panel-header`,children:(0,c.jsxs)(`h2`,{children:[(0,c.jsx)(`i`,{className:`fa-solid fa-list-check`,style:{color:`var(--success)`}}),` Recent Activities`]})}),(0,c.jsx)(`div`,{className:`panel-body`,children:(0,c.jsx)(`div`,{className:`activity-log-list`,children:_.recent_activities?.length===0?(0,c.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`13px`},children:`No recent activity records.`}):_.recent_activities?.map(e=>(0,c.jsxs)(`div`,{className:`activity-log-item`,children:[(0,c.jsx)(`div`,{className:`activity-log-icon`,children:(0,c.jsx)(`i`,{className:`fa-solid fa-info`})}),(0,c.jsxs)(`div`,{style:{flex:1},children:[(0,c.jsx)(`div`,{style:{fontWeight:700,fontSize:`12.5px`},children:e.action}),(0,c.jsx)(`div`,{style:{fontSize:`11.5px`,color:`var(--text-secondary)`},children:e.details}),(0,c.jsxs)(`div`,{style:{fontSize:`10px`,color:`var(--muted)`},children:[e.user_name,` • `,new Date(e.timestamp).toLocaleTimeString()]})]})]},e.id))})})]})]})]})]}),d===`projects`&&!h&&(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[(0,c.jsxs)(`div`,{className:`workspace-filter-bar`,children:[(0,c.jsxs)(`div`,{className:`search-wrapper`,children:[(0,c.jsx)(`i`,{className:`fa-solid fa-magnifying-glass`}),(0,c.jsx)(`input`,{type:`text`,placeholder:`Search projects by name, code or description...`,value:C,onChange:e=>le(e.target.value),id:`inpSearchProjects`})]}),(0,c.jsxs)(`select`,{value:w,onChange:e=>ue(e.target.value),id:`selFilterStatus`,children:[(0,c.jsx)(`option`,{value:``,children:`All Statuses`}),(0,c.jsx)(`option`,{value:`Pending`,children:`Pending`}),(0,c.jsx)(`option`,{value:`Active`,children:`Active`}),(0,c.jsx)(`option`,{value:`Completed`,children:`Completed`}),(0,c.jsx)(`option`,{value:`Delayed`,children:`Delayed`}),(0,c.jsx)(`option`,{value:`Archived`,children:`Archived`})]}),(0,c.jsxs)(`select`,{value:T,onChange:e=>de(e.target.value),children:[(0,c.jsx)(`option`,{value:``,children:`All Priorities`}),(0,c.jsx)(`option`,{value:`Low`,children:`Low`}),(0,c.jsx)(`option`,{value:`Medium`,children:`Medium`}),(0,c.jsx)(`option`,{value:`High`,children:`High`}),(0,c.jsx)(`option`,{value:`Critical`,children:`Critical`})]}),(0,c.jsxs)(`select`,{value:E,onChange:e=>fe(e.target.value),children:[(0,c.jsx)(`option`,{value:``,children:`All Managers`}),Q.map(e=>(0,c.jsx)(`option`,{value:e.id,children:e.name||e.username},e.id))]}),(0,c.jsx)(`input`,{type:`text`,placeholder:`Client Name...`,value:D,onChange:e=>pe(e.target.value),style:{padding:`10px 14px`,borderRadius:`8px`,border:`1px solid var(--border)`,background:`var(--bg-base)`,color:`var(--text-primary)`,maxWidth:`140px`}})]}),m.length===0?(0,c.jsxs)(`div`,{className:`dashboard-panel-card`,style:{padding:`40px`,color:`var(--muted)`,fontSize:`15px`},children:[(0,c.jsx)(`i`,{className:`fa-solid fa-folder-open`,style:{fontSize:`3rem`,display:`block`,marginBottom:`10px`}}),` No projects match your search filters.`]}):(0,c.jsx)(`div`,{className:`projects-grid`,children:m.map(e=>(0,c.jsxs)(`div`,{className:`project-grid-card`,onClick:()=>xe(e),id:`projectCard-${e.project_code}`,children:[(0,c.jsxs)(`div`,{className:`project-card-header`,children:[(0,c.jsx)(`span`,{className:`badge-capsule`,style:{background:`${e.project_color}15`,color:e.project_color},children:e.project_code||e.project_id}),(0,c.jsx)(`span`,{className:`badge-capsule badge-${e.status?.toLowerCase()}`,style:{background:e.status===`Active`?`#d1fae5`:e.status===`Completed`?`#dbeafe`:e.status===`Delayed`?`#fee2e2`:`#fef3c7`,color:e.status===`Active`?`#065f46`:e.status===`Completed`?`#1e40af`:e.status===`Delayed`?`#991b1b`:`#92400e`},children:e.status})]}),(0,c.jsxs)(`div`,{className:`project-card-body`,children:[(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`10px`,alignItems:`center`},children:[(0,c.jsx)(`div`,{className:`project-logo-badge`,style:{backgroundColor:e.project_color||`#3b82f6`},children:e.name?.substring(0,2).toUpperCase()}),(0,c.jsx)(`h4`,{className:`project-card-title`,children:e.name})]}),(0,c.jsx)(`p`,{className:`project-card-desc`,children:e.description}),(0,c.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px`,fontSize:`11px`,color:`var(--text-secondary)`,marginTop:`auto`},children:[(0,c.jsxs)(`span`,{children:[`Priority: `,(0,c.jsx)(`b`,{children:e.priority})]}),(0,c.jsxs)(`span`,{children:[`• Manager: `,(0,c.jsx)(`b`,{children:e.assigned_manager_name||`None`})]})]})]}),(0,c.jsxs)(`div`,{className:`project-card-meta`,children:[(0,c.jsxs)(`span`,{children:[`Deadline: `,e.deadline||`N/A`]}),(0,c.jsxs)(`span`,{children:[`Teams: `,e.teams_count]})]})]},e.id))})]}),d===`projects`&&h&&(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`10px`,alignItems:`center`,justifyContent:`space-between`},children:[(0,c.jsxs)(`button`,{className:`projects-btn projects-btn-secondary`,onClick:()=>g(null),id:`btnBackToWorkspace`,children:[(0,c.jsx)(`i`,{className:`fa-solid fa-arrow-left`}),` Back to Workspace`]}),(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[[`HR`,`MD`].includes(u)&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(`button`,{className:`projects-btn projects-btn-secondary`,onClick:Ee,id:`btnEditProject`,children:[(0,c.jsx)(`i`,{className:`fa-solid fa-edit`}),` Edit Details`]}),(0,c.jsxs)(`button`,{className:`projects-btn projects-btn-danger`,onClick:ke,children:[(0,c.jsx)(`i`,{className:`fa-solid fa-trash`}),` Delete`]})]}),u===`TeamLead`&&(0,c.jsxs)(`button`,{className:`projects-btn projects-btn-primary`,onClick:()=>$(`submit`),style:{background:`#10b981`,borderColor:`#10b981`},children:[(0,c.jsx)(`i`,{className:`fa-solid fa-check`}),` Submit Project Report`]}),u===`Manager`&&(0,c.jsxs)(`button`,{className:`projects-btn projects-btn-primary`,onClick:()=>$(`submit`),style:{background:`#10b981`,borderColor:`#10b981`},children:[(0,c.jsx)(`i`,{className:`fa-solid fa-check`}),` Submit to HR`]}),u===`HR`&&(0,c.jsxs)(`button`,{className:`projects-btn projects-btn-primary`,onClick:()=>$(`submit`),style:{background:`#10b981`,borderColor:`#10b981`},children:[(0,c.jsx)(`i`,{className:`fa-solid fa-check`}),` Submit to MD`]}),u===`MD`&&(0,c.jsxs)(`button`,{className:`projects-btn projects-btn-primary`,onClick:()=>$(`submit`),style:{background:`#10b981`,borderColor:`#10b981`},children:[(0,c.jsx)(`i`,{className:`fa-solid fa-check`}),` Finalize Project`]}),u===`MD`&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(`button`,{className:`projects-btn projects-btn-secondary`,onClick:Oe,style:{background:`#fef3c7`,borderColor:`#f59e0b`,color:`#92400e`},id:`btnTransferProject`,children:[(0,c.jsx)(`i`,{className:`fa-solid fa-exchange-alt`}),` Transfer Manager`]}),(0,c.jsxs)(`button`,{className:`projects-btn projects-btn-secondary`,onClick:De,style:{background:h.is_archived?`#d1fae5`:`#fee2e2`,borderColor:h.is_archived?`#10b981`:`#ef4444`,color:h.is_archived?`#065f46`:`#991b1b`},children:[(0,c.jsx)(`i`,{className:h.is_archived?`fa-solid fa-box-open`:`fa-solid fa-archive`}),` `,h.is_archived?`Unarchive`:`Archive`]})]})]})]}),(0,c.jsxs)(`div`,{className:`project-details-layout`,children:[(0,c.jsxs)(`div`,{className:`project-details-sidebar`,children:[(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,alignItems:`center`},children:[(0,c.jsx)(`div`,{className:`project-logo-badge`,style:{backgroundColor:h.project_color,width:`48px`,height:`48px`,fontSize:`18px`},children:h.name?.substring(0,2).toUpperCase()}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h3`,{style:{margin:0,fontFamily:`var(--font-display)`,fontWeight:800},children:h.name}),(0,c.jsx)(`span`,{className:`badge-capsule`,style:{background:`${h.project_color}15`,color:h.project_color,fontSize:`12px`,marginTop:`4px`},children:h.project_code||h.project_id})]})]}),(0,c.jsxs)(`div`,{style:{borderTop:`1px solid var(--border)`,paddingTop:`16px`,display:`flex`,flexDirection:`column`,gap:`12px`,fontSize:`13px`},children:[(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`},children:[(0,c.jsx)(`span`,{style:{color:`var(--text-secondary)`},children:`Status:`}),(0,c.jsx)(`span`,{className:`badge-capsule`,style:{background:h.status===`Active`?`#d1fae5`:h.status===`Completed`?`#dbeafe`:h.status===`Delayed`?`#fee2e2`:`#fef3c7`,color:h.status===`Active`?`#065f46`:h.status===`Completed`?`#1e40af`:h.status===`Delayed`?`#991b1b`:`#92400e`},children:h.status})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`},children:[(0,c.jsx)(`span`,{style:{color:`var(--text-secondary)`},children:`Priority:`}),(0,c.jsx)(`span`,{style:{fontWeight:700},children:h.priority})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`},children:[(0,c.jsx)(`span`,{style:{color:`var(--text-secondary)`},children:`Client Name:`}),(0,c.jsx)(`span`,{style:{fontWeight:700},children:h.client_name||`N/A`})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`},children:[(0,c.jsx)(`span`,{style:{color:`var(--text-secondary)`},children:`Client Contact:`}),(0,c.jsx)(`span`,{style:{fontWeight:700},children:h.client_contact||`N/A`})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`},children:[(0,c.jsx)(`span`,{style:{color:`var(--text-secondary)`},children:`Budget:`}),(0,c.jsxs)(`span`,{style:{fontWeight:700,color:`var(--success)`},children:[`$`,h.estimated_budget||`0.00`]})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`},children:[(0,c.jsx)(`span`,{style:{color:`var(--text-secondary)`},children:`Start Date:`}),(0,c.jsx)(`span`,{style:{fontWeight:700},children:h.startdate||`N/A`})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`},children:[(0,c.jsx)(`span`,{style:{color:`var(--text-secondary)`},children:`Deadline:`}),(0,c.jsx)(`span`,{style:{fontWeight:700,color:`var(--danger)`},children:h.deadline||`N/A`})]})]})]}),(0,c.jsxs)(`div`,{className:`project-details-body`,children:[(0,c.jsxs)(`div`,{className:`detail-tabs`,children:[(0,c.jsx)(`button`,{className:x===`info`?`active`:``,onClick:()=>S(`info`),children:`Info`}),(0,c.jsx)(`button`,{className:x===`teams`?`active`:``,onClick:()=>S(`teams`),id:`tabProjectTeams`,children:`Teams & Allocations`}),(0,c.jsx)(`button`,{className:x===`documents`?`active`:``,onClick:()=>S(`documents`),children:`Documents`}),(0,c.jsx)(`button`,{className:x===`comments`?`active`:``,onClick:()=>S(`comments`),children:`Comments`}),(0,c.jsx)(`button`,{className:x===`activity`?`active`:``,onClick:()=>S(`activity`),children:`Activity Trail`})]}),x===`info`&&(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,textAlign:`left`},children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h4`,{style:{fontSize:`14px`,color:`var(--primary-color)`,marginBottom:`8px`},children:`Project Description`}),(0,c.jsx)(`p`,{style:{fontSize:`13.5px`,color:`var(--text-secondary)`,lineHeight:`1.5`},children:h.description||`No description provided.`})]}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h4`,{style:{fontSize:`14px`,color:`var(--primary-color)`,marginBottom:`8px`},children:`Technology Stack`}),(0,c.jsx)(`p`,{style:{fontSize:`13.5px`,color:`var(--text-secondary)`},children:h.technology_stack||`None specified.`})]}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h4`,{style:{fontSize:`14px`,color:`var(--primary-color)`,marginBottom:`8px`},children:`Project Manager`}),(0,c.jsx)(`p`,{style:{fontSize:`13.5px`,fontWeight:700},children:h.assigned_manager_detail?`${h.assigned_manager_detail.first_name} ${h.assigned_manager_detail.last_name} (${h.assigned_manager_detail.username})`:`Unassigned`})]})]}),x===`teams`&&(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,textAlign:`left`},children:[(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,c.jsx)(`h4`,{style:{margin:0},children:`Project Teams`}),[`HR`,`MD`,`Manager`].includes(u)&&(0,c.jsx)(`button`,{className:`projects-btn projects-btn-primary`,style:{padding:`6px 12px`,fontSize:`12.5px`},onClick:()=>j(!0),id:`btnCreateTeam`,children:`Create Team`})]}),h.teams?.length===0?(0,c.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`13.5px`},children:`No teams created for this project yet.`}):(0,c.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:h.teams?.map(e=>(0,c.jsxs)(`div`,{style:{border:`1px solid var(--border)`,borderRadius:`10px`,padding:`16px`,display:`flex`,flexDirection:`column`,gap:`12px`},children:[(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,flexWrap:`wrap`,gap:`8px`},children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h5`,{style:{margin:0,fontSize:`14.5px`,fontWeight:700},children:e.name}),(0,c.jsxs)(`span`,{style:{fontSize:`11px`,color:`var(--muted)`},children:[`Code: `,e.team_code,` | Department: `,e.department_display]})]}),(0,c.jsx)(`div`,{style:{display:`flex`,gap:`6px`},children:[`HR`,`MD`,`Manager`].includes(u)&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`button`,{className:`projects-btn projects-btn-secondary`,style:{padding:`4px 8px`,fontSize:`11.5px`},onClick:()=>Me(e),id:`btnAssignTL-${e.id}`,children:`Assign TL`}),(0,c.jsx)(`button`,{className:`projects-btn projects-btn-secondary`,style:{padding:`4px 8px`,fontSize:`11.5px`},onClick:()=>{P(e),M(!0)},id:`btnAddMember-${e.id}`,children:`Add Member`}),(0,c.jsx)(`button`,{className:`projects-btn projects-btn-danger`,style:{padding:`4px 8px`,fontSize:`11.5px`},onClick:()=>je(e.id),children:`Delete`})]})})]}),(0,c.jsxs)(`div`,{style:{fontSize:`13px`},children:[(0,c.jsxs)(`div`,{children:[`Team Leader: `,(0,c.jsx)(`b`,{children:e.lead_detail?`${e.lead_detail.first_name} ${e.lead_detail.last_name}`:`Unassigned`})]}),(0,c.jsxs)(`div`,{style:{marginTop:`8px`},children:[(0,c.jsxs)(`b`,{children:[`Members (`,e.members_detail?.length,` / `,e.max_size,`):`]}),e.members_detail?.length===0?(0,c.jsx)(`span`,{style:{color:`var(--muted)`,marginLeft:`6px`},children:`No employees assigned.`}):(0,c.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px`,marginTop:`6px`},children:e.members_detail?.map(t=>(0,c.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`6px`,background:`var(--bg-base)`,border:`1px solid var(--border)`,borderRadius:`20px`,padding:`4px 10px`,fontSize:`11.5px`},children:[(0,c.jsxs)(`span`,{children:[t.first_name,` `,t.last_name,` (`,t.emp_id,`)`]}),[`HR`,`MD`,`Manager`].includes(u)&&(0,c.jsx)(`i`,{className:`fa-solid fa-times`,style:{cursor:`pointer`,color:`var(--danger)`},onClick:()=>Pe(e.id,t.id,`${t.first_name} ${t.last_name}`)})]},t.id))})]})]})]},e.id))})]}),x===`documents`&&(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,textAlign:`left`},children:[(0,c.jsx)(`h4`,{children:`Documents & Attachments`}),[`HR`,`MD`,`Manager`,`TeamLead`].includes(u)&&(0,c.jsxs)(`form`,{onSubmit:Ie,style:{display:`flex`,flexWrap:`wrap`,gap:`12px`,background:`var(--bg-base)`,padding:`14px`,borderRadius:`8px`},children:[(0,c.jsx)(`input`,{type:`text`,placeholder:`Document Name (Optional)`,value:G,onChange:e=>K(e.target.value),style:{padding:`8px`,border:`1px solid var(--border)`,borderRadius:`6px`,flex:1}}),(0,c.jsx)(`input`,{type:`file`,onChange:e=>W(e.target.files[0]),style:{fontSize:`12.5px`}}),(0,c.jsx)(`button`,{type:`submit`,className:`projects-btn projects-btn-primary`,style:{padding:`8px 16px`,fontSize:`12.5px`},children:`Upload`})]}),h.project_documents?.length===0?(0,c.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`13.5px`},children:`No documents uploaded for this project.`}):(0,c.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`13px`},children:[(0,c.jsx)(`thead`,{children:(0,c.jsxs)(`tr`,{style:{background:`var(--bg-base)`},children:[(0,c.jsx)(`th`,{style:{padding:`10px`,textAlign:`left`,borderBottom:`1px solid var(--border)`},children:`Name`}),(0,c.jsx)(`th`,{style:{padding:`10px`,textAlign:`left`,borderBottom:`1px solid var(--border)`},children:`Uploaded By`}),(0,c.jsx)(`th`,{style:{padding:`10px`,textAlign:`left`,borderBottom:`1px solid var(--border)`},children:`Date`}),(0,c.jsx)(`th`,{style:{padding:`10px`,textAlign:`right`,borderBottom:`1px solid var(--border)`},children:`Action`})]})}),(0,c.jsx)(`tbody`,{children:h.project_documents?.map(e=>(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`,fontWeight:700},children:e.name}),(0,c.jsx)(`td`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:e.uploaded_by_name}),(0,c.jsx)(`td`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:new Date(e.uploaded_at).toLocaleDateString()}),(0,c.jsx)(`td`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`,textAlign:`right`},children:(0,c.jsx)(`a`,{href:e.file,target:`_blank`,rel:`noreferrer`,className:`projects-btn projects-btn-secondary`,style:{padding:`4px 8px`,fontSize:`11px`,textDecoration:`none`,display:`inline-block`},children:`View File`})})]},e.id))})]})]}),x===`comments`&&(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,textAlign:`left`},children:[(0,c.jsx)(`h4`,{children:`Project Discussion Feed`}),(0,c.jsxs)(`form`,{onSubmit:Fe,style:{display:`flex`,gap:`12px`},children:[(0,c.jsx)(`input`,{type:`text`,placeholder:`Add a comment to this project thread...`,value:V,onChange:e=>H(e.target.value),style:{padding:`10px`,border:`1px solid var(--border)`,borderRadius:`8px`,flex:1,background:`var(--bg-base)`,color:`var(--text-primary)`}}),(0,c.jsx)(`button`,{type:`submit`,className:`projects-btn projects-btn-primary`,style:{padding:`10px 16px`},children:`Comment`})]}),(0,c.jsx)(`div`,{className:`comments-feed`,children:h.project_comments?.length===0?(0,c.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`13.5px`},children:`No comments posted yet. Start the conversation!`}):h.project_comments?.map(e=>(0,c.jsxs)(`div`,{className:`comment-item`,children:[(0,c.jsx)(`div`,{className:`comment-avatar`,children:e.author_name?.substring(0,2).toUpperCase()}),(0,c.jsxs)(`div`,{className:`comment-content`,children:[(0,c.jsxs)(`div`,{className:`comment-header`,children:[(0,c.jsx)(`span`,{className:`comment-author`,children:e.author_name}),(0,c.jsx)(`span`,{className:`comment-time`,children:new Date(e.created_at).toLocaleString()})]}),(0,c.jsx)(`p`,{className:`comment-text`,children:e.content})]})]},e.id))})]}),x===`activity`&&(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,textAlign:`left`},children:[(0,c.jsx)(`h4`,{children:`Project Audit Trail Logs`}),(0,c.jsx)(`div`,{className:`activity-log-list`,style:{maxHeight:`400px`},children:h.project_audit_logs?.length===0?(0,c.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`13.5px`},children:`No activity records found for this project.`}):h.project_audit_logs?.map(e=>(0,c.jsxs)(`div`,{className:`activity-log-item`,children:[(0,c.jsx)(`div`,{className:`activity-log-icon`,children:(0,c.jsx)(`i`,{className:`fa-solid fa-clock`})}),(0,c.jsxs)(`div`,{style:{flex:1},children:[(0,c.jsx)(`div`,{style:{fontWeight:700,fontSize:`13px`},children:e.action}),(0,c.jsx)(`div`,{style:{fontSize:`12px`,color:`var(--text-secondary)`,marginTop:`2px`},children:e.details}),(0,c.jsxs)(`div`,{style:{fontSize:`11px`,color:`var(--muted)`,marginTop:`4px`},children:[`Performed by: `,(0,c.jsx)(`b`,{children:e.user_name}),` • `,new Date(e.timestamp).toLocaleString()]})]})]},e.id))})]})]})]})]}),d===`reports`&&v&&(0,c.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:(0,c.jsxs)(`div`,{className:`dashboard-panel-card`,style:{margin:0},children:[(0,c.jsxs)(`div`,{className:`panel-header`,style:{flexWrap:`wrap`,gap:`15px`},children:[(0,c.jsxs)(`h2`,{children:[(0,c.jsx)(`i`,{className:`fa-solid fa-file-pdf`,style:{color:`var(--danger)`}}),` Exports & Allocations Report`]}),(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`10px`},children:[(0,c.jsxs)(`button`,{className:`projects-btn projects-btn-secondary`,onClick:()=>Le(`excel`),id:`btnExportExcel`,children:[(0,c.jsx)(`i`,{className:`fa-solid fa-file-excel`,style:{color:`green`,marginRight:`6px`}}),` Export Excel`]}),(0,c.jsxs)(`button`,{className:`projects-btn projects-btn-secondary`,onClick:()=>Le(`pdf`),id:`btnExportPDF`,children:[(0,c.jsx)(`i`,{className:`fa-solid fa-file-pdf`,style:{color:`red`,marginRight:`6px`}}),` Export PDF`]})]})]}),(0,c.jsxs)(`div`,{className:`panel-body`,style:{textAlign:`left`},children:[(0,c.jsx)(`h3`,{style:{fontSize:`15px`,color:`var(--primary-color)`,marginBottom:`12px`},children:`Employee Allocation Details`}),(0,c.jsx)(`div`,{style:{overflowX:`auto`},children:(0,c.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`13px`},children:[(0,c.jsx)(`thead`,{children:(0,c.jsxs)(`tr`,{style:{background:`var(--bg-base)`},children:[(0,c.jsx)(`th`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:`Employee ID`}),(0,c.jsx)(`th`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:`Name`}),(0,c.jsx)(`th`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:`Department`}),(0,c.jsx)(`th`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:`Allocation Status`}),(0,c.jsx)(`th`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:`Current Project`}),(0,c.jsx)(`th`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:`Current Team`}),(0,c.jsx)(`th`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:`Reporting Manager`})]})}),(0,c.jsx)(`tbody`,{children:v.allocations?.map(e=>(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`,fontWeight:700},children:e.emp_id}),(0,c.jsx)(`td`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`,fontWeight:700},children:e.name}),(0,c.jsx)(`td`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:e.department}),(0,c.jsx)(`td`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:(0,c.jsx)(`span`,{className:`badge-capsule`,style:{background:e.status===`Allocated`?`#d1fae5`:`#fee2e2`,color:e.status===`Allocated`?`#065f46`:`#991b1b`},children:e.status})}),(0,c.jsx)(`td`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:e.project}),(0,c.jsx)(`td`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:e.team}),(0,c.jsx)(`td`,{style:{padding:`10px`,borderBottom:`1px solid var(--border)`},children:e.manager})]},e.emp_id))})]})})]})]})}),d===`notifications`&&(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,c.jsx)(`h4`,{style:{margin:0,textAlign:`left`},children:`System Notifications`}),y.filter(e=>!e.is_read).length>0&&(0,c.jsx)(`button`,{className:`projects-btn projects-btn-secondary`,style:{padding:`6px 12px`,fontSize:`12.5px`},onClick:()=>Re(null,!0),children:`Mark All as Read`})]}),(0,c.jsx)(`div`,{className:`notifications-list`,children:y.length===0?(0,c.jsxs)(`div`,{className:`dashboard-panel-card`,style:{padding:`30px`,color:`var(--muted)`,fontSize:`14px`},children:[(0,c.jsx)(`i`,{className:`fa-solid fa-bell-slash`,style:{fontSize:`2.5rem`,marginBottom:`8px`,display:`block`}}),` No notifications found.`]}):y.map(e=>(0,c.jsxs)(`div`,{className:`notification-item ${e.is_read?``:`unread`}`,children:[(0,c.jsxs)(`div`,{className:`notification-info`,children:[(0,c.jsx)(`span`,{className:`notification-title`,children:e.title}),(0,c.jsx)(`span`,{className:`notification-desc`,children:e.message}),(0,c.jsx)(`span`,{className:`notification-time`,children:new Date(e.created_at).toLocaleString()})]}),!e.is_read&&(0,c.jsx)(`button`,{className:`projects-btn projects-btn-secondary`,style:{padding:`4px 8px`,fontSize:`11px`},onClick:()=>Re(e.id),children:`Mark Read`})]},e.id))})]}),he&&(0,c.jsx)(`div`,{className:`projects-modal-overlay`,children:(0,c.jsxs)(`div`,{className:`projects-modal`,children:[(0,c.jsxs)(`div`,{className:`projects-modal-header`,children:[(0,c.jsx)(`h3`,{children:`Create Enterprise Project`}),(0,c.jsx)(`button`,{className:`projects-modal-close`,onClick:()=>k(!1),children:`×`})]}),(0,c.jsxs)(`form`,{onSubmit:we,children:[(0,c.jsx)(`div`,{className:`projects-modal-body`,children:(0,c.jsxs)(`div`,{className:`project-form-grid`,children:[(0,c.jsxs)(`div`,{className:`projects-form-group form-group-full`,children:[(0,c.jsx)(`label`,{children:`Project Name *`}),(0,c.jsx)(`input`,{type:`text`,required:!0,value:F.name,onChange:e=>I({...F,name:e.target.value}),placeholder:`e.g. Finance Ledger Upgrade`,id:`inpProjectName`})]}),(0,c.jsxs)(`div`,{className:`projects-form-group form-group-full`,children:[(0,c.jsx)(`label`,{children:`Description`}),(0,c.jsx)(`textarea`,{rows:3,value:F.description,onChange:e=>I({...F,description:e.target.value}),placeholder:`Project goals, scope and requirements...`,id:`inpProjectDesc`})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Client Name`}),(0,c.jsx)(`input`,{type:`text`,value:F.client_name,onChange:e=>I({...F,client_name:e.target.value}),placeholder:`Client Co.`})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Client Contact Info`}),(0,c.jsx)(`input`,{type:`text`,value:F.client_contact,onChange:e=>I({...F,client_contact:e.target.value}),placeholder:`e.g. client@email.com`})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Budget ($)`}),(0,c.jsx)(`input`,{type:`number`,value:F.estimated_budget,onChange:e=>I({...F,estimated_budget:e.target.value}),placeholder:`50000`})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Category`}),(0,c.jsx)(`input`,{type:`text`,value:F.project_category,onChange:e=>I({...F,project_category:e.target.value}),placeholder:`e.g. Fintech`})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Priority`}),(0,c.jsxs)(`select`,{value:F.priority,onChange:e=>I({...F,priority:e.target.value}),children:[(0,c.jsx)(`option`,{value:`Low`,children:`Low`}),(0,c.jsx)(`option`,{value:`Medium`,children:`Medium`}),(0,c.jsx)(`option`,{value:`High`,children:`High`}),(0,c.jsx)(`option`,{value:`Critical`,children:`Critical`})]})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Technology Stack`}),(0,c.jsx)(`input`,{type:`text`,value:F.technology_stack,onChange:e=>I({...F,technology_stack:e.target.value}),placeholder:`React, Django, Python`})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Start Date`}),(0,c.jsx)(`input`,{type:`date`,value:F.start_date,onChange:e=>I({...F,start_date:e.target.value})})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Deadline (End Date)`}),(0,c.jsx)(`input`,{type:`date`,value:F.end_date,onChange:e=>I({...F,end_date:e.target.value}),id:`inpProjectDeadline`})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Project Color Theme`}),(0,c.jsx)(`input`,{type:`color`,value:F.project_color,onChange:e=>I({...F,project_color:e.target.value}),style:{padding:`0px`,height:`38px`,cursor:`pointer`}})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Assign Project Manager`}),(0,c.jsxs)(`select`,{value:F.assigned_manager,onChange:e=>I({...F,assigned_manager:e.target.value}),id:`selAssignManager`,children:[(0,c.jsx)(`option`,{value:``,children:`Select Manager`}),Q.map(e=>(0,c.jsx)(`option`,{value:e.id,children:e.name||e.username},e.id))]})]}),(0,c.jsxs)(`div`,{className:`projects-form-group form-group-full`,children:[(0,c.jsx)(`label`,{children:`Project Logo`}),(0,c.jsx)(`input`,{type:`file`,accept:`image/*`,onChange:e=>R(e.target.files[0])})]})]})}),(0,c.jsxs)(`div`,{className:`projects-modal-footer`,children:[(0,c.jsx)(`button`,{type:`button`,className:`projects-btn projects-btn-secondary`,onClick:()=>k(!1),children:`Cancel`}),(0,c.jsx)(`button`,{type:`submit`,className:`projects-btn projects-btn-primary`,id:`btnSubmitProject`,children:`Create`})]})]})]})}),ge&&(0,c.jsx)(`div`,{className:`projects-modal-overlay`,children:(0,c.jsxs)(`div`,{className:`projects-modal`,children:[(0,c.jsxs)(`div`,{className:`projects-modal-header`,children:[(0,c.jsx)(`h3`,{children:`Edit Project Details`}),(0,c.jsx)(`button`,{className:`projects-modal-close`,onClick:()=>A(!1),children:`×`})]}),(0,c.jsxs)(`form`,{onSubmit:Te,children:[(0,c.jsx)(`div`,{className:`projects-modal-body`,children:(0,c.jsxs)(`div`,{className:`project-form-grid`,children:[(0,c.jsxs)(`div`,{className:`projects-form-group form-group-full`,children:[(0,c.jsx)(`label`,{children:`Project Name *`}),(0,c.jsx)(`input`,{type:`text`,required:!0,value:F.name,onChange:e=>I({...F,name:e.target.value}),placeholder:`e.g. Finance Ledger Upgrade`,id:`inpEditProjectName`})]}),(0,c.jsxs)(`div`,{className:`projects-form-group form-group-full`,children:[(0,c.jsx)(`label`,{children:`Description`}),(0,c.jsx)(`textarea`,{rows:3,value:F.description,onChange:e=>I({...F,description:e.target.value})})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Client Name`}),(0,c.jsx)(`input`,{type:`text`,value:F.client_name,onChange:e=>I({...F,client_name:e.target.value})})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Client Contact Info`}),(0,c.jsx)(`input`,{type:`text`,value:F.client_contact,onChange:e=>I({...F,client_contact:e.target.value})})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Budget ($)`}),(0,c.jsx)(`input`,{type:`number`,value:F.estimated_budget,disabled:u!==`HR`&&u!==`MD`,onChange:e=>I({...F,estimated_budget:e.target.value})})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Category`}),(0,c.jsx)(`input`,{type:`text`,value:F.project_category,onChange:e=>I({...F,project_category:e.target.value})})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Priority`}),(0,c.jsxs)(`select`,{value:F.priority,onChange:e=>I({...F,priority:e.target.value}),children:[(0,c.jsx)(`option`,{value:`Low`,children:`Low`}),(0,c.jsx)(`option`,{value:`Medium`,children:`Medium`}),(0,c.jsx)(`option`,{value:`High`,children:`High`}),(0,c.jsx)(`option`,{value:`Critical`,children:`Critical`})]})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Technology Stack`}),(0,c.jsx)(`input`,{type:`text`,value:F.technology_stack,onChange:e=>I({...F,technology_stack:e.target.value})})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Start Date`}),(0,c.jsx)(`input`,{type:`date`,value:F.start_date,onChange:e=>I({...F,start_date:e.target.value})})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Deadline (End Date)`}),(0,c.jsx)(`input`,{type:`date`,value:F.end_date,onChange:e=>I({...F,end_date:e.target.value})})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Project Color Theme`}),(0,c.jsx)(`input`,{type:`color`,value:F.project_color,onChange:e=>I({...F,project_color:e.target.value}),style:{padding:`0px`,height:`38px`}})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Project Status`}),(0,c.jsxs)(`select`,{value:F.status,onChange:e=>I({...F,status:e.target.value}),id:`selEditProjectStatus`,children:[(0,c.jsx)(`option`,{value:`Pending`,children:`Pending`}),(0,c.jsx)(`option`,{value:`Active`,children:`Active`}),(0,c.jsx)(`option`,{value:`Completed`,children:`Completed`}),(0,c.jsx)(`option`,{value:`Delayed`,children:`Delayed`})]})]}),[`HR`,`MD`].includes(u)&&(0,c.jsxs)(`div`,{className:`projects-form-group form-group-full`,children:[(0,c.jsx)(`label`,{children:`Assign Project Manager`}),(0,c.jsxs)(`select`,{value:F.assigned_manager,onChange:e=>I({...F,assigned_manager:e.target.value}),children:[(0,c.jsx)(`option`,{value:``,children:`Select Manager`}),Q.map(e=>(0,c.jsx)(`option`,{value:e.id,children:e.name||e.username},e.id))]})]})]})}),(0,c.jsxs)(`div`,{className:`projects-modal-footer`,children:[(0,c.jsx)(`button`,{type:`button`,className:`projects-btn projects-btn-secondary`,onClick:()=>A(!1),children:`Cancel`}),(0,c.jsx)(`button`,{type:`submit`,className:`projects-btn projects-btn-primary`,id:`btnSubmitEditProject`,children:`Save Changes`})]})]})]})}),_e&&(0,c.jsx)(`div`,{className:`projects-modal-overlay`,children:(0,c.jsxs)(`div`,{className:`projects-modal`,children:[(0,c.jsxs)(`div`,{className:`projects-modal-header`,children:[(0,c.jsxs)(`h3`,{children:[`Create Team for '`,h?.name,`'`]}),(0,c.jsx)(`button`,{className:`projects-modal-close`,onClick:()=>j(!1),children:`×`})]}),(0,c.jsxs)(`form`,{onSubmit:Ae,children:[(0,c.jsxs)(`div`,{className:`projects-modal-body`,children:[(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Team Name *`}),(0,c.jsx)(`input`,{type:`text`,required:!0,value:z.name,onChange:e=>B({...z,name:e.target.value}),placeholder:`e.g. Frontend Squad`,id:`inpTeamName`})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Select Department`}),(0,c.jsx)(`select`,{value:z.department,onChange:e=>B({...z,department:e.target.value}),children:[{value:`python_dev`,label:`Python Developer`},{value:`java_dev`,label:`Java Developer`},{value:`frontend_dev`,label:`Front-End Developer`},{value:`backend_dev`,label:`Back-End Developer`},{value:`fullstack_dev`,label:`Full Stack Developer`},{value:`testing`,label:`Testing / QA`},{value:`devops`,label:`DevOps Engineer`},{value:`data_analyst`,label:`Data Analyst`},{value:`data_scientist`,label:`Data Scientist`},{value:`ai_ml`,label:`AI / ML Engineer`},{value:`cyber_security`,label:`Cyber Security`},{value:`cloud_engineer`,label:`Cloud Engineer`},{value:`ui_ux`,label:`UI / UX Designer`},{value:`mobile_dev`,label:`Mobile App Developer`}].map(e=>(0,c.jsx)(`option`,{value:e.value,children:e.label},e.value))})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Assign Team Leader`}),(0,c.jsxs)(`select`,{value:z.lead,onChange:e=>B({...z,lead:e.target.value}),id:`selTeamLead`,children:[(0,c.jsx)(`option`,{value:``,children:`Select Team Lead`}),Se.map(e=>(0,c.jsx)(`option`,{value:e.id,children:e.name||e.username},e.id))]})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Maximum Team Size`}),(0,c.jsx)(`input`,{type:`number`,value:z.max_size,onChange:e=>B({...z,max_size:parseInt(e.target.value)||10}),placeholder:`10`})]}),(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Description`}),(0,c.jsx)(`textarea`,{rows:2,value:z.description,onChange:e=>B({...z,description:e.target.value}),placeholder:`Brief squad focus...`})]})]}),(0,c.jsxs)(`div`,{className:`projects-modal-footer`,children:[(0,c.jsx)(`button`,{type:`button`,className:`projects-btn projects-btn-secondary`,onClick:()=>j(!1),children:`Cancel`}),(0,c.jsx)(`button`,{type:`submit`,className:`projects-btn projects-btn-primary`,id:`btnSubmitTeam`,children:`Create Team`})]})]})]})}),ve&&(0,c.jsx)(`div`,{className:`projects-modal-overlay`,children:(0,c.jsxs)(`div`,{className:`projects-modal`,children:[(0,c.jsxs)(`div`,{className:`projects-modal-header`,children:[(0,c.jsxs)(`h3`,{children:[`Assign Employee to Team '`,N?.name,`'`]}),(0,c.jsx)(`button`,{className:`projects-modal-close`,onClick:()=>M(!1),children:`×`})]}),(0,c.jsxs)(`div`,{className:`projects-modal-body`,children:[(0,c.jsxs)(`div`,{className:`projects-form-group`,children:[(0,c.jsx)(`label`,{children:`Select Employee *`}),(0,c.jsxs)(`select`,{onChange:e=>Ne(e.target.value),defaultValue:``,id:`selEmployeeMember`,children:[(0,c.jsx)(`option`,{value:``,disabled:!0,children:`Choose Employee`}),Ce.map(e=>(0,c.jsxs)(`option`,{value:e.id,children:[e.name||e.username,` (`,e.emp_id,`) — `,e.department_display||e.department]},e.id))]})]}),(0,c.jsx)(`p`,{style:{fontSize:`12px`,color:`var(--muted)`,marginTop:`8px`},children:`Note: An employee can only be assigned to one active project at a time. The system will prevent double booking.`})]}),(0,c.jsx)(`div`,{className:`projects-modal-footer`,children:(0,c.jsx)(`button`,{type:`button`,className:`projects-btn projects-btn-secondary`,onClick:()=>M(!1),children:`Close`})})]})})]})};export{l as default};