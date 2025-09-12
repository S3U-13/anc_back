const db = require("../models");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res) => {
    try {
        const {
            name,
            user_name,
            password,
            role_id
        } = req.body;
        //เช็คข้อมูล
        if (!name || !user_name || !password || !role_id) {
            return res.status(400), json({ error: "name, user_name, password, role_id required" });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // สร้าง user
        const user = await db.User.create({
            name,
            user_name,
            password,
            role_id,
        });
        res.status(201).json({ message: "User create successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}
