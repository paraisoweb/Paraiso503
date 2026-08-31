document.addEventListener('DOMContentLoaded',()=>{
  const delivery=document.querySelector('.donation-redesign .delivery');
  if(delivery){
    const brushObserver=new IntersectionObserver((entries,observer)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('brush-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.35});
    brushObserver.observe(delivery);
  }
});
(function(){
'use strict';
const config=(window.PARAISO503_CONTENT&&window.PARAISO503_CONTENT.configuracion)||{};
const donation=config.donacion||{};
const contact=config.contacto||{};
const local=donation.local||[];
const intl=donation.internacional||[];
const byName=name=>[...local,...intl].find(x=>String(x.nombre||'').toLowerCase()===name.toLowerCase());

function copyValue(value){
  if(!value)return;
  const done=()=>{const toast=document.getElementById('toast')||document.getElementById('copyToast');if(toast){toast.textContent='¡Listo! Número copiado';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1500);}};
  if(navigator.clipboard&&window.isSecureContext) navigator.clipboard.writeText(value).then(done).catch(()=>fallback(value,done));
  else fallback(value,done);
}
function fallback(value,done){const t=document.createElement('textarea');t.value=value;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();done();}
window.copyValue=copyValue;

function selectWallet(button,name,number){
  document.querySelectorAll('.wallet-tab').forEach(b=>b.classList.remove('active'));
  button.classList.add('active');
  const detail=document.getElementById('walletDetail');
  if(detail)detail.classList.add('changing');
  setTimeout(()=>{
    const n=document.getElementById('walletName'),v=document.getElementById('walletNumber');
    if(n)n.textContent=name;if(v)v.textContent=number||'';
    if(detail)detail.classList.remove('changing');
  },140);
}
window.selectWallet=selectWallet;

function hydrate(){
  const bac=byName('Banco BAC');
  if(bac){
    const num=document.getElementById('accountNumber'),holder=document.getElementById('accountHolder');
    if(num){num.dataset.fullNumber=bac.numero||'';num.textContent=bac.numero||'';}
    if(holder)holder.textContent=bac.titular||'';
    const btn=num&&num.parentElement.querySelector('.copy-btn');if(btn)btn.onclick=()=>copyValue(bac.numero||'');
  }
  const wallets=['Chivo Wallet','Nequi','n1co'];
  document.querySelectorAll('.wallet-tab').forEach((btn,i)=>{
    const item=byName(wallets[i]); if(!item)return;
    const img=btn.querySelector('img');if(img&&item.logo)img.src=(item.nombre==='n1co'?'/img/payment/n1co-dark.webp':item.logo);
    btn.onclick=()=>selectWallet(btn,item.nombre,item.numero||'');
  });
  const first=byName('Chivo Wallet');if(first){
    const n=document.getElementById('walletName'),v=document.getElementById('walletNumber');
    if(n)n.textContent=first.nombre;if(v)v.textContent=first.numero||'';
  }
  const paypal=byName('PayPal');
  if(paypal&&paypal.url)document.querySelectorAll('[data-paypal-link],.paypal-local-link,.paypal .pay-btn').forEach(a=>a.href=paypal.url);

  const number=String(contact.whatsappPrincipal||'').replace(/\D/g,'');
  document.querySelectorAll('[data-whatsapp-message]').forEach(a=>{
    a.href=`https://wa.me/${number}?text=${encodeURIComponent(a.dataset.whatsappMessage)}`;
    a.target='_blank';a.rel='noopener';
  });
}

function motion(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const once=new WeakSet();
  function toggle(sel,cls='motion-active',threshold=.28){
    document.querySelectorAll(sel).forEach(el=>new IntersectionObserver(es=>es.forEach(e=>el.classList.toggle(cls,e.isIntersecting)),{threshold}).observe(el));
  }
  toggle('.choice-wrap','motion-active',.35);toggle('.wallet-tabs','motion-active',.4);toggle('.abroad','motion-active',.24);
  document.querySelectorAll('.choice,.visit-cta').forEach(el=>new IntersectionObserver((es,io)=>es.forEach(e=>{if(e.isIntersecting){el.classList.add('shine-ready');io.disconnect();}}),{threshold:.35}).observe(el));

  const bank=document.querySelector('.bank-paper'),account=document.getElementById('accountNumber');
  if(bank&&account)new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting&&!once.has(bank)){once.add(bank);bank.classList.add('is-visible');const full=account.dataset.fullNumber||account.textContent.trim();account.textContent='';let i=0;const timer=setInterval(()=>{account.textContent=full.slice(0,++i);if(i>=full.length)clearInterval(timer)},110);}
  }),{threshold:.5}).observe(bank);

  [['.photo-break','is-visible',.32],['.monthly-card','is-visible',.4],['.visit-paper','is-visible',.35]].forEach(([sel,cls,threshold])=>{
    const el=document.querySelector(sel);if(!el)return;
    new IntersectionObserver((es,io)=>es.forEach(e=>{if(e.isIntersecting&&!once.has(el)){once.add(el);el.classList.add(cls);io.disconnect();}}),{threshold:Number(threshold)}).observe(el);
  });
  document.querySelectorAll('.impact-row').forEach(row=>new IntersectionObserver((es,io)=>es.forEach(e=>{if(e.isIntersecting&&!once.has(row)){once.add(row);row.classList.add('donar-impact-visible');io.disconnect();}}),{threshold:.42}).observe(row));
}
document.addEventListener('DOMContentLoaded',()=>{hydrate();motion();});
})();