/* =============================================================================
   CONTENT LOADER — Paraíso 503
   =============================================================================
   Este archivo es el ÚNICO lugar donde el sitio lee el contenido de la
   carpeta /content y construye el HTML de las partes que cambian seguido
   (programas, adopciones, historias, estadísticas, contacto/redes/donaciones).

   >>> PARA AGREGAR CONTENIDO NUEVO NO EDITES ESTE ARCHIVO. <<<
   Edita el archivo correspondiente en /content/:
     - Nuevo programa            -> content/programas.js
     - Nuevo animalito en adopción -> content/adopciones.js
     - Nueva historia de éxito   -> content/historias.js
     - Cambiar el programa Contigo (banner + modal) -> content/contigo.js
     - Cambiar un número/estadística -> content/estadisticas.js
     - Cambiar teléfono, redes, formas de donar, necesidad del mes
                                  -> content/configuracion.js
     - Nueva foto/video en galeria.html -> content/galeria.js

   Cada archivo trae comentarios explicando cada campo. El contenido está
   escrito en formato JSON dentro de una pequeña asignación de JavaScript
   (window.PARAISO503_CONTENT.xxx = { ... };) en vez de un .json suelto:
   así el navegador puede leerlo con una simple etiqueta <script>, tanto si
   el sitio se abre con doble clic (file://) como si se sirve desde un
   servidor web (GitHub Pages, etc.). Un fetch()/XMLHttpRequest normal de
   un .json falla en file:// por restricciones de seguridad del navegador
   (por eso el sitio no cargaba el contenido al abrirlo directo en ChromeOS);
   una etiqueta <script src="content/xxx.js"> no tiene esa restricción y
   funciona igual en ambos escenarios.

   Los 5 archivos de /content/ se cargan con <script> ANTES que este
   archivo en cada página (ver el final de index.html, programas.html,
   adopciones.html e historias.html), así que al ejecutarse este script los
   datos ya están disponibles de forma síncrona en window.PARAISO503_CONTENT.

   Este script detecta solo los contenedores que existen en la página actual
   (index.html, programas.html, adopciones.html, historias.html), así que es
   seguro incluirlo en las 4 páginas sin importar qué secciones tenga cada una.
   ============================================================================= */

