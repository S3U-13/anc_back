const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AllChoiceType = sequelize.define("AllChoiceType", {
    choice_type_name: DataTypes.STRING,
},  {
    sequelize,
    modelName: "AllChoiceType",
    tableName: "all_choice_type", // ต้องตรงกับชื่อ table จริง
  }
);

module.exports = AllChoiceType;