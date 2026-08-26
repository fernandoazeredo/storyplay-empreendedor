const body=document.body;
const themeToggle=document.getElementById('themeToggle');
const menuToggle=document.getElementById('menuToggle');
const mainNav=document.getElementById('mainNav');
const defaultState={xp:0,answered:{},company:null,metrics:{revenue:0,profit:0,clients:0,reputation:50,stockStatus:'Não avaliado',lastActivity:'Jornada iniciada'},labs:{},achievements:{}};
let state;
try{state={...defaultState,...JSON.parse(localStorage.getItem('storyplay-state')||'{}')}}catch(e){state={...defaultState}}
if(!state.answered)state.answered={};
state.metrics={...defaultState.metrics,...(state.metrics||{})};
if(!state.labs)state.labs={};if(!state.achievements)state.achievements={};
const save=()=>localStorage.setItem('storyplay-state',JSON.stringify(state));
const brl=value=>Number(value||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});

function levelFromXP(xp){if(xp>=260)return'Nível 4 · CEO';if(xp>=200)return'Nível 3 · Gestor';if(xp>=120)return'Nível 2 · Empreendedor';if(xp>=50)return'Nível 1 · Explorador';return'Nível 1 · Aprendiz'}
function renderProgress(){
 const xp=Number(state.xp||0);const knowledge=Math.min(100,Math.round(xp/300*100));
 document.getElementById('xpValue').textContent=xp;
 document.getElementById('knowledgeValue').textContent=knowledge+'%';
 document.getElementById('progressBar').style.width=knowledge+'%';
 document.getElementById('levelBadge').textContent=levelFromXP(xp);
 const missions=Object.keys(state.answered).length;const labsDone=Object.keys(state.labs||{}).length;
 const next=missions===0?'Primeira missão: descubra um problema que valha a pena resolver.':missions<2?'Continue o Episódio 1 e valide sua ideia.':missions<4?'Avance para o Episódio 2 e aprenda a formalizar.':labsDone<2?'Experimente os Laboratórios Empresariais e teste suas decisões.':labsDone<5?'Complete mais laboratórios e fortaleça sua visão de gestor.':'Você já domina a base da V1. Continue simulando decisões como CEO.';
 document.getElementById('nextMission').textContent=next;
 window.dispatchEvent(new CustomEvent('storyplay:statechange',{detail:getPublicState()}));
}

const savedTheme=localStorage.getItem('storyplay-theme');if(savedTheme==='dark')body.classList.add('dark');
themeToggle?.addEventListener('click',()=>{body.classList.toggle('dark');localStorage.setItem('storyplay-theme',body.classList.contains('dark')?'dark':'light')});

let menuOverlay=document.getElementById('menuOverlay');
if(!menuOverlay){menuOverlay=document.createElement('button');menuOverlay.type='button';menuOverlay.id='menuOverlay';menuOverlay.className='menu-overlay';menuOverlay.setAttribute('aria-label','Fechar menu');body.appendChild(menuOverlay)}
function closeMenu(){if(!mainNav||!menuToggle)return;mainNav.classList.remove('open');body.classList.remove('menu-open');menuOverlay.classList.remove('show');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';menuToggle.setAttribute('aria-label','Abrir menu')}
function openMenu(){if(!mainNav||!menuToggle)return;mainNav.classList.add('open');body.classList.add('menu-open');menuOverlay.classList.add('show');menuToggle.setAttribute('aria-expanded','true');menuToggle.textContent='✕';menuToggle.setAttribute('aria-label','Fechar menu')}
menuToggle?.addEventListener('click',event=>{event.stopPropagation();mainNav?.classList.contains('open')?closeMenu():openMenu()});
menuOverlay.addEventListener('click',closeMenu);menuOverlay.addEventListener('pointerdown',event=>{event.preventDefault();closeMenu()});
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});window.addEventListener('resize',()=>{if(window.innerWidth>980)closeMenu()});
document.addEventListener('pointerdown',event=>{if(window.innerWidth>980||!mainNav?.classList.contains('open'))return;const target=event.target;if(mainNav.contains(target)||menuToggle?.contains(target))return;closeMenu()},true);
document.addEventListener('touchstart',event=>{if(window.innerWidth>980||!mainNav?.classList.contains('open'))return;const target=event.target;if(mainNav.contains(target)||menuToggle?.contains(target))return;closeMenu()},{capture:true,passive:true});

