const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LabWifeResult = sequelize.define(
  "LabWifeResult",
  {
    gct_1_wife: DataTypes.STRING,
    gct_2_wife: DataTypes.STRING,
    ogtt_1_wife: DataTypes.STRING,
    ogtt_2_wife: DataTypes.STRING,
    hbsag_wife: DataTypes.INTEGER,
    vdrl_wife: DataTypes.INTEGER,
    ppr_wife: DataTypes.STRING,
    tpha_wife: DataTypes.STRING,
    anti_hiv_wife: DataTypes.INTEGER,
    bl_gr_wife: DataTypes.INTEGER,
    rh_wife: DataTypes.INTEGER,
    hct_wife: DataTypes.STRING,
    of_wife: DataTypes.STRING,
    dcip_wife: DataTypes.INTEGER,
    mcv_wife: DataTypes.STRING,
    mch_wife: DataTypes.STRING,
    hb_typing_wife: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "LabWifeResult",
    tableName: "lab_wife_result",
  }
);
module.exports = LabWifeResult;
