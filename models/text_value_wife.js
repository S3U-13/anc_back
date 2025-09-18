const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const TextValueWife = sequelize.define("TextValueWife", {
    da_text: DataTypes.STRING,
    hr_text: DataTypes.STRING,
    gct_1: { type: DataTypes.STRING, allowNull: false },
    gct_2: { type: DataTypes.STRING, allowNull: false },
    hbsag: { type: DataTypes.STRING, allowNull: false },
    vdrl_1: { type: DataTypes.STRING, allowNull: false },
    anti_hiv: { type: DataTypes.STRING, allowNull: false },
    bl_gr: { type: DataTypes.STRING, allowNull: false },
    rh: { type: DataTypes.STRING, allowNull: false },
    hct: { type: DataTypes.STRING, allowNull: false },
    of: { type: DataTypes.STRING, allowNull: false },
    dcip: { type: DataTypes.STRING, allowNull: false },
    mcv: { type: DataTypes.STRING, allowNull: false },
    mch: { type: DataTypes.STRING, allowNull: false },
    hb_typing: { type: DataTypes.STRING, allowNull: false },
    pcr_text: DataTypes.STRING,
    cordo_text: DataTypes.STRING,
    cordo_other_text: DataTypes.STRING,
    td_num: DataTypes.INTEGER,
    td_last_date: DataTypes.DATE,
    tdap_round_1: DataTypes.DATE,
    tdap_round_2: DataTypes.DATE,
    tdap_round_3: DataTypes.DATE,
    iip_date: DataTypes.DATE,
    lab_2: { type: DataTypes.STRING, allowNull: false },
    vdrl_2: { type: DataTypes.STRING, allowNull: false },
    h: { type: DataTypes.STRING, allowNull: false },
    bti_date: { type: DataTypes.TEXT, allowNull: false },
    cbe_result: DataTypes.STRING,
    hos_name: DataTypes.STRING,
},
    {
        sequelize,
        modelName: "TextValueWife",
        tableName: "text_value_wife", // ต้องตรงกับชื่อ table จริง
    }
);

module.exports = TextValueWife;