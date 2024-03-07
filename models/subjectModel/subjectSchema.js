const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    }
})

module.exports = mongoose.model('Subject', SubjectSchema);
