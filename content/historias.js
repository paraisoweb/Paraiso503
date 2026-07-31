/* =============================================================================
   CONTENIDO: HISTORIAS DE ÉXITO — Paraíso 503
   =============================================================================
   Para agregar una nueva historia, copia uno de estos objetos y complétalo.
   Aparecerá automáticamente en "historias.html" (con su modal "Conocer su
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
                        "img/historias/solecita/1.jpg"). [] = esta sección se
                        oculta en el modal hasta que agregues imágenes. Se abren
                        en el mismo visor de fotos que ya usa "Programas".
     destacadoInicio   true = también aparece en la vista previa de la portada

   Todo lo de arriba es opcional excepto nombre, estado y descripcion: cualquier
   sección sin contenido simplemente no se muestra en el modal, así que puedes
   completar los campos poco a poco sin romper nada.
   ============================================================================= */
window.PARAISO503_CONTENT = window.PARAISO503_CONTENT || {};
window.PARAISO503_CONTENT.historias = {
  "_ayuda": "Para agregar una nueva historia, copia uno de estos objetos y complétalo. Aparecerá automáticamente en 'historias.html' (con su modal 'Conocer su historia'), y también en la portada si 'destacadoInicio' es true (solo las primeras 2 destacadas se muestran en la portada). Cualquier campo opcional que dejes vacío simplemente no se muestra en el modal.",
  "_ayuda_campos": {
    "nombre": "nombre del perrito o gatito",
    "estado": "'recuperado', 'adoptado' o 'tratamiento' — controla la etiqueta de color, el filtro, y se muestra como 'Estado actual' en el modal",
    "frase": "frase corta representativa (opcional, '' para ocultarla)",
    "descripcion": "breve historia para la tarjeta: cómo llegó, qué le pasó y cómo está hoy",
    "historiaCompleta": "historia completa para el modal (opcional, '' = usa 'descripcion')",
    "fotoAntes": "ruta a la foto real de 'antes' (ej. 'img/historias/caso1-antes.jpg'). Déjalo en null para usar una imagen de referencia automática",
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
      "nombre": "Solecita",
      "estado": "recuperado",
      "frase": "De un diagnóstico crítico a una segunda oportunidad.",
      "descripcion": "Cuando Sol llegó desde Chalatenango, su estado era crítico. Enfrentaba un tumor de Sticker y una infección severa, lo que convirtió su recuperación en un gran desafío. Después de seis sesiones de quimioterapia, cuidados constantes y su esterilización, hoy está completamente recuperada.",
      "historiaCompleta": "",
      "fotoAntes":"img/historias/sol1.jpg",
      "fotoDespues":"img/historias/sol2.jpg",
      "lugarRescate": "Chalatenango",
      "fechaRescate": "",
      "diagnostico": "Tumor de Sticker con infección severa asociada.",
      "tratamientos": ["Seis sesiones de quimioterapia", "Esterilización", "Cuidados constantes de recuperación"],
      "lineaTiempo": [
        { "evento": "Rescate", "fecha": "" },
        { "evento": "Diagnóstico", "fecha": "" },
        { "evento": "Quimioterapia", "fecha": "" },
        { "evento": "Esterilización", "fecha": "" },
        { "evento": "Recuperación", "fecha": "" }
      ],
      "galeria": [],
      "destacadoInicio": true
    },
    {
      "nombre": "Palomita",
      "estado": "adoptado",
      "frase": "",
      "descripcion": "Su historia comenzó junto a la carretera hacia Sonsonate, donde fue encontrado desnutrido, en malas condiciones y con un alto riesgo de ser atropellado. Con tiempo, cuidados y dedicación, salió adelante. Hoy disfruta de la vida que siempre mereció, junto a una familia que lo ama.",
      "historiaCompleta": "",
      "fotoAntes": null,
      "fotoDespues": null,
      "lugarRescate": "Carretera hacia Sonsonate",
      "fechaRescate": "",
      "diagnostico": "",
      "tratamientos": [],
      "lineaTiempo": [
        { "evento": "Rescate", "fecha": "" },
        { "evento": "Recuperación", "fecha": "" },
        { "evento": "Adoptado", "fecha": "" }
      ],
      "galeria": [],
      "destacadoInicio": false
    },
    {
      "nombre": "Toto",
      "estado": "tratamiento",
      "frase": "",
      "descripcion": "La historia de Toto aún se está escribiendo. Llegó con un tumor perianal de gran tamaño y una antigua fractura de cadera, dos condiciones que requieren un manejo cuidadoso. Hoy continúa en tratamiento y a la espera de nuevos exámenes para poder realizar su cirugía. Cada avance es un paso más hacia la recuperación que tanto merece.",
      "historiaCompleta": "",
      "fotoAntes": null,
      "fotoDespues": null,
      "lugarRescate": "",
      "fechaRescate": "",
      "diagnostico": "Tumor perianal de gran tamaño y fractura de cadera antigua.",
      "tratamientos": ["En espera de nuevos exámenes previos a cirugía"],
      "lineaTiempo": [
        { "evento": "Rescate", "fecha": "" },
        { "evento": "Diagnóstico", "fecha": "" },
        { "evento": "Continúa en tratamiento", "fecha": "" }
      ],
      "galeria": [],
      "destacadoInicio": false
    },
    {
      "nombre": "[Nombre del perrito]",
      "estado": "recuperado",
      "frase": "",
      "descripcion": "[Completar: breve historia — cómo llegó, qué le pasó y cómo está hoy.]",
      "historiaCompleta": "",
      "fotoAntes": null,
      "fotoDespues": null,
      "lugarRescate": "",
      "fechaRescate": "",
      "diagnostico": "",
      "tratamientos": [],
      "lineaTiempo": [],
      "galeria": [],
      "destacadoInicio": false
    },
    {
      "nombre": "[Nombre del perrito]",
      "estado": "adoptado",
      "frase": "",
      "descripcion": "[Completar: breve historia — cómo llegó, qué le pasó y cómo está hoy.]",
      "historiaCompleta": "",
      "fotoAntes": null,
      "fotoDespues": null,
      "lugarRescate": "",
      "fechaRescate": "",
      "diagnostico": "",
      "tratamientos": [],
      "lineaTiempo": [],
      "galeria": [],
      "destacadoInicio": false
    },
    {
      "nombre": "[Nombre del perrito]",
      "estado": "tratamiento",
      "frase": "",
      "descripcion": "[Completar: breve historia — cómo llegó, qué le pasó y cómo está hoy.]",
      "historiaCompleta": "",
      "fotoAntes": null,
      "fotoDespues": null,
      "lugarRescate": "",
      "fechaRescate": "",
      "diagnostico": "",
      "tratamientos": [],
      "lineaTiempo": [],
      "galeria": [],
      "destacadoInicio": false
    }
  ]
};
