const mongoose = require('mongoose')

const PlatformChargesSchema = new mongoose.Schema({
    amount: {type: Number, required: true},
    institute: {type: mongoose.Schema.Types.ObjectId, ref:"Institute", required: true},
    createdAt: {
        type: Date,
        default: Date.now // Set default value to current date/time
    }
})

module.exports = mongoose.model("PlatformCharges",PlatformChargesSchema);