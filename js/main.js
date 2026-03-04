const productos = [
  // Celulares
  {
    id: "cel-moto-e15",
    nombre: "Motorola moto E15 2+64Gb",
    categoria: "Celulares",
    marca: "Motorola",
    precio: 208.99,
    detalle1: "9% OFF 188,99",
    detalle2: "Sin impuestos nacionales 157,04",
    imagen: "imagenes/motoE15.png"
  },
  {
    id: "cel-iphone-15",
    nombre: "iPhone 15 Pro 256Gb",
    categoria: "Celulares",
    marca: "Apple",
    precio: 1599.0,
    detalle1: "7% OFF 1487,07",
    detalle2: "Sin impuestos nacionales 1.230,00",
    imagen: "imagenes/iphone.png"
  },
  {
    id: "cel-s25",
    nombre: "Samsung S25 8+256Gb",
    categoria: "Celulares",
    marca: "Samsung",
    precio: 1099.0,
    detalle1: "12% OFF 957,12",
    detalle2: "Sin impuestos nacionales 800,50",
    imagen: "imagenes/samsungS25.png"
  },
  // Auriculares
  {
    id: "aur-bt-x",
    nombre: "Auriculares Bluetooth X",
    categoria: "Auriculares",
    marca: "Samsung",
    precio: 89.99,
    detalle1: "Con cancelación de ruido",
    detalle2: "Incluye estuche de carga",
    imagen: "imagenes/auriculares.png"
  },
  {
    id: "aur-cable-y",
    nombre: "Auriculares con cable Y",
    categoria: "Auriculares",
    marca: "Motorola",
    precio: 29.99,
    detalle1: "Conector 3.5 mm",
    detalle2: "Cable reforzado",
    imagen: "imagenes/auriculares.png"
  },
  // Cargadores
  {
    id: "carg-25w",
    nombre: "Cargador rápido 25W",
    categoria: "Cargadores",
    marca: "Samsung",
    precio: 39.99,
    detalle1: "Carga rápida compatible",
    detalle2: "Cable USB-C incluido",
    imagen: "imagenes/cargadores.png"
  },
  {
    id: "carg-auto-usb",
    nombre: "Cargador auto USB",
    categoria: "Cargadores",
    marca: "Xiaomi",
    precio: 24.99,
    detalle1: "Doble puerto USB",
    detalle2: "Protección contra sobrecarga",
    imagen: "imagenes/cargadores.png"
  },
  // Fundas
  {
    id: "funda-silicona",
    nombre: "Funda silicona transparente",
    categoria: "Fundas",
    marca: "Motorola",
    precio: 14.99,
    detalle1: "Compatible con varios modelos",
    detalle2: "Bordes reforzados",
    imagen: "imagenes/fundas.png"
  },
  {
    id: "funda-antigolpes",
    nombre: "Funda antigolpes negra",
    categoria: "Fundas",
    marca: "Samsung",
    precio: 19.99,
    detalle1: "Protección 360°",
    detalle2: "Acabado antideslizante",
    imagen: "imagenes/fundas.png"
  },
  // Smartwatch
  {
    id: "watch-smart-x",
    nombre: "Smartwatch X deportivo",
    categoria: "Smartwatch",
    marca: "Huawei",
    precio: 199.99,
    detalle1: "Seguimiento de actividad",
    detalle2: "Resistente al agua",
    imagen: "imagenes/smartwatch.png"
  },
  // Soportes
  {
    id: "soporte-auto",
    nombre: "Soporte magnético para auto",
    categoria: "Soportes",
    marca: "LG",
    precio: 17.99,
    detalle1: "Rotación 360°",
    detalle2: "Instalación sencilla",
    imagen: "imagenes/soportes.png"
  }
];

const CLAVE_CARRITO = "carritoAccesorios";
let carrito = [];

//            LOCAL STORAGE           //

function cargarCarrito() {
  const data = localStorage.getItem(CLAVE_CARRITO);
  if (!data) {
    return [];
  }
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    return [];
  }
}

function guardarCarrito() {
  const data = JSON.stringify(carrito);
  localStorage.setItem(CLAVE_CARRITO, data);
}

function buscarProductoPorId(idBuscado) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === idBuscado) {
      return productos[i];
    }
  }
  return null;
}

