const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeControllers");
const internControllers = require("../controllers/internControllers");

//POST APIS TO CREATE COLLEGE AND INTERNS
router.post("/functionup/colleges", collegeController.createCollege);
router.post("/functionup/interns", internControllers.createInterns);

//GET API TO FETCH THE COLLEGE DETAILS
router.get("/functionup/collegeDetails", collegeController.getCollege);

module.exports = router;
