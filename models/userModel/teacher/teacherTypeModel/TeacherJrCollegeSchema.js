const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const TeacherJrCollegeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String},
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    role: { type: String, default: "Teacher" },
    bloodGroup: { type: String },
    roleType: { type: String, default: "Jr College" },
    institute: { type: ObjectId, ref: "Institute" },

    subjectSpeciality: String,
    teaching: [
      {
        course: { type: ObjectId, ref: "Course" },
        branch: { type: ObjectId, ref: "Branch" },
        class: { type: ObjectId, ref: "Class" },
        subject: { type: ObjectId, ref: "Subject" },
      },
    ],
    notes: [
      {
        notesTitle: String,
        notesDescription: String,
        course: { type: ObjectId, ref: "Course" },
        branch: { type: ObjectId, ref: "Branch" },
        class: { type: ObjectId, ref: "Class" },
        subject: { type: ObjectId, ref: "Subject" },
      },
    ],
    notice: [
      {
        title: String,
        content: String,
        date: Date,
        to: {
          course: { type: ObjectId, ref: "Course" },
          branch: { type: ObjectId, ref: "Branch" },
          class: { type: ObjectId, ref: "Class" },
        },
      },
    ],
    attendance: [
      {
        halfDay: { type: String, default: false },
        date: { type: Date, required: false },
        isPresent: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const TeacherJrCollege = mongoose.model(
  "TeacherJrCollege",
  TeacherJrCollegeSchema
);
module.exports = TeacherJrCollege;
