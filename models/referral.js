const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Referral = sequelize.define("Referral", {
    value_1_id: DataTypes.INTEGER,
    value_2_id: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: "Referral",
    tableName: "referral", // ต้องตรงกับชื่อ table จริง
}
);

module.exports = Referral;