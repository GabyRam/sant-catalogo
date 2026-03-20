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
const heroImages = [
  'images/hero/img1.jpg','images/hero/img2.jpg','images/hero/img3.jpg',
  'images/hero/img4.jpg','images/hero/img5.jpg','images/hero/img6.jpg',
  'images/hero/img7.jpg','images/hero/img8.jpg','images/hero/img9.jpg',
  'images/hero/img10.jpg'
];

const heroState = Array.from(document.querySelectorAll('.mosaic-cell')).map(cell => ({
  cell,
  a: cell.querySelector('.layer-a'),
  b: cell.querySelector('.layer-b'),
  showingA: true
}));

function heroRandomImg(currentSrc) {
  const current = currentSrc ? currentSrc.split('/').pop() : '';
  const pool = heroImages.filter(img => !img.endsWith(current));
  return pool[Math.floor(Math.random() * pool.length)];
}

function heroRotateCell(s) {
  s.cell.classList.remove('pulsing');
  void s.cell.offsetWidth;
  s.cell.classList.add('pulsing');
  if (s.showingA) {
    s.b.src = heroRandomImg(s.a.src);
    s.b.classList.add('show');
    s.a.classList.add('hide');
    s.showingA = false;
  } else {
    s.a.src = heroRandomImg(s.b.src);
    s.a.classList.remove('hide');
    s.b.classList.remove('show');
    s.showingA = true;
  }
}

function heroSchedule() {
  [...heroState].sort(() => Math.random() - 0.5).forEach((s, i) => {
    setTimeout(() => {
      heroRotateCell(s);
      if (i === heroState.length - 1) setTimeout(heroSchedule, 3000);
    }, i * 1200);
  });
}

window.addEventListener('load', () => setTimeout(heroSchedule, 2000));