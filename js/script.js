/* =============================================================================
   PARAÍSO 503 — Interacciones del sitio
   =============================================================================
   Este archivo SOLO contiene comportamiento (menú, tabs, favoritos, filtros,
   acordeón, animaciones al hacer scroll, etc.). No contiene contenido/texto:
   eso vive en los archivos JSON de /content y lo inserta js/content-loader.js.

   Todo el código está dentro de initSiteInteractions() y se ejecuta UNA vez,
   llamado por content-loader.js justo después de insertar en la página el
   HTML dinámico (programas, adopciones, historias, etc.). Así los botones,
   filtros y el acordeón funcionan sin importar si el contenido es estático
   (como el menú) o generado desde JSON (como las tarjetas de programas).

   No es necesario tocar este archivo para agregar contenido nuevo — ver
   content/*.json y js/content-loader.js para eso.
   ============================================================================= */

/* =============================================================================
   BLOQUEO DE SCROLL COMPARTIDO — el Lightbox y los distintos modales del
   sitio (Historia, Contigo, Carrusel, Programa) pueden abrirse unos encima
   de otros (p.ej. el Lightbox se abre desde dentro del modal de Historia
   al hacer clic en una foto de su galería). Se usa un contador en vez de
   una sola clase booleana para que cerrar el que quedó abierto más arriba
   no desbloquee el scroll del body si todavía queda otro modal abierto
   debajo — así siempre se "regresa" correctamente al contenido anterior.
   ============================================================================= */
(function () {
  let lockCount = 0;
  let savedScrollY = 0;
  let previousScrollBehavior = '';

  window.p503LockScroll = function () {
    lockCount++;
    if (lockCount !== 1) return;

    savedScrollY = window.scrollY || window.pageYOffset || 0;
    previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    document.body.classList.add('p503-lightbox-lock');
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + savedScrollY + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  };

  window.p503UnlockScroll = function () {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount !== 0) return;

    document.body.classList.remove('p503-lightbox-lock');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';

    /* Restauramos la posición con desplazamiento instantáneo. El sitio usa
       scroll suave global, así que sin este ajuste el navegador anima el
       regreso desde arriba y produce el salto visual al cerrar el modal. */
    window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' });
    requestAnimationFrame(function () {
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    });
  };
})();

/* =============================================================================
   LIGHTBOX de galería — modal reutilizable para recorrer todas las fotos/videos
   de un programa. Se construye una sola vez y se alimenta con los datos que
   content-loader.js ya genera a partir de content/programas.js, así que agregar
   más fotos en el futuro no requiere tocar este archivo.
   ============================================================================= */
(function () {
  let modal = null;
  let items = [];
  let currentIndex = 0;

  function buildModal() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'p503-lightbox';
    modal.innerHTML =
      '<div class="p503-lightbox-overlay"></div>' +
      '<div class="p503-lightbox-inner">' +
        '<button class="p503-lightbox-close" type="button" aria-label="Cerrar galería"><i class="fa-solid fa-xmark"></i></button>' +
        '<button class="p503-lightbox-nav p503-lightbox-prev" type="button" aria-label="Foto anterior"><i class="fa-solid fa-chevron-left"></i></button>' +
        '<div class="p503-lightbox-media"></div>' +
        '<button class="p503-lightbox-nav p503-lightbox-next" type="button" aria-label="Foto siguiente"><i class="fa-solid fa-chevron-right"></i></button>' +
        '<div class="p503-lightbox-footer"><span class="p503-lightbox-title"></span><span class="p503-lightbox-counter"></span></div>' +
      '</div>';
    document.body.appendChild(modal);

    const overlayEl = modal.querySelector('.p503-lightbox-overlay');
    const closeBtn = modal.querySelector('.p503-lightbox-close');
    const prevBtn = modal.querySelector('.p503-lightbox-prev');
    const nextBtn = modal.querySelector('.p503-lightbox-next');
    const mediaEl = modal.querySelector('.p503-lightbox-media');

    closeBtn.addEventListener('click', closeLightbox);
    overlayEl.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => showItem(currentIndex - 1));
    nextBtn.addEventListener('click', () => showItem(currentIndex + 1));
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showItem(currentIndex - 1);
      if (e.key === 'ArrowRight') showItem(currentIndex + 1);
    });

    // Deslizar con el dedo en móvil: swipe a la izquierda = siguiente,
    // swipe a la derecha = anterior. Se ignoran los gestos mayormente
    // verticales para no interferir con el scroll.
    let touchStartX = 0;
    let touchStartY = 0;
    let touchTracking = false;
    mediaEl.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchTracking = true;
    }, { passive: true });
    mediaEl.addEventListener('touchend', (e) => {
      if (!touchTracking) return;
      touchTracking = false;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        showItem(currentIndex + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });
  }

  function showItem(idx) {
    if (!modal || !items.length) return;
    currentIndex = (idx + items.length) % items.length;
    const item = items[currentIndex];
    const mediaWrap = modal.querySelector('.p503-lightbox-media');
    const titleEl = modal.querySelector('.p503-lightbox-title');
    const counterEl = modal.querySelector('.p503-lightbox-counter');
    const prevBtn = modal.querySelector('.p503-lightbox-prev');
    const nextBtn = modal.querySelector('.p503-lightbox-next');
    const hasMultiple = items.length > 1;

    // Transición suave: se atenúa la imagen actual y, una vez oculta, se
    // cambia el contenido y se vuelve a mostrar — así cambiar de foto se
    // siente pulido en vez de un salto brusco.
    mediaWrap.classList.add('is-switching');
    window.setTimeout(() => {
      const altText = (titleEl.textContent || 'Paraíso 503') + ' — foto ' + (currentIndex + 1);
      mediaWrap.innerHTML = item.isVideo
        ? '<video src="' + item.src + '" controls autoplay playsinline></video>'
        : '<img src="' + item.src + '" alt="' + altText + '" loading="lazy" decoding="async">';
      counterEl.textContent = hasMultiple ? (currentIndex + 1) + ' / ' + items.length : '';
      prevBtn.style.display = hasMultiple ? '' : 'none';
      nextBtn.style.display = hasMultiple ? '' : 'none';
      mediaWrap.classList.remove('is-switching');
    }, items.length > 1 ? 130 : 0);
  }

  function closeLightbox() {
    if (!modal) return;
    modal.classList.remove('open');
    window.p503UnlockScroll();
    setTimeout(() => {
      const mediaWrap = modal.querySelector('.p503-lightbox-media');
      if (mediaWrap) mediaWrap.innerHTML = '';
    }, 280);
  }

  window.openP503Lightbox = function (galleryItems, startIndex, title) {
    if (!Array.isArray(galleryItems) || !galleryItems.length) return;
    buildModal();
    items = galleryItems;
    modal.querySelector('.p503-lightbox-title').textContent = title || '';
    showItem(startIndex || 0);
    modal.classList.add('open');
    window.p503LockScroll();
  };
})();

/* =============================================================================
   MODAL DE HISTORIA — modal único y reutilizable para "Historias del
   Paraíso". Se construye una sola vez (igual que el lightbox de arriba) y se
   rellena con los datos que content-loader.js ya dejó listos en el atributo
   data-historia de cada tarjeta ".caso-card", así que agregar una historia
   nueva en content/historias.js nunca requiere tocar este archivo.

   Cada sección del modal (diagnóstico, tratamientos, línea de tiempo,
   galería, etc.) solo se muestra si la historia trae contenido para ella.
   La galería reutiliza el mismo visor de fotos/videos (openP503Lightbox)
   que ya usa la sección de Programas.
   ============================================================================= */
