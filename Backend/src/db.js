require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, HOST, PORT, DB_NAME, DATABASE_URL } = process.env;
const Product_Model = require('./models/Producto');
const User_Model = require('./models/User');
const Category_Model = require('./models/Categoria');
const SubCategory_Model = require('./models/SubCategoria');

//`postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${PORT}/${DB_NAME}`

const database = new Sequelize(DATABASE_URL, {
    logging: false,
    native: false,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Railway utiliza SSL para conexiones seguras
            rejectUnauthorized: false, // Evita problemas con certificados no autorizados
        },
    },
});

Product_Model(database);
User_Model(database);
Category_Model(database);
SubCategory_Model(database);

const { Producto, User, Categoria, SubCategoria } = database.models;

Categoria.hasMany(Producto, { foreignKey: 'CategoriaId' });
Producto.belongsTo(Categoria, { foreignKey: 'CategoriaId' });

SubCategoria.hasMany(Producto, { foreignKey: 'SubCategoriaId' });
Producto.belongsTo(SubCategoria, { foreignKey: 'SubCategoriaId' });

SubCategoria.belongsToMany(Categoria, { through: 'CategoriaSubCategoria' });
Categoria.belongsToMany(SubCategoria, { through: 'CategoriaSubCategoria' });


module.exports = { database, 
    ...database.models,
};