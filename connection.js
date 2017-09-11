var Sequelize = require('sequelize');
var connection = new Sequelize('expicker_api','root','password',{
  host:'localhost',
  dialect:'mysql'
})

module.exports = connection;