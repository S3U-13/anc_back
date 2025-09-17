const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Cbe = sequelize.define("cbe", {
    value_1_id: DataTypes.INTEGER,
    value_2_id: DataTypes.INTEGER,
    value_3_id: DataTypes.INTEGER,
    value_4_id: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: "Cbe",
    tableName: "cbe", // ต้องตรงกับชื่อ table จริง
}
);

module.exports = Cbe;