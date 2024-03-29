const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId;

const EducationalDetailsSchema = new mongoose.Schema({
    class: {type: ObjectId, ref: "Class"},
}, { _id: false });


const StudentSchoolSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    role:{type: String, default:"Student"},
    bloodGroup: { type: String },
    roleType: {type:String,default:"School"},
    institute:{type:ObjectId, ref: "Institute"},

    educationalDetails: EducationalDetailsSchema,
    castCategory: { type: String },
    parentPhone: Number,
    examResult: [
        {
            test: { type: ObjectId, ref: "Test" },
            marksObtained: {
                type: Number
            }
        }
    ],
    documentRequests: [
        {
            document: { type: ObjectId, ref: 'Document' },
            status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
        }
    ],

    platformCharges: {
        paidStatus: { type: Boolean, required: true, default: false },
        payment_id: {type: String, required: true},
        date: {
            type: Date,
            default: Date.now
        },
    },
    
    
},{timestamps:true});

const StudentSchool = mongoose.model('StudentSchool', StudentSchoolSchema);
module.exports = StudentSchool;