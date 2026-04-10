/* ══════════════════════════════════════════════════════════════
   carrito.js — SA/NT Activewear
   Versión con Supabase para control de stock en tiempo real
   ══════════════════════════════════════════════════════════════ */

const SUPABASE_URL = 'https://voplgacjzhxyyythvugo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGxnYWNqemh4eXl5dGh2dWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NjM5ODYsImV4cCI6MjA5MTMzOTk4Nn0.b2OI5C2biWZlii4Comz7AFIvTmeh-8aBFYpt8bZ3OYQ';

const WA_NUMERO = '5554705157';
const LIMITE_ULTIMAS_PIEZAS = 3;

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let modalActual = null;
let modalCantidad = 1;
let modalTallaSeleccionada = null;
let modalColorSeleccionado = null;

// ── Precios ────────────────────────────────────────────────────
const PRECIOS = {
  'Top': 369,
  'Crop Top': 299,
  'Playera': 299,
  'Short': 299,
  'Biker': 389,
  'Leggings': 499,
  'Legging Yoga': 499,
  'Pantalón Yoga': 499,
  'Chamarra': 499,
  'Jumper': 499,
  'Falda': 499,
  'Legging Flare': 549,
  'Calceta Yoga': 65,
  'Calceta Moda': 60,
  'Vestido': 549
};

const CALCETAS_PRECIOS = {
  'Calceta Yoga': 65,
  'Calceta Moda Blanca': 60,
  'Calceta Moda Lisa': 60,
  'Calceta Moda Diseño': 60,
};
const CALCETAS = Object.keys(CALCETAS_PRECIOS);

// ── Supabase: consultar stock ──────────────────────────────────
async function consultarStock(sku) {
  try {
    const url = `${SUPABASE_URL}/rest/v1/stock?sku=eq.${encodeURIComponent(sku)}&select=talla,color,cantidad`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (!res.ok) throw new Error('Error al consultar stock');
    const data = await res.json();
    return data;
  } catch (e) {
    console.warn('No se pudo consultar stock:', e);
    return null;
  }
}

// ── Verificar si todo el producto está agotado ────────────────
function todosAgotados(stockData, tallas, colores) {
  if (!stockData || stockData.length === 0) return false;
  for (const t of tallas) {
    for (const c of colores) {
      const v = stockData.find(s => s.talla === t && s.color === c.nombre);
      if (!v || v.cantidad > 0) return false;
    }
  }
  return true;
}

// ── Mensaje de disponibilidad ──────────────────────────────────
function actualizarMensajeStock() {
  // Quitar mensaje anterior
  const prevMsg = document.getElementById('stock-mensaje');
  if (prevMsg) prevMsg.remove();

  if (!modalActual.stockData || (!modalTallaSeleccionada && !modalColorSeleccionado)) return;

  const stockData = modalActual.stockData;
  let cantidad = null;

  if (modalTallaSeleccionada && modalColorSeleccionado) {
    // Combinación exacta seleccionada
    const v = stockData.find(s => s.talla === modalTallaSeleccionada && s.color === modalColorSeleccionado);
    cantidad = v ? v.cantidad : 0;
  } else if (modalTallaSeleccionada) {
    // Solo talla seleccionada — buscar el mínimo entre sus colores disponibles
    const variantes = stockData.filter(s => s.talla === modalTallaSeleccionada && s.cantidad > 0);
    if (variantes.length > 0) cantidad = Math.min(...variantes.map(v => v.cantidad));
  } else if (modalColorSeleccionado) {
    // Solo color seleccionado — buscar el mínimo entre sus tallas disponibles
    const variantes = stockData.filter(s => s.color === modalColorSeleccionado && s.cantidad > 0);
    if (variantes.length > 0) cantidad = Math.min(...variantes.map(v => v.cantidad));
  }

  if (cantidad === null) return;

  let msg = '';
  let estilo = '';

  if (cantidad === 0) {
    msg = 'Agotado, elige otra talla/color';
    estilo = 'color:#c0392b; background:#fdf0f0; border:1px solid #f5c6cb;';
  } else if (cantidad <= LIMITE_ULTIMAS_PIEZAS && cantidad > 1) {
    msg = `¡Últimas ${cantidad} piezas disponibles!`;
    estilo = 'color:#856404; background:#fff8e1; border:1px solid #ffe08a;';
  } else if (cantidad === 1) {
    msg = '¡Última pieza disponible!';
    estilo = 'color:#c0392b; background:#fdf0f0; border:1px solid #f5c6cb;';
  }

  if (!msg) return;

  const el = document.createElement('p');
  el.id = 'stock-mensaje';
  el.textContent = msg;
  el.style.cssText = `${estilo} font-size:12px; letter-spacing:0.5px; padding:8px 12px; border-radius:6px; margin:10px 0 0 0; font-family:'Montserrat',sans-serif;`;

  // Insertarlo después de los colores
  const coloresCont = document.getElementById('modalColoresSel');
  coloresCont.insertAdjacentElement('afterend', el);
}