function buscarItemEnCarrito(idProducto) {
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === idProducto) {
      return carrito[i];
    }
  }
  return null;
}

function agregarProductoAlCarrito(idProducto) {
  const producto = buscarProductoPorId(idProducto);
  if (!producto) {
    return;
  }

  let item = buscarItemEnCarrito(idProducto);
  if (item) {
    item.cantidad = item.cantidad + 1;
  } else {
    carrito.push({
      id: producto.id,
      cantidad: 1
    });
  }

  guardarCarrito();
  actualizarContadorCarrito();
}

function eliminarProductoDelCarrito(idProducto) {
  const nuevoCarrito = [];
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id !== idProducto) {
      nuevoCarrito.push(carrito[i]);
    }
  }
  carrito = nuevoCarrito;
  guardarCarrito();
}

function actualizarCantidadEnCarrito(idProducto, nuevaCantidad) {
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === idProducto) {
      carrito[i].cantidad = nuevaCantidad;
    }
  }
  guardarCarrito();
}

function calcularTotalCarrito() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const producto = buscarProductoPorId(item.id);
    if (producto) {
      total = total + producto.precio * item.cantidad;
    }
  }
  return total;
}

function contarItemsCarrito() {
  let totalUnidades = 0;
  for (let i = 0; i < carrito.length; i++) {
    totalUnidades = totalUnidades + carrito[i].cantidad;
  }
  return totalUnidades;
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito-header");
  if (!contador) {
    return;
  }
  const unidades = contarItemsCarrito();
  contador.textContent = String(unidades);
}

//            FITROS            //

function filtrarProductos(texto, categoriaSeleccionada, marcaSeleccionada) {
  const resultado = [];
  const termino = texto.toLowerCase();

  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];

    if (categoriaSeleccionada && producto.categoria !== categoriaSeleccionada) {
      continue;
    }

    if (marcaSeleccionada && marcaSeleccionada !== "Todos" && producto.marca !== marcaSeleccionada) {
      continue;
    }

    if (termino) {
      const textoProducto = (producto.nombre + " " + producto.categoria + " " + producto.marca).toLowerCase();
      if (textoProducto.indexOf(termino) === -1) {
        continue;
      }
    }

    resultado.push(producto);
  }

  return resultado;
}

//          CARDS PRODUCTOS           //

function renderizarProductos(lista, contenedor, mensajeEstado) {
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    mensajeEstado.textContent = "No se encontraron productos para la búsqueda o filtros seleccionados.";
    return;
  }

  mensajeEstado.textContent = "Mostrando " + lista.length + " producto(s).";

  for (let i = 0; i < lista.length; i++) {
    const producto = lista[i];

    const columna = document.createElement("div");
    columna.className = "col-12 col-sm-6 col-md-4";

    const tarjeta = document.createElement("article");
    tarjeta.className = "producto-card h-100";

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;
    img.className = "producto-imagen";

    const categoria = document.createElement("p");
    categoria.className = "producto-categoria mb-1";
    categoria.textContent = producto.categoria;

    const nombre = document.createElement("h3");
    nombre.className = "h6 mb-2";
    nombre.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.className = "producto-precio";
    precio.textContent = "$" + producto.precio.toLocaleString("es-AR");

    const detalle1 = document.createElement("p");
    detalle1.className = "producto-detalle";
    detalle1.textContent = producto.detalle1;

    const detalle2 = document.createElement("p");
    detalle2.className = "producto-detalle mb-3";
    detalle2.textContent = producto.detalle2;

    const footer = document.createElement("div");
    footer.className = "producto-footer";

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn btn-sm btn-primary";
    boton.textContent = "Agregar al carrito";
    boton.setAttribute("data-id-producto", producto.id);

    footer.appendChild(boton);

    tarjeta.appendChild(img);
    tarjeta.appendChild(categoria);
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(detalle1);
    tarjeta.appendChild(detalle2);
    tarjeta.appendChild(footer);

    columna.appendChild(tarjeta);
    contenedor.appendChild(columna);
  }
}

//              PAGINA PRODUCTOS          //

