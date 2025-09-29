const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import models
db.User = require("./user");
db.Role = require("./role");
db.Position = require("./position");
db.AllChoiceType = require("./all_choice_type");
db.AllChoice = require("./all_choice");
// db.ChoiceValue = require("./choice_value");
// db.BloodTestInterpretation = require("./blood_test_interpretation");
// db.Cbe = require("./cbe");
// db.Referral = require("./referral");
// db.TextValueWife = require("./text_value_wife");
// db.TextValueHusband = require("./text_value_husband");
db.Anc = require("./anc");
db.Pat = require("./pat");
db.Occupation = require("./occupation");
db.PatAddress = require("./pataddress");
db.Address = require("./address");
db.PatVitalSign = require("./pat_vitalsign");
db.PatReg = require("./pat_reg");
db.Location = require("./location");
db.PatVisit = require("./pat_visit");

//associations
db.User.belongsTo(db.Role, { foreignKey: "role_id" });
db.User.belongsTo(db.Position, { foreignKey: "position_id" });

db.AllChoice.belongsTo(db.AllChoiceType, { foreignKey: "choice_type_id" });

// 📌 Pat ↔ PatAddress (1:1)
db.Pat.hasOne(db.PatAddress, { foreignKey: "hn", as: "pat_address" });
db.PatAddress.belongsTo(db.Pat, { foreignKey: "hn", as: "pat_address" });
// pat -> occupation
db.Pat.belongsTo(db.Occupation, {
  foreignKey: "occupation",
  targetKey: "lookupid",
  as: "occupation_detail",
});

// Province
db.PatAddress.belongsTo(db.Address, {
  foreignKey: "province",
  targetKey: "addresscode",
  as: "province_detail",
});

// Amphur
db.PatAddress.belongsTo(db.Address, {
  foreignKey: "amphur",
  targetKey: "addresscode",
  as: "amphur_detail",
});

// Tambon
db.PatAddress.belongsTo(db.Address, {
  foreignKey: "tambon",
  targetKey: "addresscode",
  as: "tambon_detail",
});

// 📌 Pat ↔ PatVitalSign (1:N)
db.Pat.hasMany(db.PatVitalSign, { foreignKey: "hn", as: "pat_vitalsign" });
db.PatVitalSign.belongsTo(db.Pat, { foreignKey: "hn", as: "pat_vitalsign" });

// pat_reg & pat_visit -> pat 
db.Pat.hasMany(db.PatReg, { foreignKey: "hn",  as: "pat_reg"});
db.Pat.hasMany(db.PatVisit, { foreignKey: "hn",  as: "pat_visit"});
db.PatReg.belongsTo(db.PatVisit, { foreignKey: "patvisitid", as: "PatVisit" });
// location -> pat_reg
db.PatReg.belongsTo(db.Location, { foreignKey: "locationid", as: "Location" });


// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "ma_id", as:"ma"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "hr_id", as:"hr"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "am_id", as:"am"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "pcr_wife_id", as:"pcr_wife"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "cordo_id", as:"cordo"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "abortion_id", as:"abortion"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "tdap_id", as:"tdap"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "iip_id", as:"iip"});
// db.BloodTestInterpretation.belongsTo(db.AllChoice, { foreignKey: "bti_value_1_id", as:"bti_value_1"});
// db.BloodTestInterpretation.belongsTo(db.AllChoice, { foreignKey: "bti_value_2_id", as:"bti_value_2"});
// db.BloodTestInterpretation.belongsTo(db.AllChoice, { foreignKey: "bti_value_3_id", as:"bti_value_3"});
// db.BloodTestInterpretation.belongsTo(db.AllChoice, { foreignKey: "bti_value_4_id", as:"bti_value_4"});
// db.BloodTestInterpretation.belongsTo(db.AllChoice, { foreignKey: "bti_value_5_id", as:"bti_value_5"});
// db.ChoiceValue.belongsTo(db.BloodTestInterpretation, { foreignKey: "bti_id", as:"bti"});
// db.Cbe.belongsTo(db.AllChoice, { foreignKey: "cbe_value_1_id", as:"cbe_value_1"});
// db.Cbe.belongsTo(db.AllChoice, { foreignKey: "cbe_value_2_id", as:"cbe_value_2"});
// db.Cbe.belongsTo(db.AllChoice, { foreignKey: "cbe_value_3_id", as:"cbe_value_3"});
// db.Cbe.belongsTo(db.AllChoice, { foreignKey: "cbe_value_4_id", as:"cbe_value_4"});
// db.ChoiceValue.belongsTo(db.Cbe, { foreignKey: "cbe_id", as:"cbe"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "birads_id", as:"birads"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "per_os_id", as:"per_os"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "pcr_hus_id", as:"pcr_hus"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "anc_id", as:"anc"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "usg_id", as:"usg"});
// db.Referral.belongsTo(db.AllChoice, { foreignKey: "ref_in_id", as:"ref_in"});
// db.Referral.belongsTo(db.AllChoice, { foreignKey: "ref_out_id", as:"ref_out"});
// db.ChoiceValue.belongsTo(db.Referral, { foreignKey: "referral_id", as:"referral"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "ref_in_choice_id", as:"ref_in_choice"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "ref_out_choice_id", as:"ref_out_choice"});
// db.Anc.belongsTo(db.ChoiceValue, { foreignKey: "choice_value_id", as:"choice_value"});
// db.Anc.belongsTo(db.TextValueWife, { foreignKey: "text_value_wife_id", as:"text_value_wife"});
// db.Anc.belongsTo(db.TextValueHusband, { foreignKey: "text_value_husband_id", as:"text_value_husband"});

// db.Role.hasMany(db.User, { foreignKey: "role_id"});
// db.Position.hasMany(db.User, { foreignKey: "position_id"});
module.exports = db;
