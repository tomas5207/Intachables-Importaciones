const { MercadoPagoConfig, Preference } = require('mercadopago');

// Step 1: Inicializa el cliente de Mercado Pago
const mercadoPago = new MercadoPagoConfig({
  accessToken: 'APP_USR-1486276486951821-101716-ebcc01234e577e8e150135e8d7496d20-2041072983',
  sandbox: true // Reemplaza con tu token real
});

// Step 2: Crear una instancia de la clase Preference
const preferenceInstance = new Preference(mercadoPago);

// Controlador para el pago con Mercado Pago
const pagoMercadoPago = async (req, res) => {
  const { ArrayItems } = req.body; // Asegúrate de que los datos lleguen correctamente

  try {
    // Step 3: Crear la preferencia
    const preferenceData = {
      purpose: "wallet_purchase", // Establece el propósito de la preferencia
      items: ArrayItems.map(item => ({
        id: item.id,
        title: item.nombre,
        quantity: item.quantity,
        unit_price: item.precio,
      })),
      back_urls: {
        success: "http://localhost:5173/home",
        failure: "http://localhost:5173/home",
        pending: "http://localhost:5173/home",
      },
      auto_return: "approved"
    };

    // Step 4: Crear la preferencia con Preference.create
    const preferenceResponse = await preferenceInstance.create({ body: preferenceData });

    // Step 5: Retornar solo el ID de la preferencia
    res.status(200).json({ preferenceId: preferenceResponse.id });
  } catch (error) {
    console.error('Error al crear la preferencia con Mercado Pago:', error);
    res.status(500).json({ error: 'Error al procesar el pago con Mercado Pago' });
  }
};

module.exports = { pagoMercadoPago };
