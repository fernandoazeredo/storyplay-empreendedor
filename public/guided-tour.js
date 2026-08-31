(()=>{
  const KEY='storyplay-guided-tour-hidden-v1';
  const steps=[
    {icon:'🧭',title:'Explorador — Grátis',text:'Você pode começar sem pagar. O plano Explorador dá acesso ao conteúdo gratuito e às atividades introdutórias do StoryPlay.',target:'#inicio'},
    {icon:'🚀',title:'Empreendedor — Premium',text:'O plano Empreendedor libera trilhas, laboratórios, desafios e recursos avançados enquanto o acesso estiver ativo.',target:'#planos'},
    {icon:'💳',title:'Como assinar',text:'Escolha o plano mensal ou anual, faça o pagamento pela Ton e depois use o botão verde do WhatsApp para enviar o comprovante e solicitar a liberação.',target:'#planos'},
    {icon:'🏆',title:'Quiz e recompensas',text:'Nos Quiz, suas decisões rendem XP e feedback. As melhores respostas recebem medalhas e carinhas felizes; os erros mostram uma carinha triste e explicam o aprendizado.',target:'#episodio1'},
    {icon:'🔐',title:'Conta e acesso',text:'Entre com Google ou e-mail e senha. Criar a conta não libera o Premium automaticamente: a liberação é feita para o e-mail cadastrado e permanece válida pelo período do plano.',target:'#conta-nuvem'},
    {icon:'👤',title:'Minha conta',text:'Depois de entrar, use Minha conta no cabeçalho para consultar seu acesso. Contas administrativas são reconhecidas automaticamente pelo login, sem precisar de link no rodapé.',target:'#conta-nuvem'},
    {icon:'🏫',title:'Escolas & Turmas',text:'O acesso institucional é separado e funciona sob consulta para escolas, professores, turmas e projetos educacionais.',target:'#area-educador'}
  ];
  let index=0;

  function cleanFooter(){
    const footer=document.querySelector('footer');
    if(!footer)return;
    footer.querySelector('.storyplay-admin-entry')?.remove();
    footer.dataset.footerExact='1';
    const wanted=['StoryPlay Empreendedor','Abra Sua Empresa','Aprenda fazendo'];
    const current=[...footer.querySelectorAll('.storyplay-footer-item')].map(el=>el.textContent.trim());
    const exact=current.length===wanted.length&&wanted.every((text,i)=>current[i]===text)&&footer.querySelectorAll('.storyplay-footer-separator').length===2;
    if(exact)return;
    footer.innerHTML='';
    const makeText=text=>{const span=document.createElement('span');span.className='storyplay-footer-item';span.textContent=text;return span};
    const makeSep=()=>{const span=document.createElement('span');span.className='storyplay-footer-separator';span.textContent='-';span.setAttribute('aria-hidden','true');return span};
    footer.append(makeText(wanted[0]),makeSep(),makeText(wanted[1]),makeSep(),makeText(wanted[2]));
  }

  function ensureButton(){
    if(document.getElementById('storyplayTipsButton'))return;
    const btn=document.createElement('button');
    btn.id='storyplayTipsButton';
    btn.type='button';
    btn.className='storyplay-tips-button';
    btn.innerHTML='<span aria-hidden="true">💡</span><span>Dicas</span>';
    btn.setAttribute('aria-label','Abrir dicas e tour guiado do StoryPlay');
    btn.addEventListener('click',()=>openTour(0));
    document.body.appendChild(btn);
  }

  function ensureModal(){
    if(document.getElementById('storyplayGuidedTour'))return;
    const modal=document.createElement('div');
    modal.id='storyplayGuidedTour';
    modal.className='storyplay-tour';
    modal.hidden=true;
    modal.innerHTML=`
      <div class="storyplay-tour-backdrop" data-tour-close></div>
      <section class="storyplay-tour-card" role="dialog" aria-modal="true" aria-labelledby="storyplayTourTitle">
        <button class="storyplay-tour-close" type="button" data-tour-close aria-label="Fechar tour">×</button>
        <div class="storyplay-tour-progress" aria-hidden="true"><span id="storyplayTourProgress"></span></div>
        <div class="storyplay-tour-counter" id="storyplayTourCounter"></div>
        <div class="storyplay-tour-icon" id="storyplayTourIcon" aria-hidden="true"></div>
        <h2 id="storyplayTourTitle"></h2>
        <p id="storyplayTourText"></p>
        <label class="storyplay-tour-hide"><input id="storyplayTourDontShow" type="checkbox"> Não mostrar novamente</label>
        <div class="storyplay-tour-actions">
          <button class="btn secondary" id="storyplayTourPrev" type="button">Voltar</button>
          <button class="btn primary" id="storyplayTourNext" type="button">Próximo</button>
        </div>
      </section>`;
    document.body.appendChild(modal);
    modal.addEventListener('click',e=>{if(e.target.closest('[data-tour-close]'))closeTour()});
    document.getElementById('storyplayTourPrev')?.addEventListener('click',()=>{if(index>0){index--;render()}});
    document.getElementById('storyplayTourNext')?.addEventListener('click',()=>{if(index<steps.length-1){index++;render()}else closeTour(true)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeTour()});
  }

  function scrollToTarget(selector){
    const el=document.querySelector(selector);
    if(!el)return;
    try{el.scrollIntoView({behavior:'smooth',block:'center'})}catch(e){el.scrollIntoView()}
  }

  function render(){
    const step=steps[index];
    document.getElementById('storyplayTourIcon').textContent=step.icon;
    document.getElementById('storyplayTourTitle').textContent=step.title;
    document.getElementById('storyplayTourText').textContent=step.text;
    document.getElementById('storyplayTourCounter').textContent=`Dica ${index+1} de ${steps.length}`;
    document.getElementById('storyplayTourProgress').style.width=`${((index+1)/steps.length)*100}%`;
    const prev=document.getElementById('storyplayTourPrev');if(prev)prev.disabled=index===0;
    const next=document.getElementById('storyplayTourNext');if(next)next.textContent=index===steps.length-1?'Concluir':'Próximo';
    scrollToTarget(step.target);
  }

  function closeOnboardingIfOpen(){
    const onboarding=document.getElementById('onboardingModal');
    if(!onboarding)return;
    if(onboarding.classList.contains('show'))onboarding.classList.remove('show');
    document.body.classList.remove('onboarding-open');
  }

  function openTour(start=0){
    closeOnboardingIfOpen();
    ensureModal();
    index=Math.max(0,Math.min(steps.length-1,start));
    const modal=document.getElementById('storyplayGuidedTour');
    modal.hidden=false;
    document.body.classList.add('storyplay-tour-open');
    render();
    setTimeout(()=>document.getElementById('storyplayTourNext')?.focus(),50);
  }

  function closeTour(finished=false){
    const modal=document.getElementById('storyplayGuidedTour');if(!modal)return;
    const dontShow=document.getElementById('storyplayTourDontShow')?.checked;
    if(dontShow||finished&&dontShow)localStorage.setItem(KEY,'1');
    modal.hidden=true;
    document.body.classList.remove('storyplay-tour-open');
  }

  cleanFooter();
  setTimeout(cleanFooter,300);
  setTimeout(cleanFooter,1200);
  ensureButton();
  ensureModal();
  if(localStorage.getItem(KEY)!=='1')setTimeout(()=>openTour(0),1400);
  window.storyplayTour={open:()=>openTour(0)};
})();
