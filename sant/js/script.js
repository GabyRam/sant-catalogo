/* ══════════════════════════════════════════
   script.js — Lógica general de productos
   Imágenes, swipe, hero collage, btn-top
   ══════════════════════════════════════════ */

// ── Cambiar imagen de producto ──
function cambiarImagen(id, frente, espalda) {
    const imgFrente = document.getElementById(id);
    const producto = imgFrente.closest(".producto");
    const imgEspalda = producto.querySelector(".img-espalda, .img-detalle");

    imgFrente.src = frente;

    if (imgEspalda && espalda) {
        imgEspalda.src = espalda;
    }

    // Mostrar hint de swipe en mobile al cambiar color
    const productoImg = imgFrente.closest('.producto-img');
    if (productoImg && productoImg.classList.contains('tiene-espalda')) {
        productoImg.classList.remove('swipe-hint');
        void productoImg.offsetWidth;
        productoImg.classList.add('swipe-hint');
        setTimeout(() => productoImg.classList.remove('swipe-hint'), 2100);
    }
}

// ── Swipe en productos (táctil + mouse) ──
document.querySelectorAll(".producto-img").forEach(container => {

    let startX = 0;
    let startY = 0;
    let isDragging = false;

    // Touch
    container.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = false;
    }, { passive: true });

    container.addEventListener("touchmove", e => {
        const dx = Math.abs(e.touches[0].clientX - startX);
        const dy = Math.abs(e.touches[0].clientY - startY);
        if (dx > dy) {
            isDragging = true;
            e.preventDefault();
        }
    }, { passive: false });

    container.addEventListener("touchend", e => {
        if (!isDragging) return;
        const dx = e.changedTouches[0].clientX - startX;
        const frente = container.querySelector(".img-frente");
        const espalda = container.querySelector(".img-espalda, .img-detalle");
        if (!espalda) return;
        if (dx < -40) { espalda.style.opacity = "1"; frente.style.opacity = "0"; }
        if (dx > 40) { espalda.style.opacity = "0"; frente.style.opacity = "1"; }
    });

    // Mouse (desktop)
    let mouseStartX = 0;
    let mouseDown = false;

    container.addEventListener("mousedown", e => {
        mouseStartX = e.clientX;
        mouseDown = true;
    });

    container.addEventListener("mouseup", e => {
        if (!mouseDown) return;
        mouseDown = false;
        const dx = e.clientX - mouseStartX;
        const frente = container.querySelector(".img-frente");
        const espalda = container.querySelector(".img-espalda, .img-detalle");
        if (!espalda) return;
        if (dx < -40) { espalda.style.opacity = "1"; frente.style.opacity = "0"; }
        if (dx > 40) { espalda.style.opacity = "0"; frente.style.opacity = "1"; }
    });

    container.addEventListener("mouseleave", () => { mouseDown = false; });
});

