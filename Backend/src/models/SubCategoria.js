const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define(
    "SubCategoria",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};