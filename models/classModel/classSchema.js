const mongoose = require('mongoose')

const ClassSchema = new mongoose.Schema({
    className: {type: String, required: true},
    institute:{type:mongoose.Schema.Types.ObjectId, ref: "Institute",required:true},
    classType:{type:String,enums:['School','Jr College','College'],required:true},
})

module.exports = mongoose.model('Class', ClassSchema);
