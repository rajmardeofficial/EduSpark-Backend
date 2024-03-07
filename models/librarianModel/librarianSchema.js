const mongoose = require('mongoose')
const User = require('../userModel/usersSchema')

const LibrarianSchema = new mongoose.Schema({
    // Fields will be added if necessary
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

const Librarian = User.discriminator('Librarian', LibrarianSchema)
module.exports = Librarian