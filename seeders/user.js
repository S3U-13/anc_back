const User = require("../models/user"); // model ที่ import มา
const hashPassword = require("../utils/hashPassword");

async function seed() {
  await User.bulkCreate([   // ใช้ Test แทน User
    { name: "Nes", email: "nes@gmail.com", password: await hashPassword("12345678") },
  ]);

  console.log("✅ Users seeded with hashed passwords");
}

seed(); // ไม่ต้องส่ง parameter