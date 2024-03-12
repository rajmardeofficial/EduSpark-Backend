const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    testName: String,
    testDescription: String,
    totalMarks: Number,
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    createdFor: {
        class: {type: mongoose.Schema.Types.ObjectId,
        ref: "Class"},
        branch: {type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"},
        course: {type: mongoose.Schema.Types.ObjectId,
        ref: "Course"},
    }
})

module.exports = mongoose.model('Test', TestSchema);
