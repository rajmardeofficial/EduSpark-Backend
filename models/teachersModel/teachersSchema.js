const mongoose = require('mongoose')
const User = require('../userModel/usersSchema')
const attendanceSchema = require('../attendanceModel/attendanceSchema')

const TeacherSchema = new mongoose.Schema({ 
    subjectSpeciality: {type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true},
    teachingClasses: [{type: String}],
    branches: [{type: String}],
    teaching: [{
        branch: {type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true},
        class: {type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true},
        subject: {type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true},
    }],
    attendance: [attendanceSchema]
})

const Teacher = User.discriminator('Teacher', TeacherSchema)
module.exports = Teacher