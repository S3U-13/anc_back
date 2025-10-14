const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const TextValueHusband = sequelize.define(
  "TextValueHusband",
  {
    lab_husband_result_id: DataTypes.INTEGER,
    pcr_hus_id: DataTypes.INTEGER,
    pcr_hus_text: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "TextValueHusband",
    tableName: "husband_value", // ต้องตรงกับชื่อ table จริง
  }
);

module.exports = TextValueHusband;
