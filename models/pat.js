const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/pat_connect_db");

const Pat = sequelize.define("Pat", {
    hn: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    prename: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birthdatetime: DataTypes.DATE,
    citizencardno: DataTypes.STRING,
    occupation: DataTypes.INTEGER,
}, {
    tableName: "pat",
    timestamps: false
});

module.exports = Pat;