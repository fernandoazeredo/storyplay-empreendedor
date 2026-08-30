(()=>{
 const progress=document.querySelector('.progress');
 const knowledge=document.getElementById('knowledgeValue');
 if(!progress||!knowledge||progress.dataset.a11yProgressReady==='true')return;
 progress.dataset.a11yProgressReady='true';
 progress.setAttribute('role','progressbar');
 progress.setAttribute('aria-label','Progresso de conhecimento');
 progress.setAttribute('aria-valuemin','0');
 progress.setAttribute('aria-valuemax','100');

 function sync(){
  const raw=(knowledge.textContent||'').replace('%','').trim();
  const value=Math.max(0,Math.min(100,Number(raw)||0));
  progress.setAttribute('aria-valuenow',String(value));
  progress.setAttribute('aria-valuetext',`${value}% de conhecimento concluído`);
 }

 sync();
 window.addEventListener('storyplay:statechange',sync);
})();
