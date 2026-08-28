(()=>{
 const api=window.storyplayAPI;
 if(!api||document.getElementById('financas-avancadas'))return;
 const anchor=document.getElementById('melhor-regime-tributario')||document.getElementById('laboratorios')||document.getElementById('trilhas')||document.getElementById('empresa');
 if(!anchor)return;
 const key='storyplay-advanced-finance';
 let saved={};
 try{saved=JSON.parse(localStorage.getItem(key)||'{}')}catch(e){saved={}}
 const section=document.createElement('section');
 section.id='financas-avancadas';
 section.className='section advanced-finance-section';
 section.innerHTML=`
  <div class="section-head">
   <span class="eyebrow">MÓDULO AVANÇADO · FINANÇAS</span>
   <h2>Pense como gestor financeiro</h2>
   <p>Simule resultado mensal, margem, capital de giro e o impacto de crescer 10% nas vendas.</p>
  </div>
  <article class="advanced-finance-card">
   <div class="advanced-finance-form">
    <label><span>Receita mensal</span><input id="advFinRevenue" type="number" min="0" value="50000"></label>
    <label><span>Custos variáveis</span><input id="advFinVariable" type="number" min="0" value="22000"></label>
    <label><span>Custos fixos</span><input id="advFinFixed" type="number" min="0" value="15000"></label>
    <label><span>Prazo médio para receber (dias)</span><input id="advFinReceive" type="number" min="0" value="30"></label>
    <label><span>Prazo médio para pagar (dias)</span><input id="advFinPay" type="number" min="0" value="20"></label>
    <label><span>Estoque médio</span><input id="advFinStock" type="number" min="0" value="12000"></label>
   </div>
   <button class="btn primary" id="calcAdvFinance" type="button">Calcular visão financeira</button>
   <div class="advanced-finance-result" id="advFinanceResult"></div>
  </article>`;
 anchor.insertAdjacentElement('afterend',section);
 const nav=document.getElementById('mainNav');
 if(nav&&!nav.querySelector('a[href="#financas-avancadas"]')){
  const a=document.createElement('a');a.href='#financas-avancadas';a.textContent='Finanças';nav.appendChild(a);a.addEventListener('click',()=>api.closeMenu?.());
 }
 const n=id=>Number(document.getElementById(id)?.value||0);
 const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:2});
 const pct=v=>Number(v||0).toLocaleString('pt-BR',{maximumFractionDigits:1})+'%';
 const show=html=>{const el=document.getElementById('advFinanceResult');if(!el)return;el.innerHTML=html;el.classList.add('show')};
 const inputs=['advFinRevenue','advFinVariable','advFinFixed','advFinReceive','advFinPay','advFinStock'];
 if(saved&&typeof saved==='object')inputs.forEach(id=>{const el=document.getElementById(id);const prop={advFinRevenue:'rev',advFinVariable:'variable',advFinFixed:'fixed',advFinReceive:'receive',advFinPay:'pay',advFinStock:'stock'}[id];if(el&&saved[prop]!=null)el.value=saved[prop]});
 document.getElementById('calcAdvFinance')?.addEventListener('click',()=>{
  const rev=n('advFinRevenue'),variable=n('advFinVariable'),fixed=n('advFinFixed'),receive=n('advFinReceive'),pay=n('advFinPay'),stock=n('advFinStock');
  if(rev<=0){show('Informe uma receita mensal maior que zero.');return}
  const profit=rev-variable-fixed;
  const margin=profit/rev*100;
  const receivables=rev/30*receive;
  const payables=(variable+fixed)/30*pay;
  const working=Math.max(0,receivables+stock-payables);
  const growth10=rev*1.1;
  const extraProfit=growth10-variable*1.1-fixed;
  saved={rev,variable,fixed,receive,pay,stock,profit,working};
  localStorage.setItem(key,JSON.stringify(saved));
  const got=api.awardXP?.('advanced-finance',20);
  show(`<strong>Visão gerencial</strong><span class="advanced-finance-badge">${got?'+20 XP':'XP já registrado'}</span><div class="advanced-finance-metrics"><div><span>Resultado mensal</span><strong>${money(profit)}</strong></div><div><span>Margem</span><strong>${pct(margin)}</strong></div><div><span>Capital de giro estimado</span><strong>${money(working)}</strong></div><div><span>Resultado com +10% de vendas</span><strong>${money(extraProfit)}</strong></div></div><p>${working>profit*2?'Seu capital de giro exige atenção: crescer pode consumir caixa antes de gerar resultado.':'A necessidade de capital de giro está relativamente controlada nesta simulação.'}</p>`);
 });
})();
