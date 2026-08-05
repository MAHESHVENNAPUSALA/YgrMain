import{d as e,f as t,i as n,n as r,o as i,r as a}from"./index-Bk-nlAhU.js";var o=t(e(),1),s=n();function c(e=``){return e.split(` `).slice(0,2).map(e=>e[0]).join(``).toUpperCase()||`?`}function l(e){if(!e)return``;try{let t=new Date(e),n=new Date,r=new Date(n);return r.setDate(n.getDate()-1),t.toDateString()===n.toDateString()?`Today`:t.toDateString()===r.toDateString()?`Yesterday`:t.toLocaleDateString(`en-IN`,{day:`2-digit`,month:`short`,year:`numeric`})}catch{return``}}function ee(e){if(!e)return``;try{return new Date(e).toDateString()}catch{return``}}var u=[`👍`,`❤️`,`😂`,`😮`,`😢`,`🔥`,`🎉`,`👏`,`💯`,`🙏`];function d({user:e,size:t=36,style:n={}}){let[r,i]=(0,o.useState)(!1),a=e?.name||e?.username||e?.sender_name||``,l=e?.profile_pic||e?.sender_avatar;return l&&!r?(0,s.jsx)(`img`,{src:l,alt:a,onError:()=>i(!0),style:{width:t,height:t,borderRadius:`50%`,objectFit:`cover`,flexShrink:0,...n}}):(0,s.jsx)(`div`,{style:{width:t,height:t,borderRadius:`50%`,background:`linear-gradient(135deg, #3b82f6, #1d4ed8)`,color:`#fff`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontWeight:700,fontSize:t*.38,flexShrink:0,...n},children:c(a)})}function f({status:e}){let t={Online:`#22c55e`,Away:`#f59e0b`,Busy:`#ef4444`,"In Meeting":`#8b5cf6`,"Working From Home":`#06b6d4`,Offline:`#94a3b8`};return(0,s.jsx)(`span`,{style:{display:`inline-block`,width:9,height:9,borderRadius:`50%`,background:t[e]||t.Offline,border:`2px solid #fff`,flexShrink:0},title:e})}var p=()=>{let{user:e}=a(),{showToast:t}=r(),[n,c]=(0,o.useState)([]),[p,m]=(0,o.useState)([]),[te,ne]=(0,o.useState)([]),[h,re]=(0,o.useState)(``),[g,_]=(0,o.useState)(null),[v,ie]=(0,o.useState)(()=>{try{return JSON.parse(localStorage.getItem(`chat_last_read`)||`{}`)}catch{return{}}}),ae=(0,o.useRef)(v),[y,b]=(0,o.useState)([]),[oe,se]=(0,o.useState)(!1),[ce,le]=(0,o.useState)(!0),[x,S]=(0,o.useState)(``),[C,w]=(0,o.useState)(null),[T,E]=(0,o.useState)(null),[D,O]=(0,o.useState)(``),[k,A]=(0,o.useState)(null),[j,M]=(0,o.useState)(null),[ue,de]=(0,o.useState)(!1),[fe,N]=(0,o.useState)(!1),[pe,me]=(0,o.useState)(``),[he,ge]=(0,o.useState)(``),[_e,P]=(0,o.useState)([]),[F,I]=(0,o.useState)(null),[L,ve]=(0,o.useState)([]),[ye,R]=(0,o.useState)(null),[be,xe]=(0,o.useState)(!1),[z,B]=(0,o.useState)(null),Se=(0,o.useRef)(null),V=(0,o.useRef)(null),H=(0,o.useRef)(null),U=(0,o.useRef)(0),Ce=(0,o.useRef)(null),W=(0,o.useRef)(null);(0,o.useEffect)(()=>{ae.current=v,localStorage.setItem(`chat_last_read`,JSON.stringify(v))},[v]);let G=(0,o.useCallback)(async()=>{try{let[e,t]=await Promise.all([i.getAllUsers(),i.getAllChatRooms(ae.current)]),n=e.data||[];c(n);let r=t.data?.channels||[],a=t.data?.teams||[];m(r),ne(a);let o=n.reduce((e,t)=>e+(t.unread||0),0),s=[...r,...a].reduce((e,t)=>e+(t.unread||0),0);window.dispatchEvent(new CustomEvent(`msg-unread-update`,{detail:o+s}))}catch(e){console.error(`Sidebar load error`,e)}finally{le(!1)}},[]),we=async e=>{if(Z){B({type:e,user:Z,status:`Calling...`});try{await i.initiateCall({receiver:Z.id,call_type:e}),setTimeout(()=>{B(e=>e?{...e,status:`Connected`}:null)},2500)}catch(e){t(e.response?.data?.detail||`Failed to initiate call session.`,`error`),B(null)}}};(0,o.useEffect)(()=>{G(),i.updatePresence({status:`Online`}).catch(()=>{});let e=setInterval(()=>G(),1e4);return()=>{clearInterval(e),i.updatePresence({status:`Offline`}).catch(()=>{})}},[G]);let K=(0,o.useCallback)(async(e=!1)=>{if(g){e&&(se(!0),U.current=0);try{let t=e?{}:{last_id:U.current};g.type===`dm`?t.user_id=g.id:t.room_id=g.id;let n=(await i.getChatHistory(t)).data?.messages||[];e?b(n):n.length>0&&b(e=>{let t=new Set(e.map(e=>e.id)),r=n.filter(e=>!t.has(e.id));return r.length?[...e,...r]:e}),n.length>0&&(U.current=n[n.length-1].id)}catch(e){console.error(`Load messages error`,e)}finally{e&&se(!1)}}},[g]);(0,o.useEffect)(()=>{if(g)return K(!0),clearInterval(H.current),H.current=setInterval(()=>K(!1),3e3),()=>clearInterval(H.current)},[g,K]),(0,o.useEffect)(()=>{Se.current?.scrollIntoView({behavior:`smooth`})},[y]),(0,o.useEffect)(()=>{let e=()=>A(null);return window.addEventListener(`click`,e),()=>window.removeEventListener(`click`,e)},[]);let Te=async e=>{e?.preventDefault();let n=x.trim();if(!n&&!V.current?.files[0]||!g)return;let r=new FormData;r.append(`text`,n),g.type===`dm`?r.append(`receiver_id`,g.id):r.append(`room_id`,g.id),C&&r.append(`reply_to_id`,C.id);let a=V.current;a?.files[0]&&(r.append(`file`,a.files[0]),a.value=``),S(``),w(null);try{let e=(await i.sendMessage(r)).data;b(t=>new Set(t.map(e=>e.id)).has(e.id)?t:[...t,e]),U.current=e.id}catch(e){t(e?.response?.data?.detail||`Failed to send message.`,`error`)}},Ee=async()=>{if(!(!T||!D.trim())){try{await i.editMessage({message_id:T.id,is_group:T.is_group,text:D}),b(e=>e.map(e=>e.id===T.id?{...e,text:D,edited:!0}:e))}catch(e){t(e?.response?.data?.detail||`Edit failed.`,`error`)}E(null),O(``)}},q=async(e,n)=>{try{await i.deleteMessage({message_id:e.id,is_group:e.is_group,mode:n}),b(n===`everyone`?t=>t.map(t=>t.id===e.id?{...t,is_deleted:!0,text:``,file_url:null}:t):t=>t.filter(t=>t.id!==e.id))}catch(e){t(e?.response?.data?.detail||`Delete failed.`,`error`)}A(null)},J=async(e,t)=>{try{let n=await i.toggleReaction({message_id:e.id,is_group:e.is_group,emoji:t});b(t=>t.map(t=>t.id===e.id?{...t,reactions:n.data.reactions}:t))}catch(e){console.error(e)}M(null)},De=async()=>{if(!(!F||!L.length)){try{await i.forwardMessage({msg_ids:[F.id],receiver_ids:L}),t(`Message forwarded.`,`success`)}catch{t(`Forward failed.`,`error`)}I(null),ve([])}},Oe=async e=>{e.preventDefault();try{await i.createTeam({name:pe,description:he,users:_e}),N(!1),me(``),ge(``),P([]),G()}catch(e){t(e?.response?.data?.detail||`Failed to create team.`,`error`)}},ke=e=>{S(e.target.value);let t=e.target;t.style.height=`auto`,t.style.height=Math.min(t.scrollHeight,140)+`px`,be||xe(!0),clearTimeout(Ce.current),Ce.current=setTimeout(()=>xe(!1),2e3)},Ae=n.filter(e=>e.name.toLowerCase().includes(h.toLowerCase())||e.role.toLowerCase().includes(h.toLowerCase())),Y=p.filter(e=>e.name.toLowerCase().includes(h.toLowerCase())),X=te.filter(e=>e.name.toLowerCase().includes(h.toLowerCase())),Z=g?.type===`dm`?n.find(e=>e.id===g.id):null,Q=g?.name||``,$=[],je=``;y.forEach(e=>{let t=ee(e.created_at_iso);t&&t!==je&&($.push({_type:`separator`,label:l(e.created_at_iso),key:t}),je=t),$.push(e)});function Me(e){return/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(e||``)}let Ne=!g?.is_announcement_only||e?.role===`MD`||e?.role===`HR`;return(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`style`,{children:`
        /* Prevent parent page scrolling & lock content viewport */
        .main {
          overflow: hidden !important;
        }

        /* ── Layout ── */
        .uc-wrap {
          display: flex;
          height: calc(100vh - 120px);
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,.05);
          position: relative;
        }

        /* ── Sidebar ── */
        .uc-sidebar {
          width: 280px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          background: #f8fafc;
          border-right: 1px solid #e2e8f0;
        }
        .uc-sidebar-top {
          padding: 14px 14px 10px;
          border-bottom: 1px solid #e2e8f0;
        }
        .uc-sidebar-title {
          font-size: 13px;
          font-weight: 800;
          color: #092a49;
          text-transform: uppercase;
          letter-spacing: .5px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .uc-search {
          width: 100%;
          padding: 7px 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 12.5px;
          outline: none;
          background: #fff;
          color: #1e293b;
        }
        .uc-search:focus { border-color: #3b82f6; }
        .uc-sidebar-list { flex: 1; overflow-y: auto; padding: 8px 6px; }
        .uc-section-label {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .7px;
          color: #94a3b8;
          padding: 10px 8px 4px;
        }
        .uc-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 9px;
          border-radius: 8px;
          cursor: pointer;
          transition: background .15s;
          position: relative;
        }
        .uc-item:hover { background: #eff6ff; }
        .uc-item.active { background: rgba(59,130,246,.12); }
        .uc-item-info { flex: 1; min-width: 0; }
        .uc-item-name {
          font-size: 13px;
          font-weight: 700;
          color: #1e293b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .uc-item.active .uc-item-name { color: #1d4ed8; }
        .uc-item-sub {
          font-size: 11px;
          color: #94a3b8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 1px;
        }
        .uc-unread {
          background: #ef4444;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          min-width: 18px;
          height: 18px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          flex-shrink: 0;
        }
        .uc-channel-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #dbeafe;
          color: #1d4ed8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 800;
          flex-shrink: 0;
        }

        /* ── New Group button ── */
        .uc-new-btn {
          background: #1d4ed8;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          cursor: pointer;
          transition: background .15s;
        }
        .uc-new-btn:hover { background: #1e40af; }

        /* ── Chat Window ── */
        .uc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        /* ── Header ── */
        .uc-header {
          padding: 12px 18px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff;
        }
        .uc-header-info { flex: 1; min-width: 0; }
        .uc-header-name {
          font-size: 15px;
          font-weight: 800;
          color: #092a49;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .uc-header-sub {
          font-size: 11.5px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 1px;
        }

        /* ── Messages Area ── */
        .uc-msgs {
          flex: 1;
          overflow-y: auto;
          padding: 16px 20px;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        /* ── Date Separator ── */
        .uc-date-sep {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 12px 0 6px;
          color: #94a3b8;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .4px;
        }
        .uc-date-sep::before, .uc-date-sep::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        /* ── Message Row ── */
        .uc-msg-row {
          display: flex;
          align-items: flex-end;
          gap: 7px;
          margin: 3px 0;
          width: 100%;
        }
        .uc-msg-row.sent {
          flex-direction: row-reverse;
          justify-content: flex-start;
        }
        .uc-msg-row.received {
          justify-content: flex-start;
        }
        .uc-msg-row.sent .uc-bubble {
          background: #1d4ed8;
          color: #fff;
          border-bottom-right-radius: 3px;
        }
        .uc-msg-row.received .uc-bubble {
          background: #fff;
          color: #1e293b;
          border: 1px solid #e2e8f0;
          border-bottom-left-radius: 3px;
        }

        .uc-bubble {
          max-width: 420px;
          min-width: 60px;
          padding: 9px 13px 7px;
          border-radius: 14px;
          font-size: 13.5px;
          line-height: 1.55;
          position: relative;
          word-break: break-word;
          box-shadow: 0 1px 2px rgba(0,0,0,.05);
        }

        /* ── Sender name (group) ── */
        .uc-sender-name {
          font-size: 11px;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 3px;
        }

        /* ── Reply preview inside bubble ── */
        .uc-reply-preview {
          background: rgba(0,0,0,.08);
          border-left: 3px solid rgba(255,255,255,.5);
          padding: 4px 8px;
          border-radius: 6px;
          margin-bottom: 6px;
          font-size: 11.5px;
          opacity: .9;
        }
        .uc-msg-row.received .uc-reply-preview {
          background: #f1f5f9;
          border-left-color: #3b82f6;
        }
        .uc-reply-preview-sender { font-weight: 700; color: #3b82f6; margin-bottom: 1px; }

        /* ── Message meta ── */
        .uc-msg-meta {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 3px;
          font-size: 10.5px;
          opacity: .75;
          justify-content: flex-end;
        }
        .uc-tick { font-size: 10px; }
        .uc-tick.read { color: #34d399; }

        /* ── Edited badge ── */
        .uc-edited { font-size: 10px; font-style: italic; opacity: .7; margin-right: 4px; }

        /* ── Deleted msg ── */
        .uc-deleted {
          font-style: italic;
          opacity: .55;
          font-size: 12.5px;
        }

        /* ── Reactions ── */
        .uc-reactions {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          margin-top: 4px;
        }
        .uc-reaction-chip {
          background: rgba(59,130,246,.1);
          border: 1px solid #bfdbfe;
          border-radius: 12px;
          padding: 1px 6px;
          font-size: 12px;
          cursor: pointer;
          transition: background .12s;
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }
        .uc-reaction-chip:hover { background: rgba(59,130,246,.2); }
        .uc-reaction-count { font-size: 10px; font-weight: 700; color: #1d4ed8; }

        /* ── Image attachment ── */
        .uc-img-attach {
          max-width: 220px;
          max-height: 180px;
          border-radius: 8px;
          object-fit: cover;
          cursor: pointer;
          margin-top: 4px;
        }

        /* ── File attachment ── */
        .uc-file-attach {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,0,0,.06);
          border-radius: 8px;
          padding: 7px 10px;
          margin-top: 4px;
          font-size: 12px;
          text-decoration: none;
          color: inherit;
        }
        .uc-msg-row.sent .uc-file-attach { color: #fff; }
        .uc-file-attach:hover { background: rgba(0,0,0,.1); }

        /* ── Context menu ── */
        .uc-ctx {
          position: fixed;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,.12);
          z-index: 9999;
          min-width: 160px;
          padding: 4px 0;
          font-size: 13px;
        }
        .uc-ctx-item {
          padding: 9px 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background .12s;
          color: #1e293b;
        }
        .uc-ctx-item:hover { background: #f1f5f9; }
        .uc-ctx-item.danger { color: #ef4444; }
        .uc-ctx-sep { height: 1px; background: #e2e8f0; margin: 3px 0; }

        /* ── Emoji picker (reaction) ── */
        .uc-emoji-picker {
          position: absolute;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,.1);
          z-index: 9998;
          padding: 8px;
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          width: 200px;
        }
        .uc-emoji-btn {
          font-size: 18px;
          cursor: pointer;
          padding: 3px;
          border-radius: 5px;
          transition: background .1s;
          background: none;
          border: none;
          line-height: 1;
        }
        .uc-emoji-btn:hover { background: #f1f5f9; }

        /* ── Input area ── */
        .uc-input-wrap {
          border-top: 1px solid #e2e8f0;
          background: #fff;
        }
        .uc-reply-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px 0;
          font-size: 12px;
          color: #64748b;
          background: #f0f9ff;
          border-top: 1px solid #bae6fd;
        }
        .uc-reply-strip-text {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #0369a1;
          font-weight: 600;
        }
        .uc-reply-close {
          cursor: pointer;
          font-size: 15px;
          color: #94a3b8;
          line-height: 1;
          padding: 2px 5px;
          border: none;
          background: none;
        }
        .uc-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
        }
        .uc-input-box {
          flex: 1;
          padding: 9px 14px;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          font-size: 13.5px;
          outline: none;
          background: #f8fafc;
          color: #1e293b;
          transition: border-color .15s;
          resize: none;
          overflow-y: auto;
          max-height: 140px;
          min-height: 40px;
          line-height: 1.55;
          font-family: inherit;
          display: block;
          box-sizing: border-box;
          scrollbar-width: thin;
        }
        .uc-input-box:focus { border-color: #3b82f6; background: #fff; }
        .uc-input-box::placeholder { color: #94a3b8; }
        .uc-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
          padding: 5px;
          border-radius: 8px;
          color: #64748b;
          transition: background .12s, color .12s;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .uc-icon-btn:hover { background: #f1f5f9; color: #1d4ed8; }
        .uc-send-btn {
          background: #1d4ed8;
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 17px;
          flex-shrink: 0;
          transition: background .15s, transform .1s;
        }
        .uc-send-btn:hover { background: #1e40af; transform: scale(1.05); }
        .uc-send-btn:disabled { background: #cbd5e1; cursor: default; transform: none; }

        /* ── Edit bar ── */
        .uc-edit-bar {
          background: #fef9c3;
          border-top: 1px solid #fde68a;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #92400e;
        }
        .uc-edit-input {
          flex: 1;
          padding: 7px 10px;
          border: 1px solid #fbbf24;
          border-radius: 8px;
          font-size: 13.5px;
          outline: none;
          background: #fff;
        }

        /* ── Empty state ── */
        .uc-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          gap: 12px;
          background: #f8fafc;
        }
        .uc-empty-icon { font-size: 52px; }
        .uc-empty-title { font-size: 17px; font-weight: 700; color: #475569; }
        .uc-empty-sub { font-size: 13px; max-width: 280px; text-align: center; }

        /* ── Modal overlay ── */
        .uc-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.45);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(2px);
        }
        .uc-modal {
          background: #fff;
          border-radius: 14px;
          padding: 24px;
          width: 420px;
          max-width: 95vw;
          box-shadow: 0 20px 40px rgba(0,0,0,.15);
        }
        .uc-modal-title {
          font-size: 16px;
          font-weight: 800;
          color: #092a49;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .uc-modal-close {
          background: none; border: none; font-size: 20px;
          cursor: pointer; color: #94a3b8; line-height: 1;
        }
        .uc-modal-close:hover { color: #ef4444; }
        .uc-form-group { margin-bottom: 14px; }
        .uc-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: .4px;
        }
        .uc-input {
          width: 100%;
          padding: 9px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 13.5px;
          outline: none;
          color: #1e293b;
        }
        .uc-input:focus { border-color: #3b82f6; }
        .uc-submit-btn {
          width: 100%;
          padding: 11px;
          background: #1d4ed8;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background .15s;
          margin-top: 4px;
        }
        .uc-submit-btn:hover { background: #1e40af; }

        /* ── Image lightbox ── */
        .uc-lightbox {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.88);
          z-index: 10001;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .uc-lightbox img {
          max-width: 90vw;
          max-height: 88vh;
          border-radius: 8px;
          object-fit: contain;
        }
        .uc-lightbox-close {
          position: fixed;
          top: 20px; right: 20px;
          font-size: 30px;
          color: #fff;
          cursor: pointer;
          background: none;
          border: none;
          opacity: .8;
          transition: opacity .15s;
        }
        .uc-lightbox-close:hover { opacity: 1; }

        /* ── Announcement locked notice ── */
        .uc-locked-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          background: #fef3c7;
          border-top: 1px solid #fde68a;
          font-size: 12.5px;
          color: #92400e;
        }

        /* ── Emoji picker for input ── */
        .uc-emoji-input-picker {
          position: absolute;
          bottom: 60px;
          left: 14px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          width: 220px;
          box-shadow: 0 8px 24px rgba(0,0,0,.12);
          z-index: 9000;
        }

        @media (max-width: 768px) {
          .uc-wrap { border-radius: 0; height: calc(100vh - 90px); }
          .uc-sidebar { width: 100%; position: absolute; top: 0; left: 0; bottom: 0; z-index: 100; }
          .uc-sidebar.hidden { display: none; }
          .uc-main { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
          .uc-bubble { max-width: 82%; }
        }

        /* ── Calling Modal Pulse Animation ── */
        .uc-call-avatar-pulse {
          position: absolute;
          top: -12px;
          left: -12px;
          right: -12px;
          bottom: -12px;
          background: rgba(59, 130, 246, 0.2);
          border-radius: 50%;
          animation: pulse-avatar 2s infinite ease-in-out;
          z-index: 1;
        }
        @keyframes pulse-avatar {
          0% { transform: scale(0.92); opacity: 0.4; }
          50% { transform: scale(1.18); opacity: 0.8; }
          100% { transform: scale(0.92); opacity: 0.4; }
        }
        .uc-call-dot-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #3b82f6;
          animation: pulse-dot 1.2s infinite ease-in-out;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}),(0,s.jsxs)(`div`,{className:`uc-wrap`,children:[(0,s.jsxs)(`div`,{className:`uc-sidebar`,children:[(0,s.jsxs)(`div`,{className:`uc-sidebar-top`,children:[(0,s.jsxs)(`div`,{className:`uc-sidebar-title`,children:[(0,s.jsx)(`span`,{children:`💬 Messages`}),(0,s.jsx)(`button`,{className:`uc-new-btn`,onClick:()=>N(!0),children:`+ Team`})]}),(0,s.jsx)(`input`,{className:`uc-search`,placeholder:`🔍 Search people, channels...`,value:h,onChange:e=>re(e.target.value)})]}),(0,s.jsxs)(`div`,{className:`uc-sidebar-list`,children:[(0,s.jsx)(`div`,{className:`uc-section-label`,children:`📢 Channels`}),ce?(0,s.jsx)(`div`,{style:{padding:`12px`,color:`#94a3b8`,fontSize:12},children:`Loading…`}):Y.length===0&&!h?(0,s.jsx)(`div`,{style:{padding:`6px 8px`,color:`#94a3b8`,fontSize:11.5,fontStyle:`italic`},children:`No channels yet`}):Y.map(e=>(0,s.jsxs)(`div`,{className:`uc-item ${g?.id===e.id&&g?.type===`channel`?`active`:``}`,onClick:()=>{_({type:`channel`,id:e.id,name:e.name,is_announcement_only:e.is_announcement_only}),e.last_msg_id&&(ie(t=>({...t,[e.id]:e.last_msg_id})),m(t=>t.map(t=>t.id===e.id?{...t,unread:0}:t)))},children:[(0,s.jsx)(`div`,{className:`uc-channel-icon`,children:`#`}),(0,s.jsxs)(`div`,{className:`uc-item-info`,children:[(0,s.jsx)(`div`,{className:`uc-item-name`,children:e.name}),(0,s.jsx)(`div`,{className:`uc-item-sub`,children:e.last_msg_text||e.description||`No messages yet`})]}),e.unread>0&&(0,s.jsx)(`div`,{className:`uc-unread`,children:e.unread>99?`99+`:e.unread})]},`ch-${e.id}`)),X.length>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`div`,{className:`uc-section-label`,children:`👥 Team Groups`}),X.map(e=>(0,s.jsxs)(`div`,{className:`uc-item ${g?.id===e.id&&g?.type===`team`?`active`:``}`,onClick:()=>{_({type:`team`,id:e.id,name:e.name}),e.last_msg_id&&(ie(t=>({...t,[e.id]:e.last_msg_id})),ne(t=>t.map(t=>t.id===e.id?{...t,unread:0}:t)))},children:[(0,s.jsx)(`div`,{className:`uc-channel-icon`,style:{background:`#fef3c7`,color:`#92400e`},children:`👥`}),(0,s.jsxs)(`div`,{className:`uc-item-info`,children:[(0,s.jsx)(`div`,{className:`uc-item-name`,children:e.name}),(0,s.jsx)(`div`,{className:`uc-item-sub`,children:e.last_msg_text||`Team chat`})]}),e.unread>0&&(0,s.jsx)(`div`,{className:`uc-unread`,children:e.unread>99?`99+`:e.unread})]},`tm-${e.id}`))]}),(0,s.jsx)(`div`,{className:`uc-section-label`,children:`✉️ Direct Messages`}),Ae.map(e=>(0,s.jsxs)(`div`,{className:`uc-item ${g?.id===e.id&&g?.type===`dm`?`active`:``}`,onClick:()=>{_({type:`dm`,id:e.id,name:e.name}),c(t=>t.map(t=>t.id===e.id?{...t,unread:0}:t))},children:[(0,s.jsxs)(`div`,{style:{position:`relative`,flexShrink:0},children:[(0,s.jsx)(d,{user:e,size:36}),(0,s.jsx)(`span`,{style:{position:`absolute`,bottom:-1,right:-1},children:(0,s.jsx)(f,{status:e.status})})]}),(0,s.jsxs)(`div`,{className:`uc-item-info`,children:[(0,s.jsx)(`div`,{className:`uc-item-name`,children:e.name}),(0,s.jsx)(`div`,{className:`uc-item-sub`,children:e.status===`Offline`?e.last_msg_text||e.role:e.status})]}),e.unread>0&&(0,s.jsx)(`div`,{className:`uc-unread`,children:e.unread>99?`99+`:e.unread})]},`dm-${e.id}`)),Ae.length===0&&Y.length===0&&h&&(0,s.jsxs)(`div`,{style:{padding:`12px 8px`,color:`#94a3b8`,fontSize:12,textAlign:`center`},children:[`No results for "`,h,`"`]})]})]}),(0,s.jsx)(`div`,{className:`uc-main`,children:g?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(`div`,{className:`uc-header`,children:[Z?(0,s.jsxs)(`div`,{style:{position:`relative`},children:[(0,s.jsx)(d,{user:Z,size:40}),(0,s.jsx)(`span`,{style:{position:`absolute`,bottom:0,right:0},children:(0,s.jsx)(f,{status:Z.status})})]}):(0,s.jsx)(`div`,{className:`uc-channel-icon`,style:{width:40,height:40,borderRadius:10,fontSize:17},children:g.type===`team`?`👥`:`#`}),(0,s.jsxs)(`div`,{className:`uc-header-info`,children:[(0,s.jsx)(`div`,{className:`uc-header-name`,children:Q}),(0,s.jsx)(`div`,{className:`uc-header-sub`,children:Z?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(f,{status:Z.status}),(0,s.jsx)(`span`,{children:Z.status}),(0,s.jsx)(`span`,{style:{color:`#cbd5e1`},children:`·`}),(0,s.jsx)(`span`,{children:Z.role}),Z.department&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`span`,{style:{color:`#cbd5e1`},children:`·`}),(0,s.jsx)(`span`,{children:Z.department})]})]}):(0,s.jsxs)(`span`,{children:[g.type===`channel`?`Channel`:`Team Group`,g.is_announcement_only&&` · 📢 Announcements (read-only for non-admins)`]})})]}),Z&&(0,s.jsxs)(`div`,{className:`uc-header-actions`,style:{display:`flex`,gap:`10px`,marginLeft:`auto`,marginRight:`10px`},children:[(0,s.jsx)(`button`,{onClick:()=>we(`audio`),style:{background:`#f1f5f9`,border:`none`,borderRadius:`50%`,width:`36px`,height:`36px`,display:`flex`,alignItems:`center`,justifyContent:`center`,cursor:`pointer`,color:`#475569`,transition:`background 0.2s`},title:`Voice Call`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-phone`})}),(0,s.jsx)(`button`,{onClick:()=>we(`video`),style:{background:`#f1f5f9`,border:`none`,borderRadius:`50%`,width:`36px`,height:`36px`,display:`flex`,alignItems:`center`,justifyContent:`center`,cursor:`pointer`,color:`#475569`,transition:`background 0.2s`},title:`Video Call`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-video`})})]})]}),(0,s.jsxs)(`div`,{className:`uc-msgs`,children:[oe?(0,s.jsx)(`div`,{style:{textAlign:`center`,padding:32,color:`#94a3b8`,fontSize:13},children:`Loading messages…`}):y.length===0?(0,s.jsx)(`div`,{style:{textAlign:`center`,padding:40,color:`#94a3b8`,fontSize:13},children:`No messages yet. Start the conversation!`}):$.map((t,n)=>{if(t._type===`separator`)return(0,s.jsx)(`div`,{className:`uc-date-sep`,children:t.label},`sep-${t.key}`);let r=t,i=r.sender_id===e?.id,a=g.type!==`dm`,c=r.is_deleted;return(0,s.jsxs)(`div`,{className:`uc-msg-row ${i?`sent`:`received`}`,style:{marginBottom:3},onContextMenu:e=>{e.preventDefault(),A({x:e.clientX,y:e.clientY,msg:r})},children:[i?(0,s.jsx)(d,{user:{sender_avatar:e?.profile_pic,name:e?.first_name||e?.username},size:30,style:{flexShrink:0}}):(0,s.jsx)(d,{user:{sender_avatar:r.sender_avatar,name:r.sender_name},size:30,style:{flexShrink:0}}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:i?`flex-end`:`flex-start`,maxWidth:`65%`},children:[a&&!i&&(0,s.jsx)(`div`,{className:`uc-sender-name`,children:r.sender_name}),(0,s.jsxs)(`div`,{className:`uc-bubble`,style:{cursor:`default`},children:[r.reply_to&&(0,s.jsxs)(`div`,{className:`uc-reply-preview`,children:[(0,s.jsxs)(`div`,{className:`uc-reply-preview-sender`,children:[`↩ `,r.reply_to.sender_name]}),(0,s.jsx)(`div`,{style:{fontSize:11},children:r.reply_to.text_preview})]}),c?(0,s.jsx)(`span`,{className:`uc-deleted`,children:`🚫 This message was deleted`}):(0,s.jsxs)(s.Fragment,{children:[r.text&&(0,s.jsx)(`div`,{style:{whiteSpace:`pre-wrap`,wordBreak:`break-word`,lineHeight:`1.6`},children:r.text.split(`
`).map((e,t,n)=>(0,s.jsxs)(o.Fragment,{children:[e,t<n.length-1&&(0,s.jsx)(`br`,{})]},t))}),r.file_url&&(Me(r.file_name)?(0,s.jsx)(`img`,{src:r.file_url,alt:r.file_name,className:`uc-img-attach`,onClick:()=>R(r.file_url)}):(0,s.jsxs)(`a`,{href:r.file_url,target:`_blank`,rel:`noreferrer`,className:`uc-file-attach`,children:[`📎 `,r.file_name||`Attachment`]}))]}),(0,s.jsxs)(`div`,{className:`uc-msg-meta`,children:[r.edited&&!c&&(0,s.jsx)(`span`,{className:`uc-edited`,children:`edited`}),(0,s.jsx)(`span`,{children:r.created_at}),i&&!a&&(0,s.jsx)(`span`,{className:`uc-tick ${r.is_read?`read`:``}`,children:r.is_read||r.is_delivered?`✓✓`:`✓`})]})]}),!c&&r.reactions&&Object.keys(r.reactions).length>0&&(0,s.jsx)(`div`,{className:`uc-reactions`,children:Object.entries(r.reactions).map(([e,t])=>(0,s.jsxs)(`button`,{className:`uc-reaction-chip`,onClick:()=>J(r,e),title:t.usernames?.join(`, `),children:[e,(0,s.jsx)(`span`,{className:`uc-reaction-count`,children:t.users?.length||1})]},e))}),!c&&(0,s.jsx)(`div`,{style:{position:`relative`},children:j===r.id&&(0,s.jsx)(`div`,{className:`uc-emoji-picker`,style:{[i?`right`:`left`]:0,bottom:22},children:u.map(e=>(0,s.jsx)(`button`,{className:`uc-emoji-btn`,onClick:()=>J(r,e),children:e},e))})})]})]},r.id||r._key)}),(0,s.jsx)(`div`,{ref:Se})]}),T&&(0,s.jsxs)(`div`,{className:`uc-edit-bar`,children:[(0,s.jsx)(`span`,{children:`✏️ Editing:`}),(0,s.jsx)(`input`,{className:`uc-edit-input`,value:D,onChange:e=>O(e.target.value),onKeyDown:e=>{e.key===`Enter`&&Ee(),e.key===`Escape`&&(E(null),O(``))},autoFocus:!0}),(0,s.jsx)(`button`,{className:`uc-new-btn`,onClick:Ee,children:`Save`}),(0,s.jsx)(`button`,{className:`uc-new-btn`,style:{background:`#64748b`},onClick:()=>{E(null),O(``)},children:`Cancel`})]}),Ne?(0,s.jsxs)(`div`,{className:`uc-input-wrap`,style:{position:`relative`},children:[C&&(0,s.jsxs)(`div`,{className:`uc-reply-strip`,children:[(0,s.jsxs)(`span`,{children:[`↩ Replying to `,(0,s.jsx)(`strong`,{children:C.sender_name}),`:`]}),(0,s.jsx)(`span`,{className:`uc-reply-strip-text`,children:C.text||`(attachment)`}),(0,s.jsx)(`button`,{className:`uc-reply-close`,onClick:()=>w(null),children:`✕`})]}),ue&&(0,s.jsx)(`div`,{className:`uc-emoji-input-picker`,children:u.map(e=>(0,s.jsx)(`button`,{className:`uc-emoji-btn`,onClick:()=>{S(t=>t+e),de(!1),W.current?.focus()},children:e},e))}),(0,s.jsx)(`form`,{onSubmit:Te,children:(0,s.jsxs)(`div`,{className:`uc-input-row`,children:[(0,s.jsx)(`button`,{type:`button`,className:`uc-icon-btn`,onClick:()=>de(e=>!e),title:`Emoji`,children:`😊`}),(0,s.jsx)(`button`,{type:`button`,className:`uc-icon-btn`,onClick:()=>V.current?.click(),title:`Attach file`,children:`📎`}),(0,s.jsx)(`input`,{ref:V,type:`file`,style:{display:`none`},onChange:()=>{}}),(0,s.jsx)(`textarea`,{ref:W,className:`uc-input-box`,rows:1,placeholder:`Message ${g.type===`dm`?Q:`#`+Q}… (Shift+Enter for new line)`,value:x,onChange:ke,onKeyDown:e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),Te()),e.key===`Escape`&&w(null)},disabled:!!T,style:{alignSelf:`center`}}),(0,s.jsx)(`button`,{type:`submit`,className:`uc-send-btn`,disabled:!x.trim()&&!V.current?.files?.[0],title:`Send`,children:`➤`})]})})]}):(0,s.jsx)(`div`,{className:`uc-locked-notice`,children:`🔒 Only MD and HR can post in the Announcements channel.`})]}):(0,s.jsxs)(`div`,{className:`uc-empty`,children:[(0,s.jsx)(`div`,{className:`uc-empty-icon`,children:`💬`}),(0,s.jsx)(`div`,{className:`uc-empty-title`,children:`Open a Conversation`}),(0,s.jsx)(`div`,{className:`uc-empty-sub`,children:`Select a channel, team group or colleague from the sidebar to start messaging.`})]})})]}),k&&(0,s.jsxs)(`div`,{className:`uc-ctx`,style:{top:k.y,left:k.x},onClick:e=>e.stopPropagation(),children:[(0,s.jsx)(`div`,{className:`uc-ctx-item`,onClick:()=>{w(k.msg),A(null),W.current?.focus()},children:`↩ Reply`}),(0,s.jsx)(`div`,{className:`uc-ctx-item`,onClick:()=>{M(k.msg.id),A(null)},children:`😊 Add Reaction`}),k.msg.text&&(0,s.jsx)(`div`,{className:`uc-ctx-item`,onClick:()=>{navigator.clipboard.writeText(k.msg.text),A(null)},children:`📋 Copy Text`}),(0,s.jsx)(`div`,{className:`uc-ctx-item`,onClick:()=>{I(k.msg),A(null)},children:`↗ Forward`}),k.msg.sender_id===e?.id&&!k.msg.is_deleted&&(0,s.jsx)(`div`,{className:`uc-ctx-item`,onClick:()=>{E(k.msg),O(k.msg.text),A(null)},children:`✏️ Edit`}),(0,s.jsx)(`div`,{className:`uc-ctx-sep`}),(0,s.jsx)(`div`,{className:`uc-ctx-item danger`,onClick:()=>q(k.msg,`me`),children:`🗑 Delete for Me`}),k.msg.sender_id===e?.id&&!k.msg.is_group&&(0,s.jsx)(`div`,{className:`uc-ctx-item danger`,onClick:()=>q(k.msg,`everyone`),children:`🗑 Delete for Everyone`}),k.msg.sender_id===e?.id&&k.msg.is_group&&!k.msg.is_deleted&&(0,s.jsx)(`div`,{className:`uc-ctx-item danger`,onClick:()=>q(k.msg,`everyone`),children:`🗑 Delete Message`})]}),j!==null&&(0,s.jsx)(`div`,{className:`uc-modal-overlay`,style:{background:`transparent`},onClick:()=>M(null),children:(0,s.jsx)(`div`,{className:`uc-emoji-picker`,style:{position:`fixed`,top:`50%`,left:`50%`,transform:`translate(-50%,-50%)`,width:240},onClick:e=>e.stopPropagation(),children:u.map(e=>(0,s.jsx)(`button`,{className:`uc-emoji-btn`,style:{fontSize:24,padding:6},onClick:()=>{let t=y.find(e=>e.id===j);t&&J(t,e),M(null)},children:e},e))})}),ye&&(0,s.jsxs)(`div`,{className:`uc-lightbox`,onClick:()=>R(null),children:[(0,s.jsx)(`button`,{className:`uc-lightbox-close`,onClick:()=>R(null),children:`✕`}),(0,s.jsx)(`img`,{src:ye,alt:`Preview`,onClick:e=>e.stopPropagation()})]}),fe&&(0,s.jsx)(`div`,{className:`uc-modal-overlay`,onClick:()=>N(!1),children:(0,s.jsxs)(`div`,{className:`uc-modal`,onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(`div`,{className:`uc-modal-title`,children:[`Create Team Group`,(0,s.jsx)(`button`,{className:`uc-modal-close`,onClick:()=>N(!1),children:`×`})]}),(0,s.jsxs)(`form`,{onSubmit:Oe,children:[(0,s.jsxs)(`div`,{className:`uc-form-group`,children:[(0,s.jsx)(`label`,{className:`uc-label`,children:`Team Name *`}),(0,s.jsx)(`input`,{className:`uc-input`,value:pe,onChange:e=>me(e.target.value),required:!0,placeholder:`e.g. Development Team`})]}),(0,s.jsxs)(`div`,{className:`uc-form-group`,children:[(0,s.jsx)(`label`,{className:`uc-label`,children:`Description`}),(0,s.jsx)(`input`,{className:`uc-input`,value:he,onChange:e=>ge(e.target.value),placeholder:`Optional description…`})]}),(0,s.jsxs)(`div`,{className:`uc-form-group`,children:[(0,s.jsx)(`label`,{className:`uc-label`,children:`Add Members (hold Ctrl for multiple)`}),(0,s.jsx)(`select`,{multiple:!0,className:`uc-input`,style:{height:110},value:_e,onChange:e=>P(Array.from(e.target.selectedOptions,e=>e.value)),children:n.map(e=>(0,s.jsxs)(`option`,{value:e.id,children:[e.name,` (`,e.role,`)`]},e.id))})]}),(0,s.jsx)(`button`,{type:`submit`,className:`uc-submit-btn`,children:`🚀 Create Team`})]})]})}),F&&(0,s.jsx)(`div`,{className:`uc-modal-overlay`,onClick:()=>I(null),children:(0,s.jsxs)(`div`,{className:`uc-modal`,onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(`div`,{className:`uc-modal-title`,children:[`Forward Message`,(0,s.jsx)(`button`,{className:`uc-modal-close`,onClick:()=>I(null),children:`×`})]}),(0,s.jsxs)(`div`,{style:{marginBottom:12,background:`#f1f5f9`,borderRadius:8,padding:`8px 12px`,fontSize:13,color:`#475569`},children:[`"`,F.text?.slice(0,80)||`(attachment)`,`"`]}),(0,s.jsxs)(`div`,{className:`uc-form-group`,children:[(0,s.jsx)(`label`,{className:`uc-label`,children:`Forward to (hold Ctrl for multiple)`}),(0,s.jsx)(`select`,{multiple:!0,className:`uc-input`,style:{height:130},value:L,onChange:e=>ve(Array.from(e.target.selectedOptions,e=>e.value)),children:n.map(e=>(0,s.jsxs)(`option`,{value:e.id,children:[e.name,` (`,e.role,`)`]},e.id))})]}),(0,s.jsx)(`button`,{className:`uc-submit-btn`,onClick:De,disabled:!L.length,children:`↗ Forward`})]})}),z&&(0,s.jsx)(`div`,{className:`uc-modal-overlay`,style:{zIndex:1e4,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`rgba(15, 23, 42, 0.75)`},children:(0,s.jsxs)(`div`,{className:`uc-modal`,style:{background:`#0f172a`,color:`#fff`,textAlign:`center`,padding:`40px 30px`,maxWidth:`380px`,borderRadius:`16px`,boxShadow:`0 20px 25px -5px rgba(0,0,0,0.5)`},children:[(0,s.jsxs)(`div`,{style:{position:`relative`,display:`inline-block`,marginBottom:`24px`},children:[(0,s.jsx)(`div`,{className:`uc-call-avatar-pulse`}),(0,s.jsx)(d,{user:z.user,size:100,style:{border:`4px solid #3b82f6`,position:`relative`,zIndex:2}})]}),(0,s.jsx)(`h3`,{style:{fontSize:`20px`,fontWeight:800,marginBottom:`6px`,color:`#fff`},children:z.user.name}),(0,s.jsx)(`p`,{style:{fontSize:`13px`,color:`#94a3b8`,textTransform:`uppercase`,letterSpacing:`1px`,marginBottom:`30px`},children:z.user.role||`Employee`}),(0,s.jsxs)(`div`,{style:{fontSize:`16px`,fontWeight:600,color:`#3b82f6`,marginBottom:`40px`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`8px`},children:[(0,s.jsx)(`span`,{className:`uc-call-dot-pulse`}),z.status]}),(0,s.jsx)(`div`,{style:{display:`flex`,gap:`20px`,justifyContent:`center`},children:(0,s.jsx)(`button`,{onClick:()=>B(null),style:{background:`#ef4444`,color:`#fff`,border:`none`,borderRadius:`50%`,width:`56px`,height:`56px`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`20px`,cursor:`pointer`,boxShadow:`0 4px 12px rgba(239, 68, 68, 0.4)`,transition:`all 0.2s`},title:`Hang up`,children:(0,s.jsx)(`i`,{className:`fa-solid fa-phone-slash`,style:{transform:`rotate(-45deg)`}})})})]})})]})};export{p as default};