const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  role: { type: String, default: "Admin" },
  bloodGroup: { type: String },
  roleType: {
    type: String,
    enum: [
      "School",
      "Jr College",
      "College",
      "School and Jr College",
      "School and College",
      "Jr College and College",
      "All Three",
    ],
    required:true,
  },
  institute:{type:mongoose.Schema.Types.ObjectId, ref: "Institute", required:"true"},

  documentRequests: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      document: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
    },
  ],
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;