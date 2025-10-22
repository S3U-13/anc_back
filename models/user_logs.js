const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserLog = sequelize.define(
  "UserLog", // ชื่อ model แนะนำใช้เอกพจน์
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
    modelName: "UserLog",
    tableName: "user_logs", // ต้องตรงกับชื่อ table จริง
    timestamps: true, // เปิด timestamp
    createdAt: "createdAt", // ให้ Sequelize ใส่ createdAt
    updatedAt: false, // ปิด updatedAt
  }
);

module.exports = UserLog;
