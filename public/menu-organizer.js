(()=>{
 const nav=document.getElementById('mainNav');
 if(!nav||nav.dataset.organizerReady==='true')return;
 nav.dataset.organizerReady='true';

 const normalize=s=>(s||'').trim().toLocaleLowerCase('pt-BR');
 const structure=[
  {
   label:'Início e Aprendizado',
   items:[
    {sources:['Home'],label:'Home'},
    {sources:['Jornada'],label:'Jornada'},
    {sources:['StoryPlay','Trilhas'],label:'Aprender'}
   ]
  },
  {
   label:'Gestão do Negócio',
   items:[
    {sources:['Empresa Virtual','Minha Empresa'],label:'Minha Empresa (Visão Geral)'},
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
 let observer;

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

 function makeGroup(def,anchors,used){
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
   const a=findAnchor(anchors,item.sources);
   if(!a)return;
   used.add(a);
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
   const anchors=[...nav.querySelectorAll('a[href^="#"]')];
   const used=new Set();
   const fragment=document.createDocumentFragment();

   structure.forEach(def=>{
    const group=makeGroup(def,anchors,used);
    if(group)fragment.appendChild(group);
   });

   nav.replaceChildren(fragment);

   nav.querySelectorAll('.nav-submenu a').forEach(a=>{
    if(a.dataset.accordionCloseBound==='true')return;
    a.dataset.accordionCloseBound='true';
    a.addEventListener('click',()=>{
     closeAllGroups();
     window.storyplayAPI?.closeMenu?.();
    });
   });
  }finally{
   organizing=false;
   observer?.observe(nav,{childList:true,subtree:false});
  }
 }

 function schedule(){
  if(scheduled||organizing)return;
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
 window.addEventListener('storyplay:statechange',schedule);
})();
