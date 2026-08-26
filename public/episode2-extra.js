(()=>{
 const api=window.storyplayAPI;
 if(!api||document.querySelector('[data-question="q6"]'))return;
 const section=document.getElementById('episodio2');
 if(!section)return;
 const grid=section.querySelector('.story-grid');
 if(!grid)return;
 const html=`
 <article class="story-card decision-card"><span class="story-step">Registro e CNPJ</span><h3>O contrato ou ato constitutivo está pronto. Qual é o próximo cuidado?</h3><p>O registro formal precisa refletir corretamente as informações da empresa antes da conclusão cadastral.</p><div class="decision-options" data-question="q6"><button data-score="25" data-feedback="Correto. Conferir dados, assinaturas e exigências do registro reduz retrabalho antes das etapas cadastrais e do CNPJ.">Conferir os dados e concluir o registro pelos canais oficiais aplicáveis</button><button data-score="5" data-feedback="O nome fantasia é importante comercialmente, mas não substitui o registro formal e os dados cadastrais.">Criar apenas o nome fantasia e começar a vender</button><button data-score="0" data-feedback="Usar dados incorretos ou incompletos no registro pode gerar pendências e retrabalho.">Enviar qualquer informação para conseguir o CNPJ mais rápido</button></div><div class="feedback" id="feedback-q6"></div></article>
 <article class="story-card decision-card"><span class="story-step">Inscrições e licenças</span><h3>O CNPJ saiu. A empresa já pode operar em qualquer atividade?</h3><p>Dependendo da atividade e da localidade, ainda podem existir inscrições e licenciamentos específicos.</p><div class="decision-options" data-question="q7"><button data-score="25" data-feedback="Correto. É preciso verificar inscrições e licenças aplicáveis à atividade e ao local antes de iniciar a operação quando exigidas.">Verificar inscrições e licenças exigidas para a atividade e o endereço</button><button data-score="5" data-feedback="Ter CNPJ é essencial, mas não significa automaticamente que toda atividade esteja liberada para funcionar.">Considerar que o CNPJ sozinho libera qualquer operação</button><button data-score="0" data-feedback="Ignorar licenciamento pode expor a empresa a impedimentos, multas e interrupção da atividade.">Começar a operar e verificar licenças somente se houver fiscalização</button></div><div class="feedback" id="feedback-q7"></div></article>`;
 grid.insertAdjacentHTML('beforeend',html);
 function bind(group){
  const q=group.dataset.question;
  const state=api.getState();
  const saved=state.answered?.[q];
  const feedback=document.getElementById('feedback-'+q);
  if(saved&&typeof saved==='object'){
   group.classList.add('answered');
   const buttons=[...group.querySelectorAll('button[data-score]')];
   const chosen=buttons.find(b=>b.textContent.trim()===saved.answer);
   buttons.forEach(b=>b.setAttribute('aria-disabled','true'));
   if(chosen){chosen.classList.add(Number(saved.score)===25?'best':'chosen');chosen.setAttribute('aria-current','true')}
   if(feedback){feedback.textContent=(Number(saved.score)===25?'Mandou bem! ':'Aprendizado: ')+(saved.feedback||'');feedback.classList.add('show')}
   return;
  }
  group.querySelectorAll('button[data-score]').forEach(btn=>btn.addEventListener('click',()=>{
   const current=api.getState();if(current.answered?.[q])return;
   const score=Number(btn.dataset.score||0),feedbackText=btn.dataset.feedback||'';
   api.recordDecision?.(q,{score,feedback:feedbackText,answer:btn.textContent.trim()});
   group.classList.add('answered');group.querySelectorAll('button[data-score]').forEach(b=>b.setAttribute('aria-disabled','true'));
   btn.classList.add(score===25?'best':'chosen');btn.setAttribute('aria-current','true');
   if(feedback){feedback.textContent=(score===25?'Mandou bem! ':'Aprendizado: ')+feedbackText;feedback.classList.add('show')}
  }))
 }
 grid.querySelectorAll('[data-question="q6"],[data-question="q7"]').forEach(bind);
})();