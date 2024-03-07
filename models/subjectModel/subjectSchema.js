const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
    subjectName: String,
})

module.exports = mongoose.model('Student', SubjectSchema);
