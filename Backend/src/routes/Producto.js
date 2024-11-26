const express = require('express');
const routerProducto = express.Router();
const {getProductos} = require('../controllers/Producto/getProductos');
const {getProductoById} = require('../controllers/Producto/getProductoById');
const {postProducto} = require('../controllers/Producto/postProducto');
const {putProducto} = require('../controllers/Producto/putProducto');
const {deleteProducto} = require('../controllers/Producto/deleteProducto');


routerProducto.get('/', getProductos);
routerProducto.get('/:id', getProductoById);


routerProducto.post('/', postProducto);

routerProducto.put('/:id', putProducto);

routerProducto.delete('/:id', deleteProducto);

module.exports = routerProducto;