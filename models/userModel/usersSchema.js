const mongoose = require('mongoose')

//User Schema (Base Schema)
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    bloodGroup: { type: String },
}, { discriminatorKey: 'role', timestamps: true });

module.exports = mongoose.model('User', UserSchema);