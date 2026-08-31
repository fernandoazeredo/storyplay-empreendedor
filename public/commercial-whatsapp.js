(()=>{
  const WHATSAPP='5521996157226';
  const WHATSAPP_ICON=`<svg class="storyplay-whatsapp-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16.03 3C8.85 3 3.02 8.79 3.02 15.93c0 2.53.74 5 2.13 7.11L3 29l6.14-2.02a13.05 13.05 0 0 0 6.88 1.94h.01c7.17 0 13-5.8 13-12.94C29.03 8.8 23.2 3 16.03 3Zm0 23.73h-.01a10.85 10.85 0 0 1-5.53-1.51l-.4-.24-3.64 1.2 1.22-3.54-.26-.41a10.7 10.7 0 0 1-1.66-5.74c0-5.94 4.86-10.77 10.83-10.77 2.89 0 5.6 1.12 7.64 3.15a10.7 10.7 0 0 1 3.18 7.62c0 5.94-4.86 10.77-10.83 10.77Zm5.94-8.08c-.33-.16-1.92-.94-2.22-1.05-.3-.11-.51-.16-.72.16-.22.32-.84 1.05-1.03 1.27-.19.21-.38.24-.71.08-.32-.16-1.37-.5-2.61-1.6-.96-.85-1.61-1.9-1.8-2.22-.19-.32-.02-.5.14-.66.15-.14.33-.38.49-.56.16-.19.22-.32.33-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.39-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.4-.3.32-1.14 1.1-1.14 2.69s1.17 3.12 1.33 3.34c.16.21 2.3 3.5 5.57 4.91.78.33 1.38.53 1.86.68.78.25 1.49.21 2.05.13.63-.09 1.92-.78 2.19-1.53.27-.75.27-1.4.19-1.53-.08-.14-.3-.22-.62-.38Z"/></svg>`;
  function waUrl(plan,label){
    const msg=`Olá! Assinei o StoryPlay Empreendedor.\nPlano: ${label}\nE-mail cadastrado no StoryPlay: \nPor favor, me oriente sobre a liberação. Vou enviar também o comprovante de pagamento neste WhatsApp.`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }
  function enhance(){
    document.querySelectorAll('#planos .payment-link').forEach(link=>{
      if(link.dataset.waReady==='1')return;
      link.dataset.waReady='1';
      const billing=link.dataset.billing||'monthly';
      const label=billing==='annual'?'Anual — R$ 299,00':'Mensal — R$ 29,90';
      const a=document.createElement('a');
      a.className='btn storyplay-whatsapp-release';
      a.href=waUrl(billing,label);
      a.target='_blank';
      a.rel='noopener noreferrer';
      a.setAttribute('aria-label',`Enviar comprovante e solicitar liberação pelo WhatsApp do plano ${label}`);
      a.innerHTML=`${WHATSAPP_ICON}<span>Já assinei? Enviar comprovante e solicitar liberação</span>`;
      link.insertAdjacentElement('afterend',a);
    });
  }
  enhance();
  setTimeout(enhance,300);
  setTimeout(enhance,1200);
})();