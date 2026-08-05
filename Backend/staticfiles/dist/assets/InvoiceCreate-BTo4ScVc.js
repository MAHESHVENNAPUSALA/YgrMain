import{d as e,f as t,i as n,n as r,s as i}from"./index-Bvz4ZykM.js";var a=t(e(),1),o=n(),s=()=>{let{showToast:e}=r(),[t,n]=(0,a.useState)([]),[s,c]=(0,a.useState)([]),[l,u]=(0,a.useState)(!0),[d,f]=(0,a.useState)(``),[p,m]=(0,a.useState)(``),[h,g]=(0,a.useState)(`Pending`),[_,v]=(0,a.useState)(``),[y,b]=(0,a.useState)(``),[x,S]=(0,a.useState)(`0`),[C,w]=(0,a.useState)(`18`),[T,E]=(0,a.useState)(``),[D,O]=(0,a.useState)([{service:``,amount:``,discount_percent:`0`}]),[k,A]=(0,a.useState)(!1),j=async()=>{u(!0);try{let e=await i.get(`/api/invoicing-resources/`);n(e.data.clients||[]),c(e.data.services||[])}catch(e){console.error(`Error loading invoicing resources:`,e)}finally{u(!1)}};(0,a.useEffect)(()=>{j()},[]);let M=()=>{O([...D,{service:``,amount:``,discount_percent:`0`}])},N=e=>{let t=[...D];t.splice(e,1),O(t)},P=(e,t,n)=>{let r=[...D];if(r[e][t]=n,t===`service`){let t=s.find(e=>e.id===Number(n));t&&(r[e].amount=t.amount)}O(r)},F=async t=>{if(!d){e(`Please choose a client.`,`warning`);return}let n=D.filter(e=>e.service!==``);if(n.length===0){e(`Please add at least one valid service item.`,`warning`);return}if(t===`preview`){e(`Generating preview calculations. Verify Grand Total in table below.`,`info`);return}A(!0);try{let r={client:d,project:p,discount_percent:x,gst_percent:C,note:T,status:t===`draft`?`Pending`:h,due_date:_||null,paid_date:y||null,items:n};await i.post(`/api/invoices/`,r),e(t===`draft`?`Invoice draft saved successfully.`:`Invoice generated successfully.`,`success`),t===`pdf`&&window.print(),f(``),m(``),g(`Pending`),v(``),b(``),S(`0`),w(`18`),E(``),O([{service:``,amount:``,discount_percent:`0`}])}catch(t){e(t.response?.data?.detail||`Failed to process invoice.`,`error`)}finally{A(!1)}};return(0,o.jsxs)(`div`,{className:`attendance-workspace-container`,style:{padding:`20px`,background:`#f8fafc`,minHeight:`100vh`},children:[(0,o.jsx)(`style`,{children:`
        .premium-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          padding: 30px;
          max-width: 900px;
          margin: 0 auto;
        }
        .premium-title {
          font-family: var(--font-display), sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          color: #0f172a;
          margin-bottom: 25px;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 12px;
          text-align: left;
        }
        .premium-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }
        .premium-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .premium-form-group label {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #475569;
        }
        .premium-form-group input, 
        .premium-form-group select, 
        .premium-form-group textarea {
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 0.92rem;
          color: #0f172a;
          transition: all 0.2s ease-in-out;
          width: 100%;
        }
        .premium-form-group input:focus, 
        .premium-form-group select:focus, 
        .premium-form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .premium-btn-primary {
          padding: 12px 24px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
        }
        .premium-btn-primary:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }
      `}),(0,o.jsxs)(`div`,{className:`premium-card`,children:[(0,o.jsx)(`h2`,{className:`premium-title`,children:`Compile Client Invoice`}),l?(0,o.jsx)(`div`,{children:`Loading resources...`}):(0,o.jsxs)(`form`,{onSubmit:e=>e.preventDefault(),className:`premium-form`,children:[(0,o.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(200px, 1fr))`,gap:`15px`},children:[(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Client Profile`}),(0,o.jsxs)(`select`,{value:d,onChange:e=>f(e.target.value),required:!0,children:[(0,o.jsx)(`option`,{value:``,children:`Choose Client...`}),t.map(e=>(0,o.jsxs)(`option`,{value:e.id,children:[e.name,` (`,e.business_name||`N/A`,`)`]},e.id))]})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Project Name`}),(0,o.jsx)(`input`,{type:`text`,value:p,onChange:e=>m(e.target.value),placeholder:`e.g. Website Redesign`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`GST Rate (%)`}),(0,o.jsx)(`input`,{type:`number`,value:C,onChange:e=>w(e.target.value),min:`0`})]})]}),(0,o.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(200px, 1fr))`,gap:`15px`},children:[(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Due Date`}),(0,o.jsx)(`input`,{type:`date`,value:_,onChange:e=>v(e.target.value)})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Paid Date`}),(0,o.jsx)(`input`,{type:`date`,value:y,onChange:e=>b(e.target.value)})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Invoice Status`}),(0,o.jsxs)(`select`,{value:h,onChange:e=>g(e.target.value),children:[(0,o.jsx)(`option`,{value:`Pending`,children:`Pending`}),(0,o.jsx)(`option`,{value:`Paid`,children:`Paid`}),(0,o.jsx)(`option`,{value:`Unpaid`,children:`Unpaid`})]})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Discount (%)`}),(0,o.jsx)(`input`,{type:`number`,value:x,onChange:e=>S(e.target.value),min:`0`,max:`100`})]})]}),(0,o.jsx)(`h4`,{style:{margin:`20px 0 10px 0`,borderBottom:`1px solid var(--border)`,paddingBottom:`6px`,color:`var(--primary-color)`},children:`Line Items Settings`}),D.map((e,t)=>(0,o.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`2fr 1fr 1fr auto`,gap:`15px`,alignItems:`center`},children:[(0,o.jsx)(`div`,{className:`premium-form-group`,style:{marginBottom:0},children:(0,o.jsxs)(`select`,{value:e.service,onChange:e=>P(t,`service`,e.target.value),required:!0,children:[(0,o.jsx)(`option`,{value:``,children:`Choose Service...`}),s.map(e=>(0,o.jsxs)(`option`,{value:e.id,children:[e.name,` (Base: ₹`,e.amount,`)`]},e.id))]})}),(0,o.jsx)(`div`,{className:`premium-form-group`,style:{marginBottom:0},children:(0,o.jsx)(`input`,{type:`number`,value:e.amount,onChange:e=>P(t,`amount`,e.target.value),placeholder:`Price Override`,required:!0})}),(0,o.jsx)(`div`,{className:`premium-form-group`,style:{marginBottom:0},children:(0,o.jsx)(`input`,{type:`number`,value:e.discount_percent,onChange:e=>P(t,`discount_percent`,e.target.value),placeholder:`Disc %`})}),(0,o.jsx)(`button`,{type:`button`,className:`btn`,style:{color:`#ef4444`,background:`rgba(239, 68, 68, 0.1)`,padding:`12px 14px`,borderRadius:`10px`,border:`none`},onClick:()=>N(t),children:`Remove`})]},t)),(0,o.jsx)(`button`,{type:`button`,className:`btn`,style:{background:`#3b82f6`,color:`#fff`,width:`200px`,padding:`10px`,borderRadius:`10px`,border:`none`,fontWeight:`bold`},onClick:M,children:`+ Add Item Row`}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Additional Notes / Payment Terms`}),(0,o.jsx)(`textarea`,{rows:`3`,value:T,onChange:e=>E(e.target.value),placeholder:`Terms of payment details...`})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,gap:`15px`,marginTop:`10px`,flexWrap:`wrap`},children:[(0,o.jsx)(`button`,{type:`button`,className:`premium-btn-primary`,onClick:()=>F(`generate`),disabled:k,style:{flex:1},children:`Generate Invoice`}),(0,o.jsx)(`button`,{type:`button`,className:`premium-btn-primary`,onClick:()=>F(`preview`),style:{flex:1,background:`linear-gradient(135deg, #10b981 0%, #059669 100%)`},children:`Preview`}),(0,o.jsx)(`button`,{type:`button`,className:`premium-btn-primary`,onClick:()=>F(`draft`),style:{flex:1,background:`linear-gradient(135deg, #f59e0b 0%, #d97706 100%)`},children:`Save Draft`}),(0,o.jsx)(`button`,{type:`button`,className:`premium-btn-primary`,onClick:()=>F(`pdf`),style:{flex:1,background:`linear-gradient(135deg, #64748b 0%, #475569 100%)`},children:`Download PDF`})]})]})]})]})};export{s as default};