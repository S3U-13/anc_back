const db = require("../models");
const { sequelize } = db;
const { logAction } = require("../services/logService");

exports.index = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const ancList = await db.Anc.findAll(); // มาจาก DB A

    const dataWithPat = await Promise.all(
      ancList.map(async (anc) => {
        const wifeRes = await fetch(
          `http://localhost:3000/api/user/pat-anc-index/${anc.hn_wife}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const wife = await wifeRes.json();

        const husbandRes = await fetch(
          `http://localhost:3000/api/user/pat-anc-index/${anc.hn_husband}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const husband = await husbandRes.json();

        return {
          ...anc.toJSON(),
          wife,
          husband,
        };
      })
    );
    await logAction({
      userId: req.user.id,
      action: "Anc Index",
      entity: "Auth",
      entityId: req.user.id,
      description: "เข้าดูข้อมูล ANC index",
      req,
    });
    res.json(dataWithPat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.pull_anc = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const ancList = await db.Anc.findAll(); // มาจาก DB A

    const dataWithPat = await Promise.all(
      ancList.map(async (anc) => {
        const wifeRes = await fetch(
          `http://localhost:3000/api/user/pat/${anc.hn_wife}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const wife = await wifeRes.json();

        const husbandRes = await fetch(
          `http://localhost:3000/api/user/pat/${anc.hn_husband}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const husband = await husbandRes.json();

        return {
          ...anc.toJSON(),
          wife,
          husband,
        };
      })
    );
    await logAction({
      userId: req.user.id,
      action: "Anc Pull",
      entity: "Auth",
      entityId: req.user.id,
      description: "ดึงข้อมูลทะเบียน ANC ",
      req,
    });
    res.json(dataWithPat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create_anc = async (req, res) => {
  try {
    const { hn_wife, hn_husband } = req.body;
    const requiredFields = ["hn_wife", "hn_husband"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    const anc = await db.Anc.create({
      hn_wife,
      hn_husband,
    });
    await logAction({
      userId: req.user.id,
      action: "Anc Create",
      entity: "Auth",
      entityId: req.user.id,
      description: "เพิ่มทะเบียน ANC ",
      req,
    });
    res.status(201).json({ message: "เพิ่มข้อมูลสำเร็จ", anc });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
