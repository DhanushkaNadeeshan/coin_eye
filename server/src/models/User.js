const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
});

module.exports = mongoose.model("user", UserSchema);
