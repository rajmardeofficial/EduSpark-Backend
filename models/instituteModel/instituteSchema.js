const mongoose = require('mongoose')

const InstituteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    society: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationSociety' }, // Reference to education society
    // Other college fields
});

module.exports = mongoose.model('Institute', InstituteSchema)