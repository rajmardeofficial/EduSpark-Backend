const mongoose = require('mongoose')

const BranchSchema = new mongoose.Schema({
    branchName: {type: String, required: true}
})

module.exports = mongoose.model('Branch', BranchSchema);
