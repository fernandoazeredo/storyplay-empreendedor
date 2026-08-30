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
 function loadStyle(href){
  if(document.querySelector(`link[href="${href}"]`))return;
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href=href;
  document.head.appendChild(link);
 }
 loadScript('/company-activity.js');
 loadScript('/profile-view.js');
 loadScript('/header-theme.js');
 loadStyle('/ranking-events.css');
 loadScript('/ranking-events.js');
 loadStyle('/accessibility-structure.css');
 loadScript('/accessibility-structure.js');
 loadScript('/live-feedback.js');
 loadScript('/progress-accessibility.js');
 loadScript('/events-delivery-fix.js');
 loadStyle('/access-control.css');
 loadStyle('/access-control-admin-layout.css');
 loadScript('/firebase-config.js');
 loadScript('/access-control.js');
 loadScript('/access-policy.js');
 loadStyle('/account-header-entry.css');
 loadScript('/account-header-entry.js');
 loadStyle('/ux-commercial-final.css');
 loadScript('/ux-commercial-final.js');
 const observer=new MutationObserver(()=>{
  if(document.getElementById('area-educador')){
   if(!document.querySelector('link[href="/classroom.css"]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href='/classroom.css';document.head.appendChild(link);
   }
   loadScript('/classroom-v2.js');
   observer.disconnect();
  }
 });
 observer.observe(document.body,{childList:true,subtree:true});
 if(document.getElementById('area-educador')){
  loadScript('/classroom-v2.js');
  observer.disconnect();
 }
 loadStyle('/menu-organizer.css');
 loadScript('/menu-organizer.js');
 loadScript('/menu-universal-close.js');
})();
