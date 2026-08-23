/* Paraíso 503 — microanimaciones premium de Adopciones (sin librerías) */
(function(){
  'use strict';
  if(!document.body.classList.contains('adopciones-page')) return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('p503-motion-ready');

  function prepare(){
    var blocks=document.querySelectorAll('.adoption-support-card,.filter-bar,.pet-card,.req-col,.adopta-note');
    blocks.forEach(function(el,i){
      el.classList.add('premium-reveal');
      if(el.classList.contains('pet-card')) el.style.setProperty('--reveal-delay',Math.min(i%4,3)*55+'ms');
    });
    if(reduce){ blocks.forEach(function(el){el.classList.add('premium-show')}); return; }
    if(!('IntersectionObserver' in window)){ blocks.forEach(function(el){el.classList.add('premium-show')}); return; }
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('premium-show'); io.unobserve(entry.target); }
      });
    },{threshold:.10,rootMargin:'0px 0px -24px 0px'});
    blocks.forEach(function(el){ if(!el.classList.contains('premium-show')) io.observe(el); });
  }

  prepare();
  document.addEventListener('p503:adopciones-rendered',prepare);
  window.setTimeout(prepare,0);


  // Favoritos en tarjetas dinámicas: intercepta el toque antes de que llegue
  // al contenedor de la foto, evitando que al desmarcar se abra el lightbox.
  document.addEventListener('click',function(e){
    var btn=e.target.closest&&e.target.closest('.pet-fav');
    if(!btn) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var key='p503-favoritos';
    var favs=[];
    try{ favs=JSON.parse(localStorage.getItem(key))||[]; }catch(err){}
    var name=btn.dataset.name||'';
    if(!name) return;
    var idx=favs.indexOf(name);
    if(idx>=0) favs.splice(idx,1); else favs.push(name);
    try{ localStorage.setItem(key,JSON.stringify(favs)); }catch(err){}
    document.querySelectorAll('.pet-fav').forEach(function(b){
      var active=favs.indexOf(b.dataset.name)>=0;
      b.classList.toggle('active',active);
      b.innerHTML=active?'<i class="fa-solid fa-heart"></i>':'<i class="fa-regular fa-heart"></i>';
    });
    if(typeof window.applyPetFilters==='function') window.applyPetFilters();
  },true);

  var grid=document.getElementById('petGrid');
  document.querySelectorAll('.filter-btn,#favToggle').forEach(function(btn){
    btn.addEventListener('click',function(){
      if(!grid||reduce) return;
      grid.classList.remove('premium-filter-pulse');
      void grid.offsetWidth;
      grid.classList.add('premium-filter-pulse');
      window.setTimeout(function(){grid.classList.remove('premium-filter-pulse')},260);
    });
  });
})();
