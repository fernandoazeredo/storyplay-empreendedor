(()=>{
  function cleanDuplicateQuiz(){
    const ep2=document.getElementById('episodio2');
    if(!ep2)return;
    const q6=ep2.querySelectorAll('[data-question="q6"]');
    const q7=ep2.querySelectorAll('[data-question="q7"]');
    if(q6.length<=1&&q7.length<=1)return;
    const legacy=ep2.querySelector('#episode2Extra');
    if(legacy)legacy.remove();
  }
  cleanDuplicateQuiz();
  setTimeout(cleanDuplicateQuiz,0);
  setTimeout(cleanDuplicateQuiz,250);
})();
