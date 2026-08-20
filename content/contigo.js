/* =============================================================================
   CONTENIDO: PROGRAMA CONTIGO — Paraíso 503
   =============================================================================
   Este archivo controla el banner "Contigo" de la portada (/) y el
   modal informativo que se abre al hacer clic en él. Ambos se generan desde
   este mismo contenido (ver js/content-loader.js -> renderContigo), así que
   editar un texto aquí lo actualiza en los dos lugares a la vez.

   >>> PARA EDITAR EL CONTENIDO, CAMBIA SOLO LOS VALORES DE ABAJO. <<<
   No toques la primera línea (la que dice "window.PARAISO503_CONTENT...")
   ni la línea final con el punto y coma "};".

   Campos:
     - etiqueta / titulo / texto / textoBoton : banner de la portada.
     - foto        : foto del banner (derecha). Mientras quede en null se usa
                     una imagen de referencia; en cuanto pongas una ruta real
                     (ej. "/img/Contigo/contigo.webp") esa foto se usa.
     - modal.foto  : foto superior del modal (misma idea que "foto").
     - modal.servicios : tarjetas de "¿Cómo podemos ayudarte?" (icono = clase
                     de Font Awesome, color = color de fondo del ícono).
     - modal.requisitos : lista de "¿Quiénes pueden solicitarlo?".
     - modal.mensajeWhatsapp : mensaje que se envía al presionar "Enviar
                     mensaje" (se abre WhatsApp con el número de
                     configuracion.js -> contacto.whatsappPrincipal).
     - modal.enlacePagina : a dónde lleva el botón "Ver más sobre el
                     programa" (la página completa del programa).
   ============================================================================= */
window.PARAISO503_CONTENT = window.PARAISO503_CONTENT || {};
window.PARAISO503_CONTENT.contigo = {
  "_ayuda": "Controla el banner 'Contigo' de la portada y su modal. Edita los valores y guarda: el sitio se actualiza solo, sin tocar el HTML.",

  "etiqueta": "Programa Contigo",
  "titulo": "¿Le diste una oportunidad a un animal?",
  "_ayuda_resaltado": "Palabra o frase dentro de 'titulo' que se pinta en color mostaza (igual que en la referencia). Déjala vacía ('') si no quieres resaltar nada.",
  "resaltado": "oportunidad",
  "texto": "No tienes que hacerlo solo. Si abriste las puertas de tu hogar o rescataste un perrito o un gatito, podemos orientarte y ayudarte a brindarle la atención que necesita.",
  "textoBoton": "Ver más sobre el programa",
  "foto":"/img/Contigo/contigo.webp",

  "modal": {
    "titulo": "Contigo",
    "subtitulo": "Estamos aquí para ayudarte.",
    "descripcion": "Si rescataste un animal o encontraste uno en la calle, podemos apoyarte con servicios veterinarios a bajo costo y orientación.",
    "foto":"/img/Contigo/contigo.webp",

    "_ayuda_servicios": "Tarjetas de '¿Cómo podemos ayudarte?'. Puedes agregar o quitar tarjetas libremente.",
    "servicios": [
      { "icono": "fa-solid fa-scissors", "color": "#2F9E8F", "titulo": "Esterilizaciones a bajo costo", "descripcion": "Ayudamos a prevenir camadas no deseadas a precios accesibles." },
      { "icono": "fa-solid fa-stethoscope", "color": "#3E7FBF", "titulo": "Consultas veterinarias", "descripcion": "Evaluación médica general para tu animal rescatado." },
      { "icono": "fa-solid fa-syringe", "color": "#8B5FBF", "titulo": "Jornadas de vacunación", "descripcion": "Protegemos su salud con vacunas esenciales a bajo costo." },
      { "icono": "fa-solid fa-heart-pulse", "color": "#D9636B", "titulo": "Evaluaciones médicas", "descripcion": "Revisamos su estado de salud para brindar el mejor cuidado." },
      { "icono": "fa-solid fa-hand-holding-heart", "color": "#3E7A4E", "titulo": "Casos especiales", "descripcion": "Apoyo en casos críticos o animales con tratamientos." }
    ],

    "_ayuda_requisitos": "Lista de '¿Quiénes pueden solicitarlo?'.",
    "requisitos": [
      "Personas que rescataron un animal de la calle.",
      "Familias de bajos recursos.",
      "Protectores independientes.",
      "Casos evaluados por Paraíso 503."
    ],

    "mensajeWhatsapp": "¡Hola! Rescaté / encontré un animal en la calle y me gustaría recibir orientación sobre el programa Contigo.",
    "enlacePagina": "/contigo/"
  }
};
