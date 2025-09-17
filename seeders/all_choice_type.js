const AllChoiceType = require("../models/all_choice_type"); // model ที่ import มา

async function seed() {
    await AllChoiceType.bulkCreate([
        { choice_type_name: "medication Allergy" },
        { choice_type_name: "high risk" },
        { choice_type_name: "amniocentesis" },
        { choice_type_name: "pcr" },
        { choice_type_name: "cordo" },
        { choice_type_name: "abortion" },
        { choice_type_name: "tdap" },
        { choice_type_name: "immunization in pregnancy" },
        { choice_type_name: "blood test interpretation" },
        { choice_type_name: "cbe" },
        { choice_type_name: "birads" },
        { choice_type_name: "per_os" },
        { choice_type_name: "antenatal care" },
        { choice_type_name: "ultrasound" },
        { choice_type_name: "ref choice" },
    ]);
    
    console.log("✅ AllChoiceType seeded with all_choice_type and AllChoice seeded with all_choice");
}

seed(); // ไม่ต้องส่ง parameter