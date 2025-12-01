const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LabHusbandResult = sequelize.define(
  "LabHusbandResult",
  {
    hbsag_husband: DataTypes.INTEGER,
    vdrl_husband: DataTypes.INTEGER,
    ppr_husband: DataTypes.STRING,
    tpha_husband: DataTypes.STRING,
    treatment_detail_husband: DataTypes.STRING,
    treatment_date_1_husband: DataTypes.DATE,
    treatment_date_2_husband: DataTypes.DATE,
    treatment_date_3_husband: DataTypes.DATE,
    anti_hiv_husband: DataTypes.INTEGER,
    bl_gr_husband: DataTypes.INTEGER,
    rh_husband: DataTypes.INTEGER,
    hct_husband: DataTypes.STRING,
    of_husband: DataTypes.INTEGER,
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
