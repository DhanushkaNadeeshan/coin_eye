const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// cards like debit or credit
const CardSchema = new Schema({
  id: String,
  CVC_CVV: String,
  expiryDate: String,
  nameOnCard: String,
});

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  securityQuestion: {
    type: String,
    required: true,
  },
  anwser: {
    type: String,
    required: true,
  },
  total_USD:{
    type:  mongoose.Decimal128,
    default: 0.0,
  },
  t_account_USD: {
    type: mongoose.Decimal128,
    default: 0.0,
  },
  cards: [CardSchema],
});

module.exports = mongoose.model("user", UserSchema);
