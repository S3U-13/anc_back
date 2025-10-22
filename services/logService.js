const db = require("../models.js");

const logAction = async ({
  userId,
  action,
  entity,
  entityId,
  description,
  req,
}) => {
  try {
    await db.UserLog.create({
      user_id: userId,
      action,
      entity,
      entity_id: entityId,
      description,
      ip_address: req?.ip || req?.headers["x-forwarded-for"] || "unknown",
      user_agent: req?.headers["user-agent"] || "unknown",
    });
  } catch (error) {
    console.error("Cannot log action:", error);
  }
};

module.exports = { logAction };