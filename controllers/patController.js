const db = require("../models");
const { sequelize } = db;

const { Op } = require("sequelize");

exports.pat = async (req, res) => {
  try {
    const { value } = req.params; // สมมติส่งมา param เดียว เช่น /pat/:value

    const pat = await db.Pat.findOne({
      where: {
        [Op.or]: [
          { hn: value },
          { citizencardno: value }
        ]
      },
      include: [
        {
          model: db.Occupation, as: "occupation_detail"
        },
        {
          model: db.PatAddress,
          as: "pat_address",
          include: [
            { model: db.Address, as: "province_detail" },
            { model: db.Address, as: "amphur_detail" },
            { model: db.Address, as: "tambon_detail" }
          ]
        },
        {
          model: db.PatVitalSign,
          as: "pat_vitalsign"
        }
      ]
    });

    if (!pat) return res.status(404).json({ error: "Not found" });
    res.json(pat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};