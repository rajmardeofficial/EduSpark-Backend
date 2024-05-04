const express = require("express");
const addTeacher = require("../../controllers/Admin/addTeacher");
const addCollegeTeacher = require("../../controllers/Admin/addTeacher");
const router = express.Router();


//Route to add teacher
router.post('/add-teacher/:roletype', addTeacher)


module.exports = router;
