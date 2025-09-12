const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import models
db.User = require("./user")(sequelize, Sequelize.DataTypes);
db.Profile = require("./profile")(sequelize, Sequelize.DataTypes);
db.Role = require("./role")(sequelize, Sequelize.DataTypes);
db.Person = require("./person")(sequelize, Sequelize.DataTypes);

//associations
db.Person.belongsTO(db.User, { foreignKey: "user_id"});
db.Person.belongsTO(db.Profile, { foreignKey: "profile_id"});
db.Person.belongsTO(db.Role, { foreignKey: "role_id"});

db.User.hasOne(db.Person, { foreignKey: "user_id"});
db.Profile.hasOne(db.Person, { foreignKey: "profile_id"});
db.Role.hasMany(db.Person, { foreignKey: "role_id"});

module.exports = db;