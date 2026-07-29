// ─────────────────────────────────────────────────────────────
//  js/render-catalogo.js
//
//  Jala todos los productos de Supabase, los cruza con
//  PRODUCTO_META (catalogo-data.js) y renderiza la grilla
//  de la página de catálogo actual.
//
//  USO EN CADA PÁGINA DE CATÁLOGO:
//
//    1. Incluir en el HTML (en este orden):
//         <script src="../js/catalogo-data.js"></script>
//         <script src="../js/carrito.js"></script>
//         <script src="../js/render-catalogo.js"></script>
//
//    2. Reemplazar el bloque <div class="row g-4"> con:
//         <div class="row g-4" id="catalogo-grid">
//           <div class="catalogo-loading">Cargando productos…</div>
//         </div>
//
//    3. Agregar data-categoria al <section> o al <body>:
//         <section id="productos" class="container py-5"
//                  data-categoria="leggings">
//
//    La categoría debe coincidir con el campo `categoria`
//    en PRODUCTO_META (ej: 'leggings', 'tops', 'bikers').
// ─────────────────────────────────────────────────────────────

const SB_URL = 'https://voplgacjzhxyyythvugo.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGxnYWNqemh4eXl5dGh2dWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NjM5ODYsImV4cCI6MjA5MTMzOTk4Nn0.b2OI5C2biWZlii4Comz7AFIvTmeh-8aBFYpt8bZ3OYQ';

