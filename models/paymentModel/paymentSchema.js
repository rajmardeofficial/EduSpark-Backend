const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    feeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fees', required: true },
    amountPaid: { type: Number, required: true },
    datePaid: { type: Date, default: Date.now },
    installmentNumber: { type: Number },
    paymentMethod: { type: String, enum: ['online', 'cash'], required: true },
    payment_id: {type: String, required: true},
    order_id: {type: String, required: true},
  },{timestamps:true});

  module.exports = mongoose.model('Payment', paymentSchema);