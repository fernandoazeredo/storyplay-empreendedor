(()=>{
 const apply=()=>{
  const report=document.getElementById('learningReport');
  if(!report)return;
  const rows=[...report.querySelectorAll('.report-domain')];
  if(rows.length<4)return;
  const values=rows.map(row=>Number((row.querySelector('strong')?.textContent||'').replace('%','').trim())).filter(Number.isFinite);
  if(values.length!==rows.length)return;
  const allEqual=values.every(v=>v===values[0]);
  if(!allEqual)return;
  const note=report.querySelector('.report-note');
  if(note)note.innerHTML='<strong>Leitura das competências:</strong> todas as competências estão equilibradas nesta faixa.';
 };
 const observer=new MutationObserver(apply);
 const start=()=>{
  const report=document.getElementById('learningReport');
  if(report){observer.observe(report,{childList:true,subtree:true});apply();return true}
  return false;
 };
 if(!start()){
  const pageObserver=new MutationObserver(()=>{if(start())pageObserver.disconnect()});
  pageObserver.observe(document.body,{childList:true,subtree:true});
 }
 window.addEventListener('storyplay:statechange',()=>setTimeout(apply,0));
})();
