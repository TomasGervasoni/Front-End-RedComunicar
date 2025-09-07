document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('contenedor-productos');

  try {
    const respuesta = await fetch('./Productos/productos.json');
    const productos = await respuesta.json();

    productos.forEach(producto => {
      // Crear contenedor del producto
      const card = document.createElement('div');
      card.classList.add('card-producto');
      
      // Imagen
      const img = document.createElement('img');
      img.src = producto.imagen;
      img.alt = producto.nombre;

      // Nombre
      const nombre = document.createElement('h3');
      nombre.textContent = producto.nombre;

      // Precio
      const precio = document.createElement('p');
      precio.classList.add('precio');
      precio.textContent = `$ ${producto.precio.toLocaleString()}`;

      // Añadir al card
      card.appendChild(img);
      card.appendChild(nombre);
      card.appendChild(precio);

      // Evento para mostrar emergente con detalles
      card.addEventListener('click', () => {
        mostrarEmergente(producto);
      });

      contenedor.appendChild(card);
    });

  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
});

// Función para mostrar emergente
function mostrarEmergente(producto) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  modal.innerHTML = `
    <h2>${producto.nombre}</h2>
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <p><strong>Categoría:</strong> ${producto.categoria}</p>
    <p>${producto.descripcion}</p>
    <p><strong>Precio:</strong> $${producto.precio.toLocaleString()}</p>
    <button class="cerrar-modal">Cerrar</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Cerrar modal
  modal.querySelector('.cerrar-modal').addEventListener('click', () => {
    overlay.remove();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

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


