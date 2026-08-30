(()=>{
  const presets={
    '15':{label:'🎁 Teste grátis — 15 dias',source:'trial'},
    '30':{label:'🚀 Empreendedor Mensal — 30 dias',source:'monthly'},
    '365':{label:'⭐ Empreendedor Anual — 365 dias',source:'annual'}
  };
  function patch(){
    const form=document.getElementById('trialGrantForm');
    if(!form||form.dataset.presetsReady==='1')return;
    form.dataset.presetsReady='1';
    const card=form.closest('.storyplay-access-card');
    const h3=card?.querySelector('h3');if(h3)h3.textContent='Liberar acesso';
    const select=document.getElementById('trialDays');
    if(select){
      select.innerHTML=Object.entries(presets).map(([v,p])=>`<option value="${v}">${p.label}</option>`).join('');
      select.value='15';
    }
    const note=card?.querySelector('.storyplay-access-note');
    if(note)note.textContent='Escolha Teste, Mensal ou Anual. A contagem começa na liberação e o Premium é bloqueado automaticamente ao vencer.';
    const emailLabel=form.querySelector('label');if(emailLabel){const text=emailLabel.childNodes[0];if(text&&text.nodeType===3)text.nodeValue='E-mail do usuário';}
  }
  const target=document.getElementById('storyplayAccessBody');
  if(target){new MutationObserver(patch).observe(target,{childList:true,subtree:true});}
  patch();
  setTimeout(patch,300);
  setTimeout(patch,1000);
})();
