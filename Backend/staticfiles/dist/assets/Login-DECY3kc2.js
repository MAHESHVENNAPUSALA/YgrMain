import{d as e,f as t,i as n,n as r,r as i,u as a}from"./index-Bk-nlAhU.js";var o=t(e(),1),s=n(),c=()=>{let[e,t]=(0,o.useState)(``),[n,c]=(0,o.useState)(``),[l,u]=(0,o.useState)(!1),[d,f]=(0,o.useState)(``),[p,m]=(0,o.useState)(!1),{login:h,isAuthenticated:g,user:_}=i(),{showToast:v}=r(),y=a();return(0,o.useEffect)(()=>{g&&_&&y({Employee:`/employee-dashboard`,TeamLead:`/tl-dashboard`,Manager:`/manager-dashboard`,HR:`/hr-dashboard`,MD:`/md-dashboard`}[_.role]||`/employee-dashboard`,{replace:!0})},[g,_,y]),(0,s.jsxs)(`div`,{className:`login-page-wrapper`,children:[(0,s.jsx)(`style`,{children:`
        .login-page-wrapper {
          --primary: #092a49;
          --primary-light: #1e4d7b;
          --accent: #3b82f6;
          --success: #10b981;
          --danger: #ef4444;
          --bg: #f8fafc;
          --card: #ffffff;
          --border: #e2e8f0;
          --text: #0f172a;
          --muted: #64748b;
          --font: 'Plus Jakarta Sans', 'Outfit', sans-serif;
          
          font-family: var(--font);
          background: linear-gradient(135deg, #092a49 0%, #1e3c72 50%, #2a5298 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          overflow: hidden;
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }

        .login-page-wrapper::before, .login-page-wrapper::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0) 70%);
          z-index: 1;
          pointer-events: none;
          filter: blur(40px);
        }
        .login-page-wrapper::before { top: -100px; left: -100px; }
        .login-page-wrapper::after { bottom: -100px; right: -100px; }

        .login-container {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
          z-index: 2;
          animation: fadeIn 0.4s ease-out;
          position: relative;
          box-sizing: border-box;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .brand-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .brand-logo {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--accent), var(--primary));
          border-radius: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.8rem;
          margin-bottom: 16px;
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .brand-name {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: -0.5px;
          margin-bottom: 6px;
        }
        .welcome-msg {
          font-size: 0.9rem;
          color: var(--muted);
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 22px;
          position: relative;
          text-align: left;
        }
        .form-group label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-wrapper i.field-icon {
          position: absolute;
          left: 16px;
          color: var(--muted);
          font-size: 1rem;
          transition: color 0.2s;
          pointer-events: none;
          z-index: 2;
        }
        .input-control {
          width: 100%;
          padding: 13px 16px 13px 46px !important;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          font-size: 0.92rem;
          color: var(--text);
          background: var(--bg);
          outline: none;
          transition: 0.2s;
          box-sizing: border-box;
        }
        .input-control:focus {
          border-color: var(--accent);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .input-control:focus + i.field-icon {
          color: var(--accent);
        }
        
        .toggle-password {
          position: absolute;
          right: 14px;
          color: var(--muted);
          cursor: pointer;
          font-size: 0.95rem;
          padding: 4px;
          transition: color 0.2s;
        }
        .toggle-password:hover {
          color: var(--text);
        }

        .form-helpers {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 26px;
          font-size: 0.85rem;
        }
        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: var(--muted);
          font-weight: 600;
          user-select: none;
        }
        .remember-me input {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1.5px solid var(--border);
          accent-color: var(--accent);
          cursor: pointer;
        }
        .forgot-pass {
          color: var(--accent);
          text-decoration: none;
          font-weight: 700;
          transition: 0.15s;
        }
        .forgot-pass:hover {
          text-decoration: underline;
        }

        .btn-login {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--primary), var(--primary-light));
          color: #fff;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(9, 42, 73, 0.2);
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-login:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(9, 42, 73, 0.3);
          filter: brightness(1.1);
        }
        .btn-login:active {
          transform: translateY(0);
        }

        .msg-alert {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: shake 0.3s ease;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        .login-footer {
          margin-top: 25px;
          text-align: center;
          font-size: 0.76rem;
          color: var(--muted);
          font-weight: 600;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
      `}),(0,s.jsxs)(`div`,{className:`login-container`,children:[(0,s.jsxs)(`div`,{className:`brand-header`,children:[(0,s.jsx)(`img`,{src:`/logo.png`,alt:`YGR TEAM Logo`,style:{height:`80px`,width:`auto`,objectFit:`contain`,marginBottom:`16px`}}),(0,s.jsx)(`div`,{className:`brand-name`,children:`YGR Gobal IT Services`}),(0,s.jsx)(`div`,{className:`welcome-msg`,children:`Welcome to YGR HRMS Portal`})]}),d&&(0,s.jsxs)(`div`,{className:`msg-alert`,children:[(0,s.jsx)(`i`,{className:`fa-solid fa-circle-exclamation`}),(0,s.jsx)(`span`,{children:d})]}),(0,s.jsxs)(`form`,{onSubmit:async t=>{t.preventDefault(),f(``);let r=await h(e,n,l);r.success||f(r.error)},children:[(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{htmlFor:`username`,children:`Employee ID / Email`}),(0,s.jsxs)(`div`,{className:`input-wrapper`,children:[(0,s.jsx)(`input`,{type:`text`,id:`username`,className:`input-control`,required:!0,placeholder:`Enter ID or email...`,value:e,onChange:e=>t(e.target.value),autoFocus:!0}),(0,s.jsx)(`i`,{className:`fa-regular fa-user field-icon`})]})]}),(0,s.jsxs)(`div`,{className:`form-group`,children:[(0,s.jsx)(`label`,{htmlFor:`password`,children:`Password`}),(0,s.jsxs)(`div`,{className:`input-wrapper`,children:[(0,s.jsx)(`input`,{type:p?`text`:`password`,id:`password`,className:`input-control`,required:!0,placeholder:`Enter password...`,value:n,onChange:e=>c(e.target.value)}),(0,s.jsx)(`i`,{className:`fa-solid fa-lock field-icon`}),(0,s.jsx)(`i`,{className:`fa-regular ${p?`fa-eye-slash`:`fa-eye`} toggle-password`,onClick:()=>{m(!p)}})]})]}),(0,s.jsxs)(`div`,{className:`form-helpers`,children:[(0,s.jsxs)(`label`,{className:`remember-me`,children:[(0,s.jsx)(`input`,{type:`checkbox`,id:`remember_me`,checked:l,onChange:e=>u(e.target.checked)}),(0,s.jsx)(`span`,{children:`Remember Me`})]}),(0,s.jsx)(`a`,{href:`#`,className:`forgot-pass`,onClick:e=>{e.preventDefault(),v(`Please contact the HR Administrator to reset your password.`,`info`)},children:`Forgot Password?`})]}),(0,s.jsxs)(`button`,{type:`submit`,className:`btn-login`,children:[(0,s.jsx)(`i`,{className:`fa-solid fa-right-to-bracket`}),` Secure Log In`]})]}),(0,s.jsxs)(`div`,{className:`login-footer`,children:[(0,s.jsx)(`span`,{children:`Version v2.4.1`}),(0,s.jsxs)(`span`,{children:[`© `,new Date().getFullYear(),` YGR IT Services. All Rights Reserved.`]})]})]})]})};export{c as default};