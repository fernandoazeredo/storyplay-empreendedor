(()=>{
 const explorerAlwaysFree=['#inicio','#jornada','#episodio1','#episodio2','#trilhas','#desafios','#empresa','#laboratorios','#planos','#conta-nuvem'];
 const schoolOnly=['#area-educador','#painel-turma'];

 function removeLock(section){
  section.classList.remove('storyplay-premium-locked');
  section.querySelector(':scope > .storyplay-premium-lock')?.remove();
 }

 function ensureSchoolLock(section){
  let lock=section.querySelector(':scope > .storyplay-school-lock');
  if(lock)return lock;
  lock=document.createElement('div');
  lock.className='storyplay-premium-lock storyplay-school-lock';
  lock.innerHTML=`<div class="storyplay-premium-lock-card"><span class="eyebrow">ESCOLAS & TURMAS</span><h3>Acesso institucional</h3><p>Este espaço faz parte do plano Escolas & Turmas, disponível sob consulta. Contas de teste autorizadas pelo administrador também podem acessar esta área.</p><div class="storyplay-premium-lock-actions"><a class="btn primary" href="#planos">Ver planos</a><button class="btn secondary" type="button" data-open-school-access>Entrar / validar acesso</button></div></div>`;
  section.appendChild(lock);
  lock.querySelector('[data-open-school-access]')?.addEventListener('click',()=>window.storyplayAccess?.open?.());
  return lock;
 }

 function syncPolicy(){
  explorerAlwaysFree.forEach(selector=>{const section=document.querySelector(selector);if(section)removeLock(section)});
  const state=window.storyplayAccess?.getState?.()||{};
  const schoolAllowed=Boolean(state.isAdmin||(state.active&&state.source==='trial')||(state.active&&state.source==='school'));
  schoolOnly.forEach(selector=>{
   const section=document.querySelector(selector);if(!section)return;
   section.classList.toggle('storyplay-premium-locked',!schoolAllowed);
   const lock=ensureSchoolLock(section);lock.hidden=schoolAllowed;
  });
 }

 const main=document.querySelector('main');
 if(main){
  const observer=new MutationObserver(()=>syncPolicy());
  observer.observe(main,{childList:true,subtree:false});
 }
 window.addEventListener('storyplay:accesschange',()=>setTimeout(syncPolicy,0));
 window.addEventListener('storyplay:statechange',()=>setTimeout(syncPolicy,0));
 setTimeout(syncPolicy,0);setTimeout(syncPolicy,400);setTimeout(syncPolicy,1200);
})();
