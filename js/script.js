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

// ── SWIPE EN PRODUCTOS (táctil + mouse) ──
document.querySelectorAll(".producto-img").forEach(container => {

    let startX = 0;
    let startY = 0;
    let isDragging = false;

    // ── Touch ──
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
        if (dx < -40) {
            espalda.style.opacity = "1";
            frente.style.opacity = "0";
        }
        if (dx > 40) {
            espalda.style.opacity = "0";
            frente.style.opacity = "1";
        }
    });

    // ── Mouse (desktop modo móvil) ──
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
        if (dx < -40) {
            espalda.style.opacity = "1";
            frente.style.opacity = "0";
        }
        if (dx > 40) {
            espalda.style.opacity = "0";
            frente.style.opacity = "1";
        }
    });

    container.addEventListener("mouseleave", () => { mouseDown = false; });

});

// ── HERO COLLAGE ──
(function () {

    const heroSection = document.querySelector('.hero-collage');
    if (!heroSection) return;

    const collectionType = heroSection.dataset.collection;

    const HERO_IMAGES = [
        'images/hero/img1.jpg',
        'images/hero/img2.jpg',
        'images/hero/img3.jpg',
        'images/hero/img4.jpg',
        'images/hero/img5.jpg',
        'images/hero/img6.jpg',
        'images/hero/img7.jpg',
        'images/hero/img8.jpg',
        'images/hero/img9.jpg',
        'images/hero/img10.jpg',
        'images/hero/img11.jpg',
        'images/hero/img12.jpg',
        'images/hero/img13.jpg',
        'images/hero/img14.jpg',
        'images/hero/img15.jpg',
        'images/hero/img16.jpg',
        'images/hero/img17.jpg'
    ];

    const NEW_COLLECTION_IMAGES = [
        'images/hero/new-collection/img18.jpg',
        'images/hero/new-collection/img19.jpg',
        'images/hero/new-collection/img20.jpg',
        'images/hero/new-collection/img21.jpg',
        'images/hero/new-collection/img22.jpg',
        'images/hero/new-collection/img23.jpg',
        'images/hero/new-collection/img24.jpg',
        'images/hero/new-collection/img25.jpg',
        'images/hero/new-collection/img26.jpg',
        'images/hero/new-collection/img27.jpg',
        'images/hero/new-collection/img28.jpg',

    ];

    const IMAGES = collectionType === "new"
        ? NEW_COLLECTION_IMAGES
        : HERO_IMAGES;

    const VISIBLE_AT_ONCE = window.innerWidth < 640 ? 6 : 15;
    const STAY_MIN = 7000;
    const STAY_MAX = 11000;
    const INTERVAL_MIN = 2000;
    const INTERVAL_MAX = 3200;

    const hero = document.querySelector('.hero-collage');
    if (!hero) return;

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
        return {
            x: Math.min(x, 100 - wPct),
            y: Math.min(y, 100 - hPct),
            zoneKey
        };
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
        div.style.cssText = `
      width:${wPct}%;aspect-ratio:9/12;
      left:${x}%;top:${y}%;
      transform:rotate(${rot}deg);
      z-index:${(zCounter = zCounter >= Z_MAX ? 2 : zCounter + 1)};
    `;
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

// ── SWIPE HINT AL ENTRAR EN PANTALLA ──
// Aplica a TODOS los .producto-img que tengan .img-espalda, con o sin clase tiene-espalda
document.querySelectorAll('.producto-img').forEach(el => {
    if (!el.querySelector('.img-espalda, .img-detalle')) return;
    el.classList.add('tiene-espalda'); // asegurar la clase aunque no esté en el HTML
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