// connect mysql db for models 
const { Sequelize } = require("sequelize");
                                //db name  user name  password
const sequelize = new Sequelize("my_project", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql"
});

module.exports = sequelize;