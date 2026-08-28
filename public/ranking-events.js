(()=>{
 const api=window.storyplayAPI;
 if(!api||document.getElementById('ranking-eventos-ceo'))return;
 const anchor=document.getElementById('eventos-empresariais');
 if(!anchor)return;
 const storageKey='storyplay-events-state';
 const labels={
  'supplier-rise':'Fornecedor e margem',
  'late-client':'Liquidez e cobrança',
  'viral-campaign':'Crescimento e capacidade',
  'stock-stuck':'Estoque e capital de giro',
  'hire-pressure':'Pessoas e capacidade',
  'competitor-price':'Preço e concorrência'
 };
 const qualityScore={good:100,mid:60,bad:20};
 const section=document.createElement('section');
 section.id='ranking-eventos-ceo';
 section.className='section ranking-events-section';
 section.innerHTML=`
  <div class="section-head"><span class="eyebrow">RANKING · EVENTOS CEO</span><h2>Como está sua tomada de decisão?</h2><p>O ranking usa somente as decisões já registradas nos Eventos CEO. Ele não concede XP, não altera métricas e não modifica sua Empresa Virtual.</p></div>
  <div class="ranking-events-grid">
   <article class="ranking-events-summary">
    <div class="ranking-events-score"><span>Índice CEO</span><strong id="rankingEventsScore">—</strong><small id="rankingEventsLevel">Sem decisões suficientes</small></div>
    <div class="ranking-events-stats">
     <div><span>Decisões</span><strong id="rankingEventsTotal">0</strong></div>
     <div><span>Estratégicas</span><strong id="rankingEventsGood">0</strong></div>
     <div><span>Intermediárias</span><strong id="rankingEventsMid">0</strong></div>
     <div><span>Arriscadas</span><strong id="rankingEventsBad">0</strong></div>
    </div>
    <p class="ranking-events-note" id="rankingEventsNote">Conclua Eventos CEO para formar seu ranking.</p>
   </article>
   <article class="ranking-events-table-card">
    <h3>Ranking por tipo de desafio</h3>
    <p>Quanto mais consistente a decisão em cada tema, maior a posição.</p>
    <div class="ranking-events-list" id="rankingEventsList"></div>
   </article>
  </div>`;
 anchor.insertAdjacentElement('afterend',section);
 const nav=document.getElementById('mainNav');
 if(nav&&!nav.querySelector('a[href="#ranking-eventos-ceo"]')){
  const a=document.createElement('a');a.href='#ranking-eventos-ceo';a.textContent='Ranking CEO';
  const ref=nav.querySelector('a[href="#eventos-empresariais"]');
  ref?.insertAdjacentElement('afterend',a);a.addEventListener('click',()=>api.closeMenu?.());
 }
 function readHistory(){
  try{const data=JSON.parse(localStorage.getItem(storageKey)||'{}');return Array.isArray(data.history)?data.history:[]}catch(e){return[]}
 }
 function level(score,count){
  if(!count)return'Sem decisões suficientes';
  if(score>=90)return'CEO Estratégico';
  if(score>=75)return'Gestor Consistente';
  if(score>=60)return'Gestor em Evolução';
  return'Gestor em Desenvolvimento';
 }
 function render(){
  const history=readHistory();
  const total=history.length;
  const good=history.filter(h=>h.quality==='good').length;
  const mid=history.filter(h=>h.quality==='mid').length;
  const bad=history.filter(h=>h.quality==='bad').length;
  const score=total?Math.round(history.reduce((sum,h)=>sum+(qualityScore[h.quality]||0),0)/total):0;
  document.getElementById('rankingEventsScore').textContent=total?score+'/100':'—';
  document.getElementById('rankingEventsLevel').textContent=level(score,total);
  document.getElementById('rankingEventsTotal').textContent=total;
  document.getElementById('rankingEventsGood').textContent=good;
  document.getElementById('rankingEventsMid').textContent=mid;
  document.getElementById('rankingEventsBad').textContent=bad;
  const note=document.getElementById('rankingEventsNote');
  note.textContent=!total?'Conclua Eventos CEO para formar seu ranking.':score>=90?'Suas decisões mostram alta consistência estratégica.':score>=75?'Você está tomando boas decisões na maior parte dos eventos.':score>=60?'Há uma base consistente, mas alguns riscos ainda podem ser reduzidos.':'Revise as consequências dos eventos e compare impacto, urgência, caixa e capacidade antes de decidir.';
  const grouped={};
  history.forEach(h=>{if(!grouped[h.id])grouped[h.id]=[];grouped[h.id].push(qualityScore[h.quality]||0)});
  const rows=Object.entries(labels).map(([id,name])=>{const vals=grouped[id]||[];const avg=vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):null;return{id,name,avg,count:vals.length}}).sort((a,b)=>{if(a.avg==null&&b.avg==null)return a.name.localeCompare(b.name,'pt-BR');if(a.avg==null)return 1;if(b.avg==null)return-1;return b.avg-a.avg||b.count-a.count});
  const box=document.getElementById('rankingEventsList');
  box.innerHTML=rows.map((r,i)=>`<div class="ranking-events-row ${r.avg==null?'empty':''}"><span class="ranking-events-position">${r.avg==null?'—':i+1}</span><div><strong>${r.name}</strong><small>${r.count?`${r.count} decisão${r.count>1?'ões':''} registrada${r.count>1?'s':''}`:'Ainda não avaliado'}</small></div><b>${r.avg==null?'—':r.avg+'/100'}</b></div>`).join('');
 }
 window.addEventListener('storyplay:eventschange',render);
 window.addEventListener('storage',e=>{if(e.key===storageKey)render()});
 document.getElementById('eventChoices')?.addEventListener('click',e=>{if(!e.target.closest('button[data-index]'))return;setTimeout(render,0)});
 render();
})();