// ── Hero Collage ──
(function () {
    const heroSection = document.querySelector('.hero-collage');
    if (!heroSection) return;

    const collectionType = heroSection.dataset.collection;

    // Detecta si la página está en una subcarpeta (ej. /catalogo/) para ajustar las rutas
    const base = window.location.pathname.includes('/catalogo/') ? '../' : '';

    const HERO_IMAGES = [
        base+'images/hero/img1.jpg',  base+'images/hero/img2.jpg',  base+'images/hero/img3.jpg',
        base+'images/hero/img4.jpg',  base+'images/hero/img5.jpg',  base+'images/hero/img6.jpg',
        base+'images/hero/img7.jpg',  base+'images/hero/img8.jpg',  base+'images/hero/img9.jpg',
        base+'images/hero/img10.jpg', base+'images/hero/img11.jpg', base+'images/hero/img12.jpg',
        base+'images/hero/img13.jpg', base+'images/hero/img14.jpg', base+'images/hero/img15.jpg',
        base+'images/hero/img16.jpg', base+'images/hero/img17.jpg'
    ];

    const NEW_COLLECTION_IMAGES = [
        base+'images/hero/new-collection/img18.jpg', base+'images/hero/new-collection/img19.jpg',
        base+'images/hero/new-collection/img20.jpg', base+'images/hero/new-collection/img21.jpg',
        base+'images/hero/new-collection/img22.jpg', base+'images/hero/new-collection/img23.jpg',
        base+'images/hero/new-collection/img24.jpg', base+'images/hero/new-collection/img25.jpg',
        base+'images/hero/new-collection/img26.jpg', base+'images/hero/new-collection/img27.jpg',
        base+'images/hero/new-collection/img28.jpg', base+'images/hero/new-collection/img29.jpg',
        base+'images/hero/new-collection/img30.jpg', base+'images/hero/new-collection/img31.jpg',
        base+'images/hero/new-collection/img32.jpg',
    ];

    const TOPS_IMAGES = [
        base+'images/tops/top-rosa-claro.jpg',
        base+'images/tops/top-rosa-claro-espalda.jpg',
        base+'images/tops/top-negro.jpg',
        base+'images/tops/top-negro-espalda.jpg',
        base+'images/tops/top-largo-negro.jpg',
        base+'images/tops/top-largo-negro-espalda.jpg',
        base+'images/tops/top-atletico-negro.jpg',
        base+'images/tops/top-atletico-negro-espalda.jpg',
        base+'images/tops/top-nudo-negro.jpg',
        base+'images/tops/top-nudo-negro-espalda.jpg',
        base+'images/tops/top-nudo-azul-marino.jpg',
        base+'images/tops/top-nudo-azul-marino-espalda.jpg',
        base+'images/tops/top-tirante-ancho-negro.jpg',
        base+'images/tops/top-tirante-ancho-azul-marino.jpg',
        base+'images/tops/top-asimetrico-negro.jpg',
        base+'images/tops/top-asimetrico-rojo.jpg',
        base+'images/tops/top-asimetrico-azul.jpg',
        base+'images/tops/top-bra-negro.jpg',
        base+'images/tops/top-bra-negro-espalda.jpg',
        base+'images/tops/top-bra-rosa.jpg',
        base+'images/tops/top-bra-rosa-espalda.jpg',
        base+'images/tops/tank-bicolor-negro.jpg',
        base+'images/tops/tank-bicolor-negro-espalda.jpg',
        base+'images/tops/top-rojo.jpg',
        base+'images/tops/top-azul-rey.jpg',
        base+'images/tops/top-rosa-neon.jpg',
        base+'images/tops/top-bicolor-azul.jpg',
        base+'images/tops/top-bicolor-azul-espalda.jpg',
        base+'images/tops/top-bicolor-amarillo.jpg',
        base+'images/tops/top-blanco.jpg',
        base+'images/tops/top-rosa.jpg',
    ];

    const LEGGINGS_IMAGES = [
        base+'images/leggings/legging-azul-marino.jpg',
        base+'images/leggings/legging-azul-rey.jpeg',
        base+'images/leggings/legging-azul.jpg',
        base+'images/leggings/legging-colombiano-gris.jpg',
        base+'images/leggings/legging-colombiano-negro.jpg',
        base+'images/leggings/legging-flare-cafe.jpeg',
        base+'images/leggings/legging-flare-esmeralda.jpeg',
        base+'images/leggings/legging-flare-negro.jpeg',
        base+'images/leggings/legging-flare-vino.jpeg',
        base+'images/leggings/legging-gris.jpg',
        base+'images/leggings/legging-lavanda.jpg',
        base+'images/leggings/legging-negro-v.jpg',
        base+'images/leggings/legging-negro.jpg',
        base+'images/leggings/legging-rojo.jpeg',
        base+'images/leggings/legging-rosa.jpg',
        base+'images/leggings/legging-yoga-cafe-bolsa.jpg',
        base+'images/leggings/legging-yoga-cafe.jpg',
        base+'images/leggings/legging-yoga-hueso-bolsa.jpg',
        base+'images/leggings/legging-yoga-hueso.jpg',
    ];

    const CROPTOPS_IMAGES = [
        base+'images/crop-tops/crop-negro.jpg',
        base+'images/crop-tops/crop-blanco.jpg',
        base+'images/crop-tops/crop-lavanda.png',
        base+'images/crop-tops/crop-azul.jpg',
        base+'images/crop-tops/crop-azul-marino.jpg',
        base+'images/crop-tops/crop-gris.jpg',
        base+'images/crop-tops/crop-gris-oxford.jpg',
        base+'images/crop-tops/crop-esmeralda.jpg',
        base+'images/crop-tops/crop-vino.jpg'
    ];

    const BIKERS_IMAGES = [
        base+'images/bikers/biker-negro.jpg',
        base+'images/bikers/biker-lavanda.jpg',
        base+'images/bikers/biker-azul.jpg'
    ];

    const SHORTS_IMAGES = [
        base+'images/shorts/short-azul-rey.jpg',
        base+'images/shorts/short-azul.jpg',
        base+'images/shorts/short-bicolor-negro.jpg',
        base+'images/shorts/short-gris.jpg',
        base+'images/shorts/short-lavanda.jpg',
        base+'images/shorts/short-negro.jpg',
        base+'images/shorts/short-rojo.jpg',
        base+'images/shorts/short-rosa-neon.jpg',
    ];

    const VESTIDOS_IMAGES = [
        base+'images/vestidos/vestido-negro.jpg',
        base+'images/vestidos/vestido-rosa.jpg'
    ];

    const PLAYERAS_IMAGES = [
        base+'images/playeras/aura-runner-blanca.jpg',
        base+'images/playeras/aura-runner-blanca-espalda.jpg',
        base+'images/playeras/aura-runner-azul.jpg',
        base+'images/playeras/aura-runner-azul-espalda.jpg',
        base+'images/playeras/aura-runner-durazno.jpg',
        base+'images/playeras/aura-runner-durazno-espalda.jpg'
    ];

    const FALDAS_IMAGES = [
        base+'images/faldas/falda-bicolor-amarilla-detalle.jpg',
        base+'images/faldas/falda-bicolor-amarilla.jpg',
        base+'images/faldas/falda-bicolor-azul-detalle.jpg',
        base+'images/faldas/falda-bicolor-azul.jpg',
        base+'images/faldas/falda-tenis-azul-bolsa.jpg',
        base+'images/faldas/falda-tenis-azul.jpg',
        base+'images/faldas/falda-tenis-negra-bolsa.jpg',
        base+'images/faldas/falda-tenis-negra.jpg',
    ];

    const YOGA_IMAGES = [
        base+'images/pantalones/pantalon-yoga-azul.jpg',
        base+'images/pantalones/pantalon-yoga-gris-oxford.jpg',
        base+'images/pantalones/pantalon-yoga-negro.jpg',
    ];

    const CHAMARRA_IMAGES = [
        base+'images/chamarras/chamarra-basica-azul-marino-detalle.jpg',
        base+'images/chamarras/chamarra-basica-azul-marino.jpg',
        base+'images/chamarras/chamarra-basica-cafe-detalle.jpg',
        base+'images/chamarras/chamarra-basica-cafe.jpg',
        base+'images/chamarras/chamarra-basica-negra-detalle.jpg',
        base+'images/chamarras/chamarra-basica-negra.jpg',
        base+'images/chamarras/chamarra-deportiva-hueso.jpg',
        base+'images/chamarras/chamarra-deportiva-ivory.jpg',
        base+'images/chamarras/chamarra-deportiva-verde.jpg',
        base+'images/chamarras/chamarra-gris.jpg',
        base+'images/chamarras/chamarra-negra.jpg',
        base+'images/chamarras/chamarra-polar-blanca.jpg',
        base+'images/chamarras/chamarra-polar-negra.jpg',        
    ];

    const JUMPER_IMAGES = [
        base+'images/jumpers/jumper-cafe.jpg',
        base+'images/jumpers/jumper-cafe-espalda.jpg',
        base+'images/jumpers/jumper-negro.jpg',
        base+'images/jumpers/jumper-negro-espalda.jpg'
    ];

    const CALCETAS_IMAGES = [
        base+'images/calcetas/calceta-1966.jpg',
        base+'images/calcetas/calceta-azul.jpg',
        base+'images/calcetas/calceta-beige.jpg',
        base+'images/calcetas/calceta-blanca.jpg',
        base+'images/calcetas/calceta-caritas-cafe.jpg',
        base+'images/calcetas/calceta-caritas-rosa.jpg',
        base+'images/calcetas/calceta-free-mind.jpg',
        base+'images/calcetas/calceta-grateful.jpg',
        base+'images/calcetas/calceta-have.jpg',
        base+'images/calcetas/calceta-hueso.jpg',
        base+'images/calcetas/calceta-lisa-negra.jpg',
        base+'images/calcetas/calceta-live-smile.jpg',
        base+'images/calcetas/calceta-mind-rosa.jpg',
        base+'images/calcetas/calceta-negra.jpg',
        base+'images/calcetas/calceta-rosa.jpg',
        base+'images/calcetas/calceta-smile-out.jpg',
        base+'images/calcetas/calceta-waht.jpg',
        
    ];

    const IMAGES = collectionType === "new" ? NEW_COLLECTION_IMAGES
                 : collectionType === "tops" ? TOPS_IMAGES
                 : collectionType === "leggings" ? LEGGINGS_IMAGES
                 : collectionType === "crop-tops" ? CROPTOPS_IMAGES
                 : collectionType === "bikers" ? BIKERS_IMAGES
                 : collectionType === "shorts" ? SHORTS_IMAGES
                 : collectionType === "vestidos" ? VESTIDOS_IMAGES
                 : collectionType === "playeras" ? PLAYERAS_IMAGES
                 : collectionType === "faldas" ? FALDAS_IMAGES
                 : collectionType === "yoga" ? YOGA_IMAGES
                 : collectionType === "chamarras" ? CHAMARRA_IMAGES
                 : collectionType === "jumper" ? JUMPER_IMAGES
                 : collectionType === "calcetas" ? CALCETAS_IMAGES
                 : HERO_IMAGES;

    const VISIBLE_AT_ONCE = window.innerWidth < 640 ? 6 : 15;
    const STAY_MIN = 7000;
    const STAY_MAX = 11000;
    const INTERVAL_MIN = 2000;
    const INTERVAL_MAX = 3200;

    const hero = document.querySelector('.hero-collage');
    const COLS = window.innerWidth < 640 ? 3 : 5;
    const ROWS = window.innerWidth < 640 ? 5 : 4;

    let occupiedZones = new Set();
    let allZones = [];

    function buildZones() {
        allZones = [];
        for (let col = 0; col < COLS; col++)
            for (let row = 0; row < ROWS; row++)
                allZones.push(`${col},${row}`);
    }
    buildZones();

    function randomPosition(wPct, hPct) {
        const free = allZones.filter(z => !occupiedZones.has(z));
        const pool = free.length > 0 ? free : allZones;
        const zoneKey = pool[Math.floor(Math.random() * pool.length)];
        const [col, row] = zoneKey.split(',').map(Number);
        const cellW = 100 / COLS;
        const cellH = 100 / ROWS;
        const x = col * cellW + Math.random() * Math.max(0, cellW - wPct);
        const y = row * cellH + Math.random() * Math.max(0, cellH - hPct);
        return { x: Math.min(x, 100 - wPct), y: Math.min(y, 100 - hPct), zoneKey };
    }

    let zCounter = 2;
    const Z_MAX = 45;
    let lastUsed = [];

    function pickImage() {
        const available = IMAGES.filter(img => !lastUsed.includes(img));
        const pool = available.length > 0 ? available : IMAGES;
        const picked = pool[Math.floor(Math.random() * pool.length)];
        lastUsed.push(picked);
        if (lastUsed.length > 5) lastUsed.shift();
        return picked;
    }

    function spawnPhoto() {
        const isMobile = window.innerWidth < 640;
        const wPct = isMobile ? 28 + Math.random() * 12 : 13 + Math.random() * 10;
        const hPct = wPct * (12 / 9);
        const { x, y, zoneKey } = randomPosition(wPct, hPct);
        occupiedZones.add(zoneKey);
        const rot = (Math.random() * 8 - 4).toFixed(2);
        const div = document.createElement('div');
        div.className = 'hero-photo';
        div.style.cssText = `width:${wPct}%;aspect-ratio:9/12;left:${x}%;top:${y}%;transform:rotate(${rot}deg);z-index:${(zCounter = zCounter >= Z_MAX ? 2 : zCounter + 1)};`;
        const img = document.createElement('img');
        img.src = pickImage();
        img.alt = '';
        div.appendChild(img);
        hero.insertBefore(div, hero.querySelector('.hero-overlay'));
        requestAnimationFrame(() => requestAnimationFrame(() => div.classList.add('visible')));
        const stayMs = STAY_MIN + Math.random() * (STAY_MAX - STAY_MIN);
        setTimeout(() => {
            div.classList.remove('visible');
            occupiedZones.delete(zoneKey);
            setTimeout(() => div.remove(), 950);
        }, stayMs);
        const nextInterval = INTERVAL_MIN + Math.random() * (INTERVAL_MAX - INTERVAL_MIN);
        setTimeout(spawnPhoto, nextInterval);
    }

    function init() {
        for (let i = 0; i < VISIBLE_AT_ONCE; i++)
            setTimeout(spawnPhoto, i * 1800);
    }

    window.addEventListener('load', () => setTimeout(init, 300));
})();

