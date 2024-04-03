const express = require("express");
const router = express.Router();
const {
  CollegeTeacherAttendance,
  CollegeTeacherNotice,
  CollegeTeacherNotes,
} = require("../controllers/Teacher/addAttendance");
const {
  CollegeTeacherTeaching,
} = require("../controllers/Admin/TeacherTeaching");

// Route to handle attendance
router.post("/attendances/:id", CollegeTeacherAttendance);

// Route to handle notice
router.post("/notices/:id", CollegeTeacherNotice);

// Route to handle notes
router.post("/notes/:id", CollegeTeacherNotes);

// Route to add teaching details for a college teacher
router.post("/teaching/:id", CollegeTeacherTeaching);

module.exports = router;
