const mongoose = require('mongoose')
const User = require('../userModel/usersSchema')
const attendanceSchema = require('../attendanceModel/attendanceSchema')

const TeacherSchema = new mongoose.Schema({ 
    subjectSpeciality: String,
    teaching: [{
        branch: String,
        class: String,
        subject: String,
    }],
    notes: [
        {
            notesTitle: String,
            notesDescription: String,
            branch: String,
            class: String,
            subject: String,
            noteURL: String,
        }
    ],
    notice: [{
        title: String,
        content: String,
        date: Date,
        to: {
            branch: String,
            class: String,
        }
    }],
    attendance: [attendanceSchema]
})

const Teacher = User.discriminator('Teacher', TeacherSchema)
module.exports = Teacher