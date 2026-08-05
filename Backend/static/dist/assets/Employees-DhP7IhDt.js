import{c as e,d as t,f as n,l as r,n as i,o as a,r as o,u as s}from"./index-OYoV3RNy.js";var c=n(s(),1),l=t(),u=()=>{let{user:t}=o(),{showToast:n}=i(),s=r(),u=e(),d=t?.role,[f,p]=(0,c.useState)([]),[m,h]=(0,c.useState)(!0),[g,_]=(0,c.useState)(``),v=()=>{let e=u.pathname;return e.includes(`hr-list`)?`HR`:e.includes(`manager-list`)?`Manager`:e.includes(`tl-list`)?`TeamLead`:e.includes(`employee-list`)?`Employee`:`All`},[y,b]=(0,c.useState)(v()),[x,S]=(0,c.useState)(`All`),[C,w]=(0,c.useState)(u.state?.filter||`All`),[T,E]=(0,c.useState)(null),[D,O]=(0,c.useState)(!1),[k,A]=(0,c.useState)({fullname:``,email:``,phone:``,designation:``,department:``,team_name:``,role:``,salary:``,date_of_joining:``,status:``,experience_years:``,address:``});(0,c.useEffect)(()=>{b(v()),w(u.state?.filter||`All`)},[u.pathname,u.state]);let j=async()=>{h(!0);try{p((await a.get(`/api/users/`,{params:{scope:`directory`}})).data)}catch(e){console.error(`Error fetching employee directory:`,e),n(`Failed to load employee directory.`,`error`)}finally{h(!1)}};if((0,c.useEffect)(()=>{[`HR`,`MD`,`Manager`,`TeamLead`].includes(d)&&j()},[d]),![`HR`,`MD`,`Manager`,`TeamLead`].includes(d))return(0,l.jsx)(`div`,{style:{color:`var(--danger)`,fontWeight:700,padding:`30px`,textAlign:`center`},children:`Access Denied: Only administrators, managers, and team leads can access the directory.`});let M=[`All`,...new Set(f.map(e=>e.department_display||e.department).filter(Boolean))],N=f.filter(e=>{let t=g.toLowerCase(),n=(e.name||``).toLowerCase().includes(t)||(e.username||``).toLowerCase().includes(t)||(e.emp_id||``).toLowerCase().includes(t)||(e.designation||``).toLowerCase().includes(t),r=y===`All`||e.role===y,i=x===`All`||(e.department_display||e.department)===x,a=!0;if(C===`NewJoiners`)if(!e.date_of_joining)a=!1;else{let t=new Date(e.date_of_joining),n=new Date;n.setDate(n.getDate()-30),a=t>=n}else C===`DocsPending`&&(a=!!e.document);return n&&r&&i&&a}),P=(e,t,n)=>(0,l.jsx)(`div`,{style:{width:`42px`,height:`42px`,borderRadius:`50%`,flexShrink:0,background:t||`var(--accent-blue)`,color:n||`#fff`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontWeight:800,fontSize:`1.05rem`,boxShadow:`0 2px 4px rgba(0,0,0,0.05)`},children:e?e.charAt(0).toUpperCase():`?`}),F=()=>{A({fullname:T.name||``,email:T.email||T.username||``,phone:T.phone||``,designation:T.designation||``,department:T.department||``,team_name:T.team_name||``,role:T.role||``,salary:T.salary||``,date_of_joining:T.date_of_joining||``,status:T.status||`Fresher`,experience_years:T.experience_years||``,address:T.address||``}),O(!0)},I=async e=>{e.preventDefault();try{let e=await a.put(`/api/users/${T.id}/`,k);n(`Employee details updated successfully.`,`success`),E(e.data),O(!1),j()}catch(e){n(e.response?.data?.detail||`Failed to update employee details.`,`error`)}},L=async e=>{if(window.confirm(`Are you sure you want to permanently delete this employee? This action cannot be undone.`))try{await a.delete(`/api/users/${e}/`),n(`Employee deleted successfully.`,`success`),E(null),O(!1),j()}catch(e){n(e.response?.data?.detail||`Failed to delete employee.`,`error`)}};return(0,l.jsxs)(`div`,{className:`directory-container`,children:[(0,l.jsx)(`style`,{children:`
        .directory-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }
        .dir-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }
        .dir-filters {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
          box-shadow: var(--card-shadow);
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-start;
        }
        .filter-group label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .filter-group select, .filter-group input {
          padding: 8px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #0f172a;
          outline: none;
          background: #f8fafc;
          min-width: 160px;
          transition: border-color 0.15s;
        }
        .filter-group select:focus, .filter-group input:focus {
          border-color: #3b82f6;
          background: #ffffff;
        }
        .role-pill {
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .role-pill.MD { background: #fee2e2; color: #991b1b; }
        .role-pill.HR { background: #fce7f3; color: #9d174d; }
        .role-pill.Manager { background: #e0f2fe; color: #0369a1; }
        .role-pill.TeamLead { background: #fef3c7; color: #92400e; }
        .role-pill.Employee { background: #d1fae5; color: #065f46; }

        .dir-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .dir-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          box-shadow: var(--card-shadow);
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
        }
        .dir-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
          border-color: #cbd5e1;
        }
        .dir-card-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }
        .dir-card-name {
          font-weight: 800;
          color: #0f172a;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dir-card-role {
          align-self: flex-start;
          margin-bottom: 4px;
        }
        .dir-card-sub {
          font-size: 0.78rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dir-card-sub i {
          color: #94a3b8;
          width: 14px;
        }
        .dir-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 600px) {
          .dir-modal-grid {
            grid-template-columns: 1fr;
          }
        }
        .dir-modal-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .dir-modal-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b;
        }

        .dir-edit-input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          font-size: 0.85rem;
          color: #0f172a;
          outline: none;
          transition: all 0.2s;
        }
        .dir-edit-input:focus {
          border-color: #3b82f6;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}),(0,l.jsxs)(`div`,{className:`dir-header`,children:[(0,l.jsx)(`h2`,{style:{color:`var(--primary-color)`,margin:0,fontFamily:`var(--font-display)`,fontWeight:800},children:`Staff & Member Directory`}),[`HR`,`MD`].includes(d)&&(0,l.jsxs)(`button`,{className:`btn`,style:{margin:0},onClick:()=>s(`/register`),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-user-plus`}),` Add New Staff Member`]})]}),(0,l.jsxs)(`div`,{className:`dir-filters`,children:[(0,l.jsxs)(`div`,{className:`filter-group`,style:{flex:1,minWidth:`220px`},children:[(0,l.jsx)(`label`,{children:`Search Directory`}),(0,l.jsx)(`input`,{type:`text`,placeholder:`🔍 Search name, email, designation...`,value:g,onChange:e=>_(e.target.value),style:{width:`100%`}})]}),(0,l.jsxs)(`div`,{className:`filter-group`,children:[(0,l.jsx)(`label`,{children:`Filter by Role`}),(0,l.jsxs)(`select`,{value:y,onChange:e=>b(e.target.value),children:[(0,l.jsx)(`option`,{value:`All`,children:`All Roles`}),(0,l.jsx)(`option`,{value:`Employee`,children:`Employees / Devs`}),(0,l.jsx)(`option`,{value:`TeamLead`,children:`Team Leads`}),(0,l.jsx)(`option`,{value:`Manager`,children:`Managers`}),(0,l.jsx)(`option`,{value:`HR`,children:`HR Specialist`}),(0,l.jsx)(`option`,{value:`MD`,children:`Managing Director`})]})]}),(0,l.jsxs)(`div`,{className:`filter-group`,children:[(0,l.jsx)(`label`,{children:`Filter by Department`}),(0,l.jsx)(`select`,{value:x,onChange:e=>S(e.target.value),children:M.map((e,t)=>(0,l.jsx)(`option`,{value:e,children:e===`All`?`All Departments`:e},t))})]}),C!==`All`&&(0,l.jsxs)(`div`,{className:`filter-group`,children:[(0,l.jsx)(`label`,{children:`Dashboard Filter`}),(0,l.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,height:`38px`},children:[(0,l.jsx)(`span`,{className:`badge-capsule info`,style:{padding:`8px 12px`,fontWeight:700},children:C===`NewJoiners`?`🆕 New Joiners`:`📑 Pending Docs`}),(0,l.jsx)(`button`,{className:`view-btn`,style:{padding:`4px 8px`,fontSize:`11px`},onClick:()=>{w(`All`),s(u.pathname,{replace:!0,state:{}})},children:`Clear`})]})]})]}),m?(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`50px`,color:`var(--muted)`},children:[(0,l.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:`2rem`,marginRight:`10px`}}),` Loading Staff Directory...`]}):N.length>0?(0,l.jsx)(`div`,{className:`dir-grid`,children:N.map(e=>(0,l.jsxs)(`div`,{className:`dir-card`,onClick:()=>{E(e),O(!1)},children:[e.profile_pic?(0,l.jsx)(`img`,{src:e.profile_pic,alt:e.name,style:{width:`42px`,height:`42px`,borderRadius:`50%`,objectFit:`cover`,flexShrink:0,boxShadow:`0 2px 4px rgba(0,0,0,0.05)`},onError:e=>{e.target.style.display=`none`}}):P(e.name,e.role===`MD`?`#fecaca`:e.role===`HR`?`#fce7f3`:e.role===`Manager`?`#e0f2fe`:`#d1fae5`,e.role===`MD`?`#991b1b`:e.role===`HR`?`#9d174d`:e.role===`Manager`?`#0369a1`:`#065f46`),(0,l.jsxs)(`div`,{className:`dir-card-info`,children:[(0,l.jsx)(`span`,{className:`role-pill ${e.role} dir-card-role`,children:e.role===`TeamLead`?`Team Lead`:e.role}),(0,l.jsx)(`div`,{className:`dir-card-name`,children:e.name}),(0,l.jsxs)(`div`,{className:`dir-card-sub`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-id-badge`}),(0,l.jsx)(`span`,{children:e.emp_id||`No ID`})]}),(0,l.jsxs)(`div`,{className:`dir-card-sub`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-briefcase`}),(0,l.jsx)(`span`,{children:e.designation||e.department_display||`Staff member`})]}),(0,l.jsxs)(`div`,{className:`dir-card-sub`,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-envelope`}),(0,l.jsx)(`span`,{children:e.email})]})]})]},e.id))}):(0,l.jsxs)(`div`,{style:{background:`#fff`,border:`1px solid var(--border)`,borderRadius:`12px`,padding:`50px 20px`,textAlign:`center`,color:`#94a3b8`},children:[(0,l.jsx)(`i`,{className:`fa-solid fa-users-slash`,style:{fontSize:`2.5rem`,marginBottom:`12px`,display:`block`,color:`#cbd5e1`}}),`No staff members match the selected filters.`]}),T&&(0,l.jsx)(`div`,{className:`modal-overlay`,onClick:()=>{E(null),O(!1)},children:(0,l.jsxs)(`div`,{className:`modal-container`,style:{maxWidth:`650px`},onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(`div`,{className:`modal-header`,children:[(0,l.jsx)(`h3`,{children:D?`Edit Staff Profile`:`Staff Member Details`}),(0,l.jsx)(`button`,{className:`modal-close`,onClick:()=>{E(null),O(!1)},children:`×`})]}),(0,l.jsx)(`form`,{onSubmit:I,children:(0,l.jsxs)(`div`,{className:`modal-body`,style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[(0,l.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`,borderBottom:`1px solid #f1f5f9`,paddingBottom:`16px`},children:[T.profile_pic?(0,l.jsx)(`img`,{src:T.profile_pic,alt:T.name,style:{width:`60px`,height:`60px`,borderRadius:`50%`,objectFit:`cover`}}):P(T.name,null,null),(0,l.jsx)(`div`,{style:{textAlign:`left`,flex:1},children:D?(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`6px`},children:[(0,l.jsx)(`label`,{style:{fontSize:`0.72rem`,fontWeight:700,color:`#64748b`},children:`FULL NAME`}),(0,l.jsx)(`input`,{type:`text`,className:`dir-edit-input`,value:k.fullname,onChange:e=>A({...k,fullname:e.target.value}),required:!0})]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`h4`,{style:{margin:`0 0 4px 0`,fontSize:`1.2rem`,fontWeight:800},children:T.name}),(0,l.jsx)(`span`,{className:`role-pill ${T.role}`,children:T.role===`TeamLead`?`Team Lead`:T.role})]})})]}),(0,l.jsxs)(`div`,{className:`dir-modal-grid`,children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Employee ID`}),(0,l.jsx)(`div`,{className:`dir-modal-value`,children:T.emp_id||`N/A`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Email Address`}),D?(0,l.jsx)(`input`,{type:`email`,className:`dir-edit-input`,value:k.email,onChange:e=>A({...k,email:e.target.value}),required:!0}):(0,l.jsx)(`div`,{className:`dir-modal-value`,children:T.email||`N/A`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Phone Number`}),D?(0,l.jsx)(`input`,{type:`text`,className:`dir-edit-input`,value:k.phone,onChange:e=>A({...k,phone:e.target.value})}):(0,l.jsx)(`div`,{className:`dir-modal-value`,children:T.phone||`N/A`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Designation`}),D?(0,l.jsx)(`input`,{type:`text`,className:`dir-edit-input`,value:k.designation,onChange:e=>A({...k,designation:e.target.value})}):(0,l.jsx)(`div`,{className:`dir-modal-value`,children:T.designation||`N/A`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Department Code`}),D?(0,l.jsxs)(`select`,{className:`dir-edit-input`,value:k.department,onChange:e=>A({...k,department:e.target.value}),children:[(0,l.jsx)(`option`,{value:``,children:`No Department`}),(0,l.jsx)(`option`,{value:`technology`,children:`Technology Development`}),(0,l.jsx)(`option`,{value:`ui_ux`,children:`UI/UX Creative Design`}),(0,l.jsx)(`option`,{value:`digital_marketing`,children:`Digital Marketing`}),(0,l.jsx)(`option`,{value:`sales`,children:`Sales & Accounts Strategy`}),(0,l.jsx)(`option`,{value:`hr`,children:`HR Administration`})]}):(0,l.jsx)(`div`,{className:`dir-modal-value`,children:T.department_display||T.department||`N/A`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Team Scope`}),D?(0,l.jsx)(`input`,{type:`text`,className:`dir-edit-input`,value:k.team_name,onChange:e=>A({...k,team_name:e.target.value})}):(0,l.jsx)(`div`,{className:`dir-modal-value`,children:T.team_name||`N/A`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Account Role`}),D?(0,l.jsxs)(`select`,{className:`dir-edit-input`,value:k.role,onChange:e=>A({...k,role:e.target.value}),children:[(0,l.jsx)(`option`,{value:`Employee`,children:`Employee / Developer`}),(0,l.jsx)(`option`,{value:`TeamLead`,children:`Team Lead`}),(0,l.jsx)(`option`,{value:`Manager`,children:`Manager`}),(0,l.jsx)(`option`,{value:`HR`,children:`HR Specialist`}),(0,l.jsx)(`option`,{value:`MD`,children:`Managing Director`})]}):(0,l.jsx)(`div`,{className:`dir-modal-value`,children:T.role||`N/A`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Date of Joining`}),D?(0,l.jsx)(`input`,{type:`date`,className:`dir-edit-input`,value:k.date_of_joining,onChange:e=>A({...k,date_of_joining:e.target.value})}):(0,l.jsx)(`div`,{className:`dir-modal-value`,children:T.date_of_joining||`N/A`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Employment Status`}),D?(0,l.jsxs)(`select`,{className:`dir-edit-input`,value:k.status,onChange:e=>A({...k,status:e.target.value}),children:[(0,l.jsx)(`option`,{value:`Fresher`,children:`Fresher`}),(0,l.jsx)(`option`,{value:`Experienced`,children:`Experienced`}),(0,l.jsx)(`option`,{value:`Intern`,children:`Intern`})]}):(0,l.jsx)(`div`,{className:`dir-modal-value`,children:T.status||`N/A`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Experience (Years)`}),D?(0,l.jsx)(`input`,{type:`number`,className:`dir-edit-input`,value:k.experience_years,onChange:e=>A({...k,experience_years:e.target.value})}):(0,l.jsx)(`div`,{className:`dir-modal-value`,children:T.experience_years?`${T.experience_years} Years`:`N/A`})]}),[`HR`,`MD`].includes(d)&&(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Salary (Monthly Gross)`}),D?(0,l.jsx)(`input`,{type:`number`,className:`dir-edit-input`,value:k.salary,onChange:e=>A({...k,salary:e.target.value})}):(0,l.jsxs)(`div`,{className:`dir-modal-value`,children:[`₹`,T.salary||`N/A`]})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Reporting Manager`}),(0,l.jsx)(`div`,{className:`dir-modal-value`,children:T.reporting_manager_name||`N/A`})]})]}),(0,l.jsxs)(`div`,{style:{textAlign:`left`},children:[(0,l.jsx)(`div`,{className:`dir-modal-label`,children:`Home Address`}),D?(0,l.jsx)(`textarea`,{rows:`2`,className:`dir-edit-input`,value:k.address,onChange:e=>A({...k,address:e.target.value})}):(0,l.jsx)(`div`,{className:`dir-modal-value`,style:{fontWeight:400},children:T.address||`N/A`})]}),!D&&[`HR`,`MD`].includes(d)&&T.role===`Employee`&&(0,l.jsxs)(`div`,{style:{borderTop:`1px solid #f1f5f9`,paddingTop:`16px`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,l.jsx)(`span`,{style:{fontSize:`0.82rem`,color:`#64748b`},children:`Verification Document Status:`}),(0,l.jsxs)(`button`,{type:`button`,className:`btn approve`,onClick:()=>handleVerifyDoc(T.id),style:{margin:0,padding:`8px 16px`},children:[(0,l.jsx)(`i`,{className:`fa-solid fa-file-circle-check`}),` Verify Documents`]})]}),[`HR`,`MD`].includes(d)&&(0,l.jsx)(`div`,{style:{borderTop:`1px solid #f1f5f9`,paddingTop:`16px`,display:`flex`,justifyContent:`flex-end`,gap:`10px`},children:D?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`button`,{type:`button`,className:`btn`,style:{background:`#64748b`,marginTop:0},onClick:()=>O(!1),children:`Cancel`}),(0,l.jsx)(`button`,{type:`submit`,className:`btn`,style:{marginTop:0},children:`Save Changes`})]}):(0,l.jsxs)(l.Fragment,{children:[T.id!==t.id&&(0,l.jsxs)(`button`,{type:`button`,className:`btn`,style:{background:`#ef4444`,marginTop:0},onClick:()=>L(T.id),children:[(0,l.jsx)(`i`,{className:`fa-solid fa-trash-can`}),` Delete Member`]}),(0,l.jsxs)(`button`,{type:`button`,className:`btn`,style:{marginTop:0},onClick:F,children:[(0,l.jsx)(`i`,{className:`fa-solid fa-user-pen`}),` Edit Profile`]})]})})]})})]})})]})};export{u as default};