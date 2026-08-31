(()=>{
  if(window.innerWidth>1180||document.getElementById('storyplayMobileWidthDiagnostic'))return;

  const box=document.createElement('div');
  box.id='storyplayMobileWidthDiagnostic';
  Object.assign(box.style,{
    position:'fixed',left:'8px',right:'8px',bottom:'8px',zIndex:'2147483647',
    background:'rgba(0,0,0,.88)',color:'#fff',padding:'10px 12px',borderRadius:'10px',
    font:'12px/1.35 monospace',whiteSpace:'pre-wrap',wordBreak:'break-word',maxHeight:'38vh',
    overflow:'auto',boxShadow:'0 4px 20px rgba(0,0,0,.35)'
  });
  document.body.appendChild(box);

  function selector(el){
    if(!el)return 'nenhum';
    let s=el.tagName.toLowerCase();
    if(el.id)s+='#'+el.id;
    if(el.classList?.length)s+='.'+[...el.classList].slice(0,3).join('.');
    return s;
  }

  function measure(label){
    const vw=Math.round(window.innerWidth);
    const de=document.documentElement;
    const body=document.body;
    const docW=Math.max(de.scrollWidth,body.scrollWidth,de.offsetWidth,body.offsetWidth);
    const offenders=[];
    document.querySelectorAll('body *').forEach(el=>{
      if(el===box)return;
      const cs=getComputedStyle(el);
      if(cs.display==='none'||cs.visibility==='hidden')return;
      const r=el.getBoundingClientRect();
      if(!Number.isFinite(r.width)||r.width<=0)return;
      const overflowRight=r.right-vw;
      const overflowLeft=0-r.left;
      const extra=Math.max(overflowRight,overflowLeft,r.width-vw);
      if(extra>1)offenders.push({el,r,extra});
    });
    offenders.sort((a,b)=>b.extra-a.extra);
    const top=offenders.slice(0,6).map((o,i)=>{
      const r=o.r;
      return `${i+1}. ${selector(o.el)} | w=${Math.round(r.width)} left=${Math.round(r.left)} right=${Math.round(r.right)} extra=${Math.round(o.extra)}`;
    });
    const vv=window.visualViewport;
    box.textContent=[
      `DIAGNÓSTICO MOBILE — ${label}`,
      `innerWidth=${vw}  visualViewport=${vv?Math.round(vv.width):'n/a'}  docWidth=${Math.round(docW)}`,
      `body.client=${body.clientWidth} body.scroll=${body.scrollWidth} html.client=${de.clientWidth} html.scroll=${de.scrollWidth}`,
      `viewport meta=${document.querySelector('meta[name="viewport"]')?.getAttribute('content')||'ausente'}`,
      offenders.length?`ELEMENTOS FORA DA TELA:\n${top.join('\n')}`:'Nenhum elemento ultrapassando a viewport detectado.'
    ].join('\n');
  }

  [0,300,800,1500,3000,5000].forEach((ms,i)=>setTimeout(()=>measure(`${ms}ms`),ms));
  window.addEventListener('resize',()=>measure('resize'));
})();
