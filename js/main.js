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
let carrito = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || "[]");

const productosPorId = productos.reduce(function (acc, producto) {
  acc[producto.id] = producto;
  return acc;
}, {});

function guardarCarrito() {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function contarItemsCarrito() {
  return carrito.reduce(function (total, item) {
    return total + item.cantidad;
  }, 0);
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito-header");
  if (!contador) return;
  contador.textContent = String(contarItemsCarrito());
}

function agregarProductoAlCarrito(idProducto) {
  const existe = carrito.some(function (item) {
    return item.id === idProducto;
  });

  carrito = existe
    ? carrito.map(function (item) {
        if (item.id !== idProducto) return item;
        return { id: item.id, cantidad: item.cantidad + 1 };
      })
    : [...carrito, { id: idProducto, cantidad: 1 }];

  guardarCarrito();
  actualizarContadorCarrito();
}

function eliminarProductoDelCarrito(idProducto) {
  carrito = carrito.filter(function (item) {
    return item.id !== idProducto;
  });
  guardarCarrito();
  actualizarContadorCarrito();
}

function actualizarCantidadCarrito(idProducto, nuevaCantidad) {
  const cantidadValida = nuevaCantidad < 1 ? 1 : nuevaCantidad;
  carrito = carrito.map(function (item) {
    if (item.id !== idProducto) return item;
    return { id: item.id, cantidad: cantidadValida };
  });
  guardarCarrito();
  actualizarContadorCarrito();
}

function calcularSubtotalCarrito() {
  return carrito.reduce(function (total, item) {
    const producto = productosPorId[item.id];
    if (!producto) return total;
    return total + producto.precio * item.cantidad;
  }, 0);
}

function formatearPrecio(numero) {
  return "$" + Number(numero).toLocaleString("es-AR");
}

function filtrarProductos(texto, categoriaSeleccionada, marcaSeleccionada) {
  const termino = (texto || "").toLowerCase().trim();

  return productos.filter(function (producto) {
    const coincideCategoria = !categoriaSeleccionada || producto.categoria === categoriaSeleccionada;
    const coincideMarca =
      !marcaSeleccionada || marcaSeleccionada === "Todos" || producto.marca === marcaSeleccionada;

    if (!coincideCategoria || !coincideMarca) return false;
    if (!termino) return true;

    const textoProducto = (producto.nombre + " " + producto.categoria + " " + producto.marca).toLowerCase();
    return textoProducto.indexOf(termino) !== -1;
  });
}

function renderizarProductos(lista, contenedor, mensajeEstado) {
  if (!lista.length) {
    mensajeEstado.textContent = "No se encontraron productos para la búsqueda o filtros seleccionados.";
    contenedor.innerHTML = "";
    return;
  }

  mensajeEstado.textContent = "Mostrando " + lista.length + " producto(s).";

  contenedor.innerHTML = lista
    .map(function (producto) {
      return `
        <div class="col-12 col-sm-6 col-md-4">
          <article class="producto-card h-100">
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
            <p class="producto-categoria mb-1">${producto.categoria}</p>
            <h3 class="h6 mb-2">${producto.nombre}</h3>
            <p class="producto-precio">${formatearPrecio(producto.precio)}</p>
            <p class="producto-detalle">${producto.detalle1}</p>
            <p class="producto-detalle mb-3">${producto.detalle2}</p>
            <div class="producto-footer">
              <button class="btn btn-sm btn-primary" type="button" data-id-producto="${producto.id}">
                Agregar al carrito
              </button>
            </div>
          </article>
        </div>
      `;
    })
    .join("");
}

function inicializarPaginaProductos() {
  const contenedor = document.getElementById("lista-productos");
  const mensajeEstado = document.getElementById("mensaje-estado-productos");
  const buscador = document.getElementById("buscador-productos");
  const listaCategorias = document.getElementById("lista-categorias");
  const listaMarcas = document.getElementById("lista-marcas");

  if (!contenedor || !mensajeEstado || !buscador || !listaCategorias || !listaMarcas) return;

  let categoriaSeleccionada = "";
  let marcaSeleccionada = "Todos";

  function actualizar() {
    const texto = buscador.value || "";
    const filtrados = filtrarProductos(texto, categoriaSeleccionada, marcaSeleccionada);
    renderizarProductos(filtrados, contenedor, mensajeEstado);
  }

  actualizar();

  buscador.addEventListener("input", function () {
    actualizar();
  });

  listaCategorias.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button[data-categoria]");
    if (!boton) return;

    const categoria = boton.getAttribute("data-categoria");

    if (categoriaSeleccionada === categoria) {
      categoriaSeleccionada = "";
      Array.from(listaCategorias.getElementsByTagName("button")).forEach(function (b) {
        b.classList.remove("active");
      });
    } else {
      categoriaSeleccionada = categoria;
      Array.from(listaCategorias.getElementsByTagName("button")).forEach(function (b) {
        b.classList.remove("active");
      });
      boton.classList.add("active");
    }

    actualizar();
  });

  listaMarcas.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button[data-marca]");
    if (!boton) return;

    marcaSeleccionada = boton.getAttribute("data-marca");

    Array.from(listaMarcas.getElementsByTagName("button")).forEach(function (b) {
      b.classList.remove("active");
    });
    boton.classList.add("active");

    actualizar();
  });

  contenedor.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button[data-id-producto]");
    if (!boton) return;

    agregarProductoAlCarrito(boton.getAttribute("data-id-producto"));
    mensajeEstado.textContent = "Producto agregado. Tenés " + contarItemsCarrito() + " item(s) en el carrito.";
  });
}

