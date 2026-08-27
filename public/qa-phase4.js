(()=>{
 const api=window.storyplayAPI;if(!api)return;
 const marketing=document.getElementById('calcMarketing');
 if(marketing&&!marketing.dataset.metricsGuard){
  marketing.dataset.metricsGuard='true';
  marketing.addEventListener('click',()=>{
   const before=api.getState();
   if(!before.company)return;
   const prevRevenue=Number(before.metrics?.revenue||0),prevClients=Number(before.metrics?.clients||0);
   setTimeout(()=>{
    const after=api.getState();
    const revenue=Math.max(prevRevenue,Number(after.metrics?.revenue||0));
    const clients=Math.max(prevClients,Number(after.metrics?.clients||0));
    if(revenue!==Number(after.metrics?.revenue||0)||clients!==Number(after.metrics?.clients||0)){
     api.updateMetrics({revenue,clients,lastActivity:'Campanha de marketing analisada sem apagar métricas acumuladas'});
    }
   },0);
  },true);
 }
 function loadScript(src){
  if(document.querySelector(`script[src="${src}"]`))return;
  const script=document.createElement('script');
  script.src=src;
  script.async=false;
  document.body.appendChild(script);
 }
 function loadStyle(src){
  if(document.querySelector(`link[href="${src}"]`))return;
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href=src;
  document.head.appendChild(link);
 }
 loadScript('/company-activity.js');
 loadScript('/commercial-v2.js');
 loadStyle('/tax-choice.css');
 loadScript('/tax-choice.js');
 loadStyle('/advanced-modules.css');
 loadScript('/advanced-modules.js');
 const observer=new MutationObserver(()=>{
  if(document.getElementById('area-educador')){
   loadStyle('/classroom.css');
   loadScript('/classroom-v2.js');
   observer.disconnect();
  }
 });
 observer.observe(document.body,{childList:true,subtree:true});
 if(document.getElementById('area-educador')){
  loadStyle('/classroom.css');
  loadScript('/classroom-v2.js');
  observer.disconnect();
 }
})();