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
    "ubicacion": "Ateos, La Libertad, El Salvador"
  },
  "_ayuda_redesSociales": "Para agregar/quitar una red social, agrega/quita un objeto de este arreglo. 'icono' es la clase de Font Awesome (https://fontawesome.com/icons).",
  "redesSociales": [
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
    }
  ],
  "_ayuda_donacion": "Cada arreglo (local, internacional, persona) es una pestaña de la sección 'Formas de donar'. 'numero' es opcional: si existe, la tarjeta muestra un botón para copiarlo. 'titular' es opcional: si existe, la tarjeta muestra un botón para copiar ese nombre (ej. el titular de una cuenta bancaria). 'url' es opcional: si existe, la tarjeta completa se convierte en un enlace que abre esa dirección (ej. PayPal) y no se deben combinar 'numero'/'titular' con 'url'. 'logo' permite mostrar el archivo de marca y 'marca' aplica ajustes visuales específicos del logo.",
  "donacion": {
    "local": [
      {
        "nombre": "Banco BAC",
        "icono": "fa-solid fa-building-columns",
        "logo": "/img/payment/bac.svg",
        "marca": "bac",
        "descripcion": "Cuenta de ahorro",
        "titular": "Eder Martins",
        "numero": "114944333"
      },
      {
        "nombre": "Chivo Wallet",
        "icono": "fa-solid fa-mobile-screen",
        "logo": "/img/payment/chivo.png",
        "marca": "chivo",
        "descripcion": "Ingresa este número en la app",
        "numero": "7171-4259"
      },
      {
        "nombre": "Nequi",
        "icono": "fa-solid fa-mobile-screen",
        "logo": "/img/payment/nequi-app.png",
        "marca": "nequi",
        "descripcion": "Ingresa este número en la app",
        "numero": "7171-4259"
      },
      {
        "nombre": "n1co",
        "icono": "fa-solid fa-mobile-screen",
        "logo": "/img/payment/n1co.webp",
        "marca": "n1co",
        "descripcion": "Ingresa este número en la app",
        "numero": "7171-4259"
      },
      {
        "nombre": "PayPal",
        "icono": "fa-brands fa-paypal",
        "logo": "/img/payment/paypal.png",
        "marca": "paypal",
        "descripcion": "Dona desde cualquier parte del mundo de forma segura.",
        "url": "https://www.paypal.me/paraisodelosanimales"
      }
    ],
    "internacional": [
      {
        "nombre": "PayPal",
        "icono": "fa-brands fa-paypal",
        "logo": "/img/payment/paypal.png",
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
  "_ayuda_carruselUrgencia": "Actualidad de la portada. Solo aparecen las tarjetas con 'activa': true y respetan el orden de este arreglo. Para cambiar una fotografía, edita 'foto'; para usar dos imágenes dentro del modal, coloca ambas rutas en 'modal.foto'. Si todavía no hay imagen, deja 'foto' vacío: aparecerá un espacio preparado. 'tituloDestacado' colorea una frase breve del título. El modal admite introducción en 'texto', bloques en 'secciones', cierre y acciones opcionales. Las tarjetas antiguas permanecen abajo con 'activa': false para poder reutilizarlas.",
  "carruselUrgencia": [
    {
      "id": "rescate-los-chorros",
      "activa": true,
      "etiqueta": "🐾 Rescate",
      "titulo": "Milagro en la carretera",
      "subtitulo": "El rescate de los cachorros de Los Chorros",
      "descripcion": "Conocimos a un señor que cuida a más de 25 perritos junto a la carretera de Los Chorros. Ante el riesgo que enfrentan por las obras y el tránsito, nos acercamos para sumar esfuerzos y dar una nueva oportunidad a los más pequeños.",
      "foto": "/img/actualidad/rescate1.webp",
      "textoBoton": "Conoce su historia",
      "modal": {
        "titulo": "Milagro en la carretera",
        "texto": "Durante nuestro recorrido conocimos a un señor que ha dedicado parte de su vida a cuidar a más de 25 perritos. Hoy enfrenta una situación difícil: debido a las obras que se realizan en la carretera de Los Chorros, debe abandonar el lugar donde ha permanecido con ellos.\n\nPara una sola persona, cuidar tantos animalitos representa una enorme responsabilidad. Al conocer su situación, nos acercamos y decidimos sumar esfuerzos para ayudarlo y proteger especialmente a los cachorros más vulnerables.\n\nLlevarlos con nosotros significa alejarlos de los riesgos de crecer cerca de una carretera transitada. En Paraíso 503 recibirán alimentación adecuada, revisión veterinaria, vitaminas, los cuidados y medicamentos que necesiten, su esquema de vacunación y seguimiento durante su crecimiento.\n\nEl objetivo final es que, cuando estén preparados, puedan encontrar familias responsables y hogares permanentes.\n\nEste rescate no termina cuando llegan al refugio. Apenas comienza una nueva etapa para ellos.",
        "cierreTitulo": "Este rescate apenas comienza",
        "cierreTexto": "Recibir a estos cachorros significa asumir su alimentación, atención veterinaria, vacunas, medicamentos y cuidados hasta que estén preparados para encontrar un hogar responsable.\n\nParaíso 503 trabaja cada día con muchos animalitos que dependen de este proyecto. Tu apoyo es muy importante para que podamos dar continuidad a este rescate y seguir respondiendo cuando otro animal nos necesite.\n\nCada aporte, cada visita y cada persona que comparte nuestro trabajo nos ayuda a seguir adelante.",
        "foto": ["/img/actualidad/rescate1.webp","/img/actualidad/rescate2.webp","/img/actualidad/rescate3.webp","/img/actualidad/rescate4.webp"]
      }
    },
    {
      "id": "visita-solidaria",
      "activa": true,
      "etiqueta": "🤝 Visita solidaria",
      "acento": "naranja",
      "titulo": "Conoce el lugar donde",
      "tituloDestacado": "cada vida importa",
      "descripcion": "Visita el Hogar Paraíso, conoce las historias de nuestros animalitos y comparte con ellos mientras descubres el trabajo que realizamos cada día.",
      "foto": "/img/actualidad/visita1.webp",
      "textoBoton": "Conoce cómo visitarnos",
      "modal": {
        "titulo": "Una visita que también transforma vidas",
        "texto": "Las visitas solidarias permiten conocer de cerca el Hogar Paraíso, descubrir las historias de nuestros animalitos, saber cómo han evolucionado y compartir un momento con ellos.",
        "secciones": [
          {"titulo":"Puedes venir en familia","icono":"fa-solid fa-people-roof","texto":"Recibimos adultos, familias y niños. Queremos que cada visita sea una oportunidad para acercarse al proyecto y conocer el valor de cuidar y respetar a los animalitos."},
          {"titulo":"¿Qué puedes traer?","icono":"fa-solid fa-hand-holding-heart","texto":"Puedes apoyarnos con la donación que esté dentro de tus posibilidades.","items":["Alimento concentrado y otros ingredientes.","Productos de limpieza.","Vitaminas y otros artículos consultados previamente."]},
          {"titulo":"Coordinación por WhatsApp","icono":"fa-brands fa-whatsapp","texto":"Las visitas se realizan con cita previa. Por WhatsApp coordinamos el día y el horario, compartimos la ubicación y te orientamos para que puedas llegar sin dificultad."}
        ],
        "cierreTitulo": "¿Quieres visitarnos?",
        "cierreTexto": "Escríbenos para coordinar tu visita y consultar qué necesitamos actualmente. Tu compañía y tu apoyo también forman parte de esta historia.",
        "foto": "/img/actualidad/visita1.webp",
        "acciones": [
          {"texto":"Escríbenos por WhatsApp","href":"https://wa.me/50377476318?text=Hola%2C%20me%20gustar%C3%ADa%20coordinar%20una%20visita%20solidaria%20a%20Para%C3%ADso%20503.","tipo":"externo"}
        ]
      }
    },
    {
      "id": "vacunacion-anual",
      "activa": true,
      "acento": "dorado",
      "etiqueta": "🩺 Salud y prevención",
      "titulo": "Protección anual para",
      "tituloDestacado": "más de 60 animalitos",
      "descripcion": "Más de 60 animalitos dependen de Paraíso. Necesitamos apoyo para mantener al día su vacunación y protegerlos de enfermedades prevenibles.",
      "foto": "/img/actualidad/vacunacion1.webp",
      "icono": "fa-solid fa-shield-dog",
      "textoBoton": "Conoce esta necesidad",
      "modal": {
        "titulo": "Vacunación anual para más de 60 animalitos",
        "texto": "Más de 60 animalitos dependen de Paraíso para recibir alimentación, protección y seguimiento veterinario. Algunos permanecen en el Hogar Paraíso y otros reciben atención temporal en la veterinaria, según sus necesidades.",
        "secciones": [
          {"titulo":"¿Por qué es importante vacunarlos?","icono":"fa-solid fa-syringe","texto":"La vacunación ayuda a prevenir enfermedades que pueden afectar gravemente su salud, especialmente cuando conviven varios animalitos o llegan nuevos casos que también necesitan protección."},
          {"titulo":"Un compromiso que se renueva cada año","icono":"fa-solid fa-calendar-check","texto":"Cada animalito necesita valoración y un esquema indicado por la veterinaria. Mantener esta protección al día representa una necesidad constante para el proyecto."},
          {"titulo":"Necesitamos tu apoyo","icono":"fa-solid fa-heart","texto":"No fijamos una cantidad específica. Cada colaboración puede ayudarnos a continuar protegiendo su salud y brindarles el seguimiento responsable que necesitan."}
        ],
        "cierreTitulo": "Cada vacuna significa protección",
        "cierreTexto": "Prevenir también es cuidar. Tu apoyo nos permite continuar protegiendo a más de 60 vidas que dependen de Paraíso.",
        "foto": []
      }
    },
    {
      "id": "ruta-flor-amarilla",
      "sinImagen": true,
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
        "texto": "Nuestra Ruta de Alimentación llega diariamente a Flor Amarilla, Ciudad Arce. Allí alimentamos a más de 100 animalitos que nos esperan cada día.\n\nDesde hace más de tres años mantenemos este recorrido de forma constante, llevando alimento y acompañamiento a los animales de la comunidad.",
        "foto": "/img/program/rutas.webp"
      }
    },
    {
      "id": "alimentacion-hogar-paraiso",
      "activa": true,
      "acento": "verde",
      "etiqueta": "🍲 Hogar Paraíso",
      "titulo": "Alimentamos más de 60 vidas",
      "tituloDestacado": "cada día",
      "descripcion": "En el Hogar Paraíso compramos alimento concentrado y diariamente cocinamos una preparación complementaria para sostener su alimentación.",
      "foto": "/img/actualidad/alimentacion1.webp",
      "textoBoton": "Conocer cómo los alimentamos",
      "modal": {
        "titulo": "Alimentación preparada todos los días",
        "texto": "Alimentar a más de 60 animalitos requiere trabajo, organización y recursos cada día. En el Hogar Paraíso compramos alimento concentrado y también cocinamos una preparación complementaria.",
        "secciones": [
          {"titulo":"¿Qué preparamos?","icono":"fa-solid fa-kitchen-set","texto":"Diariamente cocinamos arroz blanco o macarrones y los acompañamos con patas de pollo o hígado. También incorporamos verduras como zanahoria y papa, según la preparación del día."},
          {"titulo":"Necesidades diferentes","icono":"fa-solid fa-bowl-food","texto":"Algunos animalitos, por su edad o condición de salud, necesitan alimentos especiales indicados por la veterinaria."},
          {"titulo":"Un esfuerzo diario","icono":"fa-solid fa-sack-dollar","texto":"La compra de concentrado y de los ingredientes utilizados para cocinar representa aproximadamente $40 diarios. A esto se suma el trabajo de preparar, servir y limpiar después de cada alimentación."}
        ],
        "cierreTitulo": "Tu ayuda mantiene llenos sus platos",
        "cierreTexto": "Cada colaboración nos ayuda a continuar alimentando a quienes dependen de Paraíso todos los días.",
        "foto": ["/img/actualidad/alimentacion1.webp","/img/actualidad/alimentacion2.webp"]
      }
    },
    {
      "id": "hogar-que-los-protege",
      "activa": true,
      "acento": "naranja",
      "etiqueta": "🏠 Hogar Paraíso",
      "titulo": "Un hogar que necesita",
      "tituloDestacado": "sostenerse cada mes",
      "descripcion": "El espacio donde viven y se recuperan nuestros animalitos es alquilado. Sostenerlo cada mes permite que continúen protegidos y tranquilos.",
      "foto": "/img/actualidad/hogar1.webp",
      "icono": "fa-solid fa-house-chimney-heart",
      "textoBoton": "Conoce el hogar que proteges",
      "modal": {
        "titulo": "El hogar que los protege",
        "texto": "El Hogar Paraíso funciona en un espacio alquilado. Allí muchos animalitos pueden vivir tranquilos, descansar, alimentarse y recuperarse mientras reciben los cuidados que necesitan.",
        "secciones": [
          {"titulo":"Un espacio para estar seguros","icono":"fa-solid fa-house-circle-check","texto":"El hogar les brinda protección, áreas de descanso y un lugar donde acompañar sus recuperaciones y atender sus necesidades diarias."},
          {"titulo":"Gastos que deben cubrirse cada mes","icono":"fa-solid fa-receipt","texto":"Además del alquiler mensual, necesitamos cubrir servicios esenciales.","items":["Agua y electricidad.","Gas para cocinar sus alimentos.","Internet para mantener funcionando las cámaras de vigilancia.","Mantenimiento básico del espacio."]},
          {"titulo":"Más de 60 vidas dependen de Paraíso","icono":"fa-solid fa-paw","texto":"Si el proyecto no pudiera sostener este espacio, muchos animalitos volverían a quedar vulnerables. Mantener el Hogar Paraíso significa conservar el lugar que hoy los protege."}
        ],
        "cierreTitulo": "Ayúdanos a mantener su hogar",
        "cierreTexto": "Cada apoyo contribuye a que este espacio continúe siendo un lugar seguro para los animalitos que dependen de nosotros.",
        "foto": []
      }
    },
    {
      "id": "necesidades-prioritarias",
      "activa": true,
      "tipo": "necesidadUrgente",
      "etiqueta": "⚡ Urgencias de este mes",
      "titulo": "Necesidades prioritarias",
      "descripcion": "Este mes estamos cubriendo gastos esenciales para que nuestros animalitos sigan recibiendo atención. Tu apoyo nos ayuda a mantenerlos seguros y continuar con sus tratamientos.",
      "necesidades": ["🏠 Pago del alquiler de Paraíso.","💧 Pago de agua y energía eléctrica.","💉 Quimioterapias para 4 perritos.","🩺 Exámenes, cirugía y hospitalización de Toto."],
      "montoRecaudado": null,
      "meta": null,
      "textoBoton": "Conocer cómo ayudar"
    },
    {
      "id": "motos-ruta",
      "activa": true,
      "etiqueta": "🏍️ Ruta de Alimentación",
      "titulo": "Nuestra ruta necesita volver a moverse",
      "descripcion": "Una de nuestras motos está fuera de servicio y la otra necesita reparación. Ambas son fundamentales para llevar alimento a los animalitos que nos esperan cada día.",
      "foto": "/img/actualidad/taller1.webp",
      "textoBoton": "Conocer la necesidad",
      "modal": {
        "titulo": "Necesitamos poner la ruta en movimiento",
        "texto": "Una de nuestras motos está detenida por problemas mecánicos y otra necesita reparación. Una de estas reparaciones ronda los $250.\n\nSi tienes un taller, eres mecánico o puedes apoyarnos con la reparación, escríbenos. También puedes ayudarnos aportando con una parte del costo.\n\nCada apoyo nos ayuda a mantener la Ruta de Alimentación en movimiento y seguir llegando a los animalitos que nos esperan.",
        "foto": "/img/actualidad/taller1.webp"
      }
    },
    {"id":"actualidad-reserva-1","activa":false,"etiqueta":"","titulo":"","descripcion":"","foto":"","textoBoton":"","modal":{"titulo":"","texto":"","foto":""}},
    {"id":"actualidad-reserva-2","activa":false,"etiqueta":"","titulo":"","descripcion":"","foto":"","textoBoton":"","modal":{"titulo":"","texto":"","foto":""}}
  ]
};
