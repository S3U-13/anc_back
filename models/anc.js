const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Anc = sequelize.define("Anc", {
    anc_no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hn_wife: DataTypes.INTEGER,
    hn_husband: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: "Anc",
    tableName: "anc", // ต้องตรงกับชื่อ table จริง
}
);

module.exports = Anc;