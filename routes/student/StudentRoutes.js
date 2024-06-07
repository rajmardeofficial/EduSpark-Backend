const express = require("express");
const router = express.Router();
const {getTotalAttendance, getAttendanceOfParticularMonth} = require("../../controllers/Student/Attendance");
const { getAllSubjectOfStudent, getAllTestOfParticularSubjectOfParticularStudent } = require("../../controllers/Student/Test");
const {getAllDocumentsOfParticularStudent, sendRequestForDocument} = require("../../controllers/Student/DocumentRequest");
const { authenticate, authorizeStudent } = require("../../controllers/authController");

//for attendance
router.post("/getattendance", authenticate, authorizeStudent, getTotalAttendance);
router.post("/getattendanceofparticularmonth", authenticate, authorizeStudent, getAttendanceOfParticularMonth);

//for test
router.get("/getallsubjectofstudent/:roleType", authenticate, authorizeStudent, getAllSubjectOfStudent);
router.post("/getalltestofparticularsubject", getAllTestOfParticularSubjectOfParticularStudent);

//for documents
router.get("/getalldocsofstudent/:roleType",authenticate, authorizeStudent, getAllDocumentsOfParticularStudent);
router.post("/reqdocuments",authenticate, authorizeStudent,sendRequestForDocument);

module.exports = router;