const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/pat_connect_db");

const PatAddress = sequelize.define("PatAddress", {
    hn: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    house: DataTypes.STRING,
    moo: DataTypes.STRING,
    soy: DataTypes.STRING,
    road: DataTypes.STRING,
    tambon: DataTypes.STRING,
    amphur: DataTypes.STRING,
    province: DataTypes.STRING,
    phone:DataTypes.STRING,
    email:DataTypes.STRING,
}, {
    tableName: "pat_address",
    timestamps: false
});

module.exports = PatAddress;