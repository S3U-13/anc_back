// server.js
require("dotenv").config();
const app = require("./app");
require("./services/logCleanup");

const PORT = process.env.PORTAPP || 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Server accessible at http://<YOUR_LOCAL_IP>:${PORT}`);
});
