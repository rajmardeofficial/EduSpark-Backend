const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    date: { type: Date, required: true },
    isPresent: { type: Boolean, default: false }
});

module.exports = mongoose.model('Attendance', attendanceSchema);