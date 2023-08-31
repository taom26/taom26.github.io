// Datos de ejemplo de productos (puedes obtenerlos desde una API)
const productos = [
    { nombre: "Lana escolar", precio: 0.65 },
    { nombre: "Crochet", precio: 1.40 },
    { nombre: "Mullos", precio: 1.25 },
    { nombre: "Hilo nylon", precio: 2.50 },
    { nombre: "Hilo cola de raton", precio: 0.25 },
    { nombre: "Fieltro", precio: 0.60 }
    // Se pueden agregar más productos
  ];
  
  // Función para generar los elementos HTML de los productos
  function generarProductos() {
    const productosContainer = document.querySelector(".productos-container");
    
    productos.forEach(producto => {
      const productoDiv = document.createElement("div");
      productoDiv.className = "producto";
      
      productoDiv.innerHTML = `
        <img src="imagenes/${producto.nombre.replace(" ", "-").toLowerCase()}.jpg" alt="${producto.nombre}">
        <div class="producto-info">
          <p class="producto-nombre">${producto.nombre}</p>
          <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
          <button class="agregar-carrito">Agregar al carrito</button>
        </div>
      `;
      
      productosContainer.appendChild(productoDiv);
    });
  }
  
  // Variables para el carrito y el total
  const carrito = [];
  let totalCarrito = 0;
  
  // Función para actualizar la visualización del carrito
  function actualizarCarrito() {
    const carritoLista = document.querySelector(".carrito-lista");
    const totalCarritoElement = document.querySelector(".total-carrito");
  
    carritoLista.innerHTML = ""; // Limpiamos la lista para actualizarla
  
    carrito.forEach((item, index) => {
      const itemLi = document.createElement("li");
      const eliminarBtn = document.createElement("button");
  
      itemLi.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.className = "eliminar-producto";
      eliminarBtn.setAttribute("data-index", index);
  
      itemLi.appendChild(eliminarBtn);
      carritoLista.appendChild(itemLi);
    });
  
    totalCarritoElement.textContent = `Total: $${totalCarrito.toFixed(2)}`;
  }
  
  
  // Lógica para escuchar clics en los botones de "Eliminar"
  document.addEventListener("click", event => {
    if (event.target.classList.contains("eliminar-producto")) {
      const index = parseInt(event.target.getAttribute("data-index"));
      eliminarProducto(index);
    }
  });
  
  // Función para eliminar un producto del carrito
  function eliminarProducto(index) {
    const productoEliminado = carrito.splice(index, 1)[0];
    totalCarrito -= productoEliminado.precio;
    actualizarCarrito();
  }
  
  // Función para agregar un producto al carrito
  function agregarAlCarrito(producto) {
    carrito.push(producto);
    totalCarrito += producto.precio;
    actualizarCarrito();
  }
  
  // Lógica para escuchar clics en los botones de "Agregar al carrito"
  document.addEventListener("click", event => {
    if (event.target.classList.contains("agregar-carrito")) {
      const productoNombre = event.target.parentNode.querySelector(".producto-nombre").textContent;
      const productoPrecio = parseFloat(event.target.parentNode.querySelector(".producto-precio").textContent.slice(1));
      
      const producto = { nombre: productoNombre, precio: productoPrecio };
      agregarAlCarrito(producto);
    }
  });
  
  window.jsPDF = window.jspdf.jsPDF; //Necesario para cargar bien el jsPDF caso contrario no carga
  // Lógica para escuchar clics en el botón "Comprar"
  const btnComprar = document.getElementById("btn-comprar");
  btnComprar.addEventListener("click", () => {
    generarArchivoPDFDeCompra();
  });
  
  // Función para generar y descargar un archivo PDF de compra
  function generarArchivoPDFDeCompra() {
    const doc = new jsPDF();
    const contenido = generarContenidoPDF();
    
    doc.text(contenido, 10, 10);
    doc.save("compra.pdf");
  }
  
  // Función para generar el contenido del PDF de compra
  function generarContenidoPDF() {
  
    let contenido = "Papelería bp&TEC\n--------------------------------------------------------------------------\n\n";
    contenido += "Productos en el carrito:\n--------------------------------------------------------------------------\n\n";
    
    carrito.forEach(item => {
      contenido += `${item.nombre} - $${item.precio.toFixed(2)}\n`;
    });
    
    contenido += `\n--------------------------------------------------------------------------
    \nTotal: $${totalCarrito.toFixed(2)}\n\n\n\nPor favor, acércate con este documento a nuestra tienda para concretar la\n`;
    contenido += "compra!\n\n";
    contenido += "Información de contacto:\n";
    contenido += "Papelería bp&TEC\n";
    contenido += "Teléfono: (593) 99 667 8134\n";
    contenido += "Correo Electrónico: villagomez_luis@hotmail.com\n";
    contenido += "Dirección: Rio Conuris y Antonio de Bastidas Local H31, Quito, Ecuador";
    
    return contenido;
  }
  
  
  // Llama a la función para generar los productos al cargar la página
  window.addEventListener("load", generarProductos);