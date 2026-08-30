(()=>{
  const rewardForScore=score=>{
    const value=Number(score||0);
    if(value>=25)return{medal:'🥇',face:'😄',title:'Mandou muito bem!',tone:'gold'};
    if(value>=10)return{medal:'🥈',face:'🙂',title:'Boa resposta!',tone:'silver'};
    if(value>=5)return{medal:'🥉',face:'😊',title:'Você está no caminho!',tone:'bronze'};
    return{medal:'',face:'😢',title:'Ops! Dessa vez não.',tone:'learn'};
  };

  function labelQuizzes(root=document){
    root.querySelectorAll('.decision-card .story-step').forEach(step=>{
      if(step.dataset.quizLabel==='1')return;
      step.dataset.quizLabel='1';
      step.textContent='Quiz';
    });
    const challenge=root.querySelector('#desafios .eyebrow');
    if(challenge&&!challenge.dataset.quizLabel){
      challenge.dataset.quizLabel='1';
      challenge.textContent='QUIZ · DECISÃO DE CEO';
    }
  }

  function renderReward(group,score,feedbackText){
    const question=group.dataset.question;
    const feedback=document.getElementById('feedback-'+question);
    if(!feedback)return;
    const reward=rewardForScore(score);
    feedback.classList.add('show','quiz-feedback','quiz-'+reward.tone);
    feedback.innerHTML=`<div class="quiz-reward"><span class="quiz-face" aria-hidden="true">${reward.face}</span><div><strong>${reward.medal?reward.medal+' ':''}${reward.title}</strong><p>${feedbackText||''}</p></div></div>`;
  }

  function decorateGroup(group){
    if(group.dataset.quizGamified==='1')return;
    group.dataset.quizGamified='1';
    const question=group.dataset.question;
    if(!question)return;

    group.querySelectorAll('button[data-score]').forEach(button=>{
      button.addEventListener('click',()=>{
        const score=Number(button.dataset.score||0);
        const feedbackText=button.dataset.feedback||'';
        setTimeout(()=>renderReward(group,score,feedbackText),0);
      });
    });

    const saved=window.storyplayAPI?.getState?.()?.answered?.[question];
    if(saved&&typeof saved==='object')renderReward(group,Number(saved.score||0),saved.feedback||'');
  }

  function sync(){
    labelQuizzes();
    document.querySelectorAll('.decision-options[data-question]').forEach(decorateGroup);
  }

  sync();
  const main=document.querySelector('main');
  if(main){
    const observer=new MutationObserver(records=>{
      if(records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.decision-options,.decision-card')||n.querySelector?.('.decision-options')))))sync();
    });
    observer.observe(main,{childList:true,subtree:true});
  }
})();