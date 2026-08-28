(()=>{
 const api=window.storyplayAPI;
 if(!api||document.getElementById('logistica-avancada'))return;
 const anchor=document.getElementById('financas-avancadas')||document.getElementById('melhor-regime-tributario')||document.getElementById('laboratorios')||document.getElementById('trilhas')||document.getElementById('empresa');
 if(!anchor)return;
 const key='storyplay-advanced-logistics';
 let saved={};
 try{saved=JSON.parse(localStorage.getItem(key)||'{}')}catch(e){saved={}}
 const section=document.createElement('section');
 section.id='logistica-avancada';
 section.className='section advanced-logistics-section';
 section.innerHTML=`
  <div class="section-head">
   <span class="eyebrow">MÓDULO AVANÇADO · LOGÍSTICA</span>
   <h2>Enxergue a operação além do estoque</h2>
   <p>Analise giro, nível de serviço, frete por pedido e dinheiro parado em estoque.</p>
  </div>
  <article class="advanced-logistics-card">
   <div class="advanced-logistics-form">
    <label><span>Vendas mensais em unidades</span><input id="advLogSales" type="number" min="0" value="800"></label>
    <label><span>Estoque médio em unidades</span><input id="advLogStock" type="number" min="0" value="600"></label>
    <label><span>Pedidos entregues no prazo</span><input id="advLogOnTime" type="number" min="0" value="92"></label>
    <label><span>Total de pedidos</span><input id="advLogOrders" type="number" min="1" value="100"></label>
    <label><span>Custo mensal de frete</span><input id="advLogFreight" type="number" min="0" value="5000"></label>
    <label><span>Valor do estoque parado</span><input id="advLogIdle" type="number" min="0" value="9000"></label>
   </div>
   <button class="btn primary" id="calcAdvLogistics" type="button">Analisar operação</button>
   <div class="advanced-logistics-result" id="advLogisticsResult"></div>
  </article>`;
 anchor.insertAdjacentElement('afterend',section);
 const nav=document.getElementById('mainNav');
 if(nav&&!nav.querySelector('a[href="#logistica-avancada"]')){
  const a=document.createElement('a');a.href='#logistica-avancada';a.textContent='Logística';nav.appendChild(a);a.addEventListener('click',()=>api.closeMenu?.());
 }
 const n=id=>Number(document.getElementById(id)?.value||0);
 const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:2});
 const pct=v=>Number(v||0).toLocaleString('pt-BR',{maximumFractionDigits:1})+'%';
 const show=html=>{const el=document.getElementById('advLogisticsResult');if(!el)return;el.innerHTML=html;el.classList.add('show')};
 const fields={advLogSales:'sales',advLogStock:'stock',advLogOnTime:'on',advLogOrders:'orders',advLogFreight:'freight',advLogIdle:'idle'};
 Object.entries(fields).forEach(([id,prop])=>{const el=document.getElementById(id);if(el&&saved?.[prop]!=null)el.value=saved[prop]});
 document.getElementById('calcAdvLogistics')?.addEventListener('click',()=>{
  const sales=n('advLogSales'),stock=n('advLogStock'),on=n('advLogOnTime'),orders=Math.max(1,n('advLogOrders')),freight=n('advLogFreight'),idle=n('advLogIdle');
  const turns=stock?sales/stock:0;
  const service=Math.min(100,on/orders*100);
  const freightPerOrder=freight/orders;
  saved={sales,stock,on,orders,freight,idle};
  localStorage.setItem(key,JSON.stringify(saved));
  const got=api.awardXP?.('advanced-logistics',20);
  show(`<strong>Leitura operacional</strong><span class="advanced-logistics-badge">${got?'+20 XP':'XP já registrado'}</span><div class="advanced-logistics-metrics"><div><span>Giro mensal do estoque</span><strong>${turns.toLocaleString('pt-BR',{maximumFractionDigits:2})}x</strong></div><div><span>Nível de serviço</span><strong>${pct(service)}</strong></div><div><span>Frete por pedido</span><strong>${money(freightPerOrder)}</strong></div><div><span>Estoque parado</span><strong>${money(idle)}</strong></div></div><p>${service<95?'Atrasos merecem investigação. ':''}${idle>freight?'Há mais dinheiro preso em estoque parado do que gasto mensalmente em frete.':'O estoque parado está abaixo do custo mensal de frete nesta simulação.'}</p>`);
 });
 if(!document.querySelector('link[href="/advanced-admin.css"]')){
  const link=document.createElement('link');link.rel='stylesheet';link.href='/advanced-admin.css';document.head.appendChild(link);
 }
 if(!document.querySelector('script[src="/advanced-admin.js"]')){
  const script=document.createElement('script');script.src='/advanced-admin.js';script.async=false;document.body.appendChild(script);
 }
})();
