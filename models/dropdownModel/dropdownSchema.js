const mongoose = require('mongoose')

const DropDownSchema = new mongoose.Schema({
    yearOfStudyEngineering: {
        type: String,
        enum: [
            "First Year",
            "Second Year",
            "Third Year",
            "Fourth Year",
        ]
    },

    engineeringSubjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],

    engineeringBranch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
})

module.exports = mongoose.model('DropDown', DropDownSchema);
