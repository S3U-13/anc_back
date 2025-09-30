const db = require("../models");
const { sequelize } = db;

exports.anc_service = async (req, res) => {
  const anc_data = await db.AncService.findAll();
  res.json(anc_data);
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
      lab_wife_result_id,
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
      bti_date,
      cbe_value_1_id,
      cbe_value_2_id,
      cbe_value_3_id,
      cbe_value_4_id,
      birads_id,
      cbe_result,
      per_os_id,
      lab_husband_result_id,
      pcr_hus_id,
      pcr_hus_text,
      anc_id,
      usg_id,
      ref_in_id,
      ref_out_id,
      receive_in_id,
      hos_id,
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
      "lab_wife_result_id",
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
      "lab_husband_result_id",
      "pcr_hus_id",
      "pcr_hus_text",
      "anc_id",
      "usg_id",
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
      hos_id,
    });
    const ref_out_choice = await db.RefOutChoice.create({
      receive_out_id,
      hos_out_id,
    });
    const referral = await db.Referral.create({
      ref_in_id,
      ref_out_id,
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
      anc_id,
      usg_id,
      referral_id: referral.id,
      ref_in_choice_id: ref_in_choice.id,
      ref_out_choice_id: ref_out_choice.id,
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
      lab_wife_result_id,
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
      bti_date,
      cbe_result,
    });
    const husband_value = await db.HusbandValue.create({
      lab_husband_result_id,
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
      wife_text_value,
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
