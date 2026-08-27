(()=>{
 const TARGET='<strong>Leitura das competências:</strong> todas as competências estão equilibradas nesta faixa.';
 let applying=false;
 const apply=()=>{
  if(applying)return;
  const report=document.getElementById('learningReport');
  if(!report)return;
  const rows=[...report.querySelectorAll('.report-domain')];
  if(rows.length<4)return;
  const values=rows.map(row=>Number((row.querySelector('strong')?.textContent||'').replace('%','').trim())).filter(Number.isFinite);
  if(values.length!==rows.length)return;
  const allEqual=values.every(v=>v===values[0]);
  if(!allEqual)return;
  const note=report.querySelector('.report-note');
  if(!note||note.innerHTML===TARGET)return;
  applying=true;
  note.innerHTML=TARGET;
  applying=false;
 };
 let observer=null;
 const start=()=>{
  const report=document.getElementById('learningReport');
  if(!report)return false;
  if(observer)observer.disconnect();
  observer=new MutationObserver(()=>queueMicrotask(apply));
  observer.observe(report,{childList:true,subtree:true,characterData:true});
  apply();
  return true;
 };
 if(!start()){
  const pageObserver=new MutationObserver(()=>{if(start())pageObserver.disconnect()});
  pageObserver.observe(document.body,{childList:true,subtree:true});
 }
 window.addEventListener('storyplay:statechange',()=>setTimeout(apply,0));
})();