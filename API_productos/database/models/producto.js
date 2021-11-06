const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class producto extends Model {}
producto.init({
    
   idProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombreProd: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
     modeloProd: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
     precioProd: {
        type: DataTypes.FLOAT,
    }
}, {
    sequelize,
    modelName: "producto",
    timestamps: false,
    freezeTableName: true
});

module.exports = producto;