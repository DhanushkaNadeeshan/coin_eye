const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// cart schema
const CardSchema = new Schema({
  id: String,
  CVC_CVV: String,
  expiryDate: String,
  nameOnCard: String,
});

const AccountSchema = new Schema({
  wallet_address: {
    type: String,
    required: [true, "required wallet address"],
    unique: true,
  },
  private_key: {
    type: String,
    required: [true, "required private key"],
  },
  t_account_ETH: {
    type: Number,
    default: 0,
  },
  s_account_ETH: {
    type: Number,
    default: 0,
  },
  t_account_USD: {
    type: Number,
    default: 0,
  },
  s_account_USD: {
    type: Number,
    default: 0,
  },
  cards: [CardSchema],
  ref_user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("account", AccountSchema);
