const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserLogs = sequelize.define(
  "UserLogs",
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    entity: { type: DataTypes.STRING },
    entity_id: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT },
    ip_address: { type: DataTypes.STRING },
    user_agent: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "UserLogs",
    tableName: "user_logs", // ต้องตรงกับชื่อ table จริง
    timestamps: true,
  }
);

module.exports = UserLogs;
