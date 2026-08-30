(()=>{
 const nav=document.getElementById('mainNav');
 const toggle=document.getElementById('menuToggle');
 if(!nav||!toggle||document.documentElement.dataset.storyplayUniversalMenuClose==='true')return;
 document.documentElement.dataset.storyplayUniversalMenuClose='true';
 document.addEventListener('pointerdown',event=>{
  if(!nav.classList.contains('open'))return;
  const target=event.target;
  if(nav.contains(target)||toggle.contains(target))return;
  window.storyplayAPI?.closeMenu?.();
 },true);
})();
