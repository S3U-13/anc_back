const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/pat_connect_db");

const Lookup = sequelize.define(
  "Lookup",
  {
    lookuptypeid: DataTypes.INTEGER,
    lookupid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lookupname: DataTypes.STRING,
  },
  {
    tableName: "lookup",
    timestamps: false,
  }
);

module.exports = Lookup;