function restoreAnswers(){document.querySelectorAll('.decision-options').forEach(group=>{const q=group.dataset.question;const saved=state.answered[q];if(!saved)return;group.classList.add('answered');const buttons=[...group.querySelectorAll('button[data-score]')];const chosen=buttons.find(b=>b.textContent.trim()===saved.answer);buttons.forEach(b=>b.setAttribute('aria-disabled','true'));if(chosen){chosen.classList.add(saved.score===25?'best':'chosen');chosen.setAttribute('aria-current','true')}const feedback=document.getElementById('feedback-'+q);if(feedback){feedback.textContent=(saved.score===25?'Mandou bem! ':'Aprendizado: ')+saved.feedback;feedback.classList.add('show')}})}

document.querySelectorAll('.decision-options').forEach(group=>{const q=group.dataset.question;group.querySelectorAll('button[data-score]').forEach(btn=>btn.addEventListener('click',()=>{if(state.answered[q])return;const score=Number(btn.dataset.score||0);const feedbackText=btn.dataset.feedback||'';state.xp=Number(state.xp||0)+score;state.answered[q]={score,feedback:feedbackText,answer:btn.textContent.trim()};state.metrics.lastActivity='Decisão concluída: '+q;if(state.company){if(score===25)state.metrics.reputation=Math.min(100,Number(state.metrics.reputation||50)+3);else if(score===0)state.metrics.reputation=Math.max(0,Number(state.metrics.reputation||50)-2)}save();group.classList.add('answered');group.querySelectorAll('button[data-score]').forEach(b=>b.setAttribute('aria-disabled','true'));btn.classList.add(score===25?'best':'chosen');btn.setAttribute('aria-current','true');const feedback=document.getElementById('feedback-'+q);if(feedback){feedback.textContent=(score===25?'Mandou bem! ':'Aprendizado: ')+feedbackText;feedback.classList.add('show')}renderProgress();renderCompany()}))});

const companyStatus=document.getElementById('companyStatus');const companyNameInput=document.getElementById('companyName');const companySectorInput=document.getElementById('companySector');const companyCapitalInput=document.getElementById('companyCapital');
if(companyNameInput){companyNameInput.maxLength=60;let counter=document.getElementById('companyNameCounter');if(!counter){counter=document.createElement('span');counter.id='companyNameCounter';counter.className='char-counter';companyNameInput.insertAdjacentElement('afterend',counter)}const updateCounter=()=>{counter.textContent=companyNameInput.value.length+' / '+companyNameInput.maxLength+' caracteres';counter.classList.toggle('near-limit',companyNameInput.value.length>=companyNameInput.maxLength-8)};companyNameInput.addEventListener('input',updateCounter);updateCounter()}