(function () {
  let modal = null;

  function escapeHtmlLocal(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildModal() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'p503-historia-modal';
    modal.innerHTML =
      '<div class="p503-historia-overlay"></div>' +
      '<div class="p503-historia-inner">' +
        '<button class="p503-historia-close" type="button" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>' +
        '<div class="p503-historia-scroll"><div class="p503-historia-content"></div></div>' +
      '</div>';
    document.body.appendChild(modal);

    modal.querySelector('.p503-historia-overlay').addEventListener('click', closeHistoriaModal);
    modal.querySelector('.p503-historia-close').addEventListener('click', closeHistoriaModal);
    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('open') && e.key === 'Escape') closeHistoriaModal();
    });
  }

  function closeHistoriaModal() {
    if (!modal) return;
    modal.classList.remove('open');
    window.p503UnlockScroll();
  }

  function fotoBox(src, nombre, label, gradient) {
    return src
      ? '<div class="ba-item"><img src="' + src + '" alt="' + label + ' del rescate — ' + escapeHtmlLocal(nombre) + '" loading="lazy" decoding="async"><span class="ba-label">' + label + '</span></div>'
      : '<div class="ba-item" style="background:' + gradient + ';"><span class="ba-label">' + label + '</span></div>';
  }

  function buildContentHtml(h) {
    const antes = fotoBox(h.fotoAntes, h.nombre, 'Antes', 'linear-gradient(135deg,#3a2a1a,#2a1a10)');
    const despues = fotoBox(h.fotoDespues, h.nombre, 'Después', 'linear-gradient(135deg,#1E3D2B,#3E7A4E)');

    const fraseHtml = h.frase
      ? '<p class="p503-historia-frase">“' + escapeHtmlLocal(h.frase) + '”</p>'
      : '';

    const metaItems = [];
    if (h.lugarRescate) {
      metaItems.push('<div class="p503-historia-meta-item"><i class="fa-solid fa-location-dot"></i><div><span>Lugar del rescate</span><b>' + escapeHtmlLocal(h.lugarRescate) + '</b></div></div>');
    }
    if (h.fechaRescate) {
      metaItems.push('<div class="p503-historia-meta-item"><i class="fa-solid fa-calendar-day"></i><div><span>Fecha del rescate</span><b>' + escapeHtmlLocal(h.fechaRescate) + '</b></div></div>');
    }
    if (h.diagnostico) {
      metaItems.push('<div class="p503-historia-meta-item"><i class="fa-solid fa-stethoscope"></i><div><span>Diagnóstico</span><b>' + escapeHtmlLocal(h.diagnostico) + '</b></div></div>');
    }
    const metaHtml = metaItems.length ? '<div class="p503-historia-meta">' + metaItems.join('') + '</div>' : '';

    const tratamientosHtml = (h.tratamientos && h.tratamientos.length)
      ? '<div class="p503-historia-section"><h4><i class="fa-solid fa-kit-medical"></i> Tratamientos</h4><ul class="p503-historia-list">' +
          h.tratamientos.map(t => '<li><i class="fa-solid fa-check"></i>' + escapeHtmlLocal(t) + '</li>').join('') +
        '</ul></div>'
      : '';

    const timelineHtml = (h.lineaTiempo && h.lineaTiempo.length)
      ? '<div class="p503-historia-section"><h4><i class="fa-solid fa-timeline"></i> Línea de tiempo</h4><ol class="p503-historia-timeline">' +
          h.lineaTiempo.map(ev =>
            '<li><span class="tl-dot"><i class="fa-solid ' + ev.icono + '"></i></span><div class="tl-content"><b>' + escapeHtmlLocal(ev.evento) + '</b>' +
            (ev.fecha ? '<span>' + escapeHtmlLocal(ev.fecha) + '</span>' : '') + '</div></li>'
          ).join('') +
        '</ol></div>'
      : '';

    const historiaHtml = h.historiaCompleta
      ? '<div class="p503-historia-section"><h4><i class="fa-solid fa-book-open"></i> Su historia</h4><p>' + escapeHtmlLocal(h.historiaCompleta) + '</p></div>'
      : '';

    // En escritorio, Tratamientos e Historia se acomodan lado a lado (uno a
    // cada costado) si hay espacio; en móvil siguen apilados como siempre.
    // Si una historia solo trae uno de los dos, ese ocupa todo el ancho.
    const colsHtml = (tratamientosHtml || historiaHtml)
      ? '<div class="p503-historia-twocol">' + tratamientosHtml + historiaHtml + '</div>'
      : '';

    const galeria = Array.isArray(h.galeria) ? h.galeria : [];
    const galeriaHtml = galeria.length
      ? '<div class="p503-historia-section"><h4><i class="fa-solid fa-images"></i> Galería</h4><div class="gallery-grid p503-historia-gallery">' +
          galeria.map((item, idx) => {
            const media = item.isVideo
              ? '<video src="' + item.src + '" muted playsinline preload="metadata"></video>'
              : '<img src="' + item.src + '" alt="' + escapeHtmlLocal(h.nombre) + ' — foto ' + (idx + 1) + '" loading="lazy">';
            return '<div class="gallery-item" data-lightbox-index="' + idx + '">' + media + '</div>';
          }).join('') +
        '</div></div>'
      : '';

    return (
      '<div class="p503-historia-ba">' + antes + despues + '</div>' +
      '<div class="p503-historia-body">' +
        '<span class="status-badge status-' + h.estado + '">' + h.estadoEmoji + ' ' + escapeHtmlLocal(h.estadoLabel) + '</span>' +
        '<h3 class="p503-historia-nombre">' + escapeHtmlLocal(h.nombre) + '</h3>' +
        fraseHtml +
        metaHtml +
        colsHtml +
        timelineHtml +
        galeriaHtml +
      '</div>'
    );
  }

  window.openP503HistoriaModal = function (h) {
    if (!h) return;
    buildModal();
    const contentEl = modal.querySelector('.p503-historia-content');
    contentEl.innerHTML = buildContentHtml(h);
    modal.querySelector('.p503-historia-scroll').scrollTop = 0;

    // Fotos "Antes/Después" — se amplían con el mismo Lightbox único del
    // sitio; si existen ambas, se agrupan en una sola galería de 2 fotos
    // para poder recorrerlas con las flechas del Lightbox.
    const antesDespues = [];
    if (h.fotoAntes) antesDespues.push({ src: h.fotoAntes, isVideo: false, title: h.nombre });
    if (h.fotoDespues) antesDespues.push({ src: h.fotoDespues, isVideo: false, title: h.nombre });
    contentEl.querySelectorAll('.p503-historia-ba .ba-item').forEach(item => {
      const img = item.querySelector('img');
      if (!img) return;
      item.classList.add('ba-item-clickable');
      item.addEventListener('click', () => {
        const idx = antesDespues.findIndex(it => it.src === img.getAttribute('src'));
        if (typeof window.openP503Lightbox === 'function') {
          window.openP503Lightbox(antesDespues, idx > -1 ? idx : 0, h.nombre);
        }
      });
    });

    // La galería de esta historia reutiliza el mismo visor (lightbox) que
    // ya usa "Programas" — no hace falta un visor aparte.
    const galeria = Array.isArray(h.galeria) ? h.galeria : [];
    contentEl.querySelectorAll('.p503-historia-gallery .gallery-item').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const idx = parseInt(thumb.dataset.lightboxIndex, 10) || 0;
        if (typeof window.openP503Lightbox === 'function') window.openP503Lightbox(galeria, idx, h.nombre);
      });
    });

    modal.classList.add('open');
    window.p503LockScroll();
  };
})();

/* =============================================================================
   MODAL DE CONTIGO — modal único y reutilizable para el banner "Contigo" de
   la portada. Se construye una sola vez (mismo patrón que el modal de
   Historias, arriba) y se rellena con los datos que content-loader.js ya
   dejó listos en el atributo data-contigo del banner (#contigoBanner), así
   que editar el programa en content/contigo.js nunca requiere tocar este
   archivo.
   ============================================================================= */
(function () {
  let modal = null;

  function escapeHtmlLocal(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildModal() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'p503-contigo-modal';
    modal.innerHTML =
      '<div class="p503-contigo-overlay"></div>' +
      '<div class="p503-contigo-inner">' +
        '<button class="p503-contigo-close" type="button" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>' +
        '<div class="p503-contigo-scroll"><div class="p503-contigo-content"></div></div>' +
      '</div>';
    document.body.appendChild(modal);

    modal.querySelector('.p503-contigo-overlay').addEventListener('click', closeContigoModal);
    modal.querySelector('.p503-contigo-close').addEventListener('click', closeContigoModal);
    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('open') && e.key === 'Escape') closeContigoModal();
    });
  }

  function closeContigoModal() {
    if (!modal) return;
    modal.classList.remove('open');
    window.p503UnlockScroll();
  }

  function buildContentHtml(c) {
    const fotoHtml = c.foto
      ? '<div class="p503-contigo-photo"><img src="' + c.foto + '" alt="' + escapeHtmlLocal(c.titulo) + '" loading="lazy" decoding="async"></div>'
      : '<div class="p503-contigo-photo p503-contigo-photo-fallback"><i class="fa-solid fa-paw"></i></div>';

    const serviciosHtml = (c.servicios && c.servicios.length)
      ? '<div class="p503-contigo-section">' +
          '<h4 class="p503-contigo-subtitle">¿Cómo podemos ayudarte?</h4>' +
          '<div class="p503-contigo-servicios">' +
            c.servicios.map(s =>
              '<div class="p503-contigo-servicio">' +
                '<span class="icon" style="background:' + escapeHtmlLocal(s.color || '#1E3D2B') + '"><i class="' + escapeHtmlLocal(s.icono || 'fa-solid fa-paw') + '"></i></span>' +
                '<h5>' + escapeHtmlLocal(s.titulo) + '</h5>' +
                '<p>' + escapeHtmlLocal(s.descripcion) + '</p>' +
              '</div>'
            ).join('') +
          '</div>' +
        '</div>'
      : '';

    const requisitosHtml = (c.requisitos && c.requisitos.length)
      ? '<div class="p503-contigo-req">' +
          '<span class="p503-contigo-req-icon"><i class="fa-solid fa-paw"></i></span>' +
          '<div class="p503-contigo-req-body">' +
            '<h4><i class="fa-solid fa-heart"></i> ¿Quiénes pueden solicitarlo?</h4>' +
            '<ul>' + c.requisitos.map(r => '<li><i class="fa-solid fa-circle-check"></i>' + escapeHtmlLocal(r) + '</li>').join('') + '</ul>' +
          '</div>' +
        '</div>'
      : '';

    const whatsappNumero = (window.PARAISO503_CONTENT && window.PARAISO503_CONTENT.configuracion && window.PARAISO503_CONTENT.configuracion.contacto && window.PARAISO503_CONTENT.configuracion.contacto.whatsappPrincipal) || '';
    const mensaje = encodeURIComponent(c.mensajeWhatsapp || '¡Hola! Me gustaría recibir orientación sobre el programa Contigo.');
    const enlacePagina = c.enlacePagina || 'contigo.html';

    return (
      fotoHtml +
      '<div class="p503-contigo-body">' +
        '<h3 class="p503-contigo-nombre">' + escapeHtmlLocal(c.titulo || 'Contigo') + ' <i class="fa-regular fa-heart"></i></h3>' +
        (c.subtitulo ? '<p class="p503-contigo-frase">' + escapeHtmlLocal(c.subtitulo) + '</p>' : '') +
        (c.descripcion ? '<p class="p503-contigo-desc">' + escapeHtmlLocal(c.descripcion) + '</p>' : '') +
        serviciosHtml +
        requisitosHtml +
        '<div class="p503-contigo-actions">' +
          '<a class="p503-contigo-btn-whats" href="https://wa.me/' + escapeHtmlLocal(whatsappNumero) + '?text=' + mensaje + '" target="_blank" rel="noopener">' +
            '<i class="fa-brands fa-whatsapp"></i><span><b>Enviar mensaje</b><small>Te responderemos por WhatsApp</small></span>' +
          '</a>' +
          '<a class="p503-contigo-btn-info" href="' + escapeHtmlLocal(enlacePagina) + '">' +
            '<i class="fa-solid fa-circle-info"></i><span><b>Ver más sobre el programa</b><small>Conoce requisitos, proceso y más información</small></span>' +
          '</a>' +
        '</div>' +
      '</div>'
    );
  }

  window.openP503ContigoModal = function (c) {
    if (!c) return;
    buildModal();
    const contentEl = modal.querySelector('.p503-contigo-content');
    contentEl.innerHTML = buildContentHtml(c);
    modal.querySelector('.p503-contigo-scroll').scrollTop = 0;
    modal.classList.add('open');
    window.p503LockScroll();
  };
})();

