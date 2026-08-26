(()=>{
 const api=window.storyplayAPI;if(!api||api.__metricsGuardInstalled)return;
 const original=api.updateMetrics.bind(api);
 api.updateMetrics=function(partial={}){
  const next={...partial};
  const activity=String(next.lastActivity||'');
  if(activity==='Campanha de marketing analisada'){
   if(Object.prototype.hasOwnProperty.call(next,'revenue')){next.lastMarketingRevenue=Number(next.revenue||0);delete next.revenue}
   if(Object.prototype.hasOwnProperty.call(next,'clients')){next.lastMarketingSales=Number(next.clients||0);delete next.clients}
  }
  if(activity==='Simulação financeira concluída'){
   if(Object.prototype.hasOwnProperty.call(next,'revenue')){next.lastFinanceRevenue=Number(next.revenue||0);delete next.revenue}
   if(Object.prototype.hasOwnProperty.call(next,'profit')){next.lastFinanceProfit=Number(next.profit||0);delete next.profit}
  }
  return original(next);
 };
 api.__metricsGuardInstalled=true;
})();