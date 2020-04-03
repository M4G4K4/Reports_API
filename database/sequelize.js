const Sequelize = require('sequelize');

module.exports = new Sequelize('Comp', 'pedrodev', 'cybersecurity', {
    host: '206.189.21.250',
    dialect: 'mysql'
});