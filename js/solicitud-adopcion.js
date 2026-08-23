(function(){
  'use strict';
  const form=document.getElementById('adoptionApplicationForm');
  if(!form)return;
  const steps=[...document.querySelectorAll('.adoption-step')];
  const progress=[...document.querySelectorAll('.progress-item')];
  const errorBox=document.getElementById('formError');
  const petSelect=document.getElementById('animalito');
  const selectedPet=document.getElementById('selectedPet');
  const pets=(window.PARAISO503_CONTENT&&window.PARAISO503_CONTENT.adopciones&&window.PARAISO503_CONTENT.adopciones.animalitos)||[];
  let current=0;
  const municipios={
    'Ahuachapán':['Ahuachapán','Apaneca','Atiquizaya','Concepción de Ataco','El Refugio','Guaymango','Jujutla','San Francisco Menéndez','San Lorenzo','San Pedro Puxtla','Tacuba','Turín'],
    'Cabañas':['Cinquera','Dolores','Guacotecti','Ilobasco','Jutiapa','San Isidro','Sensuntepeque','Tejutepeque','Victoria'],
    'Chalatenango':['Agua Caliente','Arcatao','Azacualpa','Chalatenango','Citalá','Comalapa','Concepción Quezaltepeque','Dulce Nombre de María','El Carrizal','El Paraíso','La Laguna','La Palma','La Reina','Las Vueltas','Nombre de Jesús','Nueva Concepción','Nueva Trinidad','Ojos de Agua','Potonico','San Antonio de la Cruz','San Antonio Los Ranchos','San Fernando','San Francisco Lempa','San Francisco Morazán','San Ignacio','San Isidro Labrador','San José Cancasque','San José Las Flores','San Luis del Carmen','San Miguel de Mercedes','San Rafael','Santa Rita','Tejutla'],
    'Cuscatlán':['Candelaria','Cojutepeque','El Carmen','El Rosario','Monte San Juan','Oratorio de Concepción','San Bartolomé Perulapía','San Cristóbal','San José Guayabal','San Pedro Perulapán','San Rafael Cedros','San Ramón','Santa Cruz Analquito','Santa Cruz Michapa','Suchitoto','Tenancingo'],
    'La Libertad':['Antiguo Cuscatlán','Chiltiupán','Ciudad Arce','Colón','Comasagua','Huizúcar','Jayaque','Jicalapa','La Libertad','Nuevo Cuscatlán','Quezaltepeque','Sacacoyo','San José Villanueva','San Juan Opico','San Matías','San Pablo Tacachico','Santa Tecla','Talnique','Tamanique','Teotepeque','Tepecoyo','Zaragoza'],
    'La Paz':['Cuyultitán','El Rosario','Jerusalén','Mercedes La Ceiba','Olocuilta','Paraíso de Osorio','San Antonio Masahuat','San Emigdio','San Francisco Chinameca','San Juan Nonualco','San Juan Talpa','San Juan Tepezontes','San Luis La Herradura','San Luis Talpa','San Miguel Tepezontes','San Pedro Masahuat','San Pedro Nonualco','San Rafael Obrajuelo','Santa María Ostuma','Santiago Nonualco','Tapalhuaca','Zacatecoluca'],
    'La Unión':['Anamorós','Bolívar','Concepción de Oriente','Conchagua','El Carmen','El Sauce','Intipucá','La Unión','Lislique','Meanguera del Golfo','Nueva Esparta','Pasaquina','Polorós','San Alejo','San José','Santa Rosa de Lima','Yayantique','Yucuaiquín'],
    'Morazán':['Arambala','Cacaopera','Chilanga','Corinto','Delicias de Concepción','El Divisadero','El Rosario','Gualococti','Guatajiagua','Joateca','Jocoaitique','Jocoro','Lolotiquillo','Meanguera','Osicala','Perquín','San Carlos','San Fernando','San Francisco Gotera','San Isidro','San Simón','Sensembra','Sociedad','Torola','Yamabal','Yoloaiquín'],
    'San Miguel':['Carolina','Chapeltique','Chinameca','Chirilagua','Ciudad Barrios','Comacarán','El Tránsito','Lolotique','Moncagua','Nueva Guadalupe','Nuevo Edén de San Juan','Quelepa','San Antonio','San Gerardo','San Jorge','San Luis de la Reina','San Miguel','San Rafael Oriente','Sesori','Uluazapa'],
    'San Salvador':['Aguilares','Apopa','Ayutuxtepeque','Cuscatancingo','Delgado','El Paisnal','Guazapa','Ilopango','Mejicanos','Nejapa','Panchimalco','Rosario de Mora','San Marcos','San Martín','San Salvador','Santiago Texacuangos','Santo Tomás','Soyapango','Tonacatepeque'],
    'San Vicente':['Apastepeque','Guadalupe','San Cayetano Istepeque','San Esteban Catarina','San Ildefonso','San Lorenzo','San Sebastián','San Vicente','Santa Clara','Santo Domingo','Tecoluca','Tepetitán','Verapaz'],
    'Santa Ana':['Candelaria de la Frontera','Chalchuapa','Coatepeque','El Congo','El Porvenir','Masahuat','Metapán','San Antonio Pajonal','San Sebastián Salitrillo','Santa Ana','Santa Rosa Guachipilín','Santiago de la Frontera','Texistepeque'],
    'Sonsonate':['Acajutla','Armenia','Caluco','Cuisnahuat','Izalco','Juayúa','Nahuizalco','Nahulingo','Salcoatitán','San Antonio del Monte','San Julián','Santa Catarina Masahuat','Santa Isabel Ishuatán','Santo Domingo de Guzmán','Sonsonate','Sonzacate'],
    'Usulután':['Alegría','Berlín','California','Concepción Batres','El Triunfo','Ereguayquín','Estanzuelas','Jiquilisco','Jucuapa','Jucuarán','Mercedes Umaña','Nueva Granada','Ozatlán','Puerto El Triunfo','San Agustín','San Buenaventura','San Dionisio','San Francisco Javier','Santa Elena','Santa María','Santiago de María','Tecapán','Usulután']
  };
  const dep=document.getElementById('departamento'), mun=document.getElementById('municipio');
  function updateMunicipios(){const list=municipios[dep.value]||[];mun.innerHTML='<option value="">Selecciona</option>'+list.map(v=>'<option>'+v+'</option>').join('');mun.disabled=!list.length;}
  dep.addEventListener('change',updateMunicipios);

  const ocupacion=document.getElementById('ocupacion'), ocupacionDetalleField=document.getElementById('ocupacionDetalleField');
  function toggleOcupacionDetalle(){const show=ocupacion.value==='Trabajo'||ocupacion.value==='Trabajo y estudio';ocupacionDetalleField.hidden=!show;if(!show)document.getElementById('ocupacion_detalle').value='';}
  ocupacion.addEventListener('change',toggleOcupacionDetalle);
  toggleOcupacionDetalle();


  function cleanName(name){return String(name||'').replace(/^[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+\s*/,'').trim();}
  function populatePets(){
    pets.forEach(p=>{const o=document.createElement('option');o.value=cleanName(p.nombre);o.textContent=cleanName(p.nombre);petSelect.appendChild(o);});
    const requested=new URLSearchParams(location.search).get('animalito');
    if(requested){const requestedClean=cleanName(requested).toLowerCase();const match=pets.find(p=>cleanName(p.nombre).toLowerCase()===requestedClean);if(match)petSelect.value=cleanName(match.nombre);}
    updatePetPreview();
  }
  function updatePetPreview(){
    const pet=pets.find(p=>cleanName(p.nombre)===petSelect.value);
    if(!pet){selectedPet.hidden=true;return;}
    document.getElementById('selectedPetImg').src=pet.foto||'';
    document.getElementById('selectedPetImg').alt=pet.alt||cleanName(pet.nombre);
    document.getElementById('selectedPetName').textContent=cleanName(pet.nombre);
    document.getElementById('selectedPetMeta').textContent=(pet.edad==='adulto'?'Adulto':'Cachorro')+' · '+(pet.sexo==='hembra'?'Hembra':'Macho');
    selectedPet.hidden=false;
  }
  function showStep(index,{scroll=true}={}){
    current=Math.max(0,Math.min(index,steps.length-1));
    steps.forEach((s,i)=>s.hidden=i!==current);
    document.querySelector('.form-progress')?.style.setProperty('--progress-step',String(current));
    progress.forEach((p,i)=>{p.classList.toggle('active',i===current);p.classList.toggle('done',i<current);const dot=p.querySelector('.progress-dot');dot.innerHTML=i<current?'<i class="fa-solid fa-check"></i>':String(i+1);});
    errorBox.classList.remove('show');
    if(scroll)document.getElementById('formCard')?.scrollIntoView({behavior:'smooth',block:'start'});
    if(current===3)buildReview();
  }
  function validateStep(){
    if(current===0){const tel=document.getElementById('telefono');const digits=tel.value.replace(/\D/g,'');if(digits.length!==8){tel.setCustomValidity('Ingresa un número salvadoreño de 8 dígitos.');tel.reportValidity();return false;}tel.setCustomValidity('');}
    const fields=[...steps[current].querySelectorAll('input,select,textarea')].filter(el=>!el.disabled&&!el.closest('[hidden]'));
    for(const el of fields){if(!el.checkValidity()){el.reportValidity();return false;}}
    return true;
  }
  function value(name){const els=[...form.elements].filter(el=>el.name===name);if(!els.length)return '—';if(els[0].type==='radio'){const c=els.find(el=>el.checked);return c?c.value:'—';}return els[0].value.trim()||'—';}
  function buildReview(){
    const other=value('otros_animales')==='Sí'?value('cantidad_animales')+' · '+value('comportamiento_animales'):'No';
    const rows=[['Animalito',value('animalito')],['Nombre',value('nombres')+' '+value('apellidos')],['Edad',value('edad')],['Ocupación',value('ocupacion')+(value('lugar_trabajo')!=='—'?' · '+value('lugar_trabajo'):'' )],['Ubicación',value('municipio')+', '+value('departamento')+(value('sector')!=='—'?' · '+value('sector'):'')],['Teléfono / WhatsApp',value('telefono')],['Motivo para adoptar',value('motivo_adopcion')],['Otros animalitos',other],['Tiempo solo',value('tiempo_solo')],['Compromiso veterinario',value('compromiso_veterinario')]];
    document.getElementById('reviewList').innerHTML=rows.map(r=>'<div class="review-row"><b>'+escapeHtml(r[0])+'</b><span>'+escapeHtml(r[1])+'</span></div>').join('');
  }
  function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function toggleOtherPets(){const yes=form.querySelector('input[name="otros_animales"]:checked')?.value==='Sí';const box=document.getElementById('otherPetsFields');box.hidden=!yes;box.querySelectorAll('input,textarea').forEach(el=>el.required=yes);}

  document.querySelectorAll('[data-next]').forEach(btn=>btn.addEventListener('click',()=>{if(validateStep())showStep(current+1);}));
  document.querySelectorAll('[data-prev]').forEach(btn=>btn.addEventListener('click',()=>showStep(current-1)));
  progress.forEach((p,i)=>p.addEventListener('click',()=>{if(i<current)showStep(i);}));
  petSelect.addEventListener('change',updatePetPreview);
  form.querySelectorAll('input[name="otros_animales"]').forEach(r=>r.addEventListener('change',toggleOtherPets));

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!validateStep())return;
    if(!document.getElementById('confirmReview').checked){document.getElementById('confirmReview').reportValidity();return;}
    const card=document.getElementById('formCard');
    const sending=document.getElementById('formSending');
    const success=document.getElementById('formSuccess');
    const submit=document.getElementById('submitApplication');
    submit.disabled=true;errorBox.classList.remove('show');
    steps.forEach(s=>s.hidden=true);card.style.display='none';sending.classList.add('show');
    try{
      const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
      if(!response.ok){let detail='';try{const data=await response.json();detail=(data&&data.errors&&data.errors.map(e=>e.message).join(' '))||data.error||'';}catch(_){}throw new Error(detail||'No se pudo enviar');}
      sending.classList.remove('show');success.classList.add('show');
      requestAnimationFrame(()=>success.scrollIntoView({behavior:'smooth',block:'center'}));
      if(window.dataLayer)window.dataLayer.push({event:'solicitud_adopcion_enviada',animalito:value('animalito')});
    }catch(err){
      sending.classList.remove('show');card.style.display='block';showStep(3);submit.disabled=false;errorBox.textContent='No pudimos enviar la solicitud en este momento. Revisa tu conexión e inténtalo nuevamente. También puedes escribirnos por WhatsApp.';errorBox.classList.add('show');
    }
  });
  // Al entrar por primera vez mostramos la cabecera completa. Solo los cambios de paso
  // desplazan la vista al inicio de la tarjeta blanca.
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  populatePets();toggleOtherPets();toggleOcupacionDetalle();showStep(0,{scroll:false});
  requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'auto'}));

  // En móvil, cuando aparece el teclado, mantenemos el campo activo dentro de la zona
  // visible para que el usuario pueda ver lo que está escribiendo.
  function keepFocusedFieldVisible(el){
    if(!el||window.innerWidth>700)return;
    window.setTimeout(()=>{
      const vv=window.visualViewport;
      const rect=el.getBoundingClientRect();
      const visibleTop=vv?vv.offsetTop:0;
      const visibleBottom=(vv?vv.offsetTop+vv.height:window.innerHeight);
      const margin=18;
      if(rect.top<visibleTop+margin||rect.bottom>visibleBottom-margin){
        el.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'});
      }
    },260);
  }
  form.addEventListener('focusin',e=>{
    if(e.target.matches('input,textarea,select'))keepFocusedFieldVisible(e.target);
  });
  window.visualViewport?.addEventListener('resize',()=>{
    const el=document.activeElement;
    if(el&&form.contains(el)&&el.matches('input,textarea,select'))keepFocusedFieldVisible(el);
  });
})();
