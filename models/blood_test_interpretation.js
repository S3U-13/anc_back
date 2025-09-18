const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BloodTestInterpretation = sequelize.define("BloodTestInterpretation", {
    bti_value_1_id: DataTypes.INTEGER,
    bti_value_2_id: DataTypes.INTEGER,
    bti_value_3_id: DataTypes.INTEGER,
    bti_value_4_id: DataTypes.INTEGER,
    bti_value_5_id: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: "BloodTestInterpretation",
    tableName: "blood_test_interpretation", // ต้องตรงกับชื่อ table จริง
}
);

module.exports = BloodTestInterpretation;