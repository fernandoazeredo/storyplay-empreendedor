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
})();
