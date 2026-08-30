(()=>{
 const ADMIN_EMAIL='fernandoazeredo64@gmail.com';
 const FIREBASE_VERSION='10.12.5';
 const premiumSelectors=['#laboratorios','#melhor-regime-tributario','#financas-avancadas','#logistica-avancada','#administracao-avancada','#pessoas-avancado','#marketing-vendas-avancado','#gestao-mensal','#saude-empresa','#eventos-empresariais','#desempenho-estrategico','#area-educador','#painel-turma'];
 let firebaseReady=false,auth=null,db=null,currentUser=null;
 let fb={};
 let access={authenticated:false,active:false,isAdmin:false,expired:false,source:null,expiresAt:null,email:null};

 const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const normalizeEmail=value=>String(value||'').trim().toLowerCase();
 const cfg=()=>window.STORYPLAY_FIREBASE_CONFIG||{};
 const configValid=()=>{
  const c=cfg();
  return Boolean(c.apiKey&&c.projectId&&c.appId&&!String(c.apiKey).startsWith('SEU_')&&!String(c.appId).startsWith('SEU_'));
 };
 const accessEvent=()=>window.dispatchEvent(new CustomEvent('storyplay:accesschange',{detail:{...access}}));

 function getFooter(){
  let footer=document.querySelector('footer');
  if(footer)return footer;
  footer=document.createElement('footer');footer.className='storyplay-admin-footer';document.body.appendChild(footer);return footer;
 }

 function buildEntry(){
  const footer=getFooter();
  if(footer.querySelector('.storyplay-admin-entry'))return;
  const a=document.createElement('a');a.href='#';a.className='storyplay-admin-entry';a.textContent='Administração';a.setAttribute('aria-label','Acessar administração do StoryPlay');a.addEventListener('click',e=>{e.preventDefault();openModal()});footer.appendChild(a);
 }

 function buildModal(){
  if(document.getElementById('storyplayAccessModal'))return;
  const modal=document.createElement('div');modal.id='storyplayAccessModal';modal.className='storyplay-access-modal';modal.hidden=true;modal.innerHTML=`
   <div class="storyplay-access-backdrop" data-close-access></div>
   <section class="storyplay-access-dialog" role="dialog" aria-modal="true" aria-labelledby="storyplayAccessTitle">
    <div class="storyplay-access-head"><div><span class="eyebrow">ACESSO STORYPLAY</span><h2 id="storyplayAccessTitle">Conta e administração</h2></div><button type="button" class="storyplay-access-close" data-close-access aria-label="Fechar">×</button></div>
    <div id="storyplayAccessBody"></div>
   </section>`;
  document.body.appendChild(modal);
  modal.addEventListener('click',e=>{if(e.target.closest('[data-close-access]'))closeModal()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal()});
 }

 function openModal(){buildModal();const modal=document.getElementById('storyplayAccessModal');modal.hidden=false;document.body.style.overflow='hidden';renderModal();setTimeout(()=>modal.querySelector('button,input')?.focus(),0)}
 function closeModal(){const modal=document.getElementById('storyplayAccessModal');if(!modal)return;modal.hidden=true;document.body.style.overflow=''}

 function renderSetup(){
  return `<div class="storyplay-access-card"><h3>Firebase ainda não ativado</h3><p>O painel administrativo já está preparado, mas a configuração Web oficial do Firebase Auth/Firestore ainda precisa ser preenchida.</p><p class="storyplay-access-note">Nenhuma senha de administrador será gravada no código. O acesso será feito pelo Firebase Auth, e somente <strong>${ADMIN_EMAIL}</strong> terá permissão administrativa pelas regras do Firestore.</p></div>`;
 }

 function renderAuth(){
  return `<div class="storyplay-access-grid">
   <article class="storyplay-access-card"><h3>Entrar com Google</h3><p>Use sua conta Google para validar acesso Premium ou Administração.</p><button class="btn primary" id="accessGoogle" type="button">Entrar com Google</button></article>
   <article class="storyplay-access-card"><h3>E-mail e senha</h3><form id="accessEmailForm" class="storyplay-access-form"><label>E-mail<input id="accessEmail" type="email" autocomplete="email" required></label><label>Senha<input id="accessPassword" type="password" autocomplete="current-password" minlength="6" required></label><button class="btn primary" type="submit">Entrar</button><button class="btn secondary" id="accessCreateAccount" type="button">Criar conta</button></form><p class="storyplay-access-note">Amigos convidados podem criar a conta com o mesmo e-mail que você liberou no painel.</p></article>
  </div><div id="accessMessage" class="storyplay-access-note" aria-live="polite"></div>`;
 }

 function accessLabel(){
  if(access.isAdmin)return '<div class="storyplay-access-status"><strong>Administrador</strong><br>Acesso integral ao StoryPlay.</div>';
  if(access.active)return `<div class="storyplay-access-status"><strong>${access.source==='trial'?'Teste liberado':'Acesso Premium ativo'}</strong><br>${access.expiresAt?'Válido até '+new Date(access.expiresAt).toLocaleString('pt-BR'):'Sem data de expiração informada.'}</div>`;
  if(access.expired)return '<div class="storyplay-access-status expired"><strong>Período de teste encerrado</strong><br>O conteúdo Premium está bloqueado.</div>';
  return '<div class="storyplay-access-status expired"><strong>Sem acesso Premium</strong><br>Seu e-mail não possui uma liberação ativa.</div>';
 }

 async function renderAdminList(){
  const host=document.getElementById('trialAdminList');if(!host||!db)return;
  host.innerHTML='<p>Carregando acessos...</p>';
  try{
   const snap=await fb.getDocs(fb.collection(db,'trialAccess'));
   const rows=[];snap.forEach(d=>rows.push({id:d.id,...d.data()}));rows.sort((a,b)=>String(a.email||a.id).localeCompare(String(b.email||b.id)));
   if(!rows.length){host.innerHTML='<p class="storyplay-access-note">Nenhum acesso de teste cadastrado.</p>';return}
   host.innerHTML=`<div class="storyplay-admin-table-wrap"><table class="storyplay-admin-table"><thead><tr><th>E-mail</th><th>Status</th><th>Expira</th><th>Ações</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${escapeHTML(r.email||r.id)}</td><td>${escapeHTML(r.status||'active')}</td><td>${r.expiresAt?new Date(r.expiresAt).toLocaleDateString('pt-BR'):'—'}</td><td><div class="storyplay-admin-actions"><button class="btn secondary" type="button" data-trial-extend="${escapeHTML(r.id)}">+15 dias</button><button class="btn secondary" type="button" data-trial-revoke="${escapeHTML(r.id)}">Revogar</button></div></td></tr>`).join('')}</tbody></table></div>`;
  }catch(err){host.innerHTML=`<p class="storyplay-access-note">Não foi possível carregar: ${escapeHTML(err.message||err)}</p>`}
 }

 function renderAdmin(){
  return `${accessLabel()}<div class="storyplay-auth-user"><div><strong>${escapeHTML(currentUser?.email||'')}</strong><br><small>Administrador autorizado</small></div><button class="btn secondary" id="accessLogout" type="button">Sair</button></div>
  <div class="storyplay-access-grid"><article class="storyplay-access-card"><h3>Liberar teste</h3><form id="trialGrantForm" class="storyplay-access-form"><label>E-mail do convidado<input id="trialEmail" type="email" required placeholder="amigo@email.com"></label><label>Duração<select id="trialDays"><option value="15" selected>15 dias</option><option value="7">7 dias</option><option value="30">30 dias</option><option value="365">365 dias</option></select></label><button class="btn primary" type="submit">Liberar acesso</button></form><p class="storyplay-access-note">A contagem começa no momento da liberação. Ao vencer, o acesso Premium é bloqueado automaticamente pela aplicação.</p></article><article class="storyplay-access-card"><h3>Controle</h3><p>Você pode estender 15 dias ou revogar qualquer liberação.</p><div id="trialAdminList"></div></article></div><div id="accessMessage" class="storyplay-access-note" aria-live="polite"></div>`;
 }

 function renderUser(){
  return `${accessLabel()}<div class="storyplay-auth-user"><div><strong>${escapeHTML(currentUser?.email||'')}</strong><br><small>Conta autenticada</small></div><button class="btn secondary" id="accessLogout" type="button">Sair</button></div><p class="storyplay-access-note">Se você recebeu um convite de teste, use exatamente o mesmo e-mail liberado pelo administrador.</p>`;
 }

 function renderModal(){
  const body=document.getElementById('storyplayAccessBody');if(!body)return;
  body.innerHTML=!configValid()?renderSetup():!currentUser?renderAuth():access.isAdmin?renderAdmin():renderUser();
  bindModalActions();if(access.isAdmin)renderAdminList();
 }

 function showMessage(text){const el=document.getElementById('accessMessage');if(el)el.textContent=text}

 function bindModalActions(){
  document.getElementById('accessGoogle')?.addEventListener('click',async()=>{try{await fb.signInWithPopup(auth,new fb.GoogleAuthProvider())}catch(err){showMessage('Falha no login: '+(err.message||err))}});
  document.getElementById('accessEmailForm')?.addEventListener('submit',async e=>{e.preventDefault();const email=document.getElementById('accessEmail').value.trim(),password=document.getElementById('accessPassword').value;try{await fb.signInWithEmailAndPassword(auth,email,password)}catch(err){showMessage('Falha no login: '+(err.message||err))}});
  document.getElementById('accessCreateAccount')?.addEventListener('click',async()=>{const email=document.getElementById('accessEmail')?.value.trim(),password=document.getElementById('accessPassword')?.value;if(!email||!password){showMessage('Informe e-mail e senha para criar a conta.');return}try{await fb.createUserWithEmailAndPassword(auth,email,password)}catch(err){showMessage('Falha ao criar conta: '+(err.message||err))}});
  document.getElementById('accessLogout')?.addEventListener('click',async()=>{await fb.signOut(auth);closeModal()});
  document.getElementById('trialGrantForm')?.addEventListener('submit',async e=>{e.preventDefault();const email=normalizeEmail(document.getElementById('trialEmail').value),days=Number(document.getElementById('trialDays').value||15);if(!email)return;const start=new Date(),end=new Date(start.getTime()+days*86400000);try{await fb.setDoc(fb.doc(db,'trialAccess',email),{email,status:'active',source:'trial',startsAt:start.toISOString(),expiresAt:end.toISOString(),updatedAt:fb.serverTimestamp()},{merge:true});showMessage(`Acesso liberado para ${email} por ${days} dias.`);document.getElementById('trialGrantForm').reset();document.getElementById('trialDays').value='15';renderAdminList()}catch(err){showMessage('Falha ao liberar: '+(err.message||err))}});
  document.getElementById('trialAdminList')?.addEventListener('click',async e=>{const extend=e.target.closest('[data-trial-extend]'),revoke=e.target.closest('[data-trial-revoke]');if(!extend&&!revoke)return;const id=extend?.dataset.trialExtend||revoke?.dataset.trialRevoke;try{const ref=fb.doc(db,'trialAccess',id);if(revoke){await fb.setDoc(ref,{status:'revoked',updatedAt:fb.serverTimestamp()},{merge:true});showMessage('Acesso revogado.')}else{const snap=await fb.getDoc(ref),data=snap.data()||{},base=Math.max(Date.now(),new Date(data.expiresAt||0).getTime()||0),end=new Date(base+15*86400000);await fb.setDoc(ref,{status:'active',expiresAt:end.toISOString(),updatedAt:fb.serverTimestamp()},{merge:true});showMessage('Acesso estendido por 15 dias.')}renderAdminList()}catch(err){showMessage('Falha ao atualizar: '+(err.message||err))}});
 }

 function ensureLock(section){
  let lock=section.querySelector(':scope > .storyplay-premium-lock');
  if(lock)return lock;
  lock=document.createElement('div');lock.className='storyplay-premium-lock';lock.innerHTML=`<div class="storyplay-premium-lock-card"><span class="eyebrow">CONTEÚDO PREMIUM</span><h3>Acesso restrito</h3><p>Assine o plano Empreendedor ou entre com uma conta que possua acesso liberado.</p><div class="storyplay-premium-lock-actions"><a class="btn primary" href="#planos">Ver planos</a><button class="btn secondary" type="button" data-open-access>Entrar / validar acesso</button></div></div>`;section.appendChild(lock);lock.querySelector('[data-open-access]')?.addEventListener('click',openModal);return lock;
 }

 function applyGate(){
  if(!configValid())return;
  const unlocked=access.active||access.isAdmin;
  premiumSelectors.forEach(selector=>{const section=document.querySelector(selector);if(!section)return;section.classList.toggle('storyplay-premium-locked',!unlocked);const lock=ensureLock(section);lock.hidden=unlocked});
 }

 function observePremiumSections(){
  const main=document.querySelector('main');if(!main)return;
  const observer=new MutationObserver(records=>{let relevant=false;for(const r of records){if([...r.addedNodes].some(n=>n.nodeType===1&&((n.matches&&premiumSelectors.some(s=>n.matches(s)))||(n.querySelector&&premiumSelectors.some(s=>n.querySelector(s)))))){relevant=true;break}}if(relevant)applyGate()});
  observer.observe(main,{childList:true,subtree:false});
 }

 async function evaluateAccess(user){
  currentUser=user||null;
  if(!user){access={authenticated:false,active:false,isAdmin:false,expired:false,source:null,expiresAt:null,email:null};applyGate();accessEvent();renderModal();return}
  const email=normalizeEmail(user.email),isAdmin=email===ADMIN_EMAIL;
  if(isAdmin){access={authenticated:true,active:true,isAdmin:true,expired:false,source:'admin',expiresAt:null,email};applyGate();accessEvent();renderModal();return}
  let data=null;try{const snap=await fb.getDoc(fb.doc(db,'trialAccess',email));if(snap.exists())data=snap.data()}catch(e){}
  const expiresAt=data?.expiresAt||null,expiresMs=expiresAt?new Date(expiresAt).getTime():0,active=Boolean(data&&data.status==='active'&&expiresMs>Date.now());
  access={authenticated:true,active,isAdmin:false,expired:Boolean(data&&expiresMs&&expiresMs<=Date.now()),source:data?.source||null,expiresAt,email};applyGate();accessEvent();renderModal();
 }

 async function initFirebase(){
  if(!configValid()){applyGate();return}
  try{
   const [appMod,authMod,firestoreMod]=await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`)
   ]);
   fb={...appMod,...authMod,...firestoreMod};
   const app=appMod.initializeApp(cfg());auth=authMod.getAuth(app);db=firestoreMod.getFirestore(app);firebaseReady=true;
   authMod.onAuthStateChanged(auth,evaluateAccess);
  }catch(err){console.error('StoryPlay access control: Firebase init failed',err)}
 }

 function enhanceAccountSection(){
  const google=document.getElementById('futureGoogle'),email=document.getElementById('futureEmail');if(!google||!email)return;
  if(configValid()){
   google.disabled=false;email.disabled=false;google.textContent='Entrar com Google';email.textContent='Entrar com e-mail e senha';google.addEventListener('click',openModal);email.addEventListener('click',openModal);
   const mode=document.getElementById('accountMode'),detail=document.getElementById('accountDetail');if(mode)mode.textContent='Conta disponível';if(detail)detail.textContent='Firebase Auth e controle de acesso preparados';
  }
 }

 buildEntry();buildModal();observePremiumSections();
 setTimeout(()=>{enhanceAccountSection();applyGate()},300);
 setTimeout(()=>{enhanceAccountSection();applyGate()},1000);
 window.addEventListener('storyplay:statechange',()=>{enhanceAccountSection();applyGate()});
 initFirebase();
 window.storyplayAccess={open:openModal,getState:()=>({...access}),isFirebaseReady:()=>firebaseReady};
})();
