(()=>{
  if(document.getElementById('storyplayMobileWidthDiagnostic'))return;

  const LOG=[];
  window.__viewportLog=LOG;

  const box=document.createElement('div');
  box.id='storyplayMobileWidthDiagnostic';
  Object.assign(box.style,{
    position:'fixed',left:'8px',right:'8px',bottom:'8px',zIndex:'2147483647',
    background:'rgba(0,0,0,.92)',color:'#0f0',padding:'10px 12px',borderRadius:'10px',
    font:'11px/1.35 monospace',whiteSpace:'pre-wrap',wordBreak:'break-word',maxHeight:'46vh',
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

  function snapshot(motivo){
    const vv=window.visualViewport;
    const de=document.documentElement;
    const body=document.body;
    const main=document.getElementById('conteudo-principal')||document.querySelector('main');
    const htmlStyle=getComputedStyle(de);
    const bodyStyle=getComputedStyle(body);
    const mainStyle=main?getComputedStyle(main):null;
    const vw=window.innerWidth;
    const docW=Math.max(de.scrollWidth,body.scrollWidth,de.offsetWidth,body.offsetWidth);

    const offenders=[];
    document.querySelectorAll('body *').forEach(el=>{
      if(el===box)return;
      const cs=getComputedStyle(el);
      if(cs.display==='none'||cs.visibility==='hidden')return;
      const r=el.getBoundingClientRect();
      if(!Number.isFinite(r.width)||r.width<=0)return;
      const extra=Math.max(r.right-vw,0-r.left,r.width-vw);
      if(extra>1)offenders.push({el,r,extra});
    });
    offenders.sort((a,b)=>b.extra-a.extra);

    const data={
      motivo,
      timestamp:new Date().toISOString().slice(11,23),
      innerWidth:window.innerWidth,
      innerHeight:window.innerHeight,
      outerWidth:window.outerWidth,
      outerHeight:window.outerHeight,
      docClientWidth:de.clientWidth,
      docScrollWidth:de.scrollWidth,
      bodyClientWidth:body.clientWidth,
      bodyScrollWidth:body.scrollWidth,
      docWidth:docW,
      scrollX:window.scrollX,
      scrollY:window.scrollY,
      devicePixelRatio:window.devicePixelRatio,
      vvWidth:vv?vv.width:'n/a',
      vvHeight:vv?vv.height:'n/a',
      vvScale:vv?vv.scale:'n/a',
      vvOffsetLeft:vv?vv.offsetLeft:'n/a',
      vvOffsetTop:vv?vv.offsetTop:'n/a',
      vvPageLeft:vv?vv.pageLeft:'n/a',
      vvPageTop:vv?vv.pageTop:'n/a',
      htmlTransform:htmlStyle.transform,
      bodyTransform:bodyStyle.transform,
      bodyZoom:bodyStyle.zoom||'n/a',
      mainTransform:mainStyle?mainStyle.transform:'n/a',
      mainWidth:mainStyle?mainStyle.width:'n/a',
      offenders:offenders.slice(0,5).map(o=>({selector:selector(o.el),width:Math.round(o.r.width),left:Math.round(o.r.left),right:Math.round(o.r.right),extra:Math.round(o.extra)}))
    };

    data.FLAG_scaleDiferenteDe1=vv?Math.abs(vv.scale-1)>.001:'n/a';
    data.FLAG_vvWidthDiferenteDeInner=vv?Math.abs(vv.width-window.innerWidth)>1:'n/a';

    LOG.push(data);
    if(LOG.length>200)LOG.shift();

    const top=data.offenders.map((o,i)=>`${i+1}. ${o.selector} | w=${o.width} left=${o.left} right=${o.right} extra=${o.extra}`).join('\n');
    const alerta=data.FLAG_scaleDiferenteDe1||data.FLAG_vvWidthDiferenteDeInner
      ?'⚠ VIEWPORT/SCALE DIFERENTE DO NORMAL'
      :'✅ scale=1 e vvWidth≈innerWidth';

    box.textContent=[
      `VIEWPORT DEBUG — ${data.motivo} @ ${data.timestamp}`,
      `inner=${data.innerWidth} outer=${data.outerWidth} dpr=${data.devicePixelRatio}`,
      `doc.client=${data.docClientWidth} doc.scroll=${data.docScrollWidth} doc.max=${Math.round(data.docWidth)}`,
      `body.client=${data.bodyClientWidth} body.scroll=${data.bodyScrollWidth}`,
      `scrollX=${Math.round(data.scrollX)} scrollY=${Math.round(data.scrollY)}`,
      `vv.width=${Math.round(Number(data.vvWidth)||0)} vv.scale=${data.vvScale}`,
      `vv.offsetLeft=${Math.round(Number(data.vvOffsetLeft)||0)} vv.pageLeft=${Math.round(Number(data.vvPageLeft)||0)}`,
      `html.transform=${data.htmlTransform}`,
      `body.transform=${data.bodyTransform} body.zoom=${data.bodyZoom}`,
      `main.transform=${data.mainTransform} main.width=${data.mainWidth}`,
      alerta,
      data.offenders.length?`FORA DA TELA:\n${top}`:'FORA DA TELA: nenhum',
      `histórico=${LOG.length} | console: window.__viewportLog`
    ].join('\n');

    console.log(`[VIEWPORT-DEBUG] ${motivo}`,data);
  }

  let timer=null;
  function schedule(motivo){
    clearTimeout(timer);
    timer=setTimeout(()=>snapshot(motivo),50);
  }

  snapshot('carga inicial');
  window.addEventListener('resize',()=>schedule('window.resize'));
  window.addEventListener('orientationchange',()=>setTimeout(()=>snapshot('orientationchange'),300));
  if(window.visualViewport){
    window.visualViewport.addEventListener('resize',()=>schedule('visualViewport.resize'));
    window.visualViewport.addEventListener('scroll',()=>schedule('visualViewport.scroll'));
  }
  setInterval(()=>snapshot('polling 3s'),3000);
})();
