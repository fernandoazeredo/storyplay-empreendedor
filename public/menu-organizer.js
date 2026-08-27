(()=>{
 const nav=document.getElementById('mainNav');
 if(!nav||nav.dataset.organizerReady==='true')return;
 nav.dataset.organizerReady='true';

 const normalize=s=>(s||'').trim().toLocaleLowerCase('pt-BR');
 const groups=[
  {label:'Aprender',items:['StoryPlay','Trilhas','Laboratórios','Desafios','Eventos CEO']},
  {label:'Minha Empresa',items:['Empresa Virtual','Gestão','Mês a mês','Desempenho']},
  {label:'Meu Progresso',items:['Progresso','Meu Perfil','Relatório','Piloto']},
  {label:'Conta e Planos',items:['Conta','Planos']},
  {label:'Área do Educador',items:['Educador','Turma']}
 ];
 const direct=['Home','Jornada'];
 const known=new Set([...direct,...groups.flatMap(g=>g.items)].map(normalize));
 let organizing=false;
 let scheduled=false;
 let observer;

 function closeAllGroups(except){
  nav.querySelectorAll('details.nav-group[open]').forEach(d=>{if(d!==except)d.removeAttribute('open')});
 }

 function makeGroup(def,anchors){
  const details=document.createElement('details');
  details.className='nav-group';
  const summary=document.createElement('summary');
  summary.textContent=def.label;
  summary.setAttribute('aria-label',`Abrir submenu ${def.label}`);
  const submenu=document.createElement('div');
  submenu.className='nav-submenu';
  def.items.forEach(name=>{
   const a=anchors.get(normalize(name));
   if(a)submenu.appendChild(a);
  });
  details.append(summary,submenu);
  details.addEventListener('toggle',()=>{if(details.open)closeAllGroups(details)});
  return submenu.children.length?details:null;
 }

 function organize(){
  scheduled=false;
  if(organizing)return;
  organizing=true;
  observer?.disconnect();
  try{
   const anchors=[...nav.querySelectorAll('a[href^="#"]')];
   const theme=nav.querySelector('#themeToggle');
   const byName=new Map();
   anchors.forEach(a=>{
    const key=normalize(a.textContent);
    if(!byName.has(key))byName.set(key,a);
   });

   const fragment=document.createDocumentFragment();
   direct.forEach(name=>{
    const a=byName.get(normalize(name));
    if(a)fragment.appendChild(a);
   });
   groups.forEach(def=>{
    const g=makeGroup(def,byName);
    if(g)fragment.appendChild(g);
   });

   anchors.forEach(a=>{
    if(!known.has(normalize(a.textContent)))fragment.appendChild(a);
   });

   if(theme){
    theme.classList.add('nav-theme-control');
    theme.title='Alternar tema claro/escuro';
    fragment.appendChild(theme);
   }

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

 observer=new MutationObserver(schedule);
 organize();
 observer.observe(nav,{childList:true,subtree:false});
 window.addEventListener('storyplay:statechange',schedule);
})();
