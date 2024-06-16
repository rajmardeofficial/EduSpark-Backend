const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId;

const EducationalDetailsSchema = new mongoose.Schema({
    course: {type: ObjectId, ref: "Course"},
    branch: {type: ObjectId, ref: "Branch"},
    class: {type: ObjectId, ref: "Class"},
}, { _id: false });


const StudentJrCollegeSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    rollNo: { type: Number, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    role:{type: String, default:"Student"},
    bloodGroup: { type: String },
    roleType: {type:String,default:"Jr College"},
    institute:{type:ObjectId, ref: "Institute"},

    educationalDetails: EducationalDetailsSchema,
    castCategory: { type: String },
    parentPhone: Number,
    examResult: [
        {
            test: { type: ObjectId, ref: "Test" },
            marksObtained: {
                type: Number
            },
            answerOfStudent: {
              type: String,
            }
        }
    ],
    documentRequests: [
      {
        document: { type: ObjectId, ref: "Document" },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        paidStatus: {type: Boolean, default: false},
        order_id: { type: String, default: null },
        payment_id: { type: String, default: null },
        date: {
          type: Date,
          default: Date.now,
        },
        // documentFile: {type: String, required: false}, // if we send the document online
      },
    ],

    platformCharges: {
        paidStatus: { type: Boolean, required: true, default: false },
        order_id: { type: String, default: null },
        payment_id: { type: String, default: null },
        date: {
            type: Date,
            default: Date.now
        },
    },
    attendance: [
        {
          teacher: {
            type:ObjectId,
            ref: "Teacher",
            required: false,
          },
          subject:{
            type:ObjectId,
            ref: "Subject",
            required: false,
          },
          class:{
            type:ObjectId,
            ref: "Class",
            required: false,
          },
          date: { type: Date, default: Date.now, required: false },
          isPresent: { type: Boolean, default: false },
        },
      ],
      fees: {
        amountPaid: {type:Number},
      }  
    
},{timestamps:true});

const StudentJrCollege = mongoose.model('StudentJrCollege', StudentJrCollegeSchema);
module.exports = StudentJrCollege;