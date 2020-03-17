const sequelize = require("./../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define('reports',{
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    description:{
        type: Sequelize.STRING
    },
    longitude:{
        type: Sequelize.DECIMAL
    },
    latitude:{
        type: Sequelize.DECIMAL
    },
    userID:{
        type: Sequelize.INTEGER
    },
    morada:{
        type: Sequelize.STRING
    },
    img:{
        type:Sequelize.STRING
    }
},{
    timestamps: false
});