document.addEventListener('DOMContentLoaded', () => {
  const listaCarrito = document.getElementById('lista-carrito');
  const totalPrecio = document.getElementById('total-precio');

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function renderCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
      const item = document.createElement('div');
      item.classList.add('item-producto');
      item.innerHTML = `
        <img src="${producto.imagen}" class="img-producto" alt="${producto.nombre}">
        <div class="info-producto">
          <h3>${producto.nombre}</h3>
          <p>$${producto.precio}</p>
        </div>
        <button class="btn-eliminar" data-index="${index}">Eliminar</button>
      `;
      listaCarrito.appendChild(item);
      total += producto.precio;
    });

    totalPrecio.textContent = `$${total}`;
  }

  listaCarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderCarrito();
    }
  });

  renderCarrito();
});
