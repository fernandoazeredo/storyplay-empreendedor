(()=>{
  const ratingFromScore=score=>{
    const value=Number(score||0);
    if(value>=5)return 5;
    if(value===4)return 4;
    if(value===3)return 3;
    if(value===2)return 2;
    return 1;
  };
  const labels={
    5:'Mais indicado',
    4:'Boa alternativa',
    3:'Vale analisar',
    2:'Baixa aderência',
    1:'Pouco indicado'
  };
  const stars=value=>'★'.repeat(value)+'☆'.repeat(5-value);

  function enhance(){
    document.querySelectorAll('#taxChoiceResults .tax-regime-top > span').forEach(node=>{
      if(node.dataset.starRating==='1')return;
      const match=(node.textContent||'').match(/Aderência\s+(-?\d+)\s+pts/i);
      if(!match)return;
      const rating=ratingFromScore(Number(match[1]));
      node.dataset.starRating='1';
      node.className='tax-star-rating';
      node.setAttribute('aria-label',`${rating} de 5 estrelas. ${labels[rating]}`);
      node.innerHTML=`<span class="tax-stars" aria-hidden="true">${stars(rating)}</span><span class="tax-star-label">${labels[rating]}</span>`;
    });
  }

  document.getElementById('compareTaxRegimes')?.addEventListener('click',()=>setTimeout(enhance,0));
  const results=document.getElementById('taxChoiceResults');
  if(results){
    new MutationObserver(enhance).observe(results,{childList:true,subtree:true});
    enhance();
  }
})();