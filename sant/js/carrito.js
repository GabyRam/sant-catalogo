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
    'Top': 369, 'Crop Top': 299, 'Playera': 299, 'Short': 299,
    'Biker': 389, 'Leggings': 499, 'Legging Yoga': 499,
    'Pantalón Yoga': 499, 'Chamarra': 499, 'Jumper': 499,
    'Falda': 499, 'Legging Flare': 549, 'Calceta Yoga': 65,
    'Calceta Moda': 60, 'Vestido': 549
};

const CALCETAS_PRECIOS = {
    'Calceta Yoga': 65, 'Calceta Moda Blanca': 60,
    'Calceta Moda Lisa': 60, 'Calceta Moda Diseño': 60,
};
const CALCETAS = Object.keys(CALCETAS_PRECIOS);

// ── Supabase: consultar stock ──────────────────────────────────
async function consultarStock(sku) {
    try {
        const url = `${SUPABASE_URL}/rest/v1/stock?sku=eq.${encodeURIComponent(sku)}&select=talla,color,cantidad,reservado`;
        const res = await fetch(url, {
            headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
        });
        if (!res.ok) throw new Error('Error al consultar stock');
        const data = await res.json();
        // Cantidad disponible = cantidad total − reservado
        return data.map(s => ({ ...s, cantidad: Math.max(0, s.cantidad - (s.reservado || 0)) }));
    } catch (e) {
        console.warn('No se pudo consultar stock:', e);
        return null;
    }
}

// ── Supabase: guardar pedido ───────────────────────────────────
async function guardarPedido(nombre, telefono) {
    try {
        const { total } = calcularTotal(carrito);

        // 1. Insertar pedido
        const res = await fetch(`${SUPABASE_URL}/rest/v1/pedidos`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ nombre, telefono, items: carrito, total })
        });
        if (!res.ok) throw new Error('Error al guardar pedido');

        // 2. Leer el número de pedido recién creado
        const params = new URLSearchParams({
            nombre: `eq.${nombre}`,
            telefono: `eq.${telefono}`,
            select: 'numero_pedido',
            order: 'creado_en.desc',
            limit: '1'
        });
        const get = await fetch(`${SUPABASE_URL}/rest/v1/pedidos?${params}`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        if (!get.ok) return null; // Si no hay SELECT, igual el pedido se guardó
        const data = await get.json();
        return data[0]?.numero_pedido || null;
    } catch (e) {
        console.warn('No se pudo guardar el pedido:', e);
        return null;
    }
}

// ── Supabase: reservar stock ───────────────────────────────────
async function reservarStock(items) {
    try {
        const payload = items.map(item => ({
            codigo: item.codigo,
            talla: item.talla,
            color: item.color,
            cantidad: item.cantidad
        }));
        await fetch(`${SUPABASE_URL}/rest/v1/rpc/reservar_stock`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: payload })
        });
    } catch (e) {
        console.warn('No se pudo reservar stock:', e);
    }
}

// ── Verificar si todo el producto está agotado ────────────────
function todosAgotados(stockData, tallas, colores) {
    if (!stockData || stockData.length === 0) return false;
    
    if (!colores || colores.length === 0) {
        for (const t of tallas) {
            const v = stockData.find(s => s.talla === t);
            if (!v || v.cantidad > 0) return false;
        }
        return true;
    }

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
    const prevMsg = document.getElementById('stock-mensaje');
    if (prevMsg) prevMsg.remove();
    const requiereColor = modalActual.colores?.length > 0;
    if (!modalActual.stockData || !modalTallaSeleccionada || (requiereColor && !modalColorSeleccionado)) return;

    const stockData = modalActual.stockData;
    let cantidad = null;

    if (modalTallaSeleccionada && modalColorSeleccionado) {
        const v = stockData.find(s => s.talla === modalTallaSeleccionada && s.color === modalColorSeleccionado);
        cantidad = v ? v.cantidad : 0;
    } else if (modalTallaSeleccionada) {
        const variantes = stockData.filter(s => s.talla === modalTallaSeleccionada && s.cantidad > 0);
        if (variantes.length > 0) cantidad = Math.min(...variantes.map(v => v.cantidad));
    } else if (modalColorSeleccionado) {
        const variantes = stockData.filter(s => s.color === modalColorSeleccionado && s.cantidad > 0);
        if (variantes.length > 0) cantidad = Math.min(...variantes.map(v => v.cantidad));
    }

    if (cantidad === null) return;

    let msg = '', estilo = '';
    if (cantidad === 0) {
        msg = 'Agotado, elige otra talla/color';
        estilo = 'color:#c0392b;background:#fdf0f0;border:1px solid #f5c6cb;';
    } else if (cantidad <= LIMITE_ULTIMAS_PIEZAS && cantidad > 1) {
        msg = `¡Últimas ${cantidad} piezas disponibles!`;
        estilo = 'color:#856404;background:#fff8e1;border:1px solid #ffe08a;';
    } else if (cantidad === 1) {
        msg = '¡Última pieza disponible!';
        estilo = 'color:#c0392b;background:#fdf0f0;border:1px solid #f5c6cb;';
    }
    if (!msg) return;

    const el = document.createElement('p');
    el.id = 'stock-mensaje';
    el.textContent = msg;
    el.style.cssText = `${estilo}font-size:12px;letter-spacing:0.5px;padding:8px 12px;border-radius:6px;margin:10px 0 0 0;font-family:'Montserrat',sans-serif;`;
    document.getElementById('modalColoresSel').insertAdjacentElement('afterend', el);
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

    const btnAgregar = document.getElementById('modalBtnAgregar');
    if (btnAgregar) {
        btnAgregar.disabled = false;
        btnAgregar.textContent = 'Agregar al carrito';
        btnAgregar.classList.remove('btn-notificar');
        btnAgregar.style.opacity = '';
        btnAgregar.style.cursor = '';
    }
    // El botón + arranca deshabilitado hasta que se elija talla y color
    actualizarBtnMas();

    const modal = document.getElementById('modalAgregar');
    modal.style.visibility = 'visible';
    requestAnimationFrame(() => modal.classList.add('abierto'));
    document.getElementById('modalBackdrop').classList.add('visible');

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
        actualizarBtnAgregar();
    }
}

