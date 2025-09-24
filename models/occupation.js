const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/pat_connect_db");

const Occupation = sequelize.define("Occupation", {
    lookupid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    lookupname: DataTypes.STRING,
}, {
    tableName: "lookup",
    timestamps: false
});

module.exports = Occupation;