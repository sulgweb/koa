const Sequelize = require('sequelize');
const sequelize = new Sequelize('movie','root','',{
    host:'localhost',
    dialect:'mysql'
})
module.exports={sequelize}