const db = require("../models");
const os = require("os");

function getLocalIPv4() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address; // คืนค่า LAN IP แรกที่เจอ
      }
    }
  }
  return "127.0.0.1"; // fallback
}

const logAction = async ({
  userId,
  action,
  entity,
  entityId,
  description,
  req,
}) => {
  try {
    let ip =
      req?.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req?.ip ||
      "127.0.0.1";

    // ถ้าเป็น loopback ให้ใช้ LAN IP ของเครื่อง
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = getLocalIPv4();
    }

    await db.UserLog.create({
      user_id: userId,
      action,
      entity,
      entity_id: entityId,
      description,
      ip_address: ip,
      user_agent: req?.headers["user-agent"] || "unknown",
    });

    console.log(`🟢 Log saved: ${action} by user ${userId} from IP ${ip}`);
  } catch (error) {
    console.error("Cannot log action:", error);
  }
};

module.exports = { logAction };
