(function(){
  /* v11: revelado sutil de secciones, una sola vez. */
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets=[...document.querySelectorAll('.mia-gallery-section,.mia-story-grid > .mia-card,.mia-benefit-card,.mia-cta,.mia-more-section')];
  if(!reducedMotion&&'IntersectionObserver' in window){
    revealTargets.forEach(el=>el.classList.add('mia-reveal'));
    const revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('mia-reveal-visible');revealObserver.unobserve(entry.target);}});
    },{threshold:.08,rootMargin:'0px 0px -24px 0px'});
    revealTargets.forEach(el=>revealObserver.observe(el));
  }else revealTargets.forEach(el=>el.classList.add('mia-reveal-visible'));
  /* El header se controla exclusivamente desde script.js, igual que en el resto del sitio. */

  const lightbox=document.getElementById('miaLightbox');
  if(lightbox){
    const big=lightbox.querySelector('img');
    const closeBtn=lightbox.querySelector('.mia-lightbox-close');
    const video=document.createElement('video');
    video.className='mia-lightbox-video';video.controls=true;video.playsInline=true;video.preload='metadata';
    big.insertAdjacentElement('afterend',video);
    const items=[...document.querySelectorAll('.mia-gallery-item')];
    items.forEach(item=>{const img=item.querySelector('img');if(!img)return;const fit=()=>{if(img.naturalWidth/img.naturalHeight>1.15)item.classList.add('mia-gallery-landscape');};if(img.complete)fit();else img.addEventListener('load',fit,{once:true});});
    let index=0,lockedY=0,startX=0,startY=0,dragging=false;
    const stopVideo=()=>{video.pause();video.removeAttribute('src');video.load();lightbox.classList.remove('mia-show-video');};
    const show=i=>{index=(i+items.length)%items.length;const item=items[index],img=item.querySelector('img'),src=item.dataset.videoSrc;if(src){video.src=src;video.poster=(img&&img.src)||item.dataset.poster||'';lightbox.classList.add('mia-show-video');big.removeAttribute('src');}else{stopVideo();if(img){big.src=img.src;big.alt=img.alt;}}};
    const lock=()=>{lockedY=window.scrollY;const header=document.querySelector('.mia-page>header');if(header)header.classList.add('mia-lightbox-header');document.documentElement.style.overscrollBehavior='none';document.body.classList.add('mia-lightbox-lock');document.body.style.top=`-${lockedY}px`;};
    const unlock=()=>{const y=lockedY,html=document.documentElement,prevBehavior=html.style.scrollBehavior,header=document.querySelector('.mia-page>header');html.style.scrollBehavior='auto';document.body.classList.remove('mia-lightbox-lock');document.body.style.top='';window.scrollTo({top:y,left:0,behavior:'auto'});requestAnimationFrame(()=>{if(header)header.classList.remove('mia-lightbox-header');html.style.scrollBehavior=prevBehavior;html.style.overscrollBehavior='';});};
    const open=i=>{show(i);lock();lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');};
    const close=()=>{if(!lightbox.classList.contains('open'))return;dragging=false;stopVideo();lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');unlock();};
    items.forEach((btn,i)=>btn.addEventListener('click',()=>open(i)));

    /* La X queda fuera de la lógica de swipe. En táctil cerramos en touchend
       y cancelamos el click sintético posterior para evitar dobles eventos. */
    let closedByTouch=false;
    closeBtn.addEventListener('touchstart',e=>{e.stopPropagation();},{passive:true});
    closeBtn.addEventListener('touchend',e=>{e.preventDefault();e.stopPropagation();closedByTouch=true;close();setTimeout(()=>{closedByTouch=false},450);},{passive:false});
    closeBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();if(!closedByTouch)close();});

    /* Tocar únicamente el fondo oscuro también cierra. */
    lightbox.addEventListener('click',e=>{if(e.target===lightbox)close();});
    document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show(index+1);if(e.key==='ArrowLeft')show(index-1);});

    /* Los gestos pertenecen al contenido (foto/video), nunca al contenedor
       completo ni al botón X. Así el fondo y el cierre no compiten con swipe. */
    const swipeTargets=[big,video];
    swipeTargets.forEach(media=>{
      media.addEventListener('touchstart',e=>{if(e.touches.length!==1){dragging=false;return;}startX=e.touches[0].clientX;startY=e.touches[0].clientY;dragging=true;},{passive:true});
      media.addEventListener('touchmove',e=>{if(!dragging||e.touches.length!==1)return;const dx=e.touches[0].clientX-startX,dy=e.touches[0].clientY-startY;if(Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy))e.preventDefault();},{passive:false});
      media.addEventListener('touchend',e=>{if(!dragging)return;dragging=false;const t=e.changedTouches[0],dx=t.clientX-startX,dy=t.clientY-startY;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.2)show(index+(dx<0?1:-1));},{passive:true});
      media.addEventListener('touchcancel',()=>{dragging=false;},{passive:true});
    });
  }

  const galleryRail=document.querySelector('.mia-gallery');
  if(galleryRail&&window.matchMedia('(max-width:800px)').matches){
    let gDir=1,gPaused=false,gVisible=false,gPos=galleryRail.scrollLeft,gLastTime=0,gResumeTimer=0,gEdgePauseUntil=0;
    const gMax=()=>Math.max(0,galleryRail.scrollWidth-galleryRail.clientWidth);
    const setAutoSnap=active=>{galleryRail.style.scrollSnapType=active?'none':'';galleryRail.style.scrollBehavior=active?'auto':'';};
    const gStep=t=>{
      if(!gLastTime)gLastTime=t;
      const dt=Math.min(40,t-gLastTime);gLastTime=t;
      if(gVisible&&!gPaused&&gMax()>2&&t>=gEdgePauseUntil){
        setAutoSnap(true);
        const m=gMax(),speed=22;
        gPos+=gDir*speed*(dt/1000);
        if(gPos>=m){gPos=m;gDir=-1;gEdgePauseUntil=t+320;}
        else if(gPos<=0){gPos=0;gDir=1;gEdgePauseUntil=t+320;}
        galleryRail.scrollLeft=Math.round(gPos);
      }else if(!gPaused){gPos=galleryRail.scrollLeft;}
      requestAnimationFrame(gStep);
    };
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        gVisible=entry.isIntersecting;
        gPos=galleryRail.scrollLeft;
        gLastTime=0;
        if(gVisible&&!gPaused)setAutoSnap(true);else if(!gVisible)setAutoSnap(false);
      });
    },{threshold:.08,rootMargin:'40px 0px 40px 0px'});
    observer.observe(galleryRail);
    requestAnimationFrame(gStep);
    const syncDirection=()=>{const now=galleryRail.scrollLeft;if(gPaused&&Math.abs(now-gPos)>1)gDir=now>gPos?1:-1;gPos=now;};
    galleryRail.addEventListener('scroll',syncDirection,{passive:true});
    const pause=()=>{gPaused=true;clearTimeout(gResumeTimer);gPos=galleryRail.scrollLeft;setAutoSnap(false);};
    const resume=()=>{clearTimeout(gResumeTimer);gResumeTimer=setTimeout(()=>{gPaused=false;gPos=galleryRail.scrollLeft;gLastTime=0;if(gVisible)setAutoSnap(true);},1400);};
    galleryRail.addEventListener('pointerdown',pause,{passive:true});
    galleryRail.addEventListener('touchstart',pause,{passive:true});
    ['pointerup','pointercancel','touchend','touchcancel'].forEach(e=>galleryRail.addEventListener(e,resume,{passive:true}));
  }

  const rail=document.querySelector('.mia-more');if(!rail)return;
  let mDir=1,mPaused=false,mVisible=false,mPos=rail.scrollLeft,mLastTime=0,mResumeTimer=0,mEdgePauseUntil=0;
  const mMax=()=>Math.max(0,rail.scrollWidth-rail.clientWidth);
  const setMoreAuto=active=>{rail.style.scrollSnapType=active?'none':'';rail.style.scrollBehavior=active?'auto':'';};
  const mStep=t=>{
    if(!mLastTime)mLastTime=t;
    const dt=Math.min(40,t-mLastTime);mLastTime=t;
    if(mVisible&&!mPaused&&mMax()>2&&t>=mEdgePauseUntil){
      setMoreAuto(true);
      const limit=mMax(),speed=24;
      mPos+=mDir*speed*(dt/1000);
      if(mPos>=limit){mPos=limit;mDir=-1;mEdgePauseUntil=t+360;}
      else if(mPos<=0){mPos=0;mDir=1;mEdgePauseUntil=t+360;}
      rail.scrollLeft=Math.round(mPos);
    }else if(!mPaused){mPos=rail.scrollLeft;}
    requestAnimationFrame(mStep);
  };
  const moreObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      mVisible=entry.isIntersecting;mPos=rail.scrollLeft;mLastTime=0;
      if(mVisible&&!mPaused)setMoreAuto(true);else if(!mVisible)setMoreAuto(false);
    });
  },{threshold:.08,rootMargin:'40px 0px 40px 0px'});
  moreObserver.observe(rail);
  requestAnimationFrame(mStep);
  const syncMoreDirection=()=>{const now=rail.scrollLeft;if(mPaused&&Math.abs(now-mPos)>1)mDir=now>mPos?1:-1;mPos=now;};
  rail.addEventListener('scroll',syncMoreDirection,{passive:true});
  const pauseMore=()=>{mPaused=true;clearTimeout(mResumeTimer);mPos=rail.scrollLeft;setMoreAuto(false);};
  const resumeMore=()=>{clearTimeout(mResumeTimer);mResumeTimer=setTimeout(()=>{mPaused=false;mPos=rail.scrollLeft;mLastTime=0;if(mVisible)setMoreAuto(true);},1400);};
  rail.addEventListener('pointerdown',pauseMore,{passive:true});
  rail.addEventListener('touchstart',pauseMore,{passive:true});
  ['pointerup','pointercancel','touchend','touchcancel'].forEach(e=>rail.addEventListener(e,resumeMore,{passive:true}));
})();
