(()=>{
 const api=window.storyplayAPI;if(!api||document.getElementById('eventos-empresariais'))return;
 const monthly=document.getElementById('gestao-mensal')||document.getElementById('saude-empresa')||document.getElementById('empresa');if(!monthly)return;
 const storageKey='storyplay-events-state';
 let eventState={current:null,history:[]};
 try{eventState={...eventState,...JSON.parse(localStorage.getItem(storageKey)||'{}')}}catch(e){}
 if(!Array.isArray(eventState.history))eventState.history=[];
 const events=[
  {id:'supplier-rise',icon:'📦',title:'Fornecedor reajustou os preços',text:'Seu principal fornecedor aumentou os preços em 12%. A margem do mês ficará menor se você não reagir.',choices:[
   {label:'Comprar um volume enorme para travar preço, mesmo apertando o caixa',quality:'mid',xp:8,effect:{profit:-800,cashBalance:-1800,reputation:0},feedback:'Você pode reduzir custo unitário, mas compromete liquidez e aumenta risco de estoque parado.'},
   {label:'Negociar prazo/preço, comparar fornecedores e revisar margem antes de decidir',quality:'good',xp:20,effect:{profit:-250,reputation:2},feedback:'Boa decisão: você protege margem e caixa sem depender de uma única reação.'},
   {label:'Ignorar o reajuste e manter tudo igual por vários meses',quality:'bad',xp:0,effect:{profit:-1400,reputation:-1},feedback:'Ignorar aumento relevante de custo pode corroer a margem rapidamente.'}
  ]},
  {id:'late-client',icon:'⏳',title:'Cliente atrasou um pagamento importante',text:'Um cliente que representa parte relevante do faturamento informou que pagará 20 dias depois do previsto.',choices:[
   {label:'Assumir que o dinheiro vai entrar e gastar normalmente',quality:'bad',xp:0,effect:{cashBalance:-2500,reputation:-1},feedback:'Planejar usando um recebimento que não entrou aumenta o risco de falta de caixa.'},
   {label:'Atualizar o fluxo de caixa, priorizar obrigações e negociar prazos se necessário',quality:'good',xp:20,effect:{cashBalance:-700,reputation:2},feedback:'Boa gestão: você trata o atraso como risco de liquidez e reorganiza compromissos.'},
   {label:'Cobrar o cliente de forma agressiva em público',quality:'bad',xp:0,effect:{clients:-1,reputation:-4},feedback:'A cobrança pode ser legítima, mas exposição e agressividade podem destruir relacionamento e reputação.'}
  ]},
  {id:'viral-campaign',icon:'📣',title:'Sua campanha começou a funcionar muito bem',text:'Uma campanha nas redes sociais ganhou tração e a demanda subiu mais rápido que sua capacidade atual.',choices:[
   {label:'Aceitar todos os pedidos mesmo sem capacidade de entrega',quality:'bad',xp:0,effect:{revenue:3000,profit:-600,reputation:-5,clients:12},feedback:'Crescer sem capacidade pode gerar atraso, retrabalho e queda de reputação.'},
   {label:'Controlar pedidos, priorizar capacidade e escalar gradualmente',quality:'good',xp:20,effect:{revenue:2200,profit:700,reputation:3,clients:8},feedback:'Boa decisão: crescimento saudável exige capacidade, qualidade e caixa alinhados.'},
   {label:'Pausar toda a campanha imediatamente',quality:'mid',xp:8,effect:{revenue:500,profit:150,reputation:0,clients:2},feedback:'Você reduz risco operacional, mas pode desperdiçar uma oportunidade que poderia ser administrada.'}
  ]},
  {id:'stock-stuck',icon:'🏷️',title:'Estoque parado',text:'Parte do estoque está encalhada há semanas e ocupando capital que poderia estar no caixa.',choices:[
   {label:'Comprar ainda mais para tentar reduzir o custo médio',quality:'bad',xp:0,effect:{cashBalance:-2000,profit:-500,stockStatus:'Estoque elevado'},feedback:'Aumentar estoque parado normalmente piora o capital empatado.'},
   {label:'Criar estratégia de giro, rever compras e reduzir reposição desse item',quality:'good',xp:20,effect:{cashBalance:900,profit:300,stockStatus:'Estoque em ajuste',reputation:1},feedback:'Boa decisão: estoque precisa girar. Comprar, vender e repor devem conversar com demanda e caixa.'},
   {label:'Ignorar porque estoque não afeta o caixa',quality:'bad',xp:0,effect:{cashBalance:-900,profit:-300,stockStatus:'Estoque parado'},feedback:'Estoque imobiliza dinheiro e pode perder valor com o tempo.'}
  ]},
  {id:'hire-pressure',icon:'🤝',title:'Equipe sobrecarregada',text:'As vendas cresceram e a equipe atual está acumulando horas extras e atrasos.',choices:[
   {label:'Contratar imediatamente sem calcular o custo total e a demanda futura',quality:'mid',xp:8,effect:{profit:-1200,reputation:1},feedback:'Contratar pode ser necessário, mas sem medir capacidade e custo o risco financeiro aumenta.'},
   {label:'Mapear carga e gargalos, calcular custo e então decidir contratação ou redistribuição',quality:'good',xp:20,effect:{profit:-400,reputation:3},feedback:'Boa decisão: contratação é uma decisão operacional e financeira ao mesmo tempo.'},
   {label:'Exigir horas extras indefinidamente para evitar novas despesas',quality:'bad',xp:0,effect:{profit:300,reputation:-6},feedback:'Pode parecer econômico no curto prazo, mas aumenta risco de queda de qualidade, clima e rotatividade.'}
  ]},
  {id:'competitor-price',icon:'⚔️',title:'Concorrente reduziu muito o preço',text:'Um concorrente anunciou preços 20% menores e começou a chamar atenção dos seus clientes.',choices:[
   {label:'Reduzir seu preço em 25% sem recalcular margem',quality:'bad',xp:0,effect:{revenue:1200,profit:-1600,clients:5},feedback:'Preço menor pode aumentar vendas e, ao mesmo tempo, destruir resultado.'},
   {label:'Revisar proposta de valor, custos, segmentos e só então decidir preço',quality:'good',xp:20,effect:{revenue:700,profit:350,reputation:2,clients:3},feedback:'Boa decisão: competir não significa obrigatoriamente ser o mais barato.'},
   {label:'Não observar mais o mercado para não se influenciar',quality:'bad',xp:0,effect:{clients:-3,reputation:-1},feedback:'Ignorar concorrência reduz sua capacidade de entender mudanças no mercado.'}
  ]}
 ];
 const section=document.createElement('section');section.id='eventos-empresariais';section.className='section events-section';section.innerHTML=`
 <div class="section-head"><span class="eyebrow">MODO CEO · EVENTOS DO MÊS</span><h2>Nem todo mês sai como planejado</h2><p>Receba situações inesperadas, escolha uma resposta e veja como a decisão afeta sua Empresa Virtual.</p></div>
 <div class="events-grid"><article class="event-main"><div class="event-head"><span id="eventIcon" class="event-icon">🎲</span><div><span class="event-label">Evento empresarial</span><h3 id="eventTitle">Gere seu primeiro evento</h3></div></div><p id="eventText">Crie sua Empresa Virtual e clique em “Novo evento do mês”.</p><div id="eventChoices" class="event-choices"></div><div id="eventFeedback" class="event-feedback"></div><div class="event-actions"><button class="btn primary" id="newEvent" type="button">Novo evento do mês</button></div></article><article class="event-history"><h3>Histórico de decisões</h3><p>Os últimos eventos ficam salvos neste navegador.</p><div id="eventHistoryList" class="event-history-list"></div></article></div>`;
 monthly.insertAdjacentElement('afterend',section);
 const nav=document.getElementById('mainNav');if(nav&&!nav.querySelector('a[href="#eventos-empresariais"]')){const a=document.createElement('a');a.href='#eventos-empresariais';a.textContent='Eventos CEO';const ref=nav.querySelector('a[href="#saude-empresa"]')||nav.querySelector('a[href="#empresa"]');ref?.insertAdjacentElement('afterend',a);a.addEventListener('click',()=>api.closeMenu?.())}
 const icon=document.getElementById('eventIcon'),title=document.getElementById('eventTitle'),text=document.getElementById('eventText'),choices=document.getElementById('eventChoices'),feedback=document.getElementById('eventFeedback');
 function save(){localStorage.setItem(storageKey,JSON.stringify(eventState))}
 function fmt(v){return Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0})}
 function renderHistory(){const box=document.getElementById('eventHistoryList');if(!eventState.history.length){box.innerHTML='<div class="event-empty">Nenhuma decisão registrada ainda.</div>';return}box.innerHTML=eventState.history.slice(-8).reverse().map(h=>`<article><div><strong>${h.icon} ${h.title}</strong><span>${h.choice}</span></div><small>${h.when}</small></article>`).join('')}
 function showEvent(ev){eventState.current=ev.id;save();icon.textContent=ev.icon;title.textContent=ev.title;text.textContent=ev.text;feedback.className='event-feedback';feedback.textContent='';choices.innerHTML=ev.choices.map((c,i)=>`<button type="button" data-index="${i}">${c.label}</button>`).join('')}
 function nextEvent(){if(!api.getState().company){feedback.className='event-feedback show bad';feedback.textContent='Crie sua Empresa Virtual antes de gerar eventos mensais.';return}const recent=new Set(eventState.history.slice(-2).map(h=>h.id));const pool=events.filter(e=>!recent.has(e.id));const list=pool.length?pool:events;showEvent(list[Math.floor(Math.random()*list.length)])}
 function applyChoice(ev,ch){const s=api.getState(),m={...(s.metrics||{})};Object.entries(ch.effect||{}).forEach(([k,v])=>{if(typeof v==='number')m[k]=Number(m[k]||0)+v;else m[k]=v});m.reputation=Math.max(0,Math.min(100,Number(m.reputation||50)));m.clients=Math.max(0,Math.round(Number(m.clients||0)));m.revenue=Math.max(0,Number(m.revenue||0));m.lastActivity='Evento CEO: '+ev.title;api.updateMetrics(m);api.awardXP('event-'+ev.id,Number(ch.xp||0));eventState.history.push({id:ev.id,icon:ev.icon,title:ev.title,choice:ch.label,quality:ch.quality,when:new Date().toLocaleDateString('pt-BR')});eventState.history=eventState.history.slice(-24);eventState.current=null;save();choices.querySelectorAll('button').forEach(b=>b.disabled=true);feedback.className='event-feedback show '+ch.quality;const impact=[];if(ch.effect?.revenue)impact.push('Faturamento '+(ch.effect.revenue>0?'+':'')+fmt(ch.effect.revenue));if(ch.effect?.profit)impact.push('Lucro '+(ch.effect.profit>0?'+':'')+fmt(ch.effect.profit));if(ch.effect?.cashBalance)impact.push('Caixa '+(ch.effect.cashBalance>0?'+':'')+fmt(ch.effect.cashBalance));if(ch.effect?.clients)impact.push('Clientes '+(ch.effect.clients>0?'+':'')+ch.effect.clients);if(ch.effect?.reputation)impact.push('Reputação '+(ch.effect.reputation>0?'+':'')+ch.effect.reputation);feedback.innerHTML=`<strong>${ch.feedback}</strong>${impact.length?`<span>Impacto simulado: ${impact.join(' · ')}</span>`:''}`;renderHistory()}
 choices.addEventListener('click',e=>{const b=e.target.closest('button[data-index]');if(!b||!eventState.current)return;const ev=events.find(x=>x.id===eventState.current);if(!ev)return;const ch=ev.choices[Number(b.dataset.index)];if(ch)applyChoice(ev,ch)});
 document.getElementById('newEvent').addEventListener('click',nextEvent);
 renderHistory();
})();