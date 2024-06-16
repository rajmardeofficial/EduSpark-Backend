const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId;

const TeacherSchoolSchema = new mongoose.Schema({ 
    firstName: { type: String, required: true },
    middleName: { type: String},
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    role:{type: String, default:"Teacher"},
    bloodGroup: { type: String },
    roleType: {type:String,default:"School"},
    institute:{type:ObjectId, ref: "Institute"},

    subjectSpeciality: String,
    teaching: [{
        class:{type: ObjectId,ref:"Class"},
        subject:{type: ObjectId,ref:"Subject"},
    }],
    notes: [
        {
            notesTitle: String,
            notesDescription: String,
            document: String,
            date: Date,
            class:{type: ObjectId,ref:"Class"},
            subject:{type: ObjectId,ref:"Subject"},
        }
    ],
    notice: [{
        title: String,
        content: String,
        document: String,
        date: Date,
        // to: {
        //     class:{type: ObjectId,ref:"Class"},
        // }
    }],
    attendance: [
        {
            halfDay: {type:String, default:false},
            date: { type: Date, required: false },
            isPresent: { type: Boolean, default: false },
        },
      ],
},{timestamps:true});

const TeacherSchool = mongoose.model('TeacherSchool', TeacherSchoolSchema);
module.exports = TeacherSchool;