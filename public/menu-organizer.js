(()=>{
 const nav=document.getElementById('mainNav');
 if(!nav||nav.dataset.organizerReady==='true')return;

 // Esconde somente a montagem inicial para evitar o flash do menu antigo.
 nav.style.visibility='hidden';

 const normalize=s=>(s||'').trim().toLocaleLowerCase('pt-BR');
 const formalizationItem={sources:[],label:''};
 const TIPS_STYLE_ID='storyplay-menu-tips-style';
 const structure=[
  {
   label:'Início e Aprendizado',
   items:[
    {sources:['Home'],label:'Home'},
    {sources:['Jornada'],label:'Jornada'},
    formalizationItem,
    {sources:['StoryPlay','Trilhas','Aprender'],label:'Aprender'}
   ]
  },
  {
   label:'Gestão do Negócio',
   items:[
    {sources:['Empresa Virtual','Minha Empresa','Minha Empresa (Visão Geral)'],label:'Minha Empresa (Visão Geral)'},
    {sources:['Administração'],label:'Administração'},
    {sources:['Finanças'],label:'Finanças'},
    {sources:['Logística'],label:'Logística'},
    {sources:['Marketing e Vendas'],label:'Marketing e Vendas'},
    {sources:['Pessoas'],label:'Pessoas'},
    {sources:['Melhor Regime?'],label:'Melhor Regime?'}
   ]
  },
  {
   label:'Desempenho',
   items:[
    {sources:['Progresso','Meu Progresso'],label:'Meu Progresso'},
    {sources:['Ranking CEO'],label:'Ranking CEO'}
   ]
  },
  {
   label:'Conta e Educação',
   items:[
    {sources:['Planos','Conta e Planos','Conta'],label:'Conta e Planos'},
    {sources:['Educador','Área do Educador'],label:'Área do Educador'}
   ]
  }
 ];

 let organizing=false;
 let scheduled=false;
 let initialBuild=true;
 let observer=null;
 let formalizationDataRequested=false;
 let formalizationUiRequested=false;

 function ensureTipsMenuStyle(){
  if(document.getElementById(TIPS_STYLE_ID))return;
  const style=document.createElement('style');
  style.id=TIPS_STYLE_ID;
  style.textContent=`
   .nav-tips-menu-action{display:none}
   @media(max-width:980px){
    #storyplayTipsButton{display:none!important}
    .nav .nav-tips-menu-action{
     display:flex;
     align-items:center;
     gap:9px;
     width:100%;
     margin-top:8px;
     padding:16px 8px 8px;
     border:0;
     border-top:1px solid var(--line);
     border-radius:0;
     background:transparent;
     color:var(--text);
     font:inherit;
     font-weight:900;
     text-align:left;
     cursor:pointer;
    }
    .nav .nav-tips-menu-action:hover,.nav .nav-tips-menu-action:focus-visible{color:var(--orange)}
   }
  `;
  document.head.appendChild(style);
 }

 function makeTipsMenuButton(){
  const btn=document.createElement('button');
  btn.type='button';
  btn.className='nav-tips-menu-action';
  btn.innerHTML='<span aria-hidden="true">💡</span><span>Dicas</span>';
  btn.setAttribute('aria-label','Abrir dicas e tour guiado do StoryPlay');
  btn.addEventListener('click',()=>{
   closeAllGroups();
   window.storyplayAPI?.closeMenu?.();
   window.storyplayTour?.open?.();
  });
  return btn;
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
  if(window.STORYPLAY_FORMALIZATION_LEGAL_DISCLAIMER){
   loadFormalizationIndexScript();
   return;
  }
  const existing=document.querySelector('script[src="/formalization-legal-disclaimer.js"]');
  if(existing){
   existing.addEventListener('load',loadFormalizationIndexScript,{once:true});
   return;
  }
  const component=document.createElement('script');
  component.src='/formalization-legal-disclaimer.js';
  component.async=false;
  component.onload=loadFormalizationIndexScript;
  component.onerror=()=>{formalizationUiRequested=false};
  document.body.appendChild(component);
 }

 function loadFormalizationLocalAlert(){
  if(window.STORYPLAY_FORMALIZATION_LOCAL_ALERT){
   loadFormalizationLegalDisclaimer();
   return;
  }
  const existing=document.querySelector('script[src="/formalization-local-alert.js"]');
  if(existing){
   existing.addEventListener('load',loadFormalizationLegalDisclaimer,{once:true});
   return;
  }
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
   const link=document.createElement('link');
   link.rel='stylesheet';
   link.href='/formalization-journey-index.css';
   document.head.appendChild(link);
  }
  loadFormalizationLocalAlert();
 }

 function syncFormalizationItem(anchors){
  const journey=window.STORYPLAY_FORMALIZATION_JOURNEY;
  if(!journey?.menu){requestFormalizationData();return}
  requestFormalizationUi();
  const menuLabel=journey.menu.replace(/^📋\s*/,'');
  formalizationItem.sources=[journey.menu,menuLabel];
  formalizationItem.label=menuLabel;
  let anchor=anchors.find(a=>a.dataset.formalizationJourneyEntry==='true');
  if(!anchor){
   anchor=document.createElement('a');
   anchor.href='#formalizacao';
   anchor.dataset.formalizationJourneyEntry='true';
   anchors.push(anchor);
  }else{
   anchor.href='#formalizacao';
  }
  anchor.textContent=menuLabel;
 }

 function setExpanded(details){
  details.querySelector(':scope > summary')?.setAttribute('aria-expanded',details.open?'true':'false');
 }

 function closeAllGroups(except){
  nav.querySelectorAll('details.nav-group[open]').forEach(d=>{
   if(d===except)return;
   d.removeAttribute('open');
   setExpanded(d);
  });
 }

 function findAnchor(anchors,sources){
  for(const source of sources){
   const key=normalize(source);
   const found=anchors.find(a=>normalize(a.textContent)===key);
   if(found)return found;
  }
  return null;
 }

 function makeGroup(def,anchors){
  const details=document.createElement('details');
  details.className='nav-group';
  const summary=document.createElement('summary');
  summary.textContent=def.label;
  summary.setAttribute('aria-label',`Abrir submenu ${def.label}`);
  summary.setAttribute('aria-expanded','false');
  const submenu=document.createElement('div');
  submenu.className='nav-submenu';
  submenu.setAttribute('role','group');
  submenu.setAttribute('aria-label',`Opções de ${def.label}`);

  def.items.forEach(item=>{
   if(!item.sources.length)return;
   const a=findAnchor(anchors,item.sources);
   if(!a)return;
   a.textContent=item.label;
   submenu.appendChild(a);
  });

  details.append(summary,submenu);
  details.addEventListener('toggle',()=>{
   setExpanded(details);
   summary.setAttribute('aria-label',`${details.open?'Fechar':'Abrir'} submenu ${def.label}`);
   if(details.open)closeAllGroups(details);
  });
  return submenu.children.length?details:null;
 }

 function organize(){
  scheduled=false;
  if(organizing)return;
  organizing=true;
  observer?.disconnect();

  try{
   ensureTipsMenuStyle();
   const anchors=[...nav.querySelectorAll('a[href^="#"]')];
   syncFormalizationItem(anchors);
   const fragment=document.createDocumentFragment();

   structure.forEach(def=>{
    const group=makeGroup(def,anchors);
    if(group)fragment.appendChild(group);
   });
   fragment.appendChild(makeTipsMenuButton());

   nav.replaceChildren(fragment);

   nav.querySelectorAll('.nav-submenu a').forEach(a=>{
    if(a.dataset.accordionCloseBound==='true')return;
    a.dataset.accordionCloseBound='true';
    a.addEventListener('click',()=>{
     closeAllGroups();
     window.storyplayAPI?.closeMenu?.();
    });
   });

   nav.dataset.organizerReady='true';
   if(initialBuild){
    initialBuild=false;
    nav.style.visibility='';
   }
  }finally{
   organizing=false;
   observer?.observe(nav,{childList:true,subtree:false});
  }
 }

 function schedule(records){
  if(scheduled||organizing)return;
  if(records&&records.length){
   const hasNewDirectChild=records.some(record=>
    [...record.addedNodes].some(node=>node.nodeType===1)
   );
   if(!hasNewDirectChild)return;
  }
  scheduled=true;
  queueMicrotask(organize);
 }

 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const opened=[...nav.querySelectorAll('details.nav-group[open]')];
  if(!opened.length)return;
  const focusTarget=opened[0].querySelector(':scope > summary');
  closeAllGroups();
  focusTarget?.focus();
 });

 observer=new MutationObserver(schedule);
 organize();
 observer.observe(nav,{childList:true,subtree:false});
})();
