(()=>{
 const SECTION_ID='formalizacao';
 const INITIAL_PHASE=1;
 let rendered=false;
 let faseAtual=INITIAL_PHASE;

 const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

 function waitForJourney(attempt=0){
  const journey=window.STORYPLAY_FORMALIZATION_JOURNEY;
  if(journey?.estruturaValida&&Array.isArray(journey.fases)){
   render(journey);
   return;
  }
  if(attempt<80)setTimeout(()=>waitForJourney(attempt+1),50);
 }

 function buildProgressPanel(journey,faseAtual){
  const percentual=journey.calcularPercentual(faseAtual);
  return `<section class="formalization-progress-panel" aria-labelledby="formalizationProgressTitle" data-formalization-current-phase="${faseAtual}">
   <div class="formalization-progress-copy">
    <div>
     <span class="formalization-progress-eyebrow">SUA JORNADA</span>
     <h3 id="formalizationProgressTitle">Fase ${faseAtual} de ${journey.totalFases} · ${percentual}% concluído</h3>
    </div>
    <span class="formalization-progress-mode">Progresso visual · ainda não salvo</span>
   </div>
   <div class="formalization-progress-track" role="progressbar" aria-label="Progresso da Jornada de Formalização" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentual}">
    <span class="formalization-progress-fill" style="width:${percentual}%"></span>
   </div>
   <div class="formalization-progress-meta"><span data-formalization-progress-current>🚀 Você está na Fase ${faseAtual}</span><span data-formalization-progress-remaining>🎯 ${journey.totalFases-faseAtual} fases depois desta</span></div>
  </section>`;
 }

 function updateProgressPanel(journey,novaFase){
  const panel=document.querySelector('.formalization-progress-panel');
  if(!panel)return;
  const percentual=journey.calcularPercentual(novaFase);
  faseAtual=novaFase;
  panel.dataset.formalizationCurrentPhase=String(novaFase);
  const title=panel.querySelector('#formalizationProgressTitle');
  const progressbar=panel.querySelector('[role="progressbar"]');
  const fill=panel.querySelector('.formalization-progress-fill');
  const current=panel.querySelector('[data-formalization-progress-current]');
  const remaining=panel.querySelector('[data-formalization-progress-remaining]');
  if(title)title.textContent=`Fase ${novaFase} de ${journey.totalFases} · ${percentual}% concluído`;
  progressbar?.setAttribute('aria-valuenow',String(percentual));
  if(fill)fill.style.width=`${percentual}%`;
  if(current)current.textContent=`🚀 Você está na Fase ${novaFase}`;
  if(remaining)remaining.textContent=`🎯 ${journey.totalFases-novaFase} fases depois desta`;
  window.dispatchEvent(new CustomEvent('storyplay:formalization-phase-change',{detail:{faseAtual:novaFase,percentual}}));
 }

 function bindPhaseNavigation(section,journey){
  section.querySelectorAll('.formalization-phase-nav-link[href^="#formalization-fase-"]').forEach(link=>{
   link.addEventListener('click',()=>{
    const targetId=Number(link.getAttribute('href')?.replace('#formalization-fase-',''));
    if(Number.isInteger(targetId)&&targetId>=1&&targetId<=journey.totalFases)updateProgressPanel(journey,targetId);
   });
  });
 }

 function buildLocalAlert(fase,journey){
  return window.STORYPLAY_FORMALIZATION_LOCAL_ALERT?.render?.(fase,journey)||'';
 }

 function buildLegalDisclaimer(fase){
  return window.STORYPLAY_FORMALIZATION_LEGAL_DISCLAIMER?.render?.(fase)||'';
 }

 function buildPhaseNavigation(fase,journey){
  const anteriorId=fase.id>1?fase.id-1:null;
  const proximaId=fase.proximaFase;
  const anterior=anteriorId?journey.fases.find(item=>item.id===anteriorId):null;
  const proxima=proximaId?journey.fases.find(item=>item.id===proximaId):null;
  const previousLink=anterior?`<a class="formalization-phase-nav-link is-previous" href="#formalization-fase-${anterior.id}" aria-label="Ir para a Fase ${anterior.id}: ${escapeHTML(anterior.titulo)}">← Anterior</a>`:'<span class="formalization-phase-nav-spacer" aria-hidden="true"></span>';
  const nextLink=proxima?`<a class="formalization-phase-nav-link is-next" href="#formalization-fase-${proxima.id}" aria-label="Ir para a Fase ${proxima.id}: ${escapeHTML(proxima.titulo)}">Próxima →</a>`:'<span class="formalization-phase-nav-end">Fim da jornada</span>';
  return `<nav class="formalization-phase-nav" aria-label="Navegação da Fase ${fase.id}">${previousLink}${nextLink}</nav>`;
 }

 function buildPhaseCard(fase,total,journey){
  const hasBaseContent=Boolean(fase.chamada||fase.texto||fase.checklist?.length||fase.disclaimerJuridico);
  const status=hasBaseContent?'Conteúdo-base pronto':'Estrutura reservada';
  return `<article id="formalization-fase-${fase.id}" class="formalization-phase-card" data-formalization-phase="${fase.id}" aria-label="Fase ${fase.id} de ${total}: ${escapeHTML(fase.titulo)}">
   <div class="formalization-phase-top">
    <span class="formalization-phase-emoji" aria-hidden="true">${escapeHTML(fase.emoji)}</span>
    <div>
     <span class="formalization-phase-number">Fase ${fase.id} de ${total}</span>
     <h4>${escapeHTML(fase.titulo)}</h4>
    </div>
   </div>
   <span class="formalization-phase-status${hasBaseContent?'':' is-reserved'}">${status}</span>
   ${buildLocalAlert(fase,journey)}
   ${buildLegalDisclaimer(fase)}
   ${buildPhaseNavigation(fase,journey)}
  </article>`;
 }

 function buildChapter(journey,chapterNumber){
  const fases=journey.fases.filter(fase=>fase.capitulo===chapterNumber);
  if(!fases.length)return '';
  const range=`Fases ${fases[0].id} a ${fases[fases.length-1].id}`;
  return `<section class="formalization-chapter" aria-labelledby="formalizationChapter${chapterNumber}">
   <div class="formalization-chapter-head">
    <h3 id="formalizationChapter${chapterNumber}">${escapeHTML(fases[0].capituloNome)}</h3>
    <span>${range}</span>
   </div>
   <div class="formalization-phase-grid">${fases.map(fase=>buildPhaseCard(fase,journey.totalFases,journey)).join('')}</div>
  </section>`;
 }

 function render(journey){
  if(rendered||document.getElementById(SECTION_ID))return;
  const reference=document.getElementById('episodio2');
  if(!reference)return;

  const section=document.createElement('section');
  section.id=SECTION_ID;
  section.className='section formalization-index';
  section.setAttribute('aria-labelledby','formalizationTitle');
  section.innerHTML=`<div class="formalization-shell">
   <header class="formalization-hero">
    <span class="formalization-kicker">GUIA PRÁTICO · 2 CAPÍTULOS · ${journey.totalFases} FASES</span>
    <h2 id="formalizationTitle">${escapeHTML(journey.titulo)}</h2>
    <p class="formalization-call">${escapeHTML(journey.chamada)}</p>
    <p class="formalization-subtitle">${escapeHTML(journey.subtitulo)}</p>
   </header>
   ${buildProgressPanel(journey,faseAtual)}
   ${buildChapter(journey,1)}
   ${buildChapter(journey,2)}
   <p class="formalization-index-note">👀 Esta é a visão geral da jornada. O conteúdo detalhado, os checklists interativos, a persistência do progresso e as missões serão ativados nas próximas camadas, sem alterar esta estrutura-base.</p>
  </div>`;
  reference.insertAdjacentElement('afterend',section);
  bindPhaseNavigation(section,journey);
  rendered=true;
  window.dispatchEvent(new CustomEvent('storyplay:formalization-index-ready',{detail:{sectionId:SECTION_ID,totalFases:journey.totalFases,faseAtual,percentual:journey.calcularPercentual(faseAtual)}}));
 }

 waitForJourney();
})();
