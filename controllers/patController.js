const db = require("../models");
const { sequelize } = db;

const { Op } = require("sequelize");

exports.pat = async (req, res) => {
  try {
    const { value } = req.params; // สมมติส่งมา param เดียว เช่น /pat/:value

    const pat = await db.Pat.findOne({
      where: {
        [Op.or]: [{ hn: value }, { citizencardno: value }],
      },
      include: [
        {
          model: db.Occupation,
          as: "occupation_detail",
        },
        {
          model: db.PatAddress,
          as: "pat_address",
          include: [
            { model: db.Address, as: "province_detail" },
            { model: db.Address, as: "amphur_detail" },
            { model: db.Address, as: "tambon_detail" },
          ],
        },
        {
          model: db.PatVitalSign,
          as: "pat_vitalsign",
        },
        {
          model: db.PatReg,
          as: "pat_reg",
          // separate: true,
          // limit: 1,
          // order: [["visitdate", "DESC"]],
          include: [
            { model: db.Location, as: "Location" },
            { model: db.PatVisit, as: "PatVisit" },
          ],
        },
      ],
    });

    if (!pat) return res.status(404).json({ error: "Not found" });

    // เอา pat_reg แค่ object เดียว
    // if (pat.pat_reg && pat.pat_reg.length > 0) {
    //   pat.pat_reg = pat.pat_reg[0];
    // }
    
    res.json(pat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.pat_reg = async (req, res) => {
//   try {
//     const { value } = req.params;
//     const pat_reg = await db.PatReg.findOne({
//       where: {
//         [Op.or]: [{ hn: value }],
//       },
//       include: [
//         {
//           model: db.Location,
//           as: "Location",
//         },
//         { model: db.PatVisit, as: "PatVisit" },
//       ],
//     });

//     if (!pat) return res.status(404).json({ error: "not found" });
//     res,json(pat_reg);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
