require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, HOST, PORT, DB_NAME } = process.env;
const Product_Model = require('./models/Producto');
const User_Model = require('./models/User');

const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${PORT}/${DB_NAME}`, {
    logging: false, native: false 
});

Product_Model(database);
User_Model(database);

const { Producto, User } = database.models;

database.sync()
    .then(() => console.log('Modelos sincronizados con la base de datos.'))
    .catch(err => console.error('Error al sincronizar modelos:', err));

module.exports = { database, Producto, User };