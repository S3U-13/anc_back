const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const TextValueHusband = sequelize.define("TextValueHusband", {
    husband_name: { type: DataTypes.STRING, allowNull: false },
    husband_age: { type: DataTypes.INTEGER, allowNull: false },
    husband_id_card: { type: DataTypes.STRING(13), allowNull: false },
    husband_hn: { type: DataTypes.INTEGER, allowNull: false },
    husband_tel: { type: DataTypes.STRING(10), allowNull: false },
    husband_job: { type: DataTypes.STRING, allowNull: false },
    hbsag_husband: { type: DataTypes.STRING, allowNull: false },
    vdrl_husband: { type: DataTypes.STRING, allowNull: false },
    anti_hiv_husband: { type: DataTypes.STRING, allowNull: false },
    bl_gr_husband: { type: DataTypes.STRING, allowNull: false },
    rh_husband: { type: DataTypes.STRING, allowNull: false },
    hct_husband: { type: DataTypes.STRING, allowNull: false },
    of_husband: { type: DataTypes.STRING, allowNull: false },
    dcip_husband: { type: DataTypes.STRING, allowNull: false },
    mcv_husband: { type: DataTypes.STRING, allowNull: false },
    mch_husband: { type: DataTypes.STRING, allowNull: false },
    hb_typing_husband: { type: DataTypes.STRING, allowNull: false },
    pcr_hus_husband: { type: DataTypes.STRING, allowNull: false },
},
    {
        sequelize,
        modelName: "TextValueHusband",
        tableName: "text_value_husband", // ต้องตรงกับชื่อ table จริง
    }
);

module.exports = TextValueHusband;