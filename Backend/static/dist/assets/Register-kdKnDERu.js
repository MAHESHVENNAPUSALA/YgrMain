import{a as e,c as t,d as n,f as r,i,m as a,p as o,u as s}from"./index-E7nG5Fmr.js";var c=a(r(),1),l=o(),u=()=>{let{user:r}=e(),{showToast:a}=i();n();let o=s(),u=r?.role,d=o.state?.defaultRole||`Employee`,[f,p]=(0,c.useState)(``),[m,h]=(0,c.useState)(``),[g,_]=(0,c.useState)(``),[v,y]=(0,c.useState)(``),[b,x]=(0,c.useState)(``),[S,C]=(0,c.useState)(`Male`),[w,T]=(0,c.useState)(``),[E,D]=(0,c.useState)(``),[O,k]=(0,c.useState)(`Fresher`),[A,j]=(0,c.useState)(``),[M,N]=(0,c.useState)(``),[P,F]=(0,c.useState)(``),[I,L]=(0,c.useState)(``),[R,z]=(0,c.useState)(``),[B,V]=(0,c.useState)(``),[H,U]=(0,c.useState)(d),[W,G]=(0,c.useState)(null),[K,q]=(0,c.useState)(null),[J,Y]=(0,c.useState)(!1);return u!==`HR`&&u!==`MD`&&u!==`Manager`?(0,l.jsx)(`div`,{style:{color:`var(--danger)`,fontWeight:700,padding:`20px`},children:`Access Denied: Only HR, MD or Manager can access registration page.`}):(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`style`,{children:`
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
      `}),(0,l.jsx)(`h2`,{style:{color:`var(--primary-color)`,marginBottom:`20px`,fontFamily:`var(--font-display)`,fontWeight:800},children:`Account Registration`}),(0,l.jsxs)(`div`,{className:`register-premium-card`,children:[(0,l.jsx)(`div`,{className:`panel-header`,children:(0,l.jsx)(`h2`,{children:`Create Staff Account`})}),(0,l.jsx)(`div`,{className:`panel-body`,children:(0,l.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),v!==b){a(`Passwords do not match.`,`warning`);return}Y(!0);try{let e=new FormData;e.append(`fullname`,f),e.append(`email`,m),e.append(`phone`,g),e.append(`password`,v),e.append(`confirm_password`,b),e.append(`gender`,S),e.append(`date_of_birth`,w),e.append(`date_of_joining`,E),e.append(`status`,O),e.append(`salary`,A),e.append(`department`,M),e.append(`team_name`,P),e.append(`experience_years`,I),e.append(`previous_company`,R),e.append(`address`,B),e.append(`role`,H),W&&e.append(`profile_pic`,W),K&&e.append(`document`,K),await t.post(`/api/register/`,e,{headers:{"Content-Type":`multipart/form-data`}}),a(`${H} registered successfully!`,`success`),p(``),h(``),_(``),y(``),x(``),T(``),D(``),j(``),N(``),F(``),L(``),z(``),V(``)}catch(e){a(e.response?.data?.detail||`Failed to register account.`,`error`)}finally{Y(!1)}},style:{textAlign:`left`},children:[(0,l.jsxs)(`div`,{className:`register-grid`,children:[(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Account Role Category`}),(0,l.jsxs)(`select`,{value:H,onChange:e=>U(e.target.value),children:[(0,l.jsx)(`option`,{value:`Employee`,children:`Employee / Developer`}),(0,l.jsx)(`option`,{value:`TeamLead`,children:`Team Leader`}),(u===`HR`||u===`MD`)&&(0,l.jsx)(`option`,{value:`Manager`,children:`Manager`}),u===`MD`&&(0,l.jsx)(`option`,{value:`HR`,children:`HR`}),u===`MD`&&(0,l.jsx)(`option`,{value:`MD`,children:`Managing Director`})]})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Full Name`}),(0,l.jsx)(`input`,{type:`text`,value:f,onChange:e=>p(e.target.value),required:!0})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Email Address (Username)`}),(0,l.jsx)(`input`,{type:`email`,value:m,onChange:e=>h(e.target.value),required:!0})]})]}),(0,l.jsxs)(`div`,{className:`register-grid`,children:[(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Password`}),(0,l.jsx)(`input`,{type:`password`,value:v,onChange:e=>y(e.target.value),required:!0})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Confirm Password`}),(0,l.jsx)(`input`,{type:`password`,value:b,onChange:e=>x(e.target.value),required:!0})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Contact Number`}),(0,l.jsx)(`input`,{type:`text`,value:g,onChange:e=>_(e.target.value)})]})]}),(0,l.jsxs)(`div`,{className:`register-grid`,children:[(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Gender`}),(0,l.jsxs)(`select`,{value:S,onChange:e=>C(e.target.value),children:[(0,l.jsx)(`option`,{value:`Male`,children:`Male`}),(0,l.jsx)(`option`,{value:`Female`,children:`Female`}),(0,l.jsx)(`option`,{value:`Other`,children:`Other`})]})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Date of Birth`}),(0,l.jsx)(`input`,{type:`date`,value:w,onChange:e=>T(e.target.value)})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Date of Joining`}),(0,l.jsx)(`input`,{type:`date`,value:E,onChange:e=>D(e.target.value)})]})]}),(0,l.jsxs)(`div`,{className:`register-grid`,children:[(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Experience (Years)`}),(0,l.jsx)(`input`,{type:`number`,value:I,onChange:e=>L(e.target.value)})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Previous Company Name`}),(0,l.jsx)(`input`,{type:`text`,value:R,onChange:e=>z(e.target.value)})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Salary (LPA / Monthly)`}),(0,l.jsx)(`input`,{type:`number`,value:A,onChange:e=>j(e.target.value)})]})]}),(0,l.jsxs)(`div`,{className:`register-grid`,children:[(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Department`}),(0,l.jsx)(`input`,{type:`text`,value:M,onChange:e=>N(e.target.value),placeholder:`e.g. technology`})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Team Scope`}),(0,l.jsx)(`input`,{type:`text`,value:P,onChange:e=>F(e.target.value),placeholder:`e.g. alpha-team`})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Employment Status`}),(0,l.jsxs)(`select`,{value:O,onChange:e=>k(e.target.value),children:[(0,l.jsx)(`option`,{value:`Fresher`,children:`Fresher`}),(0,l.jsx)(`option`,{value:`Experienced`,children:`Experienced`}),(0,l.jsx)(`option`,{value:`Intern`,children:`Intern`})]})]})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Home Address`}),(0,l.jsx)(`textarea`,{rows:`2`,value:B,onChange:e=>V(e.target.value)})]}),(0,l.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`15px`,marginBottom:`20px`},children:[(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Profile Image File`}),(0,l.jsx)(`input`,{type:`file`,onChange:e=>G(e.target.files[0]),style:{padding:`6px 0`}})]}),(0,l.jsxs)(`div`,{className:`form-group`,children:[(0,l.jsx)(`label`,{children:`Contract Documents (PDF)`}),(0,l.jsx)(`input`,{type:`file`,onChange:e=>q(e.target.files[0]),style:{padding:`6px 0`}})]})]}),(0,l.jsx)(`button`,{type:`submit`,className:`btn-submit-premium`,disabled:J,children:J?`Registering Account...`:`Register Account`})]})})]})]})};export{u as default};