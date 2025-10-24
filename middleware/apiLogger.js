// middleware/apiLogger.js
// const { logAction } = require("../services/logService");
const moment = require("moment-timezone");

function apiLogger(req, res, next) {
  // แสดง method + path
  const now = moment().tz("Asia/Bangkok").locale("th");

  // แปลงปี ค.ศ. → พ.ศ.
  const buddhistYear = now.year() + 543;
  const thaiDate = now.format(`D MMMM ${buddhistYear} HH:mm:ss`);

  const method = req.method;
  const path = req.originalUrl;
  const userId = req.user ? req.user.id : "guest";

  console.log(`➡️ ${method} ${path} (user: ${userId}) 🕒 [${thaiDate}]`);
  next();
}
module.exports = apiLogger;

// ถ้ามี user ก็ log action
// if (req.user) {
//   logAction({
//     userId: req.user.id,
//     action: `${req.method} ${req.originalUrl}`,
//     entity: "API",
//     entityId: null,
//     description: "เรียก API",
//     req,
//   });
// }
