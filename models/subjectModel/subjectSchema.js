const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: false,
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: false
    },
    semester: {
        type: String,
    },
    institute:{type:mongoose.Schema.Types.ObjectId, ref: "Institute",required:true},
})

module.exports = mongoose.model('Subject', SubjectSchema);
