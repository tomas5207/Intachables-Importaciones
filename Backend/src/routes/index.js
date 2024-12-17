const {Router} = require('express');
const router = Router();
const routerProducto = require('./Producto');
const routerUser = require('./User');
const routerPago = require('./pago');
const routerCategoria = require('./Categoria');
const routerSubCategoria = require('./SubCategoria');
const routerFavorito = require('./Favorito');


router.use('/producto', routerProducto);
router.use('/user', routerUser);
router.use('/pago', routerPago);
router.use('/categoria', routerCategoria);
router.use('/subcategoria', routerSubCategoria);
router.use('/favorito', routerFavorito);

module.exports = router;