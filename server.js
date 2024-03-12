const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/userModel/admin/AdminSchema");
const TeacherCollege = require("./models/userModel/teacher/teacherTypeModel/TeacherCollegeSchema");

const app = express();
dotenv.config();
app.use(express.json());

mongoose.connect(`mongodb://localhost:27017/Eduspark`, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(console.log("connected to the mongoDB"))
.catch((err) => console.log("Not Connected To The Network",err));


app.post("/save",async(req,res) => {
    console.log("hello");
    try {
        const admin = {
            firstName: 'John',
            middleName: "Raj",
            lastName: 'Doe',
            phone: 930234442,
            email: 'john.doe@example.com',
            password:"hidfo",
            gender:"Male",
            role: "Admin",
            roleType:"School",
            institute:"65f048dcee3c1db693547ab6",
            // Add other fields specific to StudentSchemaII here
            // educationalDetails: {
            //     course: 'CourseID', // Replace with the actual Course ID
            //     branch: 'BranchID', 
            //     class: 'ClassID', 
            // },
            // castCategory: 'abc',
            // parentPhone: 1234567890,
            // studentType: "College"
        };
        
        // Create an instance of CollegeStudent
        const adminInstance = new Admin(admin);
        
        // Save the data to the database
        const data = await adminInstance.save();
        console.log(data);
        res.status(200).send({data});
    } catch (error) {
        
        console.log(error)
    }
})

app.post("/saveschool",async(req,res) => {
    try {
        const schoolStudentData = {
            firstName: 'Keshav',
            middleName: "Raj",
            lastName: 'Doe',
            phone: 930234442,
            email: 'john.doe@example.com',
            password:"hidfo",
            gender:"Male",
            role: "Teacher",
            roleType: "College",
            institute:"65f048dcee3c1db693547ab6",
            // Add other fields specific to StudentSchemaII here
            // educationalDetails: {
            //     course: 'CourseID', // Replace with the actual Course ID
            //     branch: 'BranchID', 
            //     class: 'ClassID', 
            // },
            castCategory: 'abc',
            // parentPhone: 1234567890,
            // studentType: "College"
        };
        
        // Create an instance of CollegeStudent
        const schoolStudentInstance = new TeacherCollege(schoolStudentData);
        
        // Save the data to the database
        const data = await schoolStudentInstance.save()
        console.log(data);
        res.status(200).send({data});
    } catch (error) {
        
        console.log(error)
    }
})

app.listen(5000, () => {
  console.log("http://localhost:5000");
});