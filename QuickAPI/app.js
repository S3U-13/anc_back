const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Import routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));