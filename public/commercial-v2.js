(()=>{
  const api=window.storyplayAPI;
  if(!api || document.getElementById('planos')) return;
  const ref=document.getElementById('desempenho-estrategico')||document.getElementById('eventos-empresariais')||document.getElementById('empresa');
  if(!ref) return;
  const onboardingKey='storyplay-onboarding';
  const commercialKey='storyplay-commercial';
  const profileNames={jovem:'Jovem estudante',universitario:'Universitário / jovem empreendedor',empreendedor:'Empreendedor em planejamento',gestor:'Gestor / profissional',educador:'Professor / escola'};
  const goalNames={aprender:'Aprender empreendedorismo do zero',abrir:'Aprender como abrir uma empresa',gerir:'Aprender a administrar melhor',financas:'Entender finanças e formação de preço',simular:'Treinar decisões como gestor/CEO'};
  let profile={};
  function readProfile(){
    try { profile=JSON.parse(localStorage.getItem(onboardingKey)||'{}'); }
    catch (e) { profile={}; }
    return profile;
  }
  readProfile();
  let commercial={plan:'free',billing:'monthly',schoolInterest:false};
  try {
    const saved=JSON.parse(localStorage.getItem(commercialKey)||'{}');
    commercial={...commercial,...saved};
  } catch (e) {
    commercial={plan:'free',billing:'monthly',schoolInterest:false};
  }
  const plans={
    free:{name:'Explorador',price:'Grátis',tag:'Comece sem compromisso',features:['Episódios introdutórios','Empresa Virtual básica','Quizzes e progresso local','Laboratórios selecionados','Modo claro/escuro']},
    premium:{name:'Empreendedor',price:'R$ 29,90/mês',tag:'Experiência completa',features:['Todas as trilhas e laboratórios','Eventos CEO e desafios mensais','DRE, preço, caixa e capital de giro','Desempenho estratégico completo','Histórico ampliado e conquistas','Preparado para sincronização em nuvem']},
    school:{name:'Escolas & Turmas',price:'Sob consulta',tag:'Para educação e projetos',features:['Perfis aluno e professor','Turmas e acompanhamento de progresso','Conteúdo por trilha','Relatórios educacionais','Gestão institucional','Licenciamento por alunos/turmas']}
  };
  const section=document.createElement('section');section.id='planos';section.className='section commercial-section';
  section.innerHTML=`<div class="section-head"><span class="eyebrow">PLANOS E ACESSO</span><h2>Escolha como quer aprender</h2><p>A estrutura comercial já está preparada, mas nenhuma cobrança real está ativa nesta V1.</p></div><div class="plan-grid">${Object.entries(plans).map(([id,p])=>`<article class="plan-card ${id==='premium'?'featured':''}" data-plan-card="${id}"><div class="plan-top"><span class="plan-badge">${p.tag}</span><h3>${p.name}</h3><strong>${p.price}</strong></div><ul>${p.features.map(f=>`<li>✓ ${f}</li>`).join('')}</ul><button type="button" class="btn ${id==='premium'?'primary':'secondary'} choose-plan" data-plan="${id}">${id==='school'?'Tenho interesse':'Selecionar plano'}</button></article>`).join('')}</div><div class="commercial-dashboard"><article><span>Plano atual</span><strong id="commercialPlan">Explorador</strong><small id="commercialStatus">Modo de demonstração</small></article><article><span>Perfil</span><strong id="commercialProfile">Não definido</strong><small id="commercialGoal">Complete o onboarding</small></article><article><span>Sincronização</span><strong>Local</strong><small>Firebase Auth/Firestore ainda não ativados</small></article></div><div class="commercial-note"><strong>Importante:</strong> esta seleção é apenas de demonstração. Não há checkout, cobrança, cartão ou assinatura ativa.</div>`;
  ref.insertAdjacentElement('afterend',section);
  const nav=document.getElementById('mainNav');
  if(nav && !nav.querySelector('a[href="#planos"]')){const a=document.createElement('a');a.href='#planos';a.textContent='Planos';nav.appendChild(a);a.addEventListener('click',()=>api.closeMenu?.());}
  const save=()=>localStorage.setItem(commercialKey,JSON.stringify(commercial));
  const profileLabel=()=>profileNames[profile.profile]||'Não definido';
  const goalLabel=()=>goalNames[profile.goal]||'Complete o onboarding';
  function render(){
    readProfile();
    const plan=plans[commercial.plan]||plans.free;
    document.getElementById('commercialPlan').textContent=plan.name;
    document.getElementById('commercialStatus').textContent=commercial.plan==='school'?'Interesse institucional registrado':'Modo de demonstração';
    document.getElementById('commercialProfile').textContent=profileLabel();
    document.getElementById('commercialGoal').textContent=goalLabel();
    document.querySelectorAll('[data-plan-card]').forEach(card=>card.classList.toggle('active',card.dataset.planCard===commercial.plan));
    document.querySelectorAll('.choose-plan').forEach(btn=>{const selected=btn.dataset.plan===commercial.plan;btn.textContent=selected?(btn.dataset.plan==='school'?'Interesse registrado':'Plano selecionado'):(btn.dataset.plan==='school'?'Tenho interesse':'Selecionar plano');});
  }
  document.querySelectorAll('.choose-plan').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.plan;if(!plans[id])return;commercial.plan=id;if(id==='school')commercial.schoolInterest=true;save();render();api.setAchievement?.('commercialPlanViewed',true);api.updateMetrics?.({lastActivity:id==='school'?'Interesse em plano institucional':'Plano demonstrativo selecionado: '+plans[id].name});}));
  window.addEventListener('storyplay:profilechange',render);
  window.addEventListener('storyplay:statechange',render);
  window.addEventListener('storage',e=>{if(e.key===onboardingKey||e.key===commercialKey)render();});
  render();
})();
