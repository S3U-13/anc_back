const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const WifeChoiceValue = sequelize.define("WifeChoiceValue", {
  ma_id: DataTypes.INTEGER,
  hr_id: DataTypes.INTEGER,
  am_id: DataTypes.INTEGER,
  pcr_wife_id: DataTypes.INTEGER,
  cordo_id: DataTypes.INTEGER,
  abortion_id: DataTypes.INTEGER,
  tdap_id: DataTypes.INTEGER,
  iip_id: DataTypes.INTEGER,
  bti_id: DataTypes.INTEGER,
  cbe_id: DataTypes.INTEGER,
  birads_id: DataTypes.INTEGER,
  per_os_id: DataTypes.INTEGER,
  referral_id: DataTypes.INTEGER,
  ref_in_choice_id: DataTypes.INTEGER,
  ref_out_choice_id: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: "WifeChoiceValue",
  tableName: "wife_choice_value", // ต้องตรงกับชื่อ table จริง
}
);

module.exports = WifeChoiceValue;