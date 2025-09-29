const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/pat_connect_db");

const PatReg = sequelize.define("PatReg", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hn: DataTypes.INTEGER,
    patvisitid: DataTypes.INTEGER,
    locationid: DataTypes.INTEGER,
    visitdate: DataTypes.DATE,
}, {
    tableName: "pat_reg",
    timestamps: false
});

module.exports = PatReg;