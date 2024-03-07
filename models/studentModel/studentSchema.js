const mongoose = require('mongoose')
const User = require('../userModel/usersSchema')

const EducationalDetailsSchema = new mongoose.Schema({
    branch: String,
    class: String,
}, { _id: false });


const StudentSchema = new mongoose.Schema({
    educationalDetails: EducationalDetailsSchema,
    castCategory: {type: String},
    examResult: [
        {
            test: String,
            marksObtained: {
                type: Number
            }
        }
    ],
    documentRequests: [
        {
            document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
            status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
        }
    ]
});

module.exports = User.discriminator('Student', StudentSchema);