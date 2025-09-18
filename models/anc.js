const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Anc = sequelize.define("Anc", {
    anc_no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hn: DataTypes.INTEGER,
    patvisit_id: DataTypes.INTEGER,
    patreg_id: DataTypes.INTEGER,
    para: DataTypes.STRING,
    g: DataTypes.STRING,
    p: DataTypes.STRING,
    a: DataTypes.STRING,
    last: DataTypes.STRING,
    lmp: DataTypes.DATE,
    choice_value_id: DataTypes.INTEGER,
    text_value_wife_id: DataTypes.INTEGER,
    text_value_husband_id: DataTypes.INTEGER
}, {
    sequelize,
    modelName: "Anc",
    tableName: "anc", // ต้องตรงกับชื่อ table จริง
}
);

module.exports = Anc;