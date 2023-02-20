const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  total_ETH:{
    type:  mongoose.Decimal128,
    default: 0.0,
  },
  t_account_ETH: {
    type:  mongoose.Decimal128,
    default: 0.0,
  },
  ref_user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("account", AccountSchema);
