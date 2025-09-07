document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.menu-hamburguesa');
  const nav = document.querySelector('.encabezado nav');
  const navLinks = nav.querySelectorAll('a');

  menuBtn.addEventListener('click', function() {
    nav.classList.toggle('activo');
    menuBtn.classList.toggle('activo');
  });

  navLinks.forEach(link => {
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        nav.classList.remove('activo');
        menuBtn.classList.remove('activo');
      }
    });
    link.addEventListener('click', function() {
      nav.classList.remove('activo');
      menuBtn.classList.remove('activo');
    });
  });
});


const toggleThemeBtn = document.getElementById("toggle-theme");

toggleThemeBtn.addEventListener("click", () => {
  const root = document.documentElement;

  // Obtenemos los valores actuales
  const dark = getComputedStyle(root).getPropertyValue("--clr-dark").trim();
  const light = getComputedStyle(root).getPropertyValue("--clr-light").trim();

  // Intercambiamos los valores
  root.style.setProperty("--clr-dark", light);
  root.style.setProperty("--clr-light", dark);
});
