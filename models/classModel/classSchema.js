const mongoose = require('mongoose')

const ClassSchema = new mongoose.Schema({
    className: {type: String, required: true}
})

module.exports = mongoose.model('Class', ClassSchema);
