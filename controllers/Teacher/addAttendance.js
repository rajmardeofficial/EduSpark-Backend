const TeacherCollege = require("../../models/userModel/teacher/teacherTypeModel/TeacherCollegeSchema");
const TeacherJrCollege = require("../../models/userModel/teacher/teacherTypeModel/TeacherJrCollegeSchema");
const TeacherSchool = require("../../models/userModel/teacher/teacherTypeModel/TeacherSchoolSchema");

// ATTENDANCE
const CollegeTeacherAttendance = async (req, res) => {
  const { isPresent, date, roleType } = req.body;
  console.log(roleType);
  try {
    let teacher;
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

    // Find existing attendance entry for the given date
    const existingAttendance = teacher.attendance.find(
      (a) => a.date.toDateString() === new Date(date).toDateString()
    );

    if (existingAttendance) {
      existingAttendance.isPresent = isPresent;
    } else {
      teacher.attendance.push({ date, isPresent });
    }

    const result = await teacher.save();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error updating attendance:", error);
    return res
      .status(500)
      .json({ message: "Error updating attendance", error: error.message });
  }
};

// NOTICE
const CollegeTeacherNotice = async (req, res) => {
  const { title, content, date, to, roleType } = req.body;
  try {
    let teacher;
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

    // Create a new notice object
    const newNotice = {
      title,
      content,
      date,
      to,
    };

    // Add the new notice to the teacher's notices array
    teacher.notice.push(newNotice);

    const result = await teacher.save();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error updating attendance:", error);
    return res
      .status(500)
      .json({ message: "Error updating attendance", error: error.message });
  }
};

// NOTES
const CollegeTeacherNotes = async (req, res) => {
  const {
    notesTitle,
    notesDescription,
    course,
    branch,
    class: classId,
    semester,
    subject,
    roleType,
  } = req.body;
  try {
    let teacher;
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

    // Create a new notes object
    const newNote = {
      notesTitle,
      notesDescription,
      course,
      branch,
      class: classId,
      semester,
      subject,
    };

    // Add the new note to the teacher's notes array
    teacher.notes.push(newNote);

    const result = await teacher.save();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error updating attendance:", error);
    return res
      .status(500)
      .json({ message: "Error updating attendance", error: error.message });
  }
};

module.exports = {
  CollegeTeacherAttendance,
  CollegeTeacherNotice,
  CollegeTeacherNotes,
};
