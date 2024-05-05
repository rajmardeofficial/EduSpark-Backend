const express = require("express");
const addTeacher = require("../../controllers/Admin/addTeacher");
const addCollegeTeacher = require("../../controllers/Admin/addTeacher");
const {
  authenticate,
  authorizeAdmin,
} = require("../../controllers/authController");
const router = express.Router();

//Route to add teacher
router.post("/add-teacher/:roletype", authenticate, authorizeAdmin, addTeacher);

module.exports = router;
