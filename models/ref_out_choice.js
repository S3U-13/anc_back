const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RefOutChoice = sequelize.define(
  "RefOutChoice",
  {
    receive_out_id: DataTypes.INTEGER,
    ref_out_detail: DataTypes.STRING,
    hos_out_id: DataTypes.INTEGER,
    receive_out_detail: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "RefOutChoice",
    tableName: "ref_out_choice",
  }
);
module.exports = RefOutChoice;
