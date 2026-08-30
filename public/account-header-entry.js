(()=>{
 const nav=document.getElementById('mainNav');
 if(!nav||document.getElementById('storyplayAccountEntry'))return;

 const entry=document.createElement('button');
 entry.type='button';
 entry.id='storyplayAccountEntry';
 entry.className='storyplay-account-entry';
 entry.textContent='Entrar';
 entry.setAttribute('aria-label','Entrar na sua conta StoryPlay');

 const theme=document.getElementById('themeToggle');
 if(theme)theme.insertAdjacentElement('beforebegin',entry);
 else nav.appendChild(entry);

 function getAccess(){return window.storyplayAccess?.getState?.()||{}}
 function sync(){
  const state=getAccess();
  const authenticated=Boolean(state.authenticated);
  entry.textContent=authenticated?'Minha conta':'Entrar';
  entry.setAttribute('aria-label',authenticated?'Abrir minha conta StoryPlay':'Entrar na sua conta StoryPlay');
  const title=document.getElementById('storyplayAccessTitle');
  if(title){
   if(state.isAdmin)title.textContent='Conta e administração';
   else title.textContent=authenticated?'Minha conta':'Entrar no StoryPlay';
  }
 }

 entry.addEventListener('click',()=>{
  window.storyplayAccess?.open?.();
  setTimeout(sync,0);
  window.storyplayAPI?.closeMenu?.();
 });
 window.addEventListener('storyplay:accesschange',()=>setTimeout(sync,0));
 setTimeout(sync,0);
 setTimeout(sync,600);
})();
