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
        class: String,
        branch: String,
    }
})

module.exports = mongoose.model('Test', TestSchema);
