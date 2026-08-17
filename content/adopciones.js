/* =============================================================================
   CONTENIDO: ADOPCIONES — Paraíso 503
   =============================================================================
   Para agregar un nuevo animalito en adopción, copia uno de estos objetos y
   complétalo con sus datos. Aparecerá automáticamente en la página de
   Adopciones, y también en la portada si "destacadoInicio" es true (solo
   los primeros 3 destacados se muestran en la portada).

   Campos de cada animalito:
     nombre           nombre del animalito
     especie          "perro" o "gato" — se usa para el filtro de tipo de animal
     sexo             "macho" o "hembra" — se usa para el filtro de sexo
     edad             "cachorro" o "adulto" — se usa para el filtro de edad y para la insignia de la tarjeta
     estado           texto que se muestra en la etiqueta sobre la foto, ej. "Disponible"
     descripcion      descripción breve y cercana del animalito
     foto             ruta a la foto real (ej. "img/adopta/cachorro-canela-ojos-claros-adopcion.webp"); null = imagen de referencia
     alt              descripción accesible de lo que aparece en la fotografía
     destacadoInicio  true = también aparece en la vista previa de la portada

   >>> PARA EDITAR EL CONTENIDO, CAMBIA SOLO LOS VALORES DE ABAJO. <<<
   No toques la primera línea ni la línea final "};".
   ============================================================================= */
window.PARAISO503_CONTENT = window.PARAISO503_CONTENT || {};
window.PARAISO503_CONTENT.adopciones = {
  "_ayuda": "Para agregar un nuevo animalito en adopción, copia uno de estos objetos y complétalo con sus datos. Aparecerá automáticamente en la página de Adopciones, y también en la portada si 'destacadoInicio' es true (solo los primeros 3 destacados se muestran en la portada).",
  "_ayuda_campos": {
    "nombre": "nombre del animalito",
    "especie": "'perro' o 'gato' — se usa para el filtro de tipo de animal",
    "sexo": "'macho' o 'hembra' — se usa para el filtro de sexo",
    "edad": "'cachorro' o 'adulto' — se usa para el filtro de edad y para la insignia que se muestra en la tarjeta",
    "estado": "texto que se muestra en la etiqueta sobre la foto, ej. 'Disponible'",
    "descripcion": "descripción breve y cercana del animalito",
    "foto": "ruta a la foto real (ej. 'img/adopta/cachorro-canela-ojos-claros-adopcion.webp'). Déjalo en null para usar una imagen de referencia automática mientras no haya foto",
    "alt": "descripción breve y precisa de lo que aparece en la fotografía",
    "destacadoInicio": "true para que también aparezca en la vista previa de la portada, false para que solo aparezca en la página de Adopciones"
  },
  "animalitos": [
    {
      "nombre": "🐶 Cachorro 1",
      "especie": "perro",
      "sexo": "macho",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Dulce, sociable y de mirada tranquila. Busca una familia responsable con quien crecer acompañado, protegido y muy querido.",
      "alt": "Cachorro canela de ojos claros disponible para adopción responsable en Paraíso 503",
      "foto": "img/adopta/cachorro-canela-ojos-claros-adopcion.webp",
      "destacadoInicio": true
    },
    {
      "nombre": "🐶 Cachorra 2",
      "especie": "perro",
      "sexo": "hembra",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Cariñosa y juguetona, disfruta compartir con otros perritos. Espera un hogar donde pueda crecer con paciencia, cuidados y mucho cariño.",
      "alt": "Cachorra de pelaje crema disponible para adopción responsable en Paraíso 503",
      "foto": "img/adopta/cachorra-crema-adopcion.webp",
      "destacadoInicio": true
    },
    {
      "nombre": "🐶 Cachorra 3",
      "especie": "perro",
      "sexo": "hembra",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Alegre, curiosa y con mucha energía para descubrir el mundo. Busca una familia que la acompañe en sus juegos, aprendizajes y crecimiento.",
      "alt": "Cachorra de pelaje café disponible para adopción responsable en Paraíso 503",
      "foto": "img/adopta/cachorro-cafe-adopcion.webp",
      "destacadoInicio": true
    },
    {
      "nombre": "🐱 Gatito 1",
      "especie": "gato",
      "sexo": "macho",
      "edad": "adulto",
      "estado": "Disponible",
      "descripcion": "Tranquilo y cariñoso, disfruta los rincones cómodos y recibir atención. Busca un hogar responsable donde pueda sentirse seguro y acompañado.",
      "alt": "Gato atigrado disponible para adopción responsable en Paraíso 503",
      "foto": "img/adopta/gato-atigrado-adopcion.webp",
      "destacadoInicio": false
    },
  ]
};