(function () {
  'use strict';

  // Avisa de inmediato (de forma síncrona, sin esperar a nada) que este
  // script está presente en la página. script.js usa esta bandera para
  // saber si debe encargarse él mismo de llamar a initSiteInteractions()
  // o si puede confiar en que content-loader.js lo hará al terminar de
  // renderizar. Esto evita depender de un temporizador "a ciegas" que
  // podría dispararse antes de que los JSON terminen de cargar (el bug
  // que dejaba el acordeón de programas.html vacío en conexiones lentas).
  window.__p503ContentLoaderPresent = true;

  /* ---------------------------------------------------------------------
     Utilidades generales
     --------------------------------------------------------------------- */

  // Lee un bloque de contenido ya cargado en window.PARAISO503_CONTENT por
  // la etiqueta <script src="content/xxx.js"> correspondiente (incluida en
  // el HTML antes que este archivo). Esto reemplaza al fetch() de un .json:
  // fetch()/XMLHttpRequest de un archivo local fallan en Chrome (y otros
  // navegadores) cuando el sitio se abre como file://, mientras que una
  // etiqueta <script> se ejecuta sin problema en ambos escenarios
  // (file:// y servidor web), así que el contenido siempre está disponible
  // de forma síncrona para cuando este script se ejecuta.
  function getContent(key) {
    const data = window.PARAISO503_CONTENT && window.PARAISO503_CONTENT[key];
    if (!data) {
      console.error(
        '[content-loader] No se encontró contenido para "' + key + '". ' +
        'Verifica que la página incluya <script src="content/' + key + '.js"></script> ' +
        'ANTES de <script src="js/content-loader.js"></script>.'
      );
      return null;
    }
    return data;
  }

  // Genera una imagen de referencia (SVG) para usar mientras no exista una
  // foto real. En cuanto el JSON tenga un valor en "foto"/"fotoAntes"/
  // "fotoDespues", esa foto real se usa en su lugar automáticamente.
  function placeholderImg(label) {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#1E3D2B"/><stop offset="1" stop-color="#C9683D"/></linearGradient></defs>' +
      '<rect width="600" height="450" fill="url(#g)"/>' +
      '<text x="50%" y="46%" font-family="sans-serif" font-size="20" fill="#ffffff" fill-opacity="0.85" text-anchor="middle">📷 Foto: ' +
      escapeHtml(label) + '</text></svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // Placeholder para videos/playlists de ejemplo que todavía no tienen un
  // enlace real de YouTube (ver renderGaleria más abajo).
  function placeholderVideoImg(label) {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450">' +
      '<defs><linearGradient id="gv" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#1E3D2B"/><stop offset="1" stop-color="#3E7A4E"/></linearGradient></defs>' +
      '<rect width="600" height="450" fill="url(#gv)"/>' +
      '<text x="50%" y="46%" font-family="sans-serif" font-size="20" fill="#ffffff" fill-opacity="0.85" text-anchor="middle">🎬 ' +
      escapeHtml(label) + '</text></svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // Extrae el ID de un video a partir de cualquier formato habitual de
  // enlace de YouTube (youtu.be, watch?v=, /embed/, /shorts/). Con ese ID
  // se puede pedir la miniatura oficial del video sin guardar ninguna
  // imagen a mano: así, cuando se reemplaza un "youtubeUrl" de ejemplo por
  // un enlace real, la miniatura aparece sola.
  function idYoutube(url) {
    if (!url) return null;
    const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }
  function miniaturaYoutube(url) {
    const id = idYoutube(url);
    return id ? ('https://img.youtube.com/vi/' + id + '/hqdefault.jpg') : null;
  }

  // Evita que texto proveniente del JSON rompa el HTML si algún día contiene
  // caracteres como < > o comillas.
  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Muestra un mensaje de aviso dentro de un contenedor cuando su contenido
  // no pudo cargarse (por ejemplo, programas.json no respondió). No cambia
  // el diseño general: usa una clase propia (con estilo mínimo inline como
  // respaldo) para que el usuario vea un aviso claro en vez de un espacio
  // en blanco.
  function showLoadError(containerId, mensaje) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML =
      '<p class="content-load-error" style="padding:1.5rem;text-align:center;opacity:0.85;">' +
      escapeHtml(mensaje) +
      '</p>';
  }

  /* ---------------------------------------------------------------------
     ESTADÍSTICAS — franja verde con los números (portada)
     --------------------------------------------------------------------- */
  function renderEstadisticas(data) {
    const cont = document.querySelector('.stats-inner');
    if (!cont || !data || !Array.isArray(data.estadisticas)) return;
    cont.innerHTML = data.estadisticas.map(s =>
      '<div class="stat"><b>' + escapeHtml(s.valor) + '</b><span>' + escapeHtml(s.etiqueta) + '</span></div>'
    ).join('');
  }

  /* ---------------------------------------------------------------------
     Carrusel "Urgencias de este mes" — HTML de cada tipo de tarjeta.
     necesidadUrgenteCardHtml(): la tarjeta especial "Necesidades
     prioritarias" (lista de necesidades + barra de progreso + botón que
     lleva a #donar). Conserva exactamente el mismo diseño que tenía como
     tarjeta fija en el HTML.
     urgenciaCardHtml(): el resto de tarjetas (ej. "Rescate reciente"):
     foto opcional + descripción + botón que abre un modal.
     --------------------------------------------------------------------- */
  function necesidadUrgenteCardHtml(u) {
    const listaHtml = Array.isArray(u.necesidades)
      ? u.necesidades.map(n => '<li>' + escapeHtml(n) + '</li>').join('')
      : '';
    const tieneMonto = u.montoRecaudado != null && u.montoRecaudado !== '';
    const tieneMeta = u.meta != null && u.meta !== '';
    const montoTexto = '$' + (tieneMonto ? u.montoRecaudado : '___') + ' recaudados de $' + (tieneMeta ? u.meta : '___');
    const pct = (tieneMonto && tieneMeta && u.meta > 0) ? Math.max(0, Math.min(100, (u.montoRecaudado / u.meta) * 100)) : 0;
    return (
      '<div class="urgencia reveal">' +
        '<div class="left">' +
          '<span class="tagtop">' + escapeHtml(u.etiqueta) + '</span>' +
          '<h3>' + escapeHtml(u.titulo) + '</h3>' +
          '<p>' + escapeHtml(u.descripcion) + '</p>' +
          '<ul class="urgencia-lista">' + listaHtml + '</ul>' +
          '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%"></div></div>' +
          '<div class="bar-label">' + escapeHtml(montoTexto) + '</div>' +
          '<p class="placeholder-note">...</p>' +
        '</div>' +
        '<a class="btn-primary" href="#donar">' + escapeHtml(u.textoBoton) + '</a>' +
      '</div>'
    );
  }

  function urgenciaCardHtml(t) {
    const fotoHtml = t.foto
      ? '<div class="urgencia-foto-wrap"><img src="' + escapeHtml(t.foto) + '" alt="' + escapeHtml(t.titulo || '') + '" loading="lazy" decoding="async"></div>'
      : (t.sinImagen ? '' : '<div class="urgencia-foto-wrap urgencia-foto-placeholder" aria-hidden="true"><i class="fa-solid fa-image"></i></div>');
    const mapaHtml = t.mapaEmbed
      ? '<div class="urgencia-map">' +
          '<iframe src="' + escapeHtml(t.mapaEmbed) + '" title="Ubicación de ' + escapeHtml(t.titulo || 'la ruta') + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
          (t.mapaUrl ? '<a href="' + escapeHtml(t.mapaUrl) + '" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-location-dot"></i> Flor Amarilla, Ciudad Arce · Ver ubicación</a>' : '') +
        '</div>'
      : '';
    const modalJson = escapeHtml(JSON.stringify(t.modal || {}));
    return (
      '<div class="urgencia urgencia-foto reveal' + (t.sinImagen ? ' urgencia-sin-imagen' : '') + (t.mapaEmbed ? ' urgencia-con-mapa' : '') + '">' +
        fotoHtml +
        '<div class="left">' +
          '<span class="tagtop">' + escapeHtml(t.etiqueta) + '</span>' +
          '<h3>' + escapeHtml(t.titulo) + '</h3>' +
          (t.subtitulo ? '<div class="urgencia-subtitulo">' + escapeHtml(t.subtitulo) + '</div>' : '') +
          '<p class="urgencia-descripcion">' + escapeHtml(t.descripcion) + '</p>' +
          mapaHtml +
        '</div>' +
        '<button class="btn-primary" type="button" data-carrusel-modal="' + modalJson + '">' + escapeHtml(t.textoBoton) + '</button>' +
      '</div>'
    );
  }

  /* ---------------------------------------------------------------------
     CONFIGURACIÓN — contacto, redes sociales, formas de donar, necesidad del mes
     --------------------------------------------------------------------- */
  function renderConfiguracion(config) {
    if (!config) return;

    // Botón flotante de WhatsApp (aparece en todas las páginas)
    if (config.contacto && config.contacto.whatsappPrincipal) {
      const mensajeFab = encodeURIComponent('¡Hola! 👋 Me gustaría obtener más información sobre Paraíso 503 y apoyar!.');
      document.querySelectorAll('.fab-whats').forEach(a => {
        a.href = 'https://wa.me/' + config.contacto.whatsappPrincipal + '?text=' + mensajeFab;
      });
    }

    // Carrusel "Urgencias de este mes" (portada): TODAS sus tarjetas —
    // incluida la primera, "Necesidades prioritarias" — salen de
    // config.carruselUrgencia, en el mismo orden en que aparecen ahí. Solo
    // se agregan las que tengan "activa": true; el resto queda preparado en
    // el JSON pero no se muestra. Para reordenar las tarjetas en el futuro
    // basta con mover sus bloques dentro de configuracion.js: no hace falta
    // tocar este archivo, el HTML ni el CSS. El diseño y el funcionamiento
    // del carrusel (flechas, puntos, deslizar) viven en css/style.css y
    // js/script.js y tampoco cambian al reordenar o agregar tarjetas aquí.
    const track = document.getElementById('urgenciaTrack');
    if (track && Array.isArray(config.carruselUrgencia)) {
      track.innerHTML = '';
      config.carruselUrgencia.filter(t => t && t.activa).forEach(t => {
        const slide = document.createElement('div');
        slide.className = 'urgencia-slide';
        slide.innerHTML = (t.tipo === 'necesidadUrgente')
          ? necesidadUrgenteCardHtml(t)
          : urgenciaCardHtml(t);
        track.appendChild(slide);
      });
    }

    // Grilla de redes sociales (sección "Síguenos y sé parte")
    const redesGrid = document.querySelector('.redes-grid');
    if (redesGrid && Array.isArray(config.redesSociales)) {
      redesGrid.innerHTML = config.redesSociales.map(r =>
        '<a class="red-card" href="' + escapeHtml(r.url) + '">' +
          '<div class="ico" style="background:' + escapeHtml(r.color) + ';"><i class="' + escapeHtml(r.icono) + '"></i></div>' +
          '<h5>' + escapeHtml(r.nombre) + '</h5><span>' + escapeHtml(r.dato) + '</span>' +
        '</a>'
      ).join('');
    }

    // Pestañas de "Formas de donar" (Local / Internacional / En persona)
    if (config.donacion) {
      renderViaCards('#tab-local', config.donacion.local);
      renderViaCards('#tab-intl', config.donacion.internacional);
      renderViaCards('#tab-persona', config.donacion.persona);
    }
  }

  function renderViaCards(selector, items) {
    const panel = document.querySelector(selector);
    if (!panel || !Array.isArray(items)) return;
    panel.innerHTML = items.map(v => {
      const botonTitular = v.titular
        ? '<button class="copy-num" data-copy="' + escapeHtml(v.titular) + '">' + escapeHtml(v.titular) + ' <i class="fa-regular fa-copy"></i></button>'
        : '';
      const botonNumero = v.numero
        ? '<button class="copy-num" data-copy="' + escapeHtml(v.numero) + '">' + escapeHtml(v.numero) + ' <i class="fa-regular fa-copy"></i></button>'
        : '';
      const marcaClass = v.marca ? ' brand-' + escapeHtml(v.marca) : '';
      const icono = v.logo
        ? '<div class="icon brand-icon' + marcaClass + '"><img class="brand-logo" src="' + escapeHtml(v.logo) + '" alt="" loading="lazy"></div>'
        : '<div class="icon"><i class="' + escapeHtml(v.icono) + '"></i></div>';
      const accion = v.url
        ? '<span class="via-link-label">Cómo donar <i class="fa-solid fa-arrow-right"></i></span>'
        : '';
      const inner =
        icono +
        '<div class="via-info"><h4>' + escapeHtml(v.nombre) + '</h4><p>' + escapeHtml(v.descripcion) + '</p></div>' +
        botonTitular + botonNumero + accion;
      // Si la vía tiene "url", la tarjeta completa se vuelve un enlace
      // (ej. PayPal) en vez de mostrar botones de copiar.
      if (v.url) {
        return '<a class="via-card via-card-link" href="' + escapeHtml(v.url) + '" target="_blank" rel="noopener">' + inner + '</a>';
      }
      return '<div class="via-card">' + inner + '</div>';
    }).join('');
  }

  /* ---------------------------------------------------------------------
     PROGRAMAS
     --------------------------------------------------------------------- */

  // Datos resumidos para el modal de programa de la portada.
  // La página programas.html sigue usando el contenido completo de
  // content/programas.js; aquí enviamos solamente una vista rápida para
  // evitar duplicar todo el texto dentro del modal del inicio.
  function serializarProgramaParaModal(p) {
    const resumen = String(p.descripcionLista || p.descripcionDetalle || p.queEs || '').trim();
    const datos = {
      id: p.id,
      titulo: p.titulo,
      resumen: resumen || 'Conoce este programa y el trabajo que realizamos para cambiar más vidas.',
      link: 'programas.html#' + p.id
    };
    return escapeHtml(JSON.stringify(datos));
  }

  // Tarjeta de programa tal como se ve en la portada (index.html). Toda la
  // tarjeta abre el modal con el resumen del programa (ver js/script.js);
  // el botón "Conocer el programa" sigue llevando directo a programas.html.
  function programCardHtml(p) {
    const foto = p.foto || placeholderImg(p.titulo);
    const insignia = p.insignia ? '<span class="p-badge">' + escapeHtml(p.insignia) + '</span>' : '';
    return (
      '<div class="prog-card" data-programa="' + serializarProgramaParaModal(p) + '" tabindex="0" role="button" aria-label="Conocer el programa ' + escapeHtml(p.titulo) + '">' +
        '<div class="prog-photo"><img src="' + foto + '" alt="' + escapeHtml(p.titulo) + '" loading="lazy" decoding="async"></div>' +
        '<div class="prog-body">' +
          insignia +
          '<div class="prog-head"><span class="prog-icon" style="background:' + escapeHtml(p.color) + '"><i class="fa-solid ' + escapeHtml(p.icono) + '"></i></span><h3>' + escapeHtml(p.titulo) + '</h3></div>' +
          '<p>' + escapeHtml(p.descripcionLista) + '</p>' +
          '<a class="prog-link" href="programas.html#' + escapeHtml(p.id) + '">Conocer el programa</a>' +
        '</div>' +
      '</div>'
    );
  }

  // Tarjetas de programas en la portada: 3 destacadas + el resto plegable
  function renderProgramasIndex(data) {
    const contDestacados = document.getElementById('progListDestacados');
    const contExpandibles = document.getElementById('progListExpandibles');
    if ((!contDestacados && !contExpandibles) || !data || !Array.isArray(data.programas)) return;

    const destacados = data.programas.filter(p => p.vistaInicio === 'destacado');
    const expandibles = data.programas.filter(p => p.vistaInicio === 'expandible');

    if (contDestacados) contDestacados.innerHTML = destacados.map(programCardHtml).join('');
    if (contExpandibles) contExpandibles.innerHTML = expandibles.map(programCardHtml).join('');
  }

  // Acordeón completo de programas.html (índice de pastillas + detalle)
  function renderProgramasAccordion(data) {
    const progIndexEl = document.getElementById('progIndex');
    const progAccordionEl = document.getElementById('progAccordion');
    if (!progIndexEl || !progAccordionEl || !data || !Array.isArray(data.programas)) return;

    const programs = data.programas;

    // Pools genéricos usados solo como respaldo si a algún programa le
    // faltara todavía el contenido real en content/programas.js (campos
    // enQueConsiste, porQueExiste, comoAyuda, impacto).
    const benefitPoolFallback = [
      { icon: 'fa-bowl-food', label: '[Beneficio 1]' },
      { icon: 'fa-droplet', label: '[Beneficio 2]' },
      { icon: 'fa-notes-medical', label: '[Beneficio 3]' },
      { icon: 'fa-house-chimney-heart', label: '[Beneficio 4]' }
    ];
    const impactPoolFallback = [
      { icon: 'fa-paw', label: '[Completar indicador 1]' },
      { icon: 'fa-chart-line', label: '[Completar indicador 2]' },
      { icon: 'fa-calendar-check', label: '[Completar indicador 3]' }
    ];
    const enQueConsisteFallback = (p) => ['[Completar: en qué consiste el programa de ' + p.titulo + ' — actividades principales, frecuencia y alcance.]'];
    const porQueExisteFallback = ['[Completar: la necesidad que atiende este programa y por qué nació.]'];

    // ---- Índice rápido (pastillas) ----
    progIndexEl.innerHTML = programs.map(p =>
      '<a href="#' + p.id + '" data-target="' + p.id + '"><i class="fa-solid ' + p.icono + '"></i> ' + escapeHtml(p.titulo) + '</a>'
    ).join('');

    // ---- Acordeón ----
    progAccordionEl.innerHTML = programs.map(p => {
      const enQueConsiste = (Array.isArray(p.enQueConsiste) && p.enQueConsiste.length) ? p.enQueConsiste : enQueConsisteFallback(p);
      const porQueExiste = (Array.isArray(p.porQueExiste) && p.porQueExiste.length) ? p.porQueExiste : porQueExisteFallback;
      const comoAyuda = (Array.isArray(p.comoAyuda) && p.comoAyuda.length) ? p.comoAyuda.map(b => ({ icon: b.icono, label: b.titulo })) : benefitPoolFallback;
      const impacto = (Array.isArray(p.impacto) && p.impacto.length) ? p.impacto.map(i => ({ icon: 'fa-paw', num: i.numero, label: i.texto })) : impactPoolFallback.map(i => ({ icon: i.icon, num: '[Dato]', label: i.label }));

      const enQueConsisteHtml = enQueConsiste.map(par => '<p>' + escapeHtml(par) + '</p>').join('');
      const porQueExisteHtml = porQueExiste.map(par => '<p>' + escapeHtml(par) + '</p>').join('');
      const benefitsHtml = comoAyuda.map(b =>
        '<div class="benefit-item"><span class="benefit-icon" style="background:' + p.color + '1a; color:' + p.color + '"><i class="fa-solid ' + b.icon + '"></i></span><span>' + escapeHtml(b.label) + '</span></div>'
      ).join('');
      const impactHtml = impacto.map(i =>
        '<div class="impact-item"><span class="impact-icon" style="color:' + p.color + '"><i class="fa-solid ' + i.icon + '"></i></span><span class="impact-num">' + escapeHtml(i.num) + '</span><span class="impact-label">' + escapeHtml(i.label) + '</span></div>'
      ).join('');
      const galeria = Array.isArray(p.galeria) ? p.galeria.filter(Boolean) : [];
      const videoExt = /\.(mp4|webm|mov|ogg|m4v)(\?.*)?$/i;
      const buildItem = (src, idx) => {
        const isVideo = videoExt.test(src);
        const media = isVideo
          ? '<video src="' + src + '" controls muted playsinline preload="metadata"></video>'
          : '<img src="' + src + '" alt="' + escapeHtml(p.titulo) + ' — foto ' + (idx + 1) + '" loading="lazy">';
        return '<div class="gallery-item" data-lightbox-index="' + idx + '">' + media + '</div>';
      };
      // Si todavía no hay fotos reales, no mostramos la sección Galería.
      // Basta con agregar rutas a p.galeria en content/programas.js para que
      // aparezca automáticamente, sin tocar HTML, CSS ni este archivo.
      const hasGaleria = galeria.length > 0;
      const galleryHtml = hasGaleria ? galeria.slice(0, 3).map(buildItem).join('') : '';
      const hasMoreFotos = galeria.length > 3;
      const galeriaForLightbox = galeria.map(src => ({ src: src, isVideo: videoExt.test(src) }));
      const galleryDataAttr = escapeHtml(JSON.stringify(galeriaForLightbox));
      const verMasBtn = hasMoreFotos
        ? '<button class="btn-ver-fotos" type="button" data-gallery-start="3">Ver más fotos</button>'
        : '';
      const gallerySectionHtml = hasGaleria
        ? '<div class="prog-gallery" data-gallery="' + galleryDataAttr + '" data-gallery-title="' + escapeHtml(p.titulo) + '"><h4>Galería</h4><div class="gallery-grid">' + galleryHtml + '</div>' + verMasBtn + '</div>'
        : '';
      const foto = p.foto || placeholderImg(p.titulo);
      const badgeHtml = p.etiquetaDestacado
        ? '<span class="prog-badge"><i class="fa-solid fa-paw"></i> ' + escapeHtml(p.etiquetaDestacado) + ' <i class="fa-solid fa-heart"></i></span>'
        : '';

      return (
        '<div class="acc-item reveal" id="' + p.id + '">' +
          '<button class="acc-header" type="button" aria-expanded="false" aria-controls="panel-' + p.id + '">' +
            '<span class="prog-icon" style="background:' + p.color + '"><i class="fa-solid ' + p.icono + '"></i></span>' +
            '<span class="acc-header-text"><span class="acc-title">' + escapeHtml(p.titulo) + '</span><span class="acc-sub">' + escapeHtml(p.descripcionLista) + '</span></span>' +
            '<span class="acc-chevron"><i class="fa-solid fa-chevron-down"></i></span>' +
          '</button>' +
          '<div class="acc-panel" id="panel-' + p.id + '">' +
            '<div class="acc-panel-inner">' +

              '<div class="prog-top">' +
                '<div class="prog-photo-wrap">' +
                  '<div class="prog-photo"><img src="' + foto + '" alt="' + escapeHtml(p.titulo) + '" loading="lazy" decoding="async"></div>' +
                  badgeHtml +
                '</div>' +
                '<div class="prog-top-content">' +
                  '<span class="prog-icon-lg" style="background:' + p.color + '"><i class="fa-solid ' + p.icono + '"></i></span>' +
                  '<h3 class="prog-title-lg">' + escapeHtml(p.titulo) + '</h3>' +
                  '<p class="prog-desc-lg">' + escapeHtml(p.descripcionDetalle) + '</p>' +
                  '<div class="prog-divider"></div>' +
                  '<div class="prog-section"><h4>¿En qué consiste?</h4>' + enQueConsisteHtml + '</div>' +
                '</div>' +
              '</div>' +

              '<div class="prog-why-how">' +
                '<div class="why-col"><h4>¿Por qué existe?</h4>' + porQueExisteHtml + '</div>' +
                '<div class="how-col"><h4>¿Cómo ayuda este programa?</h4><div class="benefit-grid">' + benefitsHtml + '</div></div>' +
              '</div>' +

              '<div class="prog-impact-gallery">' +
                '<div class="prog-impact"><h4>Impacto</h4><div class="impact-grid">' + impactHtml + '</div></div>' +
                gallerySectionHtml +
              '</div>' +

            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  /* ---------------------------------------------------------------------
     ADOPCIONES
     --------------------------------------------------------------------- */

  function petCardHtml(a, whatsappAdopciones) {
    const foto = a.foto || placeholderImg(a.nombre);
    const iconoSexo = a.sexo === 'hembra' ? 'fa-venus' : 'fa-mars';
    const labelSexo = a.sexo === 'hembra' ? 'Hembra' : 'Macho';
    const labelEdad = a.edad === 'adulto' ? 'Adulto' : 'Cachorro';
    const mensaje = encodeURIComponent(
      'Hola, me interesa adoptar a ' + a.nombre + '. ¿Podrían brindarme más información sobre él?'
    );
    return (
      '<div class="pet-card reveal" data-species="' + escapeHtml(a.especie) + '" data-sex="' + escapeHtml(a.sexo) + '" data-age="' + escapeHtml(a.edad || 'cachorro') + '" data-name="' + escapeHtml(a.nombre) + '">' +
        '<div class="pet-photo">' +
          '<img src="' + foto + '" alt="' + escapeHtml(a.nombre) + '" loading="lazy" decoding="async">' +
          '<span class="pet-status">' + escapeHtml(a.estado) + '</span>' +
          '<button class="pet-fav" data-name="' + escapeHtml(a.nombre) + '" aria-label="Agregar a favoritos"><i class="fa-regular fa-heart"></i></button>' +
        '</div>' +
        '<div class="pet-body">' +
          '<div class="pet-name-row"><h3>' + escapeHtml(a.nombre) + '</h3><span class="pet-sex"><i class="fa-solid ' + iconoSexo + '"></i> ' + labelSexo + '</span></div>' +
          '<div class="pet-tags"><span class="pet-age">' + labelEdad + '</span></div>' +
          '<p>' + escapeHtml(a.descripcion) + '</p>' +
          '<a class="adopt-btn" href="https://wa.me/' + whatsappAdopciones + '?text=' + mensaje + '"><i class="fa-brands fa-whatsapp"></i> Adóptame</a>' +
        '</div>' +
      '</div>'
    );
  }

  function renderAdopciones(data, config) {
    if (!data || !Array.isArray(data.animalitos)) return;
    const whatsappAdopciones = (config && config.contacto && config.contacto.whatsappAdopciones) || '';

    // Vista previa en la portada (index.html): solo los destacados
    const previewGrid = document.querySelector('#adopciones .pet-grid');
    if (previewGrid) {
      const destacados = data.animalitos.filter(a => a.destacadoInicio);
      previewGrid.innerHTML = destacados.map(a => petCardHtml(a, whatsappAdopciones)).join('');
    }

    // Grilla completa en adopciones.html (con filtros)
    const petGrid = document.getElementById('petGrid');
    if (petGrid) {
      petGrid.innerHTML = data.animalitos.map(a => petCardHtml(a, whatsappAdopciones)).join('');
    }
  }

  /* ---------------------------------------------------------------------
     HISTORIAS DE ÉXITO
     --------------------------------------------------------------------- */

  const ESTADO_INFO = {
    rescate: { emoji: '🐾', label: 'Rescate reciente' },
    recuperado: { emoji: '💚', label: 'Recuperado' },
    adoptado: { emoji: '🏡', label: 'Adoptado' },
    tratamiento: { emoji: '🩺', label: 'En tratamiento' }
  };

  // Reconoce la extensión de archivo para decidir si un elemento de la
  // galería se muestra como foto o como video (mismo criterio que ya usa
  // la galería de "Programas").
  const HISTORIA_VIDEO_EXT = /\.(mp4|webm|mov|ogg|m4v)(\?.*)?$/i;

  // Íconos automáticos para la línea de tiempo: el texto de "evento" (sin
  // acentos ni mayúsculas) se busca aquí; si no hay coincidencia, se usa un
  // ícono genérico (fa-paw). Así, agregar un evento nuevo en historias.js
  // nunca requiere tocar este archivo — como mucho, el ícono será genérico
  // hasta que alguien decida agregar una coincidencia nueva a este mapa.
  const ICONOS_LINEA_TIEMPO = {
    'rescate': 'fa-hand-holding-heart',
  'primera consulta': 'fa-stethoscope',
  'consulta': 'fa-stethoscope',
  'diagnostico': 'fa-magnifying-glass',
  'inicio del tratamiento': 'fa-syringe',
  'medicacion': 'fa-pills',
  'tratamiento': 'fa-pills',
  'quimioterapia': 'fa-syringe',
  'seguimiento medico': 'fa-stethoscope',
  'rehabilitacion': 'fa-person-walking',
  'cirugia': 'fa-kit-medical',
  'esterilizacion': 'fa-syringe',
  'recuperacion': 'fa-heart-pulse',
  'alta medica': 'fa-clipboard-check',
  'adoptado': 'fa-house',
  'busca un hogar': 'fa-house',
  'continua en tratamiento': 'fa-hourglass-half'
  };
  function iconoLineaTiempo(evento) {
    const key = String(evento || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // quita acentos
    return ICONOS_LINEA_TIEMPO[key] || 'fa-paw';
  }

  // Prepara el objeto completo de una historia (con fotos y galería ya
  // resueltas, listas para usar directamente) y lo serializa para guardarlo
  // en el atributo data-historia de su tarjeta. El modal (js/script.js) lo
  // lee de ahí — así la tarjeta de la portada y la de historias.html
  // comparten exactamente el mismo modal reutilizable.
  function serializarHistoriaParaModal(h) {
    const info = ESTADO_INFO[h.estado] || {};
    const galeria = Array.isArray(h.galeria) ? h.galeria.filter(Boolean) : [];
    const galeriaModal = galeria.map(src => ({ src: src, isVideo: HISTORIA_VIDEO_EXT.test(src) }));
    const lineaTiempo = Array.isArray(h.lineaTiempo) ? h.lineaTiempo.filter(ev => ev && ev.evento) : [];
    const datos = {
      nombre: h.nombre,
      estado: h.estado,
      estadoEmoji: info.emoji || '',
      estadoLabel: info.label || h.estado,
      frase: h.frase || '',
      historiaCompleta: h.historiaCompleta || h.descripcion || '',
      fotoAntes: h.fotoAntes || null,
      fotoDespues: h.fotoDespues || null,
      lugarRescate: h.lugarRescate || '',
      fechaRescate: h.fechaRescate || '',
      diagnostico: h.diagnostico || '',
      tratamientos: Array.isArray(h.tratamientos) ? h.tratamientos.filter(Boolean) : [],
      lineaTiempo: lineaTiempo.map(ev => ({
        evento: ev.evento,
        fecha: ev.fecha || '',
        icono: iconoLineaTiempo(ev.evento)
      })),
      galeria: galeriaModal
    };
    return escapeHtml(JSON.stringify(datos));
  }

  // Versión usada en la portada: caja "antes/después" con foto de referencia
  function historiaCardHtmlPreview(h) {
    const info = ESTADO_INFO[h.estado] || {};
    const fotoAntes = h.fotoAntes || placeholderImg('Antes (' + h.nombre + ')');
    const fotoDespues = h.fotoDespues || placeholderImg('Después (' + h.nombre + ')');
    return (
      '<div class="caso-card" data-historia="' + serializarHistoriaParaModal(h) + '" tabindex="0" role="button" aria-label="Conocer la historia de ' + escapeHtml(h.nombre) + '">' +
        '<div class="caso-ba">' +
          '<div class="ba-item"><img src="' + fotoAntes + '" alt="Antes del rescate" loading="lazy" decoding="async"><span class="ba-label">Antes</span></div>' +
          '<div class="ba-item"><img src="' + fotoDespues + '" alt="Después del rescate" loading="lazy" decoding="async"><span class="ba-label">Después</span></div>' +
        '</div>' +
        '<div class="caso-body">' +
          '<span class="status-badge status-' + h.estado + '">' + info.emoji + ' ' + info.label + '</span>' +
          '<h4>' + escapeHtml(h.nombre) + '</h4>' +
          '<p>' + escapeHtml(h.descripcion) + '</p>' +
          '<button class="btn-historia" type="button">Conocer su historia <i class="fa-solid fa-arrow-right"></i></button>' +
        '</div>' +
      '</div>'
    );
  }

  // Versión usada en historias.html: incluye data-status para el filtro.
  // Mientras no haya foto real, usa la misma caja de degradado de color que
  // tenía originalmente esta página (en vez de la imagen de referencia).
  function historiaCardHtmlCompleta(h) {
    const info = ESTADO_INFO[h.estado] || {};
    const antes = h.fotoAntes
      ? '<div class="ba-item"><img src="' + h.fotoAntes + '" alt="Antes del rescate" loading="lazy" decoding="async"><span class="ba-label">Antes</span></div>'
      : '<div class="ba-item" style="background:linear-gradient(135deg,#3a2a1a,#2a1a10);"><span class="ba-label">Antes</span></div>';
    const despues = h.fotoDespues
      ? '<div class="ba-item"><img src="' + h.fotoDespues + '" alt="Después del rescate" loading="lazy" decoding="async"><span class="ba-label">Después</span></div>'
      : '<div class="ba-item" style="background:linear-gradient(135deg,#1E3D2B,#3E7A4E);"><span class="ba-label">Después</span></div>';
    return (
      '<div class="caso-card reveal" data-status="' + h.estado + '" data-historia="' + serializarHistoriaParaModal(h) + '" tabindex="0" role="button" aria-label="Conocer la historia de ' + escapeHtml(h.nombre) + '">' +
        '<div class="caso-ba">' + antes + despues + '</div>' +
        '<div class="caso-body">' +
          '<span class="status-badge status-' + h.estado + '">' + info.emoji + ' ' + info.label + '</span>' +
          '<h4>' + escapeHtml(h.nombre) + '</h4>' +
          '<p>' + escapeHtml(h.descripcion) + '</p>' +
          '<button class="btn-historia" type="button">Conocer su historia <i class="fa-solid fa-arrow-right"></i></button>' +
        '</div>' +
      '</div>'
    );
  }

  function renderHistorias(data) {
    if (!data || !Array.isArray(data.historias)) return;

    // Vista previa en la portada (index.html)
    const previewGrid = document.querySelector('#historias .historias-grid');
    if (previewGrid) {
      const destacadas = data.historias.filter(h => h.destacadoInicio);
      previewGrid.innerHTML = destacadas.map(historiaCardHtmlPreview).join('');
    }

    // Grilla completa en historias.html (con filtro de estado)
    const historiasGrid = document.getElementById('historiasGrid');
    if (historiasGrid) {
      historiasGrid.innerHTML = data.historias.map(historiaCardHtmlCompleta).join('');
    }

    const updateNote = document.getElementById('historiasUpdateNote');
    if (updateNote) {
      const fecha = data.ultimaActualizacion || '';
      const mensaje = data.mensajeActualizacion || '';
      updateNote.innerHTML =
        '<div class="historias-update-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>' +
        '<div class="historias-update-copy">' +
          '<span class="historias-update-kicker">Seguimos escribiendo nuevas historias</span>' +
          (fecha ? '<strong>Última actualización: ' + escapeHtml(fecha) + '</strong>' : '') +
          (mensaje ? '<p>' + escapeHtml(mensaje) + '</p>' : '') +
        '</div>';
    }
  }

  /* ---------------------------------------------------------------------
     PROGRAMA CONTIGO — banner de la portada + modal informativo
     --------------------------------------------------------------------- */

  // El modal (js/script.js) necesita los mismos datos que ya tenemos aquí,
  // así que los serializamos en el atributo data-contigo del banner —
  // exactamente el mismo mecanismo que ya usa el modal de "Historias" (ver
  // serializarHistoriaParaModal más arriba). Así, agregar o quitar una
  // tarjeta de servicio en content/contigo.js nunca requiere tocar el JS.
  // OJO: a diferencia de serializarHistoriaParaModal (que se concatena
  // dentro de un string de HTML y por eso sí necesita escapeHtml para las
  // comillas), aquí el resultado se asigna con banner.setAttribute(), que
  // ya maneja cualquier carácter especial por sí mismo — así que el JSON
  // se guarda tal cual, sin escapar, o el navegador no podría volver a
  // interpretarlo con JSON.parse().
  function serializarContigoParaModal(c, fotoBanner) {
    const m = c.modal || {};
    const datos = {
      titulo: m.titulo || 'Contigo',
      subtitulo: m.subtitulo || '',
      descripcion: m.descripcion || '',
      foto: m.foto || fotoBanner || null,
      servicios: Array.isArray(m.servicios) ? m.servicios : [],
      requisitos: Array.isArray(m.requisitos) ? m.requisitos.filter(Boolean) : [],
      mensajeWhatsapp: m.mensajeWhatsapp || '',
      enlacePagina: m.enlacePagina || 'contigo.html'
    };
    return JSON.stringify(datos);
  }

  // Envuelve, dentro del título, la palabra/frase indicada en "resaltado"
  // con un <span> que se pinta en mustaza (igual que en la referencia
  // visual). Si no hay coincidencia, el título se muestra completo sin
  // resaltar nada — nunca rompe el contenido.
  function tituloConResaltado(titulo, resaltado) {
    const t = escapeHtml(titulo || '');
    const r = resaltado ? escapeHtml(resaltado) : '';
    if (!r) return t;
    const idx = t.toLowerCase().indexOf(r.toLowerCase());
    if (idx === -1) return t;
    return t.slice(0, idx) + '<span class="hl">' + t.slice(idx, idx + r.length) + '</span>' + t.slice(idx + r.length);
  }

  function renderContigo(data) {
    if (!data) return;
    const banner = document.getElementById('contigoBanner');
    if (!banner) return;

    const foto = data.foto || placeholderImg('Programa Contigo');

    banner.setAttribute('data-contigo', serializarContigoParaModal(data, data.foto));
    banner.innerHTML =
      '<div class="contigo-text">' +
        '<span class="kicker contigo-tag"><i class="fa-solid fa-heart"></i> ' + escapeHtml(data.etiqueta || 'Contigo') + '</span>' +
        '<h2 class="contigo-title">' + tituloConResaltado(data.titulo, data.resaltado) + '</h2>' +
        '<p class="contigo-desc">' + escapeHtml(data.texto || '') + '</p>' +
        '<a class="contigo-btn" href="' + escapeHtml((data.modal && data.modal.enlacePagina) || 'contigo.html') + '">' + escapeHtml(data.textoBoton || 'Ver más sobre el programa') + ' <i class="fa-solid fa-arrow-right"></i></a>' +
      '</div>' +
      '<div class="contigo-photo">' +
        '<span class="contigo-photo-decor" aria-hidden="true"></span>' +
        '<img src="' + foto + '" alt="' + escapeHtml(data.titulo || 'Programa Contigo') + '" loading="lazy" decoding="async">' +
        '<span class="contigo-badge" aria-hidden="true"><i class="fa-solid fa-paw"></i></span>' +
      '</div>';
  }

  /* ---------------------------------------------------------------------
     GALERÍA (galeria.html) — fotos, video destacado, videos recientes y
     playlists. Todo se genera desde content/galeria.js: para agregar una
     foto o un video nuevo solo se edita ese archivo (ver sus comentarios).

     Fotos y videos se renderizan TODOS de una vez (no solo los primeros),
     usando la misma clase "gal-hidden" que ya usa el resto del sitio para
     ocultar tarjetas que no coinciden con el filtro (ver .pet-card.hidden /
     .caso-card en js/script.js): el filtro por categoría, el buscador, las
     pestañas Fotos/Videos y el botón "Cargar más" son puro comportamiento
     y viven en js/script.js, que alterna esa clase sobre las tarjetas que
     ya están aquí en el DOM.
     --------------------------------------------------------------------- */
  function normalizarTexto(str) {
    return String(str == null ? '' : str)
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function renderGaleria(data) {
    if (!data) return;
    const categorias = Array.isArray(data.categorias) ? data.categorias : [];
    const fotos = Array.isArray(data.fotos) ? data.fotos : [];
    const videos = Array.isArray(data.videos) ? data.videos : [];
    const catById = {};
    categorias.forEach(c => { catById[c.id] = c; });

    // ----- Contadores del hero (se actualizan solos según el JSON) -----
    const photoCountEl = document.getElementById('galPhotoCount');
    if (photoCountEl) photoCountEl.textContent = fotos.length.toLocaleString('es-SV');
    const videoCountEl = document.getElementById('galVideoCount');
    if (videoCountEl) videoCountEl.textContent = videos.length.toLocaleString('es-SV');

    // ----- Botones de filtro por categoría (compartidos por Fotos y Videos) -----
    const catFiltersEl = document.getElementById('galCatFilters');
    if (catFiltersEl) {
      catFiltersEl.innerHTML =
        '<button class="filter-btn active" data-categoria="todos"><i class="fa-solid fa-table-cells"></i> Todos</button>' +
        categorias.map(c =>
          '<button class="filter-btn" data-categoria="' + escapeHtml(c.id) + '"><i class="fa-solid ' + escapeHtml(c.icono || 'fa-paw') + '"></i> ' + escapeHtml(c.nombre) + '</button>'
        ).join('');
    }

    // ----- Cuadrícula de fotografías -----
    const photoGrid = document.getElementById('galPhotoGrid');
    if (photoGrid) {
      photoGrid.innerHTML = fotos.map((f, idx) => {
        const cat = catById[f.categoria] || {};
        const titulo = f.titulo || cat.nombre || 'Paraíso 503';
        const buscable = escapeHtml(normalizarTexto(titulo + ' ' + (cat.nombre || '')));
        return (
          '<div class="gal-photo-card reveal" data-categoria="' + escapeHtml(f.categoria || '') + '" data-search="' + buscable + '" data-lightbox-index="' + idx + '" tabindex="0" role="button" aria-label="Ver foto: ' + escapeHtml(titulo) + '">' +
            '<img src="' + escapeHtml(f.imagen || placeholderImg(titulo)) + '" alt="' + escapeHtml(titulo) + '" loading="lazy">' +
            '<div class="gal-photo-caption">' +
              '<span class="gal-cat-chip"><span class="gal-cat-dot" style="background:' + escapeHtml(cat.color || '#1E3D2B') + '"><i class="fa-solid ' + escapeHtml(cat.icono || 'fa-paw') + '"></i></span>' + escapeHtml(cat.nombre || '') + '</span>' +
              (f.fecha ? '<span class="gal-photo-date">' + escapeHtml(f.fecha) + '</span>' : '') +
            '</div>' +
          '</div>'
        );
      }).join('');
      // Guarda la lista completa de fotos (para el visor/lightbox) en un
      // atributo del propio contenedor: así js/script.js no necesita leer
      // content/galeria.js directamente para saber qué mostrar al navegar.
      const galeriaLightbox = fotos.map(f => ({ src: f.imagen || placeholderImg(f.titulo || ''), isVideo: false, title: f.titulo || (catById[f.categoria] || {}).nombre || 'Paraíso 503' }));
      // OJO: aquí se usa setAttribute() directamente sobre el elemento (no
      // se inserta como texto dentro de un innerHTML), así que el valor NO
      // debe pasar por escapeHtml — el DOM ya guarda el string tal cual, y
      // js/script.js lo vuelve a leer con JSON.parse() sin decodificar
      // entidades HTML.
      photoGrid.setAttribute('data-gallery', JSON.stringify(galeriaLightbox));
    }

    // ----- Video destacado -----
    const featuredEl = document.getElementById('galFeaturedVideo');
    if (featuredEl) {
      const v = data.videoDestacado;
      if (v) {
        const cat = catById[v.categoria] || {};
        const buscable = escapeHtml(normalizarTexto((v.titulo || '') + ' ' + (cat.nombre || '')));
        const idVideo = idYoutube(v.youtubeUrl);
        const esEjemplo = !idVideo;
        const miniatura = idVideo ? miniaturaYoutube(v.youtubeUrl) : placeholderVideoImg(v.titulo || 'Video de ejemplo');
        featuredEl.classList.toggle('gal-featured--placeholder', esEjemplo);
        featuredEl.setAttribute('data-categoria', escapeHtml(v.categoria || ''));
        featuredEl.setAttribute('data-search', buscable);
        featuredEl.innerHTML =
          '<div class="gal-featured-media" data-youtube="' + escapeHtml(esEjemplo ? '' : v.youtubeUrl) + '">' +
            '<img src="' + escapeHtml(miniatura) + '" alt="' + escapeHtml(v.titulo || '') + '" loading="lazy" decoding="async">' +
            (esEjemplo ? '' : '<span class="gal-play-btn"><i class="fa-solid fa-play"></i></span>') +
          '</div>' +
          '<div class="gal-featured-content">' +
            (esEjemplo
              ? '<span class="gal-soon-tag"><i class="fa-regular fa-clock"></i> Próximamente</span>'
              : '<span class="gal-featured-tag"><i class="fa-solid fa-star"></i> Destacado</span>') +
            '<h3>' + escapeHtml(v.titulo || '') + '</h3>' +
            (v.descripcion ? '<p>' + escapeHtml(v.descripcion) + '</p>' : '') +
            '<div class="gal-featured-meta">' +
              (v.duracion ? '<span><i class="fa-regular fa-clock"></i> ' + escapeHtml(v.duracion) + '</span>' : '') +
              (v.fecha ? '<span><i class="fa-regular fa-calendar"></i> ' + escapeHtml(v.fecha) + '</span>' : '') +
            '</div>' +
            (esEjemplo ? '' : '<a class="btn-ver-detalle" href="' + escapeHtml(v.youtubeUrl) + '" target="_blank" rel="noopener"><i class="fa-brands fa-youtube"></i> Ver en YouTube</a>') +
          '</div>';
      } else {
        featuredEl.style.display = 'none';
      }
    }

    // ----- Videos recientes -----
    const recentEl = document.getElementById('galRecentVideos');
    if (recentEl) {
      recentEl.innerHTML = videos.map(v => {
        const cat = catById[v.categoria] || {};
        const buscable = escapeHtml(normalizarTexto((v.titulo || '') + ' ' + (cat.nombre || '')));
        const idVideo = idYoutube(v.youtubeUrl);
        const esEjemplo = !idVideo;
        const miniatura = idVideo ? miniaturaYoutube(v.youtubeUrl) : placeholderVideoImg(cat.nombre || 'Video de ejemplo');
        return (
          '<div class="gal-video-card reveal' + (esEjemplo ? ' gal-video-card--placeholder' : '') + '" data-categoria="' + escapeHtml(v.categoria || '') + '" data-search="' + buscable + '" data-youtube="' + escapeHtml(esEjemplo ? '' : v.youtubeUrl) + '" tabindex="0" role="button" aria-label="Ver video: ' + escapeHtml(v.titulo || '') + '">' +
            '<div class="gal-video-thumb">' +
              '<img src="' + escapeHtml(miniatura) + '" alt="' + escapeHtml(v.titulo || '') + '" loading="lazy">' +
              '<span class="gal-video-play"><i class="fa-solid fa-play"></i></span>' +
              (esEjemplo ? '<span class="gal-soon-tag" style="position:absolute;right:7px;bottom:7px;">Próximamente</span>' : (v.duracion ? '<span class="gal-video-duration">' + escapeHtml(v.duracion) + '</span>' : '')) +
            '</div>' +
            '<div class="gal-video-body">' +
              '<h4>' + escapeHtml(v.titulo || '') + '</h4>' +
              (v.fecha ? '<span>' + escapeHtml(v.fecha) + '</span>' : '') +
            '</div>' +
          '</div>'
        );
      }).join('');
    }

    // ----- Playlists (una tarjeta por categoría, siempre) -----
    const playlistsEl = document.getElementById('galPlaylists');
    if (playlistsEl) {
      playlistsEl.innerHTML = categorias.map(c => {
        const videosCategoria = videos.filter(v => v.categoria === c.id && idYoutube(v.youtubeUrl));
        const cantidad = videosCategoria.length;
        const miniatura = videosCategoria.length
          ? miniaturaYoutube(videosCategoria[0].youtubeUrl)
          : ((fotos.find(f => f.categoria === c.id) || {}).imagen || placeholderVideoImg(c.nombre));
        const esEjemplo = !c.playlistUrl;
        const tag = esEjemplo
          ? '<span class="gal-soon-tag"><i class="fa-regular fa-clock"></i> Próximamente</span>'
          : ('<span>' + cantidad + (cantidad === 1 ? ' video' : ' videos') + '</span>');
        const link = esEjemplo
          ? ''
          : '<span class="gal-playlist-link">Ver playlist <i class="fa-solid fa-arrow-right"></i></span>';
        const tagInner =
          '<div class="gal-playlist-thumb">' +
            '<img src="' + escapeHtml(miniatura) + '" alt="' + escapeHtml(c.nombre) + '" loading="lazy">' +
            '<span class="gal-playlist-icon" style="background:' + escapeHtml(c.color || '#1E3D2B') + '"><i class="fa-solid ' + escapeHtml(c.icono || 'fa-paw') + '"></i></span>' +
          '</div>' +
          '<div class="gal-playlist-body">' +
            '<h4>' + escapeHtml(c.nombre) + '</h4>' +
            tag +
            link +
          '</div>';
        return esEjemplo
          ? '<div class="gal-playlist-card gal-playlist-card--placeholder reveal" aria-label="Playlist de ' + escapeHtml(c.nombre) + ' (próximamente)">' + tagInner + '</div>'
          : '<a class="gal-playlist-card reveal" href="' + escapeHtml(c.playlistUrl) + '" target="_blank" rel="noopener" aria-label="Ver playlist de ' + escapeHtml(c.nombre) + ' en YouTube">' + tagInner + '</a>';
      }).join('');
    }
  }

  // Ejecuta una función de renderizado protegida: si algo dentro de ella
  // lanza un error inesperado (por ejemplo, un JSON con una forma distinta
  // a la esperada), se avisa en la consola pero el resto de las secciones
  // se siguen renderizando con normalidad.
  function safeRender(nombre, fn) {

    try {
      fn();
    } catch (err) {
      console.error('[content-loader] Error renderizando "' + nombre + '":', err);
    }
  }

  /* ---------------------------------------------------------------------
     Arranque: lee todo el contenido (ya cargado vía <script>) y renderiza
     cada sección
     --------------------------------------------------------------------- */
  function init() {
    // getContent() ya atrapa sus propios errores (contenido ausente) y
    // devuelve null en vez de lanzar una excepción, así que un problema
    // con uno de los 5 bloques de contenido nunca impide obtener los demás.
    const config = getContent('configuracion');
    const estadisticas = getContent('estadisticas');
    const programas = getContent('programas');
    const adopciones = getContent('adopciones');
    const historias = getContent('historias');
    const contigo = getContent('contigo');
    const galeria = window.PARAISO503_CONTENT && window.PARAISO503_CONTENT.galeria;

    // Cada sección se renderiza de forma aislada: si una falla, las demás
    // igual se muestran.
    safeRender('configuracion', () => renderConfiguracion(config));
    safeRender('estadisticas', () => renderEstadisticas(estadisticas));
    safeRender('programas (portada)', () => renderProgramasIndex(programas));
    safeRender('programas (acordeón)', () => renderProgramasAccordion(programas));
    safeRender('adopciones', () => renderAdopciones(adopciones, config));
    safeRender('historias', () => renderHistorias(historias));
    safeRender('contigo', () => renderContigo(contigo));
    safeRender('galeria', () => renderGaleria(galeria));

    // Si el contenido de programas no pudo obtenerse, avisamos claramente
    // en los contenedores de programas en vez de dejarlos en blanco.
    if (!programas) {
      const mensaje = 'No se pudieron cargar los programas en este momento. Por favor, actualiza la página o inténtalo más tarde.';
      showLoadError('progListDestacados', mensaje);
      showLoadError('progListExpandibles', mensaje);
      showLoadError('progIndex', mensaje);
      showLoadError('progAccordion', mensaje);
    }

    // Todo el HTML dinámico ya está en la página: ahora activamos el
    // comportamiento (menú, tabs, favoritos, filtros, acordeón, animaciones).
    // Esta función vive en js/script.js y se ejecuta siempre, incluso si
    // algún JSON no pudo cargarse, para que el resto del sitio no se rompa.
    window.__p503ContentLoaderDone = true;
    if (typeof window.initSiteInteractions === 'function') {
      window.initSiteInteractions();
    }
  }

  // Si el script se ejecuta antes de que el DOM termine de parsearse
  // (comportamiento normal con un <script> al final del body), esperamos
  // el evento DOMContentLoaded. Pero si por algún motivo este script se
  // carga o ejecuta después de que el DOM ya esté listo (por ejemplo, si
  // en el futuro se agrega "defer" o se inyecta dinámicamente), el evento
  // DOMContentLoaded ya se habría disparado y nunca llegaríamos a
  // ejecutar init(). Por eso comprobamos document.readyState primero.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
