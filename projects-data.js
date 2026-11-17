// Datos de proyectos originales extraídos del portafolio anterior.
const projects = [
  {
    id: 'portada-musical', title: 'ARTE DE PORTADA', category: 'Arte y tipografía', area: 'Diseño musical / Dirección de arte',
    tools: 'Photoshop · Illustrator',
    description: 'Propuesta gráfica para una portada musical de estética urbana. La fotografía, las letras expresivas y el contraste entre lo clásico y el grafiti construyen una identidad atrevida, llevada también a aplicaciones físicas de vinilo.',
    images: ['album-art.webp', 'album-vinyl.webp', 'album-shop.webp'],
    alt: ['Portada de disco con figura urbana en una calle de piedra', 'Portada musical aplicada a un disco de vinilo', 'Mockup de portada musical en una tienda de discos']
  },
  {
    id: 'citricos', title: 'CÍTRICOS EN MOVIMIENTO', category: 'Fotografía', area: 'Fotografía publicitaria / Producto',
    tools: 'Fotografía · Lightroom · Photoshop',
    description: 'Exploración fotográfica de una bebida a partir de movimiento congelado, salpicaduras, transparencia y color. La dirección de luz y el detalle de los ingredientes buscan transmitir frescura y energía.',
    images: ['citrus-two.webp', 'citrus-one.webp'],
    alt: ['Bebida cítrica con salpicadura y cítricos suspendidos', 'Fotografía de bebida cítrica con limón y hojas verdes']
  },
  {
    id: 'origen', title: 'ORIGEN', category: 'Identidad', area: 'Branding / Identidad y packaging',
    tools: 'Illustrator · Photoshop',
    description: 'Marca conceptual para un licor artesanal ecuatoriano inspirado en la guanchaca. Su símbolo de fuego y su tratamiento tipográfico reinterpretan una tradición popular desde una identidad visual sobria, poderosa y contemporánea.',
    images: ['origen-cover.webp', 'origen-packaging.webp', 'origen-mark.webp', 'origen-ad.webp'],
    alt: ['Logotipo ORIGEN con isotipo de llama', 'Diseño de etiqueta y envase de la marca ORIGEN', 'Sistema de identidad y logotipo ORIGEN', 'Aplicación publicitaria de ORIGEN']
  },
  {
    id: 'carbonell', title: 'EL ALMA DEL MARTINI', category: 'Fotografía', area: 'Fotografía de producto / Composición',
    tools: 'Fotografía · Lightroom · Photoshop',
    description: 'Fotografía conceptual de un martini con enfoque en la atmósfera, las sombras y las texturas del vidrio. Una composición minimalista de carácter elegante y cinematográfico.',
    images: ['martini.webp'],
    alt: ['Martini fotografiado en un ambiente oscuro con olivas']
  },
  {
    id: 'moska', title: 'MOSKA', category: 'Arte y tipografía', area: 'Tipografía experimental / Sistema visual',
    tools: 'Illustrator · Photoshop',
    description: 'Sistema tipográfico modular que transforma elementos visuales de la cultura rusa en un alfabeto expresivo. El proyecto explora ritmo, repetición, geometría y aplicación sobre diversos soportes.',
    images: ['moska-cover.webp', 'moska-alphabet.webp', 'moska-tote.webp', 'moska-matches.webp', 'moska-can.webp'],
    alt: ['Tipografía modular MOSKA sobre fondo ilustrado', 'Alfabeto modular desarrollado para MOSKA', 'Aplicación de MOSKA en bolsa de tela', 'Aplicación de MOSKA en caja de fósforos', 'Aplicación de MOSKA en envase'],
    link: 'https://www.behance.net/gallery/236518927/MOSKA-Sistemas-visuales', linkText: 'VER PROYECTO EN BEHANCE ↗'
  },
  {
    id: 'vip', title: '212 VIP BLACK', category: 'Fotografía', area: 'Fotografía publicitaria / Luz y sombra',
    tools: 'Fotografía · Lightroom · Photoshop',
    description: 'Estudio de iluminación de bajo perfil para fotografía de perfume. Los reflejos controlados y el fondo oscuro resaltan la materialidad del frasco y crean una imagen de alto contraste.',
    images: ['perfume.webp'],
    alt: ['Fotografía oscura de producto: perfume 212 VIP Black']
  },
  {
    id: 'aura', title: 'AURA STUDIO', category: 'Identidad', area: 'Branding / Identidad visual',
    tools: 'Illustrator · InDesign',
    description: 'Identidad conceptual para un estudio de diseño y fotografía nacido en Cuenca. Un símbolo radial, una paleta con azul y dorado y un sistema flexible de aplicaciones construyen una personalidad cercana y contemporánea.',
    images: ['aura-cover.webp', 'aura-grid.webp', 'aura-application.webp', 'aura-variants.webp'],
    alt: ['Logotipo azul de Aura Studio', 'Construcción geométrica del signo Aura', 'Aplicaciones fotográficas de la identidad Aura', 'Versiones de marca Aura Studio']
  },
  {
    id: 'encebollado', title: 'SABORES CON HISTORIA', category: 'Editorial', area: 'Diseño editorial / Ilustración',
    tools: 'InDesign · Illustrator · Photoshop',
    description: 'Proyecto editorial sobre el encebollado ecuatoriano y su relación con la memoria familiar. Combina ilustraciones, narrativa gastronómica y maquetación en un recetario con personalidad visual propia.',
    images: ['editorial-cover.webp', 'editorial-story.webp', 'editorial-ingredients.webp', 'editorial-end.webp'],
    alt: ['Portada ilustrada del libro El arte del encebollado', 'Interior editorial con narración familiar', 'Página ilustrada de ingredientes', 'Contraportada ilustrada del recetario']
  },
  {
    id: 'urbano', title: 'MIRADA URBANA', category: 'Fotografía', area: 'Fotografía en blanco y negro / Retrato',
    tools: 'Fotografía · Lightroom',
    description: 'Retrato urbano de un skater en un entorno arquitectónico. El blanco y negro, la perspectiva y el encuadre enfatizan la actitud del sujeto y la relación entre movimiento y espacio.',
    images: ['urban-photo.webp', 'polygon-portrait.webp'],
    alt: ['Retrato en blanco y negro de skater en calle urbana', 'Retrato geométrico construido con planos y polígonos']
  },
  {
    id: 'catedral', title: 'EL TESORO DE CUENCA', category: 'Editorial', area: 'Infografía / Diseño de información',
    tools: 'Illustrator · InDesign',
    description: 'Infografía dedicada a la Catedral de la Inmaculada Concepción de Cuenca. Integra ilustración arquitectónica, organización de datos y narrativa patrimonial en una composición editorial informativa.',
    images: ['cathedral-infographic.webp'],
    alt: ['Infografía ilustrada de la Catedral Nueva de Cuenca']
  },
  {
    id: 'vitrina', title: 'EL TALENTO EN LA VITRINA', category: 'Editorial', area: 'Visualización de datos / Campaña',
    tools: 'Illustrator · InDesign',
    description: 'Sistema de visualización que organiza variables de origen, plataformas, carreras e intereses para orientar una propuesta de comunicación. La información se convierte en una pieza gráfica para explorar patrones y hallazgos.',
    images: ['data-visualization.webp', 'data-visualization-two.webp'],
    alt: ['Gráficos de flujos de datos y hallazgos de la campaña', 'Gráficas de análisis de influencia y afinidad']
  },
  {
    id: 'barrio', title: 'DONDE EL BARRIO MANDA', category: 'Arte y tipografía', area: 'Composición tipográfica / Afiche',
    tools: 'Illustrator',
    description: 'Afiche experimental construido desde la fuerza de la letra. La composición combina cambios de escala, tensión tipográfica y una paleta de rojos y rosados para expresar una idea con carácter propio.',
    images: ['poster-barrio.webp'],
    alt: ['Cartel tipográfico rosa y rojo con frase sobre el barrio']
  }
];

