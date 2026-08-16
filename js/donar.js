(function(){
  'use strict';
  const config=(window.PARAISO503_CONTENT&&window.PARAISO503_CONTENT.configuracion)||{};
  const donation=config.donacion||{};
  const contact=config.contacto||{};

  function escapeHtml(value){return String(value||'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));}
  function paymentCard(item,index,main){
    const logo=item.logo?`<img src="${escapeHtml(item.logo)}" alt="${escapeHtml(item.nombre)}"/>`:`<i class="${escapeHtml(item.icono||'fa-solid fa-hand-holding-heart')}"></i>`;
    const brandClass=item.marca?` payment-${escapeHtml(item.marca)}`:'';
    const name=item.nombre==='Banco BAC'?'Banco BAC':item.nombre;
    const description=`<p>${escapeHtml(item.descripcion||'Solicita los datos para realizar tu aporte.')}</p>`;
    if(item.url)return `<a class="payment-card payment-link${brandClass}" href="${escapeHtml(item.url)}" target="_blank" rel="noopener"><span class="payment-brand">${logo}</span><span class="payment-details"><strong>${escapeHtml(name)}</strong>${description}<span class="payment-action">${item.nombre==='PayPal'?'Paraíso de los Animales':'Abrir enlace'} <i class="fa-solid fa-arrow-up-right-from-square"></i></span></span></a>`;
    const holder=item.titular?`<span class="payment-chip"><small>Titular</small><b>${escapeHtml(item.titular)}</b></span>`:'';
    const number=item.numero?`<span class="payment-chip payment-number"><span><small>Número${main?' de cuenta':''}</small><code>${escapeHtml(item.numero)}</code></span><button class="copy-button" type="button" data-copy="${escapeHtml(item.numero)}" aria-label="Copiar ${main?'número de cuenta':'número de '+item.nombre}"><i class="fa-regular fa-copy"></i></button></span>`:'';
    return `<div class="payment-card${main?' payment-card-main':''}${brandClass}" data-method="${index}"><span class="payment-brand">${logo}</span><div class="payment-details"><strong>${escapeHtml(name)}</strong>${description}<div class="payment-values">${holder}${number}</div></div></div>`;
  }
  function renderPayments(){
    const local=document.getElementById('localPaymentGrid');
    const international=document.getElementById('internationalPaymentGrid');
    if(local){const order={"Banco BAC":0,"Chivo Wallet":1,"n1co":2,"Nequi":3,"PayPal":4};const methods=[...(donation.local||[])].sort((a,b)=>(order[a.nombre]??99)-(order[b.nombre]??99));local.innerHTML=methods.map((item,index)=>paymentCard(item,index,index===0)).join('');}
    if(international)international.innerHTML=(donation.internacional||[]).map((item,index)=>paymentCard(item,index,false)).join('');
  }
  function whatsappLinks(){
    const number=String(contact.whatsappPrincipal||'').replace(/\D/g,'');
    document.querySelectorAll('[data-whatsapp-message]').forEach(link=>{link.href=`https://wa.me/${number}?text=${encodeURIComponent(link.dataset.whatsappMessage)}`;link.target='_blank';link.rel='noopener';});
  }
  function copyHandlers(){
    const toast=document.getElementById('copyToast');let timeout;
    document.addEventListener('click',async event=>{const button=event.target.closest('[data-copy]');if(!button)return;try{await navigator.clipboard.writeText(button.dataset.copy);}catch(error){const area=document.createElement('textarea');area.value=button.dataset.copy;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();}button.innerHTML='<i class="fa-solid fa-check"></i>';if(toast){toast.textContent='Número copiado';toast.classList.add('show');clearTimeout(timeout);timeout=setTimeout(()=>toast.classList.remove('show'),1800);}setTimeout(()=>button.innerHTML='<i class="fa-regular fa-copy"></i>',1300);});
  }
  renderPayments();whatsappLinks();copyHandlers();
})();
