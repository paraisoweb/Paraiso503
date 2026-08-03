/* =============================================================================
   CONTENIDO: PROGRAMAS — Paraíso 503
   =============================================================================
   Para agregar un programa nuevo, copia uno de estos objetos, cámbiale el
   "id" (sin espacios ni tildes, se usa como enlace #id) y complétalo.
   No hace falta tocar el HTML ni el resto del JS.

   Campos de cada programa:
     id                 identificador único, usado en enlaces como programas.html#id
     icono              clase de icono Font Awesome, ej. fa-bone
     color              color del icono en formato hexadecimal
     titulo             nombre del programa
     descripcionLista   texto corto que se muestra en las tarjetas de la portada
     descripcionDetalle texto que se muestra como subtítulo/descripción larga en Programas
     queEs              texto (o array de párrafos) para la sección "¿Qué es?" del modal
                         de la tarjeta en la portada (null = se usa un texto de aviso
                         mientras no se complete)
     insignia           texto de la etiqueta destacada en la tarjeta de portada (null si no lleva)
     etiquetaDestacado  texto de la insignia sobre la foto en el detalle (null si no aplica)
     foto               ruta a la foto real (ej. "img/programas/alimentacion.webp"); null = imagen de referencia
     vistaInicio        "destacado" | "expandible" | "detalle" — dónde aparece en la portada
     enQueConsiste      array de párrafos (texto) para la sección "¿En qué consiste?"
     porQueExiste       array de párrafos (texto) para la sección "¿Por qué existe?"
     comoAyuda          array de 4 objetos {icono, titulo} para "¿Cómo ayuda este programa?"
     impacto            array de 3 objetos {numero, texto} para la sección "Impacto"
     galeria            array de rutas a fotos/videos del programa (ver ejemplo abajo)

   >>> PARA EDITAR EL CONTENIDO, CAMBIA SOLO LOS VALORES DE ABAJO. <<<
   No toques la primera línea ni la línea final "};".

   Para agregar fotos o videos a un programa, solo copia los archivos a una
   carpeta (ej. img/programas/alimentacion/) y agrega sus rutas al arreglo
   "galeria" de ese programa. No hace falta tocar HTML, CSS ni JS:
     "galeria": [
       "img/programas/alimentacion/1.webp",
       "img/programas/alimentacion/2.webp",
       "img/programas/alimentacion/3.webp"
     ]
   Se muestran las 3 primeras como miniaturas; si agregas más, el botón
   "Ver más fotos" revela el resto automáticamente. Videos (.mp4, .webm,
   .mov, .ogg, .m4v) se detectan por su extensión y se muestran con
   controles de reproducción.
   ============================================================================= */