function inicializarPaginaProductos() {
  const contenedor = document.getElementById("lista-productos");
  const mensajeEstado = document.getElementById("mensaje-estado-productos");
  const buscador = document.getElementById("buscador-productos");
  const listaCategorias = document.getElementById("lista-categorias");
  const listaMarcas = document.getElementById("lista-marcas");

  if (!contenedor || !mensajeEstado || !buscador || !listaCategorias || !listaMarcas) {
    return;
  }

  let filtroCategoria = "";
  let filtroMarca = "Todos";

  function actualizarProductos() {
    const texto = buscador.value || "";
    const filtrados = filtrarProductos(texto, filtroCategoria, filtroMarca);
    renderizarProductos(filtrados, contenedor, mensajeEstado);
  }

  actualizarProductos();

  buscador.addEventListener("input", function () {
    actualizarProductos();
  });

  listaCategorias.addEventListener("click", function (evento) {
    const boton = evento.target;
    if (boton.matches("button[data-categoria]")) {
      const categoria = boton.getAttribute("data-categoria");

      if (filtroCategoria === categoria) {
        filtroCategoria = "";
        boton.classList.remove("active");
      } else {
        filtroCategoria = categoria;
        const botones = listaCategorias.getElementsByTagName("button");
        for (let i = 0; i < botones.length; i++) {
          botones[i].classList.remove("active");
        }
        boton.classList.add("active");
      }
      actualizarProductos();
    }
  });

  listaMarcas.addEventListener("click", function (evento) {
    const boton = evento.target;
    if (boton.matches("button[data-marca]")) {
      filtroMarca = boton.getAttribute("data-marca");

      const botones = listaMarcas.getElementsByTagName("button");
      for (let i = 0; i < botones.length; i++) {
        botones[i].classList.remove("active");
      }
      boton.classList.add("active");

      actualizarProductos();
    }
  });

  contenedor.addEventListener("click", function (evento) {
    const boton = evento.target;
    if (boton.matches("button[data-id-producto]")) {
      const idProducto = boton.getAttribute("data-id-producto");
      agregarProductoAlCarrito(idProducto);
    }
  });
}

//           CARDS CARRITO          //

function renderizarCarritoEnPagina() {
  const contenedor = document.getElementById("lista-carrito");
  const mensaje = document.getElementById("mensaje-estado-carrito");
  const subtotalElemento = document.getElementById("subtotal-carrito");
  const totalElemento = document.getElementById("total-carrito");

  if (!contenedor || !mensaje || !subtotalElemento || !totalElemento) {
    return;
  }

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    mensaje.textContent = "Tu carrito está vacío. Volvé a la página de productos para agregar ítems.";
    subtotalElemento.textContent = "$0";
    totalElemento.textContent = "$0";
    return;
  }

  let subtotal = 0;

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const producto = buscarProductoPorId(item.id);
    if (!producto) {
      continue;
    }

    const fila = document.createElement("div");
    fila.className = "list-group-item";

    const contenido = document.createElement("div");
    contenido.className = "carrito-item";

    const infoWrapper = document.createElement("div");
    infoWrapper.className = "carrito-item-info-wrapper";

    const imagen = document.createElement("img");
    imagen.className = "carrito-item-imagen";
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    const info = document.createElement("div");
    info.className = "carrito-item-info";

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const detalle = document.createElement("small");
    detalle.textContent = producto.categoria + " · " + producto.marca;

    const precioUnitario = document.createElement("small");
    precioUnitario.textContent = "Precio unitario: $" + producto.precio.toLocaleString("es-AR");

    info.appendChild(titulo);
    info.appendChild(detalle);
    info.appendChild(precioUnitario);

    infoWrapper.appendChild(imagen);
    infoWrapper.appendChild(info);

    const acciones = document.createElement("div");
    acciones.className = "carrito-item-acciones";

    const grupoCantidad = document.createElement("div");
    grupoCantidad.className = "carrito-botones-cantidad";

    const botonMenos = document.createElement("button");
    botonMenos.type = "button";
    botonMenos.className = "btn btn-outline-secondary btn-sm";
    botonMenos.textContent = "−";
    botonMenos.setAttribute("data-id-producto", item.id);
    botonMenos.setAttribute("data-accion", "menos");

    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.min = "1";
    inputCantidad.value = String(item.cantidad);
    inputCantidad.className = "form-control form-control-sm carrito-cantidad-input";
    inputCantidad.setAttribute("data-id-producto", item.id);

    const botonMas = document.createElement("button");
    botonMas.type = "button";
    botonMas.className = "btn btn-outline-secondary btn-sm";
    botonMas.textContent = "+";
    botonMas.setAttribute("data-id-producto", item.id);
    botonMas.setAttribute("data-accion", "mas");

    grupoCantidad.appendChild(botonMenos);
    grupoCantidad.appendChild(inputCantidad);
    grupoCantidad.appendChild(botonMas);

    const subtotalItem = producto.precio * item.cantidad;
    subtotal = subtotal + subtotalItem;

    const textoSubtotal = document.createElement("span");
    textoSubtotal.className = "fw-semibold";
    textoSubtotal.textContent = "$" + subtotalItem.toLocaleString("es-AR");

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.className = "btn btn-outline-danger btn-sm";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.setAttribute("data-id-producto", item.id);
    botonEliminar.setAttribute("data-accion", "eliminar");

    acciones.appendChild(grupoCantidad);
    acciones.appendChild(textoSubtotal);
    acciones.appendChild(botonEliminar);

    contenido.appendChild(infoWrapper);
    contenido.appendChild(acciones);

    fila.appendChild(contenido);
    contenedor.appendChild(fila);
  }

  subtotalElemento.textContent = "$" + subtotal.toLocaleString("es-AR");
  totalElemento.textContent = "$" + subtotal.toLocaleString("es-AR");

  const unidades = contarItemsCarrito();
  mensaje.textContent = "Tenés " + unidades + " ítem(s) en tu carrito.";
}

