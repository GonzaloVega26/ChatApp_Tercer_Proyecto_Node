const mysql = require("mysql2");
const ENV_VARS = require(".");

const { Sequelize } = require('sequelize');



const sequelize = new Sequelize(ENV_VARS.dbName, ENV_VARS.dbUser, ENV_VARS.dbPassword, {
    host: ENV_VARS.dbHost,
    dialect: 'mysql'
  });
  
  
  module.exports = sequelize
 
