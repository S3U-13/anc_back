const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Cbe = sequelize.define(
  "Cbe",
  {
    cbi_value_1_id: DataTypes.INTEGER,
    cbi_value_2_id: DataTypes.INTEGER,
    cbi_value_3_id: DataTypes.INTEGER,
    cbi_value_4_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Cbe",
    tableName: "cbe", // ต้องตรงกับชื่อ table จริง
  }
);

module.exports = Cbe;
