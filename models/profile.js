const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Profile = sequelize.define("Profile", {
    name: DataTypes.STRING,
}, {
    tableName: "profile" // ชื่อตรงกับ migration
});

module.exports = Profile;