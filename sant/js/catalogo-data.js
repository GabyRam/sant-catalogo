// ─────────────────────────────────────────────────────────────
//  js/catalogo-data.js
//
//  Fuente de verdad LOCAL para todo lo que Supabase no sabe:
//    · Rutas de imágenes por color
//    · Colores con su hex (#bg)
//    · Categoría (para filtrar por página)
//    · Descripción del producto
//    · Badges (nuevo, preventa, etc.)
//    · noTallas por color (si aplica)
//
//  Las tallas y colores disponibles los jala render-catalogo.js
//  de Supabase en tiempo real. Aquí solo metadatos que la BD no tiene.
//
//  AGREGAR PRODUCTO: añadir entrada con el SKU exacto de stock.
// ─────────────────────────────────────────────────────────────

const PRODUCTO_META = {

  // ── BIKERS ──────────────────────────────────────────────────
  'BIKERKW-001': {
    categoria:   'bikers',
    descripcion: 'Tela compresiva · Cintura alta · Sin costuras visibles · Bolsa lateral',
    imagenBase:  '../images/bikers/biker-negro.jpg',
    imagenesPorColor: {
      'Negro':   '../images/bikers/biker-negro.jpg',
      'Lavanda': '../images/bikers/biker-lavanda.jpg',
      'Azul':    '../images/bikers/biker-azul.jpg',
    },
    coloresMeta: {
      'Negro':   { bg: '#1a1a1a' },
      'Lavanda': { bg: '#A799BC' },
      'Azul':    { bg: '#adc1f4' },
    }
  },

  // ── CALCETAS ────────────────────────────────────────────────
  'CALCETAYOGA': {
    categoria:   'calcetas',
    descripcion: 'Antiderrapante · Diseño abierto en dedos · Ideal para yoga y pilates',
    imagenBase:  '../images/calcetas/calceta-yoga-blanca.jpg',
    imagenesPorColor: {
      'Blanco': '../images/calcetas/calceta-yoga-blanca.jpg',
      'Negro':  '../images/calcetas/calceta-yoga-negra.jpg',
    },
    coloresMeta: {
      'Blanco': { bg: '#f5f5f5' },
      'Negro':  { bg: '#1a1a1a' },
    }
  },
  'CALCETAMODABLANCA': {
    categoria:   'calcetas',
    descripcion: 'Calceta de moda · Diseño letras en blanco',
    imagenBase:  '../images/calcetas/calceta-blanca-have.jpg',
    imagenesPorColor: {
      '1966':      '../images/calcetas/calceta-blanca-1966.jpg',
      'Free Mind': '../images/calcetas/calceta-blanca-freemind.jpg',
      'Grateful':  '../images/calcetas/calceta-blanca-grateful.jpg',
      'Have':      '../images/calcetas/calceta-blanca-have.jpg',
      'Waht':      '../images/calcetas/calceta-blanca-waht.jpg',
    },
    coloresMeta: {
      '1966':      { bg: '#f5f5f5', esTexto: true },
      'Free Mind': { bg: '#f5f5f5', esTexto: true },
      'Grateful':  { bg: '#f5f5f5', esTexto: true },
      'Have':      { bg: '#f5f5f5', esTexto: true },
      'Waht':      { bg: '#f5f5f5', esTexto: true },
    }
  },
  'CALCETALISA': {
    categoria:   'calcetas',
    descripcion: 'Calceta de moda lisa · Colores sólidos',
    imagenBase:  '../images/calcetas/calceta-lisa-negro.jpg',
    imagenesPorColor: {
      'Negro': '../images/calcetas/calceta-lisa-negro.jpg',
      'Azul':  '../images/calcetas/calceta-lisa-azul.jpg',
      'Rosa':  '../images/calcetas/calceta-lisa-rosa.jpg',
      'Beige': '../images/calcetas/calceta-lisa-beige.jpg',
      'Hueso': '../images/calcetas/calceta-lisa-hueso.jpg',
    },
    coloresMeta: {
      'Negro': { bg: '#1a1a1a' },
      'Azul':  { bg: '#adc1f4' },
      'Rosa':  { bg: '#f0a8b8' },
      'Beige': { bg: '#e8c9a0' },
      'Hueso': { bg: '#e7e2dc' },
    }
  },
  'CALCETAMODADISENO': {
    categoria:   'calcetas',
    descripcion: 'Calceta de moda · Diseños gráficos',
    imagenBase:  '../images/calcetas/calceta-diseno-grateful.jpg',
    imagenesPorColor: {
      'Free Mind':  '../images/calcetas/calceta-diseno-freemind.jpg',
      'Grateful':   '../images/calcetas/calceta-diseno-grateful.jpg',
      'Live Smile': '../images/calcetas/calceta-diseno-livesmile.jpg',
      'Smile Out':  '../images/calcetas/calceta-diseno-smileout.jpg',
      'Waht':       '../images/calcetas/calceta-diseno-waht.jpg',
    },
    coloresMeta: {
      'Free Mind':  { bg: '#f5f5f5', esTexto: true },
      'Grateful':   { bg: '#f5f5f5', esTexto: true },
      'Live Smile': { bg: '#f5f5f5', esTexto: true },
      'Smile Out':  { bg: '#f5f5f5', esTexto: true },
      'Waht':       { bg: '#f5f5f5', esTexto: true },
    }
  },

  // ── CHAMARRAS ───────────────────────────────────────────────
  'JACKETPO-001': {
    categoria:   'chamarras',
    descripcion: 'Tela ligera · Capucha ajustable · Bolsas laterales con cierre · Corte slim',
    imagenBase:  '../images/chamarras/chamarra-negra.jpg',
    imagenesPorColor: {
      'Negro':       '../images/chamarras/chamarra-negra.jpg',
      'Gris oxford': '../images/chamarras/chamarra-gris.jpg',
    },
    coloresMeta: {
      'Negro':       { bg: '#1a1a1a' },
      'Gris oxford': { bg: '#6e7a8a' },
    }
  },
  'JACKETPO-002': {
    categoria:   'chamarras',
    descripcion: 'Tela deportiva · Manga larga · Cremallera frontal · Corte holgado',
    imagenBase:  '../images/chamarras/chamarra-deportiva-hueso.jpg',
    imagenesPorColor: {
      'Hueso':       '../images/chamarras/chamarra-deportiva-hueso.jpg',
      'Ivory':       '../images/chamarras/chamarra-deportiva-ivory.jpg',
      'Verde olivo': '../images/chamarras/chamarra-deportiva-verde.jpg',
    },
    coloresMeta: {
      'Hueso':       { bg: '#e7e2dc' },
      'Ivory':       { bg: '#f5f0e8' },
      'Verde olivo': { bg: '#6b7c5c' },
    }
  },
  'JACKETPO-003': {
    categoria:   'chamarras',
    descripcion: 'Tela polar · Ultra suave · Ideal para clima frío · Sin capucha',
    imagenBase:  '../images/chamarras/chamarra-polar-negra.jpg',
    imagenesPorColor: {
      'Negro':  '../images/chamarras/chamarra-polar-negra.jpg',
      'Blanco': '../images/chamarras/chamarra-polar-blanca.jpg',
    },
    coloresMeta: {
      'Negro':  { bg: '#1a1a1a' },
      'Blanco': { bg: '#f5f5f5' },
    }
  },
  'JACKETKW-001': {
    categoria:   'chamarras',
    descripcion: 'Tela básica · Manga larga · Cierre frontal · Bolsas laterales',
    imagenBase:  '../images/chamarras/chamarra-basica-negra.jpg',
    imagenesPorColor: {
      'Negro':       '../images/chamarras/chamarra-basica-negra.jpg',
      'Azul Marino': '../images/chamarras/chamarra-basica-azul.jpg',
      'Cafe':        '../images/chamarras/chamarra-basica-cafe.jpg',
    },
    coloresMeta: {
      'Negro':       { bg: '#1a1a1a' },
      'Azul Marino': { bg: '#2a385b' },
      'Cafe':        { bg: '#61341f' },
    }
  },

  // ── CROP TOPS ───────────────────────────────────────────────
  'CROPTOPKW-001': {
    categoria:   'crop-tops',
    descripcion: 'Cuello redondo · Tela suave · Fit ajustado · Largo crop',
    imagenBase:  '../images/crop-tops/crop-negro.jpg',
    imagenesPorColor: {
      'Negro':       '../images/crop-tops/crop-negro.jpg',
      'Blanco':      '../images/crop-tops/crop-blanco.jpg',
      'Lavanda':     '../images/crop-tops/crop-lavanda.jpg',
      'Azul':        '../images/crop-tops/crop-azul.jpg',
      'Azul marino': '../images/crop-tops/crop-azul-marino.jpg',
      'Esmeralda':   '../images/crop-tops/crop-esmeralda.jpg',
      'Vino':        '../images/crop-tops/crop-vino.jpg',
      'Gris':        '../images/crop-tops/crop-gris.jpg',
      'Gris oxford': '../images/crop-tops/crop-gris-oxford.jpg',
    },
    coloresMeta: {
      'Negro':       { bg: '#1a1a1a' },
      'Blanco':      { bg: '#f5f5f5' },
      'Lavanda':     { bg: '#c4b0d9' },
      'Azul':        { bg: '#adc1f4' },
      'Azul marino': { bg: '#2a385b' },
      'Esmeralda':   { bg: '#4999B4' },
      'Vino':        { bg: '#682d4d' },
      'Gris':        { bg: '#9e9e9e' },
      'Gris oxford': { bg: '#6e7a8a' },
    }
  },

  // ── FALDAS ──────────────────────────────────────────────────
  'SKIRTPO-001': {
    categoria:   'falda-teniss',
    descripcion: 'Falda plisada · Short interior integrado · Tela elástica · Cintura alta',
    imagenBase:  '../images/faldas/falda-tenis-negra.jpg',
    imagenesPorColor: {
      'Negro': '../images/faldas/falda-tenis-negra.jpg',
      'Azul':  '../images/faldas/falda-tenis-azul.jpg',
    },
    coloresMeta: {
      'Negro': { bg: '#1a1a1a' },
      'Azul':  { bg: '#adc1f4' },
    }
  },
  'SKIRTPO-002': {
    categoria:   'falda-teniss',
    descripcion: 'Falda bitono · Short interior · Tela elástica · Cintura alta · Diseño bicolor',
    imagenBase:  '../images/faldas/falda-bicolor-azul.jpg',
    imagenesPorColor: {
      'Amarillo Bicolor': '../images/faldas/falda-bicolor-amarillo.jpg',
      'Azul Bicolor':     '../images/faldas/falda-bicolor-azul.jpg',
    },
    coloresMeta: {
      'Amarillo Bicolor': { bg: '#f5c842' },
      'Azul Bicolor':     { bg: '#5a8fc7' },
    }
  },

  // ── JUMPER ──────────────────────────────────────────────────
  'JUMPERKW-001': {
    categoria:   'jumper',
    descripcion: 'Enterizo deportivo · Tela suave · Escote cuadrado · Short integrado',
    imagenBase:  '../images/jumper/jumper-negro.jpg',
    imagenesPorColor: {
      'Negro': '../images/jumper/jumper-negro.jpg',
      'Cafe':  '../images/jumper/jumper-cafe.jpg',
    },
    coloresMeta: {
      'Negro': { bg: '#1a1a1a' },
      'Cafe':  { bg: '#61341f' },
    }
  },

  // ── LEGGINGS ────────────────────────────────────────────────
  'LEGGINGKW-001': {
    categoria:   'leggings',
    descripcion: 'Cintura V · Tela transpirable · High support · Super soft · Bolsas laterales',
    badge:       'NUEVOS COLORES',
    imagenBase:  '../images/leggings/legging-negro-V.jpg',
    imagenesPorColor: {
      'Negro':       '../images/leggings/legging-negro-V.jpg',
      'Lavanda':     '../images/leggings/legging-lavanda.jpg',
      'Azul':        '../images/leggings/legging-azul.jpg',
      'Azul marino': '../images/leggings/legging-azul-marino.jpg',
      'Gris Oxford': '../images/leggings/legging-gris.jpg',
      'Rojo':        '../images/leggings/legging-rojo.jpeg',
      'Azul Rey':    '../images/leggings/legging-azul-rey.jpeg',
    },
    coloresMeta: {
      'Negro':       { bg: '#1a1a1a' },
      'Lavanda':     { bg: '#A799BC' },
      'Azul':        { bg: '#adc1f4' },
      'Azul marino': { bg: '#2a385b' },
      'Gris Oxford': { bg: '#808080' },
      'Rojo':        { bg: '#E2011B', noTallas: ['XL'] },
      'Azul Rey':    { bg: '#0B7FF2', noTallas: ['XL'] },
    }
  },
  'LEGGINGKW-002': {
    categoria:   'leggings',
    descripcion: 'Legging acampanado · Cintura V · Tela súper soft · Estiliza la figura',
    badge:       'NUEVOS COLORES',
    imagenBase:  '../images/leggings/legging-flare-esmeralda.jpeg',
    imagenesPorColor: {
      'Esmeralda': '../images/leggings/legging-flare-esmeralda.jpeg',
      'Vino':      '../images/leggings/legging-flare-vino.jpeg',
      'Cafe':      '../images/leggings/legging-flare-cafe.jpeg',
      'Negro':     '../images/leggings/legging-flare-negro.jpeg',
    },
    coloresMeta: {
      'Esmeralda': { bg: '#4999B4' },
      'Vino':      { bg: '#682d4d' },
      'Cafe':      { bg: '#61341f' },
      'Negro':     { bg: '#1a1a1a' },
    }
  },
  'LEGGINGKW-003': {
    categoria:   'leggings',
    descripcion: 'Tela Ultrasoft · Elástico forrado · Diseño corazón en trasero para estilizar',
    badge:       'Preventa',
    imagenBase:  '../images/leggings/legging-negro.jpg',
    imagenesPorColor: {
      'Negro': '../images/leggings/legging-negro.jpg',
      'Rosa':  '../images/leggings/legging-rosa.jpg',
    },
    coloresMeta: {
      'Negro': { bg: '#1a1a1a' },
      'Rosa':  { bg: '#DFA6B5' },
    }
  },
  'LEGGINGYOGA-001': {
    categoria:   'pantalon-yoga',
    descripcion: 'Pierna amplia · Tela suave y estructurada · Cintura alta con elástico',
    imagenBase:  '../images/pantalones/pantalon-yoga-negro.jpg',
    imagenesPorColor: {
      'Negro':       '../images/pantalones/pantalon-yoga-negro.jpg',
      'Azul marino': '../images/pantalones/pantalon-yoga-azul.jpg',
      'Gris oxford': '../images/pantalones/pantalon-yoga-gris.jpg',
    },
    coloresMeta: {
      'Negro':       { bg: '#1a1a1a' },
      'Azul marino': { bg: '#2a385b' },
      'Gris oxford': { bg: '#6e7a8a' },
    }
  },
  'LEGGINGYOGA-002': {
    categoria:   'leggings',
    descripcion: 'Tela suave · Pierna amplia · Elástico en cintura · Bolsa oculta trasera',
    imagenBase:  '../images/leggings/legging-yoga-cafe.jpg',
    imagenesPorColor: {
      'Cafe':  '../images/leggings/legging-yoga-cafe.jpg',
      'Hueso': '../images/leggings/legging-yoga-hueso.jpg',
    },
    coloresMeta: {
      'Cafe':  { bg: '#61341f' },
      'Hueso': { bg: '#e7e2dc' },
    }
  },

  // ── PLAYERAS ────────────────────────────────────────────────
  'PLAYERAPO-001': {
    categoria:   'playeras',
    descripcion: 'Tela técnica · Secado rápido · Corte holgado · Cuello redondo',
    imagenBase:  '../images/playeras/aura-runner-blanca.jpg',
    imagenesPorColor: {
      'Blanco':  '../images/playeras/aura-runner-blanca.jpg',
      'Durazno': '../images/playeras/aura-runner-durazno.jpg',
      'Azul':    '../images/playeras/aura-runner-azul.jpg',
    },
    coloresMeta: {
      'Blanco':  { bg: '#f5f5f5' },
      'Durazno': { bg: '#ffddd4' },
      'Azul':    { bg: '#adc1f4' },
    }
  },

  // ── SHORTS ──────────────────────────────────────────────────
  'SHORTKW-001': {
    categoria:   'shorts',
    descripcion: 'Cintura alta · Tela cómoda · Corte mid-thigh · Bolsas laterales',
    imagenBase:  '../images/shorts/short-negro.jpg',
    imagenesPorColor: {
      'Negro':   '../images/shorts/short-negro.jpg',
      'Azul':    '../images/shorts/short-azul.jpg',
      'Gris':    '../images/shorts/short-gris.jpg',
      'Lavanda': '../images/shorts/short-lavanda.jpg',
    },
    coloresMeta: {
      'Negro':   { bg: '#1a1a1a' },
      'Azul':    { bg: '#adc1f4' },
      'Gris':    { bg: '#9e9e9e' },
      'Lavanda': { bg: '#c4b0d9' },
    }
  },
  'SHORTKW-002': {
    categoria:   'shorts',
    descripcion: 'Diseño bicolor · Cintura alta · Corte mid-thigh · Tela elástica',
    imagenBase:  '../images/shorts/short-bicolor-negro.jpg',
    imagenesPorColor: {
      'Negro':     '../images/shorts/short-bicolor-negro.jpg',
      'Rojo':      '../images/shorts/short-bicolor-rojo.jpg',
      'Azul Rey':  '../images/shorts/short-bicolor-azul.jpg',
      'Rosa Neon': '../images/shorts/short-bicolor-rosa.jpg',
    },
    coloresMeta: {
      'Negro':     { bg: '#1a1a1a' },
      'Rojo':      { bg: '#c0392b' },
      'Azul Rey':  { bg: '#1a4a9e' },
      'Rosa Neon': { bg: '#ff6b9d' },
    }
  },

  // ── TOPS ────────────────────────────────────────────────────
  'TOPBRAKW-001': {
    categoria:   'tops',
    descripcion: 'Top bra · Soporte medio · Tela suave · Tirantes fijos',
    imagenBase:  '../images/tops/top-bra-negro.jpg',
    imagenesPorColor: {
      'Negro': '../images/tops/top-bra-negro.jpg',
      'Rosa':  '../images/tops/top-bra-rosa.jpg',
    },
    coloresMeta: {
      'Negro': { bg: '#1a1a1a' },
      'Rosa':  { bg: '#DFA6B5' },
    }
  },
  'TOPKW-001': {
    categoria:   'tops',
    descripcion: 'Top atlético · Tirantes cruzados · Tela compresiva · Soporte medio',
    imagenBase:  '../images/tops/top-atletico-negro.jpg',
    imagenesPorColor: {
      'Negro': '../images/tops/top-atletico-negro.jpg',
    },
    coloresMeta: {
      'Negro': { bg: '#1a1a1a' },
    }
  },
  'TOPKW-002': {
    categoria:   'tops',
    descripcion: 'Detalle de nudo frontal · Tela suave · Escote en V · Tirantes finos',
    imagenBase:  '../images/tops/top-nudo-negro.jpg',
    imagenesPorColor: {
      'Negro':       '../images/tops/top-nudo-negro.jpg',
      'Azul Marino': '../images/tops/top-nudo-azul.jpg',
    },
    coloresMeta: {
      'Negro':       { bg: '#1a1a1a' },
      'Azul Marino': { bg: '#2a385b' },
    }
  },
  'TOPKW-003': {
    categoria:   'tops',
    descripcion: 'Tirante ancho · Tela cómoda · Fit ajustado · Largo casual',
    imagenBase:  '../images/tops/top-tirante-ancho-negro.jpg',
    imagenesPorColor: {
      'Negro':       '../images/tops/top-tirante-ancho-negro.jpg',
      'Azul Marino': '../images/tops/top-tirante-ancho-azul.jpg',
    },
    coloresMeta: {
      'Negro':       { bg: '#1a1a1a' },
      'Azul Marino': { bg: '#2a385b' },
    }
  },
  'TOPKW-004': {
    categoria:   'tops',
    descripcion: 'Diseño asimétrico · Un hombro · Tela suave · Fit ajustado',
    imagenBase:  '../images/tops/top-asimetrico-negro.jpg',
    imagenesPorColor: {
      'Negro':    '../images/tops/top-asimetrico-negro.jpg',
      'Azul Rey': '../images/tops/top-asimetrico-azul.jpg',
      'Rojo':     '../images/tops/top-asimetrico-rojo.jpg',
    },
    coloresMeta: {
      'Negro':    { bg: '#1a1a1a' },
      'Azul Rey': { bg: '#1a4a9e' },
      'Rojo':     { bg: '#c0392b' },
    }
  },
  'TOPNY-001': {
    categoria:   'tops',
    descripcion: 'Top deportivo · Tela técnica · Secado rápido · Corte slim',
    imagenBase:  '../images/tops/top-deportivo-blanco.jpg',
    imagenesPorColor: {
      'Blanco':     '../images/tops/top-deportivo-blanco.jpg',
      'Rosa claro': '../images/tops/top-deportivo-rosa.jpg',
    },
    coloresMeta: {
      'Blanco':     { bg: '#f5f5f5' },
      'Rosa claro': { bg: '#f0a8b8' },
    }
  },
  'TOPNY-002': {
    categoria:   'tops',
    descripcion: 'Tirantes cruzados en espalda · Tela técnica · Soporte medio · Fit ajustado',
    imagenBase:  '../images/tops/top-tirantes-cruzados-negro.jpg',
    imagenesPorColor: {
      'Negro': '../images/tops/top-tirantes-cruzados-negro.jpg',
      'Rosa':  '../images/tops/top-tirantes-cruzados-rosa.jpg',
    },
    coloresMeta: {
      'Negro': { bg: '#1a1a1a' },
      'Rosa':  { bg: '#f0a8b8' },
    }
  },
  'TOPNY-003': {
    categoria:   'tops',
    descripcion: 'Largo extendido · Tela técnica · Ideal para yoga y pilates',
    imagenBase:  '../images/tops/top-deportivo-largo-negro.jpg',
    imagenesPorColor: {
      'Negro': '../images/tops/top-deportivo-largo-negro.jpg',
    },
    coloresMeta: {
      'Negro': { bg: '#1a1a1a' },
    }
  },
  'TOPNY-004': {
    categoria:   'tops',
    descripcion: 'Diseño bitono · Tela técnica · Manga corta · Cuello redondo',
    imagenBase:  '../images/tops/top-bicolor-azul.jpg',
    imagenesPorColor: {
      'Amarillo': '../images/tops/top-bicolor-amarillo.jpg',
      'Azul':     '../images/tops/top-bicolor-azul.jpg',
    },
    coloresMeta: {
      'Amarillo': { bg: '#f5c842' },
      'Azul':     { bg: '#7ba7c7' },
    }
  },
  'TANKKW-001': {
    categoria:   'tops',
    descripcion: 'Tank top · Tirantes anchos · Tela suave · Corte recto',
    imagenBase:  '../images/tops/tank-negro.jpg',
    imagenesPorColor: {
      'Negro':     '../images/tops/tank-negro.jpg',
      'Rojo':      '../images/tops/tank-rojo.jpg',
      'Azul Rey':  '../images/tops/tank-azul.jpg',
      'Rosa Neon': '../images/tops/tank-rosa.jpg',
    },
    coloresMeta: {
      'Negro':     { bg: '#1a1a1a' },
      'Rojo':      { bg: '#c0392b' },
      'Azul Rey':  { bg: '#1a4a9e' },
      'Rosa Neon': { bg: '#ff6b9d' },
    }
  },

  // ── VESTIDOS ────────────────────────────────────────────────
  'DRESSKW-001': {
    categoria:   'vestidos',
    descripcion: 'Vestido deportivo · Tela suave · Short interior · Corte midi',
    imagenBase:  '../images/vestidos/vestido-negro.jpg',
    imagenesPorColor: {
      'Negro': '../images/vestidos/vestido-negro.jpg',
      'Rosa':  '../images/vestidos/vestido-rosa.jpg',
    },
    coloresMeta: {
      'Negro': { bg: '#1a1a1a' },
      'Rosa':  { bg: '#DFA6B5' },
    }
  },

};

// ─────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────
function getProductoMeta(sku) {
  return PRODUCTO_META[sku] || null;
}

function getImagenPorColor(sku, color) {
  const meta = PRODUCTO_META[sku];
  if (!meta) return '';
  return meta.imagenesPorColor?.[color] || meta.imagenBase || '';
}
