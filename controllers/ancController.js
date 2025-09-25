const db = require("../models");
const { sequelize } = db;

exports.index = async (req, res) => {
    try {
        const ancList = await db.Anc.findAll(); // มาจาก DB A

        const dataWithPat = await Promise.all(
            ancList.map(async (anc) => {
                const wifeRes = await fetch(`http://localhost:3000/api/pat/${anc.hn_wife}`);
                const wife = await wifeRes.json();

                const husbandRes = await fetch(`http://localhost:3000/api/pat/${anc.hn_husband}`);
                const husband = await husbandRes.json();

                return {
                    ...anc.toJSON(),
                    wife,
                    husband,
                };
            })
        );

        res.json(dataWithPat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.create_anc = async (req, res) => {
    try {
        const {
            hn_wife,
            hn_husband,
        } = req.body
        const requiredFields = [
            "hn_wife",
            "hn_husband",
        ]
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }
        const anc = await db.Anc.create({
            hn_wife,
            hn_husband,
        });
        res.status(201).json({ message: "เพิ่มข้อมูลสำเร็จ", anc });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// exports.create = async (req, res) => {
//     const t = await sequelize.transaction(); // เริ่ม transaction
//     try {
//         const {
//             hn,
//             patvisit_id,
//             patreg_id,
//             para,
//             g,
//             p,
//             a,
//             last,
//             lmp,
//             ma_id,
//             da_text,
//             hr_id,
//             hr_text,
//             am_id,
//             gct_1,
//             gct_2,
//             hbsag,
//             vdrl_1,
//             anti_hiv,
//             bl_gr,
//             rh,
//             hct,
//             of,
//             dcip,
//             mcv,
//             mch,
//             hb_typing,
//             pcr_wife_id,
//             pcr_text,
//             cordo_id,
//             cordo_text,
//             cordo_other_text,
//             abortion_id,
//             td_num,
//             td_last_date,
//             tdap_id,
//             tdap_round_1,
//             tdap_round_2,
//             tdap_round_3,
//             iip_id,
//             iip_date,
//             lab_2,
//             vdrl_2,
//             h,
//             bti_value_1_id,
//             bti_value_2_id,
//             bti_value_3_id,
//             bti_value_4_id,
//             bti_value_5_id,
//             bti_date,
//             cbe_value_1_id,
//             cbe_value_2_id,
//             cbe_value_3_id,
//             cbe_value_4_id,
//             birads_id,
//             cbe_result,
//             per_os_id,
//             husband_name,
//             husband_age,
//             husband_id_card,
//             husband_hn,
//             husband_tel,
//             husband_job,
//             hbsag_husband,
//             vdrl_husband,
//             anti_hiv_husband,
//             bl_gr_husband,
//             rh_husband,
//             hct_husband,
//             of_husband,
//             dcip_husband,
//             mcv_husband,
//             mch_husband,
//             hb_typing_husband,
//             pcr_hus_husband,
//             pcr_hus_id,
//             anc_id,
//             usg_id,
//             ref_in_id,
//             ref_out_id,
//             ref_in_choice_id,
//             ref_out_choice_id,
//             hos_name,
//         } = req.body
//         const requiredFields = [
//             "hn", "patvisit_id", "para", "g", "p", "a", "last", "ma_id",
//             "hr_id", "am_id", "gct_1", "gct_2", "hbsag", "vdrl_1", "anti_hiv",
//             "bl_gr", "rh", "hct", "of", "dcip", "mcv", "mch", "hb_typing",
//             "pcr_wife_id", "cordo_id", "abortion_id", "td_num", "td_last_date",
//             "tdap_id", "iip_id", "lab_2", "vdrl_2", "h", "per_os_id",
//             "husband_name", "husband_age", "husband_id_card", "husband_hn",
//             "husband_tel", "husband_job", "hbsag_husband", "vdrl_husband",
//             "anti_hiv_husband", "bl_gr_husband", "rh_husband", "hct_husband",
//             "of_husband", "dcip_husband", "mcv_husband", "mch_husband",
//             "hb_typing_husband", "pcr_hus_husband", "pcr_hus_id", "anc_id",
//             "usg_id",
//         ];
//         for (const field of requiredFields) {
//             if (!req.body[field]) {
//                 return res.status(400).json({ error: `${field} is required` });
//             }
//         }
//         const blood_test_interpretation = await db.BloodTestInterpretation.create({
//             bti_value_1_id,
//             bti_value_2_id,
//             bti_value_3_id,
//             bti_value_4_id,
//             bti_value_5_id,
//         });
//         const cbe = await db.Cbe.create({
//             cbe_value_1_id,
//             cbe_value_2_id,
//             cbe_value_3_id,
//             cbe_value_4_id,
//         });
//         const referral = await db.Referral.create({
//             ref_in_id,
//             ref_out_id,
//         });
//         const choice_value = await db.ChoiceValue.create({
//             ma_id,
//             hr_id,
//             am_id,
//             pcr_wife_id,
//             cordo_id,
//             abortion_id,
//             tdap_id,
//             iip_id,
//             bti_id: blood_test_interpretation.id,
//             cbe_id: cbe.id,
//             birads_id,
//             per_os_id,
//             pcr_hus_id,
//             anc_id,
//             usg_id,
//             referral_id: referral.id,
//             ref_in_choice_id,
//             ref_out_choice_id,
//         });
//         const text_value_wife = await db.TextValueWife.create({
//             da_text,
//             hr_text,
//             gct_1,
//             gct_2,
//             hbsag,
//             vdrl_1,
//             anti_hiv,
//             bl_gr,
//             rh,
//             hct,
//             of,
//             dcip,
//             mcv,
//             mch,
//             hb_typing,
//             pcr_text,
//             cordo_text,
//             cordo_other_text,
//             td_num,
//             td_last_date,
//             tdap_round_1,
//             tdap_round_2,
//             tdap_round_3,
//             iip_date,
//             lab_2,
//             vdrl_2,
//             h,
//             bti_date,
//             cbe_result,
//             hos_name,
//         });
//         const text_value_husband = await db.TextValueHusband.create({
//             husband_name,
//             husband_age,
//             husband_id_card,
//             husband_hn,
//             husband_tel,
//             husband_job,
//             hbsag_husband,
//             vdrl_husband,
//             anti_hiv_husband,
//             bl_gr_husband,
//             rh_husband,
//             hct_husband,
//             of_husband,
//             dcip_husband,
//             mcv_husband,
//             mch_husband,
//             hb_typing_husband,
//             pcr_hus_husband,
//         });
//         const anc = await db.Anc.create({
//             hn,
//             patvisit_id,
//             patreg_id,
//             para,
//             g,
//             p,
//             a,
//             last,
//             lmp,
//             choice_value_id: choice_value.id,
//             text_value_wife_id: text_value_wife.id,
//             text_value_husband_id: text_value_husband.id
//         });
//         await t.commit();
//         res.status(201).json({ message: "เพิ่มข้อมูลสำเร็จ", blood_test_interpretation, cbe, referral, choice_value, text_value_wife, text_value_husband, anc });
//     } catch (error) {
//         try { await t.rollback(); } catch (e) { /* ignore */ }
//         return res.status(500).json({ message: error.message });
//     }
// };