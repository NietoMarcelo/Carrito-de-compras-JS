// Constantes
const MENSAJE_BIENVENIDA = "¡Bienvenido al simulador de carrito de compras!";
const MENSAJE_CARRITO_VACIO = "El carrito está vacío.\nNo hay productos cargados.";

// Variables y array del carrito
let carrito = [];

function mostrarMenu(mensajeBienvenida) {
  let menu = mensajeBienvenida + "\n\n";
  menu = menu + "Menú de opciones:\n\n";
  menu = menu + "1. Agregar productos al carrito\n";
  menu = menu + "2. Ver productos del carrito\n";
  menu = menu + "3. Eliminar un producto\n";
  menu = menu + "4. Editar producto\n";
  menu = menu + "5. Vaciar carrito\n";
  menu = menu + "6. Salir del simulador\n\n";
  menu = menu + "Ingresá el número de la opción que deseas realizar:";
  
  const opcionTexto = prompt(menu);
  const opcion = parseInt(opcionTexto);
  
  if (isNaN(opcion) || opcion < 1 || opcion > 6) {
    alert("Opción inválida. Por favor ingresá un número del 1 al 6.");
    return mostrarMenu(mensajeBienvenida);
  }
  
  return opcion;
}

function pedirDatosProducto(mensajeNombre) {
  const nombre = prompt(mensajeNombre);
  if (nombre === null || nombre.trim() === "") {
    return null;
  }
  const precioTexto = prompt("Ingresá el precio de " + nombre + " (número):");
  const precio = parseFloat(precioTexto);
  if (isNaN(precio) || precio < 0) {
    alert("El precio no es válido. No se agregó el producto.");
    return null;
  }
  return { nombre: nombre.trim(), precio: precio };
}

function agregarProductoAlCarrito(carritoActual) {
  const producto = pedirDatosProducto("Ingresá el nombre del producto:");
  if (producto !== null) {
    carritoActual.push(producto);
    alert("Producto agregado correctamente:\n" + producto.nombre + " - $" + producto.precio);
    console.log("Producto agregado:", producto.nombre, "- $", producto.precio);
    return true;
  }
  return false;
}

function verProductosDelCarrito(carritoActual) {
  if (carritoActual.length === 0) {
    alert("Carrito vacío.\nNo hay productos para mostrar.");
    console.log("Carrito vacío.");
    return;
  }

  let mensaje = "Productos en tu carrito:\n\n";
  let total = 0;
  
  for (let i = 0; i < carritoActual.length; i++) {
    mensaje = mensaje + (i + 1) + ". " + carritoActual[i].nombre + " - $" + carritoActual[i].precio + "\n";
    total = total + carritoActual[i].precio;
  }
  
  mensaje = mensaje + "\nTotal: $" + total;
  
  alert(mensaje);
  console.log("Productos:", carritoActual);
  console.log("Total: $" + total);
}

function eliminarProductoDelCarrito(carritoActual) {
  if (carritoActual.length === 0) {
    alert("Carrito vacío.\nNo hay productos para eliminar.");
    return;
  }

  let mensaje = "Productos en tu carrito:\n\n";
  for (let i = 0; i < carritoActual.length; i++) {
    mensaje = mensaje + (i + 1) + ". " + carritoActual[i].nombre + " - $" + carritoActual[i].precio + "\n";
  }
  mensaje = mensaje + "\nIngresá el número del producto que deseas eliminar:";
  
  const numeroTexto = prompt(mensaje);
  const numero = parseInt(numeroTexto);
  
  if (isNaN(numero) || numero < 1 || numero > carritoActual.length) {
    alert("Número inválido. No se eliminó ningún producto.");
    return;
  }
  
  const indice = numero - 1;
  const productoEliminar = carritoActual[indice];
  
  const confirmar = confirm("¿Estás seguro de que deseas eliminar el producto:\n\n" + 
                           productoEliminar.nombre + " - $" + productoEliminar.precio + 
                           "\n\nAceptar: Eliminar\nCancelar: Cancelar");
  
  if (confirmar) {
    carritoActual.splice(indice, 1);
    alert("Producto eliminado correctamente.");
    console.log("Producto eliminado:", productoEliminar.nombre);
  } else {
    alert("Operación cancelada. No se eliminó ningún producto.");
  }
}