// ── Render tallas ──────────────────────────────────────────────
function renderTallas(tallas, stockData, colorSeleccionado) {
    // Limpiar talla si ahora es incompatible con el color seleccionado
    if (colorSeleccionado && modalTallaSeleccionada) {
        const cObj = modalActual.colores.find(c => c.nombre === colorSeleccionado);
        if (cObj && cObj.noTallas && cObj.noTallas.includes(modalTallaSeleccionada)) {
            modalTallaSeleccionada = null;
        }
    }

    document.getElementById('modalTallas').innerHTML = tallas.map(t => {
        // No renderizar la talla si el color seleccionado explícitamente no la tiene
        if (colorSeleccionado) {
            const cObj = modalActual.colores.find(c => c.nombre === colorSeleccionado);
            if (cObj && cObj.noTallas && cObj.noTallas.includes(t)) return '';
        }

        let agotada = false;
        if (stockData) {
            if (colorSeleccionado) {
                const v = stockData.find(s => s.talla === t && s.color === colorSeleccionado);
                agotada = v ? v.cantidad === 0 : false;
            } else {
                agotada = modalActual.colores.every(c => {
                    // Si este color ni siquiera tiene esta talla, consideramos que para este color no aporta stock
                    if (c.noTallas && c.noTallas.includes(t)) return true;
                    const v = stockData.find(s => s.talla === t && s.color === c.nombre);
                    return v ? v.cantidad === 0 : false;
                });
            }
        }
        return `<button class="talla-btn${agotada ? ' agotado' : ''}"
      onclick="${agotada ? `tallaAgotadaClick(this,'${t}')` : `seleccionarTalla(this,'${t}')`}"
    >${t}</button>`;
    }).join('');

    if (modalTallaSeleccionada) {
        const btn = [...document.querySelectorAll('.talla-btn')].find(b => b.textContent.trim() === modalTallaSeleccionada);
        if (btn) btn.classList.add('selected');
    }
}

// ── Render colores ─────────────────────────────────────────────
function renderColores(colores, stockData, tallaSeleccionada) {
    // Limpiar color si ahora es incompatible con la talla seleccionada
    if (tallaSeleccionada && modalColorSeleccionado) {
        const cObj = colores.find(c => c.nombre === modalColorSeleccionado);
        if (cObj && cObj.noTallas && cObj.noTallas.includes(tallaSeleccionada)) {
            modalColorSeleccionado = null;
        }
    }

    document.getElementById('modalColoresSel').innerHTML = colores.map(c => {
        // No renderizar el color si explícitamente no se fabrica en la talla seleccionada
        if (tallaSeleccionada && c.noTallas && c.noTallas.includes(tallaSeleccionada)) {
            return '';
        }

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
        return `<button class="modal-color-btn${agotado ? ' agotado' : ''}"
      style="${c.img
                ? `background-image:url('${c.img}');background-size:cover;background-position:center;`
                : `background:${c.bg};`}"
      title="${c.nombre}"
      onclick="${agotado ? `colorAgotadoClick(this)` : `seleccionarColor(this,'${c.nombre}')`}"
    ></button>`;
    }).join('');

    if (modalColorSeleccionado) {
        const btn = [...document.querySelectorAll('.modal-color-btn')].find(b => b.title === modalColorSeleccionado);
        if (btn) btn.classList.add('selected');
    }
}