// ── Swipe hint al entrar en pantalla ──
document.querySelectorAll('.producto-img').forEach(el => {
    if (!el.querySelector('.img-espalda, .img-detalle')) return;
    el.classList.add('tiene-espalda');
});

const swipeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.remove('swipe-hint');
            void el.offsetWidth;
            el.classList.add('swipe-hint');
            setTimeout(() => el.classList.remove('swipe-hint'), 2100);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.producto-img.tiene-espalda').forEach(el => {
    swipeObserver.observe(el);
});

// ── Botón volver arriba ──
const btnTop = document.getElementById('btn-top');
if (btnTop) {
    window.addEventListener('scroll', () => {
        btnTop.classList.toggle('visible', window.scrollY > 300);
    });
}

// ── Offset dinámico de navbar para scroll-margin-top ──
function actualizarNavbarHeight() {
    const navbar = document.querySelector('nav.navbar');
    if (navbar) {
        const altura = navbar.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--navbar-height', altura + 'px');
    }
}

actualizarNavbarHeight();
window.addEventListener('resize', actualizarNavbarHeight);
window.addEventListener('load', actualizarNavbarHeight);
const logoImg = document.querySelector('nav.navbar .logo-img');
if (logoImg) logoImg.addEventListener('load', actualizarNavbarHeight);

