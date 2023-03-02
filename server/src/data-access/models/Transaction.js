const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    txHash: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    value: {
      type: String,
    },
    blockNumber: {
      type: String,
    },
    blockHash: {
      type: String,
    },
    gasPrice: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction", TransactionSchema);
