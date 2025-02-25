const { MercadoPagoConfig, Preference } = require('mercadopago');

// Step 1: Inicializa el cliente de Mercado Pago
const mercadoPago = new MercadoPagoConfig({
  accessToken: 'APP_USR-3806456479453687-012214-590b39b9a5c8b4752d907c155ec33d8c-24338386',
  sandbox: true // Reemplaza con tu token real
});

// Step 2: Crear una instancia de la clase Preference
const preferenceInstance = new Preference(mercadoPago);

// Controlador para el pago con Mercado Pago
const pagoMercadoPago = async (req, res) => {
  const { ArrayItems } = req.body; // Asegúrate de que los datos lleguen correctamente

  try {
    // Step 3: Crear la preferencia
    const preferenceData = { // Establece el propósito de la preferencia
      items: ArrayItems.map(item => {
        // Calcula la primera comisión (5.99%) y su IVA (21%)
        const commission1 = item.precio * 0.0599;
        const iva1 = commission1 * 0.22;

        // Calcula la segunda comisión (2.49%) y su IVA (21%)
        const commission2 = item.precio * 0.0249;
        const iva2 = commission2 * 0.22;

        // Precio ajustado final sumando el precio base, ambas comisiones y sus IVA
        const adjustedPrice = item.precio + commission1 + iva1 + commission2 + iva2;

        return {
          id: item.id,
          title: item.nombre,
          quantity: item.quantity,
          unit_price: adjustedPrice,
        };
      }),
      back_urls: {
        success: "https://intachables-importaciones.vercel.app/paymentSuccess",
        failure: "https://intachables-importaciones.vercel.app",
        pending: "https://intachables-importaciones.vercel.app",
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
