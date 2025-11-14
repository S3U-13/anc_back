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
          model: db.Lookup,
          as: "occupation_detail",
          attributes: ["lookupname"],
        },
        {
          model: db.Lookup,
          as: "sex_name",
          attributes: ["lookupname"],
          where: { lookuptypeid: 12 },
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
          separate: true,
          limit: 1,
          order: [["dodate", "DESC"]],
          as: "pat_vitalsign",
        },
        {
          model: db.PatReg,
          as: "pat_reg",
          separate: true,
          limit: 1,
          order: [["visitdate", "DESC"]],
          include: [
            { model: db.Location, as: "Location" },
            { model: db.PatVisit, as: "PatVisit" },
          ],
        },
      ],
    });

    if (!pat) return res.status(404).json({ error: "Not found" });

    // เอา pat_reg แค่ object เดียว
    if (pat.pat_reg && pat.pat_reg.length > 0) {
      pat.pat_reg = pat.pat_reg[0];
    }
    if (pat.pat_vitalsign && pat.pat_vitalsign.length > 0) {
      pat.pat_vitalsign = pat.pat_vitalsign[0];
    }

    return res.status(200).json(pat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.pat_view = async (req, res) => {
  try {
    const { value } = req.params; // สมมติส่งมา param เดียว เช่น /pat/:value

    const pat = await db.Pat.findOne({
      where: {
        [Op.or]: [{ hn: value }, { citizencardno: value }],
      },
      include: [
        {
          model: db.Lookup,
          as: "occupation_detail",
          attributes: ["lookupname"],
        },
        {
          model: db.Lookup,
          as: "sex_name",
          attributes: ["lookupname"],
          where: { lookuptypeid: 12 },
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
      ],
    });

    if (!pat) return res.status(404).json({ error: "Not found" });

    // เอา pat_reg แค่ object เดียว
    if (pat.pat_reg && pat.pat_reg.length > 0) {
      pat.pat_reg = pat.pat_reg[0];
    }

    return res.status(200).json(pat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.pat_vitalsign = async (req, res) => {
  try {
    const { value } = req.params; // สมมติส่งมา param เดียว เช่น /pat/:value

    const pat = await db.PatVitalSign.findOne({
      where: {
        [Op.or]: [{ id: value }],
      },
    });

    return res.status(200).json(pat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.pat_reg = async (req, res) => {
  try {
    const { value } = req.params; // สมมติส่งมา param เดียว เช่น /pat/:value

    const pat = await db.PatReg.findOne({
      where: {
        [Op.or]: [{ id: value }],
      },
      include: [
        { model: db.Location, as: "Location" },
        { model: db.PatVisit, as: "PatVisit" },
      ],
    });

    return res.status(200).json(pat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.pat_anc_index = async (req, res) => {
  try {
    const { value } = req.params; // สมมติส่งมา param เดียว เช่น /pat/:value

    const pat = await db.Pat.findOne({
      where: {
        [Op.or]: [{ hn: value }, { citizencardno: value }],
      },
    });

    if (!pat) return res.status(404).json({ error: "Not found" });
    res.json(pat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.pat_anc_service_index = async (req, res) => {
  try {
    const { value } = req.params; // สมมติส่งมา param เดียว เช่น /pat/:value

    const pat = await db.Pat.findOne({
      where: {
        [Op.or]: [{ hn: value }, { citizencardno: value }],
      },
      include: [
        {
          model: db.PatAddress,
          as: "pat_address",
          include: [
            { model: db.Address, as: "province_detail" },
            { model: db.Address, as: "amphur_detail" },
            { model: db.Address, as: "tambon_detail" },
          ],
        },
      ],
    });

    if (!pat) return res.status(404).json({ error: "Not found" });
    res.json(pat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