function editarProductoDelCarrito(carritoActual) {
  if (carritoActual.length === 0) {
    alert("Carrito vacío.\nNo hay productos para editar.");
    return;
  }

  let mensaje = "Productos en tu carrito:\n\n";
  for (let i = 0; i < carritoActual.length; i++) {
    mensaje = mensaje + (i + 1) + ". " + carritoActual[i].nombre + " - $" + carritoActual[i].precio + "\n";
  }
  mensaje = mensaje + "\nIngresá el número del producto que deseas editar:";
  
  const numeroTexto = prompt(mensaje);
  const numero = parseInt(numeroTexto);
  
  if (isNaN(numero) || numero < 1 || numero > carritoActual.length) {
    alert("Número inválido. No se editó ningún producto.");
    return;
  }
  
  const indice = numero - 1;
  const productoActual = carritoActual[indice];
  
  alert("Vas a editar el producto:\n" + productoActual.nombre + " - $" + productoActual.precio);
  
  const nuevoNombre = prompt("Ingresá el nuevo nombre del producto (dejá vacío para mantener el actual):");
  const nuevoPrecioTexto = prompt("Ingresá el nuevo precio del producto (dejá vacío para mantener el actual):");
  
  if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
    productoActual.nombre = nuevoNombre.trim();
  }
  
  if (nuevoPrecioTexto !== null && nuevoPrecioTexto.trim() !== "") {
    const nuevoPrecio = parseFloat(nuevoPrecioTexto);
    if (!isNaN(nuevoPrecio) && nuevoPrecio >= 0) {
      productoActual.precio = nuevoPrecio;
    } else {
      alert("El precio ingresado no es válido. Se mantiene el precio anterior.");
    }
  }
  
  alert("Producto editado correctamente:\n" + productoActual.nombre + " - $" + productoActual.precio);
  console.log("Producto editado:", productoActual.nombre, "- $", productoActual.precio);
}

function vaciarCarrito(carritoActual) {
  if (carritoActual.length === 0) {
    alert("El carrito ya está vacío.");
    return;
  }
  
  const confirmar = confirm("¿Estás seguro de que deseas vaciar completamente el carrito?\n\n" +
                           "Se eliminarán " + carritoActual.length + " producto(s).\n\n" +
                           "Aceptar: Vaciar carrito\nCancelar: Cancelar");
  
  if (confirmar) {
    carritoActual.length = 0;
    alert("Carrito vaciado correctamente.");
    console.log("Carrito vaciado.");
  } else {
    alert("Operación cancelada. El carrito no se vació.");
  }
}

function iniciarSimulador(mensajeBienvenida) {
  carrito = [];
  alert(mensajeBienvenida);
  console.log(mensajeBienvenida);
  
  if (carrito.length === 0) {
    alert(MENSAJE_CARRITO_VACIO);
  }
  
  let continuar = true;
  
  while (continuar) {
    const opcion = mostrarMenu(mensajeBienvenida);
    
    if (opcion === 1) {
      agregarProductoAlCarrito(carrito);
    } else if (opcion === 2) {
      verProductosDelCarrito(carrito);
    } else if (opcion === 3) {
      eliminarProductoDelCarrito(carrito);
    } else if (opcion === 4) {
      editarProductoDelCarrito(carrito);
    } else if (opcion === 5) {
      vaciarCarrito(carrito);
    } else if (opcion === 6) {
      const confirmarSalir = confirm("¿Estás seguro de que deseas salir del simulador?\n\n" +
                                     "Aceptar: Salir\nCancelar: Volver al menú");
      if (confirmarSalir) {
        continuar = false;
        alert("¡Gracias por usar el simulador de carrito de compras!\n\nHasta luego.");
        console.log("Simulación finalizada.");
      }
    }
  }
}

iniciarSimulador(MENSAJE_BIENVENIDA);