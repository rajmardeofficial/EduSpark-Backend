const mongoose = require('mongoose')

//Document Schema
const DocumentSchema = new mongoose.Schema({
    documentName: {type: String, required: true},
    fees: {type: Number},
    institute:{type:mongoose.Schema.Types.ObjectId, ref: "Institute",required:true},
    documentType:{type:String,enums:['School','Jr College','College'],required:true},
    class:{type:mongoose.Schema.Types.ObjectId, ref: "Class",required:true},
    course:{type:mongoose.Schema.Types.ObjectId, ref: "Class",required:false},
    branch:{type:mongoose.Schema.Types.ObjectId, ref: "Class",required:false},
    semester: {type:String,required:false},
})

module.exports = mongoose.model('Document', DocumentSchema)