const mongoose = require('mongoose')

const feesSchema = new mongoose.Schema({
    feeId: { type: String, required: true },
    feeName: String, 
    castCategory: { type: String, required: true },
    amount: { type: Number, required: true },
    installments: { type: Boolean, default: false },
    paymentMethods: [{ type: String }],
    institute:{type:mongoose.Schema.Types.ObjectId, ref: "Institute",required:true},
    feesType:{type:String,enums:['School','Jr College','College'],required:true},
  });

  module.exports = mongoose.model('Fees', feesSchema)