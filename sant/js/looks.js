// ─────────────────────────────────────────────────────────────
//  DATOS DE LOOKS
// ─────────────────────────────────────────────────────────────
const LOOKS_DATA = {

    'corazon-nudo': {
        titulo: 'Heart & Knot',
        subtitulo: 'Romantic',
        descripcion: 'Un look que combina suavidad y estructura. El top de nudo aporta un toque romántico, mientras que el legging de cintura alta ofrece soporte y estilo.',
        imagen: 'images/lifestyle/corazon-rosa-nudo-azul.jpg',
        numero: '01',
        prendas: [
            {
                nombre: 'Top Bra',
                sku: 'TOPBRAKW-001',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Rosa', bg: '#DFA6B5' }
                ],
                imagen: 'images/tops/top-bra-negro.jpg'
            },
            {
                nombre: 'Legging Corazón',
                sku: 'LEGGINGKW-003',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Rosa', bg: '#DFA6B5' }
                ],
                imagen: 'images/leggings/legging-negro.jpg'
            },
            {
                nombre: 'Top Nudo',
                sku: 'TOPKW-002',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Azul Marino', bg: '#2a385b' }
                ],
                imagen: 'images/tops/top-nudo-negro.jpg'
            },
            {
                nombre: 'Legging Cintura V',
                sku: 'LEGGINGKW-001',
                tallas: ['CH', 'M', 'L', 'XL'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Lavanda', bg: '#A799BC' }, { nombre: 'Azul', bg: '#adc1f4' }, { nombre: 'Azul marino', bg: '#2a385b' },
                    { nombre: 'Gris Oxford', bg: '#808080' }, { nombre: 'Rojo', bg: '#E2011B', noTallas: ['XL'] }, { nombre: 'Azul Rey', bg: '#0B7FF2', noTallas: ['XL'] }
                ],
                imagen: 'images/leggings/legging-negro-V.jpg'
            },
            {
                nombre: 'Chamarra Básica',
                sku: 'JACKETKW-001',
                tallas: ['CH', 'M', 'L', 'XL'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Azul Marino', bg: '#2a385b' },
                    { nombre: 'Café', bg: '#6F4E37' }
                ],
                imagen: 'images/chamarras/chamarra-basica-negra.jpg'
            },
            {
                nombre: 'Calceta Yoga',
                sku: 'CALCETAYOGA',
                tallas: ['Unitalla'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Blanco', bg: '#ffffff' }
                ],
                imagen: 'images/calcetas/calceta-negra.jpg'
            },
            {
                nombre: 'Calceta Moda Blanca',
                sku: 'CALCETAMODABLANCA',
                tallas: ['Unitalla'],
                colores: [
                    { nombre: 'Blanco', bg: '#ffffff' }
                ],
                imagen: 'images/calcetas/calceta-have.jpg'
            },
            {
                nombre: 'Vestido',
                sku: 'DRESSKW-001',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Rosa', bg: '#DFA6B5' }
                ],
                imagen: 'images/vestidos/vestido-negro.jpg'
            }
        ]
    },

    'tank-legging-v': {
        titulo: 'Easy Morning',
        subtitulo: 'Flow',
        descripcion: 'Para empezar el día con calma. Tela ultra soft que acompaña cada postura sin perder la forma.',
        imagen: 'images/lifestyle/legging-v-top-bitono-rojo.jpg',
        numero: '02',
        prendas: [
            {
                nombre: 'Tank Bitono',
                sku: 'TANKKW-001',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' }, { nombre: 'Rojo', bg: '#E2011B' }, { nombre: 'Azul Rey', bg: '#0B7FF2' },
                    { nombre: 'Rosa Neón', bg: '#fc53ae' }
                ],
                imagen: 'images/tops/tank-bicolor-negro.jpg'
            },
            {
                nombre: 'Legging Cintura V',
                sku: 'LEGGINGKW-001',
                tallas: ['CH', 'M', 'L', 'XL'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Lavanda', bg: '#A799BC' }, { nombre: 'Azul', bg: '#adc1f4' }, { nombre: 'Azul marino', bg: '#2a385b' },
                    { nombre: 'Gris Oxford', bg: '#808080' }, { nombre: 'Rojo', bg: '#E2011B', noTallas: ['XL'] },
                    { nombre: 'Azul Rey', bg: '#0B7FF2', noTallas: ['XL'] }
                ],
                imagen: 'images/leggings/legging-negro-V.jpg'
            },
            {
                nombre: 'Legging Yoga',
                sku: 'LEGGINGYOGA-002',
                tallas: ['CH', 'M', 'L', 'XL'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Blanco', bg: '#ffffff' }
                ],
                imagen: 'images/leggings/legging-yoga-cafe.jpg'
            },
            {
                nombre: 'Crop Top Cuello Redondo',
                sku: 'CROPTOPKW-001',
                tallas: ['CH', 'M', 'L', 'XL'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Blanco', bg: '#ffffff' }, { nombre: 'Lavanda', bg: '#A799BC' }, { nombre: 'Azul', bg: '#adc1f4' },
                    { nombre: 'Azul marino', bg: '#2a385b' }, { nombre: 'Gris', bg: '#b4b1ac' }, { nombre: 'Gris oxford', bg: '#808080' },
                    { nombre: 'verde-jade', bg: '#4999B4' }, { nombre: 'Vino', bg: '#682d4d' }
                ],
                imagen: 'images/crop-tops/crop-negro.jpg'
            }
        ]
    },

    'top-crop-legging-biker': {
        titulo: 'Relax',
        subtitulo: 'Layer',
        descripcion: 'Del gym a la calle sin cambio de ropa. La chamarra hace todo el trabajo de estilo.',
        imagen: 'images/lifestyle/yoga.jpg',
        numero: '03',
        prendas: [
            {
                nombre: 'Top Deportivo',
                sku: 'TOPNY-001',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    { nombre: 'Rosa claro', bg: '#c3aaa3' }, { nombre: 'Blanco', bg: '#ffffff' }
                ],
                imagen: 'images/tops/top-rosa-claro.jpg'
            },
            {
                nombre: 'Legging Cintura V',
                sku: 'LEGGINGKW-001',
                tallas: ['CH', 'M', 'L', 'XL'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Lavanda', bg: '#A799BC' }, { nombre: 'Azul', bg: '#adc1f4' }, { nombre: 'Azul marino', bg: '#2a385b' },
                    { nombre: 'Gris Oxford', bg: '#808080' }, { nombre: 'Rojo', bg: '#E2011B', noTallas: ['XL'] },
                    { nombre: 'Azul Rey', bg: '#0B7FF2', noTallas: ['XL'] }
                ],
                imagen: 'images/leggings/legging-negro-V.jpg'
            },
            {
                nombre: 'Crop Top Cuello Redondo',
                sku: 'CROPTOPKW-001',
                tallas: ['CH', 'M', 'L', 'XL'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Blanco', bg: '#ffffff' }, { nombre: 'Lavanda', bg: '#A799BC' }, { nombre: 'Azul', bg: '#adc1f4' },
                    { nombre: 'Azul marino', bg: '#2a385b' }, { nombre: 'Gris', bg: '#b4b1ac' }, { nombre: 'Gris oxford', bg: '#808080' },
                    { nombre: 'verde-jade', bg: '#4999B4' }, { nombre: 'Vino', bg: '#682d4d' }
                ],
                imagen: 'images/crop-tops/crop-negro.jpg'
            },
            {
                nombre: 'Biker',
                sku: 'BIKERKW-001',
                tallas: ['CH', 'M', 'L', 'XL'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' }, { nombre: 'Lavanda', bg: '#A799BC' }, { nombre: 'Azul', bg: '#adc1f4' }
                ],
                imagen: 'images/bikers/biker-negro.jpg'
            },
            {
                nombre: 'Falda Tenis',
                sku: 'SKIRTPO-001',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Azul', bg: '#adc1f4' }
                ],
                imagen: 'images/faldas/falda-tenis-negra.jpg'
            }
        ]
    },

    'conjunto-amarillo': {
        titulo: 'Sunshine',
        subtitulo: 'Matching',
        descripcion: 'El conjunto bitono que lo hace todo. Falda y top en perfecta armonía para un look que habla solo.',
        imagen: 'images/lifestyle/conjunto-amarillo.jpg',
        numero: '04',
        prendas: [
            {
                nombre: 'Top Bitono',
                sku: 'TOPNY-004',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    { nombre: 'Azul Bicolor', bg: '#586D97' }, { nombre: 'Amarillo Bicolor', bg: '#f6e7af' }
                ],
                imagen: 'images/tops/top-bicolor-azul.jpg'
            },
            {
                nombre: 'Falda Bitono',
                sku: 'SKIRTPO-002',
                tallas: ['CH', 'M', 'L', 'XL'],
                colores: [
                    { nombre: 'Azul Bicolor', bg: '#586D97' }, { nombre: 'Amarillo Bicolor', bg: '#f6e7af' }
                ],
                imagen: 'images/faldas/falda-bicolor-azul.jpg'
            },
            {
                nombre: 'Top Deportivo tirantes cruzados',
                sku: 'TOPNY-002',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    {nombre:'Negro',bg:'#000000'},{nombre:'Rosa',bg:'#CA6E7B'}
                ],
                imagen: 'images/tops/top-negro.jpg'
            },
            {
                nombre: 'Falda Tenis',
                sku: 'SKIRTPO-001',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Azul', bg: '#adc1f4' }
                ],
                imagen: 'images/faldas/falda-tenis-negra.jpg'
            },
            {
                nombre: 'Playera Aura',
                sku: 'PLAYERAPO-001',
                tallas: ['CH', 'M', 'L'],
                colores: [
                   {nombre:'Blanco',bg:'#ffffff'},{nombre:'Azul',bg:'#adc1f4'},{nombre:'Durazno',bg:'#ffddd4'}
                ],
                imagen: 'images/playeras/aura-runner-blanca.jpg'
            },
            {
                nombre: 'Pantalón Yoga',
                sku: 'YOGAPAN-001',
                tallas: ['CH', 'M', 'L'],
                colores: [
                   {nombre:'Negro',bg:'#000000'},{nombre:'Gris Oxford',bg:'#808080'},{nombre:'Azul Marino',bg:'#2a385b'}
                ],
                imagen: 'images/pantalones/pantalon-yoga-negro.jpg'
            },
            {
                nombre: 'Short Bitono',
                sku: 'SHORTKW-002',
                tallas: ['CH', 'M', 'L'],
                colores: [
                   {nombre:'Negro',bg:'#000000'},{nombre:'Rojo',bg:'#E2011B'},{nombre:'Azul Rey',bg:'#0B7FF2'},{nombre:'Rosa Neón',bg:'#fc53ae'}
                ],
                imagen: 'images/shorts/short-bicolor-negro.jpg'
            },
            {
                nombre: 'Legging Corazón',
                sku: 'LEGGINGKW-003',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Rosa', bg: '#DFA6B5' }
                ],
                imagen: 'images/leggings/legging-negro.jpg'
            },
        ]
    },

    'flare-vino-lectura': {
        titulo: 'Calm',
        subtitulo: 'Vino',
        descripcion: 'Ultra soft para los días que no necesitas demostrarle nada a nadie. Solo estar cómoda y verse bien haciéndolo.',
        imagen: 'images/lifestyle/flare-vino-lectura.jpeg',
        numero: '05',
        prendas: [
            {
                nombre: 'Crop Top Cuello Redondo',
                sku: 'CROPTOPKW-001',
                tallas: ['CH', 'M', 'L', 'XL'],
                colores: [
                    { nombre: 'Negro', bg: '#000000' },
                    { nombre: 'Blanco', bg: '#ffffff' }, { nombre: 'Lavanda', bg: '#A799BC' }, { nombre: 'Azul', bg: '#adc1f4' },
                    { nombre: 'Azul marino', bg: '#2a385b' }, { nombre: 'Gris', bg: '#b4b1ac' }, { nombre: 'Gris oxford', bg: '#808080' },
                    { nombre: 'verde-jade', bg: '#4999B4' }, { nombre: 'Vino', bg: '#682d4d' }
                ],
                imagen: 'images/crop-tops/crop-negro.jpg'
            },
            {
                nombre: 'Legging Flare',
                sku: 'LEGGINGKW-002',
                tallas: ['CH', 'M', 'L', 'XL'],
                colores: [
                    { nombre: 'verde-jade', bg: '#4999B4' },
                    { nombre: 'Vino', bg: '#682d4d' }, { nombre: 'Cafe', bg: '#61341f' }, { nombre: 'Negro', bg: '#000000' }
                ],
                imagen: 'images/leggings/legging-flare-negro.jpeg'
            },
            {
                nombre: 'Top Asimétrico',
                sku: 'TOPKW-004',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    {nombre:'Negro',bg:'#000000'},{nombre:'Rojo',bg:'#E2011B'},{nombre:'Azul Rey',bg:'#0B7FF2'}
                ],
                imagen: 'images/tops/top-asimetrico-negro.jpg'
            },
            {
                nombre: 'Short',
                sku: 'SHORTKW-001',
                tallas: ['CH', 'M', 'L', 'XL'],
                colores: [
                    {nombre:'Negro',bg:'#000000'},{nombre:'Lavanda',bg:'#A799BC'},{nombre:'Azul',bg:'#adc1f4'},{nombre:'Gris',bg:'#b4b1ac'}
                ],
                imagen: 'images/shorts/short-negro.jpg'
            },
            {
                nombre: 'Chamarra Deportiva',
                sku: 'JACKETPO-002',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    {nombre:'Verde olivo',bg:'#4c4e43'},{nombre:'ivory',bg:'#e7e2dc'},{nombre:'topo',bg:'#bdab9f'}
                ],
                imagen: 'images/chamarras/chamarra-deportiva-verde.jpg'
            },
            {
                nombre: 'Legging Yoga',
                sku: 'LEGGINGYOGA-002',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    {nombre:'Cafe',bg:'#61341f'},{nombre:'ivory',bg:'#e7e2dc'}
                ],
                imagen: 'images/leggings/legging-yoga-cafe.jpg'
            },
            {
                nombre: 'Jumper',
                sku: 'JUMPERKW-001',
                tallas: ['CH', 'M', 'L'],
                colores: [
                    {nombre:'Negro',bg:'#000000'},{nombre:'Café',bg:'#61341f'}
                ],
                imagen: 'images/jumpers/jumper-negro.jpg'
            }
        ]
    }
};