/* =============================================================================
   MODAL DE TARJETA DEL CARRUSEL — modal único y reutilizable para las
   tarjetas adicionales del carrusel "Urgencias de este mes" (Rescate
   reciente, y en el futuro Adopciones / Historia destacada). Mismo patrón
   que los modales de arriba: se construye una sola vez y se rellena con el
   JSON que content-loader.js ya dejó listo en el atributo data-carrusel-modal
   de cada botón, así que agregar o activar una tarjeta nueva en
   content/configuracion.js nunca requiere tocar este archivo.
   ============================================================================= */
(function () {
  let modal = null;

  function escapeHtmlLocal(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildModal() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'p503-carrusel-modal';
    modal.innerHTML =
      '<div class="p503-carrusel-overlay"></div>' +
      '<div class="p503-carrusel-inner">' +
        '<button class="p503-carrusel-close" type="button" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>' +
        '<div class="p503-carrusel-scroll"><div class="p503-carrusel-content"></div></div>' +
      '</div>';
    document.body.appendChild(modal);

    modal.querySelector('.p503-carrusel-overlay').addEventListener('click', closeCarruselModal);
    modal.querySelector('.p503-carrusel-close').addEventListener('click', closeCarruselModal);
    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('open') && e.key === 'Escape') closeCarruselModal();
    });
  }

  function closeCarruselModal() {
    if (!modal) return;
    modal.classList.remove('open');
    window.p503UnlockScroll();
    document.dispatchEvent(new CustomEvent('p503:carrusel-modal-close'));
  }

  // 'foto' puede venir como una sola ruta (string) o como una lista de rutas
  // (array) cuando la tarjeta tiene varias imágenes; esto normaliza ambos
  // casos a un array simple, sin tocar cómo llega la información desde
  // content/configuracion.js.
  function getFotos(m) {
    if (Array.isArray(m.foto)) return m.foto.filter(Boolean);
    if (m.foto) return [m.foto];
    return [];
  }

  function buildContentHtml(m) {
    const fotos = getFotos(m);
    let fotoHtml = '';
    if (fotos.length === 1) {
      // Una sola imagen: mismo markup de siempre, sin flechas ni puntos.
      fotoHtml = '<div class="p503-carrusel-photo"><img src="' + escapeHtmlLocal(fotos[0]) + '" alt="' + escapeHtmlLocal(m.titulo || '') + '" loading="lazy" decoding="async"></div>';
    } else if (fotos.length > 1) {
      // Varias imágenes: mini carrusel con flechas sobre la foto y puntos debajo.
      const slides = fotos.map((f) =>
        '<div class="p503-carrusel-photo-slide"><img src="' + escapeHtmlLocal(f) + '" alt="' + escapeHtmlLocal(m.titulo || '') + '" loading="lazy" decoding="async"></div>'
      ).join('');
      const dots = fotos.map((f, i) =>
        '<button type="button" class="' + (i === 0 ? 'active' : '') + '" data-p503-photo-dot="' + i + '" aria-label="Ir a foto ' + (i + 1) + '"></button>'
      ).join('');
      fotoHtml =
        '<div class="p503-carrusel-photo-wrap">' +
          '<div class="p503-carrusel-photo p503-carrusel-photo-multi">' +
            '<div class="p503-carrusel-photo-track">' + slides + '</div>' +
            '<button class="p503-carrusel-photo-nav p503-carrusel-photo-prev" type="button" aria-label="Foto anterior"><i class="fa-solid fa-chevron-left"></i></button>' +
            '<button class="p503-carrusel-photo-nav p503-carrusel-photo-next" type="button" aria-label="Foto siguiente"><i class="fa-solid fa-chevron-right"></i></button>' +
          '</div>' +
          '<div class="p503-carrusel-photo-dots">' + dots + '</div>' +
        '</div>';
    }
    const cierreHtml = (m.cierreTitulo || m.cierreTexto)
      ? '<div class="p503-carrusel-cierre">' +
          (m.cierreTitulo ? '<h4>' + escapeHtmlLocal(m.cierreTitulo) + '</h4>' : '') +
          (m.cierreTexto ? '<p>' + escapeHtmlLocal(m.cierreTexto).replace(/\n/g, '<br>') + '</p>' : '') +
        '</div>'
      : '';
    const secciones = Array.isArray(m.secciones) ? m.secciones : [];
    const seccionesHtml = secciones.length
      ? '<div class="p503-carrusel-secciones">' + secciones.map(function(s) {
          const items = Array.isArray(s.items) && s.items.length
            ? '<ul>' + s.items.map(function(item) { return '<li>' + escapeHtmlLocal(item) + '</li>'; }).join('') + '</ul>'
            : '';
          return '<section>' +
            (s.icono ? '<span class="p503-carrusel-section-icon"><i class="' + escapeHtmlLocal(s.icono) + '"></i></span>' : '') +
            '<div>' + (s.titulo ? '<h4>' + escapeHtmlLocal(s.titulo) + '</h4>' : '') +
            (s.texto ? '<p>' + escapeHtmlLocal(s.texto).replace(/\n/g, '<br>') + '</p>' : '') + items + '</div>' +
          '</section>';
        }).join('') + '</div>'
      : '';
    const acciones = Array.isArray(m.acciones) ? m.acciones : [];
    const accionesHtml = acciones.length
      ? '<div class="p503-carrusel-actions">' + acciones.map(function(a) {
          const externo = a.tipo === 'externo';
          return '<a class="' + (externo ? 'btn-secondary' : 'btn-primary') + '" href="' + escapeHtmlLocal(a.href || '#') + '"' +
            (externo ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + escapeHtmlLocal(a.texto || 'Conocer más') + '</a>';
        }).join('') + '</div>'
      : '';
    return (
      fotoHtml +
      '<div class="p503-carrusel-body">' +
        '<h3 class="p503-carrusel-titulo">' + escapeHtmlLocal(m.titulo || '') + '</h3>' +
        (m.texto ? '<p class="p503-carrusel-texto">' + escapeHtmlLocal(m.texto).replace(/\n/g, '<br>') + '</p>' : '') +
        seccionesHtml + cierreHtml + accionesHtml +
      '</div>'
    );
  }

  // Activa las flechas, los puntos y el deslizar con el dedo/mouse del mini
  // carrusel de fotos del modal, cuando hay más de una imagen. Mismo patrón
  // (pointerdown/move/up) que el carrusel "Urgencias de este mes" de la
  // portada, más abajo en este archivo.
  function initPhotoCarousel(contentEl) {
    const track = contentEl.querySelector('.p503-carrusel-photo-track');
    if (!track) return;
    const slides = Array.from(track.children);
    const prevBtn = contentEl.querySelector('.p503-carrusel-photo-prev');
    const nextBtn = contentEl.querySelector('.p503-carrusel-photo-next');
    const dots = Array.from(contentEl.querySelectorAll('.p503-carrusel-photo-dots button'));
    let index = 0;

    function update() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }
    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

    let startX = 0, deltaX = 0, dragging = false;
    track.addEventListener('pointerdown', (e) => {
      dragging = true;
      startX = e.clientX;
      deltaX = 0;
      track.style.transition = 'none';
      try { track.setPointerCapture(e.pointerId); } catch (err) {}
    });
    track.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      deltaX = e.clientX - startX;
      track.style.transform = 'translateX(calc(-' + (index * 100) + '% + ' + deltaX + 'px))';
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      track.style.transition = '';
      const threshold = track.clientWidth * 0.18;
      if (deltaX > threshold) goTo(index - 1);
      else if (deltaX < -threshold) goTo(index + 1);
      else update();
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointerleave', endDrag);
    track.addEventListener('pointercancel', endDrag);

    update();
  }

  window.openP503CarruselModal = function (m) {
    if (!m) return;
    buildModal();
    const contentEl = modal.querySelector('.p503-carrusel-content');
    contentEl.innerHTML = buildContentHtml(m);
    initPhotoCarousel(contentEl);
    contentEl.querySelectorAll('.p503-carrusel-actions a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeCarruselModal();
        window.setTimeout(function() { target.scrollIntoView({behavior:'smooth', block:'start'}); }, 80);
      });
    });
    modal.querySelector('.p503-carrusel-scroll').scrollTop = 0;
    modal.classList.add('open');
    window.p503LockScroll();
    document.dispatchEvent(new CustomEvent('p503:carrusel-modal-open'));
  };
})();

