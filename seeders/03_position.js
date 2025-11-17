const Position = require("../models/position");

async function seed() {
    await Position.bulkCreate(
        [
            { position_name: "พนักงานทั่วไป" },
            { position_name: "รองหัวหน้า" },
            { position_name: "หัวหน้า" },
        ]
    );
     console.log("✅ Positions seeded with position");
}
seed(); // ไม่ต้องส่ง parameter