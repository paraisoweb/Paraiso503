/* =============================================================================
   CONTENIDO: HISTORIAS DE ÉXITO — Paraíso 503
   =============================================================================
   Para agregar una nueva historia, copia uno de estos objetos y complétalo.
   Aparecerá automáticamente en "/historias/" (con su modal "Conocer su
   historia"), y también en la portada si "destacadoInicio" es true (solo las
   primeras 2 destacadas se muestran en la portada).

   >>> PARA EDITAR EL CONTENIDO, CAMBIA SOLO LOS VALORES DE ABAJO. <<<
   No toques la primera línea ni la línea final "};".

   Campos de cada historia:
     nombre            nombre del perrito o gatito
     estado            "recuperado", "adoptado" o "tratamiento" — controla la
                        etiqueta de color, el filtro, y se muestra como
                        "Estado actual" dentro del modal
     frase             frase corta representativa de la historia (opcional).
                        Déjala en "" si no quieres mostrar ninguna
     descripcion       breve historia para la TARJETA (unas pocas líneas):
                        cómo llegó, qué le pasó y cómo está hoy
     historiaCompleta  historia completa y detallada para el MODAL. Si la
                        dejas en "", el modal usa "descripcion" en su lugar
     fotoAntes         ruta a la foto real de "antes"; null = imagen de referencia
     fotoDespues       ruta a la foto real de "después"; null = imagen de referencia
     lugarRescate      lugar donde fue rescatado (ej. "Chalatenango"). "" = se oculta
     fechaRescate      fecha del rescate (ej. "Marzo 2025"). "" = se oculta
     diagnostico       diagnóstico médico. "" = esta sección se oculta en el modal
     tratamientos      arreglo de textos cortos, uno por tratamiento recibido.
                        [] = esta sección se oculta en el modal
     lineaTiempo       arreglo de eventos, cada uno {"evento": "...", "fecha": "..."}.
                        No es fija: cada historia puede tener tantos eventos como
                        necesite (o ninguno, dejando el arreglo vacío []). El campo
                        "fecha" es opcional (déjalo en "" si no aplica). El ícono de
                        cada evento se asigna solo según el texto de "evento" (ver
                        ICONOS_LINEA_TIEMPO en content-loader.js); si el evento no
                        coincide con ninguno conocido, se usa un ícono genérico
                        automáticamente — no hace falta indicar íconos.
     galeria           arreglo de rutas a fotos/videos adicionales de esta
                        historia, pensado para futuras ampliaciones (ej.
                        "img/historias/solecita/sol1.webp"). [] = esta sección se
                        oculta en el modal hasta que agregues imágenes. Se abren
                        en el mismo visor de fotos que ya usa "Programas".
     destacadoInicio   true = también aparece en la vista previa de la portada

   Todo lo de arriba es opcional excepto nombre, estado y descripcion: cualquier
   sección sin contenido simplemente no se muestra en el modal, así que puedes
   completar los campos poco a poco sin romper nada.
   ============================================================================= */