// ── Modal ──────────────────────────────────────────────────────
async function abrirModal(nombre, codigo, tallas, colores) {
  const precio = obtenerPrecio(nombre);
  modalActual = { nombre, codigo, precio, tallas, colores, stockData: null };
  modalCantidad = 1;
  modalTallaSeleccionada = null;
  modalColorSeleccionado = null;

  document.getElementById('modalNombre').textContent = nombre;
  document.getElementById('modalCodigo').textContent = codigo;
  document.getElementById('modalPrecio').textContent = `$ ${precio} MXN`;
  document.getElementById('modalCantidad').textContent = 1;

  // Resetear botón a estado normal al abrir el modal
  const btnAgregar = document.getElementById('modalBtnAgregar');
  if (btnAgregar) {
    btnAgregar.disabled = false;
    btnAgregar.textContent = 'Agregar a la bolsa';
    btnAgregar.style.opacity = '';
    btnAgregar.style.cursor = '';
  }

  const modal = document.getElementById('modalAgregar');
  modal.style.visibility = 'visible';
  requestAnimationFrame(() => modal.classList.add('abierto'));
  document.getElementById('modalBackdrop').classList.add('visible');

  // Render inicial mientras carga
  renderTallas(tallas, null, null);
  renderColores(colores, null, null);

  const tallasCont = document.getElementById('modalTallas');
  tallasCont.insertAdjacentHTML('beforeend', '<span class="stock-cargando" style="font-size:11px;color:#aaa;letter-spacing:1px;display:block;margin-top:6px;">Verificando disponibilidad…</span>');

  const stockData = await consultarStock(codigo);

  const cargando = tallasCont.querySelector('.stock-cargando');
  if (cargando) cargando.remove();

  if (stockData && stockData.length > 0) {
    modalActual.stockData = stockData;
    renderTallas(tallas, stockData, null);
    renderColores(colores, stockData, null);

    // Si TODAS las combinaciones tienen stock 0 → deshabilitar botón
    if (todosAgotados(stockData, tallas, colores)) {
      const btnConfirmar = document.getElementById('modalBtnAgregar');
      if (btnConfirmar) {
        btnConfirmar.disabled = true;
        btnConfirmar.textContent = 'Sin stock';
        btnConfirmar.style.backgroundColor = '#f5c6cb';
        btnConfirmar.style.opacity = '0.45';
        btnConfirmar.style.cursor = 'not-allowed';
      }
    } else {
      const btnConfirmar = document.getElementById('modalBtnAgregar');
      if (btnConfirmar) {
        btnConfirmar.disabled = false;
        btnConfirmar.textContent = '+ Agregar a la bolsa';
        btnConfirmar.style.opacity = '';
        btnConfirmar.style.cursor = '';
      }
    }
  }
}

// ── Render tallas ──────────────────────────────────────────────
function renderTallas(tallas, stockData, colorSeleccionado) {
  document.getElementById('modalTallas').innerHTML = tallas.map(t => {
    let agotada = false;
    if (stockData) {
      if (colorSeleccionado) {
        const v = stockData.find(s => s.talla === t && s.color === colorSeleccionado);
        agotada = v ? v.cantidad === 0 : false;
      } else {
        agotada = modalActual.colores.every(c => {
          const v = stockData.find(s => s.talla === t && s.color === c.nombre);
          return v ? v.cantidad === 0 : false;
        });
      }
    }
    return `<button
      class="talla-btn${agotada ? ' agotado' : ''}"
      ${agotada ? 'disabled title="Agotado"' : `onclick="seleccionarTalla(this,'${t}')"`}
    >${t}${agotada ? ' ✕' : ''}</button>`;
  }).join('');

  // Restaurar selección previa si sigue disponible
  if (modalTallaSeleccionada) {
    const btn = [...document.querySelectorAll('.talla-btn')].find(b => b.textContent.trim().startsWith(modalTallaSeleccionada));
    if (btn && !btn.disabled) btn.classList.add('selected');
  }
}

