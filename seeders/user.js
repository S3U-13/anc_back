<<<<<<< HEAD
const User = require("../models/user"); // model ที่ import มา
const hashPassword = require("../utils/hashPassword");

async function seed() {
  await User.bulkCreate([   // ใช้ Test แทน User
    { name: "Nes", email: "nes@gmail.com", password: await hashPassword("12345678") },
  ]);

  console.log("✅ Users seeded with hashed passwords");
}

=======
const User = require("../models/user"); // model ที่ import มา
const hashPassword = require("../utils/hashPassword");

async function seed() {
  await User.bulkCreate([   
    {
      name: "นาย ปุญฤทธิ์ กวางทอง",
      user_name: "punyarit",
      password: await hashPassword("12345678"),
      role_id: 1,
      position_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log("✅ Users seeded with hashed passwords");
}

>>>>>>> bb38b62 (choice and user)
seed(); // ไม่ต้องส่ง parameter