const express = require('express');
const routerCategoria = express.Router();
const {getCategorias} = require('../controllers/Categoria/getCategorias');
const {getCategoriaById} = require('../controllers/Categoria/getCategoriaById');
const {postCategoria} = require('../controllers/Categoria/postCategoria');
const {putCategoria} = require('../controllers/Categoria/putCategoria');
const {deleteCategoria} = require('../controllers/Categoria/deleteCategoria');



routerCategoria.get('/', getCategorias);
routerCategoria.get('/:id', getCategoriaById);


routerCategoria.post('/', postCategoria);

routerCategoria.put('/:id', putCategoria);

routerCategoria.delete('/:id', deleteCategoria);




module.exports = routerCategoria;