function renderCompany(){
 const heroCompany=document.getElementById('heroCompany');const mission=document.getElementById('companyMission');const achievement=document.getElementById('achievementText');
 if(!state.company){if(companyStatus){companyStatus.textContent='Sua empresa ainda não foi criada. Preencha os dados acima para começar sua jornada.';companyStatus.classList.remove('success')}if(heroCompany)heroCompany.textContent='Ainda não criada';if(companyNameInput)companyNameInput.value='';if(companyCapitalInput){companyCapitalInput.value='';companyCapitalInput.placeholder='Ex.: 10000'}if(companySectorInput)companySectorInput.selectedIndex=0;const counter=document.getElementById('companyNameCounter');if(counter)counter.textContent='0 / '+companyNameInput.maxLength+' caracteres';document.getElementById('dashCapital').textContent='R$ 0';document.getElementById('dashRevenue').textContent=brl(state.metrics.revenue);document.getElementById('dashClients').textContent=state.metrics.clients||0;document.getElementById('dashReputation').textContent=(state.metrics.reputation||50)+'/100';if(mission)mission.textContent='Crie sua empresa para liberar sua primeira missão empresarial.';if(achievement)achievement.textContent='Nenhuma conquista ainda. Comece a jornada!';return}
 const c=state.company;if(companyStatus){companyStatus.innerHTML='<strong>'+escapeHTML(c.name)+'</strong> está criada no segmento <strong>'+escapeHTML(c.sector)+'</strong>, com capital inicial de <strong>'+brl(c.capital)+'</strong>.';companyStatus.classList.add('success')}if(heroCompany)heroCompany.textContent=c.name;if(companyNameInput)companyNameInput.value=c.name;if(companySectorInput)companySectorInput.value=c.sector;if(companyCapitalInput)companyCapitalInput.value=c.capital;const counter=document.getElementById('companyNameCounter');if(counter)counter.textContent=c.name.length+' / '+companyNameInput.maxLength+' caracteres';document.getElementById('dashCapital').textContent=brl(c.capital);document.getElementById('dashRevenue').textContent=brl(state.metrics.revenue);document.getElementById('dashClients').textContent=state.metrics.clients||0;document.getElementById('dashReputation').textContent=(state.metrics.reputation||50)+'/100';
 const answeredCount=Object.keys(state.answered).length;if(mission)mission.textContent=answeredCount<2?'Valide sua ideia respondendo às decisões do Episódio 1.':answeredCount<4?'Aprenda as etapas de abertura no Episódio 2.':'Faça os laboratórios e continue aumentando sua reputação.';
 const achievements=[];if(state.company)achievements.push('Empresa criada');if(state.answered.q1&&state.answered.q2)achievements.push('Ideia validada');if(state.answered.q4&&state.answered.q5)achievements.push('Formalização entendida');if(Object.keys(state.labs||{}).length>=3)achievements.push('3 laboratórios concluídos');if(state.xp>=200)achievements.push('200 XP conquistados');if(achievement)achievement.textContent=achievements.length?achievements.join(' · '):'Nenhuma conquista ainda.';
}
function escapeHTML(value){return String(value).replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]))}
function getPublicState(){return JSON.parse(JSON.stringify(state))}

document.getElementById('saveCompany')?.addEventListener('click',()=>{const name=companyNameInput.value.trim();const sector=companySectorInput.value;const capital=Number(companyCapitalInput.value||0);if(name.length<2){companyStatus.textContent='Escolha um nome com pelo menos 2 caracteres.';companyStatus.classList.remove('success');companyNameInput.focus();return}if(!Number.isFinite(capital)||capital<1000){companyStatus.textContent='Informe um capital inicial de pelo menos R$ 1.000.';companyStatus.classList.remove('success');companyCapitalInput.focus();return}const isNew=!state.company;state.company={name,sector,capital};state.metrics.lastActivity=isNew?'Empresa Virtual criada':'Empresa Virtual atualizada';if(isNew){state.xp=Number(state.xp||0)+15;state.metrics.reputation=Math.max(50,Number(state.metrics.reputation||50));state.achievements.companyCreated=true}save();renderProgress();renderCompany();companyStatus.scrollIntoView({behavior:'smooth',block:'center'})});

document.getElementById('resetProgress')?.addEventListener('click',()=>{if(!confirm('Deseja realmente apagar sua Empresa Virtual, respostas e progresso desta jornada?'))return;state={...defaultState,answered:{},metrics:{...defaultState.metrics},labs:{},achievements:{}};save();location.reload()});

window.storyplayAPI={awardXP(key,points){if(!key||state.labs[key])return false;state.labs[key]=true;state.xp=Number(state.xp||0)+Number(points||0);state.metrics.lastActivity='Laboratório concluído';save();renderProgress();renderCompany();return true},getState:getPublicState,updateMetrics(partial={}){state.metrics={...state.metrics,...partial};save();renderCompany();window.dispatchEvent(new CustomEvent('storyplay:statechange',{detail:getPublicState()}))},setAchievement(key,value=true){state.achievements[key]=value;save();renderProgress()},closeMenu};

function loadExtraModules(){[['link','/labs.css'],['link','/progress.css']].forEach(([type,src])=>{if(type==='link'&&!document.querySelector(`link[href="${src}"]`)){const link=document.createElement('link');link.rel='stylesheet';link.href=src;document.head.appendChild(link)}});['/labs.js','/progress.js'].forEach(src=>{if(!document.querySelector(`script[src="${src}"]`)){const script=document.createElement('script');script.src=src;script.defer=true;document.body.appendChild(script)}})}

restoreAnswers();renderProgress();renderCompany();loadExtraModules();