/* =============================================================================
   MODAL DE TARJETA DE PROGRAMA (portada) — modal único y reutilizable para
   las tarjetas de "Nuestros Programas" en la portada (index.html). Se
   construye una sola vez y se rellena con el JSON que content-loader.js ya
   dejó listo en el atributo data-programa de cada tarjeta (ver
   serializarProgramaParaModal en js/content-loader.js), así que agregar o
   editar un programa en content/programas.js nunca requiere tocar este
   archivo. El botón "Conocer el programa" de la tarjeta sigue funcionando
   igual: enlaza directo a programas.html#id sin pasar por este modal (el
   listener que abre el modal, más abajo, lo excluye explícitamente).
   ============================================================================= */
(function () {
  let modal = null;

  function escapeHtmlLocal(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildModal() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'p503-programa-modal';
    modal.innerHTML =
      '<div class="p503-programa-overlay"></div>' +
      '<div class="p503-programa-inner">' +
        '<button class="p503-programa-close" type="button" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>' +
        '<div class="p503-programa-scroll"><div class="p503-programa-content"></div></div>' +
      '</div>';
    document.body.appendChild(modal);

    modal.querySelector('.p503-programa-overlay').addEventListener('click', closeProgramaModal);
    modal.querySelector('.p503-programa-close').addEventListener('click', closeProgramaModal);
    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('open') && e.key === 'Escape') closeProgramaModal();
    });
  }

  function closeProgramaModal() {
    if (!modal) return;
    modal.classList.remove('open');
    window.p503UnlockScroll();
  }

  // El modal de la portada es una vista rápida: un resumen breve y un
  // acceso al detalle completo. El contenido largo se conserva únicamente
  // en programas.html, donde sí tiene espacio para desarrollarse.
  function buildContentHtml(p) {
    return (
      '<div class="p503-programa-body">' +
        '<span class="p503-programa-eyebrow">Resumen del programa</span>' +
        '<h3 class="p503-programa-titulo">' + escapeHtmlLocal(p.titulo || '') + '</h3>' +
        '<p class="p503-programa-resumen">' + escapeHtmlLocal(p.resumen || '') + '</p>' +
        '<a class="btn-primary p503-programa-cta" href="' + escapeHtmlLocal(p.link || '#') + '">Conocer el programa completo <i class="fa-solid fa-arrow-right"></i></a>' +
      '</div>'
    );
  }

  window.openP503ProgramaModal = function (p) {
    if (!p) return;
    buildModal();
    const contentEl = modal.querySelector('.p503-programa-content');
    contentEl.innerHTML = buildContentHtml(p);
    modal.querySelector('.p503-programa-scroll').scrollTop = 0;
    modal.classList.add('open');
    window.p503LockScroll();
  };
})();

