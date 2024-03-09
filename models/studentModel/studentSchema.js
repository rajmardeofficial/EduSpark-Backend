const mongoose = require('mongoose')
const User = require('../userModel/usersSchema')

const EducationalDetailsSchema = new mongoose.Schema({
    branch: String,
    class: String,
}, { _id: false });


const StudentSchema = new mongoose.Schema({
    educationalDetails: EducationalDetailsSchema,
    castCategory: { type: String },
    examResult: [
        {
            test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
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
    ],

    platformCharges: {
        paidStatus: { type: Boolean, required: true, default: false },
        payment_id: {type: String, required: true},
        date: {
            type: Date,
            default: Date.now
        },
    },
    
    
});

module.exports = User.discriminator('Student', StudentSchema);