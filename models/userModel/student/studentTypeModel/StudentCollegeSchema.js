const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId;

const EducationalDetailsSchema = new mongoose.Schema({
    course: {type: ObjectId, ref: "Course"},
    branch: {type: ObjectId, ref: "Branch"},
    class: {type: ObjectId, ref: "Class"},
    semester:String,
}, { _id: false });


const StudentCollegeSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    role:{type: String, default:"Student"},
    bloodGroup: { type: String },
    roleType: {type:String,default:"College"},
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
        paidStatus: { type: Boolean, default: false},
        order_id: {type: String, default: false},
        payment_id: {type: String, default: null},
        date: {
            type: Date,
            default: Date.now
        },
    },
    
    
},{timestamps:true});

const StudentCollege = mongoose.model('StudentCollege', StudentCollegeSchema);
module.exports = StudentCollege;