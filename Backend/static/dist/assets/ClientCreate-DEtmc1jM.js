import{c as e,f as t,i as n,m as r,p as i}from"./index-DOQqWbo9.js";var a=r(t(),1),o=i(),s=()=>{let{showToast:t}=n(),[r,i]=(0,a.useState)(``),[s,c]=(0,a.useState)(``),[l,u]=(0,a.useState)(``),[d,f]=(0,a.useState)(``),[p,m]=(0,a.useState)(!1),h=async n=>{n.preventDefault(),m(!0);try{await e.post(`/api/clients/`,{name:r,email:s,phone:l,password:d||void 0,business_name:``,gst_number:``,address:`N/A`,country:`India`,state:``,city:``,contact_person:``,website:``,status:`Active`}),t(`Client registered successfully.`,`success`),g()}catch(e){console.error(`Client Registration Error:`,e.response?.data),t(e.response?.data?.detail||(e.response?.data?JSON.stringify(e.response.data):`Failed to save client profile.`),`error`)}finally{m(!1)}},g=()=>{i(``),c(``),u(``),f(``)};return(0,o.jsxs)(`div`,{className:`attendance-workspace-container`,style:{padding:`20px`,background:`#f8fafc`,minHeight:`100vh`},children:[(0,o.jsx)(`style`,{children:`
        .premium-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          padding: 30px;
          max-width: 600px;
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
          grid-template-columns: 1fr;
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
        .premium-form-group input {
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 0.92rem;
          color: #0f172a;
          transition: all 0.2s ease-in-out;
        }
        .premium-form-group input:focus {
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
      `}),(0,o.jsxs)(`div`,{className:`premium-card`,children:[(0,o.jsx)(`h2`,{className:`premium-title`,children:`Register New Client`}),(0,o.jsxs)(`form`,{onSubmit:h,className:`premium-form`,children:[(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Client Name (Username)`}),(0,o.jsx)(`input`,{type:`text`,value:r,onChange:e=>i(e.target.value),required:!0,placeholder:`e.g. John Doe`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Email Address`}),(0,o.jsx)(`input`,{type:`email`,value:s,onChange:e=>c(e.target.value),required:!0,placeholder:`e.g. client@company.com`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Phone Number`}),(0,o.jsx)(`input`,{type:`text`,value:l,onChange:e=>u(e.target.value),required:!0,placeholder:`e.g. +91 98765 43210`})]}),(0,o.jsxs)(`div`,{className:`premium-form-group`,children:[(0,o.jsx)(`label`,{children:`Portal Login Password`}),(0,o.jsx)(`input`,{type:`password`,value:d,onChange:e=>f(e.target.value),required:!0,placeholder:`Enter a secure password for the client`})]}),(0,o.jsx)(`div`,{style:{marginTop:`10px`},children:(0,o.jsx)(`button`,{type:`submit`,className:`premium-btn-primary`,disabled:p,style:{width:`100%`},children:p?`Registering...`:`Create Client Account`})})]})]})]})};export{s as default};