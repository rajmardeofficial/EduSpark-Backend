const mongoose = require("mongoose");
const StudentCollege = require("../../models/userModel/student/studentTypeModel/StudentCollegeSchema");
const StudentJrCollege = require("../../models/userModel/student/studentTypeModel/StudentJrCollegeSchema");
const StudentSchool = require("../../models/userModel/student/studentTypeModel/StudentSchoolSchema");
const TeacherCollege = require("../../models/userModel/teacher/teacherTypeModel/TeacherCollegeSchema");
const TeacherJrCollege = require("../../models/userModel/teacher/teacherTypeModel/TeacherJrCollegeSchema");
const TeacherSchool = require("../../models/userModel/teacher/teacherTypeModel/TeacherSchoolSchema");
const Admin = require("../../models/userModel/admin/AdminSchema");

const getAllNotice = async (req, res) => {
  try {
    const { roleType, institute, selectedAuthority } = req.params;
    console.log(roleType, institute, selectedAuthority);

    let result = [];

    const getCollection = (role) => {
      switch (role) {
        case "College":
          return TeacherCollege;
        case "Jr College":
          return TeacherJrCollege;
        default:
          return TeacherSchool;
      }
    };

    if (selectedAuthority === "Teacher" || selectedAuthority === "All") {
      const collection = getCollection(roleType);
      const teacherResults = await collection.find({ institute }).select("notice firstName");
      result = teacherResults;
    }

    if (selectedAuthority === "Admin" || selectedAuthority === "All") {
      const adminResults = await Admin.find({ institute }).select("notice firstName");
      result = selectedAuthority === "All" ? result.concat(adminResults) : adminResults;
    }

    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error while fetching notices:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllNotice };
