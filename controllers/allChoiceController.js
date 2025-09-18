const db = require("../models");

exports.mapAll = async (req, res) => {
    const all_choice = await db.AllChoice.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            { model: db.AllChoiceType, attributes: ["choice_type_name"] },
        ],
    });
    res.json(all_choice);
}
exports.ChoiceValue = async (req, res) => {
    const choice_value = await db.ChoiceValue.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            { model: db.AllChoice, as: "ma", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "hr", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "am", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "pcr_wife", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "cordo", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "abortion", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "tdap", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "iip", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "pcr_hus", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "birads", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "per_os", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "anc", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "usg", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "ref_in_choice", attributes: ["choice_name"] },
            { model: db.AllChoice, as: "ref_out_choice", attributes: ["choice_name"] },
            {
                model: db.BloodTestInterpretation, as: "bti", attributes: ["value_1_id", "value_2_id", "value_3_id", "value_4_id", "value_5_id"], include: [
                    { model: db.AllChoice, as: "bti_value_1", attributes: ["choice_name"] },
                    { model: db.AllChoice, as: "bti_value_2", attributes: ["choice_name"] },
                    { model: db.AllChoice, as: "bti_value_3", attributes: ["choice_name"] },
                    { model: db.AllChoice, as: "bti_value_4", attributes: ["choice_name"] },
                    { model: db.AllChoice, as: "bti_value_5", attributes: ["choice_name"] },
                ]
            },
            {
                model: db.Cbe, as: "cbe", attributes: ["value_1_id", "value_2_id", "value_3_id", "value_4_id"],
                include: [
                    { model: db.AllChoice, as: "cbe_value_1", attributes: ["choice_name"] },
                    { model: db.AllChoice, as: "cbe_value_2", attributes: ["choice_name"] },
                    { model: db.AllChoice, as: "cbe_value_3", attributes: ["choice_name"] },
                    { model: db.AllChoice, as: "cbe_value_4", attributes: ["choice_name"] },
                ],
            },
            {
                model: db.Referral,
                as: "referral",
                attributes: ["ref_in_id", "ref_out_id"],
                include: [
                    { model: db.AllChoice, as: "ref_in", attributes: ["choice_name"] },
                    { model: db.AllChoice, as: "ref_out", attributes: ["choice_name"] }
                ]
            },
        ],
    });
    // const result = choice_value.map(item => {
    //     const plain = item.get({ plain: true });

    //     // loop ผ่าน key ที่เป็น relation
    //     [
    //         "ma", "hr", "am", "pcr_wife", "cordo", "abortion",
    //         "tdap", "iip", "pcr_hus", "birads", "per_os",
    //         "anc", "usg", "ref_in_choice", "ref_out_choice"
    //     ].forEach(key => {
    //         if (plain[key]) {
    //             plain[key] = plain[key].choice_name; // เอาเฉพาะ string
    //         } else {
    //             plain[key] = null; // ถ้าไม่มีค่า
    //         }
    //     });

    //     return plain;
    // });

    res.json(choice_value);

}
