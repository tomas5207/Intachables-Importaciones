const express = require('express');
const routerStock = express.Router();
const { putStock } = require('../controllers/Producto/putStock');
const { putSingleStock } = require('../controllers/Producto/putSingleStock');

// Ruta para actualizar el stock de múltiples productos
routerStock.put('/', putStock);

// Ruta para actualizar el stock de un único producto por ID
routerStock.put('/:id', putSingleStock);

module.exports = routerStock;
