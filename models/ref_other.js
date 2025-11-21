const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const RefOther = sequelize.define(
  "RefOther",
  {
    ref_other_detail: DataTypes.STRING,
  },
  {
    modelName: "RefOther",
    tableName: "ref_other",
  }
);

module.exports = RefOther;
