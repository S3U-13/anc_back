// app.js
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
