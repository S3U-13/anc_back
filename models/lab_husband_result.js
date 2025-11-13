const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LabHusbandResult = sequelize.define(
  "LabHusbandResult",
  {
    hbsag_husband: DataTypes.INTEGER,
    vdrl_husband: DataTypes.INTEGER,
    ppr_husband: DataTypes.STRING,
    tpha_husband: DataTypes.STRING,
    anti_hiv_husband: DataTypes.INTEGER,
    bl_gr_husband: DataTypes.INTEGER,
    rh_husband: DataTypes.INTEGER,
    hct_husband: DataTypes.STRING,
    of_husband: DataTypes.STRING,
    dcip_husband: DataTypes.INTEGER,
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
