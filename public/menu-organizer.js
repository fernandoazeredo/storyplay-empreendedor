(()=>{
 const nav=document.getElementById('mainNav');
 if(!nav||nav.dataset.organizerReady==='true')return;
 nav.style.visibility='hidden';

 const normalize=s=>(s||'').trim().toLocaleLowerCase('pt-BR');
 const formalizationItem={sources:[],label:''};
 const HELP_STYLE_ID='storyplay-menu-help-style';
 const HOWTO_MODAL_ID='storyplayHowToUse';
 const FORMALIZATION_LABEL='Jornada de Formalização';

 const howToSteps=[
  {title:'1. Abra o menu e escolha por onde começar',text:'Use o menu principal para acessar Início e Aprendizado, Gestão do Negócio, Desempenho e Conta e Educação. No celular e tablet, toque no menu hambúrguer. No desktop, use o mesmo conjunto de opções no cabeçalho.',href:'#inicio',link:'Ir para o início'},
  {title:'2. Entre na sua conta e confira o acesso',text:'Em Conta e Planos, entre com Google ou e-mail e senha. Depois de entrar, use Minha conta para conferir seu acesso. Criar a conta não libera automaticamente recursos Premium; a liberação depende do plano contratado ou do acesso concedido.',href:'#conta-nuvem',link:'Ir para Conta e Planos'},
  {title:'3. Veja a Visão Geral antes de começar',text:'Em Início e Aprendizado > Visão Geral, conheça a proposta do StoryPlay e veja uma apresentação da experiência. Essa área mostra o que o aplicativo oferece; ela não é a trilha prática de formalização.',href:'#jornada',link:'Ir para Visão Geral'},
  {title:'4. Siga a Jornada de Formalização',text:'Abra Início e Aprendizado > Jornada de Formalização. Essa é a trilha prática de 19 fases, organizada em 2 capítulos. Leia a missão de cada fase, marque os checklists que já concluiu e use Anterior e Próxima para navegar.',href:'#formalizacao',link:'Ir para Jornada de Formalização'},
  {title:'5. Acompanhe XP, progresso e conclusão das fases',text:'Ao concluir todos os itens de uma fase, ela recebe o status Fase concluída e libera a recompensa de XP indicada. A Jornada de Formalização completa soma 275 XP. Os checklists dessa jornada são salvos neste navegador; ao atualizar a página, o progresso permanece no mesmo navegador enquanto esses dados locais não forem apagados.',href:'#formalizacao',link:'Ver progresso da formalização'},
  {title:'6. Use os laboratórios e simuladores quando a fase indicar',text:'Algumas fases levam a ferramentas do próprio StoryPlay. Por exemplo, o Laboratório Tributário ajuda a estudar MEI, Simples Nacional, Lucro Presumido e Lucro Real. Use os resultados para aprendizado e comparação; decisões reais devem ser confirmadas com contador, advogado ou órgão competente quando necessário.',href:'#melhor-regime-tributario',link:'Ir para Laboratório Tributário'},
  {title:'7. Monte e acompanhe sua Empresa Virtual',text:'Em Gestão do Negócio > Minha Empresa (Visão Geral), crie ou consulte sua empresa virtual. Essa simulação é independente da Jornada de Formalização: capital, faturamento, clientes, caixa e conquistas pertencem à Empresa Virtual e podem ser diferentes do XP e dos checklists da formalização.',href:'#empresa',link:'Ir para Minha Empresa'},
  {title:'8. Estude cada área da gestão',text:'Dentro de Gestão do Negócio, acesse Administração, Finanças, Logística, Marketing e Vendas e Pessoas. Use cada área para praticar conceitos, analisar situações e entender como decisões de uma área afetam as outras.',href:'#trilhas',link:'Ir para áreas de gestão'},
  {title:'9. Consulte Melhor Regime? quando precisar estudar tributação',text:'Abra Melhor Regime? para informar os dados solicitados e comparar caminhos tributários de forma educacional. Leia o resultado e os alertas antes de interpretar a recomendação. O simulador não faz opção tributária real e não substitui análise profissional.',href:'#melhor-regime-tributario',link:'Ir para Melhor Regime?'},
  {title:'10. Confira seu desempenho',text:'Em Desempenho, abra Meu Progresso para acompanhar sua evolução e Ranking CEO para consultar sua posição quando esse recurso estiver disponível para seu acesso. Use esses indicadores para identificar o que já concluiu e o que ainda falta explorar.',href:'#progresso',link:'Ir para Meu Progresso'},
  {title:'11. Use a Área do Educador quando aplicável',text:'Em Conta e Educação > Área do Educador, acesse os recursos destinados a escolas, professores, turmas e projetos educacionais. O acesso institucional é separado do uso individual e pode depender de liberação específica.',href:'#area-educador',link:'Ir para Área do Educador'},
  {title:'12. Alterne entre modo claro e escuro',text:'Use o controle de tema no cabeçalho ou menu para alternar entre modo claro e escuro. Escolha o modo mais confortável para leitura; o aplicativo mantém o mesmo padrão de navegação nos dois temas.',action:'theme',link:'Alternar tema agora'},
  {title:'13. Use Dicas quando quiser uma orientação rápida',text:'No final do menu existe Dicas. Abra essa opção para iniciar o tour guiado atualizado, que também diferencia Visão Geral, Jornada de Formalização e Empresa Virtual.',action:'tips',link:'Abrir Dicas agora'},
  {title:'14. No celular e tablet, use exatamente o mesmo fluxo',text:'Abra o menu hambúrguer, escolha a área e continue normalmente. Os cards ficam em coluna única, os textos se adaptam à largura da tela e os botões de navegação permanecem acessíveis. Dicas e Como Usar ficam no final do menu em todos os tamanhos de tela.',href:'#inicio',link:'Voltar ao início'}
 ];

 const structure=[
  {label:'Início e Aprendizado',items:[
   {sources:['Home'],label:'Home'},
   {sources:['Jornada','Como funciona','Visão Geral'],label:'Visão Geral'},
   formalizationItem,
   {sources:['StoryPlay','Trilhas','Aprender'],label:'Aprender'}
  ]},
  {label:'Gestão do Negócio',items:[
   {sources:['Empresa Virtual','Minha Empresa','Minha Empresa (Visão Geral)'],label:'Minha Empresa (Visão Geral)'},
   {sources:['Administração'],label:'Administração'},
   {sources:['Finanças'],label:'Finanças'},
   {sources:['Logística'],label:'Logística'},
   {sources:['Marketing e Vendas'],label:'Marketing e Vendas'},
   {sources:['Pessoas'],label:'Pessoas'},
   {sources:['Melhor Regime?'],label:'Melhor Regime?'}
  ]},
  {label:'Desempenho',items:[
   {sources:['Progresso','Meu Progresso'],label:'Meu Progresso'},
   {sources:['Ranking CEO'],label:'Ranking CEO'}
  ]},
  {label:'Conta e Educação',items:[
   {sources:['Planos','Conta e Planos','Conta'],label:'Conta e Planos'},
   {sources:['Educador','Área do Educador'],label:'Área do Educador'}
  ]}
 ];

 let organizing=false;
 let scheduled=false;
 let initialBuild=true;
 let observer=null;
 let formalizationDataRequested=false;
 let formalizationUiRequested=false;

 function ensureHelpStyle(){
  if(document.getElementById(HELP_STYLE_ID))return;
  const style=document.createElement('style');
  style.id=HELP_STYLE_ID;
  style.textContent=`
   #storyplayTipsButton{display:none!important}
   .nav-help-actions{display:flex;align-items:center;gap:8px;margin-left:8px;padding-left:12px;border-left:1px solid var(--line)}
   .nav .nav-help-action{display:flex;align-items:center;justify-content:flex-start;gap:7px;border:0;background:transparent;color:var(--text);font:inherit;font-weight:900;white-space:nowrap;cursor:pointer;padding:8px 7px;border-radius:10px}
   .nav .nav-help-action:hover,.nav .nav-help-action:focus-visible{color:var(--orange);background:color-mix(in srgb,var(--surface) 88%,var(--orange) 12%)}
   .storyplay-howto{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:20px}
   .storyplay-howto[hidden]{display:none!important}
   .storyplay-howto-backdrop{position:absolute;inset:0;background:rgba(3,17,31,.66);backdrop-filter:blur(3px)}
   .storyplay-howto-card{position:relative;width:min(860px,100%);max-height:88vh;overflow:auto;background:var(--surface);color:var(--text);border:1px solid var(--line);border-radius:26px;box-shadow:0 28px 80px rgba(0,0,0,.35);padding:30px}
   .storyplay-howto-close{position:sticky;top:0;float:right;width:42px;height:42px;border:1px solid var(--line);border-radius:12px;background:var(--surface);color:var(--text);font-size:1.4rem;cursor:pointer;z-index:2}
   .storyplay-howto-eyebrow{display:inline-flex;margin-bottom:8px;padding:7px 11px;border-radius:999px;background:rgba(0,184,217,.12);color:var(--blue);font-size:.76rem;font-weight:900;letter-spacing:.08em}
   .storyplay-howto-card h2{margin:8px 52px 8px 0;font-size:clamp(1.8rem,4vw,2.7rem)}
   .storyplay-howto-intro{margin:0 0 22px;color:var(--muted);line-height:1.65}
   .storyplay-howto-list{display:grid;gap:12px;margin:0;padding:0;list-style:none;clear:both}
   .storyplay-howto-step{padding:17px 18px;border:1px solid var(--line);border-radius:18px;background:color-mix(in srgb,var(--surface) 96%,var(--blue) 4%)}
   .storyplay-howto-step h3{margin:0 0 7px;font-size:1.02rem;color:var(--blue)}
   .storyplay-howto-step p{margin:0;color:var(--muted);line-height:1.6}
   .storyplay-howto-link{display:inline-flex;align-items:center;gap:7px;margin-top:12px;border:1px solid color-mix(in srgb,var(--blue) 42%,var(--line));border-radius:12px;background:color-mix(in srgb,var(--surface) 90%,var(--blue) 10%);color:var(--blue);font:inherit;font-weight:900;padding:9px 12px;cursor:pointer;text-decoration:none}
   .storyplay-howto-link:hover,.storyplay-howto-link:focus-visible{background:color-mix(in srgb,var(--surface) 78%,var(--cyan) 22%)}
   .storyplay-howto-footer{display:flex;justify-content:flex-end;margin-top:20px}
   .storyplay-howto-done{border:0;border-radius:14px;background:linear-gradient(135deg,var(--blue),var(--cyan));color:#fff;font:inherit;font-weight:900;padding:12px 18px;cursor:pointer}
   body.storyplay-howto-open{overflow:hidden}
   @media(max-width:980px){
    .nav-help-actions{width:100%;flex-direction:column;align-items:stretch;gap:2px;margin:8px 0 0;padding:10px 0 0;border-left:0;border-top:1px solid var(--line)}
    .nav .nav-help-action{width:100%;padding:10px 8px;text-align:left}
   }
   @media(max-width:620px){
    .storyplay-howto{padding:10px}
    .storyplay-howto-card{max-height:92vh;border-radius:20px;padding:20px}
    .storyplay-howto-card h2{font-size:1.7rem}
    .storyplay-howto-step{padding:15px}
    .storyplay-howto-link{width:100%;justify-content:center}
   }
  `;
  document.head.appendChild(style);
 }

 function closeHowTo(){
  const modal=document.getElementById(HOWTO_MODAL_ID);
  if(!modal)return;
  modal.hidden=true;
  document.body.classList.remove('storyplay-howto-open');
 }

 function goToTarget(href){
  if(!/^#[A-Za-z][\w:-]*$/.test(href||''))return;
  const target=document.querySelector(href);
  closeHowTo();
  closeAllGroups();
  window.storyplayAPI?.closeMenu?.();
  if(!target){location.hash=href;return}
  try{target.scrollIntoView({behavior:'smooth',block:'start'})}catch(e){target.scrollIntoView()}
  if(location.hash!==href)history.pushState(null,'',href);
 }

 function runHowToAction(step){
  if(step.action==='tips'){
   closeHowTo();
   window.storyplayTour?.open?.();
   return;
  }
  if(step.action==='theme'){
   const toggle=document.getElementById('themeToggle')||document.querySelector('.theme-toggle');
   toggle?.click();
   return;
  }
  if(step.href)goToTarget(step.href);
 }

 function ensureHowToModal(){
  let modal=document.getElementById(HOWTO_MODAL_ID);
  if(modal)return modal;
  modal=document.createElement('div');
  modal.id=HOWTO_MODAL_ID;
  modal.className='storyplay-howto';
  modal.hidden=true;
  const stepsHtml=howToSteps.map((step,index)=>`<li class="storyplay-howto-step"><h3>${step.title}</h3><p>${step.text}</p>${step.link?`<button class="storyplay-howto-link" type="button" data-howto-step="${index}">${step.link} <span aria-hidden="true">→</span></button>`:''}</li>`).join('');
  modal.innerHTML=`
   <div class="storyplay-howto-backdrop" data-howto-close></div>
   <section class="storyplay-howto-card" role="dialog" aria-modal="true" aria-labelledby="storyplayHowToTitle">
    <button class="storyplay-howto-close" type="button" data-howto-close aria-label="Fechar Como Usar">×</button>
    <span class="storyplay-howto-eyebrow">GUIA COMPLETO</span>
    <h2 id="storyplayHowToTitle">Como usar o StoryPlay Empreendedor</h2>
    <p class="storyplay-howto-intro">Siga este passo a passo para aproveitar o aplicativo. Use os botões “Ir para...” para abrir diretamente a área que você procura.</p>
    <ol class="storyplay-howto-list">${stepsHtml}</ol>
    <div class="storyplay-howto-footer"><button class="storyplay-howto-done" type="button" data-howto-close>Entendi</button></div>
   </section>`;
  document.body.appendChild(modal);
  modal.addEventListener('click',event=>{
   if(event.target.closest('[data-howto-close]')){closeHowTo();return}
   const button=event.target.closest('[data-howto-step]');
   if(!button)return;
   const step=howToSteps[Number(button.dataset.howtoStep)];
   if(step)runHowToAction(step);
  });
  return modal;
 }

 function openHowTo(){
  const modal=ensureHowToModal();
  modal.hidden=false;
  document.body.classList.add('storyplay-howto-open');
  setTimeout(()=>modal.querySelector('.storyplay-howto-close')?.focus(),30);
 }

 function makeHelpButton(type){
  const btn=document.createElement('button');
  btn.type='button';
  btn.className='nav-help-action';
  if(type==='tips'){
   btn.innerHTML='<span aria-hidden="true">💡</span><span>Dicas</span>';
   btn.setAttribute('aria-label','Abrir dicas e tour guiado do StoryPlay');
   btn.addEventListener('click',()=>{
    closeAllGroups();
    window.storyplayAPI?.closeMenu?.();
    window.storyplayTour?.open?.();
   });
  }else{
   btn.innerHTML='<span aria-hidden="true">📘</span><span>Como Usar</span>';
   btn.setAttribute('aria-label','Abrir guia completo de como usar o StoryPlay');
   btn.addEventListener('click',()=>{
    closeAllGroups();
    window.storyplayAPI?.closeMenu?.();
    openHowTo();
   });
  }
  return btn;
 }

 function makeHelpActions(){
  const wrapper=document.createElement('div');
  wrapper.className='nav-help-actions';
  wrapper.setAttribute('aria-label','Ajuda');
  wrapper.append(makeHelpButton('tips'),makeHelpButton('howto'));
  return wrapper;
 }

 function requestFormalizationData(){
  if(window.STORYPLAY_FORMALIZATION_JOURNEY||formalizationDataRequested)return;
  formalizationDataRequested=true;
  const script=document.createElement('script');
  script.src='/formalization-journey-data.js';
  script.async=false;
  script.onload=()=>organize();
  script.onerror=()=>{formalizationDataRequested=false};
  document.head.appendChild(script);
 }

 function loadFormalizationIndexScript(){
  if(document.querySelector('script[src="/formalization-journey-index.js"]'))return;
  const script=document.createElement('script');
  script.src='/formalization-journey-index.js';
  script.async=false;
  script.onerror=()=>{formalizationUiRequested=false};
  document.body.appendChild(script);
 }

 function loadFormalizationLegalDisclaimer(){
  if(window.STORYPLAY_FORMALIZATION_LEGAL_DISCLAIMER){loadFormalizationIndexScript();return}
  const existing=document.querySelector('script[src="/formalization-legal-disclaimer.js"]');
  if(existing){existing.addEventListener('load',loadFormalizationIndexScript,{once:true});return}
  const component=document.createElement('script');
  component.src='/formalization-legal-disclaimer.js';
  component.async=false;
  component.onload=loadFormalizationIndexScript;
  component.onerror=()=>{formalizationUiRequested=false};
  document.body.appendChild(component);
 }

 function loadFormalizationLocalAlert(){
  if(window.STORYPLAY_FORMALIZATION_LOCAL_ALERT){loadFormalizationLegalDisclaimer();return}
  const existing=document.querySelector('script[src="/formalization-local-alert.js"]');
  if(existing){existing.addEventListener('load',loadFormalizationLegalDisclaimer,{once:true});return}
  const component=document.createElement('script');
  component.src='/formalization-local-alert.js';
  component.async=false;
  component.onload=loadFormalizationLegalDisclaimer;
  component.onerror=()=>{formalizationUiRequested=false};
  document.body.appendChild(component);
 }

 function requestFormalizationUi(){
  if(formalizationUiRequested)return;
  formalizationUiRequested=true;
  if(!document.querySelector('link[href="/formalization-journey-index.css"]')){
   const link=document.createElement('link');link.rel='stylesheet';link.href='/formalization-journey-index.css';document.head.appendChild(link);
  }
  loadFormalizationLocalAlert();
 }

 function syncFormalizationItem(anchors){
  const journey=window.STORYPLAY_FORMALIZATION_JOURNEY;
  if(!journey?.menu){requestFormalizationData();return}
  requestFormalizationUi();
  const originalLabel=journey.menu.replace(/^📋\s*/,'');
  formalizationItem.sources=[journey.menu,originalLabel,FORMALIZATION_LABEL];
  formalizationItem.label=FORMALIZATION_LABEL;
  let anchor=anchors.find(a=>a.dataset.formalizationJourneyEntry==='true'||a.getAttribute('href')==='#formalizacao');
  if(!anchor){anchor=document.createElement('a');anchor.href='#formalizacao';anchor.dataset.formalizationJourneyEntry='true';anchors.push(anchor)}else anchor.href='#formalizacao';
  anchor.dataset.formalizationJourneyEntry='true';
  anchor.textContent=FORMALIZATION_LABEL;
 }

 function setExpanded(details){details.querySelector(':scope > summary')?.setAttribute('aria-expanded',details.open?'true':'false')}
 function closeAllGroups(except){nav.querySelectorAll('details.nav-group[open]').forEach(d=>{if(d===except)return;d.removeAttribute('open');setExpanded(d)})}
 function findAnchor(anchors,sources){for(const source of sources){const key=normalize(source);const found=anchors.find(a=>normalize(a.textContent)===key);if(found)return found}return null}

 function makeGroup(def,anchors){
  const details=document.createElement('details');details.className='nav-group';
  const summary=document.createElement('summary');summary.textContent=def.label;summary.setAttribute('aria-label',`Abrir submenu ${def.label}`);summary.setAttribute('aria-expanded','false');
  const submenu=document.createElement('div');submenu.className='nav-submenu';submenu.setAttribute('role','group');submenu.setAttribute('aria-label',`Opções de ${def.label}`);
  def.items.forEach(item=>{if(!item.sources.length)return;const a=findAnchor(anchors,item.sources);if(!a)return;a.textContent=item.label;submenu.appendChild(a)});
  details.append(summary,submenu);
  details.addEventListener('toggle',()=>{setExpanded(details);summary.setAttribute('aria-label',`${details.open?'Fechar':'Abrir'} submenu ${def.label}`);if(details.open)closeAllGroups(details)});
  return submenu.children.length?details:null;
 }

 function organize(){
  scheduled=false;if(organizing)return;organizing=true;observer?.disconnect();
  try{
   ensureHelpStyle();ensureHowToModal();
   const anchors=[...nav.querySelectorAll('a[href^="#"]')];syncFormalizationItem(anchors);
   const fragment=document.createDocumentFragment();
   structure.forEach(def=>{const group=makeGroup(def,anchors);if(group)fragment.appendChild(group)});
   fragment.appendChild(makeHelpActions());nav.replaceChildren(fragment);
   nav.querySelectorAll('.nav-submenu a').forEach(a=>{if(a.dataset.accordionCloseBound==='true')return;a.dataset.accordionCloseBound='true';a.addEventListener('click',()=>{closeAllGroups();window.storyplayAPI?.closeMenu?.()})});
   nav.dataset.organizerReady='true';if(initialBuild){initialBuild=false;nav.style.visibility=''}
  }finally{organizing=false;observer?.observe(nav,{childList:true,subtree:false})}
 }

 function schedule(records){
  if(scheduled||organizing)return;
  if(records&&records.length){const hasNewDirectChild=records.some(record=>[...record.addedNodes].some(node=>node.nodeType===1));if(!hasNewDirectChild)return}
  scheduled=true;queueMicrotask(organize);
 }

 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&!document.getElementById(HOWTO_MODAL_ID)?.hidden){closeHowTo();return}
  if(event.key!=='Escape')return;
  const opened=[...nav.querySelectorAll('details.nav-group[open]')];if(!opened.length)return;
  const focusTarget=opened[0].querySelector(':scope > summary');closeAllGroups();focusTarget?.focus();
 });

 observer=new MutationObserver(schedule);organize();observer.observe(nav,{childList:true,subtree:false});
})();