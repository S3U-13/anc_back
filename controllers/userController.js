const db = require("../models");
const bcrypt = require("bcryptjs");

exports.position = async (req, res) => {
  try {
    const position = await db.Position.findAll();
    res.json(position);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.role = async (req, res) => {
  try {
    const role = await db.Role.findAll();
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.index = async (req, res) => {
  try {
    const users = await db.User.findAll({
      include: [
        { model: db.Role, attributes: ["role_name"] },
        { model: db.Position, attributes: ["position_name"] },
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.addUser = async (req, res) => {
  try {
    const {
      name,
      user_name,
      password,
      confirm_password,
      role_id,
      position_id,
    } = req.body;

    // ✅ 1. ตรวจว่ากรอกข้อมูลครบหรือไม่
    if (
      !name ||
      !user_name ||
      !password ||
      !confirm_password ||
      !role_id ||
      !position_id
    ) {
      return res.status(400).json({
        error:
          "กรุณากรอกข้อมูลให้ครบถ้วน (name, user_name, password, confirm_password, role_id, position_id)",
      });
    }

    // ✅ 2. ตรวจสอบรูปแบบ user_name
    const usernameRegex = /^[A-Za-z0-9]+$/;
    if (!usernameRegex.test(user_name)) {
      return res.status(400).json({
        error: "ชื่อผู้ใช้ต้องเป็นตัวอักษรภาษาอังกฤษหรือตัวเลขเท่านั้น",
      });
    }

    // ✅ 3. ตรวจสอบความยาวและรูปแบบ password
    const passwordRegex = /^[A-Za-z0-9]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษรและประกอบด้วยตัวเลขหรือตัวอักษรภาษาอังกฤษ",
      });
    }

    // ✅ 4. ตรวจสอบว่ารหัสผ่านตรงกับ confirm_password หรือไม่
    if (password !== confirm_password) {
      return res.status(400).json({
        error: "รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน",
      });
    }

    // ✅ 5. ตรวจสอบ user_name ซ้ำในฐานข้อมูล
    const existingUser = await db.User.findOne({ where: { user_name } });
    if (existingUser) {
      return res.status(400).json({ error: "ชื่อผู้ใช้นี้ถูกใช้แล้ว" });
    }

    // ✅ 6. เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 7. สร้างผู้ใช้ใหม่
    const user = await db.User.create({
      name,
      user_name,
      password: hashedPassword,
      role_id,
      position_id,
    });

    // ✅ 8. ตอบกลับเมื่อสำเร็จ
    res.status(201).json({
      message: "สร้างบัญชีผู้ใช้สำเร็จ",
      user: {
        id: user.id,
        name: user.name,
        user_name: user.user_name,
        role_id: user.role_id,
        position_id: user.position_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดบางอย่างในระบบ" });
  }
};
