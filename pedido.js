// Recuperar el carrito guardado
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const resumen = document.getElementById('resumen-pedido');
let total = 0;

// Mostrar resumen del pedido
if (carrito.length === 0) {
  resumen.innerHTML = "<p>No hay productos en el carrito.</p>";
} else {
  resumen.innerHTML = "<h3>Tus productos seleccionados:</h3>";
  carrito.forEach(item => {
    const div = document.createElement('div');
    div.classList.add("item-pedido");
    div.innerHTML = `
      <p><strong>${item.nombre}</strong></p>
      <p>Talla: ${item.talla || "-"}</p>
      <p>Dorsal: ${item.numeroCamiseta || "-"}</p>
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

// Guardar el detalle del pedido para enviarlo por correo
document.getElementById('pedido_detalle').value = carrito.map(item => {
  return `${item.nombre} - Talla: ${item.talla || "-"} - Dorsal: ${item.numeroCamiseta || "-"} - ${item.precio.toFixed(2)} €`;
}).join('\n') + `\n\nTotal: ${total.toFixed(2)} €`;

// Enviar formulario
document.getElementById('formulario-pedido').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    await fetch("https://formsubmit.co/ajax/camismejo@proton.me", {
      method: "POST",
      body: formData
    });

    // Vaciar carrito
    localStorage.removeItem('carrito');

    // Redirigir a página de gracias
    window.location.href = "gracias.html";

  } catch (error) {
    alert("Ocurrió un error al enviar el pedido. Por favor, inténtalo de nuevo.");
    console.error(error);
  }
});
