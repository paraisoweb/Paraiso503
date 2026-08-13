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
     foto             ruta a la foto real (ej. "img/perros/yak.jpg"); null = imagen de referencia
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
    "foto": "ruta a la foto real (ej. 'img/perros/yak.jpg'). Déjalo en null para usar una imagen de referencia automática mientras no haya foto",
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
      "foto":"img/adopta/perro1.webp",
      "destacadoInicio": true
    },
    {
      "nombre": "🐶 Cachorra 2",
      "especie": "perro",
      "sexo": "hembra",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Muy dulce y juguetona. Se lleva bien con otros perritos.",
      "foto":"img/adopta/perro2.webp",
      "destacadoInicio": true
    },
    {
      "nombre": "🐶 Cachorro 3",
      "especie": "perro",
      "sexo": "macho",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Cachorro alegre, curioso y lleno de energía. Ideal para una familia activa.",
      "foto":"img/adopta/perro3.webp",
      "destacadoInicio": true
    },
    {
      "nombre": "🐱 Gatito 1",
      "especie": "gato",
      "sexo": "macho",
      "edad": "adulto",
      "estado": "Disponible",
      "descripcion": "Tierno y tranquilo. Le encanta dormir en lugares cálidos y recibir mimos.",
      "foto":"img/adopta/gato1.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorro 4",
      "especie": "perro",
      "sexo": "macho",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "De mirada curiosa y orejitas encantadoras. Busca una familia paciente que lo acompañe a crecer y descubrir el mundo.",
      "foto":"img/adopta/perro4.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorro 5",
      "especie": "perro",
      "sexo": "macho",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Un pequeño de mirada dulce que espera un hogar donde pueda sentirse protegido, acompañado y muy querido.",
      "foto":"img/adopta/perro5.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorra 6",
      "especie": "perro",
      "sexo": "hembra",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Su carita expresiva y su lengua traviesa conquistan a cualquiera. Busca una familia que acompañe sus primeros juegos y aprendizajes.",
      "foto":"img/adopta/perro6.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorro 7",
      "especie": "perro",
      "sexo": "macho",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Pequeño y de expresión tranquila. Está esperando crecer rodeado de protección, paciencia y mucho afecto.",
      "foto":"img/adopta/perro7.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorra 8",
      "especie": "perro",
      "sexo": "hembra",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Su mirada noble y su hocico oscuro la hacen inconfundible. Espera una familia que la cuide y la convierta en parte de su vida.",
      "foto":"img/adopta/perro8.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorro 9",
      "especie": "perro",
      "sexo": "macho",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Un pequeño de pelaje canela y mirada atenta. Busca un hogar seguro donde pueda crecer acompañado y querido.",
      "foto":"img/adopta/perro9.webp",
      "destacadoInicio": false
    },
    {
      "nombre": "🐶 Cachorra 10",
      "especie": "perro",
      "sexo": "hembra",
      "edad": "cachorro",
      "estado": "Disponible",
      "descripcion": "Su pelaje negro con detalles canela le da una apariencia única. Busca una familia responsable que le brinde estabilidad, cuidados y cariño.",
      "foto":"img/adopta/perro10.webp",
      "destacadoInicio": false
    },
  ]
};
