const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AllChoiceController = require("../controllers/allChoiceController");
const ancController = require("../controllers/ancController");
const patController = require("../controllers/patController");

//route
router.get("/user" , userController.index);
router.post("/addUser" , userController.addUser);
router.get("/mapAll" , AllChoiceController.mapAll);
router.get("/ChoiceValue" , AllChoiceController.ChoiceValue);
router.get("/anc" , ancController.index);
router.post("/anc" , ancController.create_anc);
router.get("/pat/:value", patController.pat);
// router.get("/PatReg/:value", patController.pat_reg);


module.exports = router;