// ─────────────────────────────────────────────────────────────
//  1. FETCH: todos los registros de stock de una vez
// ─────────────────────────────────────────────────────────────
async function fetchTodoElStock() {
  const res = await fetch(
    `${SB_URL}/rest/v1/stock?select=sku,producto,talla,color,cantidad,reservado&order=sku`,
    { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
  );
  if (!res.ok) throw new Error('Error al cargar stock');
  return res.json();
}

// ─────────────────────────────────────────────────────────────
//  2. AGRUPAR: stock plano → mapa por SKU
//     { SKU: { nombre, tallas: [], colores: [], stockData: [] } }
// ─────────────────────────────────────────────────────────────
function agruparPorSku(filas) {
  const mapa = {};

  for (const fila of filas) {
    const disp = Math.max(0, fila.cantidad - (fila.reservado || 0));

    if (!mapa[fila.sku]) {
      mapa[fila.sku] = {
        nombre:    fila.producto,
        tallas:    [],
        colores:   [],
        stockData: []
      };
    }

    const p = mapa[fila.sku];

    // Tallas únicas en orden CH→XL
    if (fila.talla && !p.tallas.includes(fila.talla)) {
      p.tallas.push(fila.talla);
    }

    // Colores únicos
    if (fila.color && !p.colores.includes(fila.color)) {
      p.colores.push(fila.color);
    }

    // Stock disponible
    p.stockData.push({ talla: fila.talla, color: fila.color, cantidad: fila.cantidad });
  }

  // Ordenar tallas
  const ORDEN_TALLAS = ['XS','CH','S','M','L','XL','XXL','Unitalla'];
  for (const sku of Object.keys(mapa)) {
    mapa[sku].tallas.sort((a, b) => {
      const ia = ORDEN_TALLAS.indexOf(a);
      const ib = ORDEN_TALLAS.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
  }

  return mapa;
}

// ─────────────────────────────────────────────────────────────
//  3. RENDER: card de producto (compatible con productos.css)
// ─────────────────────────────────────────────────────────────
function renderProductoCard(sku, datos, meta) {
  const { nombre, tallas, colores, stockData } = datos;
  const precio    = obtenerPrecio(nombre); // viene de carrito.js
  const imgBase   = meta.imagenBase || '';
  const badgeHtml = meta.badge
    ? `<p class="ultimas-piezas"><strong>${meta.badge}</strong></p>`
    : '';

  // Construir swatches de color
  const swatchesHtml = colores.map(color => {
    const cm  = meta.coloresMeta?.[color] || {};
    const bg  = cm.bg || '#ccc';
    const img = meta.imagenesPorColor?.[color] || imgBase;

    // Clases de color para los spans (compatibles con el CSS existente)
    const claseColor = color.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/ó/g, 'o').replace(/á/g, 'a').replace(/é/g, 'e')
      .replace(/ú/g, 'u').replace(/ñ/g, 'n');

    return `<span
      class="color ${claseColor}"
      style="background:${bg};"
      title="${color}"
      onclick="cambiarImagen('img-${sku}','${img}')"></span>`;
  }).join('');

  // Construir arrays para abrirModal
  const tallasJSON  = JSON.stringify(tallas);
  const coloresConMeta = colores.map(c => {
    const cm = meta.coloresMeta?.[c] || {};
    const obj = { nombre: c, bg: cm.bg || '#ccc' };
    if (cm.noTallas) obj.noTallas = cm.noTallas;
    return obj;
  });
  const coloresJSON = JSON.stringify(coloresConMeta);

  // ¿Todo agotado?
  const todoAgotado = stockData.length > 0 &&
    stockData.every(v => v.cantidad === 0);

  const btnHtml = todoAgotado
    ? `<button class="btn-agregar-carrito btn-notificar-card"
         onclick="abrirModalRestockDirecto('${nombre}','${sku}',${tallasJSON},${coloresJSON})">
         🔔 Notifícame cuando vuelva
       </button>`
    : `<button class="btn-agregar-carrito"
         onclick="abrirModal('${nombre}','${sku}',${tallasJSON},${coloresJSON})">
         + Agregar al carrito
       </button>`;

  const rangeTallas = tallas.length > 1
    ? `${tallas[0]} - ${tallas[tallas.length - 1]}`
    : tallas[0] || '';

  return `
    <div class="col-12 col-md-6 col-lg-4" id="${sku}">
      <div class="card producto border-0 highlight-target">
        <img id="img-${sku}"
             src="${imgBase}"
             class="card-img-top"
             alt="${nombre}"
             loading="lazy">
        <div class="card-body">
          ${badgeHtml}
          <h5>${nombre}</h5>
          <p class="precio" data-nombre="${nombre}">$${precio} MXN</p>
          <p class="descripcion">${meta.descripcion || ''}</p>
          <p><strong>Tallas:</strong> ${rangeTallas}</p>
          <div class="colores">${swatchesHtml}</div>
          ${btnHtml}
        </div>
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────
//  4. INIT: detectar categoría y llenar el grid
// ─────────────────────────────────────────────────────────────
async function iniciarCatalogo() {
  // Detectar categoría desde data-categoria en el section o body
  const seccion   = document.querySelector('[data-categoria]');
  const categoria = seccion?.dataset?.categoria;
  const grid      = document.getElementById('catalogo-grid');

  if (!grid) return; // Página sin grid dinámico, no hacer nada

  if (!categoria) {
    grid.innerHTML = '<p style="color:#c0392b;padding:20px;">Falta data-categoria en el section.</p>';
    return;
  }

  try {
    const filas  = await fetchTodoElStock();
    const mapa   = agruparPorSku(filas);

    // Filtrar solo los SKUs de esta categoría
    const skusCategoria = Object.keys(mapa).filter(sku => {
      const meta = getProductoMeta(sku);
      return meta?.categoria === categoria;
    });

    if (skusCategoria.length === 0) {
      grid.innerHTML = '<p style="color:#aaa;padding:20px;font-family:Montserrat,sans-serif;font-size:13px;">No hay productos disponibles.</p>';
      return;
    }

    grid.innerHTML = skusCategoria
      .map(sku => renderProductoCard(sku, mapa[sku], getProductoMeta(sku)))
      .join('');

    // Actualizar badges de precio (los que usan data-nombre)
    document.querySelectorAll('.precio[data-nombre]').forEach(el => {
      const precio = obtenerPrecio(el.dataset.nombre);
      if (precio) el.textContent = `$${precio} MXN`;
    });

    // Verificar stock para botones agotados (reutiliza función de carrito.js)
    if (typeof verificarStockBotones === 'function') {
      verificarStockBotones();
    }

    // Highlight target si viene de la página de looks
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1);
      const targetElement = document.getElementById(hashId);
      
      if (targetElement) {
        const cardElement = targetElement.querySelector('.highlight-target');
        
        // Función para hacer scroll e iluminar
        const enfocarProducto = () => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (cardElement && !cardElement.classList.contains('glow-effect')) {
            cardElement.classList.add('glow-effect');
            setTimeout(() => cardElement.classList.remove('glow-effect'), 3000);
          }
        };

        // Scroll inmediato
        setTimeout(enfocarProducto, 100);
        
        // Scroll extra para compensar la carga de imágenes lazy
        setTimeout(enfocarProducto, 800);
        setTimeout(enfocarProducto, 2000);
      }
    }

  } catch (err) {
    console.error('render-catalogo:', err);
    grid.innerHTML = '<p style="color:#c0392b;padding:20px;font-family:Montserrat,sans-serif;font-size:13px;">Error al cargar productos. Intenta de nuevo.</p>';
  }
}

document.addEventListener('DOMContentLoaded', iniciarCatalogo);
