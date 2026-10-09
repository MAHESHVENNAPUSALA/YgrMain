import{a as e,f as t,i as n,m as r,p as i,s as a,u as o}from"./index-DhX1kTxg.js";var s=r(t(),1),c=i();function l(e=``){return e.split(` `).slice(0,2).map(e=>e[0]).join(``).toUpperCase()||`?`}function ee(e){if(!e)return``;try{let t=new Date(e),n=new Date,r=new Date(n);return r.setDate(n.getDate()-1),t.toDateString()===n.toDateString()?`Today`:t.toDateString()===r.toDateString()?`Yesterday`:t.toLocaleDateString(`en-IN`,{day:`2-digit`,month:`short`,year:`numeric`})}catch{return``}}function te(e){if(!e)return``;try{return new Date(e).toDateString()}catch{return``}}var u=[`👍`,`❤️`,`😂`,`😮`,`😢`,`🔥`,`🎉`,`👏`,`💯`,`🙏`];function d({user:e,size:t=36,style:n={}}){let[r,i]=(0,s.useState)(!1),a=e?.name||e?.username||e?.sender_name||``,o=e?.profile_pic||e?.sender_avatar;return o&&!r?(0,c.jsx)(`img`,{src:o,alt:a,onError:()=>i(!0),style:{width:t,height:t,borderRadius:`50%`,objectFit:`cover`,flexShrink:0,...n}}):(0,c.jsx)(`div`,{style:{width:t,height:t,borderRadius:`50%`,background:`linear-gradient(135deg, #3b82f6, #1d4ed8)`,color:`#fff`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontWeight:700,fontSize:t*.38,flexShrink:0,...n},children:l(a)})}function f({status:e}){let t={Online:`#22c55e`,Away:`#f59e0b`,Busy:`#ef4444`,"In Meeting":`#8b5cf6`,"Working From Home":`#06b6d4`,Offline:`#94a3b8`};return(0,c.jsx)(`span`,{style:{display:`inline-block`,width:9,height:9,borderRadius:`50%`,background:t[e]||t.Offline,border:`2px solid #fff`,flexShrink:0},title:e})}var p=()=>{let{user:t}=e(),{showToast:r}=n(),i=o(),[l,p]=(0,s.useState)([]),[ne,re]=(0,s.useState)([]),[ie,ae]=(0,s.useState)([]),[m,oe]=(0,s.useState)(``),[h,g]=(0,s.useState)(null),[_,se]=(0,s.useState)(()=>{try{return JSON.parse(localStorage.getItem(`chat_last_read`)||`{}`)}catch{return{}}}),ce=(0,s.useRef)(_),[v,y]=(0,s.useState)([]),[le,ue]=(0,s.useState)(!1),[de,fe]=(0,s.useState)(!0),[b,x]=(0,s.useState)(``),[S,C]=(0,s.useState)(null),[w,T]=(0,s.useState)(null),[E,D]=(0,s.useState)(``),[O,k]=(0,s.useState)(null),[A,j]=(0,s.useState)(null),[pe,me]=(0,s.useState)(!1),[he,M]=(0,s.useState)(!1),[ge,_e]=(0,s.useState)(``),[ve,ye]=(0,s.useState)(``),[N,P]=(0,s.useState)([]),[F,I]=(0,s.useState)(null),[L,be]=(0,s.useState)([]),[xe,R]=(0,s.useState)(null),[Se,Ce]=(0,s.useState)(!1),[z,B]=(0,s.useState)(null),we=(0,s.useRef)(null),V=(0,s.useRef)(null),H=(0,s.useRef)(null),U=(0,s.useRef)(0),Te=(0,s.useRef)(null),W=(0,s.useRef)(null);(0,s.useEffect)(()=>{ce.current=_,localStorage.setItem(`chat_last_read`,JSON.stringify(_))},[_]);let G=(0,s.useCallback)(async()=>{try{let[e,t]=await Promise.all([a.getAllUsers(),a.getAllChatRooms(ce.current)]),n=e.data||[];p(n);let r=t.data?.channels||[],i=t.data?.teams||[];re(r),ae(i);let o=n.reduce((e,t)=>e+(t.unread||0),0),s=[...r,...i].reduce((e,t)=>e+(t.unread||0),0);window.dispatchEvent(new CustomEvent(`msg-unread-update`,{detail:o+s}))}catch(e){console.error(`Sidebar load error`,e)}finally{fe(!1)}},[]),Ee=async e=>{if(Z){B({type:e,user:Z,status:`Calling...`});try{await a.initiateCall({receiver:Z.id,call_type:e}),setTimeout(()=>{B(e=>e?{...e,status:`Connected`}:null)},2500)}catch(e){r(e.response?.data?.detail||`Failed to initiate call session.`,`error`),B(null)}}};(0,s.useEffect)(()=>{G(),a.updatePresence({status:`Online`}).catch(()=>{});let e=setInterval(()=>G(),1e4);return()=>{clearInterval(e),a.updatePresence({status:`Offline`}).catch(()=>{})}},[G]),(0,s.useEffect)(()=>{i.state?.openChatId&&i.state?.chatType&&i.state?.chatName&&(g({type:i.state.chatType,id:i.state.openChatId,name:i.state.chatName}),window.history.replaceState({},document.title))},[i.state]);let K=(0,s.useCallback)(async(e=!1)=>{if(h){e&&(ue(!0),U.current=0);try{let t=e?{}:{last_id:U.current};h.type===`dm`?t.user_id=h.id:t.room_id=h.id;let n=(await a.getChatHistory(t)).data?.messages||[];e?y(n):n.length>0&&y(e=>{let t=new Set(e.map(e=>e.id)),r=n.filter(e=>!t.has(e.id));return r.length?[...e,...r]:e}),n.length>0&&(U.current=n[n.length-1].id)}catch(e){console.error(`Load messages error`,e)}finally{e&&ue(!1)}}},[h]);(0,s.useEffect)(()=>{if(h)return K(!0),clearInterval(H.current),H.current=setInterval(()=>K(!1),3e3),()=>clearInterval(H.current)},[h,K]),(0,s.useEffect)(()=>{we.current?.scrollIntoView({behavior:`smooth`})},[v]),(0,s.useEffect)(()=>{let e=()=>k(null);return window.addEventListener(`click`,e),()=>window.removeEventListener(`click`,e)},[]);let De=async e=>{e?.preventDefault();let t=b.trim();if(!t&&!V.current?.files[0]||!h)return;let n=new FormData;n.append(`text`,t),h.type===`dm`?n.append(`receiver_id`,h.id):n.append(`room_id`,h.id),S&&n.append(`reply_to_id`,S.id);let i=V.current;i?.files[0]&&(n.append(`file`,i.files[0]),i.value=``),x(``),C(null);try{let e=(await a.sendMessage(n)).data;y(t=>new Set(t.map(e=>e.id)).has(e.id)?t:[...t,e]),U.current=e.id}catch(e){r(e?.response?.data?.detail||`Failed to send message.`,`error`)}},Oe=async()=>{if(!(!w||!E.trim())){try{await a.editMessage({message_id:w.id,is_group:w.is_group,text:E}),y(e=>e.map(e=>e.id===w.id?{...e,text:E,edited:!0}:e))}catch(e){r(e?.response?.data?.detail||`Edit failed.`,`error`)}T(null),D(``)}},q=async(e,t)=>{try{await a.deleteMessage({message_id:e.id,is_group:e.is_group,mode:t}),y(t===`everyone`?t=>t.map(t=>t.id===e.id?{...t,is_deleted:!0,text:``,file_url:null}:t):t=>t.filter(t=>t.id!==e.id))}catch(e){r(e?.response?.data?.detail||`Delete failed.`,`error`)}k(null)},J=async(e,t)=>{try{let n=await a.toggleReaction({message_id:e.id,is_group:e.is_group,emoji:t});y(t=>t.map(t=>t.id===e.id?{...t,reactions:n.data.reactions}:t))}catch(e){console.error(e)}j(null)},ke=async()=>{if(!(!F||!L.length)){try{await a.forwardMessage({msg_ids:[F.id],receiver_ids:L}),r(`Message forwarded.`,`success`)}catch{r(`Forward failed.`,`error`)}I(null),be([])}},Ae=async e=>{e.preventDefault();try{await a.createTeam({name:ge,description:ve,users:N}),M(!1),_e(``),ye(``),P([]),G()}catch(e){r(e?.response?.data?.detail||`Failed to create team.`,`error`)}},je=e=>{x(e.target.value);let t=e.target;t.style.height=`auto`,t.style.height=Math.min(t.scrollHeight,140)+`px`,Se||Ce(!0),clearTimeout(Te.current),Te.current=setTimeout(()=>Ce(!1),2e3)},Me=l.filter(e=>e.name.toLowerCase().includes(m.toLowerCase())||e.role.toLowerCase().includes(m.toLowerCase())),Y=ne.filter(e=>e.name.toLowerCase().includes(m.toLowerCase())),X=ie.filter(e=>e.name.toLowerCase().includes(m.toLowerCase())),Z=h?.type===`dm`?l.find(e=>e.id===h.id):null,Q=h?.name||``,$=[],Ne=``;v.forEach(e=>{let t=te(e.created_at_iso);t&&t!==Ne&&($.push({_type:`separator`,label:ee(e.created_at_iso),key:t}),Ne=t),$.push(e)});function Pe(e){return/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(e||``)}let Fe=!h?.is_announcement_only||t?.role===`MD`||t?.role===`HR`;return(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`style`,{children:`
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
      `}),(0,c.jsxs)(`div`,{className:`uc-wrap`,children:[(0,c.jsxs)(`div`,{className:`uc-sidebar`,children:[(0,c.jsxs)(`div`,{className:`uc-sidebar-top`,children:[(0,c.jsxs)(`div`,{className:`uc-sidebar-title`,children:[(0,c.jsx)(`span`,{children:`💬 Messages`}),(0,c.jsx)(`button`,{className:`uc-new-btn`,onClick:()=>M(!0),children:`+ Team`})]}),(0,c.jsx)(`input`,{className:`uc-search`,placeholder:`🔍 Search people, channels...`,value:m,onChange:e=>oe(e.target.value)})]}),(0,c.jsxs)(`div`,{className:`uc-sidebar-list`,children:[(0,c.jsx)(`div`,{className:`uc-section-label`,children:`📢 Channels`}),de?(0,c.jsx)(`div`,{style:{padding:`12px`,color:`#94a3b8`,fontSize:12},children:`Loading…`}):Y.length===0&&!m?(0,c.jsx)(`div`,{style:{padding:`6px 8px`,color:`#94a3b8`,fontSize:11.5,fontStyle:`italic`},children:`No channels yet`}):Y.map(e=>(0,c.jsxs)(`div`,{className:`uc-item ${h?.id===e.id&&h?.type===`channel`?`active`:``}`,onClick:()=>{g({type:`channel`,id:e.id,name:e.name,is_announcement_only:e.is_announcement_only}),e.last_msg_id&&(se(t=>({...t,[e.id]:e.last_msg_id})),re(t=>t.map(t=>t.id===e.id?{...t,unread:0}:t)))},children:[(0,c.jsx)(`div`,{className:`uc-channel-icon`,children:`#`}),(0,c.jsxs)(`div`,{className:`uc-item-info`,children:[(0,c.jsx)(`div`,{className:`uc-item-name`,children:e.name}),(0,c.jsx)(`div`,{className:`uc-item-sub`,children:e.last_msg_text||e.description||`No messages yet`})]}),e.unread>0&&(0,c.jsx)(`div`,{className:`uc-unread`,children:e.unread>99?`99+`:e.unread})]},`ch-${e.id}`)),X.length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`div`,{className:`uc-section-label`,children:`👥 Team Groups`}),X.map(e=>(0,c.jsxs)(`div`,{className:`uc-item ${h?.id===e.id&&h?.type===`team`?`active`:``}`,onClick:()=>{g({type:`team`,id:e.id,name:e.name}),e.last_msg_id&&(se(t=>({...t,[e.id]:e.last_msg_id})),ae(t=>t.map(t=>t.id===e.id?{...t,unread:0}:t)))},children:[(0,c.jsx)(`div`,{className:`uc-channel-icon`,style:{background:`#fef3c7`,color:`#92400e`},children:`👥`}),(0,c.jsxs)(`div`,{className:`uc-item-info`,children:[(0,c.jsx)(`div`,{className:`uc-item-name`,children:e.name}),(0,c.jsx)(`div`,{className:`uc-item-sub`,children:e.last_msg_text||`Team chat`})]}),e.unread>0&&(0,c.jsx)(`div`,{className:`uc-unread`,children:e.unread>99?`99+`:e.unread})]},`tm-${e.id}`))]}),(0,c.jsx)(`div`,{className:`uc-section-label`,children:`✉️ Direct Messages`}),Me.map(e=>(0,c.jsxs)(`div`,{className:`uc-item ${h?.id===e.id&&h?.type===`dm`?`active`:``}`,onClick:()=>{g({type:`dm`,id:e.id,name:e.name}),p(t=>t.map(t=>t.id===e.id?{...t,unread:0}:t))},children:[(0,c.jsxs)(`div`,{style:{position:`relative`,flexShrink:0},children:[(0,c.jsx)(d,{user:e,size:36}),(0,c.jsx)(`span`,{style:{position:`absolute`,bottom:-1,right:-1},children:(0,c.jsx)(f,{status:e.status})})]}),(0,c.jsxs)(`div`,{className:`uc-item-info`,children:[(0,c.jsx)(`div`,{className:`uc-item-name`,children:e.name}),(0,c.jsx)(`div`,{className:`uc-item-sub`,children:e.status===`Offline`?e.last_msg_text||e.role:e.status})]}),e.unread>0&&(0,c.jsx)(`div`,{className:`uc-unread`,children:e.unread>99?`99+`:e.unread})]},`dm-${e.id}`)),Me.length===0&&Y.length===0&&m&&(0,c.jsxs)(`div`,{style:{padding:`12px 8px`,color:`#94a3b8`,fontSize:12,textAlign:`center`},children:[`No results for "`,m,`"`]})]})]}),(0,c.jsx)(`div`,{className:`uc-main`,children:h?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(`div`,{className:`uc-header`,children:[Z?(0,c.jsxs)(`div`,{style:{position:`relative`},children:[(0,c.jsx)(d,{user:Z,size:40}),(0,c.jsx)(`span`,{style:{position:`absolute`,bottom:0,right:0},children:(0,c.jsx)(f,{status:Z.status})})]}):(0,c.jsx)(`div`,{className:`uc-channel-icon`,style:{width:40,height:40,borderRadius:10,fontSize:17},children:h.type===`team`?`👥`:`#`}),(0,c.jsxs)(`div`,{className:`uc-header-info`,children:[(0,c.jsx)(`div`,{className:`uc-header-name`,children:Q}),(0,c.jsx)(`div`,{className:`uc-header-sub`,children:Z?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(f,{status:Z.status}),(0,c.jsx)(`span`,{children:Z.status}),(0,c.jsx)(`span`,{style:{color:`#cbd5e1`},children:`·`}),(0,c.jsx)(`span`,{children:Z.role}),Z.department&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`span`,{style:{color:`#cbd5e1`},children:`·`}),(0,c.jsx)(`span`,{children:Z.department})]})]}):(0,c.jsxs)(`span`,{children:[h.type===`channel`?`Channel`:`Team Group`,h.is_announcement_only&&` · 📢 Announcements (read-only for non-admins)`]})})]}),Z&&(0,c.jsxs)(`div`,{className:`uc-header-actions`,style:{display:`flex`,gap:`10px`,marginLeft:`auto`,marginRight:`10px`},children:[(0,c.jsx)(`button`,{onClick:()=>Ee(`audio`),style:{background:`#f1f5f9`,border:`none`,borderRadius:`50%`,width:`36px`,height:`36px`,display:`flex`,alignItems:`center`,justifyContent:`center`,cursor:`pointer`,color:`#475569`,transition:`background 0.2s`},title:`Voice Call`,children:(0,c.jsx)(`i`,{className:`fa-solid fa-phone`})}),(0,c.jsx)(`button`,{onClick:()=>Ee(`video`),style:{background:`#f1f5f9`,border:`none`,borderRadius:`50%`,width:`36px`,height:`36px`,display:`flex`,alignItems:`center`,justifyContent:`center`,cursor:`pointer`,color:`#475569`,transition:`background 0.2s`},title:`Video Call`,children:(0,c.jsx)(`i`,{className:`fa-solid fa-video`})})]})]}),(0,c.jsxs)(`div`,{className:`uc-msgs`,children:[le?(0,c.jsx)(`div`,{style:{textAlign:`center`,padding:32,color:`#94a3b8`,fontSize:13},children:`Loading messages…`}):v.length===0?(0,c.jsx)(`div`,{style:{textAlign:`center`,padding:40,color:`#94a3b8`,fontSize:13},children:`No messages yet. Start the conversation!`}):$.map((e,n)=>{if(e._type===`separator`)return(0,c.jsx)(`div`,{className:`uc-date-sep`,children:e.label},`sep-${e.key}`);let r=e,i=r.sender_id===t?.id,a=h.type!==`dm`,o=r.is_deleted;return(0,c.jsxs)(`div`,{className:`uc-msg-row ${i?`sent`:`received`}`,style:{marginBottom:3},onContextMenu:e=>{e.preventDefault(),k({x:e.clientX,y:e.clientY,msg:r})},children:[i?(0,c.jsx)(d,{user:{sender_avatar:t?.profile_pic,name:t?.first_name||t?.username},size:30,style:{flexShrink:0}}):(0,c.jsx)(d,{user:{sender_avatar:r.sender_avatar,name:r.sender_name},size:30,style:{flexShrink:0}}),(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:i?`flex-end`:`flex-start`,maxWidth:`65%`},children:[a&&!i&&(0,c.jsx)(`div`,{className:`uc-sender-name`,children:r.sender_name}),(0,c.jsxs)(`div`,{className:`uc-bubble`,style:{cursor:`default`},children:[r.reply_to&&(0,c.jsxs)(`div`,{className:`uc-reply-preview`,children:[(0,c.jsxs)(`div`,{className:`uc-reply-preview-sender`,children:[`↩ `,r.reply_to.sender_name]}),(0,c.jsx)(`div`,{style:{fontSize:11},children:r.reply_to.text_preview})]}),o?(0,c.jsx)(`span`,{className:`uc-deleted`,children:`🚫 This message was deleted`}):(0,c.jsxs)(c.Fragment,{children:[r.text&&(0,c.jsx)(`div`,{style:{whiteSpace:`pre-wrap`,wordBreak:`break-word`,lineHeight:`1.6`},children:r.text.split(`
`).map((e,t,n)=>(0,c.jsxs)(s.Fragment,{children:[e,t<n.length-1&&(0,c.jsx)(`br`,{})]},t))}),r.file_url&&(Pe(r.file_name)?(0,c.jsx)(`img`,{src:r.file_url,alt:r.file_name,className:`uc-img-attach`,onClick:()=>R(r.file_url)}):(0,c.jsxs)(`a`,{href:r.file_url,target:`_blank`,rel:`noreferrer`,className:`uc-file-attach`,children:[`📎 `,r.file_name||`Attachment`]}))]}),(0,c.jsxs)(`div`,{className:`uc-msg-meta`,children:[r.edited&&!o&&(0,c.jsx)(`span`,{className:`uc-edited`,children:`edited`}),(0,c.jsx)(`span`,{children:r.created_at}),i&&!a&&(0,c.jsx)(`span`,{className:`uc-tick ${r.is_read?`read`:``}`,children:r.is_read||r.is_delivered?`✓✓`:`✓`})]})]}),!o&&r.reactions&&Object.keys(r.reactions).length>0&&(0,c.jsx)(`div`,{className:`uc-reactions`,children:Object.entries(r.reactions).map(([e,t])=>(0,c.jsxs)(`button`,{className:`uc-reaction-chip`,onClick:()=>J(r,e),title:t.usernames?.join(`, `),children:[e,(0,c.jsx)(`span`,{className:`uc-reaction-count`,children:t.users?.length||1})]},e))}),!o&&(0,c.jsx)(`div`,{style:{position:`relative`},children:A===r.id&&(0,c.jsx)(`div`,{className:`uc-emoji-picker`,style:{[i?`right`:`left`]:0,bottom:22},children:u.map(e=>(0,c.jsx)(`button`,{className:`uc-emoji-btn`,onClick:()=>J(r,e),children:e},e))})})]})]},r.id||r._key)}),(0,c.jsx)(`div`,{ref:we})]}),w&&(0,c.jsxs)(`div`,{className:`uc-edit-bar`,children:[(0,c.jsx)(`span`,{children:`✏️ Editing:`}),(0,c.jsx)(`input`,{className:`uc-edit-input`,value:E,onChange:e=>D(e.target.value),onKeyDown:e=>{e.key===`Enter`&&Oe(),e.key===`Escape`&&(T(null),D(``))},autoFocus:!0}),(0,c.jsx)(`button`,{className:`uc-new-btn`,onClick:Oe,children:`Save`}),(0,c.jsx)(`button`,{className:`uc-new-btn`,style:{background:`#64748b`},onClick:()=>{T(null),D(``)},children:`Cancel`})]}),Fe?(0,c.jsxs)(`div`,{className:`uc-input-wrap`,style:{position:`relative`},children:[S&&(0,c.jsxs)(`div`,{className:`uc-reply-strip`,children:[(0,c.jsxs)(`span`,{children:[`↩ Replying to `,(0,c.jsx)(`strong`,{children:S.sender_name}),`:`]}),(0,c.jsx)(`span`,{className:`uc-reply-strip-text`,children:S.text||`(attachment)`}),(0,c.jsx)(`button`,{className:`uc-reply-close`,onClick:()=>C(null),children:`✕`})]}),pe&&(0,c.jsx)(`div`,{className:`uc-emoji-input-picker`,children:u.map(e=>(0,c.jsx)(`button`,{className:`uc-emoji-btn`,onClick:()=>{x(t=>t+e),me(!1),W.current?.focus()},children:e},e))}),(0,c.jsx)(`form`,{onSubmit:De,children:(0,c.jsxs)(`div`,{className:`uc-input-row`,children:[(0,c.jsx)(`button`,{type:`button`,className:`uc-icon-btn`,onClick:()=>me(e=>!e),title:`Emoji`,children:`😊`}),(0,c.jsx)(`button`,{type:`button`,className:`uc-icon-btn`,onClick:()=>V.current?.click(),title:`Attach file`,children:`📎`}),(0,c.jsx)(`input`,{ref:V,type:`file`,style:{display:`none`},onChange:()=>{}}),(0,c.jsx)(`textarea`,{ref:W,className:`uc-input-box`,rows:1,placeholder:`Message ${h.type===`dm`?Q:`#`+Q}… (Shift+Enter for new line)`,value:b,onChange:je,onKeyDown:e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),De()),e.key===`Escape`&&C(null)},disabled:!!w,style:{alignSelf:`center`}}),(0,c.jsx)(`button`,{type:`submit`,className:`uc-send-btn`,disabled:!b.trim()&&!V.current?.files?.[0],title:`Send`,children:`➤`})]})})]}):(0,c.jsx)(`div`,{className:`uc-locked-notice`,children:`🔒 Only MD and HR can post in the Announcements channel.`})]}):(0,c.jsxs)(`div`,{className:`uc-empty`,children:[(0,c.jsx)(`div`,{className:`uc-empty-icon`,children:`💬`}),(0,c.jsx)(`div`,{className:`uc-empty-title`,children:`Open a Conversation`}),(0,c.jsx)(`div`,{className:`uc-empty-sub`,children:`Select a channel, team group or colleague from the sidebar to start messaging.`})]})})]}),O&&(0,c.jsxs)(`div`,{className:`uc-ctx`,style:{top:O.y,left:O.x},onClick:e=>e.stopPropagation(),children:[(0,c.jsx)(`div`,{className:`uc-ctx-item`,onClick:()=>{C(O.msg),k(null),W.current?.focus()},children:`↩ Reply`}),(0,c.jsx)(`div`,{className:`uc-ctx-item`,onClick:()=>{j(O.msg.id),k(null)},children:`😊 Add Reaction`}),O.msg.text&&(0,c.jsx)(`div`,{className:`uc-ctx-item`,onClick:()=>{navigator.clipboard.writeText(O.msg.text),k(null)},children:`📋 Copy Text`}),(0,c.jsx)(`div`,{className:`uc-ctx-item`,onClick:()=>{I(O.msg),k(null)},children:`↗ Forward`}),O.msg.sender_id===t?.id&&!O.msg.is_deleted&&(0,c.jsx)(`div`,{className:`uc-ctx-item`,onClick:()=>{T(O.msg),D(O.msg.text),k(null)},children:`✏️ Edit`}),(0,c.jsx)(`div`,{className:`uc-ctx-sep`}),(0,c.jsx)(`div`,{className:`uc-ctx-item danger`,onClick:()=>q(O.msg,`me`),children:`🗑 Delete for Me`}),O.msg.sender_id===t?.id&&!O.msg.is_group&&(0,c.jsx)(`div`,{className:`uc-ctx-item danger`,onClick:()=>q(O.msg,`everyone`),children:`🗑 Delete for Everyone`}),O.msg.sender_id===t?.id&&O.msg.is_group&&!O.msg.is_deleted&&(0,c.jsx)(`div`,{className:`uc-ctx-item danger`,onClick:()=>q(O.msg,`everyone`),children:`🗑 Delete Message`})]}),A!==null&&(0,c.jsx)(`div`,{className:`uc-modal-overlay`,style:{background:`transparent`},onClick:()=>j(null),children:(0,c.jsx)(`div`,{className:`uc-emoji-picker`,style:{position:`fixed`,top:`50%`,left:`50%`,transform:`translate(-50%,-50%)`,width:240},onClick:e=>e.stopPropagation(),children:u.map(e=>(0,c.jsx)(`button`,{className:`uc-emoji-btn`,style:{fontSize:24,padding:6},onClick:()=>{let t=v.find(e=>e.id===A);t&&J(t,e),j(null)},children:e},e))})}),xe&&(0,c.jsxs)(`div`,{className:`uc-lightbox`,onClick:()=>R(null),children:[(0,c.jsx)(`button`,{className:`uc-lightbox-close`,onClick:()=>R(null),children:`✕`}),(0,c.jsx)(`img`,{src:xe,alt:`Preview`,onClick:e=>e.stopPropagation()})]}),he&&(0,c.jsx)(`div`,{className:`uc-modal-overlay`,onClick:()=>M(!1),children:(0,c.jsxs)(`div`,{className:`uc-modal`,onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(`div`,{className:`uc-modal-title`,children:[`Create Team Group`,(0,c.jsx)(`button`,{className:`uc-modal-close`,onClick:()=>M(!1),children:`×`})]}),(0,c.jsxs)(`form`,{onSubmit:Ae,children:[(0,c.jsxs)(`div`,{className:`uc-form-group`,children:[(0,c.jsx)(`label`,{className:`uc-label`,children:`Team Name *`}),(0,c.jsx)(`input`,{className:`uc-input`,value:ge,onChange:e=>_e(e.target.value),required:!0,placeholder:`e.g. Development Team`})]}),(0,c.jsxs)(`div`,{className:`uc-form-group`,children:[(0,c.jsx)(`label`,{className:`uc-label`,children:`Description`}),(0,c.jsx)(`input`,{className:`uc-input`,value:ve,onChange:e=>ye(e.target.value),placeholder:`Optional description…`})]}),(0,c.jsxs)(`div`,{className:`uc-form-group`,children:[(0,c.jsx)(`label`,{className:`uc-label`,children:`Add Members (hold Ctrl for multiple)`}),(0,c.jsx)(`select`,{multiple:!0,className:`uc-input`,style:{height:110},value:N,onChange:e=>P(Array.from(e.target.selectedOptions,e=>e.value)),children:l.map(e=>(0,c.jsxs)(`option`,{value:e.id,children:[e.name,` (`,e.role,`)`]},e.id))})]}),(0,c.jsx)(`button`,{type:`submit`,className:`uc-submit-btn`,children:`🚀 Create Team`})]})]})}),F&&(0,c.jsx)(`div`,{className:`uc-modal-overlay`,onClick:()=>I(null),children:(0,c.jsxs)(`div`,{className:`uc-modal`,onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(`div`,{className:`uc-modal-title`,children:[`Forward Message`,(0,c.jsx)(`button`,{className:`uc-modal-close`,onClick:()=>I(null),children:`×`})]}),(0,c.jsxs)(`div`,{style:{marginBottom:12,background:`#f1f5f9`,borderRadius:8,padding:`8px 12px`,fontSize:13,color:`#475569`},children:[`"`,F.text?.slice(0,80)||`(attachment)`,`"`]}),(0,c.jsxs)(`div`,{className:`uc-form-group`,children:[(0,c.jsx)(`label`,{className:`uc-label`,children:`Forward to (hold Ctrl for multiple)`}),(0,c.jsx)(`select`,{multiple:!0,className:`uc-input`,style:{height:130},value:L,onChange:e=>be(Array.from(e.target.selectedOptions,e=>e.value)),children:l.map(e=>(0,c.jsxs)(`option`,{value:e.id,children:[e.name,` (`,e.role,`)`]},e.id))})]}),(0,c.jsx)(`button`,{className:`uc-submit-btn`,onClick:ke,disabled:!L.length,children:`↗ Forward`})]})}),z&&(0,c.jsx)(`div`,{className:`uc-modal-overlay`,style:{zIndex:1e4,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`rgba(15, 23, 42, 0.75)`},children:(0,c.jsxs)(`div`,{className:`uc-modal`,style:{background:`#0f172a`,color:`#fff`,textAlign:`center`,padding:`40px 30px`,maxWidth:`380px`,borderRadius:`16px`,boxShadow:`0 20px 25px -5px rgba(0,0,0,0.5)`},children:[(0,c.jsxs)(`div`,{style:{position:`relative`,display:`inline-block`,marginBottom:`24px`},children:[(0,c.jsx)(`div`,{className:`uc-call-avatar-pulse`}),(0,c.jsx)(d,{user:z.user,size:100,style:{border:`4px solid #3b82f6`,position:`relative`,zIndex:2}})]}),(0,c.jsx)(`h3`,{style:{fontSize:`20px`,fontWeight:800,marginBottom:`6px`,color:`#fff`},children:z.user.name}),(0,c.jsx)(`p`,{style:{fontSize:`13px`,color:`#94a3b8`,textTransform:`uppercase`,letterSpacing:`1px`,marginBottom:`30px`},children:z.user.role||`Employee`}),(0,c.jsxs)(`div`,{style:{fontSize:`16px`,fontWeight:600,color:`#3b82f6`,marginBottom:`40px`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`8px`},children:[(0,c.jsx)(`span`,{className:`uc-call-dot-pulse`}),z.status]}),(0,c.jsx)(`div`,{style:{display:`flex`,gap:`20px`,justifyContent:`center`},children:(0,c.jsx)(`button`,{onClick:()=>B(null),style:{background:`#ef4444`,color:`#fff`,border:`none`,borderRadius:`50%`,width:`56px`,height:`56px`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`20px`,cursor:`pointer`,boxShadow:`0 4px 12px rgba(239, 68, 68, 0.4)`,transition:`all 0.2s`},title:`Hang up`,children:(0,c.jsx)(`i`,{className:`fa-solid fa-phone-slash`,style:{transform:`rotate(-45deg)`}})})})]})})]})};export{p as default};