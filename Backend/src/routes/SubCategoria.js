const express = require('express');
const routerSubCategoria = express.Router();
const {getSubCategorias} = require('../controllers/SubCategoria/getSubCategorias');
const {getSubCategoriaById} = require('../controllers/SubCategoria/getSubCategoriaById');
const {postSubCategoria} = require('../controllers/SubCategoria/postSubCategoria');
const {putSubCategoria} = require('../controllers/SubCategoria/putSubCategoria');
const {deleteSubCategoria} = require('../controllers/SubCategoria/deleteSubCategoria');




routerSubCategoria.get('/', getSubCategorias);


routerSubCategoria.get('/:id', getSubCategoriaById);


routerSubCategoria.post('/', postSubCategoria);


routerSubCategoria.put('/:id', putSubCategoria);


routerSubCategoria.delete('/:id', deleteSubCategoria);



module.exports = routerSubCategoria;