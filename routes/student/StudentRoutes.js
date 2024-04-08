const express = require("express");
const router = express.Router();
const {getTotalAttendance, getAttendanceOfParticularMonth} = require("../../controllers/Student/Attendance");
const { getAllSubjectOfStudent, getAllTestOfParticularSubjectOfParticularStudent } = require("../../controllers/Student/Test");

//for attendance
router.post("/getattendance/:studentId", getTotalAttendance);
router.post("/getattendanceofparticularmonth/:studentId", getAttendanceOfParticularMonth);
//for test
router.post("/getallsubjectofstudent",getAllSubjectOfStudent);
router.post("/getalltestofparticularsubject/:studentId",getAllTestOfParticularSubjectOfParticularStudent);


module.exports = router;