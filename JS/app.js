const body = document.querySelector("body");
const toggleThemeBtn = document.getElementById("toggle-theme");
document.addEventListener('DOMContentLoaded', async () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    body.classList.add("light-mode");
    intercambiarVariablesTema();
  }
  
  
  const contenedor = document.getElementById('contenedor-productos');

  try {
    const respuesta = await fetch('./Productos/productos.json');
    const productos = await respuesta.json();

    productos.forEach(producto => {
      // Contenedor principal del producto
      const item = document.createElement('div');
      item.classList.add('item-producto');

      // Imagen
      const img = document.createElement('img');
      img.src = producto.imagen;
      img.alt = producto.nombre;
      img.classList.add('img-producto');

      // Contenedor del texto
      const info = document.createElement('div');
      info.classList.add('info-producto');

      const nombre = document.createElement('h3');
      nombre.textContent = producto.nombre;

      // const descripcion = document.createElement('p');
      // descripcion.textContent = producto.descripcion;

      info.appendChild(nombre);
      // info.appendChild(descripcion);

      // Contenedor precio (por ahora sin stock)
      const extra = document.createElement('div');
      extra.classList.add('extra-producto');

      const precio = document.createElement('p');
      precio.textContent = `$${producto.precio.toLocaleString()}`;

      // const stock = document.createElement('p');
      // stock.textContent = `Stock: ${producto.stock}`;

      extra.appendChild(precio);
      // extra.appendChild(stock);

      // Armar la estructura final
      item.appendChild(img);
      item.appendChild(info);
      item.appendChild(extra);

      // Evento para modal
      item.addEventListener('click', () => mostrarEmergente(producto));

      contenedor.appendChild(item);
    });

  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
});

// 🛒 Array para el carrito
let carrito = [];

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
    <p><strong>Stock:</strong> ${producto.stock}</p>
    <button class="btn-agregar">Agregar al carrito</button>
    <button class="cerrar-modal">Cerrar</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  //Botón cerrar
  modal.querySelector('.cerrar-modal').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  //Botón agregar al carrito
  modal.querySelector('.btn-agregar').addEventListener('click', () => {
    agregarAlCarrito(producto);
  });
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  console.log("Carrito actualizado:", carrito);
  alert(`${producto.nombre} agregado al carrito 🛒`);
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

//amtes del DOM estan las variables del tema
// Al cargar la página
//DOM async(Reviso el tema que va)

// Evento para alternar tema
toggleThemeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }

  intercambiarVariablesTema();
});

// Función para intercambiar variables
function intercambiarVariablesTema() {
  const root = document.documentElement;
  const dark = getComputedStyle(root).getPropertyValue("--clr-dark").trim();
  const light = getComputedStyle(root).getPropertyValue("--clr-light").trim();

  root.style.setProperty("--clr-dark", light);
  root.style.setProperty("--clr-light", dark);
}

