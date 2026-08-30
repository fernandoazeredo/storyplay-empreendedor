(()=>{
 const api=window.storyplayAPI;if(!api||document.getElementById('planos'))return;
 const ref=document.getElementById('desempenho-estrategico')||document.getElementById('eventos-empresariais')||document.getElementById('empresa');if(!ref)return;
 const onboardingKey='storyplay-onboarding';
 const commercialKey='storyplay-commercial';
 const paymentLinks={
  monthly:'https://payment-link-v3.ton.com.br/pl_P05rwE8vbqmzQWl7U2i3ZeMkgX3pR1Yx',
  annual:'https://payment-link-v3.ton.com.br/pl_PajD6lp2kMAEo3YfNKivXgBez1yLm4YK'
 };
 const profileNames={jovem:'Jovem estudante',universitario:'Universitário / jovem empreendedor',empreendedor:'Empreendedor em planejamento',gestor:'Gestor / profissional',educador:'Professor / escola'};
 const goalNames={aprender:'Aprender empreendedorismo do zero',abrir:'Aprender como abrir uma empresa',gerir:'Aprender a administrar melhor',financas:'Entender finanças e formação de preço',simular:'Treinar decisões como gestor/CEO'};
 let profile={};
 function readProfile(){try{profile=JSON.parse(localStorage.getItem(onboardingKey)||'{}')}catch(e){profile={}}return profile}
 readProfile();
 let commercial={plan:'free',billing:'monthly',schoolInterest:false};try{commercial={...commercial,...JSON.parse(localStorage.getItem(commercialKey)||'{}')}}catch(e){}
 const plans={
  free:{name:'Explorador',price:'Grátis',tag:'Comece sem compromisso',features:['Episódios introdutórios','Empresa Virtual básica','Quizzes e progresso local','Laboratórios selecionados','Modo claro/escuro']},
  premium:{name:'Empreendedor',price:'A partir de R$ 29,90/mês',tag:'Experiência completa',features:['Todas as trilhas e laboratórios','Eventos CEO e desafios mensais','DRE, preço, caixa e capital de giro','Desempenho estratégico completo','Histórico ampliado e conquistas','Acesso Premium durante a vigência do plano']},
  school:{name:'Escolas & Turmas',price:'Sob consulta',tag:'Para educação e projetos',features:['Perfis aluno e professor','Turmas e acompanhamento de progresso','Conteúdo por trilha','Relatórios educacionais','Gestão institucional','Licenciamento por alunos/turmas']}
 };
 const section=document.createElement('section');section.id='planos';section.className='section commercial-section';section.innerHTML=`
 <div class="section-head"><span class="eyebrow">PLANOS E ACESSO</span><h2>Escolha como quer aprender</h2><p>Comece gratuitamente ou assine o plano Empreendedor. O pagamento é realizado em ambiente externo seguro da Ton/Stone.</p></div>
 <div class="plan-grid">
  <article class="plan-card" data-plan-card="free"><div class="plan-top"><span class="plan-badge">${plans.free.tag}</span><h3>${plans.free.name}</h3><strong>${plans.free.price}</strong></div><ul>${plans.free.features.map(f=>`<li>✓ ${f}</li>`).join('')}</ul><button type="button" class="btn secondary choose-plan" data-plan="free">Usar grátis</button></article>
  <article class="plan-card featured" data-plan-card="premium"><div class="plan-top"><span class="plan-badge">${plans.premium.tag}</span><h3>${plans.premium.name}</h3><strong>${plans.premium.price}</strong></div><ul>${plans.premium.features.map(f=>`<li>✓ ${f}</li>`).join('')}</ul><div class="payment-options"><a class="btn primary payment-link" data-billing="monthly" href="${paymentLinks.monthly}" target="_blank" rel="noopener noreferrer">Assinar mensal · R$ 29,90</a><a class="btn secondary payment-link" data-billing="annual" href="${paymentLinks.annual}" target="_blank" rel="noopener noreferrer">Assinar anual · R$ 299,00</a><small>Plano anual: melhor custo-benefício.</small></div></article>
  <article class="plan-card" data-plan-card="school"><div class="plan-top"><span class="plan-badge">${plans.school.tag}</span><h3>${plans.school.name}</h3><strong>${plans.school.price}</strong></div><ul>${plans.school.features.map(f=>`<li>✓ ${f}</li>`).join('')}</ul><button type="button" class="btn secondary choose-plan" data-plan="school">Tenho interesse</button></article>
 </div>
 <div class="commercial-dashboard">
  <article><span>Plano atual</span><strong id="commercialPlan">Explorador</strong><small id="commercialStatus">Acesso gratuito</small></article>
  <article><span>Perfil</span><strong id="commercialProfile">Não definido</strong><small id="commercialGoal">Complete o onboarding</small></article>
  <article><span>Acesso Premium</span><strong id="premiumAccessStatus">Não liberado</strong><small id="premiumAccessDetail">Assinatura ou convite de teste necessário</small></article>
 </div>
 <div class="access-map"><div><span class="access-icon">🟢</span><div><h3>Conteúdo gratuito</h3><p>Entrada, onboarding, Episódio 1, parte da Empresa Virtual e atividades introdutórias.</p></div></div><div><span class="access-icon">⭐</span><div><h3>Conteúdo Premium</h3><p>Trilhas completas, laboratórios, Eventos CEO, desafios avançados, relatórios e recursos adicionais.</p></div></div><div><span class="access-icon">🏫</span><div><h3>Escolas e organizações</h3><p>Perfis de professor e aluno, turmas, acompanhamento e licenciamento institucional.</p></div></div></div>
 <div class="commercial-note"><strong>Pagamento:</strong> os botões mensal e anual abrem o checkout externo Ton/Stone. A liberação automática do Premium dependerá da camada de autenticação e controle de acesso do StoryPlay.</div>`;
 ref.insertAdjacentElement('afterend',section);
 const nav=document.getElementById('mainNav');if(nav&&!nav.querySelector('a[href="#planos"]')){const a=document.createElement('a');a.href='#planos';a.textContent='Planos';nav.appendChild(a);a.addEventListener('click',()=>api.closeMenu?.())}
 const save=()=>localStorage.setItem(commercialKey,JSON.stringify(commercial));
 function profileLabel(){return profileNames[profile.profile]||'Não definido'}
 function goalLabel(){return goalNames[profile.goal]||'Complete o onboarding'}
 function render(){readProfile();const plan=plans[commercial.plan]||plans.free;document.getElementById('commercialPlan').textContent=plan.name;document.getElementById('commercialStatus').textContent=commercial.plan==='school'?'Interesse institucional registrado':commercial.plan==='premium'?'Aguardando validação de acesso':'Acesso gratuito';document.getElementById('commercialProfile').textContent=profileLabel();document.getElementById('commercialGoal').textContent=goalLabel();document.querySelectorAll('[data-plan-card]').forEach(card=>card.classList.toggle('active',card.dataset.planCard===commercial.plan));document.querySelectorAll('.choose-plan').forEach(btn=>{const selected=btn.dataset.plan===commercial.plan;btn.textContent=selected?(btn.dataset.plan==='school'?'Interesse registrado':'Plano atual'):(btn.dataset.plan==='school'?'Tenho interesse':'Usar grátis')})}
 document.querySelectorAll('.choose-plan').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.plan;if(!plans[id])return;commercial.plan=id;if(id==='school')commercial.schoolInterest=true;save();render();api.setAchievement?.('commercialPlanViewed',true);api.updateMetrics?.({lastActivity:id==='school'?'Interesse em plano institucional':'Plano selecionado: '+plans[id].name})}));
 document.querySelectorAll('.payment-link').forEach(link=>link.addEventListener('click',()=>{commercial.plan='premium';commercial.billing=link.dataset.billing||'monthly';save();render();api.setAchievement?.('commercialPlanViewed',true);api.updateMetrics?.({lastActivity:'Checkout '+commercial.billing+' aberto'})}));
 window.addEventListener('storyplay:profilechange',render);
 window.addEventListener('storyplay:statechange',render);
 window.addEventListener('storyplay:accesschange',event=>{const detail=event.detail||{};const status=document.getElementById('premiumAccessStatus'),small=document.getElementById('premiumAccessDetail');if(!status||!small)return;if(detail.isAdmin){status.textContent='Administrador';small.textContent='Acesso integral';return}if(detail.active){status.textContent=detail.source==='trial'?'Teste liberado':'Premium ativo';small.textContent=detail.expiresAt?`Válido até ${new Date(detail.expiresAt).toLocaleDateString('pt-BR')}`:'Acesso liberado';}else{status.textContent='Não liberado';small.textContent=detail.expired?'Período de teste encerrado':'Assinatura ou convite de teste necessário';}});
 window.addEventListener('storage',e=>{if(e.key===onboardingKey||e.key===commercialKey)render()});
 render();
})();