const sequelize = require("./../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define('tokens',{
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    token: {
        type: Sequelize.STRING
    }
},{
    timestamps: false
});