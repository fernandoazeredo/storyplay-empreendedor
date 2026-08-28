(()=>{
 const main=document.querySelector('main');
 if(!main||document.getElementById('skipToContent'))return;
 if(!main.id)main.id='conteudo-principal';
 main.setAttribute('tabindex','-1');
 const skip=document.createElement('a');
 skip.id='skipToContent';
 skip.className='skip-link';
 skip.href='#'+main.id;
 skip.textContent='Pular para o conteúdo';
 document.body.insertBefore(skip,document.body.firstChild);
 skip.addEventListener('click',()=>{
  requestAnimationFrame(()=>main.focus({preventScroll:true}));
 });
})();
