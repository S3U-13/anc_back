const Role = require("../models/role"); // model ที่ import มา
async function seed() {
  await Role.bulkCreate([   
    { role_name: "user" },
    { role_name: "admin" },
    { role_name: "super_admin" },
  ]);

  console.log("✅ Roles seeded with role");
}

seed(); // ไม่ต้องส่ง parameter