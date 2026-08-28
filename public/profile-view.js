(()=>{
 const api=window.storyplayAPI;
 if(!api||document.getElementById('perfil-usuario'))return;
 const key='storyplay-onboarding';
 const profileNames={
  jovem:'Jovem estudante',
  universitario:'Universitário / jovem empreendedor',
  empreendedor:'Empreendedor em planejamento',
  gestor:'Gestor / profissional',
  educador:'Professor / escola'
 };
 const goalNames={
  aprender:'Aprender empreendedorismo do zero',
  abrir:'Aprender como abrir uma empresa',
  gerir:'Aprender a administrar melhor',
  financas:'Entender finanças e formação de preço',
  simular:'Treinar decisões como gestor/CEO'
 };
 function read(){
  try{return JSON.parse(localStorage.getItem(key)||'{}')}catch(e){return {}}
 }
 const anchor=document.getElementById('progressCenter')||document.getElementById('jornada');
 if(!anchor)return;
 const section=document.createElement('section');
 section.id='perfil-usuario';
 section.className='section';
 section.innerHTML=`
  <div class="section-head">
   <span class="eyebrow">MEU PERFIL</span>
   <h2>Seu perfil no StoryPlay</h2>
   <p>Confira as escolhas usadas para personalizar sua jornada de aprendizagem.</p>
  </div>
  <div class="progress-center-grid">
   <article class="progress-panel"><span class="progress-kicker">Nome</span><strong id="profileViewName">Não informado</strong><small>Como você quer ser chamado</small></article>
   <article class="progress-panel"><span class="progress-kicker">Perfil</span><strong id="profileViewType">Não definido</strong><small>Seu momento atual</small></article>
   <article class="progress-panel"><span class="progress-kicker">Objetivo</span><strong id="profileViewGoal">Não definido</strong><small>Prioridade da sua jornada</small></article>
   <article class="progress-panel"><span class="progress-kicker">Status</span><strong id="profileViewStatus">Em configuração</strong><small>Personalização do StoryPlay</small></article>
  </div>
  <div class="actions"><button type="button" class="btn primary" id="editProfileBtn">Editar meu perfil</button></div>`;
 anchor.insertAdjacentElement('afterend',section);
 function render(){
  const data=read();
  document.getElementById('profileViewName').textContent=data.name||'Não informado';
  document.getElementById('profileViewType').textContent=profileNames[data.profile]||'Não definido';
  document.getElementById('profileViewGoal').textContent=goalNames[data.goal]||'Não definido';
  document.getElementById('profileViewStatus').textContent=data.completed?'Perfil configurado':'Em configuração';
 }
 function bindMenu(){
  const old=document.querySelector('#mainNav [data-open-onboarding]');
  if(!old)return;
  const fresh=old.cloneNode(true);
  fresh.removeAttribute('data-open-onboarding');
  fresh.href='#perfil-usuario';
  fresh.addEventListener('click',()=>api.closeMenu?.());
  old.replaceWith(fresh);
 }
 document.getElementById('editProfileBtn').addEventListener('click',()=>{
  const modal=document.getElementById('onboardingModal');
  if(modal){
   modal.classList.add('show');
   document.body.classList.add('onboarding-open');
  }
 });
 render();
 bindMenu();
 window.addEventListener('storage',e=>{if(e.key===key)render()});
 window.addEventListener('storyplay:profilechange',render);
 document.getElementById('startJourney')?.addEventListener('click',()=>setTimeout(render,0));
 setTimeout(bindMenu,0);
})();
