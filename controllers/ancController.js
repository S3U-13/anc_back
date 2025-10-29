const db = require("../models");
const { sequelize } = db;

const { logAction } = require("../services/logService");
const { ancLog } = require("../services/ancLog");

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
exports.view_anc_by_id = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { AncNo } = req.params;

    const anc = await db.Anc.findByPk(AncNo); // 🔹 คืนค่าเป็น object

    if (!anc) {
      return res.status(404).json({ error: "ไม่พบข้อมูล ANC นี้" });
    }

    // 🔹 ดึงข้อมูล wife
    const wifeRes = await fetch(
      `http://localhost:3000/api/user/pat/${anc.hn_wife}`,
      {
        headers: { Authorization: token },
      }
    );
    const wife = await wifeRes.json();

    // 🔹 ดึงข้อมูล husband
    const husbandRes = await fetch(
      `http://localhost:3000/api/user/pat/${anc.hn_husband}`,
      {
        headers: { Authorization: token },
      }
    );
    const husband = await husbandRes.json();

    // 🔹 รวมข้อมูลทั้งหมด
    const dataWithPat = {
      ...anc.toJSON(),
      wife,
      husband,
    };

    // 🔹 บันทึก log
    await logAction({
      userId: req.user.id,
      action: "View ANC by ID",
      entity: "ANC",
      entityId: AncNo,
      description: "เข้าดูข้อมูล ANC รายบุคคล",
      req,
    });

    res.json(dataWithPat);
  } catch (err) {
    console.error(err);
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
    const requiredFields = ["hn_wife"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    const anc = await db.Anc.create({
      hn_wife,
      hn_husband,
      create_by_user_id: req.user.id,
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
exports.edit_anc = async (req, res) => {
  try {
    const { AncNo } = req.params;
    const { hn_wife, hn_husband } = req.body;

    // ✅ ตรวจสอบว่ามี id
    if (!AncNo) {
      return res.status(400).json({ error: "ANC ID is required" });
    }

    // ✅ ตรวจสอบฟิลด์ที่จำเป็น
    const requiredFields = ["hn_wife"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // ✅ ค้นหา ANC เดิมก่อนแก้ไข
    const anc = await db.Anc.findByPk(AncNo);
    if (!anc) {
      return res.status(404).json({ error: "ไม่พบข้อมูล ANC ที่ต้องการแก้ไข" });
    }

    await ancLog({
      AncNo,
      oldData: anc, // ส่งทั้ง object เดิมไปเลย
      userId: req.user.id,
    });

    // ✅ อัปเดตข้อมูล
    await anc.update({
      hn_wife,
      hn_husband,
      edit_by_user_id: req.user.id,
    });

    // ✅ บันทึก log
    await logAction({
      userId: req.user.id,
      action: "Anc Edit",
      entity: "Anc",
      entityId: AncNo,
      description: "แก้ไขทะเบียน ANC",
      req,
    });

    // ✅ ตอบกลับ
    res.status(200).json({
      message: "แก้ไขข้อมูลสำเร็จ",
      anc,
    });
  } catch (error) {
    console.error("❌ edit_anc error:", error);
    return res.status(500).json({ message: error.message });
  }
};