window.PARAISO503_CONTENT = window.PARAISO503_CONTENT || {};
window.PARAISO503_CONTENT.historias = {
  "ultimaActualizacion": "9 de agosto de 2026",
  "mensajeActualizacion": "Paraíso 503 tiene muchas historias que todavía queremos compartir. En los próximos días iremos agregando nuevos rescates, avances y segundas oportunidades. Vuelve pronto para conocerlas.",
  "_ayuda": "Para agregar una nueva historia, copia uno de estos objetos y complétalo. Aparecerá automáticamente en '/historias/' (con su modal 'Conocer su historia'), y también en la portada si 'destacadoInicio' es true (solo las primeras 2 destacadas se muestran en la portada). Cualquier campo opcional que dejes vacío simplemente no se muestra en el modal.",
  "_ayuda_campos": {
    "nombre": "nombre del perrito o gatito",
    "estado": "'rescate', 'tratamiento', 'recuperado' o 'adoptado' — controla la etiqueta de color, el filtro, y se muestra como 'Estado actual' en el modal",
    "frase": "frase corta representativa (opcional, '' para ocultarla)",
    "descripcion": "breve historia para la tarjeta: cómo llegó, qué le pasó y cómo está hoy",
    "historiaCompleta": "historia completa para el modal (opcional, '' = usa 'descripcion')",
    "fotoAntes": "ruta a la foto real de 'antes' (ej. 'img/historias/solecita/sol1.webp'). Déjalo en null para usar una imagen de referencia automática",
    "fotoDespues": "ruta a la foto real de 'después'. Déjalo en null para usar una imagen de referencia automática",
    "lugarRescate": "lugar del rescate (opcional, '' para ocultarlo)",
    "fechaRescate": "fecha del rescate (opcional, '' para ocultarla)",
    "diagnostico": "diagnóstico médico (opcional, '' para ocultar esta sección)",
    "tratamientos": "arreglo de textos, uno por tratamiento (opcional, [] para ocultar esta sección)",
    "lineaTiempo": "arreglo de eventos {evento, fecha}; cada historia usa solo los que le correspondan (opcional, [] para ocultar esta sección)",
    "galeria": "arreglo de rutas a fotos/videos adicionales (opcional, [] para ocultar esta sección)",
    "destacadoInicio": "true para que también aparezca en la vista previa de la portada"
  },
  "historias": [
    {
      "nombre": "Milagro en la carretera",
      "estado": "rescate",
      "frase": "Una nueva oportunidad comenzó en Los Chorros.",
      "descripcion": "Durante nuestro recorrido conocimos a un señor que cuida a más de 25 perritos junto a la carretera de Los Chorros. Ante la situación que enfrenta por las obras de la zona, Paraíso 503 decidió sumar esfuerzos y recibir a los cachorros más vulnerables para brindarles protección, alimentación y atención.",
      "historiaCompleta": "Durante nuestro recorrido conocimos a un señor que ha dedicado parte de su vida a cuidar a más de 25 perritos. Hoy enfrenta una situación difícil: debido a las obras que se realizan en la carretera de Los Chorros, debe abandonar el lugar donde ha permanecido con ellos.\n\nPara una sola persona, cuidar tantos animalitos representa una enorme responsabilidad. Al conocer su situación, nos acercamos y decidimos sumar esfuerzos para ayudarlo y proteger especialmente a los cachorros más vulnerables.\n\nLlevarlos con nosotros significa alejarlos de los riesgos de crecer cerca de una carretera transitada. En Paraíso 503 recibirán alimentación adecuada, revisión veterinaria, los cuidados y medicamentos que necesiten, su esquema de vacunación y seguimiento durante su crecimiento.\n\nEl objetivo final es que, cuando estén preparados, puedan encontrar familias responsables y hogares permanentes.\n\nEste rescate no termina cuando llegan al refugio. Apenas comienza una nueva etapa para ellos.",
      "fotoAntes": "img/historias/los-chorros/rescate1.webp",
      "fotoDespues": "img/historias/los-chorros/rescate2.webp",
      "lugarRescate": "Los Chorros, La Libertad",
      "fechaRescate": "Agosto 2026",
      "diagnostico": "",
      "tratamientos": ["Revisión veterinaria", "Desparasitación y cuidados preventivos", "Esquema de vacunación", "Alimentación y seguimiento durante su crecimiento"],
      "lineaTiempo": [
        { "evento": "Rescate", "fecha": "Agosto 2026" },
        { "evento": "Ingreso a Paraíso 503", "fecha": "Agosto 2026" },
        { "evento": "Atención veterinaria", "fecha": "En proceso" },
        { "evento": "Preparación para adopción", "fecha": "Próximamente" }
      ],
      "galeria": ["img/historias/los-chorros/rescate3.webp", "img/historias/los-chorros/rescate4.webp"],
      "destacadoInicio": false
    },
    {
      "nombre": "Solecita",
      "estado": "recuperado",
      "frase": "De un diagnóstico crítico a una segunda oportunidad.",
      "descripcion": "Cuando Sol llegó desde Chalatenango, su estado era crítico. Enfrentaba un tumor de Sticker y una infección severa, lo que convirtió su recuperación en un gran desafío. Después de seis sesiones de quimioterapia, cuidados constantes y su esterilización, hoy está completamente recuperada.",
      "historiaCompleta": "",
      "fotoAntes":"img/historias/solecita/sol1.webp",
      "fotoDespues":"img/historias/solecita/sol2.webp",
      "lugarRescate": "Chalatenango",
      "fechaRescate": "",
      "diagnostico": "Tumor de Sticker con infección severa asociada.",
      "tratamientos": ["Seis sesiones de quimioterapia", "Esterilización", "Cuidados constantes de recuperación"],
      "lineaTiempo": [
        { "evento": "Rescate", "detalle": "Rescatada en Chalatenango" },
        { "evento": "Diagnóstico", "detalle": "Tumor de Sticker" },
        { "evento": "Quimioterapia", "detalle": "6 sesiones" },
        { "evento": "Esterilización", "detalle": "Procedimiento exitoso" },
        { "evento": "Recuperación", "detalle": "Completada con éxito" }
      ],
      "galeria": [ "img/historias/solecita/sol3.webp", "img/historias/solecita/sol4.webp", "img/historias/solecita/sol5.webp" ],
      "destacadoInicio": true
    },
    {
      "nombre": "Toto",
      "estado": "tratamiento",
      "frase": "",
      "descripcion": "La historia de Toto aún se está escribiendo. Llegó con un tumor perianal de gran tamaño y una antigua fractura de cadera, dos condiciones que requieren un manejo cuidadoso. Hoy continúa en tratamiento y a la espera de nuevos exámenes para poder realizar su cirugía. Cada avance es un paso más hacia la recuperación que tanto merece.",
      "historiaCompleta": "",
      "fotoAntes":"img/historias/toto/toto1.webp",
      "fotoDespues": "img/historias/toto/toto2.webp",
      "lugarRescate": "",
      "fechaRescate": "",
      "diagnostico": "Tumor perianal de gran tamaño y fractura de cadera antigua.",
      "tratamientos": ["En espera de nuevos exámenes previos a cirugía"],
      "lineaTiempo": [
        { "evento": "Rescate", "fecha": "21/06/2026" },
        { "evento": "Diagnóstico", "fecha": "22/06/2026" },
        { "evento": "Continúa en tratamiento", "fecha": "23/06/2026-actualidad" }
      ],
      "galeria": ["img/historias/toto/toto3.webp",],
      "destacadoInicio": true
    },
    {
      "nombre": "Jack",
      "estado": "recuperado",
      "frase": "De un atropello a una nueva oportunidad.",
      "descripcion": "Jack fue encontrado siendo un cachorro tras sufrir un atropello en Colón. Recibió atención veterinaria inmediata, tratamiento y un vendaje de Robert Jones que le permitió recuperarse. Hoy disfruta de una nueva oportunidad y espera encontrar una familia que le brinde un hogar lleno de amor.",
      "historiaCompleta": "Jack fue encontrado siendo apenas un cachorro, luego de ser atropellado en Colón. Llegó con una fractura y un estado de salud delicado, por lo que recibió atención veterinaria inmediata. Tras realizarle los exámenes correspondientes, permaneció hospitalizado con fluidoterapia y posteriormente se le colocó un vendaje de Robert Jones para estabilizar su lesión. Gracias a semanas de cuidados y seguimiento, logró recuperarse. Hoy es un perrito alegre, lleno de energía y espera encontrar una familia que le brinde el hogar que siempre ha merecido.",
      "fotoAntes":"img/historias/jack/jack1.webp",
      "fotoDespues": "img/historias/jack/jack2.webp",
      "lugarRescate": "",
      "fechaRescate": "",
      "diagnostico": "Fractura por atropello y deshidratación severa.",
      "tratamientos": ["Hospitalización y fluidoterapia", "Exámenes médicos", "Vendaje de Robert Jones", "Controles y recuperación"],
      "lineaTiempo": [
        { "evento": "Rescate", "fecha": "05/11/2024" },
        { "evento": "Atención veterinaria", "fecha": "06/11/2024" },
        { "evento": "Inmobilización", "fecha": "06/11/2024-27/11/2024" },
        { "evento": "Recuperación", "fecha": "27/11/2024-actualidad" }
      ],
      "galeria": [],
      "destacadoInicio": false
    },
    {
      "nombre": "Conchita",
      "estado": "recuperado",
      "frase": "Vencí al moquillo",
      "descripcion": "Conchita fue rescatada en la carretera Los Chorros mientras realizábamos una de nuestras rutas de alimentación. Tras su rescate fue diagnosticada con moquillo y enfrentó un largo proceso de recuperación que incluso le impidió caminar. Gracias a cuidados constantes, terapia, alimentación y mucho amor, logró recuperarse y hoy vive feliz junto a nosotros.",
      "historiaCompleta": "Conchita fue rescatada durante una de nuestras rutas de alimentación en la carretera Los Chorros. Desde el primer momento notamos que estaba desorientada y en un estado delicado, por lo que fue trasladada de inmediato a la veterinaria. Tras los exámenes correspondientes, fue diagnosticada con moquillo, una enfermedad que puso a prueba su fortaleza. Durante semanas permaneció en tratamiento, aislamiento y cuidados constantes. Con el tiempo presentó complicaciones neurológicas que le impidieron caminar, pero nunca dejó de luchar. Día tras día recibió terapia, alimentación especial y el acompañamiento necesario para volver a ponerse de pie. Poco a poco recuperó su movilidad y sus ganas de vivir. Hoy Conchita ha vencido al moquillo y disfruta de una vida feliz, rodeada del cariño de quienes nunca dejaron de creer en ella.",
      "fotoAntes":"img/historias/conchita/conchita1.webp",
      "fotoDespues": "img/historias/conchita/conchita2.webp",
      "lugarRescate": "",
      "fechaRescate": "",
      "diagnostico": "Moquillo canino con complicaciones neurológicas.",
      "tratamientos": ["Aislamiento y tratamiento para el moquillo", "Terapia de rehabilitación para volver a caminar.", "Suplementación y recuperación nutricional.", "Cuidados y seguimiento constante."],
      "lineaTiempo": [
        { "evento": "Rescate", "fecha": "05/05/2022" },
        { "evento": "Atención veterinaria", "fecha": "05/05/2022" },
        { "evento": "Rehabilitación", "fecha": "06/05/2022-14/12/2022" },
        { "evento": "Recuperación", "fecha": "14/12/2022-actualidad" }
      ],
      "galeria": ["img/historias/conchita/conchita3.webp", "img/historias/conchita/conchita4.webp", "img/historias/conchita/conchita5.webp"],
      "destacadoInicio": false
    },
    {
      "nombre": "Canelita",
      "estado": "tratamiento",
      "frase": "Seguimos luchando, porque rendirse nunca ha sido una opción.",
      "descripcion": "La historia de Canelita aún se está escribiendo. Llegó con un avanzado Tumor de Sticker, desnutrición e infecciones que comprometían seriamente su salud. Hoy continúa en tratamiento y cada sesión representa una nueva oportunidad para seguir luchando.",
      "historiaCompleta": "Canelita fue rescatada en un estado muy delicado, con desnutrición severa, un Tumor de Sticker avanzado y múltiples infecciones que comprometían su salud. Tras realizarle los exámenes necesarios, inició un tratamiento intensivo que hasta la fecha incluye doce sesiones de quimioterapia, controles veterinarios y cuidados constantes. Aunque ha mostrado avances importantes, el cáncer aún no ha desaparecido por completo y su recuperación continúa. Hoy seguimos luchando a su lado, y cada apoyo que recibimos nos acerca un poco más a darle la oportunidad de vencer esta enfermedad.",
      "fotoAntes":"img/historias/canelita/canelita1.webp",
      "fotoDespues": "img/historias/canelita/canelita2.webp",
      "lugarRescate": "",
      "fechaRescate": "",
      "diagnostico": "Tumor de Sticker avanzado, desnutrición e infecciones asociadas.",
      "tratamientos": ["Examenes médicos y seguimiento veterinario", "Tratamiento para el Tumor de Sticker", "12 sesiones de quimioterapia", "Controles y seguimiento médico continuo."],
      "lineaTiempo": [
        { "evento": "Rescate", "fecha": "22/01/2025" },
        { "evento": "Diagnóstico", "fecha": "22/01/2025" },
        { "evento": "Inicio del tratamiento", "fecha": "22/01/2025-05/02/2025" },
        { "evento": "doce sesiones de quimioterapia", "fecha": "05/02/2025-17/07/2026"}, 
        { "evento": "Seguimiento médico", "fecha": "17/07/2026-actualidad" }
      ],
      "galeria": [],
      "destacadoInicio": false
    },
    {
      "nombre": "Palomita",
      "estado": "adoptado",
      "frase": "",
      "descripcion": "Su historia comenzó junto a la carretera hacia Sonsonate, donde fue encontrado desnutrido, en malas condiciones y con un alto riesgo de ser atropellado. Con tiempo, cuidados y dedicación, salió adelante. Hoy disfruta de la vida que siempre mereció, junto a una familia que lo ama.",
      "historiaCompleta": "",
      "fotoAntes":"img/historias/palomita/palomita1.webp",
      "fotoDespues":"img/historias/palomita/palomita2.webp",
      "lugarRescate": "Carretera hacia Sonsonate",
      "fechaRescate": "",
      "diagnostico": "",
      "tratamientos": [],
      "lineaTiempo": [
        { "evento": "Rescate", "fecha": "18/09/2025" },
        { "evento": "Recuperación", "fecha": "19/09/2025-2/10/2025" },
        { "evento": "Adoptado", "fecha": "2/10/2025" }
      ],
      "galeria": [],
      "destacadoInicio": false
    },
  ]
};
