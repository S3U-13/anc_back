const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    position_id: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user", // ต้องตรงกับชื่อ table จริง
  }
);

module.exports = User;
