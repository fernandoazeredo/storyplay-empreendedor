(()=>{
  function applyFooter(){
    const footer=document.querySelector('footer');
    if(!footer)return;
    const admin=footer.querySelector('.storyplay-admin-entry');
    if(!admin)return;
    if(footer.dataset.footerExact==='1')return;

    const makeText=text=>{const span=document.createElement('span');span.className='storyplay-footer-item';span.textContent=text;return span};
    const makeSep=()=>{const span=document.createElement('span');span.className='storyplay-footer-separator';span.textContent='-';span.setAttribute('aria-hidden','true');return span};

    [...footer.children].forEach(el=>{if(el!==admin)el.remove()});
    footer.insertBefore(makeText('StoryPlay Empreendedor'),admin);
    footer.insertBefore(makeSep(),admin);
    footer.insertBefore(makeText('Abra Sua Empresa'),admin);
    footer.insertBefore(makeSep(),admin);
    footer.insertBefore(makeText('Aprenda fazendo'),admin);
    footer.insertBefore(makeSep(),admin);
    footer.appendChild(admin);
    footer.dataset.footerExact='1';
  }
  applyFooter();
  setTimeout(applyFooter,300);
  setTimeout(applyFooter,1200);
})();