//              PAGINA CARRITO

function inicializarPaginaCarrito() {
  const contenedor = document.getElementById("lista-carrito");
  const botonVaciar = document.getElementById("boton-vaciar-carrito");
  const botonFinalizar = document.getElementById("boton-finalizar");

  if (!contenedor) {
    return;
  }

  renderizarCarritoEnPagina();

  contenedor.addEventListener("click", function (evento) {
    const boton = evento.target;
    if (boton.matches("button[data-id-producto]")) {
      const idProducto = boton.getAttribute("data-id-producto");
      const accion = boton.getAttribute("data-accion");

      if (accion === "eliminar") {
        eliminarProductoDelCarrito(idProducto);
      } else if (accion === "menos") {
        const item = buscarItemEnCarrito(idProducto);
        if (item && item.cantidad > 1) {
          actualizarCantidadEnCarrito(idProducto, item.cantidad - 1);
        }
      } else if (accion === "mas") {
        const item = buscarItemEnCarrito(idProducto);
        if (item) {
          actualizarCantidadEnCarrito(idProducto, item.cantidad + 1);
        }
      }

      actualizarContadorCarrito();
      renderizarCarritoEnPagina();
    }
  });

  contenedor.addEventListener("change", function (evento) {
    const input = evento.target;
    if (input.matches("input[data-id-producto]")) {
      const idProducto = input.getAttribute("data-id-producto");
      const valor = parseInt(input.value, 10);
      if (isNaN(valor) || valor < 1) {
        input.value = "1";
        return;
      }
      actualizarCantidadEnCarrito(idProducto, valor);
      actualizarContadorCarrito();
      renderizarCarritoEnPagina();
    }
  });

  if (botonVaciar) {
    botonVaciar.addEventListener("click", function () {
      carrito = [];
      guardarCarrito();
      actualizarContadorCarrito();
      renderizarCarritoEnPagina();
    });
  }

  if (botonFinalizar) {
    botonFinalizar.addEventListener("click", function () {
      const mensaje = document.getElementById("mensaje-estado-carrito");
      if (!mensaje) {
        return;
      }
      if (carrito.length === 0) {
        mensaje.textContent = "No hay productos para finalizar la compra.";
        return;
      }
      mensaje.textContent = "Compra simulada correctamente. Gracias por utilizar la tienda.";
    });
  }
}

//            INICIO          //

document.addEventListener("DOMContentLoaded", function () {
  carrito = cargarCarrito();
  actualizarContadorCarrito();
  inicializarPaginaProductos();
  inicializarPaginaCarrito();
});