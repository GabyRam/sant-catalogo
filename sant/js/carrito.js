// ════════════════════════════════════════════════════════════
// js/carrito.js — reemplaza el archivo completo
// ════════════════════════════════════════════════════════════

const WA_NUMERO = '5554705157';

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let modalActual = null;
let modalCantidad = 1;
let modalTallaSeleccionada = null;
let modalColorSeleccionado = null;

const PRECIOS = {
  'Top': 369,
  'Playera': 299,
  'Short': 299,
  'Biker': 389,
  'Leggings': 499,
  'Chamarra': 499,
  'Jumper': 499,
  'Falda': 499,
  'Legging Flare': 549,
  'Calceta Yoga': 65,
  'Calceta Moda': 60,
  'Vestido': 549
};

// Precio individual de cada tipo de calceta
const CALCETAS_PRECIOS = {
  'Calceta Yoga': 65,
  'Calceta Moda': 60,
  'Calceta Moda Lisa': 60,
};

// Nombres de calcetas que aplican la promo 2x$100
const CALCETAS = Object.keys(CALCETAS_PRECIOS);

// Calcula el total aplicando la promo de calcetas (precios individuales distintos)
function calcularTotal(carrito) {
  let totalOtros = 0;
  // Lista de precios individuales de cada unidad de calceta
  let unidades = [];

  carrito.forEach(item => {
    if (CALCETAS.includes(item.nombre)) {
      for (let i = 0; i < item.cantidad; i++) {
        unidades.push(CALCETAS_PRECIOS[item.nombre]);
      }
    } else {
      totalOtros += item.precio * item.cantidad;
    }
  });

  // Ordenar de mayor a menor para que el ahorro sea máximo al parear
  unidades.sort((a, b) => b - a);

  const totalCalcetas = unidades.length;
  const pares = Math.floor(totalCalcetas / 2);
  const precioNormal = unidades.reduce((s, p) => s + p, 0);

  // Pares a $100, la calceta suelta (si hay) paga su precio individual
  const precioSuelta = totalCalcetas % 2 === 1 ? unidades[unidades.length - 1] : 0;
  const precioConPromo = (pares * 100) + precioSuelta;
  const ahorro = precioNormal - precioConPromo;

  return {
    total: totalOtros + precioConPromo,
    totalCalcetas,
    pares,
    ahorro: Math.max(0, ahorro)
  };
}


// ── PANEL ──
function toggleCarrito() {
  document.getElementById('carritoPanel').classList.toggle('abierto');
  document.getElementById('carritoBackdrop').classList.toggle('visible');
}

// ── BADGE ──
function actualizarBadge() {
  const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const badge = document.getElementById('carritoBadge');
  if (!badge) return; //
  badge.textContent = total;
  badge.dataset.count = total;
}

