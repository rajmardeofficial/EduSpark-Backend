const mongoose = require("mongoose");
const StudentCollege = require("../../models/userModel/student/studentTypeModel/StudentCollegeSchema");
const StudentJrCollege = require("../../models/userModel/student/studentTypeModel/StudentJrCollegeSchema");
const StudentSchool = require("../../models/userModel/student/studentTypeModel/StudentSchoolSchema");
const documentSchema = require("../../models/documentModel/documentSchema");

// to get all documents of particularStudent with the help of  class or semester
// request the document

const getAllDocumentsOfParticularStudent = async (req, res) => {
  try {
    const roleType = req.params.roleType;
    const studentId = req.params.studentId;
    console.log(studentId, roleType);

    // know getting course,branch,class,semester from student
    const collection =
      roleType === "College"
        ? StudentCollege
        : roleType === "Jr College"
        ? StudentJrCollege
        : StudentSchool;

    const studentEducation = await collection
      .findById(studentId)
      .select("educationalDetails institute");

    let documentData;
    const commonQuery = [
      { institute: studentEducation?.institute },
      { class: studentEducation?.educationalDetails?.class },
      { documentType: roleType },
    ];

    if (roleType === "College") {
      commonQuery.push(
        { course: studentEducation?.educationalDetails?.course },
        { branch: studentEducation?.educationalDetails?.branch },
        { semester: studentEducation?.educationalDetails?.semester }
      );
    } else if (roleType === "Jr College") {
      commonQuery.push(
        { course: studentEducation?.educationalDetails?.course },
        { branch: studentEducation?.educationalDetails?.branch }
      );
    }

    documentData = await documentSchema.find({ $and: commonQuery });

    res.status(200).json({ documentData: documentData }); 
  } catch (error) {
    console.log("error in getting documents");
    res.status(500).json({ message: "Internal server error" });
  }
};

// handle request Document
const sendRequestForDocument = async(req,res) => {
  try {

    const {studentId,roleType} = req.params;
    const {documentsIds} = req.body;

    console.log(documentsIds,studentId,roleType);

    const collection = roleType === "College"?StudentCollege:roleType === "Jr College"?StudentJrCollege:StudentSchool;
    const updatedStudent = await collection.findByIdAndUpdate(
      studentId,
      {
        $push: {
          documentRequests: {
            $each: documentsIds.map(documentId => ({
              document: documentId,
            })),
          },
        },
      },
      { new: true }
    ).select("documentRequests.document");

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    console.log("Documents requested successfully");
    res.status(200).json({ message: "Documents requested successfully"});
  } catch (error) {
    console.log("error in getting documents");
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = { getAllDocumentsOfParticularStudent, sendRequestForDocument };
