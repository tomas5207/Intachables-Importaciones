const express = require('express');
const routerProducto = express.Router();
const {getProductos} = require('../controllers/Producto/getProductos');
const {getProductoById} = require('../controllers/Producto/getProductoById');

routerProducto.get('/', getProductos);
routerProducto.get('/:id', getProductoById);

module.exports = routerProducto;