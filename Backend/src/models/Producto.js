const { DataTypes } = require('sequelize');

module.exports = (dataBase) => {
    dataBase.define('Producto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        imagen: {
            type: DataTypes.ARRAY(DataTypes.TEXT) 
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
        descuento: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        porcentaje_descuento: {
            type: DataTypes.INTEGER,  
            allowNull: true
        },
        favorito: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false
    });
};
