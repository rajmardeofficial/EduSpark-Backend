const mongoose = require('mongoose')

//Document Schema
const DocumentSchema = new mongoose.Schema({
    documentName: {type: String, required: true},
    fees: {type: Number},
    institute:{type:mongoose.Schema.Types.ObjectId, ref: "Institute",required:true},
    documentType:{type:String,enums:['School','Jr College','College'],required:true},
})

module.exports = mongoose.model('Document', DocumentSchema)