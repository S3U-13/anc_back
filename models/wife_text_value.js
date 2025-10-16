const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const WifeTextValue = sequelize.define(
  "WifeTextValue",
  {
    para: DataTypes.STRING,
    p: DataTypes.STRING,
    a: DataTypes.STRING,
    last: DataTypes.STRING,
    lmp: DataTypes.DATE,
    edc: DataTypes.DATE,
    ga: DataTypes.STRING,
    ma_detail: DataTypes.STRING,
    hr_detail: DataTypes.STRING,
    lab_wife_result_id: DataTypes.INTEGER,
    pcr_wife_text: DataTypes.STRING,
    cordo_text: DataTypes.STRING,
    cordo_other_text: DataTypes.STRING,
    td_num: DataTypes.INTEGER,
    td_last_date: DataTypes.DATE,
    tdap_round_1: DataTypes.DATE,
    tdap_round_2: DataTypes.DATE,
    tdap_round_3: DataTypes.DATE,
    iip_date: DataTypes.DATE,
    lab_2: DataTypes.DATE,
    vdrl_2: { type: DataTypes.STRING(30), allowNull: false },
    hct: { type: DataTypes.STRING(30), allowNull: false },
    h: { type: DataTypes.STRING(30), allowNull: false },
    bti_1_date: DataTypes.DATE,
    bti_2_date: DataTypes.DATE,
    cbe_result: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "WifeTextValue",
    tableName: "wife_text_value", // ต้องตรงกับชื่อ table จริง
  }
);

module.exports = WifeTextValue;
