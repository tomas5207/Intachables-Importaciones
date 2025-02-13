require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, HOST, PORT, DB_NAME} = process.env;
const Product_Model = require('./models/Producto');
const User_Model = require('./models/User');
const Category_Model = require('./models/Categoria');
const SubCategory_Model = require('./models/SubCategoria');

// Conexión a la base de datos
const database = new Sequelize("postgresql://postgres:WlTEMQNauUgMqutzxnmHcuubkMvRhTfT@autorack.proxy.rlwy.net:28353/railway", {
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

// Definir los modelos
Product_Model(database);
User_Model(database);
Category_Model(database);
SubCategory_Model(database);

const { Producto, User, Categoria, SubCategoria } = database.models;

// Relacionar los modelos (muchos a muchos)
Producto.belongsToMany(Categoria, { through: 'ProductoCategoria', foreignKey: 'ProductoId' });
Categoria.belongsToMany(Producto, { through: 'ProductoCategoria', foreignKey: 'CategoriaId' });

Producto.belongsToMany(SubCategoria, { through: 'ProductoSubCategoria', foreignKey: 'ProductoId' });
SubCategoria.belongsToMany(Producto, { through: 'ProductoSubCategoria', foreignKey: 'SubCategoriaId' });

SubCategoria.belongsToMany(Categoria, { through: 'CategoriaSubCategoria' });
Categoria.belongsToMany(SubCategoria, { through: 'CategoriaSubCategoria' });

// Exportar la base de datos y modelos
module.exports = { 
    database, 
    ...database.models 
};