// ── Render colores ─────────────────────────────────────────────
function renderColores(colores, stockData, tallaSeleccionada) {
  document.getElementById('modalColoresSel').innerHTML = colores.map(c => {
    let agotado = false;
    if (stockData) {
      if (tallaSeleccionada) {
        const v = stockData.find(s => s.talla === tallaSeleccionada && s.color === c.nombre);
        agotado = v ? v.cantidad === 0 : false;
      } else {
        agotado = modalActual.tallas.every(t => {
          const v = stockData.find(s => s.talla === t && s.color === c.nombre);
          return v ? v.cantidad === 0 : false;
        });
      }
    }
    return `<button
      class="modal-color-btn${agotado ? ' agotado' : ''}"
      style="${c.img
        ? `background-image:url('${c.img}');background-size:cover;background-position:center;`
        : `background:${c.bg};`}${agotado ? 'opacity:0.35;cursor:not-allowed;' : ''}"
      title="${c.nombre}${agotado ? ' (Agotado)' : ''}"
      ${agotado ? 'disabled' : `onclick="seleccionarColor(this,'${c.nombre}')"`}
    ></button>`;
  }).join('');

  // Restaurar selección previa si sigue disponible
  if (modalColorSeleccionado) {
    const btn = [...document.querySelectorAll('.modal-color-btn')].find(b => b.title === modalColorSeleccionado);
    if (btn && !btn.disabled) btn.classList.add('selected');
  }
}

