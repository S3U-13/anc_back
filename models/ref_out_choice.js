const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RefOutChoice = sequelize.define(
  "RefOutChoice",
  {
    receive_out_id: DataTypes.INTEGER,
    hos_out_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "RefOutChoice",
    tableName: "ref_out_choice",
  }
);
module.exports = RefOutChoice;
