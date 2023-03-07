const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// cards like debit or credit
const CardSchema = new Schema({
  number: {
    type: String,
    unique: true,
  },
  cvc: {
    type: String,
    required: true,
  },
  expiryYear: {
    type: Number,
    required: true,
  },
  expiryMonth: {
    type: Number,
    required: true,
  },
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
  total_USD: {
    type: Number,
    default: 0,
  },
  t_account_USD: {
    type: Number,
    default: 0,
  },
  accessibility: {
    status: {
      type: String,
      default: "active",
    },
    blockEndDate: {
      type: String,
      default: "0",
    },
    reason: {
      type: String,
      default: "",
    },
    failedAttempt: {
      type: Number,
      default: 0,
    },
  },
  cards: [CardSchema],
});

module.exports = mongoose.model("user", UserSchema);
