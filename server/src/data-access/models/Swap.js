const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SwapSchema = new Schema(
  {
    to: {
      type: Schema.Types.ObjectId,
      required: [true, "required to: user id"],
    },
    from: {
      type: Schema.Types.ObjectId,
      required: [true, "required from: user id "],
    },
    receiverAddress: {
      type: String,
      required: [true, "required  receiver address"],
    },
    requestAddress: {
      type: String,
      required: [true, "required  request address"],
    },
    ETHValue: {
      type: mongoose.Decimal128,
      required: [true, "required ETH Value"],
    },
    USDValue: {
      type: Number,
      required: [true, "required USD Value"],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("swap", SwapSchema);
