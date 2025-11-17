const { DataTypes, Op } = require("sequelize");
const sequelize = require("../config/db");
const moment = require("moment");

const Anc = sequelize.define(
  "Anc", // model name
  {
    anc_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    hn_wife: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wife_address: { type: DataTypes.STRING, allowNull: true },
    wife_tel: { type: DataTypes.STRING(10), allowNull: true },
    hn_husband: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    husband_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    husband_age: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    husband_citizencardno: {
      type: DataTypes.STRING(13),
      allowNull: true,
    },
    husband_race: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    husband_tel: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    flag_status: DataTypes.STRING,
    create_by_user_id: DataTypes.INTEGER,
    edit_by_user_id: DataTypes.INTEGER,
  },
  {
    sequelize, // connection
    modelName: "Anc",
    tableName: "anc", // ต้องตรงกับชื่อ table จริง
  }
);

// Hook ก่อนสร้าง record
Anc.beforeCreate(async (anc) => {
  const { Op } = require("sequelize");
  const moment = require("moment");

  const year = moment().year() + 543;
  const yy = String(year).slice(-2);

  const lastRecord = await Anc.findOne({
    where: { anc_no: { [Op.like]: `${yy}%` } },
    order: [["anc_no", "DESC"]],
  });

  let nextNumber = "001";
  if (lastRecord) {
    const lastNumber = parseInt(String(lastRecord.anc_no).slice(2));
    nextNumber = String(lastNumber + 1).padStart(3, "0");
  }

  anc.anc_no = parseInt(`${yy}${nextNumber}`);
});

module.exports = Anc;
