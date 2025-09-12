const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = sequelize.define("Role", {
    role_name: DataTypes.STRING,
}, {
    tableName: "role" // ชื่อตรงกับ migration
});

module.exports = Role;