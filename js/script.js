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