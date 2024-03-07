const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    //Extra fields other than user fields
})

const Admin = User.discriminator('Admin', AdminSchema)
module.exports = Admin