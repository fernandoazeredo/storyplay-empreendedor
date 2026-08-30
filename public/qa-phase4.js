(()=>{
 const api=window.storyplayAPI;if(!api)return;
 const marketing=document.getElementById('calcMarketing');
 if(marketing&&!marketing.dataset.metricsGuard){
  marketing.dataset.metricsGuard='true';
  marketing.addEventListener('click',()=>{
   const before=api.getState();
   if(!before.company)return;
   const prevRevenue=Number(before.metrics?.revenue||0),prevClients=Number(before.metrics?.clients||0);
   setTimeout(()=>{
    const after=api.getState();
    const revenue=Math.max(prevRevenue,Number(after.metrics?.revenue||0));
    const clients=Math.max(prevClients,Number(after.metrics?.clients||0));
    if(revenue!==Number(after.metrics?.revenue||0)||clients!==Number(after.metrics?.clients||0)){
     api.updateMetrics({revenue,clients,lastActivity:'Campanha de marketing analisada sem apagar métricas acumuladas'});
    }
   },0);
  },true);
 }
 function loadScript(src){
  if(document.querySelector(`script[src="${src}"]`))return;
  const script=document.createElement('script');
  script.src=src;
  script.async=false;
  document.body.appendChild(script);
 }
 function loadStyle(href){
  if(document.querySelector(`link[href="${href}"]`))return;
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href=href;
  document.head.appendChild(link);
 }
 loadScript('/company-activity.js');
 loadScript('/profile-view.js');
 loadScript('/header-theme.js');
 loadStyle('/ranking-events.css');
 loadScript('/ranking-events.js');
 loadStyle('/accessibility-structure.css');
 loadScript('/accessibility-structure.js');
 loadScript('/live-feedback.js');
 loadScript('/progress-accessibility.js');
 loadScript('/events-delivery-fix.js');
 loadStyle('/access-control.css');
 loadStyle('/access-control-admin-layout.css');
 loadScript('/firebase-config.js');
 loadScript('/access-control.js');
 loadScript('/access-policy.js');
 loadStyle('/account-header-entry.css');
 loadScript('/account-header-entry.js');
 loadStyle('/ux-commercial-final.css');
 loadScript('/ux-commercial-final.js');
 const observer=new MutationObserver(()=>{
  if(document.getElementById('area-educador')){
   if(!document.querySelector('link[href="/classroom.css"]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href='/classroom.css';document.head.appendChild(link);
   }
   loadScript('/classroom-v2.js');
   observer.disconnect();
  }
 });
 observer.observe(document.body,{childList:true,subtree:true});
 if(document.getElementById('area-educador')){
  loadScript('/classroom-v2.js');
  observer.disconnect();
 }
 loadStyle('/menu-organizer.css');
 loadScript('/menu-organizer.js');
 loadScript('/menu-universal-close.js');
 loadStyle('/tax-choice-dark-final.css');
 loadStyle('/quiz-gamification.css');
 loadScript('/tax-choice-stars.js');
 loadScript('/quiz-gamification.js');
 loadScript('/episode2-dedupe-final.js');
 loadStyle('/commercial-whatsapp.css');
 loadScript('/commercial-whatsapp.js');
 loadScript('/access-presets-final.js');
 loadStyle('/guided-tour.css');
 loadScript('/guided-tour.js');
 loadStyle('/footer-center-final.css');
 loadScript('/footer-text-final.js');

 // Ajustes finais de UI: anual roxo, WhatsApp secundário e tabela Admin sem corte no desktop.
 if(!document.getElementById('storyplayFinalUiFixes')){
  const style=document.createElement('style');
  style.id='storyplayFinalUiFixes';
  style.textContent=`
   #planos .plan-card.featured .payment-options .payment-link[data-billing="annual"]{
    background:#7c3aed!important;background-image:linear-gradient(135deg,#6d28d9,#8b5cf6)!important;
    color:#fff!important;border-color:#6d28d9!important;box-shadow:0 10px 24px rgba(109,40,217,.22)!important
   }
   #planos .plan-card.featured .payment-options .payment-link[data-billing="annual"]:hover{filter:brightness(1.05)!important}
   #planos .storyplay-whatsapp-release{
    width:auto!important;max-width:92%!important;min-height:0!important;padding:7px 10px!important;
    margin:8px auto 0!important;border-radius:10px!important;font-size:.76rem!important;line-height:1.2!important;
    box-shadow:none!important;align-self:center!important
   }
   #planos .storyplay-whatsapp-release .storyplay-whatsapp-icon{font-size:.78rem!important}
   .storyplay-admin-table-wrap{width:100%!important;overflow:visible!important}
   .storyplay-admin-table{width:100%!important;min-width:0!important;table-layout:fixed!important;font-size:12px!important}
   .storyplay-admin-table th,.storyplay-admin-table td{white-space:normal!important;overflow-wrap:anywhere!important;padding:9px 7px!important;vertical-align:middle!important}
   .storyplay-admin-table th:nth-child(1),.storyplay-admin-table td:nth-child(1){width:39%!important}
   .storyplay-admin-table th:nth-child(2),.storyplay-admin-table td:nth-child(2){width:14%!important}
   .storyplay-admin-table th:nth-child(3),.storyplay-admin-table td:nth-child(3){width:17%!important}
   .storyplay-admin-table th:nth-child(4),.storyplay-admin-table td:nth-child(4){width:30%!important}
   .storyplay-admin-actions{display:flex!important;gap:5px!important;flex-wrap:wrap!important}
   .storyplay-admin-actions .btn{padding:6px 8px!important;font-size:11px!important;min-width:0!important}
   @media(max-width:820px){
    .storyplay-admin-table-wrap{overflow:auto!important}
    .storyplay-admin-table{min-width:560px!important;table-layout:auto!important}
    .storyplay-admin-table th,.storyplay-admin-table td{white-space:nowrap!important}
   }
  `;
  document.head.appendChild(style);
 }

 // Cadastro leve dos usuários e seletor exclusivo de e-mails pendentes no painel Admin.
 (async()=>{
  const ADMIN_EMAIL='fernandoazeredo64@gmail.com';
  const FIREBASE_VERSION='10.12.5';
  const normalizeEmail=value=>String(value||'').trim().toLowerCase();
  const waitForConfig=async()=>{
   for(let i=0;i<40;i++){
    const c=window.STORYPLAY_FIREBASE_CONFIG;
    if(c?.apiKey&&c?.projectId&&c?.appId)return c;
    await new Promise(r=>setTimeout(r,100));
   }
   return null;
  };
  try{
   const config=await waitForConfig();if(!config)return;
   const [appMod,authMod,fsMod]=await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`)
   ]);
   const app=appMod.getApps().length?appMod.getApp():appMod.initializeApp(config);
   const auth=authMod.getAuth(app),db=fsMod.getFirestore(app);
   let currentUser=null,lastPendingRefresh=0;

   async function registerUser(user){
    if(!user?.uid||!user?.email)return;
    const email=normalizeEmail(user.email);
    try{
     await fsMod.setDoc(fsMod.doc(db,'users',user.uid),{
      email,
      displayName:user.displayName||'',
      provider:(user.providerData?.[0]?.providerId)||'',
      lastSeenAt:fsMod.serverTimestamp()
     },{merge:true});
    }catch(err){console.warn('StoryPlay: não foi possível registrar usuário para fila de acesso.',err)}
   }

   async function getPendingEmails(){
    if(!currentUser||normalizeEmail(currentUser.email)!==ADMIN_EMAIL)return [];
    const [usersSnap,trialSnap,subscriptionSnap]=await Promise.all([
     fsMod.getDocs(fsMod.collection(db,'users')),
     fsMod.getDocs(fsMod.collection(db,'trialAccess')),
     fsMod.getDocs(fsMod.collection(db,'subscriptionAccess')).catch(()=>null)
    ]);
    const activeEmails=new Set();
    const now=Date.now();
    const collectActive=snap=>snap?.forEach(d=>{
     const data=d.data()||{};
     const email=normalizeEmail(data.email||d.id);
     const expires=data.expiresAt?new Date(data.expiresAt).getTime():0;
     if(email&&data.status==='active'&&(!expires||expires>now))activeEmails.add(email);
    });
    collectActive(trialSnap);collectActive(subscriptionSnap);
    const pending=new Set();
    usersSnap.forEach(d=>{
     const data=d.data()||{};
     const email=normalizeEmail(data.email);
     if(email&&email!==ADMIN_EMAIL&&!activeEmails.has(email))pending.add(email);
    });
    return [...pending].sort((a,b)=>a.localeCompare(b));
   }

   async function refreshPendingSelect(force=false){
    if(!currentUser||normalizeEmail(currentUser.email)!==ADMIN_EMAIL)return;
    const field=document.getElementById('trialEmail');
    if(!field)return;
    let select=field;
    if(field.tagName!=='SELECT'){
     select=document.createElement('select');
     select.id='trialEmail';select.required=true;
     select.setAttribute('aria-label','E-mails pendentes de liberação');
     field.replaceWith(select);
    }
    const now=Date.now();
    if(!force&&now-lastPendingRefresh<2500&&select.dataset.loaded==='1')return;
    lastPendingRefresh=now;
    const previous=select.value;
    select.innerHTML='<option value="">Carregando e-mails pendentes...</option>';
    try{
     const emails=await getPendingEmails();
     if(!emails.length){
      select.innerHTML='<option value="" selected disabled>Nenhum e-mail pendente</option>';
     }else{
      select.innerHTML='<option value="">Selecione um e-mail pendente</option>'+emails.map(email=>`<option value="${email}">${email}</option>`).join('');
      if(previous&&emails.includes(previous))select.value=previous;
     }
     select.dataset.loaded='1';
     const form=document.getElementById('trialGrantForm');
     if(form&&!form.dataset.pendingRefreshBound){
      form.dataset.pendingRefreshBound='1';
      form.addEventListener('submit',()=>setTimeout(()=>refreshPendingSelect(true),900));
     }
    }catch(err){
     select.innerHTML='<option value="" selected disabled>Não foi possível carregar pendentes</option>';
     console.warn('StoryPlay: falha ao carregar e-mails pendentes.',err);
    }
   }

   authMod.onAuthStateChanged(auth,user=>{
    currentUser=user||null;
    if(user)registerUser(user);
    setTimeout(()=>refreshPendingSelect(true),500);
   });
   setInterval(()=>refreshPendingSelect(false),1200);
  }catch(err){console.warn('StoryPlay: módulo de pendências não iniciado.',err)}
 })();
})();