// ── RENDER ITEMS ──
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
  if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-MX')}` + ' MXN';

  // Nota de promo si aplica
  const promoHtml = (pares > 0 && ahorro > 0)
    ? `<div class="carrito-promo-nota">Promo calcetas 2x$100 aplicada · Ahorro: $${ahorro}</div>`
    : '';

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
    </div>
  `;
  }).join('');
}

function cambiarCantidadItem(i, delta) {
  carrito[i].cantidad = Math.max(1, carrito[i].cantidad + delta);
  guardarCarrito();
  renderCarrito();
  actualizarBadge();
}

function eliminarItem(i) {
  carrito.splice(i, 1);
  guardarCarrito();
  renderCarrito();
  actualizarBadge();
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// ── WHATSAPP ──
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
  if (pares > 0) {
    msg += `Promo calcetas (2x$100) aplicada — Ahorro: $${ahorro}\n`;
  }
  msg += `Total: $${total.toLocaleString('es-MX')} MXN\n\n`;

  msg += '¿Pueden confirmarme disponibilidad? 🙏\n\n';
  msg += '_*Nota: Los precios mostrados son de referencia y pueden estar sujetos a cambios. El total final será confirmado por el equipo de SA/NT Activewear.*_';
  window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── MODAL ──
function abrirModal(nombre, codigo, tallas, colores) {
  const precio = obtenerPrecio(nombre);
  modalActual = { nombre, codigo, precio, tallas, colores };
  modalCantidad = 1;
  modalTallaSeleccionada = null;
  modalColorSeleccionado = null;

  document.getElementById('modalNombre').textContent = nombre;
  document.getElementById('modalCodigo').textContent = codigo;
  document.getElementById('modalPrecio').textContent = `$ ${precio} MXN`;
  document.getElementById('modalCantidad').textContent = 1;

  document.getElementById('modalTallas').innerHTML = tallas.map(t =>
    `<button class="talla-btn" onclick="seleccionarTalla(this,'${t}')">${t}</button>`
  ).join('');

  document.getElementById('modalColoresSel').innerHTML = colores.map(c =>
    `<button class="modal-color-btn" 
        style="${c.img
      ? `background-image:url('${c.img}');background-size:cover;background-position:center;`
      : `background:${c.bg};`}" 
        title="${c.nombre}" 
        onclick="seleccionarColor(this,'${c.nombre}')">
    </button>`
  ).join('');

  // FIX: primero hacerlo visible, luego agregar clase para animación
  const modal = document.getElementById('modalAgregar');
  modal.style.visibility = 'visible'; // redundante pero seguro
  requestAnimationFrame(() => modal.classList.add('abierto'));
  document.getElementById('modalBackdrop').classList.add('visible');
}

function cerrarModal() {
  const modal = document.getElementById('modalAgregar');
  modal.classList.remove('abierto');
  document.getElementById('modalBackdrop').classList.remove('visible');
}

function seleccionarTalla(btn, talla) {
  document.querySelectorAll('.talla-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  modalTallaSeleccionada = talla;
}

function seleccionarColor(btn, nombre) {
  document.querySelectorAll('.modal-color-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  modalColorSeleccionado = nombre;
}

function cambiarCantidad(delta) {
  modalCantidad = Math.max(1, modalCantidad + delta);
  document.getElementById('modalCantidad').textContent = modalCantidad;
}

function confirmarAgregar() {
  if (!modalTallaSeleccionada) {
    alert('Por favor selecciona una talla');
    return;
  }
  if (modalActual.colores.length > 0 && !modalColorSeleccionado) {
    alert('Por favor selecciona un color');
    return;
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

  // Abrir panel tras cerrar modal
  setTimeout(() => {
    if (!document.getElementById('carritoPanel').classList.contains('abierto')) {
      document.getElementById('carritoPanel').classList.add('abierto');
      document.getElementById('carritoBackdrop').classList.add('visible');
    }
  }, 400);
}

function vaciarCarrito() {
  if (carrito.length === 0) return;
  if (!confirm('¿Seguro que quieres vaciar el carrito?')) return;
  carrito = [];
  guardarCarrito();
  renderCarrito();
  actualizarBadge();
}

function obtenerPrecio(nombre) {
  // Buscar coincidencia exacta primero
  if (PRECIOS[nombre]) return PRECIOS[nombre];

  // Buscar por categoría si no hay coincidencia exacta
  if (nombre.includes('Top') || nombre.includes('Tank') || nombre.includes('Crop')) return PRECIOS['Top'];
  if (nombre.includes('Legging') && !nombre.includes('Flare')) return PRECIOS['Leggings'];
  if (nombre.includes('Legging Flare') || nombre.includes('Flare')) return PRECIOS['Legging Flare'];
  if (nombre.includes('Short')) return PRECIOS['Short'];
  if (nombre.includes('Chamarra')) return PRECIOS['Chamarra'];
  if (nombre.includes('Falda')) return PRECIOS['Falda'];
  if (nombre.includes('Playera')) return PRECIOS['Playera'];
  if (nombre.includes('Vestido')) return PRECIOS['Vestido'];
  if (nombre.includes('Jumper')) return PRECIOS['Jumper'];
  if (nombre.includes('Biker')) return PRECIOS['Biker'];

  return 0;
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  renderCarrito();
  actualizarBadge();

  document.querySelectorAll('.precio[data-nombre]').forEach(el => {
    const precio = PRECIOS[el.dataset.nombre];
    if (precio) el.textContent = `$${precio}` + ' MXN';
  });
});