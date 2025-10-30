const cron = require("node-cron");
const db = require("../models");

const deleteOldLogs = async () => {
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const deleted = await db.UserLog.destroy({
      where: {
        createdAt: { [db.Sequelize.Op.lt]: threeMonthsAgo },
      },
    });

    console.log(`🗑️ Deleted ${deleted} logs older than 3 months`);
  } catch (err) {
    console.error("Cannot delete old logs:", err);
  }
};

// รันทุกวันตอนเที่ยงคืน
cron.schedule("0 0 * * *", deleteOldLogs);

module.exports = { deleteOldLogs };
