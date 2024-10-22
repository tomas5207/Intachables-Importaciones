const {Router} = require('express');
const router = Router();
const routerProducto = require('./Producto');
const routerUser = require('./User');
const routerPago = require('./pago');


router.use('/producto', routerProducto);
router.use('/user', routerUser);
router.use('/pago', routerPago);

module.exports = router;