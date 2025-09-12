const Role = require("../models/role"); // model ที่ import มา

async function seed() {
  await Role.bulkCreate([   // ใช้ Test แทน User
    { role_name: "user" },
    { role_name: "admin" },
    { role_name: "super_admin" },
  ]);

  console.log("✅ Users seeded with hashed passwords");
}

seed(); // ไม่ต้องส่ง parameter