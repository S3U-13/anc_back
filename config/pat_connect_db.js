const { Sequelize } = require("sequelize");
                                //db name  user name  password
const sequelize = new Sequelize("ppkhosp", "applog", "applog", {
  host: "10.10.20.101",
  port: 3308,
  dialect: "mysql"
});

module.exports = sequelize;