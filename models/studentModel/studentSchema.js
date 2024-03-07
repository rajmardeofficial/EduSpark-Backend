const mongoose = require('mongoose')
const User = require('../userModel/usersSchema')

const EducationalDetailsSchema = new mongoose.Schema({
    branch: {type: mongoose.Schema.Types.ObjectId, ref: "Branch"},
    class: {type: mongoose.Schema.Types.ObjectId, ref: "Class"},
}, { _id: false });


const StudentSchema = new mongoose.Schema({
    educationalDetails: EducationalDetailsSchema,
});

module.exports = User.discriminator('Student', StudentSchema);