function initSiteInteractions() {

  // ===== Mantiene --header-h sincronizado con la altura real del header, para
  // que las secciones internas (Nosotros, Cómo ayudar, Historias, etc.) queden
  // completamente visibles debajo del menú fijo al navegar por anclas =====
  const headerEl = document.querySelector('header');
  if (headerEl) {
    const syncHeaderVar = () => {
      document.documentElement.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
    };
    syncHeaderVar();
    window.addEventListener('resize', syncHeaderVar);
  }

  // ===== Header transparente sobre el hero (solo en la home) que se pone verde al hacer scroll =====
  if (document.body.classList.contains('home')) {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    if (header && hero) {
      // El header de la portada ahora es fixed y ya no ocupa espacio en el flujo.
      // No aplicamos margen negativo al hero: así evitamos desplazamientos y
      // mantenemos el header superpuesto de forma estable en todos los navegadores.
      hero.style.marginTop = '0px';
      const onScroll = () => {
        if (window.scrollY > header.offsetHeight * 0.6) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
        header.classList.toggle('scrolled-deep', window.scrollY > 340);
      };
      window.addEventListener('scroll', onScroll, {passive:true});
      onScroll();
    }
  } else {
    // ===== En el resto de páginas el header ya tiene fondo sólido; solo agregamos
    // una sombra muy sutil en cuanto el usuario empieza a desplazarse =====
    const header = document.querySelector('header');
    if (header) {
      const onScrollShadow = () => {
        header.classList.toggle('scrolled', window.scrollY > 8);
        header.classList.toggle('scrolled-deep', window.scrollY > 340);
      };
      window.addEventListener('scroll', onScrollShadow, {passive:true});
      onScrollShadow();
    }
  }

  // ===== Logo: vuelve suavemente al inicio de la página en la home, o navega
  // al Home (index.html) con normalidad desde el resto de páginas =====
  const logoHome = document.getElementById('logoHome');
  if (logoHome && document.body.classList.contains('home')) {
    logoHome.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  // ===== Botón flotante de WhatsApp: se oculta suavemente mientras el usuario
  // se desplaza hacia abajo activamente, y reaparece al detenerse o al subir =====
  const fabWhats = document.querySelector('.fab-whats');
  if (fabWhats) {
    const homeHero = document.body.classList.contains('home') ? document.querySelector('.hero') : null;
    let lastScrollY = window.scrollY;
    let hideTimer = null;
    let attentionTimer = null;
    const reduceFabMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clearFabAttention = () => {
      fabWhats.classList.remove('fab-attention');
      if (attentionTimer) { window.clearTimeout(attentionTimer); attentionTimer = null; }
    };
    const triggerFabAttention = () => {
      attentionTimer = null;
      if (!document.hidden && !fabWhats.classList.contains('fab-hidden') && !fabWhats.classList.contains('fab-before-content')) {
        fabWhats.classList.add('fab-attention');
        window.setTimeout(() => fabWhats.classList.remove('fab-attention'), 900);
      }
      if (!reduceFabMotion && !document.hidden) {
        attentionTimer = window.setTimeout(triggerFabAttention, 9000);
      }
    };
    const scheduleFabAttention = () => {
      clearFabAttention();
      if (reduceFabMotion || document.hidden) return;
      attentionTimer = window.setTimeout(triggerFabAttention, 9000);
    };
    const isAtPageEnd = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    const updateFabForPageEnd = () => fabWhats.classList.toggle('fab-at-page-end', isAtPageEnd());
    const showFab = () => {
      if (isAtPageEnd()) {
        fabWhats.classList.add('fab-at-page-end');
        return;
      }
      fabWhats.classList.remove('fab-hidden', 'fab-at-page-end');
    };
    const updateFabForHero = () => {
      if (!homeHero) return;
      const revealAt = homeHero.offsetTop + (homeHero.offsetHeight * .78);
      fabWhats.classList.toggle('fab-before-content', window.scrollY < revealAt);
    };
    const onFabScroll = () => {
      clearFabAttention();
      updateFabForHero();
      updateFabForPageEnd();
      const currentY = window.scrollY;
      const goingDown = currentY > lastScrollY + 4;
      const goingUp = currentY < lastScrollY - 4;
      if (goingDown && currentY > 60) {
        fabWhats.classList.add('fab-hidden');
      } else if (goingUp) {
        showFab();
      }
      lastScrollY = currentY;
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        showFab();
        scheduleFabAttention();
      }, 650); // reaparece al detenerse el scroll
    };
    window.addEventListener('scroll', onFabScroll, {passive:true});
    window.addEventListener('resize', () => {
      updateFabForHero();
      updateFabForPageEnd();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearFabAttention();
      else scheduleFabAttention();
    });
    updateFabForHero();
    updateFabForPageEnd();
    scheduleFabAttention();
  }

  // ===== Botón "Volver al inicio": aparece solo tras bajar una parte
  // considerable de la página, permanece visible mientras el usuario sigue
  // desplazándose y se oculta suavemente en cuanto se detiene a leer =====
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    let hideTimer = null;
    const onBackToTopScroll = () => {
      const pastThreshold = window.scrollY > window.innerHeight * 0.8;
      clearTimeout(hideTimer);
      if (pastThreshold) {
        backToTop.classList.add('show');
        hideTimer = setTimeout(() => backToTop.classList.remove('show'), 1000);
      } else {
        backToTop.classList.remove('show');
      }
    };
    window.addEventListener('scroll', onBackToTopScroll, {passive:true});
    onBackToTopScroll();
    backToTop.addEventListener('click', () => {
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  // ===== Galería: la barra de categorías (.gal-toolbar) ya es "sticky" por
  // CSS. Aquí solo detectamos el momento exacto en que queda fija para
  // activar su modo compacto (clase .is-stuck) y devolverla a su diseño
  // completo al subir. El umbral se calcula con offsetTop (posición del
  // elemento en el flujo normal), que NO cambia aunque la barra se achique
  // al volverse compacta — así se evita que su propio cambio de tamaño
  // dispare el detector una y otra vez. =====
  const galToolbar = document.getElementById('galToolbar');
  if (galToolbar) {
    let stickyThreshold = 0;
    const computeStickyThreshold = () => {
      let top = 0;
      let el = galToolbar;
      while (el) { top += el.offsetTop; el = el.offsetParent; }
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 70;
      stickyThreshold = top - headerH - 10;
    };
    computeStickyThreshold();
    window.addEventListener('resize', computeStickyThreshold);
    const onGalScroll = () => {
      galToolbar.classList.toggle('is-stuck', window.scrollY > stickyThreshold + 1);
    };
    window.addEventListener('scroll', onGalScroll, {passive:true});
    onGalScroll();
  }

  // ===== Galería (vista previa en la portada): las 4 fotos abren el mismo
  // visor/lightbox reutilizable que ya usa el resto del sitio. Cuando se
  // reemplacen los src de ejemplo por fotos reales, esto sigue funcionando
  // sin cambios. =====
  const galeriaPreviewGrid = document.getElementById('galeriaPreviewGrid');
  if (galeriaPreviewGrid) {
    const galeriaPreviewItems = Array.from(galeriaPreviewGrid.querySelectorAll('.galeria-preview-item'));
    const galeriaPreviewImages = galeriaPreviewItems.map(item => {
      const img = item.querySelector('img');
      return { src: img ? img.getAttribute('src') : '', isVideo: false };
    });
    galeriaPreviewItems.forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.lightboxIndex, 10) || 0;
        if (typeof window.openP503Lightbox === 'function') {
          window.openP503Lightbox(galeriaPreviewImages, idx, 'Galería del Paraíso');
        }
      });
    });
  }

  // ===== Menú móvil =====
  const mobileMenuEl = document.getElementById('mobileMenu');
  const burgerBtn = document.getElementById('burgerBtn');
  const burgerIcon = burgerBtn ? burgerBtn.querySelector('i') : null;
  let mobileMenuOpen = false;

  const setMobileMenu = (open) => {
    if (!mobileMenuEl || !burgerBtn || mobileMenuOpen === open) return;
    mobileMenuOpen = open;
    mobileMenuEl.classList.toggle('open', open);
    burgerBtn.classList.toggle('is-open', open);
    burgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    burgerBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (burgerIcon) {
      burgerIcon.classList.toggle('fa-bars', !open);
      burgerIcon.classList.toggle('fa-xmark', open);
    }
    if (headerEl) headerEl.classList.toggle('menu-open', open);
    if (open) window.p503LockScroll();
    else window.p503UnlockScroll();
  };

  if (burgerBtn) burgerBtn.addEventListener('click', () => setMobileMenu(!mobileMenuOpen));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOpen) setMobileMenu(false);
  });

  document.addEventListener('pointerdown', (e) => {
    if (mobileMenuOpen && headerEl && !headerEl.contains(e.target)) setMobileMenu(false);
  });

  window.addEventListener('resize', () => {
    if (mobileMenuOpen && window.innerWidth >= 820) setMobileMenu(false);
  });

  // En la portada, resalta en el menú la sección que realmente está visible.
  // En las páginas independientes se conserva el aria-current escrito en su HTML.
  if (document.body.classList.contains('home')) {
    const mobileSectionLinks = Array.from(document.querySelectorAll('#mobileMenu a[href^="#"]'));
    const trackedSections = mobileSectionLinks.map((link) => {
      const section = document.querySelector(link.getAttribute('href'));
      return section ? {link, section} : null;
    }).filter(Boolean);
    let sectionSpyQueued = false;

    const updateActiveMobileSection = () => {
      sectionSpyQueued = false;
      // La sección activa es la que ocupa la parte superior útil de la página,
      // justo debajo del encabezado fijo. Un margen corto evita que el cambio
      // se adelante visualmente a la sección siguiente.
      const headerBar = headerEl ? headerEl.querySelector('nav') : null;
      const marker = (headerBar ? headerBar.offsetHeight : 0) + 24;
      let active = trackedSections[0] || null;
      trackedSections.forEach((item) => {
        if (item.section.getBoundingClientRect().top <= marker) active = item;
      });
      mobileSectionLinks.forEach((link) => link.removeAttribute('aria-current'));
      if (active) active.link.setAttribute('aria-current', 'page');
    };

    const queueSectionSpy = () => {
      if (sectionSpyQueued) return;
      sectionSpyQueued = true;
      requestAnimationFrame(updateActiveMobileSection);
    };
    window.addEventListener('scroll', queueSectionSpy, {passive: true});
    window.addEventListener('resize', queueSectionSpy);
    updateActiveMobileSection();
  }

  document.querySelectorAll('#mobileMenu a').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      const isSamePageAnchor = href.startsWith('#') && href.length > 1 && document.querySelector(href);
      setMobileMenu(false);
      if (isSamePageAnchor) {
        // Evita que el navegador calcule el destino del scroll mientras el
        // menú todavía está colapsando: esperamos a que termine la
        // transición (la misma duración definida en CSS) y recién ahí
        // desplazamos, usando la altura real y actual del encabezado.
        e.preventDefault();
        const target = document.querySelector(href);
        setTimeout(() => {
          const headerH = headerEl ? headerEl.offsetHeight : 0;
          const y = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
          window.scrollTo({top: Math.max(y, 0), behavior: 'smooth'});
        }, 280);
      }
    });
  });

  // ===== Tabs de "Formas de donar" =====
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });

  // ===== Copiar número de cuenta/billetera (las tarjetas se generan desde content/configuracion.json) =====
  document.querySelectorAll('.copy-num').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.copy;
      navigator.clipboard && navigator.clipboard.writeText(val);
      const orig = btn.innerHTML;
      btn.innerHTML = '¡Copiado! <i class="fa-solid fa-check"></i>';
      setTimeout(() => btn.innerHTML = orig, 1400);
    });
  });

  // ===== Mostrar/ocultar el resto de los programas en la portada =====
  const restWrap = document.getElementById('restWrap');
  const toggleBtn = document.getElementById('toggleProgs');
  const toggleLabel = document.getElementById('toggleLabel');
  if (toggleBtn && restWrap && toggleLabel) {
    let progsOpen = false;
    toggleBtn.addEventListener('click', () => {
      progsOpen = !progsOpen;
      restWrap.style.maxHeight = progsOpen ? restWrap.scrollHeight + 'px' : '0';
      toggleLabel.textContent = progsOpen ? 'Ocultar programas' : 'Mostrar todos los programas';
      toggleBtn.classList.toggle('open', progsOpen);
      toggleBtn.setAttribute('aria-expanded', progsOpen ? 'true' : 'false');
    });
  }

  // ===== Extiende la animación "reveal" (fade + ligero desplazamiento) a más
  // bloques de contenido, sin tocar el HTML de cada página una por una =====
  document.querySelectorAll(
    '.prog-card, .ayudar-card, .red-card, .via-card, .req-col, .somos-grid, .pfc-card, .prog-detail-card'
  ).forEach(el => el.classList.add('reveal'));

  // ===== Animación "reveal" al hacer scroll (aplica a elementos estáticos y a los generados desde JSON) =====
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ===== Favoritos (corazón) — funciona en cualquier página con tarjetas .pet-card =====
  const FAV_KEY = 'p503-favoritos';
  const getFavs = () => { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; } };
  const setFavs = (arr) => { try { localStorage.setItem(FAV_KEY, JSON.stringify(arr)); } catch (e) {} };
  const isFav = (name) => getFavs().includes(name);
  const toggleFav = (name) => {
    let favs = getFavs();
    favs = favs.includes(name) ? favs.filter(f => f !== name) : [...favs, name];
    setFavs(favs);
    return favs.includes(name);
  };
  const refreshFavButtons = () => {
    document.querySelectorAll('.pet-fav').forEach(btn => {
      const active = isFav(btn.dataset.name);
      btn.classList.toggle('active', active);
      btn.innerHTML = active ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
    });
  };
  document.querySelectorAll('.pet-fav').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleFav(btn.dataset.name);
      refreshFavButtons();
      if (typeof window.applyPetFilters === 'function') window.applyPetFilters();
    });
  });
  refreshFavButtons();

  // ===== Foto de las tarjetas de Adopciones — se amplía con el mismo
  // Lightbox que ya usa el resto del sitio (portada y adopciones.html,
  // ambas construidas con .pet-card). Se ignoran los clics sobre el botón
  // de favoritos, que vive dentro de la misma foto. =====
  document.querySelectorAll('.pet-card .pet-photo').forEach(photo => {
    const img = photo.querySelector('img');
    if (!img) return;
    photo.addEventListener('click', (e) => {
      if (e.target.closest('.pet-fav')) return;
      const name = photo.closest('.pet-card').dataset.name || '';
      if (typeof window.openP503Lightbox === 'function') {
        window.openP503Lightbox([{ src: img.currentSrc || img.src, isVideo: false, title: name }], 0, name);
      }
    });
  });

  // ===== Contador dinámico de animalitos disponibles (adopciones.html) =====
  const petCounterNum = document.getElementById('petCounterNum');
  if (petCounterNum) {
    const totalPets = document.querySelectorAll('#petGrid .pet-card').length;
    petCounterNum.textContent = totalPets;
  }

  // ===== Filtros de la página de Adopciones =====
  const petGrid = document.getElementById('petGrid');
  if (petGrid) {
    let speciesActive = 'todos';
    let sexActive = 'todos';
    let ageActive = 'todos';
    let onlyFavs = false;

    const speciesBtns = document.querySelectorAll('#speciesFilter .filter-btn');
    const sexBtns = document.querySelectorAll('#sexFilter .filter-btn');
    const ageBtns = document.querySelectorAll('#ageFilter .filter-btn');
    const favToggle = document.getElementById('favToggle');
    const noResults = document.getElementById('noResults');

    window.applyPetFilters = function () {
      let visibleCount = 0;
      document.querySelectorAll('#petGrid .pet-card').forEach(card => {
        const matchesSpecies = speciesActive === 'todos' || card.dataset.species === speciesActive;
        const matchesSex = sexActive === 'todos' || card.dataset.sex === sexActive;
        const matchesAge = ageActive === 'todos' || card.dataset.age === ageActive;
        const matchesFav = !onlyFavs || isFav(card.dataset.name);
        const visible = matchesSpecies && matchesSex && matchesAge && matchesFav;
        card.classList.toggle('hidden', !visible);
        if (visible) visibleCount++;
      });
      if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    };

    speciesBtns.forEach(btn => btn.addEventListener('click', () => {
      speciesBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      speciesActive = btn.dataset.species;
      window.applyPetFilters();
    }));
    sexBtns.forEach(btn => btn.addEventListener('click', () => {
      sexBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sexActive = btn.dataset.sex;
      window.applyPetFilters();
    }));
    ageBtns.forEach(btn => btn.addEventListener('click', () => {
      ageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ageActive = btn.dataset.age;
      window.applyPetFilters();
    }));
    if (favToggle) favToggle.addEventListener('click', () => {
      onlyFavs = !onlyFavs;
      favToggle.classList.toggle('active', onlyFavs);
      window.applyPetFilters();
    });

    window.applyPetFilters();
  }

  // ===== Filtro de Historias (historias.html) =====
  const historiasGrid = document.getElementById('historiasGrid');
  const statusFilterEl = document.getElementById('statusFilter');
  if (historiasGrid && statusFilterEl) {
    const statusBtns = statusFilterEl.querySelectorAll('.filter-btn');
    const noResultsHistorias = document.getElementById('noResultsHistorias');

    const applyStatusFilter = (status) => {
      let visibleCount = 0;
      historiasGrid.querySelectorAll('.caso-card').forEach(card => {
        const visible = status === 'todos' || card.dataset.status === status;
        card.classList.toggle('hidden', !visible);
        if (visible) visibleCount++;
      });
      if (noResultsHistorias) noResultsHistorias.style.display = visibleCount === 0 ? 'block' : 'none';
    };

    statusBtns.forEach(btn => btn.addEventListener('click', () => {
      statusBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyStatusFilter(btn.dataset.status);
    }));
  }

  // ===== Galería (galeria.html) =====
  // El HTML (filtros, tarjetas de fotos/videos, video destacado y playlists)
  // ya fue generado por js/content-loader.js a partir de content/galeria.js
  // antes de que esta función se ejecute. Aquí solo se activa el
  // comportamiento: pestañas Fotos/Videos, filtro por categoría (compartido
  // entre ambas pestañas), buscador, paginación "Cargar más" y el visor de
  // fotos (reutiliza el mismo lightbox que el resto del sitio).
  const galPhotoGrid = document.getElementById('galPhotoGrid');
  if (galPhotoGrid) {
    const PAGE_SIZE = 10;
    const galTabs = document.querySelectorAll('.gal-tab');
    const galPanels = document.querySelectorAll('.gal-panel');
    const galCatBtns = document.querySelectorAll('#galCatFilters .filter-btn');
    const galSearchInput = document.getElementById('galSearchInput');
    const galLoadMoreBtn = document.getElementById('galLoadMoreBtn');
    const galPhotoEmpty = document.getElementById('galPhotoEmpty');
    const galVideoEmpty = document.getElementById('galVideoEmpty');
    const galFeaturedVideo = document.getElementById('galFeaturedVideo');
    const galRecentVideos = document.getElementById('galRecentVideos');

    let categoriaActiva = 'todos';
    let visiblesFotos = PAGE_SIZE;

    function normalizarBusqueda(str) {
      return String(str || '')
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function coincide(el, termino) {
      const matchCategoria = categoriaActiva === 'todos' || el.dataset.categoria === categoriaActiva;
      const matchBusqueda = !termino || (el.dataset.search || '').includes(termino);
      return matchCategoria && matchBusqueda;
    }

    function aplicarFiltros() {
      const termino = normalizarBusqueda(galSearchInput ? galSearchInput.value : '');

      // ----- Fotos: filtro + paginación "Cargar más" -----
      const fotoCards = Array.from(galPhotoGrid.querySelectorAll('.gal-photo-card'));
      const fotosCoinciden = fotoCards.filter(card => coincide(card, termino));
      fotoCards.forEach(card => card.classList.toggle('gal-hidden', fotosCoinciden.indexOf(card) === -1));
      fotosCoinciden.forEach((card, i) => card.classList.toggle('gal-hidden', i >= visiblesFotos));
      if (galPhotoEmpty) galPhotoEmpty.style.display = fotosCoinciden.length === 0 ? 'block' : 'none';
      if (galLoadMoreBtn) galLoadMoreBtn.style.display = fotosCoinciden.length > visiblesFotos ? '' : 'none';

      // ----- Videos: video destacado + videos recientes -----
      let videosVisibles = 0;
      if (galFeaturedVideo && galFeaturedVideo.dataset.categoria) {
        const visible = coincide(galFeaturedVideo, termino);
        galFeaturedVideo.classList.toggle('gal-hidden', !visible);
        if (visible) videosVisibles++;
      }
      if (galRecentVideos) {
        galRecentVideos.querySelectorAll('.gal-video-card').forEach(card => {
          const visible = coincide(card, termino);
          card.classList.toggle('gal-hidden', !visible);
          if (visible) videosVisibles++;
        });
      }
      if (galVideoEmpty) galVideoEmpty.style.display = videosVisibles === 0 ? 'block' : 'none';
    }

    // Pestañas Fotografías / Videos
    galTabs.forEach(tab => tab.addEventListener('click', () => {
      galTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      galPanels.forEach(p => p.classList.toggle('active', p.id === 'galPanel' + (tab.dataset.tab === 'fotos' ? 'Fotos' : 'Videos')));
    }));

    // Filtro por categoría (aplica a fotos y videos a la vez)
    galCatBtns.forEach(btn => btn.addEventListener('click', () => {
      galCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      categoriaActiva = btn.dataset.categoria;
      visiblesFotos = PAGE_SIZE;
      aplicarFiltros();
    }));

    // Buscador (por título y por nombre de categoría)
    if (galSearchInput) {
      galSearchInput.addEventListener('input', () => {
        visiblesFotos = PAGE_SIZE;
        aplicarFiltros();
      });
    }

    // "Cargar más fotografías"
    if (galLoadMoreBtn) {
      galLoadMoreBtn.addEventListener('click', () => {
        visiblesFotos += PAGE_SIZE;
        aplicarFiltros();
      });
    }

    // Fotos: abren el visor/lightbox reutilizable y permiten recorrer todas
    // las fotografías que coinciden con el filtro activo (no solo las ya
    // cargadas en pantalla).
    let galeriaCompleta = [];
    try { galeriaCompleta = JSON.parse(galPhotoGrid.dataset.gallery || '[]'); } catch (e) { galeriaCompleta = []; }
    galPhotoGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.gal-photo-card');
      if (!card || card.classList.contains('gal-hidden')) return;
      const termino = normalizarBusqueda(galSearchInput ? galSearchInput.value : '');
      const fotoCards = Array.from(galPhotoGrid.querySelectorAll('.gal-photo-card')).filter(c => coincide(c, termino));
      const items = fotoCards.map(c => galeriaCompleta[parseInt(c.dataset.lightboxIndex, 10)]).filter(Boolean);
      const idx = fotoCards.indexOf(card);
      if (idx > -1 && typeof window.openP503Lightbox === 'function') {
        window.openP503Lightbox(items, idx, items[idx] ? items[idx].title : 'Galería del Paraíso');
      }
    });

    // Video destacado y videos recientes: al hacer clic, abren el video en YouTube
    function abrirYoutube(el) {
      const url = el.dataset.youtube;
      if (url) window.open(url, '_blank', 'noopener');
    }
    if (galFeaturedVideo) {
      galFeaturedVideo.addEventListener('click', () => {
        const media = galFeaturedVideo.querySelector('.gal-featured-media');
        if (media) abrirYoutube(media);
      });
    }
    if (galRecentVideos) {
      galRecentVideos.addEventListener('click', (e) => {
        const card = e.target.closest('.gal-video-card');
        if (card && !card.classList.contains('gal-hidden')) abrirYoutube(card);
      });
    }

    aplicarFiltros();
  }

  // ===== Acordeón de Programas (programas.html) =====
  // El HTML del acordeón (#progAccordion) y del índice de pastillas (#progIndex)
  // ya fue generado por js/content-loader.js a partir de content/programas.json
  // antes de que esta función se ejecute. Aquí solo se activa el comportamiento.
  const progAccordionEl = document.getElementById('progAccordion');
  const progIndexEl = document.getElementById('progIndex');
  if (progAccordionEl && progIndexEl) {

    const accItems = Array.from(progAccordionEl.querySelectorAll('.acc-item'));

    const setOpen = (item, open) => {
      const header = item.querySelector('.acc-header');
      const panel = item.querySelector('.acc-panel');
      item.classList.toggle('open', open);
      header.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0';
    };

    // Cuando se abre un programa distinto mientras otro ya está abierto, el
    // panel anterior se cierra (max-height .45s) al mismo tiempo que el nuevo
    // se abre. Si no se hace nada, el cierre del panel de arriba empuja todo
    // el contenido hacia arriba y el header que el usuario acaba de tocar
    // "salta" en pantalla. Esta función compensa el scroll cuadro a cuadro
    // durante la transición para que ese header permanezca fijo en su lugar:
    // visualmente el programa anterior se cierra "por debajo" mientras el
    // nuevo se despliega, sin que la página brinque. No se usa cuando el
    // usuario simplemente cierra el mismo programa (ese caso no cambia).
    const ACC_TRANSITION_MS = 470; // .45s de la transición CSS + margen
    function keepAnchorStableDuringTransition(anchorEl) {
      if (!anchorEl) return;
      // El sitio usa "scroll-behavior: smooth" en <html>, lo que animaría
      // cada corrección de scroll por separado y desfasaría la compensación.
      // Se desactiva solo mientras dura esta transición y se restaura al final.
      const htmlEl = document.documentElement;
      const prevScrollBehavior = htmlEl.style.scrollBehavior;
      htmlEl.style.scrollBehavior = 'auto';

      let anchorTop = anchorEl.getBoundingClientRect().top;
      const start = performance.now();
      const step = (now) => {
        const currentTop = anchorEl.getBoundingClientRect().top;
        const delta = currentTop - anchorTop;
        if (delta !== 0) window.scrollBy(0, delta);
        anchorTop = anchorEl.getBoundingClientRect().top;
        if (now - start < ACC_TRANSITION_MS) {
          requestAnimationFrame(step);
        } else {
          htmlEl.style.scrollBehavior = prevScrollBehavior;
        }
      };
      requestAnimationFrame(step);
    }

    accItems.forEach(item => {
      item.querySelector('.acc-header').addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        const previouslyOpen = !isOpen && accItems.find(other => other !== item && other.classList.contains('open'));

        if (previouslyOpen) keepAnchorStableDuringTransition(item);

        accItems.forEach(other => { if (other !== item) setOpen(other, false); });
        setOpen(item, !isOpen);
      });
    });

    // Galería de cada programa: se ven 3 fotos de vista previa; el botón
    // "Ver más fotos" y las miniaturas abren el lightbox para recorrer todas
    // las imágenes (incluidas las que aún no caben en la vista previa).
    accItems.forEach(item => {
      const galleryWrap = item.querySelector('.prog-gallery');
      if (!galleryWrap) return;
      const verMasBtn = galleryWrap.querySelector('.btn-ver-fotos');
      let galeria = [];
      try { galeria = JSON.parse(galleryWrap.dataset.gallery || '[]'); } catch (e) { galeria = []; }
      const title = galleryWrap.dataset.galleryTitle || '';
      if (verMasBtn) {
        verMasBtn.addEventListener('click', () => {
          const start = parseInt(verMasBtn.dataset.galleryStart, 10) || 0;
          if (typeof window.openP503Lightbox === 'function') window.openP503Lightbox(galeria, start, title);
        });
      }
      galleryWrap.querySelectorAll('.gallery-item').forEach(thumb => {
        thumb.addEventListener('click', () => {
          const idx = parseInt(thumb.dataset.lightboxIndex, 10) || 0;
          if (typeof window.openP503Lightbox === 'function') window.openP503Lightbox(galeria, idx, title);
        });
      });
    });

    // Recalcula la altura del panel abierto si cambia el layout (ej. rotación de pantalla)
    window.addEventListener('resize', () => {
      accItems.forEach(item => {
        if (item.classList.contains('open')) {
          item.querySelector('.acc-panel').style.maxHeight = item.querySelector('.acc-panel').scrollHeight + 'px';
        }
      });
    });

    // Pills del índice: abren el programa correspondiente y hacen scroll hasta él
    progIndexEl.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById(a.dataset.target);
        if (!target) return;
        const item = accItems.find(it => it.id === a.dataset.target);
        if (item && !item.classList.contains('open')) {
          accItems.forEach(other => { if (other !== item) setOpen(other, false); });
          setOpen(item, true);
        }
        setTimeout(() => target.scrollIntoView({behavior:'smooth', block:'start'}), 60);
      });
    });

    // Abre el programa indicado por el hash de la URL. Si no hay hash,
    // todos quedan cerrados por defecto (el usuario abre el que quiera).
    if (accItems.length && location.hash) {
      const initialId = document.getElementById(location.hash.slice(1)) ? location.hash.slice(1) : null;
      const initialItem = initialId ? accItems.find(it => it.id === initialId) : null;
      if (initialItem) {
        setOpen(initialItem, true);
        setTimeout(() => initialItem.scrollIntoView({behavior:'smooth', block:'start'}), 100);
      }
    }

    accItems.forEach(el => io.observe(el));
  }

  // ===== Tarjetas de Programas en la portada: al tocar cualquier parte de
  // la tarjeta (excepto el botón "Conocer el programa") se abre el modal
  // con el resumen del programa. El botón "Conocer el programa" no se toca:
  // sigue siendo un enlace normal a programas.html#id =====
  document.querySelectorAll('.prog-card[data-programa]').forEach(card => {
    const abrirProgramaModal = () => {
      let datos = null;
      try { datos = JSON.parse(card.dataset.programa); } catch (e) { datos = null; }
      if (datos && typeof window.openP503ProgramaModal === 'function') {
        window.openP503ProgramaModal(datos);
      }
    };
    card.addEventListener('click', (e) => {
      if (e.target.closest('.prog-link')) return;
      abrirProgramaModal();
    });
    card.addEventListener('keydown', (e) => {
      if (e.target.closest('.prog-link')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrirProgramaModal();
      }
    });
  });

  // ===== Historias del Paraíso: abre el modal reutilizable al hacer clic en
  // la tarjeta o en el botón "Conocer su historia" (en la portada y en
  // historias.html). Los datos de cada historia ya vienen listos en el
  // atributo data-historia de la tarjeta (ver js/content-loader.js) =====
  document.querySelectorAll('.caso-card[data-historia]').forEach(card => {
    const abrir = () => {
      let historia = null;
      try { historia = JSON.parse(card.dataset.historia); } catch (e) { historia = null; }
      if (historia && typeof window.openP503HistoriaModal === 'function') {
        window.openP503HistoriaModal(historia);
      }
    };
    card.addEventListener('click', abrir);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrir();
      }
    });
  });


  // Si se llega desde un enlace como historias.html#milagro-en-la-carretera,
  // abre directamente esa historia una vez que las tarjetas ya existen.
  if (!window.p503StoryHashOpened && window.location.hash) {
    const slug = decodeURIComponent(window.location.hash.slice(1));
    const targetStory = document.querySelector('.caso-card[data-historia-slug="' + slug + '"]');
    if (targetStory) {
      window.p503StoryHashOpened = true;
      window.setTimeout(() => targetStory.click(), 120);
    }
  }

  // ===== Programa Contigo: abre el modal reutilizable al hacer clic en
  // cualquier parte del banner (o al presionar el botón que hay dentro).
  // Los datos ya vienen listos en el atributo data-contigo del banner (ver
  // js/content-loader.js) =====
  const contigoBanner = document.getElementById('contigoBanner');
  if (contigoBanner) {
    const abrirContigo = () => {
      let contigo = null;
      try { contigo = JSON.parse(contigoBanner.dataset.contigo); } catch (e) { contigo = null; }
      if (contigo && typeof window.openP503ContigoModal === 'function') {
        window.openP503ContigoModal(contigo);
      }
    };
    contigoBanner.addEventListener('click', (e) => {
      // El botón "Ver más sobre el programa" es ahora un enlace directo a
      // la página de Contigo: si el clic vino de él, dejamos que navegue
      // con normalidad y no abrimos el modal.
      if (e.target.closest('.contigo-btn')) return;
      abrirContigo();
    });
    contigoBanner.addEventListener('keydown', (e) => {
      if (e.target.closest('.contigo-btn')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrirContigo();
      }
    });
  }

  // ===== Enlace "Contigo" del menú (encabezado y menú móvil): abre el
  // mismo modal informativo del programa, usando el contenido ya cargado
  // desde content/contigo.js. No navega a ninguna sección ni página. =====
  const navContigoLinks = document.querySelectorAll('.nav-contigo-link');
  if (navContigoLinks.length) {
    navContigoLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const content = window.PARAISO503_CONTENT && window.PARAISO503_CONTENT.contigo;
        const modalData = content && content.modal;
        if (modalData && typeof window.openP503ContigoModal === 'function') {
          window.openP503ContigoModal(modalData);
        }
      });
    });
  }

  // ===== Carrusel "Urgencias de este mes": deslizar entre tarjetas con las
  // flechas, los puntos o arrastrando/deslizando con el dedo o el mouse.
  // Funciona igual sin importar cuántas tarjetas estén activas — con una
  // sola tarjeta simplemente oculta flechas y puntos (ver clase "single"
  // en css/style.css). Agregar o activar una tarjeta nueva en
  // content/configuracion.js no requiere tocar este bloque. =====
  const urgenciaCarousel = document.getElementById('urgenciaCarousel');
  const urgenciaTrack = document.getElementById('urgenciaTrack');
  if (urgenciaCarousel && urgenciaTrack) {
    const slides = Array.from(urgenciaTrack.children);
    const prevBtn = document.getElementById('urgenciaPrev');
    const nextBtn = document.getElementById('urgenciaNext');
    const dotsWrap = document.getElementById('urgenciaDots');
    let index = 0;

    if (slides.length <= 1) {
      urgenciaCarousel.classList.add('single');
    } else {
      if (dotsWrap) {
        dotsWrap.innerHTML = slides.map((_, i) =>
          '<button type="button" aria-label="Ir a la tarjeta ' + (i + 1) + '"></button>'
        ).join('');
      }

      const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

      function goTo(i) {
        index = (i + slides.length) % slides.length;
        urgenciaTrack.style.transform = 'translateX(-' + (index * 100) + '%)';
        dots.forEach((d, di) => d.classList.toggle('active', di === index));
      }

      if (prevBtn) prevBtn.addEventListener('click', () => { goTo(index - 1); restartAuto(); });
      if (nextBtn) nextBtn.addEventListener('click', () => { goTo(index + 1); restartAuto(); });
      dots.forEach((d, di) => d.addEventListener('click', () => { goTo(di); restartAuto(); }));

      // Rotación automática: suficientemente lenta para leer y se pausa al
      // interactuar. Se desactiva si el usuario prefiere movimiento reducido.
      let autoTimer = null;
      let resumeTimer = null;
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      function stopAuto() {
        if (autoTimer) { window.clearInterval(autoTimer); autoTimer = null; }
      }
      function startAuto() {
        if (reduceMotion || document.hidden || slides.length <= 1 || autoTimer) return;
        autoTimer = window.setInterval(() => goTo(index + 1), 8000);
      }
      function scheduleAutoResume() {
        stopAuto();
        if (resumeTimer) window.clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(startAuto, 12000);
      }
      function restartAuto() { scheduleAutoResume(); }
      urgenciaCarousel.addEventListener('mouseenter', stopAuto);
      urgenciaCarousel.addEventListener('mouseleave', startAuto);
      urgenciaCarousel.addEventListener('focusin', stopAuto);
      urgenciaCarousel.addEventListener('focusout', scheduleAutoResume);
      urgenciaCarousel.addEventListener('pointerdown', stopAuto);
      document.addEventListener('p503:carrusel-modal-open', stopAuto);
      document.addEventListener('p503:carrusel-modal-close', scheduleAutoResume);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAuto();
        else scheduleAutoResume();
      });

      // Deslizar con el dedo (touch) o arrastrando con el mouse.
      let dragging = false;
      let startX = 0;
      let deltaX = 0;

      urgenciaTrack.addEventListener('pointerdown', (e) => {
        dragging = true;
        startX = e.clientX;
        deltaX = 0;
        urgenciaTrack.style.transition = 'none';
      });
      urgenciaTrack.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        deltaX = e.clientX - startX;
        const pct = (deltaX / urgenciaTrack.clientWidth) * 100;
        urgenciaTrack.style.transform = 'translateX(calc(-' + (index * 100) + '% + ' + deltaX + 'px))';
      });
      const endDrag = () => {
        if (!dragging) return;
        dragging = false;
        urgenciaTrack.style.transition = '';
        const threshold = urgenciaTrack.clientWidth * 0.18;
        if (deltaX < -threshold) goTo(index + 1);
        else if (deltaX > threshold) goTo(index - 1);
        else goTo(index);
        scheduleAutoResume();
      };
      urgenciaTrack.addEventListener('pointerup', endDrag);
      urgenciaTrack.addEventListener('pointerleave', endDrag);
      urgenciaTrack.addEventListener('pointercancel', endDrag);

      goTo(0);
      startAuto();
    }
  }

  // ===== Tarjetas del carrusel de urgencia (ej. "Rescate reciente"): el
  // botón de cada una trae su contenido de modal ya listo en JSON en el
  // atributo data-carrusel-modal (ver js/content-loader.js) =====
  document.querySelectorAll('[data-carrusel-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      let data = null;
      try { data = JSON.parse(btn.dataset.carruselModal); } catch (e) { data = null; }
      if (data && typeof window.openP503CarruselModal === 'function') {
        window.openP503CarruselModal(data);
      }
    });
  });
}

