(()=>{
 const DEFAULT_TITLE='⚖️ Orientação Jurídica';
 const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

 function render(fase){
  const texto=String(fase?.disclaimerJuridico||'').trim();
  if(!texto)return '';
  return `<aside class="formalization-legal-disclaimer" role="note" aria-label="Orientação Jurídica">
   <strong>${DEFAULT_TITLE}</strong>
   <p>${escapeHTML(texto)}</p>
  </aside>`;
 }

 window.STORYPLAY_FORMALIZATION_LEGAL_DISCLAIMER={render};
})();
