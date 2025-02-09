const { Router } = require('express');
const { pagoEfectivo } = require('../controllers/pagoEfectivo'); // Controlador para el pago en efectivo
const { pagoMercadoPago } = require('../controllers/pagoMercadoPago');
const { sendMercadoPagoEmail } = require('../controllers/sendMercadoPagoEmail'); // Controlador para el pago con Mercado Pago
const router = Router();

// Endpoint para el pago en efectivo
router.post('/efectivo', pagoEfectivo);

// Endpoint para el pago con Mercado Pago
router.post('/mercado', pagoMercadoPago);

router.post('/email', sendMercadoPagoEmail);

module.exports = router;

