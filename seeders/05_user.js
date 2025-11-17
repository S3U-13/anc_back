require("dotenv").config(); // ต้องมีเพื่ออ่าน .env
const User = require("../models/user"); // model ที่ import มา
const hashPassword = require("../utils/hashPassword");

async function seed() {
  await User.bulkCreate([
    {
      name: "นาย ปุญฤทธิ์ กวางทอง",
      user_name: process.env.ADMIN_USER_NAME,
      password: await hashPassword(process.env.ADMIN_PASSWORD), // hash ตอน seed
      role_id: parseInt(process.env.ADMIN_ROLE_ID),
      position_id: parseInt(process.env.ADMIN_POSITION_ID),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log("✅ Users seeded with hashed passwords");
}

seed(); // ไม่ต้องส่ง parameter
