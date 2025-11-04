let carrito = [];
let total = 0;

function toggleNumero(tipo) {
    const check = document.getElementById(`sin-dorsal-${tipo}`);
    const input = document.getElementById(`num-${tipo}`);

    if (check.checked) {
        input.disabled = true;
        input.value = "";
        input.placeholder = "Sin dorsal";
    } else {
        input.disabled = false;
        input.placeholder = "Ej: 10";
    }
}

function limitarNumero(input) {
    let value = parseInt(input.value);
    if (isNaN(value) || value < 1) {
        input.value = 1;
    } else if (value > 99) {
        input.value = 99;
    }
}

function obtenerNumero(tipo) {
    const check = document.getElementById(`sin-dorsal-${tipo}`);
    const input = document.getElementById(`num-${tipo}`);
    if (check.checked || !input.value) {
        return "Sin dorsal";
    } else {
        limitarNumero(input);
        return input.value;
    }
}

function agregarAlCarrito(nombre, precio, numeroCamiseta, talla) {
    carrito.push({ nombre, precio, numeroCamiseta, talla });
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const contador = document.getElementById("contador-carrito");
    const totalTexto = document.getElementById("total");
    const botonContinuar = document.getElementById("continuar-pedido");

    lista.innerHTML = "";
    total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - Talla: ${item.talla} - ${item.numeroCamiseta} - ${item.precio.toFixed(2)} €`;
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.onclick = () => eliminarDelCarrito(index);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });

    contador.textContent = carrito.length;
    totalTexto.textContent = `Total: ${total.toFixed(2)} €`;
    botonContinuar.style.display = carrito.length > 0 ? "inline-block" : "none";
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function irAPedido() {
    if(carrito.length === 0){
        alert("Agrega productos antes de continuar.");
        return;
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    window.location.href = "pedido.html";
}

// Aplicar la limitación de números a todos los inputs al cargar
document.querySelectorAll('.num-input').forEach(input => {
    input.addEventListener('input', () => limitarNumero(input));
});