// content-loader.js llama a initSiteInteractions() después de insertar el
// contenido dinámico (esperando a que TODOS los JSON terminen de cargar,
// sin importar cuánto tarde la conexión). Si por alguna razón
// content-loader.js no está incluido en la página, activamos igual el
// comportamiento al cargar el DOM para que el menú y demás sigan
// funcionando (aunque sin contenido dinámico).
//
// Importante: ya NO usamos un temporizador fijo como respaldo. Antes, un
// setTimeout de 2.5s ejecutaba initSiteInteractions() si content-loader.js
// tardaba más que eso en responder (típico en conexiones móviles lentas),
// dejando el acordeón de programas.html vacío porque las tarjetas todavía
// no existían en el DOM en ese momento. Ahora content-loader.js avisa de
// forma síncrona (window.__p503ContentLoaderPresent) que se va a encargar
// de llamar a initSiteInteractions() él mismo, así que el respaldo solo
// se activa cuando ese aviso nunca llegó, es decir, cuando content-loader.js
// realmente no está presente en la página.
if (typeof window !== 'undefined') {
  window.initSiteInteractions = initSiteInteractions;

  const runFallbackIfNeeded = () => {
    if (!window.__p503InteractionsRan && !window.__p503ContentLoaderPresent) {
      initSiteInteractions();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFallbackIfNeeded);
  } else {
    runFallbackIfNeeded();
  }

  const _origInit = initSiteInteractions;
  initSiteInteractions = function () {
    if (window.__p503InteractionsRan) return; // evita doble inicialización
    window.__p503InteractionsRan = true;
    _origInit();
  };
  window.initSiteInteractions = initSiteInteractions;
}


