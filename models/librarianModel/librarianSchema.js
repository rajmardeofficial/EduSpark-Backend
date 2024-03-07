const mongoose = require('mongoose')
const User = require('../userModel/usersSchema')

const LibrarianSchema = new mongoose.Schema({
    // Fields will be added if necessary
})

const Librarian = User.discriminator('Librarian', LibrarianSchema)
module.exports = Librarian