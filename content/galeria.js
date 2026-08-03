/* =============================================================================
   CONTENIDO: GALERÍA — Paraíso 503
   =============================================================================
   Todo el contenido de "galeria.html" (fotos, video destacado, videos
   recientes y playlists) se genera automáticamente a partir de este archivo.
   NUNCA necesitas tocar galeria.html, css/style.css ni los archivos de /js
   para agregar contenido nuevo.

   >>> PARA EDITAR EL CONTENIDO, CAMBIA SOLO LOS VALORES DE ABAJO. <<<
   No toques la primera línea ni la línea final "};".

   -----------------------------------------------------------------------
   1) CATEGORÍAS — controlan los botones de filtro (Fotos y Videos comparten
      el mismo filtro) y generan automáticamente la sección "Playlists"
      (una tarjeta de playlist por cada categoría, siempre).
   -----------------------------------------------------------------------
     id           identificador único, sin espacios ni tildes (ej. "hogar").
                  Se usa en el campo "categoria" de cada foto/video de abajo
                  para asociarlos a esta categoría.
     nombre       nombre visible del filtro y de la playlist.
     icono        clase de icono Font Awesome, ej. "fa-bone".
     color        color del icono en formato hexadecimal.
     playlistUrl  enlace de tu playlist de YouTube para esta categoría.
                  "" (vacío) = la tarjeta se muestra igual, como ejemplo, pero
                  sin poder hacer clic todavía y con la etiqueta "Próximamente".
                  En cuanto pegues aquí un enlace real, la tarjeta se activa
                  sola. La cantidad de videos que muestra la tarjeta se
                  calcula sola contando los videos de "videos" (abajo) que
                  tengan esta misma categoría — no hace falta escribirla.

   -----------------------------------------------------------------------
   2) FOTOS — cada objeto es una fotografía de la cuadrícula.
   -----------------------------------------------------------------------
     categoria    debe coincidir con un "id" de la lista de categorías.
     titulo       texto corto que aparece sobre la foto (opcional, "" = se
                  usa solo el nombre de la categoría).
     imagen       ruta a la foto (ej. "img/galeria/foto1.webp").
     fecha        texto libre para mostrar debajo del título (opcional).

   Se muestran las primeras 10 fotos que coincidan con el filtro activo; el
   botón "Cargar más fotografías" va revelando el resto de 10 en 10. Al
   hacer clic en cualquier foto se abre ampliada en el visor y se puede
   recorrer el resto de fotos filtradas con las flechas, el teclado o
   deslizando el dedo en el celular.

   -----------------------------------------------------------------------
   3) VIDEO DESTACADO — un solo video que aparece siempre arriba de
      "Videos recientes", pensado para el caso más urgente del momento.
   -----------------------------------------------------------------------
     categoria, titulo, descripcion, youtubeUrl, duracion, fecha
     Deja "videoDestacado" en null para ocultar esta sección por completo.
     NOTA: ya no hace falta un campo "miniatura" — la miniatura se obtiene
     sola a partir del enlace de YouTube. Si "youtubeUrl" está vacío ("")
     se muestra igual como ejemplo (con la etiqueta "Próximamente" en vez
     del botón "Ver en YouTube"), pero no es clickeable todavía.

   -----------------------------------------------------------------------
   4) VIDEOS — cada objeto es un video de "Videos recientes".
   -----------------------------------------------------------------------
     categoria    debe coincidir con un "id" de la lista de categorías.
     titulo       título del video.
     youtubeUrl   enlace del video en YouTube (ej. "https://youtu.be/XXXXXXXXXXX"
                  o "https://www.youtube.com/watch?v=XXXXXXXXXXX"). Al hacer
                  clic en la tarjeta se abre este enlace en una pestaña nueva,
                  y la miniatura se obtiene sola desde YouTube — no hay que
                  guardar ninguna imagen a mano.
     duracion     texto corto, ej. "1:32" (opcional).
     fecha        texto libre, ej. "hace 2 días" (opcional).

     Mientras "youtubeUrl" esté vacío (""), el video se muestra como
     "ejemplo": se ve la tarjeta con su lugar reservado en la cuadrícula,
     pero sin miniatura real ni clic. En cuanto reemplaces "" por un enlace
     de YouTube válido, el video se activa solo (miniatura, duración y clic
     funcionando) — no hay que tocar nada más.
   ============================================================================= */
