(()=>{
 const api=window.storyplayAPI;if(!api||document.getElementById('planos'))return;
 const ref=document.getElementById('desempenho')||document.getElementById('eventos-empresariais')||document.getElementById('empresa');if(!ref)return;
 const profileKey='storyplay-profile';
 let profile={};try{profile=JSON.parse(localStorage.getItem(profileKey)||'{}')}catch(e){}
 const commercialKey='storyplay-commercial';
 let commercial={plan:'free',billing:'monthly',schoolInterest:false};try{commercial={...commercial,...JSON.parse(localStorage.getItem(commercialKey)||'{}')}catch(e){}
 const plans={
  free:{name:'Explorador',price:'Grátis',tag:'Comece sem compromisso',features:['Episódios introdutórios','Empresa Virtual básica','Quizzes e progresso local','Laboratórios selecionados','Modo claro/escuro']},
  premium:{name:'Empreendedor',price:'R$ 29,90/mês',tag:'Experiência completa',features:['Todas as trilhas e laboratórios','Eventos CEO e desafios mensais','DRE, preço, caixa e capital de giro','Desempenho estratégico completo','Histórico ampliado e conquistas','Preparado para sincronização em nuvem']},
  school:{name:'Escolas & Turmas',price:'Sob consulta',tag:'Para educação e projetos',features:['Perfis aluno e professor','Turmas e acompanhamento de progresso','Conteúdo por trilha','Relatórios educacionais','Gestão institucional','Licenciamento por alunos/turmas']}
 };
 const section=document.createElement('section');section.id='planos';section.className='section commercial-section';section.innerHTML=`
 <div class="section-head"><span class="eyebrow">PLANOS E ACESSO</span><h2>Escolha como quer aprender</h2><p>A estrutura comercial já está preparada, mas nenhuma cobrança real está ativa nesta V1. Os botões servem para simular a experiência e validar o produto.</p></div>
 <div class="plan-grid">
  ${Object.entries(plans).map(([id,p])=>`<article class="plan-card ${id==='premium'?'featured':''}" data-plan-card="${id}"><div class="plan-top"><span class="plan-badge">${p.tag}</span><h3>${p.name}</h3><strong>${p.price}</strong></div><ul>${p.features.map(f=>`<li>✓ ${f}</li>`).join('')}</ul><button type="button" class="btn ${id==='premium'?'primary':'secondary'} choose-plan" data-plan="${id}">${id==='school'?'Tenho interesse':'Selecionar plano'}</button></article>`).join('')}
 </div>
 <div class="commercial-dashboard">
  <article><span>Plano atual</span><strong id="commercialPlan">Explorador</strong><small id="commercialStatus">Modo de demonstração</small></article>
  <article><span>Perfil</span><strong id="commercialProfile">Não definido</strong><small id="commercialGoal">Complete o onboarding</small></article>
  <article><span>Sincronização</span><strong>Local</strong><small>Firebase Auth/Firestore ainda não ativados</small></article>
 </div>
 <div class="access-map"><div><span class="access-icon">🟢</span><div><h3>Conteúdo gratuito</h3><p>Entrada, onboarding, Episódio 1, parte da Empresa Virtual e atividades introdutórias.</p></div></div><div><span class="access-icon">⭐</span><div><h3>Conteúdo Premium</h3><p>Na versão comercial, poderá incluir trilhas completas, histórico, desafios avançados, relatórios e sincronização em nuvem.</p></div></div><div><span class="access-icon">🏫</span><div><h3>Escolas e organizações</h3><p>Estrutura prevista para professor, turma, alunos, acompanhamento e licenciamento institucional.</p></div></div></div>
 <div class="commercial-note"><strong>Importante:</strong> a seleção abaixo é apenas de demonstração nesta V1. Não há checkout, cobrança, cartão, assinatura ativa ou bloqueio real de conteúdo.</div>`;
 ref.insertAdjacentElement('afterend',section);
 const nav=document.getElementById('mainNav');if(nav&&!nav.querySelector('a[href="#planos"]')){const a=document.createElement('a');a.href='#planos';a.textContent='Planos';const empresa=nav.querySelector('a[href="#empresa"]');nav.appendChild(a);a.addEventListener('click',()=>api.closeMenu?.())}
 const save=()=>localStorage.setItem(commercialKey,JSON.stringify(commercial));
 function profileLabel(){const map={student:'Jovem estudante',college:'Universitário / jovem empreendedor',entrepreneur:'Empreendedor em planejamento',manager:'Gestor / profissional',teacher:'Professor / escola'};return map[profile.profile]||profile.profileLabel||'Não definido'}
 function render(){const plan=plans[commercial.plan]||plans.free;document.getElementById('commercialPlan').textContent=plan.name;document.getElementById('commercialStatus').textContent=commercial.plan==='school'?'Interesse institucional registrado':'Modo de demonstração';document.getElementById('commercialProfile').textContent=profileLabel();document.getElementById('commercialGoal').textContent=profile.goalLabel||profile.goal||'Complete o onboarding';document.querySelectorAll('[data-plan-card]').forEach(card=>card.classList.toggle('active',card.dataset.planCard===commercial.plan));document.querySelectorAll('.choose-plan').forEach(btn=>{const selected=btn.dataset.plan===commercial.plan;btn.textContent=selected?(btn.dataset.plan==='school'?'Interesse registrado':'Plano selecionado'):(btn.dataset.plan==='school'?'Tenho interesse':'Selecionar plano')})}
 document.querySelectorAll('.choose-plan').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.plan;if(!plans[id])return;commercial.plan=id;if(id==='school')commercial.schoolInterest=true;save();render();api.setAchievement?.('commercialPlanViewed',true);api.updateMetrics?.({lastActivity:id==='school'?'Interesse em plano institucional':'Plano demonstrativo selecionado: '+plans[id].name})}));
 window.addEventListener('storyplay:profilechange',e=>{profile=e.detail||{};render()});render();
})();