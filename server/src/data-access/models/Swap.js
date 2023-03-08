const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SwapSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      required: [true, "required sender id"],
    },
    senderAddress: {
      type: String,
      required: [true, "required  sender address"],
    },
    receiverAddress: {
      type: String,
      required: [true, "required  receiver address"],
    },
    ETHValue: {
      type: Number,
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
