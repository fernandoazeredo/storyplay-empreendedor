(()=>{
 const DEFAULT_TITLE='📍 Atenção Local';

 function escapeHTML(value){
  return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 }

 function render(fase,journey){
  if(!fase?.temAlertaLocal)return '';
  const texto=String(fase.textoAlertaLocal||journey?.alertaLocalPadrao||'').trim();
  if(!texto)return '';
  return `<aside class="formalization-local-alert" role="note" aria-label="Atenção Local">
   <strong>${DEFAULT_TITLE}</strong>
   <p>${escapeHTML(texto)}</p>
  </aside>`;
 }

 window.STORYPLAY_FORMALIZATION_LOCAL_ALERT={render};
})();
