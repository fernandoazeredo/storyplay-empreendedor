(()=>{
  const KEY='storyplay_overflow_audit_v1';
  const params=new URLSearchParams(location.search);
  if(params.get('overflow-audit')!=='1')return;

  const history=[];
  let lastTimer=null;

  function selectorOf(el){
    if(!el||el===document.documentElement)return 'html';
    if(el===document.body)return 'body';
    if(el.id)return `#${el.id}`;
    const cls=(typeof el.className==='string'&&el.className.trim())?'.'+el.className.trim().split(/\s+/).slice(0,3).join('.'):'';
    return `${el.tagName.toLowerCase()}${cls}`;
  }

  function audit(reason){
    const viewportWidth=window.innerWidth;
    const offenders=[];
    document.querySelectorAll('*').forEach(el=>{
      const rect=el.getBoundingClientRect();
      const style=getComputedStyle(el);
      const scrollW=el.scrollWidth;
      const hiddenButPresent=style.display!=='none'&&(rect.width===0||style.visibility==='hidden');
      if(scrollW>viewportWidth+2||rect.right>viewportWidth+2||rect.left<-2){
        offenders.push({
          selector:selectorOf(el),tag:el.tagName,classe:typeof el.className==='string'?el.className:'',id:el.id||'',
          scrollWidth:scrollW,rectWidth:Math.round(rect.width),rectLeft:Math.round(rect.left),rectRight:Math.round(rect.right),
          display:style.display,visibility:style.visibility,
          estaEscondidoAgora:hiddenButPresent||rect.width===0,
          dentroDeTabFechada:el.closest('[hidden], [style*="display: none"], [style*="display:none"]')!==null
        });
      }
    });
    offenders.sort((a,b)=>Math.max(b.scrollWidth,b.rectRight)-Math.max(a.scrollWidth,a.rectRight));
    const vv=window.visualViewport;
    const snap={
      reason,timestamp:new Date().toISOString(),
      viewport:{
        innerWidth:window.innerWidth,outerWidth:window.outerWidth,
        docClientWidth:document.documentElement.clientWidth,docScrollWidth:document.documentElement.scrollWidth,
        bodyClientWidth:document.body.clientWidth,bodyScrollWidth:document.body.scrollWidth,
        visualViewportWidth:vv?vv.width:null,visualViewportScale:vv?vv.scale:null,
        visualViewportOffsetLeft:vv?vv.offsetLeft:null,visualViewportPageLeft:vv?vv.pageLeft:null
      },
      offenders:offenders.slice(0,80)
    };
    history.push(snap);
    try{localStorage.setItem(KEY,JSON.stringify(history));}catch(e){}
    window.__storyplayOverflowAudit=history;
    console.log('[STORYPLAY OVERFLOW AUDIT]',reason,snap.viewport);
    console.table(snap.offenders);
    updateButton();
    return snap;
  }

  function schedule(reason){
    clearTimeout(lastTimer);
    lastTimer=setTimeout(()=>audit(reason),180);
  }

  function latestSummary(){
    const s=history[history.length-1];
    if(!s)return 'Sem dados ainda.';
    const v=s.viewport;
    const top=s.offenders.slice(0,10).map((o,i)=>`${i+1}. ${o.selector} | scroll=${o.scrollWidth} | right=${o.rectRight} | width=${o.rectWidth}`).join('\n');
    return `STORYPLAY — AUDITORIA OVERFLOW\nMotivo: ${s.reason}\ninnerWidth=${v.innerWidth} outerWidth=${v.outerWidth}\ndocClientWidth=${v.docClientWidth} docScrollWidth=${v.docScrollWidth}\nbodyClientWidth=${v.bodyClientWidth} bodyScrollWidth=${v.bodyScrollWidth}\nvisualViewport.width=${v.visualViewportWidth} scale=${v.visualViewportScale}\nOffenders=${s.offenders.length}\n\nTOP OFFENDERS:\n${top||'nenhum'}`;
  }

  function allText(){return JSON.stringify(history,null,2);}

  function updateButton(){
    if(!btn)return;
    const s=history[history.length-1];
    btn.textContent=s?`Auditoria ${s.viewport.docScrollWidth}px`:'Auditoria';
  }

  let btn=document.createElement('button');
  btn.type='button';
  btn.id='storyplayOverflowAuditBtn';
  btn.textContent='Auditoria';
  btn.style.cssText='position:fixed;right:10px;bottom:10px;z-index:2147483647;padding:8px 10px;border-radius:10px;border:1px solid #999;background:#fff;color:#111;font:600 12px system-ui;box-shadow:0 2px 10px rgba(0,0,0,.2)';
  btn.addEventListener('click',()=>{
    audit('botao-manual');
    const text=latestSummary()+'\n\nJSON COMPLETO:\n'+allText();
    if(navigator.clipboard?.writeText){
      navigator.clipboard.writeText(text).then(()=>alert('Auditoria copiada. Cole o resultado no ChatGPT.')).catch(()=>prompt('Copie a auditoria abaixo:',text));
    }else prompt('Copie a auditoria abaixo:',text);
  });
  document.body.appendChild(btn);

  window.storyplayRunOverflowAudit=()=>audit('manual-console');
  window.storyplayCopyOverflowAudit=()=>allText();

  setTimeout(()=>audit('carga-inicial-800ms'),800);
  setTimeout(()=>audit('carga-estabilizada-2200ms'),2200);
  window.addEventListener('resize',()=>schedule('window.resize'));
  window.addEventListener('orientationchange',()=>setTimeout(()=>audit('orientationchange'),350));
  if(window.visualViewport){
    window.visualViewport.addEventListener('resize',()=>schedule('visualViewport.resize'));
    window.visualViewport.addEventListener('scroll',()=>schedule('visualViewport.scroll'));
  }
})();