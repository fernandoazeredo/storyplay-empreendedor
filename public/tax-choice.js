(()=>{
  const api=window.storyplayAPI;
  if(!api||document.getElementById('melhor-regime-tributario'))return;
  const anchor=document.getElementById('laboratorios')||document.getElementById('trilhas')||document.getElementById('empresa');
  if(!anchor)return;

  const section=document.createElement('section');
  section.id='melhor-regime-tributario';
  section.className='section tax-choice-section';
  section.innerHTML=`
    <div class="section-head">
      <span class="eyebrow">LABORATÓRIO TRIBUTÁRIO</span>
      <h2>Qual regime tributário vale a pena estudar primeiro?</h2>
      <p>Compare o perfil da sua Empresa Virtual entre Simples Nacional, Lucro Presumido e Lucro Real. O resultado é educacional e indica o cenário que merece ser investigado com mais atenção.</p>
    </div>
    <div class="tax-choice-grid">
      <article class="tax-choice-card tax-choice-form-card">
        <h3>Monte o perfil da empresa</h3>
        <div class="tax-choice-form">
          <label><span>Faturamento mensal (R$)</span><input id="choiceRevenue" type="number" min="0" step="100" value="30000"></label>
          <label><span>Custos e despesas mensais (R$)</span><input id="choiceExpenses" type="number" min="0" step="100" value="18000"></label>
          <label><span>Folha + pró-labore mensal (R$)</span><input id="choicePayroll" type="number" min="0" step="100" value="6000"></label>
          <label><span>Margem estimada (%)</span><input id="choiceMargin" type="number" min="-100" max="100" step="0.1" value="40"></label>
          <label><span>Tipo de atividade</span><select id="choiceActivity"><option value="service">Serviços</option><option value="commerce">Comércio</option><option value="industry">Indústria</option><option value="mixed">Mista</option></select></label>
          <label><span>Há custos/despesas bem documentados?</span><select id="choiceDocs"><option value="high">Sim, bem organizados</option><option value="medium">Parcialmente</option><option value="low">Ainda não</option></select></label>
        </div>
        <button class="btn primary" id="compareTaxRegimes" type="button">Comparar regimes</button>
        <div class="tax-choice-note"><strong>Importante:</strong> CNAE, anexos, Fator R, ISS, ICMS, créditos, benefícios e regras vigentes podem mudar totalmente uma análise real.</div>
      </article>
      <article class="tax-choice-card">
        <h3>Comparação educacional</h3>
        <div class="tax-choice-results" id="taxChoiceResults">
          <div class="tax-choice-empty">Preencha o perfil e clique em <strong>Comparar regimes</strong>.</div>
        </div>
      </article>
    </div>`;
  anchor.insertAdjacentElement('afterend',section);

  const nav=document.getElementById('mainNav');
  if(nav&&!nav.querySelector('a[href="#melhor-regime-tributario"]')){
    const a=document.createElement('a');
    a.href='#melhor-regime-tributario';
    a.textContent='Melhor Regime?';
    const labs=nav.querySelector('a[href="#laboratorios"]');
    labs?.insertAdjacentElement('afterend',a);
    if(!labs)nav.appendChild(a);
    a.addEventListener('click',()=>api.closeMenu?.());
  }

  const number=id=>Number(document.getElementById(id)?.value||0);
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
  const pct=v=>Number(v||0).toLocaleString('pt-BR',{maximumFractionDigits:1})+'%';
  const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});

  function scoreProfile({annualRevenue,margin,payRatio,activity,docs}){
    const scores={simple:0,presumed:0,real:0};
    const reasons={simple:[],presumed:[],real:[]};

    if(annualRevenue>0&&annualRevenue<=4800000){scores.simple+=3;reasons.simple.push('faturamento dentro da faixa normalmente associada ao Simples Nacional');}
    else if(annualRevenue>4800000){scores.simple-=5;reasons.simple.push('faturamento projetado exige atenção aos limites de enquadramento');}

    if(payRatio>=28){scores.simple+=3;reasons.simple.push('folha relevante pode ser importante em atividades sujeitas ao Fator R');}
    else {scores.simple+=1;reasons.simple.push('estrutura simplificada continua sendo um ponto a avaliar');}

    if(activity==='service'){scores.presumed+=2;reasons.presumed.push('serviços frequentemente exigem comparação cuidadosa entre margem presumida e margem efetiva');}
    if(['commerce','industry','mixed'].includes(activity)){scores.presumed+=2;reasons.presumed.push('operações comerciais ou industriais podem tornar a comparação por margem relevante');}
    if(margin>=20){scores.presumed+=3;reasons.presumed.push('margem operacional mais alta torna o Presumido um cenário útil para simulação');}
    if(margin<10){scores.presumed-=2;reasons.presumed.push('margem baixa pede cautela com uma base presumida');}

    if(margin<=15){scores.real+=4;reasons.real.push('margem baixa ou apertada aumenta a importância de tributar o resultado efetivo');}
    if(docs==='high'){scores.real+=3;reasons.real.push('boa documentação de custos e despesas favorece uma análise mais robusta do lucro efetivo');}
    if(docs==='medium'){scores.real+=1;reasons.real.push('a documentação ainda precisa amadurecer para uma apuração mais exigente');}
    if(docs==='low'){scores.real-=3;reasons.real.push('controles fracos dificultam uma apuração baseada no lucro efetivo');}
    if(annualRevenue>4800000){scores.real+=2;scores.presumed+=2;reasons.real.push('porte maior exige comparar regimes fora do Simples');reasons.presumed.push('porte maior exige comparar regimes fora do Simples');}

    return{scores,reasons};
  }

  function label(key){return{simple:'Simples Nacional',presumed:'Lucro Presumido',real:'Lucro Real'}[key]}
  function classFor(rank,index){return index===0?'tax-best':rank>0?'tax-positive':'tax-neutral'}

  document.getElementById('compareTaxRegimes')?.addEventListener('click',()=>{
    const revenue=number('choiceRevenue'),expenses=number('choiceExpenses'),payroll=number('choicePayroll');
    const activity=document.getElementById('choiceActivity').value;
    const docs=document.getElementById('choiceDocs').value;
    if(revenue<=0){document.getElementById('taxChoiceResults').innerHTML='<div class="tax-choice-warning">Informe um faturamento mensal maior que zero.</div>';return;}
    const annualRevenue=revenue*12;
    const result=revenue-expenses;
    const calculatedMargin=revenue?result/revenue*100:0;
    let margin=number('choiceMargin');
    if(!Number.isFinite(margin))margin=calculatedMargin;
    margin=clamp(margin,-100,100);
    const payRatio=revenue?payroll/revenue*100:0;
    const {scores,reasons}=scoreProfile({annualRevenue,margin,payRatio,activity,docs});
    const ranked=Object.keys(scores).sort((a,b)=>scores[b]-scores[a]);
    const winner=ranked[0];
    document.getElementById('taxChoiceResults').innerHTML=`
      <div class="tax-profile-summary">
        <div><span>Faturamento anual projetado</span><strong>${money(annualRevenue)}</strong></div>
        <div><span>Margem informada</span><strong>${pct(margin)}</strong></div>
        <div><span>Folha / faturamento</span><strong>${pct(payRatio)}</strong></div>
      </div>
      <div class="tax-choice-headline"><span>Cenário mais favorável para estudar</span><strong>${label(winner)}</strong><small>Isso não significa que ele seja automaticamente o regime correto.</small></div>
      <div class="tax-regime-list">${ranked.map((key,index)=>`<article class="tax-regime ${classFor(scores[key],index)}"><div class="tax-regime-top"><strong>${index+1}º · ${label(key)}</strong><span>Aderência ${scores[key]} pts</span></div><ul>${reasons[key].slice(0,3).map(r=>`<li>${r}</li>`).join('')}</ul></article>`).join('')}</div>
      <div class="tax-next-step"><strong>Próximo passo:</strong> validar CNAE, município/estado, anexos aplicáveis, Fator R quando houver, ISS/ICMS, créditos e regras vigentes antes de uma decisão real.</div>`;
    api.awardXP?.('tax-regime-comparison',15);
    api.updateMetrics?.({lastActivity:'Comparação educacional de regimes tributários concluída'});
  });

  if(!document.querySelector('link[href="/advanced-finance.css"]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href='/advanced-finance.css';document.head.appendChild(link);
  }
  if(!document.querySelector('script[src="/advanced-finance.js"]')){
    const script=document.createElement('script');script.src='/advanced-finance.js';script.async=false;document.body.appendChild(script);
  }
})();
