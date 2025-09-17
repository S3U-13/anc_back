const User = require("../models/user");

exports.index = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.store = async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
};

