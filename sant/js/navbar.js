/* ══════════════════════════════════════════
   navbar.js — Lógica del menú hamburguesa
   ══════════════════════════════════════════ */

// Cierra el menú al hacer clic en cualquier link de navegación
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.getElementById('navbarCatalogo');
        if (!navbarCollapse) return;
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
        }
    });
});
