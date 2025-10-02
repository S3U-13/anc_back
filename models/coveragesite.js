const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/pat_connect_db");

const CoverageSite = sequelize.define(
  "CoverageSite",
  {
    siteid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sitedesc: DataTypes.STRING,
    provcode: DataTypes.STRING,
    provdesc: DataTypes.STRING,
    // typecode: DataTypes.STRING,
  },
  {
    tableName: "coveragesite",
    timestamps: false,
  }
);

module.exports = CoverageSite;
