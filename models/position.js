const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Position = sequelize.define(
  "Position",
  {
    position_name: DataTypes.STRING,
    flag_status: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Position",
    tableName: "position", // ต้องตรงกับชื่อ table จริง
  }
);

module.exports = Position;
