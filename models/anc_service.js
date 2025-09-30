const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AncService = sequelize.define(
  "AncService",
  {
    anc_no: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    patvisit_id: DataTypes.INTEGER,
    patreg_id: DataTypes.INTEGER,
    wife_choice_value_id: DataTypes.INTEGER,
    wife_text_value_id: DataTypes.INTEGER,
    husband_value_id: DataTypes.INTEGER,
    round: DataTypes.STRING,
    create_by_user_id: DataTypes.INTEGER,
    edit_by_user_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "AncService",
    tableName: "anc_service",
  }
);
module.exports = AncService;
