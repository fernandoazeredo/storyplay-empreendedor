(()=>{
 const api=window.storyplayAPI;if(!api)return;

 // Migração de estados antigos: versões anteriores gravavam q1/q2 como booleanos.
 // O formato atual exige {score, feedback, answer}. Remove apenas entradas incompatíveis.
 try{
  const raw=JSON.parse(localStorage.getItem('storyplay-state')||'{}');
  if(raw&&raw.answered&&typeof raw.answered==='object'){
   let changed=false;
   Object.keys(raw.answered).forEach(key=>{
    const value=raw.answered[key];
    if(!value||typeof value!=='object'||Array.isArray(value)||typeof value.answer!=='string'||typeof value.score!=='number'){
     delete raw.answered[key];changed=true;
    }
   });
   if(changed){localStorage.setItem('storyplay-state',JSON.stringify(raw));sessionStorage.setItem('storyplay-migrated-answers','1');location.reload();return}
  }
 }catch(e){}

 // Protege métricas acumuladas contra simuladores pontuais.
 const baseUpdate=api.updateMetrics?.bind(api);
 if(baseUpdate&&!api.__metricsGuard){
  api.updateMetrics=(partial={})=>{
   const current=api.getState?.().metrics||{};
   const next={...partial};
   const activity=String(partial.lastActivity||'');
   if(activity==='Campanha de marketing analisada'){
    if(Object.prototype.hasOwnProperty.call(partial,'revenue')){next.lastSimulationRevenue=Number(partial.revenue||0);delete next.revenue}
    if(Object.prototype.hasOwnProperty.call(partial,'clients')){next.lastSimulationClients=Number(partial.clients||0);delete next.clients}
   }
   if(activity==='Simulação financeira concluída'&&Object.prototype.hasOwnProperty.call(partial,'revenue')){
    next.lastSimulationRevenue=Number(partial.revenue||0);delete next.revenue
   }
   return baseUpdate(next)
  };
  api.__metricsGuard=true;
 }

 // Completa os tópicos 3 e 4 do Episódio 2 sem quebrar a estrutura existente.
 const ep2=document.getElementById('episodio2');
 if(ep2&&!document.getElementById('episode2Extra')){
  const note=ep2.querySelector('.source-note');
  const extra=document.createElement('div');extra.id='episode2Extra';extra.className='story-grid episode2-extra';
  extra.innerHTML=`<article class="story-card decision-card"><span class="story-step">Registro e CNPJ</span><h3>O contrato está pronto. Qual é o próximo raciocínio?</h3><p>Você definiu atividade, participantes e estrutura. Agora precisa formalizar a constituição da empresa e concluir as etapas cadastrais aplicáveis.</p><div class="decision-options" data-question="q6"><button data-score="25" data-feedback="Correto. Registro e cadastro devem seguir a sequência aplicável ao tipo de empresa e aos órgãos competentes.">Formalizar o ato constitutivo e seguir o fluxo oficial de registro/CNPJ</button><button data-score="5" data-feedback="Divulgar o negócio pode ser útil, mas não substitui a formalização cadastral.">Criar as redes sociais antes de registrar a empresa</button><button data-score="0" data-feedback="Emitir documentos fiscais sem a regularização exigida pode gerar problemas cadastrais e tributários.">Começar a emitir notas antes de concluir o cadastro</button></div><div class="feedback" id="feedback-q6"></div></article><article class="story-card decision-card"><span class="story-step">Inscrições e licenças</span><h3>O CNPJ saiu. A empresa já pode funcionar?</h3><p>Nem sempre. Dependendo da atividade e do local, podem existir inscrições e licenças específicas antes do início da operação.</p><div class="decision-options" data-question="q7"><button data-score="25" data-feedback="Correto. Licenciamento e inscrições dependem da atividade, do município, do estado e dos órgãos envolvidos.">Verificar inscrições e licenças exigidas para a atividade e o endereço</button><button data-score="5" data-feedback="Ter CNPJ é uma etapa importante, mas não garante sozinho todas as autorizações de funcionamento.">Considerar que o CNPJ sozinho libera qualquer atividade</button><button data-score="0" data-feedback="Ignorar exigências específicas pode interromper a operação e gerar sanções.">Abrir imediatamente e verificar licenças apenas se houver fiscalização</button></div><div class="feedback" id="feedback-q7"></div></article>`;
  note?.before(extra);

  // Registra os novos grupos com o mesmo comportamento das decisões existentes.
  extra.querySelectorAll('.decision-options').forEach(group=>{
   const q=group.dataset.question;
   group.querySelectorAll('button[data-score]').forEach(btn=>btn.addEventListener('click',()=>{
    const state=api.getState();if(state.answered?.[q])return;
    // Usa um evento compatível com o mecanismo principal por meio de estado local dedicado.
    const score=Number(btn.dataset.score||0),feedbackText=btn.dataset.feedback||'';
    const raw=JSON.parse(localStorage.getItem('storyplay-state')||'{}');raw.answered=raw.answered||{};raw.metrics=raw.metrics||{};raw.labs=raw.labs||{};raw.achievements=raw.achievements||{};
    raw.xp=Number(raw.xp||0)+score;raw.answered[q]={score,feedback:feedbackText,answer:btn.textContent.trim()};raw.metrics.lastActivity='Decisão concluída: '+q;
    if(raw.company){if(score===25)raw.metrics.reputation=Math.min(100,Number(raw.metrics.reputation||50)+3);else if(score===0)raw.metrics.reputation=Math.max(0,Number(raw.metrics.reputation||50)-2)}
    localStorage.setItem('storyplay-state',JSON.stringify(raw));group.classList.add('answered');group.querySelectorAll('button[data-score]').forEach(b=>{b.setAttribute('aria-disabled','true');b.disabled=true});btn.classList.add(score===25?'best':'chosen');btn.setAttribute('aria-current','true');const feedback=document.getElementById('feedback-'+q);if(feedback){feedback.textContent=(score===25?'Mandou bem! ':'Aprendizado: ')+feedbackText;feedback.classList.add('show')}setTimeout(()=>location.reload(),500)
   }))
  })
 }

 // Área Conta e Nuvem.
 if(document.getElementById('conta-nuvem'))return;
 const plans=document.getElementById('planos')||document.getElementById('commercial-plans')||document.getElementById('desempenho')||document.getElementById('performance-center')||document.getElementById('empresa');
 if(!plans)return;
 const section=document.createElement('section');section.id='conta-nuvem';section.className='section account-section';section.innerHTML=`
 <div class="section-head"><span class="eyebrow">CONTA E NUVEM</span><h2>Seu progresso está seguro neste dispositivo</h2><p>A V1 usa armazenamento local. A estrutura abaixo já está preparada para futura autenticação e sincronização com Firebase, sem interromper o funcionamento atual.</p></div>
 <div class="account-grid">
  <article class="account-card"><h3>Status da conta</h3><p>Enquanto a autenticação não for ativada, você continua usando o aplicativo normalmente como visitante local.</p><div class="account-status"><span class="account-dot"></span><div><strong id="accountMode">Modo local</strong><span id="accountDetail">Dados salvos somente neste navegador</span></div></div><div class="account-actions"><button class="btn primary" id="futureGoogle" type="button" disabled>Entrar com Google — em preparação</button><button class="btn secondary" id="futureEmail" type="button" disabled>E-mail e senha — em preparação</button></div><div class="migration-note"><strong>Quando a nuvem for ativada:</strong> o progresso local poderá ser associado à primeira conta criada, evitando que o usuário precise recomeçar a jornada.</div></article>
  <article class="account-card"><h3>O que será sincronizado</h3><div class="cloud-list"><div><strong>Jornada e XP</strong><span>Respostas, níveis, conquistas e atividades concluídas.</span></div><div><strong>Empresa Virtual</strong><span>Nome, segmento, métricas, eventos e histórico de meses.</span></div><div><strong>Perfil e preferências</strong><span>Onboarding, objetivo, plano escolhido e configurações de experiência.</span></div><div><strong>Escolas e turmas</strong><span>Vínculo futuro com organização, professor e turma, quando aplicável.</span></div></div><div class="account-tech"><div><span>Autenticação</span><strong>Preparada, não ativada</strong></div><div><span>Firestore</span><strong>Modelo documentado</strong></div><div><span>Modo atual</span><strong>Local-first</strong></div><div><span>Cobrança</span><strong>Não ativa</strong></div></div></article>
 </div>`;
 plans.insertAdjacentElement('afterend',section);
 const nav=document.getElementById('mainNav');if(nav&&!nav.querySelector('a[href="#conta-nuvem"]')){const a=document.createElement('a');a.href='#conta-nuvem';a.textContent='Conta';const ref=nav.querySelector('a[href="#planos"]')||nav.querySelector('a[href="#empresa"]');ref?.insertAdjacentElement('afterend',a);a.addEventListener('click',()=>api.closeMenu?.())}
})();