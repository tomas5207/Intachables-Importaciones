const express = require('express');
const routerCategoria = express.Router();
const {getCategorias} = require('../controllers/Categoria/getCategorias');
const {getCategoriaById} = require('../controllers/Categoria/getCategoriaById');



routerCategoria.get('/', getCategorias);
routerCategoria.get('/:id', getCategoriaById);


module.exports = routerCategoria;