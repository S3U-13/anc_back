const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/pat_connect_db");

const PatVisit = sequelize.define(
  "PatVisit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hn: DataTypes.INTEGER,
    visitdatetime: DataTypes.DATE,
  },
  {
    tableName: "pat_visit",
    timestamps: false,
  }
);

module.exports = PatVisit;
