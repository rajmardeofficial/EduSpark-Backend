const mongoose = require('mongoose')

const LibrarianSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    role: { type: String, default: "Librarian" },
    bloodGroup: { type: String },
    institute:{type:mongoose.Schema.Types.ObjectId, ref: "Institute",required:true},
    roleType:{type:String,enums:['School','Jr College','College'],required:true},

    ebook: [
        {
            Title: {type: String, required: true},
            Description: {type: String, required: true},
            branch: String,
            class: String,
            subject: String,
            ebookURL: String,
        }
    ],

})

const Librarian = mongoose.model('Librarian', LibrarianSchema);
module.exports = Librarian;