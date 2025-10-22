// connect mysql db for models
const { Sequelize } = require("sequelize");
//db name  user name  password
const sequelize = new Sequelize("project_anc", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false, // ปิด SQL query log
});

module.exports = sequelize;
