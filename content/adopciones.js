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
      "descripcion": "Cariñoso, tranquilo y muy sociable. Le encanta estar acompañado.",
      "alt": "Cachorro canela de ojos claros disponible para adopción responsable en Paraíso 503",
      "foto":"img/adopta/cachorro-canela-ojos-claros-adopcion.webp",
      "destacadoInicio": true
    },
    {
      "nombre": "🐶 Cachorra 2",
      "especie": "perro",
      "sexo": "hembra",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Muy dulce y juguetona. Se lleva bien con otros perritos.",
      "alt": "Cachorra de pelaje crema disponible para adopción responsable en Paraíso 503",
      "foto":"img/adopta/cachorra-crema-adopcion.webp",
      "destacadoInicio": true
    },
    {
      "nombre": "🐶 Cachorro 3",
      "especie": "perro",
      "sexo": "macho",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Cachorro alegre, curioso y lleno de energía. Ideal para una familia activa.",
      "alt": "Cachorro café disponible para adopción responsable en Paraíso 503",
      "foto":"img/adopta/cachorro-cafe-adopcion.webp",
      "destacadoInicio": true
    },
    {
      "nombre": "🐱 Gatito 1",
      "especie": "gato",
      "sexo": "macho",
      "edad": "adulto",
      "estado": "Disponible",
      "descripcion": "Tierno y tranquilo. Le encanta dormir en lugares cálidos y recibir mimos.",
      "alt": "Gato atigrado disponible para adopción responsable en Paraíso 503",
      "foto":"img/adopta/gato-atigrado-adopcion.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorro 4",
      "especie": "perro",
      "sexo": "macho",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "De mirada curiosa y orejitas encantadoras. Busca una familia paciente que lo acompañe a crecer y descubrir el mundo.",
      "alt": "Cachorro canela de orejas grandes disponible para adopción en Paraíso 503",
      "foto":"img/adopta/cachorro-canela-orejas-grandes-adopcion.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorro 5",
      "especie": "perro",
      "sexo": "macho",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Un pequeño de mirada dulce que espera un hogar donde pueda sentirse protegido, acompañado y muy querido.",
      "alt": "Cachorro canela sostenido en brazos disponible para adopción en Paraíso 503",
      "foto":"img/adopta/cachorro-canela-en-brazos-adopcion.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorra 6",
      "especie": "perro",
      "sexo": "hembra",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Su carita expresiva y su lengua traviesa conquistan a cualquiera. Busca una familia que acompañe sus primeros juegos y aprendizajes.",
      "alt": "Cachorra crema de expresión juguetona disponible para adopción en Paraíso 503",
      "foto":"img/adopta/cachorra-crema-juguetona-adopcion.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorro 7",
      "especie": "perro",
      "sexo": "macho",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Pequeño y de expresión tranquila. Está esperando crecer rodeado de protección, paciencia y mucho afecto.",
      "alt": "Cachorro crema de perfil disponible para adopción responsable en Paraíso 503",
      "foto":"img/adopta/cachorro-crema-perfil-adopcion.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorra 8",
      "especie": "perro",
      "sexo": "hembra",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Su mirada noble y su hocico oscuro la hacen inconfundible. Espera una familia que la cuide y la convierta en parte de su vida.",
      "alt": "Cachorra crema de hocico oscuro disponible para adopción en Paraíso 503",
      "foto":"img/adopta/cachorra-crema-hocico-oscuro-adopcion.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorro 9",
      "especie": "perro",
      "sexo": "macho",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Un pequeño de pelaje canela y mirada atenta. Busca un hogar seguro donde pueda crecer acompañado y querido.",
      "alt": "Cachorro canela con lazo disponible para adopción responsable en Paraíso 503",
      "foto":"img/adopta/cachorro-canela-lazo-adopcion.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorra 10",
      "especie": "perro",
      "sexo": "hembra",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Su pelaje negro con detalles canela le da una apariencia única. Busca una familia responsable que le brinde estabilidad, cuidados y cariño.",
      "alt": "Cachorra negra con detalles canela disponible para adopción en Paraíso 503",
      "foto":"img/adopta/cachorra-negra-canela-adopcion.webp",
      "destacadoInicio": false
    },
  ]
};