document.addEventListener('DOMContentLoaded', () => {

  // Evita que el botón flotante de WhatsApp tape los enlaces legales del footer.
  const siteFooter = document.querySelector('footer');
  if (siteFooter && 'IntersectionObserver' in window) {
    const footerObserver = new IntersectionObserver((entries) => {
      document.body.classList.toggle('footer-visible', entries[0].isIntersecting);
    }, { threshold: 0.08 });
    footerObserver.observe(siteFooter);
  }

});


// ===== Historia destacada de bienvenida =====
(function () {
  const STORY_KEY = 'p503-welcome-rescate-los-chorros-v1';
  function initWelcomeStory() {
    const modal = document.getElementById('p503WelcomeStory');
    if (!modal || sessionStorage.getItem(STORY_KEY) === 'seen') return;

    let lockedScrollY = 0;
    const open = () => {
      lockedScrollY = window.scrollY;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('p503-welcome-lock');
      document.body.classList.add('p503-welcome-lock');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${lockedScrollY}px`;
      document.body.style.width = '100%';
    };
    const close = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('p503-welcome-lock');
      document.body.classList.remove('p503-welcome-lock');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, lockedScrollY);
      sessionStorage.setItem(STORY_KEY, 'seen');
    };

    modal.querySelectorAll('[data-welcome-close]').forEach(el => el.addEventListener('click', close));
    const action = modal.querySelector('.p503-welcome-action');
    if (action) action.addEventListener('click', () => {
      sessionStorage.setItem(STORY_KEY, 'seen');
      document.documentElement.classList.remove('p503-welcome-lock');
      document.body.classList.remove('p503-welcome-lock');
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
    window.setTimeout(open, 450);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initWelcomeStory);
  else initWelcomeStory();
})();
