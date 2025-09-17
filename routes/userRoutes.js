const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AllChoiceController = require("../controllers/allChoiceController");

//route
router.get("/user" , userController.index);
router.post("/addUser" , userController.addUser);
router.get("/mapAll" , AllChoiceController.mapAll);
router.get("/ChoiceValue" , AllChoiceController.ChoiceValue);

module.exports = router;