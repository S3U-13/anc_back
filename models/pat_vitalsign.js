const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/pat_connect_db");

const PatVitalSign = sequelize.define(
  "PatVitalSign",
  {
    hn: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2), // เช่น 70.55
      allowNull: true,
    },
    height: {
      type: DataTypes.DECIMAL(5, 2), // เช่น 175.30
      allowNull: true,
    },
    bp_systolic: {
      type: DataTypes.INTEGER, // ความดันบน
      allowNull: true,
    },
    bp_diastolic: {
      type: DataTypes.INTEGER, // ความดันล่าง
      allowNull: true,
    },
    temperature: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    pulse: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "pat_vitalsign",
    timestamps: false,
  }
);

module.exports = PatVitalSign;
