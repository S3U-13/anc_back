const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LabWifeResult = sequelize.define(
  "LabWifeResult",
  {
    gct_1_wife: DataTypes.STRING,
    gct_2_wife: DataTypes.STRING,
    ogtt_1_wife: DataTypes.STRING,
    ogtt_2_wife: DataTypes.STRING,
    hbsag_wife: DataTypes.STRING,
    vdrl_wife: DataTypes.STRING,
    anti_hiv_wife: DataTypes.STRING,
    bl_gr_wife: DataTypes.STRING,
    rh_wife: DataTypes.STRING,
    hct_wife: DataTypes.STRING,
    of_wife: DataTypes.STRING,
    dcip_wife: DataTypes.STRING,
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
