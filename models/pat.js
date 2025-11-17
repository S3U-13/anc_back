const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/pat_connect_db");

const Pat = sequelize.define(
  "Pat",
  {
    hn: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prename: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    sex: DataTypes.INTEGER,
    birthdatetime: DataTypes.DATE,
    citizencardno: DataTypes.STRING,
    occupation: DataTypes.INTEGER,
    race: DataTypes.INTEGER,
    citizenship: DataTypes.INTEGER,
  },
  {
    tableName: "pat",
    timestamps: false,
  }
);

module.exports = Pat;
