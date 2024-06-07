const jwt = require("jsonwebtoken");
// const User = require("../models/userModel/usersSchema");
const bcrypt = require("bcrypt");
const Admin = require("../models/userModel/admin/AdminSchema");
const TeacherJrCollege = require("../models/userModel/teacher/teacherTypeModel/TeacherJrCollegeSchema");
const TeacherCollege = require("../models/userModel/teacher/teacherTypeModel/TeacherCollegeSchema");
const TeacherSchool = require("../models/userModel/teacher/teacherTypeModel/TeacherSchoolSchema");
const StudentJrCollege = require("../models/userModel/student/studentTypeModel/StudentJrCollegeSchema");
const StudentCollege = require("../models/userModel/student/studentTypeModel/StudentCollegeSchema");
const StudentSchool = require("../models/userModel/student/studentTypeModel/StudentSchoolSchema");

// const signup = async (req, res) => {
//   try {
//     // Extracting Common user data
//     const {
//       firstName,
//       middleName,
//       lastName,
//       phone,
//       email,
//       password,
//       gender,
//       bloodGroup,
//     } = req.body;

//     //check for existing user
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "User already exists with the email" });
//     }
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Creating new user based on role
//     let newUser;
//     switch (role) {
//       case "Admin":
//         //Create Admin user
//         newUser = new Admin({
//           firstName,
//           middleName,
//           lastName,
//           phone,
//           email,
//           password: hashedPassword,
//           gender,
//           bloodGroup,
//         });
//         break;
//       case "Student":
//         const { studentClass, studentBranch, castCategory } = req.body;
//         newUser = new Student({
//           firstName,
//           middleName,
//           lastName,
//           phone,
//           email,
//           password: hashedPassword,
//           gender,
//           bloodGroup,
//           educationalDetails: { branch: studentBranch, class: studentClass },
//           castCategory,
//         });
//         break;
//       case "Teacher":
//         const { subjectSpeciality, teaching } = req.body;
//         const { teacherBranch, teacherClass, subject } = teaching;
//         newUser = new Teacher({
//           firstName,
//           middleName,
//           lastName,
//           phone,
//           email,
//           password: hashedPassword,
//           gender,
//           bloodGroup,
//           subjectSpeciality,
//           teaching: { branch: teacherBranch, class: teacherClass, subject },
//         });
//         break;
//       case "Librarian":
//         newUser = new Librarian({
//           firstName,
//           middleName,
//           lastName,
//           phone,
//           email,
//           password: hashedPassword,
//           gender,
//           bloodGroup,
//         });
//         break;

//       default:
//         break;
//     }
//   } catch (e) {
//     res.send(e);
//   }
// };

//Login

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(req.body);

    let userModel;
    switch (role) {
      case "admin":
        userModel = Admin;
        break;
      case "jrCollegeTeacher":
        userModel = TeacherJrCollege;
        break;
      case "collegeTeacher":
        userModel = TeacherCollege;
        break;
      case "schoolTeacher":
        userModel = TeacherSchool;
        break;
      case "jrCollegeStudent":
        userModel = StudentJrCollege;
        break;
      case "collegeStudent":
        userModel = StudentCollege;
        break;
      case "schoolStudent":
        userModel = StudentSchool;
        break;

      default:
        break;
    }

    //check if the user exist
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      res.status(401).json({ message: "User does not exists" });
    }
    //check if password is correct
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log(isPasswordValid);


    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //Generate JWT Token

    let token;
    token = jwt.sign(
      {
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        id: existingUser._id,
        role: existingUser.role,
        roleType: existingUser.roleType,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    console.log(token);

    //Send Token in response
    res
      .status(200)
      .json({
        token,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        role: existingUser.role,
        roleType: existingUser.roleType,
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Authenticate function to verify the jwt

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token + "hello");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

// Middleware to authorize admin access
const authorizeAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized: Access forbidden" });
  }
};

// Middleware to authorize teacher access
const authorizeTeacher = (req, res, next) => {
  if (req.user.role == "Teacher") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized: Access forbidden" });
  }
};

// Middleware to authorize student access
const authorizeStudent = (req, res, next) => {
  if (req.user.role === "Student") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized: Access forbidden" });
  }
};

module.exports = {
  // signup,
  login,
  authorizeAdmin,
  authorizeStudent,
  authorizeTeacher,
  authenticate,
};
