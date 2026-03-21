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
    'images/hero/img15.jpg',
  ];
 
  // Cuántas fotos visibles al mismo tiempo
  const VISIBLE_AT_ONCE = window.innerWidth < 640 ? 5 : 15;
 
  // Duración que cada foto permanece visible (ms)
  const STAY_MS = 6000;
 
  // Intervalo entre apariciones (ms)
  const INTERVAL_MS = 1200;
 
  const hero = document.querySelector('.hero-collage');
  if (!hero) return;
 
  // Zonas seguras: evitar el centro donde está el texto
  // Devuelve una posición aleatoria que NO caiga en el centro
  function randomPosition(wPct, hPct) {
    const isMobile = window.innerWidth < 640;
    // Zona muerta central (donde está el texto)
    const deadX = isMobile ? [25, 75] : [30, 70];
    const deadY = isMobile ? [38, 62] : [30, 70];
 
    let x, y, attempts = 0;
    do {
      x = Math.random() * (95 - wPct);
      y = Math.random() * (95 - hPct);
      attempts++;
    } while (
      attempts < 30 &&
      x + wPct / 2 > deadX[0] && x < deadX[1] &&
      y + hPct / 2 > deadY[0] && y < deadY[1]
    );
 
    return { x, y };
  }
 
  // z-index rotativo para que las fotos nuevas aparezcan encima
  let zCounter = 2;
  const Z_MAX = 45;
 
  // Historial para no repetir la misma foto seguida
  let lastUsed = [];
 
  function pickImage() {
    const available = IMAGES.filter(img => !lastUsed.includes(img));
    const pool = available.length > 0 ? available : IMAGES;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    lastUsed.push(picked);
    if (lastUsed.length > 4) lastUsed.shift();
    return picked;
  }
 
  function spawnPhoto() {
    const isMobile = window.innerWidth < 640;
 
    // Tamaño aleatorio dentro de un rango
    const wPct = isMobile
      ? 30 + Math.random() * 18   // 30–48% en mobile
      : 14 + Math.random() * 12;  // 14–26% en desktop
 
    const hPct = wPct * (12 / 9); // mantener aspecto 9:12
 
    const { x, y } = randomPosition(wPct, hPct);
 
    // Rotación aleatoria sutil
    const rot = (Math.random() * 8 - 4).toFixed(2); // -4 a +4 grados
 
    // Crear elemento
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
 
    // Fade in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => div.classList.add('visible'));
    });
 
    // Fade out y eliminar después de STAY_MS
    setTimeout(() => {
      div.classList.remove('visible');
      setTimeout(() => div.remove(), 950); // esperar transición
    }, STAY_MS);
  }
 
  // Arrancar con varias fotos ya visibles al cargar
  function init() {
    // Lanzar las primeras fotos escalonadas
    for (let i = 0; i < VISIBLE_AT_ONCE; i++) {
      setTimeout(spawnPhoto, i * 1200);
    }
    // Seguir lanzando continuamente
    setInterval(spawnPhoto, INTERVAL_MS);
  }
 
  window.addEventListener('load', () => setTimeout(init, 300));
 
})();