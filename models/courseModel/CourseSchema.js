const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    institute:{type:mongoose.Schema.Types.ObjectId, ref: "Institute",required:true},
    CourseType:{type:String,enums:['Jr College','College'],required:true},
})

module.exports = mongoose.model('Course', CourseSchema);