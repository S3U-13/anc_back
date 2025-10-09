const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AllChoiceController = require("../controllers/allChoiceController");
const ancController = require("../controllers/ancController");
const ancserviceController = require("../controllers/ancserviceController");
const patController = require("../controllers/patController");

//route
router.get("/position" , userController.position);
router.get("/role" , userController.role);
router.get("/user" , userController.index);
router.post("/addUser" , userController.addUser);
router.get("/mapAll" , AllChoiceController.mapAll);
router.get("/ChoiceValue" , AllChoiceController.ChoiceValue);
router.get("/anc" , ancController.index);
router.post("/anc" , ancController.create_anc);
router.get("/coveragesite" , ancserviceController.coverage_site);
router.get("/ancservice" , ancserviceController.anc_service);
router.post("/ancservice" , ancserviceController.create);
router.get("/pull-anc" , ancController.pull_anc);
router.get("/pat/:value", patController.pat);
router.get("/pat-anc-index/:value", patController.pat_anc_index);
router.get("/pat-anc-service-index/:value", patController.pat_anc_service_index);

router.get("/show-service-by-id/:RoundId", ancserviceController.show_service_round_by_id)
// router.get("/PatReg/:value", patController.pat_reg);


module.exports = router;