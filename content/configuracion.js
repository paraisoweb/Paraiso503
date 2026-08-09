/* =============================================================================
   CONTENIDO: CONFIGURACIÓN — Paraíso 503
   =============================================================================
   Este archivo controla los datos de contacto, redes sociales, formas de
   donar y el bloque de "necesidad urgente del mes".

   >>> PARA EDITAR EL CONTENIDO, CAMBIA SOLO LOS VALORES DE ABAJO. <<<
   No toques la primera línea (la que dice "window.PARAISO503_CONTENT...")
   ni la línea final con el punto y coma "};" — son las que permiten que el
   sitio lea este archivo tanto si se abre con doble clic (file://) como si
   se sirve desde un servidor web (GitHub Pages, etc.).

   Guarda el archivo y recarga la página: el sitio se actualiza solo, sin
   tocar el HTML.
   ============================================================================= */
window.PARAISO503_CONTENT = window.PARAISO503_CONTENT || {};
window.PARAISO503_CONTENT.configuracion = {
  "_ayuda": "Este archivo controla los datos de contacto, redes sociales, formas de donar y el bloque de 'necesidad urgente del mes'. Edita los valores y guarda: el sitio se actualiza solo, sin tocar el HTML.",
  "contacto": {
    "whatsappPrincipal": "50377476318",
    "whatsappAdopciones": "50374055877",
    "correo": "paraiso.prj@gmail.com",
    "ubicacion": "La Libertad, El Salvador"
  },
  "_ayuda_redesSociales": "Para agregar/quitar una red social, agrega/quita un objeto de este arreglo. 'icono' es la clase de Font Awesome (https://fontawesome.com/icons).",
  "redesSociales": [
    {
      "nombre": "WhatsApp",
      "icono": "fa-brands fa-whatsapp",
      "color": "#25D366",
      "url": "https://wa.me/50377476318",
      "dato": "7747-6318"
    },
    {
      "nombre": "Facebook",
      "icono": "fa-brands fa-facebook-f",
      "color": "#1877F2",
      "url": "https://www.facebook.com/share/1DLVnJV9aw/",
      "dato": "@paraiso.503"
    },
    {
      "nombre": "TikTok",
      "icono": "fa-brands fa-tiktok",
      "color": "#111111",
      "url": "https://www.tiktok.com/@paraiso.503?_r=1&_t=ZS-98MelIoNwgP",
      "dato": "@paraiso.503"
    },
    {
      "nombre": "YouTube",
      "icono": "fa-brands fa-youtube",
      "color": "#FF0000",
      "url": "https://youtube.com/@paraiso503sv?si=a-SLSISN2jKq_B2I",
      "dato": "@paraiso503sv"
    },
    {
      "nombre": "Correo",
      "icono": "fa-solid fa-envelope",
      "color": "#4285F4",
      "url": "mailto:paraiso.prj@gmail.com",
      "dato": "paraiso.prj@gmail.com"
    }
  ],
  "_ayuda_donacion": "Cada arreglo (local, internacional, persona) es una pestaña de la sección 'Formas de donar'. 'numero' es opcional: si existe, la tarjeta muestra un botón para copiarlo. 'titular' es opcional: si existe, la tarjeta muestra un botón para copiar ese nombre (ej. el titular de una cuenta bancaria). 'url' es opcional: si existe, la tarjeta completa se convierte en un enlace que abre esa dirección (ej. PayPal) y no se deben combinar 'numero'/'titular' con 'url'. 'logo' permite mostrar el archivo de marca y 'marca' aplica ajustes visuales específicos del logo.",
  "donacion": {
    "local": [
      {
        "nombre": "Banco BAC",
        "icono": "fa-solid fa-building-columns",
        "logo": "img/payment/bac.svg",
        "marca": "bac",
        "descripcion": "Cuenta de ahorro",
        "titular": "Eder Martins",
        "numero": "114944333"
      },
      {
        "nombre": "Chivo Wallet",
        "icono": "fa-solid fa-mobile-screen",
        "logo": "img/payment/chivo.png",
        "marca": "chivo",
        "descripcion": "Ingresa este número en la app",
        "numero": "7171-4259"
      },
      {
        "nombre": "Nequi",
        "icono": "fa-solid fa-mobile-screen",
        "logo": "img/payment/nequi-app.png",
        "marca": "nequi",
        "descripcion": "Ingresa este número en la app",
        "numero": "7171-4259"
      },
      {
        "nombre": "n1co",
        "icono": "fa-solid fa-mobile-screen",
        "logo": "img/payment/n1co.webp",
        "marca": "n1co",
        "descripcion": "Ingresa este número en la app",
        "numero": "7171-4259"
      },
      {
        "nombre": "PayPal",
        "icono": "fa-brands fa-paypal",
        "logo": "img/payment/paypal.png",
        "marca": "paypal",
        "descripcion": "Dona desde cualquier parte del mundo de forma segura.",
        "url": "https://www.paypal.me/paraisodelosanimales"
      }
    ],
    "internacional": [
      {
        "nombre": "PayPal",
        "icono": "fa-brands fa-paypal",
        "logo": "img/payment/paypal.png",
        "marca": "paypal",
        "descripcion": "Dona desde cualquier parte del mundo de forma segura.",
        "url": "https://www.paypal.me/paraisodelosanimales"
      },
      {
        "nombre": "Remesas — Ria / MoneyGram / Western Union",
        "icono": "fa-solid fa-globe",
        "descripcion": "Escríbenos por WhatsApp y te damos los datos para enviarla."
      }
    ],
    "persona": [
      {
        "nombre": "Visitas solidarias",
        "icono": "fa-solid fa-paw",
        "descripcion": "Visítanos, conoce a los perritos y comparte tu apoyo en persona — La Libertad, El Salvador."
      },
      {
        "nombre": "Donaciones físicas",
        "icono": "fa-solid fa-box",
        "descripcion": "Si no puedes trasladarte, escríbenos y coordinamos la recolección."
      }
    ]
  },
  "_ayuda_carruselUrgencia": "Estas son TODAS las tarjetas del carrusel de actualidad de la portada, incluida la primera ('Necesidades prioritarias'). El orden en que aparecen en el carrusel es exactamente el orden de este arreglo: para reordenar las tarjetas en el futuro, solo mueve sus bloques aquí arriba o abajo — no hace falta tocar el HTML ni el JavaScript. Cada tarjeta necesita 'activa': true para aparecer en el carrusel; mientras esté en false queda preparada pero oculta. Al final hay dos espacios de reserva para futuras noticias. Para publicar uno, rellena sus campos y cambia 'activa' a true; mientras siga en false no aparece en la web. Campos comunes a toda tarjeta: 'id', 'activa', 'etiqueta' (insignia pequeña arriba), 'titulo', 'descripcion' (texto breve). La tarjeta 'necesidades-prioritarias' es especial: lleva 'tipo': 'necesidadUrgente' y en vez de foto/botón-modal usa 'necesidades' (lista de líneas, cada una puede empezar con un emoji), 'montoRecaudado' y 'meta' (números; déjalos en null mientras no se sepa el dato del mes y la barra mostrará '$___ recaudados de $___' automáticamente) y 'textoBoton' (el botón lleva siempre a la sección #donar). Las demás tarjetas (tipo normal, sin 'tipo') usan 'foto' (ruta de imagen, opcional), 'textoBoton' y 'modal' (lo que se muestra al presionar el botón: 'titulo', 'texto' y 'foto' opcional).",
  "carruselUrgencia": [
    {
      "id": "necesidades-prioritarias",
      "activa": true,
      "tipo": "necesidadUrgente",
      "etiqueta": "⚡ Urgencias de este mes",
      "titulo": "Necesidades prioritarias",
      "descripcion": "Este mes estamos cubriendo gastos esenciales para que nuestros animalitos sigan recibiendo atención. Tu apoyo nos ayuda a mantenerlos seguros y continuar con sus tratamientos.",
      "necesidades": [
        "🏠 Pago del alquiler de Paraíso.",
        "💧 Pago de agua y energía eléctrica.",
        "💉 Quimioterapias para 4 perritos.",
        "🩺 Exámenes, cirugía y hospitalización de Toto."
      ],
      "montoRecaudado": null,
      "meta": null,
      "textoBoton": "Apoyar esta causa"
    },
    {
      "id": "rescate-reciente",
      "activa": true,
      "etiqueta": "🐾 Rescate reciente",
      "titulo": "Un rescate reciente",
      "descripcion": "Un rescate que cambió doce vidas. Once cachorritos y su mamá ahora están seguros mientras esperan una segunda oportunidad.",
      "foto": "img/rescate/rescate1.webp",
      "textoBoton": "Conocer la historia",
      "modal": {
        "titulo": "Un rescate reciente",
        "texto": "Hace unos días conocimos la historia de un señor que, con muy pocos recursos, ha dedicado parte de su vida a cuidar y proteger perros que fueron abandonados. Actualmente vive junto a ellos a un costado de la carretera de Los Chorros, un lugar que no le pertenece y del que pronto deberá retirarse debido a las obras que se realizan en la zona.\n\nEntre todos los perritos había once cachorritos y su mamá, expuestos diariamente al intenso tráfico de una de las carreteras más transitadas del país. Cada día que pasaba aumentaba el riesgo de que alguno de ellos sufriera un accidente.\n\nDespués de conversar con él y conocer de cerca su situación, decidimos recibir a los once cachorritos y a su mamá en Paraíso 503 para brindarles un lugar seguro, alimentación, atención veterinaria y todos los cuidados que necesitan mientras crecen sanos y se preparan para encontrar una familia responsable.\n\nEste rescate es solo el primer paso. Nuestro deseo también es seguir apoyando al señor y a los demás perritos que continúan bajo su cuidado, impulsando jornadas de esterilización y buscando alternativas que les permitan tener una vida más segura y digna.\n\nCada nuevo rescate representa una gran alegría, pero también un compromiso. Alimentar, desparasitar, vacunar y brindar atención médica a doce nuevos integrantes requiere un esfuerzo constante y el apoyo de muchas personas que creen en esta misión.\n\nGracias a cada persona que nos acompaña, comparte nuestro trabajo, adopta, dona o simplemente cree en esta causa. Su apoyo hace posible que Paraíso 503 continúe cambiando historias como esta y ofreciendo una segunda oportunidad a quienes más lo necesitan.\n\nHoy estos once cachorritos y su mamá están a salvo. Mañana esperamos verlos crecer sanos y encontrar el hogar lleno de amor que siempre merecieron.",
        "foto": [
          "img/rescate/rescate1.webp",
          "img/rescate/rescate2.webp",
         ]
      }
    },
    {
      "id": "motos-ruta",
      "activa": true,
      "etiqueta": "🏍️ Ruta de Alimentación",
      "titulo": "Nuestra ruta necesita volver a moverse",
      "descripcion": "Una de nuestras motos está fuera de servicio y la otra necesita reparación. Ambas son fundamentales para llevar alimento a los animalitos que nos esperan cada día.",
      "foto": "",
      "textoBoton": "Ayúdanos a volver a la ruta",
      "modal": {
        "titulo": "Necesitamos poner la ruta en movimiento",
        "texto": "Una de nuestras motos está detenida por problemas mecánicos y otra necesita reparación. Una de estas reparaciones ronda los $250.\n\nSi tienes un taller, eres mecánico o puedes apoyarnos con la reparación, escríbenos. También puedes ayudarnos aportando con una parte del costo.\n\nCada apoyo nos ayuda a mantener la Ruta de Alimentación en movimiento y seguir llegando a los animalitos que nos esperan.",
        "foto": ""
      }
    },
    {
      "id": "ruta-flor-amarilla",
      "activa": true,
      "etiqueta": "🐾 Ruta de Alimentación",
      "titulo": "Cada día llegamos a Flor Amarilla",
      "descripcion": "Desde hace más de tres años recorremos Flor Amarilla, Ciudad Arce, llevando alimento diariamente a más de 100 animalitos que nos esperan en la comunidad.",
      "foto": "",
      "textoBoton": "Conocer nuestra ruta",
      "mapaUrl": "https://maps.app.goo.gl/1PxXQWoGAzwKPxmk6",
      "mapaEmbed": "https://www.google.com/maps?q=Cant%C3%B3n+Flor+Amarilla%2C+Flor+Amarilla%2C+Ciudad+Arce%2C+El+Salvador&output=embed",
      "modal": {
        "titulo": "Más de tres años alimentando en Flor Amarilla",
        "texto": "Nuestra Ruta de Alimentación llega diariamente a Flor Amarilla, Ciudad Arce. Allí alimentamos a más de 100 animalitos que nos esperan cada día.\n\nDesde hace más de tres años mantenemos este recorrido de forma constante, llevando alimento y acompañamiento a los animales de la comunidad.\n\nUbicación: https://maps.app.goo.gl/1PxXQWoGAzwKPxmk6",
        "foto": ""
      }
    },
    {
      "id": "alimentacion-hogar-paraiso",
      "activa": true,
      "etiqueta": "🍲 Hogar Paraíso",
      "titulo": "Así preparamos su comida cada día",
      "descripcion": "Más de 50 animalitos reciben sus porciones de concentrado acompañadas de macarrones o arroz y un paté preparado con ingredientes frescos, sin condimentos.",
      "foto": "",
      "textoBoton": "Conocer cómo los alimentamos",
      "modal": {
        "titulo": "La comida de nuestros animalitos",
        "texto": "En Hogar Paraíso preparamos cada día la comida de más de 50 animalitos. Sus porciones incluyen concentrado, macarrones o arroz y un paté que preparamos con hígado o pata de pollo, acompañado de verduras como papa y zanahoria.\n\nTodo se prepara sin condimentos y se sirve en los horarios de alimentación de nuestros animalitos.",
        "foto": ""
      }
    },
    {
      "id": "actualidad-reserva-1",
      "activa": false,
      "etiqueta": "",
      "titulo": "",
      "descripcion": "",
      "foto": "",
      "textoBoton": "",
      "modal": { "titulo": "", "texto": "", "foto": "" }
    },
    {
      "id": "actualidad-reserva-2",
      "activa": false,
      "etiqueta": "",
      "titulo": "",
      "descripcion": "",
      "foto": "",
      "textoBoton": "",
      "modal": { "titulo": "", "texto": "", "foto": "" }
    }
  ]
};
