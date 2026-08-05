import{d as e,f as t,i as n,n as r,s as i,t as a}from"./index-AkGv6LCI.js";var o=t(e(),1),s=n(),c=()=>{let{showToast:e}=r(),{confirm:t}=a(),[n,c]=(0,o.useState)([]),[l,u]=(0,o.useState)(!0),[d,f]=(0,o.useState)(``),[p,m]=(0,o.useState)(``),[h,g]=(0,o.useState)(``),[_,v]=(0,o.useState)(``),[y,b]=(0,o.useState)(`18`),[x,S]=(0,o.useState)(``),[C,w]=(0,o.useState)(`Active`),[T,E]=(0,o.useState)(null),[D,O]=(0,o.useState)(!1),k=async()=>{u(!0);try{c((await i.get(`/api/services/`)).data)}catch(e){console.error(`Error loading services:`,e)}finally{u(!1)}};(0,o.useEffect)(()=>{k()},[]);let A=async t=>{t.preventDefault(),O(!0);let n={name:d,service_code:p,department:h,description:_,gst_percent:parseFloat(y),amount:parseFloat(x),status:C};try{T?(await i.put(`/api/services/${T}/`,n),e(`Service updated successfully.`,`success`)):(await i.post(`/api/services/`,n),e(`Service registered successfully.`,`success`)),N(),k()}catch(t){e(t.response?.data?.detail||`Failed to save service.`,`error`)}finally{O(!1)}},j=e=>{E(e.id),f(e.name||``),m(e.service_code||``),g(e.department||``),v(e.description||``),b(String(e.gst_percent||`18`)),S(String(e.amount||``)),w(e.status||`Active`)},M=async n=>{if(await t(`Are you sure you want to delete this service?`))try{await i.delete(`/api/services/${n}/`),e(`Service deleted successfully.`,`success`),k()}catch{e(`Failed to delete service.`,`error`)}},N=()=>{E(null),f(``),m(``),g(``),v(``),b(`18`),S(``),w(`Active`)};return(0,s.jsxs)(`div`,{className:`attendance-workspace-container`,style:{display:`grid`,gridTemplateColumns:`1.2fr 1fr`,gap:`24px`,alignItems:`start`,padding:`20px`,background:`#f8fafc`,minHeight:`100vh`},children:[(0,s.jsx)(`style`,{children:`
        .premium-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          padding: 24px;
        }
        .premium-title {
          font-family: var(--font-display), sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          color: #0f172a;
          margin-bottom: 20px;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 12px;
          text-align: left;
        }
        .premium-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
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
        .premium-btn-secondary {
          padding: 12px 24px;
          border-radius: 10px;
          border: 1.5px solid #cbd5e1;
          background-color: #ffffff;
          color: #475569;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        .premium-btn-secondary:hover {
          background-color: #f8fafc;
          border-color: #94a3b8;
          color: #0f172a;
        }
      `}),(0,s.jsxs)(`div`,{className:`premium-card`,children:[(0,s.jsx)(`h2`,{className:`premium-title`,children:`Active Company Services`}),l?(0,s.jsx)(`div`,{children:`Loading services...`}):(0,s.jsx)(`div`,{className:`table-wrap`,children:(0,s.jsxs)(`table`,{children:[(0,s.jsx)(`thead`,{children:(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`th`,{children:`Code`}),(0,s.jsx)(`th`,{children:`Service Name`}),(0,s.jsx)(`th`,{children:`Price`}),(0,s.jsx)(`th`,{children:`GST`}),(0,s.jsx)(`th`,{children:`Status`}),(0,s.jsx)(`th`,{children:`Actions`})]})}),(0,s.jsx)(`tbody`,{children:n.map(e=>(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`td`,{children:(0,s.jsx)(`strong`,{children:e.service_code||`N/A`})}),(0,s.jsxs)(`td`,{children:[(0,s.jsx)(`div`,{style:{fontWeight:600},children:e.name}),(0,s.jsx)(`div`,{style:{fontSize:`11px`,color:`#64748b`},children:e.department||`N/A`})]}),(0,s.jsxs)(`td`,{children:[`₹`,parseFloat(e.amount||0).toFixed(2)]}),(0,s.jsxs)(`td`,{children:[e.gst_percent,`%`]}),(0,s.jsx)(`td`,{children:(0,s.jsx)(`span`,{className:`badge-capsule ${e.status?.toLowerCase()}`,children:e.status})}),(0,s.jsx)(`td`,{children:(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`6px`},children:[(0,s.jsx)(`button`,{className:`btn`,style:{padding:`4px 8px`,fontSize:`12px`},onClick:()=>j(e),children:`Edit`}),(0,s.jsx)(`button`,{className:`btn`,style:{padding:`4px 8px`,fontSize:`12px`,background:`#ef4444`},onClick:()=>M(e.id),children:`Delete`})]})})]},e.id))})]})})]}),(0,s.jsxs)(`div`,{className:`premium-card`,style:{position:`sticky`,top:`20px`},children:[(0,s.jsx)(`h2`,{className:`premium-title`,children:T?`Edit Service Details`:`Register Company Service`}),(0,s.jsxs)(`form`,{onSubmit:A,className:`premium-form`,children:[(0,s.jsxs)(`div`,{className:`premium-form-group`,children:[(0,s.jsx)(`label`,{children:`Service Name`}),(0,s.jsx)(`input`,{type:`text`,value:d,onChange:e=>f(e.target.value),required:!0,placeholder:`e.g. Cloud Consultation`})]}),(0,s.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`15px`},children:[(0,s.jsxs)(`div`,{className:`premium-form-group`,children:[(0,s.jsx)(`label`,{children:`Service Code`}),(0,s.jsx)(`input`,{type:`text`,value:p,onChange:e=>m(e.target.value),placeholder:`e.g. SRV-001`})]}),(0,s.jsxs)(`div`,{className:`premium-form-group`,children:[(0,s.jsx)(`label`,{children:`Department`}),(0,s.jsx)(`input`,{type:`text`,value:h,onChange:e=>g(e.target.value),placeholder:`e.g. IT Department`})]})]}),(0,s.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`15px`},children:[(0,s.jsxs)(`div`,{className:`premium-form-group`,children:[(0,s.jsx)(`label`,{children:`Price (₹)`}),(0,s.jsx)(`input`,{type:`number`,value:x,onChange:e=>S(e.target.value),required:!0,placeholder:`e.g. 5000`})]}),(0,s.jsxs)(`div`,{className:`premium-form-group`,children:[(0,s.jsx)(`label`,{children:`GST Rate (%)`}),(0,s.jsx)(`input`,{type:`number`,value:y,onChange:e=>b(e.target.value),required:!0,placeholder:`18`})]})]}),(0,s.jsxs)(`div`,{className:`premium-form-group`,children:[(0,s.jsx)(`label`,{children:`Service Description`}),(0,s.jsx)(`textarea`,{value:_,onChange:e=>v(e.target.value),rows:`3`,placeholder:`Enter brief service deliverables...`})]}),(0,s.jsxs)(`div`,{className:`premium-form-group`,children:[(0,s.jsx)(`label`,{children:`Service Status`}),(0,s.jsxs)(`select`,{value:C,onChange:e=>w(e.target.value),children:[(0,s.jsx)(`option`,{value:`Active`,children:`Active`}),(0,s.jsx)(`option`,{value:`Inactive`,children:`Inactive`})]})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:`10px`,marginTop:`10px`},children:[(0,s.jsx)(`button`,{type:`submit`,className:`premium-btn-primary`,disabled:D,style:{flex:1},children:T?`Update Service`:`Add Service`}),T&&(0,s.jsx)(`button`,{type:`button`,className:`premium-btn-secondary`,onClick:N,style:{flex:1},children:`Cancel`})]})]})]})]})};export{c as default};