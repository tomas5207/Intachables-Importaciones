const express = require('express');
const routerFavorito = express.Router();
const {putFavorito} = require('../controllers/Producto/putFavorito');


routerFavorito.put('/:id', putFavorito);


module.exports = routerFavorito;