const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = sequelize.define("Role", {
    role_name: DataTypes.STRING,
},  {
    sequelize,
    modelName: "Role",
    tableName: "role", // ต้องตรงกับชื่อ table จริง
  }
);

module.exports = Role;