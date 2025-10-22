// middleware/apiLogger.js
const { logAction } = require("../services/logService");

function apiLogger(req, res, next) {
  // แสดง method + path
  console.log(`➡️ ${req.method} ${req.originalUrl}`);

  // ถ้ามี user ก็ log action
  if (req.user) {
    logAction({
      userId: req.user.id,
      action: `${req.method} ${req.originalUrl}`,
      entity: "API",
      entityId: null,
      description: "เรียก API",
      req,
    });
  }

  next();
}

module.exports = apiLogger;
