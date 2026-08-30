(()=>{
 function syncAnnual(){
  const annual=document.querySelector('.payment-link[data-billing="annual"]');
  if(!annual)return;
  annual.textContent='Assinar anual · R$ 299,00';
  const note=annual.parentElement?.querySelector('small');
  if(note)note.textContent='Melhor custo-benefício · economize no plano anual.';
 }

 function syncSchoolLock(){
  const state=window.storyplayAccess?.getState?.()||{};
  document.querySelectorAll('.storyplay-school-lock').forEach(lock=>{
   const card=lock.querySelector('.storyplay-premium-lock-card');
   if(!card)return;
   const title=card.querySelector('h3');
   const p=card.querySelector('p');
   const actions=card.querySelector('.storyplay-premium-lock-actions');
   if(title)title.textContent='Acesso institucional';
   if(!actions)return;
   if(!state.authenticated){
    if(p)p.textContent='Esta área faz parte do plano Escolas & Turmas, disponível sob consulta. Entre na sua conta para verificar seu acesso.';
    actions.innerHTML='<a class="btn primary" href="#planos">Ver planos</a><button class="btn secondary" type="button" data-school-login>Entrar</button>';
    actions.querySelector('[data-school-login]')?.addEventListener('click',()=>window.storyplayAccess?.open?.());
   }else{
    if(p)p.textContent='Sua conta está autenticada, mas não possui acesso institucional. Solicite uma liberação para Escolas & Turmas.';
    actions.innerHTML='<a class="btn primary" href="#planos">Ver planos</a><a class="btn secondary" href="#planos" data-school-request>Solicitar acesso</a>';
   }
  });
 }

 function simplifyHeader(){
  const nav=document.getElementById('mainNav');
  if(!nav)return;
  const account=document.getElementById('storyplayClientEntry');
  const menuToggle=document.getElementById('menuToggle');
  if(account&&menuToggle&&account.parentElement!==menuToggle.parentElement){menuToggle.parentElement?.insertBefore(account,menuToggle)}
  if(menuToggle){menuToggle.setAttribute('aria-label',menuToggle.getAttribute('aria-expanded')==='true'?'Fechar menu':'Abrir menu');}
 }

 function closeMenuOnNav(){
  document.querySelectorAll('#mainNav a').forEach(a=>{if(a.dataset.closeBound)return;a.dataset.closeBound='1';a.addEventListener('click',()=>window.storyplayAPI?.closeMenu?.())});
 }

 function sync(){syncAnnual();syncSchoolLock();simplifyHeader();closeMenuOnNav()}
 const observer=new MutationObserver(()=>sync());
 observer.observe(document.body,{childList:true,subtree:true});
 window.addEventListener('storyplay:accesschange',()=>setTimeout(sync,0));
 window.addEventListener('storyplay:statechange',()=>setTimeout(sync,0));
 setTimeout(sync,0);setTimeout(sync,500);setTimeout(sync,1400);
})();