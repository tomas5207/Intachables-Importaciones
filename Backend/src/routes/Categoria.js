const express = require('express');
const routerCategoria = express.Router();
const {getCategorias} = require('../controllers/Categoria/getCategorias');



routerCategoria.get('/', getCategorias);


module.exports = routerCategoria;