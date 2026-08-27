(()=>{
  const api=window.storyplayAPI;
  if(!api || document.getElementById('painel-turma')) return;
  const anchor=document.getElementById('area-educador')||document.getElementById('relatorio-aprendizagem')||document.getElementById('piloto-avaliacao');
  if(!anchor) return;
  const key='storyplay-classroom';
  let data={name:'Turma Piloto',participants:[],updatedAt:null};
  try {
    const saved=JSON.parse(localStorage.getItem(key)||'{}');
    data={...data,...saved};
  } catch (e) {
    data={name:'Turma Piloto',participants:[],updatedAt:null};
  }
  if(!Array.isArray(data.participants)) data.participants=[];
  const section=document.createElement('section');
  section.id='painel-turma';
  section.className='section classroom-section';
  section.innerHTML=`<div class="section-head"><span class="eyebrow">PAINEL DE TURMA LOCAL</span><h2>Consolide resultados de vários participantes</h2><p>Use códigos ou apelidos e acompanhe médias da turma. Na V1, os dados ficam somente neste navegador.</p></div><div class="classroom-grid"><article class="classroom-card"><h3>Adicionar participante</h3><div class="classroom-form"><label class="classroom-field"><span>Código / apelido</span><input id="classroomCode" maxlength="30" placeholder="Ex.: A01"></label><label class="classroom-field"><span>Mercado %</span><input id="classroomMarket" type="number" min="0" max="100" value="0"></label><label class="classroom-field"><span>Formalização %</span><input id="classroomFormal" type="number" min="0" max="100" value="0"></label><label class="classroom-field"><span>Finanças %</span><input id="classroomFinance" type="number" min="0" max="100" value="0"></label><label class="classroom-field"><span>Gestão %</span><input id="classroomManagement" type="number" min="0" max="100" value="0"></label></div><div class="classroom-actions"><button class="btn primary" id="addClassroomParticipant" type="button">Adicionar à turma</button><button class="btn secondary" id="importCurrentParticipant" type="button">Usar resultado atual</button></div><div class="classroom-status" id="classroomStatus"></div></article><article class="classroom-card"><h3>Visão consolidada</h3><div class="classroom-summary"><div><span>Participantes</span><strong id="classroomCount">0</strong></div><div><span>Média geral</span><strong id="classroomAverage">0%</strong></div><div><span>Maior necessidade</span><strong id="classroomFocus">—</strong></div></div><div class="classroom-domains"><div class="classroom-domain"><span>Mercado</span><div class="classroom-bar"><i id="classroomMarketBar"></i></div><strong id="classroomMarketAvg">0%</strong></div><div class="classroom-domain"><span>Formalização</span><div class="classroom-bar"><i id="classroomFormalBar"></i></div><strong id="classroomFormalAvg">0%</strong></div><div class="classroom-domain"><span>Finanças</span><div class="classroom-bar"><i id="classroomFinanceBar"></i></div><strong id="classroomFinanceAvg">0%</strong></div><div class="classroom-domain"><span>Gestão</span><div class="classroom-bar"><i id="classroomManagementBar"></i></div><strong id="classroomManagementAvg">0%</strong></div></div><div class="classroom-table-wrap"><table class="classroom-table"><thead><tr><th>Participante</th><th>Mercado</th><th>Formalização</th><th>Finanças</th><th>Gestão</th><th></th></tr></thead><tbody id="classroomTableBody"></tbody></table></div><div class="classroom-actions"><button class="btn secondary" id="printClassroom" type="button">Imprimir painel</button><button class="btn secondary" id="clearClassroom" type="button">Limpar turma</button></div></article></div>`;
  anchor.insertAdjacentElement('afterend',section);
  const nav=document.getElementById('mainNav');
  if(nav && !nav.querySelector('a[href="#painel-turma"]')){
    const a=document.createElement('a');a.href='#painel-turma';a.textContent='Turma';nav.appendChild(a);a.addEventListener('click',()=>api.closeMenu?.());
  }
  const clamp=v=>Math.max(0,Math.min(100,Number(v)||0));
  const save=()=>{data.updatedAt=new Date().toISOString();localStorage.setItem(key,JSON.stringify(data));};
  function currentDomains(){
    const s=api.getState(),labs=s.labs||{};
    const score=id=>{const a=s.answered?.[id];return a&&typeof a==='object'?Number(a.score):NaN;};
    const pct=vals=>{const v=vals.filter(Number.isFinite);return v.length?Math.round(v.reduce((a,b)=>a+Math.max(0,Math.min(25,b)),0)/(v.length*25)*100):0;};
    const market=pct([score('q1'),score('q2')]);
    const formal=pct([score('q4'),score('q5'),score('q6'),score('q7')]);
    const finance=['lab-finance','dre-simple','price-formation','working-capital'].some(k=>labs[k])?100:0;
    const mg=[]; if(Number.isFinite(score('q3'))) mg.push(score('q3')); ['lab-people','lab-admin','risk-security'].forEach(k=>{if(labs[k]) mg.push(25);});
    return {market,formal,finance,management:pct(mg)};
  }
  function render(){
    const p=data.participants;document.getElementById('classroomCount').textContent=p.length;
    const keys=['market','formal','finance','management'];
    const names={market:'Mercado',formal:'Formalização',finance:'Finanças',management:'Gestão'};
    const avgs={}; keys.forEach(k=>avgs[k]=p.length?Math.round(p.reduce((s,x)=>s+clamp(x[k]),0)/p.length):0);
    const overall=p.length?Math.round(keys.reduce((s,k)=>s+avgs[k],0)/keys.length):0;
    const focus=keys.slice().sort((a,b)=>avgs[a]-avgs[b])[0];
    document.getElementById('classroomAverage').textContent=overall+'%';
    document.getElementById('classroomFocus').textContent=p.length?names[focus]:'—';
    [['Market','market'],['Formal','formal'],['Finance','finance'],['Management','management']].forEach(([id,k])=>{document.getElementById('classroom'+id+'Avg').textContent=avgs[k]+'%';document.getElementById('classroom'+id+'Bar').style.width=avgs[k]+'%';});
    document.getElementById('classroomTableBody').innerHTML=p.length?p.map((x,i)=>`<tr><td><strong>${String(x.code||'Participante')}</strong></td><td>${clamp(x.market)}%</td><td>${clamp(x.formal)}%</td><td>${clamp(x.finance)}%</td><td>${clamp(x.management)}%</td><td><button class="classroom-remove" data-remove="${i}" type="button">Remover</button></td></tr>`).join(''):`<tr><td colspan="6" class="classroom-empty">Nenhum participante registrado.</td></tr>`;
  }
  function addParticipant(values){
    const code=String(values.code||'').trim()||('P'+String(data.participants.length+1).padStart(2,'0'));
    data.participants.push({code,market:clamp(values.market),formal:clamp(values.formal),finance:clamp(values.finance),management:clamp(values.management)});
    save();render();const st=document.getElementById('classroomStatus');st.textContent='Participante adicionado ao painel local.';st.classList.add('show');
  }
  document.getElementById('addClassroomParticipant').addEventListener('click',()=>addParticipant({code:document.getElementById('classroomCode').value,market:document.getElementById('classroomMarket').value,formal:document.getElementById('classroomFormal').value,finance:document.getElementById('classroomFinance').value,management:document.getElementById('classroomManagement').value}));
  document.getElementById('importCurrentParticipant').addEventListener('click',()=>addParticipant({code:document.getElementById('classroomCode').value||'Resultado atual',...currentDomains()}));
  document.getElementById('classroomTableBody').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;data.participants.splice(Number(b.dataset.remove),1);save();render();});
  document.getElementById('printClassroom').addEventListener('click',()=>window.print());
  document.getElementById('clearClassroom').addEventListener('click',()=>{if(!confirm('Limpar todos os participantes registrados nesta turma local?'))return;data.participants=[];save();render();});
  render();
})();
