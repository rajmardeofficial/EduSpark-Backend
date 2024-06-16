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
    const studentId = req?.user?.id;
    console.log(roleType,studentId);

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

    documentData = await documentSchema.find({ $and: commonQuery }).select("documentName fees");

    res.status(200).json({ documentData: documentData });
  } catch (error) {
    console.log("error in getting documents");
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendRequestForDocument = async (req,res) => {
  try {
    const studentId = req?.user?.id;
    const {roleType,documentsIds} = req.body;
    console.log(roleType,studentId,documentsIds);

    const collection =
    roleType === "College"
      ? StudentCollege
      : roleType === "Jr College"
      ? StudentJrCollege
      : StudentSchool;

    await collection
    .findByIdAndUpdate(
      studentId,
      {
        $push: {
          documentRequests: {
            $each: documentsIds?.map((documentId) => ({
              document: documentId,
              status: "pending",
              date:Date.now(),
            })),
          },
        },
      },
      { new: true }
    )
    .select("documentRequests.document");
    
  console.log("Documents updated successfully!");
  res.status(200).send({message:"Request successfull"});
  } catch (error) {
    console.log("error in requesting documents");
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getAllDocumentsOfParticularStudent, sendRequestForDocument };
