const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to the mongoDB"))
  .catch((err) => console.log("Not Connected To The Network", err));

const TeacherRoutes = require("./routes/TeacherRouters");
const platformRoutes = require("./routes/payment/PlatformRoutes");
const studentRoutes = require("./routes/student/StudentRoutes");
const StudentCollege = require("./models/userModel/student/studentTypeModel/StudentCollegeSchema");
const testSchema = require("./models/testModel/testSchema");
const documentSchema = require("./models/documentModel/documentSchema");

app.use("/api", TeacherRoutes);
app.use("/auth/platformCharges", platformRoutes);
app.use("/auth/student", studentRoutes);

// app.post("/save", async (req, res) => {
//   console.log("hello");
//   try {
//     const admin = {
//       firstName: "John",
//       middleName: "Raj",
//       lastName: "Doe",
//       phone: 930234442,
//       email: "john.doe@example.com",
//       password: "hidfo",
//       gender: "Male",
//       role: "Admin",
//       roleType: "School",
//       institute: "65f08788b441c29e42643d62",
//       // Add other fields specific to StudentSchemaII here
//       // educationalDetails: {
//       //     course: 'CourseID', // Replace with the actual Course ID
//       //     branch: 'BranchID',
//       //     class: 'ClassID',
//       // },
//       // castCategory: 'abc',
//       // parentPhone: 1234567890,
//       // studentType: "College"
//     };

//     // Create an instance of CollegeStudent
//     const adminInstance = new Admin(admin);

//     // Save the data to the database
//     const data = await adminInstance.save();
//     console.log(data);
//     res.status(200).send({ data });
//   } catch (error) {
//     console.log(error);
//   }
// });

//Add college student

// app.post("/saveStudent", async (req, res) => {
//   console.log("hello");
//   try {
//     const student = {
//       firstName: "Alice",
//       middleName: "Elizabeth",
//       lastName: "Smith",
//       phone: 9876543210,
//       email: "alice.smith@example.com",
//       password: "sdfosj",
//       gender: "Female",
//       institute: "65f08788b441c29e42643d62",
//       educationalDetails: {
//         course: "65f08b3ccca605073b4c1558", // Replace with the actual Course ID
//         branch: "65f08a7eb91e471d4dbdac1a",
//         class: "65f08c07648a104587537db7",
//       },
//       attendance: [
//         {
//           teacher: "65f987654321098765432109", // Replace with actual Teacher ID
//           subject: "65f876543210987654321098", // Replace with actual Subject ID
//           class: "65f765432109876543210987", // Replace with actual Class ID
//           semester: "seventh",
//           date: new Date(), // Replace with the actual date
//           isPresent: false // Replace with the actual attendance status
//         },
//         {
//           teacher: "65f987654321098765432109", // Replace with actual Teacher ID
//           subject: "65f876543210987654321098", // Replace with actual Subject ID
//           class: "65f765432109876543210987", // Replace with actual Class ID
//           semester: "fifth",
//           date: new Date(), // Replace with the actual date
//           isPresent: true // Replace with the actual attendance status
//         }
//       ],
//       castCategory: "xyz",
//       parentPhone: 9876543210,
//     };

//     // Create an instance of CollegeStudent
//     const studentInstance = new StudentCollege(student);

//     // Save the data to the database
//     const data = await studentInstance.save();
//     console.log(data);
//     res.status(200).send({ data });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post('/documents', async (req, res) => {
//   try {
//     // Create a new document instance using spread syntax
//     console.log(req.body);
//     const newDocument = new documentSchema({
//       ...req.body
//     });

//     // Save the document to the database
//     await newDocument.save();

//     res.status(201).json({ message: 'Document saved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// app.get("/getattendance", async(req,res) => {
//   try {
//     const data = await StudentCollege.find();
//     console.log(data);
//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//   }
// })

// app.post('/saveSubjects', async (req, res) => {
//     try {
//         // Extract data from the request body
//         const { name, course,classId, branch, semester, institute } = req.body;

//         // Create a new subject instance
//         const newSubject = new subjectSchema({
//             name,
//             course,
//             class:classId,
//             branch,
//             semester,
//             institute
//         });

//         // Save the new subject to the database
//         const savedSubject = await newSubject.save();

