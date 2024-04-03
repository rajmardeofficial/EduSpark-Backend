const TeacherCollege = require("../../models/userModel/teacher/teacherTypeModel/TeacherCollegeSchema");
const TeacherJrCollege = require("../../models/userModel/teacher/teacherTypeModel/TeacherJrCollegeSchema");
const TeacherSchool = require("../../models/userModel/teacher/teacherTypeModel/TeacherSchoolSchema");

// TEACHING
const CollegeTeacherTeaching = async (req, res) => {
  const {
    course,
    branch,
    class: classId,
    semester,
    subject,
    roleType,
  } = req.body;
  try {
    switch (roleType) {
      case "College":
        teacher = await TeacherCollege.findById(req.params.id);
        break;
      case "Jr College":
        teacher = await TeacherJrCollege.findById(req.params.id);
        break;
      case "School":
        teacher = await TeacherSchool.findById(req.params.id);
        break;
      default:
        throw new Error("Invalid roleType");
    }

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Create a new teaching object
    const newTeaching = {
      course,
      branch,
      class: classId,
      semester,
      subject,
    };

    // Add the new teaching object to the teacher's teaching array
    teacher.teaching.push(newTeaching);

    const result = await teacher.save();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error updating attendance:", error);
    return res
      .status(500)
      .json({ message: "Error updating attendance", error: error.message });
  }
};

module.exports = { CollegeTeacherTeaching };
