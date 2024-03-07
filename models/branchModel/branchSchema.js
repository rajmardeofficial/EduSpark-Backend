const mongoose = require('mongoose')

const BranchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
})

module.exports = mongoose.model('Branch', BranchSchema);
