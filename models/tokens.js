const sequelize = require("./../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define('tokens',{
    token: {
        type: Sequelize.STRING,
        primaryKey: true
    }
},{
    timestamps: false
});