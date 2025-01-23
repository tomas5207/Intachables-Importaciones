const nodemailer = require("nodemailer");

const sendMercadoPagoEmail = async (req, res) => {
  const { items, nombreCliente, direccionCliente, telefonoCliente, dia } =
    req.body;

  try {
    // Crear el contenido del correo
    const productosHTML = items
      .map(
        (item) => `
      <li>
        <strong>${item.nombre}</strong> - Cantidad: ${item.quantity} - Precio por unidad: $${item.precio}
      </li>
    `
      )
      .join("");

    const mensajeHTML = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #4CAF50;">Nueva compra realizada con MercadoPago</h2>
        <p style="font-size: 16px;">Nombre del cliente: <strong>${nombreCliente}</strong></p>
        <p style="font-size: 16px;">Dirección del cliente: <strong>${direccionCliente}</strong></p>
        <p style="font-size: 16px;">Teléfono del cliente: <strong>${telefonoCliente}</strong></p>
        <p style="font-size: 16px;">Día disponible para recibir el pedido: <strong>${dia}</strong></p>
        <h3 style="color: #4CAF50;">Productos comprados:</h3>
        <ul style="font-size: 16px; line-height: 1.6;">
          ${productosHTML}
        </ul>
        <p style="font-size: 16px; color: #000;">
          <strong>Nota:</strong> Por favor, revise su cuenta de MercadoPago para confirmar que la transacción se haya hecho con exito.
        </p>
        <footer style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 14px; color: #777;">
          <p>Este es un mensaje automático generado por el sistema de pagos.</p>
          <p>Por favor, no responda a este correo.</p>
        </footer>
      </div>
    `;

    // Configurar Nodemailer
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "intachablesimportaciones@gmail.com",
        pass: "emvouodkhkpilkti",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Enviar el correo
    await transporter.sendMail({
      from: "petpalacepf@gmail.com",
      to: "jorcintomas@gmail.com",
      subject: "Nueva compra con MercadoPago",
      html: mensajeHTML,
    });

    res.status(200).send("Correo enviado exitosamente");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).send("Error al procesar la compra");
  }
};

module.exports = { sendMercadoPagoEmail };
