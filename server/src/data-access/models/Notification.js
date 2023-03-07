const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, "required  type"],
    },
    description: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    alert: {
      type: Boolean,
      default: false,
    },
    refUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ref: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", NotificationSchema);
