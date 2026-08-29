(()=>{
 const SELECTORS=['.feedback','.lab-result','[id$="Result"]','#companyStatus'];
 const seen=new WeakSet();

 function enhance(el){
  if(!(el instanceof HTMLElement)||seen.has(el))return;
  seen.add(el);
  if(!el.hasAttribute('role'))el.setAttribute('role','status');
  if(!el.hasAttribute('aria-live'))el.setAttribute('aria-live','polite');
  if(!el.hasAttribute('aria-atomic'))el.setAttribute('aria-atomic','true');
 }

 function scan(root=document){
  SELECTORS.forEach(selector=>{
   if(root instanceof Element&&root.matches(selector))enhance(root);
   root.querySelectorAll?.(selector).forEach(enhance);
  });
 }

 scan();
 const observer=new MutationObserver(mutations=>{
  mutations.forEach(mutation=>{
   mutation.addedNodes.forEach(node=>{
    if(node.nodeType===Node.ELEMENT_NODE)scan(node);
   });
  });
 });
 observer.observe(document.body,{childList:true,subtree:true});
})();
