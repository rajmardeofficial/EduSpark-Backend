const mongoose = require('mongoose')

const feesSchema = new Schema({
    feeId: { type: String, required: true },
    feeName: String, 
    castCategory: { type: String, required: true },
    amount: { type: Number, required: true },
    installments: { type: Boolean, default: false },
    paymentMethods: [{ type: String }],
  });

  module.exports = mongoose.model('Fees', feesSchema)