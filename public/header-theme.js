(()=>{
 const header=document.querySelector('.topbar');
 const nav=document.getElementById('mainNav');
 const theme=document.getElementById('themeToggle');
 const menu=document.getElementById('menuToggle');
 if(!header||!nav||!theme||!menu||document.getElementById('headerControls'))return;
 const controls=document.createElement('div');
 controls.id='headerControls';
 controls.className='header-controls';
 header.insertBefore(controls,nav);
 controls.appendChild(theme);
 controls.appendChild(menu);
 if(!document.getElementById('headerThemeLayout')){
  const style=document.createElement('style');
  style.id='headerThemeLayout';
  style.textContent=`
   .header-controls{display:flex;align-items:center;gap:10px;margin-left:auto}
   .header-controls .theme-toggle{flex:0 0 44px;width:44px;padding:0;text-align:center}
   @media(max-width:1180px){
    .topbar{gap:12px}
    .header-controls{margin-left:auto;position:relative;z-index:57}
    .header-controls .theme-toggle,.header-controls .menu-toggle{display:inline-grid;place-items:center;width:44px;min-width:44px;height:44px;padding:0}
    .nav .theme-toggle{width:auto}
   }
   @media(max-width:620px){
    .topbar{padding-left:16px;padding-right:16px}
    .brand{min-width:0;flex:1 1 auto}
    .brand img{max-width:100%;width:min(225px,100%)}
    .header-controls{flex:0 0 auto;gap:8px}
   }
  `;
  document.head.appendChild(style);
 }
 theme.setAttribute('title','Alternar modo claro/escuro');
})();