window.PARAISO503_CONTENT = window.PARAISO503_CONTENT || {};
window.PARAISO503_CONTENT.programas = {
  "_ayuda": "Para agregar un programa nuevo, copia uno de estos objetos, cámbiale el 'id' (sin espacios ni tildes, se usa como enlace #id) y complétalo. No hace falta tocar el HTML ni el JS.",
  "_ayuda_campos": {
    "id": "identificador único, usado en enlaces como programas.html#id",
    "icono": "clase de icono Font Awesome, ej. fa-bone",
    "color": "color del icono en formato hexadecimal",
    "titulo": "nombre del programa",
    "descripcionLista": "texto corto que se muestra en las tarjetas de la portada",
    "descripcionDetalle": "texto que se muestra como subtítulo y descripción larga en la página de Programas",
    "queEs": "texto (o lista de párrafos, string[]) para la sección '¿Qué es?' del modal que se abre al tocar la tarjeta del programa en la portada. Usa null mientras no se complete",
    "insignia": "texto de la etiqueta destacada en la tarjeta de portada (ej. 'Programa principal'). Usa null si no lleva etiqueta",
    "etiquetaDestacado": "texto de la insignia sobre la foto en el detalle del programa. Usa null si no aplica",
    "foto": "ruta a la foto real del programa (ej. 'img/programas/alimentacion.webp'). Déjalo en null para usar una imagen de referencia automática mientras no haya foto",
    "vistaInicio": "controla dónde aparece en la portada — 'destacado': una de las 3 tarjetas visibles de inmediato · 'expandible': aparece al presionar 'Mostrar todos los programas' · 'detalle': solo aparece en la página de Programas, no en la portada",
    "enQueConsiste": "lista de párrafos (string[]) para la sección '¿En qué consiste?' en el detalle del programa",
    "porQueExiste": "lista de párrafos (string[]) para la sección '¿Por qué existe?' en el detalle del programa",
    "comoAyuda": "lista de 4 objetos {icono, titulo} para la sección '¿Cómo ayuda este programa?' (icono = clase Font Awesome)",
    "impacto": "lista de 3 objetos {numero, texto} para la sección 'Impacto' (numero = dato destacado corto, texto = descripción breve)",
    "galeria": "array de rutas a fotos o videos del programa (ej. 'img/programas/alimentacion/1.webp'). Se muestran las 3 primeras y el resto aparece al presionar 'Ver más fotos'. Videos: usa una ruta con extensión .mp4/.webm/.mov/.ogg/.m4v y se reproducen con controles. Vacío = se usan imágenes de referencia automáticas mientras no haya fotos reales."
  },
  "programas": [
    {
      "id": "alimentacion",
      "icono": "fa-bone",
      "color": "#3E7A4E",
      "titulo": "Ruta de Alimentación",
      "descripcionLista": "Cada día llevamos alimento y agua a animalitos que viven en las calles. Muchas de nuestras historias comienzan aquí.",
      "descripcionDetalle": "La Ruta de Alimentación es el corazón de Paraíso 503. Cada día recorremos diferentes comunidades llevando alimento y agua a animalitos que viven en situación de abandono, brindándoles una oportunidad mientras encontramos soluciones para cambiar su historia.",
      "queEs": "La Ruta de Alimentación es el programa que nos lleva, día tras día, a las calles donde muchos animalitos sobreviven solos. Recorremos comunidades enteras llevando comida y agua, y aprovechamos cada visita para detectar quiénes necesitan un rescate o atención médica urgente. Es el primer paso de casi todas nuestras historias de esperanza.",
      "insignia": "El corazón de Paraíso",
      "etiquetaDestacado": "El corazón de Paraíso 503",
      "foto": "img/program/rutas.webp",
      "vistaInicio": "destacado",
      "enQueConsiste": [
        "La Ruta de Alimentación se realiza todos los días en Flora Amarilla y zonas aledañas de San Juan Opico y Lourdes Colón. Además, semanalmente visitamos comunidades en Santa Ana, Sonsonate, Ahuachapán y San Salvador, y realizamos recorridos periódicos hacia San Vicente y San Miguel.",
        "Durante cada recorrido no solo llevamos alimento y agua. También identificamos nuevos casos de abandono, animalitos enfermos o heridos, brindamos primeros auxilios cuando es posible y coordinamos rescates para quienes necesitan atención inmediata.",
        "Cada salida representa una oportunidad para salvar una vida."
      ],
      "porQueExiste": [
        "Miles de animalitos sobreviven diariamente sin acceso a alimento, agua ni atención veterinaria. Muchos de ellos pasan completamente desapercibidos y enfrentan enfermedades, desnutrición o accidentes sin recibir ayuda.",
        "La Ruta de Alimentación nació para llegar hasta esos lugares donde la ayuda normalmente no llega, ofreciendo alivio inmediato y detectando casos que posteriormente pueden convertirse en rescates o tratamientos veterinarios.",
        "Porque muchas veces, una simple comida puede ser el primer paso para cambiar toda una vida."
      ],
      "comoAyuda": [
        {
          "icono": "fa-bowl-food",
          "titulo": "Alimentación diaria"
        },
        {
          "icono": "fa-triangle-exclamation",
          "titulo": "Detección de emergencias"
        },
        {
          "icono": "fa-life-ring",
          "titulo": "Canal de rescate"
        },
        {
          "icono": "fa-people-group",
          "titulo": "Conciencia comunitaria"
        }
      ],
      "impacto": [
        {
          "numero": "160+",
          "texto": "animalitos alimentados diariamente"
        },
        {
          "numero": "8",
          "texto": "departamentos de El Salvador con presencia"
        },
        {
          "numero": "3+ años",
          "texto": "realizando rutas de alimentación de forma constante"
        }
      ],
      "galeria": ["img/galeria/ruta1.webp","img/galeria/ruta2.webp","img/galeria/ruta3.webp"]
    },
    {
      "id": "cancer",
      "icono": "fa-ribbon",
      "color": "#8B5FBF",
      "titulo": "Lucha contra el Cáncer",
      "descripcionLista": "Acompañamos a animalitos con Tumor Venéreo Transmisible (TVT) y otros tipos de cáncer durante su tratamiento, dándoles una nueva oportunidad de salir adelante.",
      "descripcionDetalle": "El cáncer no siempre significa el final de una historia. En Paraíso 503 acompañamos a animalitos diagnosticados con diferentes tipos de cáncer, brindándoles tratamiento, seguimiento veterinario y los cuidados necesarios para que puedan luchar por una segunda oportunidad de vida.",
      "queEs": "Es el programa que acompaña a animalitos con cáncer, principalmente Tumor Venéreo Transmisible, brindándoles diagnóstico, tratamiento y seguimiento junto a nuestra veterinaria aliada Sanivet. Creemos que una enfermedad no debe significar el final de una historia, sino el inicio de una nueva oportunidad de vida.",
      "insignia": null,
      "etiquetaDestacado": null,
      "foto":"img/program/cancer.webp",
      "vistaInicio": "destacado",
      "enQueConsiste": [
        "Nuestro programa está enfocado principalmente en el tratamiento del Tumor Venéreo Transmisible (TVT), uno de los cánceres más comunes en perros rescatados. Además, atendemos casos de tumores mamarios, sarcomas y otras enfermedades oncológicas que requieren atención especializada.",
        "Cada paciente recibe una evaluación veterinaria, un plan de tratamiento personalizado y seguimiento durante todo su proceso de recuperación. Cuando es necesario, realizamos sesiones de quimioterapia y mantenemos un control constante de su evolución. Trabajamos de la mano con la veterinaria Sanivet, donde muchos de nuestros pacientes permanecen hospitalizados y reciben atención médica especializada hasta que su estado de salud les permite continuar con su recuperación."
      ],
      "porQueExiste": [
        "Muchos animalitos llegan al refugio con tumores avanzados o enfermedades que durante mucho tiempo no recibieron tratamiento. En muchos casos fueron abandonados precisamente por su condición de salud.",
        "Creemos que ningún animalito debe perder la oportunidad de vivir por falta de atención veterinaria. Por eso impulsamos este programa, para brindarles el tratamiento que necesitan y demostrar que, con el cuidado adecuado, muchos pueden recuperarse y volver a disfrutar de una vida digna."
      ],
      "comoAyuda": [
        {
          "icono": "fa-stethoscope",
          "titulo": "Diagnóstico y seguimiento"
        },
        {
          "icono": "fa-syringe",
          "titulo": "Quimioterapia y tratamientos"
        },
        {
          "icono": "fa-hospital",
          "titulo": "Hospitalización especializada"
        },
        {
          "icono": "fa-heart",
          "titulo": "Recuperación integral"
        }
      ],
      "impacto": [
        {
          "numero": "6+",
          "texto": "casos activos recibiendo tratamiento actualmente"
        },
        {
          "numero": "TVT",
          "texto": "tratamiento especializado para TVT, tumores mamarios y sarcomas"
        },
        {
          "numero": "Sanivet",
          "texto": "atención veterinaria continua junto a nuestro equipo médico"
        }
      ],
      "galeria": []
    },
    {
      "id": "adopciones-prog",
      "icono": "fa-house",
      "color": "#E08B7D",
      "titulo": "Adopciones Responsables",
      "descripcionLista": "Cada adopción cambia dos vidas: la de quien encuentra un hogar y la del siguiente animalito que podremos ayudar.",
      "descripcionDetalle": "Cada adopción representa el comienzo de una nueva historia. Nuestro programa busca encontrar hogares responsables para los animalitos rescatados, asegurando que cada uno reciba el amor, el cuidado y la estabilidad que merece para el resto de su vida.",
      "queEs": "Es el programa que conecta a animalitos rescatados con familias responsables, a través de entrevistas, evaluaciones y seguimiento antes y después de la adopción. Cada hogar que se abre no solo cambia una vida: también libera espacio para rescatar a otra.",
      "insignia": null,
      "etiquetaDestacado": null,
      "foto":"img/program/adopta.webp",
      "vistaInicio": "destacado",
      "enQueConsiste": [
        "El proceso de adopción está diseñado para garantizar el bienestar de cada animalito. Antes de entregar una adopción, realizamos entrevistas, evaluaciones y un seguimiento para conocer a la familia interesada y asegurarnos de que pueda ofrecer un hogar seguro y responsable.",
        "Las entrevistas pueden realizarse de forma presencial o a través de WhatsApp, facilitando el proceso para personas de diferentes lugares del país.",
        "Después de la adopción mantenemos comunicación con la familia para conocer la adaptación del animalito y brindar orientación cuando sea necesario. Además, gracias al apoyo de Sanivet, las familias adoptantes pueden acceder a beneficios en servicios veterinarios para los animalitos rescatados."
      ],
      "porQueExiste": [
        "Muchos animalitos permanecen durante meses o incluso años esperando una familia. Nuestro objetivo no es solo rescatarlos, sino ayudarles a encontrar un hogar donde sean queridos y protegidos para siempre.",
        "Una adopción responsable no solo transforma la vida del animalito, también permite que podamos abrir espacio para rescatar a otros que siguen esperando ayuda."
      ],
      "comoAyuda": [
        {
          "icono": "fa-heart",
          "titulo": "Búsqueda de familias responsables"
        },
        {
          "icono": "fa-clipboard-list",
          "titulo": "Proceso de adopción"
        },
        {
          "icono": "fa-mobile-screen",
          "titulo": "Seguimiento posterior"
        },
        {
          "icono": "fa-stethoscope",
          "titulo": "Beneficios veterinarios"
        }
      ],
      "impacto": [
        {
          "numero": "15+",
          "texto": "adopciones realizadas durante este año"
        },
        {
          "numero": "100%",
          "texto": "seguimiento personalizado después de cada adopción"
        },
        {
          "numero": "Nueva oportunidad",
          "texto": "cada adopción abre espacio para rescatar otra vida"
        }
      ],
      "galeria": []
    },
    {
      "id": "esterilizacion",
      "icono": "fa-scissors",
      "color": "#2F9E8F",
      "titulo": "Esterilización",
      "descripcionLista": "La esterilización es una de las formas más efectivas de prevenir el abandono y ofrecer un mejor futuro a más vidas.",
      "descripcionDetalle": "La esterilización es una de las herramientas más importantes para reducir el abandono animal. A través de este programa promovemos jornadas y procedimientos responsables que ayudan a prevenir camadas no deseadas y mejoran la calidad de vida de cientos de animalitos.",
      "queEs": "Es el programa que impulsa jornadas de esterilización seguras para perros y gatos, en coordinación con Sanivet, con acompañamiento completo durante la recuperación. Cada procedimiento previene camadas no deseadas y ayuda a reducir el abandono animal.",
      "insignia": null,
      "etiquetaDestacado": null,
      "foto":"img/program/esterilizacion.webp",
      "vistaInicio": "expandible",
      "enQueConsiste": [
        "Realizamos campañas de esterilización en coordinación con la veterinaria Sanivet, brindando a perros y gatos la oportunidad de acceder a un procedimiento seguro y acompañado por profesionales.",
        "Cada paciente recibe una evaluación previa, atención durante la cirugía y un seguimiento posterior para asegurar una recuperación adecuada.",
        "Después de la cirugía, los animalitos permanecen hospitalizados bajo la supervisión de Paraíso 503. Nuestro equipo acompaña su recuperación, administra medicamentos cuando es necesario, los ayuda con sus cuidados diarios, los saca a realizar sus necesidades y permanece pendiente de su evolución hasta que estén listos para regresar al lugar que les corresponde o continuar con su proceso de recuperación."
      ],
      "porQueExiste": [
        "Nuestro compromiso no termina al finalizar la cirugía; acompañamos cada etapa del proceso para brindarles la mejor oportunidad de recuperarse.",
        "Cada esterilización representa una oportunidad para reducir el nacimiento de camadas que podrían terminar sin un hogar."
      ],
      "comoAyuda": [
        {
          "icono": "fa-hospital",
          "titulo": "Cirugías seguras"
        },
        {
          "icono": "fa-heart",
          "titulo": "Recuperación acompañada"
        },
        {
          "icono": "fa-book",
          "titulo": "Educación y orientación"
        },
        {
          "icono": "fa-earth-americas",
          "titulo": "Prevención del abandono"
        }
      ],
      "impacto": [
        {
          "numero": "Sanivet",
          "texto": "campañas realizadas en coordinación con nuestra veterinaria aliada"
        },
        {
          "numero": "100%",
          "texto": "recuperación acompañada por el equipo de Paraíso 503"
        },
        {
          "numero": "Menos abandono",
          "texto": "cada esterilización previene camadas no deseadas"
        }
      ],
      "galeria": []
    },
    {
      "id": "hogar",
      "icono": "fa-heart",
      "color": "#D9636B",
      "titulo": "Hogar Paraíso",
      "descripcionLista": "Aquí reciben alimento, cuidados y mucho cariño mientras se recuperan o esperan una familia.",
      "descripcionDetalle": "Hogar Paraíso es el lugar donde los animalitos rescatados encuentran seguridad, atención y una nueva oportunidad para vivir. Aquí reciben el tiempo, los cuidados y el cariño que necesitan mientras completan su recuperación o esperan encontrar una familia que los adopte responsablemente.",
      "queEs": "Es el refugio donde los animalitos rescatados encuentran seguridad, alimento y cariño mientras se recuperan o esperan una familia. Un espacio pensado para sanar, recobrar la confianza y prepararse para una nueva etapa de vida.",
      "insignia": null,
      "etiquetaDestacado": null,
      "foto":"img/program/paraiso.webp",
      "vistaInicio": "expandible",
      "enQueConsiste": [
        "Hogar Paraíso alberga a animalitos que han superado situaciones de abandono, maltrato, enfermedades, accidentes o tratamientos médicos complejos, como los pacientes que lograron recuperarse del cáncer y otras enfermedades.",
        "Muchos de ellos permanecen con nosotros mientras recuperan fuerzas y continúan adaptándose a una nueva vida. Otros encuentran aquí un hogar temporal mientras se les busca una familia responsable, y algunos, debido a su edad o condición de salud, permanecen bajo nuestro cuidado por más tiempo.",
        "Cada uno recibe alimentación diaria, agua limpia, seguimiento veterinario, un espacio seguro y, sobre todo, el cariño y la tranquilidad que durante mucho tiempo les hicieron falta."
      ],
      "porQueExiste": [
        "No todos los animalitos rescatados están listos para regresar inmediatamente a una familia o continuar su vida sin apoyo. Algunos necesitan tiempo para recuperarse física y emocionalmente; otros requieren tratamientos prolongados o cuidados especiales antes de poder ser adoptados.",
        "Hogar Paraíso existe para ofrecerles ese espacio donde puedan sanar, recuperar la confianza y prepararse para la siguiente etapa de su vida, sin volver a enfrentar el abandono o los peligros de la calle.",
        "Porque después de ser rescatados, también merecen un lugar donde sentirse seguros."
      ],
      "comoAyuda": [
        {
          "icono": "fa-house",
          "titulo": "Hogar temporal"
        },
        {
          "icono": "fa-heart",
          "titulo": "Recuperación integral"
        },
        {
          "icono": "fa-utensils",
          "titulo": "Cuidados diarios"
        },
        {
          "icono": "fa-paw",
          "titulo": "Una nueva oportunidad"
        }
      ],
      "impacto": [
        {
          "numero": "60+",
          "texto": "animalitos con hogar actualmente"
        },
        {
          "numero": "Espacio seguro",
          "texto": "para quienes continúan recuperándose de un rescate o tratamiento"
        },
        {
          "numero": "Hogar temporal",
          "texto": "para animalitos que esperan una adopción responsable"
        }
      ],
      "galeria": []
    },
    {
      "id": "veterinaria",
      "icono": "fa-stethoscope",
      "color": "#3E7FBF",
      "titulo": "Atención Veterinaria",
      "descripcionLista": "Brindamos atención médica, tratamientos y seguimiento para que cada vida tenga la oportunidad de recuperarse.",
      "descripcionDetalle": "La salud es el primer paso para cambiar una vida. A través de nuestro programa de Atención Veterinaria brindamos diagnósticos, tratamientos y seguimiento médico a animalitos rescatados y a mascotas de familias que necesitan apoyo para acceder a servicios veterinarios.",
      "queEs": "Es el programa que brinda diagnóstico, tratamiento y seguimiento médico a animalitos rescatados y también a mascotas de familias con pocos recursos. Porque la salud es siempre el primer paso para cambiar una vida.",
      "insignia": null,
      "etiquetaDestacado": null,
      "foto":"img/program/atencion.webp",
      "vistaInicio": "expandible",
      "enQueConsiste": [
        "Cada animalito que llega a Paraíso 503 recibe una evaluación veterinaria para conocer su estado de salud y determinar el tratamiento que necesita.",
        "Atendemos casos de desnutrición, infecciones, enfermedades de la piel, fracturas, heridas, parásitos, tumores y muchas otras condiciones que requieren atención médica. Dependiendo de cada caso, los pacientes reciben medicamentos, curaciones, hospitalización, controles periódicos y seguimiento hasta completar su recuperación. Además, apoyamos a familias de escasos recursos que necesitan atención veterinaria para sus mascotas, orientándolas y facilitando el acceso a los tratamientos cuando está a nuestro alcance."
      ],
      "porQueExiste": [
        "Muchos animalitos viven durante meses o incluso años sin recibir atención veterinaria. Cuando finalmente son rescatados, suelen presentar enfermedades avanzadas que requieren tratamiento inmediato.",
        "Creemos que toda vida merece la oportunidad de recibir atención médica digna, sin importar su condición o su historia.",
        "Por eso este programa busca brindar el cuidado necesario para aliviar el sufrimiento, recuperar la salud y mejorar la calidad de vida de cada paciente."
      ],
      "comoAyuda": [
        {
          "icono": "fa-stethoscope",
          "titulo": "Diagnóstico oportuno"
        },
        {
          "icono": "fa-pills",
          "titulo": "Tratamientos médicos"
        },
        {
          "icono": "fa-hospital",
          "titulo": "Hospitalización y seguimiento"
        },
        {
          "icono": "fa-handshake",
          "titulo": "Apoyo a familias"
        }
      ],
      "impacto": [
        {
          "numero": "Atención integral",
          "texto": "para animalitos rescatados y mascotas de familias de bajos recursos"
        },
        {
          "numero": "Seguimiento",
          "texto": "médico durante todo el proceso de recuperación"
        },
        {
          "numero": "A la medida",
          "texto": "tratamientos adaptados a las necesidades de cada paciente"
        }
      ],
      "galeria": []
    },
    {
      "id": "apoyo",
      "icono": "fa-handshake-angle",
      "color": "#E08A3D",
      "titulo": "Apoyo a Familias de Bajos Recursos",
      "descripcionLista": "Ayudamos a familias de bajos recursos para que sus animalitos reciban alimento, atención y una vida más saludable.",
      "descripcionDetalle": "Creemos que muchas veces, ayudar a una familia también significa salvar la vida de un animalito. A través de este programa brindamos apoyo a personas de escasos recursos para que puedan seguir cuidando a sus mascotas y evitar que la falta de recursos se convierta en una causa de abandono.",
      "queEs": "Es el programa que acompaña a familias de escasos recursos con alimento, medicamentos y orientación veterinaria para sus mascotas. Porque ayudar a una familia a seguir cuidando a su animalito también es una forma de prevenir el abandono.",
      "insignia": null,
      "etiquetaDestacado": null,
      "foto":"img/program/familia.webp",
      "vistaInicio": "expandible",
      "enQueConsiste": [
        "Muchas familias desean cuidar a sus animalitos, pero en ocasiones enfrentan dificultades para cubrir gastos como alimento, medicamentos o atención veterinaria.",
        "Por medio de este programa brindamos apoyo según las necesidades de cada caso, ofreciendo alimento cuando está a nuestro alcance, facilitando medicamentos, orientación sobre los cuidados que requiere cada mascota y acompañamiento durante su recuperación. Cuando un caso necesita atención médica especializada, coordinamos su evaluación y tratamiento con la veterinaria Sanivet, buscando siempre la mejor alternativa para el bienestar del animalito.",
        "Nuestro objetivo no es sustituir la responsabilidad de las familias, sino acompañarlas para que puedan seguir cuidando a quienes forman parte de su hogar."
      ],
      "porQueExiste": [
        "No todos los casos de sufrimiento animal comienzan con el abandono. Muchas veces existen familias que aman profundamente a sus mascotas, pero atraviesan momentos económicos difíciles que les impiden brindarles toda la atención que necesitan.",
        "Creemos que ofrecer una mano en esos momentos puede marcar la diferencia entre conservar un hogar lleno de amor o perderlo por falta de recursos.",
        "Apoyar a una familia también es una forma de prevenir el abandono y proteger una vida."
      ],
      "comoAyuda": [
        {
          "icono": "fa-utensils",
          "titulo": "Apoyo con alimento"
        },
        {
          "icono": "fa-pills",
          "titulo": "Medicamentos y tratamientos"
        },
        {
          "icono": "fa-stethoscope",
          "titulo": "Orientación veterinaria"
        },
        {
          "icono": "fa-heart",
          "titulo": "Acompañamiento responsable"
        }
      ],
      "impacto": [
        {
          "numero": "Apoyo directo",
          "texto": "a familias de escasos recursos y sus mascotas"
        },
        {
          "numero": "Orientación",
          "texto": "para mejorar el cuidado y bienestar de los animalitos"
        },
        {
          "numero": "Prevención",
          "texto": "del abandono mediante el acompañamiento y la ayuda responsable"
        }
      ],
      "galeria": []
    },
    {
      "id": "visitas",
      "icono": "fa-truck",
      "color": "#D9A62E",
      "titulo": "Visitas Solidarias",
      "descripcionLista": "Abrimos las puertas de Paraíso para que más personas conozcan nuestra labor y compartan tiempo con ellos.",
      "descripcionDetalle": "Las Visitas Solidarias permiten que más personas conozcan de cerca la realidad de Paraíso 503. A través de este programa, abrimos nuestras puertas para que quienes nos visitan puedan convivir con los animalitos, conocer su historia y ver de primera mano el trabajo que realizamos cada día.",
      "queEs": "Es el programa que abre las puertas de Hogar Paraíso para que más personas conozcan de cerca nuestro trabajo, convivan con los animalitos y descubran sus historias de recuperación. Una experiencia que construye confianza y conciencia sobre el bienestar animal.",
      "insignia": null,
      "etiquetaDestacado": null,
      "foto":"img/program/visita.webp",
      "vistaInicio": "expandible",
      "enQueConsiste": [
        "Las personas que participan en una Visita Solidaria tienen la oportunidad de recorrer Hogar Paraíso, conocer a los animalitos rescatados y observar cómo se desarrolla el trabajo diario del proyecto.",
        "Durante la visita también pueden conocer algunos de los casos que actualmente reciben tratamiento, como pacientes con cáncer, animalitos en recuperación o aquellos que requieren cuidados especiales.",
        "Más que una visita, buscamos crear un espacio donde las personas comprendan la realidad del abandono animal y el esfuerzo que implica brindar una segunda oportunidad a cada vida que llega a Paraíso 503."
      ],
      "porQueExiste": [
        "Muchas veces las personas conocen nuestro trabajo únicamente a través de fotografías o publicaciones en redes sociales. Sin embargo, vivir la experiencia en persona permite comprender mejor el compromiso, la dedicación y el amor que hay detrás de cada rescate. Creemos que la mejor forma de generar confianza es abrir nuestras puertas y mostrar nuestro trabajo con total transparencia.",
        "Cada visita también ayuda a crear conciencia sobre el respeto, la protección y el bienestar animal."
      ],
      "comoAyuda": [
        {
          "icono": "fa-house",
          "titulo": "Conociendo Hogar Paraíso"
        },
        {
          "icono": "fa-stethoscope",
          "titulo": "Conociendo historias de recuperación"
        },
        {
          "icono": "fa-heart",
          "titulo": "Generando conciencia"
        },
        {
          "icono": "fa-handshake",
          "titulo": "Construyendo confianza"
        }
      ],
      "impacto": [
        {
          "numero": "Visitas guiadas",
          "texto": "para conocer el trabajo de Paraíso 503"
        },
        {
          "numero": "Convivencia",
          "texto": "espacios para convivir con los animalitos y conocer sus historias"
        },
        {
          "numero": "Cultura de respeto",
          "texto": "promoción de la empatía y la protección animal"
        }
      ],
      "galeria": []
    },
    {
      "id": "transparencia",
      "icono": "fa-clipboard-list",
      "color": "#8A6D4E",
      "titulo": "Transparencia",
      "descripcionLista": "Compartimos cómo utilizamos cada donación y el impacto que genera en la vida de quienes más lo necesitan.",
      "descripcionDetalle": "La confianza se construye con hechos. Por eso creemos que la transparencia forma parte de nuestro compromiso con cada persona que apoya, visita o cree en la misión de Paraíso 503. Nuestro trabajo está respaldado por información clara, rendición de cuentas y la convicción de que cada ayuda debe reflejarse en acciones que beneficien directamente a nuestros animalitos.",
      "queEs": "Es el compromiso de mostrar con claridad cómo se usa cada donación y el impacto real que genera. Compartimos avances, resultados e información sobre nuestra gestión, porque la confianza se construye con hechos, todos los días.",
      "insignia": null,
      "etiquetaDestacado": null,
      "foto":"img/program/transparencia.webp",
      "vistaInicio": "expandible",
      "enQueConsiste": [
        "A través de este programa compartimos información sobre el desarrollo de nuestros proyectos, las actividades realizadas y el destino de los recursos que recibimos. Publicamos resultados, avances, fotografías y reportes que permiten conocer cómo se transforma cada apoyo en alimento, tratamientos médicos, rescates, rehabilitación y bienestar para nuestros animalitos.",
        "Además, cuando es necesario, podemos presentar registros e información relacionada con los gastos y actividades realizadas, reafirmando nuestro compromiso con una gestión responsable."
      ],
      "porQueExiste": [
        "Creemos que la confianza se gana todos los días.",
        "Las personas que deciden apoyar nuestra labor merecen conocer el impacto que genera su ayuda y la forma en que trabajamos para cumplir nuestra misión.",
        "Ser transparentes no es únicamente informar; es demostrar con acciones que cada decisión busca mejorar la vida de los animalitos que dependen de nosotros."
      ],
      "comoAyuda": [
        {
          "icono": "fa-file-invoice",
          "titulo": "Rendición de cuentas"
        },
        {
          "icono": "fa-camera",
          "titulo": "Evidencia del impacto"
        },
        {
          "icono": "fa-handshake",
          "titulo": "Confianza para quienes apoyan"
        },
        {
          "icono": "fa-heart",
          "titulo": "Un compromiso permanente"
        }
      ],
      "impacto": [
        {
          "numero": "Información clara",
          "texto": "sobre nuestras actividades y programas"
        },
        {
          "numero": "Publicación constante",
          "texto": "de avances e historias de nuestros animalitos"
        },
        {
          "numero": "Gestión responsable",
          "texto": "compromiso con una administración transparente"
        }
      ],
      "galeria": []
    },
    {
      "id": "rehabilitacion",
      "icono": "fa-crutch",
      "color": "#5B8C5A",
      "titulo": "Rehabilitación y Recuperación",
      "descripcionLista": "Acompañamos a quienes necesitan tiempo para sanar física y emocionalmente antes de comenzar una nueva etapa.",
      "descripcionDetalle": "Cada rescate es diferente y algunos animalitos necesitan mucho más que un tratamiento médico para volver a tener una vida digna. A través de nuestro programa de Rehabilitación acompañamos su recuperación física y emocional, brindándoles el tiempo, los cuidados y la paciencia que necesitan para volver a confiar y disfrutar de una nueva oportunidad.",
      "queEs": "Es el programa que acompaña a animalitos que necesitan tiempo, cuidados y paciencia para sanar física y emocionalmente después de un rescate. Porque recuperar la salud no siempre basta: muchos también necesitan volver a confiar.",
      "insignia": null,
      "etiquetaDestacado": null,
      "foto":"img/program/rehabilitacion.webp",
      "vistaInicio": "expandible",
      "enQueConsiste": [
        "Recibimos animalitos que han sufrido accidentes, abandono, maltrato, desnutrición, fracturas, enfermedades o condiciones que requieren un proceso de recuperación prolongado.",
        "Cada caso recibe un plan de atención adaptado a sus necesidades, combinando tratamiento veterinario, alimentación adecuada, seguimiento constante y un entorno seguro donde puedan recuperarse sin volver a enfrentar los peligros de la calle.",
        "La rehabilitación también incluye ayudarles a recuperar la confianza en las personas, especialmente en aquellos que han vivido experiencias de abandono o maltrato."
      ],
      "porQueExiste": [
        "No todos los rescates terminan cuando un animalito recibe atención médica. Muchos necesitan semanas o incluso meses para recuperar su movilidad, su peso, su salud o simplemente volver a sentirse seguros.",
        "Creemos que cada vida merece el tiempo necesario para sanar por completo. Por eso este programa acompaña a cada paciente durante todo su proceso de recuperación, respetando su ritmo y sus necesidades."
      ],
      "comoAyuda": [
        {
          "icono": "fa-crutch",
          "titulo": "Recuperación física"
        },
        {
          "icono": "fa-heart",
          "titulo": "Recuperación emocional"
        },
        {
          "icono": "fa-house",
          "titulo": "Un entorno protegido"
        },
        {
          "icono": "fa-paw",
          "titulo": "Preparación para una nueva vida"
        }
      ],
      "impacto": [
        {
          "numero": "Recuperación",
          "texto": "de animalitos con lesiones, enfermedades y condiciones especiales"
        },
        {
          "numero": "A la medida",
          "texto": "procesos de rehabilitación adaptados a las necesidades de cada paciente"
        },
        {
          "numero": "Segunda oportunidad",
          "texto": "para quienes más tiempo necesitan para sanar"
        }
      ],
      "galeria": []
    },
    {
      "id": "emergencias",
      "icono": "fa-truck-medical",
      "color": "#C0504D",
      "titulo": "Rescate y Atención de Emergencias",
      "descripcionLista": "Respondemos a casos urgentes de abandono, accidentes y maltrato para brindar atención inmediata cuando más se necesita.",
      "descripcionDetalle": "Cada rescate comienza con una decisión: actuar. A través de este programa respondemos a casos de emergencia y brindamos atención a animalitos que se encuentran en situación de abandono, enfermedad, accidentes o riesgo inminente, ofreciéndoles la oportunidad de recibir ayuda cuando más la necesitan.",
      "queEs": "Es el programa de respuesta inmediata ante casos de abandono, accidentes y maltrato. Actuamos rápido, ya sea durante nuestras Rutas de Alimentación o por reportes de la comunidad, para brindar atención cuando más se necesita.",
      "insignia": null,
      "etiquetaDestacado": null,
      "foto":"img/program/rescate.webp",
      "vistaInicio": "expandible",
      "enQueConsiste": [
        "Muchos de nuestros rescates nacen durante las Rutas de Alimentación. Mientras recorremos diferentes comunidades, identificamos animalitos que necesitan ayuda y les damos seguimiento hasta encontrar el momento adecuado para ponerlos a salvo. También recibimos reportes de la comunidad a través de nuestras redes sociales y otros medios de contacto. Cuando se trata de casos graves o urgentes, evaluamos la situación y actuamos lo más pronto posible para brindar la atención que el animalito necesita.",
        "Una vez rescatado, inicia un proceso que puede incluir atención veterinaria, hospitalización, rehabilitación, alimentación y todos los cuidados necesarios para darle una nueva oportunidad de vida."
      ],
      "porQueExiste": [
        "Cada día hay animalitos que enfrentan situaciones críticas y que, sin ayuda oportuna, difícilmente podrían sobrevivir.",
        "Creemos que ninguna vida debe ser ignorada cuando existe la posibilidad de ayudar. Por eso mantenemos el compromiso de responder a los casos que realmente requieren una intervención inmediata, priorizando siempre el bienestar y la seguridad de cada animalito."
      ],
      "comoAyuda": [
        {
          "icono": "fa-truck-medical",
          "titulo": "Respuesta a emergencias"
        },
        {
          "icono": "fa-dog",
          "titulo": "Seguimiento durante las rutas"
        },
        {
          "icono": "fa-stethoscope",
          "titulo": "Primeros cuidados"
        },
        {
          "icono": "fa-heart",
          "titulo": "Una nueva oportunidad"
        }
      ],
      "impacto": [
        {
          "numero": "Respuesta rápida",
          "texto": "a reportes de emergencia y casos prioritarios"
        },
        {
          "numero": "Seguimiento",
          "texto": "a animalitos identificados durante las Rutas de Alimentación"
        },
        {
          "numero": "Nueva vida",
          "texto": "rescates que inician procesos de atención veterinaria, rehabilitación y recuperación"
        }
      ],
      "galeria": []
    },
    {
      "id": "voluntariado",
      "icono": "fa-people-group",
      "color": "#5C6FBF",
      "titulo": "Voluntariado",
      "descripcionLista": "Cada voluntario aporta tiempo, esfuerzo y cariño para transformar más vidas y hacer posible nuestra misión.",
      "descripcionDetalle": "Detrás de cada rescate hay personas que deciden dedicar parte de su tiempo para cambiar la vida de un animalito. Nuestro programa de Voluntariado reúne a quienes desean servir con empatía, compromiso y amor, convirtiéndose en parte de la familia de Paraíso 503.",
      "queEs": "Es el programa que reúne a personas dispuestas a dar su tiempo, esfuerzo y cariño para apoyar la labor diaria de Paraíso 503: alimentación, paseos, limpieza y mucho más. Cada voluntario se convierte en parte de esta familia y transforma vidas, incluida la suya.",
      "insignia": null,
      "etiquetaDestacado": null,
      "foto":"img/program/voluntario.webp",
      "vistaInicio": "expandible",
      "enQueConsiste": [
        "Las personas que forman parte de nuestro programa de voluntariado tienen la oportunidad de vivir de cerca la experiencia de ayudar a los animalitos de Paraíso 503.",
        "No importa si dispones de unas horas, un día o deseas colaborar de forma constante. Siempre hay diferentes actividades en las que puedes participar según tu tiempo, tus habilidades y las necesidades del proyecto.",
        "Podrás apoyar en la alimentación, limpieza de las instalaciones, paseos, socialización de los animalitos, actividades recreativas, jornadas especiales, eventos y muchas otras dinámicas que contribuyen a mejorar su bienestar.",
        "Cada visita, cada esfuerzo y cada momento compartido hacen una diferencia en la vida de quienes más lo necesitan."
      ],
      "porQueExiste": [
        "Creemos que cualquier persona puede convertirse en parte del cambio.",
        "Muchas veces solo hace falta un poco de tiempo, disposición y amor por los animalitos para transformar su día y regalarles momentos de cariño, compañía y esperanza.",
        "Por eso abrimos nuestras puertas a quienes desean vivir esta experiencia, conocer nuestro trabajo y aportar de diferentes maneras al bienestar de nuestros residentes."
      ],
      "comoAyuda": [
        {
          "icono": "fa-broom",
          "titulo": "Apoyo en las actividades diarias"
        },
        {
          "icono": "fa-dog",
          "titulo": "Tiempo de calidad"
        },
        {
          "icono": "fa-champagne-glasses",
          "titulo": "Participación en dinámicas y eventos"
        },
        {
          "icono": "fa-heart",
          "titulo": "Una experiencia que transforma vidas"
        }
      ],
      "impacto": [
        {
          "numero": "Manos que ayudan",
          "texto": "voluntarios que colaboran en las actividades diarias del refugio"
        },
        {
          "numero": "Tiempo de calidad",
          "texto": "paseos, juegos y cariño que forman parte de la recuperación"
        },
        {
          "numero": "Vidas que se transforman",
          "texto": "tanto la de los animalitos como la de quienes participan"
        }
      ],
      "galeria": []
    }
  ]
};
