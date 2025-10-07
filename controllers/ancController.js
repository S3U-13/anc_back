const db = require("../models");
const { sequelize } = db;

exports.index = async (req, res) => {
    try {
        const ancList = await db.Anc.findAll(); // มาจาก DB A

        const dataWithPat = await Promise.all(
            ancList.map(async (anc) => {
                const wifeRes = await fetch(`http://localhost:3000/api/pat-anc-index/${anc.hn_wife}`);
                const wife = await wifeRes.json();

                const husbandRes = await fetch(`http://localhost:3000/api/pat-anc-index/${anc.hn_husband}`);
                const husband = await husbandRes.json();

                return {
                    ...anc.toJSON(),
                    wife,
                    husband,
                };
            })
        );

        res.json(dataWithPat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.pull_anc = async (req, res) => {
  try {
    const ancList = await db.Anc.findAll(); // มาจาก DB A

        const dataWithPat = await Promise.all(
            ancList.map(async (anc) => {
                const wifeRes = await fetch(`http://localhost:3000/api/pat/${anc.hn_wife}`);
                const wife = await wifeRes.json();

                const husbandRes = await fetch(`http://localhost:3000/api/pat/${anc.hn_husband}`);
                const husband = await husbandRes.json();

                return {
                    ...anc.toJSON(),
                    wife,
                    husband,
                };
            })
        );

        res.json(dataWithPat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create_anc = async (req, res) => {
    try {
        const {
            hn_wife,
            hn_husband,
        } = req.body
        const requiredFields = [
            "hn_wife",
            "hn_husband",
        ]
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }
        const anc = await db.Anc.create({
            hn_wife,
            hn_husband,
        });
        res.status(201).json({ message: "เพิ่มข้อมูลสำเร็จ", anc });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

