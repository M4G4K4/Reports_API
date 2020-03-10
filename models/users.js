const sequelize = require("./../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define('users',{
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
    name:{
        type: Sequelize.STRING
    }

},{
    timestamps: false
});