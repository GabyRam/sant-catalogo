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
  'Top Deportivo': 350,
  'Tank Top': 320,
  'Top tirante ancho': 320,
  'Top nudo': 320,
  'Top asimétrico': 320,
  'Legging Cintura V': 450,
  'Legging Flare': 480,
  'Legging Yoga': 480,
  'Short': 280,
  'Vestido': 520,
  'Chamarra Básica': 650,
  'Calceta Moda': 120,
};


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

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-MX')}`;

  btnWA.disabled = false;
  cont.innerHTML = carrito.map((item, i) => `
    <div class="carrito-item">
      <div class="carrito-item-info">
        <div class="carrito-item-nombre">${item.nombre}</div>
        <div class="carrito-item-codigo">${item.codigo}</div>
        <div class="carrito-item-precio">${item.precio}</div>
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
  `).join('');
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
    msg += `${i + 1}. ${item.nombre}\n`;
    msg += `   Código: ${item.codigo}\n`;
    msg += `   Talla: ${item.talla} · Color: ${item.color} · Cantidad: ${item.cantidad} · Precio: $${item.precio} c/u\n\n`;
  });

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  msg += `Total: $${total.toLocaleString('es-MX')}\n\n`;  // ← agregar

  msg += '¿Pueden confirmarme disponibilidad? 🙏\n\n';
  msg += '_*Nota: Los precios mostrados son de referencia y pueden estar sujetos a cambios. El total final será confirmado por el equipo de SA/NT Activewear.*_';
  window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── MODAL ──
function abrirModal(nombre, codigo, tallas, colores) {
  const precio = PRECIOS[nombre] || 0;
  modalActual = { nombre, codigo, precio, tallas, colores };
  modalCantidad = 1;
  modalTallaSeleccionada = null;
  modalColorSeleccionado = null;

  document.getElementById('modalNombre').textContent = nombre;
  document.getElementById('modalCodigo').textContent = codigo;
  document.getElementById('modalPrecio').textContent = precio;
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

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || []; // ← agregar esta línea
  renderCarrito();
  actualizarBadge();

  document.querySelectorAll('.precio[data-nombre]').forEach(el => {
    const precio = PRECIOS[el.dataset.nombre];
    if (precio) el.textContent = `$${precio}`;
  });
});