function renderizarCarritoEnPagina() {
  const contenedor = document.getElementById("lista-carrito");
  const mensaje = document.getElementById("mensaje-estado-carrito");
  const subtotalElemento = document.getElementById("subtotal-carrito");
  const totalElemento = document.getElementById("total-carrito");

  if (!contenedor || !mensaje || !subtotalElemento || !totalElemento) return;

  if (!carrito.length) {
    mensaje.textContent = "Carrito vacio. No hay productos cargados.";
    subtotalElemento.textContent = formatearPrecio(0);
    totalElemento.textContent = formatearPrecio(0);
    contenedor.innerHTML = "";
    return;
  }

  mensaje.textContent = "Tenés " + contarItemsCarrito() + " ítem(s) en tu carrito.";

  const subtotal = calcularSubtotalCarrito();

  contenedor.innerHTML = carrito
    .map(function (item) {
      const producto = productosPorId[item.id];
      if (!producto) return "";

      const subtotalItem = producto.precio * item.cantidad;

      return `
        <div class="list-group-item">
          <div class="carrito-item">
            <div class="carrito-item-info-wrapper">
              <img class="carrito-item-imagen" src="${producto.imagen}" alt="${producto.nombre}">
              <div class="carrito-item-info">
                <h3>${producto.nombre}</h3>
                <small>${producto.categoria} · ${producto.marca}</small>
                <div>
                  <small>Precio unitario: ${formatearPrecio(producto.precio)}</small>
                </div>
              </div>
            </div>

            <div class="carrito-item-acciones">
              <div class="carrito-botones-cantidad">
                <button type="button" class="btn btn-outline-secondary btn-sm" data-id-producto="${producto.id}" data-accion="menos">−</button>
                <input
                  type="number"
                  min="1"
                  class="form-control form-control-sm carrito-cantidad-input"
                  value="${item.cantidad}"
                  data-id-producto="${producto.id}"
                >
                <button type="button" class="btn btn-outline-secondary btn-sm" data-id-producto="${producto.id}" data-accion="mas">+</button>
              </div>

              <span class="fw-semibold">${formatearPrecio(subtotalItem)}</span>

              <button type="button" class="btn btn-outline-danger btn-sm" data-id-producto="${producto.id}" data-accion="eliminar">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  subtotalElemento.textContent = formatearPrecio(subtotal);
  totalElemento.textContent = formatearPrecio(subtotal);
}

function inicializarPaginaCarrito() {
  const contenedor = document.getElementById("lista-carrito");
  const botonVaciar = document.getElementById("boton-vaciar-carrito");
  const botonFinalizar = document.getElementById("boton-finalizar");

  if (!contenedor) return;

  renderizarCarritoEnPagina();

  contenedor.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button[data-id-producto]");
    if (!boton) return;

    const idProducto = boton.getAttribute("data-id-producto");
    const accion = boton.getAttribute("data-accion");

    if (accion === "eliminar") {
      eliminarProductoDelCarrito(idProducto);
      renderizarCarritoEnPagina();
      return;
    }

    const item = carrito.find(function (i) {
      return i.id === idProducto;
    });
    if (!item) return;

    if (accion === "menos") actualizarCantidadCarrito(idProducto, item.cantidad - 1);
    if (accion === "mas") actualizarCantidadCarrito(idProducto, item.cantidad + 1);
    renderizarCarritoEnPagina();
  });

  contenedor.addEventListener("change", function (evento) {
    const input = evento.target;
    if (!input.matches("input[data-id-producto]")) return;

    const idProducto = input.getAttribute("data-id-producto");
    const valor = parseInt(input.value, 10);

    if (!Number.isFinite(valor) || valor < 1) {
      input.value = 1;
      actualizarCantidadCarrito(idProducto, 1);
    } else {
      actualizarCantidadCarrito(idProducto, valor);
    }

    renderizarCarritoEnPagina();
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
      if (!mensaje) return;

      mensaje.textContent = carrito.length
        ? "Compra simulada correctamente. Gracias por utilizar la tienda."
        : "Carrito vacio. No hay productos para finalizar.";
    });
  }
}

actualizarContadorCarrito();
inicializarPaginaProductos();
inicializarPaginaCarrito();
