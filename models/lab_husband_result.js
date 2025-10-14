const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LabHusbandResult = sequelize.define(
  "LabHusbandResult",
  {
    hbsag_husband: DataTypes.STRING,
    vdrl_husband: DataTypes.STRING,
    anti_hiv_husband: DataTypes.STRING,
    bl_gr_husband: DataTypes.STRING,
    rh_husband: DataTypes.STRING,
    hct_husband: DataTypes.STRING,
    of_husband: DataTypes.STRING,
    dcip_husband: DataTypes.STRING,
    mcv_husband: DataTypes.STRING,
    mch_husband: DataTypes.STRING,
    hb_typing_husband: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "LabHusbandResult",
    tableName: "lab_husband_result",
  }
);
module.exports = LabHusbandResult;
