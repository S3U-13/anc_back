const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));