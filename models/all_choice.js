const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AllChoice = sequelize.define("AllChoice", {
    choice_type_id: DataTypes.INTEGER,
    choice_name: DataTypes.INTEGER,
},  {
    sequelize,
    modelName: "AllChoice",
    tableName: "all_choice", // ต้องตรงกับชื่อ table จริง
  }
);

module.exports = AllChoice;