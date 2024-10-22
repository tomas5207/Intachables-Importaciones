const express = require('express');
const routerUser = express.Router();
const {getUser} = require('../controllers/User/getUser');
const {getUserById} = require('../controllers/User/getUserById');

routerUser.get('/', getUser);
routerUser.get('/:id', getUserById);

module.exports = routerUser;