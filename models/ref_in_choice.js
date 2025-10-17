const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RefInChoice = sequelize.define(
  "RefInChoice",
  {
    receive_in_id: DataTypes.INTEGER,
    hos_in_id: DataTypes.INTEGER,
    receive_in_detail: DataTypes.STRING
  },
  {
    sequelize,
    modelName: "RefInChoice",
    tableName: "ref_in_choice",
  }
);
module.exports = RefInChoice;
