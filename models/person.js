const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Person = sequelize.define("Person", {
    user_id: DataTypes.INTEGER,
    profile_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
}, {
    tableName: "person" // ชื่อตรงกับ migration
});

module.exports = Person;