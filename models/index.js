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
db.BloodTestInterpretation = require("./blood_test_interpretation");
db.Cbe = require("./cbe");
db.RefInChoice = require("./ref_in_choice");
db.RefOutChoice = require("./ref_out_choice");
db.Referral = require("./referral");
db.WifeChoiceValue = require("./wife_choice_value");
db.WifeTextValue = require("./wife_text_value");
db.HusbandValue = require("./husband_value");
db.Anc = require("./anc");
db.AncService = require("./anc_service");
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


db.WifeChoiceValue.belongsTo(db.AllChoice, { foreignKey: "ma_id", as:"ma"});
db.WifeChoiceValue.belongsTo(db.AllChoice, { foreignKey: "hr_id", as:"hr"});
db.WifeChoiceValue.belongsTo(db.AllChoice, { foreignKey: "am_id", as:"am"});
db.WifeChoiceValue.belongsTo(db.AllChoice, { foreignKey: "pcr_wife_id", as:"pcr_wife"});
db.WifeChoiceValue.belongsTo(db.AllChoice, { foreignKey: "cordo_id", as:"cordo"});
db.WifeChoiceValue.belongsTo(db.AllChoice, { foreignKey: "abortion_id", as:"abortion"});
db.WifeChoiceValue.belongsTo(db.AllChoice, { foreignKey: "tdap_id", as:"tdap"});
db.WifeChoiceValue.belongsTo(db.AllChoice, { foreignKey: "iip_id", as:"iip"});

db.BloodTestInterpretation.belongsTo(db.AllChoice, { foreignKey: "bti_value_1_id", as:"bti_value_1"});
db.BloodTestInterpretation.belongsTo(db.AllChoice, { foreignKey: "bti_value_2_id", as:"bti_value_2"});
db.BloodTestInterpretation.belongsTo(db.AllChoice, { foreignKey: "bti_value_3_id", as:"bti_value_3"});
db.BloodTestInterpretation.belongsTo(db.AllChoice, { foreignKey: "bti_value_4_id", as:"bti_value_4"});
db.BloodTestInterpretation.belongsTo(db.AllChoice, { foreignKey: "bti_value_5_id", as:"bti_value_5"});
db.WifeChoiceValue.belongsTo(db.BloodTestInterpretation, { foreignKey: "bti_id", as:"bti"});

db.Cbe.belongsTo(db.AllChoice, { foreignKey: "cbe_value_1_id", as:"cbe_value_1"});
db.Cbe.belongsTo(db.AllChoice, { foreignKey: "cbe_value_2_id", as:"cbe_value_2"});
db.Cbe.belongsTo(db.AllChoice, { foreignKey: "cbe_value_3_id", as:"cbe_value_3"});
db.Cbe.belongsTo(db.AllChoice, { foreignKey: "cbe_value_4_id", as:"cbe_value_4"});
db.WifeChoiceValue.belongsTo(db.Cbe, { foreignKey: "cbe_id", as:"cbe"});

db.WifeChoiceValue.belongsTo(db.AllChoice, { foreignKey: "birads_id", as:"birads"});
db.WifeChoiceValue.belongsTo(db.AllChoice, { foreignKey: "per_os_id", as:"per_os"});
db.HusbandValue.belongsTo(db.AllChoice, { foreignKey: "pcr_hus_id", as:"pcr_hus"});
db.WifeChoiceValue.belongsTo(db.AllChoice, { foreignKey: "anc_id", as:"anc"});
db.WifeChoiceValue.belongsTo(db.AllChoice, { foreignKey: "usg_id", as:"usg"});
db.Referral.belongsTo(db.AllChoice, { foreignKey: "ref_in_id", as:"ref_in"});
db.Referral.belongsTo(db.AllChoice, { foreignKey: "ref_out_id", as:"ref_out"});
db.RefInChoice.belongsTo(db.AllChoice, { foreignKey: "receive_in_id", as: "receive_in" });
db.RefOutChoice.belongsTo(db.AllChoice, { foreignKey: "receive_out_id", as: "receive_out" });
db.WifeChoiceValue.belongsTo(db.RefInChoice, { foreignKey: "ref_in_choice_id", as: "ref_in_choice" });
db.WifeChoiceValue.belongsTo(db.RefOutChoice, { foreignKey: "ref_out_choice_id", as: "ref_out_choice" });
db.WifeChoiceValue.belongsTo(db.Referral, { foreignKey: "referral_id", as:"referral"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "ref_in_choice_id", as:"ref_in_choice"});
// db.ChoiceValue.belongsTo(db.AllChoice, { foreignKey: "ref_out_choice_id", as:"ref_out_choice"});

db.AncService.belongsTo(db.WifeChoiceValue, { foreignKey: "wife_choice_value_id", as:"wife_choice_value"});
db.AncService.belongsTo(db.WifeTextValue, { foreignKey: "wife_text_value_id", as:"wife_text_value"});
db.AncService.belongsTo(db.HusbandValue, { foreignKey: "husband_value_id", as:"husband_value"});

db.Role.hasMany(db.User, { foreignKey: "role_id"});
db.Position.hasMany(db.User, { foreignKey: "position_id"});
module.exports = db;