window.PARAISO503_CONTENT = window.PARAISO503_CONTENT || {};
window.PARAISO503_CONTENT.galeria = {
  "_ayuda": "Para agregar una foto nueva, copia uno de los objetos de 'fotos' y complétalo. Para activar un video de ejemplo, solo pega tu enlace de YouTube en su 'youtubeUrl'. No hace falta tocar galeria.html, css/style.css ni ningún archivo de /js.",

  "categorias": [
    { "id": "alimentacion", "nombre": "Ruta de Alimentación",     "icono": "fa-bone",       "color": "#3E7A4E", "playlistUrl": "" },
    { "id": "cancer",       "nombre": "Lucha contra el Cáncer",   "icono": "fa-ribbon",     "color": "#8B5FBF", "playlistUrl": "" },
    { "id": "adopciones",   "nombre": "Adopciones Responsables",  "icono": "fa-house",      "color": "#E08B7D", "playlistUrl": "" },
    { "id": "hogar",        "nombre": "Hogar Paraíso",            "icono": "fa-door-open",  "color": "#3E7FBF", "playlistUrl": "" },
    { "id": "historias",    "nombre": "Historias del Paraíso",    "icono": "fa-heart",      "color": "#C9683D", "playlistUrl": "" }
  ],

  "fotos": [
    { "categoria": "alimentacion", "titulo": "Ruta de Alimentación", "imagen": "img/galeria/ruta1.webp", "fecha": "25 de junio, 2025" },
    { "categoria": "alimentacion", "titulo": "Ruta de Alimentación", "imagen": "img/galeria/ruta2.webp", "fecha": "22 de junio, 2025" },
    { "categoria": "alimentacion", "titulo": "Ruta de Alimentación", "imagen": "img/galeria/ruta3.webp", "fecha": "18 de junio, 2025" },
    { "categoria": "alimentacion", "titulo": "Entrega de alimento",  "imagen": "img/program/rutas.webp", "fecha": "12 de junio, 2025" },
    { "categoria": "alimentacion", "titulo": "Atención en la ruta",  "imagen": "img/program/atencion.webp", "fecha": "5 de junio, 2025" },
    { "categoria": "alimentacion", "titulo": "Voluntarios en ruta",  "imagen": "img/program/voluntario.webp", "fecha": "30 de mayo, 2025" },

    { "categoria": "cancer", "titulo": "Lucha contra el Cáncer",   "imagen": "img/program/cancer.webp", "fecha": "20 de junio, 2025" },
    { "categoria": "cancer", "titulo": "Rehabilitación",           "imagen": "img/program/rehabilitacion.webp", "fecha": "14 de junio, 2025" },
    { "categoria": "cancer", "titulo": "Jornada de esterilización", "imagen": "img/program/esterilizacion.webp", "fecha": "8 de junio, 2025" },
    { "categoria": "cancer", "titulo": "Transparencia en tratamientos", "imagen": "img/program/transparencia.webp", "fecha": "1 de junio, 2025" },

    { "categoria": "adopciones", "titulo": "Adopciones Responsables", "imagen": "img/program/adopta.webp", "fecha": "18 de junio, 2025" },
    { "categoria": "adopciones", "titulo": "Nuevo hogar",             "imagen": "img/adopta/perro1.webp", "fecha": "15 de junio, 2025" },
    { "categoria": "adopciones", "titulo": "Nuevo hogar",             "imagen": "img/adopta/perro2.webp", "fecha": "10 de junio, 2025" },
    { "categoria": "adopciones", "titulo": "Nuevo hogar",             "imagen": "img/adopta/gato1.webp", "fecha": "3 de junio, 2025" },
    { "categoria": "adopciones", "titulo": "Visita de seguimiento",   "imagen": "img/program/visita.webp", "fecha": "28 de mayo, 2025" },

    { "categoria": "hogar", "titulo": "Hogar Paraíso", "imagen": "img/program/paraiso.png", "fecha": "15 de junio, 2025" },
    { "categoria": "hogar", "titulo": "Un día en el refugio", "imagen": "img/program/familia.webp", "fecha": "9 de junio, 2025" },
    { "categoria": "hogar", "titulo": "Rincón de descanso", "imagen": "img/adopta/perro3.webp", "fecha": "2 de junio, 2025" },
    { "categoria": "hogar", "titulo": "Nuestro equipo", "imagen": "img/nosotros/nosotros.webp", "fecha": "27 de mayo, 2025" },

    { "categoria": "historias", "titulo": "Antes del rescate", "imagen": "img/historias/sol1.webp", "fecha": "10 de junio, 2025" },
    { "categoria": "historias", "titulo": "Después del tratamiento", "imagen": "img/historias/sol2.webp", "fecha": "10 de junio, 2025" },
    { "categoria": "historias", "titulo": "Segunda oportunidad", "imagen": "img/heroes/hero.webp", "fecha": "4 de junio, 2025" },
    { "categoria": "historias", "titulo": "Programa Contigo", "imagen": "img/Contigo/contigo.webp", "fecha": "29 de mayo, 2025" }
  ],

  "videoDestacado": {
    "categoria": "historias",
    "titulo": "Video de ejemplo — reemplaza este espacio con tu caso más urgente",
    "descripcion": "Este es un espacio de ejemplo. Cuando tengas un caso urgente que compartir, escribe aquí su historia y pega el enlace de YouTube en 'youtubeUrl' para activar esta tarjeta.",
    "youtubeUrl": "",
    "duracion": "",
    "fecha": ""
  },

  "videos": [
    { "categoria": "alimentacion", "titulo": "Video de ejemplo — Ruta de Alimentación",      "youtubeUrl": "", "duracion": "", "fecha": "" },
    { "categoria": "cancer",       "titulo": "Video de ejemplo — Lucha contra el Cáncer",    "youtubeUrl": "", "duracion": "", "fecha": "" },
    { "categoria": "adopciones",   "titulo": "Video de ejemplo — Adopciones Responsables",   "youtubeUrl": "", "duracion": "", "fecha": "" },
    { "categoria": "hogar",        "titulo": "Video de ejemplo — Hogar Paraíso",             "youtubeUrl": "", "duracion": "", "fecha": "" },
    { "categoria": "historias",    "titulo": "Video de ejemplo — Historias del Paraíso",     "youtubeUrl": "", "duracion": "", "fecha": "" }
  ]
};
