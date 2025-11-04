
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const resumen = document.getElementById('resumen-pedido');
let total = 0;

if (carrito.length === 0) {
    resumen.innerHTML = "<p>No hay productos en el carrito.</p>";
} else {
    resumen.innerHTML = "<h3>Tus camisetas seleccionadas:</h3>";
    carrito.forEach(item => {
        const div = document.createElement('div');
        div.classList.add("item-pedido");
        div.innerHTML = `
            <p><strong>${item.nombre}</strong></p>
            <p>Talla: ${item.talla}</p>
            <p>Dorsal: ${item.numeroCamiseta}</p>
            <p>Precio: ${item.precio.toFixed(2)} €</p>
        `;
        resumen.appendChild(div);
        total += item.precio;
    });

    const totalP = document.createElement('p');
    totalP.classList.add("total-pedido");
    totalP.innerHTML = `<strong>Total a pagar: ${total.toFixed(2)} €</strong>`;
    resumen.appendChild(totalP);
}

document.getElementById('pedido_detalle').value = carrito.map(item => {
    return `${item.nombre} - Talla ${item.talla} - ${item.numeroCamiseta} - ${item.precio.toFixed(2)} €`;
}).join('\n') + `\n\nTotal: ${total.toFixed(2)} €`;

document.getElementById('formulario-pedido').addEventListener('submit', () => {
    localStorage.removeItem('carrito');
});
