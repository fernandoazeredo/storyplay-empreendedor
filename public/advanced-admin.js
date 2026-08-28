(()=>{
 const api=window.storyplayAPI;
 if(!api||document.getElementById('administracao-avancada'))return;
 const anchor=document.getElementById('logistica-avancada')||document.getElementById('financas-avancadas')||document.getElementById('melhor-regime-tributario')||document.getElementById('laboratorios')||document.getElementById('trilhas')||document.getElementById('empresa');
 if(!anchor)return;
 const key='storyplay-advanced-admin';
 let saved={};
 try{saved=JSON.parse(localStorage.getItem(key)||'{}')}catch(e){saved={}}
 const section=document.createElement('section');
 section.id='administracao-avancada';
 section.className='section advanced-admin-section';
 section.innerHTML=`
  <div class="section-head">
   <span class="eyebrow">MÓDULO AVANÇADO · ADMINISTRAÇÃO</span>
   <h2>Priorize o que realmente ameaça o negócio</h2>
   <p>Treine visão gerencial com decisões de prioridade e acompanhamento de metas.</p>
  </div>
  <article class="advanced-admin-card">
   <div class="advanced-admin-block">
    <h3>Prioridade gerencial</h3>
    <p>Você tem quatro frentes abertas. Qual deve ser tratada primeiro?</p>
    <div class="advanced-admin-options" id="advAdminOptions">
     <button type="button" data-value="site">Atualizar detalhes visuais do site</button>
     <button type="button" data-value="cash">Resolver risco de caixa para pagar fornecedores</button>
     <button type="button" data-value="report">Refazer um relatório interno atrasado</button>
     <button type="button" data-value="meeting">Agendar mais uma reunião de alinhamento</button>
    </div>
    <div class="advanced-admin-result" id="advAdminResult"></div>
   </div>
   <div class="advanced-admin-block">
    <h3>Acompanhamento de meta</h3>
    <div class="advanced-admin-form">
     <label><span>Meta mensal de receita</span><input id="advAdminGoal" type="number" min="0" value="60000"></label>
     <label><span>Receita atual</span><input id="advAdminCurrent" type="number" min="0" value="45000"></label>
    </div>
    <button class="btn secondary" id="calcAdvAdminGoal" type="button">Calcular atingimento da meta</button>
    <div class="advanced-admin-result" id="advAdminGoalResult"></div>
   </div>
  </article>`;
 anchor.insertAdjacentElement('afterend',section);
 const nav=document.getElementById('mainNav');
 if(nav&&!nav.querySelector('a[href="#administracao-avancada"]')){
  const a=document.createElement('a');a.href='#administracao-avancada';a.textContent='Administração';nav.appendChild(a);a.addEventListener('click',()=>api.closeMenu?.());
 }
 const n=id=>Number(document.getElementById(id)?.value||0);
 const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:2});
 const pct=v=>Number(v||0).toLocaleString('pt-BR',{maximumFractionDigits:1})+'%';
 const show=(id,html)=>{const el=document.getElementById(id);if(!el)return;el.innerHTML=html;el.classList.add('show')};
 const save=()=>localStorage.setItem(key,JSON.stringify(saved));
 if(saved?.goal!=null)document.getElementById('advAdminGoal').value=saved.goal;
 if(saved?.current!=null)document.getElementById('advAdminCurrent').value=saved.current;
 if(saved?.decision){const btn=document.querySelector(`#advAdminOptions button[data-value="${saved.decision}"]`);btn?.classList.add('selected')}
 document.getElementById('advAdminOptions')?.addEventListener('click',e=>{
  const b=e.target.closest('button[data-value]');if(!b)return;
  document.querySelectorAll('#advAdminOptions button').forEach(x=>x.classList.remove('selected'));
  b.classList.add('selected');
  const best=b.dataset.value==='cash';
  saved.decision=b.dataset.value;save();
  const got=api.awardXP?.('advanced-admin-risk',best?20:5);
  show('advAdminResult',`<strong>${best?'Boa prioridade.':'Prioridade fraca.'}</strong><span class="advanced-admin-badge">${got?'+'+(best?20:5)+' XP':'XP já registrado'}</span><p>${best?'Risco de caixa pode interromper a operação e deve ser tratado antes de temas de menor impacto.':'Compare urgência e impacto: problemas que ameaçam continuidade financeira ou operacional vêm primeiro.'}</p>`);
 });
 document.getElementById('calcAdvAdminGoal')?.addEventListener('click',()=>{
  const goal=n('advAdminGoal'),current=n('advAdminCurrent');
  const achieved=goal?current/goal*100:0;
  const gap=Math.max(0,goal-current);
  saved.goal=goal;saved.current=current;save();
  const got=api.awardXP?.('advanced-admin-goal',10);
  show('advAdminGoalResult',`<div class="advanced-admin-metrics"><div><span>Atingimento</span><strong>${pct(achieved)}</strong></div><div><span>Gap para a meta</span><strong>${money(gap)}</strong></div></div><p>Uma boa meta precisa de indicador, prazo, responsável e plano de ação.</p><span class="advanced-admin-badge">${got?'+10 XP':'XP já registrado'}</span>`);
 });
})();
