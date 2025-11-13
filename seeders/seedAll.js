const fs = require("fs");
const path = require("path");

async function seedAll() {
  const seedersDir = __dirname; // ใช้โฟลเดอร์ปัจจุบัน

  // อ่านไฟล์ทั้งหมดใน seeders
  const files = fs
    .readdirSync(seedersDir)
    .filter((file) => file.endsWith(".js"));

  for (const file of files) {
    const filePath = path.join(seedersDir, file);
    const seeder = require(filePath);

    if (typeof seeder.seed === "function") {
      console.log(`🟢 Running seeder: ${file}`);
      await seeder.seed();
    } else {
      console.log(`⚠️ Skipping ${file}: no seed function`);
    }
  }

  console.log("✅ All seeders executed");
}

seedAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
