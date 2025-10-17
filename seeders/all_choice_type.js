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
        { choice_type_name: "refer" },
        { choice_type_name: "ref choice" },
        { choice_type_name: "lab HbsAg choice" },
        { choice_type_name: "lab VDRL choice" },
        { choice_type_name: "lab Anti-HIV choice" },
        { choice_type_name: "lab Bl.gr choice" },
        { choice_type_name: "lab Rh choice" },
        { choice_type_name: "lab DCIP choice" },
    ]);
    
    console.log("✅ AllChoiceType seeded with all_choice_type and AllChoice seeded with all_choice_type");
}

seed(); // ไม่ต้องส่ง parameter