import{d as e,f as t,i as n,n as r,s as i}from"./index-QBd8kfkV.js";var a=t(e(),1),o=n(),s=()=>{let{showToast:e}=r(),[t,n]=(0,a.useState)(``),[s,c]=(0,a.useState)(``),[l,u]=(0,a.useState)(``),[d,f]=(0,a.useState)(``),[p,m]=(0,a.useState)(``),[h,g]=(0,a.useState)(``),[_,v]=(0,a.useState)(`India`),[y,b]=(0,a.useState)(``),[x,S]=(0,a.useState)(``),[C,w]=(0,a.useState)(``),[T,E]=(0,a.useState)(``),[D,O]=(0,a.useState)(`Active`),[k,A]=(0,a.useState)(!1),j=async n=>{n.preventDefault(),A(!0);try{await i.post(`/api/clients/`,{name:t,business_name:s,gst_number:l,email:d,phone:p,address:h,country:_,state:y,city:x,contact_person:C,website:T,status:D}),e(`Client registered successfully.`,`success`),M()}catch(t){e(t.response?.data?.detail||`Failed to save client profile.`,`error`)}finally{A(!1)}},M=()=>{n(``),c(``),u(``),f(``),m(``),g(``),v(`India`),b(``),S(``),w(``),E(``),O(`Active`)};return(0,o.jsxs)(`div`,{className:`attendance-workspace-container`,style:{padding:`20px`,background:`#f8fafc`,minHeight:`100vh`},children:[(0,o.jsx)(`style`,{children:`
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
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          text-align: left;
        }
        @media (max-width: 768px) {
          .premium-form {
            grid-template-columns: 1fr;
          }
        }
        .premium-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .premium-form-group.full-width {
          grid-column: span 2;
        }
        @media (max-width: 768px) {
          .premium-form-group.full-width {
            grid-column: span 1;
          }
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
          padding: 14px 28px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.98rem;
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
          padding: 14px 28px;
          border-radius: 10px;
          border: 1.5px solid #cbd5e1;
          background-color: #ffffff;
          color: #475569;
          font-weight: 700;
          font-size: 0.98rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        .premium-btn-secondary:hover {
          background-color: #f8fafc;
          border-color: #94a3b8;
          color: #0f172a;
        }
      `}),(0,o.jsxs)(`div`,{className:`premium-card`,children:[(0,o.jsx)(`h2`,{className:`premium-title`,children:`Register New Corporate Client`}),(0,o.jsxs)(`form`,{onSubmit:j,className:`premium-form`,children:[(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Client Name`}),(0,o.jsx)(`input`,{type:`text`,value:t,onChange:e=>n(e.target.value),required:!0,placeholder:`e.g. John Doe`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Company / Business Name`}),(0,o.jsx)(`input`,{type:`text`,value:s,onChange:e=>c(e.target.value),placeholder:`e.g. Acme Corporation`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`GST Number`}),(0,o.jsx)(`input`,{type:`text`,value:l,onChange:e=>u(e.target.value),placeholder:`e.g. 27AAAAA1111A1Z1`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Email Address`}),(0,o.jsx)(`input`,{type:`email`,value:d,onChange:e=>f(e.target.value),placeholder:`e.g. client@company.com`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Phone Number`}),(0,o.jsx)(`input`,{type:`text`,value:p,onChange:e=>m(e.target.value),required:!0,placeholder:`e.g. +91 98765 43210`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Contact Person`}),(0,o.jsx)(`input`,{type:`text`,value:C,onChange:e=>w(e.target.value),placeholder:`e.g. Project Manager`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group full-width`,children:[(0,o.jsx)(`label`,{children:`Address Details`}),(0,o.jsx)(`textarea`,{value:h,onChange:e=>g(e.target.value),required:!0,rows:`3`,placeholder:`Enter physical street address...`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`City`}),(0,o.jsx)(`input`,{type:`text`,value:x,onChange:e=>S(e.target.value),placeholder:`e.g. Mumbai`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`State`}),(0,o.jsx)(`input`,{type:`text`,value:y,onChange:e=>b(e.target.value),placeholder:`e.g. Maharashtra`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Country`}),(0,o.jsx)(`input`,{type:`text`,value:_,onChange:e=>v(e.target.value),placeholder:`e.g. India`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Website URL`}),(0,o.jsx)(`input`,{type:`text`,value:T,onChange:e=>E(e.target.value),placeholder:`e.g. www.clientwebsite.com`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group full-width`,children:[(0,o.jsx)(`label`,{children:`Account Status`}),(0,o.jsxs)(`select`,{value:D,onChange:e=>O(e.target.value),children:[(0,o.jsx)(`option`,{value:`Active`,children:`Active`}),(0,o.jsx)(`option`,{value:`Inactive`,children:`Inactive`})]})]}),(0,o.jsxs)(`div`,{className:`premium-form-group full-width`,style:{display:`flex`,flexDirection:`row`,gap:`15px`,marginTop:`10px`},children:[(0,o.jsx)(`button`,{type:`submit`,className:`premium-btn-primary`,disabled:k,style:{flex:1},children:k?`Registering...`:`Save Client Profile`}),(0,o.jsx)(`button`,{type:`button`,className:`premium-btn-secondary`,onClick:M,style:{flex:1},children:`Reset Fields`})]})]})]})]})};export{s as default};