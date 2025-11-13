const db = require("../models");
const { sequelize } = db;
const { Op, Model } = require("sequelize");
const jwt = require("jsonwebtoken");
const { logAction } = require("../services/logService");

exports.anc_service = async (req, res) => {
  try {
    const token = req.headers.authorization;

    const anc_data = await db.AncService.findAll({
      where: { flag_status: "a" },
      attributes: ["id", "anc_no", "gravida", "round"],
      include: [
        {
          model: db.Anc,
          as: "AncNo",
        },
        {
          model: db.WifeChoiceValue,
          as: "wife_choice_value",
          attributes: ["abortion_id"],
          include: [
            {
              model: db.AllChoice,
              as: "abortion",
              attributes: ["choice_name"],
            },
          ],
        },
      ],
      order: [
        ["anc_no", "ASC"],
        ["gravida", "ASC"],
        ["round", "ASC"],
      ],
    });

    // ✅ Group ข้อมูลด้วย anc_no + gravida
    const grouped = {};
    anc_data.forEach((item) => {
      const key = `${item.anc_no}_${item.gravida}`;
      if (!grouped[key]) {
        grouped[key] = {
          anc_no: item.anc_no,
          gravida: item.gravida,
          AncNo: item.AncNo,
          rounds: [],
        };
      }
      grouped[key].rounds.push({
        id: item.id,
        round: item.round,
        abortion_id: item.wife_choice_value?.abortion_id ?? null,
        abortion_name: item.wife_choice_value?.abortion?.choice_name ?? null,
      });
    });

    const groupedList = Object.values(grouped);

    // ✅ ดึงข้อมูล wife/husband และเช็กสถานะครรภ์
    const ancList = await Promise.all(
      groupedList.map(async (anc) => {
        const wifeRes = await fetch(
          `${process.env.API_URL}/user/pat-anc-service-index/${anc.AncNo.hn_wife}`,
          { headers: { Authorization: token } }
        );
        const wife = wifeRes.ok ? await wifeRes.json() : null;

        const husbandRes = await fetch(
          `${process.env.API_URL}/user/pat-anc-service-index/${anc.AncNo.hn_husband}`,
          { headers: { Authorization: token } }
        );
        const husband = husbandRes.ok ? await husbandRes.json() : null;

        // ✅ หา round ล่าสุด (รอบที่มากสุด)
        const lastRound = anc.rounds[anc.rounds.length - 1];

        // ✅ ถ้ามี abortion_id = 12 ในรอบใดรอบหนึ่ง → ถือว่าสิ้นสุดการตั้งครรภ์
        const endedRound = anc.rounds.find((r) => r.abortion_id === 12);
        const isEnded = Boolean(endedRound);

        // ✅ นับจำนวนรอบ
        const totalRounds = anc.rounds.length;
        const roundStatus = totalRounds >= 6 ? "ครบ" : "ไม่ครบ";

        // ✅ choice ใช้จากรอบล่าสุด (หรือรอบที่สิ้นสุด)
        const choice = isEnded
          ? {
              abortion_id: 12,
              choice_name: "สิ้นสุดการตั้งครรภ์",
            }
          : {
              abortion_id: lastRound.abortion_id,
              choice_name: lastRound.abortion_name || "ตั้งครรภ์ต่อ",
            };

        return {
          anc_no: anc.anc_no,
          gravida: anc.gravida,
          choice,
          round_status: roundStatus,
          wife,
          husband,
          rounds: anc.rounds.map((r) => ({
            id: r.id,
            label: `รอบที่ ${r.round}`,
            abortion_id: r.abortion_id,
          })),
        };
      })
    );

    await logAction({
      userId: req.user.id,
      action: "Anc Service Index",
      entity: "Auth",
      entityId: req.user.id,
      description: "เข้าดูข้อมูล ANC SERVICE INDEX",
      req,
    });

    res.json(ancList);
  } catch (err) {
    console.error("❌ anc_service error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getGravidaByAncNo = async (req, res) => {
  try {
    const { anc_no } = req.params;

    if (!anc_no) {
      return res.status(400).json({ error: "Missing anc_no" });
    }

    // ดึงค่า distinct ของ gravida สำหรับ anc_no นั้น
    const gravidas = await db.AncService.findAll({
      where: { anc_no, flag_status: "a" },
      attributes: [
        [db.Sequelize.fn("DISTINCT", db.Sequelize.col("gravida")), "gravida"],
      ],
      order: [["gravida", "ASC"]],
      raw: true, // คืนค่าเป็น plain object
    });

    // map เป็น object { value, label }
    const result = gravidas.map((g) => ({
      value: g.gravida.toString(), // ใช้เป็น value
      label: `ท้องที่ ${g.gravida}`, // ใช้เป็น label
    }));

    res.json(result);
  } catch (err) {
    console.error("❌ getGravidaByAncNo error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.anc_service_pull = async (req, res) => {
  try {
    const { AncNo, Gravida } = req.params; // รับ id จาก body

    if (!AncNo || !Gravida) {
      return res.status(400).json({ error: "Missing anc_no or gravida" });
    }

    // ✅ ดึงข้อมูล AncService ตาม anc_no และ gravida ของ ANC ที่ส่งมา
    const anc_data = await db.AncService.findAll({
      where: {
        anc_no: AncNo,
        gravida: Gravida,
        flag_status: "a",
      },
      attributes: ["id", "anc_no", "gravida", "round"],
      include: [
        {
          model: db.Anc,
          as: "AncNo",
        },
        {
          model: db.WifeChoiceValue,
          as: "wife_choice_value",
          attributes: ["abortion_id"],
          include: [
            {
              model: db.AllChoice,
              as: "abortion",
              attributes: ["choice_name"],
            },
          ],
        },
      ],
      order: [
        ["anc_no", "ASC"],
        ["gravida", "ASC"],
        ["round", "ASC"],
      ],
    });

    if (anc_data.length === 0) {
      return res.json([]);
    }

    // ✅ Group ข้อมูลด้วย anc_no + gravida
    const grouped = {};
    anc_data.forEach((item) => {
      const key = `${item.anc_no}_${item.gravida}`;
      if (!grouped[key]) {
        grouped[key] = {
          anc_no: item.anc_no,
          gravida: item.gravida,
          AncNo: item.AncNo,
          rounds: [],
        };
      }
      grouped[key].rounds.push({
        id: item.id,
        round: item.round,
        abortion_id: item.wife_choice_value?.abortion_id ?? null,
        abortion_name: item.wife_choice_value?.abortion?.choice_name ?? null,
      });
    });

    const groupedList = Object.values(grouped);

    // ✅ ดึงข้อมูล wife/husband และเช็กสถานะครรภ์
    const ancList = await Promise.all(
      groupedList.map(async (anc) => {
        // ✅ หา round ล่าสุด (รอบที่มากสุด)
        const lastRound = anc.rounds[anc.rounds.length - 1];

        // ✅ ถ้ามี abortion_id = 12 ในรอบใดรอบหนึ่ง → ถือว่าสิ้นสุดการตั้งครรภ์
        const endedRound = anc.rounds.find((r) => r.abortion_id === 12);
        const isEnded = Boolean(endedRound);

        // ✅ นับจำนวนรอบ
        const totalRounds = anc.rounds.length;
        const roundStatus = totalRounds >= 6 ? "ครบ" : "ไม่ครบ";

        // ✅ choice ใช้จากรอบล่าสุด (หรือรอบที่สิ้นสุด)
        const choice = isEnded
          ? {
              abortion_id: 12,
              choice_name: "สิ้นสุดการตั้งครรภ์",
            }
          : {
              abortion_id: lastRound.abortion_id,
              choice_name: lastRound.abortion_name || "ตั้งครรภ์ต่อ",
            };

        return {
          anc_no: anc.anc_no,
          gravida: anc.gravida,
          choice,
          round_status: roundStatus,

          rounds: anc.rounds.map((r) => ({
            id: r.id,
            label: `รอบที่ ${r.round}`,
            abortion_id: r.abortion_id,
          })),
        };
      })
    );

    await logAction({
      userId: req.user.id,
      action: "Anc Service Get Data BY ID",
      entity: "Auth",
      entityId: req.user.id,
      description: "ดึง ID ANC SERVICE ",
      req,
    });

    res.json(ancList);
  } catch (err) {
    console.error("❌ anc_service error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const t = await sequelize.transaction(); // เริ่ม transaction
  try {
    const {
      anc_no,
      patvisit_id,
      patreg_id,
      para,
      gravida,
      p,
      a,
      last,
      lmp,
      edc,
      ga,
      ma_id,
      ma_detail,
      hr_id,
      hr_detail,
      am_id,
      gct_1_wife,
      gct_2_wife,
      ogtt_1_wife,
      ogtt_2_wife,
      hbsag_wife,
      vdrl_wife,
      ppr_wife,
      tpha_wife,
      anti_hiv_wife,
      bl_gr_wife,
      rh_wife,
      hct_wife,
      of_wife,
      dcip_wife,
      mcv_wife,
      mch_wife,
      hb_typing_wife,
      pcr_wife_id,
      pcr_wife_text,
      cordo_id,
      cordo_text,
      cordo_other_text,
      abortion_id,
      td_num,
      td_last_date,
      tdap_id,
      tdap_round_1,
      tdap_round_2,
      tdap_round_3,
      iip_id,
      iip_date,
      lab_2,
      hct,
      vdrl_2,
      h,
      bti_value_1_id,
      bti_value_2_id,
      bti_value_3_id,
      bti_value_4_id,
      bti_value_5_id,
      bti_1_date,
      bti_2_date,
      cbe_value_1_id,
      cbe_value_2_id,
      cbe_value_3_id,
      cbe_value_4_id,
      birads_id,
      cbe_result,
      per_os_id,
      hbsag_husband,
      vdrl_husband,
      ppr_husband,
      tpha_husband,
      anti_hiv_husband,
      bl_gr_husband,
      rh_husband,
      hct_husband,
      of_husband,
      dcip_husband,
      mcv_husband,
      mch_husband,
      hb_typing_husband,
      pcr_hus_id,
      pcr_hus_text,
      ref_value_1_id,
      ref_value_2_id,
      receive_in_id,
      ref_in_detail,
      receive_in_detail,
      hos_in_id,
      receive_out_id,
      ref_out_detail,
      receive_out_detail,
      hos_out_id,
    } = req.body;
    const requiredFields = [
      "anc_no",
      "patvisit_id",
      "para",
      "gravida",
      "p",
      "a",
      "last",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    const blood_test_interpretation = await db.BloodTestInterpretation.create({
      bti_value_1_id,
      bti_value_2_id,
      bti_value_3_id,
      bti_value_4_id,
      bti_value_5_id,
    });
    const cbe = await db.Cbe.create({
      cbe_value_1_id,
      cbe_value_2_id,
      cbe_value_3_id,
      cbe_value_4_id,
    });
    const ref_in_choice = await db.RefInChoice.create({
      receive_in_id,
      ref_in_detail,
      hos_in_id,
      receive_in_detail,
    });
    const ref_out_choice = await db.RefOutChoice.create({
      receive_out_id,
      ref_out_detail,
      hos_out_id,
      receive_out_detail,
    });
    const referral = await db.Referral.create({
      ref_value_1_id,
      ref_value_2_id,
    });
    const wife_choice_value = await db.WifeChoiceValue.create({
      ma_id,
      hr_id,
      am_id,
      pcr_wife_id,
      cordo_id,
      abortion_id,
      tdap_id,
      iip_id,
      bti_id: blood_test_interpretation.id,
      cbe_id: cbe.id,
      birads_id,
      per_os_id,
      pcr_hus_id,
      referral_id: referral.id,
      ref_in_choice_id: ref_in_choice.id,
      ref_out_choice_id: ref_out_choice.id,
    });

    const lab_wife_result = await db.LabWifeResult.create({
      gct_1_wife,
      gct_2_wife,
      ogtt_1_wife,
      ogtt_2_wife,
      hbsag_wife,
      vdrl_wife,
      ppr_wife,
      tpha_wife,
      anti_hiv_wife,
      bl_gr_wife,
      rh_wife,
      hct_wife,
      of_wife,
      dcip_wife,
      mcv_wife,
      mch_wife,
      hb_typing_wife,
    });

    const wife_text_value = await db.WifeTextValue.create({
      para,
      p,
      a,
      last,
      lmp,
      edc,
      ga,
      ma_detail,
      hr_detail,
      lab_wife_result_id: lab_wife_result.id,
      pcr_wife_text,
      cordo_text,
      cordo_other_text,
      td_num,
      td_last_date,
      tdap_round_1,
      tdap_round_2,
      tdap_round_3,
      iip_date,
      lab_2,
      hct,
      vdrl_2,
      h,
      bti_1_date,
      bti_2_date,
      cbe_result,
    });

    const lab_husband_result = await db.LabHusbandResult.create({
      hbsag_husband,
      vdrl_husband,
      ppr_husband,
      tpha_husband,
      anti_hiv_husband,
      bl_gr_husband,
      rh_husband,
      hct_husband,
      of_husband,
      dcip_husband,
      mcv_husband,
      mch_husband,
      hb_typing_husband,
    });

    const husband_value = await db.HusbandValue.create({
      lab_husband_result_id: lab_husband_result.id,
      pcr_hus_id,
      pcr_hus_text,
    });

    const lastService = await db.AncService.findOne({
      where: {
        anc_no,
        gravida,
        flag_status: "a",
      },
      order: [["round", "DESC"]],
    });

    const nextRound =
      lastService && !isNaN(lastService.round)
        ? parseInt(lastService.round, 10) + 1
        : 1;

    const token = req.headers.authorization?.split(" ")[1]; // ตัด "Bearer "
    if (!token) return res.status(401).json({ error: "Token not found" });

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
      console.log("✅ decoded token:", decoded);
      userId = decoded.id;
    } catch (err) {
      console.error("❌ Token verify failed:", err.message);
      return res.status(401).json({ error: "Invalid token" });
    }

    const anc_service = await db.AncService.create({
      anc_no,
      patvisit_id,
      patreg_id,
      wife_choice_value_id: wife_choice_value.id,
      wife_text_value_id: wife_text_value.id,
      husband_value_id: husband_value.id,
      gravida,
      round: nextRound,
      create_by_user_id: userId,
    });
    await t.commit();

    await logAction({
      userId: req.user.id,
      action: "Anc Service create",
      entity: "Auth",
      entityId: req.user.id,
      description: "เพิ่มข้อมูล ANC SERVICE",
      req,
    });

    res.status(201).json({
      message: "เพิ่มข้อมูลสำเร็จ",
      blood_test_interpretation,
      cbe,
      referral,
      ref_in_choice,
      ref_out_choice,
      wife_choice_value,
      lab_wife_result,
      wife_text_value,
      lab_husband_result,
      husband_value,
      anc_service,
    });
  } catch (error) {
    try {
      await t.rollback();
    } catch (e) {
      /* ignore */
    }
    return res.status(500).json({ message: error.message });
  }
};

exports.edit = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token not found" });

    const jwt = require("jsonwebtoken");
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
      userId = decoded.id;
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // ดึง AncService พร้อม relations
    const anc_service = await db.AncService.findOne({
      where: { id }, // หรือ anc_no + gravida + round
      include: [
        {
          model: db.WifeChoiceValue,
          as: "wife_choice_value",
          include: [
            {
              model: db.AllChoice,
              as: "abortion",
              attributes: ["choice_name"],
            },
            { model: db.AllChoice, as: "ma", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "hr", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "am", attributes: ["choice_name"] },
            {
              model: db.AllChoice,
              as: "pcr_wife",
              attributes: ["choice_name"],
            },
            { model: db.AllChoice, as: "cordo", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "tdap", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "iip", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "birads", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "per_os", attributes: ["choice_name"] },
            {
              model: db.BloodTestInterpretation,
              as: "bti",
            }, // และค่าอื่นถ้าต้องการ
            { model: db.Cbe, as: "cbe" },
            { model: db.RefInChoice, as: "ref_in_choice" },
            {
              model: db.RefOutChoice,
              as: "ref_out_choice",
            },
            { model: db.Referral, as: "referral_value" },
          ],
        },
        {
          model: db.WifeTextValue,
          as: "wife_text_value",
          include: [
            {
              model: db.LabWifeResult,
              as: "lab_wife",
              include: [
                {
                  model: db.AllChoice,
                  as: "hbsag_wife_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "vdrl_wife_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "anti_hiv_wife_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "bl_gr_wife_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "rh_wife_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "dcip_wife_detail",
                  attributes: ["choice_name"],
                },
              ],
            },
          ],
        },
        {
          model: db.HusbandValue,
          as: "husband_value",
          include: [
            {
              model: db.LabHusbandResult,
              as: "lab_husband",
              include: [
                {
                  model: db.AllChoice,
                  as: "hbsag_husband_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "vdrl_husband_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "anti_hiv_husband_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "bl_gr_husband_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "rh_husband_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "dcip_husband_detail",
                  attributes: ["choice_name"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!anc_service)
      return res.status(404).json({ error: "ไม่พบข้อมูล AncService" });

    // -----------------------------
    // update bti
    if (anc_service.wife_choice_value?.bti_id) {
      await db.BloodTestInterpretation.update(
        {
          bti_value_1_id: req.body.bti_value_1_id
            ? parseInt(req.body.bti_value_1_id)
            : null,
          bti_value_2_id: req.body.bti_value_2_id
            ? parseInt(req.body.bti_value_2_id)
            : null,
          bti_value_3_id: req.body.bti_value_3_id
            ? parseInt(req.body.bti_value_3_id)
            : null,
          bti_value_4_id: req.body.bti_value_4_id
            ? parseInt(req.body.bti_value_4_id)
            : null,
          bti_value_5_id: req.body.bti_value_5_id
            ? parseInt(req.body.bti_value_5_id)
            : null,
        },
        { where: { id: anc_service.wife_choice_value.bti_id }, transaction: t }
      );
    }

    // -----------------------------
    // update cbe
    if (anc_service.wife_choice_value?.cbe_id) {
      await db.Cbe.update(
        {
          cbe_value_1_id: req.body.cbe_value_1_id
            ? parseInt(req.body.cbe_value_1_id)
            : null,
          cbe_value_2_id: req.body.cbe_value_2_id
            ? parseInt(req.body.cbe_value_2_id)
            : null,
          cbe_value_3_id: req.body.cbe_value_3_id
            ? parseInt(req.body.cbe_value_3_id)
            : null,
          cbe_value_4_id: req.body.cbe_value_4_id
            ? parseInt(req.body.cbe_value_4_id)
            : null,
        },
        { where: { id: anc_service.wife_choice_value.cbe_id }, transaction: t }
      );
    }

    // -----------------------------
    // update ref_in_choice
    if (anc_service.wife_choice_value?.ref_in_choice_id) {
      await db.RefInChoice.update(
        {
          receive_in_id: req.body.receive_in_id
            ? parseInt(req.body.receive_in_id)
            : null,
          ref_in_detail: req.body.ref_in_detail || "",
          hos_in_id: req.body.hos_in_id ? parseInt(req.body.hos_in_id) : null,
          receive_in_detail: req.body.receive_in_detail || "",
        },
        {
          where: { id: anc_service.wife_choice_value.ref_in_choice_id },
          transaction: t,
        }
      );
    }

    // -----------------------------
    // update ref_out_choice
    if (anc_service.wife_choice_value?.ref_out_choice_id) {
      await db.RefOutChoice.update(
        {
          receive_out_id: req.body.receive_out_id
            ? parseInt(req.body.receive_out_id)
            : null,
          ref_out_detail: req.body.ref_out_detail || "",
          hos_out_id: req.body.hos_out_id
            ? parseInt(req.body.hos_out_id)
            : null,
          receive_out_detail: req.body.receive_out_detail || "",
        },
        {
          where: { id: anc_service.wife_choice_value.ref_out_choice_id },
          transaction: t,
        }
      );
    }

    // -----------------------------
    // update referral
    if (anc_service.wife_choice_value?.referral_id) {
      await db.Referral.update(
        {
          ref_value_1_id: req.body.ref_value_1_id
            ? parseInt(req.body.ref_value_1_id)
            : null,
          ref_value_2_id: req.body.ref_value_2_id
            ? parseInt(req.body.ref_value_2_id)
            : null,
        },
        {
          where: { id: anc_service.wife_choice_value.referral_id },
          transaction: t,
        }
      );
    }

    // -----------------------------
    // update wife_choice_value
    await anc_service.wife_choice_value.update(
      {
        ma_id: req.body.ma_id ? parseInt(req.body.ma_id) : null,
        hr_id: req.body.hr_id ? parseInt(req.body.hr_id) : null,
        am_id: req.body.am_id ? parseInt(req.body.am_id) : null,
        pcr_wife_id: req.body.pcr_wife_id
          ? parseInt(req.body.pcr_wife_id)
          : null,
        cordo_id: req.body.cordo_id ? parseInt(req.body.cordo_id) : null,
        abortion_id: req.body.abortion_id
          ? parseInt(req.body.abortion_id)
          : null,
        tdap_id: req.body.tdap_id ? parseInt(req.body.tdap_id) : null,
        iip_id: req.body.iip_id ? parseInt(req.body.iip_id) : null,
        birads_id: req.body.birads_id ? parseInt(req.body.birads_id) : null,
        per_os_id: req.body.per_os_id ? parseInt(req.body.per_os_id) : null,
        pcr_hus_id: req.body.pcr_hus_id ? parseInt(req.body.pcr_hus_id) : null,
        updated_by_user_id: userId,
      },
      { transaction: t }
    );

    // -----------------------------
    // update lab_wife_result
    if (anc_service.wife_text_value?.lab_wife_result_id) {
      await db.LabWifeResult.update(
        {
          gct_1_wife: req.body.gct_1_wife || null,
          gct_2_wife: req.body.gct_2_wife || null,
          ogtt_1_wife: req.body.ogtt_1_wife || null,
          ogtt_2_wife: req.body.ogtt_2_wife || null,
          hbsag_wife: req.body.hbsag_wife
            ? parseInt(req.body.hbsag_wife)
            : null,
          vdrl_wife: req.body.vdrl_wife ? parseInt(req.body.vdrl_wife) : null,
          ppr_wife: req.body.ppr_wife || null,
          tpha_wife: req.body.tpha_wife || null,
          anti_hiv_wife: req.body.anti_hiv_wife
            ? parseInt(req.body.anti_hiv_wife)
            : null,
          bl_gr_wife: req.body.bl_gr_wife
            ? parseInt(req.body.bl_gr_wife)
            : null,
          rh_wife: req.body.rh_wife ? parseInt(req.body.rh_wife) : null,
          hct_wife: req.body.hct_wife || null,
          of_wife: req.body.of_wife || null,
          dcip_wife: req.body.dcip_wife ? parseInt(req.body.dcip_wife) : null,
          mcv_wife: req.body.mcv_wife || null,
          mch_wife: req.body.mch_wife || null,
          hb_typing_wife: req.body.hb_typing_wife || null,
        },
        {
          where: { id: anc_service.wife_text_value.lab_wife_result_id },
          transaction: t,
        }
      );
    }

    // -----------------------------
    // update wife_text_value
    await anc_service.wife_text_value.update(
      {
        para: req.body.para || "",
        p: req.body.p || "",
        a: req.body.a || "",
        last: req.body.last || "",
        lmp: req.body.lmp || null,
        edc: req.body.edc || null,
        ga: req.body.ga || "",
        ma_detail: req.body.ma_detail || "",
        hr_detail: req.body.hr_detail || "",
        pcr_wife_text: req.body.pcr_wife_text || "",
        cordo_text: req.body.cordo_text || "",
        cordo_other_text: req.body.cordo_other_text || "",
        td_num: req.body.td_num ? parseInt(req.body.td_num) : null,
        td_last_date: req.body.td_last_date || null,
        tdap_round_1: req.body.tdap_round_1 || null,
        tdap_round_2: req.body.tdap_round_2 || null,
        tdap_round_3: req.body.tdap_round_3 || null,
        iip_date: req.body.iip_date || null,
        lab_2: req.body.lab_2 || null,
        hct: req.body.hct || null,
        vdrl_2: req.body.vdrl_2 || null,
        h: req.body.h || null,
        bti_1_date: req.body.bti_1_date || null,
        bti_2_date: req.body.bti_2_date || null,
        cbe_result: req.body.cbe_result || "",
      },
      { transaction: t }
    );

    // -----------------------------
    // update lab_husband_result
    if (anc_service.husband_value?.lab_husband_result_id) {
      await db.LabHusbandResult.update(
        {
          hbsag_husband: req.body.hbsag_husband
            ? parseInt(req.body.hbsag_husband)
            : null,
          vdrl_husband: req.body.vdrl_husband
            ? parseInt(req.body.vdrl_husband)
            : null,
          ppr_husband: req.body.ppr_wife || null,
          tpha_husband: req.body.tpha_wife || null,
          anti_hiv_husband: req.body.anti_hiv_husband
            ? parseInt(req.body.anti_hiv_husband)
            : null,
          bl_gr_husband: req.body.bl_gr_husband
            ? parseInt(req.body.bl_gr_husband)
            : null,
          rh_husband: req.body.rh_husband
            ? parseInt(req.body.rh_husband)
            : null,
          hct_husband: req.body.hct_husband || null,
          of_husband: req.body.of_husband || null,
          dcip_husband: req.body.dcip_husband
            ? parseInt(req.body.dcip_husband)
            : null,
          mcv_husband: req.body.mcv_husband || null,
          mch_husband: req.body.mch_husband || null,
          hb_typing_husband: req.body.hb_typing_husband || null,
        },
        {
          where: { id: anc_service.husband_value.lab_husband_result_id },
          transaction: t,
        }
      );
    }

    // -----------------------------
    // update husband_value
    await anc_service.husband_value.update(
      {
        pcr_hus_id: req.body.pcr_hus_id ? parseInt(req.body.pcr_hus_id) : null,
        pcr_hus_text: req.body.pcr_hus_text || "",
      },
      { transaction: t }
    );

    // -----------------------------
    // update anc_service หลัก
    await anc_service.update(
      {
        anc_no: req.body.anc_no ? parseInt(req.body.anc_no) : null,
        patvisit_id: req.body.patvisit_id
          ? parseInt(req.body.patvisit_id)
          : null,
        patreg_id: req.body.patreg_id ? parseInt(req.body.patreg_id) : null,
        gravida: req.body.gravida || "",
        round: req.body.round || anc_service.round,
        edit_by_user_id: userId,
      },
      { transaction: t }
    );

    await t.commit();

    await logAction({
      userId: req.user.id,
      action: "Anc Service Edit",
      entity: "Auth",
      entityId: req.user.id,
      description: "แก้ไขข้อมูล ANC SERVICE",
      req,
    });

    return res.status(200).json({
      message: "แก้ไขข้อมูลสำเร็จ",
      anc_service,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ error: error.message });
  }
};

exports.coverage_site = async (req, res) => {
  try {
    const coverage_site = await db.CoverageSite.findAll({
      where: {
        provcode: 22, // เท่ากับ
        typecode: {
          [Op.notIn]: ["A", "B", "D", "O", "P"], // ไม่อยู่ใน list
        },
      },
    });

    res.json(coverage_site);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
exports.coverage_site_by_it = async (req, res) => {
  try {
    const { HosId } = req.params;
    const coverage_site = await db.CoverageSite.findAll({
      where: {
        siteid: HosId,
        provcode: 22, // เท่ากับ
        typecode: {
          [Op.notIn]: ["A", "B", "D", "O", "P"], // ไม่อยู่ใน list
        },
      },
    });

    res.json(coverage_site);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.show_service_round_by_id = async (req, res) => {
  try {
    const { RoundId } = req.params;
    const token = req.headers.authorization;

    const service = await db.AncService.findOne({
      where: { id: RoundId },
      // where: { flag_status: "a" },
      include: [
        { model: db.Anc, as: "AncNo" },
        {
          model: db.WifeChoiceValue,
          as: "wife_choice_value",
          include: [
            { model: db.AllChoice, as: "ma", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "hr", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "am", attributes: ["choice_name"] },
            {
              model: db.AllChoice,
              as: "pcr_wife",
              attributes: ["choice_name"],
            },
            { model: db.AllChoice, as: "cordo", attributes: ["choice_name"] },
            {
              model: db.AllChoice,
              as: "abortion",
              attributes: ["choice_name"],
            },
            { model: db.AllChoice, as: "tdap", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "iip", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "birads", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "per_os", attributes: ["choice_name"] },
            {
              model: db.BloodTestInterpretation,
              as: "bti",
              include: [
                {
                  model: db.AllChoice,
                  as: "bti_value_1",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "bti_value_2",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "bti_value_3",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "bti_value_4",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "bti_value_5",
                  attributes: ["choice_name"],
                },
              ],
            },
            {
              model: db.Cbe,
              as: "cbe",
              include: [
                {
                  model: db.AllChoice,
                  as: "cbe_value_1",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "cbe_value_2",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "cbe_value_3",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "cbe_value_4",
                  attributes: ["choice_name"],
                },
              ],
            },
            {
              model: db.Referral,
              as: "referral_value",
              include: [
                {
                  model: db.AllChoice,
                  as: "ref_in",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "ref_out",
                  attributes: ["choice_name"],
                },
              ],
            },
            {
              model: db.RefInChoice,
              as: "ref_in_choice",
              attributes: [
                "receive_in_id",
                "hos_in_id",
                "receive_in_detail",
                "ref_in_detail",
              ],
              include: [
                {
                  model: db.AllChoice,
                  as: "receive_in",
                  attributes: ["choice_name"],
                },
              ],
            },
            {
              model: db.RefOutChoice,
              as: "ref_out_choice",
              attributes: [
                "receive_out_id",
                "hos_out_id",
                "receive_out_detail",
                "ref_out_detail",
              ],
              include: [
                {
                  model: db.AllChoice,
                  as: "receive_out",
                  attributes: ["choice_name"],
                },
              ],
            },
          ],
        },
        {
          model: db.WifeTextValue,
          as: "wife_text_value",
          include: [
            {
              model: db.AllChoice,
              as: "vdrl_2_name",
              attributes: ["choice_name"],
            },
            {
              model: db.LabWifeResult,
              as: "lab_wife",
              include: [
                {
                  model: db.AllChoice,
                  as: "hbsag_wife_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "vdrl_wife_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "anti_hiv_wife_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "bl_gr_wife_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "rh_wife_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "dcip_wife_detail",
                  attributes: ["choice_name"],
                },
              ],
            },
          ],
        },
        {
          model: db.HusbandValue,
          as: "husband_value",
          include: [
            { model: db.AllChoice, as: "pcr_hus", attributes: ["choice_name"] },
            {
              model: db.LabHusbandResult,
              as: "lab_husband",
              include: [
                {
                  model: db.AllChoice,
                  as: "hbsag_husband_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "vdrl_husband_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "anti_hiv_husband_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "bl_gr_husband_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "rh_husband_detail",
                  attributes: ["choice_name"],
                },
                {
                  model: db.AllChoice,
                  as: "dcip_husband_detail",
                  attributes: ["choice_name"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!service) {
      return res.status(404).json({ error: "ไม่พบข้อมูลรอบบริการนี้" });
    }

    const hnWife = service.AncNo?.hn_wife;
    const hnHusband = service.AncNo?.hn_husband;

    const [wifeProfile, husbandProfile] = await Promise.all([
      hnWife
        ? fetch(`${process.env.API_URL}/user/pat/${hnWife}`, {
            headers: { Authorization: token },
          }).then((r) => (r.ok ? r.json() : null))
        : null,
      hnHusband
        ? fetch(`${process.env.API_URL}/user/pat/${hnHusband}`, {
            headers: { Authorization: token },
          }).then((r) => (r.ok ? r.json() : null))
        : null,
    ]);

    const refInId = service?.wife_choice_value?.ref_in_choice?.hos_in_id;
    const refOutId = service?.wife_choice_value?.ref_out_choice?.hos_out_id;

    const [refIn, refOut] = await Promise.all([
      refInId
        ? fetch(`${process.env.API_URL}/user/coveragesite/${refInId}`, {
            headers: { Authorization: token },
          }).then((r) => (r.ok ? r.json() : null))
        : null,
      refOutId
        ? fetch(`${process.env.API_URL}/user/coveragesite/${refOutId}`, {
            headers: { Authorization: token },
          }).then((r) => (r.ok ? r.json() : null))
        : null,
    ]);

    // ✅ แยกโครงสร้างให้ชัดเจน
    const result = {
      service_info: {
        id: service.id,
        anc_no: service.AncNo?.anc_no || null,
        gravida: service.gravida || null,
        round: service.round || null,
        patvisit_id: service.patvisit_id || null,
        patreg_id: service.patreg_id || null,
        service_date: service.createdAt,
      },
      wife: {
        profile: wifeProfile || null,
        choices: service.wife_choice_value || null,
        text_values: service.wife_text_value || null,

        referral: {
          ref_in: refIn || null,
          ref_out: refOut || null,
        },
      },
      husband: {
        profile: husbandProfile || null,
        choices: service.husband_value || null,
      },
    };
    await logAction({
      userId: req.user.id,
      action: "Anc Service View",
      entity: "Auth",
      entityId: req.user.id,
      description: "ดูข้อมูล ANC SERVICE By Id",
      req,
    });
    return res.json(result);
  } catch (error) {
    console.error("❌ show_service_round_by_id error:", error);
    res.status(500).json({ error: error.message });
  }
};
