const db = require("../models");
const { sequelize } = db;
const { Op, Model } = require("sequelize");
const jwt = require("jsonwebtoken");
const { logAction } = require("../services/logService");

exports.chart_bar_anc_service = async (req, res) => {
  try {
    const chart_anc_service = await db.AncService.findAll({
      attributes: ["id", "anc_no", "createdAt"],
    });

    const now = new Date();
    const currentYear = now.getFullYear();

    const sum_anc_by_month = Array.from({ length: 12 }, (_, i) => {
      const count = chart_anc_service.filter((anc) => {
        const date = new Date(anc.createdAt);
        return date.getFullYear() === currentYear && date.getMonth() === i;
      }).length;

      return {
        month: i + 1, // เดือน 1–12
        count,
      };
    });
    const buddhistYear = currentYear + 543;
    return res.status(200).json({
      year: buddhistYear,
      sum_anc_by_month,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
};

exports.anc_service_sum = async (req, res) => {
  try {
    const chart_anc_service = await db.AncService.findAll({
      attributes: ["id", "anc_no", "createdAt"],
      include: [
        {
          model: db.WifeChoiceValue,
          as: "wife_choice_value",
          attributes: ["tdap_id", "iip_id", "referral_id"],
          include: [
            {
              model: db.Referral,
              as: "referral_value",
              attributes: ["ref_value_1_id", "ref_value_2_id"],
            },
          ],
        },
      ],
    });

    // 🔹 เดือนและปีปัจจุบัน
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-11
    const currentYear = now.getFullYear();

    // 🔹 แปลงเป็นชื่อเดือน (ภาษาไทย)
    const monthNamesTH = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    const month_name = monthNamesTH[currentMonth];

    // 🔹 กรองเฉพาะข้อมูลของเดือนและปีปัจจุบัน
    const currentMonthData = chart_anc_service.filter((anc) => {
      const createdAt = new Date(anc.createdAt);
      return (
        createdAt.getMonth() === currentMonth &&
        createdAt.getFullYear() === currentYear
      );
    });

    // 🔹 Mapping id → ชื่ออ่านง่าย
    const tdapMap = { 14: "tdap_1", 15: "tdap_2" };
    const iipMap = { 16: "iip_1", 17: "iip_2" };
    const referralMap = { 40: "ref_in", 41: "ref_out" };

    // 🔹 รวม count เฉพาะเดือนนี้ ด้วยชื่อ key
    const tdap_count = currentMonthData.reduce((acc, anc) => {
      const tdapId = anc.wife_choice_value?.tdap_id;
      if (tdapId != null) {
        const key = tdapMap[tdapId] || tdapId;
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});

    const iip_count = currentMonthData.reduce((acc, anc) => {
      const iipId = anc.wife_choice_value?.iip_id;
      if (iipId != null) {
        const key = iipMap[iipId] || iipId;
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});

    const referral_in_count = currentMonthData.reduce((acc, anc) => {
      const referralInId =
        anc.wife_choice_value?.referral_value?.ref_value_1_id;
      if (referralInId != null) {
        const key = referralMap[referralInId] || referralInId;
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});

    const referral_out_count = currentMonthData.reduce((acc, anc) => {
      const referralOutId =
        anc.wife_choice_value?.referral_value?.ref_value_2_id;
      if (referralOutId != null) {
        const key = referralMap[referralOutId] || referralOutId;
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});
    const buddhistYear = currentYear + 543;
    // 🔹 ส่งข้อมูลพร้อมชื่อเดือนและปี
    await logAction({
      userId: req.user.id,
      action: "ดูผลสรุป",
      entity: "Auth",
      entityId: req.user.id,
      description: "ดูผลสรุปข้อมูล",
      req,
    });
    return res.status(200).json({
      month: currentMonth + 1,
      month_name,
      year: buddhistYear,
      tdap_count,
      iip_count,
      referral_in_count,
      referral_out_count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
};
exports.radial_chart = async (req, res) => {
  try {
    const chart_anc_service = await db.AncService.findAll({
      attributes: ["id", "anc_no", "createdAt"],
      include: [
        {
          model: db.WifeChoiceValue,
          as: "wife_choice_value",
          attributes: ["am_id"],
        },
      ],
    });

    const now = new Date();
    const currentYear = now.getFullYear();

    // ✅ กรองเฉพาะข้อมูลปีนี้
    const currentYearData = chart_anc_service.filter((anc) => {
      const createdAt = new Date(anc.createdAt);
      return createdAt.getFullYear() === currentYear;
    });

    const amMap = { 5: "am_5", 6: "am_6", 7: "am_7" };

    // ✅ นับจำนวนแต่ละ am_id
    const am_count = currentYearData.reduce((acc, anc) => {
      const amId = anc.wife_choice_value?.am_id;
      if (amId != null) {
        const key = amMap[amId] || `am_${amId}`;
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});

    // ✅ เติมค่า 0 ให้ทุก key ที่อาจหายไป
    const full_am_count = {
      am_5: am_count.am_5 || 0,
      am_6: am_count.am_6 || 0,
      am_7: am_count.am_7 || 0,
    };

    const buddhistYear = currentYear + 543;
    return res.status(200).json({
      year: buddhistYear,
      am_count: full_am_count,
    });
  } catch (error) {
    console.error("Error in radial_chart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
