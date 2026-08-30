(()=>{
 const apply=()=>{
  const section=document.getElementById('eventos-empresariais');
  if(!section)return false;

  const actions=section.querySelector('.event-actions');
  if(actions&&!document.getElementById('eventSimulationNote')){
   const note=document.createElement('p');
   note.id='eventSimulationNote';
   note.className='event-simulation-note';
   note.textContent='Modo de simulação: você pode gerar novos eventos para praticar. Não há limite mensal rígido nesta versão.';
   actions.appendChild(note);
  }

  if(location.hash==='#eventos-empresariais'&&!section.dataset.initialHashAligned){
   section.dataset.initialHashAligned='true';
   requestAnimationFrame(()=>section.scrollIntoView({behavior:'auto',block:'start'}));
  }
  return true;
 };

 if(!apply()){
  let attempts=0;
  const timer=setInterval(()=>{
   attempts+=1;
   if(apply()||attempts>=20)clearInterval(timer);
  },50);
 }
 window.addEventListener('load',apply,{once:true});
})();
