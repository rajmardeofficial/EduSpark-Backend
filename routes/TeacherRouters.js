const express = require("express");
const router = express.Router();
const {
  addCollegeTeacher,
  CollegeTeacherAttendance,
  CollegeTeacherNotice,
  CollegeTeacherNotes,
  CollegeTeacherTeaching,
} = require("../controllers/Teacher/addAttendance");

// Route to add a new college teacher
router.post("/add", addCollegeTeacher);

// Route to handle attendance
router.post("/attendances/:id", CollegeTeacherAttendance);

// Route to handle notice
router.post("/notices/:id", CollegeTeacherNotice);

// Route to handle notes
router.post("/notes/:id", CollegeTeacherNotes);

// Route to add teaching details for a college teacher
router.post("/teaching/:id", CollegeTeacherTeaching);

module.exports = router;
