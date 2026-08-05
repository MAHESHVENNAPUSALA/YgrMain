import{d as e,f as t,i as n,n as r,r as i,s as a,t as o}from"./index-DqFqRayx.js";var s=t(e(),1),c=n(),l=()=>{let{user:e}=i(),{showToast:t}=r(),{confirm:n}=o(),l=e?.role,[u,d]=(0,s.useState)([]),[f,p]=(0,s.useState)(!0),[m,h]=(0,s.useState)(``),[g,_]=(0,s.useState)(``),[v,y]=(0,s.useState)(``),[b,x]=(0,s.useState)(!1),S=async()=>{p(!0);try{d((await a.get(`/api/holidays/`)).data)}catch(e){console.error(`Error loading holidays:`,e)}finally{p(!1)}};(0,s.useEffect)(()=>{S()},[]);let C=async e=>{e.preventDefault(),x(!0);try{await a.post(`/api/holidays/`,{name:m,date:g,department:v}),t(`Holiday created successfully.`,`success`),h(``),_(``),y(``),S()}catch(e){t(e.response?.data?.detail||`Failed to create holiday.`,`error`)}finally{x(!1)}},w=async e=>{if(await n(`Are you sure you want to delete this holiday?`))try{await a.delete(`/api/holidays/${e}/`),t(`Holiday deleted.`,`success`),S()}catch(e){t(e.response?.data?.detail||`Failed to delete holiday.`,`error`)}};return(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`style`,{children:`
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
      `}),(0,c.jsx)(`h2`,{style:{color:`var(--primary-color)`,marginBottom:`20px`,fontFamily:`var(--font-display)`,fontWeight:800},children:`Holiday Registry`}),(0,c.jsxs)(`div`,{className:`holiday-grid`,children:[(0,c.jsxs)(`div`,{className:`dashboard-panel-card holiday-list-card`,children:[(0,c.jsx)(`div`,{className:`panel-header`,children:(0,c.jsx)(`h2`,{children:`📅 Corporate Holidays`})}),(0,c.jsx)(`div`,{className:`panel-body`,children:f?(0,c.jsx)(`div`,{children:`Loading holidays...`}):u.length>0?u.map(e=>(0,c.jsxs)(`div`,{className:`holiday-item`,children:[(0,c.jsxs)(`div`,{className:`holiday-details`,children:[(0,c.jsx)(`span`,{className:`holiday-title`,children:e.name}),(0,c.jsxs)(`span`,{className:`holiday-date`,children:[(0,c.jsx)(`i`,{className:`fa-regular fa-calendar`,style:{marginRight:`6px`}}),new Date(e.date).toLocaleDateString(`en-US`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`})]}),e.department&&(0,c.jsx)(`div`,{children:(0,c.jsx)(`span`,{className:`holiday-dept-badge`,children:e.department.replace(`_`,` `)})})]}),[`HR`,`MD`].includes(l)&&(0,c.jsx)(`button`,{className:`view-btn`,style:{color:`#ef4444`,background:`rgba(239, 68, 68, 0.1)`,border:`none`,cursor:`pointer`},onClick:()=>w(e.id),children:`Delete`})]},e.id)):(0,c.jsx)(`p`,{style:{color:`var(--muted)`,fontSize:`13px`},children:`No corporate holidays scheduled.`})})]}),[`HR`,`MD`].includes(l)&&(0,c.jsxs)(`div`,{className:`dashboard-panel-card`,children:[(0,c.jsx)(`div`,{className:`panel-header`,children:(0,c.jsx)(`h2`,{children:`✍️ Schedule Holiday`})}),(0,c.jsx)(`div`,{className:`panel-body`,children:(0,c.jsxs)(`form`,{onSubmit:C,style:{textAlign:`left`},children:[(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Holiday Description / Name`}),(0,c.jsx)(`input`,{type:`text`,value:m,onChange:e=>h(e.target.value),required:!0,placeholder:`e.g. Independence Day`})]}),(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Holiday Date`}),(0,c.jsx)(`input`,{type:`date`,value:g,onChange:e=>_(e.target.value),required:!0})]}),(0,c.jsxs)(`div`,{className:`form-group`,children:[(0,c.jsx)(`label`,{children:`Department Scope (Optional)`}),(0,c.jsx)(`input`,{type:`text`,value:v,onChange:e=>y(e.target.value),placeholder:`e.g. technology (leave blank for all)`})]}),(0,c.jsx)(`button`,{type:`submit`,className:`btn`,disabled:b,style:{width:`100%`},children:b?`Scheduling holiday...`:`Add to Holiday Calendar`})]})})]})]})]})};export{l as default};