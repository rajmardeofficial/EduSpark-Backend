const express = require("express");
const router = express.Router();
const {getTotalAttendance, getAttendanceOfParticularMonth} = require("../../controllers/Student/Attendance");
const { getAllSubjectOfStudent, getAllTestOfParticularSubjectOfParticularStudent } = require("../../controllers/Student/Test");
const {getAllDocumentsOfParticularStudent, sendRequestForDocument} = require("../../controllers/Student/DocumentRequest");

//for attendance
router.post("/getattendance/:studentId", getTotalAttendance);
router.post("/getattendanceofparticularmonth/:studentId", getAttendanceOfParticularMonth);

//for test
router.get("/getallsubjectofstudent/:roleType/:studentId",getAllSubjectOfStudent);
router.post("/getalltestofparticularsubject/:studentId",getAllTestOfParticularSubjectOfParticularStudent);

//for documents
router.get("/getalldocsofstudent/:roleType/:studentId",getAllDocumentsOfParticularStudent);
router.post("/sendrequestfordocs/:roleType/:studentId",sendRequestForDocument);



module.exports = router;