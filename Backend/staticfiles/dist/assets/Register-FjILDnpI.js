import{d as e,f as t,i as n,n as r,r as i,s as a}from"./index-CHmTMjJC.js";var o=t(e(),1),s=n(),c=()=>{let{user:e}=i(),{showToast:t}=r(),n=e?.role,[c,l]=(0,o.useState)(``),[u,d]=(0,o.useState)(``),[f,p]=(0,o.useState)(``),[m,h]=(0,o.useState)(``),[g,_]=(0,o.useState)(``),[v,y]=(0,o.useState)(`Male`),[b,x]=(0,o.useState)(``),[S,C]=(0,o.useState)(``),[w,T]=(0,o.useState)(`Fresher`),[E,D]=(0,o.useState)(``),[O,k]=(0,o.useState)(``),[A,j]=(0,o.useState)(``),[M,N]=(0,o.useState)(``),[P,F]=(0,o.useState)(``),[I,L]=(0,o.useState)(``),[R,z]=(0,o.useState)(`Employee`),[B,V]=(0,o.useState)(null),[H,U]=(0,o.useState)(null),[W,G]=(0,o.useState)(!1);return n!==`HR`&&n!==`MD`?(0,s.jsx)(`div`,{style:{color:`var(--danger)`,fontWeight:700,padding:`20px`},children:`Access Denied: Only HR or MD can access registration page.`}):(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`style`,{children:`
        .register-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .register-premium-card {
          max-width: 780px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .register-premium-card .panel-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          padding: 22px 28px;
        }
        .register-premium-card .panel-header h2 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .register-premium-card .panel-body {
          padding: 30px;
        }
        .register-premium-card .form-group {
          margin-bottom: 18px;
        }
        .register-premium-card .form-group label {
          font-size: 0.76rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          display: block;
        }
        .register-premium-card .form-group input, 
        .register-premium-card .form-group select, 
        .register-premium-card .form-group textarea {
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
        .register-premium-card .form-group input:focus, 
        .register-premium-card .form-group select:focus, 
        .register-premium-card .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .register-premium-card .btn-submit-premium {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.98rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
          margin-top: 10px;
        }
        .register-premium-card .btn-submit-premium:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }
        .register-premium-card .btn-submit-premium:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
      `}),(0,s.jsx)(`h2`,{style:{color:`var(--primary-color)`,marginBottom:`20px`,fontFamily:`var(--font-display)`,fontWeight:800},children:`Account Registration`}),(0,s.jsxs)(`div`,{className:`register-premium-card`,children:[(0,s.jsx)(`div`,{className:`panel-header`,children:(0,s.jsx)(`h2`,{children:`Create Staff Account`})}),(0,s.jsx)(`div`,{className:`panel-body`,children:(0,s.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),m!==g){t(`Passwords do not match.`,`warning`);return}G(!0);try{let e=new FormData;e.append(`fullname`,c),e.append(`email`,u),e.append(`phone`,f),e.append(`password`,m),e.append(`confirm_password`,g),e.append(`gender`,v),e.append(`date_of_birth`,b),e.append(`date_of_joining`,S),e.append(`status`,w),e.append(`salary`,E),e.append(`department`,O),e.append(`team_name`,A),e.append(`experience_years`,M),e.append(`previous_company`,P),e.append(`address`,I),e.append(`role`,R),B&&e.append(`profile_pic`,B),H&&e.append(`document`,H),await a.post(`/api/register/`,e,{headers:{"Content-Type":`multipart/form-data`}}),t(`${R} registered successfully!`,`success`),l(``),d(``),p(``),h(``),_(``),x(``),C(``),D(``),k(``),j(``),N(``),F(``),L(``)}catch(e){t(e.response?.data?.detail||`Failed to register account.`,`error`)}finally{G(!1)}},style:{textAlign:`left`},children:[(0,s.jsxs)(`div`,{className:`register-grid`,children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Account Role Category`}),(0,s.jsxs)(`select`,{value:R,onChange:e=>z(e.target.value),children:[(0,s.jsx)(`option`,{value:`Employee`,children:`Employee`}),(0,s.jsx)(`option`,{value:`TeamLead`,children:`Team Leader`}),(0,s.jsx)(`option`,{value:`Manager`,children:`Manager`}),(0,s.jsx)(`option`,{value:`HR`,children:`HR`}),(0,s.jsx)(`option`,{value:`MD`,children:`Managing Director`})]})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Full Name`}),(0,s.jsx)(`input`,{type:`text`,value:c,onChange:e=>l(e.target.value),required:!0})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Email Address (Username)`}),(0,s.jsx)(`input`,{type:`email`,value:u,onChange:e=>d(e.target.value),required:!0})]})]}),(0,s.jsxs)(`div`,{className:`register-grid`,children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Password`}),(0,s.jsx)(`input`,{type:`password`,value:m,onChange:e=>h(e.target.value),required:!0})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Confirm Password`}),(0,s.jsx)(`input`,{type:`password`,value:g,onChange:e=>_(e.target.value),required:!0})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Contact Number`}),(0,s.jsx)(`input`,{type:`text`,value:f,onChange:e=>p(e.target.value)})]})]}),(0,s.jsxs)(`div`,{className:`register-grid`,children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Gender`}),(0,s.jsxs)(`select`,{value:v,onChange:e=>y(e.target.value),children:[(0,s.jsx)(`option`,{value:`Male`,children:`Male`}),(0,s.jsx)(`option`,{value:`Female`,children:`Female`}),(0,s.jsx)(`option`,{value:`Other`,children:`Other`})]})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Date of Birth`}),(0,s.jsx)(`input`,{type:`date`,value:b,onChange:e=>x(e.target.value)})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Date of Joining`}),(0,s.jsx)(`input`,{type:`date`,value:S,onChange:e=>C(e.target.value)})]})]}),(0,s.jsxs)(`div`,{className:`register-grid`,children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Experience (Years)`}),(0,s.jsx)(`input`,{type:`number`,value:M,onChange:e=>N(e.target.value)})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Previous Company Name`}),(0,s.jsx)(`input`,{type:`text`,value:P,onChange:e=>F(e.target.value)})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Salary (LPA / Monthly)`}),(0,s.jsx)(`input`,{type:`number`,value:E,onChange:e=>D(e.target.value)})]})]}),(0,s.jsxs)(`div`,{className:`register-grid`,children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Department`}),(0,s.jsx)(`input`,{type:`text`,value:O,onChange:e=>k(e.target.value),placeholder:`e.g. technology`})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Team Scope`}),(0,s.jsx)(`input`,{type:`text`,value:A,onChange:e=>j(e.target.value),placeholder:`e.g. alpha-team`})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Employment Status`}),(0,s.jsxs)(`select`,{value:w,onChange:e=>T(e.target.value),children:[(0,s.jsx)(`option`,{value:`Fresher`,children:`Fresher`}),(0,s.jsx)(`option`,{value:`Experienced`,children:`Experienced`}),(0,s.jsx)(`option`,{value:`Intern`,children:`Intern`})]})]})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Home Address`}),(0,s.jsx)(`textarea`,{rows:`2`,value:I,onChange:e=>L(e.target.value)})]}),(0,s.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`15px`,marginBottom:`20px`},children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Profile Image File`}),(0,s.jsx)(`input`,{type:`file`,onChange:e=>V(e.target.files[0]),style:{padding:`6px 0`}})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{children:`Contract Documents (PDF)`}),(0,s.jsx)(`input`,{type:`file`,onChange:e=>U(e.target.files[0]),style:{padding:`6px 0`}})]})]}),(0,s.jsx)(`button`,{type:`submit`,className:`btn-submit-premium`,disabled:W,children:W?`Registering Account...`:`Register Account`})]})})]})]})};export{c as default};