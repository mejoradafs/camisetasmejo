// Recuperar carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const resumen = document.getElementById('resumen-pedido');
const form = document.getElementById('formulario-pedido');
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
    total += Number(item.precio);
  });

  const totalP = document.createElement('p');
  totalP.classList.add("total-pedido");
  totalP.innerHTML = `<strong>Total a pagar: ${total.toFixed(2)} €</strong>`;
  resumen.appendChild(totalP);
}

// Guardar detalle del pedido en input oculto
document.getElementById('pedido_detalle').value = carrito.map(item => {
  return `${item.nombre} - Talla: ${item.talla || "-"} - Dorsal: ${item.numeroCamiseta || "-"} - ${item.precio.toFixed(2)} €`;
}).join('\n') + `\n\nTotal: ${total.toFixed(2)} €`;

// Servicios de envío: todos apuntando a camismejo@proton.me
const servicios = [
  { url: "https://formsubmit.co/ajax/camismejo@proton.me" },   // FormSubmit
  { url: "https://formspree.io/f/camismejo@proton.me" },       // Formspree
  { url: "https://getform.io/f/camismejo@proton.me" }          // Getform
];

// Enviar formulario con redundancia
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  let enviado = false;

  for (let servicio of servicios) {
    try {
      const res = await fetch(servicio.url, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        enviado = true;
        localStorage.removeItem('carrito'); // Vaciar carrito
        window.location.href = "gracias.html"; // Redirigir a página de gracias
        break;
      }
    } catch (err) {
      console.warn("Error enviando a", servicio.url, err);
      // Si falla, pasa al siguiente servicio
    }
  }

  if (!enviado) {
    alert("Ocurrió un error al enviar el pedido. Por favor, inténtalo de nuevo más tarde.");
  }
});
