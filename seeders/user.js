const User = require("../models/user"); // model ที่ import มา
const hashPassword = require("../utils/hashPassword");

async function seed() {
  await User.bulkCreate([   
    {
      name: "นาย ปุญฤทธิ์ กวางทอง",
      user_name: "nes_admin01",
      password: await hashPassword("0615386694"),
      role_id: 2,
      position_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "นาย ปุญฤทธิ์ กวางทอง",
      user_name: "nes_user01",
      password: await hashPassword("0615386694"),
      role_id: 1,
      position_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log("✅ Users seeded with hashed passwords");
}

seed(); // ไม่ต้องส่ง parameter