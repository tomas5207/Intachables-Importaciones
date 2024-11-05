const {DataTypes} = require('sequelize');

module.exports = (dataBase) => {
    dataBase.define('Producto', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        imagen: {
            type: DataTypes.STRING
        },
        descripción: {
            type: DataTypes.TEXT
        },
        codigo: {
            type: DataTypes.STRING
        },
        precio: {
            type: DataTypes.INTEGER
        },
        stock:{
            type: DataTypes.INTEGER
        },
        favorito:{
            type: DataTypes.BOOLEAN
        }
    }, {
        timestamps: false
    }); 
};