(()=>{
 const api=window.storyplayAPI;
 if(!api||document.getElementById('marketing-vendas-avancado'))return;
 const anchor=document.getElementById('pessoas-avancado')||document.getElementById('administracao-avancada')||document.getElementById('logistica-avancada')||document.getElementById('financas-avancadas')||document.getElementById('melhor-regime-tributario')||document.getElementById('laboratorios')||document.getElementById('trilhas')||document.getElementById('empresa');
 if(!anchor)return;
 const key='storyplay-advanced-marketing';
 let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')}catch(e){saved={}}
 const section=document.createElement('section');section.id='marketing-vendas-avancado';section.className='section advanced-marketing-section';section.innerHTML=`
  <div class="section-head"><span class="eyebrow">MÓDULO AVANÇADO · MARKETING E VENDAS</span><h2>Entenda o funil e comunique valor</h2><p>Meça conversão, aquisição, recompra e retorno comercial, depois pratique uma proposta de valor clara.</p></div>
  <article class="advanced-marketing-card">
   <div class="advanced-marketing-block"><h3>Funil comercial</h3><div class="advanced-marketing-form">
    <label><span>Visitantes</span><input id="advMktVisits" type="number" min="0" value="10000"></label>
    <label><span>Leads</span><input id="advMktLeads" type="number" min="0" value="800"></label>
    <label><span>Vendas</span><input id="advMktSales" type="number" min="0" value="120"></label>
    <label><span>Clientes que compraram novamente</span><input id="advMktRepeat" type="number" min="0" value="36"></label>
    <label><span>Investimento comercial</span><input id="advMktSpend" type="number" min="0" value="6000"></label>
    <label><span>Receita gerada</span><input id="advMktRevenue" type="number" min="0" value="30000"></label>
   </div><button class="btn primary" id="calcAdvMarketing" type="button">Analisar funil completo</button><div class="advanced-marketing-result" id="advMarketingResult"></div></div>
   <div class="advanced-marketing-block"><h3>Proposta de valor</h3><p>Qual frase representa melhor uma proposta de valor?</p><div class="advanced-marketing-options" id="advValueOptions">
    <button type="button" data-value="generic">Somos uma empresa inovadora e comprometida</button>
    <button type="button" data-value="discount">Temos sempre o menor preço</button>
    <button type="button" data-value="value">Ajudamos pequenos lojistas a reduzir rupturas de estoque com reposição simples e previsível</button>
   </div><div class="advanced-marketing-result" id="advValueResult"></div></div>
  </article>`;
 anchor.insertAdjacentElement('afterend',section);
 const nav=document.getElementById('mainNav');if(nav&&!nav.querySelector('a[href="#marketing-vendas-avancado"]')){const a=document.createElement('a');a.href='#marketing-vendas-avancado';a.textContent='Marketing e Vendas';nav.appendChild(a);a.addEventListener('click',()=>api.closeMenu?.())}
 const n=id=>Number(document.getElementById(id)?.value||0);const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:2});const pct=v=>Number(v||0).toLocaleString('pt-BR',{maximumFractionDigits:1})+'%';
 const show=(id,html)=>{const el=document.getElementById(id);if(!el)return;el.innerHTML=html;el.classList.add('show')};const save=()=>localStorage.setItem(key,JSON.stringify(saved));
 const fields={advMktVisits:'visits',advMktLeads:'leads',advMktSales:'sales',advMktRepeat:'repeat',advMktSpend:'spend',advMktRevenue:'revenue'};Object.entries(fields).forEach(([id,prop])=>{const el=document.getElementById(id);if(el&&saved?.[prop]!=null)el.value=saved[prop]});
 if(saved?.valueProposition){document.querySelector(`#advValueOptions button[data-value="${saved.valueProposition}"]`)?.classList.add('selected')}
 document.getElementById('calcAdvMarketing')?.addEventListener('click',()=>{const visits=n('advMktVisits'),leads=n('advMktLeads'),sales=n('advMktSales'),repeat=n('advMktRepeat'),spend=n('advMktSpend'),revenue=n('advMktRevenue');const leadRate=visits?leads/visits*100:0,saleRate=leads?sales/leads*100:0,repeatRate=sales?repeat/sales*100:0,cac=sales?spend/sales:0,roas=spend?revenue/spend:0;saved.visits=visits;saved.leads=leads;saved.sales=sales;saved.repeat=repeat;saved.spend=spend;saved.revenue=revenue;save();const got=api.awardXP?.('advanced-marketing-funnel',20);show('advMarketingResult',`<strong>Funil completo</strong><span class="advanced-marketing-badge">${got?'+20 XP':'XP já registrado'}</span><div class="advanced-marketing-metrics"><div><span>Visitante → lead</span><strong>${pct(leadRate)}</strong></div><div><span>Lead → venda</span><strong>${pct(saleRate)}</strong></div><div><span>Recompra</span><strong>${pct(repeatRate)}</strong></div><div><span>CAC</span><strong>${money(cac)}</strong></div><div><span>ROAS</span><strong>${roas.toLocaleString('pt-BR',{maximumFractionDigits:2})}x</strong></div></div><p>O funil não termina na primeira venda. Recompra e fidelização reduzem dependência de aquisição contínua.</p>`)});
 document.getElementById('advValueOptions')?.addEventListener('click',e=>{const b=e.target.closest('button[data-value]');if(!b)return;document.querySelectorAll('#advValueOptions button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');const best=b.dataset.value==='value';saved.valueProposition=b.dataset.value;save();const got=api.awardXP?.('advanced-marketing-value',best?15:3);show('advValueResult',`<strong>${best?'Boa proposta de valor.':'Mensagem fraca.'}</strong><span class="advanced-marketing-badge">${got?'+'+(best?15:3)+' XP':'XP já registrado'}</span><p>${best?'Ela define público, problema e benefício concreto.':'Uma proposta de valor precisa dizer para quem você resolve qual problema e qual benefício entrega.'}</p>`)});
})();