//         // Send a success response
//         res.status(201).json(savedSubject);
//     } catch (error) {
//         // Handle errors
//         console.error("Error saving subject:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// // for test
// const ObjectId = require("mongoose").Types.ObjectId;
// app.post('/savetest', async (req, res) => {
//   try {
//       let { testName, testDescription, totalMarks, subject, createdBy, createdFor,questionPaper,answerKey,testType } = req.body;

//       // Create a new test instance
//       subject = new ObjectId(subject);
//       createdBy = new ObjectId(createdBy);
//       createdFor.class = new ObjectId(createdFor.class);
//       createdFor.branch = new ObjectId(createdFor.branch);
//       createdFor.course = new ObjectId(createdFor.course);

//       const newTest = new testSchema({
//           testName,
//           testDescription,
//           totalMarks,
//           subject,
//           createdBy,
//           createdFor,
//           questionPaper,
//           answerKey,
//           testType
//       });

//       // Save the test to the database
//       await newTest.save();

//       res.status(201).json({ message: 'Test saved successfully', test: newTest });
//   } catch (error) {
//       console.error('Error saving test:', error);
//       res.status(500).json({ message: 'Failed to save test', error: error.message });
//   }
// });

// // Add Branch

// app.post("/saveBranch", async (req, res) => {
//   console.log("hello");
//   try {
//     const branch = {
//       name: "Computer Engineering",
//       institute: "65f08788b441c29e42643d62",
//       branchType: "College",
//     };

//     // Create an instance of CollegeStudent
//     const branchInstance = new branchSchema(branch);

//     // Save the data to the database
//     const data = await branchInstance.save();
//     console.log(data);
//     res.status(200).send({ data });
//   } catch (error) {
//     console.log(error);
//   }
// });

// // Add Class

// app.post("/saveClass", async (req, res) => {
//   console.log("hello");
//   try {
//     const classData = {
//       className: "First Year",
//       institute: "65f08788b441c29e42643d62",
//       classType: "College",
//     };

//     // Create an instance of CollegeStudent
//     const classInstance = new classSchema(classData);

//     // Save the data to the database
//     const data = await classInstance.save();
//     console.log(data);
//     res.status(200).send({ data });
//   } catch (error) {
//     console.log(error);
//   }
// });

// // Add Course

// app.post("/saveCourse", async (req, res) => {
//   console.log("hello");
//   try {
//     const course = {
//       name: "Engineering",
//       institute: "65f08788b441c29e42643d62",
//       CourseType: "College",
//     };

//     // Create an instance of CollegeStudent
//     const courseInstance = new CourseSchema(course);

//     // Save the data to the database
//     const data = await courseInstance.save();
//     console.log(data);
//     res.status(200).send({ data });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/saveschool", async (req, res) => {
//   try {
//     const schoolStudentData = {
//       firstName: "Keshav",
//       middleName: "Raj",
//       lastName: "Doe",
//       phone: 930234442,
//       email: "john.doe@example.com",
//       password: "hidfo",
//       gender: "Male",
//       role: "Teacher",
//       roleType: "College",
//       institute: "65f08788b441c29e42643d62",
//       // Add other fields specific to StudentSchemaII here
//       // educationalDetails: {
//       //     course: 'CourseID', // Replace with the actual Course ID
//       //     branch: 'BranchID',
//       //     class: 'ClassID',
//       // },
//       castCategory: "abc",
//       // parentPhone: 1234567890,
//       // studentType: "College"
//     };

//     // Create an instance of CollegeStudent
//     const schoolStudentInstance = new TeacherCollege(schoolStudentData);

//     // Save the data to the database
//     const data = await schoolStudentInstance.save();
//     console.log(data);
//     res.status(200).send({ data });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/saveInstitute", async (req, res) => {
//   try {
//     const instituteData = {
//       name: "MCOE",
//     };

//     // Create an instance of CollegeStudent
//     const instituteInstance = new instituteSchema(instituteData);

//     // Save the data to the database
//     const data = await instituteInstance.save();
//     console.log(data);
//     res.status(200).send({ data });
//   } catch (error) {
//     console.log(error);
//   }
// });

// //find student
// app.get("/getStudent", async (req, res) => {
//   const student = await StudentCollege.findById("65f08ca3b820ba1c364b1b62")
//     .populate("educationalDetails.course")
//     .populate("educationalDetails.branch")
//     .populate("educationalDetails.class")
//     .populate("institute");

//   res.status(200).json(student);
// });

app.listen(5000, () => {
  console.log("Server is running at: http://localhost:5000");
});
