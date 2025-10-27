require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORTAPP;
const HOST = "0.0.0.0"; // เปิดให้ทุก interface เข้าถึงได้

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Server accessible at http://<YOUR_LOCAL_IP>:${PORT}`);
});