// ── Seleccionar talla ──────────────────────────────────────────
function seleccionarTalla(btn, talla) {
  document.querySelectorAll('.talla-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  modalTallaSeleccionada = talla;
  modalCantidad = 1;
  document.getElementById('modalCantidad').textContent = 1;
  if (modalActual.stockData) {
    renderColores(modalActual.colores, modalActual.stockData, talla);
  }
  actualizarMensajeStock();
  actualizarBtnMas();
}

// ── Seleccionar color ──────────────────────────────────────────
function seleccionarColor(btn, nombre) {
  document.querySelectorAll('.modal-color-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  modalColorSeleccionado = nombre;
  modalCantidad = 1;
  document.getElementById('modalCantidad').textContent = 1;
  if (modalActual.stockData) {
    renderTallas(modalActual.tallas, modalActual.stockData, nombre);
  }
  actualizarMensajeStock();
  actualizarBtnMas();
}

function cerrarModal() {
  const modal = document.getElementById('modalAgregar');
  modal.classList.remove('abierto');
  document.getElementById('modalBackdrop').classList.remove('visible');
  // Limpiar mensaje de stock
  const msg = document.getElementById('stock-mensaje');
  if (msg) msg.remove();
}

// ── Stock disponible para la combo actual ──────────────────────
function obtenerStockCombo() {
  if (!modalActual?.stockData || !modalTallaSeleccionada || !modalColorSeleccionado) return Infinity;
  const v = modalActual.stockData.find(s => s.talla === modalTallaSeleccionada && s.color === modalColorSeleccionado);
  return v ? v.cantidad : Infinity;
}

function actualizarBtnMas() {
  const btnMas = document.getElementById('modalBtnMas');
  if (!btnMas) return;
  const maxStock = obtenerStockCombo();
  const limite = maxStock === Infinity ? Infinity : maxStock;
  if (modalCantidad >= limite) {
    btnMas.disabled = true;
    btnMas.style.opacity = '0.35';
    btnMas.style.cursor = 'not-allowed';
  } else {
    btnMas.disabled = false;
    btnMas.style.opacity = '';
    btnMas.style.cursor = '';
  }
}

function cambiarCantidad(delta) {
  const maxStock = obtenerStockCombo();
  modalCantidad = Math.min(maxStock, Math.max(1, modalCantidad + delta));
  document.getElementById('modalCantidad').textContent = modalCantidad;
  actualizarBtnMas();
}

function confirmarAgregar() {
  if (!modalTallaSeleccionada) { alert('Por favor selecciona una talla'); return; }
  if (modalActual.colores.length > 0 && !modalColorSeleccionado) {
    alert('Por favor selecciona un color'); return;
  }

  // Verificar límite de stock
  if (modalActual.stockData) {
    const v = modalActual.stockData.find(s => s.talla === modalTallaSeleccionada && s.color === modalColorSeleccionado);
    if (v && v.cantidad === 0) {
      alert('Esta combinación está agotada. Por favor elige otra talla o color.');
      return;
    }
    if (v && v.cantidad > 0) {
      // Contar cuántas ya hay en el carrito para esta combo
      const enCarrito = carrito.find(item =>
        item.nombre === modalActual.nombre &&
        item.talla === modalTallaSeleccionada &&
        item.color === (modalColorSeleccionado || '—')
      );
      const yaEnCarrito = enCarrito ? enCarrito.cantidad : 0;
      if (yaEnCarrito + modalCantidad > v.cantidad) {
        const disponible = v.cantidad - yaEnCarrito;
        if (disponible <= 0) {
          alert(`Ya tienes el máximo disponible (${v.cantidad} pza${v.cantidad !== 1 ? 's' : ''}) en tu bolsa.`);
        } else {
          alert(`Solo puedes agregar ${disponible} pieza${disponible !== 1 ? 's' : ''} más (stock: ${v.cantidad}).`);
        }
        return;
      }
    }
  }

  const existe = carrito.find(item =>
    item.nombre === modalActual.nombre &&
    item.talla === modalTallaSeleccionada &&
    item.color === (modalColorSeleccionado || '—')
  );
  if (existe) {
    existe.cantidad += modalCantidad;
  } else {
    carrito.push({
      nombre: modalActual.nombre,
      codigo: modalActual.codigo,
      precio: modalActual.precio,
      talla: modalTallaSeleccionada,
      color: modalColorSeleccionado || '—',
      cantidad: modalCantidad
    });
  }
  guardarCarrito();
  cerrarModal();
  renderCarrito();
  actualizarBadge();
  setTimeout(() => {
    if (!document.getElementById('carritoPanel').classList.contains('abierto')) {
      document.getElementById('carritoPanel').classList.add('abierto');
      document.getElementById('carritoBackdrop').classList.add('visible');
    }
  }, 400);
}

// ── Calcular total con promo calcetas ─────────────────────────
function calcularTotal(carrito) {
  let totalOtros = 0;
  let unidades = [];
  carrito.forEach(item => {
    if (CALCETAS.includes(item.nombre)) {
      for (let i = 0; i < item.cantidad; i++) unidades.push(CALCETAS_PRECIOS[item.nombre]);
    } else {
      totalOtros += item.precio * item.cantidad;
    }
  });
  unidades.sort((a, b) => b - a);
  const totalCalcetas = unidades.length;
  const pares = Math.floor(totalCalcetas / 2);
  const precioNormal = unidades.reduce((s, p) => s + p, 0);
  const precioSuelta = totalCalcetas % 2 === 1 ? unidades[unidades.length - 1] : 0;
  const precioConPromo = (pares * 100) + precioSuelta;
  return {
    total: totalOtros + precioConPromo,
    totalCalcetas,
    pares,
    ahorro: Math.max(0, precioNormal - precioConPromo)
  };
}

// ── Panel carrito ──────────────────────────────────────────────
function toggleCarrito() {
  document.getElementById('carritoPanel').classList.toggle('abierto');
  document.getElementById('carritoBackdrop').classList.toggle('visible');
}

function actualizarBadge() {
  const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const badge = document.getElementById('carritoBadge');
  if (!badge) return;
  badge.textContent = total;
  badge.dataset.count = total;
}

function renderCarrito() {
  const cont = document.getElementById('carritoItems');
  const btnWA = document.querySelector('.carrito-whatsapp');
  const totalEl = document.getElementById('carritoTotal');
  if (carrito.length === 0) {
    cont.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
    btnWA.disabled = true;
    if (totalEl) totalEl.textContent = '$0';
    return;
  }
  const { total, pares, ahorro } = calcularTotal(carrito);
  if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-MX')} MXN`;
  const promoHtml = (pares > 0 && ahorro > 0)
    ? `<div class="carrito-promo-nota">Promo calcetas 2x$100 aplicada · Ahorro: $${ahorro}</div>` : '';
  btnWA.disabled = false;
  cont.innerHTML = promoHtml + carrito.map((item, i) => {
    const esCalceta = CALCETAS.includes(item.nombre);
    return `
    <div class="carrito-item">
      <div class="carrito-item-info">
        <div class="carrito-item-nombre">${item.nombre}</div>
        <div class="carrito-item-codigo">${item.codigo}</div>
        <div class="carrito-item-precio">${esCalceta ? `1 x $${CALCETAS_PRECIOS[item.nombre]} · 2 x $100` : '$' + item.precio + ' MXN'}</div>
        <div class="carrito-item-detalle">Talla: ${item.talla} · Color: ${item.color}</div>
        <div class="carrito-item-acciones">
          <div class="carrito-item-cant">
            <button onclick="cambiarCantidadItem(${i}, -1)">−</button>
            <span>${item.cantidad}</span>
            <button onclick="cambiarCantidadItem(${i}, 1)">+</button>
          </div>
          <button class="carrito-item-eliminar" onclick="eliminarItem(${i})">✕</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function cambiarCantidadItem(i, delta) {
  carrito[i].cantidad = Math.max(1, carrito[i].cantidad + delta);
  guardarCarrito(); renderCarrito(); actualizarBadge();
}

function eliminarItem(i) {
  carrito.splice(i, 1);
  guardarCarrito(); renderCarrito(); actualizarBadge();
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function vaciarCarrito() {
  if (carrito.length === 0) return;
  if (!confirm('¿Seguro que quieres vaciar el carrito?')) return;
  carrito = []; guardarCarrito(); renderCarrito(); actualizarBadge();
}

// ── WhatsApp ───────────────────────────────────────────────────
function enviarWhatsApp() {
  if (carrito.length === 0) return;
  let msg = '¡Hola! Me gustaría hacer el siguiente pedido:\n\n';
  carrito.forEach((item, i) => {
    const esCalceta = CALCETAS.includes(item.nombre);
    msg += `${i + 1}. ${item.nombre}\n`;
    msg += `   Código: ${item.codigo}\n`;
    msg += `   Talla: ${item.talla} · Color: ${item.color} · Cantidad: ${item.cantidad}`;
    msg += esCalceta ? ` · Precio: 1x$60 / 2x$100` : ` · Precio: $${item.precio} c/u`;
    msg += '\n\n';
  });
  const { total, pares, ahorro } = calcularTotal(carrito);
  if (pares > 0) msg += `Promo calcetas (2x$100) aplicada — Ahorro: $${ahorro}\n`;
  msg += `Total: $${total.toLocaleString('es-MX')} MXN\n\n`;
  msg += '¿Pueden confirmarme disponibilidad? 🙏\n\n';
  msg += '_*Nota: Los precios mostrados son de referencia y pueden estar sujetos a cambios. El total final será confirmado por el equipo de SA/NT Activewear.*_';
  window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── Helpers ────────────────────────────────────────────────────
function obtenerPrecio(nombre) {
  if (PRECIOS[nombre]) return PRECIOS[nombre];
  if (CALCETAS_PRECIOS[nombre]) return CALCETAS_PRECIOS[nombre];
  if (nombre.includes('Calceta')) return 60;
  if (nombre.includes('Top') || nombre.includes('Tank') || nombre.includes('Crop')) return PRECIOS['Top'];
  if (nombre.includes('Legging') && !nombre.includes('Flare')) return PRECIOS['Leggings'];
  if (nombre.includes('Flare')) return PRECIOS['Legging Flare'];
  if (nombre.includes('Short')) return PRECIOS['Short'];
  if (nombre.includes('Chamarra')) return PRECIOS['Chamarra'];
  if (nombre.includes('Falda')) return PRECIOS['Falda'];
  if (nombre.includes('Playera')) return PRECIOS['Playera'];
  if (nombre.includes('Vestido')) return PRECIOS['Vestido'];
  if (nombre.includes('Jumper')) return PRECIOS['Jumper'];
  if (nombre.includes('Biker')) return PRECIOS['Biker'];
  return 0;
}

// ── Verificar stock al cargar la página ────────────────────────
async function verificarStockBotones() {
  const botones = document.querySelectorAll('.btn-agregar-carrito');
  const checks = [...botones].map(async btn => {
    const onclick = btn.getAttribute('onclick') || '';
    // Extraer el SKU (segundo argumento de abrirModal)
    const match = onclick.match(/abrirModal\s*\([^,]+,\s*'([^']+)'/);
    if (!match) return;
    const sku = match[1];
    const stockData = await consultarStock(sku);
    if (stockData && stockData.length > 0 && stockData.every(s => s.cantidad === 0)) {
      btn.disabled = true;
      btn.textContent = 'Sin stock';
      btn.style.backgroundColor = '#f5c6cb';
      btn.style.color = '#721c24';
      btn.style.border = 'none';
      btn.style.opacity = '0.45';
      btn.style.cursor = 'not-allowed';
    }
  });
  await Promise.all(checks);
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  renderCarrito();
  actualizarBadge();
  document.querySelectorAll('.precio[data-nombre]').forEach(el => {
    const precio = PRECIOS[el.dataset.nombre];
    if (precio) el.textContent = `$${precio} MXN`;
  });
  // Deshabilitar botones sin stock desde el inicio
  verificarStockBotones();
});