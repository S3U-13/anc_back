const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AncLog = sequelize.define(
  "AncLog",
  {
    anc_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hn_wife: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hn_husband: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updated_by: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "AncLog",
    tableName: "anc_log", // ต้องตรงกับชื่อ table จริง
  }
);

module.exports = AncLog;
