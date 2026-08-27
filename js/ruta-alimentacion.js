document.addEventListener('DOMContentLoaded',()=>{
  const items=[...document.querySelectorAll('.ruta-acc')];
  const root=document.documentElement;

  const keepButtonFixed=(btn,top,start,duration=460)=>{
    const previousScrollBehavior=root.style.scrollBehavior;
    root.style.scrollBehavior='auto';

    const frame=(now)=>{
      const currentTop=btn.getBoundingClientRect().top;
      const correction=currentTop-top;
      if(Math.abs(correction)>.25){
        window.scrollTo(0,window.scrollY+correction);
      }
      if(now-start<duration){
        requestAnimationFrame(frame);
      }else{
        const finalTop=btn.getBoundingClientRect().top;
        const finalCorrection=finalTop-top;
        if(Math.abs(finalCorrection)>.25){
          window.scrollTo(0,window.scrollY+finalCorrection);
        }
        root.style.scrollBehavior=previousScrollBehavior;
      }
    };
    requestAnimationFrame(frame);
  };

  items.forEach(item=>{
    const btn=item.querySelector('.ruta-acc-btn');
    btn.addEventListener('click',()=>{
      const opening=!item.classList.contains('open');
      const anchorTop=btn.getBoundingClientRect().top;
      const started=performance.now();

      items.forEach(other=>{
        if(other!==item){
          other.classList.remove('open');
          other.querySelector('.ruta-acc-btn')?.setAttribute('aria-expanded','false');
        }
      });

      if(opening){
        item.classList.add('open');
        btn.setAttribute('aria-expanded','true');
      }else{
        item.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
      }

      keepButtonFixed(btn,anchorTop,started);
    });
  });
});
