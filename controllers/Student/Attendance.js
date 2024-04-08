const StudentCollege = require("../../models/userModel/student/studentTypeModel/StudentCollegeSchema");
const StudentJrCollege = require("../../models/userModel/student/studentTypeModel/StudentJrCollegeSchema");
const StudentSchool = require("../../models/userModel/student/studentTypeModel/StudentSchoolSchema");
const ObjectId = require('mongoose').Types.ObjectId;
const moment = require('moment');

const getTotalAttendance = async(req,res) => {
    try {
        const {roleType} = req.body;
        const studentId = req.params.studentId;
        console.log(roleType,studentId);
        let attendanceData
        if(roleType === "College"){
            attendanceData = (await StudentCollege.findById({_id: studentId}))?.attendance || [];
        }else if(roleType === "Jr College"){
            attendanceData = (await StudentJrCollege.findById({_id: studentId}))?.attendance || [];
        }else{
            attendanceData = (await StudentSchool.findById({_id: studentId}))?.attendance || [];
        }
        console.log(attendanceData);
        res.status(200).json(attendanceData);
    } catch (error) {
        console.error("Error getting all attendance of student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAttendanceOfParticularMonth = async (req, res) => {
    try {
        let studentId = req.params.studentId;
        let { roleType, subjectId, currentMonth, year } = req.body;
        studentId = new ObjectId(studentId);
        subjectId = new ObjectId(subjectId);

        //for attendanceData of inputedMonth
        currentMonth = currentMonth.toLowerCase();
        const startOfMonth = moment(currentMonth, "MMMM").startOf("month").year(year);
        const endOfMonth = moment(currentMonth, "MMMM").endOf("month").year(year);
        console.log(startOfMonth,endOfMonth);

        //for attendanceData of inputedMonth-1;
        if(currentMonth === "january") {
            year = year -1;
        }
        const prevStartOfMonth = moment(currentMonth, "MMMM").subtract(1, 'month').startOf('month').year(year);
        const prevEndOfMonth = moment(currentMonth, "MMMM").subtract(1, 'month').endOf('month').year(year);
        console.log(prevStartOfMonth,prevEndOfMonth,year);

        const collection = roleType === "College" ? StudentCollege :
        roleType === "Jr College" ? StudentJrCollege :
        StudentSchool;

        const matchStage = { $match: { _id: studentId } };
        const unwindStage = { $unwind: "$attendance" };
        const subjectMatchStage = { $match: { "attendance.subject": subjectId } };
        const dateMatchStage = {
            $match: {
                "attendance.date": {
                    $gte: startOfMonth.toDate(),
                    $lte: endOfMonth.toDate()
                }
            }
        };
        const groupStage = { $group: { _id: "$_id", attendance: { $push: "$attendance" } } };

        const pipeline = roleType === "College" || roleType === "Jr College" ?
            [matchStage, unwindStage, subjectMatchStage, dateMatchStage, groupStage] :
            [matchStage, unwindStage, dateMatchStage, groupStage];

        // for previous month
        const prevDateMatchStage = {
            $match: {
                "attendance.date": {
                    $gte: prevStartOfMonth.toDate(),
                    $lte: prevEndOfMonth.toDate()
                }
            }
        };    
        const prevPipeline = roleType === "College" || roleType === "Jr College" ?
            [matchStage, unwindStage, subjectMatchStage, prevDateMatchStage, groupStage] :
            [matchStage, unwindStage, prevDateMatchStage, groupStage];

        const attendanceData = await collection.aggregate(pipeline);
        const prevAttendanceData = await collection.aggregate(prevPipeline);

        res.status(200).json({"currentMonthAttendance":attendanceData,"previousMonthAttendance":prevAttendanceData});
    } catch (error) {
        console.error("Error getting attendance data for a particular month:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {getTotalAttendance,getAttendanceOfParticularMonth};