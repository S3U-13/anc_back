const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/pat_connect_db");

const Location = sequelize.define(
  "Location",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    detailtext: DataTypes.STRING,
  },
  {
    tableName: "location",
    timestamps: false,
  }
);

module.exports = Location;
