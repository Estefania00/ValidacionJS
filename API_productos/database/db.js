const { Sequelize } = require('sequelize');
const { database } = require('../config');

//para la conexion con bd
const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        //para el dialec instalamos mysql2
        dialect: "mysql"
    }
);

module.exports = sequelize;