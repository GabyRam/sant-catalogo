function cambiarImagen(id, frente, espalda) {

    const imgFrente = document.getElementById(id);
    const producto = imgFrente.closest(".producto");
    const imgEspalda = producto.querySelector(".img-espalda");

    imgFrente.src = frente;

    if (imgEspalda && espalda) {
        imgEspalda.src = espalda;
    }

}

let startX = 0;
let endX = 0;

document.querySelectorAll(".producto-img").forEach(producto => {

    producto.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    });

    producto.addEventListener("touchend", function (e) {

        endX = e.changedTouches[0].clientX;

        const frente = this.querySelector(".img-frente");
        const espalda = this.querySelector(".img-espalda");

        if (!espalda) return;

        if (startX - endX > 50) {
            espalda.style.opacity = "1";
            frente.style.opacity = "0";
        }

        if (endX - startX > 50) {
            espalda.style.opacity = "0";
            frente.style.opacity = "1";
        }

    });

});

// ── HERO COLLAGE ──
(function () {

  const IMAGES = [
    'images/hero/img1.jpg',  'images/hero/img2.jpg',
    'images/hero/img3.jpg',  'images/hero/img4.jpg',
    'images/hero/img5.jpg',  'images/hero/img6.jpg',
    'images/hero/img7.jpg',  'images/hero/img8.jpg',
    'images/hero/img9.jpg',  'images/hero/img10.jpg',
    'images/hero/img11.jpg', 'images/hero/img12.jpg',
    'images/hero/img13.jpg', 'images/hero/img14.jpg',
    'images/hero/img15.jpg', 'images/hero/img16.jpg',
    'images/hero/img17.jpg',
  ];

  const VISIBLE_AT_ONCE = window.innerWidth < 640 ? 6 : 15;

  // Cada foto dura entre 7 y 11 segundos (aleatorio)
  const STAY_MIN = 7000;
  const STAY_MAX = 11000;

  // Nueva foto aparece cada 1.0–2.2s (aleatorio)
  const INTERVAL_MIN = 1000;
  const INTERVAL_MAX = 2200;

  const hero = document.querySelector('.hero-collage');
  if (!hero) return;

  const COLS = window.innerWidth < 640 ? 3 : 5;
  const ROWS = window.innerWidth < 640 ? 5 : 4;

  // Guardamos qué zonas están ocupadas actualmente
  let occupiedZones = new Set();
  let allZones = [];

  function buildZones() {
    allZones = [];
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS; row++) {
        allZones.push(`${col},${row}`);
      }
    }
  }
  buildZones();

  function randomPosition(wPct, hPct) {
    // Zonas libres: las que no están ocupadas ahora mismo
    const free = allZones.filter(z => !occupiedZones.has(z));
    const pool = free.length > 0 ? free : allZones;

    // Elegir zona aleatoria de las libres
    const zoneKey = pool[Math.floor(Math.random() * pool.length)];
    const [col, row] = zoneKey.split(',').map(Number);

    const cellW = 100 / COLS;
    const cellH = 100 / ROWS;

    const baseX = col * cellW;
    const baseY = row * cellH;

    const maxOffsetX = Math.max(0, cellW - wPct);
    const maxOffsetY = Math.max(0, cellH - hPct);

    // Posición con algo de aleatoriedad extra dentro de la celda
    const x = baseX + Math.random() * maxOffsetX;
    const y = baseY + Math.random() * maxOffsetY;

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

    const wPct = isMobile
      ? 28 + Math.random() * 12
      : 13 + Math.random() * 10;

    const hPct = wPct * (12 / 9);

    const { x, y, zoneKey } = randomPosition(wPct, hPct);

    // Marcar zona como ocupada
    occupiedZones.add(zoneKey);

    const rot = (Math.random() * 8 - 4).toFixed(2);

    const div = document.createElement('div');
    div.className = 'hero-photo';
    div.style.cssText = `
      width: ${wPct}%;
      aspect-ratio: 9/12;
      left: ${x}%;
      top: ${y}%;
      transform: rotate(${rot}deg);
      z-index: ${(zCounter = zCounter >= Z_MAX ? 2 : zCounter + 1)};
    `;

    const img = document.createElement('img');
    img.src = pickImage();
    img.alt = '';
    div.appendChild(img);
    hero.insertBefore(div, hero.querySelector('.hero-overlay'));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => div.classList.add('visible'));
    });

    // Duración aleatoria para que no desaparezcan todas a la vez
    const stayMs = STAY_MIN + Math.random() * (STAY_MAX - STAY_MIN);

    setTimeout(() => {
      div.classList.remove('visible');
      occupiedZones.delete(zoneKey); // liberar zona
      setTimeout(() => div.remove(), 950);
    }, stayMs);

    // Programar la siguiente foto con intervalo aleatorio
    const nextInterval = INTERVAL_MIN + Math.random() * (INTERVAL_MAX - INTERVAL_MIN);
    setTimeout(spawnPhoto, nextInterval);
  }

  function init() {
    // Lanzar las primeras fotos muy escalonadas para que no aparezcan todas juntas
    for (let i = 0; i < VISIBLE_AT_ONCE; i++) {
      setTimeout(spawnPhoto, i * 1800);
    }
  }

  window.addEventListener('load', () => setTimeout(init, 300));

})();