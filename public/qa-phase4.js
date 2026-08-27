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
 function hasScript(path){return [...document.scripts].some(s=>{try{return new URL(s.src,location.href).pathname===path}catch(e){return false}})}
 function hasStyle(path){return [...document.styleSheets].some(s=>{try{return s.href&&new URL(s.href,location.href).pathname===path}catch(e){return false}})}
 function loadScript(path){if(hasScript(path))return;const script=document.createElement('script');script.src=path;script.async=false;document.body.appendChild(script)}
 function loadStyle(path){if(hasStyle(path))return;const link=document.createElement('link');link.rel='stylesheet';link.href=path;document.head.appendChild(link)}
 loadScript('/company-activity.js');
 loadStyle('/tax-choice.css');
 loadScript('/tax-choice.js');
 loadStyle('/advanced-modules.css');
 loadScript('/advanced-modules.js');
 loadScript('/commercial-v2.js');
})();