// ── Scroll suave manual con offset de navbar ──
// Intercepta todos los links del menú que apunten a #sección
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        if (!targetId) return;
        const target = document.getElementById(targetId);
        if (!target) return;

        e.preventDefault();

        const navbar = document.querySelector('nav.navbar');
        const navbarH = navbar ? navbar.getBoundingClientRect().height : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarH;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });

        // Cerrar menú móvil de Bootstrap si está abierto
        const navCollapse = document.getElementById('navbarCatalogo');
        if (navCollapse && navCollapse.classList.contains('show')) {
            navCollapse.classList.remove('show');
        }
    });
});

// ── Highlight efecto para páginas de catálogo hardcodeadas (si no usa render-catalogo) ──
window.addEventListener('load', () => {
    if (window.location.hash) {
        const sku = window.location.hash.substring(1);
        
        // Evitamos si el hash no parece un SKU o es muy corto
        if (sku.length < 5) return;

        // Intentar encontrar el elemento por ID (en caso de que sí tenga ID, ej. por render-catalogo.js)
        let targetElement = document.getElementById(sku);
        let targetCard = targetElement ? targetElement.querySelector('.producto') || targetElement : null;

        // Si no se encuentra por ID, buscar en los botones hardcodeados
        if (!targetCard) {
            const buttons = document.querySelectorAll('.btn-agregar-carrito');
            for (const btn of buttons) {
                const onclickStr = btn.getAttribute('onclick') || '';
                // Busca el SKU exacto dentro del onclick, por ejemplo: 'LEGGINGKW-001'
                if (onclickStr.includes(`'${sku}'`) || onclickStr.includes(`"${sku}"`)) {
                    targetCard = btn.closest('.producto');
                    break;
                }
            }
        }

        if (targetCard) {
            // Función para enfocar el producto (hace scroll e ilumina)
            const enfocarProducto = () => {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (!targetCard.classList.contains('glow-effect')) {
                    targetCard.classList.add('glow-effect');
                    setTimeout(() => targetCard.classList.remove('glow-effect'), 3000);
                }
            };

            // Intentos para compensar lazy loading
            setTimeout(enfocarProducto, 100);
            setTimeout(enfocarProducto, 800);
            setTimeout(enfocarProducto, 2000);
        }
    }
});
// --- Event Delegator for Refactored HTML ---
document.addEventListener('click', function(e) {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;
    const argsStr = el.dataset.args;
    let args = [];
    if (argsStr) {
        try {
            args = (new Function("return [" + argsStr + "]"))();
        } catch (err) {
            console.error('Error parsing args for', action, argsStr, err);
        }
    }
    const actions = {
        'cambiarImagen': typeof cambiarImagen !== 'undefined' ? cambiarImagen : null,
        'abrirModal': typeof abrirModal !== 'undefined' ? abrirModal : null,
        'cerrarModal': typeof cerrarModal !== 'undefined' ? cerrarModal : null,
        'toggleCarrito': typeof toggleCarrito !== 'undefined' ? toggleCarrito : null,
        'vaciarCarrito': typeof vaciarCarrito !== 'undefined' ? vaciarCarrito : null,
        'enviarWhatsApp': typeof enviarWhatsApp !== 'undefined' ? enviarWhatsApp : null,
        'cambiarCantidad': typeof cambiarCantidad !== 'undefined' ? cambiarCantidad : null,
        'confirmarAgregar': typeof confirmarAgregar !== 'undefined' ? confirmarAgregar : null,
        'consultarPedido': typeof consultarPedido !== 'undefined' ? consultarPedido : null,
        'cerrarConsultaPedido': typeof cerrarConsultaPedido !== 'undefined' ? cerrarConsultaPedido : null,
        'seleccionarTipoEntrega': typeof seleccionarTipoEntrega !== 'undefined' ? seleccionarTipoEntrega : null,
        'volverPaso1': typeof volverPaso1 !== 'undefined' ? volverPaso1 : null,
        'cerrarEnvioModal': typeof cerrarEnvioModal !== 'undefined' ? cerrarEnvioModal : null,
        'submitEntregaPersonal': typeof submitEntregaPersonal !== 'undefined' ? submitEntregaPersonal : null,
        'submitEnvioYWhatsApp': typeof submitEnvioYWhatsApp !== 'undefined' ? submitEnvioYWhatsApp : null,
        'guardarRestock': typeof guardarRestock !== 'undefined' ? guardarRestock : null,
        'cerrarModalRestock': typeof cerrarModalRestock !== 'undefined' ? cerrarModalRestock : null,
        'scrollToTop': function() { window.scrollTo({top:0, behavior:'smooth'}) },
        'goBack': function() { history.back() }
    };
    if (actions[action]) {
        actions[action].apply(null, args);
        if (el.tagName === 'A') e.preventDefault();
    }
});
