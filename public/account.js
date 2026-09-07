(()=>{
 const api=window.storyplayAPI;if(!api)return;
 const FORMALIZATION_STORAGE_KEY='storyplay:formalization:checklists';
 const RESET_MODAL_ID='storyplayFormalizationResetModal';

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

  let persisted={};try{persisted=JSON.parse(localStorage.getItem('storyplay-state')||'{}')}catch(e){}
  extra.querySelectorAll('.decision-options').forEach(group=>{
   const q=group.dataset.question,saved=persisted.answered?.[q];
   if(saved&&typeof saved==='object'){
    group.classList.add('answered');const buttons=[...group.querySelectorAll('button[data-score]')];const chosen=buttons.find(b=>b.textContent.trim()===saved.answer);buttons.forEach(b=>{b.setAttribute('aria-disabled','true');b.disabled=true});if(chosen){chosen.classList.add(saved.score===25?'best':'chosen');chosen.setAttribute('aria-current','true')}const f=document.getElementById('feedback-'+q);if(f){f.textContent=(saved.score===25?'Mandou bem! ':'Aprendizado: ')+(saved.feedback||'');f.classList.add('show')}
   }
   group.querySelectorAll('button[data-score]').forEach(btn=>btn.addEventListener('click',()=>{
    const state=api.getState();if(state.answered?.[q]||persisted.answered?.[q])return;
    const score=Number(btn.dataset.score||0),feedbackText=btn.dataset.feedback||'';
    const raw=JSON.parse(localStorage.getItem('storyplay-state')||'{}');raw.answered=raw.answered||{};raw.metrics=raw.metrics||{};raw.labs=raw.labs||{};raw.achievements=raw.achievements||{};
    raw.xp=Number(raw.xp||0)+score;raw.answered[q]={score,feedback:feedbackText,answer:btn.textContent.trim()};raw.metrics.lastActivity='Decisão concluída: '+q;
    if(raw.company){if(score===25)raw.metrics.reputation=Math.min(100,Number(raw.metrics.reputation||50)+3);else if(score===0)raw.metrics.reputation=Math.max(0,Number(raw.metrics.reputation||50)-2)}
    localStorage.setItem('storyplay-state',JSON.stringify(raw));persisted=raw;group.classList.add('answered');group.querySelectorAll('button[data-score]').forEach(b=>{b.setAttribute('aria-disabled','true');b.disabled=true});btn.classList.add(score===25?'best':'chosen');btn.setAttribute('aria-current','true');const feedback=document.getElementById('feedback-'+q);if(feedback){feedback.textContent=(score===25?'Mandou bem! ':'Aprendizado: ')+feedbackText;feedback.classList.add('show')}setTimeout(()=>location.reload(),450)
   }))
  })
 }

 function ensureResetStyle(){
  if(document.getElementById('storyplayFormalizationResetStyle'))return;
  const style=document.createElement('style');
  style.id='storyplayFormalizationResetStyle';
  style.textContent=`
   .account-reset-card{grid-column:1/-1}
   .account-reset-card .account-reset-copy{margin:0 0 14px;color:var(--muted);line-height:1.6}
   .account-reset-card .account-reset-warning{margin:12px 0;padding:12px 14px;border:1px solid color-mix(in srgb,#dc2626 30%,var(--line));border-radius:12px;background:color-mix(in srgb,var(--surface) 92%,#dc2626 8%);color:var(--muted)}
   .account-reset-card .btn.danger{background:#b42318;color:#fff;border-color:#b42318}
   .account-reset-card .btn.danger:hover,.account-reset-card .btn.danger:focus-visible{filter:brightness(1.08)}
   .storyplay-reset-modal{position:fixed;inset:0;z-index:10050;display:grid;place-items:center;padding:20px}
   .storyplay-reset-modal[hidden]{display:none!important}
   .storyplay-reset-backdrop{position:absolute;inset:0;background:rgba(3,17,31,.7);backdrop-filter:blur(3px)}
   .storyplay-reset-card{position:relative;width:min(560px,100%);background:var(--surface);color:var(--text);border:1px solid var(--line);border-radius:22px;box-shadow:0 28px 80px rgba(0,0,0,.35);padding:26px}
   .storyplay-reset-card h3{margin:0 0 10px;font-size:1.45rem}
   .storyplay-reset-card p{margin:0 0 14px;color:var(--muted);line-height:1.6}
   .storyplay-reset-actions{display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap;margin-top:20px}
   .storyplay-reset-confirm{background:#b42318!important;color:#fff!important;border-color:#b42318!important}
   @media(max-width:620px){.storyplay-reset-modal{padding:10px}.storyplay-reset-card{padding:20px}.storyplay-reset-actions{flex-direction:column}.storyplay-reset-actions .btn{width:100%}}
  `;
  document.head.appendChild(style);
 }

 function closeResetModal(){
  const modal=document.getElementById(RESET_MODAL_ID);if(!modal)return;
  modal.hidden=true;document.body.classList.remove('storyplay-reset-open');
 }

 function ensureResetModal(){
  let modal=document.getElementById(RESET_MODAL_ID);if(modal)return modal;
  modal=document.createElement('div');
  modal.id=RESET_MODAL_ID;modal.className='storyplay-reset-modal';modal.hidden=true;
  modal.innerHTML=`<div class="storyplay-reset-backdrop" data-reset-close></div><section class="storyplay-reset-card" role="dialog" aria-modal="true" aria-labelledby="storyplayResetTitle"><h3 id="storyplayResetTitle">Reiniciar progresso da Jornada de Formalização?</h3><p>Isso vai apagar todos os checklists marcados e o XP da Jornada de Formalização neste navegador.</p><p><strong>Essa ação não pode ser desfeita.</strong> Sua Empresa Virtual, quizzes e outras áreas do StoryPlay não serão alteradas.</p><div class="storyplay-reset-actions"><button class="btn secondary" type="button" data-reset-close>Cancelar</button><button class="btn storyplay-reset-confirm" type="button" data-reset-confirm>Sim, reiniciar jornada</button></div></section>`;
  document.body.appendChild(modal);
  modal.addEventListener('click',event=>{
   if(event.target.closest('[data-reset-close]')){closeResetModal();return}
   if(!event.target.closest('[data-reset-confirm]'))return;
   try{localStorage.removeItem(FORMALIZATION_STORAGE_KEY)}catch(e){}
   closeResetModal();
   location.hash='#formalizacao';
   location.reload();
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal.hidden)closeResetModal()});
  return modal;
 }

 function openResetModal(){
  const modal=ensureResetModal();
  modal.hidden=false;document.body.classList.add('storyplay-reset-open');
  setTimeout(()=>modal.querySelector('[data-reset-close]')?.focus(),30);
 }

 // Área Conta e Nuvem.
 if(document.getElementById('conta-nuvem'))return;
 const plans=document.getElementById('planos')||document.getElementById('commercial-plans')||document.getElementById('desempenho')||document.getElementById('performance-center')||document.getElementById('empresa');
 if(!plans)return;
 ensureResetStyle();
 const section=document.createElement('section');section.id='conta-nuvem';section.className='section account-section';section.innerHTML=`
 <div class="section-head"><span class="eyebrow">CONTA E NUVEM</span><h2>Seu progresso está seguro neste dispositivo</h2><p>A V1 usa armazenamento local. A estrutura abaixo já está preparada para futura autenticação e sincronização com Firebase, sem interromper o funcionamento atual.</p></div>
 <div class="account-grid">
  <article class="account-card"><h3>Status da conta</h3><p>Enquanto a autenticação não for ativada, você continua usando o aplicativo normalmente como visitante local.</p><div class="account-status"><span class="account-dot"></span><div><strong id="accountMode">Modo local</strong><span id="accountDetail">Dados salvos somente neste navegador</span></div></div><div class="account-actions"><button class="btn primary" id="futureGoogle" type="button" disabled>Entrar com Google — em preparação</button><button class="btn secondary" id="futureEmail" type="button" disabled>E-mail e senha — em preparação</button></div><div class="migration-note"><strong>Quando a nuvem for ativada:</strong> o progresso local poderá ser associado à primeira conta criada, evitando que o usuário precise recomeçar a jornada.</div></article>
  <article class="account-card"><h3>O que será sincronizado</h3><div class="cloud-list"><div><strong>Jornada e XP</strong><span>Respostas, níveis, conquistas e atividades concluídas.</span></div><div><strong>Empresa Virtual</strong><span>Nome, segmento, métricas, eventos e histórico de meses.</span></div><div><strong>Perfil e preferências</strong><span>Onboarding, objetivo, plano escolhido e configurações de experiência.</span></div><div><strong>Escolas e turmas</strong><span>Vínculo futuro com organização, professor e turma, quando aplicável.</span></div></div><div class="account-tech"><div><span>Autenticação</span><strong>Preparada, não ativada</strong></div><div><span>Firestore</span><strong>Modelo documentado</strong></div><div><span>Modo atual</span><strong>Local-first</strong></div><div><span>Cobrança</span><strong>Não ativa</strong></div></div></article>
  <article class="account-card account-reset-card"><h3>Jornada de Formalização</h3><p class="account-reset-copy">Quer refazer a trilha desde o início? Você pode zerar somente os checklists e o XP derivados da Jornada de Formalização.</p><div class="account-reset-warning"><strong>Importante:</strong> este comando não apaga sua Empresa Virtual, respostas de quizzes, outras conquistas ou configurações do aplicativo.</div><div class="account-actions"><button class="btn danger" id="resetFormalizationJourney" type="button">↺ Reiniciar progresso da jornada</button></div></article>
 </div>`;
 plans.insertAdjacentElement('afterend',section);
 document.getElementById('resetFormalizationJourney')?.addEventListener('click',openResetModal);
 const nav=document.getElementById('mainNav');if(nav&&!nav.querySelector('a[href="#conta-nuvem"]')){const a=document.createElement('a');a.href='#conta-nuvem';a.textContent='Conta';const ref=nav.querySelector('a[href="#planos"]')||nav.querySelector('a[href="#empresa"]');ref?.insertAdjacentElement('afterend',a);a.addEventListener('click',()=>api.closeMenu?.())}
})();