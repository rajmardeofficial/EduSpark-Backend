const mongoose = require("mongoose");
const StudentCollege = require("../../models/userModel/student/studentTypeModel/StudentCollegeSchema");
const StudentJrCollege = require("../../models/userModel/student/studentTypeModel/StudentJrCollegeSchema");
const StudentSchool = require("../../models/userModel/student/studentTypeModel/StudentSchoolSchema");
const Test = require("../../models/testModel/testSchema");
const Subject = require("../../models/subjectModel/subjectSchema");
const ObjectId = require("mongoose").Types.ObjectId;

// get all subject of particular student
// get all tests of subject(which is displayed through testName in frontend)
// store some analysis data

const getAllSubjectOfStudent = async(req,res) => {
    try {
    let {roleType} = req.params;
    let studentId = req?.user?.id;
    
    const collection = roleType === "College" ? StudentCollege :
        roleType === "Jr College" ? StudentJrCollege :
        StudentSchool;

    const studentData = await collection.findById(studentId).select("educationalDetails institute");
    
    let subjects;

    if(roleType === "College"){
        subjects = await Subject.find({
            $and: [
                { institute: studentData?.institute },
                { course: studentData?.educationalDetails?.course },
                { class: studentData?.educationalDetails?.class },
                { branch: studentData?.educationalDetails?.branch },
                { semester: studentData?.educationalDetails?.semester }
            ]
        }).select('name');
    } else if (roleType === "Jr College"){
        subjects = await Subject.find({
            $and: [
                { institute: studentData?.institute },
                { course: studentData?.educationalDetails?.course },
                { class: studentData?.educationalDetails?.class },
                { branch: studentData?.educationalDetails?.branch },
            ]
        }).select('name');
    } else{
        subjects = await Subject.find({
            $and: [
                { institute: studentData?.institute },
                { class: studentData?.educationalDetails?.class },
            ]
        }).select('name');
    }

    res.status(200).json(subjects)
    } catch (error) {
        console.log("error while fetching test subject of student");
        res.status(500).json({message:"Internal server error"});
    }
}

const getAllTestOfParticularSubjectOfParticularStudent = async (req, res) => {
    try {
        const studentId = req?.user?.id;;
        const { roleType, subjectId } = req.body;
        console.log(studentId,roleType,subjectId);

        let testData;

        const collection = roleType === "College" ? StudentCollege :
        roleType === "Jr College" ? StudentJrCollege :
        StudentSchool;


        testData = await collection.findById(studentId)
                .populate({
                    path: "examResult.test",
                    match: { subject: subjectId },
                    select: "test totalMarks testName questionPaper answerKey questionPaper",
                })
                .select("examResult");
        
        if (!testData) {
            return res.status(404).json({ message: "No test data found" });
        }       
        testData.examResult = testData?.examResult?.filter(item => item?.test);
        res.status(200).json(testData);
    } catch (error) {
        console.error("Error while fetching tests of subject:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// store some analysis data
const store = async(req,res) => {
    try {
        const {someData} = req.params;
        console.log(someData);
    } catch (error) {
        console.error("Error while fetching all data of particular test", error);
        res.status(500).json({ message: "Internal server error" }); 
    }
}

module.exports = {getAllSubjectOfStudent,getAllTestOfParticularSubjectOfParticularStudent};