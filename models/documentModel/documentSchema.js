const mongoose = require('mongoose')

//Document Schema
const DocumentSchema = new mongoose.Schema({
    documentName: {type: String, required: true},
    fees: {type: Number}
})

module.exports = mongoose.model('Document', DocumentSchema)