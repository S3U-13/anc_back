const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/pat_connect_db");

const Address = sequelize.define("Address", {
    addresscode: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    detailtext: DataTypes.STRING,
   
}, {
    tableName: "addressname",
    timestamps: false
});

module.exports = Address;