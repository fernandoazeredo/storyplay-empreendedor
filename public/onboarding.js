(()=>{
 const api=window.storyplayAPI;if(!api||document.getElementById('onboardingModal'))return;
 const key='storyplay-onboarding';
 const profiles={
  jovem:{icon:'🎒',label:'Jovem estudante',desc:'Quero aprender empreendedorismo do zero.',mission:'Comece pelo Episódio 1 e descubra como validar uma ideia antes de investir.',target:'#episodio1',track:'Empreendedorismo'},
  universitario:{icon:'🎓',label:'Universitário / jovem empreendedor',desc:'Quero transformar uma ideia em um negócio estruturado.',mission:'Crie sua Empresa Virtual e avance pela abertura, finanças e mercado.',target:'#empresa',track:'Abra sua Empresa'},
  empreendedor:{icon:'🚀',label:'Empreendedor em planejamento',desc:'Estou pensando em abrir ou organizar uma empresa real.',mission:'Monte a Empresa Virtual com números próximos da sua realidade e use os laboratórios.',target:'#empresa',track:'Laboratórios Empresariais'},
  gestor:{icon:'📊',label:'Gestor / profissional',desc:'Quero praticar decisões e ampliar minha visão de gestão.',mission:'Vá ao Modo CEO, simule eventos e acompanhe desempenho estratégico.',target:'#eventos-empresariais',track:'Modo CEO'},
  educador:{icon:'🏫',label:'Professor / escola',desc:'Quero explorar o conteúdo para uso educacional.',mission:'Percorra a jornada, os quizzes e os laboratórios como demonstração pedagógica.',target:'#jornada',track:'Jornada completa'}
 };
 const goals={
  aprender:'Aprender empreendedorismo do zero',
  abrir:'Aprender como abrir uma empresa',
  gerir:'Aprender a administrar melhor',
  financas:'Entender finanças e formação de preço',
  simular:'Treinar decisões como gestor/CEO'
 };
 let data={profile:'',goal:'',name:'',completed:false};
 try{data={...data,...JSON.parse(localStorage.getItem(key)||'{}')}}catch(e){}
 const overlay=document.createElement('div');overlay.id='onboardingModal';overlay.className='onboarding-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-labelledby','onboardingTitle');
 overlay.innerHTML=`<div class="onboarding-shell">
  <button type="button" class="onboarding-close" id="onboardingClose" aria-label="Fechar apresentação">×</button>
  <div class="onboarding-brand"><span>🚀</span><div><strong>StoryPlay Empreendedor</strong><small>Abra Sua Empresa</small></div></div>
  <div class="onboarding-progress"><i id="onboardingBar"></i></div>
  <section class="onboarding-step active" data-step="1"><span class="onboarding-kicker">BEM-VINDO</span><h2 id="onboardingTitle">Sua jornada começa pelo seu objetivo</h2><p>Em menos de um minuto, vamos indicar o melhor ponto de partida. Você poderá mudar isso depois.</p><label class="onboarding-name"><span>Como quer ser chamado? <small>(opcional)</small></span><input id="onboardingName" maxlength="30" placeholder="Seu primeiro nome"></label><div class="onboarding-actions"><button type="button" class="btn primary" data-next="2">Continuar</button></div></section>
  <section class="onboarding-step" data-step="2"><span class="onboarding-kicker">SEU MOMENTO</span><h2>Qual perfil combina mais com você?</h2><p>Isso só personaliza recomendações. Não limita nenhum conteúdo.</p><div class="profile-options" id="profileOptions">${Object.entries(profiles).map(([id,p])=>`<button type="button" data-profile="${id}"><span>${p.icon}</span><strong>${p.label}</strong><small>${p.desc}</small></button>`).join('')}</div><div class="onboarding-actions"><button type="button" class="btn ghost" data-back="1">Voltar</button><button type="button" class="btn primary" data-next="3" id="profileNext" disabled>Continuar</button></div></section>
  <section class="onboarding-step" data-step="3"><span class="onboarding-kicker">SEU OBJETIVO</span><h2>O que você quer conquistar primeiro?</h2><div class="goal-options" id="goalOptions">${Object.entries(goals).map(([id,label])=>`<button type="button" data-goal="${id}">${label}</button>`).join('')}</div><div class="onboarding-actions"><button type="button" class="btn ghost" data-back="2">Voltar</button><button type="button" class="btn primary" data-next="4" id="goalNext" disabled>Ver minha trilha</button></div></section>
  <section class="onboarding-step" data-step="4"><span class="onboarding-kicker">TRILHA RECOMENDADA</span><div class="recommendation-card"><span id="recommendIcon">🚀</span><div><small>Comece por</small><h2 id="recommendTrack">Empreendedorismo</h2><p id="recommendMission">Valide uma ideia antes de investir.</p></div></div><div class="recommend-summary"><div><span>Perfil</span><strong id="recommendProfile">—</strong></div><div><span>Objetivo</span><strong id="recommendGoal">—</strong></div></div><div class="onboarding-actions"><button type="button" class="btn ghost" data-back="3">Ajustar escolhas</button><button type="button" class="btn primary" id="startJourney">Começar minha jornada</button></div></section>
 </div>`;
 document.body.appendChild(overlay);
 const steps=[...overlay.querySelectorAll('.onboarding-step')];
 function go(step){steps.forEach(s=>s.classList.toggle('active',Number(s.dataset.step)===step));document.getElementById('onboardingBar').style.width=(step/4*100)+'%';if(step===4)renderRecommendation()}
 function save(){localStorage.setItem(key,JSON.stringify(data))}
 function renderRecommendation(){const p=profiles[data.profile]||profiles.jovem;document.getElementById('recommendIcon').textContent=p.icon;document.getElementById('recommendTrack').textContent=p.track;document.getElementById('recommendMission').textContent=p.mission;document.getElementById('recommendProfile').textContent=p.label;document.getElementById('recommendGoal').textContent=goals[data.goal]||'Explorar o aplicativo'}
 function open(){overlay.classList.add('show');document.body.classList.add('onboarding-open');go(data.completed?4:1);if(data.name)document.getElementById('onboardingName').value=data.name;if(data.profile){overlay.querySelector(`[data-profile="${data.profile}"]`)?.classList.add('selected');document.getElementById('profileNext').disabled=false}if(data.goal){overlay.querySelector(`[data-goal="${data.goal}"]`)?.classList.add('selected');document.getElementById('goalNext').disabled=false}}
 function close(){overlay.classList.remove('show');document.body.classList.remove('onboarding-open')}
 overlay.addEventListener('click',e=>{const next=e.target.closest('[data-next]');const back=e.target.closest('[data-back]');if(next){if(Number(next.dataset.next)===2)data.name=document.getElementById('onboardingName').value.trim();go(Number(next.dataset.next))}if(back)go(Number(back.dataset.back))});
 document.getElementById('profileOptions').addEventListener('click',e=>{const b=e.target.closest('[data-profile]');if(!b)return;data.profile=b.dataset.profile;document.querySelectorAll('[data-profile]').forEach(x=>x.classList.toggle('selected',x===b));document.getElementById('profileNext').disabled=false});
 document.getElementById('goalOptions').addEventListener('click',e=>{const b=e.target.closest('[data-goal]');if(!b)return;data.goal=b.dataset.goal;document.querySelectorAll('[data-goal]').forEach(x=>x.classList.toggle('selected',x===b));document.getElementById('goalNext').disabled=false});
 document.getElementById('startJourney').addEventListener('click',()=>{data.name=document.getElementById('onboardingName').value.trim()||data.name;data.completed=true;save();api.setAchievement?.('onboardingCompleted',true);api.updateMetrics?.({lastActivity:'Onboarding concluído'});const p=profiles[data.profile]||profiles.jovem;close();setTimeout(()=>document.querySelector(p.target)?.scrollIntoView({behavior:'smooth',block:'start'}),120)});
 document.getElementById('onboardingClose').addEventListener('click',close);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('show'))close()});
 const nav=document.getElementById('mainNav');if(nav&&!nav.querySelector('[data-open-onboarding]')){const a=document.createElement('a');a.href='#';a.dataset.openOnboarding='true';a.textContent='Meu Perfil';a.addEventListener('click',e=>{e.preventDefault();api.closeMenu?.();open()});nav.appendChild(a)}
 const hero=document.querySelector('.hero-copy');if(hero&&!document.getElementById('personalGreeting')){const greeting=document.createElement('p');greeting.id='personalGreeting';greeting.className='personal-greeting';hero.insertBefore(greeting,hero.querySelector('.actions'));function renderGreeting(){if(!data.completed){greeting.hidden=true;return}const p=profiles[data.profile]||profiles.jovem;greeting.hidden=false;greeting.innerHTML=`<strong>${data.name?`Olá, ${escapeText(data.name)}! `:''}${p.icon} ${p.label}</strong><span>${p.mission}</span>`}renderGreeting()}
 function escapeText(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
 if(!data.completed)setTimeout(open,350);
})();