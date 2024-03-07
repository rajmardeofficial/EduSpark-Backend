const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    //Extra fields other than user fields
    documentRequests: [
        {
            student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
            document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
            status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
        }
    ]
})

const Admin = User.discriminator('Admin', AdminSchema)
module.exports = Admin