const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RefInChoice = sequelize.define(
  "RefInChoice",
  {
    receive_id: DataTypes.INTEGER,
    hos_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "RefInChoice",
    tableName: "ref_in_choice",
  }
);
module.exports = RefInChoice;