// ── Talla agotada: seleccionar igual y mostrar botón de notificación ──
function tallaAgotadaClick(btn, talla) {
    // Seleccionar la talla visualmente aunque esté agotada
    document.querySelectorAll('.talla-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    modalTallaSeleccionada = talla;
    modalCantidad = 1;
    document.getElementById('modalCantidad').textContent = 1;

    // Refrescar colores filtrados por esta talla
    if (modalActual.stockData) renderColores(modalActual.colores, modalActual.stockData, talla);
    actualizarMensajeStock();
    actualizarBtnMas();
    actualizarBtnAgregar();
}

// ── Color agotado: seleccionar igual y mostrar botón de notificación ──
function colorAgotadoClick(btn) {
    const nombre = btn.title || '';
    if (!nombre) return;

    // Seleccionar el color visualmente aunque esté agotado
    document.querySelectorAll('.modal-color-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    modalColorSeleccionado = nombre;
    modalCantidad = 1;
    document.getElementById('modalCantidad').textContent = 1;

    // Refrescar tallas filtradas por este color
    if (modalActual.stockData) renderTallas(modalActual.tallas, modalActual.stockData, nombre);
    actualizarMensajeStock();
    actualizarBtnMas();
    actualizarBtnAgregar();
}

// ── Seleccionar talla ──────────────────────────────────────────────
function seleccionarTalla(btn, talla) {
    document.querySelectorAll('.talla-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    modalTallaSeleccionada = talla;
    modalCantidad = 1;
    document.getElementById('modalCantidad').textContent = 1;
    if (modalActual.stockData) renderColores(modalActual.colores, modalActual.stockData, talla);
    actualizarMensajeStock();
    actualizarBtnMas();
    actualizarBtnAgregar();
}

// ── Seleccionar color ──────────────────────────────────────────
function seleccionarColor(btn, nombre) {
    document.querySelectorAll('.modal-color-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    modalColorSeleccionado = nombre;
    modalCantidad = 1;
    document.getElementById('modalCantidad').textContent = 1;
    if (modalActual.stockData) renderTallas(modalActual.tallas, modalActual.stockData, nombre);
    actualizarMensajeStock();
    actualizarBtnMas();
    actualizarBtnAgregar();
}

// ── Actualizar botón Agregar según disponibilidad ───────────────────
function actualizarBtnAgregar() {
    const btn = document.getElementById('modalBtnAgregar');
    if (!btn) return;

    // Reset estilos
    btn.style.backgroundColor = '';
    btn.style.opacity = '';
    btn.style.cursor = '';
    btn.classList.remove('btn-notificar');

    const sd = modalActual.stockData;

    // ── 1. Todos los combos del producto agotados ──
    if (sd && todosAgotados(sd, modalActual.tallas, modalActual.colores)) {
        btn.disabled = false;
        btn.textContent = '🔔 Notifícame cuando vuelva';
        btn.classList.add('btn-notificar');
        btn.onclick = abrirModalRestock;
        return;
    }

    // ── 2. Talla elegida agotada en TODOS los colores ──
    if (modalTallaSeleccionada && sd && modalActual.colores.length > 0) {
        const todosColoresAgotados = modalActual.colores.every(c => {
            const v = sd.find(s => s.talla === modalTallaSeleccionada && s.color === c.nombre);
            return v ? v.cantidad === 0 : false;
        });
        if (todosColoresAgotados) {
            btn.disabled = false;
            btn.textContent = '🔔 Notifícame cuando vuelva';
            btn.classList.add('btn-notificar');
            btn.onclick = abrirModalRestock;
            return;
        }
    }

    // ── 3. Color elegido agotado en TODAS las tallas (sin talla seleccionada aún) ──
    if (modalColorSeleccionado && !modalTallaSeleccionada && sd && modalActual.tallas.length > 0) {
        const todasTallasAgotadas = modalActual.tallas.every(t => {
            const v = sd.find(s => s.talla === t && s.color === modalColorSeleccionado);
            return v ? v.cantidad === 0 : false;
        });
        if (todasTallasAgotadas) {
            btn.disabled = false;
            btn.textContent = '🔔 Notifícame cuando vuelva';
            btn.classList.add('btn-notificar');
            btn.onclick = abrirModalRestock;
            return;
        }
    }

    // ── 4. Combo talla+color seleccionada y agotada ──
    if (modalTallaSeleccionada && modalColorSeleccionado && sd) {
        const v = sd.find(s => s.talla === modalTallaSeleccionada && s.color === modalColorSeleccionado);
        if (v && v.cantidad === 0) {
            btn.disabled = false;
            btn.textContent = '🔔 Notifícame cuando vuelva';
            btn.classList.add('btn-notificar');
            btn.style.cursor = 'pointer';
            btn.onclick = abrirModalRestock;
            return;
        }
    }

    // ── 5. Disponible (o sin datos de stock aún) ──
    btn.disabled = false;
    btn.textContent = '+ Agregar al carrito';
    btn.classList.remove('btn-notificar');
    btn.onclick = confirmarAgregar;
}


function cerrarModal() {
    document.getElementById('modalAgregar').classList.remove('abierto');
    document.getElementById('modalBackdrop').classList.remove('visible');
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
    // Bloquear si no se ha completado la selección de talla y color
    const requiereColor = modalActual?.colores?.length > 0;
    if (!modalTallaSeleccionada || (requiereColor && !modalColorSeleccionado)) {
        btnMas.disabled = true;
        btnMas.style.opacity = '0.35';
        btnMas.style.cursor = 'not-allowed';
        return;
    }
    const limite = obtenerStockCombo();
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
    // No permitir cambiar cantidad si aún falta talla o color
    const requiereColor = modalActual?.colores?.length > 0;
    if (!modalTallaSeleccionada || (requiereColor && !modalColorSeleccionado)) return;
    const maxStock = obtenerStockCombo();
    modalCantidad = Math.min(maxStock, Math.max(1, modalCantidad + delta));
    document.getElementById('modalCantidad').textContent = modalCantidad;
    actualizarBtnMas();
}

function confirmarAgregar() {
    if (!modalTallaSeleccionada) { alert('Por favor selecciona una talla'); return; }
    if (modalActual.colores.length > 0 && !modalColorSeleccionado) { alert('Por favor selecciona un color'); return; }

    if (modalActual.stockData) {
        const v = modalActual.stockData.find(s => s.talla === modalTallaSeleccionada && s.color === modalColorSeleccionado);
        if (v && v.cantidad === 0) { alert('Esta combinación está agotada. Por favor elige otra talla o color.'); return; }
        if (v && v.cantidad > 0) {
            const enCarrito = carrito.find(item => item.nombre === modalActual.nombre && item.talla === modalTallaSeleccionada && item.color === (modalColorSeleccionado || '—'));
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

    // Obtener stock disponible para guardar en el item
    let stockDisponible = null;
    if (modalActual.stockData) {
        const v = modalActual.stockData.find(s => s.talla === modalTallaSeleccionada && s.color === (modalColorSeleccionado || '—'));
        if (v) stockDisponible = v.cantidad;
    }

    const existe = carrito.find(item => item.nombre === modalActual.nombre && item.talla === modalTallaSeleccionada && item.color === (modalColorSeleccionado || '—'));
    if (existe) {
        existe.cantidad += modalCantidad;
        if (stockDisponible !== null) existe.stock = stockDisponible;
    } else {
        carrito.push({ nombre: modalActual.nombre, codigo: modalActual.codigo, precio: modalActual.precio, talla: modalTallaSeleccionada, color: modalColorSeleccionado || '—', cantidad: modalCantidad, stock: stockDisponible });
    }
    guardarCarrito(); cerrarModal(); renderCarrito(); actualizarBadge();
    setTimeout(() => {
        if (!document.getElementById('carritoPanel').classList.contains('abierto')) {
            document.getElementById('carritoPanel').classList.add('abierto');
            document.getElementById('carritoBackdrop').classList.add('visible');
        }
    }, 400);
}

// ── Calcular total con promo calcetas ─────────────────────────
function calcularTotal(carrito) {
    let totalOtros = 0, unidades = [];
    carrito.forEach(item => {
        if (CALCETAS.includes(item.nombre)) {
            for (let i = 0; i < item.cantidad; i++) unidades.push(CALCETAS_PRECIOS[item.nombre]);
        } else { totalOtros += item.precio * item.cantidad; }
    });
    unidades.sort((a, b) => b - a);
    const totalCalcetas = unidades.length;
    const pares = Math.floor(totalCalcetas / 2);
    const precioNormal = unidades.reduce((s, p) => s + p, 0);
    const precioSuelta = totalCalcetas % 2 === 1 ? unidades[unidades.length - 1] : 0;
    const precioConPromo = (pares * 100) + precioSuelta;
    return { total: totalOtros + precioConPromo, totalCalcetas, pares, ahorro: Math.max(0, precioNormal - precioConPromo) };
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
    const promoHtml = (pares > 0 && ahorro > 0) ? `<div class="carrito-promo-nota">Promo calcetas 2x$100 aplicada · Ahorro: $${ahorro}</div>` : '';
    btnWA.disabled = false;
    cont.innerHTML = promoHtml + carrito.map((item, i) => {
        const esCalceta = CALCETAS.includes(item.nombre);
        return `<div class="carrito-item"><div class="carrito-item-info">
      <div class="carrito-item-nombre">${item.nombre}</div>
      <div class="carrito-item-codigo">${item.codigo}</div>
      <div class="carrito-item-precio">${esCalceta ? `1 x $${CALCETAS_PRECIOS[item.nombre]} · 2 x $100` : '$' + item.precio + ' MXN'}</div>
      <div class="carrito-item-detalle">Talla: ${item.talla} · Color: ${item.color}</div>
      <div class="carrito-item-acciones">
        <div class="carrito-item-cant">
          <button onclick="cambiarCantidadItem(${i}, -1)">−</button>
          <span>${item.cantidad}</span>
          <button onclick="cambiarCantidadItem(${i}, 1)" ${item.stock !== null && item.stock !== undefined && item.cantidad >= item.stock ? 'disabled style="opacity:0.35;cursor:not-allowed;"' : ''}>+</button>
        </div>
        <button class="carrito-item-eliminar" onclick="eliminarItem(${i})">✕</button>
      </div>
    </div></div>`;
    }).join('');
}

function cambiarCantidadItem(i, delta) {
    const item = carrito[i];
    const maxStock = (item.stock !== null && item.stock !== undefined) ? item.stock : Infinity;
    item.cantidad = Math.min(maxStock, Math.max(1, item.cantidad + delta));
    guardarCarrito(); renderCarrito(); actualizarBadge();
}

function eliminarItem(i) {
    carrito.splice(i, 1);
    guardarCarrito(); renderCarrito(); actualizarBadge();
}

function guardarCarrito() { localStorage.setItem('carrito', JSON.stringify(carrito)); }

function vaciarCarrito() {
    if (carrito.length === 0) return;
    if (!confirm('¿Seguro que quieres vaciar el carrito?')) return;
    carrito = []; guardarCarrito(); renderCarrito(); actualizarBadge();
}

let cpTimer = null;

function onCPInput(input) {
    const cp = input.value.replace(/\D/g, '');
    input.value = cp;

    const hint = document.getElementById('envioCPHint');
    const spinner = document.getElementById('envioSpinnerCP');

    if (cp.length < 5) {
        clearTimeout(cpTimer);
        spinner.classList.remove('activo');
        hint.textContent = '';
        hint.className = 'envio-cp-hint';
        resetCamposCP();
        return;
    }

    clearTimeout(cpTimer);
    spinner.classList.add('activo');
    hint.textContent = '';
    hint.className = 'envio-cp-hint';
    cpTimer = setTimeout(() => buscarCP(cp), 400);
}

async function buscarCP(cp) {
    const hint = document.getElementById('envioCPHint');
    const spinner = document.getElementById('envioSpinnerCP');

    // Intentar APIs en orden: icalialabs (Sepomex) → zippopotam
    const resultado = await intentarBuscarCP_icalialabs(cp)
        || await intentarBuscarCP_zippopotam(cp);

    spinner.classList.remove('activo');

    if (!resultado) {
        hint.textContent = 'No se encontró el CP. Verifica e intenta de nuevo';
        hint.className = 'envio-cp-hint err';
        resetCamposCP();
        return;
    }

    // Autollenar municipio y estado
    document.getElementById('envioCiudad').value = resultado.ciudad;
    document.getElementById('envioEstado').value = resultado.estado;

    // Poblar select de colonias (ordenadas alfabéticamente)
    const select = document.getElementById('envioColonia');
    const coloniasOrdenadas = [...resultado.colonias].sort((a, b) => a.localeCompare(b, 'es'));
    select.innerHTML = '<option value="">— Selecciona tu colonia —</option>';
    coloniasOrdenadas.forEach(col => {
        const opt = document.createElement('option');
        opt.value = col;
        opt.textContent = col;
        select.appendChild(opt);
    });
    select.disabled = false;
    if (coloniasOrdenadas.length === 1) select.value = coloniasOrdenadas[0];

    const n = coloniasOrdenadas.length;
    hint.textContent = `${n} colonia${n !== 1 ? 's' : ''} encontrada${n !== 1 ? 's' : ''}`;
    hint.className = 'envio-cp-hint ok';
}

// API 1: icalialabs/Sepomex — colonias reales de toda la república
async function intentarBuscarCP_icalialabs(cp) {
    try {
        const res = await fetch(
            `https://sepomex.icalialabs.com/api/v1/zip_codes?zip_code=${cp}`,
            { headers: { 'Accept': 'application/json' }, signal: AbortSignal.timeout(5000) }
        );
        if (!res.ok) return null;
        const data = await res.json();
        const registros = data?.zip_codes;
        if (!registros || registros.length === 0) return null;
        return {
            ciudad: registros[0].d_mnpio || '',
            estado: registros[0].d_estado || '',
            colonias: registros.map(r => r.d_asenta).filter(Boolean)
        };
    } catch { return null; }
}

// API 3: zippopotam.us — último recurso (solo ciudad, sin colonias detalladas)
async function intentarBuscarCP_zippopotam(cp) {
    try {
        const res = await fetch(
            `https://api.zippopotam.us/mx/${cp}`,
            { signal: AbortSignal.timeout(5000) }
        );
        if (!res.ok) return null;
        const data = await res.json();
        const places = data?.places;
        if (!places || places.length === 0) return null;
        return {
            ciudad: places[0]['place name'] || '',
            estado: places[0]['state'] || '',
            colonias: places.map(p => p['place name']).filter(Boolean)
        };
    } catch { return null; }
}

function resetCamposCP() {
    const select = document.getElementById('envioColonia');
    select.innerHTML = '<option value="">— Ingresa tu CP —</option>';
    select.disabled = true;
    document.getElementById('envioCiudad').value = '';
    document.getElementById('envioEstado').value = '';
}

// ── Abrir modal ─────────────────────────────────────────────────
function enviarWhatsApp() {
    if (carrito.length === 0) return;

    const { total, pares, ahorro } = calcularTotal(carrito);
    const resumenEl = document.getElementById('envioResumenItems');

    resumenEl.innerHTML = carrito.map(item => {
        const esCalceta = CALCETAS.includes(item.nombre);
        const subtotal = esCalceta
            ? CALCETAS_PRECIOS[item.nombre] * item.cantidad
            : item.precio * item.cantidad;
        return `<div class="envio-resumen-item">
      <span>${item.cantidad}x ${item.nombre} — T.${item.talla}${item.color !== '—' ? ' / ' + item.color : ''}</span>
      <span>$${subtotal.toLocaleString('es-MX')}</span>
    </div>`;
    }).join('');

    if (pares > 0 && ahorro > 0) {
        resumenEl.innerHTML += `<div class="envio-resumen-item" style="color:#856404;">
      <span>Promo calcetas 2x$100</span><span>-$${ahorro}</span>
    </div>`;
    }

    document.getElementById('envioResumenTotal').textContent =
        `$${total.toLocaleString('es-MX')} MXN`;

    // Mostrar siempre el Paso 1 (selección de tipo de entrega)
    document.getElementById('envioPaso1').style.display = '';
    document.getElementById('envioPaso2Personal').style.display = 'none';
    document.getElementById('envioPaso2Envio').style.display = 'none';
    document.getElementById('envioTituloModal').textContent = '¿Cómo recibes tu pedido?';

    document.getElementById('envioBackdrop').classList.add('visible');
    document.getElementById('envioModal').classList.add('visible');
}

// ── Seleccionar tipo de entrega ─────────────────────────────────
function seleccionarTipoEntrega(tipo) {
    document.getElementById('envioPaso1').style.display = 'none';
    if (tipo === 'personal') {
        document.getElementById('envioPaso2Personal').style.display = '';
        document.getElementById('envioTituloModal').textContent = 'Entrega personal';
        setTimeout(() => document.getElementById('envioNombreP')?.focus(), 200);
    } else {
        document.getElementById('envioPaso2Envio').style.display = '';
        document.getElementById('envioTituloModal').textContent = 'Datos de envío';
        setTimeout(() => document.getElementById('envioNombre')?.focus(), 200);
    }
}

// ── Volver al paso 1 ───────────────────────────────────────────
function volverPaso1() {
    document.getElementById('envioPaso2Personal').style.display = 'none';
    document.getElementById('envioPaso2Envio').style.display = 'none';
    document.getElementById('envioPaso1').style.display = '';
    document.getElementById('envioTituloModal').textContent = '¿Cómo recibes tu pedido?';
    limpiarErroresEnvio();
}

// ── Cerrar modal ────────────────────────────────────────────────
function cerrarEnvioModal() {
    document.getElementById('envioBackdrop').classList.remove('visible');
    document.getElementById('envioModal').classList.remove('visible');
    limpiarErroresEnvio();
    // Resetear al paso 1 para la próxima apertura
    setTimeout(() => {
        document.getElementById('envioPaso1').style.display = '';
        document.getElementById('envioPaso2Personal').style.display = 'none';
        document.getElementById('envioPaso2Envio').style.display = 'none';
        document.getElementById('envioTituloModal').textContent = '¿Cómo recibes tu pedido?';
    }, 300);
}

// ── Validación (envío a domicilio) ─────────────────────────────
function validarEnvio() {
    limpiarErroresEnvio();
    let valido = true;

    ['envioNombre', 'envioTelefono', 'envioCP', 'envioColonia', 'envioCalle'].forEach(id => {
        const el = document.getElementById(id);
        if (!el || !el.value.trim()) {
            if (el) el.classList.add('error');
            valido = false;
        }
    });

    const tel = document.getElementById('envioTelefono');
    if (tel && tel.value.trim() && !/^\d{10}$/.test(tel.value.trim())) {
        tel.classList.add('error');
        valido = false;
    }

    const cp = document.getElementById('envioCP');
    if (cp && cp.value.trim() && !/^\d{5}$/.test(cp.value.trim())) {
        cp.classList.add('error');
        valido = false;
    }

    return valido;
}

// ── Validación (entrega personal) ──────────────────────────────
function validarEntregaPersonal() {
    limpiarErroresEnvio();
    let valido = true;

    ['envioNombreP', 'envioTelefonoP'].forEach(id => {
        const el = document.getElementById(id);
        if (!el || !el.value.trim()) {
            if (el) el.classList.add('error');
            valido = false;
        }
    });

    const tel = document.getElementById('envioTelefonoP');
    if (tel && tel.value.trim() && !/^\d{10}$/.test(tel.value.trim())) {
        tel.classList.add('error');
        valido = false;
    }

    return valido;
}

function limpiarErroresEnvio() {
    document.querySelectorAll('#envioModal .error').forEach(el => el.classList.remove('error'));
}

// ── Submit: Entrega personal ────────────────────────────────────
async function submitEntregaPersonal() {
    if (!validarEntregaPersonal()) {
        const primerError = document.querySelector('#envioPaso2Personal .error');
        if (primerError) primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const nombre = document.getElementById('envioNombreP').value.trim();
    const telefono = document.getElementById('envioTelefonoP').value.trim();

    const btn = document.getElementById('envioBtnSubmitPersonal');
    btn.disabled = true;
    btn.textContent = 'Procesando...';

    // Abrir ventana en blanco INMEDIATAMENTE (antes de cualquier await) para evitar bloqueo de popup
    const waVentana = window.open('', '_blank');

    // Guardar pedido en Supabase para obtener el número de pedido
    const numeroPedido = await guardarPedido(nombre, telefono);
    await reservarStock(carrito);

    // Construir mensaje con el número de pedido incluido
    const { total, pares, ahorro } = calcularTotal(carrito);
    let msg = `Hola! Me gustaria hacer el siguiente pedido:\n\n`;
    if (numeroPedido) msg += `*Numero de pedido: ${numeroPedido}*\n\n`;
    msg += `*Tipo de entrega: Entrega personal*\n\n`;
    msg += `*Datos de contacto*\n`;
    msg += `Nombre: ${nombre}\nTelefono: ${telefono}\n\n`;
    msg += `*Productos*\n`;
    carrito.forEach((item, i) => {
        const esCalceta = CALCETAS.includes(item.nombre);
        msg += `${i + 1}. ${item.nombre}\n`;
        msg += `   Codigo: ${item.codigo}\n`;
        msg += `   Talla: ${item.talla} - Color: ${item.color} - Cantidad: ${item.cantidad}`;
        msg += esCalceta
            ? ` - Precio: 1x$${CALCETAS_PRECIOS[item.nombre]} / 2x$100`
            : ` - Precio: $${item.precio} c/u`;
        msg += '\n\n';
    });
    if (pares > 0 && ahorro > 0)
        msg += `Promo calcetas (2x$100) aplicada - Ahorro: $${ahorro}\n`;
    msg += `*Total: $${total.toLocaleString('es-MX')} MXN*\n\n`;
    msg += 'Pueden confirmarme disponibilidad y acordar punto de entrega?\n\n';
    msg += '_Nota: Los precios mostrados son de referencia y pueden estar sujetos a cambios. El total final sera confirmado por el equipo de SANT Activewear._';

    // Redirigir la ventana ya abierta a WhatsApp
    const waUrl = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`;
    if (waVentana) waVentana.location.href = waUrl;

    carrito = [];
    guardarCarrito();
    renderCarrito();
    actualizarBadge();
    cerrarEnvioModal();
    toggleCarrito();

    ['envioNombreP', 'envioTelefonoP'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

// ── Submit: Envío a domicilio ───────────────────────────────────
async function submitEnvioYWhatsApp() {
    if (!validarEnvio()) {
        const primerError = document.querySelector('#envioPaso2Envio .error');
        if (primerError) primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const nombre = document.getElementById('envioNombre').value.trim();
    const telefono = document.getElementById('envioTelefono').value.trim();
    const cp = document.getElementById('envioCP').value.trim();
    const colonia = document.getElementById('envioColonia').value.trim();
    const calle = document.getElementById('envioCalle').value.trim();
    const ciudad = document.getElementById('envioCiudad').value.trim();
    const estado = document.getElementById('envioEstado').value.trim();
    const referencias = document.getElementById('envioReferencias').value.trim();

    const btn = document.getElementById('envioBtnSubmit');
    btn.disabled = true;
    btn.textContent = 'Procesando...';

    // Abrir ventana en blanco INMEDIATAMENTE (antes de cualquier await) para evitar bloqueo de popup
    const waVentana = window.open('', '_blank');

    // Guardar pedido en Supabase para obtener el número de pedido
    const numeroPedido = await guardarPedido(nombre, telefono);
    await reservarStock(carrito);

    // Construir mensaje con el número de pedido incluido
    const { total, pares, ahorro } = calcularTotal(carrito);
    let msg = `Hola! Me gustaria hacer el siguiente pedido:\n\n`;
    if (numeroPedido) msg += `*Numero de pedido: ${numeroPedido}*\n\n`;
    msg += `*Tipo de entrega: Envío a domicilio*\n\n`;
    msg += `*Datos de contacto*\n`;
    msg += `Nombre: ${nombre}\nTelefono: ${telefono}\n\n`;
    msg += `*Direccion de envio*\n`;
    msg += `${calle}\nCol. ${colonia}\n`;
    if (ciudad || estado) msg += `${ciudad}${ciudad && estado ? ', ' : ''}${estado} CP ${cp}\n`;
    else msg += `CP ${cp}\n`;
    if (referencias) msg += `Ref: ${referencias}\n`;
    msg += '\n';
    msg += `*Productos*\n`;
    carrito.forEach((item, i) => {
        const esCalceta = CALCETAS.includes(item.nombre);
        msg += `${i + 1}. ${item.nombre}\n`;
        msg += `   Codigo: ${item.codigo}\n`;
        msg += `   Talla: ${item.talla} - Color: ${item.color} - Cantidad: ${item.cantidad}`;
        msg += esCalceta
            ? ` - Precio: 1x$${CALCETAS_PRECIOS[item.nombre]} / 2x$100`
            : ` - Precio: $${item.precio} c/u`;
        msg += '\n\n';
    });
    if (pares > 0 && ahorro > 0)
        msg += `Promo calcetas (2x$100) aplicada - Ahorro: $${ahorro}\n`;
    msg += `*Total: $${total.toLocaleString('es-MX')} MXN*\n\n`;
    msg += 'Pueden confirmarme disponibilidad?\n\n';
    msg += '_Nota: Los precios mostrados son de referencia y pueden estar sujetos a cambios. El total final sera confirmado por el equipo de SANT Activewear._';

    // Redirigir la ventana ya abierta a WhatsApp
    const waUrl = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`;
    if (waVentana) waVentana.location.href = waUrl;

    carrito = [];
    guardarCarrito();
    renderCarrito();
    actualizarBadge();
    cerrarEnvioModal();
    toggleCarrito();

    ['envioNombre', 'envioTelefono', 'envioCalle', 'envioReferencias'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.getElementById('envioCP').value = '';
    document.getElementById('envioCPHint').textContent = '';
    document.getElementById('envioCPHint').className = 'envio-cp-hint';
    resetCamposCP();
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('envioModal')?.classList.contains('visible')) {
        cerrarEnvioModal();
    }
});

// ── Helpers ────────────────────────────────────────────────────
function obtenerPrecio(nombre) {
    if (PRECIOS[nombre]) return PRECIOS[nombre];
    if (CALCETAS_PRECIOS[nombre]) return CALCETAS_PRECIOS[nombre];
    if (nombre.includes('Calceta')) return 60;
    if (nombre.includes('Crop Top')) return PRECIOS['Crop Top'];
    if (nombre.includes('Bra')) return PRECIOS['Top'];
    if (nombre.includes('Top') || nombre.includes('Tank')) return PRECIOS['Top'];
    if (nombre.includes('Legging') && !nombre.includes('Flare')) return PRECIOS['Leggings'];
    if (nombre.includes('Flare')) return PRECIOS['Legging Flare'];
    if (nombre.includes('Short')) return PRECIOS['Short'];
    if (nombre.includes('Chamarra')) return PRECIOS['Chamarra'];
    if (nombre.includes('Falda')) return PRECIOS['Falda'];
    if (nombre.includes('Playera')) return PRECIOS['Playera'];
    if (nombre.includes('Vestido')) return PRECIOS['Vestido'];
    if (nombre.includes('Jumper')) return PRECIOS['Jumper'];
    if (nombre.includes('Biker')) return PRECIOS['Biker'];
    if (nombre.includes('Pantalón Yoga')) return PRECIOS['Pantalón Yoga'];

    return 0;
}

// ── Verificar stock al cargar la página ────────────────────────
async function verificarStockBotones() {
    const botones = document.querySelectorAll('.btn-agregar-carrito');
    const checks = [...botones].map(async btn => {
        const onclick = btn.getAttribute('onclick') || '';
        if (!onclick.includes('abrirModal')) return;
        
        let argTallas = [], argColores = [], sku = '', nombreProd = '';
        const extractParams = (n, c, t, col) => {
            nombreProd = n;
            sku = c;
            argTallas = t || [];
            argColores = col || [];
        };
        
        try {
            const func = new Function('abrirModal', onclick);
            func(extractParams);
        } catch(e) {
            const match = onclick.match(/abrirModal\s*\(\s*'([^']+)'\s*,\s*'([^']+)'/);
            if (match) {
                nombreProd = match[1];
                sku = match[2];
            }
        }
        
        if (!sku) return;
        const stockData = await consultarStock(sku);
        
        if (stockData && stockData.length > 0 && todosAgotados(stockData, argTallas, argColores)) {
            btn.disabled = false;
            btn.textContent = '🔔 Notifícame cuando vuelva';
            btn.classList.add('btn-notificar-card');
            btn.style.opacity = '';
            btn.style.cursor = 'pointer';
            
            // Reemplazar onclick para abrir directamente el modal de restock conservando parámetros
            const nuevoOnclick = onclick.replace(/^abrirModal\(/, 'abrirModalRestockDirecto(');
            btn.setAttribute('onclick', nuevoOnclick);
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
    verificarStockBotones();

    // Permitir buscar con Enter en el input del footer
    const inputPedido = document.getElementById('inputNumeroPedido');
    if (inputPedido) inputPedido.addEventListener('keydown', e => { if (e.key === 'Enter') consultarPedido(); });
});

// ── r pedido ───────────────────────────────────────────
async function consultarPedido() {
    const input = document.getElementById('inputNumeroPedido');
    const numero = input?.value?.trim().toUpperCase();
    if (!numero) { input?.focus(); return; }

    const contenido = document.getElementById('pedidoModalContent');
    contenido.innerHTML = '<p style="text-align:center;color:#aaa;padding:20px 0;font-family:\'Montserrat\',sans-serif;font-size:13px;">Buscando pedido…</p>';
    abrirModalPedido();

    try {
        const params = new URLSearchParams({
            numero_pedido: `eq.${numero}`,
            select: 'numero_pedido,nombre,telefono,items,total,estatus,creado_en'
        });
        const res = await fetch(`${SUPABASE_URL}/rest/v1/pedidos?${params}`, {
            headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
        });
        if (!res.ok) throw new Error('Error al consultar');
        const data = await res.json();

        if (!data || data.length === 0) {
            contenido.innerHTML = `
                <p class="pedido-numero">Pedido no encontrado</p>
                <p style="color:#888;font-size:13px;font-family:'Montserrat',sans-serif;margin-top:8px;">
                  No encontramos ningún pedido con el número <strong>${numero}</strong>.<br>
                  Verifica el número e intenta de nuevo.
                </p>`;
            return;
        }

        const pedido = data[0];
        const items = Array.isArray(pedido.items) ? pedido.items : [];
        const fecha = new Date(pedido.creado_en).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
        const estatusLabel = { pendiente: 'Pendiente', confirmado: 'Confirmado', cancelado: 'Cancelado' };
        const estatusClass = pedido.estatus || 'pendiente';

        const itemsHtml = items.map(item => `
            <div class="pedido-item-row">
                <div>
                    <div class="pedido-item-nombre">${item.nombre}</div>
                    <div class="pedido-item-detalle">Talla: ${item.talla} · Color: ${item.color} · Cant: ${item.cantidad}</div>
                </div>
                <div class="pedido-item-precio">$${(item.precio * item.cantidad).toLocaleString('es-MX')}</div>
            </div>`).join('');

        contenido.innerHTML = `
            <p class="pedido-numero">${pedido.numero_pedido}</p>
            <p class="pedido-nombre">${pedido.nombre}</p>
            <span class="pedido-estatus ${estatusClass}">${estatusLabel[estatusClass] || estatusClass}</span>
            <p style="font-size:12px;color:#aaa;font-family:'Montserrat',sans-serif;margin-bottom:20px;">${fecha}</p>
            <p class="pedido-items-titulo">Productos</p>
            ${itemsHtml}
            <div class="pedido-total-row">
                <span>Total</span>
                <span>$${Number(pedido.total).toLocaleString('es-MX')} MXN</span>
            </div>`;
    } catch (e) {
        contenido.innerHTML = '<p style="color:#c0392b;font-size:13px;font-family:\'Montserrat\',sans-serif;">Ocurrió un error al consultar. Intenta de nuevo.</p>';
    }
}

function abrirModalPedido() {
    document.getElementById('pedidoModalBackdrop').classList.add('visible');
    document.getElementById('pedidoModal').classList.add('visible');
}

function cerrarConsultaPedido() {
    document.getElementById('pedidoModalBackdrop').classList.remove('visible');
    document.getElementById('pedidoModal').classList.remove('visible');
}

function abrirModalRestock() {
    // Rellenar info del producto con selectores
    const info = document.getElementById('restockProductoInfo');
    if (info && modalActual) {
        let html = `<div class="restock-prod-nombre" style="margin-bottom:12px;font-weight:600;font-size:16px;text-align:center;">${modalActual.nombre}</div>`;
        
        html += `<div style="display:flex; justify-content:center; gap:12px; margin-bottom:16px; text-align:center;">`;
        
        if (modalActual.tallas && modalActual.tallas.length > 0) {
            html += `
            <div style="flex:1;">
                <label style="display:block;font-size:12px;margin-bottom:4px;color:#555;text-align:center;">Talla:</label>
                <select id="restockSelectTalla" class="restock-input" style="padding:8px;font-size:14px;background:#f9f9f9;border:1px solid #ddd;border-radius:6px;width:100%;">
                    <option value="">Cualquiera</option>
                    ${modalActual.tallas.map(t => `<option value="${t}" ${modalTallaSeleccionada === t ? 'selected' : ''}>${t}</option>`).join('')}
                </select>
            </div>`;
        } else if (modalTallaSeleccionada) {
            html += `<div style="flex:1;"><span class="restock-prod-tag" style="display:block;margin-top:20px;text-align:center;">Talla: ${modalTallaSeleccionada}</span></div>`;
        }
        
        if (modalActual.colores && modalActual.colores.length > 0) {
            html += `
            <div style="flex:1;">
                <label style="display:block;font-size:12px;margin-bottom:4px;color:#555;text-align:center;">Color:</label>
                <select id="restockSelectColor" class="restock-input" style="padding:8px;font-size:14px;background:#f9f9f9;border:1px solid #ddd;border-radius:6px;width:100%;">
                    <option value="">Cualquiera</option>
                    ${modalActual.colores.map(c => `<option value="${c.nombre}" ${modalColorSeleccionado === c.nombre ? 'selected' : ''}>${c.nombre}</option>`).join('')}
                </select>
            </div>`;
        } else if (modalColorSeleccionado) {
            html += `<div style="flex:1;"><span class="restock-prod-tag" style="display:block;margin-top:20px;text-align:center;">Color: ${modalColorSeleccionado}</span></div>`;
        }
        
        html += `</div>`;
        info.innerHTML = html;
    }

    // Resetear formulario al abrir
    const formulario = document.getElementById('restockFormulario');
    const exito = document.getElementById('restockExito');
    if (formulario) formulario.style.display = '';
    if (exito) exito.style.display = 'none';

    const input = document.getElementById('restockContacto');
    if (input) input.value = '';

    // Asegurar WA seleccionado por defecto
    const radioWA = document.querySelector('input[name="restockMetodo"][value="whatsapp"]');
    if (radioWA) { radioWA.checked = true; actualizarInputRestock(); }

    document.getElementById('restockBackdrop').classList.add('visible');
    document.getElementById('restockModal').classList.add('visible');

    setTimeout(() => document.getElementById('restockContacto')?.focus(), 200);
}

function abrirModalRestockDirecto(nombre, codigo, tallas, colores) {
    // Cerrar el modal principal si estuviera abierto
    cerrarModal();

    // Configurar el contexto para el form
    modalActual = { nombre, codigo, tallas: tallas || [], colores: colores || [], stockData: null };
    modalTallaSeleccionada = null;
    modalColorSeleccionado = null;

    abrirModalRestock();
}

function cerrarModalRestock() {
    document.getElementById('restockBackdrop').classList.remove('visible');
    document.getElementById('restockModal').classList.remove('visible');
}

// Actualiza placeholder e inputmode según el método seleccionado
function actualizarInputRestock() {
    const metodo = document.querySelector('input[name="restockMetodo"]:checked')?.value;
    const input = document.getElementById('restockContacto');
    const hint = document.getElementById('restockInputHint');
    const labelWA = document.getElementById('restockLabelWA');
    const labelEmail = document.getElementById('restockLabelEmail');

    if (!input) return;

    if (metodo === 'whatsapp') {
        input.type = 'tel';
        input.inputMode = 'numeric';
        input.maxLength = 10;
        input.placeholder = 'Tu número de WhatsApp';
        if (hint) hint.textContent = 'Ingresa tu número de 10 dígitos';
        if (labelWA) labelWA.classList.add('activo');
        if (labelEmail) labelEmail.classList.remove('activo');
    } else {
        input.type = 'email';
        input.inputMode = 'email';
        input.maxLength = 100;
        input.placeholder = 'Tu correo electrónico';
        if (hint) hint.textContent = 'Ingresa tu correo electrónico';
        if (labelWA) labelWA.classList.remove('activo');
        if (labelEmail) labelEmail.classList.add('activo');
    }
    input.value = '';
    input.focus();
}

async function guardarRestock() {
    const metodo = document.querySelector('input[name="restockMetodo"]:checked')?.value;
    const contacto = document.getElementById('restockContacto')?.value.trim();
    const btn = document.getElementById('restockBtnGuardar');
    const input = document.getElementById('restockContacto');

    if (!contacto) {
        if (input) { input.classList.add('restock-input-error'); setTimeout(() => input.classList.remove('restock-input-error'), 1500); }
        return;
    }

    // Validar formato según método
    if (metodo === 'whatsapp' && !/^\d{10}$/.test(contacto)) {
        if (input) { input.classList.add('restock-input-error'); setTimeout(() => input.classList.remove('restock-input-error'), 1500); }
        const hint = document.getElementById('restockInputHint');
        if (hint) { hint.textContent = 'Ingresa exactamente 10 dígitos'; hint.style.color = '#c0392b'; setTimeout(() => { hint.textContent = 'Ingresa tu número de 10 dígitos'; hint.style.color = ''; }, 2500); }
        return;
    }
    if (metodo === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto)) {
        if (input) { input.classList.add('restock-input-error'); setTimeout(() => input.classList.remove('restock-input-error'), 1500); }
        const hint = document.getElementById('restockInputHint');
        if (hint) { hint.textContent = 'Ingresa un correo válido'; hint.style.color = '#c0392b'; setTimeout(() => { hint.textContent = 'Ingresa tu correo electrónico'; hint.style.color = ''; }, 2500); }
        return;
    }

    if (btn) { btn.disabled = true; btn.textContent = 'Guardando…'; }

    const selectTalla = document.getElementById('restockSelectTalla');
    const selectColor = document.getElementById('restockSelectColor');
    
    const tallaFinal = selectTalla ? selectTalla.value : modalTallaSeleccionada;
    const colorFinal = selectColor ? selectColor.value : modalColorSeleccionado;

    const payload = {
        sku: modalActual.codigo,
        producto: modalActual.nombre,
        talla: tallaFinal || 'Cualquiera',
        color: colorFinal || 'Cualquiera',
        metodo,
        contacto
    };

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/restock_notifications`, {
            method: 'POST',
            headers: {
                apikey: SUPABASE_ANON_KEY,
                Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                Prefer: 'return=minimal'
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            // Mostrar estado de éxito
            const formulario = document.getElementById('restockFormulario');
            const exito = document.getElementById('restockExito');
            if (formulario) formulario.style.display = 'none';
            if (exito) exito.style.display = '';
        } else {
            throw new Error('Error del servidor');
        }
    } catch (e) {
        const hint = document.getElementById('restockInputHint');
        if (hint) { hint.textContent = 'No se pudo guardar. Intenta de nuevo.'; hint.style.color = '#c0392b'; }
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = 'Notifícame'; }
    }
}