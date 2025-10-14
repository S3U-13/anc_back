const db = require("../models");
const { sequelize } = db;
const { Op, Model } = require("sequelize");

exports.anc_service = async (req, res) => {
  try {
    // ดึงข้อมูลทั้งหมดที่มี anc_no, gravida, round
    const token = req.headers.authorization;
    const anc_data = await db.AncService.findAll({
      attributes: ["id", "anc_no", "gravida", "round"],
      include: [
        {
          model: db.Anc,
          as: "AncNo",
        },
      ],
      order: [
        ["anc_no", "ASC"],
        ["gravida", "ASC"],
        ["round", "ASC"],
      ],
    });

    // ✅ Group ด้วย JS (เพราะ Sequelize group จะรวมค่า aggregate)
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
      });
    });

    // แปลง object -> array
    const groupedList = Object.values(grouped);

    // ✅ ดึงข้อมูล wife/husband ต่อ record
    const ancList = await Promise.all(
      groupedList.map(async (anc) => {
        const wifeRes = await fetch(
          `http://localhost:3000/api/user/pat-anc-service-index/${anc.AncNo.hn_wife}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const wife = await wifeRes.json();

        const husbandRes = await fetch(
          `http://localhost:3000/api/user/pat-anc-service-index/${anc.AncNo.hn_husband}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const husband = await husbandRes.json();

        return {
          anc_no: anc.anc_no,
          gravida: anc.gravida,
          wife,
          husband,
          // 👇 rounds จะใช้ไปทำ dropdown
          rounds: anc.rounds.map((r) => ({
            id: r.id,
            label: `รอบที่ ${r.round}`,
          })),
        };
      })
    );

    res.json(ancList);
  } catch (err) {
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
      g,
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
      hos_in_id,
      receive_out_id,
      hos_out_id,
    } = req.body;
    const requiredFields = [
      "anc_no",
      "patvisit_id",
      "para",
      "g",
      "p",
      "a",
      "last",
      "ma_id",
      "hr_id",
      "am_id",
      "gct_1_wife",
      "gct_2_wife",
      "ogtt_1_wife",
      "ogtt_2_wife",
      "hbsag_wife",
      "vdrl_wife",
      "anti_hiv_wife",
      "bl_gr_wife",
      "rh_wife",
      "hct_wife",
      "of_wife",
      "dcip_wife",
      "mcv_wife",
      "mch_wife",
      "hb_typing_wife",
      "pcr_wife_id",
      "cordo_id",
      "abortion_id",
      "td_num",
      "td_last_date",
      "tdap_id",
      "iip_id",
      "lab_2",
      "vdrl_2",
      "h",
      "per_os_id",
      "hbsag_husband",
      "vdrl_husband",
      "anti_hiv_husband",
      "bl_gr_husband",
      "rh_husband",
      "hct_husband",
      "of_husband",
      "dcip_husband",
      "mcv_husband",
      "mch_husband",
      "hb_typing_husband",
      "pcr_hus_id",
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
      hos_in_id,
    });
    const ref_out_choice = await db.RefOutChoice.create({
      receive_out_id,
      hos_out_id,
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
      g,
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
    const anc_service = await db.AncService.create({
      anc_no,
      patvisit_id,
      patreg_id,
      wife_choice_value_id: wife_choice_value.id,
      wife_text_value_id: wife_text_value.id,
      husband_value_id: husband_value.id,
      round: null,
      create_by_user_id: null,
      edit_by_user_id: null,
    });
    await t.commit();
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

exports.show_service_round_by_id = async (req, res) => {
  try {
    const { RoundId } = req.params;

    // 🔹 ค้นหา AncService พร้อมข้อมูล Anc ที่เชื่อมโยง
    const service = await db.AncService.findOne({
      where: { id: RoundId },
      include: [
        {
          model: db.Anc,
          as: "AncNo",
        },
        {
          model: db.WifeChoiceValue,
          as: "wife_choice_value",
        },
        {
          model: db.WifeTextValue,
          as: "wife_text_value",
          include: [{ model: db.LabWifeResult, as: "lab_wife" }],
        },
        {
          model: db.HusbandValue,
          as: "husband_value",
          include: [{ model: db.LabHusbandResult, as: "lab_husband" }],
        },
      ],
    });

    if (!service) {
      return res.status(404).json({ error: "ไม่พบข้อมูลรอบบริการนี้" });
    }

    // 🔹 ดึง hn ภรรยา / สามี
    const hnWife = service.AncNo?.hn_wife;
    const hnHusband = service.AncNo?.hn_husband;
    const token = req.headers.authorization;
    // 🔹 ดึงข้อมูลผู้ป่วยจากอีกฐาน
    const [wife, husband] = await Promise.all([
      hnWife
        ? fetch(`http://localhost:3000/api/user/pat/${hnWife}`, {
            headers: {
              Authorization: token,
            },
          }).then((r) => (r.ok ? r.json() : null))
        : null,
      hnHusband
        ? fetch(`http://localhost:3000/api/user/pat/${hnHusband}`, {
            headers: {
              Authorization: token,
            },
          }).then((r) => (r.ok ? r.json() : null))
        : null,
    ]);

    // 🔹 สร้าง response ที่เรียกใช้ง่าย
    const result = {
      id: service.id,
      anc_no: service.AncNo?.anc_no || null,
      patvisit_id: service.patvisit_id || null,
      patreg_id: service.patreg_id || null,
      gravida: service.gravida || null,
      round: service.round,
      service_date: service.createdAt,

      // ข้อมูลผู้ป่วยจาก fetch
      wife,
      husband,

      // ข้อมูลจาก relation table
      wife_choice_value: service.wife_choice_value || null,
      wife_text_value: service.wife_text_value || null,
      husband_value: service.husband_value || null,
    };

    // ✅ ส่งออกข้อมูลแบบ clean
    return res.json(result);
  } catch (error) {
    console.error("❌ show_service_round_by_id error:", error);
    res.status(500).json({ error: error.message });
  }
};
