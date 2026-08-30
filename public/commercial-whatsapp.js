(()=>{
  const WHATSAPP='5521996157226';
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
      a.innerHTML='<span class="storyplay-whatsapp-icon" aria-hidden="true">🟢</span><span>Já assinei? Enviar comprovante e solicitar liberação</span>';
      link.insertAdjacentElement('afterend',a);
    });
  }
  enhance();
  setTimeout(enhance,300);
  setTimeout(enhance,1200);
})();
