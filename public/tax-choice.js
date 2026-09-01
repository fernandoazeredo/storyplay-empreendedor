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
      <p>Comece pelo caminho mais simples: veja se o perfil pode se enquadrar como MEI. Se não couber, compare Simples Nacional, Lucro Presumido e Lucro Real.</p>
    </div>

    <article class="mei-spotlight" aria-labelledby="meiSpotlightTitle">
      <div class="mei-spotlight-top">
        <div class="mei-mascot" aria-hidden="true">🚀</div>
        <div class="mei-title-wrap">
          <span class="mei-kicker">MEI START · 2026</span>
          <h3 id="meiSpotlightTitle">Antes dos outros regimes: será que você já cabe no MEI?</h3>
          <p>O Microempreendedor Individual é uma porta de entrada simplificada para pequenos negócios. Aprenda as regras básicas e faça um teste rápido.</p>
        </div>
        <div class="mei-level-badge">NÍVEL<br><strong>INICIAL</strong></div>
      </div>

      <div class="mei-rules-grid">
        <div class="mei-rule-card mei-rule-blue"><span>💸</span><strong>Até R$ 81 mil/ano</strong><small>Em 2026, equivalente a R$ 6.750 por mês na regra proporcional.</small></div>
        <div class="mei-rule-card mei-rule-green"><span>👥</span><strong>Até 2 empregados</strong><small>Limite vigente informado pelo MEMP em 2026.</small></div>
        <div class="mei-rule-card mei-rule-orange"><span>🧩</span><strong>Sem sócios</strong><small>Também não pode ser titular, sócio ou administrador de outra empresa.</small></div>
        <div class="mei-rule-card mei-rule-purple"><span>✅</span><strong>Atividade permitida</strong><small>A ocupação precisa constar na lista oficial do MEI.</small></div>
      </div>

      <div class="mei-das-zone">
        <div class="mei-das-copy">
          <span class="mei-mini-label">DAS-MEI 2026</span>
          <h4>Quanto custa por mês?</h4>
          <p>O DAS reúne a contribuição previdenciária e o imposto fixo conforme a atividade.</p>
        </div>
        <div class="mei-das-cards">
          <div><span>🛍️ Comércio / indústria</span><strong>R$ 82,05</strong><small>INSS + ICMS</small></div>
          <div class="mei-das-featured"><span>🧠 Serviços</span><strong>R$ 86,05</strong><small>INSS + ISS</small></div>
          <div><span>🎯 Comércio + serviços</span><strong>R$ 87,05</strong><small>INSS + ICMS + ISS</small></div>
        </div>
      </div>

      <div class="mei-checker">
        <div class="mei-checker-head">
          <div><span class="mei-mini-label">MISSÃO RÁPIDA</span><h4>Posso ser MEI?</h4></div>
          <span class="mei-xp-pill">+5 XP</span>
        </div>
        <div class="mei-checker-form">
          <label><span>Faturamento anual estimado</span><input id="meiAnnualRevenue" type="number" min="0" step="100" value="60000"></label>
          <label><span>Tipo de atividade</span><select id="meiActivity"><option value="service">Serviços</option><option value="commerce">Comércio / indústria</option><option value="mixed">Comércio + serviços</option></select></label>
          <label><span>Sua ocupação está na lista permitida?</span><select id="meiOccupation"><option value="yes">Sim</option><option value="unknown">Ainda não sei</option><option value="no">Não</option></select></label>
          <label><span>Você terá sócio?</span><select id="meiPartner"><option value="no">Não</option><option value="yes">Sim</option></select></label>
          <label><span>Participa de outra empresa?</span><select id="meiOtherCompany"><option value="no">Não</option><option value="yes">Sim</option></select></label>
          <label><span>Quantos empregados pretende ter?</span><select id="meiEmployees"><option value="0">Nenhum</option><option value="1">1 empregado</option><option value="2">2 empregados</option><option value="3">3 ou mais</option></select></label>
        </div>
        <button class="btn mei-check-btn" id="checkMeiEligibility" type="button">✨ Ver se meu perfil combina com MEI</button>
        <div class="mei-check-result" id="meiCheckResult" aria-live="polite">
          <span>🎮</span><p>Complete a missão e descubra se o MEI merece ser investigado primeiro.</p>
        </div>
      </div>

      <div class="mei-future-note"><strong>📌 Regra usada nesta tela: 2026.</strong> O novo teto de R$ 110 mil está previsto para começar em 2027. Para uma abertura real, confirme sempre as regras oficiais vigentes.</div>
    </article>

    <div class="tax-choice-bridge">
      <span>🔓 PRÓXIMA FASE</span>
      <div><strong>Não se enquadrou no MEI?</strong><small>Agora compare os regimes que normalmente entram na análise de empresas maiores ou com outra estrutura.</small></div>
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

  if(location.hash==='#melhor-regime-tributario'){
    const alignDeepLink=()=>section.scrollIntoView({behavior:'auto',block:'start'});
    requestAnimationFrame(()=>requestAnimationFrame(alignDeepLink));
    setTimeout(alignDeepLink,250);
    window.addEventListener('load',alignDeepLink,{once:true});
  }

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
  const money2=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',minimumFractionDigits:2,maximumFractionDigits:2});
  const SIMPLES_LIMIT_2026=4800000;

  document.getElementById('checkMeiEligibility')?.addEventListener('click',()=>{
    const annualRevenue=number('meiAnnualRevenue');
    const activity=document.getElementById('meiActivity')?.value||'service';
    const occupation=document.getElementById('meiOccupation')?.value||'unknown';
    const partner=document.getElementById('meiPartner')?.value||'no';
    const otherCompany=document.getElementById('meiOtherCompany')?.value||'no';
    const employees=Number(document.getElementById('meiEmployees')?.value||0);
    const result=document.getElementById('meiCheckResult');
    if(!result)return;
    if(annualRevenue<=0){
      result.className='mei-check-result mei-result-warning';
      result.innerHTML='<span>🧮</span><p>Informe um faturamento anual maior que zero para completar a missão.</p>';
      return;
    }
    const blockers=[];
    if(annualRevenue>81000)blockers.push('faturamento acima de R$ 81 mil em 2026');
    if(occupation==='no')blockers.push('ocupação informada como não permitida ao MEI');
    if(partner==='yes')blockers.push('MEI não admite sócio');
    if(otherCompany==='yes')blockers.push('participação em outra empresa impede o enquadramento básico');
    if(employees>2)blockers.push('quantidade de empregados acima do limite informado para 2026');
    const das={service:86.05,commerce:82.05,mixed:87.05}[activity]||86.05;
    if(blockers.length){
      result.className='mei-check-result mei-result-no';
      result.innerHTML=`<span>🧭</span><div><strong>Seu perfil pede outra rota.</strong><p>${blockers.join('; ')}. Vale seguir para a comparação entre Simples Nacional, Lucro Presumido e Lucro Real logo abaixo.</p></div>`;
    }else if(occupation==='unknown'){
      result.className='mei-check-result mei-result-warning';
      result.innerHTML=`<span>🔎</span><div><strong>Quase lá!</strong><p>Os números e a estrutura básica cabem no teste, mas você ainda precisa confirmar se sua ocupação está na lista oficial do MEI. Para esta atividade, o DAS de referência em 2026 seria ${money2(das)} por mês.</p></div>`;
    }else{
      result.className='mei-check-result mei-result-yes';
      result.innerHTML=`<span>🏁</span><div><strong>Seu perfil básico combina com o MEI!</strong><p>Pelo checklist educacional, o MEI merece ser estudado primeiro. Para esta atividade, o DAS de referência em 2026 é ${money2(das)} por mês. Confirme ocupação, regras e impedimentos oficiais antes da formalização real.</p></div>`;
      api.awardXP?.('mei-quick-check',5);
      api.updateMetrics?.({lastActivity:'Checklist educacional do MEI concluído'});
    }
  });

  function scoreProfile({annualRevenue,margin,payRatio,activity,docs}){
    const scores={simple:0,presumed:0,real:0};
    const reasons={simple:[],presumed:[],real:[]};

    if(annualRevenue>0&&annualRevenue<=SIMPLES_LIMIT_2026){scores.simple+=3;reasons.simple.push('faturamento dentro da faixa normalmente associada ao Simples Nacional');}
    else if(annualRevenue>SIMPLES_LIMIT_2026){
      const excess=annualRevenue-SIMPLES_LIMIT_2026;
      scores.simple-=5;
      reasons.simple.push(`faturamento anual projetado de ${money(annualRevenue)} ultrapassa o teto do Simples Nacional de ${money(SIMPLES_LIMIT_2026)} em 2026 em ${money(excess)}`);
    }

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
    if(annualRevenue>SIMPLES_LIMIT_2026){scores.real+=2;scores.presumed+=2;reasons.real.push('porte maior exige comparar regimes fora do Simples');reasons.presumed.push('porte maior exige comparar regimes fora do Simples');}

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
    const overSimple=annualRevenue>SIMPLES_LIMIT_2026;
    const simpleExcess=Math.max(0,annualRevenue-SIMPLES_LIMIT_2026);
    const simpleLimitAlert=overSimple?`<div class="tax-choice-warning"><strong>🚨 Passou do limite do Simples Nacional!</strong><br>Seu faturamento anual projetado é <strong>${money(annualRevenue)}</strong>. O teto do Simples Nacional em 2026 é <strong>${money(SIMPLES_LIMIT_2026)}</strong>. Você está <strong>${money(simpleExcess)}</strong> acima do limite, então o Simples deixa de ser opção neste cenário educacional.</div>`:'';
    document.getElementById('taxChoiceResults').innerHTML=`
      ${simpleLimitAlert}
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