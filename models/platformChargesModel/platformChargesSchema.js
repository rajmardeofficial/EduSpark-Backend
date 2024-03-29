const mongoose = require('mongoose')

const PlatformChargesSchema = new mongoose.Schema({
    amount: {type: Number, required: true},
    instituteName: {type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now // Set default value to current date/time
    }
})

module.exports = mongoose.model("PlatformCharges",PlatformChargesSchema);