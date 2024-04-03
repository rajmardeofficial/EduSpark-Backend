const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/userModel/admin/AdminSchema");
const TeacherCollege = require("./models/userModel/teacher/teacherTypeModel/TeacherCollegeSchema");
const instituteSchema = require("./models/instituteModel/instituteSchema");
const StudentCollege = require("./models/userModel/student/studentTypeModel/StudentCollegeSchema");
const branchSchema = require("./models/branchModel/branchSchema");
const CourseSchema = require("./models/courseModel/CourseSchema");
const classSchema = require("./models/classModel/classSchema");

const collegeTeacherRoutes = require("./routes/TeacherRouters"); //TEACHER ROUTES

const app = express();
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to the mongoDB"))
  .catch((err) => console.log("Not Connected To The Network", err));

///TEACHER ROUTES
app.use("/college-teacher", collegeTeacherRoutes);
//TEACHER ROUTES

app.post("/save", async (req, res) => {
  console.log("hello");
  try {
    const admin = {
      firstName: "John",
      middleName: "Raj",
      lastName: "Doe",
      phone: 930234442,
      email: "john.doe@example.com",
      password: "hidfo",
      gender: "Male",
      role: "Admin",
      roleType: "School",
      institute: "65f08788b441c29e42643d62",
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
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
  }
});

//Add college student

app.post("/saveStudent", async (req, res) => {
  console.log("hello");
  try {
    const student = {
      firstName: "John",
      middleName: "Aryan",
      lastName: "Doe",
      phone: 930234442,
      email: "john.doe@example.com",
      password: "hidfo",
      gender: "Male",
      institute: "65f08788b441c29e42643d62",
      // Add other fields specific to StudentSchemaII here
      educationalDetails: {
        course: "65f08b3ccca605073b4c1558", // Replace with the actual Course ID
        branch: "65f08a7eb91e471d4dbdac1a",
        class: "65f08c07648a104587537db7",
      },
      castCategory: "abc",
      parentPhone: 1234567890,
    };

    // Create an instance of CollegeStudent
    const studentInstance = new StudentCollege(student);

    // Save the data to the database
    const data = await studentInstance.save();
    console.log(data);
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
  }
});

// Add Branch

app.post("/saveBranch", async (req, res) => {
  console.log("hello");
  try {
    const branch = {
      name: "Computer Engineering",
      institute: "65f08788b441c29e42643d62",
      branchType: "College",
    };

    // Create an instance of CollegeStudent
    const branchInstance = new branchSchema(branch);

    // Save the data to the database
    const data = await branchInstance.save();
    console.log(data);
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
  }
});

// Add Class

app.post("/saveClass", async (req, res) => {
  console.log("hello");
  try {
    const classData = {
      className: "First Year",
      institute: "65f08788b441c29e42643d62",
      classType: "College",
    };

    // Create an instance of CollegeStudent
    const classInstance = new classSchema(classData);

    // Save the data to the database
    const data = await classInstance.save();
    console.log(data);
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
  }
});

// Add Course

app.post("/saveCourse", async (req, res) => {
  console.log("hello");
  try {
    const course = {
      name: "Engineering",
      institute: "65f08788b441c29e42643d62",
      CourseType: "College",
    };

    // Create an instance of CollegeStudent
    const courseInstance = new CourseSchema(course);

    // Save the data to the database
    const data = await courseInstance.save();
    console.log(data);
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
  }
});

app.post("/saveschool", async (req, res) => {
  try {
    const schoolStudentData = {
      firstName: "Keshav",
      middleName: "Raj",
      lastName: "Doe",
      phone: 930234442,
      email: "john.doe@example.com",
      password: "hidfo",
      gender: "Male",
      role: "Teacher",
      roleType: "College",
      institute: "65f08788b441c29e42643d62",
      // Add other fields specific to StudentSchemaII here
      // educationalDetails: {
      //     course: 'CourseID', // Replace with the actual Course ID
      //     branch: 'BranchID',
      //     class: 'ClassID',
      // },
      castCategory: "abc",
      // parentPhone: 1234567890,
      // studentType: "College"
    };

    // Create an instance of CollegeStudent
    const schoolStudentInstance = new TeacherCollege(schoolStudentData);

    // Save the data to the database
    const data = await schoolStudentInstance.save();
    console.log(data);
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
  }
});

app.post("/saveInstitute", async (req, res) => {
  try {
    const instituteData = {
      name: "MCOE",
    };

    // Create an instance of CollegeStudent
    const instituteInstance = new instituteSchema(instituteData);

    // Save the data to the database
    const data = await instituteInstance.save();
    console.log(data);
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
  }
});

//find student
app.get("/getStudent", async (req, res) => {
  const student = await StudentCollege.findById("65f08ca3b820ba1c364b1b62")
    .populate("educationalDetails.course")
    .populate("educationalDetails.branch")
    .populate("educationalDetails.class")
    .populate("institute");

  res.status(200).json(student);
});

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
