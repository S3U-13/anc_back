const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AllChoiceController = require("../controllers/allChoiceController");
const ancController = require("../controllers/ancController");

//route
router.get("/user" , userController.index);
router.post("/addUser" , userController.addUser);
router.get("/mapAll" , AllChoiceController.mapAll);
router.get("/ChoiceValue" , AllChoiceController.ChoiceValue);
router.get("/anc" , ancController.index);
router.post("/anc" , ancController.create);


module.exports = router;