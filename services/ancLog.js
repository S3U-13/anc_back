const db = require("../models");
const os = require("os");

const ancLog = async ({ AncNo, oldData, userId }) => {
  try {
    await db.AncLog.create({
      anc_no: AncNo,
      hn_wife: oldData.hn_wife,
      hn_husband: oldData.hn_husband,
      updated_by: userId,
      updated_at: new Date(),
    });

    console.log(`🟢 Anc log saved for ANC ${AncNo} by user ${userId}`);
  } catch (error) {
    console.error("❌ Cannot save ANC log:", error);
  }
};

module.exports = { ancLog };