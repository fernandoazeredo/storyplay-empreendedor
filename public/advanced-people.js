(()=>{
 const api=window.storyplayAPI;
 if(!api||document.getElementById('pessoas-avancado'))return;
 const anchor=document.getElementById('administracao-avancada')||document.getElementById('logistica-avancada')||document.getElementById('financas-avancadas')||document.getElementById('melhor-regime-tributario')||document.getElementById('laboratorios')||document.getElementById('trilhas')||document.getElementById('empresa');
 if(!anchor)return;
 const key='storyplay-advanced-people';
 let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')}catch(e){saved={}}
 const section=document.createElement('section');section.id='pessoas-avancado';section.className='section advanced-people-section';section.innerHTML=`
  <div class="section-head"><span class="eyebrow">MÓDULO AVANÇADO · PESSOAS</span><h2>Contrate e desenvolva com visão de gestão</h2><p>Simule o custo de uma contratação e pratique uma decisão de feedback responsável.</p></div>
  <article class="advanced-people-card">
   <div class="advanced-people-block"><h3>Avaliação de contratação</h3><div class="advanced-people-form">
    <label><span>Salário mensal</span><input id="advPeopleSalary" type="number" min="0" value="3000"></label>
    <label><span>Encargos/benefícios estimados (%)</span><input id="advPeopleBurden" type="number" min="0" value="65"></label>
    <label><span>Receita adicional esperada</span><input id="advPeopleRevenue" type="number" min="0" value="9000"></label>
    <label><span>Produtividade atual da equipe (%)</span><input id="advPeopleProductivity" type="number" min="0" max="100" value="75"></label>
   </div><button class="btn primary" id="calcAdvPeople" type="button">Avaliar contratação</button><div class="advanced-people-result" id="advPeopleResult"></div></div>
   <div class="advanced-people-block"><h3>Decisão de liderança</h3><p>Um colaborador cometeu o mesmo erro três vezes. Qual é a melhor primeira resposta?</p><div class="advanced-people-options" id="advFeedbackOptions">
    <button type="button" data-value="punish">Aplicar punição sem conversar</button>
    <button type="button" data-value="ignore">Ignorar porque a equipe está corrida</button>
    <button type="button" data-value="coach">Dar feedback específico, entender a causa e combinar um plano de correção</button>
   </div><div class="advanced-people-result" id="advFeedbackResult"></div></div>
  </article>`;
 anchor.insertAdjacentElement('afterend',section);
 const nav=document.getElementById('mainNav');if(nav&&!nav.querySelector('a[href="#pessoas-avancado"]')){const a=document.createElement('a');a.href='#pessoas-avancado';a.textContent='Pessoas';nav.appendChild(a);a.addEventListener('click',()=>api.closeMenu?.())}
 const n=id=>Number(document.getElementById(id)?.value||0);const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:2});const pct=v=>Number(v||0).toLocaleString('pt-BR',{maximumFractionDigits:1})+'%';
 const show=(id,html)=>{const el=document.getElementById(id);if(!el)return;el.innerHTML=html;el.classList.add('show')};const save=()=>localStorage.setItem(key,JSON.stringify(saved));
 const fields={advPeopleSalary:'salary',advPeopleBurden:'burden',advPeopleRevenue:'extra',advPeopleProductivity:'prod'};Object.entries(fields).forEach(([id,prop])=>{const el=document.getElementById(id);if(el&&saved?.[prop]!=null)el.value=saved[prop]});
 if(saved?.feedback){document.querySelector(`#advFeedbackOptions button[data-value="${saved.feedback}"]`)?.classList.add('selected')}
 document.getElementById('calcAdvPeople')?.addEventListener('click',()=>{const salary=n('advPeopleSalary'),burden=n('advPeopleBurden'),extra=n('advPeopleRevenue'),prod=n('advPeopleProductivity');const total=salary*(1+burden/100),net=extra-total;saved.salary=salary;saved.burden=burden;saved.extra=extra;saved.prod=prod;save();const got=api.awardXP?.('advanced-people-cost',20);show('advPeopleResult',`<strong>Decisão de contratação</strong><span class="advanced-people-badge">${got?'+20 XP':'XP já registrado'}</span><div class="advanced-people-metrics"><div><span>Custo mensal estimado</span><strong>${money(total)}</strong></div><div><span>Receita adicional esperada</span><strong>${money(extra)}</strong></div><div><span>Contribuição após custo</span><strong>${money(net)}</strong></div><div><span>Produtividade atual</span><strong>${pct(prod)}</strong></div></div><p>${net>0?'A contratação pode se pagar na hipótese informada, mas confirme capacidade, demanda e prazo de adaptação.':'A receita adicional informada não cobre o custo estimado da contratação.'}</p>`)});
 document.getElementById('advFeedbackOptions')?.addEventListener('click',e=>{const b=e.target.closest('button[data-value]');if(!b)return;document.querySelectorAll('#advFeedbackOptions button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');const best=b.dataset.value==='coach';saved.feedback=b.dataset.value;save();const got=api.awardXP?.('advanced-people-feedback',best?15:3);show('advFeedbackResult',`<strong>${best?'Feedback de desenvolvimento.':'Resposta inadequada ou incompleta.'}</strong><span class="advanced-people-badge">${got?'+'+(best?15:3)+' XP':'XP já registrado'}</span><p>${best?'Feedback eficaz descreve comportamento, impacto, escuta a causa e combina o próximo passo.':'Punir ou ignorar sem entender a causa reduz aprendizado e pode fazer o erro se repetir.'}</p>`)});
 if(!document.querySelector('link[href="/advanced-marketing.css"]')){
  const link=document.createElement('link');link.rel='stylesheet';link.href='/advanced-marketing.css';document.head.appendChild(link);
 }
 if(!document.querySelector('script[src="/advanced-marketing.js"]')){
  const script=document.createElement('script');script.src='/advanced-marketing.js';script.async=false;document.body.appendChild(script);
 }
})();