// ─────────────────────────────────────────────────────────────
//  ORDEN Y ETIQUETAS
// ─────────────────────────────────────────────────────────────
const LOOKS_ORDER = ['corazon-nudo', 'tank-legging-v', 'top-crop-legging-biker', 'conjunto-amarillo', 'flare-vino-lectura'];

const LOOKS_LABELS = {
    'corazon-nudo': 'Corazón Nudo',
    'tank-legging-v': 'Tank & Legging V',
    'top-crop-legging-biker': 'Top Crop & Legging Biker',
    'conjunto-amarillo': 'Sunshine Matching',
    'flare-vino-lectura': 'Calm Soft'
};

// ─────────────────────────────────────────────────────────────
//  HOTSPOTS DEL GRID DE INSPIRATION STYLE
//
//  Cada entrada es un array de fotos. Cada foto tiene:
//    img      → ruta de la imagen
//    hotspots → array de { sku, top, left }
//               (posiciones en % sobre esa foto específica)
//               Si no tiene hotspots, dejarlo vacío []
//
//  CALIBRACIÓN: abre devtools → inspecciona .hotspot-container
//  y edita top/left en vivo hasta que queden bien sobre la prenda.
// ─────────────────────────────────────────────────────────────
const INSPIRATION_GRID = {

    'corazon-nudo': [
        {
            img: 'images/lifestyle/playa.mp4',
            hotspots: [
            ]
        },
        {
            img: 'images/lifestyle/barre.jpg',
            hotspots: [
                { sku: 'TOPKW-002', top: '30%', left: '48%' },
                { sku: 'LEGGINGKW-001', top: '50%', left: '48%' },
                { sku: 'CALCETAMODABLANCA', top: '90%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/centro-comercial.jpg',
            hotspots: [
                { sku: 'LEGGINGKW-003', top: '68%', left: '48%' }
            ]
        },
        {
            img: 'images/lifestyle/vestido-estudio.jpg',
            hotspots: [
                { sku: 'DRESSKW-001', top: '40%', left: '48%' }
            ]
        },
        {
            img: 'images/lifestyle/calle-v-chamarra-azul.jpg',
            hotspots: [
                { sku: 'JACKETKW-001', top: '25%', left: '50%' },
                { sku: 'LEGGINGKW-001', top: '55%', left: '50%' },
                { sku: 'CALCETAYOGA', top: '80%', left: '40%' }
            ]
        },  
        {
            img: 'images/lifestyle/top-bra-rosa-estudio.jpg',
            hotspots: [
                { sku: 'TOPBRAKW-001', top: '75%', left: '50%' }
            ]
        }      
    ],

    'tank-legging-v': [
        {
            img: 'images/lifestyle/tank-v-rojo.jpg',
            hotspots: [
                { sku: 'TANKKW-001', top: '33%', left: '52%' },
                { sku: 'LEGGINGKW-001', top: '68%', left: '48%' }
            ]
        },
        {
            img: 'images/lifestyle/tank-mezclilla.jpg',
            hotspots: [
                { sku: 'TANKKW-001', top: '35%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/v-rojo-crop-blanco.jpg',
            hotspots: [
                { sku: 'CROPTOPKW-001', top: '25%', left: '48%' },
                { sku: 'LEGGINGKW-001', top: '50%', left: '48%' }
            ]
        },
        {
            img: 'images/lifestyle/pilates.jpg',
            hotspots: [
                { sku: 'TANKKW-001', top: '40%', left: '52%' },
                { sku: 'LEGGINGYOGA-002', top: '60%', left: '48%' }
            ]
        },
        {
            img: 'images/lifestyle/legging-rojo-minimalista.jpg',
            hotspots: [
                { sku: 'LEGGINGKW-001', top: '60%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/tank-roja-estudio.jpg',
            hotspots: [
                { sku: 'TANKKW-001', top: '60%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/running-rojo-v.jpg',
            hotspots: [
                { sku: 'LEGGINGKW-001', top: '50%', left: '48%' }
            ]
        },
        {
            img: 'images/lifestyle/tank-espalda-estudio.jpg',
            hotspots: [
                { sku: 'TANKKW-001', top: '80%', left: '50%' }
            ]
        }
    ],

    'top-crop-legging-biker': [
        {
            img: 'images/lifestyle/crop-oficina.jpg',
            hotspots: [
                { sku: 'CROPTOPKW-001', top: '45%', left: '52%' }
            ]
        },
        {
            img: 'images/lifestyle/crop-blanco-estudio.jpg',
            hotspots: [
                { sku: 'TOPNY-001', top: '70%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/biker-ciudad.jpg',
            hotspots: [
                { sku: 'BIKERKW-001', top: '55%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/legging-gris-estudio.jpg',
            hotspots: [
                { sku: 'LEGGINGKW-001', top: '30%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/crop-verde-jade-estudio.jpg',
            hotspots: [
                { sku: 'CROPTOPKW-001', top: '35%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/top-falda-run.jpg',
            hotspots: [
                { sku: 'TOPNY-001', top: '33%', left: '52%' },
                { sku: 'SKIRTPO-001', top: '46%', left: '52%' }
            ]
        },
        {
            img: 'images/lifestyle/biker-estudio.jpg',
            hotspots: [
                { sku: 'BIKERKW-001', top: '25%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/legging-centro-comercial.jpg',
            hotspots: [
                { sku: 'LEGGINGKW-001', top: '55%', left: '55%' }
            ]
        }
    ],

    'conjunto-amarillo': [
        {
            img: 'images/lifestyle/falda-bitono-tenis.jpg',
            hotspots: [
                { sku: 'TOPNY-002', top: '30%', left: '52%' },
                { sku: 'SKIRTPO-002', top: '50%', left: '48%' }
            ]
        },
        {
            img: 'images/lifestyle/espalda-bitono.jpg',
            hotspots: [
                { sku: 'TOPNY-004', top: '75%', left: '48%' }
            ]
        },
        {
            img: 'images/lifestyle/falda-tenis-top-bitono-alberca.jpg',
            hotspots: [
                { sku: 'TOPNY-004', top: '50%', left: '50%' },
                { sku: 'SKIRTPO-001', top: '70%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/falda-bitono-estudio.jpg',
            hotspots: [
                { sku: 'SKIRTPO-002', top: '20%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/aura-falda-bitono.jpg',
            hotspots: [
                { sku: 'PLAYERAPO-001', top: '30%', left: '52%' },
                { sku: 'SKIRTPO-002', top: '45%', left: '48%' }
            ]
        },
        {
            img: 'images/lifestyle/pantalon-yoga-top-bitono.jpg',
            hotspots: [
                { sku: 'TOPNY-004', top: '30%', left: '52%' },
                { sku: 'YOGAPAN-001', top: '45%', left: '52%' }
            ]
        },
        {
            img: 'images/lifestyle/short-bicolor-top-bra.jpg',
            hotspots: [
                { sku: 'TOPBRAKW-001', top: '45%', left: '52%' },
                { sku: 'SHORTKW-002', top: '68%', left: '52%' }
            ]
        },
        {
            img: 'images/lifestyle/top-bra-rosa.mp4',
            hotspots: [
                { sku: 'TOPBRAKW-001', top: '45%', left: '52%' },
                { sku: 'LEGGINGKW-003', top: '65%', left: '48%' }
            ]
        }
    ],

    'flare-vino-lectura': [
        {
            img: 'images/lifestyle/flare-negro.jpg',
            hotspots: [
                { sku: 'LEGGINGKW-002', top: '68%', left: '48%' }
            ]
        },
        {
            img: 'images/lifestyle/falda-tenis-editorial.jpg',
            hotspots: [
                { sku: 'SKIRTPO-001', top: '48%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/caminadora-asimetrico-short.jpg',
            hotspots: [
                { sku: 'TOPKW-004', top: '30%', left: '50%' },
                { sku: 'SHORTKW-001', top: '46%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/editorial-yoga-chamarra.jpg',
            hotspots: [
                { sku: 'JACKETPO-002', top: '36%', left: '50%' },
                { sku: 'LEGGINGYOGA-002', top: '56%', left: '50%' }
            ]
        },
        {
            img: 'images/lifestyle/vestido-rosa.jpg',
            hotspots: [
                { sku: 'DRESSKW-001', top: '55%', left: '50%' },
                ]
        },
        {
            img: 'images/lifestyle/postura-indio.jpg',
            hotspots: [
                { sku: 'JUMPERKW-001', top: '80%', left: '52%' }
            ]
        },
        {
            img: 'images/lifestyle/pilates-legging-top.jpg',
            hotspots: [
                { sku: 'CALCETAMODABLANCA', top: '70%', left: '20%' },
                { sku: 'LEGGINGKW-001', top: '70%', left: '52%' },
                { sku: 'TOPNY-002', top: '70%', left: '75%' }
            ]
        },
        {
            img: 'images/lifestyle/plancha-lateral.jpg',
            hotspots: [
                { sku: 'BIKERKW-001', top: '70%', left: '45%' },
                { sku: 'PLAYERAPO-001', top: '65%', left: '65%' }
            ]
        }
    ]
};

// ─────────────────────────────────────────────────────────────
//  HOTSPOTS DE LA IMAGEN HERO (se calibran por look)
// ─────────────────────────────────────────────────────────────
const LOOK_HOTSPOTS = {
    'corazon-nudo': [
        { sku: 'TOPBRAKW-001' },
        { sku: 'TOPKW-002'},
        { sku: 'LEGGINGKW-001'},
        { sku: 'LEGGINGKW-003'}
    ],
    'tank-legging-v': [
        { sku: 'TANKKW-001',  },
        { sku: 'LEGGINGKW-001'}
    ],
    'top-crop-legging-biker': [
        { sku: 'TOPNY-001'},
        { sku: 'BIKERKW-001'},
        { sku: 'CROPTOPKW-001'},
        { sku: 'LEGGINGKW-001'}
    ],
    'conjunto-amarillo': [
        { sku: 'TOPNY-004'},
        { sku: 'SKIRTPO-002'}
    ],
    'flare-vino-lectura': [
        { sku: 'CROPTOPKW-001'},
        { sku: 'LEGGINGKW-002'}
    ]
};

// ─────────────────────────────────────────────────────────────
//  HELPER: buscar producto por SKU
// ─────────────────────────────────────────────────────────────
function obtenerProductoPorSku(sku) {
    for (const look of Object.values(LOOKS_DATA)) {
        const producto = look.prendas.find(p => p.sku === sku);
        if (producto) return producto;
    }
    
    const productoExtra = PRENDAS_EXTRA.find(p => p.sku === sku);
    if (productoExtra) return productoExtra;

    return null;
}

// ─────────────────────────────────────────────────────────────
//  HELPER: toggle popup hotspot
// ─────────────────────────────────────────────────────────────
window.toggleInspCard = function(event, btn, cardId) {
    event.stopPropagation();
    event.preventDefault();

    const card = document.getElementById(cardId);
    const isVisible = card.style.display === 'flex';

    document.querySelectorAll('.insp-card').forEach(c => c.style.display = 'none');
    document.querySelectorAll('.insp-plus-btn').forEach(b => {
        b.classList.remove('active');
        b.textContent = '+';
    });

    if (!isVisible) {
        card.style.display = 'flex';
        btn.classList.add('active');
        btn.textContent = '×';
    }
};

document.addEventListener('click', function(e) {
    if (!e.target.closest('.hotspot-container') && !e.target.closest('.insp-card')) {
        document.querySelectorAll('.insp-card').forEach(c => c.style.display = 'none');
        document.querySelectorAll('.insp-plus-btn').forEach(b => {
            b.classList.remove('active');
            b.textContent = '+';
        });
    }
});

// ─────────────────────────────────────────────────────────────
//  RENDER: un hotspot + su popup
// ─────────────────────────────────────────────────────────────
function getCategoriaUrl(sku) {
    if (sku.startsWith('BIKER')) return 'bikers.html';
    if (sku.startsWith('CROPTOP')) return 'crop-tops.html';
    if (sku.startsWith('SKIRT')) return 'falda-teniss.html';
    if (sku.startsWith('LEGGING')) return 'leggings.html';
    if (sku.startsWith('TANK') || sku.startsWith('TOP')) return 'tops.html';
    if (sku.startsWith('JACKET')) return 'chamarras.html';
    if (sku.startsWith('CALCETA')) return 'calcetas.html';
    if (sku.startsWith('DRESS')) return 'vestidos.html';
    if (sku.startsWith('PLAYERA')) return 'playeras.html';
    if (sku.startsWith('YOGAPAN')) return 'pantalon-yoga.html';
    if (sku.startsWith('SHORT')) return 'shorts.html';
    if (sku.startsWith('JUMPER')) return 'jumper.html';
    return 'tops.html'; // Fallback
}

function renderHotspot(h, prefix) {
    const producto = obtenerProductoPorSku(h.sku);
    if (!producto) return '';

    const precio = obtenerPrecio(producto.nombre);
    const cardId = `insp-card-${prefix}-${h.sku}-${Math.random().toString(36).substr(2, 5)}`;

    const swatchesHTML = producto.colores.slice(0, 4).map(c => {
        const esClaro = ['#ffffff','#e8e4df','#f6e7af','#adc1f4','#a799bc','#b4b1ac'].includes(c.bg.toLowerCase());
        return `<div class="insp-swatch" title="${c.nombre}" style="background:${c.bg};${esClaro ? 'border-color:#bbb;' : ''}"></div>`;
    }).join('');

    const leftNum = parseFloat(h.left);
    const popupSide = leftNum > 58 ? 'right' : 'left';

    return `
    <div class="hotspot-container" style="top:${h.top};left:${h.left};">
        <button class="insp-plus-btn" onclick="toggleInspCard(event,this,'${cardId}')" aria-label="Ver ${producto.nombre}">+</button>
        <div class="insp-pulse"></div>
    </div>
    <a id="${cardId}" class="insp-card insp-card--${popupSide}" href="catalogo/${getCategoriaUrl(producto.sku)}#${producto.sku}" style="display:none; text-decoration:none;">
        <div class="insp-card__img-wrap">
            <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy"
                 onerror="this.parentElement.innerHTML='<div class=\\'insp-card__img-fallback\\'></div>'"/>
        </div>
        <div class="insp-card__body">
            <p class="insp-card__categoria">${producto.sku}</p>
            <p class="insp-card__nombre">${producto.nombre}</p>
            <div class="insp-card__swatches">${swatchesHTML}</div>
            <p class="insp-card__precio">$${precio.toLocaleString('es-MX')} <span>MXN</span></p>
        </div>
    </a>`;
}

// ─────────────────────────────────────────────────────────────
//  LEER PARÁMETRO Y RENDERIZAR
// ─────────────────────────────────────────────────────────────
const params = new URLSearchParams(window.location.search);
const lookId = params.get('look');
const lookData = lookId ? LOOKS_DATA[lookId] : null;

const contenido = document.getElementById('lookContenido');

if (!lookData) {
    contenido.innerHTML = renderGaleriaCompleta();
} else {
    contenido.innerHTML = renderLookPage(lookData, lookId);
    cargarStockPrendas(lookData.prendas);
}

// ─────────────────────────────────────────────────────────────
//  RENDER: página de look individual
// ─────────────────────────────────────────────────────────────
function renderLookPage(look, id) {
    const heroSkus = (LOOK_HOTSPOTS[id] || []).map(h => h.sku);
    const prendasDelLook = heroSkus.length > 0 
        ? look.prendas.filter(p => heroSkus.includes(p.sku)) 
        : look.prendas;

    const prendasHTML = prendasDelLook.map((p, i) => renderPrendaCard(p, i)).join('');
    const totalEstimado = prendasDelLook.reduce((s, p) => s + obtenerPrecio(p.nombre), 0);

    const heroHotspotsHTML = (LOOK_HOTSPOTS[id] || [])
        .map(h => renderHotspot(h, 'hero'))
        .join('');

    const gridFotos = INSPIRATION_GRID[id] || [];

    const carouselId = `inspCarousel-${id}`;
    let carouselItemsHTML = '';
    
    if (gridFotos.length > 0) {
    const fotosHTML = gridFotos.map((foto, fotoIdx) => {
        const isVideo = foto.img.endsWith('.mp4') || foto.img.endsWith('.mov') || foto.img.endsWith('.webm');
        const mediaHTML = isVideo
            ? `<video src="${foto.img}" autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;object-position:top;"></video>`
            : `<img src="${foto.img}" loading="lazy" alt="Inspiration Style" style="width:100%;height:100%;object-fit:cover;object-position:top;">`;

        const hotspotsHTML = (foto.hotspots || [])
            .map(h => renderHotspot(h, `grid-${fotoIdx}`))
            .join('');

        return `
        <div style="flex:0 0 calc(33.333% - 6px);aspect-ratio:3/4;overflow:hidden;border-radius:4px;position:relative;">
            ${mediaHTML}
            ${hotspotsHTML}
        </div>`;
    }).join('');

    var relacionadosHTML = `
    <div style="position:relative;width:100%;overflow:hidden;">
        <div id="inspStrip-${id}" style="display:flex;gap:8px;transition:transform 0.45s ease;will-change:transform;">
            ${fotosHTML}
        </div>
        <button onclick="moverInsp('${id}',-1)" style="position:absolute;left:0;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.85);border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;font-size:18px;line-height:1;z-index:2;">‹</button>
        <button onclick="moverInsp('${id}',1)"  style="position:absolute;right:0;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.85);border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;font-size:18px;line-height:1;z-index:2;">›</button>
    </div>`;
    } else {
        var relacionadosHTML = '';
    }

    return `
      <div class="look-breadcrumb">
        <a href="lifestyle.html">Lifestyle</a>
        <span>/</span>
        <span>${look.titulo} ${look.subtitulo}</span>
      </div>

      <section class="look-hero">
        <div class="look-hero__img-wrap" style="position:relative;">
          <img src="${look.imagen}" alt="${look.titulo} ${look.subtitulo}" />
          <div class="look-hero__tag">Look ${look.numero} / 05</div>
          ${heroHotspotsHTML}
        </div>

        <div class="look-hero__info">
          <p class="look-hero__eyebrow">Arma tu look</p>
          <h1 class="look-hero__title">${look.titulo}<br><em>${look.subtitulo}</em></h1>
          <p class="look-hero__desc">${look.descripcion}</p>
          <div class="look-divider"></div>

          <div class="look-prendas" id="lookPrendas">
            ${prendasHTML}
          </div>

          <div class="look-total">
            <span class="look-total__label">Total del look</span>
            <div class="look-total__precio" id="lookTotal">
              $${totalEstimado.toLocaleString('es-MX')}<span>MXN</span>
            </div>
          </div>
        </div>
      </section>

      <section class="looks-related">
        <div class="looks-related__header" style="justify-content:center;">
          <h2 class="looks-related__title">Inspiration Style</h2>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;">
          ${relacionadosHTML}
        </div>
      </section>`;
}

// ─────────────────────────────────────────────────────────────
//  RENDER: galería completa (sin ?look=)
// ─────────────────────────────────────────────────────────────
function renderGaleriaCompleta() {
    const thumbs = [
        'images/lifestyle/inspiration-1.jpg',
        'images/lifestyle/inspiration-2.jpg',
        'images/lifestyle/inspiration-3.jpg',
        'images/lifestyle/inspiration-4.jpg'
    ].map(img => `
        <div class="look-thumb look-thumb--static">
            <img src="${img}" loading="lazy">
        </div>
    `).join('');

    return `
      <div style="padding:48px 32px 20px;">
        <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--stone);margin-bottom:8px;">Lifestyle</p>
        <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4vw,48px);font-weight:500;color:var(--ink);">Arma tu look</h1>
      </div>
      <section class="looks-related" style="padding-top:0;">
        <div class="looks-related__grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr));">
          ${thumbs}
        </div>
      </section>`;
}

// ─────────────────────────────────────────────────────────────
//  RENDER: tarjeta de prenda
// ─────────────────────────────────────────────────────────────
function renderPrendaCard(p, idx) {
    const precio = obtenerPrecio(p.nombre);
    const coloresStr = JSON.stringify(p.colores).replace(/"/g, '&quot;');
    const tallasStr = JSON.stringify(p.tallas).replace(/"/g, '&quot;');

    return `
      <div class="prenda-card" id="prenda-card-${idx}">
        <img class="prenda-card__img"
             src="${p.imagen}"
             alt="${p.nombre}"
             loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <div class="prenda-card__img-placeholder" style="display:none;">${p.nombre.split(' ').slice(0,2).join(' ')}</div>

        <div class="prenda-card__info">
          <div class="prenda-card__nombre">${p.nombre}</div>
          <div class="prenda-card__sku">${p.sku}</div>
          <div class="prenda-card__precio" id="prenda-precio-${idx}">$${precio.toLocaleString('es-MX')} MXN</div>
          <div class="prenda-card__stock" id="prenda-stock-${idx}">
            <span class="look-loading" style="font-size:10px;">verificando stock…</span>
          </div>
        </div>

        <button
          class="prenda-card__btn"
          id="prenda-btn-${idx}"
          onclick="abrirModal('${p.nombre}','${p.sku}',${tallasStr},${coloresStr})">
          Agregar
        </button>
      </div>`;
}

// ─────────────────────────────────────────────────────────────
//  STOCK: cargar en paralelo
// ─────────────────────────────────────────────────────────────
const LIMITE_ULTIMAS_LOOKS = 3;

async function cargarStockPrendas(prendas) {
    await Promise.all(prendas.map(async (p, idx) => {
        const stockEl = document.getElementById(`prenda-stock-${idx}`);
        const btnEl   = document.getElementById(`prenda-btn-${idx}`);
        if (!stockEl || !btnEl) return;

        try {
            const url = `https://voplgacjzhxyyythvugo.supabase.co/rest/v1/stock?sku=eq.${encodeURIComponent(p.sku)}&select=talla,color,cantidad,reservado`;
            const res = await fetch(url, {
                headers: {
                    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGxnYWNqemh4eXl5dGh2dWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NjM5ODYsImV4cCI6MjA5MTMzOTk4Nn0.b2OI5C2biWZlii4Comz7AFIvTmeh-8aBFYpt8bZ3OYQ',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGxnYWNqemh4eXl5dGh2dWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NjM5ODYsImV4cCI6MjA5MTMzOTk4Nn0.b2OI5C2biWZlii4Comz7AFIvTmeh-8aBFYpt8bZ3OYQ'
                }
            });

            if (!res.ok) throw new Error();
            const data = await res.json();
            const stock = data.map(s => ({ ...s, cantidad: Math.max(0, s.cantidad - (s.reservado || 0)) }));

            const totalDisp  = stock.reduce((s, v) => s + v.cantidad, 0);
            const algunaDisp = stock.some(v => v.cantidad > 0);

            stockEl.innerHTML = '';

            if (!algunaDisp) {
                stockEl.innerHTML = '<span class="prenda-card__stock agotado">Agotado</span>';
                btnEl.textContent = '🔔 Notifícame';
                btnEl.classList.add('notificar');

                const nuevoBtn = btnEl.cloneNode(true);
                btnEl.parentNode.replaceChild(nuevoBtn, btnEl);
                nuevoBtn.addEventListener('click', () => {
                    abrirModalRestockDirecto(p.nombre, p.sku, p.tallas, p.colores);
                });

            } else if (totalDisp <= LIMITE_ULTIMAS_LOOKS) {
                stockEl.innerHTML = '<span class="prenda-card__stock ultimas">¡Últimas piezas!</span>';
            }

        } catch {
            if (stockEl) stockEl.innerHTML = '';
        }
    }));
}

const _inspPage = {};

function moverInsp(id, dir) {
    if (_inspPage[id] === undefined) _inspPage[id] = 0;
    const strip = document.getElementById(`inspStrip-${id}`);
    if (!strip) return;

    const total = strip.children.length;
    const porPagina = 3; // cambia aquí según lo que uses
    const paginas = Math.ceil(total / porPagina);

    _inspPage[id] = ((_inspPage[id] + dir) + paginas) % paginas;

    const itemW = strip.children[0].offsetWidth + 8;
    strip.style.transform = `translateX(-${_inspPage[id] * itemW * porPagina}px)`;
}

// ─────────────────────────────────────────────────────────────
//  SCROLL & NAVBAR
// ─────────────────────────────────────────────────────────────
window.scrollTo({ top: 0 });

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 40) navbar.classList.add('shrink');
    else navbar.classList.remove('shrink');
});